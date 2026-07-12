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
  const scrollToSection = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

  if (loading) return <Preloader onLoadingComplete={() => setLoading(false)} />;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020202]">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center animate-zoom-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Crown className="mx-auto text-[#FFD700] mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" size={48} />
          
          <h1 className="text-5xl md:text-9xl font-black mb-6 tracking-tighter animate-float">
            <span className="bg-gradient-to-b from-[#FFF700] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">DUO</span>
            <span className="bg-gradient-to-b from-[#FFD700] via-[#FF8C00] to-[#8B4513] bg-clip-text text-transparent">VISION</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg mx-auto">
            {translations.hero.title}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <Button onClick={() => scrollToSection('projects')} className="bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-black font-bold h-14 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,140,0,0.3)]">
              Pozrieť projekty <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button variant="outline" onClick={() => scrollToSection('about')} className="border-[#FFD700]/30 hover:border-[#FFD700] text-white h-14 bg-transparent hover:bg-[#FFD700]/10 transition-all">
              <Users className="mr-2" size={18} /> O nás
            </Button>
            <Button variant="outline" onClick={() => scrollToSection('services')} className="border-[#FFD700]/30 hover:border-[#FFD700] text-white h-14 bg-transparent hover:bg-[#FFD700]/10 transition-all">
              <Briefcase className="mr-2" size={18} /> Ako sme pomohli
            </Button>
            <Button variant="outline" onClick={() => scrollToSection('pricing')} className="border-[#FFD700]/30 hover:border-[#FFD700] text-white h-14 bg-transparent hover:bg-[#FFD700]/10 transition-all">
              <DollarSign className="mr-2" size={18} /> Cenník
            </Button>
            <Button variant="outline" onClick={() => scrollToSection('contact')} className="sm:col-span-2 lg:col-span-2 border-[#FFD700]/30 hover:border-[#FFD700] text-white h-14 bg-white/5 hover:bg-[#FFD700]/10 transition-all">
              <Mail className="mr-2" size={18} /> Kontaktovať nás
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce p-2 rounded-full bg-gradient-to-b from-[#FFD700] to-[#FF8C00] shadow-[0_0_20px_rgba(255,140,0,0.5)] cursor-pointer" onClick={() => scrollToSection('about')}>
        <ChevronDown size={28} className="text-black" />
      </div>

      <style jsx>{`
        @keyframes zoomIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .animate-zoom-in { animation: zoomIn 0.8s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;