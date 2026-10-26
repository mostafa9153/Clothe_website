"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Share2, Check, ShieldCheck, RotateCcw, Lock, Bell, ChevronDown } from "lucide-react";
import { Product, ProductVariant } from "@/types/database.types";
import { PriceDisplay } from "@/components/ui/price-display";
import { RatingStars } from "@/components/ui/rating-stars";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { SizeGuideModal } from "./size-guide-modal";
import { PincodeChecker } from "./pincode-checker";
import { submitStockNotificationAction } from "@/app/actions/leads";
import brandConfig from "@/config/brand.config";

interface ProductInfoPanelProps {
  product: Product;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ProductInfoPanel({
  product,
  selectedColor,
  onColorChange,
}: ProductInfoPanelProps) {
  const router = useRouter();

  // Selected Size
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [qty, setQty] = React.useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = React.useState(false);
  const [notifyEmail, setNotifyEmail] = React.useState("");
  const [notifySuccess, setNotifySuccess] = React.useState(false);
  const [shareCopied, setShareCopied] = React.useState(false);
  const [openAccordion, setOpenAccordion] = React.useState<string | null>("fabric");
  const [mounted, setMounted] = React.useState(false);

  // Zustand Store
  const addItem = useCartStore((state) => state.addItem);
  const buyNowItem = useCartStore((state) => state.buyNowItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  // Initialize first available size
  React.useEffect(() => {
    setMounted(true);
    const available = product.variants.find((v) => v.color === selectedColor && v.stock > 0);
    if (available) {
      setSelectedSize(available.size);
    } else {
      setSelectedSize(product.variants[0]?.size || "S");
    }
    setQty(1);
  }, [product, selectedColor]);

  const availableColors = Array.from(new Set(product.variants.map((v) => v.color)));
  const availableSizes = Array.from(new Set(product.variants.map((v) => v.size)));

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
      image: product.images[0]?.url || "",
      size: selectedSize,
      color: selectedColor,
      price: currentVariant.price_override ?? product.sale_price ?? product.base_price,
      qty,
      maxStock: currentVariant.stock,
      gstRate: product.gst_rate,
    });
  };

  const handleBuyNow = () => {
    if (!currentVariant || isOutOfStock) return;
    // Checkout with ONLY this item
    buyNowItem({
      productId: product.id,
      variantId: currentVariant.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0]?.url || "",
      size: selectedSize,
      color: selectedColor,
      price: currentVariant.price_override ?? product.sale_price ?? product.base_price,
      qty,
      maxStock: currentVariant.stock,
      gstRate: product.gst_rate,
    });
    router.push("/checkout");
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} | ${brandConfig.name}`,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes("@")) return;
    try {
      await submitStockNotificationAction({
        email: notifyEmail,
        productId: product.id,
        variantId: currentVariant?.id,
      });
      setNotifySuccess(true);
    } catch {
      setNotifySuccess(true);
    }
  };


  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Atelier", href: "/" },
          { label: product.category_name || "Catalog", href: `/category/${product.category_slug || "burkha"}` },
          { label: product.name },
        ]}
      />

      {/* Title & Price */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A857C] font-medium block">
          {product.category_name} • Serial MA-{product.id.slice(-4).toUpperCase()}
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 pt-1">
          <PriceDisplay
            price={product.base_price}
            salePrice={product.sale_price}
            size="lg"
          />
          {product.avg_rating && (
            <a
              href="#reviews-section"
              className="flex items-center gap-1.5 pl-4 border-l border-[#E4DFD5] text-xs text-[#8A857C] hover:text-[#111111] transition-colors"
            >
              <RatingStars rating={product.avg_rating} size="sm" />
              <span className="underline underline-offset-2">({product.reviews_count} Reviews)</span>
            </a>
          )}
        </div>
      </div>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-[#8A857C] leading-relaxed">
        {product.short_desc}
      </p>

      {/* Color Swatches */}
      <div className="space-y-2 pt-2 border-t border-[#E4DFD5]">
        <div className="flex justify-between items-center text-xs">
          <span className="uppercase tracking-wider text-[#111111] font-medium">
            Color: <strong className="text-[#8A857C] font-normal">{selectedColor}</strong>
          </span>
        </div>
        <div className="flex gap-2.5">
          {availableColors.map((color) => {
            const variantForColor = product.variants.find((v) => v.color === color);
            const isSelected = selectedColor === color;
            return (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                title={color}
                className={`w-7 h-7 rounded-full border p-0.5 transition-all ${
                  isSelected ? "border-[#111111] ring-1 ring-[#111111] scale-105" : "border-[#E4DFD5]"
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

      {/* Size Selector & Guide */}
      <div className="space-y-2 pt-2 border-t border-[#E4DFD5]">
        <div className="flex justify-between items-center text-xs">
          <span className="uppercase tracking-wider text-[#111111] font-medium">
            Select Size
          </span>
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-[11px] uppercase tracking-wider text-[#B08D57] hover:underline"
          >
            Size Guide & Recommender
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const variant = product.variants.find(
              (v) => v.color === selectedColor && v.size === size
            );
            const outOfStock = !variant || variant.stock <= 0;
            const isSelected = selectedSize === size;

            return (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  if (outOfStock) {
                    setIsNotifyModalOpen(true);
                  }
                }}
                className={`min-w-12 px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
                  isSelected
                    ? "bg-[#111111] text-[#F7F4EE] border-[#111111]"
                    : outOfStock
                    ? "bg-transparent text-[#8A857C]/40 border-[#E4DFD5] line-through cursor-pointer"
                    : "bg-white text-[#111111] border-[#E4DFD5] hover:border-[#111111]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {/* Stock status indicator */}
        <div className="text-[11px] pt-1">
          {isOutOfStock ? (
            <span className="text-red-700 font-medium">
              Size currently exhausted in atelier • Click to request back-in-stock notification
            </span>
          ) : isLowStock ? (
            <span className="text-[#B08D57] font-medium">
              ✦ Rare Allocation: Only {currentVariant.stock} pieces remaining in atelier
            </span>
          ) : (
            <span className="text-[#8A857C]">
              ✓ Ready for immediate dispatch from Mumbai atelier
            </span>
          )}
        </div>
      </div>

      {/* Quantity & Add to Bag / Buy Now buttons */}
      <div className="space-y-3 pt-3 border-t border-[#E4DFD5]">
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-wider text-[#111111]">
            Quantity
          </span>
          <QuantityStepper
            value={qty}
            max={currentVariant?.stock || 1}
            onChange={setQty}
            disabled={isOutOfStock}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          {isOutOfStock ? (
            <Button
              onClick={() => setIsNotifyModalOpen(true)}
              className="flex-1 text-xs uppercase tracking-[0.2em] py-3.5 bg-[#2B2E26] hover:bg-[#111111]"
            >
              <Bell className="w-4 h-4 mr-2" />
              <span>Notify Me When Available</span>
            </Button>
          ) : (
            <>
              <Button
                onClick={handleAddToBag}
                className="flex-1 text-xs uppercase tracking-[0.2em] py-3.5"
              >
                Add to Bag
              </Button>
              <Button
                onClick={handleBuyNow}
                variant="outline"
                className="flex-1 text-xs uppercase tracking-[0.2em] py-3.5 border-[#111111] hover:bg-[#111111] hover:text-white"
              >
                Buy Now
              </Button>

            </>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-3.5 border transition-all ${
              mounted && isInWishlist
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-[#E4DFD5] bg-white text-[#111111] hover:border-[#111111]"
            }`}
            aria-label="Wishlist piece"
          >
            <Heart className={`w-4 h-4 stroke-[1.25] ${mounted && isInWishlist ? "fill-white" : ""}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-3.5 border border-[#E4DFD5] bg-white text-[#111111] hover:border-[#111111] transition-colors relative"
            aria-label="Share piece"
          >
            {shareCopied ? (
              <Check className="w-4 h-4 text-[#B08D57]" />
            ) : (
              <Share2 className="w-4 h-4 stroke-[1.25]" />
            )}
          </button>
        </div>
      </div>

      {/* Pincode Checker */}
      <PincodeChecker />

      {/* Vertical Accordions */}
      <div className="pt-4 border-t border-[#E4DFD5] divide-y divide-[#E4DFD5] text-xs">
        {/* Description Accordion */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion("desc")}
            className="w-full flex justify-between items-center text-left font-medium uppercase tracking-wider text-[#111111]"
          >
            <span>Architectural Silhouette & Details</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === "desc" ? "rotate-180" : ""}`} />
          </button>
          {openAccordion === "desc" && (
            <div className="pt-3 text-[#8A857C] leading-relaxed space-y-2 animate-in fade-in">
              <p>{product.description}</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Internal hand-finished French seams</li>
                <li>Concealed natural horn or mother-of-pearl closures</li>
                <li>Designed for graceful, unconstrained movement</li>
              </ul>
            </div>
          )}
        </div>

        {/* Fabric & Origin */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion("fabric")}
            className="w-full flex justify-between items-center text-left font-medium uppercase tracking-wider text-[#111111]"
          >
            <span>Textile Composition & Origin</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === "fabric" ? "rotate-180" : ""}`} />
          </button>
          {openAccordion === "fabric" && (
            <div className="pt-3 text-[#8A857C] leading-relaxed space-y-2 animate-in fade-in">
              <p><strong className="text-[#111111]">Composition:</strong> {product.fabric}</p>
              <p><strong className="text-[#111111]">Care Protocol:</strong> {product.care}</p>
            </div>
          )}
        </div>

        {/* Fit Notes */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion("fit")}
            className="w-full flex justify-between items-center text-left font-medium uppercase tracking-wider text-[#111111]"
          >
            <span>Fit & Drapery Advisory</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === "fit" ? "rotate-180" : ""}`} />
          </button>
          {openAccordion === "fit" && (
            <div className="pt-3 text-[#8A857C] leading-relaxed animate-in fade-in">
              <p>{product.fit_notes}</p>
            </div>
          )}
        </div>

        {/* Shipping & Returns */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion("shipping")}
            className="w-full flex justify-between items-center text-left font-medium uppercase tracking-wider text-[#111111]"
          >
            <span>White-Glove Shipping & 10-Day Returns</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === "shipping" ? "rotate-180" : ""}`} />
          </button>
          {openAccordion === "shipping" && (
            <div className="pt-3 text-[#8A857C] leading-relaxed space-y-2 animate-in fade-in">
              <p>{brandConfig.policies.shippingAndReturns}</p>
              <p>Insured courier dispatch within 24 hours of commission.</p>
            </div>
          )}
        </div>

        {/* Gift Wrapping */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion("gift")}
            className="w-full flex justify-between items-center text-left font-medium uppercase tracking-wider text-[#111111]"
          >
            <span>Atelier Presentation & Gift Wrapping</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === "gift" ? "rotate-180" : ""}`} />
          </button>
          {openAccordion === "gift" && (
            <div className="pt-3 text-[#8A857C] leading-relaxed animate-in fade-in">
              <p>
                Every commission arrives in our signature rigid charcoal gift box, wrapped in acid-free tissue and finished with a hand-lettered parchment authenticity seal.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges Row */}
      <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wider text-[#8A857C]">
        <div className="p-2 border border-[#E4DFD5] bg-white flex flex-col items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>Encrypted Checkout</span>
        </div>
        <div className="p-2 border border-[#E4DFD5] bg-white flex flex-col items-center gap-1">
          <RotateCcw className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>10-Day Returns</span>
        </div>
        <div className="p-2 border border-[#E4DFD5] bg-white flex flex-col items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>Atelier Provenance</span>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        categoryName={product.category_name}
        onApplyRecommendedSize={(sz) => setSelectedSize(sz)}
      />

      {/* Stock Notification Dialog */}
      {isNotifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#F7F4EE] border border-[#E4DFD5] p-6 space-y-4 shadow-2xl">
            <button
              onClick={() => {
                setIsNotifyModalOpen(false);
                setNotifySuccess(false);
              }}
              className="absolute right-4 top-4 p-1 text-[#8A857C] hover:text-[#111111]"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Back in Atelier Stock Alert
            </span>

            <h4 className="font-heading text-xl text-[#111111]">
              Reserve Notification for {product.name} ({selectedSize})
            </h4>

            {!notifySuccess ? (
              <form onSubmit={handleNotifySubmit} className="space-y-3">
                <p className="text-xs text-[#8A857C] leading-relaxed">
                  Enter your email to receive an immediate dispatch advisory the moment our weavers produce additional allocation in size {selectedSize}.
                </p>
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="client@domain.com"
                  className="w-full bg-white border border-[#E4DFD5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  required
                />
                <Button type="submit" className="w-full text-xs uppercase tracking-wider py-2.5">
                  Confirm Notification Registry
                </Button>
              </form>
            ) : (
              <div className="p-4 bg-white border border-[#B08D57] text-center space-y-2">
                <Check className="w-5 h-5 text-[#B08D57] mx-auto" />
                <p className="text-xs font-medium text-[#111111]">Registration Acknowledged</p>
                <p className="text-[11px] text-[#8A857C]">You will be contacted discreetly upon atelier replenishment.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
