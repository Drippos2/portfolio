import React, { useState, useEffect } from 'react';
import { Quote, Send, Star } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5); // Predvolené 5 hviezdičiek
  const API_URL = 'https://portfolio-w7re.onrender.com/api/reviews';

  const fetchReviews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setReviews(data);
    } catch (error) { console.error("Chyba:", error); }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text: message, rating }) // Posielame aj rating
      });
      if (response.ok) { fetchReviews(); setName(''); setMessage(''); setRating(5); }
    } catch (error) { console.error("Chyba:", error); }
  };

  return (
    <section id="reviews" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          Čo o nás hovoria
        </h2>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto mb-20">
          {reviews.map((review) => (
            <div key={review.id} className="break-inside-avoid p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
              <Quote className="text-[#FFD700] mb-6" size={32} />
              <p className="text-gray-300 mb-6 italic leading-relaxed">"{review.text}"</p>
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <p className="text-white font-bold tracking-wider">{review.name}</p>
                <div className="flex text-[#FFD700]">
                  {[...Array(review.rating || 5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulár s výberom hviezdičiek */}
        <div className="max-w-xl mx-auto bg-gradient-to-b from-white/[0.08] to-transparent p-1 rounded-[32px]">
          <div className="bg-[#0A0A0A] p-10 rounded-[31px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input 
                value={name} onChange={(e) => setName(e.target.value)} 
                placeholder="Tvoje meno" 
                className="bg-transparent border-b border-white/20 p-2 text-white focus:border-[#FFD700] outline-none"
              />
              
              {/* Výber hodnotenia */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm">Tvoje hodnotenie:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} type="button" 
                      onClick={() => setRating(star)}
                      className={`transition-all ${rating >= star ? 'text-[#FFD700]' : 'text-gray-600'}`}
                    >
                      <Star size={28} fill={rating >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea 
                value={message} onChange={(e) => setMessage(e.target.value)} 
                placeholder="Tvoja skúsenosť..." 
                className="bg-transparent border-b border-white/20 p-2 text-white h-24 focus:border-[#FFD700] outline-none resize-none"
              />
              <button type="submit" className="bg-[#FFD700] hover:bg-white text-black py-4 rounded-xl font-bold transition-all">
                Odoslať recenziu
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;