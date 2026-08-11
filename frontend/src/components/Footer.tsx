import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Instagram, Facebook } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { BrandIconLogo } from './Navbar';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [kigaliTime, setKigaliTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Kigali',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setKigaliTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={`border-t pt-16 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010] text-[#FAF9F6] border-[#262626]' 
        : 'bg-[#1A1A1A] text-[#FAF9F6] border-[#1A1A1A]'
    }`}>
      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b ${
        isDark ? 'border-[#262626]' : 'border-[#333333]'
      }`}>
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <BrandIconLogo isDark={true} className="w-10 h-10" />
            <div>
              <span className="font-serif text-xl tracking-[0.25em] text-[#FAF9F6] block leading-none font-normal">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#D1CEC3] font-sans block mt-1">
                Lash & Ink Atelier • Kigali
              </span>
            </div>
          </div>

          <p className="text-xs font-normal text-[#D1CEC3] max-w-sm leading-relaxed">
            Kigali's premier high-fashion minimalist studio dedicated to precision cashmere lash extensions, keratin lifts, and sterile fine-line single-needle tattoos in Kiyovu.
          </p>

          {/* Local Kigali Time Badge */}
          <div className="pt-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs ${
              isDark ? 'border-[#333333] bg-[#181818]' : 'border-[#444444] bg-[#222222]'
            }`}>
              <Clock className="w-3.5 h-3.5 text-[#c49a8d]" />
              <span className="text-[10px] uppercase tracking-wider text-[#D1CEC3]">
                Kigali Local Time (CAT, UTC+2):
              </span>
              <span className="font-mono font-bold text-[#FAF9F6]">{kigaliTime || '00:00:00 AM'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#FAF9F6] pt-1">
            <ShieldCheck className="w-4 h-4 text-[#FAF9F6]" />
            <span className="font-semibold text-[10px] uppercase tracking-wider">Fully Licensed & Hospital-Grade Sterile Autoclave</span>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D1CEC3] font-bold block">
            Atelier Hours
          </span>
          <ul className="text-xs space-y-2 text-[#D1CEC3]">
            <li className="flex justify-between">
              <span>Monday – Friday</span>
              <span className="text-[#FAF9F6] font-semibold">09:00 AM – 08:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="text-[#FAF9F6] font-semibold">09:00 AM – 06:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-[#FAF9F6] font-semibold">Private Sessions Only</span>
            </li>
          </ul>
        </div>

        {/* Location & Contact */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D1CEC3] font-bold block">
            Kigali Atelier Suites
          </span>
          <div className="text-xs space-y-2 text-[#D1CEC3]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FAF9F6] shrink-0 mt-0.5" />
              <span>Boulevard de l'Umuganda, Kiyovu, Suite 400, Kigali, Rwanda</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FAF9F6] shrink-0" />
              <span>+250 791 783 308 / +250 725 392 482</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FAF9F6] shrink-0" />
              <span>concierge@aurastudio.rw</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-wider text-[#8C8A82] gap-4">
        <span>© 2026 AURA Studio Atelier Kigali. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <span>Terms & Deposit Policy</span>
          <span>•</span>
          <span><a href="mailto:evodemuyisingize@gmail.com" className="text-[#FAF9F6] hover:underline">Contact Support</a></span>
        </div>
      </div>
    </footer>
  );
};

