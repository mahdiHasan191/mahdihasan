import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Award, Eye, X, ZoomIn, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { Achievement } from '../../types';

export const AchievementGallery: React.FC = () => {
  const { achievements } = useData();
  const { t, language } = useLanguage();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isBn = language === 'bn';

  const publishedAchievements = achievements.filter((a) => a.is_published);

  // Derive categories
  const categories = ['all', ...Array.from(new Set(publishedAchievements.map((a) => a.category)))];

  const filteredAchievements =
    activeCategory === 'all'
      ? publishedAchievements
      : publishedAchievements.filter((a) => a.category === activeCategory);

  return (
    <section id="achievements" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
              {t('achievements.kicker')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('achievements.headline')}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {t('achievements.subtitle')}
            </p>
          </div>

          {/* Category Filter Pills (if multiple categories) */}
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-2 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    activeCategory === cat
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat === 'all' ? t('achievements.all_categories') : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        {filteredAchievements.length === 0 ? (
          <div className="p-12 bg-slate-900/50 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
            No achievement records currently published.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((item) => (
              <div
                key={item.id}
                className="group bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-cyan-950/20"
              >
                {/* Image Container with Hover Overlay */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => setSelectedAchievement(item)}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-mono px-2.5 py-1 bg-slate-950/90 text-cyan-300 border border-slate-800 rounded-md backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Inspection Trigger on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/40">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900/95 border border-cyan-500/50 rounded-lg text-xs font-semibold text-cyan-300 shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>View Full Award</span>
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono text-cyan-400/90">{item.date}</span>
                      <div className="flex items-center gap-1 text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-mono">Verified Record</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedAchievement(item)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5 transform duration-150"
                    >
                      <span>Inspect Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono text-slate-500">Dhaka North Territory</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Modal for Inspection */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl shadow-black/80 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  {selectedAchievement.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Box */}
            <div className="relative bg-slate-950 max-h-[50vh] overflow-hidden flex items-center justify-center p-2">
              <img
                src={selectedAchievement.image_url}
                alt={selectedAchievement.title}
                className="max-h-[48vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* Modal Details */}
            <div className="p-6 space-y-3 bg-slate-900">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {selectedAchievement.title}
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/60 shrink-0">
                  {selectedAchievement.date}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedAchievement.description}
              </p>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Professional Milestone · FMCG Sales Operations</span>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
