"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "@/types/database.types";
import { ProductLightbox } from "./product-lightbox";

interface ProductGalleryProps {
  images: ProductImage[];
  selectedColor?: string;
}

export function ProductGallery({ images, selectedColor }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [zoomStyle, setZoomStyle] = React.useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = React.useState(false);

  // If selected color matches an image with that color, switch to it
  React.useEffect(() => {
    if (selectedColor) {
      const matchIdx = images.findIndex(
        (img) => img.color && img.color.toLowerCase() === selectedColor.toLowerCase()
      );
      if (matchIdx !== -1) {
        setSelectedIndex(matchIdx);
      }
    }
  }, [selectedColor, images]);

  // 2x Pan-Zoom handler on mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  const currentImage = images[selectedIndex] || images[0];

  return (
    <>
      <div className="w-full flex flex-col-reverse md:flex-row gap-4 lg:gap-6 items-start">
        {/* Desktop Vertical Thumbnails (hidden on mobile) */}
        {images.length > 1 && (
          <div className="hidden md:flex flex-col gap-3 w-20 lg:w-24 flex-shrink-0">
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative aspect-[3/4] w-full bg-[#E4DFD5]/40 overflow-hidden border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#111111] ring-1 ring-[#111111]"
                      : "border-[#E4DFD5] opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`View image thumbnail ${idx + 1}`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || "Thumbnail"}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Main Display Image with Hover Zoom Pan & Lightbox Trigger */}
        <div className="flex-1 relative aspect-[3/4] w-full bg-[#E4DFD5]/30 overflow-hidden group">
          {/* Zoomable Image Container */}
          <div
            className="w-full h-full cursor-zoom-in relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsLightboxOpen(true)}
          >
            {currentImage && (
              <Image
                src={currentImage.url}
                alt={currentImage.alt || "Atelier piece detailed view"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                style={zoomStyle}
                className="object-cover transition-transform duration-200 ease-out"
              />
            )}
          </div>

          {/* Lightbox Icon Indicator */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-xs text-[#111111] border border-[#E4DFD5] shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Open fullscreen image view"
          >
            <Maximize2 className="w-4 h-4 stroke-[1.25]" />
          </button>

          {/* Mobile Swipe / Carousel Navigation Arrows */}
          {images.length > 1 && (
            <div className="md:hidden">
              <button
                onClick={() => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full text-[#111111] shadow-xs"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full text-[#111111] shadow-xs"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      selectedIndex === idx ? "w-6 bg-[#111111]" : "w-1.5 bg-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <ProductLightbox
        images={images}
        initialIndex={selectedIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
