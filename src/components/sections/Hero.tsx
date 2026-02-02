"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import { heroTextVariants, fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/50 to-[#0A0A0A]" />
        {/* Subtle Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A962' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 text-center"
      >
        {/* Subtitle */}
        <motion.p
          variants={heroTextVariants}
          className="text-[#C9A962] text-sm sm:text-base uppercase tracking-[0.3em] mb-6"
        >
          {t("subtitle")}
        </motion.p>

        {/* Main Title */}
        <motion.h1
          variants={heroTextVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] text-[#FAFAFA] mb-6 leading-tight"
        >
          {t("title").split(" ").map((word, i) => (
            <span key={i} className="inline-block">
              {i === 1 ? (
                <span className="text-gradient-gold">{word}</span>
              ) : (
                word
              )}
              {i < t("title").split(" ").length - 1 && " "}
            </span>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={heroTextVariants}
          className="text-lg sm:text-xl text-[#A1A1A1] max-w-2xl mx-auto mb-10"
        >
          {t("description")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact">
            <Button size="lg" className="group">
              {t("cta.primary")}
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
          <Link href="/gallery">
            <Button variant="secondary" size="lg" className="group">
              <Play size={18} className="mr-2" />
              {t("cta.secondary")}
            </Button>
          </Link>
        </motion.div>

        {/* Service Quick Links */}
        <motion.div
          variants={fadeUp}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { href: "/services/corporate", labelKey: "corporate" },
            { href: "/services/bar-mitzvahs", labelKey: "barMitzvahs" },
            { href: "/services/private-events", labelKey: "privateEvents" },
          ].map((service) => (
            <Link
              key={service.href}
              href={service.href as "/services/corporate" | "/services/bar-mitzvahs" | "/services/private-events"}
              className="group p-4 rounded-xl glass border border-[#C9A962]/20 hover:border-[#C9A962]/60 transition-all duration-300"
            >
              <span className="text-sm text-[#A1A1A1] group-hover:text-[#C9A962] transition-colors">
                {service.labelKey === "corporate" && "Corporate Events"}
                {service.labelKey === "barMitzvahs" && "Bar & Bat Mitzvahs"}
                {service.labelKey === "privateEvents" && "Private Events"}
              </span>
            </Link>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-[#C9A962]/50 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[#C9A962]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
