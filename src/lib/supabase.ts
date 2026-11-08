import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Profile,
  Service,
  Project,
  Experience,
  Education,
  Certification,
  Skill,
  Testimonial,
  ContactInquiry,
  SEOSettings,
  WebsiteSettings,
} from '../types';
import {
  initialProfile,
  initialWebsiteSettings,
  initialSEOSettings,
  initialServices,
  initialProjects,
  initialExperiences,
  initialEducations,
  initialCertifications,
  initialSkills,
  initialTestimonials,
} from '../data/initialData';

// Local storage keys
const STORAGE_KEYS = {
  SUPABASE_CREDS: 'mahdi_supabase_creds',
  AUTH_SESSION: 'mahdi_admin_session',
  PROFILE: 'mahdi_data_profile_v2',
  SETTINGS: 'mahdi_data_settings_v2',
  SEO: 'mahdi_data_seo_v2',
  SERVICES: 'mahdi_data_services_v2',
  PROJECTS: 'mahdi_data_projects_v2',
  EXPERIENCES: 'mahdi_data_experiences_v2',
  EDUCATIONS: 'mahdi_data_educations_v2',
  CERTIFICATIONS: 'mahdi_data_certifications_v2',
  SKILLS: 'mahdi_data_skills_v2',
  TESTIMONIALS: 'mahdi_data_testimonials_v2',
  INQUIRIES: 'mahdi_data_inquiries_v2',
};

// Retrieve configured credentials (env var or runtime override)
export function getSupabaseCredentials(): { url: string; anonKey: string } {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPABASE_CREDS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignore error
  }

  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  return {
    url: envUrl,
    anonKey: envKey,
  };
}

export function saveSupabaseCredentials(url: string, anonKey: string) {
  localStorage.setItem(STORAGE_KEYS.SUPABASE_CREDS, JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() }));
  supabaseClientInstance = null; // Reset client instance to reload with new creds
}

export function clearSupabaseCredentials() {
  localStorage.removeItem(STORAGE_KEYS.SUPABASE_CREDS);
  supabaseClientInstance = null;
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(
    url &&
    anonKey &&
    url.startsWith('https://') &&
    url.includes('.supabase.co') &&
    anonKey.length > 20 &&
    anonKey !== 'your-anon-key'
  );
}

let supabaseClientInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseClientInstance) {
    const { url, anonKey } = getSupabaseCredentials();
    supabaseClientInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseClientInstance;
}

// ==========================================
// Local Storage Persistent Helpers (Fallback)
// ==========================================

function getLocalData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (err) {
    return fallback;
  }
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to write to localStorage', err);
  }
}

// ==========================================
// Database Operations Service
// ==========================================

