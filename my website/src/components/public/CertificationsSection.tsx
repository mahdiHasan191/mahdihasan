import React from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Award, CheckCircle, ExternalLink } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const { certifications } = useData();
  const { t, language } = useLanguage();
  const published = certifications.filter((c) => c.is_published);

  return (
    <section id="certifications" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            {t('certifications.kicker', '08. Professional Credentials')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('certifications.headline', 'Industry Certifications & Technical Credentials')}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {language === 'bn'
              ? 'এআই এজেন্ট আর্কিটেকচার, সেলস লিডারশিপ, ডিজিটাল পারফরম্যান্স মার্কেটিং এবং ডেটা প্রোগ্রামিংয়ের যাচাইকৃত সনদপত্র।'
              : 'Validated capabilities across AI agent architectures, sales leadership, digital performance marketing, and data programming.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {published.map((cert) => (
            <div
              key={cert.id}
              className="p-6 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 rounded-2xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-purple-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{cert.issue_date}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                  {cert.title}
                </h3>

                <p className="text-xs text-cyan-300 font-medium mb-3">
                  {cert.issuer}
                </p>

                {cert.credential_id && (
                  <p className="text-[11px] font-mono text-slate-400">
                    ID: {cert.credential_id}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'যাচাইকৃত সনদ' : 'Verified Credential'}</span>
                </span>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white"
                    title="View Credential"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
