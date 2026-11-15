export type AppRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'service_ai'
  | 'service_n8n'
  | 'service_sales'
  | 'case_studies'
  | 'credentials'
  | 'contact'
  | 'privacy'
  | 'admin_login'
  | 'admin_dashboard'
  | 'not_found';

export interface RouteMeta {
  route: AppRoute;
  path: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  keywords: string;
  robots: string;
  ogType?: string;
  staticSummary: string[];
}

export const SITE_ORIGIN = 'https://mahdihasan.pages.dev';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-banner.png`;

export const ROUTE_META_MAP: Record<AppRoute, RouteMeta> = {
  home: {
    route: 'home',
    path: '/',
    title: 'Mahdi Hasan | AI Automation & Sales Operations Specialist',
    description:
      'AI Automation & Sales Operations Specialist helping FMCG teams and small businesses automate lead generation, sales reporting, customer follow-up, and workflows with n8n & MCP.',
    h1: 'AI Automation & Sales Operations Specialist for FMCG and Small Businesses.',
    kicker: 'FMCG Sales Operations · AI & n8n Workflow Engineering · Dhaka, Bangladesh',
    keywords:
      'Mahdi Hasan, AI Automation Specialist, Sales Operations Specialist, FMCG Sales Reporting, n8n Automation, AI Agent Development, MCP Integration, Lead Generation Automation, Dhaka Bangladesh',
    robots: 'index, follow',
    ogType: 'website',
    staticSummary: [
      'I help FMCG teams and small businesses automate lead generation, sales reporting, customer follow-up, and daily business workflows using AI, n8n, and modern automation tools.',
      'Core Services: AI Workflow Automation, n8n Automation, AI Agent Development, Lead Generation Automation, Sales Report Automation, WhatsApp & Customer Follow-up Automation, Data Cleaning & Business Dashboard, MCP & API Integration.',
      'Work Process: Discover → Design → Automate → Support. Direct contact: mhmasum7619@gmail.com | Dhaka, Bangladesh.',
    ],
  },
  about: {
    route: 'about',
    path: '/about/',
    title: 'About Mahdi Hasan | 6+ Years FMCG Sales & AI Automation',
    description:
      'Learn how Mahdi Hasan combines 6+ years of FMCG sales leadership in Dhaka North with n8n workflow engineering, AI agents, and MCP business automation.',
    h1: 'Bridging 6+ Years of FMCG Sales Operations with Practical AI Automation.',
    kicker: 'About Mahdi Hasan · BBA + MBA · Dhaka, Bangladesh',
    keywords:
      'About Mahdi Hasan, FMCG Sales Officer Dhaka North, AI Automation Specialist Bangladesh, BBA MBA Sales Operations',
    robots: 'index, follow',
    ogType: 'profile',
    staticSummary: [
      '6+ years of hands-on FMCG sales operations managing distributor performance, supervising five van pullers, achieving ~100% average target delivery and ~9% yearly business growth in Dhaka North territory.',
      'Combining commercial field insight with modern automation tools (n8n, Supabase, REST APIs, MCP, OpenAI/Gemini) to eliminate manual spreadsheets and missed customer inquiries.',
    ],
  },
  services: {
    route: 'services',
    path: '/services/',
    title: 'AI Automation & Sales Operations Services | Mahdi Hasan',
    description:
      'Explore 8 specialized AI automation services: n8n workflows, AI agents, lead generation, FMCG sales reporting, WhatsApp follow-up, dashboards, and MCP/API integration.',
    h1: 'AI Automation & Sales Operations Services Built for Real Business Bottlenecks.',
    kicker: 'Service Catalog · Problem → Solution → Tools → Scope',
    keywords:
      'AI workflow automation service, n8n automation developer, sales report automation, WhatsApp follow-up automation, MCP API integration',
    robots: 'index, follow',
    ogType: 'website',
    staticSummary: [
      'Structured AI automation solutions covering AI Workflow Automation, n8n Business Automation, AI Agent Development, Lead Generation, FMCG Sales Reporting, WhatsApp Follow-up, Data Cleaning & Dashboards, and MCP/API Integration.',
    ],
  },
  service_ai: {
    route: 'service_ai',
    path: '/services/ai-automation/',
    title: 'AI Workflow & Agent Development Service | Mahdi Hasan',
    description:
      'Custom AI workflow automation and Model Context Protocol (MCP) business assistant development for FMCG operations and small businesses.',
    h1: 'AI Workflow Automation & Custom AI Agent Development.',
    kicker: 'Service Specialization · AI Models & MCP Architecture',
    keywords:
      'AI workflow automation, custom AI agent development, MCP business assistant, LLM tool calling',
    robots: 'index, follow',
    ogType: 'website',
    staticSummary: [
      'Design and deploy structured AI agents using Model Context Protocol (MCP), strict JSON tool schemas, and human-in-the-loop guardrails for inquiry triage, proposal drafting, and database Q&A.',
    ],
  },
  service_n8n: {
    route: 'service_n8n',
    path: '/services/n8n-automation/',
    title: 'n8n Workflow & WhatsApp Follow-up Automation | Mahdi Hasan',
    description:
      'End-to-end n8n workflow engineering connecting WhatsApp, Gmail, Webhooks, Google Sheets, and CRMs for zero manual data entry.',
    h1: 'n8n Business Workflow & Customer Follow-up Automation.',
    kicker: 'Service Specialization · n8n Nodes, Webhooks & CRM Sync',
    keywords:
      'n8n workflow automation expert, WhatsApp follow-up automation, CRM webhook integration',
    robots: 'index, follow',
    ogType: 'website',
    staticSummary: [
      'Connect inbound web forms, WhatsApp messages, Gmail threads, Google Sheets, and Supabase into automated n8n execution pipelines with error alerts and audit logs.',
    ],
  },
  service_sales: {
    route: 'service_sales',
    path: '/services/sales-reporting/',
    title: 'FMCG Sales Reporting & Dashboard Automation | Mahdi Hasan',
    description:
      'Automated daily distributor sales sheet cleaning, target-vs-achievement tracking, and automated closing dashboards for FMCG & retail teams.',
    h1: 'FMCG Sales Reporting, Data Cleaning & Business Dashboard Automation.',
    kicker: 'Service Specialization · Sales Operations & Territory Analytics',
    keywords:
      'FMCG sales report automation, distributor sheet automation, business sales dashboard, Excel data cleaning',
    robots: 'index, follow',
    ogType: 'website',
    staticSummary: [
      'Eliminate daily manual copy-paste across distributor primary/secondary sales sheets using automated Python parsers, n8n triggers, Google Sheets sync, and clear KPI dashboards.',
    ],
  },
  case_studies: {
    route: 'case_studies',
    path: '/case-studies/',
    title: 'AI & Sales Automation Case Studies | Mahdi Hasan',
    description:
      'Realistic case studies and workflow architectures covering FMCG sales reporting automation, lead generation follow-up, and MCP business AI assistants.',
    h1: 'Automation Case Studies & Sample Workflow Architectures.',
    kicker: 'Proven Blueprints · Before vs. After Workflows',
    keywords:
      'AI automation case studies, FMCG sales reporting workflow, lead generation automation workflow, MCP AI assistant architecture',
    robots: 'index, follow',
    ogType: 'website',
    staticSummary: [
      'Detailed breakdown of problem before automation, tools used (n8n, Python, Apify, Supabase, MCP), expected workflow timing, and interactive architecture diagrams without inflated metrics.',
    ],
  },
  credentials: {
    route: 'credentials',
    path: '/credentials/',
    title: 'Experience, Degrees (BBA + MBA) & Achievements | Mahdi Hasan',
    description:
      'Verified 6+ years FMCG Sales Officer track record in Dhaka North territory, BBA + MBA degrees, 3x First-Place New Product Sales recognition, and automation credentials.',
    h1: 'Verified FMCG Experience, Education (BBA + MBA) & Achievements.',
    kicker: 'Track Record & Academic Credentials',
    keywords:
      'Mahdi Hasan credentials, FMCG Sales Officer Dhaka North, BBA MBA Bangladesh, 3x first place new product sales',
    robots: 'index, follow',
    ogType: 'profile',
    staticSummary: [
      '6+ years FMCG sales experience as Sales Officer in Dhaka North territory: ~9% yearly business growth, ~100% average target achievement, 3x first place in new product sales, managing distributor & 5 van pullers.',
    ],
  },
  contact: {
    route: 'contact',
    path: '/contact/',
    title: 'Book a Consultation & Contact | Mahdi Hasan',
    description:
      'Book an AI automation or sales operations consultation with Mahdi Hasan via direct email (mhmasum7619@gmail.com) or WhatsApp.',
    h1: 'Book an Automation Consultation or Start a Project.',
    kicker: 'Direct Email & WhatsApp Response · Dhaka, Bangladesh',
    keywords:
      'Contact Mahdi Hasan, book AI automation consultation, n8n developer contact, mhmasum7619@gmail.com',
    robots: 'index, follow',
    ogType: 'website',
    staticSummary: [
      'Send project requirements directly to mhmasum7619@gmail.com or connect on WhatsApp (+8801639200615), LinkedIn, and GitHub.',
    ],
  },
  privacy: {
    route: 'privacy',
    path: '/privacy/',
    title: 'Privacy Policy & Inquiry Data Handling | Mahdi Hasan',
    description:
      'Privacy policy detailing how inquiry messages, consultation details, and basic visitor analytics are handled securely.',
    h1: 'Privacy Policy & Data Handling.',
    kicker: 'Transparency & Security Policy',
    keywords: 'Privacy Policy, Mahdi Hasan Portfolio',
    robots: 'index, follow',
    ogType: 'website',
    staticSummary: [
      'Information submitted through the consultation form is used strictly to respond to project inquiries and is never sold or shared with third-party marketers.',
    ],
  },
  admin_login: {
    route: 'admin_login',
    path: '/admin/login',
    title: 'Admin Login | Mahdi Hasan',
    description: 'Restricted administrator authentication.',
    h1: 'Administrator Sign In',
    kicker: 'Restricted Access',
    keywords: '',
    robots: 'noindex, nofollow',
    ogType: 'website',
    staticSummary: ['Restricted administrator sign-in area.'],
  },
  admin_dashboard: {
    route: 'admin_dashboard',
    path: '/admin',
    title: 'Admin Dashboard | Mahdi Hasan',
    description: 'Restricted administrator console.',
    h1: 'Administrator Console',
    kicker: 'Restricted Access',
    keywords: '',
    robots: 'noindex, nofollow',
    ogType: 'website',
    staticSummary: ['Restricted administrator management console.'],
  },
  not_found: {
    route: 'not_found',
    path: '/404',
    title: '404 Page Not Found | Mahdi Hasan',
    description: 'The requested page could not be found.',
    h1: '404 — Page Not Found',
    kicker: 'Route Not Found',
    keywords: '',
    robots: 'noindex, follow',
    ogType: 'website',
    staticSummary: ['The requested URL does not exist on mahdihasan.pages.dev.'],
  },
};

export const PUBLIC_INDEXABLE_ROUTES: RouteMeta[] = [
  ROUTE_META_MAP.home,
  ROUTE_META_MAP.about,
  ROUTE_META_MAP.services,
  ROUTE_META_MAP.service_ai,
  ROUTE_META_MAP.service_n8n,
  ROUTE_META_MAP.service_sales,
  ROUTE_META_MAP.case_studies,
  ROUTE_META_MAP.credentials,
  ROUTE_META_MAP.contact,
  ROUTE_META_MAP.privacy,
];

export function resolveRouteFromPathname(rawPathname: string, rawHash = ''): {
  route: AppRoute;
  adminTab: string;
} {
  const cleanPath = rawPathname.replace(/\/+$/, '') || '/';
  const cleanHash = rawHash.replace(/^#/, '');

  if (cleanPath === '/admin/login' || cleanHash === 'admin/login') {
    return { route: 'admin_login', adminTab: 'dashboard' };
  }
  if (cleanPath === '/admin' || cleanPath.startsWith('/admin/') || cleanHash.startsWith('admin')) {
    const parts = cleanHash.split('/');
    return { route: 'admin_dashboard', adminTab: parts[1] || 'dashboard' };
  }
  if (cleanPath === '/about') return { route: 'about', adminTab: 'dashboard' };
  if (cleanPath === '/services') return { route: 'services', adminTab: 'dashboard' };
  if (cleanPath === '/services/ai-automation') return { route: 'service_ai', adminTab: 'dashboard' };
  if (cleanPath === '/services/n8n-automation') return { route: 'service_n8n', adminTab: 'dashboard' };
  if (cleanPath === '/services/sales-reporting') return { route: 'service_sales', adminTab: 'dashboard' };
  if (cleanPath === '/case-studies') return { route: 'case_studies', adminTab: 'dashboard' };
  if (
    cleanPath === '/credentials' ||
    cleanHash === 'credentials' ||
    cleanHash.startsWith('credentials') ||
    cleanHash === 'experience' ||
    cleanHash === 'education' ||
    cleanHash === 'achievements'
  ) {
    return { route: 'credentials', adminTab: 'dashboard' };
  }
  if (cleanPath === '/contact') return { route: 'contact', adminTab: 'dashboard' };
  if (cleanPath === '/privacy') return { route: 'privacy', adminTab: 'dashboard' };
  if (cleanPath === '/' || cleanPath === '/index.html') {
    return { route: 'home', adminTab: 'dashboard' };
  }

  return { route: 'not_found', adminTab: 'dashboard' };
}
