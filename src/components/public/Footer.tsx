import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { Shield, ArrowUp, Linkedin, MessageCircle, Facebook, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = useData();
  const { scrollToSection, navigateTo } = useNavigation();
  const { isAdmin } = useAuth();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <h4 className="text-base font-bold text-white tracking-tight">
              {profile.name}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Sales & AI Automation Specialist · Dhaka, Bangladesh
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <button onClick={() => scrollToSection('home')} className="hover:text-cyan-400 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-cyan-400 transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-cyan-400 transition-colors">
              Experience
            </button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-cyan-400 transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors">
              Contact
            </button>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.whatsapp && (
              <a
                href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}
            {profile.facebook_url && (
              <a
                href={profile.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => scrollToSection('home')}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors ml-2"
              title="Back to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved. Built with React, TypeScript & Supabase.
          </div>

          <div className="flex items-center gap-4">
            <span>Dhaka North Territory · FMCG Operations</span>
            <span>·</span>
            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login')}
              className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors font-mono"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
