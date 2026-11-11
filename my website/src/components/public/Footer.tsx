import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Shield, ArrowUp, Linkedin, MessageCircle, Facebook, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, visitorCount } = useData();
  const { scrollToSection, navigateTo } = useNavigation();
  const { isAdmin } = useAuth();
  const { t, formatNumber, language } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <h4 className="text-base font-bold text-white tracking-tight">
              {profile.name}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'bn'
                ? 'Sales & AI Automation Specialist · Dhaka, Bangladesh'
                : 'Sales & AI Automation Specialist · Dhaka, Bangladesh'}
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <button onClick={() => scrollToSection('home')} className="hover:text-cyan-400 transition-colors">
              {t('nav.home', 'Home')}
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">
              {t('nav.about', 'About')}
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">
              {t('nav.services', 'Services')}
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-cyan-400 transition-colors">
              {t('nav.portfolio', 'Portfolio')}
            </button>
            <button onClick={() => navigateTo('credentials', 'experience')} className="hover:text-cyan-400 transition-colors">
              {language === 'bn' ? 'Experience & Degrees' : 'Experience & Degrees'}
            </button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-cyan-400 transition-colors">
              {t('nav.skills', 'Skills')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors">
              {t('nav.contact', 'Contact')}
            </button>
          </div>

          {/* Socials with Glowing Effect & Language Switcher & Back to Top */}
          <div className="flex items-center gap-3">
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all hover:scale-110"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.whatsapp && (
              <a
                href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 rounded-xl text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all hover:scale-110"
                aria-label="WhatsApp"
                title="WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}
            {profile.facebook_url && (
              <a
                href={profile.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 border border-blue-500/30 hover:border-blue-400 rounded-xl text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all hover:scale-110"
                aria-label="Facebook"
                title="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            <a
              href={profile.github_url || 'https://github.com/mahdiHasan191'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-900 border border-slate-700 hover:border-white rounded-xl text-slate-300 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all hover:scale-110"
              aria-label="GitHub"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <div className="pl-2 border-l border-slate-800">
              <LanguageSwitcher variant="badge" />
            </div>

            <button
              onClick={() => scrollToSection('home')}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors ml-1"
              title="Back to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real-time Visitor Social Proof Strip */}
        <div className="py-6 my-6 border-y border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400">
                {t('footer.live_visitors', 'Live Visitor Counter:')}
              </span>
              <span className="text-cyan-300 font-bold tracking-wider">
                {formatNumber(visitorCount.toLocaleString())}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              {t('footer.powered_by', 'Powered by Supabase Realtime & PostgreSQL')}
            </span>
          </div>

          <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Sales & AI Automation Specialist · Portfolio</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile.name}.{' '}
            {t('footer.rights', 'All rights reserved. Built with React, TypeScript & Supabase.')}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login')}
              className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors font-mono"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t('nav.admin_portal', 'Admin Portal')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
