import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { DataProvider, useData } from './context/DataContext';

import { Header } from './components/public/Header';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { ServicesSection } from './components/public/ServicesSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { ExperienceSection } from './components/public/ExperienceSection';
import { SkillsSection } from './components/public/SkillsSection';
import { EducationSection } from './components/public/EducationSection';
import { CertificationsSection } from './components/public/CertificationsSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { route } = useNavigation();
  const { isAdmin, loading: authLoading } = useAuth();
  const { seo } = useData();

  // Sync document head with dynamic SEO settings
  useEffect(() => {
    if (seo?.meta_title) {
      document.title = seo.meta_title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && seo?.meta_description) {
      metaDesc.setAttribute('content', seo.meta_description);
    }
  }, [seo]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (route === 'admin_login') {
    return <AdminLogin />;
  }

  if (route === 'admin_dashboard') {
    if (!isAdmin) {
      return <AdminLogin />;
    }
    return <AdminDashboard />;
  }

  // Public Landing Page
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header />
      <main>
        <Hero />
        <About />
        <ServicesSection />
        <PortfolioSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </NavigationProvider>
    </AuthProvider>
  );
}
