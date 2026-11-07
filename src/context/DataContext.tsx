import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import { db } from '../lib/supabase';
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

interface DataContextType {
  loading: boolean;
  profile: Profile;
  settings: WebsiteSettings;
  seo: SEOSettings;
  services: Service[];
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  skills: Skill[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
  refreshData: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  updateSettings: (data: Partial<WebsiteSettings>) => Promise<void>;
  updateSEO: (data: Partial<SEOSettings>) => Promise<void>;
  saveService: (service: Service) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveExperience: (exp: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  saveEducation: (edu: Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  saveCertification: (cert: Certification) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  saveSkill: (skill: Skill) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  saveTestimonial: (item: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [settings, setSettings] = useState<WebsiteSettings>(initialWebsiteSettings);
  const [seo, setSeo] = useState<SEOSettings>(initialSEOSettings);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  const refreshData = useCallback(async () => {
    try {
      const [
        p,
        st,
        s,
        srv,
        prj,
        exp,
        edu,
        crt,
        skl,
        tst,
        inq,
      ] = await Promise.all([
        db.getProfile(),
        db.getSettings(),
        db.getSEO(),
        db.getServices(false),
        db.getProjects(false),
        db.getExperiences(false),
        db.getEducations(false),
        db.getCertifications(false),
        db.getSkills(false),
        db.getTestimonials(false),
        db.getInquiries(),
      ]);

      if (p) setProfile(p);
      if (st) setSettings(st);
      if (s) setSeo(s);
      if (srv) setServices(srv);
      if (prj) setProjects(prj);
      if (exp) setExperiences(exp);
      if (edu) setEducations(edu);
      if (crt) setCertifications(crt);
      if (skl) setSkills(skl);
      if (tst) setTestimonials(tst);
      if (inq) setInquiries(inq);
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateProfile = async (data: Partial<Profile>) => {
    const updated = await db.updateProfile(data);
    setProfile(updated);
  };

  const updateSettings = async (data: Partial<WebsiteSettings>) => {
    const updated = await db.updateSettings(data);
    setSettings(updated);
  };

  const updateSEO = async (data: Partial<SEOSettings>) => {
    const updated = await db.updateSEO(data);
    setSeo(updated);
  };

  const saveService = async (service: Service) => {
    await db.saveService(service);
    await refreshData();
  };

  const deleteService = async (id: string) => {
    await db.deleteService(id);
    await refreshData();
  };

  const saveProject = async (project: Project) => {
    await db.saveProject(project);
    await refreshData();
  };

  const deleteProject = async (id: string) => {
    await db.deleteProject(id);
    await refreshData();
  };

  const saveExperience = async (exp: Experience) => {
    await db.saveExperience(exp);
    await refreshData();
  };

  const deleteExperience = async (id: string) => {
    await db.deleteExperience(id);
    await refreshData();
  };

  const saveEducation = async (edu: Education) => {
    await db.saveEducation(edu);
    await refreshData();
  };

  const deleteEducation = async (id: string) => {
    await db.deleteEducation(id);
    await refreshData();
  };

  const saveCertification = async (cert: Certification) => {
    await db.saveCertification(cert);
    await refreshData();
  };

  const deleteCertification = async (id: string) => {
    await db.deleteCertification(id);
    await refreshData();
  };

  const saveSkill = async (skill: Skill) => {
    await db.saveSkill(skill);
    await refreshData();
  };

  const deleteSkill = async (id: string) => {
    await db.deleteSkill(id);
    await refreshData();
  };

  const saveTestimonial = async (item: Testimonial) => {
    await db.saveTestimonial(item);
    await refreshData();
  };

  const deleteTestimonial = async (id: string) => {
    await db.deleteTestimonial(id);
    await refreshData();
  };

  const updateInquiryStatus = async (id: string, status: ContactInquiry['status']) => {
    await db.updateInquiryStatus(id, status);
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteInquiry = async (id: string) => {
    await db.deleteInquiry(id);
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        profile,
        settings,
        seo,
        services,
        projects,
        experiences,
        educations,
        certifications,
        skills,
        testimonials,
        inquiries,
        refreshData,
        updateProfile,
        updateSettings,
        updateSEO,
        saveService,
        deleteService,
        saveProject,
        deleteProject,
        saveExperience,
        deleteExperience,
        saveEducation,
        deleteEducation,
        saveCertification,
        deleteCertification,
        saveSkill,
        deleteSkill,
        saveTestimonial,
        deleteTestimonial,
        updateInquiryStatus,
        deleteInquiry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
