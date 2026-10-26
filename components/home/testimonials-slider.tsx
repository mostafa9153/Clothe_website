"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RatingStars } from "@/components/ui/rating-stars";

interface Testimonial {
  id: string;
  author: string;
  location: string;
  title: string;
  quote: string;
  piece: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Fatima Rahman",
    location: "Kolkata",
    title: "The Dubai Nida drape is truly unmatched",
    quote: "SubhanAllah, the fabric quality is exceptional. I wore this in humid Kolkata weather and felt completely cool and dignified. 100% opaque, not see-through at all, and the front snap buttons make nursing so convenient.",
    piece: "The Royal Dubai Nida Front-Open Burkha",
    rating: 5,
  },
  {
    id: "test-2",
    author: "Dr. Maryam Khan",
    location: "Hyderabad",
    title: "Liquid Medina silk stays in place all day",
    quote: "Unlike cheap synthetic silks that slide off the moment you turn your head, this Medina silk has natural weight and grip. I pair it with the magnetic pins and it lasts my entire hospital shift.",
    piece: "Pure Medina Silk Luxury Hijab",
    rating: 5,
  },
  {
    id: "test-3",
    author: "Tanvir Ahmed Chowdhury",
    location: "Kolkata",
    title: "The embroidery on the collar is genuine art",
    quote: "Wore this for Eid prayers and received compliments from everyone at the mosque. The cotton-silk blend has a soft sheen and the mother-of-pearl buttons are sturdy and genuine.",
    piece: "Royal Hand-Embroidered Festive Eid Panjabi",
    rating: 5,
  },
  {
    id: "test-4",
    author: "Sumaiya Binte Tariq",
    location: "Mumbai",
    title: "Extremely breathable during Taraweeh",
    quote: "The 3-layer design is pure perfection. I had zero feeling of suffocation even during long 20-rakaat Taraweeh prayers. The eye slit does not pull on eyelashes.",
    piece: "Saudi 3-Layer Breathable Chiffon Niqab",
    rating: 5,
  },
];

export function TestimonialsSlider() {
  const [index, setIndex] = React.useState(0);

  const prev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[index];

  return (
    <section className="py-24 md:py-32 bg-[#F7F4EE] border-b border-[#E4DFD5]">
      <Container>
        <SectionHeading
          eyebrow="Client Provenance"
          title="Reflections From the Atelier Circle"
          align="center"
          className="mb-14"
        />

        <div className="max-w-3xl mx-auto relative px-4">
          <div className="text-center space-y-6">
            <Quote className="w-8 h-8 mx-auto text-[#B08D57]/60 stroke-[1]" />

            <div className="flex justify-center">
              <RatingStars rating={item.rating} size="md" />
            </div>

            <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl font-light text-[#111111] leading-relaxed italic">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <div className="space-y-1 pt-2">
              <p className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#111111]">
                {item.author} — <span className="text-[#8A857C] font-normal">{item.location}</span>
              </p>
              <p className="text-[11px] text-[#B08D57] font-medium">
                Verified Commission: {item.piece}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="p-2 border border-[#E4DFD5] hover:border-[#111111] text-[#111111] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4 stroke-[1.25]" />
            </button>
            <span className="text-xs tracking-widest text-[#8A857C] tabular-nums">
              0{index + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={next}
              className="p-2 border border-[#E4DFD5] hover:border-[#111111] text-[#111111] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4 stroke-[1.25]" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
