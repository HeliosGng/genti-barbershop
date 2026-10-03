import React from 'react';
import { Phone, Calendar, Star, ArrowRight } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenCallModal }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0b0d11]">
      {/* Background Image with Dark Vignette Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/barbershop_hero_1791034374636.jpg"
          alt="Genti's Barbershop interior on Rruga Demneri, Tirana"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11] via-[#0b0d11]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,13,17,0.85)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Unboxed Metadata Trust Bar */}
        <div className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-[#c0c5d2] mb-6 border border-[#2e3648] bg-[#121620]/80 backdrop-blur-md px-4 py-1.5 rounded-full">
          <span className="flex items-center gap-1 text-[#dfa938]">
            <Star className="w-3.5 h-3.5 fill-[#dfa938]" />
            <strong className="text-white">{t.heroTrustBadge}</strong>
          </span>
          <span aria-hidden="true" className="text-[#3b4252]">·</span>
          <span>{t.heroReviewsBadge}</span>
          <span aria-hidden="true" className="text-[#3b4252] hidden sm:inline">·</span>
          <span className="hidden sm:inline">{t.heroLocationBadge}</span>
          <span aria-hidden="true" className="text-[#3b4252] hidden md:inline">·</span>
          <span className="hidden md:inline text-emerald-400">{t.heroHoursBadge}</span>
        </div>

        {/* Primary Headline with Balance */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f4f3ee] font-brand max-w-4xl mx-auto leading-[1.15] mb-6">
          {t.heroTitle}
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-[#b8bfce] max-w-2xl mx-auto mb-8 font-sans-clean leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#dfa938] via-[#e5b842] to-[#c59b27] hover:brightness-110 active:scale-98 rounded-md shadow-lg shadow-[#c59b27]/20 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.heroCtaWhatsApp}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onOpenCallModal}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[#e2e4e9] bg-[#161b26]/90 hover:bg-[#1f2637] border border-[#2e3648] hover:border-[#dfa938] active:scale-98 rounded-md transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#dfa938]" />
            <span>{t.heroCtaCall} {SHOP_INFO.phone}</span>
          </button>
        </div>

        {/* Key Business Markers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[#1f2533] text-left max-w-3xl mx-auto text-xs text-[#a0a6b5]">
          <div className="p-3 bg-[#11141c]/60 rounded border border-[#1d222e]">
            <div className="text-[#dfa938] font-bold text-sm mb-0.5">{t.heroFeaturePrice}</div>
            <div>{t.heroFeaturePriceSub}</div>
          </div>

          <div className="p-3 bg-[#11141c]/60 rounded border border-[#1d222e]">
            <div className="text-white font-bold text-sm mb-0.5">{t.heroFeatureHours}</div>
            <div>{t.heroFeatureHoursSub}</div>
          </div>

          <div className="p-3 bg-[#11141c]/60 rounded border border-[#1d222e]">
            <div className="text-[#dfa938] font-bold text-sm mb-0.5">{t.heroFeatureBooking}</div>
            <div>{t.heroFeatureBookingSub}</div>
          </div>

          <div className="p-3 bg-[#11141c]/60 rounded border border-[#1d222e]">
            <div className="text-white font-bold text-sm mb-0.5">{t.heroFeatureLocation}</div>
            <div>{t.heroFeatureLocationSub}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
