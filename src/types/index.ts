export type ProjectCategory = 'Completed' | 'Learning';

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  tagline: string;
  location: string;
  email: string;
  whatsapp: string;
  phone: string;
  facebook_url: string;
  linkedin_url: string;
  github_url: string;
  avatar_url: string;
  resume_url: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: 'AI & Automation' | 'Digital Marketing' | 'Sales Operations';
  description: string;
  icon_name: string;
  deliverables: string[];
  display_order: number;
  is_published: boolean;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  short_description: string;
  full_description: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  tech_stack: string[];
  image_url: string;
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  territory: string;
  period: string;
  growth_metric: string;
  target_achievement: string;
  top_performer_note: string;
  description: string;
  responsibilities: string[];
  display_order: number;
  is_published: boolean;
}

export interface Education {
  id: string;
  degree: string;
  field_of_study: string;
  institution: string;
  year: string;
  description: string;
  display_order: number;
  is_published: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url?: string;
  credential_id?: string;
  badge_color?: string;
  display_order: number;
  is_published: boolean;
}

export type SkillCategory = 'AI Automation' | 'Lead Generation' | 'Sales' | 'Digital Marketing';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  tools: string[];
  description?: string;
  display_order: number;
  is_published: boolean;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_title: string;
  company: string;
  relationship: string;
  quote: string;
  avatar_url?: string;
  rating: number; // 1-5
  display_order: number;
  is_published: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface SEOSettings {
  id: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
}

export interface WebsiteSettings {
  id: string;
  hero_headline_prefix: string;
  hero_headline_gradient: string;
  hero_badge_text: string;
  stat_years_exp: string;
  stat_growth: string;
  stat_target: string;
  stat_awards: string;
  cta_primary_text: string;
  cta_secondary_text: string;
}
