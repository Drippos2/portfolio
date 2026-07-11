import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, ChevronDown, Crown } from 'lucide-react';

// --- PRELOADER KOMPONENTA ---
const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020202]">
      <img src="/pfp.webp" alt="Logo" className="w-64 h-120 mb-8 animate-pulse" />
      <div className="text-[#FFD700] font-mono text-xl tracking-[0.2em]">{progress}%</div>
    </div>
  );
};

// --- HLAVNÁ HERO KOMPONENTA ---
const Hero = ({ translations }) => {
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!loading) setIsVisible(true);
  }, [loading]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <Preloader onLoadingComplete={() => setLoading(false)} />;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020202]">
      
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD700]/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF8C00]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center animate-zoom-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative mb-6">
            
            {/* KORUNKA */}
            <div className="flex justify-center mb-2">
              <Crown 
                className="text-[#FFD700] animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" 
                size={48} 
                strokeWidth={1.5}
                style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }}
              />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-4 relative inline-block tracking-tighter animate-float" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="relative inline-block">
                <span className="bg-gradient-to-b from-[#FFF700] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent drop-shadow-2xl">DUO</span>
                <span className="bg-gradient-to-b from-[#FFD700] via-[#FF8C00] to-[#8B4513] bg-clip-text text-transparent drop-shadow-2xl">VISION</span>
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-6">
              <div className="h-[2px] w-20 bg-gradient-to-l from-[#FFD700] to-transparent"></div>
              <h2 className="text-xl md:text-3xl font-light tracking-[0.4em] text-white/80 uppercase">Studio</h2>
              <div className="h-[2px] w-20 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
            {translations.hero.title}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" onClick={() => scrollToSection('projects')} className="group relative px-8 py-7 bg-transparent border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative text-[#FFD700] group-hover:text-black font-bold text-lg">{translations.hero.viewProjects}</span>
            </Button>
            <button onClick={() => scrollToSection('contact')} className="text-white hover:text-[#FFD700] transition-colors duration-300 border-b border-white/20 hover:border-[#FFD700] pb-1">
              {translations.hero.contact}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <ChevronDown size={24} />
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