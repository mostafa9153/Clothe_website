"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, Grid3X3, Grid2X2, LayoutGrid, X, ArrowRight } from "lucide-react";
import { Product, Category } from "@/types/database.types";
import { getMockProducts } from "@/lib/data/mock-db";
import { ProductCard } from "@/components/product/product-card";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { FilterSidebar, FilterState } from "./filter-sidebar";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";

interface CatalogViewProps {
  categories: Category[];
  initialCategory?: string;
  initialCollection?: string;
  initialSearch?: string;
  initialSale?: boolean;
  initialNew?: boolean;
}

export function CatalogView({
  categories,
  initialCategory = "",
  initialCollection = "",
  initialSearch = "",
  initialSale = false,
  initialNew = false,
}: CatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state synchronization
  const [filters, setFilters] = React.useState<FilterState>({
    category: searchParams.get("category") || initialCategory,
    size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 70000,
    inStock: searchParams.get("inStock") === "true",
    onSale: searchParams.get("onSale") === "true" || initialSale,
    isNew: searchParams.get("isNew") === "true" || initialNew,
    sort: searchParams.get("sort") || "featured",
  });

  const [page, setPage] = React.useState<number>(Number(searchParams.get("page")) || 1);
  const [gridCols, setGridCols] = React.useState<2 | 3 | 4>(3);
  const [paginationMode, setPaginationMode] = React.useState<"pages" | "load-more">("pages");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  // Sync to URL query
  const updateUrl = React.useCallback(
    (newFilters: FilterState, newPage: number) => {
      const params = new URLSearchParams();
      if (newFilters.category && !initialCategory) params.set("category", newFilters.category);
      if (newFilters.size) params.set("size", newFilters.size);
      if (newFilters.color) params.set("color", newFilters.color);
      if (newFilters.maxPrice < 70000) params.set("maxPrice", String(newFilters.maxPrice));
      if (newFilters.inStock) params.set("inStock", "true");
      if (newFilters.onSale && !initialSale) params.set("onSale", "true");
      if (newFilters.isNew && !initialNew) params.set("isNew", "true");
      if (newFilters.sort !== "featured") params.set("sort", newFilters.sort);
      if (newPage > 1) params.set("page", String(newPage));
      if (initialSearch) params.set("q", initialSearch);

      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, initialCategory, initialSale, initialNew, initialSearch]
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
    updateUrl(newFilters, 1);
  };

  const handleResetFilters = () => {
    const cleared: FilterState = {
      category: initialCategory,
      size: "",
      color: "",
      minPrice: 0,
      maxPrice: 70000,
      inStock: false,
      onSale: initialSale,
      isNew: initialNew,
      sort: "featured",
    };
    setFilters(cleared);
    setPage(1);
    updateUrl(cleared, 1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updated = { ...filters, sort: e.target.value };
    setFilters(updated);
    updateUrl(updated, page);
  };

  // Fetch / Filter products from mock DB
  const { products, total, totalPages } = React.useMemo(() => {
    const isLoadMore = paginationMode === "load-more";
    return getMockProducts({
      category: filters.category || undefined,
      collection: initialCollection || undefined,
      size: filters.size || undefined,
      color: filters.color || undefined,
      minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice < 70000 ? filters.maxPrice : undefined,
      inStock: filters.inStock || undefined,
      onSale: filters.onSale || undefined,
      isNew: filters.isNew || undefined,
      search: initialSearch || undefined,
      sort: filters.sort as any,
      page: isLoadMore ? 1 : page,
      limit: isLoadMore ? page * 12 : 12,
    });
  }, [filters, page, paginationMode, initialCollection, initialSearch]);


  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (filters.category && !initialCategory) {
    const c = categories.find((x) => x.slug === filters.category);
    activeChips.push({
      label: `Dept: ${c?.name || filters.category}`,
      onRemove: () => handleFilterChange({ ...filters, category: "" }),
    });
  }
  if (filters.size) {
    activeChips.push({
      label: `Size: ${filters.size}`,
      onRemove: () => handleFilterChange({ ...filters, size: "" }),
    });
  }
  if (filters.color) {
    activeChips.push({
      label: `Color: ${filters.color}`,
      onRemove: () => handleFilterChange({ ...filters, color: "" }),
    });
  }
  if (filters.inStock) {
    activeChips.push({
      label: "In Stock Only",
      onRemove: () => handleFilterChange({ ...filters, inStock: false }),
    });
  }
  if (filters.onSale && !initialSale) {
    activeChips.push({
      label: "Private Sale",
      onRemove: () => handleFilterChange({ ...filters, onSale: false }),
    });
  }
  if (filters.isNew && !initialNew) {
    activeChips.push({
      label: "New In",
      onRemove: () => handleFilterChange({ ...filters, isNew: false }),
    });
  }
  if (filters.maxPrice < 70000) {
    activeChips.push({
      label: `Under ₹${filters.maxPrice}`,
      onRemove: () => handleFilterChange({ ...filters, maxPrice: 70000 }),
    });
  }

  return (
    <div className="w-full">
      {/* Control Bar: Filters Button (mobile), Active Chips, Sort, Grid Switcher */}
      <div className="py-4 border-y border-[#E4DFD5] flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Drawer Trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 border border-[#E4DFD5] text-xs uppercase tracking-wider font-medium text-[#111111]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Refine ({activeChips.length})</span>
          </button>

          <span className="text-xs text-[#8A857C] uppercase tracking-wider">
            Showing <strong className="text-[#111111]">{products.length}</strong> of {total} Pieces
          </span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {/* Grid column switcher (desktop only) */}
          <div className="hidden md:flex items-center gap-1 border border-[#E4DFD5] p-0.5">
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 ${gridCols === 2 ? "bg-[#111111] text-white" : "text-[#8A857C] hover:text-[#111111]"}`}
              aria-label="2 columns per row"
            >
              <Grid2X2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 ${gridCols === 3 ? "bg-[#111111] text-white" : "text-[#8A857C] hover:text-[#111111]"}`}
              aria-label="3 columns per row"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 ${gridCols === 4 ? "bg-[#111111] text-white" : "text-[#8A857C] hover:text-[#111111]"}`}
              aria-label="4 columns per row"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="catalog-sort" className="text-[11px] uppercase tracking-wider text-[#8A857C] hidden sm:inline">
              Sort:
            </label>
            <select
              id="catalog-sort"
              value={filters.sort}
              onChange={handleSortChange}
              className="bg-transparent border border-[#E4DFD5] text-xs text-[#111111] px-3 py-1.5 focus:outline-none focus:border-[#111111] uppercase tracking-wider"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="best-selling">Client Bestselling</option>
              <option value="top-rated">Highest Reviewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8 animate-in fade-in">
          <span className="text-[11px] uppercase tracking-wider text-[#8A857C] mr-1">
            Active:
          </span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E4DFD5] text-xs text-[#111111]"
            >
              <span>{chip.label}</span>
              <button
                onClick={chip.onRemove}
                className="hover:text-red-600 transition-colors"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={handleResetFilters}
            className="text-[11px] uppercase tracking-wider text-[#B08D57] hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid & Desktop Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Desktop Sidebar (col-span-3) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar
            categories={categories}
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={total}
          />
        </div>

        {/* Product Grid Area (col-span-9 or 12) */}
        <div className="lg:col-span-9">
          {products.length > 0 ? (
            <>
              <div
                className={`grid grid-cols-2 ${
                  gridCols === 2
                    ? "md:grid-cols-2 gap-8"
                    : gridCols === 4
                    ? "md:grid-cols-3 xl:grid-cols-4 gap-5"
                    : "md:grid-cols-3 gap-6 lg:gap-8"
                }`}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>

              {/* Pagination controls with Numbered Pages & Load More support */}
              {total > 12 && (
                <div className="pt-16 pb-8 border-t border-[#E4DFD5] mt-16 space-y-6">
                  {/* Mode switch */}
                  <div className="flex items-center justify-between flex-wrap gap-4 text-xs">
                    <span className="text-[#8A857C]">
                      Showing <strong className="text-[#111111]">{products.length}</strong> of {total} pieces
                    </span>

                    <div className="inline-flex border border-[#E4DFD5] p-0.5 bg-[#FFFFFF]">
                      <button
                        onClick={() => {
                          setPaginationMode("pages");
                          setPage(1);
                        }}
                        className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                          paginationMode === "pages"
                            ? "bg-[#111111] text-white"
                            : "text-[#8A857C] hover:text-[#111111]"
                        }`}
                      >
                        Pages
                      </button>
                      <button
                        onClick={() => {
                          setPaginationMode("load-more");
                        }}
                        className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                          paginationMode === "load-more"
                            ? "bg-[#111111] text-white"
                            : "text-[#8A857C] hover:text-[#111111]"
                        }`}
                      >
                        Load More
                      </button>
                    </div>
                  </div>

                  {paginationMode === "pages" ? (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <span className="text-xs text-[#8A857C]">
                        Page {page} of {totalPages}
                      </span>
                      <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(p) => {
                          setPage(p);
                          updateUrl(filters, p);
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center pt-2">
                      {products.length < total ? (
                        <Button
                          onClick={() => {
                            const nextPage = page + 1;
                            setPage(nextPage);
                            updateUrl(filters, nextPage);
                          }}
                          variant="secondary"
                          className="px-8 py-3 text-xs uppercase tracking-[0.2em]"
                        >
                          Load More Pieces ({total - products.length} Remaining)
                        </Button>
                      ) : (
                        <p className="text-xs text-[#8A857C] italic">
                          ✦ All {total} atelier creations are displayed
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

            </>
          ) : (
            /* Empty State */
            <div className="py-20 text-center space-y-4 bg-white border border-[#E4DFD5] p-10">
              <h4 className="font-heading text-2xl text-[#111111]">
                No Atelier Pieces Match Your Filter Criteria
              </h4>
              <p className="text-xs text-[#8A857C] max-w-md mx-auto leading-relaxed">
                Try widening your price range, clearing active size chips, or selecting all departments to explore the full collection.
              </p>
              <div className="pt-4">
                <Button onClick={handleResetFilters} variant="primary">
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#F7F4EE] h-full shadow-2xl p-6 overflow-y-auto z-10 animate-in slide-in-from-left duration-200 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#E4DFD5] mb-6">
                <span className="font-heading text-xl text-[#111111]">Refine Pieces</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#8A857C] hover:text-[#111111]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 stroke-[1.25]" />
                </button>
              </div>

              <FilterSidebar
                categories={categories}
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                totalResults={total}
              />
            </div>

            <div className="pt-6 border-t border-[#E4DFD5] mt-6">
              <Button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full text-xs uppercase tracking-[0.2em]"
              >
                Apply Filters ({total} Pieces)
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Shared Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
