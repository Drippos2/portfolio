import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const ProjectsCarousel = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);

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
      image: '/boccaccio-preview.jpg',
      link: 'https://boccaccio.sk'
    },
    {
      title: translations.projects.kastelan.title,
      description: translations.projects.kastelan.description,
      image: '/kastelan-preview.jpg',
      link: 'https://kastelan.vercel.app'
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      const newScroll = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-20 bg-black" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {translations.projects.title}
          </h2>
          
          <div className="relative max-w-7xl mx-auto">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-xl hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-xl hidden md:block"
            >
              <ChevronRight size={24} />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="group bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer flex-shrink-0 w-[350px] md:w-[400px] snap-start"
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
                        className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black"
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
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ProjectsCarousel;