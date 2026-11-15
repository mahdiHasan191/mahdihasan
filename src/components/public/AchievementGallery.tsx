import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Award,
  X,
  ZoomIn,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
} from 'lucide-react';
import { Achievement } from '../../types';

export const AchievementGallery: React.FC = () => {
  const { achievements } = useData();
  const { t } = useLanguage();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(2);
  const touchStartX = useRef<number | null>(null);

  const publishedAchievements = achievements.filter((a) => a.is_published);
  const totalItems = publishedAchievements.length;

  // Responsive itemsPerView - ensures there is ALWAYS movement and sliding
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // 1 card on mobile
      } else if (width < 1024) {
        setItemsPerView(totalItems >= 2 ? 2 : 1);
      } else {
        // Desktop: If 4+ items show 3, if 2 or 3 items show 2 so that it ALWAYS auto-slides!
        setItemsPerView(totalItems >= 4 ? 3 : (totalItems >= 2 ? 2 : 1));
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [totalItems]);

  // Infinite display list (tripled so it loops continuously with no empty gaps)
  const displayList =
    totalItems > 1
      ? [...publishedAchievements, ...publishedAchievements, ...publishedAchievements]
      : publishedAchievements;

  // Auto-slide effect (always slides every 3 seconds if totalItems > 1 and not paused)
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, totalItems]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  // Mobile touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="achievements" className="py-20 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-1.5 flex items-center gap-2">
              <span>{t('achievements.kicker')}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-full animate-pulse">
                Auto-Sliding Gallery
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {t('achievements.headline')}
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              {t('achievements.subtitle')}
            </p>
          </div>

          {/* Controls: Prev, Play/Pause, Next */}
          {totalItems > 1 && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="btn-glow-soft p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-colors"
                title={isPaused ? 'Resume auto-slide' : 'Pause auto-slide'}
                aria-label="Toggle auto-slide"
              >
                {isPaused ? <Play className="w-4 h-4 text-cyan-400" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                onClick={handlePrev}
                className="btn-glow-soft p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400/60 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="btn-glow-soft p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400/60 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sliding Carousel Viewport */}
        {totalItems === 0 ? (
          <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
            No achievement records currently published.
          </div>
        ) : (
          <div
            className="relative overflow-hidden py-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sliding Track */}
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={{
                transform: `translate3d(-${currentIndex * (100 / itemsPerView)}%, 0, 0)`,
              }}
            >
              {displayList.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="px-2.5 shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  {/* Compact Card: Image + Heading */}
                  <div className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-cyan-950/30 h-full">
                    {/* Compact Image Container */}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-950/90 text-cyan-300 border border-slate-800 rounded backdrop-blur-sm truncate max-w-[140px]">
                          {item.category}
                        </span>
                        {item.date && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-950/90 text-slate-300 border border-slate-800 rounded backdrop-blur-sm">
                            {item.date}
                          </span>
                        )}
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/40">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/95 border border-cyan-500/60 rounded-lg text-xs font-semibold text-cyan-300 shadow-md">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>View Full Photo</span>
                        </div>
                      </div>
                    </div>

                    {/* Compact Card Body: Heading and Hyperlink Option */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                      <h3
                        onClick={() => setSelectedAchievement(item)}
                        className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
                        title={item.title}
                      >
                        {item.title}
                      </h3>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedAchievement(item)}
                          className="btn-lighting inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-400 text-[11px] font-semibold text-cyan-300 hover:text-slate-950 border border-cyan-500/30 transition-all"
                        >
                          <span>Inspect</span>
                          <ZoomIn className="w-3 h-3" />
                        </button>

                        {item.link_url && (
                          <a
                            href={item.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Open direct achievement link"
                            className="btn-lighting inline-flex items-center gap-1 text-[10px] font-mono text-cyan-300 hover:text-white bg-cyan-950/70 hover:bg-cyan-900 px-2.5 py-0.5 rounded border border-cyan-500/40 transition-colors"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Dot Indicators */}
            {totalItems > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-6">
                {publishedAchievements.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex % totalItems === idx
                        ? 'w-6 bg-cyan-400'
                        : 'w-1.5 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox / Modal for Full Inspection */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl shadow-black/80 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
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
            <div className="p-5 space-y-3 bg-slate-900">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {selectedAchievement.title}
                </h3>
                {selectedAchievement.date && (
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/60 shrink-0">
                    {selectedAchievement.date}
                  </span>
                )}
              </div>

              {selectedAchievement.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedAchievement.description}
                </p>
              )}

              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Professional Milestone</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedAchievement.link_url && (
                    <a
                      href={selectedAchievement.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lighting px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950 hover:bg-cyan-900 rounded-lg border border-cyan-500/40 inline-flex items-center gap-1"
                    >
                      <span>Visit Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="btn-lighting px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
