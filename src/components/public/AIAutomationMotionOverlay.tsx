import React, { useState, useEffect, useId } from 'react';
import {
  Play,
  Pause,
  ArrowRight,
  CheckCircle2,
  PiggyBank,
  TrendingUp,
  BadgeDollarSign,
  Bot,
  MessageCircle,
  Mail,
  Database,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';

interface WorkflowStageInfo {
  id: number;
  label: string;
  labelBn: string;
  metric: string;
  desc: string;
  descBn: string;
}

const WORKFLOW_STAGES: WorkflowStageInfo[] = [
  {
    id: 0,
    label: '1. Inbound Leads & Orders (WhatsApp + Gmail)',
    labelBn: '১. হোয়াটসঅ্যাপ ও ইমেইল ইনবাউন্ড অটোমেশন',
    metric: '< 5s Capture',
    desc: 'Every client inquiry and field order enters the central MH hub automatically.',
    descBn: 'প্রতিটি ক্লায়েন্ট ইনকোয়ারি ও অর্ডার স্বয়ংক্রিয়ভাবে MH হাবে যুক্ত হয়।',
  },
  {
    id: 1,
    label: '2. AI Brain & MH Business Decision Hub',
    labelBn: '২. MH এবং AI স্মার্ট বিজনেস ডিসিশন ইঞ্জিন',
    metric: '24/7 Smart Routing',
    desc: 'AI analyzes data, crafts tailored proposals, and eliminates manual mistakes.',
    descBn: 'AI ডাটা বিশ্লেষণ করে সঠিক সমাধান ও প্রোপোজাল তৈরি করে।',
  },
  {
    id: 2,
    label: '3. Money Save & Cost Optimization',
    labelBn: '৩. খরচ সাশ্রয় ও সময় বাঁচানো (Money Save)',
    metric: '-65% Manual Cost · 18h/wk Saved',
    desc: 'Replaces repetitive manual entry with automated reporting and follow-up.',
    descBn: 'ম্যানুয়াল কাজের খরচ ৬৫% কমিয়ে প্রতি সপ্তাহে ১৮+ ঘণ্টা সাশ্রয় করে।',
  },
  {
    id: 3,
    label: '4. Business Growth & Higher Profit',
    labelBn: '৪. ব্যবসায়িক প্রবৃদ্ধি ও সর্বাধিক মুনাফা (Profit)',
    metric: '+42% Deals · ~100% Target · +9% YoY',
    desc: 'Turns faster outreach and 0% missed leads into higher profit & steady growth.',
    descBn: 'দ্রুত ফলো-আপ ও শূন্য লিড লসের মাধ্যমে আয় ও মুনাফা বাড়ায়।',
  },
];

export const AIAutomationMotionOverlay: React.FC = () => {
  const uid = useId().replace(/:/g, '');
  const neonGlowId = `neonGlow-${uid}`;
  const coreAuraId = `mhCoreAura-${uid}`;
  const textGradId = `mhTextGrad-${uid}`;
  const hubGradId = `mhHubGrad-${uid}`;

  const { language } = useLanguage();
  const { scrollToSection } = useNavigation();
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isBn = language === 'bn';

  // Sequential live pulse animation across the n8n workflow stages
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % WORKFLOW_STAGES.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = WORKFLOW_STAGES[activeStage];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full sm:w-[430px] md:w-[470px] lg:w-[505px] sm:absolute sm:left-5 md:left-7 lg:left-10 sm:top-1/2 sm:-translate-y-1/2 z-30 pointer-events-auto"
    >
      <div className="bg-[#070d1c]/92 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-black/85 space-y-2.5">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-tight truncate">
              {isBn
                ? 'বিজনেস গ্রোথ, প্রফিট ও মানি সেভ অটোমেশন'
                : 'AI Automation for Growth, Profit & Money Saving'}
            </h3>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              {isBn
                ? 'MH বিজনেস অটোমেশন হাব — রিয়েল-টাইম বিজনেস সলিউশন ওয়ার্কফ্লো'
                : 'MH Business Automation Hub turning inquiries into revenue & savings'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="btn-glow-soft p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-colors shrink-0"
            title={isPaused ? 'Resume animation' : 'Pause animation'}
            aria-label={isPaused ? 'Resume workflow' : 'Pause workflow'}
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <Pause className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Glowing Multi-Branch n8n Business Workflow Canvas */}
        <div className="relative w-full rounded-xl bg-[#080f21] border border-slate-800/90 overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:14px_14px] p-1">
          <svg
            viewBox="0 0 520 278"
            className="w-full h-auto overflow-visible select-none"
            role="img"
            aria-label="MH Business Automation Hub AI workflow for business growth, profit, and money saving"
          >
            <defs>
              <filter id={neonGlowId} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id={coreAuraId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.42" />
                <stop offset="55%" stopColor="#10b981" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={textGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
              <linearGradient id={hubGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* ================= GLOWING BEZIER WIRES ================= */}
            {/* Input 1: WhatsApp -> n8n */}
            <path
              d="M 70 64 C 102 64, 100 130, 134 130"
              fill="none"
              stroke={activeStage >= 0 ? '#10b981' : '#334155'}
              strokeWidth="2.8"
              strokeOpacity="0.45"
              filter={`url(#${neonGlowId})`}
            />
            <path
              d="M 70 64 C 102 64, 100 130, 134 130"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.4"
              className="animate-beam-flow"
            />
            <text x="98" y="48" textAnchor="middle" fill="#cbd5e1" fontSize="9.5" fontWeight="600">
              Leads In -&gt; MH
            </text>

            {/* Input 2: Gmail -> n8n */}
            <path
              d="M 70 198 C 102 198, 100 156, 134 156"
              fill="none"
              stroke={activeStage >= 0 ? '#38bdf8' : '#334155'}
              strokeWidth="2.8"
              strokeOpacity="0.45"
              filter={`url(#${neonGlowId})`}
            />
            <path
              d="M 70 198 C 102 198, 100 156, 134 156"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.4"
              className="animate-beam-flow"
            />
            <text x="95" y="232" textAnchor="middle" fill="#cbd5e1" fontSize="9.5" fontWeight="600">
              Auto Reply (&lt;5s)
            </text>

            {/* AI Loop 1: n8n -> AI Brain */}
            <path
              d="M 172 106 L 172 60 Q 172 46 186 46 L 246 46"
              fill="none"
              stroke={activeStage >= 1 ? '#10b981' : '#334155'}
              strokeWidth="2.8"
              strokeOpacity="0.5"
              filter={`url(#${neonGlowId})`}
            />
            <path
              d="M 172 106 L 172 60 Q 172 46 186 46 L 246 46"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.4"
              className="animate-beam-flow"
            />
            <text x="172" y="96" textAnchor="middle" fill="#94a3b8" fontSize="8.8" fontWeight="600">
              Process Data
            </text>

            {/* AI Loop 2: AI Brain -> n8n */}
            <path
              d="M 304 46 L 322 46 Q 336 46 336 60 L 336 104 Q 336 118 322 118 L 222 118"
              fill="none"
              stroke={activeStage >= 1 ? '#38bdf8' : '#334155'}
              strokeWidth="2.8"
              strokeOpacity="0.5"
              filter={`url(#${neonGlowId})`}
            />
            <path
              d="M 304 46 L 322 46 Q 336 46 336 60 L 336 104 Q 336 118 322 118 L 222 118"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.4"
              className="animate-beam-flow"
            />
            <text x="344" y="61" textAnchor="start" fill="#cbd5e1" fontSize="8.8" fontWeight="600">
              AI Smart
            </text>
            <text x="344" y="71" textAnchor="start" fill="#cbd5e1" fontSize="8.8" fontWeight="600">
              Solution
            </text>

            {/* Branch Out 1: n8n -> Money Save (Top-Right) */}
            <path
              d="M 222 132 C 330 132, 345 46, 424 46"
              fill="none"
              stroke={activeStage >= 2 ? '#10b981' : '#334155'}
              strokeWidth="3"
              strokeOpacity="0.55"
              filter={`url(#${neonGlowId})`}
            />
            <path
              d="M 222 132 C 330 132, 345 46, 424 46"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.4"
              className="animate-beam-flow"
            />
            <text x="382" y="29" textAnchor="middle" fill="#6ee7b7" fontSize="9.2" fontWeight="700">
              Save Cost (-65%)
            </text>

            {/* Branch Out 2: n8n -> Business Growth (Middle-Right) */}
            <path
              d="M 222 146 C 300 146, 350 136, 424 136"
              fill="none"
              stroke={activeStage >= 3 ? '#38bdf8' : '#334155'}
              strokeWidth="3"
              strokeOpacity="0.55"
              filter={`url(#${neonGlowId})`}
            />
            <path
              d="M 222 146 C 300 146, 350 136, 424 136"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.4"
              className="animate-beam-flow"
            />
            <text x="378" y="127" textAnchor="middle" fill="#7dd3fc" fontSize="9.2" fontWeight="700">
              ~100% Target Growth
            </text>

            {/* Branch Out 3: n8n -> Higher Profit (Bottom-Right) */}
            <path
              d="M 222 160 C 330 160, 345 224, 424 224"
              fill="none"
              stroke={activeStage >= 3 ? '#fbbf24' : '#334155'}
              strokeWidth="3"
              strokeOpacity="0.55"
              filter={`url(#${neonGlowId})`}
            />
            <path
              d="M 222 160 C 330 160, 345 224, 424 224"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.4"
              className="animate-beam-flow"
            />
            <text x="378" y="213" textAnchor="middle" fill="#fde047" fontSize="9.2" fontWeight="700">
              +42% Profit ROI
            </text>

            {/* Branch Out 4: n8n -> CRM Sync (Bottom-Center) */}
            <path
              d="M 222 174 C 236 174, 228 224, 248 224"
              fill="none"
              stroke={activeStage >= 1 ? '#10b981' : '#334155'}
              strokeWidth="2.6"
              strokeOpacity="0.5"
              filter={`url(#${neonGlowId})`}
            />
            <path
              d="M 222 174 C 236 174, 228 224, 248 224"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.2"
              className="animate-beam-flow"
            />
            <text x="202" y="232" textAnchor="middle" fill="#cbd5e1" fontSize="8.8" fontWeight="600">
              Update CRM
            </text>

            {/* ================= NODE 1: WHATSAPP INPUT (TOP-LEFT) ================= */}
            <g onClick={() => setActiveStage(0)} className="cursor-pointer">
              <rect
                x="14"
                y="36"
                width="56"
                height="56"
                rx="13"
                fill="#0f172a"
                stroke={activeStage === 0 ? '#4ade80' : '#10b981'}
                strokeWidth={activeStage === 0 ? '2.4' : '1.5'}
                filter={activeStage === 0 ? `url(#${neonGlowId})` : undefined}
              />
              <circle cx="70" cy="64" r="3.5" fill="#94a3b8" stroke="#0f172a" strokeWidth="1" />
              {/* WhatsApp Circle Badge */}
              <circle cx="42" cy="64" r="16" fill="#22c55e" />
              <foreignObject x="30" y="52" width="24" height="24">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                </div>
              </foreignObject>
              <text x="42" y="106" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="700">
                WhatsApp
              </text>
            </g>

            {/* ================= NODE 2: GMAIL INPUT (BOTTOM-LEFT) ================= */}
            <g onClick={() => setActiveStage(0)} className="cursor-pointer">
              <rect
                x="14"
                y="170"
                width="56"
                height="56"
                rx="13"
                fill="#0f172a"
                stroke={activeStage === 0 ? '#38bdf8' : '#10b981'}
                strokeWidth={activeStage === 0 ? '2.4' : '1.5'}
                filter={activeStage === 0 ? `url(#${neonGlowId})` : undefined}
              />
              <circle cx="70" cy="198" r="3.5" fill="#94a3b8" stroke="#0f172a" strokeWidth="1" />
              <foreignObject x="26" y="182" width="32" height="32">
                <div className="w-full h-full rounded-lg bg-white/95 flex items-center justify-center shadow">
                  <Mail className="w-5 h-5 text-rose-500" />
                </div>
              </foreignObject>
              <text x="42" y="240" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="700">
                Gmail
              </text>
            </g>

            {/* ================= CENTRAL HUB: SCI-FI MH ELECTRIC SPARK CORE ================= */}
            <g onClick={() => setActiveStage(1)} className="cursor-pointer">
              {/* Main Glowing Outer Hub Frame */}
              <rect
                x="134"
                y="106"
                width="88"
                height="78"
                rx="16"
                fill="#0f172a"
                stroke={`url(#${hubGradId})`}
                strokeWidth={activeStage === 1 ? '3' : '2.2'}
                filter={`url(#${neonGlowId})`}
              />

              {/* Subtle Sci-Fi Plasma Core Aura */}
              <circle cx="178" cy="145" r="36" fill={`url(#${coreAuraId})`} />

              {/* Left Input Ports */}
              <circle cx="134" cy="130" r="3.5" fill="#34d399" />
              <circle cx="134" cy="156" r="3.5" fill="#38bdf8" />
              {/* Top & Return Ports */}
              <circle cx="172" cy="106" r="3.5" fill="#34d399" />
              <circle cx="222" cy="118" r="3.5" fill="#38bdf8" />
              {/* Right Output Ports */}
              <circle cx="222" cy="132" r="3.5" fill="#34d399" />
              <circle cx="222" cy="146" r="3.5" fill="#38bdf8" />
              <circle cx="222" cy="160" r="3.5" fill="#fbbf24" />
              <circle cx="222" cy="174" r="3.5" fill="#34d399" />

              {/* Electric Lightning Spark Bolts around MH */}
              <path
                d="M 155 133 L 146 123 L 151 121 L 143 113"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spark-bolt-1"
              />
              <path
                d="M 199 133 L 208 124 L 203 121 L 213 114"
                fill="none"
                stroke="#34d399"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spark-bolt-2"
              />
              <path
                d="M 156 158 L 146 167 L 150 170 L 142 177"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spark-bolt-3"
              />
              <path
                d="M 199 157 L 209 166 L 204 169 L 213 176"
                fill="none"
                stroke="#fde047"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spark-bolt-4"
              />

              {/* Flying Plasma Spark Particles bursting from MH */}
              <circle
                cx="166"
                cy="132"
                r="1.8"
                fill="#67e8f9"
                className="animate-spark-fly"
                style={{ '--sx': '-14px', '--sy': '-15px', animationDelay: '0s' } as React.CSSProperties}
              />
              <circle
                cx="191"
                cy="132"
                r="1.9"
                fill="#34d399"
                className="animate-spark-fly"
                style={{ '--sx': '16px', '--sy': '-14px', animationDelay: '0.35s' } as React.CSSProperties}
              />
              <circle
                cx="178"
                cy="128"
                r="1.6"
                fill="#ffffff"
                className="animate-spark-fly"
                style={{ '--sx': '2px', '--sy': '-17px', animationDelay: '0.7s' } as React.CSSProperties}
              />
              <circle
                cx="164"
                cy="158"
                r="1.8"
                fill="#38bdf8"
                className="animate-spark-fly"
                style={{ '--sx': '-16px', '--sy': '14px', animationDelay: '0.5s' } as React.CSSProperties}
              />
              <circle
                cx="192"
                cy="158"
                r="1.9"
                fill="#fbbf24"
                className="animate-spark-fly"
                style={{ '--sx': '15px', '--sy': '15px', animationDelay: '0.95s' } as React.CSSProperties}
              />
              <circle
                cx="178"
                cy="161"
                r="1.5"
                fill="#a7f3d0"
                className="animate-spark-fly"
                style={{ '--sx': '-3px', '--sy': '16px', animationDelay: '1.15s' } as React.CSSProperties}
              />

              {/* Crisp, Mobile-Guaranteed Sci-Fi MH Emblem */}
              <g className="animate-mh-surge">
                <text
                  x="178"
                  y="156"
                  textAnchor="middle"
                  fill={`url(#${textGradId})`}
                  stroke="#e0f2fe"
                  strokeWidth="0.35"
                  fontSize="30"
                  fontWeight="900"
                  letterSpacing="2"
                  fontFamily="var(--font-mono), monospace, sans-serif"
                >
                  MH
                </text>
              </g>

              <text x="178" y="198" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="700">
                MH Business
              </text>
              <text x="178" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="600">
                Automation Hub
              </text>
            </g>

            {/* ================= TOP-CENTER: AI / LLM BRAIN NODE ================= */}
            <g onClick={() => setActiveStage(1)} className="cursor-pointer">
              <rect
                x="246"
                y="18"
                width="58"
                height="56"
                rx="13"
                fill="#0d9488"
                stroke={activeStage === 1 ? '#5eead4' : '#14b8a6'}
                strokeWidth={activeStage === 1 ? '2.5' : '1.6'}
                filter={activeStage === 1 ? `url(#${neonGlowId})` : undefined}
              />
              <circle cx="246" cy="46" r="3.5" fill="#94a3b8" />
              <circle cx="304" cy="46" r="3.5" fill="#94a3b8" />
              <foreignObject x="257" y="28" width="36" height="36">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <Bot className="w-7 h-7" />
                </div>
              </foreignObject>
              <text x="275" y="87" textAnchor="middle" fill="#f8fafc" fontSize="10.2" fontWeight="700">
                AI Engine
              </text>
              <text x="275" y="98" textAnchor="middle" fill="#94a3b8" fontSize="8.2">
                (Smart Logic)
              </text>
            </g>

            {/* ================= BOTTOM-CENTER: CRM / CLIENT SYNC ================= */}
            <g onClick={() => setActiveStage(1)} className="cursor-pointer">
              <rect
                x="248"
                y="196"
                width="54"
                height="54"
                rx="13"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="1.6"
              />
              <circle cx="248" cy="224" r="3.5" fill="#94a3b8" />
              <foreignObject x="258" y="206" width="34" height="34">
                <div className="w-full h-full rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                  <Database className="w-5 h-5" />
                </div>
              </foreignObject>
              <text x="275" y="264" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="700">
                CRM Sync
              </text>
            </g>

            {/* ================= TOP-RIGHT: MONEY SAVE NODE ================= */}
            <g onClick={() => setActiveStage(2)} className="cursor-pointer">
              <rect
                x="424"
                y="18"
                width="56"
                height="56"
                rx="13"
                fill="#064e3b"
                stroke={activeStage === 2 ? '#4ade80' : '#10b981'}
                strokeWidth={activeStage === 2 ? '2.6' : '1.6'}
                filter={activeStage === 2 ? `url(#${neonGlowId})` : undefined}
              />
              <circle cx="424" cy="46" r="3.5" fill="#34d399" />
              <foreignObject x="435" y="29" width="34" height="34">
                <div className="w-full h-full flex items-center justify-center text-emerald-300">
                  <PiggyBank className="w-7 h-7" />
                </div>
              </foreignObject>
              <text x="452" y="88" textAnchor="middle" fill="#6ee7b7" fontSize="10.2" fontWeight="700">
                Money Save
              </text>
            </g>

            {/* ================= MIDDLE-RIGHT: BUSINESS GROWTH NODE ================= */}
            <g onClick={() => setActiveStage(3)} className="cursor-pointer">
              <rect
                x="424"
                y="108"
                width="56"
                height="56"
                rx="13"
                fill="#0c4a6e"
                stroke={activeStage === 3 ? '#7dd3fc' : '#38bdf8'}
                strokeWidth={activeStage === 3 ? '2.6' : '1.6'}
                filter={activeStage === 3 ? `url(#${neonGlowId})` : undefined}
              />
              <circle cx="424" cy="136" r="3.5" fill="#38bdf8" />
              <foreignObject x="435" y="119" width="34" height="34">
                <div className="w-full h-full flex items-center justify-center text-cyan-300">
                  <TrendingUp className="w-7 h-7" />
                </div>
              </foreignObject>
              <text x="452" y="178" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="700">
                Business Growth
              </text>
            </g>

            {/* ================= BOTTOM-RIGHT: HIGHER PROFIT NODE ================= */}
            <g onClick={() => setActiveStage(3)} className="cursor-pointer">
              <rect
                x="424"
                y="196"
                width="56"
                height="56"
                rx="13"
                fill="#422006"
                stroke={activeStage === 3 ? '#fde047' : '#f59e0b'}
                strokeWidth={activeStage === 3 ? '2.6' : '1.6'}
                filter={activeStage === 3 ? `url(#${neonGlowId})` : undefined}
              />
              <circle cx="424" cy="224" r="3.5" fill="#fbbf24" />
              <foreignObject x="435" y="207" width="34" height="34">
                <div className="w-full h-full flex items-center justify-center text-amber-300">
                  <BadgeDollarSign className="w-7 h-7" />
                </div>
              </foreignObject>
              <text x="452" y="266" textAnchor="middle" fill="#fde047" fontSize="10.2" fontWeight="700">
                Higher Profit
              </text>
            </g>
          </svg>
        </div>

        {/* Bottom Active Stage Outcome + "Solutions" Button Linked to Services */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold text-white truncate">
                {isBn ? current.labelBn : current.label}
              </span>
              <span className="hidden sm:inline text-[10px] font-mono font-bold text-emerald-400 shrink-0 tabular-nums">
                · {current.metric}
              </span>
            </div>
            <p className="text-[10px] text-slate-300 truncate mt-0.5">
              {isBn ? current.descBn : current.desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('services')}
            className="btn-lighting inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/50 text-[11px] font-semibold text-cyan-300 transition-colors shrink-0"
          >
            <span>{isBn ? 'সমাধান দেখুন' : 'Solutions'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
