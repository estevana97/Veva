// Central content file: edit categories, experiences, tiers and images here.

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  homeHero: img("1587174486073-ae5e5cff23aa"),
  community: img("1528605248644-14dd04022da1"),
  about: img("1414235077428-338989a2e8c0"),
};

export type CategorySlug = "restaurants" | "sports" | "events" | "culture";

export type Category = {
  slug: CategorySlug;
  name: string;
  label: string;
  intro: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    label: "Dining",
    intro:
      "Reserve tables at selected restaurants and chic gastropubs, offering culinary experiences for memorable moments with those you value.",
    image: img("1517248135467-4c7edcad34c4"),
  },
  {
    slug: "sports",
    name: "Sports",
    label: "Golf & padel",
    intro:
      "Enjoy exclusive golf tee times and padel court bookings at the Netherlands' finest venues, crafted for active lifestyles seeking upscale recreation.",
    image: img("1535131749006-b7f58c99034b"),
  },
  {
    slug: "events",
    name: "Sport events",
    label: "Marathons & triathlons",
    intro:
      "Secure your start at marathons, iron-distance triathlons and cycling classics, with hospitality packages that make race day unforgettable.",
    image: img("1452626038306-9aae5e071dd3"),
  },
  {
    slug: "culture",
    name: "Culture",
    label: "Museums & festivals",
    intro:
      "Discover your favourite art with skip-the-line access and private tours at iconic museums, plus curated festival experiences.",
    image: img("1518998053901-5348d3961a04"),
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
  title: string;
  venue: string;
  city: string;
  priceFrom: number;
  priceNote: string;
  summary: string;
  description: string;
  highlights: string[];
  image: string;
  booking: Booking;
};

export const experiences: Experience[] = [
  // Restaurants
  {
    slug: "chefs-table-amsterdam",
    category: "restaurants",
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
    booking: { kind: "slot", times: ["18:00", "18:30", "19:00", "20:30", "21:00"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "gastropub-rotterdam",
    category: "restaurants",
    title: "Gastropub evening",
    venue: "De Kade",
    city: "Rotterdam",
    priceFrom: 55,
    priceNote: "per person",
    summary: "Elevated pub classics and craft beers along the Maas.",
    description:
      "A relaxed evening of refined comfort food in a converted harbour warehouse. Ideal for groups and celebrations, with a private corner available on request.",
    highlights: ["Three-course sharing menu", "Craft beer flight", "Waterfront terrace in summer"],
    image: img("1559339352-11d035aa65de"),
    booking: { kind: "slot", times: ["17:30", "18:00", "19:00", "20:00", "21:00"], maxGuests: 12, unit: "Guests" },
  },
  {
    slug: "brasserie-the-hague",
    category: "restaurants",
    title: "Sunday brasserie lunch",
    venue: "Maison Lange Voorhout",
    city: "The Hague",
    priceFrom: 65,
    priceNote: "per person",
    summary: "Classic French brasserie lunch beneath the lime trees.",
    description:
      "A long, unhurried lunch of oysters, sole meunière and tarte tatin in one of the city's most elegant dining rooms.",
    highlights: ["Seafood platter to start", "Signature sole meunière", "Window tables for Gold members"],
    image: img("1504674900247-0877df9cc836"),
    booking: { kind: "slot", times: ["12:00", "12:30", "13:00", "13:30", "14:00"], maxGuests: 10, unit: "Guests" },
  },

  // Sports
  {
    slug: "golf-tee-time-hilversum",
    category: "sports",
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
    slug: "padel-court-amsterdam",
    category: "sports",
    title: "Indoor padel court",
    venue: "Padel Club Zuid",
    city: "Amsterdam",
    priceFrom: 48,
    priceNote: "per court, 90 min",
    summary: "Premium panoramic courts with racket rental and drinks.",
    description:
      "Book a 90-minute session on a panoramic glass court. Add a coaching clinic, racket rental or post-match drinks in the lounge.",
    highlights: ["Panoramic glass courts", "Racket and ball rental", "Optional pro clinic"],
    image: img("1626224583764-f87db24ac4ea"),
    booking: { kind: "slot", times: ["07:00", "08:30", "12:00", "17:30", "19:00", "20:30"], maxGuests: 4, unit: "Players" },
  },
  {
    slug: "golf-clinic-noordwijk",
    category: "sports",
    title: "Links golf clinic",
    venue: "Duinen Golf",
    city: "Noordwijk",
    priceFrom: 95,
    priceNote: "per player",
    summary: "Two-hour clinic with a PGA professional on a seaside links.",
    description:
      "Sharpen your game with a PGA professional on a true links course in the dunes, followed by nine holes to put it into practice.",
    highlights: ["Two-hour coaching", "Nine holes after the clinic", "Video swing analysis"],
    image: img("1587174486073-ae5e5cff23aa"),
    booking: { kind: "slot", times: ["09:00", "11:00", "14:00"], maxGuests: 4, unit: "Players" },
  },

  // Sport events
  {
    slug: "amsterdam-city-marathon",
    category: "events",
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
    category: "events",
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
    slug: "rotterdam-spring-run",
    category: "events",
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

  // Culture
  {
    slug: "old-masters-private-tour",
    category: "culture",
    title: "Old Masters private tour",
    venue: "National museum",
    city: "Amsterdam",
    priceFrom: 75,
    priceNote: "per person",
    summary: "Skip the line and explore the Golden Age with an art historian.",
    description:
      "A 90-minute private tour before opening hours, focusing on the great Dutch painters of the 17th century. Finish with coffee in the museum garden.",
    highlights: ["Before-hours access", "Private art historian", "Coffee and pastry"],
    image: img("1566127444979-b3d2b654e3d7"),
    booking: { kind: "slot", times: ["08:00", "08:30", "17:30"], maxGuests: 8, unit: "Guests" },
  },
  {
    slug: "modern-art-skip-the-line",
    category: "culture",
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
    slug: "summer-music-festival",
    category: "culture",
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
    points: "0 – 999 points",
    summary:
      "The entry point to Véva's exclusive world, offering a taste of premium perks for those beginning their journey with curated experiences.",
    perks: ["1 point for every €1 spent", "Member-only newsletter and early event announcements", "Birthday welcome drink at partner restaurants", "Free cancellation up to 48 hours before"],
    surface:
      "radial-gradient(120% 90% at 20% 10%, #f7f7f7 0%, #bdbdbd 35%, #6b6b6b 60%, #e9e9e9 78%, #2b2b2b 100%)",
  },
  {
    id: "gold",
    name: "Gold elite",
    points: "1,000 – 4,999 points",
    summary:
      "A step into refined exclusivity, rewarding frequent users with enhanced access and personalised touches for unforgettable moments.",
    perks: ["1.25 points for every €1 spent", "Priority reservations at peak times", "Guaranteed weekend tee times and padel courts", "Complimentary upgrades on event hospitality", "Personalised recommendations"],
    surface:
      "linear-gradient(135deg, #b8860b 0%, #f5d76e 30%, #e2b23a 50%, #fbe38a 70%, #c99a1e 100%)",
  },
  {
    id: "diamond",
    name: "Diamond vanguard",
    points: "5,000+ points",
    summary:
      "The pinnacle of Véva exclusivity, reserved for the most discerning members who demand the finest in curated leisure.",
    perks: ["1.5 points for every €1 spent", "Personal concierge, seven days a week", "Access to sold-out tables and race starts", "Private museum openings and chef's table invitations", "Annual members-only Véva gala"],
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
