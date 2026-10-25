"use client";

import * as React from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import brandConfig from "@/config/brand.config";
import { Container } from "@/components/ui/container";

const INSTAGRAM_SHOTS = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    alt: "Maison Auré winter cashmere knitwear moment",
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    alt: "Street drape in Milan with sculpted trench",
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    alt: "Riviera high summer linen editorial",
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
    alt: "Double-faced cashmere collar detail",
  },
  {
    id: "ig-5",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    alt: "Tuscan vegetable-tanned leather tote",
  },
  {
    id: "ig-6",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    alt: "Mulberry silk cowl slip dress in motion",
  },
];

export function InstagramGrid() {
  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E4DFD5]">
      <Container>
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
            Visual Provenance
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[#111111]">
            Follow the Dispatches
          </h3>
          <p className="text-xs text-[#8A857C]">
            Tag <span className="font-medium text-[#111111]">@maisonaure</span> to join our private client curation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_SHOTS.map((shot) => (
            <a
              key={shot.id}
              href={brandConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-[#E4DFD5]/40 overflow-hidden block"
            >
              <Image
                src={shot.image}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-[#111111]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-5 h-5 stroke-[1.25]" />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
