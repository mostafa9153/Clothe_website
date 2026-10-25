"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import brandConfig from "@/config/brand.config";
import { MegaMenu } from "./mega-menu";
import { MobileDrawer } from "./mobile-drawer";
import { SearchOverlay } from "./search-overlay";
import { MiniCartDrawer } from "./mini-cart-drawer";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { MOCK_CATEGORIES, MOCK_COLLECTIONS } from "@/lib/data/mock-db";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const cartCount = useCartStore((state) => state.totalCount());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.count());

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut "/" or "Cmd+K" / "Ctrl+K" to open search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" && (e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "TEXTAREA") ||
        ((e.metaKey || e.ctrlKey) && e.key === "k")
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mega menu on route change
  React.useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E4DFD5] shadow-xs py-3"
            : isHome
            ? "bg-transparent py-4 text-[#111111]"
            : "bg-[#F7F4EE] border-b border-[#E4DFD5] py-4"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between relative">
          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="p-1.5 -ml-1 text-[#111111] hover:text-[#B08D57] transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>

          {/* Left Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-[#111111]">
            <div
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              className="py-1 cursor-pointer hover:text-[#B08D57] transition-colors"
            >
              <Link href="/shop">Women</Link>
            </div>
            <div
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              className="py-1 cursor-pointer hover:text-[#B08D57] transition-colors"
            >
              <Link href="/category/mens-shirts">Men</Link>
            </div>
            <Link
              href="/category/accessories"
              className="py-1 hover:text-[#B08D57] transition-colors"
            >
              Accessories
            </Link>
            <Link
              href="/new-in"
              className="py-1 hover:text-[#B08D57] transition-colors"
            >
              New In
            </Link>
            <Link
              href="/collections"
              className="py-1 hover:text-[#B08D57] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/lookbook"
              className="py-1 hover:text-[#B08D57] transition-colors"
            >
              Lookbook
            </Link>
            <Link
              href="/journal"
              className="py-1 hover:text-[#B08D57] transition-colors"
            >
              Journal
            </Link>
          </nav>

          {/* Centered Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link
              href="/"
              className="font-heading text-xl sm:text-2xl tracking-[0.22em] font-normal uppercase text-[#111111] hover:opacity-90 transition-opacity"
            >
              {brandConfig.logoText}
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5 text-[#111111]">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:text-[#B08D57] transition-colors flex items-center gap-1.5"
              aria-label="Search garments (Cmd+K)"
            >
              <Search className="w-4 h-4 stroke-[1.25]" />
              <span className="hidden xl:inline text-[10px] uppercase tracking-widest text-[#8A857C]">
                Search
              </span>
            </button>

            {/* Account Link */}
            <Link
              href="/account"
              className="p-1 hover:text-[#B08D57] transition-colors hidden sm:inline-flex"
              aria-label="Client account"
            >
              <User className="w-4 h-4 stroke-[1.25]" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-1 hover:text-[#B08D57] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 stroke-[1.25]" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-[#F7F4EE] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Bag / Mini-cart Trigger */}
            <button
              onClick={openCart}
              className="p-1 hover:text-[#B08D57] transition-colors relative flex items-center gap-1.5 cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.25]" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B08D57] text-[#FFFFFF] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans font-medium">
                  {cartCount}
                </span>
              )}
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-medium tabular-nums ml-0.5">
                Bag {mounted && cartCount > 0 ? `(${cartCount})` : ""}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Overlay */}
        <MegaMenu
          categories={MOCK_CATEGORIES}
          collections={MOCK_COLLECTIONS}
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      </header>

      {/* Global Overlays & Drawers */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        categories={MOCK_CATEGORIES}
        collections={MOCK_COLLECTIONS}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MiniCartDrawer />
    </>
  );
}
