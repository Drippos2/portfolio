import React, { useEffect } from 'react';
import './App.css';
import { translations } from './data/translations';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ProjectsCarousel from './components/ProjectsCarousel';
import Reviews from './components/Reviews';
import Skills from './components/Skills';
import WhyMe from './components/WhyMe';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

function App() {
  const currentTranslations = translations.sk;

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="App bg-black min-h-screen">
      <Header
        translations={currentTranslations}
      />
      <Hero translations={currentTranslations} />
      <About translations={currentTranslations} />
      <Services translations={currentTranslations} />
      <ProjectsCarousel translations={currentTranslations} />
      <Reviews translations={currentTranslations} />
      <Skills translations={currentTranslations} />
      <WhyMe translations={currentTranslations} />
      <Pricing translations={currentTranslations} />
      <Contact translations={currentTranslations} />
      <Footer translations={currentTranslations} />
      <Toaster />
    </div>
  );
}

export default App;