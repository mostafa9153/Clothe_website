"use client";

import * as React from "react";
import Link from "next/link";
import { Product, Review } from "@/types/database.types";
import { ProductGallery } from "./product-gallery";
import { ProductInfoPanel } from "./product-info-panel";
import { ReviewsSection } from "./reviews-section";
import { StickyAddToBagBar } from "./sticky-add-to-bag-bar";
import { RecentlyViewed } from "./recently-viewed";
import { ProductCard } from "./product-card";
import { QuickViewModal } from "./quick-view-modal";
import { Container } from "@/components/ui/container";

interface ProductDetailViewProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
  completeLookProducts: Product[];
}

export function ProductDetailView({
  product,
  reviews,
  relatedProducts,
  completeLookProducts,
}: ProductDetailViewProps) {
  const [selectedColor, setSelectedColor] = React.useState<string>(
    product.variants[0]?.color || ""
  );
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  return (
    <div className="py-8 md:py-14 bg-[#F7F4EE]">
      <Container>
        {/* Main 2-Column Product Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery Column (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              selectedColor={selectedColor}
            />
          </div>

          {/* Sticky Info Panel Column (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ProductInfoPanel
              product={product}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </div>
        </div>

        {/* Complete The Look Section */}
        {completeLookProducts.length > 0 && (
          <div className="pt-20 pb-12 border-t border-[#E4DFD5] mt-20">
            <div className="space-y-1 mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
                Harmonious Styling
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[#111111]">
                Complete the Ensemble
              </h3>
              <p className="text-xs text-[#8A857C]">
                Pieces curated by our head atelier director to complement the silhouette.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {completeLookProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <ReviewsSection productId={product.id} reviews={reviews} />

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 pb-12 border-t border-[#E4DFD5]">
            <div className="space-y-1 mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
                Further Exploration
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[#111111]">
                You May Also Appreciate
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        <RecentlyViewed currentProductId={product.id} />
      </Container>

      {/* Mobile Sticky Add-to-bag bar */}
      <StickyAddToBagBar
        product={product}
        selectedColor={selectedColor}
      />

      {/* Reusable Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
