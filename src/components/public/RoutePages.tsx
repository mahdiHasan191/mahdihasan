import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { About } from './About';
import { ProcessToolsSection } from './ProcessToolsSection';
import { ContactSection } from './ContactSection';
import { ProjectModal } from './ProjectModal';
import { Project } from '../../types';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Wrench,
  AlertCircle,
  Sparkles,
  Play,
  ShieldCheck,
  FileWarning,
  Home,
  Download,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { profile } = useData();
  const { navigateTo } = useNavigation();

  return (
    <div className="pt-20">
      <section className="py-12 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block">
              About Mahdi Hasan · BBA + MBA · Dhaka, Bangladesh
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bridging 6+ Years of FMCG Sales Operations with Practical AI Automation.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              I combine field-level commercial leadership across Dhaka North distribution with custom n8n workflows, AI agents, and MCP data integrations so small businesses and FMCG teams stop losing hours to manual Excel reporting and slow lead follow-up.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigateTo('contact')}
                className="btn-lighting inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download CV</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <About />
      <ProcessToolsSection />
    </div>
  );
};

interface ServicesHubPageProps {
  variant: 'services' | 'service_ai' | 'service_n8n' | 'service_sales';
}

const SERVICE_PAGE_META = {
  services: {
    kicker: 'Full AI & Sales Operations Catalog',
    h1: 'AI Automation & Sales Operations Services Built for Real Business Bottlenecks.',
    subtitle:
      'Every engagement starts from your business problem, defines exact tools and scope upfront, and delivers maintainable workflows your team controls.',
    filterCategory: null,
  },
  service_ai: {
    kicker: 'Service Specialization · AI Workflows & MCP Agents',
    h1: 'AI Workflow Automation & Custom AI Agent Development.',
    subtitle:
      'Build grounded AI assistants, Model Context Protocol (MCP) tool connectors, and structured inquiry classifiers integrated with your business database.',
    matchIds: ['srv-1', 'srv-3', 'srv-8'],
  },
  service_n8n: {
    kicker: 'Service Specialization · n8n, Webhooks & Customer Follow-up',
    h1: 'n8n Business Workflow & WhatsApp Follow-up Automation.',
    subtitle:
      'Automate lead capture, WhatsApp/Gmail responses, CRM updates, and cross-platform webhook pipelines without expensive recurring SaaS per-seat fees.',
    matchIds: ['srv-2', 'srv-4', 'srv-6', 'srv-8'],
  },
  service_sales: {
    kicker: 'Service Specialization · FMCG Sales Reporting & Dashboards',
    h1: 'FMCG Sales Reporting, Data Cleaning & Business Dashboard Automation.',
    subtitle:
      'Turn daily distributor spreadsheets, van-sales returns, and SKU target logs into clean automated dashboards and exception alerts.',
    matchIds: ['srv-5', 'srv-7'],
  },
};

