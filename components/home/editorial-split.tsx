"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function EditorialSplit() {
  return (
    <section className="py-20 md:py-32 bg-[#F7F4EE] border-b border-[#E4DFD5]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Big Editorial Image */}
          <div className="lg:col-span-7 relative aspect-[4/5] bg-[#E4DFD5]/40 overflow-hidden shadow-md">
            <Image
              src="https://images.pexels.com/photos/13838842/pexels-photo-13838842.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="AZAD Modest Atelier Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-[#FFFFFF]/90 backdrop-blur-xs px-4 py-2 border border-[#E4DFD5]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111]">
                Atelier Studio • Kolkata & Dubai
              </span>
            </div>
          </div>

          {/* Brand Story Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
              The Architecture of Modesty
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] text-[#111111]">
              Garments Designed with Dignity and Quiet Poise.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#8A857C] leading-relaxed">
              <p>
                In a fashion landscape intoxicated by speed and transient trends, AZAD operates on
                deliberate devotion to modest grace. We source exclusively pure imported Dubai Nida, French Medina silk,
                and hand-loomed Bengal cotton.
              </p>
              <p>
                Zero compromise on opacity. Zero cling. Every burkha, hijab, and panjabi is engineered to drape
                with weightless ease, staying immaculate from Fajr to Isha prayers.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button asChild className="text-xs uppercase tracking-[0.2em] px-8 py-3.5">
                <Link href="/about">Read Brand Manifesto</Link>
              </Button>
              <Link
                href="/journal/how-to-choose-the-right-hijab-fabric"
                className="text-xs uppercase tracking-[0.18em] font-medium text-[#111111] hover:text-[#B08D57] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Fabric Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
