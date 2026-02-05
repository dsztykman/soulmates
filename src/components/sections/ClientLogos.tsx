"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { CORPORATE_CLIENTS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function ClientLogos() {
  const t = useTranslations("clients");

  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-2xl sm:text-3xl font-bold text-[#FAFAFA] mb-12"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {CORPORATE_CLIENTS.map((client, index) => (
            <motion.a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] border border-[#252525] hover:border-[#CCB380]/50 transition-all duration-300 group cursor-pointer min-h-[100px]"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-[#A1A1A1] group-hover:text-[#FAFAFA] text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 text-center">
                {client.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
