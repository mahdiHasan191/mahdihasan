import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Shield, Menu, X, ArrowUpRight, GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  const { scrollToSection, navigateTo, route } = useNavigation();
  const { isAdmin } = useAuth();
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isBn = language === 'bn';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: 3 zones */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => {
              if (route !== 'home') navigateTo('home');
              scrollToSection('home');
            }}
            className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          >
            Mahdi Hasan
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('home');
              }}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {t('nav.home', 'Home')}
            </button>
            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('about');
              }}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {t('nav.about', 'About')}
            </button>
            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('services');
              }}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {t('nav.services', 'Services')}
            </button>
            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('portfolio');
              }}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {t('nav.portfolio', 'Portfolio')}
            </button>

            {/* Dedicated Experience & Degrees Tab */}
            <button
              onClick={() => navigateTo('credentials', 'experience')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 flex items-center gap-1.5 ${
                route === 'credentials' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              <span>{isBn ? 'Experience & Degrees' : 'Experience & Degrees'}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-cyan-950 border border-cyan-800 text-cyan-300 rounded">
                BBA+MBA
              </span>
            </button>

            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('skills');
              }}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {t('nav.skills', 'Skills')}
            </button>
            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('achievements');
              }}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {isBn ? 'Achievements' : 'Achievements'}
            </button>
            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('contact');
              }}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {t('nav.contact', 'Contact')}
            </button>
          </nav>

          {/* Zone 3: Language Switcher + 1 primary action + discreet admin entrance */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />

            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg shadow-sm shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>{t('nav.get_in_touch', 'Get in Touch')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login')}
              title={isAdmin ? 'Go to Admin Dashboard' : 'Admin Login'}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger button & Language switch */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login')}
              className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg border border-slate-800"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-mono">Language / ভাষা:</span>
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => {
              if (route !== 'home') navigateTo('home');
              scrollToSection('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            {t('nav.home', 'Home')}
          </button>
          <button
            onClick={() => {
              if (route !== 'home') navigateTo('home');
              scrollToSection('about');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            {t('nav.about', 'About')}
          </button>
          <button
            onClick={() => {
              if (route !== 'home') navigateTo('home');
              scrollToSection('services');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            {t('nav.services', 'Services')}
          </button>
          <button
            onClick={() => {
              if (route !== 'home') navigateTo('home');
              scrollToSection('portfolio');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            {t('nav.portfolio', 'Portfolio')}
          </button>
          <button
            onClick={() => {
              navigateTo('credentials', 'experience');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-cyan-400 font-semibold"
          >
            {isBn ? 'Experience & Degrees (BBA+MBA)' : 'Experience & Degrees (BBA+MBA)'}
          </button>
          <button
            onClick={() => {
              if (route !== 'home') navigateTo('home');
              scrollToSection('skills');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            {t('nav.skills', 'Skills')}
          </button>
          <button
            onClick={() => {
              if (route !== 'home') navigateTo('home');
              scrollToSection('achievements');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            {isBn ? 'Achievements' : 'Achievements'}
          </button>
          <button
            onClick={() => {
              if (route !== 'home') navigateTo('home');
              scrollToSection('contact');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            {t('nav.contact', 'Contact')}
          </button>
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                if (route !== 'home') navigateTo('home');
                scrollToSection('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg"
            >
              {t('nav.get_in_touch', 'Get in Touch')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
