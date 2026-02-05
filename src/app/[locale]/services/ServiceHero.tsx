"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, Star, Heart, Sparkles } from "lucide-react";
import { heroTextVariants, staggerContainer } from "@/lib/animations";

type ServiceType = "overview" | "corporate" | "barMitzvahs" | "privateEvents";

const serviceConfig = {
  overview: {
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80",
  },
  corporate: {
    icon: Building2,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80",
  },
  barMitzvahs: {
    icon: Star,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  },
  privateEvents: {
    icon: Heart,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80",
  },
};

export function ServiceHero({ type }: { type: ServiceType }) {
  const t = useTranslations("services");
  const config = serviceConfig[type];
  const Icon = config.icon;

  const title = type === "overview" ? t("title") : t(`${type}.title`);
  const subtitle = type === "overview" ? t("subtitle") : t(`${type}.shortDescription`);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${config.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/70 to-[#0A0A0A]" />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 text-center py-20"
      >
        <motion.div
          variants={heroTextVariants}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#CCB380]/10 border border-[#CCB380]/30 mb-8"
        >
          <Icon size={32} className="text-[#CCB380]" />
        </motion.div>

        <motion.h1
          variants={heroTextVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold  text-[#FAFAFA] mb-6"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={heroTextVariants}
          className="text-lg sm:text-xl text-[#A1A1A1] max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
