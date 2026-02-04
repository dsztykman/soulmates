"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function CTA() {
  const t = useTranslations();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#5B2D8A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A96A]/10 rounded-full blur-3xl" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B2D8A]/10 border border-[#5B2D8A]/30 mb-8"
          >
            <Mail size={16} className="text-[#5B2D8A]" />
            <span className="text-sm text-[#5B2D8A]">
              {t("contact.description")}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold  text-[#FAFAFA] mb-6"
          >
            {t("contact.subtitle")}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-[#A1A1A1] mb-10"
          >
            {t("about.mission.description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button size="lg" className="group">
                {t("common.getQuote")}
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" size="lg">
                {t("common.ourServices")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
