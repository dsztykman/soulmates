import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  // Note: Using same paths for both languages for static export compatibility
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/services/corporate": "/services/corporate",
    "/services/bar-mitzvahs": "/services/bar-mitzvahs",
    "/services/private-events": "/services/private-events",
    "/about": "/about",
    "/gallery": "/gallery",
    "/contact": "/contact",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
