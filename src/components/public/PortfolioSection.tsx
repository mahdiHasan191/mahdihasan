import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Project } from '../../types';
import { ProjectModal } from './ProjectModal';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  Clock,
} from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { projects } = useData();
  const { navigateTo } = useNavigation();
  const { t, formatNumber, language } = useLanguage();
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Learning'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'overview' | 'demo'>('overview');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  const touchStartX = useRef<number | null>(null);

  const isBn = language === 'bn';
  const publishedProjects = projects.filter((p) => p.is_published);

  const filtered =
    filter === 'All'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === filter);

  const totalItems = filtered.length;

  const handleFilterChange = (f: 'All' | 'Completed' | 'Learning') => {
    setFilter(f);
    setCurrentIndex(0);
  };

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(totalItems >= 3 ? 2 : 1);
      } else if (width < 1280) {
        setItemsPerView(totalItems >= 4 ? 3 : totalItems >= 2 ? 2 : 1);
      } else {
        setItemsPerView(totalItems >= 5 ? 4 : totalItems >= 4 ? 3 : totalItems >= 2 ? 2 : 1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [totalItems]);

  const displayList = totalItems > 1 ? [...filtered, ...filtered, ...filtered] : filtered;

  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3400);

    return () => clearInterval(timer);
  }, [isPaused, totalItems]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

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

  const openProjectModal = (project: Project, tab: 'overview' | 'demo') => {
    setModalInitialTab(tab);
    setSelectedProject(project);
  };

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-20 bg-slate-950 border-t border-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-1.5 flex items-center gap-2">
              <span>{t('portfolio.kicker', '03. Featured Case Studies & Workflows')}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                Workflow Diagrams &amp; Demos
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight pb-0.5 animate-section-heading">
              {t('portfolio.headline', 'Applied AI & Automation Case Studies')}
            </h2>
            <div className="relative w-24 sm:w-32 h-[3px] rounded-full bg-slate-800/90 overflow-hidden mt-2">
              <div className="animate-heading-beam w-12 h-full bg-gradient-to-r from-transparent via-cyan-400 to-emerald-400" />
            </div>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              {t(
                'portfolio.subtitle',
                'Realistic blueprints for FMCG sales reporting, lead capture & follow-up, and MCP business assistants — transparently marked as Sample Project or Expected Workflow.'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => handleFilterChange('All')}
                className={`btn-glow-soft px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  filter === 'All'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {t('portfolio.filter_all', 'All')} ({formatNumber(publishedProjects.length)})
              </button>
              <button
                onClick={() => handleFilterChange('Completed')}
                className={`btn-glow-soft px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  filter === 'Completed'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {t('portfolio.filter_completed', 'Workflows')} (
                {formatNumber(publishedProjects.filter((p) => p.category === 'Completed').length)})
              </button>
              <button
                onClick={() => handleFilterChange('Learning')}
                className={`btn-glow-soft px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  filter === 'Learning'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {t('portfolio.filter_learning', 'R&D')} (
                {formatNumber(publishedProjects.filter((p) => p.category === 'Learning').length)})
              </button>
            </div>

            {totalItems > 1 && (
              <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="btn-glow-soft p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 transition-colors"
                  title={isPaused ? 'Resume auto-slide' : 'Pause auto-slide'}
                  aria-label="Toggle auto-slide"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5 text-cyan-400" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handlePrev}
                  className="btn-glow-soft p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="btn-glow-soft p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => navigateTo('case_studies')}
              className="btn-glow-soft inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 rounded-xl transition-colors"
            >
              <span>Full Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Square Sliding Projects Carousel */}
        {totalItems === 0 ? (
          <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
            No case studies found under this category.
          </div>
        ) : (
          <div
            className="relative overflow-hidden py-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={{
                transform: `translate3d(-${currentIndex * (100 / itemsPerView)}%, 0, 0)`,
              }}
            >
              {displayList.map((project, idx) => (
                <div
                  key={`${project.id}-${idx}`}
                  className="px-2 shrink-0 flex justify-center"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div
                    onClick={() => openProjectModal(project, 'demo')}
                    className="w-full max-w-[300px] sm:max-w-none aspect-square group cursor-pointer flex flex-col justify-between bg-slate-900/75 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30"
                  >
                    <div className="relative h-[45%] w-full overflow-hidden bg-slate-950 shrink-0">
                      <img
                        src={project.image_url}
                        alt={`${project.title} automation workflow diagram preview`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

                      {/* Honest Status Badge */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span
                          className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border backdrop-blur-md ${
                            project.category === 'Completed'
                              ? 'bg-emerald-950/85 text-emerald-300 border-emerald-500/40'
                              : 'bg-purple-950/85 text-purple-300 border-purple-500/40'
                          }`}
                        >
                          {project.result_label || project.category}
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                        {(project.link_url || project.live_url) && (
                          <a
                            href={project.link_url || project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Open direct project link"
                            className="btn-glow-soft p-1 bg-slate-950/85 hover:bg-cyan-500 hover:text-slate-950 rounded-md text-cyan-400 transition-colors border border-cyan-500/30 shadow"
                          >
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-3 sm:p-3.5 flex-1 min-h-0 flex flex-col justify-between gap-2">
                      <div className="min-h-0">
                        <div className="flex items-center justify-between gap-1.5 text-[10px] text-slate-400 mb-1 font-mono">
                          <span className="truncate text-cyan-400 font-semibold">
                            {project.tech_stack?.slice(0, 2).join(' · ') || 'Automation'}
                          </span>
                          {project.time_saved && (
                            <span className="inline-flex items-center gap-1 text-emerald-300 shrink-0">
                              <Clock className="w-2.5 h-2.5" />
                              <span className="truncate max-w-[90px]">{project.time_saved}</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-cyan-300 transition-colors mb-1 line-clamp-1">
                          {project.title}
                        </h3>

                        <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-snug">
                          {project.short_description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectModal(project, 'demo');
                          }}
                          className="btn-lighting inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-400 text-cyan-300 hover:text-slate-950 border border-cyan-400/50 text-[11px] font-semibold transition-all"
                        >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>{isBn ? 'ডেমো ডায়াগ্রাম' : 'Workflow Demo'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectModal(project, 'overview');
                          }}
                          className="btn-glow-soft px-2 py-1 rounded-md text-[11px] font-semibold text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                        >
                          {isBn ? 'কেস স্টাডি →' : 'Case Study →'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalItems > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-5">
                {filtered.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex % totalItems === idx
                        ? 'w-6 bg-cyan-400'
                        : 'w-1.5 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <ProjectModal
          project={selectedProject}
          initialTab={modalInitialTab}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
