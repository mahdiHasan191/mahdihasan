import React, { useEffect, useState } from 'react';
import { Project } from '../../types';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Play,
  RotateCcw,
  Cpu,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  initialTab?: 'overview' | 'demo';
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  initialTab = 'overview',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'demo'>(initialTab);
  const [demoStep, setDemoStep] = useState<number>(3);
  const [isRunningDemo, setIsRunningDemo] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, project]);

  const runLiveDemo = () => {
    setIsRunningDemo(true);
    setDemoStep(0);
    setTimeout(() => setDemoStep(1), 450);
    setTimeout(() => setDemoStep(2), 1050);
    setTimeout(() => {
      setDemoStep(3);
      setIsRunningDemo(false);
    }, 1650);
  };

  useEffect(() => {
    if (project && activeTab === 'demo') {
      runLiveDemo();
    }
  }, [project, activeTab]);

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

  const externalDemoUrl = project.link_url || project.live_url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Backdrop Click */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Content Container */}
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header with Case Study / Live Demo Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border ${
                project.category === 'Completed'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              }`}
            >
              {project.category}
            </span>

            <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`btn-glow-soft px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'overview'
                    ? 'bg-slate-800 text-white border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Case Study
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('demo')}
                className={`btn-lighting inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'demo'
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/50'
                    : 'text-slate-300 hover:text-cyan-300 border border-cyan-500/20'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Live Demo</span>
              </button>
            </div>
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
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto">
          {activeTab === 'demo' ? (
            /* ================= INTERACTIVE PROJECT LIVE DEMO TAB ================= */
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    Interactive Automation Preview
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                    {project.title} — Live Demo
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={runLiveDemo}
                  disabled={isRunningDemo}
                  className="btn-lighting inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/50 text-xs font-semibold text-cyan-300 transition-colors disabled:opacity-60 self-start sm:self-auto"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isRunningDemo ? 'animate-spin' : ''}`} />
                  <span>{isRunningDemo ? 'Running Workflow...' : 'Run Demo Again'}</span>
                </button>
              </div>

              {/* Interactive 3-Step Visual Workflow Simulation */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#070e1d] border border-slate-800 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:14px_14px] space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
                  {/* Step 1: Input Trigger */}
                  <div
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      demoStep >= 1
                        ? 'bg-slate-900/95 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.18)]'
                        : 'bg-slate-950/70 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400">
                        <Zap className="w-3.5 h-3.5" />
                        1. INPUT TRIGGER
                      </span>
                      {demoStep >= 1 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-xs font-semibold text-white mb-1">Source Data / Event</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {project.challenge || project.short_description}
                    </p>
                  </div>

                  {/* Step 2: MH Automation Processing */}
                  <div
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      demoStep >= 2
                        ? 'bg-slate-900/95 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-950/70 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-cyan-400">
                        <Cpu className="w-3.5 h-3.5" />
                        2. AUTOMATION ENGINE
                      </span>
                      {demoStep >= 2 && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-xs font-semibold text-white mb-1">
                      {project.tech_stack?.slice(0, 3).join(' · ') || 'Automated Workflow'}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {project.solution || project.short_description}
                    </p>
                  </div>

                  {/* Step 3: Live Output Result */}
                  <div
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      demoStep >= 3
                        ? 'bg-emerald-950/35 border-emerald-400/60 shadow-[0_0_24px_rgba(52,211,153,0.22)]'
                        : 'bg-slate-950/70 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-300">
                        <Sparkles className="w-3.5 h-3.5" />
                        3. OUTPUT DELIVERED
                      </span>
                      {demoStep >= 3 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-xs font-semibold text-white mb-1">Business Result</p>
                    <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                      {project.outcome || 'Automated output synced and delivered successfully.'}
                    </p>
                  </div>
                </div>

                {/* Live Result Summary Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        demoStep >= 3 ? 'bg-emerald-400' : 'bg-cyan-400 animate-ping'
                      }`}
                    />
                    <span className={demoStep >= 3 ? 'text-emerald-300 font-semibold' : 'text-cyan-300'}>
                      {demoStep === 0 && 'Initializing workflow trigger...'}
                      {demoStep === 1 && 'Capturing source inputs & validating payload...'}
                      {demoStep === 2 && 'Executing MH automation nodes & AI logic...'}
                      {demoStep >= 3 && 'Demo Run Complete — Output Delivered in 1.6s'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Project Image + Direct Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech_stack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-800 text-slate-200 text-[11px] font-mono rounded-lg border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lighting inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-cyan-500/30 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {externalDemoUrl && (
                    <a
                      href={externalDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lighting inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Project Link</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ================= CASE STUDY OVERVIEW TAB ================= */
            <>
              {/* Project Preview Image with Hyperlink */}
              {project.image_url && (
                <div className="rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-950 max-h-72 w-full relative group">
                  {externalDemoUrl ? (
                    <a
                      href={externalDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full cursor-pointer relative"
                      title="Click image to open project link"
                    >
                      <img
                        src={project.image_url}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-semibold text-white">
                        <span>Open Project Link</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                  ) : (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>
              )}

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
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

              {/* External & Demo Links */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('demo')}
                  className="btn-lighting inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Interactive Demo</span>
                </button>

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-lighting inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-cyan-500/30 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {externalDemoUrl && (
                  <a
                    href={externalDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-lighting inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900 rounded-xl border border-cyan-500/40 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Project Link</span>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
