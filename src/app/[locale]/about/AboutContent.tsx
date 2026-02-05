"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music, Sparkles, Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem } from "@/lib/animations";

const valueIcons = [Music, Sparkles, Users, Shield];

export function AboutContent() {
  const t = useTranslations("about");

  const values = t.raw("values.items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <>
      {/* Story Section */}
      <section className="section-padding bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Image */}
            <motion.div variants={fadeLeft} className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80"
                  alt="Orchestra performance"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl bg-[#CCB380]/10 border border-[#CCB380]/30 -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeRight}>
              <h2 className="text-3xl sm:text-4xl font-bold  text-[#FAFAFA] mb-6">
                {t("title")}
              </h2>
              <p className="text-[#A1A1A1] text-lg leading-relaxed mb-8">
                {t("description")}
              </p>

              {/* Mission */}
              <div className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#252525]">
                <h3 className="text-xl font-semibold text-[#CCB380] mb-3 ">
                  {t("mission.title")}
                </h3>
                <p className="text-[#A1A1A1]">{t("mission.description")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold  text-[#FAFAFA]">
              {t("values.title")}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <motion.div key={index} variants={staggerItem}>
                  <Card className="h-full text-center border border-[#252525] hover:border-[#CCB380]/50">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-[#CCB380]/10 flex items-center justify-center mx-auto mb-6">
                        <Icon size={28} className="text-[#CCB380]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#FAFAFA] mb-3 ">
                        {value.title}
                      </h3>
                      <p className="text-[#A1A1A1] text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
