import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Check } from 'lucide-react';
import { Badge } from './ui/badge';

const Pricing = ({ translations }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2, 3, 4].forEach((index) => {
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

  const plans = [
    {
      title: translations.pricing.basic.title,
      price: translations.pricing.basic.price,
      period: '',
      features: translations.pricing.basic.features,
      highlighted: false
    },
    {
      title: translations.pricing.advanced.title,
      price: translations.pricing.advanced.price,
      period: '',
      features: translations.pricing.advanced.features,
      highlighted: true
    },
    {
      title: translations.pricing.social.title,
      price: translations.pricing.social.price,
      period: translations.pricing.social.period,
      features: translations.pricing.social.features,
      highlighted: true
    },
    {
      title: translations.pricing.video.title,
      price: translations.pricing.video.price,
      period: translations.pricing.video.period,
      features: translations.pricing.video.features,
      highlighted: false
    },
    {
      title: translations.pricing.logo.title,
      price: translations.pricing.logo.price,
      period: translations.pricing.logo.period,
      features: translations.pricing.logo.features,
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-black to-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          {translations.pricing.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`group relative bg-gray-900/50 border-gray-800 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
                plan.highlighted ? 'border-teal-500 shadow-xl shadow-teal-500/20' : ''
              } ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 via-purple-600 to-blue-500 text-white border-0">
                  Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-white mb-4">{plan.title}</CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-2">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-gray-300">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;