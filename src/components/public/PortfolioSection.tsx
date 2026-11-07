import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Code, Sparkles, CheckCircle2 } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { projects } = useData();
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Learning'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const publishedProjects = projects.filter((p) => p.is_published);

  const filtered = filter === 'All'
    ? publishedProjects
    : publishedProjects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
              03. Featured Automations & Implementations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Agents, Pipelines & Data Automation Systems
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-2xl">
              Every project represents a battle-tested automation engineered to solve real enterprise bottlenecks, eliminate manual data entry, and streamline operations.
            </p>
          </div>

          {/* Interactive Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setFilter('All')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'All'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              All ({publishedProjects.length})
            </button>
            <button
              onClick={() => setFilter('Completed')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'Completed'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Completed ({publishedProjects.filter((p) => p.category === 'Completed').length})
            </button>
            <button
              onClick={() => setFilter('Learning')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'Learning'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Learning ({publishedProjects.filter((p) => p.category === 'Learning').length})
            </button>
          </div>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => {
            const isFeatured = project.is_featured && index === 0;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/20 ${
                  isFeatured ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Project Image Showcase */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Status Indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border backdrop-blur-md ${
                        project.category === 'Completed'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                      }`}
                    >
                      {project.category === 'Completed' ? 'Completed Project' : 'Learning Project'}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 p-2 bg-slate-950/80 rounded-lg text-slate-300 group-hover:text-cyan-400 group-hover:bg-slate-900 transition-colors border border-slate-800">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono">
                      <span>{project.category} Project</span>
                      <span>·</span>
                      <span>{project.tech_stack?.[0] || 'Automation'}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Tech stack footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech_stack?.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.tech_stack?.length || 0) > 3 && (
                        <span className="text-[11px] font-mono text-slate-400 self-center">
                          +{project.tech_stack.length - 3} more
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-semibold text-cyan-400 group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Modal Dialog */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
