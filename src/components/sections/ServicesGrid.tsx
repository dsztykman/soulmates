"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, Star, Heart, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, Button } from "@/components/ui";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const services = [
  {
    key: "corporate",
    href: "/services/corporate",
    icon: Building2,
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    key: "barMitzvahs",
    href: "/services/bar-mitzvahs",
    icon: Star,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    key: "privateEvents",
    href: "/services/private-events",
    icon: Heart,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
] as const;

export function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <section className="section-padding bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#CCB380] text-sm uppercase tracking-[0.3em] mb-4"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold  text-[#FAFAFA]"
          >
            {t("title")}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.key} variants={staggerItem}>
              <Link href={service.href as "/services/corporate" | "/services/bar-mitzvahs" | "/services/private-events"} className="block h-full">
                <Card className="h-full group relative overflow-hidden border border-[#252525] hover:border-[#CCB380]/50">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <CardContent className="relative z-10 p-8">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-[#CCB380]/10 flex items-center justify-center mb-6 group-hover:bg-[#CCB380] group-hover:text-[#0A0A0A] transition-all duration-300">
                      <service.icon
                        size={28}
                        className="text-[#CCB380] group-hover:text-[#0A0A0A] transition-colors"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#FAFAFA] mb-3 ">
                      {t(`${service.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-[#A1A1A1] mb-6 line-clamp-3">
                      {t(`${service.key}.shortDescription`)}
                    </p>

                    {/* Link */}
                    <span className="inline-flex items-center text-[#CCB380] font-medium group-hover:gap-2 transition-all">
                      {t("viewDetails")}
                      <ArrowRight
                        size={16}
                        className="ml-1 opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
