import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Shield, ArrowUp, Linkedin, MessageCircle, Facebook, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, visitorCount } = useData();
  const { navigateTo } = useNavigation();
  const { isAdmin } = useAuth();
  const { t, formatNumber } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-14 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Row: Brand, Navigation Columns & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
          {/* Brand Summary */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-base font-bold text-white tracking-tight">{profile.name}</h4>
            <p className="text-xs text-cyan-400 font-medium">
              AI Automation &amp; Sales Operations Specialist
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Helping FMCG teams and small businesses automate lead generation, sales reporting, customer follow-up, and daily workflows.
            </p>
            <a
              href={`mailto:${profile.email || 'mhmasum7619@gmail.com'}`}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors pt-1"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{profile.email || 'mhmasum7619@gmail.com'}</span>
            </a>
          </div>

          {/* SEO Route Directory */}
          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Explore
              </span>
              <ul className="space-y-1.5 text-slate-300">
                <li>
                  <button onClick={() => navigateTo('home')} className="hover:text-cyan-400 transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('about')} className="hover:text-cyan-400 transition-colors">
                    About Mahdi Hasan
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('case_studies')} className="hover:text-cyan-400 transition-colors">
                    Case Studies &amp; Workflows
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('credentials')} className="hover:text-cyan-400 transition-colors">
                    Experience &amp; Degrees
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('contact')} className="hover:text-cyan-400 transition-colors">
                    Book Consultation
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('privacy')} className="hover:text-cyan-400 transition-colors">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Services
              </span>
              <ul className="space-y-1.5 text-slate-300">
                <li>
                  <button onClick={() => navigateTo('services')} className="hover:text-cyan-400 transition-colors">
                    All AI &amp; Sales Services
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('service_ai')} className="hover:text-cyan-400 transition-colors">
                    AI Workflow &amp; Agents
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('service_n8n')} className="hover:text-cyan-400 transition-colors">
                    n8n Automation
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('service_sales')} className="hover:text-cyan-400 transition-colors">
                    FMCG Sales Reporting
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-cyan-400 transition-all hover:scale-105"
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
                  className="p-2.5 bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 rounded-xl text-emerald-400 transition-all hover:scale-105"
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
                  className="p-2.5 bg-slate-900 border border-blue-500/30 hover:border-blue-400 rounded-xl text-blue-400 transition-all hover:scale-105"
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
                className="p-2.5 bg-slate-900 border border-slate-700 hover:border-white rounded-xl text-slate-200 hover:text-white transition-all hover:scale-105"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-2.5 text-slate-300 hover:text-cyan-300 bg-slate-900 border border-cyan-500/30 rounded-xl transition-colors"
                title="Back to Top"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher variant="badge" />
            </div>
          </div>
        </div>

        {/* Visitor Counter & Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-lg text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400">{t('footer.live_visitors', 'Visitors:')}</span>
              <span className="text-cyan-300 font-bold tracking-wider">
                {formatNumber(visitorCount.toLocaleString())}
              </span>
            </div>
            <span>
              © {new Date().getFullYear()} {profile.name} ·{' '}
              <a
                href="https://mahdihasan.pages.dev/"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                mahdihasan.pages.dev
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('privacy')}
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </button>
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
