// Central content file: edit categories, experiences, tiers, points and images here.

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  homeHero: "/images/home-hero-cheers.jpg",
  community: img("1528605248644-14dd04022da1"),
  about: img("1414235077428-338989a2e8c0"),
};

// Véva Points rules
export const points = {
  perReservation: 50, // earned for every booking, regardless of spend
  premiumBonus: 50, // extra for premium bookings such as chef's tables
  perEuro: 1, // earned after the visit, once the venue scans the QR code
  challengeStage: 250, // bonus for every completed challenge stage
  challengeComplete: 1000, // bonus for completing a whole challenge
};

export const reservationPoints = (e: Experience) =>
  points.perReservation + (e.premium ? points.premiumBonus : 0);

export type CategorySlug = "dining" | "sports" | "culture" | "wellness";

export type Group = { id: string; name: string; intro: string; subgroups?: { id: string; name: string; intro: string }[] };

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
    label: "Amsterdam restaurants",
    intro:
      "Reserve tables at a hand-picked selection of Amsterdam's best restaurants, from Michelin-starred dining and a greenhouse kitchen to French bistros, wine bars and tapas.",
    image: "/images/categories/dining.jpg",
    groups: [
      { id: "fine-dining", name: "Fine dining", intro: "Michelin-starred cooking and seasonal tasting menus." },
      { id: "bistros", name: "Bistros & brasseries", intro: "French classics, rotisserie and modern Dutch cooking." },
      { id: "wine-bars", name: "Wine bars & tapas", intro: "Natural wines, cosy bistro menus and plates to share." },
    ],
  },
  {
    slug: "sports",
    name: "Sports",
    label: "Challenges, races & play",
    intro:
      "Take on a Véva challenge, discover marathons, triathlons and cycling classics, book tee times, padel and tennis courts, or compete in tournaments exclusive to Véva members.",
    image: "/images/categories/sports.jpg",
    groups: [
      { id: "challenges", name: "Challenges", intro: "Long-term goals, broken down into stages, with bonus Véva Points along the way." },
      {
        id: "races",
        name: "Races",
        intro: "Official marathons, triathlons and cycling classics in the Netherlands.",
        subgroups: [
          { id: "marathon", name: "Marathon", intro: "The great city marathons of the Netherlands." },
          { id: "triathlon", name: "Triathlon", intro: "IRONMAN and iron-distance triathlons in the Netherlands." },
          { id: "cycling", name: "Cycling", intro: "Ride the classics on the hills of Limburg." },
        ],
      },
      { id: "recreational", name: "Recreational", intro: "Golf, padel and tennis: courts, tee times and lessons." },
      { id: "exclusive", name: "Véva Exclusive Tournaments", intro: "Tournaments organised by Véva, for members only." },
    ],
  },
  {
    slug: "culture",
    name: "Culture",
    label: "Art, stage & festivals",
    intro:
      "Private museum tours and art viewings, the best seats at the theatre, opera and concerts, and VIP access to festivals and galas.",
    image: "/images/categories/culture.jpg",
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
    image: "/images/categories/wellness.jpg",
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
  | { kind: "event"; date: string; tickets: { name: string; price: number }[]; maxGuests: number }
  // No reservations taken: shown as information only
  | { kind: "walk-in"; hours: string }
  // Free sign-up for a Véva challenge
  | { kind: "join" }
  // Official event run by another organiser: Véva links to its registration
  | { kind: "external"; when: string; register: { label: string; href: string } };

export type BookableExperience = Experience & { booking: Extract<Booking, { kind: "slot" | "event" }> };
export const isBookable = (e: Experience): e is BookableExperience =>
  e.booking.kind === "slot" || e.booking.kind === "event";

// A step in a challenge. Stages with a description get their own page.
export type Stage = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  description?: string;
  highlights?: string[];
  when?: string;
  website?: { label: string; href: string };
  related?: { category: CategorySlug; slug: string }; // an experience to book for this stage
};

