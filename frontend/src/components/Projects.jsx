import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const Projects = ({ translations }) => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Všetky');
  const sectionRef = useRef(null);

  // Definícia kategórií
  const categories = ['Všetky', 'Reštaurácie', 'Penzióny'];

  // Upravené pole projektov o kategóriu
  const allProjects = [
    { title: translations.projects.toscanna.title, description: translations.projects.toscanna.description, image: '/toscana-preview.jpg', link: 'https://toscana-boe4.vercel.app', category: 'Reštaurácie' },
    { title: translations.projects.boccacio.title, description: translations.projects.boccacio.description, image: '/boccacio-preview.jpg', link: 'https://www.boccaccio.sk/', category: 'Reštaurácie' },
    { title: translations.projects.penzionstrba.title, description: translations.projects.penzionstrba.description, image: '/penzion-strba-preview.jpg', link: 'https://www.penzion-strba.sk/', category: 'Penzióny' }
  ];

  const filteredProjects = activeCategory === 'Všetky' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          allProjects.forEach((_, index) => {
            setTimeout(() => {
              setVisibleProjects((prev) => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="projects" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          {translations.projects.title}
        </h2>

        {/* Filtračné tlačidlá */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${
                activeCategory === cat 
                  ? 'bg-[#FFD700] text-black border-[#FFD700]' 
                  : 'bg-transparent text-white border-white/10 hover:border-[#FFD700]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className={`group bg-card border-border overflow-hidden backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#FFD700]/10 ${
                visibleProjects.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Button
                    variant="outline"
                    className="border-[#FFD700] text-[#FFD700] hover:bg-gradient-to-r hover:from-[#FFD700] hover:to-[#FF8C00] hover:text-black font-semibold transition-all duration-300"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    {translations.projects.viewProject}
                    <ExternalLink className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;