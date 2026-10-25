"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatPrice } from "@/lib/utils";
import { getMockProductBySlug } from "@/lib/data/mock-db";

interface Hotspot {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  top: string; // percentage
  left: string; // percentage
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "spot-1",
    slug: "the-sculpted-trench-coat",
    name: "The Sculpted Trench Coat",
    price: 28800,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80",
    category: "Coats & Outerwear",
    top: "32%",
    left: "48%",
  },
  {
    id: "spot-2",
    slug: "mulberry-silk-bias-slip-dress",
    name: "Mulberry Silk Bias Slip Dress",
    price: 24500,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
    category: "Dresses & Gowns",
    top: "58%",
    left: "52%",
  },
  {
    id: "spot-3",
    slug: "the-heirloom-calfskin-tote",
    name: "The Heirloom Calfskin Tote",
    price: 36000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
    category: "Leather Goods",
    top: "70%",
    left: "32%",
  },
];

export function ShoppableLook() {
  const [activeHotspot, setActiveHotspot] = React.useState<Hotspot | null>(HOTSPOTS[0]);

  return (
    <section className="py-20 md:py-32 bg-[#FFFFFF] border-b border-[#E4DFD5]">
      <Container>
        <SectionHeading
          eyebrow="The Atelier Edit"
          title="Shoppable Lookbook: Look 04"
          description="Click any hotspot on the muse to inspect textile composition and complete the ensemble."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Main Lookbook Visual with Interactive Hotspots */}
          <div className="lg:col-span-8 relative aspect-[3/4] bg-[#E4DFD5]/40 overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90"
              alt="Maison Auré Complete Atelier Look"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />

            {/* Pulsing Hotspot Pins */}
            {HOTSPOTS.map((spot) => {
              const isActive = activeHotspot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ top: spot.top, left: spot.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspot(isActive ? null : spot)}
                    aria-label={`Inspect ${spot.name}`}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#111111] text-[#F7F4EE] scale-110 shadow-lg"
                        : "bg-[#FFFFFF]/90 text-[#111111] hover:scale-110 shadow-md backdrop-blur-xs"
                    }`}
                  >
                    {isActive ? (
                      <X className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[1.5]" />
                    )}
                    {/* Subtle pulse ring */}
                    {!isActive && (
                      <span className="absolute -inset-1 rounded-full border border-white animate-ping opacity-75" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Piece Inspection Card */}
          <div className="lg:col-span-4">
            {activeHotspot ? (
              <div className="bg-[#F7F4EE] p-6 sm:p-8 border border-[#E4DFD5] space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium">
                  {activeHotspot.category}
                </span>

                <div className="relative aspect-[3/4] w-full max-w-[200px] bg-white overflow-hidden border border-[#E4DFD5]">
                  <Image
                    src={activeHotspot.image}
                    alt={activeHotspot.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-heading text-xl text-[#111111]">{activeHotspot.name}</h4>
                  <p className="text-sm font-medium text-[#111111] tabular-nums mt-1">
                    {formatPrice(activeHotspot.price)}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/product/${activeHotspot.slug}`}
                    className="w-full py-3 bg-[#111111] text-[#F7F4EE] hover:bg-[#B08D57] transition-colors text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2"
                  >
                    <span>View Piece Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-[#F7F4EE] p-8 border border-[#E4DFD5] text-center text-[#8A857C] space-y-2">
                <p className="font-heading text-lg text-[#111111]">Inspect Ensemble</p>
                <p className="text-xs">Select any interactive marker on the look to inspect the individual garment piece.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
