import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Instagram, Send, Mail, Building, FileText } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: 'Správa odoslaná!', description: 'Ozveme sa vám v čo najkratšom čase.' });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-background relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* ĽAVÁ STRANA */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Poďme <br/><span className="text-[#D4AF37]" style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}>spolupracovať</span>
            </h2>
            <p className="text-gray-400 text-lg">Máte nápad, ktorý chcete premeniť na realitu? Napíšte nám a vytvorme niečo výnimočné.</p>
            
            <div className="space-y-6 pt-6">
              {[
                { icon: Phone, text: '0910 151 751', label: 'Zavolajte nám' },
                { icon: Mail, text: 'stanislavhubeny660@gmail.com', label: 'Napíšte nám' },
                { icon: Instagram, text: '@DuoVisionStudio', label: 'Sledujte nás' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-4 bg-white/5 rounded-xl group-hover:bg-[#D4AF37]/10 transition-colors">
                    <item.icon className="text-[#D4AF37]" size={24}/>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{item.label}</p>
                    <p className="text-white font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Fakturačné údaje - ZLATÝ GRADIENT RÁMČEK */}
            <div className="mt-12 p-[1px] rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C05621] to-[#975A16] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <div className="p-6 rounded-2xl bg-black/80 flex gap-6 justify-center text-sm font-semibold tracking-wide">
                <span className="flex items-center gap-2 text-white"><Building size={18} className="text-[#D4AF37]"/> IČO: 57587752</span>
                <span className="flex items-center gap-2 text-white"><FileText size={18} className="text-[#D4AF37]"/> DIČ: 1125211910</span>
              </div>
            </div>
          </div>

          {/* PRAVÁ STRANA: Formulár */}
          <div className="lg:col-span-7">
            <Card className="bg-black/40 border border-white/10 p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Meno</label>
                    <Input name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-[#D4AF37]" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Email</label>
                    <Input name="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-[#D4AF37]" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Správa</label>
                  <Textarea name="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-white/5 border-white/10 text-white min-h-[160px] rounded-xl focus:border-[#D4AF37]" required />
                </div>
                <Button type="submit" className="w-full h-14 bg-[#D4AF37] hover:bg-[#B8860B] text-black font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Odoslať dopyt <Send className="ml-2" size={18} />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;