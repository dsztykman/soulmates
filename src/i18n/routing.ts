import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/services": {
      en: "/services",
      fr: "/services",
    },
    "/services/corporate": {
      en: "/services/corporate",
      fr: "/services/entreprises",
    },
    "/services/bar-mitzvahs": {
      en: "/services/bar-mitzvahs",
      fr: "/services/bar-mitzvahs",
    },
    "/services/private-events": {
      en: "/services/private-events",
      fr: "/services/evenements-prives",
    },
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/gallery": {
      en: "/gallery",
      fr: "/galerie",
    },
    "/contact": {
      en: "/contact",
      fr: "/contact",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
