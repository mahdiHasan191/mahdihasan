import fs from 'node:fs';
import path from 'node:path';

const SITE_ORIGIN = 'https://mahdihasan.pages.dev';
const OG_IMAGE = `${SITE_ORIGIN}/og-banner.png`;
const TODAY = new Date().toISOString().split('T')[0];

const PUBLIC_ROUTES = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'Mahdi Hasan | AI Automation & Sales Operations Specialist',
    description:
      'AI Automation & Sales Operations Specialist helping FMCG teams and small businesses automate lead generation, sales reporting, customer follow-up, and workflows with n8n & MCP.',
    h1: 'AI Automation & Sales Operations Specialist for FMCG and Small Businesses.',
    kicker: 'FMCG Sales Operations · AI & n8n Workflow Engineering · Dhaka, Bangladesh',
    paragraphs: [
      'I help FMCG teams and small businesses automate lead generation, sales reporting, customer follow-up, and daily business workflows using AI, n8n, and modern automation tools.',
      'Core Services: AI Workflow Automation, n8n Business Automation, AI Agent Development, Lead Generation Automation, Sales Report Automation, WhatsApp & Customer Follow-up Automation, Data Cleaning & Business Dashboard, and MCP & API Integration.',
      'Work Process: Discover → Design → Automate → Support. Direct contact: mhmasum7619@gmail.com.',
    ],
  },
  {
    path: '/about/',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'About Mahdi Hasan | 6+ Years FMCG Sales & AI Automation',
    description:
      'Learn how Mahdi Hasan combines 6+ years of FMCG sales leadership in Dhaka North with n8n workflow engineering, AI agents, and MCP business automation.',
    h1: 'Bridging 6+ Years of FMCG Sales Operations with Practical AI Automation.',
    kicker: 'About Mahdi Hasan · BBA + MBA · Dhaka, Bangladesh',
    paragraphs: [
      'Over 6 years of hands-on FMCG sales operations managing distributor performance, supervising five van pullers, achieving ~100% average target delivery and ~9% yearly business growth in Dhaka North territory.',
      'Now engineering reliable AI workflows, n8n integrations, and MCP business tools so commercial teams eliminate repetitive Excel consolidation and manual lead chasing.',
    ],
  },
  {
    path: '/services/',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'AI Automation & Sales Operations Services | Mahdi Hasan',
    description:
      'Explore 8 specialized AI automation services: n8n workflows, AI agents, lead generation, FMCG sales reporting, WhatsApp follow-up, dashboards, and MCP/API integration.',
    h1: 'AI Automation & Sales Operations Services Built for Real Business Bottlenecks.',
    kicker: 'Service Catalog · Problem → Solution → Tools → Scope',
    paragraphs: [
      'Services offered: AI Workflow Automation, n8n Business Automation, AI Agent Development, Lead Generation Automation, Sales Report Automation, WhatsApp & Customer Follow-up Automation, Data Cleaning & Business Dashboard, and MCP & API Integration.',
      'Every service engagement clearly defines the problem solved, automation tools used, realistic expected outcomes, and delivery scope.',
    ],
  },
  {
    path: '/services/ai-automation/',
    priority: '0.85',
    changefreq: 'monthly',
    title: 'AI Workflow & Agent Development Service | Mahdi Hasan',
    description:
      'Custom AI workflow automation and Model Context Protocol (MCP) business assistant development for FMCG operations and small businesses.',
    h1: 'AI Workflow Automation & Custom AI Agent Development.',
    kicker: 'Service Specialization · AI Models & MCP Architecture',
    paragraphs: [
      'Design and deploy structured AI agents using Model Context Protocol (MCP), strict JSON tool schemas, and human-in-the-loop guardrails for customer inquiry triage, proposal drafting, and internal knowledge Q&A.',
    ],
  },
  {
    path: '/services/n8n-automation/',
    priority: '0.85',
    changefreq: 'monthly',
    title: 'n8n Workflow & WhatsApp Follow-up Automation | Mahdi Hasan',
    description:
      'End-to-end n8n workflow engineering connecting WhatsApp, Gmail, Webhooks, Google Sheets, and CRMs for zero manual data entry.',
    h1: 'n8n Business Workflow & Customer Follow-up Automation.',
    kicker: 'Service Specialization · n8n Nodes, Webhooks & CRM Sync',
    paragraphs: [
      'Connect inbound web forms, WhatsApp messages, Gmail threads, Google Sheets, and Supabase into automated n8n execution pipelines with instant response routing and error notifications.',
    ],
  },
  {
    path: '/services/sales-reporting/',
    priority: '0.85',
    changefreq: 'monthly',
    title: 'FMCG Sales Reporting & Dashboard Automation | Mahdi Hasan',
    description:
      'Automated daily distributor sales sheet cleaning, target-vs-achievement tracking, and closing dashboards for FMCG & retail teams.',
    h1: 'FMCG Sales Reporting, Data Cleaning & Business Dashboard Automation.',
    kicker: 'Service Specialization · Sales Operations & Territory Analytics',
    paragraphs: [
      'Automate primary and secondary distributor Excel sheet consolidation, SKU variance checks, and daily manager summary dispatches without manual copy-paste errors.',
    ],
  },
  {
    path: '/case-studies/',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'AI & Sales Automation Case Studies | Mahdi Hasan',
    description:
      'Realistic case studies and workflow architectures covering FMCG sales reporting automation, lead generation follow-up, and MCP business AI assistants.',
    h1: 'Automation Case Studies & Sample Workflow Architectures.',
    kicker: 'Blueprints · Before vs. After Workflows',
    paragraphs: [
      'Sample Project 1: FMCG Sales Reporting Automation (n8n + Google Sheets + Python + Email).',
      'Sample Project 2: Lead Generation & Instant WhatsApp/Gmail Follow-up Automation (Webhooks + n8n + AI Scoring + CRM).',
      'Sample Project 3: MCP-Based Business Assistant connecting AI tools cleanly to Supabase & Google Sheets.',
    ],
  },
  {
    path: '/credentials/',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Experience, Degrees (BBA + MBA) & Achievements | Mahdi Hasan',
    description:
      'Verified 6+ years FMCG Sales Officer track record in Dhaka North territory, BBA + MBA degrees, 3x First-Place New Product Sales recognition, and automation credentials.',
    h1: 'Verified FMCG Experience, Education (BBA + MBA) & Achievements.',
    kicker: 'Track Record & Academic Credentials',
    paragraphs: [
      '6+ years FMCG Sales Officer experience in Dhaka North territory managing primary distributor logistics, supervising 5 van pullers, achieving ~100% average target attainment, ~9% annual growth, and 3x First-Place awards in New Product Sales.',
    ],
  },
  {
    path: '/contact/',
    priority: '0.85',
    changefreq: 'monthly',
    title: 'Book a Consultation & Contact | Mahdi Hasan',
    description:
      'Book an AI automation or sales operations consultation with Mahdi Hasan via direct email (mhmasum7619@gmail.com) or WhatsApp.',
    h1: 'Book an Automation Consultation or Start a Project.',
    kicker: 'Direct Email & WhatsApp Response · Dhaka, Bangladesh',
    paragraphs: [
      'Send your workflow requirements directly to mhmasum7619@gmail.com or reach out via WhatsApp (+8801639200615), LinkedIn, and GitHub.',
    ],
  },
  {
    path: '/privacy/',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Privacy Policy & Inquiry Data Handling | Mahdi Hasan',
    description:
      'Privacy policy explaining how consultation inquiries and visitor data are handled securely on mahdihasan.pages.dev.',
    h1: 'Privacy Policy & Data Handling.',
    kicker: 'Transparency & Security Policy',
    paragraphs: [
      'Information submitted through the consultation form is sent strictly to respond to your project inquiry and is never sold or shared with third-party marketers.',
    ],
  },
];

