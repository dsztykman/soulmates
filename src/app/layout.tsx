import type { Metadata } from "next";
import "./globals.css";

// Using system Avenir font stack - Avenir is available on macOS and iOS
// Falls back to Avenir Next (also a system font) and then system-ui
const avenirFontClass = "font-avenir";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.soulmatesorchestra.com"),
  title: {
    default: "Soulmates Orchestra | Premium Live Entertainment",
    template: "%s | Soulmates Orchestra",
  },
  description:
    "World-class orchestra and DJ services for corporate events, bar/bat mitzvahs, and private celebrations in Paris.",
  keywords: [
    "orchestra",
    "live entertainment",
    "corporate events",
    "bar mitzvah",
    "bat mitzvah",
    "wedding music",
    "Paris",
    "DJ services",
    "event entertainment",
  ],
  authors: [{ name: "Soulmates Orchestra" }],
  creator: "Soulmates Orchestra",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_GB",
    url: "https://www.soulmatesorchestra.com",
    siteName: "Soulmates Orchestra",
    title: "Soulmates Orchestra | Premium Live Entertainment",
    description:
      "World-class orchestra and DJ services for corporate events, bar/bat mitzvahs, and private celebrations in Paris.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soulmates Orchestra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soulmates Orchestra | Premium Live Entertainment",
    description:
      "World-class orchestra and DJ services for corporate events, bar/bat mitzvahs, and private celebrations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// Font class exported for use in locale layout
export const fontVariables = avenirFontClass;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Root layout just passes children - html/body are in locale layout
  return children;
}