export const ServicesHubPage: React.FC<ServicesHubPageProps> = ({ variant }) => {
  const { services } = useData();
  const { navigateTo } = useNavigation();

  const meta = SERVICE_PAGE_META[variant];
  const published = services.filter((s) => s.is_published);
  const displayedServices =
    variant === 'services'
      ? published
      : published.filter((s) => (meta as any).matchIds?.includes(s.id));

  const requestService = (title: string) => {
    window.dispatchEvent(
      new CustomEvent('prefill-service-inquiry', { detail: { service: title } })
    );
    navigateTo('contact');
  };

  return (
    <div className="pt-20 bg-slate-950 min-h-screen">
      <section className="py-12 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-4xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block">
              {meta.kicker}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {meta.h1}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{meta.subtitle}</p>
          </div>

          {/* Route switcher pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {(
              [
                ['services', 'All 8 Services'],
                ['service_ai', 'AI & Agents'],
                ['service_n8n', 'n8n & Follow-up'],
                ['service_sales', 'Sales Reporting'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => navigateTo(key)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  variant === key
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60'
                    : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Full Service Cards Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedServices.map((service) => (
            <article
              key={service.id}
              className="p-6 bg-slate-900/65 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl flex flex-col justify-between space-y-5 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 text-cyan-400">
                    <Bot className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>
                  {service.scope && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{service.scope}</span>
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{service.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-3 text-xs">
                  {service.problem && (
                    <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl">
                      <span className="text-[10px] font-mono uppercase text-rose-400 font-semibold block mb-1">
                        Problem Solved
                      </span>
                      <p className="text-slate-300 leading-relaxed">{service.problem}</p>
                    </div>
                  )}
                  {service.solution && (
                    <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block mb-1">
                        Automation Solution
                      </span>
                      <p className="text-slate-300 leading-relaxed">{service.solution}</p>
                    </div>
                  )}
                  {service.expected_result && (
                    <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block mb-1">
                        Expected Result
                      </span>
                      <p className="text-slate-200 leading-relaxed">{service.expected_result}</p>
                    </div>
                  )}
                </div>

                {service.tools && service.tools.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    {service.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 bg-slate-950 border border-slate-800 rounded-md text-[11px] font-mono text-cyan-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {service.deliverables && service.deliverables.length > 0 && (
                  <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => requestService(service.title)}
                  className="btn-lighting inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigateTo('case_studies')}
                  className="text-xs font-mono text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
                >
                  View Related Case Studies
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProcessToolsSection />
    </div>
  );
};

export const CaseStudiesPage: React.FC = () => {
  const { projects } = useData();
  const { navigateTo } = useNavigation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'demo'>('overview');

  const published = projects.filter((p) => p.is_published);

  return (
    <div className="pt-20 bg-slate-950 min-h-screen">
      <section className="py-12 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-4xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block">
              Automation Case Studies &amp; Blueprints
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Realistic Automation Case Studies &amp; Sample Workflow Architectures.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Transparent before-and-after documentation of real operational workflows — every sample project or unmeasured client deployment is clearly labeled as <strong>Sample Project</strong> or <strong>Expected Workflow</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {published.map((project, index) => (
            <article
              key={project.id}
              className="p-6 sm:p-8 bg-slate-900/65 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-colors"
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-950">
                  <img
                    src={project.image_url}
                    alt={`${project.title} workflow preview`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-emerald-950/70 text-emerald-300 border border-emerald-500/35 rounded-lg text-[11px] font-mono font-semibold">
                    {project.result_label || 'Expected Workflow'}
                  </span>
                  {project.time_saved && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-950 text-cyan-300 border border-slate-800 rounded-lg text-[11px] font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{project.time_saved}</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech_stack?.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-xs font-mono text-cyan-400">
                    Case Study #{String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">{project.title}</h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {project.full_description || project.short_description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-950 border border-rose-500/20 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-400 text-[11px] font-mono font-semibold uppercase">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Before Problem</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.challenge}</p>
                  </div>

                  <div className="p-3.5 bg-slate-950 border border-cyan-500/20 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-mono font-semibold uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Automation Built</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
                  </div>

                  <div className="p-3.5 bg-slate-950 border border-emerald-500/20 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono font-semibold uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Expected Outcome</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.outcome}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setModalTab('demo');
                      setSelectedProject(project);
                    }}
                    className="btn-lighting inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Interactive Workflow Diagram</span>
                  </button>
                  <button
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent('prefill-service-inquiry', {
                          detail: { service: project.title },
                        })
                      );
                      navigateTo('contact');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
                  >
                    <span>Build Similar Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        initialTab={modalTab}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="pt-20 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Book an Automation Consultation or Start a Project.
        </h1>
      </div>
      <ContactSection />
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="pt-24 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3 text-cyan-400">
          <ShieldCheck className="w-7 h-7" />
          <span className="text-xs font-mono uppercase tracking-wider">Privacy &amp; Data Handling</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>

        <div className="space-y-5 text-sm text-slate-300 leading-relaxed bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <p>
            This website (<span className="text-cyan-300 font-mono">mahdihasan.pages.dev</span>) is operated by <strong>Mahdi Hasan</strong>, AI Automation &amp; Sales Operations Specialist based in Dhaka, Bangladesh.
          </p>
          <div>
            <h2 className="text-base font-bold text-white mb-1">1. Information You Provide</h2>
            <p>
              When you submit the consultation or inquiry form, your name, email address, phone/WhatsApp number, organization name, and project description are sent directly to <strong>mhmasum7619@gmail.com</strong> and stored securely in the inquiry tracker solely to respond to your project inquiry.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold text-white mb-1">2. Analytics &amp; Session Data</h2>
            <p>
              Lightweight aggregate visit counts and device category metrics may be logged for traffic monitoring. Personal inquiry details are never sold, rented, or shared with third-party advertisers.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold text-white mb-1">3. Data Deletion &amp; Contact</h2>
            <p>
              You may request deletion or export of any inquiry record at any time by emailing{' '}
              <a href="mailto:mhmasum7619@gmail.com" className="text-cyan-400 underline">
                mhmasum7619@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="pt-28 pb-24 bg-slate-950 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-5 p-8 bg-slate-900/60 border border-slate-800 rounded-3xl">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <FileWarning className="w-7 h-7" />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-rose-400 block">
          HTTP 404 · Not Found
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          The page you are looking for does not exist or may have moved. Use one of the verified sections below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigateTo('home')}
            className="btn-lighting inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </button>
          <button
            onClick={() => navigateTo('services')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
          >
            Explore Services
          </button>
          <button
            onClick={() => navigateTo('case_studies')}
            className="px-4 py-2.5 text-xs font-semibold text-cyan-300 bg-slate-950 hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors"
          >
            Case Studies
          </button>
        </div>
      </div>
    </div>
  );
};
