import React from 'react';
// Pridaný Heart do importov
import { Phone, Instagram, Building2, FileCheck, Heart } from 'lucide-react';

const Footer = ({ translations }) => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <img
              src="./pfp.png"
              alt="DuoVision Logo"
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm font-light">
              Web Design & Digital Solutions
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {['home', 'about', 'services', 'projects', 'pricing', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    const element = document.getElementById(section);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-left text-sm"
                >
                  {translations.nav[section]}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">{translations.contact.info}</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:0910151751"
                className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm"
              >
                <Phone size={16} className="text-teal-500" />
                0910 151 751
              </a>
              <a
                href="https://www.instagram.com/duovisionstudiosk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
              >
                <Instagram size={16} className="text-purple-500" />
                @duovisionstudiosk
              </a>

              {/* IČO SEKCIA */}
              <div className="flex items-center gap-3 text-gray-400 text-sm cursor-default pt-1">
                <Building2 size={16} className="text-teal-400 opacity-80" />
                <span>IČO: 57587752</span>
              </div>

              {/* DIČ SEKCIA */}
              <div className="flex items-center gap-3 text-gray-400 text-sm cursor-default">
                <FileCheck size={16} className="text-purple-400 opacity-80" />
                <span>DIČ: 1125211910</span>
              </div>
            </div>
          </div>
        </div> {/* Pridaný chýbajúci uzatvárací div pre grid */}

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
            © {new Date().getFullYear()} DuoVision STUDIO. {translations.footer.rights}
          </p>
          <p className="text-gray-500 text-xs md:text-sm flex items-center gap-1.5">
            {translations.footer.madeWith} <Heart size={14} className="text-orange-500 fill-orange-500 animate-pulse" /> {translations.footer.by} DuoVision STUDIO
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;