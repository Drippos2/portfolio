import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Instagram, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: 'Správa odoslaná!',
      description: 'Ďakujem za správu. Ozvem sa vám čoskoro.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-black" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {translations.contact.title}
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">{translations.contact.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-white mb-2 block">{translations.contact.name}</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white focus:border-orange-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-white mb-2 block">{translations.contact.email}</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white focus:border-orange-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-white mb-2 block">{translations.contact.message}</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-gray-800 border-gray-700 text-white focus:border-orange-500 transition-colors duration-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 via-purple-600 to-blue-500 hover:from-teal-600 hover:via-purple-700 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50"
                  >
                    {translations.contact.send}
                    <Send className="ml-2" size={18} />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">{translations.contact.info}</h3>
                  <div className="space-y-4">
                    <a
                      href="tel:0910151751"
                      className="flex items-center gap-4 text-gray-300 hover:text-teal-400 transition-colors duration-300 group"
                    >
                      <div className="p-3 bg-gray-800 rounded-full group-hover:bg-teal-500/20 transition-colors duration-300">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Telefón</p>
                        <p className="font-medium">0910 151 751</p>
                      </div>
                    </a>
                    <a
                      href="https://www.instagram.com/duovisionstudiosk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
                    >
                      <div className="p-3 bg-gray-800 rounded-full group-hover:bg-purple-500/20 transition-colors duration-300">
                        <Instagram size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Instagram</p>
                        <p className="font-medium">@DuoVisionStudio</p>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;