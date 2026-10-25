"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ArrowRight } from "lucide-react";
import { Product } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { useCartStore } from "@/store/cart-store";
import { PriceDisplay } from "@/components/ui/price-display";
import { RatingStars } from "@/components/ui/rating-stars";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [qty, setQty] = React.useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [added, setAdded] = React.useState(false);

  const addItem = useCartStore((state) => state.addItem);

  // Initialize or reset state on product open
  React.useEffect(() => {
    if (product) {
      const firstVariant = product.variants.find((v) => v.stock > 0) || product.variants[0];
      setSelectedColor(firstVariant ? firstVariant.color : "");
      setSelectedSize(firstVariant ? firstVariant.size : "");
      setQty(1);
      setSelectedImageIndex(0);
      setAdded(false);
    }
  }, [product]);

  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Available unique colors and sizes
  const availableColors = Array.from(new Set(product.variants.map((v) => v.color)));
  const availableSizes = Array.from(new Set(product.variants.map((v) => v.size)));

  // Current matched variant
  const currentVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  ) || product.variants[0];

  const isOutOfStock = !currentVariant || currentVariant.stock <= 0;
  const isLowStock = currentVariant && currentVariant.stock > 0 && currentVariant.stock <= 3;

  const handleAddToBag = () => {
    if (!currentVariant || isOutOfStock) return;

    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      name: product.name,
      slug: product.slug,
      image: product.images[selectedImageIndex]?.url || product.images[0]?.url || "",
      size: selectedSize,
      color: selectedColor,
      price: currentVariant.price_override ?? product.sale_price ?? product.base_price,
      qty,
      maxStock: currentVariant.stock,
      gstRate: product.gst_rate,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-[#F7F4EE] border border-[#E4DFD5] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[#8A857C] hover:text-[#111111] transition-colors z-20"
          aria-label="Close preview"
        >
          <X className="w-5 h-5 stroke-[1.25]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Gallery Column */}
          <div className="relative aspect-[3/4] bg-[#E4DFD5]/40 md:h-full">
            <Image
              src={product.images[selectedImageIndex]?.url || product.images[0]?.url || ""}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-10 h-14 relative border overflow-hidden transition-all ${
                      selectedImageIndex === idx ? "border-[#111111] scale-105" : "border-white/60 opacity-80"
                    }`}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C] font-medium">
                {product.category_name}
              </span>
              <h3 className="font-heading text-2xl font-normal text-[#111111]">
                {product.name}
              </h3>

              <div className="flex items-center gap-3">
                <PriceDisplay
                  price={product.base_price}
                  salePrice={product.sale_price}
                />
                {product.avg_rating && (
                  <div className="flex items-center gap-1.5 pl-3 border-l border-[#E4DFD5]">
                    <RatingStars rating={product.avg_rating} size="sm" />
                    <span className="text-xs text-[#8A857C]">({product.reviews_count})</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-[#8A857C] leading-relaxed line-clamp-3">
                {product.short_desc || product.description}
              </p>

              {/* Color Swatches */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#111111] block">
                  Color: <strong className="font-medium text-[#8A857C]">{selectedColor}</strong>
                </span>
                <div className="flex gap-2">
                  {availableColors.map((color) => {
                    const variantForColor = product.variants.find((v) => v.color === color);
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={`w-6 h-6 rounded-full border p-0.5 transition-all ${
                          isSelected ? "border-[#111111] ring-1 ring-[#111111]" : "border-[#E4DFD5]"
                        }`}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-black/10"
                          style={{ backgroundColor: variantForColor?.color_hex || "#111111" }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Chips */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between items-center text-[11px] uppercase tracking-wider">
                  <span>Size</span>
                  {isLowStock && (
                    <span className="text-[#B08D57] font-medium">
                      Only {currentVariant.stock} left in atelier
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => {
                    const variant = product.variants.find(
                      (v) => v.color === selectedColor && v.size === size
                    );
                    const out = !variant || variant.stock <= 0;
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        disabled={out}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 px-3 py-1.5 text-xs uppercase tracking-wider border transition-all ${
                          isSelected
                            ? "bg-[#111111] text-[#F7F4EE] border-[#111111]"
                            : out
                            ? "bg-transparent text-[#8A857C]/40 border-[#E4DFD5] line-through cursor-not-allowed"
                            : "bg-[#FFFFFF] text-[#111111] border-[#E4DFD5] hover:border-[#111111]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="pt-2 flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-wider text-[#111111]">
                  Quantity
                </span>
                <QuantityStepper
                  value={qty}
                  max={currentVariant?.stock || 1}
                  onChange={setQty}
                  disabled={isOutOfStock}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-3 border-t border-[#E4DFD5]">
              <Button
                onClick={handleAddToBag}
                disabled={isOutOfStock}
                className="w-full text-xs tracking-[0.2em] py-3.5"
              >
                {added ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" /> Added to Bag
                  </span>
                ) : isOutOfStock ? (
                  "Sold Out"
                ) : (
                  "Add to Bag"
                )}
              </Button>

              <div className="text-center">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="text-xs tracking-wider uppercase underline underline-offset-4 text-[#8A857C] hover:text-[#111111] inline-flex items-center gap-1.5"
                >
                  <span>View Full Piece Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
