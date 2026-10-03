import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['sq'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('genti_lang');
        if (saved === 'en' || saved === 'sq') {
          return saved;
        }
      }
    } catch (e) {
      // Storage might be restricted in sandboxed iframe, fallback safely
    }
    return 'sq'; // Default to Albanian since the barbershop is in Tirana
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('genti_lang', lang);
      }
    } catch (e) {
      // Ignore storage errors in iframe
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS['sq'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
