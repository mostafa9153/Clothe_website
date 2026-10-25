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
  const [activeTab, setActiveTab] = React.useState<"all" | "women" | "men" | "accessories">("all");
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  const filtered = products.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "women") return ["cat-w-dresses", "cat-w-tops", "cat-outerwear"].includes(p.category_id || "");
    if (activeTab === "men") return ["cat-m-tailoring", "cat-trousers"].includes(p.category_id || "");
    if (activeTab === "accessories") return p.category_id === "cat-accessories";
    return true;
  }).slice(0, 8);

  return (
    <section className="py-20 md:py-28 bg-[#F7F4EE]">
      <Container>
        <SectionHeading
          eyebrow="Proven Client Icons"
          title="The Atelier Bestsellers"
          description="Garments that our private clientele commission repeatedly for silhouette, handfeel, and presence."
          align="center"
          className="mb-8"
        />

        {/* Tab Switcher */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 border-b border-[#E4DFD5] pb-4">
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
            onClick={() => setActiveTab("women")}
            className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
              activeTab === "women"
                ? "text-[#111111] font-semibold after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]"
                : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Womenswear
          </button>
          <button
            onClick={() => setActiveTab("men")}
            className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
              activeTab === "men"
                ? "text-[#111111] font-semibold after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]"
                : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Menswear
          </button>
          <button
            onClick={() => setActiveTab("accessories")}
            className={`pb-2 px-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
              activeTab === "accessories"
                ? "text-[#111111] font-semibold after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]"
                : "text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Artisanal Leather
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
