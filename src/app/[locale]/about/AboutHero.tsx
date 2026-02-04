"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { heroTextVariants, staggerContainer } from "@/lib/animations";

export function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1920&q=80')`,
          }}
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
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5B2D8A]/10 border border-[#5B2D8A]/30 mb-8"
        >
          <Users size={32} className="text-[#5B2D8A]" />
        </motion.div>

        <motion.h1
          variants={heroTextVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold  text-[#FAFAFA] mb-6"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          variants={heroTextVariants}
          className="text-lg sm:text-xl text-[#A1A1A1] max-w-2xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>
      </motion.div>
    </section>
  );
}
