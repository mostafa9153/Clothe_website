"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Clock, Sparkles } from "lucide-react";
import { predictiveSearchAction } from "@/app/actions/catalog";
import { Product, Category } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";


interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_SEARCHES = [
  "Dubai Nida Burkha",
  "Medina Silk Hijab",
  "Saudi 3-Layer Niqab",
  "Festive Eid Panjabi",
  "Kabli Set",
  "Prayer Dress",
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const [matchingCategories, setMatchingCategories] = React.useState<Category[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("maison_aure_recent_searches");
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
      setMatchingCategories([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Debounced search (250ms) hitting Server Action
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setMatchingCategories([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await predictiveSearchAction(query.trim());
        setResults(res.products);
        setMatchingCategories(res.categories);
      } catch (err) {
        console.error("Predictive search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);


  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("maison_aure_recent_searches", JSON.stringify(updated));
    } catch {}
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query);
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectRecentOrTrending = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("maison_aure_recent_searches");
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-md flex flex-col items-center justify-start pt-16 md:pt-24 px-4 sm:px-6">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-4xl bg-[#F7F4EE] border border-[#E4DFD5] shadow-2xl p-6 md:p-10 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-[#8A857C] hover:text-[#111111] transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5 stroke-[1.25]" />
        </button>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-[#111111] pb-3 mb-8">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-[#8A857C] stroke-[1.25]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, textiles, silhouettes (e.g. Silk, Cashmere, Coat)..."
              className="w-full bg-transparent text-lg md:text-xl font-heading placeholder:font-sans placeholder:text-[#8A857C] text-[#111111] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs uppercase tracking-wider text-[#8A857C] hover:text-[#111111]"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Live Search Results */}
        {query.trim().length > 0 ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E4DFD5] text-xs uppercase tracking-wider text-[#8A857C]">
              <span>
                {isSearching ? "Searching the Atelier..." : `Search Results (${results.length})`}
              </span>
              {results.length > 0 && (
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => {
                    saveRecentSearch(query);
                    onClose();
                  }}
                  className="hover:text-[#111111] inline-flex items-center gap-1 font-medium"
                >
                  <span>View all results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* Matching Categories Pills */}
            {matchingCategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C] mr-1">
                  Matching Departments:
                </span>
                {matchingCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => {
                      saveRecentSearch(query);
                      onClose();
                    }}
                    className="px-3 py-1 bg-white border border-[#E4DFD5] hover:border-[#B08D57] hover:text-[#B08D57] text-xs text-[#111111] transition-colors flex items-center gap-1"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3 h-3 text-[#8A857C]" />
                  </Link>
                ))}
              </div>
            )}

            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-6">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      saveRecentSearch(query);
                      onClose();
                    }}
                    className="group flex flex-col"
                  >

                    <div className="relative aspect-[3/4] bg-[#E4DFD5]/40 overflow-hidden mb-2">
                      <Image
                        src={product.images[0]?.url || ""}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-xs font-serif text-[#111111] group-hover:text-[#B08D57] line-clamp-1">
                      {product.name}
                    </span>
                    <span className="text-[11px] text-[#8A857C] tabular-nums mt-0.5">
                      {formatPrice(product.sale_price ?? product.base_price)}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-[#8A857C]">
                <p className="text-sm">No atelier pieces found matching &ldquo;{query}&rdquo;.</p>
                <p className="text-xs mt-1">Try exploring &ldquo;Silk&rdquo;, &ldquo;Cashmere&rdquo;, or &ldquo;Trousers&rdquo;.</p>
              </div>
            )}
          </div>
        ) : (
          /* Recent & Trending Searches */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Recent Searches */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD5] mb-4">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#8A857C] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Recent Searches
                </span>
                {recentSearches.length > 0 && (
                  <button
                    onClick={clearRecentSearches}
                    className="text-[10px] uppercase tracking-wider text-[#8A857C] hover:text-[#111111]"
                  >
                    Clear All
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <ul className="space-y-2">
                  {recentSearches.map((term, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => handleSelectRecentOrTrending(term)}
                        className="text-sm text-[#111111] hover:text-[#B08D57] transition-colors flex items-center justify-between w-full text-left"
                      >
                        <span>{term}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8A857C]" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#8A857C]">No recent searches yet.</p>
              )}
            </div>

            {/* Trending Curations */}
            <div>
              <div className="pb-3 border-b border-[#E4DFD5] mb-4">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#8A857C] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" /> Trending in the Atelier
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((trend, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectRecentOrTrending(trend)}
                    className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E4DFD5] text-xs text-[#111111] hover:border-[#111111] hover:text-[#B08D57] transition-colors"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#E4DFD5] flex items-center justify-between text-[11px] text-[#8A857C]">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#E4DFD5] text-[#111111] text-[10px]">Esc</kbd> to close</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#E4DFD5] text-[#111111] text-[10px]">Enter</kbd> to see full catalog view</span>
        </div>
      </div>
    </div>
  );
}
