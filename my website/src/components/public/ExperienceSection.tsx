import React from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Award, TrendingUp, Target, Users, MapPin, CheckCircle2, Building } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences } = useData();
  const { t, language } = useLanguage();
  const published = experiences.filter((e) => e.is_published);
  const isBn = language === 'bn';

  return (
    <section id="experience" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            {t('experience.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('experience.headline')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {published.map((exp) => (
            <div
              key={exp.id}
              className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl relative overflow-hidden"
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-2xl font-bold text-white">
                      {isBn ? 'সেলস অফিসার' : 'Sales Officer'}
                    </h3>
                    <span className="text-slate-500 hidden sm:inline">·</span>
                    <span className="text-lg font-semibold text-cyan-400">
                      {isBn ? 'এফএমসিজি সেলস অপারেশনস' : 'FMCG Sales Experience'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {isBn ? 'ঢাকা উত্তর সেলস টেরিটরি' : 'Dhaka North sales territory'}
                    </span>
                    <span>·</span>
                    <span className="font-mono text-cyan-400 font-semibold">
                      {isBn ? '৬+ বছরের এফএমসিজি সেলস অভিজ্ঞতা' : '6+ years of FMCG sales experience'}
                    </span>
                  </div>
                </div>

                {/* 3x First-Place Achievement Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-950/60 border border-purple-500/40 rounded-xl text-purple-300 text-xs font-semibold self-start shrink-0">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>
                    {isBn
                      ? 'নতুন পণ্য বিক্রয়ে তিনবার প্রথম স্থান অর্জন'
                      : 'Three-time first-place achievement in new product sales'}
                  </span>
                </div>
              </div>

              {/* 4 Verified Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isBn ? 'বার্ষিক প্রবৃদ্ধি' : 'Annual Growth'}</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">{isBn ? 'প্রায় ৯%' : 'Approximately 9%'}</div>
                  <span className="text-[11px] text-slate-400">{isBn ? 'বার্ষিক ব্যবসায়িক প্রবৃদ্ধি' : 'Yearly business growth'}</span>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isBn ? 'লক্ষ্য অর্জন' : 'Target Attainment'}</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">{isBn ? 'প্রায় ১০০%' : 'Approximately 100%'}</div>
                  <span className="text-[11px] text-slate-400">{isBn ? 'গড় লক্ষ্যমাত্রা অর্জন' : 'Average target achievement'}</span>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Building className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isBn ? 'ডিস্ট্রিবিউটর' : 'Distributor'}</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">{isBn ? '১টি ডিস্ট্রিবিউটর' : 'Managed 1 Distributor'}</div>
                  <span className="text-[11px] text-slate-400">{isBn ? 'ঢাকা উত্তর সেলস টেরিটরি' : 'Dhaka North sales territory'}</span>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isBn ? 'টিম ম্যানেজমেন্ট' : 'Team Management'}</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">{isBn ? '৫ জন ভ্যান চালক' : '5 Van Pullers'}</div>
                  <span className="text-[11px] text-slate-400">{isBn ? 'সেকেন্ডারি রিটেইল মার্কেট বাস্তবায়ন' : 'Secondary market retail execution'}</span>
                </div>
              </div>

              {/* Verified Details Bullet List */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  {isBn ? 'যাচাইকৃত অপারেশনাল অর্জন ও দায়িত্বসমূহ:' : 'Verified Operational Scope & Milestones:'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{isBn ? '৬+ বছরের এফএমসিজি সেলস অভিজ্ঞতা।' : '6+ years of FMCG sales experience.'}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{isBn ? 'ঢাকা উত্তর সেলস টেরিটরিতে সেলস অফিসার হিসেবে দায়িত্ব পালন।' : 'Sales Officer in Dhaka North sales territory.'}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{isBn ? '১টি ডিস্ট্রিবিউটর সরাসরি পরিচালনা।' : 'Managed one distributor.'}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{isBn ? '৫ জন ভ্যান চালক তদারকি ও রুট ম্যানেজমেন্ট।' : 'Experience managing five van pullers.'}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{isBn ? 'প্রায় ৯% বার্ষিক ব্যবসায়িক প্রবৃদ্ধি অর্জন।' : 'Approximately 9% yearly business growth.'}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{isBn ? 'প্রায় ১০০% গড় লক্ষ্যমাত্রা ধারাবাহিক অর্জন।' : 'Approximately 100% average target achievement.'}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 md:col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{isBn ? 'নতুন পণ্য বিক্রয়ে তিনবার প্রথম স্থান অর্জন।' : 'Three-time first-place achievement in new product sales.'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
