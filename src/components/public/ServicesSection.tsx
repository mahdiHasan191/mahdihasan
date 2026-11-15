import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Bot,
  Target,
  BarChart3,
  Mail,
  Cpu,
  Megaphone,
  Search,
  Share2,
  TrendingUp,
  Layers,
  FileText,
  Zap,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { WorkflowIconNode } from '../common/WorkflowIconNode';

// Icon mapper for dynamic service cards
const iconMap: Record<string, React.ElementType> = {
  Bot,
  Target,
  BarChart3,
  Mail,
  Cpu,
  Megaphone,
  Search,
  Share2,
  TrendingUp,
  Layers,
  FileText,
  Zap,
};

export const ServicesSection: React.FC = () => {
  const { services } = useData();
  const { scrollToSection } = useNavigation();
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Filter only published services
  const publishedServices = services.filter((s) => s.is_published);
  const categories = ['All', 'AI & Automation', 'Digital Marketing', 'Sales Operations'];

  const filtered =
    filterCategory === 'All'
      ? publishedServices
      : publishedServices.filter((s) => s.category === filterCategory);

  const totalItems = filtered.length;

  // Reset index on filter change
  const handleCategoryChange = (cat: string) => {
    setFilterCategory(cat);
    setCurrentIndex(0);
  };

  // Responsive itemsPerView
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(totalItems >= 2 ? 2 : 1);
      } else {
        setItemsPerView(totalItems >= 3 ? 3 : (totalItems >= 2 ? 2 : 1));
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [totalItems]);

  // Infinite display list (tripled for continuous seamless auto-slide)
  const displayList =
    totalItems > 1 ? [...filtered, ...filtered, ...filtered] : filtered;

  // Auto-slide effect (every 3.5s when not paused)
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3500);

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

  const handleInquire = (serviceTitle: string) => {
    window.dispatchEvent(
      new CustomEvent('prefill-service-inquiry', { detail: { service: serviceTitle } })
    );
    scrollToSection('contact');
  };

  return (
    <section id="services" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2 flex items-center gap-2">
              <span>{t('services.kicker')}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-full animate-pulse">
                Auto-Slide Active
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight pb-0.5 animate-section-heading">
              {t('services.headline')}
            </h2>
            <div className="relative w-24 sm:w-32 h-[3px] rounded-full bg-slate-800/90 overflow-hidden mt-2">
              <div className="animate-heading-beam w-12 h-full bg-gradient-to-r from-transparent via-cyan-400 to-emerald-400" />
            </div>
            <p className="mt-3 text-base text-slate-300 max-w-2xl">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Interactive Category Filter and Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`btn-glow-soft px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    filterCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Carousel Navigation Controls */}
            {totalItems > 1 && (
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
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
                  aria-label="Previous service"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="btn-glow-soft p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Next service"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sliding Services Carousel */}
        {totalItems === 0 ? (
          <div className="p-12 bg-slate-900/50 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
            No services found under this category.
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
              {displayList.map((service, idx) => {
                const IconComponent = iconMap[service.icon_name] || Bot;

                return (
                  <div
                    key={`${service.id}-${idx}`}
                    className="px-3 shrink-0 flex"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="w-full group relative flex flex-col justify-between p-6 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20">
                      <div>
                        {/* Category tag & Animated Workflow Icon */}
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <WorkflowIconNode icon={IconComponent} delayIndex={idx} tone="cyan" />
                          <span className="text-xs font-mono text-slate-400">
                            {service.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3">
                          {service.description}
                        </p>

                        {/* Deliverables List */}
                        {service.deliverables && service.deliverables.length > 0 && (
                          <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                              Key Deliverables:
                            </span>
                            {service.deliverables.slice(0, 3).map((item, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Card Actions */}
                      <div className="pt-4 border-t border-slate-800/60 mt-auto flex items-center justify-between gap-3">
                        <button
                          onClick={() => handleInquire(service.title)}
                          className="btn-lighting inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-400 text-xs font-semibold text-cyan-300 hover:text-slate-950 border border-cyan-500/35 transition-all"
                        >
                          <span>Request Proposal</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        {service.link_url && (
                          <a
                            href={service.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-lighting inline-flex items-center gap-1 text-[11px] font-mono text-cyan-300 hover:text-white bg-cyan-950/70 hover:bg-cyan-900 px-2.5 py-1 rounded-lg border border-cyan-500/40 transition-colors"
                            title="Open service link"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Dot Indicators */}
            {totalItems > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-8">
                {filtered.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex % totalItems === idx
                        ? 'w-6 bg-cyan-400'
                        : 'w-1.5 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to service ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
