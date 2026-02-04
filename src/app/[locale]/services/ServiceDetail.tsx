"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, ArrowRight, Film } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button, VimeoPlayer } from "@/components/ui";
import { SERVICE_VIDEOS } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

type ServiceType = "corporate" | "barMitzvahs" | "privateEvents";

// Map service types to gallery images
const serviceImages: Record<ServiceType, string[]> = {
  corporate: [
    "/images/gallery/event-1.jpg",
    "/images/gallery/event-3.jpg",
    "/images/gallery/event-5.jpg",
    "/images/gallery/event-7.jpg",
  ],
  barMitzvahs: [
    "/images/gallery/event-4.jpg",
    "/images/gallery/event-6.jpg",
    "/images/gallery/event-9.jpg",
    "/images/gallery/event-2.jpg",
  ],
  privateEvents: [
    "/images/gallery/event-8.jpg",
    "/images/gallery/event-10.jpg",
    "/images/gallery/event-11.jpg",
    "/images/gallery/event-12.jpg",
  ],
};

export function ServiceDetail({ type }: { type: ServiceType }) {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const tVideos = useTranslations("videos");

  const features = t.raw(`${type}.features`) as string[];
  const images = serviceImages[type];
  const videoId = SERVICE_VIDEOS[type];

  return (
    <>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-6">
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
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5B2D8A]/10 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-[#5B2D8A]" />
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
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={images[0]}
                    alt="Performance"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src={images[1]}
                    alt="Event"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src={images[2]}
                    alt="Celebration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={images[3]}
                    alt="Dance floor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <Film size={20} className="text-[#5B2D8A]" />
                <span className="text-[#5B2D8A] text-sm uppercase tracking-[0.3em]">
                  {tVideos("subtitle")}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
                {tVideos("title")}
              </h3>
            </motion.div>

            <motion.div variants={fadeUp}>
              <VimeoPlayer
                videoId={videoId}
                title={t(`${type}.title`)}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
