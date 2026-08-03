import React, { useState, useEffect } from 'react';
import { CategoryType, Service, Artist, Booking, Testimonial, BeforeAfterItem } from './types';
import { INITIAL_SERVICES, INITIAL_ARTISTS, INITIAL_BOOKINGS, INITIAL_TESTIMONIALS, INITIAL_BEFORE_AFTER } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCatalog } from './components/ServicesCatalog';
import { ArtistGallery } from './components/ArtistGallery';
import { ClientVibe } from './components/ClientVibe';
import { PrepAndAftercare } from './components/PrepAndAftercare';
import { StudioPortal } from './components/StudioPortal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AiConsultantModal } from './components/AiConsultantModal';
import { BookingWizard } from './components/BookingWizard';
import { MyBookingsModal } from './components/MyBookingsModal';
import { ReferAFriendModal } from './components/ReferAFriendModal';
import { Footer } from './components/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState<CategoryType>('lashes');
  const [activeView, setActiveView] = useState<'catalog' | 'artists' | 'prep' | 'my-bookings' | 'admin'>('catalog');

  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [artists, setArtists] = useState<Artist[]>(INITIAL_ARTISTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfterItem[]>(INITIAL_BEFORE_AFTER);

  // Modal Visibility States
  const [isAiCuratorOpen, setIsAiCuratorOpen] = useState<boolean>(false);
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState<boolean>(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Preselected Items for Booking Wizard
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [preselectedArtist, setPreselectedArtist] = useState<Artist | null>(null);
  const [preselectedSpecs, setPreselectedSpecs] = useState<any>(null);

  // Load initial data from server API
  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(err => console.log('Using initial services fallback', err));

    fetch('/api/artists')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setArtists(data);
      })
      .catch(err => console.log('Using initial artists fallback', err));

     fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBookings(data);
      })
      .catch(err => console.log('Using initial bookings fallback', err));

     fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      })
      .catch(err => console.log('Using initial testimonials fallback', err));

     fetch('/api/before-after')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setBeforeAfterItems(data);
      })
      .catch(err => console.log('Using initial before/after fallback', err));
  }, []);

  // Handle direct service selection for booking
  const handleSelectServiceForBooking = (service: Service) => {
    setPreselectedService(service);
    setPreselectedArtist(null);
    setPreselectedSpecs(null);
    setIsBookingWizardOpen(true);
  };

  // Handle direct artist selection for booking
  const handleBookWithArtist = (artist: Artist, preferredService?: Service) => {
    setPreselectedArtist(artist);
    setPreselectedService(preferredService || services.find(s => s.category === activeCategory) || services[0]);
    setPreselectedSpecs(null);
    setIsBookingWizardOpen(true);
  };

  // Handle AI recommendation application
  const handleApplyAiRecommendation = (service: Service, artist: Artist, specs: any) => {
    setPreselectedService(service);
    setPreselectedArtist(artist);
    setPreselectedSpecs(specs);
    setIsBookingWizardOpen(true);
  };

  // Handle new booking completed
  const handleBookingComplete = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  // Handle booking cancellation
  const handleCancelBooking = (bookingId: string) => {
    fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
        }
      })
      .catch(err => console.error('Failed to cancel booking:', err));
  };

  // Admin Authentication Check
  const handleAdminAuthSubmit = async (pinInput: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdminAuthenticated(true);
        setIsAdminAuthModalOpen(false);
        setActiveView('admin');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to verify admin pin:', err);
      return false;
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveView('catalog');
  };

  // Handle status update in admin
  const handleUpdateBookingStatus = (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
        }
      })
      .catch(err => console.error('Failed to update status:', err));
  };

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased selection:bg-[#c49a8d] transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010] text-[#F7F5F0] selection:text-[#101010]' 
        : 'bg-[#FAF9F6] text-[#1A1A1A] selection:text-[#FAF9F6]'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAiCurator={() => setIsAiCuratorOpen(true)}
        onOpenReferral={() => setIsReferralModalOpen(true)}
        onOpenBooking={() => {
          setPreselectedService(null);
          setPreselectedArtist(null);
          setPreselectedSpecs(null);
          setIsBookingWizardOpen(true);
        }}
        confirmedBookingsCount={confirmedCount}
        isAdminAuthenticated={isAdminAuthenticated}
        onAdminLogout={handleAdminLogout}
        onRequestAdminAuth={() => setIsAdminAuthModalOpen(true)}
      />

      {/* Main Content Area based on activeView */}
      <main className="flex-1">
        {activeView === 'catalog' && (
          <>
            <Hero
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onOpenAiCurator={() => setIsAiCuratorOpen(true)}
              onOpenBooking={() => {
                setPreselectedService(null);
                setPreselectedArtist(null);
                setPreselectedSpecs(null);
                setIsBookingWizardOpen(true);
              }}
            />

            <ServicesCatalog
              services={services}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onSelectServiceForBooking={handleSelectServiceForBooking}
              onOpenAiCurator={() => setIsAiCuratorOpen(true)}
            />

            <ArtistGallery
              artists={artists}
              services={services}
              activeCategory={activeCategory}
              onBookWithArtist={handleBookWithArtist}
            />

             <ClientVibe
               services={services}
               activeCategory={activeCategory}
               onSelectServiceForBooking={handleSelectServiceForBooking}
               testimonials={testimonials}
               beforeAfterItems={beforeAfterItems}
             />

            <PrepAndAftercare />
          </>
        )}

        {activeView === 'artists' && (
          <ArtistGallery
            artists={artists}
            services={services}
            activeCategory={activeCategory}
            onBookWithArtist={handleBookWithArtist}
          />
        )}

        {activeView === 'prep' && <PrepAndAftercare />}

        {activeView === 'my-bookings' && (
          <div className="py-12">
            <MyBookingsModal
              isOpen={true}
              onClose={() => setActiveView('catalog')}
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
            />
          </div>
        )}

        {activeView === 'admin' && (
          isAdminAuthenticated ? (
            <StudioPortal
              bookings={bookings}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onLogoutAdmin={handleAdminLogout}
            />
          ) : (
            <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
              <div className="w-12 h-12 border border-[#C49A8D] mx-auto flex items-center justify-center">
                <span className="font-serif italic text-lg text-[#C49A8D]">A</span>
              </div>
              <h2 className="font-serif text-2xl">Studio Portal Protected</h2>
              <p className={`text-xs ${isDark ? 'text-[#888888]' : 'text-[#6B6961]'}`}>
                Access to the Studio Management Portal requires authorized AURA Studio admin authentication.
              </p>
              <button
                onClick={() => setIsAdminAuthModalOpen(true)}
                className={`py-3 px-6 text-[10px] uppercase tracking-[0.25em] font-bold ${
                  isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
                }`}
              >
                Authenticate as Admin
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Style Curator Modal */}
      <AiConsultantModal
        isOpen={isAiCuratorOpen}
        onClose={() => setIsAiCuratorOpen(false)}
        initialCategory={activeCategory}
        services={services}
        artists={artists}
        onApplyRecommendationAndBook={handleApplyAiRecommendation}
      />

      {/* Booking Wizard Modal */}
      <BookingWizard
        isOpen={isBookingWizardOpen}
        onClose={() => setIsBookingWizardOpen(false)}
        services={services}
        artists={artists}
        preselectedService={preselectedService}
        preselectedArtist={preselectedArtist}
        preselectedSpecs={preselectedSpecs}
        onBookingComplete={handleBookingComplete}
      />

      {/* Refer-a-Friend Modal */}
      <ReferAFriendModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />

      {/* Admin Auth PIN Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onAuthenticate={handleAdminAuthSubmit}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

