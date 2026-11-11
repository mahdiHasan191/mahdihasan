import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Briefcase, Bot, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { profile } = useData();
  const { navigateTo } = useNavigation();
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            {t('about.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('about.headline')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t('about.bio_lead')}
          </p>
        </div>

        {/* Narrative & Dual Pillar Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Ground Experience */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed">
            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <span>{t('about.pillar1_title')}</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t('about.pillar1_desc')}
              </p>
            </div>

            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <span>{t('about.pillar2_title')}</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t('about.pillar2_desc')}
              </p>
            </div>

            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>{t('about.edu_bba_mba')}</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t('about.edu_bba_mba_desc')}
              </p>
            </div>
          </div>

          {/* Right Column: Verified Snapshot & Principles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-5">
                Verified Sales Leadership Highlights
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Dhaka North Sales Territory</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Managed primary distributor relationship and retail market operations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Distributor & Van Puller Team Supervision</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Managed one distributor and supervised five van pullers for secondary sales.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Consistent High-Performance Target Delivery</h5>
                    <p className="text-xs text-slate-400 mt-0.5">~100% average target attainment with ~9% annual business growth.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">3x First-Place in New Product Sales</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Top-tier execution and market penetration during brand launches.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Snapshot */}
            <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Current Title</span>
                <span className="font-semibold text-white">{profile.title}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Location</span>
                <span className="font-semibold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {profile.location}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Education</span>
                <span className="font-semibold text-white font-mono">BBA + MBA</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Core Specialty</span>
                <span className="font-semibold text-cyan-400">FMCG Sales + AI Automation</span>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => navigateTo('credentials', 'experience')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>{language === 'bn' ? 'সম্পূর্ণ অভিজ্ঞতা ও ডিগ্রি দেখুন' : 'View Full Experience & Degrees'}</span>
                  <span className="text-[10px] font-mono">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
