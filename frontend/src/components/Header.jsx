import React, { useState, useEffect } from 'react';
import { Phone, Instagram, Facebook, Menu, X, Globe } from 'lucide-react';

const Header = ({ translations, currentLang, onLangChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: translations.nav.home },
    { id: 'about', label: translations.nav.about },
    { id: 'services', label: translations.nav.services },
    { id: 'projects', label: translations.nav.projects },
    { id: 'skills', label: translations.nav.skills },
    { id: 'pricing', label: translations.nav.pricing },
    { id: 'contact', label: translations.nav.contact }
  ];

  return (
    <>
      {/* HEADER BAR */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#020202]/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="cursor-pointer z-[110]" onClick={() => scrollToSection('home')}>
            <img src="/pfp.webp" alt="Logo" className="h-10 md:h-16 w-auto" />
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-gray-300 hover:text-[#FFD700] transition-colors font-medium text-sm uppercase">
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
              <a href="https://www.instagram.com/duovisionstudiosk/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#E1306C]"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/duovisionsk/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#4267B2]"><Facebook size={20} /></a>
              <div className="flex items-center gap-1 text-gray-400">
                <Globe size={16} />
                <select value={currentLang} onChange={(e) => onLangChange(e.target.value)} className="bg-transparent text-xs font-bold cursor-pointer focus:outline-none">
                  <option value="sk">SK</option><option value="cz">CZ</option><option value="en">EN</option><option value="de">DE</option>
                </select>
              </div>
            </div>
          </div>

          {/* MOBILE HAMBURGER */}
          <button className="lg:hidden text-white z-[110] p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={30} />
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[#020202] flex flex-col items-center justify-center gap-8 p-6">
          <button className="absolute top-6 right-6 text-white p-2" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={40} />
          </button>
          
          <nav className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className="text-2xl font-bold text-white hover:text-[#FFD700] uppercase"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-8 mt-4">
            <a href="tel:0910151751" className="text-white hover:text-[#FFD700]"><Phone size={32} /></a>
            <a href="https://www.instagram.com/duovisionstudiosk/" target="_blank" rel="noreferrer" className="text-[#E1306C]"><Instagram size={32} /></a>
            <a href="https://www.facebook.com/duovisionsk/" target="_blank" rel="noreferrer" className="text-[#4267B2]"><Facebook size={32} /></a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;