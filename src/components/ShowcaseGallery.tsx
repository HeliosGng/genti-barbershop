import React, { useState } from 'react';
import { Eye, X, Scissors, MapPin } from 'lucide-react';
import { INITIAL_GALLERY } from '../data/barbershopData';
import { GalleryPhoto, getLocalizedText } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ShowcaseGallery: React.FC = () => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'haircuts' | 'place'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { id: 'all', label: t.tabAllShowcase },
    { id: 'haircuts', label: t.tabHaircuts },
    { id: 'place', label: t.tabPlace },
  ];

  const filteredPhotos = INITIAL_GALLERY.filter((photo) => {
    if (filter === 'all') return true;
    if (filter === 'haircuts') return photo.category === 'haircuts' || photo.category === 'fades';
    if (filter === 'place') return photo.category === 'place' || photo.category === 'interior';
    return true;
  });

  return (
    <section id="showcase" className="py-12 sm:py-20 bg-[#0e1117] border-b border-[#232733] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs uppercase tracking-widest text-[#dfa938] font-bold mb-1.5">
            {t.galleryKicker}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-brand text-[#f4f3ee] tracking-tight mb-2.5">
            {t.galleryTitle}
          </h2>
          <p className="text-[#a0a6b5] text-xs sm:text-base leading-relaxed">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Filter Controls: Only All, Haircuts, The Place */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap mb-6 sm:mb-10">
          {categories.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#dfa938] text-black shadow-lg shadow-[#dfa938]/25 scale-[1.02]'
                    : 'bg-[#141824] text-[#a0a6b5] border border-[#23293a] hover:border-[#3d475f] hover:text-white'
                }`}
              >
                {cat.id === 'haircuts' && <Scissors className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                {cat.id === 'place' && <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid: 2 columns on mobile for zoomed-out spacious feel */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredPhotos.map((photo) => {
            const titleDisplay = getLocalizedText(photo.title, language);
            const captionDisplay = getLocalizedText(photo.caption, language);
            const isHaircut = photo.category === 'haircuts' || photo.category === 'fades';

            return (
              <div
                key={photo.id}
                className="group relative bg-[#121622] rounded-lg sm:rounded-xl overflow-hidden border border-[#22283a] hover:border-[#dfa938]/60 transition-all duration-300 shadow-md sm:shadow-xl flex flex-col cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-[#161a26] overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={titleDisplay}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Category Pill */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/75 backdrop-blur-md border border-white/10 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#dfa938]">
                      {isHaircut ? (
                        <>
                          <Scissors className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#dfa938]" />
                          <span>{t.tabHaircuts}</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#dfa938]" />
                          <span>{t.tabPlace}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Hover Quick View Icon */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-1.5 sm:p-2 bg-[#0b0d11]/85 group-hover:bg-[#dfa938] group-hover:text-black text-white rounded-md sm:rounded-lg transition-all backdrop-blur-sm shadow-md">
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Card Caption */}
                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white font-brand mb-0.5 sm:mb-1 group-hover:text-[#dfa938] transition-colors line-clamp-1">
                      {titleDisplay}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#8e95a5] line-clamp-2 leading-relaxed">
                      {captionDisplay}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121622] border border-[#2b3347] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={getLocalizedText(selectedPhoto.title, language)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2.5 bg-black/60 hover:bg-[#dfa938] hover:text-black text-white rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 bg-[#121622]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#dfa938] bg-[#dfa938]/10 px-2 py-0.5 rounded border border-[#dfa938]/30">
                  {selectedPhoto.category === 'haircuts' || selectedPhoto.category === 'fades'
                    ? t.tabHaircuts
                    : t.tabPlace}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-brand mb-1">
                {getLocalizedText(selectedPhoto.title, language)}
              </h3>
              <p className="text-xs text-[#a0a6b5]">
                {getLocalizedText(selectedPhoto.caption, language)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
