"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { X, ShoppingBag, Eye, Tag, ChevronLeft, ChevronRight } from "lucide-react";

interface HotspotProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  x: number; // percentage from left
  y: number; // percentage from top
  category: string;
}

interface LookbookItem {
  id: string;
  title: string;
  season: string;
  description: string;
  image: string;
  aspect: "portrait" | "landscape" | "tall";
  tags: HotspotProduct[];
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "look-01",
    title: "Look I — The Architecture of Drape",
    season: "Winter Nocturne 2026",
    description: "Bias-cut 24-momme mulberry silk layered under floating horsehair cashmere tailoring.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall",
    tags: [
      {
        id: "prod-w-01",
        name: "Mulberry Silk Bias Slip Dress",
        slug: "mulberry-silk-bias-slip-dress",
        price: 18500,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
        x: 48,
        y: 42,
        category: "Dresses & Gowns",
      },
    ],
  },
  {
    id: "look-02",
    title: "Look II — Tactile Sovereignty",
    season: "Winter Nocturne 2026",
    description: "Double-faced 14-gauge Mongolian cashmere over relaxed pleated wool tailoring.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    tags: [
      {
        id: "prod-w-02",
        name: "Double-Breasted Cashmere Coat",
        slug: "double-breasted-cashmere-coat",
        price: 46000,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80",
        x: 52,
        y: 35,
        category: "Coats & Outerwear",
      },
      {
        id: "prod-w-03",
        name: "Pleated Wide-Leg Wool Trousers",
        slug: "pleated-wide-leg-wool-trousers",
        price: 14200,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
        x: 55,
        y: 78,
        category: "Trousers",
      },
    ],
  },
  {
    id: "look-03",
    title: "Look III — The Sartorial Silhouette",
    season: "Winter Nocturne 2026",
    description: "Sovereign unstructured blazer woven from heavy-twist Irish flax linen.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    tags: [
      {
        id: "prod-m-01",
        name: "Artisanal Band Collar Linen Shirt",
        slug: "artisanal-band-collar-linen-shirt",
        price: 9800,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80",
        x: 50,
        y: 40,
        category: "Menswear Atelier",
      },
    ],
  },
  {
    id: "look-04",
    title: "Look IV — Minimalist Monolith",
    season: "Winter Nocturne 2026",
    description: "Structured architectural trench silhouette with raw unbleached cotton lining.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall",
    tags: [
      {
        id: "prod-w-02",
        name: "Double-Breasted Cashmere Coat",
        slug: "double-breasted-cashmere-coat",
        price: 46000,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80",
        x: 45,
        y: 48,
        category: "Coats & Outerwear",
      },
    ],
  },
  {
    id: "look-05",
    title: "Look V — Leather & Lineage",
    season: "Winter Nocturne 2026",
    description: "Hand-stitched full grain Tuscan leather tote with solid brass brushed hardware.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
    aspect: "landscape",
    tags: [
      {
        id: "prod-acc-01",
        name: "Hand-Stitched Full Grain Leather Tote",
        slug: "hand-stitched-full-grain-leather-tote",
        price: 24500,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80",
        x: 52,
        y: 50,
        category: "Artisanal Leather",
      },
    ],
  },
  {
    id: "look-06",
    title: "Look VI — Quiet Restraint",
    season: "Winter Nocturne 2026",
    description: "Relaxed silk poplin pairing for tranquil evenings and private salons.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall",
    tags: [
      {
        id: "prod-w-01",
        name: "Mulberry Silk Bias Slip Dress",
        slug: "mulberry-silk-bias-slip-dress",
        price: 18500,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
        x: 50,
        y: 55,
        category: "Dresses & Gowns",
      },
    ],
  },
];

