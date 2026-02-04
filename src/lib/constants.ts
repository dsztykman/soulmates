export const SITE_CONFIG = {
  name: "Soulmates Orchestra",
  url: "https://www.soulmatesorchestra.com",
  email: "info@soulmatesorchestra.com",
  phone: "+33 6 50 46 93 96",
  location: "Paris, France",
  social: {
    instagram: "https://instagram.com/soulmatesorchestra",
    youtube: "https://youtube.com/@soulmatesorchestra",
    tiktok: "https://tiktok.com/@soulmatesorchestra",
    facebook: "https://facebook.com/soulmatesorchestra",
  },
} as const;

export const STATS = {
  events: 500,
  clients: 350,
  years: 15,
} as const;

export const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/images/gallery/event-1.jpg",
    alt: "Live performance at event",
    category: "corporate",
  },
  {
    id: 2,
    src: "/images/gallery/event-2.jpg",
    alt: "Celebration moment",
    category: "private",
  },
  {
    id: 3,
    src: "/images/gallery/event-3.jpg",
    alt: "Orchestra performance",
    category: "corporate",
  },
  {
    id: 4,
    src: "/images/gallery/event-4.jpg",
    alt: "Party celebration",
    category: "celebrations",
  },
  {
    id: 5,
    src: "/images/gallery/event-5.jpg",
    alt: "Live entertainment",
    category: "corporate",
  },
  {
    id: 6,
    src: "/images/gallery/event-6.jpg",
    alt: "Special event",
    category: "celebrations",
  },
  {
    id: 7,
    src: "/images/gallery/event-7.jpg",
    alt: "Event performance",
    category: "corporate",
  },
  {
    id: 8,
    src: "/images/gallery/event-8.jpg",
    alt: "Celebration event",
    category: "private",
  },
  {
    id: 9,
    src: "/images/gallery/event-9.jpg",
    alt: "Bar Mitzvah celebration",
    category: "celebrations",
  },
  {
    id: 10,
    src: "/images/gallery/event-10.jpg",
    alt: "DJ performance",
    category: "private",
  },
  {
    id: 11,
    src: "/images/gallery/event-11.jpg",
    alt: "Musicians performing",
    category: "corporate",
  },
  {
    id: 12,
    src: "/images/gallery/event-12.jpg",
    alt: "Event venue",
    category: "private",
  },
] as const;

export type GalleryCategory = "all" | "corporate" | "celebrations" | "private";

export const VIDEOS = [
  {
    id: "291123424",
    titleKey: "video1",
    category: "corporate",
  },
  {
    id: "651502970",
    titleKey: "video2",
    category: "celebrations",
  },
  {
    id: "291534836",
    titleKey: "video3",
    category: "private",
  },
] as const;

// Video assignments for service pages
export const SERVICE_VIDEOS = {
  corporate: "291123424",
  barMitzvahs: "651502970",
  privateEvents: "291534836",
} as const;

// Corporate clients
export const CORPORATE_CLIENTS = [
  { name: "Hermès", url: "https://www.hermes.com" },
  { name: "Chanel", url: "https://www.chanel.com" },
  { name: "Schwarzkopf", url: "https://www.schwarzkopf.com" },
  { name: "Sephora", url: "https://www.sephora.com" },
  { name: "Reckitt Benckiser", url: "https://www.reckitt.com" },
  { name: "Club Med", url: "https://www.clubmed.com" },
  { name: "Éditis", url: "https://www.editis.com" },
  { name: "FNAIM", url: "https://www.fnaim.fr" },
  { name: "Guinot Mary Cohr", url: "https://www.guinot.com" },
  { name: "Capgemini", url: "https://www.capgemini.com" },
  { name: "La Poste", url: "https://www.laposte.fr" },
  { name: "Sanofi", url: "https://www.sanofi.com" },
  { name: "Vinci", url: "https://www.vinci.com" },
  { name: "Milleis", url: "https://www.milleis.fr" },
  { name: "Murex", url: "https://www.murex.com" },
  { name: "Bacardi", url: "https://www.bacardi.com" },
  { name: "Danone", url: "https://www.danone.com" },
  { name: "SAP", url: "https://www.sap.com" },
] as const;
