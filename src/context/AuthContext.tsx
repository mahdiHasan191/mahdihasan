import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

const AUTHORIZED_ADMIN_EMAIL = 'mhmasum7619@gmail.com';
const RATE_LIMIT_KEY = 'mahdi_admin_rate_limit_v1';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface RateLimitState {
  attempts: number;
  lockedUntil: number;
}

export function isPreviewHost(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname.toLowerCase();
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.startsWith('ais-dev-') ||
    host.startsWith('ais-pre-') ||
    host.endsWith('.run.app')
  );
}

function readRateLimit(): RateLimitState {
  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { attempts: 0, lockedUntil: 0 };
    const parsed = JSON.parse(raw) as RateLimitState;
    return {
      attempts: Number(parsed.attempts) || 0,
      lockedUntil: Number(parsed.lockedUntil) || 0,
    };
  } catch {
    return { attempts: 0, lockedUntil: 0 };
  }
}

function writeRateLimit(state: RateLimitState): void {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

function isAuthorizedSupabaseUser(supaUser: User | null | undefined): boolean {
  if (!supaUser || !supaUser.email) return false;
  const emailMatch = supaUser.email.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL;
  const emailVerified = Boolean(supaUser.email_confirmed_at || (supaUser as any).confirmed_at);
  return emailMatch && emailVerified;
}

interface AuthContextType {
  user: User | { email: string; id: string } | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isCloudConnected: boolean;
  isDemoAllowed: boolean;
  failedAttempts: number;
  lockoutSeconds: number;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | { email: string; id: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCloudConnected, setIsCloudConnected] = useState(isSupabaseConfigured());
  const [failedAttempts, setFailedAttempts] = useState<number>(() => readRateLimit().attempts);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(() => {
    const remaining = readRateLimit().lockedUntil - Date.now();
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  });

  const previewHost = isPreviewHost();
  const isDemoAllowed = !isCloudConnected && previewHost;

  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      const remaining = readRateLimit().lockedUntil - Date.now();
      if (remaining <= 0) {
        setLockoutSeconds(0);
        setFailedAttempts(0);
        writeRateLimit({ attempts: 0, lockedUntil: 0 });
      } else {
        setLockoutSeconds(Math.ceil(remaining / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  useEffect(() => {
    const supabase = getSupabase();
    const cloudReady = isSupabaseConfigured();
    setIsCloudConnected(cloudReady);

    if (supabase) {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session?.user && isAuthorizedSupabaseUser(session.user)) {
          setSession(session);
          setUser(session.user);
        } else {
          if (session?.user) {
            await supabase.auth.signOut();
          }
          setSession(null);
          setUser(null);
        }
        setLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
        if (nextSession?.user && isAuthorizedSupabaseUser(nextSession.user)) {
          setSession(nextSession);
          setUser(nextSession.user);
        } else {
          setSession(null);
          setUser(null);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local setup mode ONLY allowed on localhost / sandbox preview hosts
      if (isPreviewHost()) {
        const localSession = sessionStorage.getItem('mahdi_admin_session_auth');
        if (localSession) {
          try {
            const parsed = JSON.parse(localSession);
            if (parsed?.user?.email?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL) {
              setUser(parsed.user);
            }
          } catch {
            // ignore
          }
        }
      } else {
        sessionStorage.removeItem('mahdi_admin_session_auth');
      }
      setLoading(false);
    }
  }, []);

  const recordFailedAttempt = () => {
    const current = readRateLimit();
    const nextAttempts = current.attempts + 1;
    let lockedUntil = current.lockedUntil;
    if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
      lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      setLockoutSeconds(Math.ceil(LOCKOUT_DURATION_MS / 1000));
    }
    setFailedAttempts(nextAttempts);
    writeRateLimit({ attempts: nextAttempts, lockedUntil });
  };

  const clearRateLimit = () => {
    setFailedAttempts(0);
    setLockoutSeconds(0);
    writeRateLimit({ attempts: 0, lockedUntil: 0 });
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const currentLimit = readRateLimit();
    if (currentLimit.lockedUntil > Date.now()) {
      const secs = Math.ceil((currentLimit.lockedUntil - Date.now()) / 1000);
      setLockoutSeconds(secs);
      return {
        success: false,
        error: `Too many failed sign-in attempts. Please wait ${secs} seconds before trying again.`,
      };
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== AUTHORIZED_ADMIN_EMAIL) {
      recordFailedAttempt();
      return {
        success: false,
        error: 'Unauthorized account. Only the verified administrator email may access this portal.',
      };
    }

    const supabase = getSupabase();

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: pass,
        });

        if (error) {
          recordFailedAttempt();
          return { success: false, error: error.message };
        }

        if (!isAuthorizedSupabaseUser(data.user)) {
          await supabase.auth.signOut();
          recordFailedAttempt();
          return {
            success: false,
            error:
              'Please verify your administrator email address via the confirmation link before accessing the dashboard.',
          };
        }

        clearRateLimit();
        setUser(data.user);
        setSession(data.session);
        return { success: true };
      } catch (err: any) {
        recordFailedAttempt();
        return { success: false, error: err?.message || 'Login failed' };
      }
    }

    // Strict Production Enforcement: block local login completely on live production domains
    if (!isPreviewHost()) {
      return {
        success: false,
        error:
          'Production security requires Supabase Auth (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY). Local fallback is disabled in production.',
      };
    }

    // Safe local setup preview mode ONLY on localhost / preview sandboxes when Supabase is unconfigured
    if (pass.length >= 8) {
      clearRateLimit();
      const adminUser = {
        id: 'admin-mahdi-preview',
        email: AUTHORIZED_ADMIN_EMAIL,
      };
      setUser(adminUser);
      sessionStorage.setItem('mahdi_admin_session_auth', JSON.stringify({ user: adminUser }));
      return { success: true };
    }

    recordFailedAttempt();
    return {
      success: false,
      error: 'Invalid credentials. Preview mode requires at least 8 characters.',
    };
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== AUTHORIZED_ADMIN_EMAIL) {
      return {
        success: false,
        error: 'Password reset is restricted to the registered administrator account.',
      };
    }

    const supabase = getSupabase();
    if (!supabase) {
      return {
        success: false,
        error: 'Connect Supabase Auth in environment variables to enable password reset emails.',
      };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/admin/login`,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Unable to dispatch password reset email.' };
    }
  };

  const demoLogin = () => {
    if (!isDemoAllowed) {
      console.warn('Demo login is disabled in production or when Supabase Auth is active.');
      return;
    }
    const adminUser = {
      id: 'admin-mahdi-preview',
      email: AUTHORIZED_ADMIN_EMAIL,
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
        isDemoAllowed,
        failedAttempts,
        lockoutSeconds,
        login,
        resetPassword,
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