export default function LookbookPage() {
  const [selectedLook, setSelectedLook] = React.useState<LookbookItem | null>(null);
  const [activeTag, setActiveTag] = React.useState<HotspotProduct | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedLook) return;
    const currentIndex = LOOKBOOK_ITEMS.findIndex((item) => item.id === selectedLook.id);
    const prevIndex = (currentIndex - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length;
    setSelectedLook(LOOKBOOK_ITEMS[prevIndex]);
    setActiveTag(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedLook) return;
    const currentIndex = LOOKBOOK_ITEMS.findIndex((item) => item.id === selectedLook.id);
    const nextIndex = (currentIndex + 1) % LOOKBOOK_ITEMS.length;
    setSelectedLook(LOOKBOOK_ITEMS[nextIndex]);
    setActiveTag(null);
  };

  // Close lightbox on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedLook(null);
        setActiveTag(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="default">
        {/* Header */}
        <div className="mb-12 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Lookbook", href: "/lookbook" },
              { label: "Winter Nocturne 2026" },
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block mb-1">
                Editorial Visuals
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
                Lookbook — Winter Nocturne 2026
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#8A857C] max-w-md leading-relaxed">
              Click any look to expand the high-resolution editorial portrait and interact with tagged garment hotspots to discover provenance and shop directly.
            </p>
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {LOOKBOOK_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedLook(item);
                setActiveTag(null);
              }}
              className="group cursor-pointer bg-white border border-[#E4DFD5] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md"
            >
              <div
                className={`relative w-full overflow-hidden bg-[#E4DFD5]/30 ${
                  item.aspect === "tall"
                    ? "aspect-[3/4]"
                    : item.aspect === "portrait"
                    ? "aspect-[4/5]"
                    : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hotspot indicator badge */}
                <div className="absolute top-3 right-3 bg-[#111111]/80 backdrop-blur-xs text-[#F7F4EE] px-2.5 py-1 text-[10px] tracking-widest uppercase flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Tag className="w-3 h-3 text-[#B08D57]" />
                  <span>{item.tags.length} {item.tags.length === 1 ? "Piece" : "Pieces"}</span>
                </div>
              </div>

              <div className="p-5 space-y-1.5 bg-white">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#8A857C] block">
                  {item.season}
                </span>
                <h3 className="font-heading text-xl text-[#111111] group-hover:text-[#B08D57] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8A857C] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal with Hotspots */}
      {selectedLook && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in"
          onClick={() => {
            setSelectedLook(null);
            setActiveTag(null);
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedLook(null)}
            className="absolute top-6 right-6 p-2 text-[#F7F4EE] hover:text-[#B08D57] transition-colors z-50"
            aria-label="Close lookbook preview"
          >
            <X className="w-6 h-6 stroke-[1.25]" />
          </button>

          {/* Nav arrows */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 items-center justify-center"
            aria-label="Previous look"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 items-center justify-center"
            aria-label="Next look"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#F7F4EE] border border-[#E4DFD5] grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Column with Hotspots */}
            <div className="md:col-span-7 relative aspect-[3/4] md:aspect-auto md:h-[80vh] bg-[#111111] overflow-hidden">
              <Image
                src={selectedLook.image}
                alt={selectedLook.title}
                fill
                className="object-cover"
                priority
              />

              {/* Hotspot Markers */}
              {selectedLook.tags.map((tag) => {
                const isActive = activeTag?.id === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setActiveTag(isActive ? null : tag)}
                    style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-[#B08D57] text-[#111111] scale-125 shadow-lg ring-4 ring-white/50"
                        : "bg-white/90 text-[#111111] hover:scale-110 shadow-md ring-2 ring-black/20"
                    }`}
                    aria-label={`Inspect ${tag.name}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                  </button>
                );
              })}
            </div>

            {/* Sidebar Details Column */}
            <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white border-l border-[#E4DFD5]">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
                    {selectedLook.season}
                  </span>
                  <h2 className="font-heading text-3xl font-normal text-[#111111] pt-1">
                    {selectedLook.title}
                  </h2>
                  <p className="text-xs text-[#8A857C] pt-2 leading-relaxed">
                    {selectedLook.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4DFD5] space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111] block">
                    Featured Atelier Pieces ({selectedLook.tags.length})
                  </span>

                  <div className="space-y-3">
                    {selectedLook.tags.map((product) => {
                      const isSelected = activeTag?.id === product.id;
                      return (
                        <div
                          key={product.id}
                          onClick={() => setActiveTag(isSelected ? null : product)}
                          className={`p-3 border transition-colors cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? "border-[#B08D57] bg-[#F7F4EE]/50"
                              : "border-[#E4DFD5] hover:border-[#111111]"
                          }`}
                        >
                          <div className="relative w-14 h-16 bg-[#E4DFD5]/40 flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] uppercase tracking-wider text-[#8A857C] block truncate">
                              {product.category}
                            </span>
                            <h4 className="text-xs font-medium text-[#111111] truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs font-medium text-[#111111] pt-0.5">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Piece Action Box */}
                {activeTag && (
                  <div className="p-4 bg-[#F7F4EE] border border-[#B08D57]/40 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-medium">
                        Selected Piece
                      </span>
                      <span className="text-xs font-medium text-[#111111]">
                        {formatPrice(activeTag.price)}
                      </span>
                    </div>
                    <p className="text-xs font-heading text-lg text-[#111111]">
                      {activeTag.name}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Button asChild size="sm" variant="outline" className="text-xs">
                        <Link href={`/product/${activeTag.slug}`}>
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View Piece
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          addItem({
                            productId: activeTag.id,
                            variantId: `${activeTag.id}-var-default`,
                            name: activeTag.name,
                            slug: activeTag.slug,
                            price: activeTag.price,
                            size: "M",
                            color: "Natural",
                            image: activeTag.image,
                            qty: 1,
                            maxStock: 10,
                            gstRate: 12,
                          });
                        }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                )}
              </div>

                <div className="pt-6 border-t border-[#E4DFD5] text-[11px] text-[#8A857C] flex items-center justify-between">
                <span>Atelier Heritage Archive</span>
                <Link
                  href="/shop"
                  className="text-[#111111] hover:text-[#B08D57] underline uppercase tracking-wider text-[10px]"
                >
                  Browse Full Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
