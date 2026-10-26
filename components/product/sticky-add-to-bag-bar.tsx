"use client";

import * as React from "react";
import Image from "next/image";
import { Product } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

interface StickyAddToBagBarProps {
  product: Product;
  selectedColor: string;
}

export function StickyAddToBagBar({ product, selectedColor }: StickyAddToBagBarProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const addItem = useCartStore((state) => state.addItem);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 600px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstVariant = product.variants.find((v) => v.stock > 0) || product.variants[0];
  const isOutOfStock = (product.total_stock ?? 0) <= 0;

  const handleAdd = () => {
    if (!firstVariant || isOutOfStock) return;
    addItem({
      productId: product.id,
      variantId: firstVariant.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0]?.url || "",
      size: firstVariant.size,
      color: selectedColor || firstVariant.color,
      price: firstVariant.price_override ?? product.sale_price ?? product.base_price,
      qty: 1,
      maxStock: firstVariant.stock,
      gstRate: product.gst_rate,
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-35 bg-[#FFFFFF] border-t border-[#E4DFD5] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-xl md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="relative w-10 h-12 bg-[#E4DFD5]/40 flex-shrink-0 overflow-hidden">
            <Image
              src={product.images[0]?.url || ""}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="truncate text-left">
            <span className="font-serif text-xs text-[#111111] truncate block">
              {product.name}
            </span>
            <span className="text-xs font-medium text-[#111111] tabular-nums">
              {formatPrice(product.sale_price ?? product.base_price)}
            </span>
          </div>
        </div>

        <Button
          onClick={handleAdd}
          disabled={isOutOfStock}
          size="sm"
          className="text-[10px] uppercase tracking-widest px-4 py-2 flex-shrink-0"
        >
          {isOutOfStock ? "Sold Out" : "Add to Bag"}
        </Button>
      </div>
    </div>
  );
}
