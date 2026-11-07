-- ==============================================================================
-- Mahdi Hasan Personal Brand & Admin Portal - Complete Supabase Schema & RLS
-- ==============================================================================

-- 1. Create Profiles Table
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

-- 2. Create Website Settings Table
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

-- 3. Create SEO Settings Table
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

-- 4. Create Services Table
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

-- 5. Create Projects Table
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

-- 6. Create Professional Experience Table
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

-- 7. Create Education Table
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

-- 8. Create Certifications Table
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

-- 9. Create Skills Table
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

-- 10. Create Testimonials Table
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

-- 11. Create Contact Inquiries Table
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

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
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
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Public can SELECT published content
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

-- Public can INSERT contact inquiries
CREATE POLICY "Public submit inquiry" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- Authenticated Admin full access policies
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
CREATE POLICY "Admin full inquiries" ON public.contact_inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKETS CONFIGURATION
-- ==============================================================================

-- Create storage buckets for images and resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view images & resumes
CREATE POLICY "Public view portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id IN ('portfolio-images', 'resumes'));

-- Storage RLS: Authenticated users can upload and manage files
CREATE POLICY "Admin manage portfolio images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id IN ('portfolio-images', 'resumes'))
WITH CHECK (bucket_id IN ('portfolio-images', 'resumes'));
