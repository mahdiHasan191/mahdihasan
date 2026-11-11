import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  ArrowLeft,
  ExternalLink,
  MapPin,
  Clock,
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const CredentialsPage: React.FC = () => {
  const { experiences, educations, achievements, certifications, profile } = useData();
  const { navigateTo, activeCredentialsTab, setActiveCredentialsTab } = useNavigation();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'achievements' | 'certifications'>(
    activeCredentialsTab || 'experience'
  );

  useEffect(() => {
    if (activeCredentialsTab) {
      setActiveTab(activeCredentialsTab);
    }
  }, [activeCredentialsTab]);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (setActiveCredentialsTab) {
      setActiveCredentialsTab(tab);
    }
  };

  const isBn = language === 'bn';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
          <div>
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors mb-3 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{isBn ? 'হোম পেজে ফিরে যান' : 'Back to Home Portfolio'}</span>
            </button>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {isBn ? 'অভিজ্ঞতা ও শিক্ষাগত প্রোফাইল' : 'Professional Experience & Academic Credentials'}
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isBn
                ? 'Mahdi Hasan-এর বাস্তব FMCG সেলস অপারেশনস, ডিস্ট্রিবিউটর ম্যানেজমেন্ট, BBA + MBA ডিগ্রি এবং সম্মাননা গ্যালারি।'
                : 'Comprehensive track record covering 6+ years FMCG sales leadership, distributor management, BBA + MBA academic qualifications, and verified achievements.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
              {profile.name} · BBA + MBA
            </span>
          </div>
        </div>

        {/* Tab Switcher Controls */}
        <div className="flex flex-wrap items-center gap-2 my-8 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl w-fit">
          <button
            onClick={() => handleTabChange('experience')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{isBn ? 'FMCG Sales Experience' : 'FMCG Sales Experience'}</span>
            <span className="text-[10px] font-mono opacity-80">({experiences.filter((e) => e.is_published).length})</span>
          </button>

          <button
            onClick={() => handleTabChange('education')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'education'
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{isBn ? 'Education (BBA + MBA)' : 'Education (BBA + MBA)'}</span>
            <span className="text-[10px] font-mono opacity-80">({educations.filter((e) => e.is_published).length})</span>
          </button>

          <button
            onClick={() => handleTabChange('achievements')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{isBn ? 'Achievements Gallery' : 'Achievements Gallery'}</span>
            <span className="text-[10px] font-mono opacity-80">({achievements.filter((a) => a.is_published).length})</span>
          </button>

          <button
            onClick={() => handleTabChange('certifications')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'certifications'
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{isBn ? 'Certifications' : 'Certifications'}</span>
            <span className="text-[10px] font-mono opacity-80">({certifications.filter((c) => c.is_published).length})</span>
          </button>
        </div>

        {/* TAB 1: FMCG EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {experiences
              .filter((e) => e.is_published)
              .map((exp) => (
                <div
                  key={exp.id}
                  className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h2 className="text-2xl font-bold text-white">Sales Officer</h2>
                        <span className="text-slate-500">·</span>
                        <span className="text-lg font-semibold text-cyan-400">
                          6+ Years FMCG Sales Experience
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Dhaka North Sales Territory</span>
                        </span>
                        <span>·</span>
                        <span className="text-slate-300">
                          {isBn ? '১টি ডিস্ট্রিবিউটর ও ৫ জন ভ্যান পুলার পরিচালনা' : 'Managed 1 Distributor & 5 Van Pullers'}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3.5 py-1.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isBn ? 'যাচাইকৃত রেকর্ড' : 'Verified Record'}</span>
                    </span>
                  </div>

                  {/* 4 Metric Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs mb-1">
                        <Clock className="w-4 h-4" />
                        <span>FMCG Experience</span>
                      </div>
                      <div className="text-xl font-extrabold text-white font-mono">6+ Years</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Sales Officer leadership</p>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>Yearly Growth</span>
                      </div>
                      <div className="text-xl font-extrabold text-white font-mono">~9%</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Consistent business growth</p>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs mb-1">
                        <Target className="w-4 h-4" />
                        <span>Target Attainment</span>
                      </div>
                      <div className="text-xl font-extrabold text-white font-mono">~100%</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Average target achievement</p>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                      <div className="flex items-center gap-2 text-purple-400 text-xs mb-1">
                        <Award className="w-4 h-4" />
                        <span>New Product Sales</span>
                      </div>
                      <div className="text-xl font-extrabold text-white font-mono">3x 1st Place</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Top Performer Award</p>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
                      {isBn ? 'যাচাইকৃত অপারেশনাল রেকর্ডসমূহ:' : 'Verified Operational Highlights:'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        '6+ years of verified FMCG sales experience in field leadership.',
                        'Sales Officer managing end-to-end sales operations.',
                        'Dhaka North sales territory commercial management.',
                        'Managed one dedicated distributor distribution and route delivery.',
                        'Approximately 9% yearly business growth consistently delivered.',
                        'Approximately 100% average target achievement across cycles.',
                        'Three-time first-place achievement in new product launch sales.',
                        'Direct leadership and daily route management of five van pullers.',
                      ].map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* TAB 2: EDUCATION (BBA + MBA) */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {educations
              .filter((e) => e.is_published)
              .map((edu) => (
                <div
                  key={edu.id}
                  className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-cyan-400">
                        <GraduationCap className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
                        {edu.year}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-1">{edu.degree}</h2>
                    <p className="text-sm font-semibold text-cyan-300 mb-2">{edu.field_of_study}</p>
                    <p className="text-xs font-mono text-slate-400 mb-4">{edu.institution}</p>

                    <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                      {edu.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/60 mt-6 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isBn ? 'যাচাইকৃত ডিগ্রি' : 'Verified Academic Degree'}</span>
                    </span>
                    <span className="font-mono text-slate-500">Business Administration</span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS GALLERY (WITH IMAGE HYPERLINKS) */}
        {activeTab === 'achievements' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-4 bg-cyan-950/20 border border-cyan-800/30 rounded-2xl text-xs text-slate-300 flex items-center justify-between">
              <span>
                {isBn
                  ? 'প্রতিটি অ্যাচিভমেন্ট ছবির সাথে হাইপারলিংক যুক্ত করা রয়েছে। ছবিতে ক্লিক করলে সরাসরি লিংক ওপেন হবে।'
                  : 'Every achievement image supports a direct hyperlink. Click on any image or action button to inspect.'}
              </span>
              <span className="text-cyan-400 font-mono hidden sm:inline">Hyperlinked Gallery</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements
                .filter((a) => a.is_published)
                .map((ach) => (
                  <div
                    key={ach.id}
                    className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image with Hyperlink */}
                      <div className="relative aspect-video overflow-hidden bg-slate-950">
                        {ach.link_url ? (
                          <a
                            href={ach.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full cursor-pointer relative group/img"
                            title={`Open hyperlink for ${ach.title}`}
                          >
                            <img
                              src={ach.image_url}
                              alt={ach.title}
                              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-semibold text-white">
                              <span>Open Hyperlink</span>
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </a>
                        ) : (
                          <img
                            src={ach.image_url}
                            alt={ach.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <span className="absolute top-3 right-3 text-[10px] font-mono font-medium text-cyan-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/80">
                          {ach.category}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{ach.date}</span>
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2 leading-snug">{ach.title}</h2>
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                          {ach.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Recognition</span>
                      </span>
                      {ach.link_url && (
                        <a
                          href={ach.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                        >
                          <span>Visit Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {certifications
              .filter((c) => c.is_published)
              .map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-3xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-purple-400">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-400">{cert.issue_date}</span>
                    </div>

                    <h2 className="text-base font-bold text-white mb-2 line-clamp-2">{cert.title}</h2>
                    <p className="text-xs text-cyan-300 font-medium mb-3">{cert.issuer}</p>

                    {cert.credential_id && (
                      <p className="text-[11px] font-mono text-slate-400">ID: {cert.credential_id}</p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isBn ? 'যাচাইকৃত সনদ' : 'Verified Credential'}</span>
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
        )}
      </div>
    </div>
  );
};
