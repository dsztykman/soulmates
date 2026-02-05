"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

interface VimeoPlayerProps {
  videoId: string;
  title?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  autoplay?: boolean;
  showThumbnail?: boolean;
  className?: string;
}

export function VimeoPlayer({
  videoId,
  title,
  aspectRatio = "16/9",
  autoplay = false,
  showThumbnail = true,
  className = "",
}: VimeoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const thumbnailUrl = `https://vumbnail.com/${videoId}.jpg`;

  const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;

  if (isPlaying) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-[#0A0A0A] ${className}`}
        style={{ aspectRatio }}
      >
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title || "Vimeo video"}
        />
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => setIsPlaying(true)}
      className={`relative w-full overflow-hidden rounded-2xl bg-[#0A0A0A] group cursor-pointer ${className}`}
      style={{ aspectRatio }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {showThumbnail && (
        <Image
          src={thumbnailUrl}
          alt={title || "Video thumbnail"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#0A0A0A]/30 transition-colors duration-300" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[#CCB380] flex items-center justify-center group-hover:bg-[#DCC799] transition-colors duration-300 shadow-lg">
          <Play size={32} className="text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Title */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent">
          <p className="text-white font-medium text-lg">{title}</p>
        </div>
      )}
    </motion.button>
  );
}