export const db = {
  // --- Profile ---
  async getProfile(): Promise<Profile> {
    const client = getSupabase();
    if (client) {
      try {
        const { data, error } = await client.from('profiles').select('*').limit(1).single();
        if (!error && data) return data as Profile;
      } catch (err) {
        console.warn('Falling back to local profile data:', err);
      }
    }
    return getLocalData<Profile>(STORAGE_KEYS.PROFILE, initialProfile);
  },

  async updateProfile(profile: Partial<Profile>): Promise<Profile> {
    const client = getSupabase();
    const current = await this.getProfile();
    const updated: Profile = { ...current, ...profile, updated_at: new Date().toISOString() };

    if (client) {
      const { error } = await client.from('profiles').upsert(updated);
      if (error) {
        console.error('Supabase profile update error:', error);
        throw new Error(`Could not save profile changes to the cloud: ${error.message}`);
      }
    }
    setLocalData(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },

  // --- Website Settings ---
  async getSettings(): Promise<WebsiteSettings> {
    const client = getSupabase();
    if (client) {
      try {
        const { data, error } = await client.from('website_settings').select('*').limit(1).single();
        if (!error && data) return data as WebsiteSettings;
      } catch (err) {
        console.warn('Falling back to local settings:', err);
      }
    }
    return getLocalData<WebsiteSettings>(STORAGE_KEYS.SETTINGS, initialWebsiteSettings);
  },

  async updateSettings(settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    const client = getSupabase();
    const current = await this.getSettings();
    const updated: WebsiteSettings = { ...current, ...settings };

    if (client) {
      try {
        await client.from('website_settings').upsert(updated);
      } catch (err) {
        console.error('Supabase settings update failed:', err);
      }
    }
    setLocalData(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // --- SEO Settings ---
  async getSEO(): Promise<SEOSettings> {
    const client = getSupabase();
    if (client) {
      try {
        const { data, error } = await client.from('seo_settings').select('*').limit(1).single();
        if (!error && data) return data as SEOSettings;
      } catch (err) {
        console.warn('Falling back to local SEO data:', err);
      }
    }
    return getLocalData<SEOSettings>(STORAGE_KEYS.SEO, initialSEOSettings);
  },

  async updateSEO(seo: Partial<SEOSettings>): Promise<SEOSettings> {
    const client = getSupabase();
    const current = await this.getSEO();
    const updated: SEOSettings = { ...current, ...seo };

    if (client) {
      try {
        await client.from('seo_settings').upsert(updated);
      } catch (err) {
        console.error('Supabase SEO update failed:', err);
      }
    }
    setLocalData(STORAGE_KEYS.SEO, updated);
    return updated;
  },

  // --- Services ---
  async getServices(publishedOnly = false): Promise<Service[]> {
    const client = getSupabase();
    if (client) {
      try {
        let query = client.from('services').select('*').order('display_order', { ascending: true });
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Service[];
      } catch (err) {
        console.warn('Falling back to local services:', err);
      }
    }
    const all = getLocalData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    return publishedOnly ? all.filter((s) => s.is_published) : all;
  },

  async saveService(service: Service): Promise<Service> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('services').upsert(service);
      } catch (err) {
        console.error('Supabase service save failed:', err);
      }
    }
    const all = await this.getServices(false);
    const index = all.findIndex((s) => s.id === service.id);
    let nextList: Service[];
    if (index >= 0) {
      nextList = [...all];
      nextList[index] = service;
    } else {
      nextList = [...all, service];
    }
    setLocalData(STORAGE_KEYS.SERVICES, nextList);
    return service;
  },

  async deleteService(id: string): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('services').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete service failed:', err);
      }
    }
    const all = await this.getServices(false);
    setLocalData(
      STORAGE_KEYS.SERVICES,
      all.filter((s) => s.id !== id)
    );
  },

  // --- Projects ---
  async getProjects(publishedOnly = false): Promise<Project[]> {
    const client = getSupabase();
    if (client) {
      try {
        let query = client.from('projects').select('*').order('display_order', { ascending: true });
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Project[];
      } catch (err) {
        console.warn('Falling back to local projects:', err);
      }
    }
    const all = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    return publishedOnly ? all.filter((p) => p.is_published) : all;
  },

  async saveProject(project: Project): Promise<Project> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('projects').upsert(project);
      } catch (err) {
        console.error('Supabase save project failed:', err);
      }
    }
    const all = await this.getProjects(false);
    const index = all.findIndex((p) => p.id === project.id);
    let nextList: Project[];
    if (index >= 0) {
      nextList = [...all];
      nextList[index] = project;
    } else {
      nextList = [...all, project];
    }
    setLocalData(STORAGE_KEYS.PROJECTS, nextList);
    return project;
  },

  async deleteProject(id: string): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('projects').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete project failed:', err);
      }
    }
    const all = await this.getProjects(false);
    setLocalData(
      STORAGE_KEYS.PROJECTS,
      all.filter((p) => p.id !== id)
    );
  },

  // --- Experiences ---
  async getExperiences(publishedOnly = false): Promise<Experience[]> {
    const client = getSupabase();
    if (client) {
      try {
        let query = client.from('experiences').select('*').order('display_order', { ascending: true });
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Experience[];
      } catch (err) {
        console.warn('Falling back to local experiences:', err);
      }
    }
    const all = getLocalData<Experience[]>(STORAGE_KEYS.EXPERIENCES, initialExperiences);
    return publishedOnly ? all.filter((e) => e.is_published) : all;
  },

  async saveExperience(exp: Experience): Promise<Experience> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('experiences').upsert(exp);
      } catch (err) {
        console.error('Supabase save experience failed:', err);
      }
    }
    const all = await this.getExperiences(false);
    const idx = all.findIndex((e) => e.id === exp.id);
    const nextList = idx >= 0 ? all.map((e) => (e.id === exp.id ? exp : e)) : [...all, exp];
    setLocalData(STORAGE_KEYS.EXPERIENCES, nextList);
    return exp;
  },

  async deleteExperience(id: string): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('experiences').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete experience failed:', err);
      }
    }
    const all = await this.getExperiences(false);
    setLocalData(
      STORAGE_KEYS.EXPERIENCES,
      all.filter((e) => e.id !== id)
    );
  },

  // --- Educations ---
  async getEducations(publishedOnly = false): Promise<Education[]> {
    const client = getSupabase();
    if (client) {
      try {
        let query = client.from('educations').select('*').order('display_order', { ascending: true });
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Education[];
      } catch (err) {
        console.warn('Falling back to local educations:', err);
      }
    }
    const all = getLocalData<Education[]>(STORAGE_KEYS.EDUCATIONS, initialEducations);
    return publishedOnly ? all.filter((e) => e.is_published) : all;
  },

  async saveEducation(edu: Education): Promise<Education> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('educations').upsert(edu);
      } catch (err) {
        console.error('Supabase save education failed:', err);
      }
    }
    const all = await this.getEducations(false);
    const idx = all.findIndex((e) => e.id === edu.id);
    const nextList = idx >= 0 ? all.map((e) => (e.id === edu.id ? edu : e)) : [...all, edu];
    setLocalData(STORAGE_KEYS.EDUCATIONS, nextList);
    return edu;
  },

  async deleteEducation(id: string): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('educations').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete education failed:', err);
      }
    }
    const all = await this.getEducations(false);
    setLocalData(
      STORAGE_KEYS.EDUCATIONS,
      all.filter((e) => e.id !== id)
    );
  },

  // --- Certifications ---
  async getCertifications(publishedOnly = false): Promise<Certification[]> {
    const client = getSupabase();
    if (client) {
      try {
        let query = client.from('certifications').select('*').order('display_order', { ascending: true });
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Certification[];
      } catch (err) {
        console.warn('Falling back to local certifications:', err);
      }
    }
    const all = getLocalData<Certification[]>(STORAGE_KEYS.CERTIFICATIONS, initialCertifications);
    return publishedOnly ? all.filter((c) => c.is_published) : all;
  },

  async saveCertification(cert: Certification): Promise<Certification> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('certifications').upsert(cert);
      } catch (err) {
        console.error('Supabase save certification failed:', err);
      }
    }
    const all = await this.getCertifications(false);
    const idx = all.findIndex((c) => c.id === cert.id);
    const nextList = idx >= 0 ? all.map((c) => (c.id === cert.id ? cert : c)) : [...all, cert];
    setLocalData(STORAGE_KEYS.CERTIFICATIONS, nextList);
    return cert;
  },

  async deleteCertification(id: string): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('certifications').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete certification failed:', err);
      }
    }
    const all = await this.getCertifications(false);
    setLocalData(
      STORAGE_KEYS.CERTIFICATIONS,
      all.filter((c) => c.id !== id)
    );
  },

  // --- Skills ---
  async getSkills(publishedOnly = false): Promise<Skill[]> {
    const client = getSupabase();
    if (client) {
      try {
        let query = client.from('skills').select('*').order('display_order', { ascending: true });
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Skill[];
      } catch (err) {
        console.warn('Falling back to local skills:', err);
      }
    }
    const all = getLocalData<Skill[]>(STORAGE_KEYS.SKILLS, initialSkills);
    return publishedOnly ? all.filter((s) => s.is_published) : all;
  },

  async saveSkill(skill: Skill): Promise<Skill> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('skills').upsert(skill);
      } catch (err) {
        console.error('Supabase save skill failed:', err);
      }
    }
    const all = await this.getSkills(false);
    const idx = all.findIndex((s) => s.id === skill.id);
    const nextList = idx >= 0 ? all.map((s) => (s.id === skill.id ? skill : s)) : [...all, skill];
    setLocalData(STORAGE_KEYS.SKILLS, nextList);
    return skill;
  },

  async deleteSkill(id: string): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('skills').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete skill failed:', err);
      }
    }
    const all = await this.getSkills(false);
    setLocalData(
      STORAGE_KEYS.SKILLS,
      all.filter((s) => s.id !== id)
    );
  },

  // --- Testimonials ---
  async getTestimonials(publishedOnly = false): Promise<Testimonial[]> {
    const client = getSupabase();
    if (client) {
      try {
        let query = client.from('testimonials').select('*').order('display_order', { ascending: true });
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Testimonial[];
      } catch (err) {
        console.warn('Falling back to local testimonials:', err);
      }
    }
    const all = getLocalData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    return publishedOnly ? all.filter((t) => t.is_published) : all;
  },

  async saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('testimonials').upsert(testimonial);
      } catch (err) {
        console.error('Supabase save testimonial failed:', err);
      }
    }
    const all = await this.getTestimonials(false);
    const idx = all.findIndex((t) => t.id === testimonial.id);
    const nextList = idx >= 0 ? all.map((t) => (t.id === testimonial.id ? testimonial : t)) : [...all, testimonial];
    setLocalData(STORAGE_KEYS.TESTIMONIALS, nextList);
    return testimonial;
  },

  async deleteTestimonial(id: string): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('testimonials').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete testimonial failed:', err);
      }
    }
    const all = await this.getTestimonials(false);
    setLocalData(
      STORAGE_KEYS.TESTIMONIALS,
      all.filter((t) => t.id !== id)
    );
  },

  // --- Contact Inquiries ---
  async getInquiries(): Promise<ContactInquiry[]> {
    const client = getSupabase();
    if (client) {
      try {
        const { data, error } = await client
          .from('contact_inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data as ContactInquiry[];
      } catch (err) {
        console.warn('Falling back to local inquiries:', err);
      }
    }
    return getLocalData<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, []);
  },

  async submitInquiry(
    inquiry: Omit<ContactInquiry, 'id' | 'status' | 'created_at'>
  ): Promise<{ success: boolean; id: string; error?: string }> {
    const client = getSupabase();
    if (!client) {
      throw new Error('The website is not connected to Supabase. Please try again later.');
    }

    const { data, error } = await client.from('contact_inquiries').insert([{
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || null,
      company: inquiry.company || null,
      service_interest: inquiry.service_interest || null,
      message: inquiry.message,
      status: 'new',
    }]).select('id').single();
    if (error) {
      console.error('Supabase insert inquiry failed:', error);
      throw new Error('Your message could not be saved. Please try again later.');
    }
    if (!data?.id) throw new Error('Your message could not be confirmed as saved.');

    const { error: emailError } = await client.functions.invoke('send-contact-notification', { body: inquiry });
    if (emailError) {
      console.error('Contact email notification failed:', emailError);
      return { success: true, id: data.id, error: 'saved_email_failed' };
    }
    return { success: true, id: data.id };
  },

  async updateInquiryStatus(id: string, status: ContactInquiry['status']): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('contact_inquiries').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Supabase update inquiry status failed:', err);
      }
    }
    const all = await this.getInquiries();
    setLocalData(
      STORAGE_KEYS.INQUIRIES,
      all.map((item) => (item.id === id ? { ...item, status } : item))
    );
  },

  async deleteInquiry(id: string): Promise<void> {
    const client = getSupabase();
    if (client) {
      try {
        await client.from('contact_inquiries').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete inquiry failed:', err);
      }
    }
    const all = await this.getInquiries();
    setLocalData(
      STORAGE_KEYS.INQUIRIES,
      all.filter((item) => item.id !== id)
    );
  },

  // --- Supabase Storage File Upload ---
  async uploadFile(bucket: 'portfolio-images' | 'resumes', file: File): Promise<string> {
    const client = getSupabase();
    if (!client) {
      throw new Error('Supabase is not connected. Local-only images cannot be shared with other visitors.');
    }
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || !user) {
      throw new Error('Please sign in to Supabase before uploading shared media.');
    }
    if (!file.type.startsWith('image/') && bucket === 'portfolio-images') {
      throw new Error('Please choose a valid image file.');
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('The file is too large. Maximum upload size is 10 MB.');
    }

    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const objectPath = `${user.id}/${cleanFileName}`;
    const { data, error } = await client.storage.from(bucket).upload(objectPath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || undefined,
    });
    if (error) {
      console.error('Supabase Storage upload failed:', error);
      throw new Error(`Cloud upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = client.storage.from(bucket).getPublicUrl(data.path);
    if (!publicUrlData?.publicUrl) throw new Error('Upload succeeded but a public image URL could not be created.');
    return publicUrlData.publicUrl;
  },

  // Reset all local demo data back to default initialData
  resetToDefaults(): void {
    setLocalData(STORAGE_KEYS.PROFILE, initialProfile);
    setLocalData(STORAGE_KEYS.SETTINGS, initialWebsiteSettings);
    setLocalData(STORAGE_KEYS.SEO, initialSEOSettings);
    setLocalData(STORAGE_KEYS.SERVICES, initialServices);
    setLocalData(STORAGE_KEYS.PROJECTS, initialProjects);
    setLocalData(STORAGE_KEYS.EXPERIENCES, initialExperiences);
    setLocalData(STORAGE_KEYS.EDUCATIONS, initialEducations);
    setLocalData(STORAGE_KEYS.CERTIFICATIONS, initialCertifications);
    setLocalData(STORAGE_KEYS.SKILLS, initialSkills);
    setLocalData(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  },
};
