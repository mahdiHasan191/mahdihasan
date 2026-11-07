import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { db } from '../../lib/supabase';
import {
  Mail,
  MessageCircle,
  Linkedin,
  Facebook,
  Github,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, services } = useData();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setSubmitting(true);
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
        if (result.error === 'saved_email_failed') {
          setErrorMessage('Your message was saved, but the email alert could not be sent. You can still contact me directly by email or WhatsApp.');
        }
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

  const whatsappCleanNumber = (profile.whatsapp || '+8801639200615').replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            09. Direct Inquiries & Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let’s Discuss Sales Acceleration & AI Automation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether you need distributor sales reporting automation, high-intent lead generation pipelines, custom MCP AI agents, or performance marketing campaigns, I’m ready to collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-white">Direct Channels</h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-3.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl transition-colors group"
                >
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Email Address
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-300 break-all">
                      {profile.email}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappCleanNumber}?text=Hi%20Mahdi,%20I%20would%20like%20to%20discuss%20a%20project`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-emerald-500/40 rounded-xl transition-colors group"
                >
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      WhatsApp Instant Chat
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-300">
                      {profile.whatsapp}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl">
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Based In
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {profile.location} (Dhaka North Territory)
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                  Professional Profiles:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {profile.facebook_url && (
                    <a
                      href={profile.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-blue-400" />
                      <span>Facebook</span>
                    </a>
                  )}

                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4 text-slate-400" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Response Time Guarantee Card */}
            <div className="p-5 bg-gradient-to-r from-cyan-950/20 to-purple-950/20 border border-cyan-800/30 rounded-xl flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white">Typical Response Time:</span> Within 4–8 business hours. For urgent distributor or consultation inquiries, reach out on WhatsApp.
              </p>
            </div>
          </div>

          {/* Right Column: Live Inquiries Form */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl relative">
              <h3 className="text-xl font-bold text-white mb-2">Send a Direct Message</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the details below. Your message will be saved to the inquiry tracker and an email notification will be sent when email delivery is configured.
              </p>

              {success ? (
                <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-3 text-center my-6">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Inquiry Received Successfully!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Your request has been saved. I will get back to you shortly.
                  </p>
                  {errorMessage && (
                    <p role="alert" className="text-sm text-amber-300 max-w-md mx-auto">{errorMessage}</p>
                  )}
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-950/60 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address <span className="text-cyan-400">*</span>
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
                        Phone / WhatsApp (Optional)
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
                        Organization / Brand (Optional)
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
                      Service Interest
                    </label>
                    <select
                      value={formData.service_interest}
                      onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="">Select a service (or General Inquiry)</option>
                      {services.filter((s) => s.is_published).map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title} ({srv.category})
                        </option>
                      ))}
                      <option value="FMCG Sales Consultation">FMCG Sales & Distributor Consultation</option>
                      <option value="General Inquiry">Other Custom Automation Project</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Details or Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your objectives, current bottleneck, or project scope..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 disabled:opacity-50 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
