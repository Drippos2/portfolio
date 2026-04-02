import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';

const Reviews = ({ translations }) => {
  const [visibleReviews, setVisibleReviews] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2].forEach((index) => {
            setTimeout(() => {
              setVisibleReviews((prev) => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const reviews = [
    {
      name: translations.reviews.review1.name,
      role: translations.reviews.review1.role,
      text: translations.reviews.review1.text,
      rating: 5
    },
    {
      name: translations.reviews.review2.name,
      role: translations.reviews.review2.role,
      text: translations.reviews.review2.text,
      rating: 5
    },
    {
      name: translations.reviews.review3.name,
      role: translations.reviews.review3.role,
      text: translations.reviews.review3.text,
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-black to-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          {translations.reviews.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className={`group bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 ${
                visibleReviews.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <CardContent className="p-8">
                <div className="mb-4">
                  <Quote className="text-teal-400 mb-4" size={40} />
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-purple-400 fill-purple-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">"{review.text}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-white font-semibold text-lg">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.role}</p>
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