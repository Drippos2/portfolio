import React, { useState, useEffect } from 'react';
import { Phone, Instagram, Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ translations, currentLang, onLangChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
            <img 
              src="/pfp.png" 
              alt="DuoVision STUDIO Logo" 
              className="h-16 md:h-20 w-auto transition-transform duration-300 hover:scale-105" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Icons & Language Picker */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href="tel:0910151751"
                className="text-teal-400 hover:text-teal-300 transition-all duration-300 hover:scale-110"
                title="Telefón"
              >
                <Phone size={22} />
              </a>
              <a
                href="https://www.instagram.com/duovisionstudiosk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-110"
                title="Instagram"
              >
                <Instagram size={22} />
              </a>
            </div>

            {/* Language Selector Desktop */}
            <div className="flex items-center gap-2 border-l border-gray-800 pl-4">
              <Globe size={18} className="text-gray-400" />
              <select
                value={currentLang}
                onChange={(e) => onLangChange(e.target.value)}
                className="bg-zinc-900 text-gray-300 text-sm font-medium rounded-md border border-gray-800 px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer transition-colors duration-300"
              >
                <option value="sk">SK 🇸🇰</option>
                <option value="cz">CZ 🇨🇿</option>
                <option value="en">EN 🇬🇧</option>
                <option value="de">DE 🇩🇪</option>
              </select>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-800">
            <nav className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-900">
              <div className="flex items-center gap-4">
                <a href="tel:0910151751" className="text-teal-400 hover:text-teal-300">
                  <Phone size={22} />
                </a>
                <a
                  href="https://www.instagram.com/duovisionstudiosk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  <Instagram size={22} />
                </a>
              </div>

              {/* Language Selector Mobile */}
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-gray-400" />
                <select
                  value={currentLang}
                  onChange={(e) => onLangChange(e.target.value)}
                  className="bg-zinc-900 text-gray-300 text-sm font-medium rounded-md border border-gray-800 px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  <option value="sk">SK 🇸🇰</option>
                  <option value="cz">CZ 🇨🇿</option>
                  <option value="en">EN 🇬🇧</option>
                  <option value="de">DE 🇩🇪</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;