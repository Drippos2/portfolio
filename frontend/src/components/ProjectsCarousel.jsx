import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const ProjectsCarousel = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Všetky');
  const sectionRef = useRef(null);

  const categories = ['Všetky', 'Reštaurácie', 'Penzióny', 'Ostatné'];

  const projects = [
    { title: translations.projects.toscanna.title, description: translations.projects.toscanna.description, image: '/toscana-preview.webp', link: 'https://toscana-boe4.vercel.app', category: 'Reštaurácie' },
    { title: translations.projects.boccacio.title, description: translations.projects.boccacio.description, image: '/boccaccio-preview.webp', link: 'https://boccaccio.sk', category: 'Reštaurácie' },
    { title: translations.projects.kastelan.title, description: translations.projects.kastelan.description, image: '/kastelan-preview.webp', link: 'https://www.penzionkastelan.sk/', category: 'Penzióny' },
    { title: translations.projects.penzionstrba.title, description: translations.projects.penzionstrba.description, image: '/penzion-strba-preview.webp', link: 'https://www.penzion-strba.sk/', category: 'Penzióny' }
  ];

  const filteredProjects = activeCategory === 'Všetky' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="projects" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-10 text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {translations.projects.title}
          </h2>

          <div className="flex justify-center gap-3 mb-16 flex-wrap" role="group" aria-label="Filtrovanie projektov podľa kategórie">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-6 py-2 rounded-full border border-white/10 transition-all duration-300 ${
                  activeCategory === cat ? 'bg-[#FFD700] text-black' : 'bg-transparent text-white hover:border-[#FFD700]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col gap-12 min-h-[600px]">
            {filteredProjects.map((project) => (
              <div 
                key={project.title} 
                className="group flex flex-col md:flex-row items-center gap-8 border-b border-white/10 pb-12 last:border-0"
              >
                <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    width="600"
                    height="400"
                    loading="lazy"
                    className="w-full h-64 object-cover aspect-[3/2] transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                
                <div className="w-full md:w-1/2 space-y-4">
                  <span className="text-[#FFD700] font-bold text-xs uppercase border-l-2 border-[#FFD700] pl-3">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                  <Button 
                    variant="outline" 
                    className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
                    onClick={() => window.open(project.link, '_blank')}
                    aria-label={`Zobraziť detail projektu ${project.title}`}
                  >
                    <span className="mr-2">{translations.projects.viewProject}</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;