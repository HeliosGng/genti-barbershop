import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Copy, Check, ExternalLink } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';
import { getLocalizedText } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const MapLocationSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(SHOP_INFO.plusCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${SHOP_INFO.lat},${SHOP_INFO.lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  const appleMapsUrl = `https://maps.apple.com/?q=Gentis+Barbershop&ll=${SHOP_INFO.lat},${SHOP_INFO.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${SHOP_INFO.lat},${SHOP_INFO.lng}&navigate=yes`;

  return (
    <section id="location" className="py-20 bg-[#0b0d11] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#dfa938] font-bold mb-2">
            {t.locationKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-brand text-[#f4f3ee] tracking-tight mb-4">
            {t.locationTitle}
          </h2>
          <p className="text-[#a0a6b5] text-base leading-relaxed">
            {t.locationSubtitle}
          </p>
        </div>

        {/* Grid: Map + Location Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Google Map Embed (7 cols) */}
          <div className="lg:col-span-7 bg-[#121622] rounded-xl overflow-hidden border border-[#23293a] shadow-2xl relative min-h-[380px] lg:min-h-[460px] flex flex-col">
            <div className="p-3 bg-[#171c28] border-b border-[#23293a] flex items-center justify-between text-xs text-[#a0a6b5]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#dfa938]" />
                <span className="font-semibold text-white">{t.liveMapView}</span>
              </div>
              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#dfa938] hover:underline"
              >
                <span>{t.fullScreenMap}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <iframe
              title="Genti's Barbershop Google Map"
              src={mapEmbedUrl}
              className="w-full flex-1 border-0 filter invert-[0.88] hue-rotate-180 contrast-[1.1]"
              loading="lazy"
              allowFullScreen
            />

            {/* Quick Map Action Bar */}
            <div className="p-3.5 bg-[#141824] border-t border-[#23293a] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#8e95a5]">{t.openInNavApp}</span>
              <div className="flex items-center gap-2">
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#dfa938] text-black font-bold rounded hover:brightness-110 transition-all flex items-center gap-1.5 text-[11px]"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#1f2536] hover:bg-[#293248] text-white rounded border border-[#313c54] transition-colors flex items-center gap-1.5 text-[11px]"
                >
                  <span>Apple Maps</span>
                </a>
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#1f2536] hover:bg-[#293248] text-white rounded border border-[#313c54] transition-colors flex items-center gap-1.5 text-[11px]"
                >
                  <span>Waze</span>
                </a>
              </div>
            </div>
          </div>

          {/* Location Details & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Address Card */}
            <div className="bg-[#121622] rounded-xl p-6 border border-[#23293a] shadow-xl">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-3 bg-[#dfa938]/10 text-[#dfa938] rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#dfa938] mb-1">
                    {t.salonAddressTitle}
                  </h3>
                  <div className="text-base font-semibold text-white font-brand">
                    {SHOP_INFO.address}
                  </div>
                  <div className="text-xs text-[#8e95a5] mt-1">
                    {t.neighborhoodText}
                  </div>
                </div>
              </div>

              {/* Plus Code with Copy */}
              <div className="bg-[#171c28] p-3 rounded-lg border border-[#262e40] flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-[#788194] uppercase font-bold">{t.googlePlusCodeLabel}</div>
                  <div className="font-mono text-white text-xs mt-0.5">{SHOP_INFO.plusCode}</div>
                </div>
                <button
                  onClick={handleCopyPlusCode}
                  className="px-3 py-1.5 bg-[#202738] hover:bg-[#2a344a] text-xs text-[#c0c5d2] hover:text-white rounded border border-[#2e374c] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Call for Help / Direct Assistance */}
              <div className="mt-4 pt-4 border-t border-[#1d2332] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#8e95a5]">{t.needHelpText}</div>
                  <div className="text-sm font-bold text-white">{SHOP_INFO.phone}</div>
                </div>
                <a
                  href={`tel:${SHOP_INFO.phoneRaw}`}
                  className="px-3.5 py-2 bg-[#202738] hover:bg-[#dfa938] hover:text-black text-white text-xs font-semibold uppercase tracking-wider rounded border border-[#313c54] transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.callNowBtn}</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-[#121622] rounded-xl p-6 border border-[#23293a] shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#dfa938]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {t.openingHoursTitle}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {SHOP_INFO.workingHours.map((item: any, idx: number) => {
                  const dayName = getLocalizedText(item.day, language);
                  const hoursText = getLocalizedText(item.hours, language);
                  const isDayOff = Boolean(item.isDayOff || !item.isOpen);

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between py-2 border-b border-[#1c2230] last:border-0 ${
                        isDayOff ? 'bg-[#dfa938]/5 px-2 -mx-2 rounded' : ''
                      }`}
                    >
                      <span className={isDayOff ? 'font-bold text-[#dfa938]' : 'text-[#a0a6b5]'}>
                        {dayName}
                      </span>
                      {isDayOff ? (
                        <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#dfa938]/15 border border-[#dfa938]/40 rounded text-[#dfa938]">
                          {hoursText}
                        </span>
                      ) : (
                        <span className="font-semibold text-white tabular-nums">
                          {hoursText}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Live Status based on current day */}
              {new Date().getDay() === 2 ? (
                <div className="mt-4 pt-3 border-t border-[#1e2434] flex items-center gap-2 text-xs text-amber-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{t.todayIsTuesday}</span>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-[#1e2434] flex items-center gap-2 text-xs text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.openTodayUntil}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
