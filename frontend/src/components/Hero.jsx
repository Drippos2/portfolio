import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, ChevronDown, Crown, Users, Briefcase, DollarSign, Mail } from 'lucide-react';

const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(timer); setTimeout(onLoadingComplete, 300); return 100; }
        return prev + 4;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020202]">
      <img src="/pfp.webp" alt="Logo" className="w-64 h-[480px] mb-8 animate-pulse object-contain" />
      <div className="text-[#FFD700] font-mono text-xl tracking-[0.2em]">{progress}%</div>
    </div>
  );
};

const Hero = ({ translations }) => {
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { if (!loading) setIsVisible(true); }, [loading]);
  
  // Tu je funkcia, ktorá ťa presunie. Hľadá presné 'id'
  const scrollToSection = (id) => { 
    const el = document.getElementById(id); 
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' }); 
    } else {
        console.warn(`Sekcia s id="${id}" nebola nájdená. Skontroluj, či ju máš v danom komponente nastavenú ako id="${id}".`);
    }
  };

  if (loading) return <Preloader onLoadingComplete={() => setLoading(false)} />;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020202]">
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          <Crown className="mx-auto text-[#FFD700] mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" size={48} />
          
          <h1 className="text-5xl md:text-9xl font-black mb-6 tracking-tighter">
            <span className="bg-gradient-to-b from-[#FFF700] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">DUO</span>
            <span className="bg-gradient-to-b from-[#FFD700] via-[#FF8C00] to-[#8B4513] bg-clip-text text-transparent">VISION</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg mx-auto">
            {translations.hero.title}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            
            <Button onClick={() => scrollToSection('projects')} className="bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-black font-bold h-14 hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,140,0,0.5)] border-none">
              Pozrieť projekty <ArrowRight className="ml-2" size={18} />
            </Button>
            
            <Button variant="outline" onClick={() => scrollToSection('about')} className="border-white/30 hover:border-[#FFD700] text-white hover:text-[#FFD700] h-14 bg-white/5 hover:bg-white/10 transition-all">
              <Users className="mr-2" size={18} /> O nás
            </Button>
            
            <Button variant="outline" onClick={() => scrollToSection('why-me')} className="border-white/30 hover:border-[#FFD700] text-white hover:text-[#FFD700] h-14 bg-white/5 hover:bg-white/10 transition-all">
              <Briefcase className="mr-2" size={18} /> Ako sme pomohli
            </Button>
            
            <Button variant="outline" onClick={() => scrollToSection('pricing')} className="border-white/30 hover:border-[#FFD700] text-white hover:text-[#FFD700] h-14 bg-white/5 hover:bg-white/10 transition-all">
              <DollarSign className="mr-2" size={18} /> Cenník
            </Button>
            
            <Button variant="outline" onClick={() => scrollToSection('contact')} className="sm:col-span-2 lg:col-span-2 border-white/30 hover:border-[#FFD700] text-white hover:text-[#FFD700] h-14 bg-white/10 hover:bg-white/20 transition-all">
              <Mail className="mr-2" size={18} /> Kontaktovať nás
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce p-2 rounded-full bg-gradient-to-b from-[#FFD700] to-[#FF8C00] shadow-[0_0_20px_rgba(255,140,0,0.5)] cursor-pointer" onClick={() => scrollToSection('about')}>
        <ChevronDown size={28} className="text-black" />
      </div>
    </section>
  );
};

export default Hero;