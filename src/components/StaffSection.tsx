import React from 'react';
import { Star, Award, Calendar, Scissors } from 'lucide-react';
import { BARBERS } from '../data/barbershopData';
import { getLocalizedText, getLocalizedArray } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface StaffSectionProps {
  onSelectBarberToBook: (barberId: string) => void;
}

export const StaffSection: React.FC<StaffSectionProps> = ({ onSelectBarberToBook }) => {
  const { language, t } = useLanguage();

  return (
    <section id="staff" className="py-20 bg-[#0b0d11] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#dfa938] font-bold mb-2">
            {t.staffKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-brand text-[#f4f3ee] tracking-tight mb-4">
            {t.staffTitle}
          </h2>
          <p className="text-[#a0a6b5] text-base leading-relaxed">
            {t.staffSubtitle}
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="bg-[#121622] rounded-xl overflow-hidden border border-[#23293b] hover:border-[#dfa938]/60 transition-all flex flex-col justify-between shadow-xl group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-square overflow-hidden bg-[#181d2a]">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/30 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-[#2d3548] flex items-center gap-1.5 text-xs text-white">
                    <Star className="w-3.5 h-3.5 fill-[#dfa938] text-[#dfa938]" />
                    <span className="font-bold">{barber.rating}.0</span>
                    <span className="text-[#8e95a5]">({barber.reviewCount})</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 text-xs font-semibold text-[#dfa938] flex items-center gap-1.5 drop-shadow">
                    <Award className="w-4 h-4" />
                    <span>{barber.experienceYears}+ {t.yearsCraft}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white font-brand mb-1">
                      {barber.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#dfa938] tracking-wide">
                      {getLocalizedText(barber.role, language)}
                    </div>
                  </div>

                  <p className="text-xs text-[#a0a6b5] leading-relaxed mb-5">
                    {getLocalizedText(barber.bio, language)}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase font-bold text-[#767d8f] mb-2 tracking-wider">
                      {t.staffSpecialtiesLabel}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {getLocalizedArray(barber.specialties, language).map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] text-[#c0c5d2] bg-[#181d2c] border border-[#273042] px-2 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Working Days */}
                  <div className="text-xs text-[#8e95a5] flex items-center gap-2 pt-3 border-t border-[#1d2332]">
                    <Calendar className="w-3.5 h-3.5 text-[#dfa938]" />
                    <span>{getLocalizedText(barber.workingDays, language)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectBarberToBook(barber.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-[#dfa938] hover:bg-[#eab949] active:scale-98 rounded-lg shadow-md shadow-[#dfa938]/10 transition-all cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>{t.bookWithBarber} {barber.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
