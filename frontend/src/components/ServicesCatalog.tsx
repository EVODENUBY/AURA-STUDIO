import React, { useState } from 'react';
import { Service, CategoryType } from '../types';
import { Clock, DollarSign, Sparkles, CheckCircle2, ChevronRight, Eye, Feather, Info, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ServicesCatalogProps {
  services: Service[];
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  onSelectServiceForBooking: (service: Service) => void;
  onOpenAiCurator: () => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({
  services,
  activeCategory,
  setActiveCategory,
  onSelectServiceForBooking,
  onOpenAiCurator
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [detailModalService, setDetailModalService] = useState<Service | null>(null);

  const categoryServices = services.filter(s => s.category === activeCategory);
  
  // Collect unique tags
  const allTags = ['All', ...Array.from(new Set(categoryServices.flatMap(s => s.tags)))];

  const filteredServices = categoryServices.filter(s => {
    if (selectedTag === 'All') return true;
    return s.tags.includes(selectedTag);
  });

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010] text-[#F7F5F0] border-[#262626]' 
        : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#E5E2D9]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className={`text-[10px] uppercase tracking-[0.3em] font-semibold block mb-2 ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              Bespoke Atelier Offerings
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
              isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
            }`}>
              {activeCategory === 'lashes' ? 'Eye Lash & Lift Artistry' : 'Fine-Line Tattoo & Flash'}
            </h2>
            <p className={`text-xs max-w-xl mt-2 font-sans font-normal leading-relaxed ${
              isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
            }`}>
              Each experience is tailored specifically to your anatomy, skin tone, and aesthetic vision. Includes custom placement stencil or lash mapping.
            </p>
          </div>

          {/* AI Advisor Card Callout */}
          <div className={`p-4 border flex items-center justify-between gap-4 max-w-md ${
            isDark 
              ? 'bg-[#181818] border-[#333333]' 
              : 'bg-[#EBE9E1] border-[#D1CEC3]'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 flex items-center justify-center ${
                isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
              }`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-xs font-semibold block ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                  Unsure what fits your eye shape or skin?
                </span>
                <span className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-[#888888]' : 'text-[#6B6961]'}`}>
                  Get AI custom mapping recommendation
                </span>
              </div>
            </div>
            <button
              onClick={onOpenAiCurator}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap transition-colors ${
                isDark 
                  ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]' 
                  : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
              }`}
            >
              Consult AI
            </button>
          </div>
        </div>

        {/* Filter Tags Bar */}
        <div className={`flex items-center justify-between gap-4 border-b pb-4 overflow-x-auto scrollbar-none ${
          isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
        }`}>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className={`w-4 h-4 mr-2 shrink-0 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`} />
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-200 font-semibold ${
                  selectedTag === tag
                    ? isDark 
                      ? 'bg-[#F7F5F0] text-[#101010]' 
                      : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    : isDark 
                      ? 'bg-[#181818] text-[#A3A3A3] hover:text-[#F7F5F0] border border-[#333333]' 
                      : 'bg-[#FAF9F6] text-[#6B6961] hover:text-[#1A1A1A] border border-[#D1CEC3]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className={`text-[10px] uppercase tracking-[0.2em] hidden sm:block shrink-0 ${
            isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
          }`}>
            Showing <span className={`font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{filteredServices.length}</span> services
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`group border transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md ${
                isDark
                  ? 'bg-[#181818] border-[#262626] hover:border-[#F7F5F0]'
                  : 'bg-[#FAF9F6] border-[#E5E2D9] hover:border-[#1A1A1A]'
              }`}
            >
              <div>
                {/* Image & Badge */}
                <div className={`relative h-64 overflow-hidden border-b ${
                  isDark ? 'border-[#262626] bg-[#141414]' : 'border-[#E5E2D9] bg-[#EBE9E1]'
                }`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 contrast-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80 ${
                    isDark ? 'from-[#181818]' : 'from-[#FAF9F6]'
                  }`} />

                  {service.popular && (
                    <div className={`absolute top-4 right-4 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] ${
                      isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    }`}>
                      Client Favorite
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className={`absolute top-4 left-4 px-3 py-1 text-[9px] uppercase tracking-[0.2em] border flex items-center gap-1.5 font-bold ${
                    isDark
                      ? 'bg-[#101010]/90 text-[#F7F5F0] border-[#F7F5F0]'
                      : 'bg-[#FAF9F6]/90 text-[#1A1A1A] border-[#1A1A1A]'
                  }`}>
                    {service.category === 'lashes' ? <Eye className="w-3 h-3" /> : <Feather className="w-3 h-3" />}
                    <span>{service.category === 'lashes' ? 'Lash Studio' : 'Ink Studio'}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className={`text-[10px] font-mono tracking-wider block font-bold uppercase ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>
                      ${service.price} USD <span className={`font-normal text-[9px] ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>($ {service.depositAmount} deposit)</span>
                    </span>
                    <h3 className={`font-serif text-2xl font-normal mt-0.5 ${
                      isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                    }`}>
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4">
                  <p className={`text-xs font-normal leading-relaxed line-clamp-2 ${
                    isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
                  }`}>
                    {service.subtitle}
                  </p>

                  {/* Time & Duration Pill */}
                  <div className={`flex items-center gap-4 text-[10px] uppercase tracking-wider pt-2 border-t ${
                    isDark ? 'border-[#262626] text-[#888888]' : 'border-[#E5E2D9] text-[#8C8A82]'
                  }`}>
                    <div className={`flex items-center gap-1.5 font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.durationMinutes} mins</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className={`w-3.5 h-3.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                      <span>Deposit: ${service.depositAmount}</span>
                    </div>
                  </div>

                  {/* Key Features List */}
                  <ul className={`space-y-1.5 pt-1 text-xs ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                        <span className={`font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => onSelectServiceForBooking(service)}
                  className={`w-full py-3 font-bold text-[10px] uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${
                    isDark
                      ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]'
                      : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
                  }`}
                >
                  <span>Book This Experience</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDetailModalService(service)}
                  className={`w-full py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 ${
                    isDark
                      ? 'bg-[#222222] hover:bg-[#2D2D2D] text-[#F7F5F0]'
                      : 'bg-[#EBE9E1] hover:bg-[#D1CEC3] text-[#1A1A1A]'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Details & Specs</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {detailModalService && (
        <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          <div className={`border max-w-2xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-2xl relative my-auto transition-colors ${
            isDark 
              ? 'bg-[#181818] border-[#333333] text-[#F7F5F0]' 
              : 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A]'
          }`}>
            <button
              onClick={() => setDetailModalService(null)}
              className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors z-10 ${
                isDark 
                  ? 'bg-[#262626] hover:bg-[#F7F5F0] text-[#F7F5F0] hover:text-[#101010]' 
                  : 'bg-[#EBE9E1] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#FAF9F6]'
              }`}
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold ${
                isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
              }`}>
                {detailModalService.category === 'lashes' ? 'Eye Lash Studio' : 'Fine-Line Ink'}
              </span>
              <span className={`text-xs font-semibold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                • {detailModalService.durationMinutes} Minutes
              </span>
            </div>

            <div>
              <h3 className={`font-serif text-3xl font-normal ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                {detailModalService.title}
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                {detailModalService.subtitle}
              </p>
            </div>

            <img
              src={detailModalService.image}
              alt={detailModalService.title}
              referrerPolicy="no-referrer"
              className={`w-full h-64 object-cover border ${isDark ? 'border-[#333333]' : 'border-[#E5E2D9]'}`}
            />

            <div className={`space-y-4 text-xs leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
              <h4 className={`font-serif text-lg ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>Description</h4>
              <p>{detailModalService.description}</p>

              {detailModalService.defaultLashSpecs && (
                <div className={`p-4 border space-y-2 ${
                  isDark ? 'bg-[#222222] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
                }`}>
                  <span className={`font-bold block uppercase tracking-[0.2em] text-[10px] ${
                    isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                  }`}>Default Lash Specifications</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Curl: <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{detailModalService.defaultLashSpecs.curl}</span></div>
                    <div>Length: <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{detailModalService.defaultLashSpecs.lengthRange}</span></div>
                    <div>Density: <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{detailModalService.defaultLashSpecs.density}</span></div>
                    <div>Mapping: <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{detailModalService.defaultLashSpecs.mappingStyle}</span></div>
                  </div>
                </div>
              )}

              {detailModalService.defaultTattooSpecs && (
                <div className={`p-4 border space-y-2 ${
                  isDark ? 'bg-[#222222] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
                }`}>
                  <span className={`font-bold block uppercase tracking-[0.2em] text-[10px] ${
                    isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                  }`}>Default Tattoo Specifications</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Placement: <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{detailModalService.defaultTattooSpecs.placement}</span></div>
                    <div>Approx Size: <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{detailModalService.defaultTattooSpecs.approxSizeInches}</span></div>
                    <div>Style: <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{detailModalService.defaultTattooSpecs.styleCategory}</span></div>
                    <div>Ink Tone: <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{detailModalService.defaultTattooSpecs.inkColor}</span></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className={`p-4 border ${isDark ? 'bg-[#222222] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'}`}>
                  <span className={`font-bold block mb-2 uppercase tracking-wider text-[10px] ${
                    isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                  }`}>Prep Guidelines</span>
                  <ul className="list-disc list-inside space-y-1">
                    {detailModalService.prepNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>

                <div className={`p-4 border ${isDark ? 'bg-[#222222] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'}`}>
                  <span className={`font-bold block mb-2 uppercase tracking-wider text-[10px] ${
                    isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                  }`}>Aftercare Highlights</span>
                  <ul className="list-disc list-inside space-y-1">
                    {detailModalService.aftercareNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${
              isDark ? 'border-[#333333]' : 'border-[#E5E2D9]'
            }`}>
              <div>
                <span className={`text-[10px] uppercase tracking-wider block ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>Total Investment</span>
                <span className={`font-mono text-xl font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                  ${detailModalService.price} USD
                </span>
                <span className={`text-[10px] block ${isDark ? 'text-[#888888]' : 'text-[#6B6961]'}`}>
                  (${detailModalService.depositAmount} deposit required today)
                </span>
              </div>

              <button
                onClick={() => {
                  setDetailModalService(null);
                  onSelectServiceForBooking(detailModalService);
                }}
                className={`px-6 py-3 font-bold text-[10px] uppercase tracking-[0.25em] transition-colors ${
                  isDark 
                    ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]' 
                    : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
                }`}
              >
                Proceed To Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

