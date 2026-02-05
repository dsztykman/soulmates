"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Film } from "lucide-react";
import { VimeoPlayer } from "@/components/ui/VimeoPlayer";
import { fadeUp, staggerContainer } from "@/lib/animations";

// Featured video for homepage
const FEATURED_VIDEO = {
  id: "291123424",
  titleKey: "featured",
};

export function VideoShowcase() {
  const t = useTranslations("videos");

  return (
    <section className="section-padding bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Film size={20} className="text-[#CCB380]" />
            <span className="text-[#CCB380] text-sm uppercase tracking-[0.3em]">
              {t("subtitle")}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[#A1A1A1] max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <VimeoPlayer
            videoId={FEATURED_VIDEO.id}
            title={t(`titles.${FEATURED_VIDEO.titleKey}`)}
          />
        </motion.div>
      </div>
    </section>
  );
}
