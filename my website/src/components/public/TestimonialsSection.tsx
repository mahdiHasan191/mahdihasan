import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { Star, Quote, ShieldCheck, Mail } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useData();
  const { scrollToSection } = useNavigation();
  const published = testimonials.filter((t) => t.is_published);

  return (
    <section id="testimonials" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            08. Professional References
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Endorsements & References
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Professional integrity is paramount. Verified references from FMCG distributor operations and project collaborators.
          </p>
        </div>

        {published.length === 0 ? (
          <div className="p-8 md:p-12 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">
                  Distributor & Management References Available Upon Request
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To protect the privacy of commercial distributor partners and corporate sales leadership, professional references, territory target verifications, and project recommendations are provided directly upon request.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Request Professional References</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {published.map((item) => (
              <div
                key={item.id}
                className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-700" />
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <h3 className="text-base font-bold text-white">{item.author_name}</h3>
                  <p className="text-xs text-cyan-300 font-medium">{item.author_title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.company}</p>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    <span>Relationship: {item.relationship}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
