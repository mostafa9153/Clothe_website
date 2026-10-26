"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { Product } from "@/types/database.types";
import { Button } from "@/components/ui/button";

interface BestsellersTabsProps {
  products: Product[];
}

export function BestsellersTabs({ products }: BestsellersTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"all" | "burkha" | "hijab" | "panjabi" | "sets">("all");
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  const filtered = products.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "burkha") return ["cat-burkha", "cat-abaya"].includes(p.category_id || "");
    if (activeTab === "hijab") return ["cat-hijab", "cat-niqab"].includes(p.category_id || "");
    if (activeTab === "panjabi") return p.category_id === "cat-panjabi";
    if (activeTab === "sets") return ["cat-sets-combos", "cat-prayer-wear"].includes(p.category_id || "");
    return true;
  }).slice(0, 8);

  return (
    <section className="py-20 md:py-28 bg-[#F7F4EE]">
      <Container>
        <SectionHeading
          eyebrow="Proven Client Icons"
          title="The Atelier Bestsellers"
          description="Garments that our patrons select repeatedly for drape, breathability, and dignified presence."
          align="center"
          className="mb-8"
        />

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-12 border-b border-[#E4DFD5] pb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
              activeTab === "all"
                ? "text-[#111111] font-semibold after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]"
                : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            All Icons
          </button>
          <button
            onClick={() => setActiveTab("burkha")}
            className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
              activeTab === "burkha"
                ? "text-[#111111] font-semibold after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]"
                : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Burkha & Abaya
          </button>
          <button
            onClick={() => setActiveTab("hijab")}
            className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
              activeTab === "hijab"
                ? "text-[#111111] font-semibold after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]"
                : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Hijab & Niqab
          </button>
          <button
            onClick={() => setActiveTab("panjabi")}
            className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
              activeTab === "panjabi"
                ? "text-[#111111] font-semibold after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]"
                : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Men&apos;s Panjabi
          </button>
          <button
            onClick={() => setActiveTab("sets")}
            className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
              activeTab === "sets"
                ? "text-[#111111] font-semibold after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]"
                : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Sets & Combos
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="mt-14 text-center">
          <Button asChild variant="outline" className="px-10 py-3.5 text-xs uppercase tracking-[0.2em]">
            <Link href="/shop" className="inline-flex items-center gap-2">
              <span>Explore All Atelier Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Container>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
