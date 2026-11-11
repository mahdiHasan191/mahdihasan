import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppRoute = 'home' | 'credentials' | 'admin_login' | 'admin_dashboard';

interface NavigationContextType {
  route: AppRoute;
  activeAdminTab: string;
  activeCredentialsTab?: 'experience' | 'education' | 'achievements' | 'certifications';
  navigateTo: (route: AppRoute, adminTab?: string) => void;
  setActiveAdminTab: (tab: string) => void;
  setActiveCredentialsTab: (tab: 'experience' | 'education' | 'achievements' | 'certifications') => void;
  scrollToSection: (sectionId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialRoute = (): { route: AppRoute; tab: string } => {
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');

    if (path.startsWith('/admin/login') || hash === 'admin/login') {
      return { route: 'admin_login', tab: 'dashboard' };
    }
    if (path.startsWith('/admin') || hash.startsWith('admin')) {
      const parts = hash.split('/');
      const tab = parts[1] || 'dashboard';
      return { route: 'admin_dashboard', tab };
    }
    if (hash === 'credentials' || hash.startsWith('credentials') || hash === 'experience' || hash === 'education' || hash === 'achievements') {
      return { route: 'credentials', tab: 'experience' };
    }
    return { route: 'home', tab: 'dashboard' };
  };

  const initial = getInitialRoute();
  const [route, setRoute] = useState<AppRoute>(initial.route);
  const [activeAdminTab, setActiveAdminTab] = useState<string>(initial.tab);
  const [activeCredentialsTab, setActiveCredentialsTab] = useState<'experience' | 'education' | 'achievements' | 'certifications'>('experience');

  useEffect(() => {
    const handlePopState = () => {
      const current = getInitialRoute();
      setRoute(current.route);
      setActiveAdminTab(current.tab);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (newRoute: AppRoute, tab = 'dashboard') => {
    setRoute(newRoute);
    if (newRoute === 'admin_dashboard') {
      setActiveAdminTab(tab);
      window.history.pushState({}, '', `/admin#${tab}`);
    } else if (newRoute === 'admin_login') {
      window.history.pushState({}, '', '/admin/login');
    } else if (newRoute === 'credentials') {
      window.history.pushState({}, '', '/#credentials');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'experience' || sectionId === 'education' || sectionId === 'achievements' || sectionId === 'certifications') {
      setActiveCredentialsTab(sectionId as any);
      navigateTo('credentials');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (route !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        route,
        activeAdminTab,
        activeCredentialsTab,
        navigateTo,
        setActiveAdminTab,
        setActiveCredentialsTab,
        scrollToSection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
