import React from 'react';
import { useData } from '../../context/DataContext';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { educations } = useData();
  const published = educations.filter((e) => e.is_published);

  return (
    <section id="education" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            06. Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Qualifications (BBA + MBA)
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Strategic business administration and marketing foundations providing the analytical rigor behind all automation and sales systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {published.map((edu) => (
            <div
              key={edu.id}
              className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
                  {edu.year}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
              <p className="text-sm font-semibold text-cyan-300 mb-2">{edu.field_of_study}</p>
              <p className="text-xs font-mono text-slate-400 mb-4">{edu.institution}</p>

              <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
