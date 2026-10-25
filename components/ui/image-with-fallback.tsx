"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
  aspectRatio?: "portrait" | "square" | "landscape" | "banner" | "auto";
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackText = "Maison Auré Atelier Piece",
  aspectRatio = "portrait",
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClasses = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    banner: "aspect-[16/9] md:aspect-[21/9]",
    auto: "",
  };

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "w-full bg-[#F0EDE6] border border-[#E4DFD5] flex flex-col items-center justify-center p-6 text-center select-none",
          aspectClasses[aspectRatio],
          className
        )}
      >
        <Sparkles className="w-6 h-6 stroke-[1.25] text-[#B08D57] mb-2 opacity-60" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C] font-medium max-w-[200px]">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-[#F0EDE6]", aspectClasses[aspectRatio], className)}>
      <Image
        src={src}
        alt={alt || fallbackText}
        className={cn(
          "object-cover transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-[#E4DFD5]/40 animate-pulse" />
      )}
    </div>
  );
}
