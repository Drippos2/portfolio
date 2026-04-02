import React from 'react';
import { Button } from './ui/button';

const LanguageSwitcher = ({ currentLang, onLanguageChange }) => {
  const languages = [
    { 
      code: 'sk', 
      flag: <svg className="w-6 h-4" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#0b4ea2"/>
        <rect width="900" height="400" fill="#fff"/>
        <rect width="900" height="200" fill="#ee1c25"/>
      </svg>,
      name: 'Slovenčina' 
    },
    { 
      code: 'cz', 
      flag: <svg className="w-6 h-4" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#d7141a"/>
        <rect width="900" height="300" fill="#fff"/>
        <path d="M 0,0 L 450,300 L 0,600 Z" fill="#11457e"/>
      </svg>,
      name: 'Čeština' 
    },
    { 
      code: 'en', 
      flag: <svg className="w-6 h-4" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
        <clipPath id="t"><path d="M30,15 h30 v15 z v-30 h-30 z h-30 v15 z v-30 h30 z"/></clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>,
      name: 'English' 
    }
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLang === lang.code ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange(lang.code)}
          className="p-2 h-9 w-12 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title={lang.name}
        >
          {lang.flag}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;