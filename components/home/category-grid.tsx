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
      title: "Burkha & Abaya Atelier",
      subtitle: "Pure Dubai Nida, French jilbabs, and butterfly silhouettes",
      link: "/category/burkha",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
      cta: "Explore Burkhas",
    },
    {
      title: "Hijab & Niqab Collection",
      subtitle: "Authentic Medina silk, crinkle chiffon, and 3-layer veils",
      link: "/category/hijab",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=85",
      cta: "Explore Hijabs",
    },
    {
      title: "Men's Panjabi & Jubba",
      subtitle: "Egyptian Giza cotton, zardozi embroidery, and Kabli sets",
      link: "/category/panjabi",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85",
      cta: "Explore Panjabis",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F7F4EE]">
      <Container>
        <SectionHeading
          eyebrow="Curated Modest Departments"
          title="The Pillars of Modest Elegance"
          description="Each department represents a sacred dialogue between modest dignity, breathable natural textiles, and timeless craftsmanship."
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
