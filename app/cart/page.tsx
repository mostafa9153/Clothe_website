"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShieldCheck, Gift, Heart, Tag, Check, AlertCircle, RefreshCw } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice } from "@/lib/utils";
import brandConfig from "@/config/brand.config";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { validateMockCoupon, MOCK_PRODUCTS } from "@/lib/data/mock-db";
import { ProductCard } from "@/components/product/product-card";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQty,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    orderNote,
    setOrderNote,
    couponCode,
    discount,
    applyCoupon,
    removeCoupon,
    subtotal,
    shippingFee,
    totalGst,
    grandTotal,
    syncValidatedCart,
  } = useCartStore();

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const [mounted, setMounted] = React.useState(false);
  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = React.useState<string | null>(null);
  const [validationAlerts, setValidationAlerts] = React.useState<string[]>([]);
  const [isValidating, setIsValidating] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Server Validation on cart page load
  React.useEffect(() => {
    if (!mounted || items.length === 0) return;

    let isSubscribed = true;
    const runValidation = async () => {
      setIsValidating(true);
      try {
        const res = await fetch("/api/cart/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
        const data = await res.json();
        if (data.success && isSubscribed) {
          if (data.messages && data.messages.length > 0) {
            setValidationAlerts(data.messages);
          }
          if (data.items) {
            syncValidatedCart(data.items);
          }
        }
      } catch {
        // network error fallback
      } finally {
        if (isSubscribed) setIsValidating(false);
      }
    };

    runValidation();
    return () => {
      isSubscribed = false;
    };
  }, [mounted]);

  if (!mounted) return null;

  const sub = subtotal();
  const ship = shippingFee();
  const gst = totalGst();
  const total = grandTotal();
  const remainingForFreeShipping = Math.max(0, brandConfig.shipping.freeAbove - sub);
  const progressPercent = Math.min(100, (sub / brandConfig.shipping.freeAbove) * 100);

  // Recommendations: top 4 featured products not already in bag
  const currentProductIds = new Set(items.map((i) => i.productId));
  const recommendations = MOCK_PRODUCTS.filter((p) => !currentProductIds.has(p.id)).slice(0, 4);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);

    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) return;

    const res = validateMockCoupon(cleanCode, sub);
    if (!res.valid || !res.coupon || res.discount === undefined) {
      setCouponError(res.message);
    } else {
      applyCoupon(res.coupon.code, res.discount);
      setCouponSuccess(`Privilege code ${res.coupon.code} applied (-${formatPrice(res.discount)})`);
      setCouponInput("");
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    if (!isInWishlist(item.productId)) {
      toggleWishlist(item.productId);
    }
    removeItem(item.id);
  };

  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE] min-h-screen">
      <Container>
        <div className="mb-8 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Shopping Bag" },
            ]}
          />
          <div className="flex items-baseline justify-between">
            <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
              Shopping Bag ({items.length} {items.length === 1 ? "Piece" : "Pieces"})
            </h1>
            {isValidating && (
              <span className="text-xs text-[#8A857C] flex items-center gap-1.5 animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" /> Verifying atelier reserves...
              </span>
            )}
          </div>
        </div>

        {/* Live Validation Alert Notices */}
        {validationAlerts.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Atelier Inventory Updates:</span>
            </div>
            {validationAlerts.map((msg, i) => (
              <p key={i} className="pl-6">• {msg}</p>
            ))}
          </div>
        )}

        {items.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white border border-[#E4DFD5] p-10 max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 mx-auto border border-[#E4DFD5] rounded-full flex items-center justify-center text-[#8A857C]">
              <Tag className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-heading text-2xl text-[#111111]">
              Your Bag is Currently Empty
            </h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              Discover our latest creations in pure mulberry silk, double-faced cashmere, and fine Irish linen.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="px-8 text-xs uppercase tracking-[0.2em]">
                <Link href="/shop">Explore Atelier Collection</Link>
              </Button>
              <Button asChild variant="outline" className="px-8 text-xs uppercase tracking-[0.2em]">
                <Link href="/wishlist">View Saved Wishlist</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Column (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Indicator */}
              <div className="bg-white border border-[#E4DFD5] p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#111111] font-medium">
                    {sub >= brandConfig.shipping.freeAbove
                      ? "✨ Complimentary Insured Atelier Courier Unlocked"
                      : `Add ${formatPrice(remainingForFreeShipping)} more to qualify for complimentary courier`}
                  </span>
                  <span className="text-[#8A857C] tabular-nums font-mono">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-[#E4DFD5] h-1.5 overflow-hidden">
                  <div
                    className="bg-[#B08D57] h-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-[#E4DFD5] divide-y divide-[#E4DFD5]">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative w-24 h-32 bg-[#E4DFD5]/30 flex-shrink-0 overflow-hidden border border-[#E4DFD5]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full space-y-3 w-full">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            className="font-serif text-base text-[#111111] hover:text-[#B08D57] transition-colors"
                          >
                            {item.name}
                          </Link>
                          <div className="text-xs text-[#8A857C] mt-1 space-x-2">
                            <span>Size: <strong>{item.size}</strong></span>
                            <span>•</span>
                            <span>Color: <strong>{item.color}</strong></span>
                            <span>•</span>
                            <span>Stock: {item.maxStock}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-medium text-sm text-[#111111] tabular-nums block">
                            {formatPrice(item.price * item.qty)}
                          </span>
                          {item.qty > 1 && (
                            <span className="text-[11px] text-[#8A857C] tabular-nums">
                              {formatPrice(item.price)} each
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#E4DFD5]/60">
                        <QuantityStepper
                          value={item.qty}
                          max={item.maxStock}
                          onChange={(q) => updateQty(item.id, q)}
                        />

                        <div className="flex items-center gap-4 text-xs">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="text-[#8A857C] hover:text-[#111111] flex items-center gap-1 transition-colors"
                          >
                            <Heart className="w-3.5 h-3.5 stroke-[1.25]" />
                            <span>Save to Wishlist</span>
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#8A857C] hover:text-red-700 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 stroke-[1.25]" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Presentation & Order Note */}
              <div className="bg-white border border-[#E4DFD5] p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="cart-gift-wrap" className="flex items-center gap-2.5 cursor-pointer text-xs text-[#111111] font-medium">
                      <Gift className="w-4 h-4 text-[#B08D57] stroke-[1.25]" />
                      <span>Atelier Gift Packaging & Hand-Penned Dedication (+{formatPrice(brandConfig.shipping.giftWrapFee ?? 250)})</span>
                    </label>
                    <input
                      id="cart-gift-wrap"
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-4 h-4 accent-[#111111] cursor-pointer"
                    />
                  </div>

                  {giftWrap && (
                    <div className="pl-6 space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-[#8A857C] block">
                        Hand-Penned Gift Message (Max 150 characters)
                      </label>
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Write your dedication here for inclusion on our embossed cardstock..."
                        maxLength={150}
                        rows={2}
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                      />
                      <span className="text-[10px] text-[#8A857C] text-right block">
                        {giftMessage.length}/150
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#E4DFD5] space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#8A857C] block">
                    Special Atelier Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="e.g. Leave with concierge, do not ring doorbell..."
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            </div>

            {/* Right Summary Column (lg:col-span-4) */}
            <div className="lg:col-span-4 bg-white border border-[#E4DFD5] p-6 space-y-6 sticky top-24">
              <h3 className="font-heading text-xl text-[#111111] pb-3 border-b border-[#E4DFD5]">
                Commission Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#8A857C] block">
                  Privilege Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10"
                    className="flex-1 bg-[#F7F4EE] border border-[#E4DFD5] px-3 py-2 text-xs uppercase tracking-wider text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                  <Button type="submit" variant="secondary" size="sm" className="text-xs px-4">
                    Apply
                  </Button>
                </div>

                {couponCode && (
                  <div className="flex items-center justify-between text-xs text-[#2B2E26] bg-[#F7F4EE] px-3 py-1.5 border border-[#E4DFD5]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#B08D57]" /> {couponCode} applied (-{formatPrice(discount)})
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[10px] text-red-600 hover:underline uppercase"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && <p className="text-xs text-red-600">{couponError}</p>}
                {couponSuccess && <p className="text-xs text-green-700">{couponSuccess}</p>}
              </form>

              {/* Calculation Breakdown */}
              <div className="space-y-2.5 text-xs text-[#8A857C] divide-y divide-[#E4DFD5]">
                <div className="flex justify-between pb-2">
                  <span>Bag Subtotal</span>
                  <span className="text-[#111111] tabular-nums font-medium">{formatPrice(sub)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-2 text-[#B08D57]">
                    <span>Privilege Courtesy</span>
                    <span className="tabular-nums font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between py-2 text-[#111111]">
                    <span>Atelier Gift Packaging</span>
                    <span className="tabular-nums font-medium">+{formatPrice(brandConfig.shipping.giftWrapFee ?? 250)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span>Atelier Insured Courier</span>
                  <span className="text-[#111111] tabular-nums font-medium">
                    {ship === 0 ? "Complimentary" : formatPrice(ship)}
                  </span>
                </div>
                <div className="py-2 text-[11px] space-y-1">
                  <div className="flex justify-between text-[#8A857C]">
                    <span>GST (12% Inclusive)</span>
                    <span className="tabular-nums">{formatPrice(gst)}</span>
                  </div>
                  <div className="pl-2 space-y-0.5 text-[10px] text-[#8A857C]/70">
                    <div className="flex justify-between">
                      <span>• Central GST (CGST 6%):</span>
                      <span className="tabular-nums font-mono">{formatPrice(Math.round(gst / 2))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• State GST (SGST 6%):</span>
                      <span className="tabular-nums font-mono">{formatPrice(gst - Math.round(gst / 2))}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-3 text-base font-medium text-[#111111]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <Button asChild className="w-full text-xs uppercase tracking-[0.2em] py-4">
                  <Link href="/checkout" className="flex items-center justify-center gap-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full text-xs uppercase tracking-[0.2em] py-3">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 text-[11px] text-[#8A857C] space-y-2 border-t border-[#E4DFD5]">
                <div className="flex items-center gap-2 text-[#111111]">
                  <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                  <span className="font-medium">Insured White-Glove Courier Across India</span>
                </div>
                <p>Complimentary 10-day exchange and returns guaranteed on all non-custom pieces.</p>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like Section */}
        {recommendations.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E4DFD5] space-y-8">
            <div className="text-center space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C]">
                Atelier Recommendations
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[#111111]">
                You May Also Consider
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
