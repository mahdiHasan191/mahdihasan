export type Language = 'en' | 'bn';

// Helper to convert English digits to Bengali digits
export function toBengaliNumber(input: string | number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/[0-9]/g, (w) => bnDigits[+w]);
}

export interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    bn: 'Home',
  },
  'nav.about': {
    en: 'About',
    bn: 'About',
  },
  'nav.services': {
    en: 'Services',
    bn: 'Services',
  },
  'nav.portfolio': {
    en: 'Portfolio',
    bn: 'Portfolio',
  },
  'nav.experience': {
    en: 'Experience & Degrees',
    bn: 'Experience & Degrees',
  },
  'nav.achievements': {
    en: 'Achievements',
    bn: 'Achievements',
  },
  'nav.skills': {
    en: 'Skills',
    bn: 'Skills',
  },
  'nav.education': {
    en: 'Education (BBA + MBA)',
    bn: 'Education (BBA + MBA)',
  },
  'nav.certifications': {
    en: 'Certifications',
    bn: 'Certifications',
  },
  'nav.contact': {
    en: 'Contact',
    bn: 'Contact',
  },
  'nav.get_in_touch': {
    en: 'Get in Touch',
    bn: 'Get in Touch',
  },
  'nav.admin_portal': {
    en: 'Admin Portal',
    bn: 'Admin Portal',
  },

  // Hero Section
  'hero.badge': {
    en: 'Sales & AI Automation Specialist · Dhaka, Bangladesh',
    bn: 'Sales & AI Automation Specialist · Dhaka, Bangladesh',
  },
  'hero.headline': {
    en: 'Bridging Sales & AI Automation to Help Businesses Grow Smarter.',
    bn: 'Sales ও AI Automation-এর সমন্বয়ে ব্যবসাকে আরও Smartly এগিয়ে নেওয়া।',
  },
  'hero.description': {
    en: 'I help businesses streamline lead generation, sales reporting, and business workflows through AI-powered automation and n8n.',
    bn: 'আমি AI-powered Automation এবং n8n-এর মাধ্যমে ব্যবসায়ের Lead Generation, Sales Reporting এবং Business Workflows সহজ ও স্বয়ংক্রিয় করতে সাহায্য করি।',
  },
  'hero.btn_projects': {
    en: 'Explore Automation Projects',
    bn: 'Automation Projects দেখুন',
  },
  'hero.btn_contact': {
    en: 'Get in Touch',
    bn: 'Get in Touch',
  },
  'hero.btn_resume': {
    en: 'Resume',
    bn: 'Resume (CV)',
  },
  'hero.direct_connect': {
    en: 'Direct Connect:',
    bn: 'Direct Connect:',
  },
  'hero.kpi_exp_value': {
    en: '6+ Years',
    bn: '6+ Years',
  },
  'hero.kpi_exp_label': {
    en: 'Experience',
    bn: 'FMCG Experience',
  },
  'hero.kpi_exp_sub': {
    en: 'FMCG Sales Experience',
    bn: 'FMCG Sales Experience',
  },
  'hero.kpi_growth_value': {
    en: '~9%',
    bn: '~9%',
  },
  'hero.kpi_growth_label': {
    en: 'Annual Growth',
    bn: 'Annual Growth',
  },
  'hero.kpi_growth_sub': {
    en: 'Yearly Business Growth',
    bn: 'Yearly Business Growth',
  },
  'hero.kpi_target_value': {
    en: '~100%',
    bn: '~100%',
  },
  'hero.kpi_target_label': {
    en: 'Target Attainment',
    bn: 'Target Attainment',
  },
  'hero.kpi_target_sub': {
    en: 'Average Target Achievement',
    bn: 'Average Target Achievement',
  },
  'hero.kpi_awards_value': {
    en: '3x 1st Place',
    bn: '3x 1st Place',
  },
  'hero.kpi_awards_label': {
    en: 'Top Performer',
    bn: 'Top Performer',
  },
  'hero.kpi_awards_sub': {
    en: 'New Product Sales Achievement',
    bn: 'New Product Sales Top Performer',
  },
  'hero.avatar_title': {
    en: 'Sales & AI Automation Specialist',
    bn: 'Sales & AI Automation Specialist',
  },
  'hero.avatar_location': {
    en: 'Dhaka North Sales Territory · BBA + MBA',
    bn: 'Dhaka North Sales Territory · BBA + MBA',
  },
  'hero.avatar_badge': {
    en: 'Personal Profile · Real Photo Uploadable in Admin',
    bn: 'Personal Profile · Real Photo Uploadable in Admin',
  },

  // About Section
  'about.kicker': {
    en: '01. Professional Background & Synergy',
    bn: '01. Professional Background & Synergy',
  },
  'about.headline': {
    en: 'The Intersection of FMCG Sales & Intelligent Automation.',
    bn: 'The Intersection of FMCG Sales & Intelligent Automation.',
  },
  'about.bio_lead': {
    en: 'An FMCG Sales Professional with 6+ years of experience in sales operations, business development, and distributor management, now combining real-world business expertise with AI automation and digital marketing to help businesses improve efficiency, generate leads, and scale smarter.',
    bn: 'Sales Operations, Business Development এবং Distributor Management-এ 6+ বছরের অভিজ্ঞতাসম্পন্ন একজন FMCG Sales Professional; যিনি বাস্তব Field-level অভিজ্ঞতার সাথে AI Automation ও Digital Marketing-এর আধুনিক প্রযুক্তির সমন্বয় ঘটিয়ে Business Efficiency বৃদ্ধি, Lead Generation ও Smart Growth-এ ভূমিকা রাখছেন।',
  },
  'about.pillar1_title': {
    en: '6+ Years Ground FMCG Sales Operations',
    bn: '6+ Years Ground FMCG Sales Operations',
  },
  'about.pillar1_desc': {
    en: 'Managing sales territories, single distributor logistics, route-to-market execution, and direct supervision of five van pullers across Dhaka North territory.',
    bn: 'Dhaka North Territory-তে Sales কার্যক্রম পরিচালনা, Distributor Management, Route-to-market Execution এবং সরাসরি ৫ জন Van Puller তদারকি করার বাস্তব অভিজ্ঞতা।',
  },
  'about.pillar2_title': {
    en: 'AI Agent & Workflow Automation',
    bn: 'AI Agent & Workflow Automation',
  },
  'about.pillar2_desc': {
    en: 'Building custom automated workflows using n8n, Model Context Protocol (MCP), web scrapers (Apify), and API integrations to automate sales reporting and lead pipelines.',
    bn: 'n8n, Model Context Protocol (MCP), Web Scraping (Apify) এবং API Integration ব্যবহার করে Sales Reporting ও Lead Pipeline Automation।',
  },
  'about.edu_bba_mba': {
    en: 'Dual Business Degrees: BBA + MBA',
    bn: 'Dual Business Degrees: BBA + MBA',
  },
  'about.edu_bba_mba_desc': {
    en: 'Rigorous academic foundations combining marketing strategy, financial modeling, organizational behavior, and modern commercial decision-making.',
    bn: 'Marketing Strategy, Financial Modeling এবং Commercial Decision-Making-এর সুদৃঢ় প্রাতিষ্ঠানিক ভিত্তি।',
  },

  // Services Section
  'services.kicker': {
    en: '02. Core Capabilities & Offerings',
    bn: '02. Core Capabilities & Offerings',
  },
  'services.headline': {
    en: 'Specialized Sales & AI Automation Services',
    bn: 'Specialized Sales & AI Automation Services',
  },
  'services.subtitle': {
    en: 'End-to-end solutions bridging hands-on sales operations with custom AI agents, automated reporting, and modern digital acquisition.',
    bn: 'FMCG Sales অভিজ্ঞতার সাথে Modern AI Agents, Automated Reporting এবং Digital Lead Acquisition-এর পূর্ণাঙ্গ Solution।',
  },
  'services.deliverables': {
    en: 'Key Deliverables:',
    bn: 'Key Deliverables:',
  },
  'services.inquire_btn': {
    en: 'Inquire About Service',
    bn: 'Inquire About Service',
  },

  // Portfolio Section
  'portfolio.kicker': {
    en: '03. Featured Automation Workflows',
    bn: '03. Featured Automation Workflows',
  },
  'portfolio.headline': {
    en: 'Applied AI & Automation Projects',
    bn: 'Applied AI & Automation Projects',
  },
  'portfolio.subtitle': {
    en: 'Explore practical workflows built to solve sales reporting bottlenecks, lead scraping, and autonomous agent orchestration.',
    bn: 'Sales Reporting Bottlenecks দূরীকরণ, Lead Generation এবং Autonomous Agent পরিচালনার বাস্তবমুখী Project সমূহ।',
  },
  'portfolio.filter_all': {
    en: 'All Projects',
    bn: 'All Projects',
  },
  'portfolio.filter_completed': {
    en: 'Completed Solutions',
    bn: 'Completed Projects',
  },
  'portfolio.filter_learning': {
    en: 'Learning & Exploration',
    bn: 'Learning Projects',
  },
  'portfolio.badge_completed': {
    en: 'Completed Project',
    bn: 'Completed Project',
  },
  'portfolio.badge_learning': {
    en: 'Learning Project',
    bn: 'Learning Project',
  },
  'portfolio.btn_inspect': {
    en: 'Inspect Workflow Details',
    bn: 'Workflow Details দেখুন',
  },
  'portfolio.btn_live': {
    en: 'View Live / Repo',
    bn: 'Live Demo / Repo',
  },

  // Experience Section
  'experience.kicker': {
    en: '04. Ground Operations & Track Record',
    bn: '04. Ground Operations & Track Record',
  },
  'experience.headline': {
    en: '6+ Years FMCG Sales Leadership',
    bn: '6+ Years FMCG Sales Leadership',
  },
  'experience.subtitle': {
    en: 'Strictly verified track record in distributor management, retail penetration, route supervision, and new product sales in Dhaka North.',
    bn: 'Dhaka North Territory-তে Distributor Management, Retail Penetration, Route Supervision এবং New Product Sales-এর বাস্তব ট্র্যাক রেকর্ড।',
  },
  'experience.role': {
    en: 'Sales Officer · FMCG Operations',
    bn: 'Sales Officer · FMCG Operations',
  },
  'experience.territory': {
    en: 'Dhaka North Sales Territory',
    bn: 'Dhaka North Sales Territory',
  },
  'experience.verified_highlights': {
    en: 'Verified Operational Highlights:',
    bn: 'Verified Operational Highlights:',
  },

  // Achievement Gallery Section
  'achievements.kicker': {
    en: '05. Verified Distinctions & Milestones',
    bn: '05. Verified Distinctions & Milestones',
  },
  'achievements.headline': {
    en: 'Achievement Gallery',
    bn: 'Achievement Gallery',
  },
  'achievements.subtitle': {
    en: 'Documented recognitions and milestone achievements across FMCG sales leadership, territory target delivery, and commercial operational execution.',
    bn: 'FMCG Sales Leadership, Territory Target Delivery এবং Operational Execution-এর অফিসিয়াল Recognition।',
  },
  'achievements.all_categories': {
    en: 'All Recognitions',
    bn: 'All Recognitions',
  },
  'achievements.btn_inspect': {
    en: 'Inspect Details',
    bn: 'Inspect Details',
  },
  'achievements.btn_close': {
    en: 'Close Inspection',
    bn: 'Close Inspection',
  },
  'achievements.verified_badge': {
    en: 'Verified Record',
    bn: 'Verified Record',
  },
  'achievements.territory_tag': {
    en: 'Dhaka North Territory',
    bn: 'Dhaka North Territory',
  },

  // Skills Section
  'skills.kicker': {
    en: '06. Technical & Operational Toolkit',
    bn: '06. Technical & Operational Toolkit',
  },
  'skills.headline': {
    en: 'Core Skills & Domain Expertise',
    bn: 'Core Skills & Domain Expertise',
  },
  'skills.subtitle': {
    en: 'Categorized competencies combining modern AI automation with practical FMCG sales execution and performance marketing.',
    bn: 'Modern AI Automation, Practical FMCG Sales Execution এবং Performance Marketing দক্ষতার সমন্বয়।',
  },
  'skills.cat_ai': {
    en: 'AI Automation',
    bn: 'AI Automation',
  },
  'skills.cat_lead': {
    en: 'Lead Generation',
    bn: 'Lead Generation',
  },
  'skills.cat_sales': {
    en: 'FMCG Sales',
    bn: 'FMCG Sales',
  },
  'skills.cat_marketing': {
    en: 'Digital Marketing',
    bn: 'Digital Marketing',
  },

  // Education & Certifications
  'education.kicker': {
    en: '07. Academic Qualifications',
    bn: '07. Academic Qualifications',
  },
  'education.headline': {
    en: 'Education (BBA + MBA)',
    bn: 'Education (BBA + MBA)',
  },
  'certifications.kicker': {
    en: '08. Professional Credentials',
    bn: '08. Professional Credentials',
  },
  'certifications.headline': {
    en: 'Certifications & Applied Studies',
    bn: 'Certifications & Applied Studies',
  },

  // Contact Section
  'contact.kicker': {
    en: '09. Direct Inquiries & Collaboration',
    bn: '09. Direct Inquiries & Collaboration',
  },
  'contact.headline': {
    en: 'Let’s Discuss Sales Acceleration & AI Automation',
    bn: 'Sales Acceleration ও AI Automation নিয়ে আলোচনা করুন',
  },
  'contact.subtitle': {
    en: 'Whether you need distributor sales reporting automation, high-intent lead generation pipelines, custom MCP AI agents, or performance marketing campaigns, I’m ready to collaborate.',
    bn: 'Distributor Sales Reporting Automation, High-intent Lead Generation, Custom MCP AI Agents অথবা Performance Marketing-এর জন্য সরাসরি আলোচনা করুন।',
  },
  'contact.email_label': {
    en: 'Email Address',
    bn: 'Email Address',
  },
  'contact.whatsapp_label': {
    en: 'WhatsApp Instant Chat',
    bn: 'WhatsApp Instant Chat',
  },
  'contact.location_label': {
    en: 'Based In',
    bn: 'Location',
  },
  'contact.form_title': {
    en: 'Send a Direct Message',
    bn: 'Send a Direct Message',
  },
  'contact.form_sub': {
    en: 'Fill in the details below and your message will be dispatched directly to my inbox and inquiry tracker.',
    bn: 'নিচের ফর্মটি পূরণ করুন, বার্তাটি সরাসরি আমার Gmail ইনবক্সে পৌঁছে যাবে।',
  },
  'contact.form_name': {
    en: 'Your Name',
    bn: 'Your Name',
  },
  'contact.form_email': {
    en: 'Email Address',
    bn: 'Email Address',
  },
  'contact.form_phone': {
    en: 'Phone / WhatsApp (Optional)',
    bn: 'Phone / WhatsApp (Optional)',
  },
  'contact.form_company': {
    en: 'Organization / Brand (Optional)',
    bn: 'Organization / Brand (Optional)',
  },
  'contact.form_service': {
    en: 'Service Interest',
    bn: 'Service Interest',
  },
  'contact.form_message': {
    en: 'Project Details or Message',
    bn: 'Project Details / Message',
  },
  'contact.form_submit': {
    en: 'Send Message',
    bn: 'Send Message to Gmail',
  },
  'contact.form_submitting': {
    en: 'Dispatching to Gmail...',
    bn: 'Dispatching to Gmail...',
  },
  'contact.success_title': {
    en: 'Inquiry Dispatched Successfully!',
    bn: 'Inquiry Dispatched Successfully!',
  },
  'contact.success_desc': {
    en: 'Thank you for reaching out. I have received your request and will get back to you shortly.',
    bn: 'যোগাযোগ করার জন্য ধন্যবাদ। বার্তাটি গৃহীত হয়েছে এবং দ্রুত উত্তর দেওয়া হবে।',
  },
  'contact.send_another': {
    en: 'Send Another Message',
    bn: 'Send Another Message',
  },

  // Footer Section
  'footer.live_visitors': {
    en: 'Live Visitor Counter:',
    bn: 'Live Visitor Counter:',
  },
  'footer.powered_by': {
    en: 'Powered by Supabase Realtime & PostgreSQL',
    bn: 'Powered by Supabase Realtime & PostgreSQL',
  },
  'footer.rights': {
    en: 'All rights reserved. Built with React, TypeScript & Supabase.',
    bn: 'All rights reserved. Built with React, TypeScript & Supabase.',
  },

  // Language Switcher labels
  'lang.switch_to_bn': {
    en: 'Switch to Bengali (বাংলা)',
    bn: 'বাংলায় দেখুন',
  },
  'lang.switch_to_en': {
    en: 'Switch to English',
    bn: 'Switch to English',
  },
};
