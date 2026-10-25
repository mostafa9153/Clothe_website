"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp, ArrowRight, Check } from "lucide-react";
import brandConfig from "@/config/brand.config";
import { Button } from "@/components/ui/button";
import { subscribeNewsletterAction } from "@/app/actions/leads";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setFeedback("Please provide a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await subscribeNewsletterAction({ email, source: "website_footer" });
      if (!res.success) {
        setStatus("error");
        setFeedback(res.message);
      } else {
        setStatus("success");
        setFeedback(res.message);
        setEmail("");
      }
    } catch {
      setStatus("error");
      setFeedback("Unable to register email at this time. Please try again.");
    }
  };


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2B2E26] text-[#F7F4EE] pt-16 md:pt-24 pb-12 border-t border-[#3D4233]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top Newsletter & Atelier Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#3D4233] items-start">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
              Private Client Register
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-normal tracking-wide">
              Subscribe to the Atelier Dispatches
            </h3>
            <p className="text-xs text-[#8A857C] max-w-md leading-relaxed">
              Receive private previews of numbered drops, invitations to private appointments, and
              curated fabric essays. Complimentary 10% welcome privilege applied upon registration.
            </p>
          </div>

          <div className="lg:col-span-6 w-full max-w-md lg:ml-auto">
            {status === "success" ? (
              <div className="p-4 bg-[#3D4233]/60 border border-[#B08D57]/40 flex items-start gap-3">
                <Check className="w-5 h-5 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-medium text-[#F7F4EE]">{feedback}</p>
                  <p className="text-[#8A857C]">Use code <strong className="text-[#B08D57] tracking-wider">WELCOME10</strong> at checkout for 10% off your first commission.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex border-b border-[#8A857C] focus-within:border-[#B08D57] transition-colors pb-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent text-sm text-[#F7F4EE] placeholder:text-[#8A857C] focus:outline-none"
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="text-xs uppercase tracking-[0.2em] text-[#F7F4EE] hover:text-[#B08D57] flex items-center gap-1 transition-colors pl-2"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-[11px] text-red-400">{feedback}</p>
                )}
                <span className="text-[10px] text-[#8A857C] block pt-1">
                  By joining, you respect our quiet communication frequency (maximum 2 dispatches per month).
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Navigation & Client Services Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 py-16 border-b border-[#3D4233] text-xs">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-4 space-y-4 pr-6">
            <Link
              href="/"
              className="font-heading text-2xl tracking-[0.22em] font-normal uppercase text-[#F7F4EE]"
            >
              {brandConfig.logoText}
            </Link>
            <p className="text-[#8A857C] text-xs leading-relaxed max-w-sm">
              {brandConfig.description}
            </p>
            <div className="text-[11px] text-[#8A857C] space-y-1 pt-1">
              <p>{brandConfig.contact.address}</p>
              <p>{brandConfig.contact.phone}</p>
              <p>{brandConfig.contact.email}</p>
            </div>
          </div>

          {/* Shop Column */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#B08D57]">
              The Collections
            </p>
            <ul className="space-y-2 text-[#8A857C]">
              <li><Link href="/category/dresses" className="hover:text-[#F7F4EE] transition-colors">Dresses & Silk Gowns</Link></li>
              <li><Link href="/category/outerwear" className="hover:text-[#F7F4EE] transition-colors">Coats & Outerwear</Link></li>
              <li><Link href="/category/trousers" className="hover:text-[#F7F4EE] transition-colors">Tailored Trousers</Link></li>
              <li><Link href="/category/mens-shirts" className="hover:text-[#F7F4EE] transition-colors">Menswear Atelier</Link></li>
              <li><Link href="/category/accessories" className="hover:text-[#F7F4EE] transition-colors">Artisanal Leather</Link></li>
              <li><Link href="/new-in" className="hover:text-[#F7F4EE] transition-colors">New In Pieces</Link></li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#B08D57]">
              Client Care
            </p>
            <ul className="space-y-2 text-[#8A857C]">
              <li><Link href="/account" className="hover:text-[#F7F4EE] transition-colors">Order Tracking</Link></li>
              <li><Link href="/contact" className="hover:text-[#F7F4EE] transition-colors">Bespoke Concierge</Link></li>
              <li><Link href="/consultation" className="hover:text-[#F7F4EE] transition-colors">Stylist Appointment</Link></li>
              <li><Link href="/policies/shipping" className="hover:text-[#F7F4EE] transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/policies/returns" className="hover:text-[#F7F4EE] transition-colors">10-Day Returns Policy</Link></li>
              <li><Link href="/policies/care" className="hover:text-[#F7F4EE] transition-colors">Textile Care Guide</Link></li>
            </ul>
          </div>

          {/* Maison & Journal */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#B08D57]">
              The House
            </p>
            <ul className="space-y-2 text-[#8A857C]">
              <li><Link href="/about" className="hover:text-[#F7F4EE] transition-colors">Atelier Heritage</Link></li>
              <li><Link href="/journal" className="hover:text-[#F7F4EE] transition-colors">The Journal</Link></li>
              <li><Link href="/design-system" className="hover:text-[#F7F4EE] transition-colors">Design System Showcase</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-[#F7F4EE] transition-colors">Privacy Discretion</Link></li>
              <li><Link href="/policies/terms" className="hover:text-[#F7F4EE] transition-colors">Terms of Commission</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payments, Copyright, Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8A857C]">
          <div className="flex items-center gap-4 text-[11px]">
            <span>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</span>
            <span>•</span>
            <span className="hidden sm:inline">Prices inclusive of GST</span>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-3 text-[10px] tracking-wider uppercase">
            <span className="px-2 py-0.5 border border-[#3D4233] text-[#F7F4EE]">UPI</span>
            <span className="px-2 py-0.5 border border-[#3D4233] text-[#F7F4EE]">VISA</span>
            <span className="px-2 py-0.5 border border-[#3D4233] text-[#F7F4EE]">MASTERCARD</span>
            <span className="px-2 py-0.5 border border-[#3D4233] text-[#F7F4EE]">NET BANKING</span>
            <span className="px-2 py-0.5 border border-[#3D4233] text-[#F7F4EE]">CASH ON DELIVERY</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 uppercase tracking-widest text-[11px] hover:text-[#F7F4EE] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 stroke-[1.25]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
