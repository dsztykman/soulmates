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
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    alt: "Orchestra performance at gala",
    category: "corporate",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Wedding celebration",
    category: "private",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    alt: "Corporate event entertainment",
    category: "corporate",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    alt: "Party celebration",
    category: "celebrations",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    alt: "Live band performance",
    category: "corporate",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
    alt: "Celebration dinner",
    category: "celebrations",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    alt: "Concert lighting",
    category: "corporate",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    alt: "Dance floor celebration",
    category: "private",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
    alt: "Bar Mitzvah celebration",
    category: "celebrations",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
    alt: "DJ setup",
    category: "private",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    alt: "Musicians performing",
    category: "corporate",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&q=80",
    alt: "Elegant venue",
    category: "private",
  },
] as const;

export type GalleryCategory = "all" | "corporate" | "celebrations" | "private";
