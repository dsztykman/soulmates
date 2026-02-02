"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

// =============================================================================
// CONFIGURATION - Choose your embed method
// =============================================================================

// Option 1: Elfsight Widget
// Sign up at https://elfsight.com/instagram-feed-widget/ and paste your widget ID
const ELFSIGHT_WIDGET_ID = process.env.NEXT_PUBLIC_ELFSIGHT_WIDGET_ID || "";

// Option 2: Behold Widget
// Sign up at https://behold.so/ and paste your feed ID
const BEHOLD_FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID || "";

// Option 3: Use placeholder images (fallback when no widget configured)
const USE_PLACEHOLDERS = !ELFSIGHT_WIDGET_ID && !BEHOLD_FEED_ID;

// =============================================================================

// Fallback placeholder posts when no widget is configured
const PLACEHOLDER_POSTS = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
    caption: "Amazing night at the gala!",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    caption: "Energy on the dance floor",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
    caption: "Live performance",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    caption: "Beautiful wedding celebration",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=80",
    caption: "Intimate dinner event",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80",
    caption: "Stage lights",
  },
];

const instagramHandle = SITE_CONFIG.social.instagram.split("/").pop() || "soulmatesorchestra";

// Elfsight Widget Component
function ElfsightWidget({ widgetId }: { widgetId: string }) {
  useEffect(() => {
    // Load Elfsight script if not already loaded
    if (!document.querySelector('script[src*="elfsight.com"]')) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="elfsight-app-lazy"
      data-elfsight-app-lazy
      data-app-id={widgetId}
    />
  );
}

// Behold Widget Component
function BeholdWidget({ feedId }: { feedId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Behold script if not already loaded
    if (!document.querySelector('script[src*="behold.so"]')) {
      const script = document.createElement("script");
      script.src = "https://w.behold.so/widget.js";
      script.type = "module";
      script.async = true;
      document.body.appendChild(script);
    }

    // Create the custom element
    if (containerRef.current && !containerRef.current.querySelector("behold-widget")) {
      const widget = document.createElement("behold-widget");
      widget.setAttribute("feed-id", feedId);
      containerRef.current.appendChild(widget);
    }
  }, [feedId]);

  return <div ref={containerRef} />;
}

// Placeholder Grid Component
function PlaceholderGrid() {
  const t = useTranslations("instagram");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
    >
      {PLACEHOLDER_POSTS.map((post) => (
        <motion.a
          key={post.id}
          href={SITE_CONFIG.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          variants={staggerItem}
          className="relative aspect-square group overflow-hidden rounded-xl"
        >
          <Image
            src={post.image}
            alt={post.caption}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[#0A0A0A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center">
              <Instagram size={24} className="text-white mx-auto mb-2" />
              <p className="text-white text-sm font-medium">{t("viewPost")}</p>
            </div>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}

export function InstagramFeed() {
  const t = useTranslations("instagram");

  return (
    <section className="section-padding bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
              <Instagram size={24} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-[#A1A1A1] text-sm">{t("followUs")}</p>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAFA] font-semibold hover:text-[#C9A962] transition-colors"
              >
                @{instagramHandle}
              </a>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[#FAFAFA] mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[#A1A1A1] max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Instagram Feed - Widget or Placeholder */}
        <div className="mb-10">
          {ELFSIGHT_WIDGET_ID ? (
            <ElfsightWidget widgetId={ELFSIGHT_WIDGET_ID} />
          ) : BEHOLD_FEED_ID ? (
            <BeholdWidget feedId={BEHOLD_FEED_ID} />
          ) : (
            <PlaceholderGrid />
          )}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="group">
              <Instagram size={20} className="mr-2" />
              {t("followButton")}
              <ExternalLink size={16} className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
