"use client";

import * as React from "react";
import { Product } from "@/types/database.types";
import { MOCK_PRODUCTS } from "@/lib/data/mock-db";
import { ProductCard } from "./product-card";
import { QuickViewModal } from "./quick-view-modal";

interface RecentlyViewedProps {
  currentProductId: string;
}

export function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const [recentProducts, setRecentProducts] = React.useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("maison_aure_recently_viewed");
      let ids: string[] = stored ? JSON.parse(stored) : [];

      // Add current product to the front (exclude duplicates)
      ids = [currentProductId, ...ids.filter((id) => id !== currentProductId)].slice(0, 8);
      localStorage.setItem("maison_aure_recently_viewed", JSON.stringify(ids));

      // Resolve products (excluding current for display)
      const displayProducts = ids
        .filter((id) => id !== currentProductId)
        .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 4);

      setRecentProducts(displayProducts);
    } catch {}
  }, [currentProductId]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="pt-16 pb-8 border-t border-[#E4DFD5]">
      <div className="space-y-1 mb-8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
          Personal History
        </span>
        <h3 className="font-heading text-2xl text-[#111111] font-normal">
          Recently Viewed Pieces
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {recentProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
