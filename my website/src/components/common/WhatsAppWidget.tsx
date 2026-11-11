import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const { profile } = useData();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const rawNumber = (profile.whatsapp || '+8801639200615').replace(/[^0-9]/g, '');

  const quickTemplates = [
    'Hi Mahdi, I need AI Automation & n8n workflow development.',
    'Hi Mahdi, I am interested in FMCG sales & distributor consultation.',
    'Hi Mahdi, I need lead generation & web scraping automation.',
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || customMessage.trim() || 'Hi Mahdi, I would like to discuss a project with you.';
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${rawNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Pop-up Chat Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-950/40 border border-white/20 flex items-center justify-center font-bold text-white text-sm">
                  MH
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">{profile.name}</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {language === 'bn' ? 'WhatsApp-এ সরাসরি যুক্ত হোন' : 'Direct WhatsApp Chat'}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-950/60">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300">
              <p className="leading-relaxed">
                {language === 'bn'
                  ? 'হ্যালো! আপনার বিজনেস অটোমেশন, সেলস রিপোর্টিং অথবা কনসালটেশন নিয়ে সরাসরি কথা বলতে একটি বার্তা নির্বাচন করুন বা লিখুন।'
                  : 'Hello! Feel free to pick a topic below or type your message to chat directly with me on WhatsApp.'}
              </p>
            </div>

            {/* Quick Templates */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                {language === 'bn' ? 'দ্রুত বার্তা নির্বাচন করুন:' : 'Quick Options:'}
              </span>
              {quickTemplates.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(template)}
                  className="w-full text-left p-2 rounded-lg text-xs bg-slate-900/80 hover:bg-emerald-950/50 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  {template}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-1">
              <div className="relative">
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={language === 'bn' ? 'বার্তা লিখুন...' : 'Type your message...'}
                  className="w-full px-3 py-2 pr-9 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  className="absolute right-2 top-2 text-emerald-400 hover:text-emerald-300"
                  aria-label="Send WhatsApp message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button with Glow Effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp (+8801639200615)"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 pointer-events-none" />
        <MessageCircle className="w-6 h-6 text-slate-950 drop-shadow" />
      </button>
    </div>
  );
};
