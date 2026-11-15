import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppRoute, ROUTE_META_MAP, resolveRouteFromPathname } from '../data/seoRoutes';

export type { AppRoute };

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
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return { route: 'home' as AppRoute, adminTab: 'dashboard' };
    }
    return resolveRouteFromPathname(window.location.pathname, window.location.hash);
  };

  const initial = getInitialState();
  const [route, setRoute] = useState<AppRoute>(initial.route);
  const [activeAdminTab, setActiveAdminTab] = useState<string>(initial.adminTab);
  const [activeCredentialsTab, setActiveCredentialsTab] = useState<
    'experience' | 'education' | 'achievements' | 'certifications'
  >('experience');

  useEffect(() => {
    const handlePopState = () => {
      const current = resolveRouteFromPathname(window.location.pathname, window.location.hash);
      setRoute(current.route);
      setActiveAdminTab(current.adminTab);
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
    } else {
      const targetPath = ROUTE_META_MAP[newRoute]?.path || '/';
      window.history.pushState({}, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (
      sectionId === 'experience' ||
      sectionId === 'education' ||
      sectionId === 'achievements' ||
      sectionId === 'certifications'
    ) {
      setActiveCredentialsTab(sectionId);
      navigateTo('credentials');
      return;
    }

    if (route !== 'home') {
      setRoute('home');
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
