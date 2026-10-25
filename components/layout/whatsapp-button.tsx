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

  return (
    <aside aria-label="Stylist Concierge" className="fixed bottom-6 right-6 z-40">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Private styling consultation via WhatsApp"
        className="group flex items-center gap-2.5 bg-[#2B2E26] text-[#F7F4EE] px-3.5 py-2.5 shadow-xl border border-[#3D4233] hover:bg-[#111111] transition-all duration-300"
      >
        <MessageCircle className="w-4 h-4 text-[#B08D57]" />
        <span className="hidden sm:inline text-xs uppercase tracking-[0.16em] font-medium pr-1">
          Private Stylist
        </span>
      </a>
    </aside>
  );
}
