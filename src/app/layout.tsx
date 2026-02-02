import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.soulmatesorchestra.com"),
  title: {
    default: "Soulmates Orchestra | Premium Live Entertainment",
    template: "%s | Soulmates Orchestra",
  },
  description:
    "World-class orchestra and DJ services for corporate events, bar/bat mitzvahs, and private celebrations in Montreal.",
  keywords: [
    "orchestra",
    "live entertainment",
    "corporate events",
    "bar mitzvah",
    "bat mitzvah",
    "wedding music",
    "Montreal",
    "DJ services",
    "event entertainment",
  ],
  authors: [{ name: "Soulmates Orchestra" }],
  creator: "Soulmates Orchestra",
  openGraph: {
    type: "website",
    locale: "en_CA",
    alternateLocale: "fr_CA",
    url: "https://www.soulmatesorchestra.com",
    siteName: "Soulmates Orchestra",
    title: "Soulmates Orchestra | Premium Live Entertainment",
    description:
      "World-class orchestra and DJ services for corporate events, bar/bat mitzvahs, and private celebrations in Montreal.",
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

// Font classes exported for use in locale layout
export const fontVariables = `${inter.variable} ${playfair.variable}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Root layout just passes children - html/body are in locale layout
  return children;
}
