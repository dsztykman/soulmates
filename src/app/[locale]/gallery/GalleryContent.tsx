"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Film } from "lucide-react";
import { GALLERY_IMAGES, VIDEOS, GalleryCategory } from "@/lib/constants";
import { VimeoPlayer } from "@/components/ui";
import { fadeUp, staggerContainer, staggerItem, heroTextVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

const categories: GalleryCategory[] = ["all", "corporate", "celebrations", "private"];
type MediaTab = "photos" | "videos";

export function GalleryContent() {
  const t = useTranslations("gallery");
  const tVideos = useTranslations("videos");
  const [activeTab, setActiveTab] = useState<MediaTab>("photos");
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const currentIndex = selectedImage !== null
    ? filteredImages.findIndex((img) => img.id === selectedImage)
    : -1;

  const navigateImage = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
        : (currentIndex + 1) % filteredImages.length;

    setSelectedImage(filteredImages[newIndex].id);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/gallery/event-14.jpg')`,
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5B2D8A]/10 border border-[#5B2D8A]/30 mb-8"
          >
            <Camera size={32} className="text-[#5B2D8A]" />
          </motion.div>

          <motion.h1
            variants={heroTextVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FAFAFA] mb-6"
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

      {/* Gallery Section */}
      <section className="section-padding bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          {/* Tab Switcher */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center gap-2 mb-8"
          >
            <button
              onClick={() => setActiveTab("photos")}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === "photos"
                  ? "bg-[#5B2D8A] text-white"
                  : "bg-[#1A1A1A] text-[#A1A1A1] hover:text-[#FAFAFA] border border-[#252525]"
              )}
            >
              <Camera size={18} />
              {t("tabs.photos")}
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === "videos"
                  ? "bg-[#5B2D8A] text-white"
                  : "bg-[#1A1A1A] text-[#A1A1A1] hover:text-[#FAFAFA] border border-[#252525]"
              )}
            >
              <Film size={18} />
              {t("tabs.videos")}
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "photos" ? (
              <motion.div
                key="photos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        activeCategory === category
                          ? "bg-[#5B2D8A] text-white"
                          : "bg-[#1A1A1A] text-[#A1A1A1] hover:text-[#FAFAFA] border border-[#252525] hover:border-[#5B2D8A]/50"
                      )}
                    >
                      {t(`categories.${category}`)}
                    </button>
                  ))}
                </div>

                {/* Masonry Grid */}
                <motion.div
                  layout
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredImages.map((image, index) => (
                      <motion.div
                        key={image.id}
                        layout
                        variants={staggerItem}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="break-inside-avoid"
                      >
                        <motion.button
                          onClick={() => setSelectedImage(image.id)}
                          className="relative w-full overflow-hidden rounded-xl group"
                          style={{
                            aspectRatio: index % 3 === 0 ? "4/5" : index % 3 === 1 ? "1/1" : "5/4",
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 right-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-sm text-[#5B2D8A] capitalize">
                              {t(`categories.${image.category}`)}
                            </span>
                          </div>
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Videos Grid */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {VIDEOS.map((video) => (
                    <motion.div key={video.id} variants={staggerItem}>
                      <VimeoPlayer
                        videoId={video.id}
                        title={tVideos(`titles.${video.titleKey}`)}
                      />
                      <p className="mt-3 text-center text-[#A1A1A1] text-sm">
                        {tVideos(`titles.${video.titleKey}`)}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-[#1A1A1A] text-[#FAFAFA] hover:bg-[#252525] transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 z-10 p-3 rounded-full bg-[#1A1A1A] text-[#FAFAFA] hover:bg-[#252525] transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 z-10 p-3 rounded-full bg-[#1A1A1A] text-[#FAFAFA] hover:bg-[#252525] transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh] aspect-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredImages.find((img) => img.id === selectedImage) && (
                <Image
                  src={filteredImages.find((img) => img.id === selectedImage)!.src}
                  alt={filteredImages.find((img) => img.id === selectedImage)!.alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[85vh] w-auto rounded-lg"
                />
              )}
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#A1A1A1] text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
