import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Bot,
  Target,
  Briefcase,
  Megaphone,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { SkillCategory } from '../../types';
import { WorkflowIconNode } from '../common/WorkflowIconNode';

interface CategoryConfig {
  title: SkillCategory;
  translationKey: string;
  descKey: string;
  defaultDesc: string;
  icon: React.ElementType;
  accent: string;
  badgeBorder: string;
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    title: 'AI Automation',
    translationKey: 'skills.cat_ai',
    descKey: 'skills.cat_ai_desc',
    defaultDesc: 'n8n workflows, Model Context Protocol (MCP), and API event bridges.',
    icon: Bot,
    accent: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/30',
  },
  {
    title: 'Lead Generation',
    translationKey: 'skills.cat_lead',
    descKey: 'skills.cat_lead_desc',
    defaultDesc: 'Targeted web scraping with Apify, prospect collection, and data processing.',
    icon: Target,
    accent: 'text-purple-400',
    badgeBorder: 'border-purple-500/30 text-purple-300 bg-purple-950/30',
  },
  {
    title: 'Sales',
    translationKey: 'skills.cat_sales',
    descKey: 'skills.cat_sales_desc',
    defaultDesc: '6+ years FMCG sales, distributor management, and daily sales reporting.',
    icon: Briefcase,
    accent: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/30',
  },
  {
    title: 'Digital Marketing',
    translationKey: 'skills.cat_marketing',
    descKey: 'skills.cat_marketing_desc',
    defaultDesc: 'Search marketing, paid social advertising, content, and marketing automation.',
    icon: Megaphone,
    accent: 'text-purple-400',
    badgeBorder: 'border-purple-500/30 text-purple-300 bg-purple-950/30',
  },
];

export const SkillsSection: React.FC = () => {
  const { skills } = useData();
  const { t, formatNumber, language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(2);
  const touchStartX = useRef<number | null>(null);

  const published = skills.filter((s) => s.is_published);

  const displayedCategories =
    selectedFilter === 'All'
      ? CATEGORY_CONFIGS
      : CATEGORY_CONFIGS.filter((c) => c.title === selectedFilter);

  const totalItems = displayedCategories.length;

  const filterOptions: { key: string; label: string }[] = [
    { key: 'All', label: t('portfolio.filter_all', 'All') },
    { key: 'AI Automation', label: t('skills.cat_ai', 'AI Automation') },
    { key: 'Lead Generation', label: t('skills.cat_lead', 'Lead Generation') },
    { key: 'Sales', label: t('skills.cat_sales', 'Sales') },
    { key: 'Digital Marketing', label: t('skills.cat_marketing', 'Digital Marketing') },
  ];

  const handleFilterChange = (key: string) => {
    setSelectedFilter(key);
    setCurrentIndex(0);
  };

  // Responsive itemsPerView
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1);
      } else {
        setItemsPerView(totalItems >= 2 ? 2 : 1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [totalItems]);

  // Infinite display list (tripled for continuous seamless auto-slide)
  const displayList =
    totalItems > 1
      ? [...displayedCategories, ...displayedCategories, ...displayedCategories]
      : displayedCategories;

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

  return (
    <section id="skills" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2 flex items-center gap-2">
              <span>{t('skills.kicker', '06. Technical & Operational Toolkit')}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-full animate-pulse">
                Auto-Slide Active
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight pb-0.5 animate-section-heading">
              {t('skills.headline', 'Core Skills & Domain Expertise')}
            </h2>
            <div className="relative w-24 sm:w-32 h-[3px] rounded-full bg-slate-800/90 overflow-hidden mt-2">
              <div className="animate-heading-beam w-12 h-full bg-gradient-to-r from-transparent via-cyan-400 to-purple-400" />
            </div>
            <p className="mt-3 text-base text-slate-300 max-w-2xl">
              {t(
                'skills.subtitle',
                'Categorized competencies combining modern AI automation with practical FMCG sales execution and performance marketing.'
              )}
            </p>
          </div>

          {/* Category Filter Controls and Navigation */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              {filterOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleFilterChange(opt.key)}
                  className={`btn-glow-soft px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    selectedFilter === opt.key
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Navigation Controls */}
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
                  aria-label="Previous skill domain"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="btn-glow-soft p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Next skill domain"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sliding Skills Domains Carousel */}
        {totalItems === 0 ? (
          <div className="p-12 bg-slate-900/50 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
            No capabilities found under this category.
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
              {displayList.map((catConfig, idx) => {
                const Icon = catConfig.icon;
                const categorySkills = published.filter((s) => s.category === catConfig.title);

                return (
                  <div
                    key={`${catConfig.title}-${idx}`}
                    className="px-3 shrink-0 flex"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="w-full p-6 sm:p-8 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/20">
                      <div>
                        {/* Category Header with Animated Workflow Icon */}
                        <div className="flex items-center gap-3 mb-4">
                          <WorkflowIconNode
                            icon={Icon}
                            delayIndex={idx}
                            tone={idx % 2 === 0 ? 'cyan' : 'purple'}
                            showTrail={false}
                          />
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {t(catConfig.translationKey, catConfig.title)}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">{catConfig.defaultDesc}</p>
                          </div>
                        </div>

                        {/* Skills List within Category */}
                        <div className="space-y-3 pt-4 border-t border-slate-800/80">
                          {categorySkills.map((skill) => (
                            <div
                              key={skill.id}
                              className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-1.5 hover:border-cyan-500/30 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-white flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                  {skill.name}
                                </span>
                              </div>

                              {skill.description && (
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {skill.description}
                                </p>
                              )}

                              {/* Associated tool aspects */}
                              {skill.tools && skill.tools.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {skill.tools.map((tool, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                                    >
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-5 border-t border-slate-800/60 mt-6 flex items-center justify-between text-xs text-slate-400">
                        <span>
                          {formatNumber(categorySkills.length)}{' '}
                          {language === 'bn' ? 'টি দক্ষতা লিপিবদ্ধ' : 'Capabilities Documented'}
                        </span>
                        <span className="font-mono text-cyan-400">
                          {language === 'bn' ? 'যাচাইকৃত দক্ষতা' : 'Verified Skillset'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Dot Indicators */}
            {totalItems > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-8">
                {displayedCategories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex % totalItems === idx
                        ? 'w-6 bg-cyan-400'
                        : 'w-1.5 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to skill domain ${idx + 1}`}
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
