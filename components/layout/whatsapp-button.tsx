"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import brandConfig from "@/config/brand.config";

export function WhatsAppButton() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Hide on checkout and admin pages to prevent distraction
  if (pathname.startsWith("/checkout") || pathname.startsWith("/admin")) {
    return null;
  }

  const cleanNumber = brandConfig.whatsapp.number.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    brandConfig.whatsapp.prefilledMessage
  )}`;

  const isProductPage = pathname.startsWith("/product/");

  return (
    <aside
      aria-label="Stylist Concierge"
      className={`fixed ${
        isProductPage ? "bottom-22 md:bottom-6" : "bottom-6"
      } right-4 sm:right-6 z-30 transition-all duration-300 pb-[env(safe-area-inset-bottom)]`}
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Private styling consultation via WhatsApp"
        className="group flex items-center gap-2.5 bg-[#1F3A33] text-[#F7F4EE] px-3.5 py-2.5 shadow-xl border border-[#2D544A] hover:bg-[#111111] transition-all duration-300"
      >
        <MessageCircle className="w-4 h-4 text-[#B08D57]" />
        <span className="hidden sm:inline text-xs uppercase tracking-[0.16em] font-medium pr-1">
          Private Stylist
        </span>
      </a>
    </aside>
  );
}
