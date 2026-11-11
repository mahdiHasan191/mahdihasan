import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  ArrowRight,
  TrendingUp,
  Award,
  Target,
  Clock,
  Linkedin,
  MessageCircle,
  Facebook,
  Github,
  Mail,
  Download,
  UserCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile, settings } = useData();
  const { scrollToSection, navigateTo } = useNavigation();
  const { t, formatNumber, language } = useLanguage();

  const isBn = language === 'bn';

  const hasRealPhoto = Boolean(
    profile.avatar_url &&
    !profile.avatar_url.includes('mahdi_portrait_1793989323911.jpg') &&
    profile.avatar_url.trim().length > 0
  );

  // Default YouTube-style cover banner gradient and cyber-grid if custom cover_url is not set
  const coverBannerUrl = profile.cover_url || '';

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* =========================================================================
            YOUTUBE-STYLE COVER PHOTO BANNER & EXECUTIVE PROFILE HEADER
            ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-black/80">
          {/* Panoramic Cover Photo Banner (YouTube Cover Style) */}
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950">
            {coverBannerUrl ? (
              profile.cover_link ? (
                <a
                  href={profile.cover_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full cursor-pointer group"
                  title="Open Cover Banner Hyperlink"
                >
                  <img
                    src={coverBannerUrl}
                    alt="YouTube Channel Cover Banner - Mahdi Hasan"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Banner Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ) : (
                <img
                  src={coverBannerUrl}
                  alt="YouTube Channel Cover Banner - Mahdi Hasan"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              /* High-tech YouTube Cover Artwork Backdrop */
              <div className="w-full h-full relative flex items-center justify-between p-6 sm:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-xl space-y-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 rounded-full text-xs font-mono text-cyan-300 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive YouTube Brand Banner</span>
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                    MAHDI HASAN
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-200 font-medium tracking-wide">
                    Sales & AI Automation Specialist · FMCG Sales Leadership · BBA + MBA
                  </p>
                </div>

                <div className="hidden lg:flex flex-col items-end text-right z-10 font-mono text-xs text-slate-400 space-y-1">
                  <span className="text-cyan-400 font-bold">n8n · MCP · Webhooks · Apify</span>
                  <span>Distributor Operations · Target ~100%</span>
                  <span className="text-[11px] text-slate-500">Dhaka, Bangladesh</span>
                </div>
              </div>
            )}
          </div>

          {/* Overlapping Profile Avatar Bar (YouTube Channel Layout) */}
          <div className="relative px-6 sm:px-10 pb-6 pt-0 bg-slate-950/90 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
              {/* Avatar + Main Identity */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                {/* Large Profile Picture / Monogram */}
                <div className="relative group">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-slate-900 border-4 border-slate-950 shadow-2xl shadow-cyan-950/50 overflow-hidden relative ring-2 ring-cyan-500/50">
                    {hasRealPhoto ? (
                      profile.avatar_link ? (
                        <a
                          href={profile.avatar_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full h-full cursor-pointer relative"
                          title="Open Avatar Hyperlink"
                        >
                          <img
                            src={profile.avatar_url}
                            alt="Mahdi Hasan"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cyan-300">
                            <ExternalLink className="w-5 h-5" />
                          </div>
                        </a>
                      ) : (
                        <img
                          src={profile.avatar_url}
                          alt="Mahdi Hasan"
                          className="w-full h-full object-cover object-top"
                        />
                      )
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-900/40 via-slate-900 to-purple-900/40 flex flex-col items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 font-mono">
                          MH
                        </span>
                        <span className="text-[10px] text-cyan-400 font-mono mt-1">Mahdi Hasan</span>
                      </div>
                    )}
                  </div>
                  {/* Verified badge */}
                  <div
                    className="absolute bottom-1 right-1 p-1 bg-cyan-400 text-slate-950 rounded-xl shadow-lg border-2 border-slate-950"
                    title="Verified Specialist"
                  >
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>

                {/* Name & Title */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {profile.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
                      BBA + MBA
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-cyan-400">
                    {profile.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    Dhaka, Bangladesh · 6+ Years FMCG Sales Operations · AI Automation
                  </p>
                </div>
              </div>

              {/* Direct Quick Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:pt-0">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isBn ? 'Gmail-এ বার্তা পাঠান' : 'Send Message'}</span>
                </button>

                <button
                  onClick={() => navigateTo('credentials')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                >
                  <span>{isBn ? 'অভিজ্ঞতা ও ডিগ্রি দেখুন' : 'View Experience & Degrees'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            HERO NARRATIVE HEADLINE & DETAILS
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-8 space-y-5 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              {t('hero.headline')}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {t('hero.description')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{t('hero.btn_projects')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{t('nav.services')}</span>
              </button>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                  <span>{t('hero.btn_resume')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Social Channels with Glowing Effect */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold">
              {isBn ? 'সরাসরি যুক্ত হোন:' : 'Connect & Socials:'}
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all hover:scale-110"
                  aria-label="LinkedIn"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${(profile.whatsapp || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 rounded-xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all hover:scale-110"
                  aria-label="WhatsApp"
                  title="WhatsApp Chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              {profile.facebook_url && (
                <a
                  href={profile.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 border border-blue-500/30 hover:border-blue-400 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all hover:scale-110"
                  aria-label="Facebook"
                  title="Facebook Profile"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              <a
                href={profile.github_url || 'https://github.com/mahdiHasan191'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-900 border border-slate-700 hover:border-white rounded-xl text-slate-300 hover:text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all hover:scale-110"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {t('hero.kpi_exp_label')}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                6+ Years
              </div>
              <p className="text-xs text-slate-400 mt-1">FMCG Sales Experience</p>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {t('hero.kpi_growth_label')}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                ~9%
              </div>
              <p className="text-xs text-slate-400 mt-1">Yearly Business Growth</p>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Target className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {t('hero.kpi_target_label')}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                ~100%
              </div>
              <p className="text-xs text-slate-400 mt-1">Average Target Achievement</p>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-purple-500/40 transition-colors">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Award className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {t('hero.kpi_awards_label')}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                3x 1st Place
              </div>
              <p className="text-xs text-slate-400 mt-1">New Product Sales Performer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
