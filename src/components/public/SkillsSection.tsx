import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Bot, Target, Briefcase, Megaphone, Check } from 'lucide-react';
import { SkillCategory } from '../../types';

interface CategoryConfig {
  title: SkillCategory;
  description: string;
  icon: React.ElementType;
  accent: string;
  badgeBorder: string;
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    title: 'AI Automation',
    description: 'n8n workflows, Model Context Protocol (MCP), and API event bridges.',
    icon: Bot,
    accent: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/30',
  },
  {
    title: 'Lead Generation',
    description: 'Targeted web scraping with Apify, prospect collection, and data processing.',
    icon: Target,
    accent: 'text-purple-400',
    badgeBorder: 'border-purple-500/30 text-purple-300 bg-purple-950/30',
  },
  {
    title: 'Sales',
    description: '6+ years FMCG sales, distributor management, and daily sales reporting.',
    icon: Briefcase,
    accent: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/30',
  },
  {
    title: 'Digital Marketing',
    description: 'Search marketing, paid social advertising, content, and marketing automation.',
    icon: Megaphone,
    accent: 'text-purple-400',
    badgeBorder: 'border-purple-500/30 text-purple-300 bg-purple-950/30',
  },
];

export const SkillsSection: React.FC = () => {
  const { skills } = useData();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const published = skills.filter((s) => s.is_published);

  const displayedCategories = selectedFilter === 'All'
    ? CATEGORY_CONFIGS
    : CATEGORY_CONFIGS.filter((c) => c.title === selectedFilter);

  return (
    <section id="skills" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
              05. Core Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills & Operational Capabilities
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-2xl">
              Practical capabilities structured across AI automation, lead generation, on-ground sales execution, and digital growth marketing.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            {['All', 'AI Automation', 'Lead Generation', 'Sales', 'Digital Marketing'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedFilter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Categorized Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedCategories.map((catConfig) => {
            const Icon = catConfig.icon;
            const categorySkills = published.filter((s) => s.category === catConfig.title);

            return (
              <div
                key={catConfig.title}
                className="p-8 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 rounded-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{catConfig.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{catConfig.description}</p>
                    </div>
                  </div>

                  {/* Skills List within Category (Zero fake percentages) */}
                  <div className="space-y-4 pt-4 border-t border-slate-800/80">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-2 hover:border-slate-700/80 transition-colors"
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
                            {skill.tools.map((tool, idx) => (
                              <span
                                key={idx}
                                className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
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

                <div className="pt-6 border-t border-slate-800/60 mt-6 flex items-center justify-between text-xs text-slate-400">
                  <span>{categorySkills.length} Capabilities Documented</span>
                  <span className="font-mono text-cyan-400">Verified Skillset</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
