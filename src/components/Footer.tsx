import React from 'react';
import { Scissors, Phone, MapPin, Clock, Star, ExternalLink } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitch } from './LanguageSwitch';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenCallModal }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#08090d] border-t border-[#1a1f2b] pt-16 pb-20 lg:pb-12 text-xs text-[#8e95a5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Craft */}
          <div>
            <div className="flex items-center gap-2 text-white font-brand text-lg font-bold mb-3 tracking-wide">
              <Scissors className="w-5 h-5 text-[#dfa938] rotate-45" />
              <span>GENTI'S BARBERSHOP</span>
            </div>
            <p className="text-xs text-[#9aa2b5] leading-relaxed mb-4">
              {t.footerAbout}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#dfa938] mb-4">
              <Star className="w-4 h-4 fill-[#dfa938]" />
              <span className="font-bold text-white">5.0 Star Rating</span>
              <span className="text-[#676f82]">· {t.googleRatingText}</span>
            </div>
            <div>
              <LanguageSwitch />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {t.footerExplore}
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-[#dfa938] transition-colors">{t.navServices}</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#dfa938] transition-colors">{t.navBooking}</a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#dfa938] transition-colors">{t.navShowcase}</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#dfa938] transition-colors">{t.navLocation}</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {t.footerContact}
            </div>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#dfa938] shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${SHOP_INFO.phoneRaw}`} className="text-white hover:text-[#dfa938] font-medium block">
                    {SHOP_INFO.phone}
                  </a>
                  <span className="text-[11px] text-[#676f82]">{t.footerCallForAppts}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#dfa938] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">{SHOP_INFO.address}</div>
                  <div className="text-[11px] text-[#676f82]">Plus Code: {SHOP_INFO.plusCode}</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={onOpenCallModal}
                  className="px-3 py-1.5 bg-[#141822] hover:bg-[#1e2434] text-white rounded border border-[#252c3c] text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  {t.callUs}
                </button>
                <button
                  onClick={onOpenBooking}
                  className="px-3 py-1.5 bg-[#dfa938] hover:bg-[#eab949] text-black rounded text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {t.bookViaWhatsApp}
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Hours */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {t.footerHours}
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span>{t.monSatLabel}</span>
                <span className="text-white font-medium">09:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>{t.sunLabel}</span>
                <span className="text-white font-medium">10:00 AM – 08:00 PM</span>
              </div>
              <div className="mt-3 p-2 bg-[#121622] rounded border border-[#1f2536] text-emerald-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.footerOpen7Days}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-8 border-t border-[#171c26] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#676f82]">
          <div>
            © {new Date().getFullYear()} Genti's Barbershop. {t.footerRights}
          </div>
          <div className="flex items-center gap-4">
            <a href={SHOP_INFO.googleMapsUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <span>{t.footerViewGoogle}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