const NOINDEX_ROUTES = [
  {
    path: '/admin/',
    title: 'Admin Console | Mahdi Hasan',
    h1: 'Restricted Administrator Console',
  },
  {
    path: '/admin/login/',
    title: 'Admin Sign In | Mahdi Hasan',
    h1: 'Restricted Administrator Sign In',
  },
];

const distDir = path.resolve('dist');
const publicDir = path.resolve('public');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html missing. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf8');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildFallbackRootHtml(route) {
  const navLinks = [
    ['/', 'Home'],
    ['/about/', 'About'],
    ['/services/', 'Services'],
    ['/case-studies/', 'Case Studies'],
    ['/credentials/', 'Experience &amp; Degrees'],
    ['/contact/', 'Contact'],
  ]
    .map(
      ([href, label]) =>
        `<a href="${href}" style="color:#cbd5e1;text-decoration:none;font-size:14px;">${label}</a>`
    )
    .join('\n          ');

  const bodyParas = route.paragraphs
    .map((p) => `<p style="color:#cbd5e1;font-size:16px;margin:0 0 14px;">${escapeHtml(p)}</p>`)
    .join('\n        ');

  return `<div id="root">
      <header style="max-width:1120px;margin:0 auto;padding:24px 20px;border-bottom:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <a href="/" style="color:#ffffff;font-weight:700;font-size:20px;text-decoration:none;">Mahdi Hasan</a>
        <nav aria-label="Primary Navigation" style="display:flex;gap:16px;flex-wrap:wrap;">
          ${navLinks}
        </nav>
      </header>
      <main style="max-width:1120px;margin:0 auto;padding:48px 20px;line-height:1.65;">
        <p style="color:#22d3ee;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(route.kicker)}</p>
        <h1 style="color:#ffffff;font-size:36px;font-weight:800;margin:12px 0 18px;">${escapeHtml(route.h1)}</h1>
        ${bodyParas}
        <p style="color:#94a3b8;font-size:14px;margin-top:24px;">
          Contact: <a href="mailto:mhmasum7619@gmail.com" style="color:#22d3ee;">mhmasum7619@gmail.com</a> ·
          <a href="/privacy/" style="color:#94a3b8;">Privacy Policy</a>
        </p>
      </main>
    </div>`;
}

