"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { useWishlistStore } from "@/store/wishlist-store";
import { MOCK_PRODUCTS } from "@/lib/data/mock-db";
import { Product } from "@/types/database.types";

export default function WishlistPage() {
  const productIds = useWishlistStore((state) => state.productIds);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const [mounted, setMounted] = React.useState(false);
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const wishlistProducts = productIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <Breadcrumb
              items={[
                { label: "Atelier", href: "/" },
                { label: "Wishlist" },
              ]}
            />
            <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
              Saved Atelier Wishlist ({wishlistProducts.length})
            </h1>
          </div>

          {wishlistProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs uppercase tracking-wider text-[#8A857C] hover:text-[#111111] transition-colors"
            >
              Clear All Saved Pieces
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white border border-[#E4DFD5] p-10 max-w-xl mx-auto">
            <h3 className="font-heading text-2xl text-[#111111]">
              No Pieces Saved to Wishlist
            </h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              Click the heart icon on any garment across the catalog to save pieces for consideration.
            </p>
            <div className="pt-4">
              <Button asChild className="px-8 text-xs uppercase tracking-[0.2em]">
                <Link href="/shop">Explore Atelier Collection</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {wishlistProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        )}
      </Container>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
