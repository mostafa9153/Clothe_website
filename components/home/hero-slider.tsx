"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    eyebrow: "Eid & Festive 2026 Collection",
    title: "Quiet Elegance. Timeless Modesty.",
    subtitle: "Architectural modest silhouettes sculpted from imported Dubai Nida, liquid Medina silk, and artisanal hand-loomed textiles.",
    image: "https://images.pexels.com/photos/13838843/pexels-photo-13838843.jpeg?auto=compress&cs=tinysrgb&w=1600",
    primaryCtaText: "Shop The Collection",
    primaryCtaLink: "/shop",
    secondaryCtaText: "Burkha & Abaya",
    secondaryCtaLink: "/category/burkha",
  },
  {
    id: "slide-2",
    eyebrow: "Pure Dubai Nida Atelier",
    title: "The Dignity of Fluid Drape.",
    subtitle: "Front-open burkhas, Moroccan embroidered silhouettes, and breathable three-layer Saudi niqabs tailored for effortless grace.",
    image: "https://images.pexels.com/photos/13791315/pexels-photo-13791315.jpeg?auto=compress&cs=tinysrgb&w=1600",
    primaryCtaText: "Discover Burkhas",
    primaryCtaLink: "/category/burkha",
    secondaryCtaText: "Hijabs & Niqabs",
    secondaryCtaLink: "/category/hijab",
  },
  {
    id: "slide-3",
    eyebrow: "Festive Panjabi & Jubba Drop",
    title: "Masculine Festive Grace.",
    subtitle: "Zardozi embroidered collars, certified 120s Egyptian Giza cotton, and tailored Kabli sets engineered for Eid prayers.",
    image: "https://images.pexels.com/photos/6687208/pexels-photo-6687208.jpeg?auto=compress&cs=tinysrgb&w=1600",
    primaryCtaText: "Shop Men's Panjabi",
    primaryCtaLink: "/category/panjabi",
    secondaryCtaText: "Modest Sets & Combos",
    secondaryCtaLink: "/category/sets-combos",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      aria-label="Atelier Hero Slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[88vh] min-h-[600px] max-h-[960px] overflow-hidden bg-[#111111]"
    >
      {/* Background Images with crossfade */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={idx === 0}
            className="object-cover object-center scale-105 animate-ken-burns"
            sizes="100vw"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col justify-end pb-16 sm:pb-24">
        <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
          <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#E8D8C8] font-medium">
            {slide.eyebrow}
          </span>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-[#FFFFFF]">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#F7F4EE]/85 max-w-lg leading-relaxed font-light">
            {slide.subtitle}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap gap-4 items-center">
            <Button
              asChild
              className="bg-[#FFFFFF] text-[#111111] hover:bg-[#B08D57] hover:text-[#FFFFFF] text-xs uppercase tracking-[0.2em] px-7 py-3.5 transition-all shadow-md"
            >
              <Link href={slide.primaryCtaLink}>{slide.primaryCtaText}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/80 text-white hover:bg-white/10 hover:border-white text-xs uppercase tracking-[0.2em] px-7 py-3.5 transition-all"
            >
              <Link href={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
            </Button>
          </div>
        </div>

        {/* Slide Controls & Progress Dots */}
        <div className="flex items-center justify-between pt-12 text-white/80 text-xs">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 h-1 rounded-full ${
                  current === idx ? "w-8 bg-[#FFFFFF]" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="p-2 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.25]" />
            </button>
            <span className="text-[11px] tracking-widest tabular-nums">
              0{current + 1} / 0{HERO_SLIDES.length}
            </span>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-2 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
