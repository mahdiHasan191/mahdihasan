import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Shield, Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { scrollToSection, navigateTo, route } = useNavigation();
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const { settings, profile } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isServicesActive =
    route === 'services' ||
    route === 'service_ai' ||
    route === 'service_n8n' ||
    route === 'service_sales';

  const handleNav = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-slate-950/60 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Wordmark */}
          <button
            onClick={() => navigateTo('home')}
            className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          >
            {settings?.header_brand_title || profile?.name || 'Mahdi Hasan'}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                route === 'home' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {settings?.header_nav_home || t('nav.home', 'Home')}
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                route === 'about' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {settings?.header_nav_about || t('nav.about', 'About')}
            </button>
            <button
              onClick={() => navigateTo('services')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                isServicesActive ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {settings?.header_nav_services || t('nav.services', 'Services')}
            </button>
            <button
              onClick={() => navigateTo('case_studies')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                route === 'case_studies' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Case Studies
            </button>
            <button
              onClick={() => navigateTo('credentials', 'experience')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                route === 'credentials' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {settings?.header_nav_credentials || 'Experience & Degrees'}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              {settings?.header_nav_skills || t('nav.skills', 'Skills')}
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 ${
                route === 'contact' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {settings?.header_nav_contact || t('nav.contact', 'Contact')}
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />

            <button
              onClick={() => navigateTo('contact')}
              className="btn-lighting inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>{settings?.header_nav_cta || t('nav.get_in_touch', 'Book Consultation')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login')}
              title={isAdmin ? 'Go to Admin Dashboard' : 'Admin Login'}
              className="btn-glow-soft p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-900 border border-cyan-500/25 rounded-lg transition-colors whitespace-nowrap shrink-0"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login')}
              className="btn-glow-soft p-2 text-slate-300 hover:text-cyan-400 rounded-lg border border-cyan-500/25"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-glow-soft p-2 text-slate-200 hover:text-white rounded-lg border border-cyan-500/25"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-mono">Language / ভাষা:</span>
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => handleNav(() => navigateTo('home'))}
            className={`block w-full text-left py-2 text-sm ${
              route === 'home' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            {t('nav.home', 'Home')}
          </button>
          <button
            onClick={() => handleNav(() => navigateTo('about'))}
            className={`block w-full text-left py-2 text-sm ${
              route === 'about' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            {t('nav.about', 'About')}
          </button>
          <button
            onClick={() => handleNav(() => navigateTo('services'))}
            className={`block w-full text-left py-2 text-sm ${
              isServicesActive ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            {settings?.header_nav_services || t('nav.services', 'Services')}
          </button>
          <button
            onClick={() => handleNav(() => navigateTo('case_studies'))}
            className={`block w-full text-left py-2 text-sm ${
              route === 'case_studies' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            Case Studies
          </button>
          <button
            onClick={() => handleNav(() => navigateTo('credentials', 'experience'))}
            className={`block w-full text-left py-2 text-sm ${
              route === 'credentials' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            {settings?.header_nav_credentials || 'Experience & Degrees'}
          </button>
          <button
            onClick={() => handleNav(() => scrollToSection('skills'))}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            {settings?.header_nav_skills || t('nav.skills', 'Skills')}
          </button>
          <button
            onClick={() => handleNav(() => navigateTo('contact'))}
            className={`block w-full text-left py-2 text-sm ${
              route === 'contact' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            {settings?.header_nav_contact || t('nav.contact', 'Contact')}
          </button>
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => handleNav(() => navigateTo('contact'))}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg"
            >
              {t('nav.get_in_touch', 'Book Consultation')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
