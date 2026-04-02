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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Main Title with Advanced Effects */}
          <div className="relative mb-8">
            <h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-2 relative inline-block px-2"
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              <span className="relative inline-block studio-text">
                <span className="absolute inset-0 blur-2xl opacity-60" 
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 50%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  DUOVISION
                </span>
                <span className="relative" 
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 50%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(20, 184, 166, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  DUOVISION
                </span>
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
              <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
              <h2 
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider"
                style={{ 
                  fontFamily: 'Orbitron, sans-serif',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #ef4444 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(251, 191, 36, 0.4), 0 0 60px rgba(239, 68, 68, 0.3)'
                }}
              >
                STUDIO
              </h2>
              <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-3 sm:mb-4 font-light px-4" style={{ animationDelay: '0.3s' }}>
            {translations.hero.title}
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto px-4" style={{ animationDelay: '0.6s' }}>
            {translations.hero.subtitle}
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-teal-500 via-purple-600 to-blue-500 hover:from-teal-600 hover:via-purple-700 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50 border-0"
            >
              {translations.hero.viewProjects}
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-400/50"
            >
              {translations.hero.contact}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-gray-500" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .studio-text {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;