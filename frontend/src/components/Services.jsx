import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Monitor, Video, Share2, Palette } from 'lucide-react';

const Services = ({ translations }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2, 3].forEach((index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
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

  const services = [
    {
      icon: Monitor,
      title: translations.services.webDesign.title,
      description: translations.services.webDesign.description,
      color: 'teal'
    },
    {
      icon: Video,
      title: translations.services.videoEditing.title,
      description: translations.services.videoEditing.description,
      color: 'pink'
    },
    {
      icon: Share2,
      title: translations.services.socialMedia.title,
      description: translations.services.socialMedia.description,
      color: 'blue'
    },
    {
      icon: Palette,
      title: translations.services.logoDesign.title,
      description: translations.services.logoDesign.description,
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      teal: 'group-hover:text-teal-400 group-hover:shadow-teal-500/20',
      pink: 'group-hover:text-pink-400 group-hover:shadow-pink-500/20',
      blue: 'group-hover:text-blue-400 group-hover:shadow-blue-500/20',
      purple: 'group-hover:text-purple-400 group-hover:shadow-purple-500/20'
    };
    return colors[color];
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          {translations.services.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className={`group bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                <CardHeader>
                  <div className={`mb-4 transition-all duration-300 ${getColorClasses(service.color)}`}>
                    <Icon size={48} className="transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;