import React, { useState } from 'react';
import { CategoryType } from '../types';
import { Sparkles, Calendar, Eye, Feather, Sun, Moon, Gift, Menu, X, ChevronRight, Clock, ShieldCheck, Lock, Unlock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  activeView: 'catalog' | 'artists' | 'prep' | 'my-bookings' | 'admin';
  setActiveView: (view: 'catalog' | 'artists' | 'prep' | 'my-bookings' | 'admin') => void;
  onOpenAiCurator: () => void;
  onOpenBooking: () => void;
  onOpenReferral?: () => void;
  confirmedBookingsCount: number;
  isAdminAuthenticated: boolean;
  onAdminLogout: () => void;
  onRequestAdminAuth: () => void;
}

export const BrandIconLogo: React.FC<{ isDark?: boolean; className?: string }> = ({ isDark = false, className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center p-1.5 border transition-all duration-300 ${className} ${
    isDark 
      ? 'border-[#F7F5F0]/80 bg-[#101010] shadow-[0_0_12px_rgba(247,245,240,0.08)]' 
      : 'border-[#1A1A1A] bg-[#FAF9F6] shadow-[0_0_12px_rgba(26,26,26,0.08)]'
  }`}>
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer Geometric Diamond Accent */}
      <rect x="2" y="2" width="36" height="36" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className={isDark ? 'text-[#888888]' : 'text-[#8C8A82]'} />
      {/* Lash Arc Curve */}
      <path d="M 8,24 C 14,14 26,14 32,24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'} />
      {/* Feathered Wispy Lashes */}
      <path d="M 12,20 L 10,14 M 16,17 L 15,10 M 20,16 L 20,8 M 24,17 L 25,10 M 28,20 L 30,14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={isDark ? 'text-[#C49A8D]' : 'text-[#B8860B]'} />
      {/* Fine-Line Single Needle Pen Point */}
      <path d="M 20,22 L 20,33 M 18,30 L 20,33 L 22,30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'} />
      {/* Precision Micro Dot */}
      <circle cx="20" cy="35" r="1" fill="currentColor" className={isDark ? 'text-[#C49A8D]' : 'text-[#B8860B]'} />
    </svg>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  setActiveCategory,
  activeView,
  setActiveView,
  onOpenAiCurator,
  onOpenBooking,
  onOpenReferral,
  confirmedBookingsCount,
  isAdminAuthenticated,
  onAdminLogout,
  onRequestAdminAuth
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'catalog' | 'artists' | 'prep' | 'my-bookings' | 'admin', category?: CategoryType) => {
    setActiveView(view);
    if (category) setActiveCategory(category);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010]/95 border-[#262626] text-[#F7F5F0]' 
        : 'bg-[#FAF9F6]/95 border-[#E5E2D9] text-[#1A1A1A]'
    }`}>
      {/* Top Banner Notice - Graphic Ticker */}
      <div className={`text-[10px] py-1.5 px-4 overflow-hidden tracking-[0.2em] uppercase font-semibold border-b transition-colors ${
        isDark 
          ? 'bg-[#181818] text-[#F7F5F0] border-[#2A2A2A]' 
          : 'bg-[#1A1A1A] text-[#FAF9F6] border-[#1A1A1A]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#C49A8D] shrink-0" />
            <div className="whitespace-nowrap animate-marquee flex items-center gap-6">
              <span>AURA Atelier Kigali — Fine-Line Ink & Bespoke Lash Extensions in Kiyovu</span>
              <span className="opacity-40">•</span>
              <span>Local Time CAT (UTC+2) — Open 09:00 AM – 08:00 PM</span>
              <span className="opacity-40">•</span>
              <span>100% Sterile Single-Needle & Featherweight Cashmere Fibers</span>
            </div>
          </div>
          {onOpenReferral && (
            <button
              onClick={onOpenReferral}
              className="hidden lg:flex items-center gap-1.5 text-[9px] underline underline-offset-2 font-bold hover:text-[#C49A8D] transition-colors shrink-0 ml-4"
            >
              <Gift className="w-3 h-3 text-[#C49A8D]" />
              <span>Gift a Friend $20 & Get $20</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('catalog')}
          className="cursor-pointer flex items-center gap-3 group shrink-0"
        >
          <BrandIconLogo isDark={isDark} className="w-10 h-10 group-hover:scale-105" />
          <div>
            <span className={`font-serif text-2xl tracking-[0.25em] block leading-none font-light uppercase ${
              isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
            }`}>
              AURA
            </span>
            <span className={`text-[9px] tracking-[0.3em] uppercase font-sans block mt-1 font-semibold ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              Lash & Ink • Kigali
            </span>
          </div>
        </div>

        {/* Category Selector Pill */}
        <div className={`hidden md:flex items-center p-1 border transition-colors ${
          isDark 
            ? 'bg-[#181818] border-[#2A2A2A]' 
            : 'bg-[#EBE9E1] border-[#D1CEC3]'
        }`}>
          <button
            onClick={() => handleNavClick('catalog', 'lashes')}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 font-bold ${
              activeCategory === 'lashes' && activeView === 'catalog'
                ? isDark 
                  ? 'bg-[#F7F5F0] text-[#101010] shadow-sm' 
                  : 'bg-[#1A1A1A] text-[#FAF9F6] shadow-sm'
                : isDark 
                  ? 'text-[#888888] hover:text-[#F7F5F0]' 
                  : 'text-[#6B6961] hover:text-[#1A1A1A]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Eye Lashes</span>
          </button>

          <button
            onClick={() => handleNavClick('catalog', 'tattoos')}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 font-bold ${
              activeCategory === 'tattoos' && activeView === 'catalog'
                ? isDark 
                  ? 'bg-[#F7F5F0] text-[#101010] shadow-sm' 
                  : 'bg-[#1A1A1A] text-[#FAF9F6] shadow-sm'
                : isDark 
                  ? 'text-[#888888] hover:text-[#F7F5F0]' 
                  : 'text-[#6B6961] hover:text-[#1A1A1A]'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Fine-Line Ink</span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] font-semibold ${
          isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
        }`}>
          <button
            onClick={() => handleNavClick('catalog')}
            className={`hover:text-current transition-colors py-2 relative ${
              activeView === 'catalog' 
                ? isDark ? 'text-[#F7F5F0] font-bold' : 'text-[#1A1A1A] font-bold' 
                : ''
            }`}
          >
            <span>Services & Rates</span>
            {activeView === 'catalog' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-[#F7F5F0]' : 'bg-[#1A1A1A]'}`} />
            )}
          </button>
          <button
            onClick={() => handleNavClick('artists')}
            className={`hover:text-current transition-colors py-2 relative ${
              activeView === 'artists' 
                ? isDark ? 'text-[#F7F5F0] font-bold' : 'text-[#1A1A1A] font-bold' 
                : ''
            }`}
          >
            <span>Artists</span>
            {activeView === 'artists' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-[#F7F5F0]' : 'bg-[#1A1A1A]'}`} />
            )}
          </button>
          <button
            onClick={() => handleNavClick('prep')}
            className={`hover:text-current transition-colors py-2 relative ${
              activeView === 'prep' 
                ? isDark ? 'text-[#F7F5F0] font-bold' : 'text-[#1A1A1A] font-bold' 
                : ''
            }`}
          >
            <span>Care & Prep</span>
            {activeView === 'prep' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-[#F7F5F0]' : 'bg-[#1A1A1A]'}`} />
            )}
          </button>
          <button
            onClick={() => handleNavClick('my-bookings')}
            className={`flex items-center gap-1.5 hover:text-current transition-colors py-2 relative ${
              activeView === 'my-bookings' 
                ? isDark ? 'text-[#F7F5F0] font-bold' : 'text-[#1A1A1A] font-bold' 
                : ''
            }`}
          >
            <span>My Pass</span>
            {confirmedBookingsCount > 0 && (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 ${
                isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
              }`}>
                {confirmedBookingsCount}
              </span>
            )}
            {activeView === 'my-bookings' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-[#F7F5F0]' : 'bg-[#1A1A1A]'}`} />
            )}
          </button>
          <button
            onClick={() => {
              if (isAdminAuthenticated) {
                handleNavClick('admin');
              } else {
                onRequestAdminAuth();
              }
            }}
            className={`hover:text-current transition-colors py-2 border-l pl-4 flex items-center gap-1.5 ${
              isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
            } ${activeView === 'admin' ? isDark ? 'text-[#F7F5F0] font-bold' : 'text-[#1A1A1A] font-bold' : ''}`}
          >
            <span>Studio Portal</span>
            {isAdminAuthenticated ? (
              <Unlock className="w-3 h-3 text-emerald-500" title="Admin Authenticated" />
            ) : (
              <Lock className="w-3 h-3 text-[#C49A8D]" title="Protected Admin Area" />
            )}
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3 py-2.5 border text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
              isDark
                ? 'bg-[#1E1E1E] border-[#333333] text-[#F7F5F0] hover:bg-[#282828]'
                : 'bg-[#EBE9E1] border-[#D1CEC3] text-[#1A1A1A] hover:bg-[#D1CEC3]'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#F7F5F0]" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* AI Curator Button */}
          <button
            onClick={onOpenAiCurator}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2.5 border text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
              isDark
                ? 'bg-[#181818] hover:bg-[#F7F5F0] text-[#F7F5F0] hover:text-[#101010] border-[#333333]'
                : 'bg-[#FAF9F6] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#FAF9F6] border-[#1A1A1A]'
            }`}
            title="AI Lash & Tattoo Style Consultation"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Curator</span>
          </button>

          {/* Book Experience CTA */}
          <button
            onClick={onOpenBooking}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-md active:scale-95 ${
              isDark
                ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]'
                : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 border text-xs font-bold transition-colors ${
              isDark 
                ? 'border-[#333333] bg-[#181818] text-[#F7F5F0]' 
                : 'border-[#1A1A1A] bg-[#FAF9F6] text-[#1A1A1A]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b p-6 space-y-6 animate-fadeIn transition-colors ${
          isDark ? 'bg-[#101010] border-[#2A2A2A] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#E5E2D9] text-[#1A1A1A]'
        }`}>
          {/* Category Toggle for Mobile */}
          <div className="space-y-2">
            <span className={`text-[9px] uppercase tracking-[0.25em] font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
              Select Discipline
            </span>
            <div className={`grid grid-cols-2 gap-2 p-1 border ${isDark ? 'border-[#2A2A2A] bg-[#181818]' : 'border-[#E5E2D9] bg-[#EBE9E1]'}`}>
              <button
                onClick={() => handleNavClick('catalog', 'lashes')}
                className={`flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold ${
                  activeCategory === 'lashes' && activeView === 'catalog'
                    ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    : isDark ? 'text-[#888888]' : 'text-[#6B6961]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Eye Lashes</span>
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'tattoos')}
                className={`flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold ${
                  activeCategory === 'tattoos' && activeView === 'catalog'
                    ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    : isDark ? 'text-[#888888]' : 'text-[#6B6961]'
                }`}
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Fine-Line Ink</span>
              </button>
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="space-y-2 text-xs font-bold uppercase tracking-[0.2em]">
            <button
              onClick={() => handleNavClick('catalog')}
              className={`w-full flex items-center justify-between py-3 border-b ${
                isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
              }`}
            >
              <span>Services & Catalog</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button
              onClick={() => handleNavClick('artists')}
              className={`w-full flex items-center justify-between py-3 border-b ${
                isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
              }`}
            >
              <span>Master Artists</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button
              onClick={() => handleNavClick('prep')}
              className={`w-full flex items-center justify-between py-3 border-b ${
                isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
              }`}
            >
              <span>Care & Prep Protocol</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button
              onClick={() => handleNavClick('my-bookings')}
              className={`w-full flex items-center justify-between py-3 border-b ${
                isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>My Appointment Pass</span>
                {confirmedBookingsCount > 0 && (
                  <span className={`text-[9px] font-bold px-2 py-0.5 ${
                    isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                  }`}>
                    {confirmedBookingsCount}
                  </span>
                )}
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdminAuthenticated) {
                  setActiveView('admin');
                } else {
                  onRequestAdminAuth();
                }
              }}
              className={`w-full flex items-center justify-between py-3 border-b ${
                isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Studio Portal (Admin)</span>
                {isAdminAuthenticated ? (
                  <span className="text-[9px] uppercase px-1.5 py-0.5 bg-emerald-500 text-white font-bold">Admin</span>
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[#C49A8D]" />
                )}
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </div>

          {/* AI Curator Action for Mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAiCurator();
            }}
            className={`w-full py-3.5 border text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 ${
              isDark ? 'bg-[#181818] border-[#333333] text-[#F7F5F0]' : 'bg-[#EBE9E1] border-[#D1CEC3] text-[#1A1A1A]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C49A8D]" />
            <span>Launch AI Style Curator</span>
          </button>
        </div>
      )}
    </header>
  );
};

