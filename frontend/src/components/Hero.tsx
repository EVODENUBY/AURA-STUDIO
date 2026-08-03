import React from 'react';
import { CategoryType } from '../types';
import { Sparkles, Calendar, ShieldCheck, ArrowRight, Eye, Feather, Award, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  onOpenAiCurator: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeCategory,
  setActiveCategory,
  onOpenAiCurator,
  onOpenBooking
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative pt-4 pb-12 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010] text-[#F7F5F0] border-[#262626]' 
        : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#E5E2D9]'
    }`}>
      {/* Continuous Graphic Scroll / Marquee Bar */}
      <div className={`mb-6 py-2 border-y overflow-hidden transition-colors ${
        isDark ? 'border-[#262626] bg-[#161616]' : 'border-[#E5E2D9] bg-[#F4F3EE]'
      }`}>
        <div className="whitespace-nowrap animate-marquee flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-[#C49A8D]">
          <span>✦ BESPOKE LASH MAPPING IN KIYOVU</span>
          <span>✦ SINGLE NEEDLE FINE-LINE TATTOOS</span>
          <span>✦ HYPOALLERGENIC CASHMERE FIBERS</span>
          <span>✦ AUTOCLAVE HOSPITAL-GRADE STERILE</span>
          <span>✦ MASTER ARTISTS INES KEZA • GAEL MUGISHA • SONIA UWASE</span>
          <span>✦ BESPOKE LASH MAPPING IN KIYOVU</span>
          <span>✦ SINGLE NEEDLE FINE-LINE TATTOOS</span>
          <span>✦ HYPOALLERGENIC CASHMERE FIBERS</span>
          <span>✦ AUTOCLAVE HOSPITAL-GRADE STERILE</span>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border divide-y lg:divide-y-0 lg:divide-x transition-colors ${
        isDark ? 'border-[#262626] divide-[#262626]' : 'border-[#E5E2D9] divide-[#E5E2D9]'
      }`}>
        
        {/* Column 1: Studio Identity (Geometric Balance 3/4 Framing) */}
        <div 
          className={`lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between space-y-8 ${
            isDark ? 'bg-[#101010]' : 'bg-[#FAF9F6]'
          }`}
        >
          <div className="space-y-6">
            <div className={`w-full aspect-[3/4] max-h-72 relative mb-6 flex items-center justify-center overflow-hidden border ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
              <img
                src="/src/assets/images/studio_hero_banner_1785252607965.jpg"
                alt="AURA Studio Interior Kigali"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-90 contrast-110 hover:scale-105 transition-transform duration-700"
              />
              <div className={`absolute inset-0 border-[16px] pointer-events-none ${
                isDark ? 'border-[#101010]' : 'border-[#FAF9F6]'
              }`} />
              <span className={`absolute text-[8px] uppercase tracking-[0.4em] transform -rotate-90 font-bold px-2 py-0.5 ${
                isDark ? 'text-[#F7F5F0] bg-[#101010]/90' : 'text-[#1A1A1A] bg-[#FAF9F6]/90'
              }`}>
                Kiyovu Fine Art Atelier
              </span>
            </div>

            <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              <Award className={`w-3.5 h-3.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
              <span>Est. 2018 • Kiyovu, Kigali Atelier</span>
            </div>

            <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] ${
              isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
            }`}>
              Artistry in <br />
              <span className="italic font-light">Detail.</span>
            </h1>

            <p className={`text-xs leading-relaxed font-sans max-w-sm ${
              isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
            }`}>
              Bespoke lash mapping and fine-line single-needle illustrations tailored precisely to your unique facial architecture in Kigali, Rwanda.
            </p>
          </div>

          <div className={`pt-4 border-t flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-bold ${
            isDark ? 'border-[#262626] text-[#888888]' : 'border-[#E5E2D9] text-[#8C8A82]'
          }`}>
            <span>Single Needle 1RL</span>
            <span className={isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}>Cashmere Silk</span>
          </div>
        </div>

        {/* Column 2: Selection Matrix & Interactive Toggle */}
        <div 
          className={`lg:col-span-5 flex flex-col justify-between ${
            isDark ? 'bg-[#101010]' : 'bg-[#FAF9F6]'
          }`}
        >
          {/* Matrix Header */}
          <div className={`p-6 border-b text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-between ${
            isDark ? 'border-[#262626] text-[#888888]' : 'border-[#E5E2D9] text-[#8C8A82]'
          }`}>
            <span>01 / Select Discipline</span>
            <button
              onClick={onOpenAiCurator}
              className={`underline flex items-center gap-1 hover:opacity-70 transition-opacity ${
                isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#C49A8D]" />
              <span>AI Style Curator</span>
            </button>
          </div>

          {/* Interactive Geometric Cards Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x flex-1 ${
            isDark ? 'divide-[#262626]' : 'divide-[#E5E2D9]'
          }`}>
            {/* Eye Lashes Card */}
            <div
              onClick={() => setActiveCategory('lashes')}
              className={`p-8 sm:p-10 flex flex-col justify-center items-center group cursor-pointer transition-colors duration-300 ${
                activeCategory === 'lashes'
                  ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                  : isDark ? 'bg-[#101010] text-[#F7F5F0] hover:bg-[#181818]' : 'bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#F2F1EC]'
              }`}
            >
              <div className={`w-28 h-28 rounded-full border flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${
                activeCategory === 'lashes' 
                  ? isDark ? 'border-[#101010]/30' : 'border-[#FAF9F6]/30' 
                  : isDark ? 'border-[#333333]' : 'border-[#D1CEC3]'
              }`}>
                <div className={`w-20 h-20 rounded-full border flex items-center justify-center ${
                  activeCategory === 'lashes' 
                    ? isDark ? 'border-[#101010]' : 'border-[#FAF9F6]' 
                    : isDark ? 'border-[#F7F5F0]' : 'border-[#1A1A1A]'
                }`}>
                  <Eye className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-1.5 text-center">Eye Lashes</h2>
              <p className={`text-[10px] tracking-wider text-center ${
                activeCategory === 'lashes' 
                  ? isDark ? 'text-[#101010]/80' : 'text-[#FAF9F6]/80' 
                  : isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
              }`}>
                Cashmere • Keratin Lifts
              </p>
            </div>

            {/* Tattooing Card */}
            <div
              onClick={() => setActiveCategory('tattoos')}
              className={`p-8 sm:p-10 flex flex-col justify-center items-center group cursor-pointer transition-colors duration-300 ${
                activeCategory === 'tattoos'
                  ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                  : isDark ? 'bg-[#101010] text-[#F7F5F0] hover:bg-[#181818]' : 'bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#F2F1EC]'
              }`}
            >
              <div className={`w-28 h-28 rounded-full border flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${
                activeCategory === 'tattoos' 
                  ? isDark ? 'border-[#101010]/30' : 'border-[#FAF9F6]/30' 
                  : isDark ? 'border-[#333333]' : 'border-[#D1CEC3]'
              }`}>
                <div className={`w-20 h-20 rounded-full border flex items-center justify-center ${
                  activeCategory === 'tattoos' 
                    ? isDark ? 'border-[#101010]' : 'border-[#FAF9F6]' 
                    : isDark ? 'border-[#F7F5F0]' : 'border-[#1A1A1A]'
                }`}>
                  <Feather className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-1.5 text-center">Tattooing</h2>
              <p className={`text-[10px] tracking-wider text-center ${
                activeCategory === 'tattoos' 
                  ? isDark ? 'text-[#101010]/80' : 'text-[#FAF9F6]/80' 
                  : isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
              }`}>
                Fine-Line • Single Needle
              </p>
            </div>
          </div>

          {/* Service Details Matrix */}
          <div className={`p-6 sm:p-8 border-t ${
            isDark ? 'border-[#262626] bg-[#161616]' : 'border-[#E5E2D9] bg-[#F2F1EC]'
          }`}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className={`border-r pr-2 ${isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'}`}>
                <span className={`block text-[9px] uppercase tracking-[0.25em] mb-1 font-semibold ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>Duration</span>
                <span className={`text-xs font-serif italic ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>60 – 180 Min</span>
              </div>
              <div className={`border-r pr-2 ${isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'}`}>
                <span className={`block text-[9px] uppercase tracking-[0.25em] mb-1 font-semibold ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>Consultation</span>
                <span className={`text-xs font-serif italic ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>Included</span>
              </div>
              <div>
                <span className={`block text-[9px] uppercase tracking-[0.25em] mb-1 font-semibold ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>Sterility</span>
                <span className={`text-xs font-serif italic ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>Autoclave 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Atelier Guarantee & Direct Booking Callout */}
        <div 
          className={`lg:col-span-3 p-8 flex flex-col justify-between space-y-8 ${
            isDark ? 'bg-[#101010]' : 'bg-[#FAF9F6]'
          }`}
        >
          <div>
            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold block mb-6 ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              02 / Reservation
            </span>

            <div className="space-y-4">
              <div className={`p-4 border rounded-none space-y-2 ${
                isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#F2F1EC] border-[#E5E2D9]'
              }`}>
                <div className={`flex items-center gap-2 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                  <ShieldCheck className="w-4 h-4 text-[#C49A8D]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Guaranteed Slot</span>
                </div>
                <p className={`text-[11px] leading-normal font-light ${
                  isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
                }`}>
                  All appointments include custom mapping & $50 USD studio deposit guarantee.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className={`flex justify-between py-1 border-b text-[11px] ${
                  isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
                }`}>
                  <span className={isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}>Rating</span>
                  <span className="font-serif italic font-bold">★ 4.98 / 5.0</span>
                </div>
                <div className={`flex justify-between py-1 border-b text-[11px] ${
                  isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
                }`}>
                  <span className={isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}>Verified Reviews</span>
                  <span className={`font-mono ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>500+ Clients</span>
                </div>
                <div className={`flex justify-between py-1 border-b text-[11px] ${
                  isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
                }`}>
                  <span className={isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}>Location</span>
                  <span className={isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}>Kiyovu Suite 400</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className={`w-full py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 ${
              isDark
                ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]'
                : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Confirm Booking</span>
          </button>
        </div>

      </div>
    </section>
  );
};

