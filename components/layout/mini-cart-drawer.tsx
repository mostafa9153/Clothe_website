"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, ArrowRight, Gift, Tag, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import brandConfig from "@/config/brand.config";
import { validateMockCoupon } from "@/lib/data/mock-db";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

export function MiniCartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQty,
    giftWrap,
    setGiftWrap,
    couponCode,
    discount,
    applyCoupon,
    removeCoupon,
    subtotal,
    shippingFee,
    totalGst,
    grandTotal,
    addItem,
  } = useCartStore();

  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = React.useState<string | null>(null);

  const sub = subtotal();
  const ship = shippingFee();
  const gst = totalGst();
  const total = grandTotal();
  const progressPercent = Math.min(100, (sub / brandConfig.shipping.freeAbove) * 100);
  const remainingForFreeShipping = Math.max(0, brandConfig.shipping.freeAbove - sub);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);

    if (!couponInput.trim()) return;

    const res = validateMockCoupon(couponInput.trim(), sub);
    if (!res.valid || !res.coupon || res.discount === undefined) {
      setCouponError(res.message);
    } else {
      applyCoupon(res.coupon.code, res.discount);
      setCouponSuccess(`Applied: -${formatPrice(res.discount)}`);
      setCouponInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#F7F4EE] h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#E4DFD5] flex items-center justify-between">
          <div>
            <h3 className="font-heading text-xl text-[#111111]">Shopping Bag</h3>
            <span className="text-[11px] uppercase tracking-wider text-[#8A857C]">
              {items.length} {items.length === 1 ? "Piece" : "Pieces"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#8A857C] hover:text-[#111111] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#FFFFFF] px-6 py-3 border-b border-[#E4DFD5]">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-[#8A857C]">
              {sub >= brandConfig.shipping.freeAbove
                ? "✨ Complimentary Atelier Shipping Unlocked"
                : `Add ${formatPrice(remainingForFreeShipping)} for complimentary shipping`}
            </span>
            <span className="font-medium text-[#111111]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-[#E4DFD5] h-1 overflow-hidden rounded-full">
            <div
              className="bg-[#B08D57] h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 mx-auto border border-[#E4DFD5] rounded-full flex items-center justify-center text-[#8A857C]">
                <Tag className="w-5 h-5 stroke-[1.25]" />
              </div>
              <h4 className="font-heading text-lg text-[#111111]">Your bag is currently empty</h4>
              <p className="text-xs text-[#8A857C] max-w-xs mx-auto">
                Explore our latest silhouettes, bias cuts, and fine cashmere garments.
              </p>
              <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                <Button
                  onClick={closeCart}
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link href="/shop">Explore New In</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-[#E4DFD5] last:border-0"
                >
                  <div className="relative w-20 h-28 bg-[#E4DFD5]/40 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm text-[#111111] hover:text-[#B08D57] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#8A857C] hover:text-red-700 transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.25]" />
                        </button>
                      </div>

                      <div className="text-xs text-[#8A857C] mt-1 space-x-2">
                        <span>Size: {item.size}</span>
                        <span>•</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <QuantityStepper
                        value={item.qty}
                        max={item.maxStock}
                        onChange={(newQty) => updateQty(item.id, newQty)}
                      />
                      <span className="text-sm font-medium text-[#111111] tabular-nums">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout actions */}
        {items.length > 0 && (
          <div className="p-6 bg-[#FFFFFF] border-t border-[#E4DFD5] space-y-4">
            {/* Gift Wrap Toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD5]">
              <label htmlFor="gift-wrap-toggle" className="flex items-center gap-2 cursor-pointer text-xs text-[#111111]">
                <Gift className="w-4 h-4 text-[#B08D57] stroke-[1.25]" />
                <span>Complimentary Atelier Gift Box & Card</span>
              </label>
              <input
                id="gift-wrap-toggle"
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="w-4 h-4 accent-[#111111] rounded cursor-pointer"
              />
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Promo Code (e.g. WELCOME10)"
                  className="flex-1 bg-[#F7F4EE] border border-[#E4DFD5] px-3 py-1.5 text-xs text-[#111111] uppercase tracking-wider focus:outline-none focus:border-[#111111]"
                />
                <Button type="submit" variant="secondary" size="sm" className="text-xs px-3 py-1.5">
                  Apply
                </Button>
              </div>

              {couponCode && (
                <div className="flex items-center justify-between text-xs text-[#2B2E26] bg-[#F7F4EE] px-2 py-1 border border-[#E4DFD5]">
                  <span className="flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#B08D57]" /> Code {couponCode} applied (-{formatPrice(discount)})
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
            </form>

            {/* Calculation Breakdown */}
            <div className="space-y-1.5 text-xs text-[#8A857C] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#111111]">{formatPrice(sub)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#B08D57]">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Atelier Shipping</span>
                <span className="tabular-nums text-[#111111]">
                  {ship === 0 ? "Complimentary" : formatPrice(ship)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-[#8A857C]">
                <span>Estimated GST (Inclusive)</span>
                <span className="tabular-nums">{formatPrice(gst)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-[#111111] pt-2 border-t border-[#E4DFD5]">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-2">
              <Button asChild className="w-full text-xs tracking-[0.2em] py-3.5">
                <Link href="/checkout" onClick={closeCart}>
                  Proceed to Checkout
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full text-xs tracking-[0.2em] py-3"
              >
                <Link href="/cart" onClick={closeCart}>
                  View Full Bag
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
