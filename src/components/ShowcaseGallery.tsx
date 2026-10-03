import React, { useState, useEffect } from 'react';
import { Camera, Eye, Upload, X } from 'lucide-react';
import { INITIAL_GALLERY } from '../data/barbershopData';
import { GalleryPhoto, getLocalizedText } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ShowcaseGallery: React.FC = () => {
  const { language, t } = useLanguage();
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('genti_gallery_photos_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (e) {
      // Storage might be restricted or corrupt, fallback safely
    }
    return INITIAL_GALLERY;
  });

  const [filter, setFilter] = useState<'all' | 'fades' | 'beard' | 'interior' | 'user'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [editingSlot, setEditingSlot] = useState<GalleryPhoto | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');

  // Persist customized slots to localStorage safely
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('genti_gallery_photos_v2', JSON.stringify(photos));
      }
    } catch (e) {
      // Ignore storage errors in restricted iframes
    }
  }, [photos]);

  const filteredPhotos = filter === 'all'
    ? photos
    : photos.filter(p => p.category === filter || (filter === 'user' && p.isReservedSlot));

  const handleSaveCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;

    setPhotos(prev =>
      prev.map(p => {
        if (p.id === editingSlot.id) {
          const titleVal = customTitle.trim() || getLocalizedText(p.title, language) || 'Custom Photo';
          return {
            ...p,
            imageUrl: customImageUrl.trim(),
            title: {
              sq: titleVal,
              en: titleVal
            },
            caption: {
              sq: 'Foto e personalizuar e shtuar nga pronari i sallonit',
              en: 'Custom barbershop photograph added by owner'
            }
          };
        }
        return p;
      })
    );

    setEditingSlot(null);
    setCustomImageUrl('');
    setCustomTitle('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingSlot) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetSlot = (slotId: string) => {
    setPhotos(prev =>
      prev.map(p => {
        if (p.id === slotId) {
          const original = INITIAL_GALLERY.find(orig => orig.id === slotId);
          return original || p;
        }
        return p;
      })
    );
    setEditingSlot(null);
  };

  const categories = [
    { id: 'all', label: t.tabAllShowcase },
    { id: 'fades', label: t.tabFades },
    { id: 'beard', label: t.tabBeard },
    { id: 'interior', label: t.tabInterior },
    { id: 'user', label: t.tabOwnerSlots },
  ];

  return (
    <section id="showcase" className="py-20 bg-[#0e1117] border-b border-[#232733] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#dfa938] font-bold mb-2">
            {t.galleryKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-brand text-[#f4f3ee] tracking-tight mb-4">
            {t.galleryTitle}
          </h2>
          <p className="text-[#a0a6b5] text-base leading-relaxed">
            {t.gallerySubtitle}
          </p>

          {/* Interactive Owner Photo Indicator Note */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#171c28] border border-[#2d3548] rounded-full text-xs text-[#c0c5d2]">
            <Camera className="w-3.5 h-3.5 text-[#dfa938]" />
            <span>{t.galleryReservedNote}</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-[#dfa938] text-black shadow-md shadow-[#dfa938]/20'
                  : 'bg-[#141824] text-[#a0a6b5] border border-[#23293a] hover:border-[#38425b] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => {
            const hasImage = Boolean(photo.imageUrl);
            const titleDisplay = getLocalizedText(photo.title, language);
            const captionDisplay = getLocalizedText(photo.caption, language) || 'Authentic craft at Genti\'s Barbershop.';

            return (
              <div
                key={photo.id}
                className="group relative bg-[#121622] rounded-xl overflow-hidden border border-[#22283a] hover:border-[#dfa938]/60 transition-all shadow-lg flex flex-col"
              >
                {/* Image Container / Placeholder */}
                <div className="relative aspect-[4/3] bg-[#161a26] overflow-hidden">
                  {hasImage ? (
                    <>
                      <img
                        src={photo.imageUrl}
                        alt={titleDisplay}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      
                      {/* Quick View Button */}
                      <button
                        onClick={() => setSelectedPhoto(photo)}
                        className="absolute bottom-3 right-3 p-2 bg-[#0b0d11]/80 hover:bg-[#dfa938] hover:text-black text-white rounded-md transition-all backdrop-blur-sm cursor-pointer"
                        title="View Full Size"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    /* Designated Reserved Slot Empty State */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#181d2c] to-[#111520] border-2 border-dashed border-[#2f394f] rounded-t-xl">
                      <div className="w-12 h-12 rounded-full bg-[#dfa938]/10 flex items-center justify-center text-[#dfa938] mb-3">
                        <Camera className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                        {t.reservedSlotEmptyTitle}{photo.slotNumber}
                      </div>
                      <p className="text-[11px] text-[#8e95a5] max-w-xs mb-4">
                        {t.reservedSlotEmptyDesc}
                      </p>
                      <button
                        onClick={() => {
                          setEditingSlot(photo);
                          setCustomTitle(titleDisplay);
                          setCustomImageUrl(photo.imageUrl);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#dfa938]/20 hover:bg-[#dfa938] text-[#dfa938] hover:text-black border border-[#dfa938]/40 rounded text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{t.addPreviewBtn}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Caption / Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white font-brand line-clamp-1">
                        {titleDisplay}
                      </h3>
                      {photo.isReservedSlot && (
                        <span className="text-[10px] font-bold text-[#dfa938] bg-[#dfa938]/10 border border-[#dfa938]/30 px-1.5 py-0.5 rounded">
                          {t.reservedBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8e95a5] leading-relaxed">
                      {captionDisplay}
                    </p>
                  </div>

                  {photo.isReservedSlot && hasImage && (
                    <div className="mt-3 pt-2 border-t border-[#1d2332] flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setEditingSlot(photo);
                          setCustomTitle(titleDisplay);
                          setCustomImageUrl(photo.imageUrl);
                        }}
                        className="text-[11px] text-[#dfa938] hover:underline cursor-pointer"
                      >
                        {t.changePhotoBtn}
                      </button>
                      <button
                        onClick={() => handleResetSlot(photo.id)}
                        className="text-[11px] text-[#71788a] hover:text-red-400 cursor-pointer"
                      >
                        {t.resetSlotBtn}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Lightbox View */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
            <div className="relative max-w-4xl w-full bg-[#121622] rounded-xl overflow-hidden border border-[#2d364c]">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-[#dfa938] hover:text-black text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={getLocalizedText(selectedPhoto.title, language)}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#0f131c]">
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

        {/* Modal for Adding / Testing Photo in Reserved Slot */}
        {editingSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#141824] rounded-xl border border-[#2e374d] max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setEditingSlot(null)}
                className="absolute top-4 right-4 text-[#8e95a5] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-white font-brand mb-2">
                {t.modalConfigureTitle}: {getLocalizedText(editingSlot.title, language)}
              </h3>
              <p className="text-xs text-[#a0a6b5] mb-5">
                {t.modalConfigureDesc}
              </p>

              <form onSubmit={handleSaveCustomPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#c0c5d2] mb-1.5">
                    {t.modalUrlLabel}
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/barbershop-cut.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full bg-[#1b2130] border border-[#2b354a] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#555f75] focus:outline-none focus:border-[#dfa938]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[1px] bg-[#22293a]" />
                  <span className="text-[10px] uppercase font-bold text-[#626c82]">{t.modalOrUpload}</span>
                  <div className="flex-1 h-[1px] bg-[#22293a]" />
                </div>

                <div>
                  <label className="flex items-center justify-center gap-2 p-3 bg-[#1b2130] hover:bg-[#222a3d] border border-dashed border-[#34405a] rounded-lg text-xs text-[#a0a6b5] cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-[#dfa938]" />
                    <span>{t.modalSelectFile}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {customImageUrl && (
                  <div className="mt-3 p-2 bg-[#0e111a] rounded-lg border border-[#232a3b]">
                    <div className="text-[10px] text-[#8e95a5] mb-1">Preview:</div>
                    <img
                      src={customImageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#c0c5d2] mb-1.5">
                    {t.modalTitleLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="p.sh. Skin Fade & Textured Crop"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full bg-[#1b2130] border border-[#2b354a] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#555f75] focus:outline-none focus:border-[#dfa938]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setEditingSlot(null)}
                    className="px-4 py-2 text-xs font-medium text-[#8e95a5] hover:text-white cursor-pointer"
                  >
                    {t.modalCancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#dfa938] hover:bg-[#eab949] rounded-md transition-colors cursor-pointer"
                  >
                    {t.modalSave}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
