import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitchProps {
  compact?: boolean;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center p-1 bg-[#151a26] border border-[#2b354c] rounded-lg shadow-sm">
      <button
        onClick={() => setLanguage('sq')}
        className={`px-2.5 py-1 text-xs font-bold rounded transition-all cursor-pointer flex items-center gap-1.5 ${
          language === 'sq'
            ? 'bg-[#dfa938] text-black shadow'
            : 'text-[#9ea6b8] hover:text-white'
        }`}
        title="Shqip (Albanian)"
      >
        <span>🇦🇱</span>
        <span>{compact ? 'SQ' : 'Shqip'}</span>
      </button>

      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded transition-all cursor-pointer flex items-center gap-1.5 ${
          language === 'en'
            ? 'bg-[#dfa938] text-black shadow'
            : 'text-[#9ea6b8] hover:text-white'
        }`}
        title="English"
      >
        <span>🇬🇧</span>
        <span>{compact ? 'EN' : 'English'}</span>
      </button>
    </div>
  );
};
