import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 md:w-[500px] md:h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[600px] md:h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Main Title - Opravené pre mobily */}
          <div className="relative mb-6 sm:mb-8 w-full">
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-2 relative inline-block px-2 max-w-full break-words"
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.02em', // Znížené pre lepšiu mobilitu
                lineHeight: '1.1'
              }}
            >
              <span className="relative inline-block studio-text">
                {/* Glow efekt na pozadí */}
                <span className="absolute inset-0 blur-xl opacity-50 select-none" 
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 50%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  DUOVISION
                </span>
                {/* Hlavný text */}
                <span className="relative" 
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 50%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 20px rgba(20, 184, 166, 0.3)'
                  }}
                >
                  DUOVISION
                </span>
              </span>
            </h1>
            
            {/* STUDIO podnadpis - Opravené čiary */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2">
              <div className="h-px flex-1 max-w-[40px] sm:max-w-[100px] bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
              <h2 
                className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.2em]"
                style={{ 
                  fontFamily: 'Orbitron, sans-serif',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #ef4444 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                STUDIO
              </h2>
              <div className="h-px flex-1 max-w-[40px] sm:max-w-[100px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
          </div>

          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-4 font-light max-w-2xl mx-auto">
            {translations.hero.title}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto font-light">
            {translations.hero.subtitle}
          </p>

          {/* Tlačidlá - Stack na mobile */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 via-purple-600 to-blue-500 hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-7 text-lg border-0"
            >
              {translations.hero.viewProjects}
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black font-semibold px-8 py-7 text-lg transition-all duration-300"
            >
              {translations.hero.contact}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <ChevronDown size={32} className="text-gray-600" />
      </div>

      <style jsx>{`
        .studio-text {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;