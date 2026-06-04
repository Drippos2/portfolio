from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
from datetime import datetime, timezone
from contextlib import asynccontextmanager
import uuid

# Konfigurácia logovania
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- KONFIGURÁCIA ---
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# --- DB LIFE-CYCLE ---
client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME')
    
    logger.info(f"Pripájam sa k databáze: {db_name}")
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    yield
    client.close()

app = FastAPI(lifespan=lifespan)

# --- CORS MIDDLEWARE (Najdôležitejšia časť) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Toto povoľuje všetko, musí to fungovať
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

# --- MODELY ---
class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    text: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ReviewCreate(BaseModel):
    name: str
    text: str

# --- ROUTY ---
@api_router.get("/status")
async def get_status_checks():
    return await db.status_checks.find({}, {"_id": 0}).to_list(1000)

@api_router.get("/reviews", response_model=List[Review])
async def get_reviews():
    cursor = db.reviews.find({}, {"_id": 0}).sort("created_at", -1)
    return await cursor.to_list(100)

@api_router.post("/reviews", response_model=Review)
async def create_review(input: ReviewCreate):
    new_review = Review(name=input.name, text=input.text)
    doc = new_review.model_dump()
    # Preveď datetime na iso formát, ak by bol problém s bson
    doc['created_at'] = doc['created_at'].isoformat()
    await db.reviews.insert_one(doc)
    return new_review

app.include_router(api_router)