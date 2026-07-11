import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Check, Crown } from 'lucide-react';
import { Badge } from './ui/badge';

const Pricing = ({ translations }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2, 3, 4, 5, 6, 7].forEach((index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const mainPlans = [
    { title: translations.pricing.basic.title, price: translations.pricing.basic.price, period: '', features: translations.pricing.basic.features, highlighted: false },
    { title: translations.pricing.advanced.title, price: translations.pricing.advanced.price, period: '', features: translations.pricing.advanced.features, highlighted: true },
    { title: translations.pricing.social.title, price: translations.pricing.social.price, period: translations.pricing.social.period, features: translations.pricing.social.features, highlighted: false }
  ];

  const extraPlans = [
    { title: "DuoVision VIP", price: "49 €", period: "/ mesiac", features: ["Monitoring dostupnosti webu 24/7", "Pravidelné aktualizácie systému", "Automatické denné zálohovanie dát", "Prioritná podpora do 24h"], highlighted: false, isVip: false },
    { title: "Značka, ktorá predáva", price: "99 €", period: "jednorázovo", features: ["Profesionálny Brand Kit", "Definovaná farebná paleta a štýl", "3x Prémiová šablóna pre social siete", "Vektorové súbory pre tlač aj web"], highlighted: false, isVip: false },
    { title: "Váš biznis na prvej strane", price: "od 150 €", period: "/ mesiac", features: ["Kompletný SEO Audit a stratégia", "Optimalizácia obsahu pre vyhľadávače", "Zrýchlenie webu (Technické SEO)", "Mesačný report rastu návštevnosti"], highlighted: false, isVip: false },
    { title: "DuoVision EXTRA PARTNER", price: "299 €", period: "/ mesiac", features: ["Všetky výhody z balíčkov VIP, ZNAČKA a SEO", "Exkluzívna priorita v poradí", "Neobmedzené konzultácie", "Grafické úpravy na počkanie", "Vylepšovanie konverzií webu", "K dispozícii 24/7"], highlighted: true, isVip: true }
  ];

  const PlanCard = ({ plan, index }) => (
    <Card
      className={`group relative border border-white/10 bg-card/50 backdrop-blur-md transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] 
        ${plan.highlighted ? 'border-[#FFD700]/50 bg-gradient-to-b from-[#1a1708] to-card border-2 shadow-2xl shadow-[#FFD700]/30' : ''}
        ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
    >
      {plan.isVip && (
        <>
          <div className="absolute -top-6 left-4 z-20 animate-bounce"><Crown className="text-[#FFD700] w-8 h-8 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" /></div>
          <div className="absolute -top-6 right-4 z-20 animate-bounce delay-150"><Crown className="text-[#FFD700] w-8 h-8 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" /></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-gradient-to-r from-[#FFD700] via-[#FFFFFF] to-[#FFD700] text-black font-black px-6 py-1 border-0 shadow-lg shadow-[#FFD700]/40 uppercase text-[10px] whitespace-nowrap">
              VIP EXKLUZIVITA
            </Badge>
          </div>
        </>
      )}
      
      {!plan.isVip && plan.highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-black font-bold px-6 py-1 border-0 shadow-lg shadow-[#FFD700]/30 uppercase text-xs">
            Populárna voľba
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pt-10 pb-6">
        <CardTitle className={`text-2xl md:text-3xl mb-4 font-bold ${plan.highlighted ? 'text-[#FFD700]' : 'text-white'}`}>
          {plan.title}
        </CardTitle>
        <div className="mb-2">
          <span className="text-4xl font-black text-white">{plan.price}</span>
          {plan.period && <span className="text-gray-400 text-base ml-2">{plan.period}</span>}
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-10">
        <ul className="space-y-4">
          {plan.features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start gap-3 text-gray-200">
              <Check size={20} className="text-[#FFD700] flex-shrink-0 mt-0.5" />
              <span className="text-base font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <section id="pricing" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent">
          {translations.pricing.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {mainPlans.map((plan, index) => <PlanCard key={index} plan={plan} index={index} />)}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#FFD700]/50"></div>
            <span className="text-[#FFD700] font-bold uppercase tracking-[0.2em] text-sm md:text-lg">Špeciálne balíčky pre rast</span>
            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#FFD700]/50"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraPlans.map((plan, index) => <PlanCard key={index + 3} plan={plan} index={index + 3} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;