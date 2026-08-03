import React, { useState } from 'react';
import { Eye, Feather, CheckCircle2, ShieldAlert, Sparkles, HeartHandshake } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const PrepAndAftercare: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'lashes' | 'tattoos'>('lashes');

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010] text-[#F7F5F0] border-[#262626]' 
        : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#E5E2D9]'
    }`}>
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className={`text-[10px] uppercase tracking-[0.3em] font-semibold block ${
            isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
          }`}>
            Atelier Standards & Care
          </span>
          <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
            isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
          }`}>
            Pre-Appointment & Aftercare Protocol
          </h2>
          <p className={`text-xs max-w-xl mx-auto font-normal leading-relaxed ${
            isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
          }`}>
            Following these protocols guarantees optimum lash extension retention and pristine fine-line tattoo healing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={`flex items-center justify-center gap-3 p-1.5 rounded-full max-w-md mx-auto border ${
          isDark 
            ? 'bg-[#181818] border-[#333333]' 
            : 'bg-[#EBE9E1] border-[#D1CEC3]'
        }`}>
          <button
            onClick={() => setActiveTab('lashes')}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all w-1/2 ${
              activeTab === 'lashes'
                ? isDark 
                  ? 'bg-[#F7F5F0] text-[#101010] shadow-sm' 
                  : 'bg-[#1A1A1A] text-[#FAF9F6] shadow-sm'
                : isDark 
                  ? 'text-[#A3A3A3] hover:text-[#F7F5F0]' 
                  : 'text-[#6B6961] hover:text-[#1A1A1A]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lash Care</span>
          </button>

          <button
            onClick={() => setActiveTab('tattoos')}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all w-1/2 ${
              activeTab === 'tattoos'
                ? isDark 
                  ? 'bg-[#F7F5F0] text-[#101010] shadow-sm' 
                  : 'bg-[#1A1A1A] text-[#FAF9F6] shadow-sm'
                : isDark 
                  ? 'text-[#A3A3A3] hover:text-[#F7F5F0]' 
                  : 'text-[#6B6961] hover:text-[#1A1A1A]'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Tattoo Care</span>
          </button>
        </div>

        {/* Content Cards */}
        {activeTab === 'lashes' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pre-Appointment Prep */}
            <div className={`p-8 border space-y-6 ${
              isDark 
                ? 'bg-[#181818] border-[#2A2A2A]' 
                : 'bg-[#FAF9F6] border-[#1A1A1A]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className={`font-serif text-2xl ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                  Pre-Lash Preparation
                </h3>
              </div>

              <ul className={`space-y-4 text-xs font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Arrive Mascara-Free</strong>
                    Ensure eyes and natural lashes are completely clean of mascara, eyeliner, and eye cream 24h prior.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Avoid Caffeine 2 Hours Prior</strong>
                    Caffeine can cause subtle eye twitching or fluttering, which affects precise lash fan attachment.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Remove Contact Lenses</strong>
                    Bring lens storage case or wear glasses to your session for eye comfort.
                  </div>
                </li>
              </ul>
            </div>

            {/* Aftercare */}
            <div className={`p-8 border space-y-6 ${
              isDark 
                ? 'bg-[#181818] border-[#2A2A2A]' 
                : 'bg-[#FAF9F6] border-[#1A1A1A]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                }`}>
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className={`font-serif text-2xl ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                  Lash Extension Aftercare
                </h3>
              </div>

              <ul className={`space-y-4 text-xs font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Keep Dry for First 24 Hours</strong>
                    Allow adhesive bond to complete curing. Avoid steam rooms, saunas, and intense workouts.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Brush Daily with Provided Spoolie</strong>
                    Gently comb extensions every morning from mid-length to tip to keep fans fluffy and aligned.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Use Oil-Free Lash Cleanser</strong>
                    Wash lashes 3 times per week with provided foaming lash shampoo to prevent oil build-up.
                  </div>
                </li>
              </ul>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pre Tattoo */}
            <div className={`p-8 border space-y-6 ${
              isDark 
                ? 'bg-[#181818] border-[#2A2A2A]' 
                : 'bg-[#FAF9F6] border-[#1A1A1A]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className={`font-serif text-2xl ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                  Pre-Tattoo Preparation
                </h3>
              </div>

              <ul className={`space-y-4 text-xs font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Hydrate & Eat a Meal</strong>
                    Drink plenty of water in the 24 hours prior and eat a solid meal 1 hour before your session.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Avoid Alcohol & Blood Thinners</strong>
                    Do not consume alcohol, aspirin, or ibuprofen 24 hours prior to prevent excess bleeding.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Wear Loose Clothing</strong>
                    Choose comfortable, loose clothing that allows easy access to the tattoo placement area.
                  </div>
                </li>
              </ul>
            </div>

            {/* Tattoo Aftercare */}
            <div className={`p-8 border space-y-6 ${
              isDark 
                ? 'bg-[#181818] border-[#2A2A2A]' 
                : 'bg-[#FAF9F6] border-[#1A1A1A]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                }`}>
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className={`font-serif text-2xl ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                  Fine-Line Tattoo Healing
                </h3>
              </div>

              <ul className={`space-y-4 text-xs font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Leave SecondSkin Wrap for 3-5 Days</strong>
                    Our medical Saniderm bandage protects single-needle line work from bacteria and locks in moisture.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>Gentle Fragrance-Free Washing</strong>
                    After removing wrap, wash gently with warm water and fragrance-free antibacterial soap. Pat dry gently.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                  <div>
                    <strong className={`block mb-0.5 uppercase tracking-wider text-[10px] ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>No Swimming or Submersion</strong>
                    Avoid baths, pools, saunas, and direct sun exposure for 14 days post-tattoo.
                  </div>
                </li>
              </ul>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

