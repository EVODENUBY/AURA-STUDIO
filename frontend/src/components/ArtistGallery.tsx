import React, { useState } from 'react';
import { Artist, Service, CategoryType } from '../types';
import { Star, ShieldCheck, Calendar, Eye, Feather, Award, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { LiveAvailabilityWidget } from './LiveAvailabilityWidget';

interface ArtistGalleryProps {
  artists: Artist[];
  services: Service[];
  activeCategory: CategoryType;
  onBookWithArtist: (artist: Artist, preferredService?: Service) => void;
}

export const ArtistGallery: React.FC<ArtistGalleryProps> = ({
  artists,
  services,
  activeCategory,
  onBookWithArtist
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeArtistId, setActiveArtistId] = useState<string>(artists[0]?.id || '');

  const activeArtist = artists.find(a => a.id === activeArtistId) || artists[0];

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010] text-[#F7F5F0] border-[#262626]' 
        : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#E5E2D9]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className={`text-[10px] uppercase tracking-[0.3em] font-semibold block ${
            isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
          }`}>
            Resident Master Artisans
          </span>
          <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
            isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
          }`}>
            Artistic Precision & Surgical Sterility
          </h2>
          <p className={`text-xs font-normal leading-relaxed ${
            isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
          }`}>
            Our resident lash sculptors and fine-line tattooists bring international training from Tokyo, Milan, and Paris. Every session is executed in private, tranquil suites.
          </p>
        </div>

        {/* Live Studio Availability & Waitlist Widget */}
        <LiveAvailabilityWidget
          artists={artists}
          services={services}
          activeCategory={activeCategory}
          selectedArtistId={activeArtistId}
          onSelectArtist={setActiveArtistId}
          onBookSlot={(artist) => onBookWithArtist(artist)}
        />

        {/* Artist Selection Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {artists.map(artist => (
            <button
              key={artist.id}
              onClick={() => setActiveArtistId(artist.id)}
              className={`flex items-center gap-3 px-6 py-2.5 border text-[10px] uppercase tracking-[0.2em] transition-all duration-300 font-semibold ${
                activeArtistId === artist.id
                  ? isDark 
                    ? 'bg-[#F7F5F0] border-[#F7F5F0] text-[#101010] shadow-sm' 
                    : 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FAF9F6] shadow-sm'
                  : isDark 
                    ? 'bg-[#181818] border-[#333333] text-[#A3A3A3] hover:text-[#F7F5F0]' 
                    : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#6B6961] hover:text-[#1A1A1A]'
              }`}
            >
              <img
                src={artist.avatar}
                alt={artist.name}
                referrerPolicy="no-referrer"
                className={`w-6 h-6 rounded-full object-cover border ${
                  isDark ? 'border-[#333333]' : 'border-[#D1CEC3]'
                }`}
              />
              <span>{artist.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Artist Spotlight Card */}
        {activeArtist && (
          <div className={`border p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm ${
            isDark 
              ? 'bg-[#181818] border-[#2A2A2A]' 
              : 'bg-[#FAF9F6] border-[#1A1A1A]'
          }`}>
            
            {/* Left: Bio & Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={activeArtist.avatar}
                  alt={activeArtist.name}
                  referrerPolicy="no-referrer"
                  className={`w-20 h-20 rounded-none object-cover border ${
                    isDark ? 'border-[#F7F5F0]' : 'border-[#1A1A1A]'
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-serif text-2xl font-normal ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                      {activeArtist.name}
                    </h3>
                    <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} title="Certified Master Specialist" />
                  </div>
                  <p className={`text-[10px] uppercase tracking-[0.2em] font-semibold mt-0.5 ${
                    isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                  }`}>
                    {activeArtist.title}
                  </p>
                  
                  <div className={`flex items-center gap-2 mt-2 text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                    <div className={`flex items-center gap-1 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                      <Star className={`w-3.5 h-3.5 fill-current`} />
                      <span className="font-bold">{activeArtist.rating}</span>
                    </div>
                    <span>•</span>
                    <span className="text-[10px] uppercase tracking-wider">{activeArtist.reviewCount} Verified Reviews</span>
                  </div>
                </div>
              </div>

              <p className={`text-xs font-normal leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                {activeArtist.bio}
              </p>

              {/* Specialties */}
              <div>
                <span className={`text-[10px] uppercase tracking-[0.25em] block font-bold mb-2 ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>
                  Specialist Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeArtist.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 border text-[10px] uppercase tracking-wider font-semibold ${
                        isDark 
                          ? 'bg-[#222222] border-[#333333] text-[#F7F5F0]' 
                          : 'bg-[#EBE9E1] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className={`p-4 border flex items-center justify-between text-xs ${
                isDark 
                  ? 'bg-[#222222] border-[#333333]' 
                  : 'bg-[#EBE9E1] border-[#D1CEC3]'
              }`}>
                <div>
                  <span className={`block text-[9px] uppercase tracking-widest font-bold ${
                    isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                  }`}>Available Schedule</span>
                  <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                    {activeArtist.workingDays.join(' • ')}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`block text-[9px] uppercase tracking-widest font-bold ${
                    isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                  }`}>Daily Slots</span>
                  <span className={`font-mono font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                    {activeArtist.availableHours.length} Slots Available
                  </span>
                </div>
              </div>

              <button
                onClick={() => onBookWithArtist(activeArtist)}
                className={`w-full py-3.5 font-bold text-[10px] uppercase tracking-[0.25em] transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 ${
                  isDark 
                    ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]' 
                    : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Direct with {activeArtist.name}</span>
              </button>
            </div>

            {/* Right: Portfolio Gallery */}
            <div className="lg:col-span-6 space-y-3">
              <span className={`text-[10px] uppercase tracking-[0.25em] block font-bold ${
                isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
              }`}>
                Recent Atelier Works by {activeArtist.name}
              </span>

              <div className="grid grid-cols-2 gap-3">
                {activeArtist.portfolioImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className={`relative overflow-hidden h-44 group border ${
                      isDark ? 'border-[#2A2A2A] bg-[#222222]' : 'border-[#E5E2D9] bg-[#EBE9E1]'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Portfolio ${idx}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 contrast-105"
                    />
                    <div className="absolute inset-0 bg-[#000000]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[9px] text-[#FAF9F6] uppercase tracking-[0.2em] font-bold">
                        Custom Client Work
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

