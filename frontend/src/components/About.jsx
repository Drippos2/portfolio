import React, { useEffect, useRef, useState } from 'react';

const About = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);

  // Táto časť zabezpečí, že sa animácia spustí až keď uvidíš túto sekciu
  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = 4;
      const duration = 1500; // 1.5 sekundy
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isVisible]); // Spustí sa len vtedy, keď sa isVisible zmení na true

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // 30% sekcie musí byť viditeľných, kým sa animácia spustí
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="about" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Kontajner animovaný pri vstupe */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {translations.about.title}
          </h2>
          
          <div className="mb-8 p-[2px] bg-gradient-to-br from-[#FFD700] to-[#FF8C00] rounded-2xl shadow-xl">
            <div className="bg-[#111] p-8 rounded-2xl flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                  <img src="/fotka.webp" alt="Stano" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white">Ahoj, som Stano</h2>
                <p className="text-gray-300 leading-relaxed">
                  {translations.about.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-[#FFD700] mb-1">ZADARMO</div>
              <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">PRVÝ NÁVRH</div>
            </div>
            
            {/* Počítadlo sa spustí až keď je sekcia viditeľná */}
            <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-[#FFD700] mb-1">{count}+</div>
              <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">ÚSPEŠNÝCH PROJEKTOV</div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-[#FFD700] mb-1">100%</div>
              <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">OFICIÁLNA FAKTURÁCIA</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;