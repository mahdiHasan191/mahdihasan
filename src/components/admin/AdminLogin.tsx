import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { Shield, Lock, Mail, ArrowLeft, AlertCircle, Database, CheckCircle2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login, isCloudConnected, demoLogin } = useAuth();
  const { navigateTo } = useNavigation();

  const [email, setEmail] = useState('mhmasum7619@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
    demoLogin();
    navigateTo('admin_dashboard');
  };

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
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">
            Authorized management console for Mahdi Hasan
          </p>

          {/* Database status indicator */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[11px] font-mono">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Database:</span>
            <span className={isCloudConnected ? 'text-emerald-400' : 'text-amber-400'}>
              {isCloudConnected ? 'Supabase Live Connected' : 'Local / Setup Mode'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
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

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 disabled:opacity-50 rounded-xl shadow-lg shadow-cyan-500/20 transition-all font-medium"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Sign In to Admin Console</span>
            )}
          </button>
        </form>

        {/* Local evaluation quick access */}
        {!isCloudConnected && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-400 mb-3">
              Running in Local Setup Mode. You can log in directly as the administrator:
            </p>
            <button
              onClick={handleDemoAccess}
              className="w-full px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 rounded-xl transition-colors"
            >
              Sign In as Mahdi Hasan (Admin Demo)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
