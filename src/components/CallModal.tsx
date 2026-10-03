import React, { useState } from 'react';
import { Phone, Copy, Check, X, MessageSquare } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';
import { useLanguage } from '../context/LanguageContext';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, onOpenWhatsApp }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SHOP_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#121622] rounded-xl border border-[#2d364c] max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8e95a5] hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#dfa938]/10 flex items-center justify-center text-[#dfa938]">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-brand">
              {t.callModalTitle}
            </h3>
            <p className="text-xs text-[#a0a6b5]">
              {t.callModalSubtitle}
            </p>
          </div>
        </div>

        {/* Big Phone Card */}
        <div className="bg-[#181d2a] p-4 rounded-xl border border-[#273042] text-center my-5">
          <div className="text-xs uppercase font-bold tracking-wider text-[#788296] mb-1">
            {t.callModalOfficialPhone}
          </div>
          <div className="text-2xl font-extrabold text-[#dfa938] tracking-wider font-brand my-1">
            {SHOP_INFO.phone}
          </div>
          <div className="text-xs text-[#8e95a5]">
            09:00 AM – 10:00 PM
          </div>
        </div>

        <div className="space-y-3">
          {/* Direct Call Button */}
          <a
            href={`tel:${SHOP_INFO.phoneRaw}`}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-[#dfa938] hover:bg-[#eab949] rounded-lg transition-all shadow-md shadow-[#dfa938]/20"
          >
            <Phone className="w-4 h-4 fill-black" />
            <span>{t.callNowBtn} ({SHOP_INFO.phone})</span>
          </a>

          {/* Copy Number */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#c0c5d2] hover:text-white bg-[#1a202e] hover:bg-[#232b3d] border border-[#2a3449] rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.callModalCopied : t.callModalCopyBtn}</span>
          </button>

          {/* Or WhatsApp */}
          <button
            onClick={() => {
              onClose();
              onOpenWhatsApp();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-[#16251d] hover:bg-[#1a3024] border border-[#233f2e] rounded-lg transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.callModalPreferWhatsApp}</span>
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-[#1c2230] text-[11px] text-[#788296] flex items-center justify-between">
          <span>{t.callModalWalkIns}</span>
          <span>Rruga Demneri, Tiranë 1000</span>
        </div>
      </div>
    </div>
  );
};
