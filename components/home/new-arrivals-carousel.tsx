"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { Product } from "@/types/database.types";

interface NewArrivalsCarouselProps {
  products: Product[];
}

export function NewArrivalsCarousel({ products }: NewArrivalsCarouselProps) {
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E4DFD5]">
      <Container>
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Just Unveiled"
            title="New Atelier Arrivals"
            description="Our latest sartorial creations, produced in conscious limited batches."
          />

          <div className="flex items-center gap-3">
            <Link
              href="/new-in"
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#B08D57] transition-colors inline-flex items-center gap-1.5 mr-4"
            >
              <span>View All ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => scroll("left")}
              className="p-2 border border-[#E4DFD5] hover:border-[#111111] text-[#111111] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 stroke-[1.25]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 border border-[#E4DFD5] hover:border-[#111111] text-[#111111] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 stroke-[1.25]" />
            </button>
          </div>
        </div>

        {/* Horizontal Snap Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] max-w-[340px] flex-shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          ))}
        </div>
      </Container>

      {/* Shared Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
