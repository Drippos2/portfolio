import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Lightbulb, TrendingUp, Zap, Palette, X, AlertCircle, ChevronRight, Eye } from 'lucide-react';

const WhyMe = ({ translations }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [seenProjects, setSeenProjects] = useState([]); // Stav pre "videné" projekty
  const sectionRef = useRef(null);

  // Načítanie videných projektov z pamäte pri štarte
  useEffect(() => {
    const saved = localStorage.getItem('seenProjects');
    if (saved) setSeenProjects(JSON.parse(saved));
  }, []);

  // Funkcia na označenie projektu ako videného
  const markAsSeen = (title) => {
    const updated = [...seenProjects, title];
    setSeenProjects(updated);
    localStorage.setItem('seenProjects', JSON.stringify(updated));
  };

  const projects = [
    { title: "Boccaccio Restaurant", problems: ["Zastaralý dizajn z roku 2017", "Web sa nezobrazoval správne na mobiloch", "Zložitá správa denného menu"], old: ["/bc1s.webp", "/bc2s.webp", "/bc3s.webp"], new: ["/bc1n.webp", "/bc2n.webp", "/bc3n.webp", "/bc4n.webp", "/bc5n.webp", "/bc6n.webp", "/bc7n.webp", "/bc8n.webp", "/bc9n.webp"] },
    { title: "Penzion Kastelán", problems: ["Pomalé načítanie stránky", "Nekonzistentný vizuálny štýl", "Chýbajúce moderné CTA prvky"], old: ["/k1s.webp", "/k2s.webp", "/k3s.webp"], new: ["/k1n.webp", "/k2n.webp", "/k3n.webp", "/k4n.webp"] },
    { title: "Penzion Štrba", problems: ["Zlá používateľská skúsenosť (UX)", "Ťažká orientácia pre návštevníka", "Web nebudil dôveryhodný dojem"], old: ["/š1s.webp", "/š2s.webp", "/š3s.webp"], new: ["/š1n.webp", "/š2n.webp", "/š3n.webp", "/š4n.webp"] }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        [0, 1, 2, 3].forEach((index) => {
          setTimeout(() => setVisibleCards((prev) => [...prev, index]), index * 150);
        });
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const reasons = [
    { icon: Lightbulb, title: translations.whyMe.creative.title },
    { icon: TrendingUp, title: translations.whyMe.improvement.title },
    { icon: Zap, title: translations.whyMe.learning.title },
    { icon: Palette, title: translations.whyMe.modern.title }
  ];

  return (
    <section id="why-me" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center text-white">PREČO SI VYBRAŤ NÁS?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className={`bg-card/40 border-border p-4 transition-all ${visibleCards.includes(index) ? 'opacity-100' : 'opacity-0'}`}>
                <CardHeader className="text-center p-2">
                  <Icon size={32} className="mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg text-white">{reason.title}</CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((p, i) => {
            const isSeen = seenProjects.includes(p.title);
            return (
              <div 
                key={i} 
                onClick={() => { setSelectedProject(p); markAsSeen(p.title); }} 
                className="cursor-pointer bg-card border border-border p-4 rounded-xl w-56 text-center hover:border-[#D4AF37] transition-all hover:scale-105 group relative"
              >
                {/* Upozornenie, ktoré zmizne po kliknutí */}
                {!isSeen && (
                  <div className="absolute -top-2 -right-2 z-10 flex flex-col items-center animate-pulse">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-2 border-background shadow-lg">
                      <AlertCircle size={16} className="text-white" />
                    </div>
                    <span className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-wider">Otvoriť</span>
                  </div>
                )}
                
                <img src={p.new[0]} alt={p.title} width="200" height="150" className="rounded-md mb-3 h-24 w-full object-cover" />
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-white text-sm font-bold">{p.title}</h3>
                  {isSeen && <Eye size={14} className="text-[#D4AF37]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL OKNO */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border p-6 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative">
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={24}/>
            </button>
            <h2 className="text-2xl text-white font-bold mb-6 text-center">{selectedProject.title}</h2>
            <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-lg mb-8">
              <ul className="text-gray-200 text-xs list-disc pl-4 space-y-2">
                {selectedProject.problems.map((prob, i) => <li key={i}>{prob}</li>)}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {/* ... (zvyšok kódu pre obrázky ostáva) */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyMe;