"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShieldCheck, Gift } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import brandConfig from "@/config/brand.config";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQty,
    giftWrap,
    setGiftWrap,
    subtotal,
    shippingFee,
    totalGst,
    grandTotal,
    discount,
  } = useCartStore();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const sub = subtotal();
  const ship = shippingFee();
  const gst = totalGst();
  const total = grandTotal();

  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        <div className="mb-8 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Shopping Bag" },
            ]}
          />
          <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
            Shopping Bag ({items.length} {items.length === 1 ? "Piece" : "Pieces"})
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white border border-[#E4DFD5] p-10 max-w-xl mx-auto">
            <h3 className="font-heading text-2xl text-[#111111]">
              Your Bag is Currently Empty
            </h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              Discover our latest creations in pure mulberry silk, double-faced cashmere, and fine Irish linen.
            </p>
            <div className="pt-4">
              <Button asChild className="px-8 text-xs uppercase tracking-[0.2em]">
                <Link href="/shop">Explore Atelier Collection</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Items Column (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-[#E4DFD5] divide-y divide-[#E4DFD5]">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative w-24 h-32 bg-[#E4DFD5]/40 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full space-y-3 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            className="font-serif text-base text-[#111111] hover:text-[#B08D57] transition-colors"
                          >
                            {item.name}
                          </Link>
                          <div className="text-xs text-[#8A857C] mt-1 space-x-2">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span>Color: {item.color}</span>
                          </div>
                        </div>

                        <span className="font-medium text-sm text-[#111111] tabular-nums">
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <QuantityStepper
                          value={item.qty}
                          max={item.maxStock}
                          onChange={(q) => updateQty(item.id, q)}
                        />

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-[#8A857C] hover:text-red-700 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Wrap Box */}
              <div className="p-4 bg-white border border-[#E4DFD5] flex items-center justify-between">
                <label htmlFor="gift-wrap-checkbox" className="flex items-center gap-2 cursor-pointer text-xs text-[#111111]">
                  <Gift className="w-4 h-4 text-[#B08D57]" />
                  <span>Complimentary Atelier Gift Packaging with Hand-Lettered Card</span>
                </label>
                <input
                  id="gift-wrap-checkbox"
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 accent-[#111111]"
                />
              </div>
            </div>

            {/* Summary Column (lg:col-span-4) */}
            <div className="lg:col-span-4 bg-white border border-[#E4DFD5] p-6 space-y-5 sticky top-24">
              <h3 className="font-heading text-xl text-[#111111]">
                Commission Summary
              </h3>

              <div className="space-y-2 text-xs text-[#8A857C] divide-y divide-[#E4DFD5]">
                <div className="flex justify-between pb-2">
                  <span>Bag Subtotal</span>
                  <span className="text-[#111111] tabular-nums">{formatPrice(sub)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-2 text-[#B08D57]">
                    <span>Privilege Courtesy</span>
                    <span className="tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span>Atelier Insured Delivery</span>
                  <span className="text-[#111111] tabular-nums">
                    {ship === 0 ? "Complimentary" : formatPrice(ship)}
                  </span>
                </div>
                <div className="flex justify-between py-2 text-[11px]">
                  <span>GST Total (Inclusive)</span>
                  <span className="tabular-nums">{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between pt-3 text-base font-medium text-[#111111]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button asChild className="w-full text-xs uppercase tracking-[0.2em] py-3.5">
                  <Link href="/checkout" className="flex items-center justify-center gap-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full text-xs uppercase tracking-[0.2em] py-3">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>

              <div className="pt-2 text-[11px] text-[#8A857C] space-y-1">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Insured white-glove courier across India</span>
                </p>
                <p>Doorstep 10-day exchange and returns guaranteed.</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
