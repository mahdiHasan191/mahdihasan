import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'segmented' | 'badge' | 'minimal';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'segmented',
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 ${className}`}
      >
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <button
          onClick={() => setLanguage('en')}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            language === 'en'
              ? 'text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-800/60'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to English"
        >
          EN
        </button>
        <span className="text-slate-600">/</span>
        <button
          onClick={() => setLanguage('bn')}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            language === 'bn'
              ? 'text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-800/60'
              : 'text-slate-400 hover:text-white'
          }`}
          title="বাংলায় পরিবর্তন করুন"
        >
          বাংলা
        </button>
      </div>
    );
  }

  // Segmented control (default)
  return (
    <div
      className={`inline-flex items-center p-0.5 bg-slate-950/90 border border-slate-800 rounded-lg shadow-sm ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          language === 'en'
            ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
            : 'text-slate-400 hover:text-slate-200 border border-transparent'
        }`}
        aria-pressed={language === 'en'}
      >
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          language === 'bn'
            ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
            : 'text-slate-400 hover:text-slate-200 border border-transparent'
        }`}
        aria-pressed={language === 'bn'}
      >
        <span>বাং</span>
      </button>
    </div>
  );
};
