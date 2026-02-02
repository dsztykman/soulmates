"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

// Sample posts - replace with actual Instagram API data or embed widget
const INSTAGRAM_POSTS = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
    likes: 234,
    caption: "Amazing night at the gala!",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    likes: 189,
    caption: "Energy on the dance floor",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
    likes: 312,
    caption: "Live performance",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    likes: 276,
    caption: "Beautiful wedding celebration",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=80",
    likes: 198,
    caption: "Intimate dinner event",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80",
    likes: 256,
    caption: "Stage lights",
  },
];

// Extract Instagram handle from URL
const instagramHandle = SITE_CONFIG.social.instagram.split("/").pop() || "soulmatesorchestra";

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

        {/* Instagram Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10"
        >
          {INSTAGRAM_POSTS.map((post) => (
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
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-transparent bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:destination-out] [mask-composite:exclude]" />
            </motion.a>
          ))}
        </motion.div>

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
