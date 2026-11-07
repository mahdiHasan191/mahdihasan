import React, { useEffect } from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Backdrop Click */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Content Container */}
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border ${
                project.category === 'Completed'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              }`}
            >
              {project.category} Project
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400 font-mono">Case Study</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Project Preview Image */}
          {project.image_url && (
            <div className="rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-950 max-h-80 w-full">
              <img
                src={project.image_url}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-slate-300 leading-relaxed">
              {project.full_description || project.short_description}
            </p>
          </div>

          {/* Deep Breakdown: Challenge, Solution, Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {project.challenge && (
              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Bottleneck</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{project.challenge}</p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>The Automation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
              </div>
            )}

            {project.outcome && (
              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Measurable Impact</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{project.outcome}</p>
              </div>
            )}
          </div>

          {/* Tech Stack Chips */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                Technologies & Protocols:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-800 text-slate-200 text-xs font-mono rounded-lg border border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code / GitHub</span>
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Repository / Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
