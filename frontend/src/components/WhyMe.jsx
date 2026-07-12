import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Lightbulb, TrendingUp, Zap, Palette, X, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

const WhyMe = ({ translations }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [seenProjects, setSeenProjects] = useState([]);
  const sectionRef = useRef(null);

  // Načítanie videných projektov z localStorage
  useEffect(() => {
    const savedSeen = localStorage.getItem('seenProjects');
    if (savedSeen) {
      setSeenProjects(JSON.parse(savedSeen));
    }
  }, []);

  // Funkcia na označenie projektu ako videného
  const markAsSeen = (title) => {
    if (!seenProjects.includes(title)) {
      const updated = [...seenProjects, title];
      setSeenProjects(updated);
      localStorage.setItem('seenProjects', JSON.stringify(updated));
    }
  };

  const projects = [
    {
      title: "Boccaccio Restaurant",
      problems: ["Zastaralý dizajn z roku 2017", "Web sa nezobrazoval správne na mobiloch", "Zložitá správa denného menu"],
      old: ["/bc1s.webp", "/bc2s.webp", "/bc3s.webp"],
      new: ["/bc1n.webp", "/bc2n.webp", "/bc3n.webp", "/bc4n.webp", "/bc5n.webp", "/bc6n.webp", "/bc7n.webp", "/bc8n.webp", "/bc9n.webp"]
    },
    {
      title: "Penzion Kastelán",
      problems: ["Pomalé načítanie stránky", "Nekonzistentný vizuálny štýl", "Chýbajúce moderné CTA prvky"],
      old: ["/k1s.webp", "/k2s.webp", "/k3s.webp"],
      new: ["/k1n.webp", "/k2n.webp", "/k3n.webp", "/k4n.webp"]
    },
    {
      title: "Penzion Štrba",
      problems: ["Zlá používateľská skúsenosť (UX)", "Ťažká orientácia pre návštevníka", "Web nebudil dôveryhodný dojem"],
      old: ["/š1s.webp", "/š2s.webp", "/š3s.webp"],
      new: ["/š1n.webp", "/š2n.webp", "/š3n.webp", "/š4n.webp"]
    }
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
        {/* Pridaný glow efekt na nadpis */}
        <h2 
          className="text-4xl font-bold mb-16 text-center text-white drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] bg-gradient-to-r from-white via-yellow-200 to-yellow-500 bg-clip-text text-transparent" 
          aria-level="2"
        >
          PREČO SI VYBRAŤ NÁS?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className={`bg-card/40 border-border p-4 transition-all ${visibleCards.includes(index) ? 'opacity-100' : 'opacity-0'}`}>
                <CardHeader className="text-center p-2">
                  <Icon size={32} className="mx-auto mb-2 text-primary" aria-hidden="true" />
                  <CardTitle className="text-lg text-white">{reason.title}</CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-12" role="separator"></div>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((p, i) => {
            const isSeen = seenProjects.includes(p.title);
            return (
              <div 
                key={i} 
                onClick={() => { setSelectedProject(p); markAsSeen(p.title); }} 
                role="button"
                aria-label={`Zobraziť detail projektu ${p.title}`}
                className="cursor-pointer bg-card border border-border p-4 rounded-xl w-56 text-center hover:border-[#D4AF37] transition-all hover:scale-105 group relative"
              >
                {!isSeen ? (
                  // Pridaná trieda animate-bounce pre skákanie
                  <div className="absolute -top-3 -right-3 z-10 flex flex-col items-center animate-bounce">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-background">
                      <AlertCircle size={14} className="text-white" />
                    </div>
                    <span className="text-[9px] font-bold text-red-500 uppercase mt-0.5 bg-black/50 px-1 rounded">Otvoriť</span>
                  </div>
                ) : (
                  <div className="absolute -top-2 -right-2 z-10 text-green-500">
                    <CheckCircle2 size={20} className="bg-background rounded-full" />
                  </div>
                )}
                
                <img src={p.new[0]} alt={`Hlavný náhľad redizajnu projektu ${p.title}`} width="200" height="150" className="rounded-md mb-3 h-24 w-full object-cover" />
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-white text-sm font-bold">{p.title}</h3>
                  <ChevronRight size={16} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-background border border-border p-6 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative">
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Zatvoriť detail projektu">
              <X size={24}/>
            </button>
            <h2 className="text-2xl text-white font-bold mb-6 text-center">{selectedProject.title}</h2>
            
            <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-lg mb-8 relative">
              <div className="absolute -top-3 left-4 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1" aria-hidden="true">
                <AlertCircle size={12}/> Problém
              </div>
              <ul className="text-gray-200 text-xs list-disc pl-4 space-y-2 mt-2">
                {selectedProject.problems.map((prob, i) => <li key={i}>{prob}</li>)}
              </ul>
            </div>

            <h3 className="text-lg text-white font-bold mb-4 text-center">PREROBENÉ: Predtým vs. Potom</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase mb-2">Pôvodný stav</p>
                <div className="grid grid-cols-2 gap-1">
                  {selectedProject.old.map((img, i) => <img key={i} src={img} alt={`Pôvodný stav webu ${i + 1}`} width="100" height="100" onClick={() => setZoomedImage(img)} className="cursor-pointer h-16 w-full object-cover rounded hover:opacity-80" />)}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase mb-2">Redizajn</p>
                <div className="grid grid-cols-2 gap-1">
                  {selectedProject.new.map((img, i) => <img key={i} src={img} alt={`Nový dizajn webu ${i + 1}`} width="100" height="100" onClick={() => setZoomedImage(img)} className="cursor-pointer h-16 w-full object-cover rounded hover:opacity-80" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {zoomedImage && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4" onClick={() => setZoomedImage(null)} role="presentation">
          <img src={zoomedImage} alt="Zväčšený náhľad projektu" width="800" height="600" className="max-h-[85vh] max-w-[85vw] object-contain rounded" />
        </div>
      )}
    </section>
  );
};

export default WhyMe;