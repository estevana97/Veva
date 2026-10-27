// Central content file: edit categories, experiences, tiers, points and images here.

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  homeHero: img("1587174486073-ae5e5cff23aa"),
  community: img("1528605248644-14dd04022da1"),
  about: img("1414235077428-338989a2e8c0"),
};

// Véva Points rules
export const points = {
  perReservation: 50, // earned for every booking, regardless of spend
  premiumBonus: 50, // extra for premium bookings such as chef's tables
  perEuro: 1, // earned after the visit, once the venue scans the QR code
};

export const reservationPoints = (e: Experience) =>
  points.perReservation + (e.premium ? points.premiumBonus : 0);

export type CategorySlug = "dining" | "sports" | "culture" | "wellness";

export type Group = { id: string; name: string; intro: string };

export type Category = {
  slug: CategorySlug;
  name: string;
  label: string;
  intro: string;
  image: string;
  groups: Group[];
};

export const categories: Category[] = [
  {
    slug: "dining",
    name: "Dining",
    label: "Fine dining & culinary",
    intro:
      "Reserve Michelin-starred tables, chef's tables and the most talked-about pop-ups, or join a wine pairing dinner or a cooking class with a top chef.",
    image: img("1517248135467-4c7edcad34c4"),
    groups: [
      { id: "fine-dining", name: "Fine dining & chef's tables", intro: "Michelin-starred restaurants and exclusive chef's tables." },
      { id: "pop-up-brunch", name: "Pop-ups & brunch", intro: "Trendy pop-up restaurants and refined weekend brunch spots." },
      { id: "wine-culinary", name: "Wine & culinary", intro: "Wine tastings, pairing dinners and cooking classes." },
    ],
  },
  {
    slug: "sports",
    name: "Sports",
    label: "Races & recreational",
    intro:
      "Secure your start at marathons and iron-distance triathlons, or book tee times, padel and tennis courts at the Netherlands' finest clubs.",
    image: img("1535131749006-b7f58c99034b"),
    groups: [
      { id: "races", name: "Races", intro: "Marathons, triathlons and Ironman-distance races, with hospitality packages." },
      { id: "recreational", name: "Recreational", intro: "Golf, padel and tennis: courts, tee times, lessons and tournaments." },
    ],
  },
  {
    slug: "culture",
    name: "Culture",
    label: "Art, stage & festivals",
    intro:
      "Private museum tours and art viewings, the best seats at the theatre, opera and concerts, and VIP access to festivals and galas.",
    image: img("1518998053901-5348d3961a04"),
    groups: [
      { id: "museums-art", name: "Museums & art", intro: "Private tours, skip-the-line access, private viewings and workshops." },
      { id: "performances", name: "Theatre, opera & concerts", intro: "Premium seats and private boxes for live performances." },
      { id: "festivals-galas", name: "Festivals & galas", intro: "VIP festival access and exclusive cultural evenings." },
    ],
  },
  {
    slug: "wellness",
    name: "Wellness",
    label: "Health & wellbeing",
    intro:
      "Restore body and mind with exclusive spa treatments, private sauna suites, yoga and breathwork day retreats, and personal training.",
    image: img("1544161515-4ab6ce6db874"),
    groups: [
      { id: "spa", name: "Spa & treatments", intro: "Signature massages, facials and private wellness suites." },
      { id: "mind", name: "Yoga & mindfulness", intro: "Yoga, breathwork and meditation sessions and day retreats." },
      { id: "training", name: "Personal training", intro: "One-to-one sessions with experienced coaches." },
    ],
  },
];

export type Booking =
  // Recurring availability: guest picks a date and a time slot
  | { kind: "slot"; times: string[]; maxGuests: number; unit: string }
  // Fixed-date event: guest picks a ticket type and quantity
  | { kind: "event"; date: string; tickets: { name: string; price: number }[]; maxGuests: number };

