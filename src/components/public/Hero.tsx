import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
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
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile, settings } = useData();
  const { scrollToSection } = useNavigation();

  // Check if a real user photograph has been uploaded
  const hasRealPhoto = Boolean(
    profile.avatar_url &&
    !profile.avatar_url.includes('mahdi_portrait_1793989323911.jpg') &&
    profile.avatar_url.trim().length > 0
  );

  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero: Left typographic hierarchy, Right visual container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Unboxed clean metadata kicker */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-cyan-400">
              <span>Sales & AI Automation Specialist · Dhaka, Bangladesh</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.12]">
              AI & n8n Automation for Smarter Business Workflows
            </h1>

            {/* Exact Description requested by user */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              I build AI agents and n8n automations to streamline lead generation, sales reporting, and repetitive business workflows.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>Explore Automation Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/40 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Get in Touch</span>
              </button>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/50 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Channels Strip */}
            <div className="pt-4 flex items-center gap-3 text-slate-400 text-sm">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Direct Connect:</span>
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 border border-slate-800 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-emerald-400 border border-slate-800 rounded-lg transition-colors"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {profile.facebook_url && (
                <a
                  href={profile.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-blue-400 border border-slate-800 rounded-lg transition-colors"
                  aria-label="Facebook"
                  title="View Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 rounded-lg transition-colors"
                  aria-label="GitHub"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Visual Container (Neutral Profile Placeholder or Real Uploaded Photo) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Subtle ambient gradient ring */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/40 via-indigo-500/30 to-purple-600/40 rounded-2xl blur-md opacity-60" />

              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                {hasRealPhoto ? (
                  <img
                    src={profile.avatar_url}
                    alt="Mahdi Hasan - Real Photograph"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-square object-cover object-top"
                  />
                ) : (
                  /* Neutral Professional Placeholder Container (No fake AI-generated human portrait) */
                  <div className="w-full aspect-square bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    {/* Subtle geometric grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                    {/* Refined Executive Monogram */}
                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center shadow-xl shadow-cyan-950/40 mb-5 relative group">
                      <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent font-mono">
                        MH
                      </span>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-950 border border-cyan-500/50 rounded-full flex items-center justify-center text-cyan-400">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-white tracking-tight">{profile.name}</h2>
                    <p className="text-xs text-cyan-400 font-medium mt-1">
                      Sales & AI Automation Specialist
                    </p>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                      Dhaka North Sales Territory · BBA + MBA
                    </p>

                    <div className="mt-4 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-lg text-[11px] text-slate-400 font-mono">
                      Personal Profile · Real Photo Uploadable in Admin
                    </div>
                  </div>
                )}

                {/* Bottom card caption */}
                <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{profile.name}</h3>
                    <p className="text-xs text-slate-400">Sales & AI Automation Specialist</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-cyan-400">Dhaka, Bangladesh</span>
                    <p className="text-[11px] text-slate-500">6+ Years FMCG Sales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column KPI strip below the hero split */}
        <div className="mt-16 pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {/* Metric 1 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Experience</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                6+ Years
              </div>
              <p className="text-xs text-slate-400 mt-1">FMCG Sales Experience</p>
            </div>

            {/* Metric 2 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Annual Growth</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                ~9%
              </div>
              <p className="text-xs text-slate-400 mt-1">Yearly Business Growth</p>
            </div>

            {/* Metric 3 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Target className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Target Attainment</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                ~100%
              </div>
              <p className="text-xs text-slate-400 mt-1">Average Target Achievement</p>
            </div>

            {/* Metric 4 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Award className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Top Performer</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                3x 1st Place
              </div>
              <p className="text-xs text-slate-400 mt-1">New Product Sales Achievement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
