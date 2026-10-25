"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import brandConfig from "@/config/brand.config";
import { Check, ShieldCheck, Lock, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    shippingFee,
    totalGst,
    grandTotal,
    discount,
    giftWrap,
    clearCart,
  } = useCartStore();

  const [mounted, setMounted] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<"razorpay" | "cod">("razorpay");
  const [isOrdered, setIsOrdered] = React.useState(false);
  const [orderNum, setOrderNum] = React.useState("");

  // Form State
  const [formData, setFormData] = React.useState({
    name: "Alisha Singhania",
    email: "customer@demo.com",
    phone: "9876543210",
    line1: "Apartment 14B, Sea Face Towers",
    line2: "Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400018",
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sub = subtotal();
  const ship = shippingFee();
  const codFee = paymentMethod === "cod" ? brandConfig.shipping.codFee : 0;
  const gst = totalGst();
  const total = Math.max(0, grandTotal() + codFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNum = `MA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNum(newNum);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="py-16 md:py-24 bg-[#F7F4EE]">
        <Container size="narrow" className="text-center space-y-6 bg-white border border-[#E4DFD5] p-8 sm:p-14 shadow-xs">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#2B2E26] text-[#B08D57] flex items-center justify-center">
            <Check className="w-7 h-7" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Commission Confirmed
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl text-[#111111]">
            Thank You, {formData.name}
          </h1>

          <p className="font-mono text-sm tracking-wider text-[#111111] bg-[#F7F4EE] px-4 py-2 border border-[#E4DFD5] inline-block">
            Order Reference: {orderNum}
          </p>

          <p className="text-xs text-[#8A857C] max-w-md mx-auto leading-relaxed">
            Your commission has been registered with the atelier. A confirmation dispatch has been routed to <strong>{formData.email}</strong>. Our white-glove courier will deliver within {brandConfig.shipping.estimatedDays}.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="px-8 text-xs uppercase tracking-[0.2em]">
              <Link href="/shop">Continue Atelier Exploration</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 text-xs uppercase tracking-[0.2em]">
              <Link href="/account">View Order in Client Record</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center bg-[#F7F4EE]">
        <Container size="narrow" className="bg-white border border-[#E4DFD5] p-12 space-y-4">
          <h2 className="font-heading text-2xl text-[#111111]">No Pieces in Checkout</h2>
          <p className="text-xs text-[#8A857C]">Please add an atelier creation to your bag to initiate checkout.</p>
          <div className="pt-2">
            <Button asChild>
              <Link href="/shop">Explore Collections</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        <div className="mb-8 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Bag", href: "/cart" },
              { label: "Checkout & Commission" },
            ]}
          />
          <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
            Secure Atelier Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Delivery Address & Payment (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8 bg-white border border-[#E4DFD5] p-6 sm:p-8">
            {/* Delivery Details */}
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#111111] block pb-2 border-b border-[#E4DFD5]">
                1. Delivery Residence & Client Dossier
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    Mobile Phone (+91) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                  Client Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>

              <div className="text-xs">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                  Flat, Residence, Street Address *
                </label>
                <input
                  type="text"
                  value={formData.line1}
                  onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 focus:outline-none focus:border-[#111111]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 focus:outline-none focus:border-[#111111] font-mono"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-4 border-t border-[#E4DFD5]">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#111111] block pb-2 border-b border-[#E4DFD5]">
                2. Settlement Method
              </span>

              <div className="space-y-3 text-xs">
                <label className={`p-4 border block cursor-pointer transition-colors ${
                  paymentMethod === "razorpay" ? "border-[#111111] bg-[#F7F4EE]" : "border-[#E4DFD5] bg-white"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="accent-[#111111]"
                      />
                      <strong className="text-[#111111]">Online Payment (UPI, Cards, NetBanking)</strong>
                    </div>
                    <span className="text-[10px] text-[#B08D57] font-medium">Instant Confirmation</span>
                  </div>
                  <p className="text-[#8A857C] text-[11px] pl-5 mt-1">
                    Securely encrypted via Razorpay payment gateway (Test Mode).
                  </p>
                </label>

                <label className={`p-4 border block cursor-pointer transition-colors ${
                  paymentMethod === "cod" ? "border-[#111111] bg-[#F7F4EE]" : "border-[#E4DFD5] bg-white"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-[#111111]"
                      />
                      <strong className="text-[#111111]">Cash on Delivery (COD)</strong>
                    </div>
                    <span className="text-[10px] text-[#8A857C]">+₹{brandConfig.shipping.codFee} fee</span>
                  </div>
                  <p className="text-[#8A857C] text-[11px] pl-5 mt-1">
                    Pay in cash or UPI directly upon doorstep parcel handover.
                  </p>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full text-xs uppercase tracking-[0.2em] py-4">
              Authorize Commission & Place Order • {formatPrice(total)}
            </Button>
          </div>

          {/* Right Summary: Items & Totals (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-6 sticky top-24">
            <h3 className="font-heading text-xl text-[#111111] pb-3 border-b border-[#E4DFD5]">
              Commission Details ({items.length})
            </h3>

            {/* Item Thumbnails */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center text-xs">
                  <div className="relative w-12 h-16 bg-[#E4DFD5]/40 flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-medium text-[#111111] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#8A857C]">Size: {item.size} • Color: {item.color} • Qty: {item.qty}</p>
                  </div>
                  <span className="tabular-nums font-medium text-[#111111]">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#8A857C] pt-4 border-t border-[#E4DFD5]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#111111] tabular-nums">{formatPrice(sub)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#B08D57]">
                  <span>Privilege Courtesy</span>
                  <span className="tabular-nums">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Atelier Shipping</span>
                <span className="text-[#111111] tabular-nums">
                  {ship === 0 ? "Complimentary" : formatPrice(ship)}
                </span>
              </div>
              {codFee > 0 && (
                <div className="flex justify-between">
                  <span>COD Handling Fee</span>
                  <span className="text-[#111111] tabular-nums">{formatPrice(codFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-[11px]">
                <span>Estimated GST (Inclusive)</span>
                <span className="tabular-nums">{formatPrice(gst)}</span>
              </div>
              <div className="flex justify-between pt-3 text-base font-medium text-[#111111] border-t border-[#E4DFD5]">
                <span>Total Due</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="p-3 bg-[#F7F4EE] border border-[#E4DFD5] text-[11px] text-[#8A857C] space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-[#111111]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Atelier Authenticity Guarantee</span>
              </div>
              <p>Every piece is dispatched from our Mumbai atelier with an individual serial seal and certificate.</p>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
