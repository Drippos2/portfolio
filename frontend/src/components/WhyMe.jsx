import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Lightbulb, TrendingUp, Zap, Palette } from 'lucide-react';

const WhyMe = ({ translations }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2, 3].forEach((index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 150);
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

  const reasons = [
    {
      icon: Lightbulb,
      title: translations.whyMe.creative.title,
      description: translations.whyMe.creative.description,
      color: 'orange'
    },
    {
      icon: TrendingUp,
      title: translations.whyMe.improvement.title,
      description: translations.whyMe.improvement.description,
      color: 'cyan'
    },
    {
      icon: Zap,
      title: translations.whyMe.learning.title,
      description: translations.whyMe.learning.description,
      color: 'pink'
    },
    {
      icon: Palette,
      title: translations.whyMe.modern.title,
      description: translations.whyMe.modern.description,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: 'text-teal-400',
      cyan: 'text-blue-400',
      pink: 'text-purple-400'
    };
    return colors[color];
  };

  return (
    <section id="why-me" className="py-20 bg-black" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          {translations.whyMe.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card
                key={index}
                className={`group bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                <CardHeader className="text-center">
                  <div className={`mb-4 flex justify-center ${getColorClasses(reason.color)}`}>
                    <Icon size={40} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{reason.title}</CardTitle>
                  <CardDescription className="text-gray-400">{reason.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyMe;