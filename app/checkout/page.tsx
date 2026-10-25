"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import brandConfig from "@/config/brand.config";
import {
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  Gift,
  CreditCard,
  Truck,
  MapPin,
  Mail,
  Tag,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { validateMockCoupon, MOCK_ADDRESSES, checkMockPincode } from "@/lib/data/mock-db";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    shippingFee,
    totalGst,
    grandTotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    orderNote,
    clearCart,
  } = useCartStore();

  const [mounted, setMounted] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  // Accordion Step State
  const [step, setStep] = React.useState<number>(1);

  // Form State
  const [contactEmail, setContactEmail] = React.useState("customer@demo.com");
  const [newsletterOptIn, setNewsletterOptIn] = React.useState(true);

  // Shipping Address Form
  const [savedAddresses, setSavedAddresses] = React.useState(MOCK_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = React.useState<string>("addr-001");
  const [useNewAddress, setUseNewAddress] = React.useState(false);

  const [addressForm, setAddressForm] = React.useState({
    name: "Alisha Singhania",
    phone: "9876543210",
    line1: "Apartment 14B, Sea Face Towers",
    line2: "Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400018",
  });

  // Delivery Method: 'standard' | 'express'
  const [deliveryMethod, setDeliveryMethod] = React.useState<"standard" | "express">("standard");

  // Gift Options
  const [hidePricesOnSlip, setHidePricesOnSlip] = React.useState(false);

  // Settlement Method: 'razorpay' | 'cod'
  const [paymentMethod, setPaymentMethod] = React.useState<"razorpay" | "cod">("razorpay");

  // Coupon Box
  const [couponInput, setCouponInput] = React.useState("");
  const [couponError, setCouponError] = React.useState<string | null>(null);

  // Submission State
  const [submitting, setSubmitting] = React.useState(false);
  const [pincodeMessage, setPincodeMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
    // Check if user is signed in
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          setContactEmail(data.user.email);
          setAddressForm((prev) => ({
            ...prev,
            name: data.user.name || prev.name,
            phone: data.user.phone || prev.phone,
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Auto-fill City & State from Indian Pincode
  const handlePincodeChange = (pin: string) => {
    const cleanPin = pin.trim();
    setAddressForm((prev) => ({ ...prev, pincode: cleanPin }));

    if (cleanPin.length === 6) {
      const pinCheck = checkMockPincode(cleanPin);
      if (pinCheck.serviceable) {
        setPincodeMessage(`Serviceable: ${pinCheck.estimatedDelivery}`);
        // City/state suggestions
        const prefix = cleanPin.slice(0, 2);
        if (["11", "12", "13"].includes(prefix)) {
          setAddressForm((prev) => ({ ...prev, city: "New Delhi", state: "Delhi" }));
        } else if (["40", "41", "42"].includes(prefix)) {
          setAddressForm((prev) => ({ ...prev, city: "Mumbai", state: "Maharashtra" }));
        } else if (["56", "57"].includes(prefix)) {
          setAddressForm((prev) => ({ ...prev, city: "Bengaluru", state: "Karnataka" }));
        } else if (["60", "64"].includes(prefix)) {
          setAddressForm((prev) => ({ ...prev, city: "Chennai", state: "Tamil Nadu" }));
        }
      } else {
        setPincodeMessage(pinCheck.message);
      }
    } else {
      setPincodeMessage(null);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const res = validateMockCoupon(code, subtotal());
    if (!res.valid || !res.coupon || res.discount === undefined) {
      setCouponError(res.message);
    } else {
      applyCoupon(res.coupon.code, res.discount);
      setCouponInput("");
      toast.success(`Coupon ${res.coupon.code} applied (-${formatPrice(res.discount)})`);
    }
  };

  if (!mounted) return null;

  const sub = subtotal();
  const baseShip = shippingFee();
  const expressFee = deliveryMethod === "express" ? 250 : 0;
  const ship = baseShip + expressFee;
  const codFee = paymentMethod === "cod" ? brandConfig.shipping.codFee : 0;
  const giftWrapFee = giftWrap ? (brandConfig.shipping.giftWrapFee ?? 250) : 0;
  const gst = totalGst();
  const total = Math.max(0, sub - discount + ship + codFee + giftWrapFee);

  // If bag is empty
  if (items.length === 0) {
    return (
      <div className="py-20 text-center bg-[#F7F4EE] min-h-[70vh] flex items-center">
        <Container size="narrow" className="bg-white border border-[#E4DFD5] p-12 space-y-4 shadow-xs">
          <h2 className="font-heading text-2xl text-[#111111]">No Pieces in Checkout</h2>
          <p className="text-xs text-[#8A857C]">Please add an atelier creation to your bag to initiate commission checkout.</p>
          <div className="pt-2">
            <Button asChild className="text-xs uppercase tracking-wider">
              <Link href="/shop">Explore Collections</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Active shipping address object
  const activeAddress =
    !useNewAddress && savedAddresses.length > 0
      ? savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0]
      : {
          id: `addr-new-${Date.now()}`,
          name: addressForm.name,
          phone: addressForm.phone,
          line1: addressForm.line1,
          line2: addressForm.line2,
          city: addressForm.city,
          state: addressForm.state,
          pincode: addressForm.pincode,
          is_default: false,
        };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Submit order to server creation route
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser?.id || null,
          guestEmail: contactEmail,
          customerName: activeAddress.name,
          paymentMethod,
          shippingAddress: activeAddress,
          deliveryMethod,
          giftWrap,
          giftMessage,
          hidePricesOnInvoice: hidePricesOnSlip,
          couponCode,
          notes: orderNote,
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            name: i.name,
            image: i.image,
            size: i.size,
            color: i.color,
            qty: i.qty,
            price: i.price,
            gstRate: i.gstRate || 12,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.error || "Order registration could not be completed.");
        setSubmitting(false);
        return;
      }

      const createdOrder = data.order;

      // 2. Handle Razorpay Payment flow
      if (paymentMethod === "razorpay") {
        // In TEST environment, verify simulated payment signature server-side
        const verifyRes = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: createdOrder.razorpay_order_id,
            razorpay_payment_id: `pay_test_${Math.floor(100000 + Math.random() * 900000)}`,
            razorpay_signature: `sim_verified_${createdOrder.order_number}`,
            order_number: createdOrder.order_number,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          toast.error("Payment authorization could not be verified.");
          setSubmitting(false);
          return;
        }
      }

      // Order successfully placed and verified
      clearCart();
      toast.success(`Commission ${createdOrder.order_number} confirmed!`);
      router.push(`/order/success/${createdOrder.order_number}`);
    } catch {
      toast.error("Failed to connect to checkout gateway. Please retry.");
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE] min-h-screen">
      <Container>
        <div className="mb-8 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Bag", href: "/cart" },
              { label: "Commission Checkout" },
            ]}
          />
          <div className="flex items-baseline justify-between">
            <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
              Secure Commission Checkout
            </h1>
            <span className="text-xs text-[#8A857C] flex items-center gap-1.5 font-medium">
              <Lock className="w-3.5 h-3.5 text-[#B08D57]" /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Accordion Steps (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* STEP 1: CONTACT */}
            <div className="bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
              <div
                onClick={() => setStep(1)}
                className="flex items-center justify-between cursor-pointer pb-2 border-b border-[#E4DFD5]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-medium flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-heading text-lg text-[#111111]">
                    Client Contact & Identification
                  </h3>
                </div>
                {step > 1 && <Check className="w-4 h-4 text-[#B08D57]" />}
              </div>

              {step === 1 && (
                <div className="space-y-4 pt-2 text-xs">
                  <div className="flex justify-between items-center text-[11px] text-[#8A857C]">
                    <span>Enter your email for delivery provenance tracking.</span>
                    {!currentUser && (
                      <Link href={`/account/login?returnUrl=/checkout`} className="text-[#111111] hover:underline font-medium">
                        Have an atelier account? Sign In &rarr;
                      </Link>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      placeholder="e.g. patron@domain.com"
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="newsletter-opt-in"
                      checked={newsletterOptIn}
                      onChange={(e) => setNewsletterOptIn(e.target.checked)}
                      className="accent-[#111111] cursor-pointer"
                    />
                    <label htmlFor="newsletter-opt-in" className="text-xs text-[#8A857C] cursor-pointer">
                      Receive dispatches regarding private solstice drops and bespoke allocations.
                    </label>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs uppercase tracking-wider py-3 px-6"
                    >
                      Continue to Delivery Address
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: SHIPPING ADDRESS */}
            <div className="bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
              <div
                onClick={() => setStep(2)}
                className="flex items-center justify-between cursor-pointer pb-2 border-b border-[#E4DFD5]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-medium flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-heading text-lg text-[#111111]">
                    Delivery Residence
                  </h3>
                </div>
                {step > 2 && <Check className="w-4 h-4 text-[#B08D57]" />}
              </div>

              {step === 2 && (
                <div className="space-y-4 pt-2 text-xs">
                  {/* Saved Address Selector */}
                  {savedAddresses.length > 0 && !useNewAddress && (
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A857C] block font-medium">
                        Select Saved Residence
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {savedAddresses.map((addr) => (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-4 border cursor-pointer transition-colors ${
                              selectedAddressId === addr.id
                                ? "border-[#111111] bg-[#F7F4EE]"
                                : "border-[#E4DFD5] hover:border-[#111111]"
                            }`}
                          >
                            <p className="font-medium text-[#111111]">{addr.name}</p>
                            <p className="text-[#8A857C] text-[11px] truncate">{addr.line1}</p>
                            <p className="text-[#8A857C] text-[11px]">{addr.city}, {addr.pincode}</p>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setUseNewAddress(true)}
                        className="text-[11px] text-[#B08D57] hover:underline uppercase tracking-wider block pt-1"
                      >
                        + Enter New Residence Address Instead
                      </button>
                    </div>
                  )}

                  {/* Manual Address Form */}
                  {(useNewAddress || savedAddresses.length === 0) && (
                    <div className="space-y-4">
                      {savedAddresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setUseNewAddress(false)}
                          className="text-[11px] text-[#8A857C] hover:text-[#111111] underline"
                        >
                          &larr; Choose from Saved Residences
                        </button>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                            Full Legal Name *
                          </label>
                          <input
                            type="text"
                            value={addressForm.name}
                            onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                            required
                            className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                            Mobile Phone (+91) *
                          </label>
                          <input
                            type="tel"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                            required
                            maxLength={10}
                            className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                          Flat, Suite, Street Address *
                        </label>
                        <input
                          type="text"
                          value={addressForm.line1}
                          onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })}
                          required
                          className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            value={addressForm.pincode}
                            onChange={(e) => handlePincodeChange(e.target.value)}
                            required
                            maxLength={6}
                            className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] font-mono focus:outline-none focus:border-[#111111]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                            City *
                          </label>
                          <input
                            type="text"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            required
                            className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                            State *
                          </label>
                          <input
                            type="text"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            required
                            className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                          />
                        </div>
                      </div>

                      {pincodeMessage && (
                        <p className="text-xs text-[#B08D57] font-medium">{pincodeMessage}</p>
                      )}
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs uppercase tracking-wider py-3 px-6"
                    >
                      Continue to Delivery Method
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: DELIVERY METHOD */}
            <div className="bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
              <div
                onClick={() => setStep(3)}
                className="flex items-center justify-between cursor-pointer pb-2 border-b border-[#E4DFD5]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-medium flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-heading text-lg text-[#111111]">
                    Atelier Courier Logistics
                  </h3>
                </div>
                {step > 3 && <Check className="w-4 h-4 text-[#B08D57]" />}
              </div>

              {step === 3 && (
                <div className="space-y-3 pt-2 text-xs">
                  <label className={`p-4 border block cursor-pointer transition-colors ${
                    deliveryMethod === "standard" ? "border-[#111111] bg-[#F7F4EE]" : "border-[#E4DFD5] bg-white"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="delivery-method"
                          value="standard"
                          checked={deliveryMethod === "standard"}
                          onChange={() => setDeliveryMethod("standard")}
                          className="accent-[#111111]"
                        />
                        <strong className="text-[#111111]">Standard Atelier Insured Courier</strong>
                      </div>
                      <span className="text-xs tabular-nums font-medium text-[#111111]">
                        {baseShip === 0 ? "Complimentary" : formatPrice(baseShip)}
                      </span>
                    </div>
                    <p className="text-[#8A857C] text-[11px] pl-6 mt-1">
                      Delivered within 3–5 business days via BlueDart / Delhivery insured white-glove service.
                    </p>
                  </label>

                  <label className={`p-4 border block cursor-pointer transition-colors ${
                    deliveryMethod === "express" ? "border-[#111111] bg-[#F7F4EE]" : "border-[#E4DFD5] bg-white"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="delivery-method"
                          value="express"
                          checked={deliveryMethod === "express"}
                          onChange={() => setDeliveryMethod("express")}
                          className="accent-[#111111]"
                        />
                        <strong className="text-[#111111]">Priority Atelier Air Dispatch (+₹250)</strong>
                      </div>
                      <span className="text-xs tabular-nums font-medium text-[#111111]">₹250</span>
                    </div>
                    <p className="text-[#8A857C] text-[11px] pl-6 mt-1">
                      Guaranteed priority dispatch within 24–48 hours to major Indian metros.
                    </p>
                  </label>

                  <div className="pt-2">
                    <Button
                      type="button"
                      onClick={() => setStep(4)}
                      className="text-xs uppercase tracking-wider py-3 px-6"
                    >
                      Continue to Gift & Packaging
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 4: GIFT OPTIONS */}
            <div className="bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
              <div
                onClick={() => setStep(4)}
                className="flex items-center justify-between cursor-pointer pb-2 border-b border-[#E4DFD5]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-medium flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-heading text-lg text-[#111111]">
                    Gift Presentation & Dedicated Card
                  </h3>
                </div>
                {step > 4 && <Check className="w-4 h-4 text-[#B08D57]" />}
              </div>

              {step === 4 && (
                <div className="space-y-4 pt-2 text-xs">
                  <div className="flex items-center justify-between">
                    <label htmlFor="chk-gift-wrap" className="flex items-center gap-2 cursor-pointer font-medium text-[#111111]">
                      <Gift className="w-4 h-4 text-[#B08D57] stroke-[1.25]" />
                      <span>Atelier Gift Packaging with Embossed Dedication (+{formatPrice(brandConfig.shipping.giftWrapFee ?? 250)})</span>
                    </label>
                    <input
                      id="chk-gift-wrap"
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-4 h-4 accent-[#111111]"
                    />
                  </div>

                  {giftWrap && (
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-[#8A857C] block">
                        Hand-Penned Gift Message (Max 150 characters)
                      </label>
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Write your dedication here..."
                        maxLength={150}
                        rows={2}
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-[#E4DFD5]">
                    <input
                      id="hide-prices"
                      type="checkbox"
                      checked={hidePricesOnSlip}
                      onChange={(e) => setHidePricesOnSlip(e.target.checked)}
                      className="w-4 h-4 accent-[#111111]"
                    />
                    <label htmlFor="hide-prices" className="text-xs text-[#8A857C] cursor-pointer">
                      Omit item prices from enclosed packing slip (recommended for gifts).
                    </label>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="button"
                      onClick={() => setStep(5)}
                      className="text-xs uppercase tracking-wider py-3 px-6"
                    >
                      Continue to Settlement
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 5: PAYMENT METHOD & SUBMIT */}
            <div className="bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
              <div
                onClick={() => setStep(5)}
                className="flex items-center justify-between cursor-pointer pb-2 border-b border-[#E4DFD5]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-[11px] font-medium flex items-center justify-center">
                    5
                  </span>
                  <h3 className="font-heading text-lg text-[#111111]">
                    Settlement Method
                  </h3>
                </div>
              </div>

              {step === 5 && (
                <div className="space-y-4 pt-2 text-xs">
                  <label className={`p-4 border block cursor-pointer transition-colors ${
                    paymentMethod === "razorpay" ? "border-[#111111] bg-[#F7F4EE]" : "border-[#E4DFD5] bg-white"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          value="razorpay"
                          checked={paymentMethod === "razorpay"}
                          onChange={() => setPaymentMethod("razorpay")}
                          className="accent-[#111111]"
                        />
                        <strong className="text-[#111111]">Razorpay Online Gateway (UPI, Cards, NetBanking)</strong>
                      </div>
                      <span className="text-[10px] text-[#B08D57] font-medium">Instant Clearance</span>
                    </div>
                    <p className="text-[#8A857C] text-[11px] pl-6 mt-1">
                      Encrypted payments across UPI (GPay, PhonePe), all Indian & International Cards, and NetBanking.
                    </p>
                  </label>

                  <label className={`p-4 border block cursor-pointer transition-colors ${
                    paymentMethod === "cod" ? "border-[#111111] bg-[#F7F4EE]" : "border-[#E4DFD5] bg-white"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
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
                      <span className="text-[11px] text-[#8A857C]">+₹{brandConfig.shipping.codFee} handling</span>
                    </div>
                    <p className="text-[#8A857C] text-[11px] pl-6 mt-1">
                      Pay directly in cash or UPI upon handover of your sealed atelier parcel.
                    </p>
                  </label>

                  <div className="pt-4 border-t border-[#E4DFD5]">
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={submitting}
                      className="w-full text-xs uppercase tracking-[0.2em] py-4"
                    >
                      {submitting
                        ? "Registering Commission..."
                        : `Authorize Commission • ${formatPrice(total)}`}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Column: Sticky (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-6 sticky top-24 shadow-xs">
            <h3 className="font-heading text-xl text-[#111111] pb-3 border-b border-[#E4DFD5]">
              Commission Details ({items.length})
            </h3>

            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#E4DFD5]/50">
              {items.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex gap-3 items-center text-xs">
                  <div className="relative w-12 h-16 bg-[#E4DFD5]/40 flex-shrink-0 overflow-hidden border border-[#E4DFD5]">
                    <Image src={item.image} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-medium text-[#111111] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#8A857C]">
                      Size: {item.size} • Color: {item.color} • Qty: {item.qty}
                    </p>
                  </div>
                  <span className="tabular-nums font-medium text-[#111111]">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5 pt-2 border-t border-[#E4DFD5]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Promo Code (e.g. WELCOME10)"
                  className="flex-1 bg-[#F7F4EE] border border-[#E4DFD5] px-3 py-1.5 text-xs text-[#111111] uppercase tracking-wider focus:outline-none"
                />
                <Button type="submit" variant="secondary" size="sm" className="text-xs px-3">
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

            {/* Totals Breakdown */}
            <div className="space-y-2 text-xs text-[#8A857C] pt-2 border-t border-[#E4DFD5]">
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
                <span>Atelier Courier</span>
                <span className="text-[#111111] tabular-nums">
                  {ship === 0 ? "Complimentary" : formatPrice(ship)}
                </span>
              </div>
              {giftWrap && (
                <div className="flex justify-between text-[#111111]">
                  <span>Atelier Gift Packaging</span>
                  <span className="tabular-nums font-medium">+{formatPrice(brandConfig.shipping.giftWrapFee ?? 250)}</span>
                </div>
              )}
              {codFee > 0 && (
                <div className="flex justify-between">
                  <span>COD Handling Fee</span>
                  <span className="text-[#111111] tabular-nums">{formatPrice(codFee)}</span>
                </div>
              )}
              <div className="py-1 text-[11px] space-y-1">
                <div className="flex justify-between text-[#8A857C]">
                  <span>Estimated GST (12% Inclusive)</span>
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
              <div className="flex justify-between pt-3 text-base font-medium text-[#111111] border-t border-[#E4DFD5]">
                <span>Total Due</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-3 bg-[#F7F4EE] border border-[#E4DFD5] text-[11px] text-[#8A857C] space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-[#111111]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Atelier Authenticity Guarantee</span>
              </div>
              <p>Every piece is dispatched from our Mumbai atelier with an individual serial seal and certificate.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
