"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook, Music2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const socialLinks = [
  { icon: Instagram, href: SITE_CONFIG.social.instagram, label: "Instagram" },
  { icon: Youtube, href: SITE_CONFIG.social.youtube, label: "YouTube" },
  { icon: Music2, href: SITE_CONFIG.social.tiktok, label: "TikTok" },
  { icon: Facebook, href: SITE_CONFIG.social.facebook, label: "Facebook" },
];

const quickLinks = [
  { href: "/services", labelKey: "services" },
  { href: "/about", labelKey: "about" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#252525]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold  text-gradient-primary">
                Soulmates Orchestra
              </span>
            </Link>
            <p className="text-[#A1A1A1] max-w-md mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#A1A1A1] hover:bg-[#CCB380] hover:text-[#0A0A0A] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="text-lg font-semibold text-[#FAFAFA] mb-4 ">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A1A1A1] hover:text-[#CCB380] transition-colors"
                  >
                    {t(`common.navigation.${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h4 className="text-lg font-semibold text-[#FAFAFA] mb-4 ">
              {t("footer.connect")}
            </h4>
            <ul className="space-y-3 text-[#A1A1A1]">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-[#CCB380] transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-[#CCB380] transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>{SITE_CONFIG.location}</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-[#252525]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6B6B6B]">
            <p>
              &copy; {currentYear} {SITE_CONFIG.name}. {t("footer.copyright")}
            </p>
            <p className="flex items-center gap-1">
              Crafted with <span className="text-[#CCB380]">♪</span> in Paris
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
