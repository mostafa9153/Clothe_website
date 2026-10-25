"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "@/types/database.types";

interface ProductLightboxProps {
  images: ProductImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductLightbox({ images, initialIndex, isOpen, onClose }: ProductLightboxProps) {
  const [index, setIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  // Keyboard navigation: Left/Right/Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((prev) => (prev - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIndex((prev) => (prev + 1) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 select-none animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-20"
        aria-label="Close fullscreen lightbox"
      >
        <X className="w-6 h-6 stroke-[1.25]" />
      </button>

      {/* Main Image */}
      <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
        <Image
          src={images[index]?.url || ""}
          alt={images[index]?.alt || "Atelier piece high-resolution detail"}
          fill
          priority
          className="object-contain"
          sizes="90vw"
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 stroke-[1.25]" />
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 stroke-[1.25]" />
          </button>
        </>
      )}

      {/* Bottom Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs tracking-widest tabular-nums font-mono">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