export type Experience = {
  slug: string;
  category: CategorySlug;
  group: string;
  subgroup?: string; // for groups with subsections, e.g. Races > Marathon
  title: string;
  venue: string;
  city: string;
  priceFrom?: number; // leave out for free table reservations
  priceNote: string;
  summary: string;
  description: string;
  highlights: string[];
  image: string;
  premium?: boolean; // earns the premium Véva Points bonus
  // Member numbers for the venue page (shows [x] when left out). Current values are example figures.
  memberStats?: { visits: number; recommend: number };
  booking: Booking;
  // Challenges only
  website?: { label: string; href: string };
  stages?: Stage[];
  stagesTitle?: string;
  stagesIntro?: string;
};

export const experiences: Experience[] = [
  // Dining: Amsterdam restaurants (time slots are examples; confirm availability with each restaurant)
  {
    slug: "lars-amsterdam",
    category: "dining",
    group: "fine-dining",
    title: "Lars Amsterdam",
    venue: "Houthavens",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Michelin-starred cooking with French technique and Asian influences, overlooking the IJ.",
    description:
      "Founded in 2018 by chef Lars Scharp and maître d' Floor Wiggers, Lars Amsterdam holds a Michelin star. The kitchen combines classic French technique with pronounced Asian influences, served on the second floor with views across the water.",
    highlights: ["Michelin star", "Lunch and dinner menus", "Views over the IJ"],
    image: "/images/restaurants/lars-amsterdam.jpg",
    premium: true,
    memberStats: { visits: 184, recommend: 97 }, // example figures
    booking: { kind: "slot", times: ["12:00", "12:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "de-kas",
    category: "dining",
    group: "fine-dining",
    title: "De Kas",
    venue: "Frankendael Park",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Seasonal set menus in a 1926 greenhouse, with vegetables from its own gardens.",
    description:
      "Set in a restored 1926 greenhouse in Frankendael Park, De Kas serves one set menu that changes daily with the harvest from its own gardens and local growers. Open for lunch and dinner, with vegetarian alternatives and wine pairings.",
    highlights: ["Daily changing set menu", "Vegetables from its own gardens", "Vegetarian options and wine pairing"],
    image: "/images/restaurants/de-kas.jpg",
    premium: true,
    memberStats: { visits: 312, recommend: 96 }, // example figures
    booking: { kind: "slot", times: ["12:00", "12:30", "18:00", "18:30", "19:00", "19:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "restaurant-entrepot",
    category: "dining",
    group: "fine-dining",
    title: "Restaurant Entrepot",
    venue: "Entrepotdok",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Seasonal Dutch produce and natural wines in a former billiards hall.",
    description:
      "In a bright former billiards hall on the Entrepotdok, the open kitchen works with seasonal vegetables, fish and game from Dutch suppliers. Choose a four- or five-course menu or order à la carte, with a wine list focused on natural wines.",
    highlights: ["Four- or five-course menu or à la carte", "Locally sourced produce", "Natural wine list"],
    image: "/images/restaurants/restaurant-entrepot.jpg",
    memberStats: { visits: 97, recommend: 92 }, // example figures
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "troef",
    category: "dining",
    group: "bistros",
    title: "Troef",
    venue: "Amstel",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Modern French bistro near the Amstel, with a wine room of over 3,000 bottles.",
    description:
      "Troef serves an à la carte menu of French classics with Mediterranean touches, led by chef Raymond Plat. Its wine room holds more than 3,000 bottles.",
    highlights: ["À la carte French cooking", "Wine room with 3,000+ bottles", "Smart casual"],
    image: img("1424847651672-bf20a4b0982b"),
    memberStats: { visits: 143, recommend: 94 }, // example figures
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "auberge",
    category: "dining",
    group: "bistros",
    title: "Auberge",
    venue: "De Pijp",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Parisian brasserie classics by the Albert Cuyp market, with a Michelin Bib Gourmand.",
    description:
      "Auberge brings the Parisian brasserie tradition to De Pijp, with French classics at accessible prices. It was awarded a Michelin Bib Gourmand in 2024 and 2025.",
    highlights: ["French brasserie classics", "Michelin Bib Gourmand", "In the heart of De Pijp"],
    image: "/images/restaurants/auberge.jpg",
    memberStats: { visits: 226, recommend: 95 }, // example figures
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "rijsel",
    category: "dining",
    group: "bistros",
    title: "Rijsel",
    venue: "Amsterdam-Oost",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "French-Flemish rotisserie in a former domestic science school.",
    description:
      "Named after the Dutch word for Lille, Rijsel serves classic French cooking with Flemish roots. The rotisserie is the centrepiece, with poultry turning on the spit, and the short menu changes regularly.",
    highlights: ["Famous rotisserie chicken", "Open kitchen", "Short, changing menu"],
    image: img("1600891964599-f61ba0e24092"),
    memberStats: { visits: 268, recommend: 93 }, // example figures
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "roux",
    category: "dining",
    group: "bistros",
    title: "Roux",
    venue: "Jordaan",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "French-rooted cooking and a wine list of more than 350 references on the Westerstraat.",
    description:
      "Roux builds on classical French foundations with creative and unexpected flavour combinations, all à la carte. The wine list counts more than 350 references, and the long counter overlooking the kitchen is a favourite seat.",
    highlights: ["À la carte, French-inspired", "350+ wines", "Counter seats at the kitchen"],
    image: "/images/restaurants/roux.jpg",
    memberStats: { visits: 121, recommend: 96 }, // example figures
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "wilde-zwijnen",
    category: "dining",
    group: "bistros",
    title: "Wilde Zwijnen",
    venue: "Indische Buurt",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Modern Dutch cooking with local, seasonal produce, game and sustainable fish.",
    description:
      "On the Javaplein, Wilde Zwijnen serves menus of three to five courses built on local, seasonal ingredients, including game and sustainable fish, finished with a cheese board.",
    highlights: ["Three-, four- or five-course menus", "Seasonal and local", "Game and sustainable fish"],
    image: img("1555396273-367ea4eb4db5"),
    memberStats: { visits: 164, recommend: 94 }, // example figures
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "de-zingende-zwaan",
    category: "dining",
    group: "bistros",
    title: "De Zingende Zwaan",
    venue: "Helmersbuurt",
    city: "Amsterdam",
    priceNote: "Walk-in only · no reservations",
    summary: "A cosy brown café with French and British bistro cooking, from oysters to fish and chips.",
    description:
      "On the Eerste Helmersstraat, De Zingende Zwaan pairs the feel of a traditional brown café with a London twist. The seasonal menu brings French and British bistro classics such as oysters with Chablis, fish and chips and burgers, at prices that are friendly for Amsterdam.",
    highlights: ["French and British bistro classics", "Oysters and Chablis", "Walk-in only, open from the afternoon"],
    image: img("1572116469696-31de0f17cc34"),
    memberStats: { visits: 88, recommend: 91 }, // example figures
    booking: { kind: "walk-in", hours: "Open daily from 15:30. No reservations: just walk in." },
  },
  {
    slug: "cafe-twee-prinsen",
    category: "dining",
    group: "wine-bars",
    title: "Café Twee Prinsen",
    venue: "Jordaan",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Wine bar with a famous sunny terrace on the corner of the Prinsengracht.",
    description:
      "A wood-panelled blend of a traditional Dutch café and a modern wine bar, known for its sunny canal-side terrace. Natural wines, craft beers and small dishes.",
    highlights: ["Sunny terrace by the canal", "Natural wines and craft beer", "Small dishes and snacks"],
    image: img("1514933651103-005eec06c04b"),
    memberStats: { visits: 203, recommend: 90 }, // example figures
    booking: { kind: "slot", times: ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "cafe-de-klepel",
    category: "dining",
    group: "wine-bars",
    title: "Café de Klepel",
    venue: "Jordaan",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Cosy French wine bistro with a daily changing menu and an extensive wine list.",
    description:
      "A small, cosy bistro with a large wine list focused on France and Burgundy. The kitchen serves a three- or four-course menu that changes daily, and the cheese selection is a favourite.",
    highlights: ["Daily three- or four-course menu", "Extensive French wine list", "Renowned cheese selection"],
    image: "/images/restaurants/cafe-de-klepel.jpg",
    memberStats: { visits: 76, recommend: 95 }, // example figures
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "peps",
    category: "dining",
    group: "wine-bars",
    title: "Peps",
    venue: "Oud-West",
    city: "Amsterdam",
    priceNote: "Free table reservation · pay at the restaurant",
    summary: "Spanish tapas and wine bar with more than 60 dishes to share.",
    description:
      "A lively spot for sharing plates, with more than 60 tapas and an extensive selection of Spanish wines. Ideal for a relaxed evening with friends.",
    highlights: ["60+ tapas to share", "Spanish wine list", "Relaxed, social atmosphere"],
    image: "/images/restaurants/peps.jpg",
    memberStats: { visits: 245, recommend: 89 }, // example figures
    booking: { kind: "slot", times: ["17:00", "17:30", "18:00", "19:00", "20:00", "21:00"], maxGuests: 8, unit: "Guests" },
  },

  // Sports: challenges
  {
    slug: "road-to-european-marathon-classics-medal",
    category: "sports",
    group: "challenges",
    title: "Road to the European Marathon Classics medal",
    venue: "Eight European cities",
    city: "Europe",
    priceNote: "Free to join · race entries booked separately",
    summary: "Run five of Europe's eight classic city marathons and earn the European Marathon Classics medal.",
    description:
      "The European Marathon Classics bring together eight of Europe's great city marathons. Finish five of them, each in a different city, and you earn the series medal, with space for a badge from every race you complete. There is no time limit. Véva helps you plan your route, keeps track of your progress and rewards every finish.",
    highlights: ["Five of eight marathons, each in a different city", "No time limit", `${points.challengeStage} bonus Véva Points per marathon`],
    image: "/images/challenges/road-to-european-marathon-classics-medal.jpg",
    booking: { kind: "join" },
    website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
    stagesTitle: "The eight marathons",
    stagesIntro: "Choose any five. Each city has its own character, course and season.",
    stages: [
      {
        slug: "rome",
        title: "Rome",
        subtitle: "Acea Run Rome The Marathon",
        website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
        when: "Usually held in March. Dates for the next edition are announced by the organisers.",
        summary: "Start and finish by the Colosseum, through two thousand years of history.",
        description:
          "Rome's marathon runs past the city's greatest monuments, from the Colosseum and the Circus Maximus to St Peter's Square, on a course that loops through the historic centre. Spring weather and cobbled stretches make it a memorable first race of the season.",
        highlights: ["Start and finish near the Colosseum", "Past St Peter's Square", "Usually the first race of the season"],
        image: img("1552832230-c0197dd311b5"),
      },
      {
        slug: "vienna",
        title: "Vienna",
        subtitle: "Vienna City Marathon",
        website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
        when: "Usually held in April. Dates for the next edition are announced by the organisers.",
        summary: "A flat, fast tour of Vienna's grand boulevards, finishing at the Hofburg.",
        description:
          "From the Danube across the city to the Ringstrasse, the Vienna City Marathon shows off the palaces and boulevards of Europe's music capital. Vienna also hosted the launch of the European Marathon Classics in 2026.",
        highlights: ["Finish by the Hofburg palace", "Along the Ringstrasse", "Fast, mostly flat course"],
        image: img("1516550893923-42d28e5677af"),
      },
      {
        slug: "london",
        title: "London",
        subtitle: "TCS London Marathon",
        website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
        when: "Usually held in April. Dates for the next edition are announced by the organisers.",
        summary: "One of the World Marathon Majors, from Greenwich to The Mall.",
        description:
          "The London Marathon takes runners from Greenwich past the Cutty Sark, over Tower Bridge and along the Thames to a finish on The Mall in front of Buckingham Palace. The crowds are legendary, and starts are in high demand.",
        highlights: ["Over Tower Bridge", "Finish on The Mall", "One of the six World Marathon Majors"],
        image: img("1513635269975-59663e0ac1ad"),
      },
      {
        slug: "madrid",
        title: "Madrid",
        subtitle: "Zurich Rock 'n' Roll Running Series Madrid",
        website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
        when: "Usually held in April. Dates for the next edition are announced by the organisers.",
        summary: "A challenging, rolling course through the Spanish capital, with music along the way.",
        description:
          "Madrid's marathon is known for its hills and its party atmosphere, with live music along the route. The course passes landmarks such as the Paseo de la Castellana and the Puerta del Sol before finishing near Retiro Park.",
        highlights: ["Live music along the route", "Rolling, challenging course", "Finish near Retiro Park"],
        image: img("1539037116277-4db20889f2d4"),
      },
      {
        slug: "copenhagen",
        title: "Copenhagen",
        subtitle: "Copenhagen Marathon",
        website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
        when: "Usually held in May. Dates for the next edition are announced by the organisers.",
        summary: "A flat and friendly race along canals, harbours and colourful Nyhavn.",
        description:
          "Copenhagen's marathon is flat, green and known for its relaxed atmosphere. The route winds along the harbour, through the city's neighbourhoods and past the colourful houses of Nyhavn.",
        highlights: ["Flat and fast", "Along the harbour and Nyhavn", "Relaxed Scandinavian atmosphere"],
        image: img("1513622470522-26c3c8a854bc"),
      },
      {
        slug: "warsaw",
        title: "Warsaw",
        subtitle: "Warsaw Marathon",
        website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
        when: "Usually held in September. Dates for the next edition are announced by the organisers.",
        summary: "An autumn race through Poland's capital, from modern skyline to rebuilt Old Town.",
        description:
          "The Warsaw Marathon combines the city's modern skyline with its carefully rebuilt historic centre and the banks of the Vistula. Cool September weather makes it a good race for a fast time.",
        highlights: ["Autumn race with cool weather", "Along the Vistula", "Modern skyline and historic centre"],
        image: img("1519197924294-4ba991a11128"),
      },
      {
        slug: "lisbon",
        title: "Lisbon",
        subtitle: "EDP Lisbon Marathon",
        website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
        when: "Usually held in October. Dates for the next edition are announced by the organisers.",
        summary: "From the coast at Cascais along the Atlantic and the Tagus into Lisbon.",
        description:
          "Lisbon's marathon is a point-to-point race that starts on the coast in Cascais and follows the Atlantic and the Tagus estuary into the city, with views of the sea for much of the way.",
        highlights: ["Point-to-point along the coast", "Sea views for much of the route", "Finish in the heart of Lisbon"],
        image: img("1585208798174-6cedd86e019a"),
      },
      {
        slug: "frankfurt",
        title: "Frankfurt",
        subtitle: "Mainova Frankfurt Marathon",
        website: { label: "European Marathon Classics website", href: "https://europeanmarathonclassics.eu/" },
        when: "Usually held in October. Dates for the next edition are announced by the organisers.",
        summary: "Germany's oldest city marathon, with a famous indoor finish in the Festhalle.",
        description:
          "Frankfurt's flat course runs between the skyscrapers of Germany's financial capital and along the river Main. It ends with one of the most memorable finishes in running: a red carpet inside the Festhalle.",
        highlights: ["Indoor finish in the Festhalle", "Flat and fast", "Through the skyline of 'Mainhattan'"],
        image: img("1564221710304-0b37c8b9d729"),
      },
    ],
  },
  {
    slug: "road-to-your-first-ironman",
    category: "sports",
    group: "challenges",
    title: "Road to your first Ironman",
    venue: "Training & races in the Netherlands",
    city: "Netherlands",
    priceNote: "Free to join · training and race entries booked separately",
    summary: "From your first training plan to the finish line of a full-distance triathlon.",
    description:
      "A full-distance triathlon means a 3.8 km swim, a 180 km bike ride and a 42.2 km run in a single day. This challenge breaks the journey into four stages, from building your base with a coach to your first half distance and, finally, the full distance. Most first-timers prepare for around a year.",
    highlights: ["Four stages to the full distance", "Coaching and Dutch races in one place", `${points.challengeStage} bonus Véva Points per stage`],
    image: "/images/challenges/road-to-your-first-ironman.jpg",
    booking: { kind: "join" },
    stagesTitle: "Four stages",
    stagesIntro: "Complete them in order, at your own pace.",
    stages: [
      { slug: "base", title: "Build your base", subtitle: "Stage 1", summary: "Start with a movement assessment and a personal training plan with a coach.", image: img("1571019613454-1cb2f99b2d8b"), related: { category: "wellness", slug: "personal-training-amsterdam" } },
      { slug: "first-triathlon", title: "Your first triathlon", subtitle: "Stage 2", summary: "Finish a sprint or olympic-distance triathlon to get used to transitions and open water.", image: img("1517649763962-0c623066013b") },
      { slug: "half-distance", title: "Half distance", subtitle: "Stage 3", summary: "1.9 km swim, 90 km bike and 21.1 km run: the big test before the full distance.", image: img("1541252260730-0412e8e2108e"), related: { category: "sports", slug: "ironman-70-3-westfriesland" } },
      { slug: "full-distance", title: "The full distance", subtitle: "Stage 4", summary: "3.8 km swim, 180 km bike and 42.2 km run. Cross the line and call yourself an Ironman.", image: img("1530549387789-4c1017266635"), related: { category: "sports", slug: "challenge-almere-amsterdam" } },
    ],
  },
  {
    slug: "road-to-handicap-below-20",
    category: "sports",
    group: "challenges",
    title: "Road to a handicap below 20",
    venue: "Golf courses in the Netherlands",
    city: "Netherlands",
    priceNote: "Free to join · lessons and tee times booked separately",
    summary: "Lessons, practice and qualifying rounds to bring your handicap below 20.",
    description:
      "A handicap below 20 means you regularly play close to bogey golf. Under the World Handicap System, your handicap index is based on the best 8 of your 20 most recent qualifying scores, so steady improvement pays off. This challenge combines coaching with plenty of rounds on great courses.",
    highlights: ["Four stages from lessons to qualifying rounds", "Lessons and tee times to book through Véva", `${points.challengeStage} bonus Véva Points per stage`],
    image: "/images/challenges/road-to-handicap-below-20.jpg",
    booking: { kind: "join" },
    stagesTitle: "Four stages",
    stagesIntro: "Track your progress round by round.",
    stages: [
      { slug: "lessons", title: "Lessons with a pro", subtitle: "Stage 1", summary: "Work on your swing, short game and course management with a PGA professional.", image: img("1587174486073-ae5e5cff23aa"), related: { category: "sports", slug: "golf-clinic-noordwijk" } },
      { slug: "practice", title: "Practice with purpose", subtitle: "Stage 2", summary: "Regular sessions on the range and putting green, focused on what your coach asked you to improve.", image: img("1592919505780-303950717480") },
      { slug: "qualifying-rounds", title: "Play qualifying rounds", subtitle: "Stage 3", summary: "Play and register at least 20 qualifying rounds so your handicap index reflects your game.", image: img("1535131749006-b7f58c99034b"), related: { category: "sports", slug: "golf-tee-time-hilversum" } },
      { slug: "below-20", title: "Break 20", subtitle: "Stage 4", summary: "Reach a handicap index below 20 and celebrate with a round at a course of your choice.", image: img("1587174486073-ae5e5cff23aa") },
    ],
  },

  // Sports: marathon, triathlon and cycling (official events; dates come from the organisers)
  {
    slug: "tcs-amsterdam-marathon",
    category: "sports",
    group: "races",
    subgroup: "marathon",
    title: "TCS Amsterdam Marathon",
    venue: "Olympic Stadium",
    city: "Amsterdam",
    priceNote: "Entries through the official website",
    summary: "Start and finish in the Olympic Stadium, past the Rijksmuseum, the Amstel and the Vondelpark.",
    description:
      "One of Europe's fastest marathons, with a World Athletics Platinum Label. The largely flat course starts and finishes in the 1928 Olympic Stadium and takes runners along the Amstel, past the Rijksmuseum and through the Vondelpark. Places sell out quickly, so register as soon as entries open.",
    highlights: ["Start and finish in the Olympic Stadium", "Flat and fast, Platinum Label", "Half marathon on the same day"],
    image: img("1534351590666-13e3e96b5017"),
    booking: {
      kind: "external",
      when: "Usually held on a Sunday in mid-October (the 2026 edition was on 18 October).",
      register: { label: "TCS Amsterdam Marathon website", href: "https://www.tcsamsterdammarathon.eu/" },
    },
  },
  {
    slug: "nn-marathon-rotterdam",
    category: "sports",
    group: "races",
    subgroup: "marathon",
    title: "NN Marathon Rotterdam",
    venue: "Coolsingel",
    city: "Rotterdam",
    priceNote: "Entries through the official website",
    summary: "The Netherlands' biggest spring marathon, with the famous crossing of the Erasmus Bridge.",
    description:
      "Known as the fastest marathon in the Netherlands, Rotterdam's spring classic starts and finishes on the Coolsingel and crosses the Erasmus Bridge, cheered on by huge crowds. The flat course is a favourite for personal bests.",
    highlights: ["Over the Erasmus Bridge", "Flat course, ideal for a personal best", "Huge crowds along the route"],
    image: img("1543872084-c7bd3822856f"),
    booking: {
      kind: "external",
      when: "Usually held in April. The 2027 edition is listed for the weekend of 10–11 April; check the official website.",
      register: { label: "NN Marathon Rotterdam website", href: "https://www.nnmarathonrotterdam.nl/" },
    },
  },
  {
    slug: "ironman-70-3-westfriesland",
    category: "sports",
    group: "races",
    subgroup: "triathlon",
    title: "IRONMAN 70.3 Westfriesland",
    venue: "Historic harbour",
    city: "Hoorn",
    priceNote: "Entries through the official website",
    summary: "A half-distance IRONMAN from the historic harbour of Hoorn, past windmills and Dutch villages.",
    description:
      "Swim 1.9 km in Hoorn's old harbour on the Markermeer, ride a flat 90 km loop through the West Frisian countryside past villages and windmills, and run 21.1 km through the historic town centre. A great first IRONMAN-branded race.",
    highlights: ["1.9 km swim, 90 km bike, 21.1 km run", "Swim in Hoorn's historic harbour", "Flat, scenic course"],
    image: img("1588952159215-a4b39193464e"),
    booking: {
      kind: "external",
      when: "Usually held in June. The 2027 edition is listed for 20 June; check the official website.",
      register: { label: "IRONMAN website", href: "https://www.ironman.com/" },
    },
  },
  {
    slug: "challenge-almere-amsterdam",
    category: "sports",
    group: "races",
    subgroup: "triathlon",
    title: "Challenge Almere-Amsterdam",
    venue: "Weerwater",
    city: "Almere",
    priceNote: "Entries through the official website",
    summary: "The Netherlands' classic full-distance triathlon: 3.8 km swim, 180 km bike, 42.2 km run.",
    description:
      "One of Europe's longest-running iron-distance races, held on the flat polder roads around Almere. Choose the full distance or the middle distance. The race runs under the Challenge brand rather than IRONMAN, with the same full distance.",
    highlights: ["Full and middle distance", "Flat polder course", "Full distance: 226 km in total"],
    image: img("1530549387789-4c1017266635"),
    booking: {
      kind: "external",
      when: "Usually held in September. The 2027 edition is expected on 11 September; check the official website.",
      register: { label: "Challenge Almere-Amsterdam website", href: "https://www.challenge-almere.com/" },
    },
  },
  {
    slug: "amstel-gold-race",
    category: "sports",
    group: "races",
    subgroup: "cycling",
    title: "Amstel Gold Race",
    venue: "South Limburg",
    city: "Valkenburg",
    priceNote: "Entries through the official website",
    summary: "Ride the course of the Dutch cycling classic over the hills of South Limburg, the day before the pros.",
    description:
      "The Amstel Gold Race is the Netherlands' biggest one-day cycling classic. The day before the professional race, around 15,000 amateur riders take on the Amstel Gold Race Tourtocht over the same famous climbs, starting and finishing in Valkenburg. Places are allocated by lottery.",
    highlights: ["Routes from 60 to 240 km", "The famous climbs of South Limburg", "Start and finish in Valkenburg"],
    image: img("1517649763962-0c623066013b"),
    booking: {
      kind: "external",
      when: "Usually held in April, on the Saturday before the professional race. Places are allocated by lottery.",
      register: { label: "Amstel Gold Race website", href: "https://www.amstelgoldrace.nl/" },
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
    group: "exclusive",
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
    slug: "veva-golf-invitational",
    category: "sports",
    group: "exclusive",
    title: "Véva Golf Invitational",
    venue: "Duinen Golf",
    city: "Noordwijk",
    priceFrom: 145,
    priceNote: "per player",
    summary: "A members-only Stableford competition on a seaside links, with dinner and prizes.",
    description:
      "Véva's own golf day for members: a shotgun start, a Stableford competition in flights matched by handicap, and a dinner with prize-giving in the clubhouse overlooking the dunes.",
    highlights: ["Stableford, flights by handicap", "Dinner and prize-giving included", "Bonus Véva Points for the winners"],
    image: img("1587174486073-ae5e5cff23aa"),
    booking: {
      kind: "event",
      date: "2027-06-12",
      tickets: [
        { name: "Player", price: 145 },
        { name: "Dinner only (guest)", price: 65 },
      ],
      maxGuests: 4,
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
  id: "bronze" | "silver" | "gold" | "diamond";
  name: string;
  points: string;
  // Who the members in this level are
  summary: string;
  perks: string[];
  // CSS background that evokes the tier's material
  surface: string;
};

export const tiers: Tier[] = [
  {
    id: "bronze",
    name: "Bronze explorer",
    points: "0 – 1,999 Véva Points",
    summary:
      "For those who are starting to discover the experiences that make life richer: a first chef's table, a first race, a first afternoon at the spa.",
    perks: [
      "50 Véva Points for every reservation",
      "1 Véva Point for every €1 spent at the venue",
      "Redeem points for discounts on future bookings",
      "Share verified experiences with the community",
    ],
    surface:
      "linear-gradient(135deg, #5a2e15 0%, #a8612f 28%, #e3a872 50%, #b8713c 72%, #6e3b1f 100%)",
  },
  {
    id: "silver",
    name: "Silver circle",
    points: "2,000 – 4,999 Véva Points",
    summary:
      "For members who have found their favourite places and come back regularly, while discovering new restaurants, courts and stages along the way.",
    perks: [
      "Everything in Bronze explorer",
      "10% bonus Véva Points on every booking",
      "Gift or transfer points to friends and family",
      "Early announcements of new experiences and events",
    ],
    surface:
      "radial-gradient(120% 90% at 20% 10%, #f7f7f7 0%, #bdbdbd 35%, #6b6b6b 60%, #e9e9e9 78%, #2b2b2b 100%)",
  },
  {
    id: "gold",
    name: "Gold elite",
    points: "5,000 – 14,999 Véva Points",
    summary:
      "For the frequent experiencers who plan their weeks around great food, sport, culture and wellbeing, and always bring the people they value along.",
    perks: [
      "Everything in Silver circle",
      "25% bonus Véva Points on every booking",
      "Early access to high-demand tables, tee times and race starts",
      "Personalised recommendations",
    ],
    surface:
      "linear-gradient(135deg, #b8860b 0%, #f5d76e 30%, #e2b23a 50%, #fbe38a 70%, #c99a1e 100%)",
  },
  {
    id: "diamond",
    name: "Diamond vanguard",
    points: "15,000+ Véva Points",
    summary:
      "For the most dedicated members, who live for curated experiences, take on the biggest challenges and set the tone for the Véva community.",
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

// Short city codes shown as a badge on restaurant photos
export const cityCodes: Record<string, string> = { Amsterdam: "AMS" };

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getExperiences = (slug: string) => experiences.filter((e) => e.category === slug);
export const getExperience = (category: string, slug: string) =>
  experiences.find((e) => e.category === category && e.slug === slug);

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
