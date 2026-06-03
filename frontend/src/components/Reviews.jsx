import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Quote, Send } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Používame relatívnu cestu /api, ktorá funguje na duovision.sk
const API_URL = 'https://portfolio-w7re.onrender.com/api/reviews';

  const fetchReviews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Chyba pri načítaní recenzií:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, text: message })
      });

      if (response.ok) {
        fetchReviews();
        setName('');
        setMessage('');
      }
    } catch (error) {
      console.error("Chyba pri odosielaní:", error);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-16 text-center text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          Recenzie
        </h2>

        {/* Formulár */}
        <div className="max-w-2xl mx-auto mb-16 bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Tvoje meno" 
              className="bg-black p-3 rounded text-white border border-gray-700 w-full"
            />
            <textarea 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Napíš recenziu..." 
              className="bg-black p-3 rounded text-white border border-gray-700 h-32 w-full"
            />
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded flex items-center justify-center gap-2 transition-colors font-bold">
              Odoslať <Send size={18}/>
            </button>
          </form>
        </div>

        {/* Zoznam recenzií */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-gray-900/50 border-gray-800 p-8 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <Quote className="text-teal-400 mb-4" size={40} />
                <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">"{review.text}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-white font-semibold text-lg">{review.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;