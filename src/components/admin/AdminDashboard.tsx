import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { db, saveSupabaseCredentials, clearSupabaseCredentials, getSupabaseCredentials, isSupabaseConfigured } from '../../lib/supabase';
import {
  LayoutDashboard,
  User,
  Home,
  FileText,
  Wrench,
  Layers,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  MessageSquare,
  Share2,
  Phone,
  FileUp,
  Search,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  Copy,
  Upload,
  Eye,
  EyeOff,
  Database,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Trophy,
  Download,
} from 'lucide-react';
import {
  Service,
  Project,
  Skill,
  Experience,
  Education,
  Certification,
  Testimonial,
  Achievement,
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const { user, logout, isCloudConnected } = useAuth();
  const { activeAdminTab, setActiveAdminTab, navigateTo } = useNavigation();
  const {
    profile,
    updateProfile,
    settings,
    updateSettings,
    seo,
    updateSEO,
    services,
    saveService,
    deleteService,
    projects,
    saveProject,
    deleteProject,
    experiences,
    saveExperience,
    deleteExperience,
    educations,
    saveEducation,
    deleteEducation,
    certifications,
    saveCertification,
    deleteCertification,
    skills,
    saveSkill,
    deleteSkill,
    testimonials,
    saveTestimonial,
    deleteTestimonial,
    achievements,
    saveAchievement,
    deleteAchievement,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    refreshData,
  } = useData();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Supabase Credentials form state
  const creds = getSupabaseCredentials();
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(creds.url);
  const [supabaseKeyInput, setSupabaseKeyInput] = useState(creds.anonKey);
  const [credsSaveMessage, setCredsSaveMessage] = useState('');

  // Editing state for modals/forms
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  // File upload state
  const [uploading, setUploading] = useState(false);

  const showSuccessBanner = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile Management', icon: User },
    { id: 'homepage', label: 'Homepage / Hero', icon: Home },
    { id: 'about', label: 'About Narrative', icon: FileText },
    { id: 'skills', label: 'Skills & Tech', icon: Wrench },
    { id: 'services', label: 'Services (12)', icon: Layers },
    { id: 'projects', label: 'Projects & Case Studies', icon: FolderGit2 },
    { id: 'experience', label: 'FMCG Experience', icon: Briefcase },
    { id: 'achievements', label: `Achievements (${achievements.length})`, icon: Trophy },
    { id: 'education', label: 'Education (BBA+MBA)', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'social', label: 'Social Channels', icon: Share2 },
    { id: 'contact_info', label: 'Contact Info', icon: Phone },
    { id: 'resume', label: 'Resume Management', icon: FileUp },
    { id: 'seo', label: 'SEO & OpenGraph', icon: Search },
    { id: 'inquiries', label: `Inquiries (${inquiries.filter((i) => i.status === 'new').length})`, icon: Inbox },
    { id: 'supabase_hub', label: 'Supabase & SQL Hub', icon: Database },
  ];

  // Helper for image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, onComplete: (url: string) => void | Promise<void>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await db.uploadFile('portfolio-images', file);
      await onComplete(url);
      showSuccessBanner('Image uploaded successfully!');
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Helper for resume upload
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await db.uploadFile('resumes', file);
      await updateProfile({ resume_url: url });
      showSuccessBanner('Resume uploaded successfully!');
    } catch (err: any) {
      alert('Resume upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseCredentials(supabaseUrlInput, supabaseKeyInput);
    setCredsSaveMessage('Supabase credentials saved! Refreshing database connection...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleResetCreds = () => {
    clearSupabaseCredentials();
    setSupabaseUrlInput('');
    setSupabaseKeyInput('');
    setCredsSaveMessage('Credentials cleared. Reverted to local mode.');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const fullSqlSchema = `-- ==============================================================================
-- Mahdi Hasan Personal Brand - Full Supabase PostgreSQL Schema & RLS
-- Run this in your Supabase SQL Editor:
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  tagline TEXT NOT NULL,
  location TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  phone TEXT NOT NULL,
  facebook_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.website_settings (
  id TEXT PRIMARY KEY,
  hero_headline_prefix TEXT NOT NULL,
  hero_headline_gradient TEXT NOT NULL,
  hero_badge_text TEXT NOT NULL,
  stat_years_exp TEXT NOT NULL,
  stat_growth TEXT NOT NULL,
  stat_target TEXT NOT NULL,
  stat_awards TEXT NOT NULL,
  cta_primary_text TEXT NOT NULL,
  cta_secondary_text TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.seo_settings (
  id TEXT PRIMARY KEY,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT NOT NULL,
  og_title TEXT NOT NULL,
  og_description TEXT NOT NULL,
  og_image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('Completed', 'Learning')),
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  challenge TEXT,
  solution TEXT,
  outcome TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL,
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  territory TEXT NOT NULL,
  period TEXT NOT NULL,
  growth_metric TEXT NOT NULL,
  target_achievement TEXT NOT NULL,
  top_performer_note TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.educations (
  id TEXT PRIMARY KEY,
  degree TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  institution TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_url TEXT,
  credential_id TEXT,
  badge_color TEXT DEFAULT 'cyan',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AI Automation', 'Lead Generation', 'Sales', 'Digital Marketing')),
  description TEXT,
  tools TEXT[] NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_title TEXT NOT NULL,
  company TEXT NOT NULL,
  relationship TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  rating INT NOT NULL DEFAULT 5,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_analytics (
  id TEXT PRIMARY KEY DEFAULT 'main_counter',
  total_visits BIGINT NOT NULL DEFAULT 1420,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interest TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public settings read" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Public seo read" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Public services read" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public projects read" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public experiences read" ON public.experiences FOR SELECT USING (is_published = true);
CREATE POLICY "Public educations read" ON public.educations FOR SELECT USING (is_published = true);
CREATE POLICY "Public certifications read" ON public.certifications FOR SELECT USING (is_published = true);
CREATE POLICY "Public skills read" ON public.skills FOR SELECT USING (is_published = true);
CREATE POLICY "Public testimonials read" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public achievements read" ON public.achievements FOR SELECT USING (is_published = true);
CREATE POLICY "Public site_analytics read" ON public.site_analytics FOR SELECT USING (true);
CREATE POLICY "Public site_analytics upsert" ON public.site_analytics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public submit inquiry" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full settings" ON public.website_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full seo" ON public.seo_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full educations" ON public.educations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full certifications" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full achievements" ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full inquiries" ON public.contact_inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg border border-slate-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold text-white text-sm">Mahdi Hasan Admin</span>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className="p-1.5 text-slate-400 hover:text-cyan-400 text-xs flex items-center gap-1"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Portal Identity */}
          <div className="pb-4 mb-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white">Mahdi Hasan</h2>
              <p className="text-[11px] font-mono text-cyan-400">Admin Control Center</p>
            </div>
            <button
              onClick={() => navigateTo('home')}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="View Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Database Connection Pill */}
          <div className="mb-4 p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-[11px] font-mono flex items-center justify-between">
            <span className="text-slate-400">Database:</span>
            <span className={isCloudConnected ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
              {isCloudConnected ? 'Supabase Live' : 'Local / Setup'}
            </span>
          </div>

          {/* Navigation Items List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAdminTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl transition-colors text-left ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="pt-4 border-t border-slate-800 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-xs truncate">
              <span className="text-slate-400 block text-[10px] uppercase">Logged in as:</span>
              <span className="text-white font-medium truncate block max-w-[150px]">
                {user?.email || 'Administrator'}
              </span>
            </div>
            <button
              onClick={async () => {
                await logout();
                navigateTo('home');
              }}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* 1. DASHBOARD OVERVIEW TAB */}
        {activeAdminTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Admin Command Center</h1>
              <p className="text-sm text-slate-400 mt-1">
                Real-time management for Mahdi Hasan's personal brand, projects, services, and inquiries.
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-xs text-slate-400 block mb-1">Active Services</span>
                <span className="text-3xl font-extrabold text-white font-mono">{services.length}</span>
                <span className="text-[11px] text-cyan-400 block mt-1">All 12 configurable</span>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-xs text-slate-400 block mb-1">Projects</span>
                <span className="text-3xl font-extrabold text-white font-mono">{projects.length}</span>
                <span className="text-[11px] text-purple-400 block mt-1">Completed & Learning</span>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-xs text-slate-400 block mb-1">Skills Listed</span>
                <span className="text-3xl font-extrabold text-white font-mono">{skills.length}</span>
                <span className="text-[11px] text-emerald-400 block mt-1">Across 4 domains</span>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-xs text-slate-400 block mb-1">New Inquiries</span>
                <span className="text-3xl font-extrabold text-cyan-400 font-mono">
                  {inquiries.filter((i) => i.status === 'new').length}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Pending response</span>
              </div>
            </div>

            {/* Quick Actions & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white">Database Status</h3>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Connection Mode:</span>
                    <span className={isCloudConnected ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                      {isCloudConnected ? 'Supabase Live Cloud DB' : 'Local Persistent / Setup Mode'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Row Level Security:</span>
                    <span className="text-emerald-400 font-semibold">Enabled (Public Read / Admin Write)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Cloudflare Pages SPA Fallback:</span>
                    <span className="text-emerald-400 font-semibold">Configured (_redirects active)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveAdminTab('supabase_hub')}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors"
                  >
                    Supabase Settings & SQL Exporter
                  </button>
                  <button
                    onClick={() => navigateTo('home')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    Open Live Site
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Quick Glance */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Recent Inquiries</h3>
                  <button
                    onClick={() => setActiveAdminTab('inquiries')}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    View All ({inquiries.length})
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No inquiries received yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs flex items-center justify-between"
                      >
                        <div>
                          <span className="font-semibold text-white block">{inq.name}</span>
                          <span className="text-[11px] text-slate-400">{inq.email} · {inq.service_interest || 'General'}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            inq.status === 'new'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Direct Export Files & Deployment Package */}
            <div className="p-6 bg-gradient-to-r from-slate-900 via-cyan-950/30 to-purple-950/30 border border-cyan-500/30 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Download className="w-5 h-5 text-cyan-400" />
                    <span>Direct Export Files & Deployment Packages</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Download the pre-compiled, production-ready website or the full source code archive directly to your computer.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-mono self-start sm:self-center">
                  Production Build Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* 1. Pre-built Dist ZIP */}
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">Pre-Built Ready Website (dist)</span>
                      <span className="text-[11px] font-mono text-cyan-400">~374 KB</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Pre-compiled HTML, CSS, JavaScript, and assets with relative paths (<code className="text-cyan-300">base: './'</code>) and <code className="text-cyan-300">404.html</code> for GitHub Pages & Cloudflare Pages.
                    </p>
                  </div>
                  <a
                    href="./mahdi-hasan-dist-ready-to-deploy.zip"
                    download="mahdi-hasan-dist-ready-to-deploy.zip"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Ready Website (ZIP)</span>
                  </a>
                </div>

                {/* 2. Full Source Code ZIP */}
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">Complete Source Code</span>
                      <span className="text-[11px] font-mono text-purple-400">~5.5 MB</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Full React 19, TypeScript, Tailwind CSS, and Vite source files with complete components and configuration to commit to your GitHub repository.
                    </p>
                  </div>
                  <a
                    href="./mahdi-hasan-full-source-code.zip"
                    download="mahdi-hasan-full-source-code.zip"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download Full Source Code (ZIP)</span>
                  </a>
                </div>
              </div>

              {/* GitHub Pages & Cross-Device Fix Explanations */}
              <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-2 text-slate-300">
                <div className="font-semibold text-cyan-300">
                  💡 GitHub-এ ওয়েবসাইট সুন্দরভাবে লাইভ করার নিয়ম (Why it looks broken & how to fix):
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                  <li>
                    <strong>Relative Paths Fixed:</strong> <code className="text-slate-300">vite.config.ts</code>-এ <code className="text-cyan-300">base: './'</code> যোগ করা হয়েছে। আগে এটি না থাকায় GitHub Pages-এ CSS ও JavaScript ফাইলগুলো 404 পেত এবং সাইট ভাঙা দেখাত। এখন এটি সম্পূর্ণ ঠিক করা হয়েছে।
                  </li>
                  <li>
                    <strong>SPA Routing Fixed:</strong> GitHub Pages-এর জন্য <code className="text-cyan-300">404.html</code> যোগ করা হয়েছে যাতে রিফ্রেশ বা ডিরেক্ট লিংকে কোনো 404 ইরর না আসে।
                  </li>
                  <li>
                    <strong>অন্য ডিভাইসে ছবি না পাওয়া সমাধান:</strong> অ্যাডমিন প্যানেল থেকে ছবি আপলোড করার সময় <code className="text-cyan-300">Imgur</code>, <code className="text-cyan-300">Postimages</code> বা <code className="text-cyan-300">Cloudinary</code>-তে ছবি আপলোড করে তার Direct Image URL দিন। অথবা <code className="text-cyan-300">Supabase Hub</code> থেকে আপনার Supabase URL ও Key কানেক্ট করুন। তাহলে পৃথিবীর যেকোনো মোবাইল বা ল্যাপটপ থেকে লাইভ ছবি দেখতে পাবেন!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 2. PROFILE MANAGEMENT TAB */}
        {activeAdminTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Profile Management</h1>
              <p className="text-sm text-slate-400 mt-1">Update personal brand information and bio.</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateProfile(profile);
                showSuccessBanner('Profile updated successfully!');
              }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => updateProfile({ title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => updateProfile({ tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Professional Bio</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Avatar Image URL (Public Link or File)</label>
                  <input
                    type="text"
                    value={profile.avatar_url}
                    onChange={(e) => updateProfile({ avatar_url: e.target.value })}
                    placeholder="https://... or upload below"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Avatar Hyperlink & Cover Banner Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Avatar Image Hyperlink (Clicking avatar opens this link)
                  </label>
                  <input
                    type="url"
                    value={profile.avatar_link || ''}
                    onChange={(e) => updateProfile({ avatar_link: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    YouTube Cover Banner Hyperlink (Clicking banner opens this link)
                  </label>
                  <input
                    type="url"
                    value={profile.cover_link || ''}
                    onChange={(e) => updateProfile({ cover_link: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* YouTube-style Cover Banner Photo URL */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    YouTube-style Cover Photo Banner URL (Wide Panoramic Header)
                  </label>
                  <input
                    type="text"
                    value={profile.cover_url || ''}
                    onChange={(e) => updateProfile({ cover_url: e.target.value })}
                    placeholder="https://... (direct public image link from Imgur, Cloudinary, GitHub, or Supabase)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                  <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <span className="text-[11px] text-slate-400 block mb-1">
                      Or Upload Banner File (From your computer):
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (url) => updateProfile({ cover_url: url }))}
                      className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
                    />
                  </div>
                  {profile.cover_url && (
                    <img
                      src={profile.cover_url}
                      alt="Cover Preview"
                      className="w-24 h-12 object-cover rounded-lg border border-slate-800"
                    />
                  )}
                </div>
              </div>

              {/* Avatar Image Upload Trigger */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Upload Profile Avatar Photo (From your computer)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, (url) => updateProfile({ avatar_url: url }))}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
                  />
                  {profile.avatar_url && (
                    <img
                      src={profile.avatar_url}
                      alt="Avatar Preview"
                      className="w-10 h-10 object-cover rounded-full border border-cyan-500/50"
                    />
                  )}
                </div>
                {uploading && (
                  <div className="flex items-center gap-2 text-xs text-cyan-300 animate-pulse pt-1">
                    <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span>Uploading image to storage, please wait...</span>
                  </div>
                )}
                <p className="text-[11px] text-slate-500">
                  Tip: A direct public link (e.g., from Imgur, Cloudinary, GitHub raw, or Supabase public bucket) is instantly visible to all visitors on any device!
                </p>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl shadow-md shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
              >
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* 3. HOMEPAGE MANAGEMENT TAB */}
        {activeAdminTab === 'homepage' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Homepage & Hero Settings</h1>
              <p className="text-sm text-slate-400 mt-1">Configure hero headlines, badge text, and key statistics.</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateSettings(settings);
                showSuccessBanner('Homepage settings saved!');
              }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-2xl"
            >
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hero Kicker / Badge Text</label>
                <input
                  type="text"
                  value={settings.hero_badge_text}
                  onChange={(e) => updateSettings({ hero_badge_text: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={settings.cta_primary_text}
                    onChange={(e) => updateSettings({ cta_primary_text: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Secondary CTA Button</label>
                  <input
                    type="text"
                    value={settings.cta_secondary_text}
                    onChange={(e) => updateSettings({ cta_secondary_text: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-4 border-t border-slate-800">
                Key Stats Strip (FMCG Record)
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Experience</label>
                  <input
                    type="text"
                    value={settings.stat_years_exp}
                    onChange={(e) => updateSettings({ stat_years_exp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Sales Growth</label>
                  <input
                    type="text"
                    value={settings.stat_growth}
                    onChange={(e) => updateSettings({ stat_growth: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Achievement</label>
                  <input
                    type="text"
                    value={settings.stat_target}
                    onChange={(e) => updateSettings({ stat_target: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Distinction Note</label>
                  <input
                    type="text"
                    value={settings.stat_awards}
                    onChange={(e) => updateSettings({ stat_awards: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                Save Homepage Settings
              </button>
            </form>
          </div>
        )}

        {/* 4. ABOUT NARRATIVE TAB */}
        {activeAdminTab === 'about' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">About Narrative & Pillars</h1>
              <p className="text-sm text-slate-400 mt-1">Review and fine-tune your personal philosophy narrative.</p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-2xl">
              <p className="text-sm text-slate-300 leading-relaxed">
                The About narrative incorporates your 6+ years FMCG sales leadership in Dhaka North Territory, your BBA + MBA academic foundations, and your specialized transition into AI Automation (Model Context Protocol, n8n, Lead Gen, Python).
              </p>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dual Pillar Framework Active</span>
                </div>
                <p>
                  1. Real-World FMCG Ground Execution (Distributor management, target discipline, route-to-market).
                </p>
                <p>
                  2. Cutting-Edge AI Engineering (MCP tools, scraping pipelines, automated sales consolidation).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. SKILLS MANAGEMENT TAB */}
        {activeAdminTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Skills Management</h1>
                <p className="text-sm text-slate-400 mt-1">Manage categorized skills and proficiency indicators.</p>
              </div>
              <button
                onClick={() => {
                  setEditingSkill({
                    id: 'sk-' + Date.now(),
                    name: '',
                    category: 'AI Automation',
                    description: '',
                    tools: ['Tool 1', 'Tool 2'],
                    display_order: skills.length + 1,
                    is_published: true,
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Editing Skill Form Modal */}
            {editingSkill && (
              <div className="p-6 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-4 max-w-xl">
                <h3 className="text-base font-bold text-white">
                  {skills.some((s) => s.id === editingSkill.id) ? 'Edit Skill' : 'Create New Skill'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Skill Name</label>
                    <input
                      type="text"
                      value={editingSkill.name}
                      onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                      placeholder="e.g. n8n or Apify"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Category</label>
                    <select
                      value={editingSkill.category}
                      onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    >
                      <option value="AI Automation">AI Automation</option>
                      <option value="Lead Generation">Lead Generation</option>
                      <option value="Sales">Sales</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Description / Focus</label>
                  <input
                    type="text"
                    value={editingSkill.description || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                    placeholder="Brief description of application..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Sub-tools / Aspects (comma separated)</label>
                  <input
                    type="text"
                    value={editingSkill.tools?.join(', ') || ''}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        tools: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    placeholder="e.g. Webhook Nodes, Cloud Deployment"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={async () => {
                      if (!editingSkill.name.trim()) return;
                      await saveSkill(editingSkill);
                      setEditingSkill(null);
                      showSuccessBanner('Skill saved!');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
                  >
                    Save Skill
                  </button>
                  <button
                    onClick={() => setEditingSkill(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Skills Table List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="divide-y divide-slate-800">
                {skills.map((skill) => (
                  <div key={skill.id} className="p-4 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{skill.name}</span>
                        <span className="text-[11px] font-mono text-cyan-400">{skill.category}</span>
                      </div>
                      {skill.description && <p className="text-slate-400">{skill.description}</p>}
                      {skill.tools && skill.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {skill.tools.map((t, idx) => (
                            <span key={idx} className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={async () => {
                          await saveSkill({ ...skill, is_published: !skill.is_published });
                          showSuccessBanner('Toggled skill publication status');
                        }}
                        className={`p-1.5 rounded-lg border ${
                          skill.is_published
                            ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
                            : 'text-slate-500 border-slate-800'
                        }`}
                        title={skill.is_published ? 'Published' : 'Hidden'}
                      >
                        {skill.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => setEditingSkill(skill)}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 border border-slate-800 rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={async () => {
                          if (confirm(`Delete skill "${skill.name}"?`)) {
                            await deleteSkill(skill.id);
                            showSuccessBanner('Skill deleted');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-400 border border-slate-800 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. SERVICES MANAGEMENT TAB */}
        {activeAdminTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Services Management (All 12)</h1>
                <p className="text-sm text-slate-400 mt-1">Configure deliverables, active status, and descriptions.</p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    id: 'srv-' + Date.now(),
                    title: '',
                    slug: 'service-' + Date.now(),
                    category: 'AI & Automation',
                    description: '',
                    icon_name: 'Bot',
                    deliverables: ['Custom integration', 'Automated workflows'],
                    display_order: services.length + 1,
                    is_published: true,
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {/* Editing Service Form */}
            {editingService && (
              <div className="p-6 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-white">
                  {services.some((s) => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Service Title</label>
                    <input
                      type="text"
                      value={editingService.title}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Category</label>
                    <select
                      value={editingService.category}
                      onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    >
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Sales Operations">Sales Operations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Deliverables (one per line)</label>
                  <textarea
                    rows={4}
                    value={editingService.deliverables?.join('\n') || ''}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        deliverables: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={async () => {
                      if (!editingService.title.trim()) return;
                      await saveService(editingService);
                      setEditingService(null);
                      showSuccessBanner('Service saved!');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
                  >
                    Save Service
                  </button>
                  <button
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div key={srv.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-cyan-400">{srv.category}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            await saveService({ ...srv, is_published: !srv.is_published });
                            showSuccessBanner(`Toggled ${srv.title} publication status`);
                          }}
                          className={`p-1 rounded ${srv.is_published ? 'text-emerald-400' : 'text-slate-600'}`}
                          title={srv.is_published ? 'Published on live site' : 'Draft / Hidden'}
                        >
                          {srv.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => setEditingService(srv)}
                          className="p-1 text-slate-400 hover:text-cyan-400"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete service "${srv.title}"?`)) {
                              await deleteService(srv.id);
                              showSuccessBanner('Service deleted');
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{srv.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{srv.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
                    {srv.deliverables?.length || 0} Deliverables Configured
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. PROJECTS MANAGEMENT TAB */}
        {activeAdminTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Projects & Portfolio</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Manage initial 5 projects, switch between Learning and Completed, and upload media.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject({
                    id: 'proj-' + Date.now(),
                    title: '',
                    slug: 'project-' + Date.now(),
                    category: 'Completed',
                    short_description: '',
                    full_description: '',
                    challenge: '',
                    solution: '',
                    outcome: '',
                    tech_stack: ['Python', 'Automation'],
                    image_url: '/src/assets/images/sales_fmcg_hero_1793989324459.jpg',
                    live_url: '',
                    github_url: '',
                    is_featured: false,
                    is_published: true,
                    display_order: projects.length + 1,
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Editing Project Form */}
            {editingProject && (
              <div className="p-6 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-white">
                  {projects.some((p) => p.id === editingProject.id) ? 'Edit Project' : 'Create New Project'}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Project Title</label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Category (Learning vs Completed)</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    >
                      <option value="Completed">Completed Project</option>
                      <option value="Learning">Learning Project</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={editingProject.short_description}
                    onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    value={editingProject.full_description}
                    onChange={(e) => setEditingProject({ ...editingProject, full_description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">The Bottleneck</label>
                    <textarea
                      rows={2}
                      value={editingProject.challenge || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">The Solution</label>
                    <textarea
                      rows={2}
                      value={editingProject.solution || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">The Outcome</label>
                    <textarea
                      rows={2}
                      value={editingProject.outcome || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Image URL (Public Link or Storage)</label>
                    <input
                      type="text"
                      value={editingProject.image_url}
                      onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                      placeholder="https://... (direct image link works on all devices)"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Image Hyperlink (Clicking project image opens this link)
                    </label>
                    <input
                      type="url"
                      value={editingProject.link_url || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, link_url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Live URL / Demo Link</label>
                    <input
                      type="url"
                      value={editingProject.live_url || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">GitHub Repository URL</label>
                    <input
                      type="url"
                      value={editingProject.github_url || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.tech_stack?.join(', ') || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          tech_stack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="n8n, MCP, REST API"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                {/* Storage image upload trigger with preview */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-slate-300 mb-1">Upload Project Cover to Supabase Storage</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (url) => setEditingProject({ ...editingProject, image_url: url }))}
                      className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:bg-cyan-500/20 file:text-cyan-300"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Tip: Direct public URLs (e.g. from GitHub, Imgur, Cloudinary) update on all devices immediately!
                    </p>
                  </div>
                  {editingProject.image_url && (
                    <img
                      src={editingProject.image_url}
                      alt="Project Preview"
                      className="w-20 h-12 object-cover rounded-lg border border-slate-800"
                    />
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={async () => {
                      if (!editingProject.title.trim()) return;
                      try {
                        await saveProject(editingProject);
                        setEditingProject(null);
                        showSuccessBanner('Project saved to the shared website!');
                      } catch (err: any) {
                        alert('Project save failed: ' + err.message);
                      }
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
                  >
                    Save Project
                  </button>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Projects Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          proj.category === 'Completed'
                            ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
                            : 'text-purple-300 bg-purple-950/60 border-purple-500/40'
                        }`}
                      >
                        {proj.category}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            await saveProject({ ...proj, is_published: !proj.is_published });
                            showSuccessBanner(`Toggled ${proj.title} status`);
                          }}
                          className={`p-1 rounded ${proj.is_published ? 'text-emerald-400' : 'text-slate-600'}`}
                        >
                          {proj.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-1 text-slate-400 hover:text-cyan-400"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              await deleteProject(proj.id);
                              showSuccessBanner('Project deleted');
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1.5">{proj.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{proj.short_description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{proj.tech_stack?.slice(0, 3).join(', ')}</span>
                    <span className="font-mono text-cyan-400">{proj.is_published ? 'Live' : 'Hidden'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. FMCG EXPERIENCE MANAGEMENT TAB */}
        {activeAdminTab === 'experience' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Professional FMCG Experience</h1>
              <p className="text-sm text-slate-400 mt-1">
                Maintain verified FMCG sales officer achievements and territory records.
              </p>
            </div>

            {experiences.map((exp) => (
              <form
                key={exp.id}
                onSubmit={async (e) => {
                  e.preventDefault();
                  await saveExperience(exp);
                  showSuccessBanner('Experience record updated!');
                }}
                className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-2xl"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => saveExperience({ ...exp, role: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Territory</label>
                    <input
                      type="text"
                      value={exp.territory}
                      onChange={(e) => saveExperience({ ...exp, territory: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Growth Metric</label>
                    <input
                      type="text"
                      value={exp.growth_metric}
                      onChange={(e) => saveExperience({ ...exp, growth_metric: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Target Attainment</label>
                    <input
                      type="text"
                      value={exp.target_achievement}
                      onChange={(e) => saveExperience({ ...exp, target_achievement: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Recognition Note</label>
                    <input
                      type="text"
                      value={exp.top_performer_note}
                      onChange={(e) => saveExperience({ ...exp, top_performer_note: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Responsibilities (one per line)</label>
                  <textarea
                    rows={6}
                    value={exp.responsibilities?.join('\n') || ''}
                    onChange={(e) =>
                      saveExperience({
                        ...exp,
                        responsibilities: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
                >
                  Save Experience Record
                </button>
              </form>
            ))}
          </div>
        )}

        {/* 9. EDUCATION TAB (BBA + MBA) */}
        {activeAdminTab === 'education' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Education Management</h1>
              <p className="text-sm text-slate-400 mt-1">Manage BBA + MBA academic qualifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educations.map((edu) => (
                <div key={edu.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                  <span className="text-xs font-mono text-cyan-400">{edu.year}</span>
                  <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                  <p className="text-xs text-slate-300">{edu.field_of_study}</p>
                  <p className="text-xs font-mono text-slate-500">{edu.institution}</p>
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. CERTIFICATIONS TAB */}
        {activeAdminTab === 'certifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Certifications & Credentials</h1>
                <p className="text-sm text-slate-400 mt-1">Industry certificates across AI, Sales, and Marketing.</p>
              </div>
              <button
                onClick={() => {
                  setEditingCert({
                    id: 'cert-' + Date.now(),
                    title: 'New Certification',
                    issuer: 'Certifying Body',
                    issue_date: '2026',
                    credential_id: 'ID-' + Math.floor(Math.random() * 10000),
                    display_order: certifications.length + 1,
                    is_published: true,
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </div>

            {editingCert && (
              <div className="p-6 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-4 max-w-xl">
                <h3 className="text-base font-bold text-white">Save Certification</h3>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingCert.title}
                    onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Issuer</label>
                    <input
                      type="text"
                      value={editingCert.issuer}
                      onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Year / Date</label>
                    <input
                      type="text"
                      value={editingCert.issue_date}
                      onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={async () => {
                      await saveCertification(editingCert);
                      setEditingCert(null);
                      showSuccessBanner('Certification saved!');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-xl"
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingCert(null)} className="text-xs text-slate-400">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400">{cert.issue_date}</span>
                    <h3 className="text-sm font-bold text-white mt-1">{cert.title}</h3>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm(`Delete certificate "${cert.title}"?`)) {
                        await deleteCertification(cert.id);
                        showSuccessBanner('Certificate deleted');
                      }
                    }}
                    className="text-slate-500 hover:text-rose-400 self-start p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. TESTIMONIALS TAB */}
        {activeAdminTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Testimonials Management</h1>
                <p className="text-sm text-slate-400 mt-1">Manage recommendations from managers and clients.</p>
              </div>
              <button
                onClick={() => {
                  setEditingTestimonial({
                    id: 'test-' + Date.now(),
                    author_name: '',
                    author_title: '',
                    company: '',
                    relationship: '',
                    quote: '',
                    rating: 5,
                    display_order: testimonials.length + 1,
                    is_published: true,
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            {editingTestimonial && (
              <div className="p-6 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-4 max-w-xl">
                <h3 className="text-base font-bold text-white">Save Testimonial</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={editingTestimonial.author_name}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author_name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Title / Designation</label>
                    <input
                      type="text"
                      value={editingTestimonial.author_title}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author_title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Organization</label>
                    <input
                      type="text"
                      value={editingTestimonial.company}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Relationship Context</label>
                    <input
                      type="text"
                      value={editingTestimonial.relationship}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, relationship: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Quote</label>
                  <textarea
                    rows={3}
                    value={editingTestimonial.quote}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={async () => {
                      await saveTestimonial(editingTestimonial);
                      setEditingTestimonial(null);
                      showSuccessBanner('Testimonial saved!');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-xl"
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingTestimonial(null)} className="text-xs text-slate-400">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {testimonials.map((test) => (
                <div key={test.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white text-sm">{test.author_name}</span>
                    <span className="text-slate-400 block">{test.author_title} · {test.company}</span>
                    <p className="text-slate-300 italic mt-1 line-clamp-1">"{test.quote}"</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm(`Delete testimonial from "${test.author_name}"?`)) {
                        await deleteTestimonial(test.id);
                        showSuccessBanner('Testimonial deleted');
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11.5. ACHIEVEMENTS GALLERY MANAGEMENT TAB */}
        {activeAdminTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Achievement Gallery Management</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Upload and manage your professional awards, sales plaques, certificates, and verified territory milestones.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingAchievement({
                    id: 'ach-' + Date.now(),
                    title: '',
                    category: 'FMCG Sales Operations',
                    date: 'Recent Recognition',
                    description: '',
                    image_url: '/src/assets/images/achievement_fmcg_award_1794064286077.jpg',
                    display_order: achievements.length + 1,
                    is_published: true,
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Achievement</span>
              </button>
            </div>

            {/* Achievement Editing Form Modal */}
            {editingAchievement && (
              <div className="p-6 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-white">
                  {achievements.some((a) => a.id === editingAchievement.id)
                    ? 'Edit Achievement Record'
                    : 'Add New Achievement to Gallery'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Achievement Title <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingAchievement.title}
                      onChange={(e) =>
                        setEditingAchievement({ ...editingAchievement, title: e.target.value })
                      }
                      placeholder="e.g. Three-Time First-Place in New Product Sales"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingAchievement.category}
                      onChange={(e) =>
                        setEditingAchievement({ ...editingAchievement, category: e.target.value })
                      }
                      placeholder="e.g. FMCG Sales Operations"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Date / Milestone Honor
                    </label>
                    <input
                      type="text"
                      value={editingAchievement.date}
                      onChange={(e) =>
                        setEditingAchievement({ ...editingAchievement, date: e.target.value })
                      }
                      placeholder="e.g. Three-Time Top Performer"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={editingAchievement.display_order}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          display_order: parseInt(e.target.value, 10) || 1,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Verified Description & Context
                  </label>
                  <textarea
                    rows={3}
                    value={editingAchievement.description}
                    onChange={(e) =>
                      setEditingAchievement({ ...editingAchievement, description: e.target.value })
                    }
                    placeholder="Describe the verified accomplishment, territory scope, or sales target achieved..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                {/* Image URL & Upload */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Achievement Award / Certificate Image URL
                      </label>
                      <input
                        type="text"
                        value={editingAchievement.image_url}
                        onChange={(e) =>
                          setEditingAchievement({ ...editingAchievement, image_url: e.target.value })
                        }
                        placeholder="Image URL or upload file below"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Image Hyperlink (Clicking award image opens this link)
                      </label>
                      <input
                        type="url"
                        value={editingAchievement.link_url || ''}
                        onChange={(e) =>
                          setEditingAchievement({ ...editingAchievement, link_url: e.target.value })
                        }
                        placeholder="https://... (verification link, award post, or credential)"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1.5">
                      Upload from Device (Supabase Storage bucket <code className="text-cyan-400">portfolio-images</code>):
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, (url) =>
                          setEditingAchievement((prev) => (prev ? { ...prev, image_url: url } : null))
                        )
                      }
                      disabled={uploading}
                      className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
                    />
                    {uploading && <span className="text-xs text-cyan-400 block mt-1">Uploading...</span>}
                  </div>

                  {editingAchievement.image_url && (
                    <div className="pt-2 flex items-center gap-4">
                      <img
                        src={editingAchievement.image_url}
                        alt="Preview"
                        className="w-20 h-14 object-cover rounded-lg border border-slate-800 bg-slate-900"
                      />
                      <span className="text-[11px] text-slate-400">Image Preview Ready</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={async () => {
                      if (!editingAchievement.title.trim()) {
                        alert('Please provide an achievement title.');
                        return;
                      }
                      try {
                        await saveAchievement(editingAchievement);
                        setEditingAchievement(null);
                        showSuccessBanner('Achievement saved to the shared website!');
                      } catch (err: any) {
                        alert('Gallery save failed: ' + err.message);
                      }
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
                  >
                    Save Achievement
                  </button>
                  <button
                    onClick={() => setEditingAchievement(null)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Achievements List */}
            {achievements.length === 0 ? (
              <div className="p-12 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
                No achievements recorded yet. Click "Add Achievement" to get started!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-24 h-20 object-cover rounded-xl border border-slate-800 bg-slate-950 shrink-0"
                      />
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 truncate">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{item.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-500">
                        Order: {item.display_order}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            await saveAchievement({ ...item, is_published: !item.is_published });
                            showSuccessBanner('Toggled achievement visibility');
                          }}
                          className={`p-1.5 rounded-lg border ${
                            item.is_published
                              ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
                              : 'text-slate-500 border-slate-800'
                          }`}
                          title={item.is_published ? 'Published on website' : 'Hidden from public'}
                        >
                          {item.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => setEditingAchievement(item)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 border border-slate-800 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={async () => {
                            if (confirm(`Delete achievement "${item.title}"?`)) {
                              await deleteAchievement(item.id);
                              showSuccessBanner('Achievement deleted');
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 border border-slate-800 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 12. SOCIAL CHANNELS MANAGEMENT */}
        {activeAdminTab === 'social' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Social Channels & Links</h1>
              <p className="text-sm text-slate-400 mt-1">Configure direct communication links.</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateProfile(profile);
                showSuccessBanner('Social channel links saved!');
              }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-2xl"
            >
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={profile.linkedin_url}
                  onChange={(e) => updateProfile({ linkedin_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp Number / Direct Link</label>
                <input
                  type="text"
                  value={profile.whatsapp}
                  onChange={(e) => updateProfile({ whatsapp: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Facebook Profile URL</label>
                <input
                  type="url"
                  value={profile.facebook_url}
                  onChange={(e) => updateProfile({ facebook_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">GitHub Profile URL (Allow adding later)</label>
                <input
                  type="url"
                  value={profile.github_url}
                  onChange={(e) => updateProfile({ github_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                Save Social Links
              </button>
            </form>
          </div>
        )}

        {/* 13. CONTACT INFORMATION */}
        {activeAdminTab === 'contact_info' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Contact Information</h1>
              <p className="text-sm text-slate-400 mt-1">Official contact channels shown on the website.</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateProfile(profile);
                showSuccessBanner('Contact information saved!');
              }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-2xl"
            >
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile({ email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => updateProfile({ phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Territory / Location Address</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => updateProfile({ location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                Save Contact Info
              </button>
            </form>
          </div>
        )}

        {/* 14. RESUME UPLOAD / MANAGEMENT */}
        {activeAdminTab === 'resume' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Resume Management</h1>
              <p className="text-sm text-slate-400 mt-1">Upload your curriculum vitae to Supabase Storage bucket.</p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 max-w-2xl">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Current Active Resume Link</label>
                <input
                  type="text"
                  value={profile.resume_url}
                  onChange={(e) => updateProfile({ resume_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono"
                />
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-semibold text-white block">Upload PDF Resume File</span>
                <p className="text-xs text-slate-400">
                  Uploads directly to Supabase Storage bucket <code className="text-cyan-400 font-mono">resumes</code> with public read permissions.
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={uploading}
                  className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-400 file:text-slate-950 hover:file:bg-cyan-300"
                />
                {uploading && <span className="text-xs text-cyan-400 block">Uploading file...</span>}
              </div>

              {profile.resume_url && (
                <div className="flex items-center gap-3">
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Test Resume Download</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 15. SEO MANAGEMENT */}
        {activeAdminTab === 'seo' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">SEO & Social Meta</h1>
              <p className="text-sm text-slate-400 mt-1">Configure search engine titles, descriptions, and OpenGraph share cards.</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateSEO(seo);
                showSuccessBanner('SEO settings saved!');
              }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-2xl"
            >
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Meta Page Title</label>
                <input
                  type="text"
                  value={seo.meta_title}
                  onChange={(e) => updateSEO({ meta_title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={seo.meta_description}
                  onChange={(e) => updateSEO({ meta_description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Keywords</label>
                <input
                  type="text"
                  value={seo.keywords}
                  onChange={(e) => updateSEO({ keywords: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">OpenGraph Title</label>
                  <input
                    type="text"
                    value={seo.og_title}
                    onChange={(e) => updateSEO({ og_title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">OpenGraph Image URL</label>
                  <input
                    type="text"
                    value={seo.og_image_url}
                    onChange={(e) => updateSEO({ og_image_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                Save SEO Settings
              </button>
            </form>
          </div>
        )}

        {/* 16. CONTACT INQUIRIES MANAGEMENT */}
        {activeAdminTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Client Inquiries & Leads Inbox</h1>
                <p className="text-sm text-slate-400 mt-1">Review inquiries submitted through the contact form.</p>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                Total: {inquiries.length} ({inquiries.filter((i) => i.status === 'new').length} New)
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
                No inquiries received yet. Submit a test inquiry on the public website to verify!
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-6 bg-slate-900 border rounded-2xl space-y-4 transition-all ${
                      inq.status === 'new' ? 'border-cyan-500/50 bg-slate-900/90' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white">{inq.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                          <span>{inq.email}</span>
                          {inq.phone && <span>· Phone: {inq.phone}</span>}
                          {inq.company && <span>· Org: {inq.company}</span>}
                          <span>· Date: {new Date(inq.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={async (e) => {
                            await updateInquiryStatus(inq.id, e.target.value as any);
                            showSuccessBanner(`Status updated to ${e.target.value}`);
                          }}
                          className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="archived">Archived</option>
                        </select>

                        <button
                          onClick={async () => {
                            if (confirm(`Delete inquiry from ${inq.name}?`)) {
                              await deleteInquiry(inq.id);
                              showSuccessBanner('Inquiry deleted');
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 border border-slate-800 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {inq.service_interest && (
                      <div className="text-xs text-cyan-400 font-mono">
                        Service Requested: {inq.service_interest}
                      </div>
                    )}

                    <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                      {inq.message}
                    </p>

                    <div className="pt-2 flex items-center gap-3">
                      <a
                        href={`mailto:${inq.email}?subject=Re:%20Inquiry%20regarding%20${encodeURIComponent(inq.service_interest || 'Sales & AI Automation')}&body=Hi%20${encodeURIComponent(inq.name)},`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
                      >
                        Reply via Email
                      </a>
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg"
                        >
                          Reply on WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 17. SUPABASE & SQL SETUP HUB */}
        {activeAdminTab === 'supabase_hub' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Supabase Setup & SQL Schema Generator</h1>
              <p className="text-sm text-slate-400 mt-1">
                Configure your cloud Supabase database, run Row Level Security policies, and enable Cloudflare Pages.
              </p>
            </div>

            {/* Connection Credentials Form */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-2xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Supabase Project Credentials</span>
              </h3>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Current Status:</span>
                  <span className={isCloudConnected ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {isCloudConnected ? 'Connected to Live Cloud Supabase' : 'Running in Local Mode (Local Storage)'}
                  </span>
                </div>
              </div>

              {credsSaveMessage && (
                <div className="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded-xl text-cyan-300 text-xs">
                  {credsSaveMessage}
                </div>
              )}

              <form onSubmit={handleSaveCredentials} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Supabase Project URL (<code className="text-cyan-400">VITE_SUPABASE_URL</code>)
                  </label>
                  <input
                    type="text"
                    value={supabaseUrlInput}
                    onChange={(e) => setSupabaseUrlInput(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Supabase Anon Public API Key (<code className="text-cyan-400">VITE_SUPABASE_ANON_KEY</code>)
                  </label>
                  <input
                    type="password"
                    value={supabaseKeyInput}
                    onChange={(e) => setSupabaseKeyInput(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
                  >
                    Save & Connect Supabase
                  </button>
                  <button
                    type="button"
                    onClick={handleResetCreds}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Clear Credentials
                  </button>
                </div>
              </form>
            </div>

            {/* SQL Script Exporter */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Full PostgreSQL Schema & RLS Policies</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Copy and paste this script directly into your Supabase dashboard at <strong>SQL Editor → New Query → Run</strong>.
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(fullSqlSchema);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 rounded-xl transition-all"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full SQL Schema</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-cyan-300/90 max-h-72 overflow-y-auto leading-relaxed">
                  {fullSqlSchema}
                </pre>
              </div>
            </div>

            {/* Cloudflare Pages & GitHub Deployment Instructions */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 max-w-2xl text-xs text-slate-300">
              <h3 className="text-base font-bold text-white">Cloudflare Pages Deployment Checklist</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                <li>Framework preset: <strong className="text-white">Vite</strong></li>
                <li>Build command: <code className="text-cyan-400 font-mono">npm run build</code></li>
                <li>Build output directory: <code className="text-cyan-400 font-mono">dist</code></li>
                <li>
                  SPA Fallback: <code className="text-emerald-400 font-mono">public/_redirects</code> is already created with <code className="text-slate-300 font-mono">/*  /index.html  200</code>.
                </li>
                <li>
                  Environment variables in Cloudflare Pages dashboard:
                  <ul className="list-disc list-inside ml-4 mt-1 font-mono text-cyan-300">
                    <li>VITE_SUPABASE_URL</li>
                    <li>VITE_SUPABASE_ANON_KEY</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
