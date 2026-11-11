import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { db } from '../../lib/supabase';
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, services } = useData();
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<typeof formData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Listen for prefill service event
  useEffect(() => {
    const handlePrefill = (e: any) => {
      if (e.detail?.service) {
        setFormData((prev) => ({ ...prev, service_interest: e.detail.service }));
      }
    };
    window.addEventListener('prefill-service-inquiry', handlePrefill);
    return () => window.removeEventListener('prefill-service-inquiry', handlePrefill);
  }, []);

  const recipientEmail = profile.email || 'mhmasum7619@gmail.com';

  const constructGmailUrl = (data: typeof formData) => {
    const subject = `[Project Inquiry] ${data.service_interest || 'Collaboration'} - from ${data.name}`;
    const body = `Name: ${data.name}
Email: ${data.email}
Phone/WhatsApp: ${data.phone || 'N/A'}
Organization/Brand: ${data.company || 'N/A'}
Service Interest: ${data.service_interest || 'General Inquiry'}

Message:
${data.message}`;

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const constructMailtoUrl = (data: typeof formData) => {
    const subject = `[Project Inquiry] ${data.service_interest || 'Collaboration'} - from ${data.name}`;
    const body = `Name: ${data.name}
Email: ${data.email}
Phone/WhatsApp: ${data.phone || 'N/A'}
Organization/Brand: ${data.company || 'N/A'}
Service Interest: ${data.service_interest || 'General Inquiry'}

Message:
${data.message}`;

    return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে আপনার নাম, ইমেইল এবং বার্তা পূরণ করুন।'
          : 'Please fill in your name, email, and message.'
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।'
          : 'Please provide a valid email address.'
      );
      return;
    }

    setSubmitting(true);
    const submissionData = { ...formData };
    setLastSubmitted(submissionData);

    try {
      const result = await db.submitInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        service_interest: formData.service_interest || undefined,
        message: formData.message.trim(),
      });

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service_interest: '',
          message: '',
        });
      } else {
        setErrorMessage(result.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error submitting your inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2 px-3 py-1 bg-cyan-950/40 border border-cyan-800/40 rounded-full font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'bn' ? 'সরাসরি বার্তা ও আলোচনা' : 'Direct Inquiries & Collaboration'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'bn'
              ? 'Sales Acceleration ও AI Automation নিয়ে আলোচনা করুন'
              : 'Let’s Discuss Sales Acceleration & AI Automation'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'bn'
              ? 'নিচের ফর্মের মাধ্যমে বার্তাটি সরাসরি Mahdi Hasan-এর Gmail (' +
                recipientEmail +
                ')-এ পাঠানো হবে।'
              : 'Send your message directly to Mahdi Hasan via Gmail (' +
                recipientEmail +
                ') for consultation or project inquiries.'}
          </p>
        </div>

        {/* Focused, Centered Direct Message Console */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Top connection badge */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>
                {language === 'bn' ? 'সংযুক্ত Gmail ঠিকানা:' : 'Connected Direct Gmail:'}
              </span>
              <span className="font-mono text-cyan-300 font-semibold">{recipientEmail}</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct Route</span>
            </span>
          </div>

          {success && lastSubmitted ? (
            <div className="py-8 px-4 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'bn'
                    ? 'বার্তাটি সফলভাবে গৃহীত হয়েছে!'
                    : 'Inquiry Dispatched Successfully!'}
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  {language === 'bn'
                    ? `ধন্যবাদ! আপনার বার্তাটি সিস্টেমে সংরক্ষিত হয়েছে। দ্রুততম যোগাযোগের জন্য আপনি সরাসরি আপনার Gmail থেকেও পাঠাতে পারেন:`
                    : `Thank you! Your message has been saved to the inquiry system. You can also open it directly in your Gmail with one click:`}
                </p>
              </div>

              {/* Action Buttons to open in Gmail or send another */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={constructGmailUrl(lastSubmitted)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span>
                    {language === 'bn' ? 'Gmail অ্যাপে বার্তাটি ওপেন করুন' : 'Open Directly in Gmail'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={constructMailtoUrl(lastSubmitted)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-xl transition-colors"
                >
                  <span>
                    {language === 'bn' ? 'ডিফল্ট ইমেইল অ্যাপ দিয়ে পাঠান' : 'Default Mail Client'}
                  </span>
                </a>

                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {language === 'bn' ? 'আরেকটি বার্তা লিখুন' : 'Send Another Message'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {language === 'bn' ? 'আপনার নাম' : 'Your Name'}{' '}
                    <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'bn' ? 'যেমন: মাহদী হাসান' : 'e.g. John Doe'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}{' '}
                    <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone/WhatsApp */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {language === 'bn' ? 'ফোন / WhatsApp (ঐচ্ছিক)' : 'Phone / WhatsApp (Optional)'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+8801..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {language === 'bn' ? 'প্রতিষ্ঠান / ব্র্যান্ড (ঐচ্ছিক)' : 'Organization / Brand (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. FMCG Distributors Ltd"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Service Interest Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {language === 'bn' ? 'সার্ভিস এর ধরন' : 'Service Interest'}
                </label>
                <select
                  value={formData.service_interest}
                  onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="">
                    {language === 'bn'
                      ? 'সার্ভিস নির্বাচন করুন (বা General Inquiry)'
                      : 'Select a service (or General Inquiry)'}
                  </option>
                  {services.filter((s) => s.is_published).map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title} ({srv.category})
                    </option>
                  ))}
                  <option value="FMCG Sales Consultation">
                    FMCG Sales & Distributor Consultation
                  </option>
                  <option value="AI Automation Workflow">
                    Custom AI Agent & n8n Automation
                  </option>
                  <option value="General Inquiry">
                    General Collaboration / Other
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {language === 'bn' ? 'বার্তার বিবরণ' : 'Project Details or Message'}{' '}
                  <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    language === 'bn'
                      ? 'আপনার প্রজেক্টের লক্ষ্য, সমস্যা বা অটোমেশনের রিকোয়ারমেন্ট সংক্ষেপে লিখুন...'
                      : 'Briefly describe your objectives, current bottleneck, or project scope...'
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 disabled:opacity-50 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>
                        {language === 'bn' ? 'Gmail-এ পাঠানো হচ্ছে...' : 'Dispatching to Gmail...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {language === 'bn' ? 'Gmail-এ বার্তা পাঠান' : 'Send Message to Gmail'}
                      </span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
