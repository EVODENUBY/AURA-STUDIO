import React, { useState, useEffect } from 'react';
import { Service, Artist, Booking, CategoryType, LashSpecs, TattooSpecs } from '../types';
import { Calendar as CalendarIcon, Clock, CheckCircle2, User, Mail, Phone, FileText, AlertCircle, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, Download, QrCode, MessageSquare, Smartphone, Send, BellRing, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  artists: Artist[];
  preselectedService?: Service | null;
  preselectedArtist?: Artist | null;
  preselectedSpecs?: any;
  onBookingComplete: (booking: Booking) => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  services,
  artists,
  preselectedService,
  preselectedArtist,
  preselectedSpecs,
  onBookingComplete
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(preselectedService?.category || 'lashes');
  const [selectedService, setSelectedService] = useState<Service>(preselectedService || services[0]);
  const [selectedArtist, setSelectedArtist] = useState<Artist>(preselectedArtist || artists[0]);

  // Specifications
  const [lashSpecs, setLashSpecs] = useState<LashSpecs>(
    preselectedSpecs || selectedService?.defaultLashSpecs || {
      curl: 'CC-Curl',
      lengthRange: '9mm - 13mm',
      density: 'Soft Volume 3D',
      mappingStyle: 'Wispy Kim K'
    }
  );

  const [tattooSpecs, setTattooSpecs] = useState<TattooSpecs>(
    preselectedSpecs || selectedService?.defaultTattooSpecs || {
      placement: 'Collarbone',
      approxSizeInches: '2" x 2"',
      styleCategory: 'Fine Line Minimalist',
      inkColor: 'Charcoal Black'
    }
  );

  // Date and time selection
  const [appointmentDate, setAppointmentDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] // default 2 days in future
  );
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loadingAvailability, setLoadingAvailability] = useState<boolean>(false);

  // Client info
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [healthConsent, setHealthConsent] = useState<boolean>(false);

  // SMS Notification states
  const [smsOptIn, setSmsOptIn] = useState<boolean>(true);
  const [smsTestToast, setSmsTestToast] = useState<{ show: boolean; msg: string; phone: string; time: string } | null>(null);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Trigger simulated SMS toast notification
  const handleTriggerTestSms = (customMsg?: string) => {
    const targetPhone = clientPhone || confirmedBooking?.clientPhone || '+1 (555) 019-2831';
    const targetName = clientName || confirmedBooking?.clientName || 'Sophia';
    const targetRef = confirmedBooking?.bookingRef || 'AURA-9281';
    
    const msg = customMsg || `AURA ATELIER: Hi ${targetName}, your reservation #${targetRef} is active. Reply STOP to cancel or HELP for address.`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setSmsTestToast({
      show: true,
      msg,
      phone: targetPhone,
      time: nowStr
    });

    setTimeout(() => {
      setSmsTestToast(null);
    }, 5000);
  };

  // Update selected service if category changes
  useEffect(() => {
    const categoryServices = services.filter(s => s.category === selectedCategory);
    if (!categoryServices.some(s => s.id === selectedService?.id)) {
      if (categoryServices[0]) setSelectedService(categoryServices[0]);
    }
  }, [selectedCategory, services]);

  // Fetch availability whenever artist or date changes
  useEffect(() => {
    if (!selectedArtist || !appointmentDate) return;
    setLoadingAvailability(true);
    fetch(`/api/availability?artistId=${selectedArtist.id}&date=${appointmentDate}`)
      .then(res => res.json())
      .then(data => {
        setAvailableHours(data.availableHours || []);
        if (data.availableHours && data.availableHours.length > 0) {
          setSelectedTime(data.availableHours[0]);
        } else {
          setSelectedTime('');
        }
      })
      .catch(err => console.error('Failed to fetch availability:', err))
      .finally(() => setLoadingAvailability(false));
  }, [selectedArtist, appointmentDate]);

  if (!isOpen) return null;

  const handleCreateBooking = async () => {
    if (!clientName || !clientEmail || !clientPhone || !selectedTime || !healthConsent) return;
    setSubmitting(true);

    const payload = {
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      category: selectedCategory,
      artistId: selectedArtist.id,
      artistName: selectedArtist.name,
      clientName,
      clientEmail,
      clientPhone,
      appointmentDate,
      appointmentTime: selectedTime,
      totalPrice: selectedService.price,
      depositPaid: selectedService.depositAmount,
      lashSpecs: selectedCategory === 'lashes' ? lashSpecs : undefined,
      tattooSpecs: selectedCategory === 'tattoos' ? tattooSpecs : undefined,
      clientNotes,
      healthConsentsAccepted: healthConsent
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.booking) {
        setConfirmedBooking(data.booking);
        onBookingComplete(data.booking);
        setStep(5); // Final confirmed pass step
      }
    } catch (err) {
      console.error('Failed to save booking:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Generate .ICS file download
  const handleDownloadIcs = () => {
    if (!confirmedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AURA Studio Atelier//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:AURA Studio - ${confirmedBooking.serviceTitle}
DESCRIPTION:Atelier appointment with ${confirmedBooking.artistName}. Ref: ${confirmedBooking.bookingRef}. Deposit Paid: $${confirmedBooking.depositPaid}.
LOCATION:AURA Atelier Suite 400, Kiyovu, Kigali, Rwanda
DTSTART:${confirmedBooking.appointmentDate.replace(/-/g, '')}T100000Z
DTEND:${confirmedBooking.appointmentDate.replace(/-/g, '')}T120000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${confirmedBooking.bookingRef}-AURA-Studio.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      
      {/* Floating Interactive SMS Toast Notification */}
      {smsTestToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-auto px-4 animate-in fade-in slide-in-from-top duration-300">
          <div className={`p-4 border shadow-2xl flex items-start gap-3 relative ${
            isDark ? 'bg-[#181818] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A]'
          }`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
            }`}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8A82]">SMS DELIVERED</span>
                <span className="text-[9px] font-mono opacity-60">{smsTestToast.time}</span>
              </div>
              <p className="text-xs font-mono font-bold mt-0.5">{smsTestToast.phone}</p>
              <p className="text-xs leading-relaxed mt-1 opacity-90">{smsTestToast.msg}</p>
            </div>
            <button
              onClick={() => setSmsTestToast(null)}
              className="absolute top-2 right-2 text-xs font-bold p-1 opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className={`border max-w-3xl w-full max-h-[92vh] flex flex-col p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-xl relative my-auto overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-[#101010] border-[#2A2A2A] text-[#F7F5F0]' 
          : 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A]'
      }`}>
        
        {/* Header & Close */}
        <div className={`flex items-center justify-between border-b pb-4 shrink-0 ${
          isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
        }`}>
          <div>
            <span className={`text-[10px] uppercase tracking-[0.25em] block font-bold ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              Atelier Reservation
            </span>
            <h3 className={`font-serif text-2xl font-normal ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
              {step === 5 ? 'Appointment Confirmed Pass' : `Step ${step} of 4 — ${step === 1 ? 'Service & Specs' : step === 2 ? 'Master Artist' : step === 3 ? 'Date & Time' : 'Intake & Deposit'}`}
            </h3>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-none flex items-center justify-center text-sm font-bold transition-colors ${
              isDark 
                ? 'bg-[#F7F5F0] text-[#101010] hover:bg-[#E0DDD5]' 
                : 'bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#333333]'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        {step < 5 && (
          <div className="grid grid-cols-4 gap-2 shrink-0">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-1 transition-all duration-300 ${
                  s <= step 
                    ? isDark ? 'bg-[#F7F5F0]' : 'bg-[#1A1A1A]'
                    : isDark ? 'bg-[#222222]' : 'bg-[#EBE9E1]'
                }`}
              />
            ))}
          </div>
        )}

        {/* Scrollable Step Body */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-6">

        {/* STEP 1: SERVICE & CUSTOM SPECS */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Category Toggle */}
            <div className={`grid grid-cols-2 gap-2 p-1.5 border ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
              <button
                type="button"
                onClick={() => setSelectedCategory('lashes')}
                className={`py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                  selectedCategory === 'lashes'
                    ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    : isDark ? 'text-[#888888]' : 'text-[#6B6961]'
                }`}
              >
                Eye Lash Extensions
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('tattoos')}
                className={`py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                  selectedCategory === 'tattoos'
                    ? isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                    : isDark ? 'text-[#888888]' : 'text-[#6B6961]'
                }`}
              >
                Fine-Line Tattoos
              </button>
            </div>

            {/* Service Select List */}
            <div>
              <label className={`block text-[10px] uppercase tracking-[0.2em] mb-2 font-bold ${
                isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
              }`}>
                Select Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                {services.filter(s => s.category === selectedCategory).map(service => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-3.5 border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedService?.id === service.id
                        ? isDark ? 'bg-[#222222] border-[#F7F5F0] shadow-sm' : 'bg-[#EBE9E1] border-[#1A1A1A] shadow-sm'
                        : isDark ? 'bg-[#181818] border-[#2A2A2A] hover:border-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A]'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className={`w-12 h-12 rounded-none object-cover shrink-0 border ${
                        isDark ? 'border-[#333333]' : 'border-[#1A1A1A]'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <span className={`font-serif text-sm block truncate font-medium ${
                        isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                      }`}>{service.title}</span>
                      <span className={`text-xs font-mono font-bold ${
                        isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                      }`}>${service.price} USD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Specs Editor */}
            {selectedCategory === 'lashes' ? (
              <div className={`p-4 border space-y-4 ${
                isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
              }`}>
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold block ${
                  isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                }`}>
                  Customize Lash Specifications
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Curl Type</label>
                    <select
                      value={lashSpecs.curl}
                      onChange={e => setLashSpecs({ ...lashSpecs, curl: e.target.value as any })}
                      className={`w-full border p-2 font-semibold ${
                        isDark ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      <option value="C-Curl">C-Curl (Natural Lift)</option>
                      <option value="CC-Curl">CC-Curl (Bestseller)</option>
                      <option value="D-Curl">D-Curl (Dramatic Lift)</option>
                      <option value="L-Curl">L-Curl (Hooded Eye Lift)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Length Range</label>
                    <select
                      value={lashSpecs.lengthRange}
                      onChange={e => setLashSpecs({ ...lashSpecs, lengthRange: e.target.value })}
                      className={`w-full border p-2 font-semibold ${
                        isDark ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      <option value="8mm - 11mm">8mm - 11mm (Subtle)</option>
                      <option value="9mm - 13mm">9mm - 13mm (Classic Wispy)</option>
                      <option value="10mm - 15mm">10mm - 15mm (Glamour)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Density</label>
                    <select
                      value={lashSpecs.density}
                      onChange={e => setLashSpecs({ ...lashSpecs, density: e.target.value as any })}
                      className={`w-full border p-2 font-semibold ${
                        isDark ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      <option value="Natural 1:1">Natural 1:1</option>
                      <option value="Soft Volume 3D">Soft Volume 3D</option>
                      <option value="Glam Volume 5D">Glam Volume 5D</option>
                      <option value="Mega Volume 10D">Mega Volume 10D</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Lash Map Style</label>
                    <select
                      value={lashSpecs.mappingStyle}
                      onChange={e => setLashSpecs({ ...lashSpecs, mappingStyle: e.target.value as any })}
                      className={`w-full border p-2 font-semibold ${
                        isDark ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      <option value="Wispy Kim K">Wispy Kim K</option>
                      <option value="Cat Eye">Cat Eye</option>
                      <option value="Doll Eye">Doll Eye</option>
                      <option value="Squirrel / Natural Swept">Natural Swept</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`p-4 border space-y-4 ${
                isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
              }`}>
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold block ${
                  isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
                }`}>
                  Customize Tattoo Placement & Ink Specs
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Placement</label>
                    <select
                      value={tattooSpecs.placement}
                      onChange={e => setTattooSpecs({ ...tattooSpecs, placement: e.target.value as any })}
                      className={`w-full border p-2 font-semibold ${
                        isDark ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      <option value="Collarbone">Collarbone</option>
                      <option value="Wrist">Wrist</option>
                      <option value="Forearm">Forearm</option>
                      <option value="Ribs">Ribs</option>
                      <option value="Ankle/Foot">Ankle/Foot</option>
                      <option value="Behind Ear">Behind Ear</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Approx Size</label>
                    <select
                      value={tattooSpecs.approxSizeInches}
                      onChange={e => setTattooSpecs({ ...tattooSpecs, approxSizeInches: e.target.value })}
                      className={`w-full border p-2 font-semibold ${
                        isDark ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      <option value='1" x 1" Micro'>1" x 1" Micro</option>
                      <option value='2" x 2" Standard'>2" x 2" Standard</option>
                      <option value='3" x 4" Medium'>3" x 4" Medium</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Style Category</label>
                    <select
                      value={tattooSpecs.styleCategory}
                      onChange={e => setTattooSpecs({ ...tattooSpecs, styleCategory: e.target.value as any })}
                      className={`w-full border p-2 font-semibold ${
                        isDark ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      <option value="Fine Line Minimalist">Fine Line Minimalist</option>
                      <option value="Botanical / Floral">Botanical / Floral</option>
                      <option value="Micro-Realism">Micro-Realism</option>
                      <option value="Ornamental">Ornamental</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Ink Tone</label>
                    <select
                      value={tattooSpecs.inkColor}
                      onChange={e => setTattooSpecs({ ...tattooSpecs, inkColor: e.target.value as any })}
                      className={`w-full border p-2 font-semibold ${
                        isDark ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
                      }`}
                    >
                      <option value="Charcoal Black">Charcoal Black</option>
                      <option value="Fine Grey Wash">Fine Grey Wash</option>
                      <option value="Red Accent">Red Accent</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              className={`w-full py-3.5 font-bold text-[10px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 ${
                isDark 
                  ? 'bg-[#F7F5F0] hover:bg-[#E0DDD5] text-[#101010]' 
                  : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
              }`}
            >
              <span>Next: Select Master Artist</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: SELECT ARTIST */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {artists.map(artist => (
                <div
                  key={artist.id}
                  onClick={() => setSelectedArtist(artist)}
                  className={`p-4 border cursor-pointer transition-all space-y-3 ${
                    selectedArtist?.id === artist.id
                      ? isDark ? 'bg-[#222222] border-[#F7F5F0] shadow-sm' : 'bg-[#EBE9E1] border-[#1A1A1A] shadow-sm'
                      : isDark ? 'bg-[#181818] border-[#2A2A2A] hover:border-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A]'
                  }`}
                >
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    referrerPolicy="no-referrer"
                    className={`w-16 h-16 rounded-none object-cover border ${
                      isDark ? 'border-[#333333]' : 'border-[#1A1A1A]'
                    }`}
                  />
                  <div>
                    <span className={`font-serif text-base block font-normal ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{artist.name}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>{artist.title}</span>
                  </div>
                  <div className={`text-[11px] font-semibold ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                    ★ {artist.rating} ({artist.reviewCount} reviews)
                  </div>
                </div>
              ))}
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'}`}>
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold ${
                  isDark ? 'bg-[#222222] text-[#F7F5F0]' : 'bg-[#EBE9E1] text-[#1A1A1A]'
                }`}
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className={`px-6 py-3 font-bold text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 ${
                  isDark ? 'bg-[#F7F5F0] hover:bg-[#E0DDD5] text-[#101010]' : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
                }`}
              >
                <span>Next: Choose Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME SLOT PICKER */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Date Input */}
              <div>
                <label className={`block text-[10px] uppercase tracking-[0.2em] mb-2 font-bold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                  Select Appointment Date
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={e => setAppointmentDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full border p-3 text-xs font-semibold focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className={`block text-[10px] uppercase tracking-[0.2em] mb-2 font-bold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                  Available Atelier Slots
                </label>
                {loadingAvailability ? (
                  <div className={`text-xs py-4 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Checking artist calendar...</div>
                ) : availableHours.length === 0 ? (
                  <div className={`text-xs py-4 font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>No remaining slots for this date. Please pick another date.</div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {availableHours.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 text-xs font-mono transition-all font-semibold ${
                          selectedTime === time
                            ? isDark ? 'bg-[#F7F5F0] text-[#101010] font-bold shadow-sm' : 'bg-[#1A1A1A] text-[#FAF9F6] font-bold shadow-sm'
                            : isDark ? 'bg-[#181818] border border-[#333333] text-[#A3A3A3] hover:text-[#F7F5F0]' : 'bg-[#FAF9F6] border border-[#D1CEC3] text-[#6B6961] hover:text-[#1A1A1A]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'}`}>
              <button
                onClick={() => setStep(2)}
                className={`px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold ${
                  isDark ? 'bg-[#222222] text-[#F7F5F0]' : 'bg-[#EBE9E1] text-[#1A1A1A]'
                }`}
              >
                Back
              </button>
              <button
                disabled={!selectedTime}
                onClick={() => setStep(4)}
                className={`px-6 py-3 font-bold text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 ${
                  isDark 
                    ? 'bg-[#F7F5F0] hover:bg-[#E0DDD5] disabled:bg-[#222222] disabled:text-[#666666] text-[#101010]' 
                    : 'bg-[#1A1A1A] hover:bg-[#333333] disabled:bg-[#D1CEC3] disabled:text-[#8C8A82] text-[#FAF9F6]'
                }`}
              >
                <span>Next: Intake & Deposit</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CLIENT INTAKE & DEPOSIT WITH SMS NOTIFICATION PREVIEW */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-[10px] uppercase tracking-wider font-bold mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Full Name *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Sophia Laurent"
                  className={`w-full border p-3 text-xs font-semibold focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] uppercase tracking-wider font-bold mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Email Address *</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="sophia@example.com"
                  className={`w-full border p-3 text-xs font-semibold focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] uppercase tracking-wider font-bold mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Phone Number (For SMS Confirmation) *</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  placeholder="+1 (555) 019-2831"
                  className={`w-full border p-3 text-xs font-semibold focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] uppercase tracking-wider font-bold mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Special Notes / Allergies</label>
                <input
                  type="text"
                  value={clientNotes}
                  onChange={e => setClientNotes(e.target.value)}
                  placeholder="Sensitive left eye, prefers extra wispy outer flare..."
                  className={`w-full border p-3 text-xs font-semibold focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                />
              </div>

              {/* SMS Notification Opt-In & Mock SMS Preview UI */}
              <div className={`col-span-1 sm:col-span-2 p-4 border space-y-3 transition-colors ${
                isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
              }`}>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsOptIn}
                      onChange={e => setSmsOptIn(e.target.checked)}
                      className={`accent-current ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}
                    />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                      Enable Instant SMS Confirmation & 24h Reminder
                    </span>
                  </label>

                  <span className={`text-[9px] uppercase px-2 py-0.5 font-mono font-bold border ${
                    smsOptIn 
                      ? isDark ? 'bg-[#1F2E1F] text-[#81C784] border-[#2E4A2E]' : 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'
                      : isDark ? 'bg-[#222222] text-[#888888] border-[#333333]' : 'bg-[#FAF9F6] text-[#8C8A82] border-[#D1CEC3]'
                  }`}>
                    {smsOptIn ? 'SMS Enabled' : 'SMS Muted'}
                  </span>
                </div>

                {smsOptIn && (
                  <div className={`p-3.5 border space-y-2 relative overflow-hidden ${
                    isDark ? 'bg-[#101010] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#D1CEC3]'
                  }`}>
                    <div className={`flex items-center justify-between text-[10px] font-mono border-b pb-2 ${
                      isDark ? 'border-[#222222] text-[#888888]' : 'border-[#E5E2D9] text-[#8C8A82]'
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold">
                        <Smartphone className="w-3.5 h-3.5 text-[#8C8A82]" />
                        <span>SMS NOTIFICATION PREVIEW</span>
                      </div>
                      <span className="text-[9px] font-mono">{clientPhone || '+1 (555) 019-2831'}</span>
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-serif text-xs font-bold ${
                        isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                      }`}>
                        A
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>AURA ATELIER</span>
                          <span className={`text-[9px] ${isDark ? 'text-[#777777]' : 'text-[#8C8A82]'}`}>Instant</span>
                        </div>
                        <p className={`text-xs font-mono leading-relaxed p-2.5 border ${
                          isDark ? 'bg-[#181818] border-[#2E2E2E] text-[#E0E0E0]' : 'bg-[#F0EFEA] border-[#DCD9CE] text-[#222222]'
                        }`}>
                          "AURA ATELIER: Hi {clientName || 'Sophia'}, your {selectedService.title} session with {selectedArtist.name} on {appointmentDate} at {selectedTime || '10:00 AM'} is ready to confirm! Text HELP for directions."
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className={`text-[9px] ${isDark ? 'text-[#777777]' : 'text-[#8C8A82]'}`}>
                        Automated SMS confirmation dispatched upon payment
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTriggerTestSms()}
                        className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 transition-all ${
                          isDark 
                            ? 'bg-[#222222] hover:bg-[#333333] border-[#444444] text-[#F7F5F0]' 
                            : 'bg-[#FAF9F6] hover:bg-[#EBE9E1] border-[#1A1A1A] text-[#1A1A1A]'
                        }`}
                      >
                        <Send className="w-2.5 h-2.5" />
                        <span>Test Ping SMS</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Deposit Summary Box */}
            <div className={`p-5 border space-y-3 ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#1A1A1A]'
            }`}>
              <div className={`flex items-center justify-between text-xs border-b pb-3 ${
                isDark ? 'border-[#2A2A2A]' : 'border-[#D1CEC3]'
              }`}>
                <span className={isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}>Service: <strong className={isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}>{selectedService.title}</strong></span>
                <span className={`font-mono font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>${selectedService.price} USD</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}>Deposit Required Today (Deducted from Total):</span>
                <span className={`font-mono text-lg font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>${selectedService.depositAmount} USD</span>
              </div>
              <p className={`text-[10px] font-normal ${isDark ? 'text-[#888888]' : 'text-[#6B6961]'}`}>
                Remaining balance of ${(selectedService.price - selectedService.depositAmount)} USD payable at atelier check-out.
              </p>
            </div>

            {/* Health & Safety Consent */}
            <label className={`flex items-start gap-3 p-3.5 border cursor-pointer ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
              <input
                type="checkbox"
                checked={healthConsent}
                onChange={e => setHealthConsent(e.target.checked)}
                className={`mt-0.5 accent-current ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}
              />
              <span className={`text-xs font-normal leading-relaxed ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                I confirm that I am over 18, free of active eye infections or skin lesions in the target area, and agree to the 48-hour studio rescheduling policy.
              </span>
            </label>

            <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'}`}>
              <button
                onClick={() => setStep(3)}
                className={`px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold ${
                  isDark ? 'bg-[#222222] text-[#F7F5F0]' : 'bg-[#EBE9E1] text-[#1A1A1A]'
                }`}
              >
                Back
              </button>
              <button
                disabled={submitting || !clientName || !clientEmail || !clientPhone || !healthConsent}
                onClick={handleCreateBooking}
                className={`px-8 py-3.5 font-bold text-[10px] uppercase tracking-[0.25em] shadow-md flex items-center gap-2 ${
                  isDark 
                    ? 'bg-[#F7F5F0] hover:bg-[#E0DDD5] disabled:bg-[#222222] disabled:text-[#666666] text-[#101010]' 
                    : 'bg-[#1A1A1A] hover:bg-[#333333] disabled:bg-[#D1CEC3] disabled:text-[#8C8A82] text-[#FAF9F6]'
                }`}
              >
                {submitting ? 'Confirming Atelier Reservation...' : `Confirm & Pay $${selectedService.depositAmount} Deposit`}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMED DIGITAL PASS & SMS CONFIRMATION CARD */}
        {step === 5 && confirmedBooking && (
          <div className="space-y-6 text-center">
            <div className={`w-16 h-16 flex items-center justify-center mx-auto ${
              isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
            }`}>
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold block ${
                isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
              }`}>
                Reservation Confirmed
              </span>
              <h3 className={`font-serif text-3xl font-normal mt-1 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                {confirmedBooking.serviceTitle}
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                Booking Reference: <span className={`font-mono font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{confirmedBooking.bookingRef}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto items-stretch">
              {/* Digital Pass Card */}
              <div className={`p-6 border space-y-4 text-left ${
                isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#EBE9E1] border-[#1A1A1A]'
              }`}>
                <div className={`flex items-center justify-between border-b pb-3 ${
                  isDark ? 'border-[#2A2A2A]' : 'border-[#D1CEC3]'
                }`}>
                  <div>
                    <span className={`text-[9px] uppercase font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Client</span>
                    <span className={`text-xs font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{confirmedBooking.clientName}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] uppercase font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Artist</span>
                    <span className={`text-xs font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{confirmedBooking.artistName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className={`text-[9px] uppercase font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Date & Time</span>
                    <span className={`font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{confirmedBooking.appointmentDate} at {confirmedBooking.appointmentTime}</span>
                  </div>
                  <div>
                    <span className={`text-[9px] uppercase font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Deposit Status</span>
                    <span className={`font-bold uppercase ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>Paid (${confirmedBooking.depositPaid} USD)</span>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className={`p-4 border flex items-center justify-between ${
                  isDark ? 'bg-[#101010] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#D1CEC3]'
                }`}>
                  <div className="space-y-1">
                    <span className={`text-[9px] uppercase tracking-wider block font-bold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Studio Check-In Pass</span>
                    <span className={`font-mono text-xs font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{confirmedBooking.bookingRef}</span>
                  </div>
                  <div className={`w-12 h-12 p-1 flex items-center justify-center ${
                    isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                  }`}>
                    <QrCode className="w-full h-full" />
                  </div>
                </div>
              </div>

              {/* SMS Booking Confirmation Mock Card */}
              <div className={`p-6 border space-y-3 text-left flex flex-col justify-between ${
                isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#EBE9E1] border-[#1A1A1A]'
              }`}>
                <div className="space-y-3">
                  <div className={`flex items-center justify-between border-b pb-3 ${
                    isDark ? 'border-[#2A2A2A]' : 'border-[#D1CEC3]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                      }`}>
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                        SMS Confirmation
                      </span>
                    </div>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-[#81C784]/20 text-[#2E7D32] border border-[#2E7D32]/30 font-bold">
                      Delivered ✓
                    </span>
                  </div>

                  <div className={`p-3 border font-mono text-xs space-y-1.5 ${
                    isDark ? 'bg-[#101010] border-[#333333] text-[#D8D8D8]' : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#333333]'
                  }`}>
                    <div className="flex items-center justify-between text-[9px] text-[#8C8A82]">
                      <span>To: {confirmedBooking.clientPhone}</span>
                      <span>Just Now</span>
                    </div>
                    <p className="leading-relaxed">
                      "AURA ATELIER: Reservation Confirmed! Ref #{confirmedBooking.bookingRef}. {confirmedBooking.serviceTitle} with {confirmedBooking.artistName} on {confirmedBooking.appointmentDate} at {confirmedBooking.appointmentTime}. Deposit Paid: ${confirmedBooking.depositPaid} USD."
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => handleTriggerTestSms(`AURA ATELIER: Resending confirmation for Ref #${confirmedBooking.bookingRef}. Date: ${confirmedBooking.appointmentDate} @ ${confirmedBooking.appointmentTime}.`)}
                    className={`w-full py-2 text-[9px] font-bold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all ${
                      isDark 
                        ? 'bg-[#222222] hover:bg-[#333333] border-[#444444] text-[#F7F5F0]' 
                        : 'bg-[#FAF9F6] hover:bg-[#EBE9E1] border-[#1A1A1A] text-[#1A1A1A]'
                    }`}
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend Confirmation SMS</span>
                  </button>

                  <button
                    onClick={() => handleTriggerTestSms(`AURA ATELIER REMINDER: Your appointment with ${confirmedBooking.artistName} is scheduled for tomorrow at ${confirmedBooking.appointmentTime}. Reply HELP for directions.`)}
                    className={`w-full py-2 text-[9px] font-bold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all ${
                      isDark 
                        ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010] border-[#F7F5F0]' 
                        : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6] border-[#1A1A1A]'
                    }`}
                  >
                    <BellRing className="w-3 h-3" />
                    <span>Send 24h Reminder SMS Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadIcs}
                className={`w-full sm:w-auto px-6 py-3 text-[10px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 border ${
                  isDark 
                    ? 'bg-[#222222] hover:bg-[#333333] text-[#F7F5F0] border-[#444444]' 
                    : 'bg-[#EBE9E1] hover:bg-[#D1CEC3] text-[#1A1A1A] border-[#1A1A1A]'
                }`}
              >
                <Download className={`w-4 h-4 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`} />
                <span>Add to Calendar (.ICS)</span>
              </button>

              <button
                onClick={onClose}
                className={`w-full sm:w-auto px-8 py-3 text-[10px] font-bold uppercase tracking-[0.25em] ${
                  isDark 
                    ? 'bg-[#F7F5F0] hover:bg-[#E0DDD5] text-[#101010]' 
                    : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};
