import React, { useState, useEffect } from 'react';
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
  Camera,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AIAutomationMotionOverlay } from './AIAutomationMotionOverlay';

const AnimatedKpiText: React.FC<{ value: string }> = ({ value }) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^([^0-9]*?)(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    if (!Number.isFinite(target) || target <= 0) {
      setDisplay(value);
      return;
    }

    const duration = 1100;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value]);

  return <span>{display}</span>;
};

export const Hero: React.FC = () => {
  const { profile, settings } = useData();
  const { scrollToSection, navigateTo } = useNavigation();
  const { t, formatNumber, language } = useLanguage();
  const { isAdmin } = useAuth();

  const isBn = language === 'bn';

  const hasRealPhoto = Boolean(
    profile.avatar_url &&
    !profile.avatar_url.includes('mahdi_portrait_1793989323911.jpg') &&
    profile.avatar_url.trim().length > 0
  );

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* =========================================================================
            HERO EXECUTIVE PROFILE PHOTO SHOWCASE (16:9 CINEMATIC 2560x1440 ASPECT RATIO)
            ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800/90 bg-slate-900 shadow-2xl shadow-black/80">
          {/* 16:9 Panoramic Profile Photo Container (2560x1440 Optimized) */}
          <div className="relative w-full aspect-[16/9] min-h-[260px] sm:min-h-[500px] md:min-h-[580px] lg:min-h-[640px] xl:min-h-[720px] overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">
            {/* Quick Edit Shortcut (Bottom-Right to keep Left side clean for Workflow Overlay) */}
            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login', 'profile')}
              className="btn-lighting-pos absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-950/85 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 rounded-xl backdrop-blur-md transition-all shadow-lg text-[10px] sm:text-[11px] font-medium"
              title="Update Profile Photo in Admin Panel"
            >
              <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Update Profile Photo</span>
              <span className="sm:hidden">Edit Photo</span>
            </button>

            {/* Serpentine AI Automation Motion Workflow (Left Side on Tablet/Desktop) */}
            <div className="hidden sm:block">
              <AIAutomationMotionOverlay />
            </div>

            {hasRealPhoto ? (
              profile.avatar_link ? (
                <a
                  href={profile.avatar_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full cursor-pointer relative group overflow-hidden"
                  title="Open Profile Photo Link"
                >
                  {/* Ambient Backdrop for Full View (No crop) mode */}
                  {(profile.avatar_fit || 'contain') === 'contain' && (profile.avatar_bg || 'blur') === 'blur' && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={profile.avatar_url}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover blur-3xl opacity-40 scale-125"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
                    </div>
                  )}

                  {/* Foreground Image with Custom Fit, Position, and Scale */}
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    style={{
                      objectFit: profile.avatar_fit || 'contain',
                      objectPosition: `${profile.avatar_position_x ?? 50}% ${profile.avatar_position_y ?? 50}%`,
                      transform: `scale(${(profile.avatar_scale ?? 100) / 100})`,
                    }}
                    className="relative z-10 w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 z-30 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Profile Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  {/* Ambient Backdrop for Full View (No crop) mode */}
                  {(profile.avatar_fit || 'contain') === 'contain' && (profile.avatar_bg || 'blur') === 'blur' && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={profile.avatar_url}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover blur-3xl opacity-40 scale-125"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
                    </div>
                  )}

                  {/* Foreground Image with Custom Fit, Position, and Scale */}
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    style={{
                      objectFit: profile.avatar_fit || 'contain',
                      objectPosition: `${profile.avatar_position_x ?? 50}% ${profile.avatar_position_y ?? 50}%`,
                      transform: `scale(${(profile.avatar_scale ?? 100) / 100})`,
                    }}
                    className="relative z-10 w-full h-full transition-transform duration-300"
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                </div>
              )
            ) : (
              /* High-tech Executive Monogram & Portrait Placeholder aligned right on sm+ so left workflow never overlaps */
              <div className="w-full h-full relative flex items-center justify-center sm:justify-end p-6 sm:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-md space-y-2.5 sm:space-y-3 text-center sm:text-right flex flex-col items-center sm:items-end">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/50 flex items-center justify-center shadow-xl">
                    <span className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 font-mono">
                      MH
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight pb-0.5 animate-owner-name-entrance">
                    {profile.name}
                  </h2>
                  <p className="text-xs sm:text-base text-cyan-300 font-medium tracking-wide leading-tight">
                    {profile.title}
                  </p>
                  <div className="hidden md:flex flex-col items-end font-mono text-xs text-slate-400 space-y-1 pt-2">
                    <span className="text-cyan-400 font-semibold">n8n · MCP · Webhooks · Apify</span>
                    <span>Distributor Operations · Target ~100%</span>
                    <span className="text-[11px] text-slate-500">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile View: Transparent Serpentine Motion Workflow placed cleanly below photo inside card */}
          <div className="block sm:hidden p-3 bg-transparent border-t border-slate-800/70">
            <AIAutomationMotionOverlay />
          </div>

          {/* Profile Identity Bar (Clean Name WITHOUT BBA+MBA) */}
          <div className="relative px-6 sm:px-10 py-5 bg-slate-950/95 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight pb-0.5 animate-owner-name-entrance">
                    {profile.name}
                  </h2>
                  <div
                    className="p-1.5 bg-cyan-400 text-slate-950 rounded-xl shadow-md shadow-cyan-500/30 shrink-0"
                    title="Verified Specialist"
                  >
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <p className="text-sm sm:text-base font-semibold text-cyan-400">
                  {profile.title}
                </p>
                <p className="text-xs text-slate-400">
                  Dhaka, Bangladesh · 6+ Years FMCG Sales Operations · AI Automation
                </p>
              </div>

              {/* Direct Quick Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:pt-0">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-lighting inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 rounded-xl transition-all hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isBn ? 'Gmail-এ বার্তা পাঠান' : 'Send Message'}</span>
                </button>

                <button
                  onClick={() => navigateTo('credentials')}
                  className="btn-lighting inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl transition-colors"
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
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] pb-1 animate-section-heading">
                {t('hero.headline')}
              </h1>
              <div className="relative w-28 sm:w-40 h-[3px] rounded-full bg-slate-800/90 overflow-hidden mt-2">
                <div className="animate-heading-beam w-14 h-full bg-gradient-to-r from-transparent via-cyan-400 to-emerald-400" />
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {t('hero.description')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="btn-lighting inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{t('hero.btn_projects')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="btn-lighting inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-cyan-500/35 hover:border-cyan-400/70 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{t('nav.services')}</span>
              </button>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lighting inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-cyan-500/30 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>{t('hero.btn_resume')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Social Channels as Stationary Workflow Router Nodes */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-3">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 font-mono font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span>{isBn ? 'সরাসরি যুক্ত হোন:' : 'Connect & Socials:'}</span>
            </span>

            <div className="relative flex flex-wrap items-center gap-3">
              {/* Workflow Signal Wire behind social nodes */}
              <div className="pointer-events-none absolute top-1/2 left-3 right-3 -translate-y-1/2 h-[2px] bg-slate-800/90 overflow-hidden z-0">
                <div className="animate-workflow-packet w-10 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              </div>

              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={
                    {
                      animationDelay: '0s',
                      '--wf-color': 'rgba(34, 211, 238, 0.85)',
                      '--wf-glow': 'rgba(34, 211, 238, 0.45)',
                    } as React.CSSProperties
                  }
                  className="btn-lighting animate-workflow-social relative z-10 p-3 bg-slate-900 border border-cyan-500/35 hover:border-cyan-300 rounded-xl text-cyan-400 transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn Profile"
                >
                  <span
                    style={{ animationDelay: '0s' }}
                    className="animate-workflow-port-social absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${(profile.whatsapp || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={
                    {
                      animationDelay: '0.9s',
                      '--wf-color': 'rgba(16, 185, 129, 0.85)',
                      '--wf-glow': 'rgba(16, 185, 129, 0.45)',
                    } as React.CSSProperties
                  }
                  className="btn-lighting animate-workflow-social relative z-10 p-3 bg-slate-900 border border-emerald-500/35 hover:border-emerald-300 rounded-xl text-emerald-400 transition-colors"
                  aria-label="WhatsApp"
                  title="WhatsApp Chat"
                >
                  <span
                    style={{ animationDelay: '0.9s' }}
                    className="animate-workflow-port-social absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              {profile.facebook_url && (
                <a
                  href={profile.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={
                    {
                      animationDelay: '1.8s',
                      '--wf-color': 'rgba(59, 130, 246, 0.85)',
                      '--wf-glow': 'rgba(59, 130, 246, 0.45)',
                    } as React.CSSProperties
                  }
                  className="btn-lighting animate-workflow-social relative z-10 p-3 bg-slate-900 border border-blue-500/35 hover:border-blue-300 rounded-xl text-blue-400 transition-colors"
                  aria-label="Facebook"
                  title="Facebook Profile"
                >
                  <span
                    style={{ animationDelay: '1.8s' }}
                    className="animate-workflow-port-social absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-400"
                  />
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              <a
                href={profile.github_url || 'https://github.com/mahdiHasan191'}
                target="_blank"
                rel="noopener noreferrer"
                style={
                  {
                    animationDelay: '2.7s',
                    '--wf-color': 'rgba(168, 85, 247, 0.85)',
                    '--wf-glow': 'rgba(168, 85, 247, 0.45)',
                  } as React.CSSProperties
                }
                className="btn-lighting animate-workflow-social relative z-10 p-3 bg-slate-900 border border-slate-600/60 hover:border-white rounded-xl text-slate-200 hover:text-white transition-colors"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <span
                  style={{ animationDelay: '2.7s' }}
                  className="animate-workflow-port-social absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-400"
                />
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Compact 4-column Workflow Pipeline KPI Strip (Stationary Nodes + Sequential Signal Flow) */}
        <div className="pt-4 sm:pt-6 border-t border-slate-800/80">
          <div className="relative grid grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4">
            {/* Horizontal Workflow Bus Wire connecting Node 1 -> Node 2 -> Node 3 -> Node 4 */}
            <div className="pointer-events-none absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-500/20 via-emerald-500/30 to-purple-500/20 z-0 overflow-hidden">
              <div className="animate-workflow-packet w-16 sm:w-28 h-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            </div>

            {/* Node 1: Experience */}
            <div
              style={
                {
                  animationDelay: '0s',
                  '--wf-color': 'rgba(34, 211, 238, 0.85)',
                  '--wf-glow': 'rgba(34, 211, 238, 0.48)',
                } as React.CSSProperties
              }
              className="animate-workflow-node relative z-10 group p-2 sm:p-3.5 bg-slate-900/95 border border-slate-800/90 hover:border-cyan-400/60 rounded-xl sm:rounded-2xl transition-colors flex flex-col justify-between overflow-hidden shadow-sm"
            >
              <div
                style={{ animationDelay: '0s' }}
                className="animate-kpi-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/18 to-transparent"
              />
              <div className="relative z-10 flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                <div className="flex items-center gap-1 sm:gap-1.5 text-cyan-400 min-w-0">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="text-[9px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold truncate">
                    {settings.kpi1_label || 'FMCG Experience'}
                  </span>
                </div>
                <span
                  style={{ animationDelay: '0s' }}
                  className="animate-workflow-port w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
                />
              </div>
              <div className="relative z-10 text-sm sm:text-2xl lg:text-3xl font-extrabold text-white font-mono tabular-nums leading-tight my-0.5 sm:my-1">
                <AnimatedKpiText value={settings.kpi1_value || settings.stat_years_exp || '6+ Years'} />
              </div>
              <p className="relative z-10 text-[8px] sm:text-xs text-slate-400 leading-tight truncate">
                {settings.kpi1_sub || 'FMCG Sales Experience'}
              </p>
            </div>

            {/* Node 2: Growth */}
            <div
              style={
                {
                  animationDelay: '1.2s',
                  '--wf-color': 'rgba(16, 185, 129, 0.85)',
                  '--wf-glow': 'rgba(16, 185, 129, 0.48)',
                } as React.CSSProperties
              }
              className="animate-workflow-node relative z-10 group p-2 sm:p-3.5 bg-slate-900/95 border border-slate-800/90 hover:border-emerald-400/60 rounded-xl sm:rounded-2xl transition-colors flex flex-col justify-between overflow-hidden shadow-sm"
            >
              <div
                style={{ animationDelay: '1.2s' }}
                className="animate-kpi-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-400/18 to-transparent"
              />
              <div className="relative z-10 flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-400 min-w-0">
                  <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="text-[9px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold truncate">
                    {settings.kpi2_label || 'Annual Growth'}
                  </span>
                </div>
                <span
                  style={{ animationDelay: '1.2s' }}
                  className="animate-workflow-port w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                />
              </div>
              <div className="relative z-10 text-sm sm:text-2xl lg:text-3xl font-extrabold text-emerald-300 font-mono tabular-nums leading-tight my-0.5 sm:my-1">
                <AnimatedKpiText value={settings.kpi2_value || settings.stat_growth || '~9%'} />
              </div>
              <p className="relative z-10 text-[8px] sm:text-xs text-slate-400 leading-tight truncate">
                {settings.kpi2_sub || 'Yearly Business Growth'}
              </p>
            </div>

            {/* Node 3: Target Attainment */}
            <div
              style={
                {
                  animationDelay: '2.4s',
                  '--wf-color': 'rgba(34, 211, 238, 0.85)',
                  '--wf-glow': 'rgba(34, 211, 238, 0.48)',
                } as React.CSSProperties
              }
              className="animate-workflow-node relative z-10 group p-2 sm:p-3.5 bg-slate-900/95 border border-slate-800/90 hover:border-cyan-400/60 rounded-xl sm:rounded-2xl transition-colors flex flex-col justify-between overflow-hidden shadow-sm"
            >
              <div
                style={{ animationDelay: '2.4s' }}
                className="animate-kpi-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/18 to-transparent"
              />
              <div className="relative z-10 flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                <div className="flex items-center gap-1 sm:gap-1.5 text-cyan-400 min-w-0">
                  <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="text-[9px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold truncate">
                    {settings.kpi3_label || 'Target Attainment'}
                  </span>
                </div>
                <span
                  style={{ animationDelay: '2.4s' }}
                  className="animate-workflow-port w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
                />
              </div>
              <div className="relative z-10 text-sm sm:text-2xl lg:text-3xl font-extrabold text-cyan-300 font-mono tabular-nums leading-tight my-0.5 sm:my-1">
                <AnimatedKpiText value={settings.kpi3_value || settings.stat_target || '~100%'} />
              </div>
              <p className="relative z-10 text-[8px] sm:text-xs text-slate-400 leading-tight truncate">
                {settings.kpi3_sub || 'Average Target Achievement'}
              </p>
            </div>

            {/* Node 4: Top Performer */}
            <div
              style={
                {
                  animationDelay: '3.6s',
                  '--wf-color': 'rgba(168, 85, 247, 0.85)',
                  '--wf-glow': 'rgba(168, 85, 247, 0.48)',
                } as React.CSSProperties
              }
              className="animate-workflow-node relative z-10 group p-2 sm:p-3.5 bg-slate-900/95 border border-slate-800/90 hover:border-purple-400/60 rounded-xl sm:rounded-2xl transition-colors flex flex-col justify-between overflow-hidden shadow-sm"
            >
              <div
                style={{ animationDelay: '3.6s' }}
                className="animate-kpi-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-purple-400/18 to-transparent"
              />
              <div className="relative z-10 flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                <div className="flex items-center gap-1 sm:gap-1.5 text-purple-400 min-w-0">
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="text-[9px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold truncate">
                    {settings.kpi4_label || 'Top Performer'}
                  </span>
                </div>
                <span
                  style={{ animationDelay: '3.6s' }}
                  className="animate-workflow-port w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"
                />
              </div>
              <div className="relative z-10 text-sm sm:text-2xl lg:text-3xl font-extrabold text-purple-200 font-mono tabular-nums leading-tight my-0.5 sm:my-1">
                <AnimatedKpiText value={settings.kpi4_value || settings.stat_awards || '3x 1st Place'} />
              </div>
              <p className="relative z-10 text-[8px] sm:text-xs text-slate-400 leading-tight truncate">
                {settings.kpi4_sub || 'New Product Sales Performer'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
