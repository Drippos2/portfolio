import React from 'react';
import { Phone, Instagram, Heart } from 'lucide-react';

const Footer = ({ translations }) => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <img
              src="./pfp.png"
              alt="DuoVision Logo"
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              Web Design & Digital Solutions
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
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
            <h3 className="text-white font-bold mb-4">{translations.contact.info}</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:0910151751"
                className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm"
              >
                <Phone size={16} />
                0910 151 751
              </a>
              <a
                href="https://www.instagram.com/duovisionstudiosk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
              >
                <Instagram size={16} />
                @duovisionstudiosk
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DuoVision STUDIO. {translations.footer.rights}
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            {translations.footer.madeWith} <Heart size={14} className="text-orange-500 fill-orange-500" /> {translations.footer.by} DuoVision STUDIO
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;