import React from 'react';
import { Phone, MessageSquare, Calendar, MapPin } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';
import { useLanguage } from '../context/LanguageContext';

interface MobileQuickBarProps {
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenBooking, onOpenCallModal }) => {
  const { t } = useLanguage();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e1118]/95 backdrop-blur-md border-t border-[#232938] px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-2 text-center">
        {/* 1. Direct Call */}
        <a
          href={`tel:${SHOP_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#c0c5d2] active:bg-[#1a202d] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#dfa938] mb-0.5" />
          <span className="text-[10px] font-semibold">{t.mobileCall}</span>
        </a>

        {/* 2. WhatsApp Direct */}
        <a
          href={`https://wa.me/${SHOP_INFO.phoneDigitsOnly}?text=Hello%20Genti's%20Barbershop!%20Pershendetje!`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#c0c5d2] active:bg-[#1a202d] transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span className="text-[10px] font-semibold">{t.mobileWhatsApp}</span>
        </a>

        {/* 3. Book Form */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#dfa938] text-black active:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase">{t.mobileBook}</span>
        </button>

        {/* 4. Directions Map */}
        <a
          href={SHOP_INFO.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#c0c5d2] active:bg-[#1a202d] transition-colors"
        >
          <MapPin className="w-4 h-4 text-[#dfa938] mb-0.5" />
          <span className="text-[10px] font-semibold">{t.mobileDirections}</span>
        </a>
      </div>
    </div>
  );
};
