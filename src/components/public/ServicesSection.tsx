import React, { useState } from 'react';
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
} from 'lucide-react';

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
  const { t, language } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Filter only published services
  const publishedServices = services.filter((s) => s.is_published);

  const categories = ['All', 'AI & Automation', 'Digital Marketing', 'Sales Operations'];

  const filtered = filterCategory === 'All'
    ? publishedServices
    : publishedServices.filter((s) => s.category === filterCategory);

  const handleInquire = (serviceTitle: string) => {
    // Dispatch custom event to pre-populate contact form interest
    window.dispatchEvent(new CustomEvent('prefill-service-inquiry', { detail: { service: serviceTitle } }));
    scrollToSection('contact');
  };

  return (
    <section id="services" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
              {t('services.kicker')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('services.headline')}
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-2xl">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Interactive Category Filter - functional buttons as per design guidelines */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filterCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid: 12 Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => {
            const IconComponent = iconMap[service.icon_name] || Bot;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-6 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Category tag & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {/* Unboxed category metadata with separator */}
                    <span className="text-xs font-mono text-slate-400">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Key Deliverables:
                      </span>
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-slate-800/60 mt-auto">
                  <button
                    onClick={() => handleInquire(service.title)}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 hover:underline underline-offset-4 transition-colors"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
