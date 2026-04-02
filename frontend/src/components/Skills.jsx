import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';

const Skills = ({ translations }) => {
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});
  const sectionRef = useRef(null);

  const technologies = [
    { name: 'Python', level: 75 },
    { name: 'Java', level: 65 }
  ];

  const expertise = [
    { name: 'Web Design', level: 90 },
    { name: 'UI/UX', level: 85 },
    { name: 'Video Editing', level: 80 },
    { name: 'Social Media Management', level: 88 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleSkills([0, 1]);
          // Animate progress bars
          [...technologies, ...expertise].forEach((skill) => {
            setTimeout(() => {
              setAnimatedValues((prev) => ({ ...prev, [skill.name]: skill.level }));
            }, 500);
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

  const SkillBar = ({ name, level }) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-gray-400">{animatedValues[name] || 0}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 via-purple-600 to-blue-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedValues[name] || 0}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          {translations.skills.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Technologies */}
          <Card
            className={`bg-gray-900/50 border-gray-800 backdrop-blur-sm transition-all duration-700 ${
              visibleSkills.includes(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">{translations.skills.technologies}</h3>
              {technologies.map((tech) => (
                <SkillBar key={tech.name} name={tech.name} level={tech.level} />
              ))}
            </CardContent>
          </Card>

          {/* Expertise */}
          <Card
            className={`bg-gray-900/50 border-gray-800 backdrop-blur-sm transition-all duration-700 ${
              visibleSkills.includes(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">{translations.skills.expertise}</h3>
              {expertise.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;