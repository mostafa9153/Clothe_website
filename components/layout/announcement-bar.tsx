"use client";

import * as React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import brandConfig from "@/config/brand.config";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

const DEFAULT_MESSAGES = [
  `Complimentary white-glove courier across India on orders over ${formatPrice(brandConfig.shipping.freeAbove)}`,
  "The Autumnal Solstice Drop — strictly limited to 50 numbered pieces worldwide",
  "Private concierge styling & bespoke fittings available at Colaba Atelier",
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const subtotal = useCartStore((state) => state.subtotal());

  React.useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem("maison_aure_announcement_dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEFAULT_MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!mounted || !isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("maison_aure_announcement_dismissed", "true");
  };

  const remainingForFreeShipping = Math.max(0, brandConfig.shipping.freeAbove - subtotal);

  return (
    <div className="relative bg-[#2B2E26] text-[#F7F4EE] px-4 py-2 text-xs font-normal tracking-wide transition-all duration-300">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Left spacer for symmetry */}
        <div className="hidden md:flex items-center gap-1 opacity-0 w-8"></div>

        {/* Message Carousel / Free shipping status */}
        <div className="flex-1 flex items-center justify-center gap-3 text-center">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + DEFAULT_MESSAGES.length) % DEFAULT_MESSAGES.length)
            }
            className="hidden sm:inline-flex text-[#8A857C] hover:text-[#F7F4EE] transition-colors p-0.5"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[1.25]" />
          </button>

          <div className="overflow-hidden min-h-[1.2rem] flex items-center justify-center">
            {subtotal > 0 && remainingForFreeShipping > 0 ? (
              <span className="animate-fade-in font-medium">
                Add <span className="text-[#B08D57]">{formatPrice(remainingForFreeShipping)}</span> more for complimentary atelier shipping
              </span>
            ) : subtotal >= brandConfig.shipping.freeAbove ? (
              <span className="animate-fade-in text-[#B08D57] font-medium">
                ✦ You qualify for complimentary atelier express delivery
              </span>
            ) : (
              <span className="animate-fade-in transition-opacity duration-500">
                {DEFAULT_MESSAGES[currentIndex]}
              </span>
            )}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % DEFAULT_MESSAGES.length)}
            className="hidden sm:inline-flex text-[#8A857C] hover:text-[#F7F4EE] transition-colors p-0.5"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5 stroke-[1.25]" />
          </button>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="text-[#8A857C] hover:text-[#F7F4EE] transition-colors p-1 -mr-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5 stroke-[1.25]" />
        </button>
      </div>
    </div>
  );
}
