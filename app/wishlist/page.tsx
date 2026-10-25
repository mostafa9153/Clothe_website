"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { MOCK_PRODUCTS } from "@/lib/data/mock-db";
import { Product } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { Trash2, ShoppingBag, Share2, Check, Heart } from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const productIds = useWishlistStore((state) => state.productIds);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addItem = useCartStore((state) => state.addItem);

  const [mounted, setMounted] = React.useState(false);
  const [selectedSizes, setSelectedSizes] = React.useState<Record<string, string>>({});
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const sharedItems = urlParams.get("items");
        if (sharedItems) {
          const ids = sharedItems.split(",").map((s) => s.trim()).filter(Boolean);
          const store = useWishlistStore.getState();
          let addedCount = 0;
          ids.forEach((id) => {
            if (!store.isInWishlist(id) && MOCK_PRODUCTS.some((p) => p.id === id)) {
              store.toggleWishlist(id);
              addedCount++;
            }
          });
          if (addedCount > 0) {
            toast.success(`Loaded ${addedCount} pieces from shared curation.`);
          }
        }
      } catch {
        // query parsing fallback
      }
    }
  }, []);

  if (!mounted) return null;

  const wishlistProducts = productIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddPieceToBag = (product: Product) => {
    const chosenSize = selectedSizes[product.id] || product.variants[0]?.size || "M";
    const variant = product.variants.find((v) => v.size === chosenSize) || product.variants[0];

    if (!variant || variant.stock <= 0) {
      toast.error(`Size ${chosenSize} is currently out of stock.`);
      return;
    }

    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0]?.url || "",
      size: variant.size,
      color: variant.color,
      price: variant.price_override ?? product.sale_price ?? product.base_price,
      qty: 1,
      maxStock: variant.stock,
      gstRate: product.gst_rate || 12,
    });

    toast.success(`Added ${product.name} (${variant.size}) to your bag.`);
  };

  const handleShareWishlist = () => {
    if (typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}/wishlist?items=${productIds.join(",")}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Private wishlist curation link copied to clipboard.");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE] min-h-screen">
      <Container>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
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
            <p className="text-xs text-[#8A857C]">
              Your curated wardrobe selections reserved across browsing sessions.
            </p>
          </div>

          {wishlistProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareWishlist}
                className="text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied" : "Share Curation"}</span>
              </Button>
              <button
                onClick={clearWishlist}
                className="text-xs uppercase tracking-wider text-[#8A857C] hover:text-red-700 transition-colors px-2 py-1"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white border border-[#E4DFD5] p-10 max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 mx-auto border border-[#E4DFD5] rounded-full flex items-center justify-center text-[#8A857C]">
              <Heart className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-heading text-2xl text-[#111111]">
              No Pieces Saved to Wishlist
            </h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              Click the heart icon on any garment across the catalog to save pieces for future consideration and allocation.
            </p>
            <div className="pt-4">
              <Button asChild className="px-8 text-xs uppercase tracking-[0.2em]">
                <Link href="/shop">Explore Atelier Collection</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {wishlistProducts.map((product) => {
              const selectedSize = selectedSizes[product.id] || product.variants[0]?.size || "M";
              const currentVariant = product.variants.find((v) => v.size === selectedSize) || product.variants[0];
              const isAvailable = currentVariant && currentVariant.stock > 0;
              const price = product.sale_price ?? product.base_price;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#E4DFD5] flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-[3/4] bg-[#E4DFD5]/30 overflow-hidden">
                      <Image
                        src={product.images[0]?.url || ""}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs text-[#8A857C] hover:text-red-700 transition-colors border border-[#E4DFD5]"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C] block">
                        {product.category_name || "Maison Auré"}
                      </span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-serif text-sm text-[#111111] hover:text-[#B08D57] transition-colors block line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <div className="text-xs font-medium text-[#111111] tabular-nums">
                        {formatPrice(price)}
                      </div>

                      {/* Inline Size Selector */}
                      <div className="pt-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1.5">
                          Select Size:
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => handleSizeChange(product.id, v.size)}
                              className={`text-[11px] px-2 py-1 border transition-colors ${
                                selectedSize === v.size
                                  ? "border-[#111111] bg-[#111111] text-white"
                                  : v.stock > 0
                                  ? "border-[#E4DFD5] hover:border-[#111111] text-[#111111]"
                                  : "border-[#E4DFD5]/50 text-[#8A857C]/40 line-through"
                              }`}
                              disabled={v.stock <= 0}
                            >
                              {v.size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to Bag Button */}
                  <div className="p-4 pt-0">
                    <Button
                      onClick={() => handleAddPieceToBag(product)}
                      disabled={!isAvailable}
                      className="w-full text-xs uppercase tracking-[0.15em] py-2.5 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isAvailable ? "Add to Bag" : "Sold Out"}</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