function injectRouteHead(html, route, robotsDirective) {
  const canonicalUrl = `${SITE_ORIGIN}${route.path}`;
  const safeTitle = escapeHtml(route.title);
  const safeDesc = escapeHtml(route.description || route.title);

  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="robots"[^>]*>/i,
      `<meta name="robots" content="${robotsDirective}" />`
    )
    .replace(
      /<link\s+rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:url"[^>]*>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:title"[^>]*>/i,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"[^>]*>/i,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:image"[^>]*>/i,
      `<meta property="og:image" content="${OG_IMAGE}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"[^>]*>/i,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"[^>]*>/i,
      `<meta name="twitter:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"[^>]*>/i,
      `<meta name="twitter:image" content="${OG_IMAGE}" />`
    );

  // Replace root div fallback block
  out = out.replace(
    /<div id="root">[\s\S]*?<\/div>\s*(?=<script type="module")/,
    `${buildFallbackRootHtml(route)}\n    `
  );

  return out;
}

// 1. Pre-render all public indexable routes
for (const route of PUBLIC_ROUTES) {
  const renderedHtml = injectRouteHead(baseHtml, route, 'index, follow');
  const relativeDir = route.path === '/' ? '' : route.path.replace(/^\/|\/$/g, '');
  const targetDir = relativeDir ? path.join(distDir, relativeDir) : distDir;
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), renderedHtml, 'utf8');
}

// 2. Pre-render noindex admin shell routes
for (const adminRoute of NOINDEX_ROUTES) {
  const renderedAdmin = injectRouteHead(
    baseHtml,
    {
      ...adminRoute,
      description: 'Restricted administrator console.',
      kicker: 'Restricted Access',
      paragraphs: ['Administrator sign-in required.'],
    },
    'noindex, nofollow'
  );
  const relativeDir = adminRoute.path.replace(/^\/|\/$/g, '');
  const targetDir = path.join(distDir, relativeDir);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), renderedAdmin, 'utf8');
}

// 3. Write clean sitemap.xml (public indexable routes only)
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_ORIGIN}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');

// 4. Write clean robots.txt blocking admin routes
const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /admin/login

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

console.log(`Pre-rendered ${PUBLIC_ROUTES.length} public SEO routes, sitemap.xml, and robots.txt into dist/`);