export type Experience = {
  slug: string;
  category: CategorySlug;
  group: string;
  title: string;
  venue: string;
  city: string;
  priceFrom: number;
  priceNote: string;
  summary: string;
  description: string;
  highlights: string[];
  image: string;
  premium?: boolean; // earns the premium Véva Points bonus
  booking: Booking;
};

export const experiences: Experience[] = [
  // Dining: fine dining & chef's tables
  {
    slug: "chefs-table-amsterdam",
    category: "dining",
    group: "fine-dining",
    title: "Chef's table tasting menu",
    venue: "Atelier Noord",
    city: "Amsterdam",
    priceFrom: 145,
    priceNote: "per person",
    summary: "Seven courses served at the kitchen counter, paired with natural wines.",
    description:
      "Take a seat at the counter and watch the brigade at work. The seasonal seven-course menu celebrates Dutch produce, with optional wine pairing selected by the sommelier.",
    highlights: ["Seven-course seasonal menu", "Optional wine pairing", "Welcome glass of champagne for Véva members"],
    image: img("1414235077428-338989a2e8c0"),
    premium: true,
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "20:30", "21:00"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "starred-tasting-utrecht",
    category: "dining",
    group: "fine-dining",
    title: "Michelin-starred tasting menu",
    venue: "Huis aan de Vecht",
    city: "Utrecht",
    priceFrom: 185,
    priceNote: "per person",
    summary: "A starred dining room on the river, with a nine-course discovery menu.",
    description:
      "An intimate starred restaurant in a historic canal house. The discovery menu changes with the seasons and can be paired with wines or house-made non-alcoholic pairings.",
    highlights: ["Nine-course discovery menu", "Wine or non-alcoholic pairing", "Kitchen visit between courses"],
    image: img("1559339352-11d035aa65de"),
    premium: true,
    booking: { kind: "slot", times: ["18:30", "19:00", "19:30", "20:00"], maxGuests: 6, unit: "Guests" },
  },

  // Dining: pop-ups & brunch
  {
    slug: "pop-up-dinner-rotterdam",
    category: "dining",
    group: "pop-up-brunch",
    title: "Pop-up dinner series",
    venue: "Studio Maashaven",
    city: "Rotterdam",
    priceFrom: 85,
    priceNote: "per person",
    summary: "A rotating guest chef cooks a one-night-only menu in a harbour studio.",
    description:
      "Each month a different rising chef takes over this harbour studio for a limited series of dinners. Long shared tables, a surprise menu and a crowd of food lovers.",
    highlights: ["Surprise five-course menu", "Different guest chef every month", "Limited to 40 seats per night"],
    image: img("1555396273-367ea4eb4db5"),
    booking: {
      kind: "event",
      date: "2027-03-20",
      tickets: [
        { name: "Dinner", price: 85 },
        { name: "Dinner + wine pairing", price: 125 },
      ],
      maxGuests: 6,
    },
  },
  {
    slug: "brasserie-brunch-the-hague",
    category: "dining",
    group: "pop-up-brunch",
    title: "Sunday brasserie brunch",
    venue: "Maison Lange Voorhout",
    city: "The Hague",
    priceFrom: 55,
    priceNote: "per person",
    summary: "Champagne brunch in an elegant brasserie beneath the lime trees.",
    description:
      "A long, unhurried weekend brunch of oysters, eggs Benedict and patisserie in one of the city's most elegant dining rooms.",
    highlights: ["Glass of champagne included", "Seafood and patisserie", "Window tables for Gold members"],
    image: img("1533089860892-a7c6f0a88666"),
    booking: { kind: "slot", times: ["10:30", "11:00", "11:30", "12:30", "13:00"], maxGuests: 10, unit: "Guests" },
  },

  // Dining: wine & culinary
  {
    slug: "wine-pairing-dinner-maastricht",
    category: "dining",
    group: "wine-culinary",
    title: "Wine & dine pairing evening",
    venue: "Wijnhuis Sint Pieter",
    city: "Maastricht",
    priceFrom: 120,
    priceNote: "per person",
    summary: "A sommelier-led tasting in the cellar, followed by a paired dinner.",
    description:
      "Start in the vaulted cellar with a guided tasting of Limburg and Burgundy wines, then move upstairs for a four-course dinner paired by the sommelier.",
    highlights: ["Cellar tasting of six wines", "Four-course paired dinner", "Meet the sommelier"],
    image: img("1510812431401-41d2bd2722f3"),
    premium: true,
    booking: { kind: "slot", times: ["18:00", "19:00"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "cooking-class-amsterdam",
    category: "dining",
    group: "wine-culinary",
    title: "Cooking class with a chef",
    venue: "Kookatelier Oost",
    city: "Amsterdam",
    priceFrom: 135,
    priceNote: "per person",
    summary: "Cook a three-course menu alongside an award-winning chef.",
    description:
      "In a professional kitchen, learn the techniques behind a three-course fine-dining menu, then sit down together to enjoy what you made with matching wines.",
    highlights: ["Hands-on, maximum 12 guests", "Recipes to take home", "Dinner and wines included"],
    image: img("1556910103-1c02745aae4d"),
    booking: { kind: "slot", times: ["11:00", "17:30"], maxGuests: 6, unit: "Guests" },
  },

  // Sports: races
  {
    slug: "amsterdam-city-marathon",
    category: "sports",
    group: "races",
    title: "Amsterdam city marathon",
    venue: "Olympic Stadium start",
    city: "Amsterdam",
    priceFrom: 110,
    priceNote: "per runner",
    summary: "Start and finish in the Olympic Stadium, through the heart of the city.",
    description:
      "Run past canals, windmills and the Amstel river. Hospitality packages include a heated lounge, massage and a private finish-area meeting point for friends and family.",
    highlights: ["Guaranteed start number", "VIP lounge and massage", "Finisher photo package"],
    image: img("1452626038306-9aae5e071dd3"),
    booking: {
      kind: "event",
      date: "2027-10-17",
      tickets: [
        { name: "Marathon start", price: 110 },
        { name: "Half marathon start", price: 75 },
        { name: "Marathon + hospitality", price: 295 },
      ],
      maxGuests: 6,
    },
  },
  {
    slug: "iron-distance-triathlon-almere",
    category: "sports",
    group: "races",
    title: "Iron-distance triathlon",
    venue: "Weerwater",
    city: "Almere",
    priceFrom: 450,
    priceNote: "per athlete",
    summary: "3.8 km swim, 180 km bike and 42.2 km run on fast, flat Dutch roads.",
    description:
      "One of Europe's longest-running iron-distance races. Véva packages include bike transport, a recovery suite and a reserved spectator area.",
    highlights: ["Full and half distance", "Bike transport service", "Recovery suite access"],
    image: img("1530549387789-4c1017266635"),
    premium: true,
    booking: {
      kind: "event",
      date: "2027-09-11",
      tickets: [
        { name: "Full distance", price: 450 },
        { name: "Half distance", price: 260 },
        { name: "Spectator hospitality", price: 85 },
      ],
      maxGuests: 4,
    },
  },
  {
    slug: "rotterdam-spring-marathon",
    category: "sports",
    group: "races",
    title: "Spring marathon over the Erasmus Bridge",
    venue: "Coolsingel",
    city: "Rotterdam",
    priceFrom: 95,
    priceNote: "per runner",
    summary: "A fast course with an unforgettable crossing of the Erasmus Bridge.",
    description:
      "The flat route and roaring crowds make this a favourite for personal bests. Choose the full marathon or the 10 km, with optional pacing groups.",
    highlights: ["Marathon and 10 km", "Pacing groups", "Post-race brunch for members"],
    image: img("1541252260730-0412e8e2108e"),
    booking: {
      kind: "event",
      date: "2027-04-11",
      tickets: [
        { name: "Marathon start", price: 95 },
        { name: "10 km start", price: 40 },
      ],
      maxGuests: 6,
    },
  },

  // Sports: recreational
  {
    slug: "golf-tee-time-hilversum",
    category: "sports",
    group: "recreational",
    title: "18-hole tee time",
    venue: "Heidegolf Club",
    city: "Hilversum",
    priceFrom: 120,
    priceNote: "per player",
    summary: "Play a classic heathland course between pine forests.",
    description:
      "A historic heathland layout winding through pines and heather. Members of Véva enjoy guaranteed weekend tee times and access to the clubhouse terrace.",
    highlights: ["18 holes with buggy option", "Practice range included", "Clubhouse lunch voucher"],
    image: img("1535131749006-b7f58c99034b"),
    booking: { kind: "slot", times: ["08:00", "08:40", "09:20", "10:00", "13:00", "14:20"], maxGuests: 4, unit: "Players" },
  },
  {
    slug: "golf-clinic-noordwijk",
    category: "sports",
    group: "recreational",
    title: "Private golf lesson on the links",
    venue: "Duinen Golf",
    city: "Noordwijk",
    priceFrom: 95,
    priceNote: "per player",
    summary: "A private lesson with a PGA professional on a seaside links.",
    description:
      "Sharpen your game with a PGA professional on a true links course in the dunes, followed by nine holes to put it into practice.",
    highlights: ["Two-hour private coaching", "Nine holes after the lesson", "Video swing analysis"],
    image: img("1587174486073-ae5e5cff23aa"),
    booking: { kind: "slot", times: ["09:00", "11:00", "14:00"], maxGuests: 4, unit: "Players" },
  },
  {
    slug: "padel-court-amsterdam",
    category: "sports",
    group: "recreational",
    title: "Indoor padel court",
    venue: "Padel Club Zuid",
    city: "Amsterdam",
    priceFrom: 48,
    priceNote: "per court, 90 min",
    summary: "Premium panoramic courts with a lounge, pro shop and racket rental.",
    description:
      "Book a 90-minute session on a panoramic glass court. Add a coaching clinic, racket rental or post-match drinks in the lounge.",
    highlights: ["Panoramic glass courts", "Racket and ball rental", "Optional pro clinic"],
    image: img("1626224583764-f87db24ac4ea"),
    booking: { kind: "slot", times: ["07:00", "08:30", "12:00", "17:30", "19:00", "20:30"], maxGuests: 4, unit: "Players" },
  },
  {
    slug: "padel-tournament-utrecht",
    category: "sports",
    group: "recreational",
    title: "Véva padel tournament",
    venue: "Padel Park Utrecht",
    city: "Utrecht",
    priceFrom: 65,
    priceNote: "per player",
    summary: "A social doubles tournament for members, with dinner and prizes.",
    description:
      "Compete in a relaxed but competitive doubles tournament for all levels, followed by a dinner and prize ceremony in the clubhouse.",
    highlights: ["Matched by level", "Dinner and drinks included", "Bonus Véva Points for the winners"],
    image: img("1612872087720-bb876e2e67d1"),
    booking: {
      kind: "event",
      date: "2027-05-22",
      tickets: [
        { name: "Player", price: 65 },
        { name: "Dinner only (guest)", price: 45 },
      ],
      maxGuests: 2,
    },
  },
  {
    slug: "tennis-court-laren",
    category: "sports",
    group: "recreational",
    title: "Tennis court & private lesson",
    venue: "Tennispark De Brink",
    city: "Laren",
    priceFrom: 40,
    priceNote: "per court, 60 min",
    summary: "Clay courts in a leafy village club, with optional coaching.",
    description:
      "Play on well-kept clay courts at a classic village club. Add a private lesson with a club pro and finish on the terrace.",
    highlights: ["Clay courts, indoor in winter", "Optional private coach", "Terrace with drinks"],
    image: img("1554068865-24cecd4e34b8"),
    booking: { kind: "slot", times: ["08:00", "09:00", "10:00", "17:00", "18:00", "19:00"], maxGuests: 4, unit: "Players" },
  },

  // Culture: museums & art
  {
    slug: "old-masters-private-tour",
    category: "culture",
    group: "museums-art",
    title: "Old Masters private tour",
    venue: "National museum",
    city: "Amsterdam",
    priceFrom: 75,
    priceNote: "per person",
    summary: "Explore the Golden Age before opening hours with an art historian.",
    description:
      "A 90-minute private tour before opening hours, focusing on the great Dutch painters of the 17th century. Finish with coffee in the museum garden.",
    highlights: ["Before-hours access", "Private art historian", "Coffee and pastry"],
    image: img("1566127444979-b3d2b654e3d7"),
    premium: true,
    booking: { kind: "slot", times: ["08:00", "08:30", "17:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "modern-art-skip-the-line",
    category: "culture",
    group: "museums-art",
    title: "Modern art, skip-the-line",
    venue: "Museum of modern art",
    city: "Rotterdam",
    priceFrom: 28,
    priceNote: "per person",
    summary: "Timed entry with priority access to the current exhibition.",
    description:
      "Walk straight in to the season's headline exhibition. Add an audio guide or a curator talk on Thursday evenings.",
    highlights: ["Priority timed entry", "Audio guide included", "Curator talks on Thursdays"],
    image: img("1518998053901-5348d3961a04"),
    booking: { kind: "slot", times: ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00"], maxGuests: 10, unit: "Guests" },
  },
  {
    slug: "painting-workshop-haarlem",
    category: "culture",
    group: "museums-art",
    title: "Painting workshop at the museum",
    venue: "Museum of Dutch painting",
    city: "Haarlem",
    priceFrom: 65,
    priceNote: "per person",
    summary: "Study a masterpiece, then paint your own interpretation in the studio.",
    description:
      "After a short tour of the collection, a resident artist guides you through the techniques of the Dutch masters in the museum's studio. All materials included.",
    highlights: ["Short private tour", "Three-hour studio session", "Take your canvas home"],
    image: img("1460661419201-fd4cecdf8a8b"),
    booking: { kind: "slot", times: ["10:00", "14:00"], maxGuests: 6, unit: "Guests" },
  },

  // Culture: theatre, opera & concerts
  {
    slug: "opera-evening-amsterdam",
    category: "culture",
    group: "performances",
    title: "Opera evening with premium seats",
    venue: "Opera house",
    city: "Amsterdam",
    priceFrom: 125,
    priceNote: "per person",
    summary: "The best seats in the house, with an introduction and interval champagne.",
    description:
      "Enjoy a new production from the finest seats, with a pre-performance introduction by the dramaturge and champagne reserved for you at the interval.",
    highlights: ["Premium stalls or private box", "Pre-show introduction", "Interval champagne"],
    image: img("1507676184212-d03ab07a01bf"),
    premium: true,
    booking: {
      kind: "event",
      date: "2027-02-06",
      tickets: [
        { name: "Premium stalls", price: 125 },
        { name: "Private box (per seat)", price: 210 },
      ],
      maxGuests: 6,
    },
  },
  {
    slug: "concert-hall-amsterdam",
    category: "culture",
    group: "performances",
    title: "Symphony night at the concert hall",
    venue: "Concert hall",
    city: "Amsterdam",
    priceFrom: 89,
    priceNote: "per person",
    summary: "A world-class orchestra in one of the finest acoustics in the world.",
    description:
      "Hear a celebrated orchestra perform a programme of Mahler and Brahms, with seats in the first rows and a drink in the members' foyer.",
    highlights: ["Front-row or balcony seats", "Members' foyer access", "Programme booklet included"],
    image: img("1465847899084-d164df4dedc6"),
    booking: {
      kind: "event",
      date: "2027-01-28",
      tickets: [
        { name: "Front rows", price: 89 },
        { name: "Balcony", price: 69 },
      ],
      maxGuests: 6,
    },
  },

  // Culture: festivals & galas
  {
    slug: "summer-music-festival",
    category: "culture",
    group: "festivals-galas",
    title: "Summer music festival",
    venue: "Beach stage",
    city: "Scheveningen",
    priceFrom: 89,
    priceNote: "per day",
    summary: "Three days of live music by the sea, with a premium viewing deck.",
    description:
      "Enjoy international acts on the beach with access to the Véva deck: shaded seating, a private bar and dedicated restrooms.",
    highlights: ["Premium viewing deck", "Private bar", "Fast-lane entrance"],
    image: img("1470229722913-7c0e2dbbafd3"),
    booking: {
      kind: "event",
      date: "2027-07-23",
      tickets: [
        { name: "Day ticket", price: 89 },
        { name: "Weekend ticket", price: 199 },
        { name: "Weekend + Véva deck", price: 349 },
      ],
      maxGuests: 8,
    },
  },
  {
    slug: "museum-night-gala",
    category: "culture",
    group: "festivals-galas",
    title: "Museum night gala",
    venue: "Maritime museum",
    city: "Amsterdam",
    priceFrom: 175,
    priceNote: "per person",
    summary: "A black-tie evening among the collection, in support of the arts.",
    description:
      "An exclusive charity gala with a walking dinner, live music and late-night access to the galleries. Proceeds support young Dutch artists.",
    highlights: ["Walking dinner and champagne", "Live jazz ensemble", "After-hours gallery access"],
    image: img("1501281668745-f7f57925c3b4"),
    premium: true,
    booking: {
      kind: "event",
      date: "2027-11-13",
      tickets: [{ name: "Gala ticket", price: 175 }],
      maxGuests: 4,
    },
  },

  // Wellness: spa & treatments
  {
    slug: "signature-spa-ritual",
    category: "wellness",
    group: "spa",
    title: "Signature spa ritual",
    venue: "Spa Duinzicht",
    city: "Zandvoort",
    priceFrom: 165,
    priceNote: "per person",
    summary: "A two-hour ritual of scrub, massage and facial overlooking the dunes.",
    description:
      "Begin with a sea-salt scrub, followed by a full-body massage and a hydrating facial. Afterwards, relax in the thermal area with herbal tea and a view of the dunes.",
    highlights: ["Two-hour treatment", "Thermal area access for the day", "Organic Dutch skincare"],
    image: img("1540555700478-4be289fbecef"),
    premium: true,
    booking: { kind: "slot", times: ["10:00", "12:30", "15:00", "17:30"], maxGuests: 2, unit: "Guests" },
  },
  {
    slug: "private-sauna-suite",
    category: "wellness",
    group: "spa",
    title: "Private sauna suite",
    venue: "Badhuis West",
    city: "Amsterdam",
    priceFrom: 95,
    priceNote: "per suite, 2 hours",
    summary: "Your own sauna, steam room and plunge pool, for two to four people.",
    description:
      "A private suite with Finnish sauna, steam room, cold plunge and lounge. Add a duo massage or a light lunch served in your suite.",
    highlights: ["Completely private", "Robes, towels and tea included", "Optional duo massage"],
    image: img("1600334129128-685c5582fd35"),
    booking: { kind: "slot", times: ["09:00", "11:30", "14:00", "16:30", "19:00"], maxGuests: 4, unit: "Guests" },
  },

  // Wellness: yoga & mindfulness
  {
    slug: "yoga-breathwork-day-retreat",
    category: "wellness",
    group: "mind",
    title: "Yoga & breathwork day retreat",
    venue: "Landgoed De Hoorn",
    city: "Utrecht",
    priceFrom: 135,
    priceNote: "per person",
    summary: "A full day of yoga, breathwork and a plant-based lunch on a country estate.",
    description:
      "Escape the city for a day: morning vinyasa, a guided forest walk, a plant-based lunch and an afternoon breathwork and meditation session.",
    highlights: ["Two yoga sessions", "Guided breathwork and meditation", "Plant-based lunch"],
    image: img("1506126613408-eca07ce68773"),
    booking: { kind: "slot", times: ["09:00"], maxGuests: 4, unit: "Guests" },
  },
  {
    slug: "sunrise-beach-yoga",
    category: "wellness",
    group: "mind",
    title: "Sunrise beach yoga",
    venue: "Beach pavilion",
    city: "Scheveningen",
    priceFrom: 32,
    priceNote: "per person",
    summary: "Start the day with yoga on the beach and breakfast at the pavilion.",
    description:
      "A gentle one-hour flow on the sand as the sun comes up, followed by fresh juice and breakfast at the beach pavilion.",
    highlights: ["All levels welcome", "Mats provided", "Breakfast included"],
    image: img("1545205597-3d9d02c29597"),
    booking: { kind: "slot", times: ["06:30", "07:30"], maxGuests: 6, unit: "Guests" },
  },

  // Wellness: personal training
  {
    slug: "personal-training-amsterdam",
    category: "wellness",
    group: "training",
    title: "Personal training session",
    venue: "Studio Vondel",
    city: "Amsterdam",
    priceFrom: 85,
    priceNote: "per session",
    summary: "One-to-one training with a performance coach in a private studio.",
    description:
      "A tailored session with an experienced coach, starting with a movement assessment. Ideal before a race or to build a sustainable routine.",
    highlights: ["Movement assessment", "Personal programme to take home", "Recovery tips and nutrition advice"],
    image: img("1571019613454-1cb2f99b2d8b"),
    booking: { kind: "slot", times: ["07:00", "08:00", "12:00", "18:00", "19:00"], maxGuests: 2, unit: "People" },
  },
];

export type Tier = {
  id: "silver" | "gold" | "diamond";
  name: string;
  points: string;
  summary: string;
  perks: string[];
  // CSS background that evokes the tier's material
  surface: string;
};

export const tiers: Tier[] = [
  {
    id: "silver",
    name: "Silver circle",
    points: "0 – 999 Véva Points",
    summary:
      "The entry point to Véva's exclusive world, offering a taste of premium perks for those beginning their journey with curated experiences.",
    perks: [
      "50 Véva Points for every reservation",
      "1 Véva Point for every €1 spent at the venue",
      "Redeem points for discounts on future bookings",
      "Share verified experiences with the community",
    ],
    surface:
      "radial-gradient(120% 90% at 20% 10%, #f7f7f7 0%, #bdbdbd 35%, #6b6b6b 60%, #e9e9e9 78%, #2b2b2b 100%)",
  },
  {
    id: "gold",
    name: "Gold elite",
    points: "1,000 – 4,999 Véva Points",
    summary:
      "A step into refined exclusivity, rewarding frequent users with enhanced access and personalised touches for unforgettable moments.",
    perks: [
      "Everything in Silver circle",
      "25% bonus Véva Points on every booking",
      "Early access to high-demand tables, tee times and race starts",
      "Gift or transfer points to friends and family",
      "Personalised recommendations",
    ],
    surface:
      "linear-gradient(135deg, #b8860b 0%, #f5d76e 30%, #e2b23a 50%, #fbe38a 70%, #c99a1e 100%)",
  },
  {
    id: "diamond",
    name: "Diamond vanguard",
    points: "5,000+ Véva Points",
    summary:
      "The pinnacle of Véva exclusivity, reserved for the most discerning members who demand the finest in curated leisure.",
    perks: [
      "Everything in Gold elite",
      "50% bonus Véva Points on every booking",
      "Personal concierge for reservations",
      "Exclusive reservations and private experiences: backstage passes, private viewings, VIP packages",
      "Invitations to members-only Véva events",
    ],
    surface:
      "radial-gradient(80% 60% at 60% 55%, #c9d6df 0%, #7f97a8 30%, #3f5868 60%, #a9bac5 85%, #5b7180 100%)",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getExperiences = (slug: string) => experiences.filter((e) => e.category === slug);
export const getExperience = (category: string, slug: string) =>
  experiences.find((e) => e.category === category && e.slug === slug);

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
