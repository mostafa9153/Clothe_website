"use client";

import * as React from "react";
import Link from "next/link";
import { X, ChevronDown, MessageCircle, Heart, User, ArrowRight } from "lucide-react";
import brandConfig from "@/config/brand.config";
import { Category, Collection } from "@/types/database.types";
import { useWishlistStore } from "@/store/wishlist-store";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  collections: Collection[];
}

export function MobileDrawer({ isOpen, onClose, categories, collections }: MobileDrawerProps) {
  const [openSection, setOpenSection] = React.useState<string | null>("women");
  const wishlistCount = useWishlistStore((state) => state.count());

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm bg-[#F7F4EE] h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
        {/* Top Header */}
        <div className="p-6 border-b border-[#E4DFD5] flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="font-heading text-xl tracking-[0.2em] font-normal text-[#111111]"
          >
            {brandConfig.logoText}
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8A857C] hover:text-[#111111] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {/* Navigation Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Accordion Categories */}
          <div className="space-y-4">
            {/* Womenswear Accordion */}
            <div className="border-b border-[#E4DFD5] pb-3">
              <button
                onClick={() => toggleSection("women")}
                className="w-full flex items-center justify-between text-sm uppercase tracking-[0.18em] font-medium text-[#111111] py-1 text-left"
              >
                <span>Womenswear</span>
                <ChevronDown
                  className={`w-4 h-4 stroke-[1.25] text-[#8A857C] transition-transform duration-300 ${
                    openSection === "women" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "women" && (
                <ul className="pt-3 pl-2 space-y-2.5 text-xs text-[#8A857C] animate-in fade-in duration-200">
                  <li>
                    <Link
                      href="/category/dresses"
                      onClick={onClose}
                      className="block hover:text-[#111111] transition-colors py-0.5"
                    >
                      Dresses & Gowns
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/tops-shirts"
                      onClick={onClose}
                      className="block hover:text-[#111111] transition-colors py-0.5"
                    >
                      Tops & Silk Blouses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/outerwear"
                      onClick={onClose}
                      className="block hover:text-[#111111] transition-colors py-0.5"
                    >
                      Coats & Outerwear
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/trousers"
                      onClick={onClose}
                      className="block hover:text-[#111111] transition-colors py-0.5"
                    >
                      Trousers & Tailoring
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Menswear Accordion */}
            <div className="border-b border-[#E4DFD5] pb-3">
              <button
                onClick={() => toggleSection("men")}
                className="w-full flex items-center justify-between text-sm uppercase tracking-[0.18em] font-medium text-[#111111] py-1 text-left"
              >
                <span>Menswear</span>
                <ChevronDown
                  className={`w-4 h-4 stroke-[1.25] text-[#8A857C] transition-transform duration-300 ${
                    openSection === "men" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "men" && (
                <ul className="pt-3 pl-2 space-y-2.5 text-xs text-[#8A857C] animate-in fade-in duration-200">
                  <li>
                    <Link
                      href="/category/mens-shirts"
                      onClick={onClose}
                      className="block hover:text-[#111111] transition-colors py-0.5"
                    >
                      Tailored Shirts & Linen
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?category=trousers"
                      onClick={onClose}
                      className="block hover:text-[#111111] transition-colors py-0.5"
                    >
                      Gurkha Trousers & Pants
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?category=outerwear"
                      onClick={onClose}
                      className="block hover:text-[#111111] transition-colors py-0.5"
                    >
                      Blazers & Overcoats
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Collections Accordion */}
            <div className="border-b border-[#E4DFD5] pb-3">
              <button
                onClick={() => toggleSection("collections")}
                className="w-full flex items-center justify-between text-sm uppercase tracking-[0.18em] font-medium text-[#111111] py-1 text-left"
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-4 h-4 stroke-[1.25] text-[#8A857C] transition-transform duration-300 ${
                    openSection === "collections" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "collections" && (
                <ul className="pt-3 pl-2 space-y-2.5 text-xs text-[#8A857C] animate-in fade-in duration-200">
                  {collections.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/collections/${c.slug}`}
                        onClick={onClose}
                        className="block hover:text-[#111111] transition-colors py-0.5"
                      >
                        {c.name} {c.is_drop ? "✦ (Drop)" : ""}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Direct Links */}
            <div className="pt-2 space-y-3">
              <Link
                href="/new-in"
                onClick={onClose}
                className="block text-sm uppercase tracking-[0.18em] font-medium text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                New In
              </Link>
              <Link
                href="/lookbook"
                onClick={onClose}
                className="block text-sm uppercase tracking-[0.18em] font-medium text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Winter Lookbook
              </Link>
              <Link
                href="/sale"
                onClick={onClose}
                className="block text-sm uppercase tracking-[0.18em] font-medium text-[#B08D57] hover:text-[#111111] transition-colors"
              >
                Private Archive Sale
              </Link>
              <Link
                href="/journal"
                onClick={onClose}
                className="block text-sm uppercase tracking-[0.18em] font-medium text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                The Atelier Journal
              </Link>
              <Link
                href="/book-consultation"
                onClick={onClose}
                className="block text-sm uppercase tracking-[0.18em] font-medium text-[#111111] hover:text-[#B08D57] transition-colors"
              >
                Private Styling Appointment
              </Link>
              <Link
                href="/size-guide"
                onClick={onClose}
                className="block text-sm uppercase tracking-[0.18em] font-medium text-[#8A857C] hover:text-[#111111] transition-colors"
              >
                Size Guide
              </Link>
              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#B08D57] pt-2"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Client Area Links */}
          <div className="pt-4 border-t border-[#E4DFD5] space-y-3">
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#111111] hover:text-[#B08D57]"
            >
              <User className="w-4 h-4 stroke-[1.25]" />
              <span>Client Account & Orders</span>
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between text-xs uppercase tracking-wider text-[#111111] hover:text-[#B08D57]"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 stroke-[1.25]" />
                <span>Saved Wishlist</span>
              </span>
              {wishlistCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#B08D57] text-[#FFFFFF] text-[10px] rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom Concierge Bar */}
        <div className="p-6 bg-[#FFFFFF] border-t border-[#E4DFD5] space-y-3">
          <a
            href={`https://wa.me/${brandConfig.whatsapp.number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              brandConfig.whatsapp.prefilledMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#2B2E26] text-[#F7F4EE] text-xs uppercase tracking-[0.15em] hover:bg-[#111111] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Stylist</span>
          </a>

          <p className="text-[11px] text-center text-[#8A857C]">
            {brandConfig.contact.phone} • {brandConfig.contact.hours}
          </p>
        </div>
      </div>
    </div>
  );
}
