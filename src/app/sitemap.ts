import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const baseUrl = "https://www.soulmatesorchestra.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/services/corporate",
    "/services/bar-mitzvahs",
    "/services/private-events",
    "/about",
    "/gallery",
    "/contact",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  for (const locale of routing.locales) {
    for (const route of routes) {
      const localizedRoute = locale === routing.defaultLocale ? route : `/${locale}${route}`;

      sitemapEntries.push({
        url: `${baseUrl}${localizedRoute}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/services" ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            fr: `${baseUrl}/fr${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
