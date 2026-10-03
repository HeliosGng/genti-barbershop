import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Scissors } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitch } from './LanguageSwitch';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenCallModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-[#0b0d11]/95 backdrop-blur-md border-b border-[#232733] transition-all">
      {/* Top Banner Alert: Hours, Google Rating & Language Switcher */}
      <div className="bg-[#12161f] border-b border-[#1f2430] py-1.5 px-4 text-xs text-[#a0a6b5]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#e2e4e9] font-medium">{t.openBanner}</span>
            <span aria-hidden="true" className="text-[#3b4252]">·</span>
            <span className="hidden sm:inline">{t.streetAddress}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a 
              href={SHOP_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#dfa938] hover:underline"
            >
              <span>★ 5.0</span>
              <span className="text-[#a0a6b5] underline underline-offset-2">{t.googleRatingText}</span>
            </a>
            <span aria-hidden="true" className="text-[#3b4252] hidden sm:inline">·</span>
            <a 
              href={`tel:${SHOP_INFO.phoneRaw}`} 
              className="hidden sm:flex items-center gap-1 text-[#e2e4e9] hover:text-[#dfa938] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#dfa938]" />
              <span>{SHOP_INFO.phone}</span>
            </a>
            <span aria-hidden="true" className="text-[#3b4252] hidden sm:inline">·</span>
            {/* Desktop Top-Bar Language Switch */}
            <div className="hidden sm:block">
              <LanguageSwitch compact />
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar - 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element wordmark */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-bold tracking-wider font-brand text-[#f4f3ee] flex items-center gap-2 hover:text-[#dfa938] transition-colors"
        >
          <Scissors className="w-5 h-5 text-[#dfa938] rotate-45" />
          <span>GENTI'S BARBERSHOP</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#c0c5d2]">
          <a href="#services" className="hover:text-[#dfa938] transition-colors py-1">{t.navServices}</a>
          <a href="#booking" className="hover:text-[#dfa938] transition-colors py-1">{t.navBooking}</a>
          <a href="#showcase" className="hover:text-[#dfa938] transition-colors py-1">{t.navShowcase}</a>
          <a href="#staff" className="hover:text-[#dfa938] transition-colors py-1">{t.navStaff}</a>
          <a href="#location" className="hover:text-[#dfa938] transition-colors py-1">{t.navLocation}</a>
        </nav>

        {/* Zone 3: Primary actions + Language Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenCallModal}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#e2e4e9] bg-[#1a1f2c] border border-[#2e3648] rounded hover:border-[#dfa938] hover:text-[#dfa938] transition-all"
            title="Call Genti's Barbershop"
          >
            <Phone className="w-3.5 h-3.5 text-[#dfa938]" />
            <span className="whitespace-nowrap">{t.callForAppt}</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#dfa938] to-[#c59b27] hover:brightness-110 active:scale-98 rounded transition-all shadow-md shadow-[#c59b27]/10"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">{t.bookViaWhatsApp}</span>
          </button>

          {/* Mobile Language Switcher button */}
          <div className="sm:hidden">
            <LanguageSwitch compact />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#a0a6b5] hover:text-white rounded focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1117] border-b border-[#232733] px-5 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f2430]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8e95a5]">{t.langSwitch}</span>
            <LanguageSwitch />
          </div>

          <div className="flex flex-col space-y-3 text-base font-medium text-[#c0c5d2]">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#dfa938] border-b border-[#1a1f2c]"
            >
              {t.navServices}
            </a>
            <a 
              href="#booking" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#dfa938] border-b border-[#1a1f2c]"
            >
              {t.navBooking}
            </a>
            <a 
              href="#showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#dfa938] border-b border-[#1a1f2c]"
            >
              {t.navShowcase}
            </a>
            <a 
              href="#staff" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#dfa938] border-b border-[#1a1f2c]"
            >
              {t.navStaff}
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#dfa938] border-b border-[#1a1f2c]"
            >
              {t.navLocation}
            </a>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-3 px-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#1a1f2c] border border-[#2e3648] rounded"
            >
              <Phone className="w-4 h-4 text-[#dfa938]" />
              <span>{t.callUs}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 py-3 px-3 text-center text-xs font-semibold uppercase tracking-wider text-black bg-[#dfa938] rounded font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookNow}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
