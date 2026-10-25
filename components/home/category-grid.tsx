"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Category } from "@/types/database.types";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  // Select top 3 hero category features
  const featured = [
    {
      title: "Womenswear Atelier",
      subtitle: "Fluid silks, unlined cashmere, and sculptural drape",
      link: "/category/dresses",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85",
      cta: "Explore Women",
    },
    {
      title: "Tailored Menswear",
      subtitle: "Bespoke linen shirts, Gurkha cuts, and worsted wools",
      link: "/category/mens-shirts",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85",
      cta: "Explore Men",
    },
    {
      title: "Artisanal Leather & Goods",
      subtitle: "Vegetable-tanned Tuscan calfskin and naval brass",
      link: "/category/accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
      cta: "Explore Accessories",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F7F4EE]">
      <Container>
        <SectionHeading
          eyebrow="Curated Departments"
          title="Architectural Wardrobe Disciplines"
          description="Each atelier category represents an obsessive dialogue between natural raw fibers and timeless human tailoring."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="group relative aspect-[3/4] overflow-hidden bg-[#E4DFD5]/40 block shadow-sm border border-[#E4DFD5]"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#E8D8C8] mb-1 font-medium">
                  Department 0{idx + 1}
                </span>
                <h3 className="font-heading text-2xl lg:text-3xl font-normal leading-tight">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/80 mt-1.5 line-clamp-2 font-light">
                  {cat.subtitle}
                </p>

                <div className="pt-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-white group-hover:text-[#B08D57] transition-colors">
                  <span>{cat.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
