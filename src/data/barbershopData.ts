import { ServiceItem, BarberStaff, CustomerReview, GalleryPhoto } from '../types';

export const SHOP_INFO = {
  name: "Genti's Barbershop",
  tagline: {
    sq: "Sallon Flokësh & Berberi Profesionale në Tiranë",
    en: "Hair Salon & Master Grooming in Tiranë"
  },
  phone: "+355 69 518 8660",
  phoneRaw: "+355695188660",
  phoneDigitsOnly: "355695188660",
  address: "Rruga Demneri, Tiranë 1000, Albania",
  plusCode: "8QGH+CQ Tiranë, Albania",
  lat: 41.3260836,
  lng: 19.7794229,
  googleMapsUrl: "https://www.google.com/maps/place/Genti's+Barbershop/@41.3260836,19.7794229,17z/data=!3m1!4b1!4m6!3m5!1s0x135031a8e5ff7845:0x94cb57384479f1e8!8m2!3d41.3260836!4d19.7794229!16s%2Fg%2F11v5t3nyrw",
  rating: 5.0,
  reviewsCount: 9,
  priceTier: "ALL 500 – 1,000",
  workingHours: [
    { day: { sq: "E Hënë", en: "Monday" }, hours: { sq: "09:00 AM – 10:00 PM", en: "09:00 AM – 10:00 PM" }, isOpen: true },
    { day: { sq: "E Martë", en: "Tuesday" }, hours: { sq: "PUSHIM (Ditë Pushimi)", en: "CLOSED (Day Off)" }, isOpen: false, isDayOff: true },
    { day: { sq: "E Mërkurë", en: "Wednesday" }, hours: { sq: "09:00 AM – 10:00 PM", en: "09:00 AM – 10:00 PM" }, isOpen: true },
    { day: { sq: "E Enjte", en: "Thursday" }, hours: { sq: "09:00 AM – 10:00 PM", en: "09:00 AM – 10:00 PM" }, isOpen: true },
    { day: { sq: "E Premte", en: "Friday" }, hours: { sq: "09:00 AM – 10:00 PM", en: "09:00 AM – 10:00 PM" }, isOpen: true },
    { day: { sq: "E Shtunë", en: "Saturday" }, hours: { sq: "09:00 AM – 10:00 PM", en: "09:00 AM – 10:00 PM" }, isOpen: true },
    { day: { sq: "E Diel", en: "Sunday" }, hours: { sq: "10:00 AM – 08:00 PM", en: "10:00 AM – 08:00 PM" }, isOpen: true },
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: "classic-haircut",
    name: {
      sq: "Qethje Klasike me Gërshërë & Makinë",
      en: "Classic Master Haircut"
    },
    category: "cuts",
    priceALL: 700,
    priceEUR: 7,
    durationMinutes: 30,
    description: {
      sq: "Qethje e personalizuar me gërshërë dhe makinë sipas formës së kokës, pastrim me brisk në qafë dhe stilim me pomadë matte profesionale.",
      en: "Precision scissor & clipper haircut tailored to your head shape, neck taper, hairline detailing, and premium matte or pomade finish."
    },
    includes: {
      sq: ["Konsultim & sugjerim stili", "Qethje precize me gërshërë & makinë", "Pastrim qafe me brisk", "Tharje & produkt cilësor stilimi"],
      en: ["Consultation & style advice", "Precision cut & scissor work", "Razor neck cleanup", "Blow dry & premium styling product"]
    },
    popular: true
  },
  {
    id: "skin-fade",
    name: {
      sq: "Skin Fade / Taper me Brisk & Shaver",
      en: "Signature Skin Fade / Taper"
    },
    category: "cuts",
    priceALL: 800,
    priceEUR: 8,
    durationMinutes: 40,
    description: {
      sq: "Gradim i përkryer nga lëkura zero drejt gjatësisë së dëshiruar (Low, Mid, High, ose Drop Fade) me rrojë elektrike me fletë dhe vijëzim të mprehtë.",
      en: "Flawless transition from bare skin to desired length (Low, Mid, High, or Drop Fade) with foil shavers and crisp boundary alignment."
    },
    includes: {
      sq: ["Gradim me shaver / zero", "Tranzicion i qetë dhe uniform", "Vijëzim konturesh me brisk", "Freskim me aftershave qetësues"],
      en: ["Zero / foil shaver graduation", "Seamless gradient blending", "Razor edge lineup", "Cooling aftershave splash"]
    },
    popular: true
  },
  {
    id: "beard-sculpt-razor",
    name: {
      sq: "Rregullim Mjekre & Kontur me Brisk",
      en: "Beard Sculpting & Razor Lineup"
    },
    category: "beard",
    priceALL: 500,
    priceEUR: 5,
    durationMinutes: 25,
    description: {
      sq: "Krasitje dhe dhënie forme mjekrës, linjëzim në mollëza dhe qafë me brisk të hapur tradicional dhe trajtim me vaj ushqyes.",
      en: "Full beard reshaping, length gradient, cheek & neck lineup using a traditional straight razor, accompanied by nourishing beard oil."
    },
    includes: {
      sq: ["Rregullim simetrik i gjatësisë", "Aplikim peshqiri me avull", "Linjëzim i mprehtë me brisk", "Vaj organik sandali për mjekrën"],
      en: ["Beard symmetry trim", "Hot towel application", "Straight razor edge definition", "Organic sandalwood beard oil"]
    },
    popular: true
  },
  {
    id: "royal-shave",
    name: {
      sq: "Rrojë Mbretërore me Peshqir të Nxehtë",
      en: "Traditional Hot Towel Wet Shave"
    },
    category: "beard",
    priceALL: 600,
    priceEUR: 6,
    durationMinutes: 30,
    description: {
      sq: "Një ritual i vërtetë berberi. Peshqirë të nxehtë me eukalipt, shkumë e ngrohtë me furçë, rrëshqitje e lehtë e tehut njëpërdorimësh dhe peshqir i ftohtë mbyllës poresh.",
      en: "An authentic barber ritual. Steamed eucalyptus towels, rich warm lather, single-blade glide, and ice-cold pore closing towel."
    },
    includes: {
      sq: ["Balsam ushqyes para rrojës", "Peshqir i dyfishtë me avull", "Teh steril me një përdorim", "Peshqir i ftohtë & gur fshehës"],
      en: ["Pre-shave essential balm", "Double hot towel steam", "Single-use sterile razor blade", "Soothing alum & cold towel"]
    }
  },
  {
    id: "hair-straightening",
    name: {
      sq: "Drejtim Flokësh & Trajtim Keratine",
      en: "Hair Straightening & Keratin Care"
    },
    category: "treatments",
    priceALL: 1200,
    priceEUR: 12,
    durationMinutes: 45,
    description: {
      sq: "Siç theksohet nga vlerësimet e klientëve tanë, drejtimi profesional me keratinë eliminon elektrizimin dhe kaçurrelat e forta, duke dhënë flokë të lëmuar për javë të tëra.",
      en: "As highlighted in customer reviews, professional keratin smoothing relaxes unruly curls and frizz for a sleek, manageable finish lasting weeks."
    },
    includes: {
      sq: ["Larje e thellë pastruese e skalpit", "Trajtim zbutës me keratinë", "Drejtim termik me pjastër", "Këshilla për mirëmbajtje"],
      en: ["Deep clarifying scalp wash", "Keratin smoothing treatment", "Thermal seal styling", "Take-home care advice"]
    }
  },
  {
    id: "royal-combo",
    name: {
      sq: "Paketa Mbretërore Genti (Qethje + Mjekër)",
      en: "The Genti Royal Experience (Cut + Beard)"
    },
    category: "combos",
    priceALL: 1200,
    priceEUR: 12,
    durationMinutes: 55,
    description: {
      sq: "Kujdesi i plotë për zotërinj. Qethje e zgjedhur, rregullim i plotë i mjekrës me brisk, ritual me peshqir të nxehtë me avull, larje koke dhe stilim.",
      en: "The complete grooming overhaul. Signature haircut of your choice, full beard trim and straight razor lineup, hot towel treatment, and head wash."
    },
    includes: {
      sq: ["Qethje e plotë & skin fade", "Mjekër & kontur me brisk", "Ritual me peshqir të nxehtë me avull", "Larje koke me masazh skalpi", "Parfum & stilim final"],
      en: ["Full haircut & skin fade", "Beard sculpt & razor lineup", "Eucalyptus hot towel ritual", "Invigorating hair wash & massage", "Signature scent finish"]
    },
    popular: true
  },
  {
    id: "kids-haircut",
    name: {
      sq: "Qethje për Djem (Fëmijë nën 12 vjeç)",
      en: "Junior Gent Cut (Under 12)"
    },
    category: "cuts",
    priceALL: 500,
    priceEUR: 5,
    durationMinutes: 25,
    description: {
      sq: "Qethje e durueshme, miqësore dhe plot stil për djemtë e vegjël në një ambient mikpritës ku fëmijët ndihen rehat.",
      en: "Patient, friendly, and stylish cuts for younger gentlemen in a welcoming atmosphere that kids enjoy."
    },
    includes: {
      sq: ["Qethje e kujdesshme me gërshërë", "Stilim i bukur me xhel/krem", "Ëmbëlsirë e vogël dhuratë"],
      en: ["Gentle clipper / scissor trim", "Fun textured styling", "Complimentary treat"]
    }
  },
  {
    id: "wash-styling",
    name: {
      sq: "Larje Koke, Masazh Skalpi & Tharje",
      en: "Wash, Scalp Massage & Blowdry"
    },
    category: "treatments",
    priceALL: 400,
    priceEUR: 4,
    durationMinutes: 20,
    description: {
      sq: "Rifreskim ideal para një takimi ose eventi me larje të dyfishtë me mente freskuese, masazh çlodhës të skalpit dhe tharje me stilim.",
      en: "Refresh between events with a double clarifying wash, stimulating peppermint scalp massage, and expert heat blowdry."
    },
    includes: {
      sq: ["Larje e dyfishtë e thellë", "Masazh relaksues i kokës", "Stilim me dyll mat ose krem"],
      en: ["Double cleansing wash", "Peppermint scalp massage", "Matte clay or cream finish"]
    }
  }
];

