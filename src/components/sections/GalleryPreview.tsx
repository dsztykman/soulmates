"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import { GALLERY_IMAGES } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem, imageHoverVariants } from "@/lib/animations";

export function GalleryPreview() {
  const t = useTranslations();
  const previewImages = GALLERY_IMAGES.slice(0, 6);

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
            className="text-[#5B2D8A] text-sm uppercase tracking-[0.3em] mb-4"
          >
            {t("gallery.subtitle")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold  text-[#FAFAFA]"
          >
            {t("gallery.title")}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
        >
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={staggerItem}
              className={`relative overflow-hidden rounded-xl ${
                index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <motion.div
                variants={imageHoverVariants}
                initial="rest"
                whileHover="hover"
                className="relative w-full h-full"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/gallery">
            <Button variant="outline" size="lg" className="group">
              {t("common.viewGallery")}
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
