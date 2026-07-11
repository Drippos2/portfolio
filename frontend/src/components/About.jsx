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
          
          {/* Hlavný nadpis */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {translations.about.title}
          </h2>
          
          {/* Nová sekcia: O mne (Majiteľ) - Výraznejšia */}
          <div className="mb-12 p-[2px] bg-gradient-to-br from-[#FFD700] via-[#FF8C00] to-transparent rounded-2xl shadow-[0_0_40px_rgba(255,140,0,0.2)]">
            <div className="bg-[#0A0A0A] p-8 rounded-2xl flex flex-col md:flex-row items-center gap-10">
              
              {/* Fotka majiteľa s výrazným rámom */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48 md:w-full md:max-w-[250px] md:h-auto aspect-square rounded-2xl overflow-hidden border-4 border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.4)]">
                  <img 
                    src="/fotka.webp" 
                    alt="Stano - Majiteľ DuoVision"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Text majiteľa */}
              <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
                <h3 className="text-[#FF8C00] font-black uppercase tracking-[0.2em] text-sm">Majiteľ DuoVision</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Ahoj, som Stano</h2>
                <p className="text-gray-200 leading-relaxed font-medium">
                  Verím, že každý web by mal byť nielen pekný, ale hlavne funkčný nástroj, ktorý prináša výsledky. 
                  Ako zakladateľ DuoVision sa starám o to, aby naše projekty mali "dušu" a technicky šliapali ako hodinky. 
                  Nebaví ma robiť len ďalší web do počtu – chcem, aby sa s vašou značkou vaši klienti cítili skvelo a radi sa vracali.
                </p>
              </div>
            </div>
          </div>

          {/* Pôvodný text o štúdiu - Zladený s novým štýlom */}
          <div className="p-[2px] bg-gradient-to-r from-[#FFD700] to-[#FF8C00] rounded-xl shadow-[0_0_20px_rgba(255,140,0,0.1)]">
            <Card className="bg-[#0A0A0A] border-none p-8 text-center md:text-left">
              <p className="text-lg text-white leading-relaxed font-medium">
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