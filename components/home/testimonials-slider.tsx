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
    author: "Ananya Singhania",
    location: "Mumbai",
    title: "The pinnacle of tailored coats",
    quote: "The bonded cotton has a remarkable presence. It holds its silhouette without feeling rigid, and the horn buttons speak volumes about the atelier's attention to detail.",
    piece: "The Sculpted Trench Coat",
    rating: 5,
  },
  {
    id: "test-2",
    author: "Meera Kulkarni",
    location: "Bengaluru",
    title: "24-momme silk makes all the difference",
    quote: "Most silk dresses cling unflatteringly. This bias cut floats like liquid Mercury. The French seams and weight of the fabric are genuinely Loro-Piana tier.",
    piece: "Mulberry Silk Bias Slip Dress",
    rating: 5,
  },
  {
    id: "test-3",
    author: "Rohit Malhotra",
    location: "New Delhi",
    title: "Masterful weight and poise",
    quote: "Purchased for travel between London and Delhi. Defies damp weather and looks immaculate layered over knitwear or a tailored dinner jacket.",
    piece: "Double-Faced Cashmere Overcoat",
    rating: 5,
  },
  {
    id: "test-4",
    author: "Siddharth Sen",
    location: "Kolkata",
    title: "Tuscan leather with gorgeous natural grain",
    quote: "Vegetable tanned calf leather that smells intoxicating. Stood up to three months of rigorous daily travel and only looks richer with each passing week.",
    piece: "The Heirloom Calfskin Tote",
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
