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

  const [isMoreOpen, setIsMoreOpen] = React.useState(false);

  // Close menus on route change
  React.useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileDrawerOpen(false);
    setIsMoreOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  // Islamic Wear Navigation hierarchy (max 6 visible on desktop, remainder in More dropdown)
  const navItems = [
    { label: "Burkha", href: "/category/burkha", hasMega: true },
    { label: "Hijab", href: "/category/hijab", hasMega: true },
    { label: "Niqab", href: "/category/niqab", hasMega: false },
    { label: "Panjabi", href: "/category/panjabi", hasMega: true },
    { label: "New In", href: "/new-in", hasMega: false },
    { label: "Collections", href: "/collections", hasMega: false },
    { label: "Abaya & Jilbab", href: "/category/abaya", hasMega: false },
    { label: "Prayer Wear", href: "/category/prayer-wear", hasMega: false },
    { label: "Accessories", href: "/category/accessories", hasMega: false },
    { label: "Sets & Combos", href: "/category/sets-combos", hasMega: false },
    { label: "Lookbook", href: "/lookbook", hasMega: false },
    { label: "Journal", href: "/journal", hasMega: false },
    { label: "About", href: "/about", hasMega: false },
  ];

  const visibleNav = navItems.slice(0, 6);
  const overflowNav = navItems.slice(6);

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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          {/* Cell 1: Mobile Hamburger (<1180px) OR Left Desktop Nav (>=1180px) */}
          <div className="flex items-center min-w-0 overflow-hidden" id="header-nav-container">
            {/* Hamburger Button below 1180px */}
            <div className="flex min-[1180px]:hidden items-center">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="p-1.5 -ml-1 text-[#111111] hover:text-[#B08D57] transition-colors"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5 stroke-[1.25]" />
              </button>
            </div>

            {/* Desktop Priority-Plus Navigation (>=1180px) */}
            <nav
              className="hidden min-[1180px]:flex items-center gap-5 xl:gap-7 text-xs uppercase tracking-[0.18em] font-medium text-[#111111] min-w-0 overflow-hidden whitespace-nowrap"
              aria-label="Primary navigation"
            >
              {visibleNav.map((item) => (
                <div
                  key={item.href}
                  onMouseEnter={() => item.hasMega && setIsMegaMenuOpen(true)}
                  className="py-1 cursor-pointer hover:text-[#B08D57] transition-colors shrink-0"
                >
                  <Link href={item.href}>{item.label}</Link>
                </div>
              ))}

              {overflowNav.length > 0 && (
                <div
                  className="relative py-1 shrink-0"
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className="flex items-center gap-1 hover:text-[#B08D57] transition-colors focus:outline-hidden"
                    aria-expanded={isMoreOpen}
                    aria-label="More navigation items"
                  >
                    <span>More</span>
                    <span className="text-[10px]">▾</span>
                  </button>

                  {isMoreOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-[#FFFFFF] border border-[#E4DFD5] shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1">
                      {overflowNav.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMoreOpen(false)}
                          className="block px-4 py-2.5 text-xs uppercase tracking-wider text-[#111111] hover:bg-[#F7F4EE] hover:text-[#B08D57] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>

          {/* Cell 2: Centered Logo (Strictly in Center Grid Column, NEVER absolute) */}
          <div className="col-start-2 justify-self-center text-center px-2 sm:px-4 shrink-0 whitespace-nowrap" id="header-logo-container">
            <Link
              href="/"
              className="font-heading font-normal uppercase text-[#111111] hover:opacity-90 transition-opacity inline-block max-w-[280px] sm:max-w-[360px] md:max-w-[450px] truncate"
              style={{
                fontSize: "clamp(1.125rem, 1.8vw, 1.625rem)",
                letterSpacing: "clamp(0.12em, 0.2vw, 0.22em)",
              }}
              aria-label={brandConfig.name}
            >
              {brandConfig.logoText}
            </Link>
          </div>

          {/* Cell 3: Right Action Icons (Justify End) */}
          <div className="col-start-3 justify-self-end flex items-center gap-3 sm:gap-5 text-[#111111] shrink-0" id="header-icons-container">
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
