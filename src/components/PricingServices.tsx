import React, { useState } from 'react';
import { Scissors, Check, Clock, ArrowRight } from 'lucide-react';
import { SERVICES, SHOP_INFO } from '../data/barbershopData';
import { getLocalizedText, getLocalizedArray } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PricingServicesProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const PricingServices: React.FC<PricingServicesProps> = ({ onSelectServiceToBook }) => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'cuts' | 'beard' | 'treatments' | 'combos'>('all');
  const [currency, setCurrency] = useState<'ALL' | 'EUR'>('ALL');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  const categories = [
    { id: 'all', label: t.allServices },
    { id: 'cuts', label: t.catCuts },
    { id: 'beard', label: t.catBeard },
    { id: 'treatments', label: t.catTreatments },
    { id: 'combos', label: t.catCombos },
  ];

  return (
    <section id="services" className="py-12 sm:py-20 bg-[#0b0d11] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#dfa938] font-bold mb-1.5 sm:mb-2">
              {t.pricingKicker}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-brand text-[#f4f3ee] tracking-tight">
              {t.pricingTitle}
            </h2>
            <p className="text-[#a0a6b5] text-xs sm:text-base mt-1.5 sm:mt-2 max-w-xl">
              {t.pricingSubtitle}
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 self-start md:self-auto bg-[#141822] p-1 sm:p-1.5 rounded-lg border border-[#232938]">
            <span className="text-[11px] sm:text-xs text-[#8e95a5] px-1.5 sm:px-2 font-medium">{t.currencyLabel}</span>
            <button
              onClick={() => setCurrency('ALL')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                currency === 'ALL'
                  ? 'bg-[#dfa938] text-black shadow-sm'
                  : 'text-[#a0a6b5] hover:text-white'
              }`}
            >
              ALL (Lek)
            </button>
            <button
              onClick={() => setCurrency('EUR')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                currency === 'EUR'
                  ? 'bg-[#dfa938] text-black shadow-sm'
                  : 'text-[#a0a6b5] hover:text-white'
              }`}
            >
              EUR (€)
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 sm:pb-3 mb-6 sm:mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1e2433] text-[#dfa938] border border-[#dfa938]/40 shadow-sm'
                  : 'bg-[#12151e] text-[#a0a6b5] border border-transparent hover:border-[#2a3244] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative bg-[#121622] rounded-xl border p-4 sm:p-6 flex flex-col justify-between transition-all hover:border-[#dfa938]/50 hover:shadow-xl hover:shadow-black/50 ${
                service.popular ? 'border-[#dfa938]/60 bg-gradient-to-b from-[#181d2c] to-[#121622]' : 'border-[#222838]'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-2.5 right-6 bg-[#dfa938] text-black text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded shadow">
                  {t.clientFavorite}
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold text-white font-brand">
                    {getLocalizedText(service.name, language)}
                  </h3>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-extrabold text-[#dfa938] tabular-nums font-brand">
                      {currency === 'ALL' ? `${service.priceALL} ALL` : `€${service.priceEUR}`}
                    </div>
                    <div className="text-[11px] text-[#7d8495] flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#dfa938]" />
                      <span>{service.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#a0a6b5] leading-relaxed mb-5">
                  {getLocalizedText(service.description, language)}
                </p>

                {/* What's included checklist */}
                <div className="space-y-2 mb-6 pt-3 border-t border-[#1d2332]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7d8495]">
                    {t.includedInService}
                  </div>
                  {getLocalizedArray(service.includes, language).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#c0c5d2]">
                      <Check className="w-3.5 h-3.5 text-[#dfa938] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectServiceToBook(service.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#1a202d] text-white hover:bg-[#dfa938] hover:text-black border border-[#2d364a] hover:border-[#dfa938] transition-all cursor-pointer group"
              >
                <span>{t.bookThisService}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Walk-in & Consultation Notice */}
        <div className="mt-12 p-5 rounded-xl bg-[#141924] border border-[#252c3c] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a0a6b5]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#dfa938]/10 text-[#dfa938] rounded-lg">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">{t.customAdviceTitle}</span>
              <p className="mt-0.5">{t.customAdviceText}</p>
            </div>
          </div>
          <a
            href={`tel:${SHOP_INFO.phoneRaw}`}
            className="whitespace-nowrap px-4 py-2 bg-[#202738] hover:bg-[#283147] border border-[#313c54] text-white rounded font-medium transition-colors"
          >
            {t.directCallLabel} {SHOP_INFO.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
