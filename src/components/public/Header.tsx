import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { Shield, Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { scrollToSection, navigateTo } = useNavigation();
  const { isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          >
            Mahdi Hasan
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 primary action + discreet admin entrance */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg shadow-sm shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login')}
              title={isAdmin ? 'Go to Admin Dashboard' : 'Admin Login'}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigateTo(isAdmin ? 'admin_dashboard' : 'admin_login')}
              className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg border border-slate-800"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-3">
          <button
            onClick={() => {
              scrollToSection('about');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            About
          </button>
          <button
            onClick={() => {
              scrollToSection('services');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            Services
          </button>
          <button
            onClick={() => {
              scrollToSection('portfolio');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            Portfolio
          </button>
          <button
            onClick={() => {
              scrollToSection('experience');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            Experience
          </button>
          <button
            onClick={() => {
              scrollToSection('skills');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            Skills
          </button>
          <button
            onClick={() => {
              scrollToSection('contact');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            Contact
          </button>
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                scrollToSection('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
