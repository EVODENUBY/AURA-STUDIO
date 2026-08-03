import React, { useState, useEffect } from 'react';
import { CategoryType, Service, Testimonial, BeforeAfterItem } from '../types';
import { INITIAL_TESTIMONIALS, INITIAL_BEFORE_AFTER } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Sparkles,
  Sliders,
  Eye,
  Feather,
  ArrowRight,
  Play,
  Pause,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ClientVibeProps {
  services: Service[];
  activeCategory: CategoryType;
  onSelectServiceForBooking: (service: Service) => void;
  testimonials: Testimonial[];
  beforeAfterItems: BeforeAfterItem[];
}

export const ClientVibe: React.FC<ClientVibeProps> = ({
  services,
  activeCategory: initialCategory,
  onSelectServiceForBooking,
  testimonials,
  beforeAfterItems,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | CategoryType>('all');
  
  // Testimonial Carousel State
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Before & After Gallery State
  const [activeBeforeAfterIndex, setActiveBeforeAfterIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [showBeforeOnly, setShowBeforeOnly] = useState<boolean>(false);

  const safeTestimonials = testimonials && testimonials.length > 0 ? testimonials : INITIAL_TESTIMONIALS;
  const safeBeforeAfter = beforeAfterItems && beforeAfterItems.length > 0 ? beforeAfterItems : INITIAL_BEFORE_AFTER;

  const filteredTestimonials = safeTestimonials.filter(t => 
    selectedCategoryFilter === 'all' ? true : t.category === selectedCategoryFilter
  );

  // Filter Before & After items based on category
  const filteredBeforeAfter = safeBeforeAfter.filter(ba => 
    selectedCategoryFilter === 'all' ? true : ba.category === selectedCategoryFilter
  );

  // Reset index when filter changes
  useEffect(() => {
    setActiveTestimonialIndex(0);
    setActiveBeforeAfterIndex(0);
  }, [selectedCategoryFilter]);

  // Carousel Autoplay Timer
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveTestimonialIndex(prev => (prev + 1) % filteredTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredTestimonials.length]);

  const currentTestimonial = filteredTestimonials[activeTestimonialIndex] || safeTestimonials[0];
  const currentBeforeAfter = filteredBeforeAfter[activeBeforeAfterIndex] || safeBeforeAfter[0];

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex(prev => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex(prev => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleNextBeforeAfter = () => {
    setActiveBeforeAfterIndex(prev => (prev + 1) % filteredBeforeAfter.length);
    setSliderPosition(50);
  };

  const handlePrevBeforeAfter = () => {
    setActiveBeforeAfterIndex(prev => (prev - 1 + filteredBeforeAfter.length) % filteredBeforeAfter.length);
    setSliderPosition(50);
  };

  // Find matching service object to pass to booking
  const handleBookFromCard = (serviceId: string) => {
    const serviceObj = services.find(s => s.id === serviceId) || services[0];
    if (serviceObj) {
      onSelectServiceForBooking(serviceObj);
    }
  };

  return (
    <section id="client-vibe" className={`py-20 border-t transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010] border-[#262626] text-[#F7F5F0]' 
        : 'bg-[#FAF9F6] border-[#E5E2D9] text-[#1A1A1A]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${
          isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
        }`}>
          <div className="space-y-2">
            <span className={`text-[10px] uppercase tracking-[0.25em] font-bold flex items-center gap-2 ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
              Studio Transformations & Client Vibe
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal tracking-tight ${
              isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
            }`}>
              Real Clients. Bespoke Artistry. Verified Heals.
            </h2>
            <p className={`text-xs max-w-xl font-normal leading-relaxed ${
              isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
            }`}>
              Explore authentic client reviews alongside interactive Before & After transformation showcases for both eyelash extensions and fine-line tattoos.
            </p>
          </div>

          {/* Category Filter Pills & Expand Toggle */}
          <div className="flex items-center gap-3 flex-wrap self-start md:self-auto">
            <div className={`flex items-center gap-1.5 p-1.5 border ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
              <button
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  if (!isSectionExpanded) setIsSectionExpanded(true);
                }}
                className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                  selectedCategoryFilter === 'all'
                    ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    : isDark ? 'text-[#A3A3A3] hover:text-[#F7F5F0]' : 'text-[#6B6961] hover:text-[#1A1A1A]'
                }`}
              >
                All Atelier
              </button>

              <button
                onClick={() => {
                  setSelectedCategoryFilter('lashes');
                  if (!isSectionExpanded) setIsSectionExpanded(true);
                }}
                className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategoryFilter === 'lashes'
                    ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    : isDark ? 'text-[#A3A3A3] hover:text-[#F7F5F0]' : 'text-[#6B6961] hover:text-[#1A1A1A]'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Lashes</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategoryFilter('tattoos');
                  if (!isSectionExpanded) setIsSectionExpanded(true);
                }}
                className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategoryFilter === 'tattoos'
                    ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    : isDark ? 'text-[#A3A3A3] hover:text-[#F7F5F0]' : 'text-[#6B6961] hover:text-[#1A1A1A]'
                }`}
              >
                <Feather className="w-3 h-3" />
                <span>Fine-Line Ink</span>
              </button>
            </div>

            {/* Section Expand/Collapse Toggle Button */}
            <button
              onClick={() => setIsSectionExpanded(!isSectionExpanded)}
              className={`px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold border flex items-center gap-2 transition-all ${
                isDark 
                  ? 'bg-[#181818] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' 
                  : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
              }`}
            >
              <span>{isSectionExpanded ? 'Collapse Showcase' : 'Expand Showcase'}</span>
              {isSectionExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsed View Preview or Expanded 2-Column Showcase */}
        {!isSectionExpanded ? (
          <div 
            onClick={() => setIsSectionExpanded(true)}
            className={`p-6 border cursor-pointer transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 group ${
              isDark 
                ? 'bg-[#181818] border-[#333333] hover:border-[#F7F5F0]' 
                : 'bg-[#EBE9E1] border-[#D1CEC3] hover:border-[#1A1A1A]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 border flex items-center justify-center shrink-0 ${
                isDark ? 'bg-[#222222] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
              }`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 fill-current ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                    ))}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                    5.0 Rating • 48+ Atelier Reviews & Transformations
                  </span>
                </div>
                <h3 className={`font-serif text-lg font-medium mt-0.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                  Showcase Collapsed — Click to view client testimonials and interactive before/after gallery
                </h3>
              </div>
            </div>

            <div className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold border shrink-0 transition-all flex items-center gap-2 ${
              isDark 
                ? 'bg-[#F7F5F0] text-[#101010] group-hover:bg-[#E2DFD7]' 
                : 'bg-[#1A1A1A] text-[#FAF9F6] group-hover:bg-[#333333]'
            }`}>
              <span>Expand Showcase</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        ) : (
          /* Main 2-Column Showcase */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* COLUMN 1: CLIENT TESTIMONIALS CAROUSEL (5 Cols) */}
            <div className={`lg:col-span-5 border p-6 sm:p-8 flex flex-col justify-between relative space-y-6 ${
              isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
            
            {/* Top Carousel Navigation Header */}
            <div className={`flex items-center justify-between border-b pb-4 ${
              isDark ? 'border-[#333333]' : 'border-[#D1CEC3]'
            }`}>
              <div className="flex items-center gap-2">
                <Quote className={`w-5 h-5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                  isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                }`}>
                  Client Vibe
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  title={isAutoPlaying ? 'Pause Slideshow' : 'Start Slideshow'}
                  className={`p-1 text-xs font-bold transition-colors ${
                    isDark ? 'text-[#A3A3A3] hover:text-[#F7F5F0]' : 'text-[#6B6961] hover:text-[#1A1A1A]'
                  }`}
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <span className={`text-xs font-mono font-semibold ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>
                  0{activeTestimonialIndex + 1} / 0{filteredTestimonials.length}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevTestimonial}
                    className={`w-7 h-7 border flex items-center justify-center transition-all ${
                      isDark 
                        ? 'bg-[#222222] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' 
                        : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className={`w-7 h-7 border flex items-center justify-center transition-all ${
                      isDark 
                        ? 'bg-[#222222] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' 
                        : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonial Content Card */}
            {currentTestimonial && (
              <div className="space-y-6 flex-1 flex flex-col justify-between py-2 transition-all duration-300">
                
                <div className="space-y-4">
                  {/* Rating & Verified Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 fill-current ${
                          isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                        }`} />
                      ))}
                    </div>

                    <span className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold border px-2 py-0.5 ${
                      isDark 
                        ? 'bg-[#222222] border-[#333333] text-[#F7F5F0]' 
                        : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      {currentTestimonial.verifiedClient ? 'Verified Atelier Visit' : 'Verified Review'}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className={`font-serif text-lg sm:text-xl font-normal leading-snug italic ${
                    isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                  }`}>
                    "{currentTestimonial.quote}"
                  </blockquote>
                </div>

                {/* Client Info & Service Details */}
                <div className={`space-y-4 border-t pt-4 ${
                  isDark ? 'border-[#333333]' : 'border-[#D1CEC3]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentTestimonial.clientAvatar}
                        alt={currentTestimonial.clientName}
                        referrerPolicy="no-referrer"
                        className={`w-10 h-10 object-cover border ${
                          isDark ? 'border-[#F7F5F0]' : 'border-[#1A1A1A]'
                        }`}
                      />
                      <div>
                        <h4 className={`font-serif text-sm font-semibold ${
                          isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                        }`}>
                          {currentTestimonial.clientName}
                        </h4>
                        <span className={`text-[10px] font-semibold block uppercase ${
                          isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                        }`}>
                          Artist: <strong className={isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}>{currentTestimonial.artistName}</strong>
                        </span>
                      </div>
                    </div>

                    <span className={`px-2 py-1 border text-[9px] uppercase tracking-widest font-bold ${
                      isDark 
                        ? 'bg-[#222222] border-[#333333] text-[#F7F5F0]' 
                        : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                    }`}>
                      {currentTestimonial.vibeTag}
                    </span>
                  </div>

                  {/* Service & Specs Bar */}
                  <div className={`p-3 border space-y-1.5 ${
                    isDark ? 'bg-[#222222] border-[#333333]' : 'bg-[#FAF9F6] border-[#D1CEC3]'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className={`font-serif ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{currentTestimonial.serviceTitle}</span>
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Service Spec</span>
                    </div>
                    <div className={`text-[10px] font-mono font-semibold truncate ${
                      isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
                    }`}>
                      {currentTestimonial.specsSummary}
                    </div>
                  </div>

                  {/* CTA Book This Look */}
                  <button
                    onClick={() => handleBookFromCard(currentTestimonial.serviceId)}
                    className={`w-full py-3 font-bold text-[10px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 ${
                      isDark 
                        ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]' 
                        : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
                    }`}
                  >
                    <span>Reserve {currentTestimonial.serviceTitle}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* Pagination Indicators */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonialIndex(idx)}
                  className={`h-1 transition-all duration-300 ${
                    idx === activeTestimonialIndex 
                      ? isDark ? 'w-6 bg-[#F7F5F0]' : 'w-6 bg-[#1A1A1A]' 
                      : isDark ? 'w-2 bg-[#333333] hover:bg-[#888888]' : 'w-2 bg-[#D1CEC3] hover:bg-[#8C8A82]'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* COLUMN 2: INTERACTIVE BEFORE & AFTER GALLERY (7 Cols) */}
          <div className={`lg:col-span-7 border p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
            isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#1A1A1A]'
          }`}>
            
            {/* Before / After Header Controls */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
              isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
            }`}>
              <div>
                <span className={`text-[10px] uppercase tracking-[0.25em] font-bold block ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>
                  Interactive Transformation Showcase
                </span>
                <h3 className={`font-serif text-xl font-medium ${
                  isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                }`}>
                  {currentBeforeAfter ? currentBeforeAfter.title : 'Before & After Gallery'}
                </h3>
              </div>

              {/* Prev / Next Before & After Case Buttons */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-semibold ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>
                  Case 0{activeBeforeAfterIndex + 1} of 0{filteredBeforeAfter.length}
                </span>

                <button
                  onClick={handlePrevBeforeAfter}
                  className={`w-8 h-8 border flex items-center justify-center transition-all font-bold ${
                    isDark 
                      ? 'bg-[#222222] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' 
                      : 'bg-[#EBE9E1] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
                  }`}
                  title="Previous Transformation"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextBeforeAfter}
                  className={`w-8 h-8 border flex items-center justify-center transition-all font-bold ${
                    isDark 
                      ? 'bg-[#222222] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' 
                      : 'bg-[#EBE9E1] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
                  }`}
                  title="Next Transformation"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Before & After Interactive Image Viewer */}
            {currentBeforeAfter && (
              <div className="space-y-4">
                
                {/* Image Container with Split Reveal Slider */}
                <div className={`relative w-full h-80 sm:h-96 border overflow-hidden select-none group ${
                  isDark ? 'bg-[#101010] border-[#333333]' : 'bg-[#1A1A1A] border-[#1A1A1A]'
                }`}>
                  
                  {/* AFTER Image (Full background) */}
                  <img
                    src={currentBeforeAfter.afterImage}
                    alt={`${currentBeforeAfter.title} After`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* BEFORE Image (Clipped overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: showBeforeOnly ? '100%' : `${sliderPosition}%` }}
                  >
                    <img
                      src={currentBeforeAfter.beforeImage}
                      alt={`${currentBeforeAfter.title} Before`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%' }}
                    />
                    
                    {/* Before Watermark Badge */}
                    <div className="absolute top-4 left-4 bg-[#1A1A1A]/90 text-[#FAF9F6] text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1 shadow-md">
                      Before (Bare Canvas)
                    </div>
                  </div>

                  {/* After Watermark Badge */}
                  <div className="absolute top-4 right-4 bg-[#1A1A1A]/90 text-[#FAF9F6] text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1 shadow-md">
                    After Atelier Artistry
                  </div>

                  {/* Divider Line & Handle (only visible if not toggled showBeforeOnly) */}
                  {!showBeforeOnly && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-[#FAF9F6] shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#1A1A1A] text-[#FAF9F6] border border-[#FAF9F6] flex items-center justify-center text-xs font-bold shadow-lg">
                        <Sliders className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {/* Range Slider Overlay Control */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={e => {
                      setShowBeforeOnly(false);
                      setSliderPosition(Number(e.target.value));
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>

                {/* Slider Drag Hint & Quick Toggle */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs p-3 border ${
                  isDark ? 'bg-[#222222] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
                }`}>
                  <span className={`text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                    isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
                  }`}>
                    <Sliders className={`w-3.5 h-3.5 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                    <span>Drag slider left/right to compare Before vs After</span>
                  </span>

                  <button
                    type="button"
                    onMouseDown={() => setShowBeforeOnly(true)}
                    onMouseUp={() => setShowBeforeOnly(false)}
                    onTouchStart={() => setShowBeforeOnly(true)}
                    onTouchEnd={() => setShowBeforeOnly(false)}
                    className={`px-3 py-1 text-[9px] uppercase tracking-wider font-bold transition-all self-start sm:self-auto ${
                      isDark 
                        ? 'bg-[#F7F5F0] text-[#101010] hover:bg-[#E2DFD7]' 
                        : 'bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#333333]'
                    }`}
                  >
                    Hold to View Pure Before
                  </button>
                </div>

                {/* Transformation Details & Specs */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider font-bold block ${
                        isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                      }`}>
                        Master Artist: <strong className={isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}>{currentBeforeAfter.artistName}</strong>
                      </span>
                      <h4 className={`font-serif text-lg font-medium ${
                        isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                      }`}>
                        {currentBeforeAfter.subtitle}
                      </h4>
                    </div>

                    <span className={`px-2.5 py-1 border text-[9px] uppercase tracking-widest font-bold shrink-0 ${
                      isDark 
                        ? 'bg-[#222222] border-[#333333] text-[#F7F5F0]' 
                        : 'bg-[#EBE9E1] border-[#D1CEC3] text-[#1A1A1A]'
                    }`}>
                      {currentBeforeAfter.category === 'lashes' ? 'Lash Transformation' : 'Fine-Line Ink'}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed font-normal ${
                    isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'
                  }`}>
                    {currentBeforeAfter.description}
                  </p>

                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border ${
                    isDark ? 'bg-[#222222] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
                  }`}>
                    <div className="space-y-0.5">
                      <span className={`text-[9px] uppercase tracking-wider font-bold block ${
                        isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                      }`}>
                        Artistry Specification
                      </span>
                      <span className={`font-mono text-xs font-bold block ${
                        isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                      }`}>
                        {currentBeforeAfter.specs}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBookFromCard(currentBeforeAfter.serviceId)}
                      className={`px-5 py-2.5 font-bold text-[9px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                        isDark 
                          ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]' 
                          : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
                      }`}
                    >
                      <span>Book This Transformation</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Thumbnail Selectors for Before & After Cases */}
            <div className={`grid grid-cols-3 sm:grid-cols-6 gap-2 border-t pt-4 ${
              isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
            }`}>
              {filteredBeforeAfter.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveBeforeAfterIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`relative h-14 overflow-hidden border transition-all ${
                    idx === activeBeforeAfterIndex
                      ? isDark ? 'border-[#F7F5F0] ring-1 ring-[#F7F5F0]' : 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                      : isDark ? 'border-[#333333] opacity-60 hover:opacity-100' : 'border-[#D1CEC3] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-[8px] font-mono font-bold text-[#FAF9F6] bg-black/60 px-1 py-0.5">
                      0{idx + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>

          </div>

          </div>
        )}

      </div>
    </section>
  );
};

