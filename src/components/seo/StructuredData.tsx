import { SITE_CONFIG } from "@/lib/constants";

type StructuredDataProps = {
  type: "organization" | "localBusiness" | "service" | "event";
  data?: Record<string, unknown>;
};

export function StructuredData({ type, data = {} }: StructuredDataProps) {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.tiktok,
      SITE_CONFIG.social.facebook,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: "customer service",
      availableLanguage: ["English", "French"],
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#business`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montreal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5017,
      longitude: -73.5673,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Montreal",
      },
      {
        "@type": "State",
        name: "Quebec",
      },
      {
        "@type": "Country",
        name: "Canada",
      },
    ],
    priceRange: "$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.tiktok,
      SITE_CONFIG.social.facebook,
    ],
    ...data,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Live Entertainment",
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: {
      "@type": "City",
      name: "Montreal",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Entertainment Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Event Entertainment",
            description:
              "Live orchestra and DJ services for corporate events, galas, and company celebrations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bar & Bat Mitzvah Entertainment",
            description:
              "Traditional and contemporary music for Bar and Bat Mitzvah celebrations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Event Entertainment",
            description:
              "Personalized entertainment for weddings, anniversaries, and private celebrations.",
          },
        },
      ],
    },
    ...data,
  };

  const schemas: Record<string, object> = {
    organization: baseOrganization,
    localBusiness,
    service: serviceSchema,
    event: {
      "@context": "https://schema.org",
      "@type": "Event",
      ...data,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas[type]),
      }}
    />
  );
}
