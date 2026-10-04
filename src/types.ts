export type Language = 'sq' | 'en';

export interface LocalizedString {
  sq: string;
  en: string;
}

export function getLocalizedText(item: any, lang: Language = 'sq'): string {
  if (item === null || item === undefined) return '';
  if (typeof item === 'string') return item;
  if (typeof item === 'object') {
    return item[lang] || item.sq || item.en || '';
  }
  return String(item);
}

export function getLocalizedArray(item: any, lang: Language = 'sq'): string[] {
  if (!item) return [];
  if (Array.isArray(item)) return item;
  if (typeof item === 'object') {
    if (Array.isArray(item[lang])) return item[lang];
    if (Array.isArray(item.sq)) return item.sq;
    if (Array.isArray(item.en)) return item.en;
  }
  return [];
}

export interface ServiceItem {
  id: string;
  name: LocalizedString;
  category: 'cuts' | 'beard' | 'treatments' | 'combos';
  priceALL: number;
  priceEUR: number;
  durationMinutes: number;
  description: LocalizedString;
  includes: {
    sq: string[];
    en: string[];
  };
  popular?: boolean;
}

export interface BarberStaff {
  id: string;
  name: string;
  role: LocalizedString;
  experienceYears: number;
  bio: LocalizedString;
  specialties: {
    sq: string[];
    en: string[];
  };
  image: string;
  rating: number;
  reviewCount: number;
  workingDays: LocalizedString;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  timeAgo: LocalizedString;
  text: LocalizedString;
  serviceMentioned?: LocalizedString;
  priceRange?: string;
  source: 'Google Maps';
}

export interface GalleryPhoto {
  id: string;
  title: LocalizedString | string;
  category: 'haircuts' | 'place' | 'fades' | 'interior' | string;
  imageUrl: string;
  isReservedSlot?: boolean;
  slotNumber?: number;
  caption?: LocalizedString | string;
}

export interface BookingState {
  serviceId: string;
  barberId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  notes: string;
}
