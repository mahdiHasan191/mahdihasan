import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | { email: string; id: string } | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isCloudConnected: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | { email: string; id: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCloudConnected, setIsCloudConnected] = useState(isSupabaseConfigured());

  useEffect(() => {
    const supabase = getSupabase();
    setIsCloudConnected(isSupabaseConfigured());

    if (supabase) {
      // Real Supabase session management
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Check local session in local/demo setup mode
      const localSession = sessionStorage.getItem('mahdi_admin_session_auth');
      if (localSession) {
        try {
          const parsed = JSON.parse(localSession);
          setUser(parsed.user);
        } catch (e) {
          // ignore
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabase();

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        setUser(data.user);
        setSession(data.session);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Login failed' };
      }
    } else {
      // Local Mode: Pre-authorized Admin check
      // Allows administrator (mhmasum7619@gmail.com or admin@mahdihasan.com) to access dashboard
      if (
        (email.trim().toLowerCase() === 'mhmasum7619@gmail.com' ||
         email.trim().toLowerCase() === 'admin@mahdihasan.com') &&
        pass.length >= 6
      ) {
        const adminUser = {
          id: 'admin-mahdi-local',
          email: email.trim().toLowerCase(),
        };
        setUser(adminUser);
        sessionStorage.setItem('mahdi_admin_session_auth', JSON.stringify({ user: adminUser }));
        return { success: true };
      }

      return {
        success: false,
        error: 'Invalid administrator credentials or unauthorized user.',
      };
    }
  };

  const demoLogin = () => {
    const adminUser = {
      id: 'admin-mahdi-local',
      email: 'mhmasum7619@gmail.com',
    };
    setUser(adminUser);
    sessionStorage.setItem('mahdi_admin_session_auth', JSON.stringify({ user: adminUser }));
  };

  const logout = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('mahdi_admin_session_auth');
    setUser(null);
    setSession(null);
  };

  const isAdmin = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        isCloudConnected,
        login,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
