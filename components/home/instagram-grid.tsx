"use client";

import * as React from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import brandConfig from "@/config/brand.config";
import { Container } from "@/components/ui/container";

const INSTAGRAM_SHOTS = [
  {
    id: "ig-1",
    image: "https://images.pexels.com/photos/8002584/pexels-photo-8002584.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "AZAD Dubai Atelier Black Abaya in sunlight",
  },
  {
    id: "ig-2",
    image: "https://images.pexels.com/photos/18410346/pexels-photo-18410346.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Pure Medina Silk Luxury Hijab styling",
  },
  {
    id: "ig-3",
    image: "https://images.pexels.com/photos/19298225/pexels-photo-19298225.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Three-layer breathable Saudi Niqab with eye veil",
  },
  {
    id: "ig-4",
    image: "https://images.pexels.com/photos/7956933/pexels-photo-7956933.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Men's handcrafted festive zardozi panjabi",
  },
  {
    id: "ig-5",
    image: "https://images.pexels.com/photos/9880858/pexels-photo-9880858.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Graceful flowing abaya silhouettes across desert",
  },
  {
    id: "ig-6",
    image: "https://images.pexels.com/photos/17857931/pexels-photo-17857931.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Islamic sanctuary architectural geometry and craftsmanship",
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
            Tag <span className="font-medium text-[#111111]">@azadcouture</span> to join our private client curation.
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
