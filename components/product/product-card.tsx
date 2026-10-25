"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { PriceDisplay } from "@/components/ui/price-display";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const firstImage = product.images[0]?.url || "";
  const secondImage = product.images[1]?.url || firstImage;

  const isSoldOut = (product.total_stock ?? 0) === 0;
  const isLowStock = !isSoldOut && (product.total_stock ?? 0) > 0 && (product.total_stock ?? 0) <= 2;
  const discountPercent =
    product.sale_price && product.sale_price < product.base_price
      ? Math.round(((product.base_price - product.sale_price) / product.base_price) * 100)
      : null;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] w-full bg-[#E4DFD5]/30 overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={firstImage}
            alt={product.images[0]?.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] ${
              isHovered && secondImage !== firstImage ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Secondary Hover Image */}
          {secondImage !== firstImage && (
            <Image
              src={secondImage}
              alt={product.images[1]?.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] absolute inset-0 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {isSoldOut ? (
            <span className="px-2 py-0.5 bg-[#111111] text-[#F7F4EE] text-[9px] uppercase tracking-[0.18em] font-medium">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="px-2 py-0.5 bg-[#B08D57] text-[#FFFFFF] text-[9px] uppercase tracking-[0.18em] font-medium">
              Only {product.total_stock} Left
            </span>
          ) : discountPercent ? (
            <span className="px-2 py-0.5 bg-[#2B2E26] text-[#F7F4EE] text-[9px] uppercase tracking-[0.18em] font-medium">
              Save {discountPercent}%
            </span>
          ) : product.is_new ? (
            <span className="px-2 py-0.5 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#111111] border border-[#E4DFD5] text-[9px] uppercase tracking-[0.18em] font-medium">
              New In
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2.5 right-2.5 p-2 bg-[#FFFFFF]/90 backdrop-blur-xs hover:bg-[#FFFFFF] text-[#111111] transition-all shadow-xs z-10"
          aria-label={mounted && isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 stroke-[1.25] transition-colors ${
              mounted && isInWishlist ? "fill-[#111111] text-[#111111]" : "text-[#111111]"
            }`}
          />
        </button>

        {/* Quick View Button (Desktop hover reveal) */}
        {onQuickView && (
          <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block">
            <button
              onClick={handleQuickViewClick}
              className="w-full py-2.5 bg-[#FFFFFF]/95 backdrop-blur-xs hover:bg-[#111111] hover:text-[#F7F4EE] text-[#111111] text-[10px] uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-1.5 shadow-sm border border-[#E4DFD5]"
            >
              <Eye className="w-3.5 h-3.5 stroke-[1.25]" />
              <span>Quick View</span>
            </button>
          </div>
        )}
      </div>

      {/* Meta info below image */}
      <div className="pt-3 pb-1 flex flex-col space-y-1">
        {/* Color Dots */}
        <div className="flex items-center gap-1.5 py-0.5">
          {product.variants
            .reduce((acc, v) => {
              if (!acc.some((x) => x.color === v.color)) acc.push(v);
              return acc;
            }, [] as typeof product.variants)
            .slice(0, 4)
            .map((v) => (
              <span
                key={v.id}
                title={v.color}
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: v.color_hex }}
              />
            ))}
          {product.variants.length > 4 && (
            <span className="text-[10px] text-[#8A857C]">
              +{product.variants.length - 4}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link
          href={`/product/${product.slug}`}
          className="font-serif text-sm text-[#111111] hover:text-[#B08D57] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price */}
        <PriceDisplay
          price={product.base_price}
          salePrice={product.sale_price}
          size="sm"
        />
      </div>
    </div>
  );
}
