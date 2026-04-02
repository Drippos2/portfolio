import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const Projects = ({ translations }) => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1].forEach((index) => {
            setTimeout(() => {
              setVisibleProjects((prev) => [...prev, index]);
            }, index * 300);
          });
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

  const projects = [
    {
      title: translations.projects.toscanna.title,
      description: translations.projects.toscanna.description,
      image: '/toscana-preview.jpg',
      link: 'https://toscana-boe4.vercel.app'
    },
    {
      title: translations.projects.boccacio.title,
      description: translations.projects.boccacio.description,
      image: '/boccacio-preview.jpg',
      link: 'https://boccacio.vercel.app'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-black" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          {translations.projects.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer ${
                visibleProjects.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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
                    className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    {translations.projects.viewProject}
                    <ExternalLink className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;