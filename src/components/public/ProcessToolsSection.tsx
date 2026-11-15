import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  Compass,
  Workflow,
  Headphones,
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Bot,
  FileSpreadsheet,
  PlugZap,
} from 'lucide-react';

export const ProcessToolsSection: React.FC = () => {
  const { scrollToSection, navigateTo } = useNavigation();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const steps = [
    {
      step: '01',
      title: 'Discover',
      subtitle: isBn ? 'সমস্যা ও ওয়ার্কফ্লো অডিট' : 'Audit Bottlenecks',
      desc: 'Review daily sales sheets, lead capture sources, WhatsApp inquiries, and manual reporting steps to pinpoint highest-ROI automation wins.',
      icon: Search,
      accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
    },
    {
      step: '02',
      title: 'Design',
      subtitle: isBn ? 'আর্কিটেকচার ও প্ল্যান' : 'Map Architecture',
      desc: 'Blueprint clean n8n node logic, AI prompts, database schemas, and fallback error alerts before writing production workflows.',
      icon: Compass,
      accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
    },
    {
      step: '03',
      title: 'Automate',
      subtitle: isBn ? 'বিল্ড ও টেস্ট' : 'Build & Integrate',
      desc: 'Connect CRM, Google Sheets, WhatsApp, Gmail, and AI Agents with MCP/APIs and test against realistic distributor and customer payloads.',
      icon: Workflow,
      accent: 'text-purple-400 border-purple-500/30 bg-purple-950/30',
    },
    {
      step: '04',
      title: 'Support',
      subtitle: isBn ? 'ডকুমেন্টেশন ও সাপোর্ট' : 'Handover & Care',
      desc: 'Provide team walkthroughs, SOP documentation, monitoring notifications, and ongoing optimization as sales operations scale.',
      icon: Headphones,
      accent: 'text-amber-400 border-amber-500/30 bg-amber-950/30',
    },
  ];

  const tools = [
    {
      name: 'n8n',
      role: 'Workflow Orchestration',
      desc: 'Event triggers, webhooks, API chaining, and scheduled automation runs.',
      icon: Workflow,
      color: 'text-cyan-400',
    },
    {
      name: 'AI Models',
      role: 'OpenAI · Gemini',
      desc: 'Lead qualification, reply drafting, structured JSON data extraction.',
      icon: Bot,
      color: 'text-emerald-400',
    },
    {
      name: 'MCP',
      role: 'Model Context Protocol',
      desc: 'Safe AI agent tool-calling connected directly to internal business data.',
      icon: Cpu,
      color: 'text-purple-400',
    },
    {
      name: 'Supabase',
      role: 'PostgreSQL & Auth',
      desc: 'Central lead repository, inquiry tracking, and role-protected dashboards.',
      icon: Database,
      color: 'text-cyan-300',
    },
    {
      name: 'REST APIs',
      role: 'Webhooks & Connectors',
      desc: 'Reliable synchronization across WhatsApp, Gmail, CRMs, and ERP endpoints.',
      icon: PlugZap,
      color: 'text-blue-400',
    },
    {
      name: 'Sheets & Python',
      role: 'Data Cleaning & Reporting',
      desc: 'Automated FMCG distributor primary/secondary stock and target reconciliation.',
      icon: FileSpreadsheet,
      color: 'text-emerald-300',
    },
  ];

  return (
    <section
      id="process"
      className="py-20 bg-slate-950 border-t border-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Work Process Row */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
                {isBn ? 'কাজের পদ্ধতি ও ডেলিভারি ফ্লো' : 'How I Deliver Results'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight pb-0.5 animate-section-heading">
                Work Process: Discover → Design → Automate → Support
              </h2>
              <div className="relative w-24 sm:w-32 h-[3px] rounded-full bg-slate-800/90 overflow-hidden mt-2">
                <div className="animate-heading-beam w-12 h-full bg-gradient-to-r from-transparent via-cyan-400 to-emerald-400" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl">
                Every workflow starts from commercial reality on the sales floor — zero bloated complexity, built so your team can rely on it every day.
              </p>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="btn-lighting inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all shrink-0 self-start md:self-auto"
            >
              <span>Start Your Automation Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-5 bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${item.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      STEP {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-xs font-mono text-cyan-400 mb-2">{item.subtitle}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Automation Stack */}
        <div className="pt-8 border-t border-slate-900">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Production Tooling &amp; Integrations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Core Automation &amp; Data Stack
              </h2>
            </div>

            <button
              onClick={() => navigateTo('about')}
              className="btn-glow-soft inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 rounded-xl transition-colors self-start md:self-auto"
            >
              <span>Read Full Story &amp; FMCG Background</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="p-4 bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 rounded-xl flex items-start gap-3.5 transition-colors"
                >
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl shrink-0">
                    <Icon className={`w-5 h-5 ${tool.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{tool.name}</h3>
                      <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">
                        {tool.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
