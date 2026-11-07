import React from 'react';
import { useData } from '../../context/DataContext';
import { Briefcase, Bot, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { profile } = useData();

  return (
    <section id="about" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            01. Background & Perspective
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Intersection of FMCG Sales & Intelligent Automation.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            I combine 6+ years of on-ground FMCG sales operations, distributor supervision, and retail discipline with practical AI-powered automation and n8n workflows to solve actual operational bottlenecks.
          </p>
        </div>

        {/* Narrative & Dual Pillar Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Ground Experience */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed">
            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <span>6+ Years of FMCG Sales Execution</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                As a Sales Officer in the Dhaka North sales territory, I managed one primary distributor and supervised five van pullers to drive secondary retail distribution. Through disciplined route management and sales execution, I delivered approximately 9% yearly business growth, maintained an approximately 100% average target achievement rate, and earned three-time first-place achievement in new product sales.
              </p>
            </div>

            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <span>AI Automation & Workflow Engineering</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Having experienced the pain of manual end-of-day sales reconciliation, fragmented spreadsheets, and slow lead gathering, I specialize in building practical automations with n8n, Model Context Protocol (MCP), webhooks, and Apify. I build workflows that streamline lead generation, automate sales reporting, and eliminate repetitive tasks across business systems.
              </p>
            </div>

            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Academic Business Foundation</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Holding both a Bachelor of Business Administration (BBA) and a Master of Business Administration (MBA), my technical workflows and commercial strategies are rooted in solid business principles, strategic planning, and operational feasibility.
              </p>
            </div>
          </div>

          {/* Right Column: Verified Snapshot & Principles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-5">
                Verified Sales Leadership Highlights
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Dhaka North Sales Territory</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Managed primary distributor relationship and retail market operations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Distributor & Van Puller Team Supervision</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Managed one distributor and supervised five van pullers for secondary sales.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">Consistent High-Performance Target Delivery</h5>
                    <p className="text-xs text-slate-400 mt-0.5">~100% average target attainment with ~9% annual business growth.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white">3x First-Place in New Product Sales</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Top-tier execution and market penetration during brand launches.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Snapshot */}
            <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Current Title</span>
                <span className="font-semibold text-white">{profile.title}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Location</span>
                <span className="font-semibold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {profile.location}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Education</span>
                <span className="font-semibold text-white font-mono">BBA + MBA</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Core Specialty</span>
                <span className="font-semibold text-cyan-400">FMCG Sales + AI Automation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
