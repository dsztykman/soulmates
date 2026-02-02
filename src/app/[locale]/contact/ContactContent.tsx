"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, heroTextVariants } from "@/lib/animations";

export function ContactContent() {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      icon: Mail,
      label: t("info.email"),
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
    },
    {
      icon: Phone,
      label: t("info.phone"),
      value: SITE_CONFIG.phone,
      href: `tel:${SITE_CONFIG.phone}`,
    },
    {
      icon: MapPin,
      label: t("info.location"),
      value: t("info.locationValue"),
      href: null,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/70 to-[#0A0A0A]" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 container mx-auto px-4 text-center py-16"
        >
          <motion.div
            variants={heroTextVariants}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A962]/10 border border-[#C9A962]/30 mb-8"
          >
            <MessageSquare size={32} className="text-[#C9A962]" />
          </motion.div>

          <motion.h1
            variants={heroTextVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-[#FAFAFA] mb-6"
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

      {/* Contact Section */}
      <section className="section-padding bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-playfair)] text-[#FAFAFA] mb-6">
                {t("description")}
              </h2>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center">
                      <info.icon size={22} className="text-[#C9A962]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#A1A1A1] mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-[#FAFAFA] hover:text-[#C9A962] transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[#FAFAFA]">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Image */}
              <div className="hidden lg:block relative aspect-video rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80"
                  alt="Orchestra"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#252525]">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
