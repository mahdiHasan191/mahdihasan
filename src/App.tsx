import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { DataProvider, useData } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';

import { Header } from './components/public/Header';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { ServicesSection } from './components/public/ServicesSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { SkillsSection } from './components/public/SkillsSection';
import { AchievementGallery } from './components/public/AchievementGallery';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { CredentialsPage } from './components/public/CredentialsPage';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { route } = useNavigation();
  const { isAdmin, loading: authLoading } = useAuth();
  const { seo } = useData();

  // Keep a crawlable fallback until the public app is ready.
  useEffect(() => {
    const fallback = document.getElementById('seo-fallback');
    if (fallback) fallback.hidden = route !== 'home' || !authLoading;
  }, [authLoading, route]);

  // Sync document metadata with editable SEO settings.
  useEffect(() => {
    if (seo?.meta_title) document.title = seo.meta_title;
    const updateMetaContent = (selector: string, content?: string) => {
      if (!content) return;
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    };
    updateMetaContent('meta[name="description"]', seo?.meta_description);
    updateMetaContent('meta[name="keywords"]', seo?.keywords);
    updateMetaContent('meta[property="og:title"]', seo?.og_title);
    updateMetaContent('meta[property="og:description"]', seo?.og_description);
    updateMetaContent('meta[name="twitter:title"]', seo?.og_title || seo?.meta_title);
    updateMetaContent('meta[name="twitter:description"]', seo?.og_description || seo?.meta_description);
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

  // Dedicated Credentials Tab / File View (FMCG Experience, Education, Achievements, Certifications)
  if (route === 'credentials') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        <Header />
        <main className="pt-20">
          <CredentialsPage />
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    );
  }

  // Streamlined Public Landing Page (Zero Clutter, Fast, Focused)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header />
      <main>
        <Hero />
        <About />
        <ServicesSection />
        <PortfolioSection />
        <SkillsSection />
        <AchievementGallery />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <DataProvider>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </DataProvider>
      </NavigationProvider>
    </AuthProvider>
  );
}
