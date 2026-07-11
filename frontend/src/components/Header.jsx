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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#020202]/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer z-50 shrink-0" onClick={() => scrollToSection('home')}>
          <img src="/pfp.webp" alt="DuoVision STUDIO Logo" className="h-10 md:h-16 w-auto" />
        </div>

        {/* Desktop Nav & Lang */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className="text-gray-300 hover:text-[#FFD700] transition-colors font-medium text-sm uppercase tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-2 border-l border-white/10 pl-6">
            <Globe size={18} className="text-gray-400" />
            <select 
              value={currentLang} 
              onChange={(e) => onLangChange(e.target.value)}
              className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
            >
              <option value="sk">SK</option>
              <option value="cz">CZ</option>
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
          </div>
        </div>

        {/* Hamburger */}
        <button className="lg:hidden text-white z-50 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#020202] z-40 flex flex-col items-center justify-center gap-8 overflow-y-auto pt-20">
          <nav className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className="text-2xl font-bold text-white hover:text-[#FFD700] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-8 mt-10">
            <a href="tel:0910151751" className="text-white hover:text-[#FFD700] transition-transform hover:scale-110"><Phone size={32} /></a>
            <a href="https://www.instagram.com/duovisionstudiosk/" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:scale-110 transition-transform"><Instagram size={32} /></a>
            <a href="https://www.facebook.com/duovisionsk/" target="_blank" rel="noopener noreferrer" className="text-[#4267B2] hover:scale-110 transition-transform"><Facebook size={32} /></a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;