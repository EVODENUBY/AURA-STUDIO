import React, { useState, useEffect } from 'react';
import { Artist, Service, CategoryType } from '../types';
import { 
  Clock, 
  Zap, 
  RefreshCw, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Sparkles, 
  BellRing, 
  ChevronRight, 
  X, 
  ShieldCheck,
  TrendingUp,
  Send,
  Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface ArtistAvailabilityData {
  artistId: string;
  artistName: string;
  status: 'available_today' | 'available_tomorrow' | 'waitlist_only';
  statusBadge: string;
  nextAvailableSlot: string;
  nextAvailableTime: string;
  nextAvailableDate: string;
  waitlistCount: number;
  avgWaitDays: number;
  occupancyPercent: number;
  instantCancellationSlot?: string;
  availableSlotsToday: string[];
  availableSlotsUpcoming: { day: string; date: string; time: string }[];
}

interface LiveAvailabilityWidgetProps {
  artists: Artist[];
  services: Service[];
  activeCategory: CategoryType;
  selectedArtistId: string;
  onSelectArtist: (artistId: string) => void;
  onBookSlot: (artist: Artist, dateStr?: string, timeStr?: string) => void;
}

export const LiveAvailabilityWidget: React.FC<LiveAvailabilityWidgetProps> = ({
  artists,
  services,
  activeCategory,
  selectedArtistId,
  onSelectArtist,
  onBookSlot
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>('Just now');
  const [syncCount, setSyncCount] = useState<number>(0);

  // Waitlist Modal state
  const [waitlistModalArtist, setWaitlistModalArtist] = useState<Artist | null>(null);
  const [waitlistClientName, setWaitlistClientName] = useState('');
  const [waitlistContact, setWaitlistContact] = useState('');
  const [waitlistPrefTime, setWaitlistPrefTime] = useState('anytime');
  const [waitlistServiceId, setWaitlistServiceId] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [joinedQueueNumber, setJoinedQueueNumber] = useState<number>(0);

  // Dynamic live availability data state
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, ArtistAvailabilityData>>({
    'artist-elena': {
      artistId: 'artist-elena',
      artistName: 'Elena Vance',
      status: 'available_today',
      statusBadge: '2 Open Slots Today',
      nextAvailableSlot: 'Today @ 4:15 PM',
      nextAvailableTime: '04:15 PM',
      nextAvailableDate: new Date().toISOString().split('T')[0],
      waitlistCount: 1,
      avgWaitDays: 0.5,
      occupancyPercent: 88,
      instantCancellationSlot: '6:00 PM (Cancellation Drop)',
      availableSlotsToday: ['04:15 PM', '06:00 PM'],
      availableSlotsUpcoming: [
        { day: 'Tomorrow', date: 'Jul 29', time: '10:00 AM' },
        { day: 'Tomorrow', date: 'Jul 29', time: '02:00 PM' },
        { day: 'Thu', date: 'Jul 30', time: '11:45 AM' },
      ]
    },
    'artist-kai': {
      artistId: 'artist-kai',
      artistName: 'Kai Sato',
      status: 'available_tomorrow',
      statusBadge: 'Next Open Tomorrow',
      nextAvailableSlot: 'Tomorrow @ 1:30 PM',
      nextAvailableTime: '01:30 PM',
      nextAvailableDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      waitlistCount: 3,
      avgWaitDays: 1.2,
      occupancyPercent: 94,
      availableSlotsToday: [],
      availableSlotsUpcoming: [
        { day: 'Tomorrow', date: 'Jul 29', time: '01:30 PM' },
        { day: 'Tomorrow', date: 'Jul 29', time: '05:30 PM' },
        { day: 'Thu', date: 'Jul 30', time: '11:00 AM' },
        { day: 'Fri', date: 'Jul 31', time: '03:30 PM' },
      ]
    },
    'artist-mila': {
      artistId: 'artist-mila',
      artistName: 'Mila Thorne',
      status: 'waitlist_only',
      statusBadge: 'High Demand (Waitlist Active)',
      nextAvailableSlot: 'In 3 Days (Friday)',
      nextAvailableTime: '12:30 PM',
      nextAvailableDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      waitlistCount: 5,
      avgWaitDays: 3.5,
      occupancyPercent: 98,
      availableSlotsToday: [],
      availableSlotsUpcoming: [
        { day: 'Fri', date: 'Jul 31', time: '12:30 PM' },
        { day: 'Sat', date: 'Aug 01', time: '03:00 PM' },
        { day: 'Sun', date: 'Aug 02', time: '10:30 AM' },
      ]
    }
  });

  // Simulated live refresh
  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSyncCount(prev => prev + 1);
      const now = new Date();
      setLastSynced(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      // Slightly fluctuate queue count for realism
      setAvailabilityMap(prev => ({
        ...prev,
        'artist-elena': { ...prev['artist-elena'], waitlistCount: Math.max(1, prev['artist-elena'].waitlistCount) },
        'artist-kai': { ...prev['artist-kai'], waitlistCount: 3 },
        'artist-mila': { ...prev['artist-mila'], waitlistCount: Math.min(8, prev['artist-mila'].waitlistCount + (Math.random() > 0.5 ? 1 : 0)) }
      }));
    }, 700);
  };

  const handleOpenWaitlistModal = (artist: Artist) => {
    setWaitlistModalArtist(artist);
    setWaitlistSubmitted(false);
    setWaitlistClientName('');
    setWaitlistContact('');
    const currentArtistData = availabilityMap[artist.id];
    setJoinedQueueNumber((currentArtistData?.waitlistCount || 2) + 1);
  };

  const handleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistClientName.trim() || !waitlistContact.trim()) return;

    if (waitlistModalArtist) {
      setAvailabilityMap(prev => {
        const existing = prev[waitlistModalArtist.id];
        if (!existing) return prev;
        return {
          ...prev,
          [waitlistModalArtist.id]: {
            ...existing,
            waitlistCount: existing.waitlistCount + 1
          }
        };
      });
    }

    setWaitlistSubmitted(true);
  };

  const activeArtistData = availabilityMap[selectedArtistId] || availabilityMap['artist-elena'];
  const activeArtistObj = artists.find(a => a.id === selectedArtistId) || artists[0];

  return (
    <div className={`border p-5 sm:p-6 mb-8 transition-colors duration-300 ${
      isDark 
        ? 'bg-[#141414] border-[#2A2A2A] text-[#F7F5F0]' 
        : 'bg-[#F6F5F0] border-[#D1CEC3] text-[#1A1A1A]'
    }`}>
      
      {/* Top Bar: Title & Live Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dashed border-[#8C8A82]/30">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold ${
                isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
              }`}>
                Live Studio Calendar & Waitlist Sync
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-none uppercase font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </div>
            <h3 className={`font-serif text-lg font-normal ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
              Real-time Artist Availability & Priority Drops
            </h3>
          </div>
        </div>

        {/* Sync Status & Refresh Button */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className={`text-[10px] font-mono ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
            Synced: <span className="font-bold text-[#C49A8D]">{lastSynced}</span>
          </span>
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className={`px-3 py-1.5 border text-[9px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all ${
              isDark 
                ? 'bg-[#1A1A1A] hover:bg-[#252525] border-[#333333] text-[#F7F5F0]' 
                : 'bg-[#FAF9F6] hover:bg-[#EBE9E1] border-[#1A1A1A] text-[#1A1A1A]'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#C49A8D]' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Calendar'}</span>
          </button>
        </div>
      </div>

      {/* Artist Availability Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
        {artists.map(artist => {
          const avail = availabilityMap[artist.id];
          const isSelected = selectedArtistId === artist.id;

          let statusBg = isDark ? 'bg-[#1A1A1A] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#D1CEC3]';
          if (isSelected) {
            statusBg = isDark ? 'bg-[#1E1E1E] border-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#1A1A1A] ring-1 ring-[#1A1A1A]';
          }

          return (
            <div
              key={artist.id}
              onClick={() => onSelectArtist(artist.id)}
              className={`p-3.5 border cursor-pointer transition-all duration-200 relative group ${statusBg}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    referrerPolicy="no-referrer"
                    className={`w-9 h-9 rounded-none object-cover border ${
                      isSelected 
                        ? isDark ? 'border-[#F7F5F0]' : 'border-[#1A1A1A]' 
                        : isDark ? 'border-[#333333]' : 'border-[#D1CEC3]'
                    }`}
                  />
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                      {artist.name}
                    </h4>
                    <span className={`text-[9px] uppercase tracking-wider block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                      {artist.categories.join(' & ')}
                    </span>
                  </div>
                </div>

                {/* Status Indicator Pill */}
                {avail?.status === 'available_today' && (
                  <span className="text-[9px] font-bold px-2 py-0.5 border bg-emerald-950/80 text-emerald-300 border-emerald-700/60 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Today</span>
                  </span>
                )}
                {avail?.status === 'available_tomorrow' && (
                  <span className="text-[9px] font-bold px-2 py-0.5 border bg-amber-950/80 text-amber-300 border-amber-700/60 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>Tomorrow</span>
                  </span>
                )}
                {avail?.status === 'waitlist_only' && (
                  <span className="text-[9px] font-bold px-2 py-0.5 border bg-rose-950/80 text-rose-300 border-rose-700/60 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span>Waitlist</span>
                  </span>
                )}
              </div>

              {/* Specs & Metrics */}
              <div className="mt-3 pt-2.5 border-t border-dashed border-[#8C8A82]/30 space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}>Next Open:</span>
                  <span className={`font-mono font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                    {avail?.nextAvailableSlot || 'Contact Studio'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}>Waitlist Queue:</span>
                  <span className="font-mono font-semibold text-[#C49A8D]">
                    {avail?.waitlistCount} Clients Waiting ({avail?.avgWaitDays}d avg)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Artist Live Detail & Slot Booking Panel */}
      {activeArtistObj && activeArtistData && (
        <div className={`p-4 sm:p-5 border space-y-4 ${
          isDark ? 'bg-[#101010] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#D1CEC3]'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C49A8D]" />
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                  isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                }`}>
                  Live Slot Telemetry • {activeArtistObj.name}
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                {activeArtistData.status === 'available_today' && 'Open appointments detected in today\'s studio session. Reserve immediately before slot locks.'}
                {activeArtistData.status === 'available_tomorrow' && 'Limited openings tomorrow. Select a slot below or request direct placement.'}
                {activeArtistData.status === 'waitlist_only' && 'All standard slots are filled for the next 48h. Join the Fast-Track Cancellation Waitlist to be auto-notified.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenWaitlistModal(activeArtistObj)}
                className={`py-2 px-3 border text-[9px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all ${
                  isDark 
                    ? 'bg-[#181818] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' 
                    : 'bg-[#EBE9E1] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
                }`}
              >
                <BellRing className="w-3.5 h-3.5 text-[#C49A8D]" />
                <span>Join Fast-Track Waitlist</span>
              </button>
            </div>
          </div>

          {/* Available Slots Quick Chips */}
          <div className="space-y-2">
            <span className={`text-[9px] uppercase tracking-wider font-bold block ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              Immediate Bookable Slots for {activeArtistObj.name}:
            </span>

            <div className="flex flex-wrap gap-2">
              {activeArtistData.availableSlotsToday.map((time, idx) => (
                <button
                  key={`today-${idx}`}
                  onClick={() => onBookSlot(activeArtistObj, activeArtistData.nextAvailableDate, time)}
                  className={`px-3 py-2 border text-[10px] font-mono font-bold flex items-center gap-2 transition-all ${
                    isDark
                      ? 'bg-[#1F2E1F] border-[#2E4A2E] text-[#81C784] hover:bg-[#2A3E2A]'
                      : 'bg-[#E8F5E9] border-[#A5D6A7] text-[#2E7D32] hover:bg-[#C8E6C9]'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>Today {time}</span>
                  <span className="text-[8px] uppercase tracking-wider underline">Book Now</span>
                </button>
              ))}

              {activeArtistData.availableSlotsUpcoming.map((slot, idx) => (
                <button
                  key={`up-${idx}`}
                  onClick={() => onBookSlot(activeArtistObj, slot.date, slot.time)}
                  className={`px-3 py-2 border text-[10px] font-mono font-semibold flex items-center gap-2 transition-all ${
                    isDark
                      ? 'bg-[#181818] border-[#333333] text-[#F7F5F0] hover:border-[#F7F5F0]'
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  <Calendar className="w-3 h-3 text-[#C49A8D]" />
                  <span>{slot.day} ({slot.date}) • {slot.time}</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>

          {/* Instant Drop Alert banner if available */}
          {activeArtistData.instantCancellationSlot && (
            <div className={`p-3 border flex items-center justify-between text-xs font-mono ${
              isDark ? 'bg-[#2A2318] border-[#5A4525] text-[#F3E5AB]' : 'bg-[#FFF8E7] border-[#FFE0B2] text-[#8C6B1B]'
            }`}>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 fill-current text-amber-500" />
                <span><strong>Instant Drop:</strong> Priority opening {activeArtistData.instantCancellationSlot}</span>
              </div>
              <button
                onClick={() => onBookSlot(activeArtistObj, activeArtistData.nextAvailableDate, '06:00 PM')}
                className="text-[9px] uppercase font-bold tracking-wider underline hover:opacity-80"
              >
                Claim Drop Slot →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Fast-Track Waitlist Modal */}
      {waitlistModalArtist && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border max-w-md w-full p-6 space-y-5 shadow-2xl relative transition-colors duration-300 ${
            isDark ? 'bg-[#101010] border-[#2A2A2A] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A]'
          }`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3 border-[#8C8A82]/30">
              <div className="flex items-center gap-2.5">
                <BellRing className="w-5 h-5 text-[#C49A8D]" />
                <div>
                  <span className={`text-[9px] uppercase tracking-[0.2em] font-bold block ${
                    isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
                  }`}>
                    Priority Waitlist
                  </span>
                  <h3 className={`font-serif text-lg font-normal ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                    Join {waitlistModalArtist.name}&apos;s List
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setWaitlistModalArtist(null)}
                className={`w-7 h-7 flex items-center justify-center font-bold ${
                  isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!waitlistSubmitted ? (
              <form onSubmit={handleSubmitWaitlist} className="space-y-4">
                <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                  You will be assigned <strong>Queue Position #{joinedQueueNumber}</strong>. If a cancellation or new studio opening occurs for {waitlistModalArtist.name}, you will receive an instant SMS/Email notification.
                </p>

                <div>
                  <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={waitlistClientName}
                    onChange={e => setWaitlistClientName(e.target.value)}
                    className={`w-full p-2.5 text-xs font-semibold border focus:outline-none ${
                      isDark 
                        ? 'bg-[#181818] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                        : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                    Mobile Phone or Email (For Instant Alerts)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 000-0000 or client@domain.com"
                    value={waitlistContact}
                    onChange={e => setWaitlistContact(e.target.value)}
                    className={`w-full p-2.5 text-xs font-semibold border focus:outline-none ${
                      isDark 
                        ? 'bg-[#181818] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                        : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                    Preferred Appointment Window
                  </label>
                  <select
                    value={waitlistPrefTime}
                    onChange={e => setWaitlistPrefTime(e.target.value)}
                    className={`w-full p-2.5 text-xs font-semibold border focus:outline-none ${
                      isDark 
                        ? 'bg-[#181818] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                        : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                    }`}
                  >
                    <option value="anytime">Anytime / First Available Drop</option>
                    <option value="mornings">Mornings (10:00 AM - 1:00 PM)</option>
                    <option value="afternoons">Afternoons (1:00 PM - 5:00 PM)</option>
                    <option value="evenings">Evenings / Weekends</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 text-[10px] uppercase tracking-[0.2em] font-bold border flex items-center justify-center gap-2 transition-all ${
                    isDark 
                      ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010] border-[#F7F5F0]' 
                      : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6] border-[#1A1A1A]'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Secure Priority Waitlist Pass</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                  isDark ? 'bg-[#1F2E1F] text-[#81C784]' : 'bg-[#E8F5E9] text-[#2E7D32]'
                }`}>
                  <Check className="w-6 h-6" />
                </div>

                <div>
                  <h4 className={`font-serif text-xl font-normal ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                    Waitlist Pass Confirmed
                  </h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                    Welcome to {waitlistModalArtist.name}&apos;s priority queue, <strong>{waitlistClientName}</strong>.
                  </p>
                </div>

                <div className={`p-3 border font-mono text-xs text-center ${
                  isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
                }`}>
                  <span className={`text-[9px] uppercase tracking-wider block font-bold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                    Your Priority Queue Code
                  </span>
                  <span className="font-bold text-sm text-[#C49A8D]">
                    WL-{waitlistModalArtist.id.toUpperCase().replace('ARTIST-', '')}-00{joinedQueueNumber}
                  </span>
                  <span className={`block text-[9px] mt-1 ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                    Position: #{joinedQueueNumber} in Queue • Instant Alert Enabled
                  </span>
                </div>

                <button
                  onClick={() => setWaitlistModalArtist(null)}
                  className={`w-full py-2.5 text-[10px] uppercase tracking-wider font-bold border ${
                    isDark ? 'bg-[#181818] hover:bg-[#222222] text-[#F7F5F0] border-[#333333]' : 'bg-[#FAF9F6] hover:bg-[#EBE9E1] text-[#1A1A1A] border-[#1A1A1A]'
                  }`}
                >
                  Close & Return to Gallery
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