export const BARBERS: BarberStaff[] = [
  {
    id: "genti",
    name: "Genti",
    role: {
      sq: "Themelues & Kryeberber",
      en: "Founder & Master Barber"
    },
    experienceYears: 12,
    bio: {
      sq: "Mjeshtri pas emrit të sallonit. I njohur në Tiranë për gjeometri precize me gërshërë, skin fade të kristalta me brisk dhe një mikpritje të ngrohtë që e bën çdo klient të kthehet me dëshirë.",
      en: "The artisan behind the shop name. Renowned across Tirana for precision scissor geometry, razor-sharp skin fades, and hospitable warmth that turns first-time visitors into loyal regulars."
    },
    specialties: {
      sq: ["Skin Fade me Brisk", "Rrojë me Peshqir të Nxehtë", "Ribërje Stili", "Konture Precize"],
      en: ["Signature Skin Fades", "Hot Towel Shaves", "Hair Restyling", "Precision Lineups"]
    },
    image: "/src/assets/images/master_barber_genti_1791034410747.jpg",
    rating: 5.0,
    reviewCount: 9,
    workingDays: {
      sq: "Hën, Mër – Diel (E Martë Pushim)",
      en: "Mon, Wed – Sun (Closed Tuesday)"
    }
  },
  {
    id: "klodi",
    name: "Klodi",
    role: {
      sq: "Berber i Lartë & Specialist Teksture",
      en: "Senior Barber & Texture Specialist"
    },
    experienceYears: 8,
    bio: {
      sq: "Ekspert i prerjeve moderne evropiane me teksturë, taper fade dhe drejtimit të flokëve me keratinë. Siguron që çdo prerje të përshtatet me densitetin e flokut dhe tiparet e fytyrës.",
      en: "Master of modern European texturizing, taper fades, and keratin hair straightening. Klodi ensures every cut seamlessly balances hair density and facial features."
    },
    specialties: {
      sq: ["Drejtim Flokësh me Keratinë", "Low & Drop Fade", "Skulpturë Mjekre", "Modern Crop"],
      en: ["Hair Straightening / Keratin", "Low & Drop Fades", "Beard Sculpting", "Modern Crops"]
    },
    image: "/src/assets/images/barber_fade_cut_1791034388098.jpg",
    rating: 5.0,
    reviewCount: 7,
    workingDays: {
      sq: "Hën, Mër – Diel (E Martë Pushim)",
      en: "Mon, Wed – Sun (Closed Tuesday)"
    }
  },
  {
    id: "any",
    name: "Karrigia e Parë e Lirë",
    role: {
      sq: "Berberi i Parë i Disponueshëm",
      en: "First Available Master Barber"
    },
    experienceYears: 10,
    bio: {
      sq: "Mjeshtëri e garantuar e nivelit të lartë nga berberi që lirohet i pari në karriget tona në Rruga Demneri. Ideale kur keni orar të ngjeshur.",
      en: "Guaranteed top-tier craftsmanship with whoever is next available at our Rruga Demneri chairs. Perfect for tight schedules."
    },
    specialties: {
      sq: ["Të Gjitha Shërbimet", "Shërbim i Shpejtë"],
      en: ["All Services", "Prompt Turnaround"]
    },
    image: "/src/assets/images/barbershop_hero_1791034374636.jpg",
    rating: 5.0,
    reviewCount: 9,
    workingDays: {
      sq: "6 Ditë në Javë (E Martë Pushim)",
      en: "6 Days a Week (Closed Tuesday)"
    }
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Elkjon Tervoli",
    rating: 5.0,
    timeAgo: { sq: "2 muaj më parë", en: "2 months ago" },
    text: {
      sq: "Berber me super aftësi! Bën qethje të jashtëzakonshme në një atmosferë fantastike. E rekomandoj pa hezitim!",
      en: "Super skilled barber! Delivers amazing haircuts in a great atmosphere. Highly recommended"
    },
    priceRange: "ALL 500–1,000",
    source: "Google Maps"
  },
  {
    id: "rev-2",
    author: "26 Ba6aj",
    rating: 5.0,
    timeAgo: { sq: "2 muaj më parë", en: "2 months ago" },
    text: {
      sq: "Berberë shumë të mirë. Çmime të drejta, vëmendje maksimale ndaj detajeve dhe shërbim me cilësi të lartë.",
      en: "Very good barbers. Fair prices, great attention to detail, and top quality service."
    },
    priceRange: "ALL 500–1,000",
    source: "Google Maps"
  },
  {
    id: "rev-3",
    author: "meni meni",
    rating: 5.0,
    timeAgo: { sq: "2 muaj më parë", en: "2 months ago" },
    text: {
      sq: "Sallon berberi i klasit të lartë, e adhuroj!",
      en: "high class barbershop , i love it"
    },
    source: "Google Maps"
  },
  {
    id: "rev-4",
    author: "Ana maria Barnescu",
    rating: 5.0,
    timeAgo: { sq: "2 muaj më parë", en: "2 months ago" },
    text: {
      sq: "Qethje shumë e bukur dhe njerëz shumë miqësorë. Ndihesh si në shtëpi.",
      en: "Nice haircut and very friendly people. Felt right at home."
    },
    source: "Google Maps"
  },
  {
    id: "rev-5",
    author: "Denis Balla",
    rating: 5.0,
    timeAgo: { sq: "2 vite më parë", en: "2 years ago" },
    text: {
      sq: "Sallon i përkryer! Shërbimet: Stilim flokësh, Drejtim flokësh me keratinë.",
      en: "Perfect barbershop ! Services: Hairstyling, Hair straightening."
    },
    serviceMentioned: {
      sq: "Stilim flokësh, Drejtim flokësh me keratinë",
      en: "Hairstyling, Hair straightening"
    },
    source: "Google Maps"
  },
  {
    id: "rev-6",
    author: "Krist Master",
    rating: 5.0,
    timeAgo: { sq: "3 muaj më parë", en: "3 months ago" },
    text: {
      sq: "Vendi më i mirë në lagje. Qethje me saktësi kirurgjikale dhe atmosferë e vërtetë berberane.",
      en: "Best spot in the neighborhood. Top precision cuts and authentic barber vibe."
    },
    priceRange: "ALL 500–1,000",
    source: "Google Maps"
  },
  {
    id: "rev-7",
    author: "Erikson Gjidiaj",
    rating: 5.0,
    timeAgo: { sq: "3 vite më parë", en: "3 years ago" },
    text: {
      sq: "Shërbim profesional, gjithmonë konsistent, pajisje të pastra dhe mikpritje shqiptare.",
      en: "Professional service, always consistent, clean equipment and friendly hospitality."
    },
    source: "Google Maps"
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: {
      sq: "Skin Fade Preciz & Stilim Teksturë",
      en: "Precision Skin Fade & Textured Top"
    },
    category: "haircuts",
    imageUrl: "/src/assets/images/barber_fade_cut_1791034388098.jpg",
    caption: {
      sq: "Gradim i pastër nga zero me gërshërë e makinë dhe stilim me pomadë mat.",
      en: "Clean razor taper gradient with styled matte clay finish."
    }
  },
  {
    id: "gal-2",
    title: {
      sq: "Mid Skin Fade & Modern Crop",
      en: "Mid Skin Fade & Textured Crop"
    },
    category: "haircuts",
    imageUrl: "/src/assets/images/barber_taper_fade_1791107232800.jpg",
    caption: {
      sq: "Konturim i përkryer i vijës së flokut dhe prerje me teksturë evropiane.",
      en: "Sharp hairline geometry and European modern texture."
    }
  },
  {
    id: "gal-3",
    title: {
      sq: "Low Taper Fade & Pompadour Klasik",
      en: "Low Taper Fade & Classic Pompadour"
    },
    category: "haircuts",
    imageUrl: "/src/assets/images/barber_classic_cut_1791107259230.jpg",
    caption: {
      sq: "Stil elegant pa kohë me shkrirje të butë dhe linja të pastra qafe.",
      en: "Timeless gentleman style with seamless blend and crisp neck taper."
    }
  },
  {
    id: "gal-4",
    title: {
      sq: "Ambjenti & Salloni në Rruga Demneri",
      en: "The Barbershop Atmosphere at Rruga Demneri"
    },
    category: "place",
    imageUrl: "/src/assets/images/barbershop_hero_1791034374636.jpg",
    caption: {
      sq: "Karrige lëkure komode, pasqyra të ndriçuara dhe mikpritje tradicionale në Tiranë.",
      en: "Classic leather barber chairs, warm lighting, and authentic Tirana hospitality."
    }
  },
  {
    id: "gal-5",
    title: {
      sq: "Karriget Klasike & Stacionet e Punës",
      en: "Classic Stations & Grooming Interior"
    },
    category: "place",
    imageUrl: "/src/assets/images/barbershop_interior_place_1791107246733.jpg",
    caption: {
      sq: "Pajisje profesionale, higjienë e patëmetë dhe ambient relaksues për çdo klient.",
      en: "Pristine sanitation, premium tools, and a relaxed environment for every gentleman."
    }
  }
];

export const TIME_SLOTS = [
  "09:30 AM", "10:15 AM", "11:00 AM", "11:45 AM",
  "12:30 PM", "01:30 PM", "02:15 PM", "03:00 PM",
  "03:45 PM", "04:30 PM", "05:15 PM", "06:00 PM",
  "06:45 PM", "07:30 PM", "08:15 PM", "09:00 PM"
];
