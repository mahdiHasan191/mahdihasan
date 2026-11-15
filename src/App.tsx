import React, { useEffect, Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { DataProvider, useData } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { ROUTE_META_MAP, SITE_ORIGIN, DEFAULT_OG_IMAGE } from './data/seoRoutes';

import { Header } from './components/public/Header';
import { Hero } from './components/public/Hero';
import { ServicesSection } from './components/public/ServicesSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { ProcessToolsSection } from './components/public/ProcessToolsSection';
import { SkillsSection } from './components/public/SkillsSection';
import { AchievementGallery } from './components/public/AchievementGallery';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';

// Route-level Code Splitting for secondary & admin modules
const CredentialsPage = lazy(() =>
  import('./components/public/CredentialsPage').then((m) => ({ default: m.CredentialsPage }))
);
const AboutPage = lazy(() =>
  import('./components/public/RoutePages').then((m) => ({ default: m.AboutPage }))
);
const ServicesHubPage = lazy(() =>
  import('./components/public/RoutePages').then((m) => ({ default: m.ServicesHubPage }))
);
const CaseStudiesPage = lazy(() =>
  import('./components/public/RoutePages').then((m) => ({ default: m.CaseStudiesPage }))
);
const ContactPage = lazy(() =>
  import('./components/public/RoutePages').then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./components/public/RoutePages').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const NotFoundPage = lazy(() =>
  import('./components/public/RoutePages').then((m) => ({ default: m.NotFoundPage }))
);
const AdminLogin = lazy(() =>
  import('./components/admin/AdminLogin').then((m) => ({ default: m.AdminLogin }))
);
const AdminDashboard = lazy(() =>
  import('./components/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);

const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] bg-slate-950 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

function setOrCreateMeta(attrName: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector(`meta[${attrName}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

const AppContent: React.FC = () => {
  const { route } = useNavigation();
  const { isAdmin, loading: authLoading } = useAuth();
  const { seo } = useData();

  // Dynamic route-aware Head Metadata, Canonical URL, OpenGraph, and Robots tag sync
  useEffect(() => {
    const meta = ROUTE_META_MAP[route] || ROUTE_META_MAP.home;
    const isAdminRoute = route === 'admin_login' || route === 'admin_dashboard';

    const resolvedTitle =
      route === 'home' && seo?.meta_title ? seo.meta_title : meta.title;
    const resolvedDesc =
      route === 'home' && seo?.meta_description ? seo.meta_description : meta.description;
    const canonicalUrl = `${SITE_ORIGIN}${meta.path === '/' ? '/' : meta.path}`;
    const ogImage = (seo as any)?.og_image || DEFAULT_OG_IMAGE;

    document.title = resolvedTitle;
    setOrCreateMeta('name', 'description', resolvedDesc);
    setOrCreateMeta('name', 'robots', isAdminRoute ? 'noindex, nofollow' : meta.robots);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    setOrCreateMeta('property', 'og:type', meta.ogType || 'website');
    setOrCreateMeta('property', 'og:url', canonicalUrl);
    setOrCreateMeta('property', 'og:title', resolvedTitle);
    setOrCreateMeta('property', 'og:description', resolvedDesc);
    setOrCreateMeta('property', 'og:image', ogImage);

    setOrCreateMeta('name', 'twitter:title', resolvedTitle);
    setOrCreateMeta('name', 'twitter:description', resolvedDesc);
    setOrCreateMeta('name', 'twitter:image', ogImage);
  }, [route, seo]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (route === 'admin_login') {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminLogin />
      </Suspense>
    );
  }

  if (route === 'admin_dashboard') {
    return (
      <Suspense fallback={<PageLoader />}>
        {isAdmin ? <AdminDashboard /> : <AdminLogin />}
      </Suspense>
    );
  }

  const renderPublicRoute = () => {
    if (route === 'about') {
      return <AboutPage />;
    }
    if (
      route === 'services' ||
      route === 'service_ai' ||
      route === 'service_n8n' ||
      route === 'service_sales'
    ) {
      return <ServicesHubPage variant={route} />;
    }
    if (route === 'case_studies') {
      return <CaseStudiesPage />;
    }
    if (route === 'credentials') {
      return (
        <div className="pt-20">
          <CredentialsPage />
        </div>
      );
    }
    if (route === 'contact') {
      return <ContactPage />;
    }
    if (route === 'privacy') {
      return <PrivacyPolicyPage />;
    }
    if (route === 'not_found') {
      return <NotFoundPage />;
    }

    // Homepage ('/')
    return (
      <>
        <Hero />
        <ServicesSection />
        <PortfolioSection />
        <ProcessToolsSection />
        <SkillsSection />
        <AchievementGallery />
        <ContactSection />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>{renderPublicRoute()}</Suspense>
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
