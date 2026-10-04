import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle, MessageSquare, Copy, Check, AlertTriangle } from 'lucide-react';
import { TIME_SLOTS, SHOP_INFO } from '../data/barbershopData';
import { BookingState } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BookingWhatsAppProps {
  preselectedServiceId?: string;
}

export const BookingWhatsApp: React.FC<BookingWhatsAppProps> = () => {
  const { language, t } = useLanguage();
  
  // Default to today + 1 day (or skip to Wednesday if Tuesday)
  const getInitialDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 2) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    return tomorrow.toISOString().split('T')[0];
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const [booking, setBooking] = useState<BookingState>({
    serviceId: 'classic-haircut',
    barberId: 'any',
    date: getInitialDate(),
    timeSlot: '02:15 PM',
    customerName: '',
    customerPhone: '',
    notes: ''
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Tuesday is weekly day off
  const isTuesday = Boolean(booking.date && new Date(booking.date + 'T00:00:00').getDay() === 2);

  // Construct short and tidy WhatsApp message: ONLY client name, date, and time
  const generateWhatsAppMessage = () => {
    const clientName = booking.customerName.trim() || (language === 'sq' ? 'Klient' : 'Client');

    if (language === 'sq') {
      return `Përshëndetje! Rezervim:
Emri: ${clientName}
Data: ${booking.date}
Ora: ${booking.timeSlot}`;
    }

    return `Hello! Booking:
Name: ${clientName}
Date: ${booking.date}
Time: ${booking.timeSlot}`;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTuesday) {
      return;
    }
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SHOP_INFO.phoneDigitsOnly}?text=${encoded}`;
    
    setSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadCalendarFile = () => {
    const title = `Appointment at Genti's Barbershop`;
    const description = `Booking on Rruga Demneri, Tirana. Phone: ${SHOP_INFO.phone}`;
    const location = SHOP_INFO.address;
    
    const dateClean = booking.date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Gentis Barbershop Tirana//Booking//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${dateClean}T120000Z`,
      `DTEND:${dateClean}T130000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `gentis-booking-${booking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="booking" className="py-12 sm:py-20 bg-[#0e1117] border-y border-[#232733] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="text-xs uppercase tracking-widest text-[#dfa938] font-bold mb-1.5 sm:mb-2">
            {t.bookingKicker}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-brand text-[#f4f3ee] tracking-tight mb-2 sm:mb-4">
            {t.bookingTitle}
          </h2>
          <p className="text-[#a0a6b5] text-xs sm:text-base leading-relaxed">
            {t.bookingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Booking Form (7 cols) - Clean & Fast */}
          <div className="lg:col-span-7 bg-[#131722] p-4 sm:p-8 rounded-xl border border-[#262c3d] shadow-xl">
            <form onSubmit={handleSendWhatsApp} className="space-y-4 sm:space-y-6">
              {/* 1. Client Name (Required) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c0c5d2] mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#dfa938]" />
                  <span>{t.clientNameLabel}</span>
                  <span className="text-emerald-400 text-[10px] lowercase font-normal">(i detyrueshëm / required)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.clientNamePlaceholder}
                  value={booking.customerName}
                  onChange={(e) => setBooking({ ...booking, customerName: e.target.value })}
                  className="w-full bg-[#171c28] border border-[#262d3d] focus:border-[#dfa938] rounded-lg px-4 py-3 text-sm text-white placeholder-[#616a7f] focus:outline-none transition-colors"
                />
              </div>

              {/* 2. Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#c0c5d2] mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#dfa938]" />
                    <span>{t.step3Date}</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    required
                    className={`w-full bg-[#171c28] border rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors ${
                      isTuesday
                        ? 'border-amber-500/80 bg-amber-500/5'
                        : 'border-[#262d3d] focus:border-[#dfa938]'
                    }`}
                  />
                  {isTuesday && (
                    <div className="mt-2 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[11px] text-amber-300 flex items-start gap-2 animate-in fade-in">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <span>{t.tuesdayDateWarning}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#c0c5d2] mb-2 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#dfa938]" />
                    <span>{t.step3Time}</span>
                  </label>
                  <select
                    value={booking.timeSlot}
                    onChange={(e) => setBooking({ ...booking, timeSlot: e.target.value })}
                    className="w-full bg-[#171c28] border border-[#262d3d] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa938]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isTuesday}
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg transition-all ${
                    isTuesday
                      ? 'bg-[#222836] text-[#717a8e] cursor-not-allowed border border-[#31394c]'
                      : 'text-black bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] shadow-[#25D366]/20 cursor-pointer'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>{isTuesday ? t.tuesdayClosedBadge : t.sendWhatsAppBtn}</span>
                </button>
                <p className="text-[11px] text-center text-[#8e95a5] mt-2">
                  {isTuesday ? t.tuesdayDateWarning : t.sendWhatsAppDisclaimer}
                </p>
              </div>
            </form>
          </div>

          {/* WhatsApp Message Live Preview & Alternative Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Live WhatsApp Chat Bubble Preview (Short & Tidy) */}
            <div className="bg-[#10141d] rounded-xl border border-[#262d3d] p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1f2533]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                    GB
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Genti's Barbershop</div>
                    <div className="text-[10px] text-emerald-400">WhatsApp (+355 69 518 8660)</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyMessage}
                  className="text-xs flex items-center gap-1 text-[#a0a6b5] hover:text-[#dfa938] transition-colors cursor-pointer"
                  title="Copy message to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.copiedBtn : t.copyBtn}</span>
                </button>
              </div>

              {/* Message Mockup Bubble - Short and Tidy */}
              <div className="bg-[#1f2c24] border border-[#2c4033] p-4 rounded-lg text-xs font-mono text-[#d1f4da] leading-relaxed whitespace-pre-wrap select-all">
                {generateWhatsAppMessage()}
              </div>

              <div className="mt-4 pt-4 border-t border-[#1f2533] flex flex-wrap gap-2 justify-between items-center text-xs">
                <span className="text-[#8e95a5]">{t.chatPreviewTitle}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadCalendarFile}
                    className="px-3 py-1.5 text-[11px] font-medium text-[#c0c5d2] hover:text-white bg-[#171c28] border border-[#262d3d] rounded hover:border-[#dfa938] transition-colors cursor-pointer"
                  >
                    {t.addToCalendar}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Phone Call Alternative */}
            <div className="bg-[#161a25] rounded-xl border border-[#2d3447] p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#dfa938]/10 text-[#dfa938] rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1">{t.preferCallTitle}</h4>
                  <p className="text-xs text-[#a0a6b5] mb-3">
                    {t.preferCallText}
                  </p>
                  <a
                    href={`tel:${SHOP_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#22293a] border border-[#3b445c] hover:border-[#dfa938] hover:text-[#dfa938] rounded transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#dfa938]" />
                    <span>{SHOP_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Shop Opening Hours Summary */}
            <div className="bg-[#11141c] rounded-xl border border-[#1e2330] p-4 text-xs text-[#8e95a5]">
              <div className="font-semibold text-white mb-2 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#dfa938]" />
                <span>{t.hoursDemneriTitle}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1b202c]">
                <span>{t.monSatLabel}</span>
                <span className="text-white font-medium">09:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#1b202c] text-[#dfa938]">
                <span className="font-semibold">{t.tuesdayLabel}</span>
                <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#dfa938]/15 border border-[#dfa938]/40 rounded text-[#dfa938]">
                  {t.tuesdayClosedBadge}
                </span>
              </div>
              <div className="flex justify-between py-1.5 pt-2">
                <span>{t.sunLabel}</span>
                <span className="text-white font-medium">10:00 AM – 08:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
