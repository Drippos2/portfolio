import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';

const About = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="about" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {translations.about.title}
          </h2>
          
          {/* Obal pre zlatý rámik */}
          <div className="p-[1px] bg-gradient-to-br from-[#D4AF37]/50 via-[#B8860B]/20 to-transparent rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500">
            <Card className="bg-[#0A0A0A] border-none p-8 backdrop-blur-md">
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                {translations.about.description}
              </p>
            </Card>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;