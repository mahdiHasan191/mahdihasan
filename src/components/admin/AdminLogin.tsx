import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import {
  Shield,
  Lock,
  Mail,
  ArrowLeft,
  AlertCircle,
  Database,
  CheckCircle2,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const {
    login,
    resetPassword,
    isCloudConnected,
    isDemoAllowed,
    demoLogin,
    failedAttempts,
    lockoutSeconds,
  } = useAuth();
  const { navigateTo } = useNavigation();

  const [email, setEmail] = useState('mhmasum7619@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSentMsg, setResetSentMsg] = useState('');
  const [showResetMode, setShowResetMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetSentMsg('');

    if (showResetMode) {
      if (!email.trim()) {
        setError('Please provide your administrator email address.');
        return;
      }
      setLoading(true);
      const res = await resetPassword(email.trim());
      setLoading(false);
      if (res.success) {
        setResetSentMsg(
          'Password reset link sent to mhmasum7619@gmail.com. Check your inbox and spam folder.'
        );
      } else {
        setError(res.error || 'Could not dispatch reset email.');
      }
      return;
    }

    if (!email.trim() || !password) {
      setError('Please provide administrator email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email.trim(), password);
    setLoading(false);

    if (res.success) {
      navigateTo('admin_dashboard');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleDemoAccess = () => {
    if (!isDemoAllowed) return;
    demoLogin();
    navigateTo('admin_dashboard');
  };

  const isLocked = lockoutSeconds > 0;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Return to website */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mahdi Hasan Portfolio</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
        {/* Brand Lockup */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified Administrator Console · noindex protected
          </p>

          {/* Database status indicator */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[11px] font-mono">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Auth:</span>
            <span className={isCloudConnected ? 'text-emerald-400' : 'text-amber-400'}>
              {isCloudConnected ? 'Supabase Strict Auth' : 'Preview Sandbox Only'}
            </span>
          </div>
        </div>

        {/* Production notice when Supabase isn't configured on live domain */}
        {!isCloudConnected && !isDemoAllowed && (
          <div className="mb-5 p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-2.5 text-amber-200 text-xs leading-relaxed">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <strong>Production Security Active:</strong> Configure{' '}
              <code className="text-amber-300">VITE_SUPABASE_URL</code> and{' '}
              <code className="text-amber-300">VITE_SUPABASE_ANON_KEY</code> in Cloudflare Pages to
              sign in. Client-side bypasses are disabled on live domains.
            </div>
          </div>
        )}

        {isLocked && (
          <div className="mb-5 p-3 bg-rose-950/50 border border-rose-500/50 rounded-xl flex items-center gap-2 text-rose-200 text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              Rate limit cooldown active. Try again in <strong>{lockoutSeconds}s</strong>.
            </span>
          </div>
        )}

        {error && !isLocked && (
          <div className="mb-5 p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {resetSentMsg && (
          <div className="mb-5 p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{resetSentMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Administrator Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mhmasum7619@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          {!showResetMode && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">Password</label>
                {isCloudConnected && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetMode(true);
                      setError('');
                      setResetSentMsg('');
                    }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || isLocked}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 disabled:opacity-50 rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : showResetMode ? (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Send Password Reset Email</span>
              </>
            ) : (
              <span>Sign In to Admin Console</span>
            )}
          </button>

          {showResetMode && (
            <button
              type="button"
              onClick={() => {
                setShowResetMode(false);
                setError('');
                setResetSentMsg('');
              }}
              className="w-full text-center text-xs text-slate-400 hover:text-white py-1 transition-colors"
            >
              Return to Password Sign In
            </button>
          )}
        </form>

        {failedAttempts > 0 && !isLocked && (
          <p className="mt-3 text-center text-[11px] font-mono text-slate-500">
            Remaining sign-in attempts before cooldown: {Math.max(0, 5 - failedAttempts)} / 5
          </p>
        )}

        {/* Preview Sandbox quick access — strictly disabled on production hosts */}
        {isDemoAllowed && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-400 mb-3">
              Local Preview Sandbox Mode (automatically disabled on production domain):
            </p>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 rounded-xl transition-colors"
            >
              Enter Local Preview Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
