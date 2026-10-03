import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PricingServices } from './components/PricingServices';
import { BookingWhatsApp } from './components/BookingWhatsApp';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { StaffSection } from './components/StaffSection';
import { ReviewsSection } from './components/ReviewsSection';
import { MapLocationSection } from './components/MapLocationSection';
import { Footer } from './components/Footer';
import { CallModal } from './components/CallModal';
import { MobileQuickBar } from './components/MobileQuickBar';

function MainApp() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const scrollToBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBarber = (_barberId: string) => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-[#e2e4e9] font-sans-clean antialiased selection:bg-[#dfa938] selection:text-black">
      {/* Top Header */}
      <Header
        onOpenBooking={() => scrollToBooking()}
        onOpenCallModal={() => setIsCallModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => scrollToBooking()}
          onOpenCallModal={() => setIsCallModalOpen(true)}
        />

        {/* Pricing & Detailed Services Catalog */}
        <PricingServices
          onSelectServiceToBook={(serviceId) => scrollToBooking(serviceId)}
        />

        {/* Interactive WhatsApp Online Booking Wizard */}
        <BookingWhatsApp preselectedServiceId={selectedServiceId} />

        {/* Showcase Gallery with Reserved Photo Slots */}
        <ShowcaseGallery />

        {/* Staff Member Profiles */}
        <StaffSection
          onSelectBarberToBook={(barberId) => handleSelectBarber(barberId)}
        />

        {/* Verified 5.0 Google Reviews */}
        <ReviewsSection />

        {/* Google Maps Integration & Directions */}
        <MapLocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => scrollToBooking()}
        onOpenCallModal={() => setIsCallModalOpen(true)}
      />

      {/* Mobile Sticky Quick Navigation Bar */}
      <MobileQuickBar
        onOpenBooking={() => scrollToBooking()}
        onOpenCallModal={() => setIsCallModalOpen(true)}
      />

      {/* Quick Call Modal */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onOpenWhatsApp={() => scrollToBooking()}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ErrorBoundary>
  );
}
