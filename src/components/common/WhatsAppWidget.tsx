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
    <>
      {/* Pop-up Chat Modal / Card - 100% Mobile Friendly (Contained within viewport, no horizontal overflow, prevents iOS auto-zoom) */}
      {isOpen && (
        <div className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 z-50 sm:w-96 max-w-[calc(100vw-24px)] bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-3.5 sm:p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/40 border border-white/20 flex items-center justify-center font-bold text-white text-xs sm:text-sm">
                  MH
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold leading-tight">{profile.name}</h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {language === 'bn' ? 'WhatsApp-এ সরাসরি বার্তা' : 'Direct WhatsApp Chat'}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 sm:p-4 space-y-3 bg-slate-950/90 max-h-[70vh] overflow-y-auto">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 sm:p-3 text-xs text-slate-300">
              <p className="leading-relaxed">
                {language === 'bn'
                  ? 'হ্যালো! সেলস অপারেশনস, অটোমেশন বা কনসালটেশন নিয়ে সরাসরি কথা বলতে নিচের বিষয় নির্বাচন করুন বা বার্তা লিখুন।'
                  : 'Hello! Feel free to pick a quick topic below or write a custom message to chat directly on WhatsApp.'}
              </p>
            </div>

            {/* Quick Templates */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                {language === 'bn' ? 'দ্রুত বার্তা নির্বাচন করুন:' : 'Quick Options:'}
              </span>
              {quickTemplates.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(template)}
                  className="btn-glow-soft w-full text-left p-2.5 rounded-lg text-xs bg-slate-900 hover:bg-emerald-950/60 border border-emerald-500/25 hover:border-emerald-400/60 text-slate-200 hover:text-emerald-300 transition-colors"
                >
                  {template}
                </button>
              ))}
            </div>

            {/* Custom Input (Uses text-base on mobile to avoid iOS Safari input auto-zoom) */}
            <div className="pt-1">
              <div className="relative">
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={language === 'bn' ? 'বার্তা লিখুন...' : 'Type your message...'}
                  className="w-full px-3 py-2.5 pr-10 bg-slate-900 border border-slate-800 rounded-xl text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-lighting-pos relative group p-3.5 sm:p-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-full shadow-[0_0_24px_rgba(16,185,129,0.55)] hover:shadow-[0_0_34px_rgba(16,185,129,0.85)] transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp (+8801639200615)"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 pointer-events-none" />
          <MessageCircle className="w-6 h-6 text-slate-950 drop-shadow" />
        </button>
      </div>
    </>
  );
};
