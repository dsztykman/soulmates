"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

type ServiceType = "corporate" | "barMitzvahs" | "privateEvents";

export function ServiceDetail({ type }: { type: ServiceType }) {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");

  const features = t.raw(`${type}.features`) as string[];

  return (
    <section className="section-padding bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[#FAFAFA] mb-6">
              {t(`${type}.title`)}
            </h2>
            <p className="text-[#A1A1A1] text-lg leading-relaxed mb-8">
              {t(`${type}.description`)}
            </p>

            {/* Features List */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 mb-10"
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C9A962]/10 flex items-center justify-center mt-0.5">
                    <Check size={14} className="text-[#C9A962]" />
                  </span>
                  <span className="text-[#FAFAFA]">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            <Link href="/contact">
              <Button size="lg" className="group">
                {tCommon("getQuote")}
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80"
                  alt="Performance"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80"
                  alt="Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=80"
                  alt="Celebration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80"
                  alt="Dance floor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
