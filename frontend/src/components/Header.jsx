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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src="/pfp.webp" alt="DuoVision STUDIO Logo" className="h-16 md:h-20 w-auto transition-transform hover:scale-105" />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-gray-300 hover:text-primary transition-colors font-medium">
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5">
              <a href="tel:0910151751" className="text-gray-300 hover:text-primary transition-all hover:scale-110" title="Telefón"><Phone size={22} /></a>
              {/* Instagram pevná farba pre istotu */}
              <a href="https://www.instagram.com/duovisionstudiosk/" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:text-[#C13584] transition-all hover:scale-110" title="Instagram">
                <Instagram size={22} />
              </a>
              <a href="https://www.facebook.com/duovisionsk/" target="_blank" rel="noopener noreferrer" className="text-[#4267B2] hover:text-[#365899] transition-all hover:scale-110" title="Facebook">
                <Facebook size={22} />
              </a>
            </div>

            <div className="flex items-center gap-2 border-l border-border pl-4">
              <Globe size={18} className="text-gray-400" />
              <select value={currentLang} onChange={(e) => onLangChange(e.target.value)} className="bg-transparent text-gray-300 text-sm focus:outline-none cursor-pointer">
                <option value="sk">SK</option>
                <option value="cz">CZ</option>
                <option value="en">EN</option>
                <option value="de">DE</option>
              </select>
            </div>
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-gray-300 text-left">{item.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;