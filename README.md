# Mahdi Hasan — Personal Brand Website & Admin Portal

> **Sales & AI Automation Specialist** · Dhaka, Bangladesh  
> *"Bridging Sales & AI Automation to Help Businesses Grow Smarter."*

A production-grade, technology-inspired personal branding website and content management portal for **Mahdi Hasan**. Built with React 19, TypeScript, Vite, Tailwind CSS, and Supabase PostgreSQL with Row Level Security (RLS), Supabase Auth, and Supabase Storage. Fully optimized for zero-configuration deployment to **GitHub** and **Cloudflare Pages**.

---

## 🚀 Key Highlights & Architectural Features

- **Public Showcase & Lead Capture**:
  - **Hero**: High-impact split-screen with professional portrait, brand tagline, and verified 4-metric KPI strip:
    - *6+ Years FMCG Sales Leadership*
    - *~9% Yearly Revenue Growth*
    - *~100% Average Target Achievement*
    - *3x New Product Sales Top Performer*
  - **About Me**: Deep narrative bridging grounded FMCG sales operations in the Dhaka North Territory with modern AI agents and workflow automation.
  - **Services (12)**: AI Agent Development, Lead Generation Automation, Sales Reporting Automation, Email Automation, Business Process Automation, Digital Marketing, SEO, Social Media Marketing, Facebook Ads, Google Ads, Content Marketing, Marketing Automation.
  - **Portfolio**: 5 initial editable projects with distinct tags for **Completed** vs **Learning** projects (e.g. *AI Travel Assistant Using MCP*, *LinkedIn Job Alert Automation*, *Sales Reporting Automation*), with rich modal breakdowns of bottlenecks, automations, and outcomes.
  - **Professional Experience**: Verified FMCG sales officer track record, distributor management, and market expansion achievements.
  - **Education**: BBA + MBA academic qualifications.
  - **Certifications**: Industry accreditations across AI agent architectures, sales leadership, and performance marketing.
  - **Testimonials**: Endorsements from FMCG regional managers, distributors, and automation clients.
  - **Direct Contact & Inquiries**: Email (`mhmasum7619@gmail.com`), WhatsApp direct chat (`+8801639200615`), LinkedIn, Facebook, and an active inquiry form saving directly to the database.

- **Full-Featured Admin Dashboard** (`/admin` and `/admin/login`):
  - **Supabase Authentication**: Secure login restricted to authorized administrators (no public self-registration).
  - **17 Dedicated Management Modules**:
    1. Dashboard KPIs & real-time analytics
    2. Profile Management
    3. Homepage / Hero customization
    4. About Narrative
    5. Skills Management (proficiency sliders, tags, categories)
    6. Services Management (all 12 services, publish/unpublish, deliverables)
    7. Projects Management (add/edit/delete, Completed vs Learning, media)
    8. FMCG Experience Management (exact metrics, responsibilities)
    9. Education Management (BBA + MBA)
    10. Certifications Management
    11. Testimonials Management
    12. Social Channels & WhatsApp links
    13. Contact Information
    14. Resume Upload / Management (`resumes` bucket)
    15. SEO & OpenGraph Social Meta
    16. Inquiries Inbox (view, mark as read/replied, delete)
    17. Supabase Setup & SQL Schema Generator (1-click copy script)

- **Security & Data Layer**:
  - Supabase Row Level Security (RLS) ensures public visitors can only read published content and submit inquiries, while only authenticated administrators can alter records.
  - Dual-mode resilience: Connects directly to live Cloud Supabase, or runs seamlessly in local persistent mode when keys are pending.

---

## 📦 Tech Stack

- **Framework**: React 19, TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`)
- **Icons**: Lucide Icons
- **Database & Auth**: Supabase PostgreSQL, Supabase Auth, Supabase Storage
- **Deployment Targets**: GitHub, Cloudflare Pages

---

## 🛠️ Local Development & Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahdihasan/mahdi-hasan-portfolio.git
   cd mahdi-hasan-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional for cloud sync):
   Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-public-key"
   ```
   *(Note: If left blank, the app runs smoothly with local persistent state and initial seed data.)*

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

---

## ☁️ Supabase Cloud Database Setup

To link your live Supabase cloud database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor → New Query**.
3. Copy the complete SQL script from `supabase/schema.sql` (or from the in-app **Supabase & SQL Hub** in `/admin`) and click **Run**.
   - This creates all 11 tables with Row Level Security (RLS) policies.
   - It also provisions the `portfolio-images` and `resumes` storage buckets.
4. Go to **Project Settings → API** and copy:
   - **Project URL**
   - **anon / public key**
5. Enter them either into `.env.local` or directly into the **Supabase Setup Hub** in the Admin Dashboard!

---

## 🚀 Cloudflare Pages Deployment Guide

This project is pre-configured for instant zero-configuration deployment to Cloudflare Pages:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit of Mahdi Hasan portfolio"
   git push origin main
   ```

2. **Deploy on Cloudflare Pages**:
   - Log into your Cloudflare Dashboard and navigate to **Workers & Pages → Create Application → Pages → Connect to Git**.
   - Select your GitHub repository.
   - Configure build settings:
     - **Framework preset**: `Vite`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/` (or leave default)

3. **Set Environment Variables on Cloudflare Pages**:
   - Under **Settings → Environment variables**, add:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon public API key

4. **Single-Page Application (SPA) Fallback**:
   - Cloudflare Pages automatically reads the included `public/_redirects` file (`/* /index.html 200`), guaranteeing that deep links like `/admin` and `/admin/login` never return 404 errors.

---

## 🔐 Administrator Access & Credentials

- Admin Login URL: `/admin/login` or click the lock icon in the top header.
- Authorized Admin Email: `mhmasum7619@gmail.com`
- In Local / Setup mode, you can log in directly using the "Sign In as Mahdi Hasan (Admin Demo)" button to test all modules.

---

## 📄 License

Apache-2.0. Created for Mahdi Hasan.
