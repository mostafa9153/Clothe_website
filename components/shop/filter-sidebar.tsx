"use client";

import * as React from "react";
import { X, Check } from "lucide-react";
import { Category } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";

export interface FilterState {
  category: string;
  size: string;
  color: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  onSale: boolean;
  isNew: boolean;
  sort: string;
}

interface FilterSidebarProps {
  categories: Category[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "One Size"];

const AVAILABLE_COLORS = [
  { name: "Camel", hex: "#C19A6B" },
  { name: "Champagne", hex: "#E8D8C8" },
  { name: "Ecru", hex: "#F5F2EB" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Noir", hex: "#111111" },
  { name: "Charcoal", hex: "#222222" },
  { name: "Olive", hex: "#2B2E26" },
  { name: "Tan", hex: "#8B4513" },
];

export function FilterSidebar({
  categories,
  filters,
  onChange,
  onReset,
  totalResults,
}: FilterSidebarProps) {
  const handleCategoryChange = (slug: string) => {
    onChange({
      ...filters,
      category: filters.category === slug ? "" : slug,
    });
  };

  const handleSizeChange = (size: string) => {
    onChange({
      ...filters,
      size: filters.size === size ? "" : size,
    });
  };

  const handleColorChange = (color: string) => {
    onChange({
      ...filters,
      color: filters.color === color ? "" : color,
    });
  };

  const hasActiveFilters =
    Boolean(filters.category) ||
    Boolean(filters.size) ||
    Boolean(filters.color) ||
    filters.inStock ||
    filters.onSale ||
    filters.isNew ||
    filters.minPrice > 0 ||
    filters.maxPrice < 70000;

  return (
    <aside className="w-full space-y-8 pr-2">
      {/* Top Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E4DFD5]">
        <h4 className="font-heading text-lg text-[#111111]">Refine Pieces</h4>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-[11px] uppercase tracking-wider text-[#B08D57] hover:text-[#111111] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* 1. Category Tree */}
      <div className="space-y-3">
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#111111] block">
          Department
        </span>
        <ul className="space-y-2 text-xs">
          <li>
            <button
              onClick={() => onChange({ ...filters, category: "" })}
              className={`w-full flex items-center justify-between text-left transition-colors ${
                !filters.category ? "text-[#111111] font-semibold" : "text-[#8A857C] hover:text-[#111111]"
              }`}
            >
              <span>All Silhouettes</span>
              {!filters.category && <Check className="w-3.5 h-3.5 text-[#B08D57]" />}
            </button>
          </li>
          {categories.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`w-full flex items-center justify-between text-left transition-colors ${
                    isSelected ? "text-[#111111] font-semibold" : "text-[#8A857C] hover:text-[#111111]"
                  }`}
                >
                  <span>{cat.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#B08D57]" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. Availability Toggles */}
      <div className="space-y-3 pt-2 border-t border-[#E4DFD5]">
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#111111] block">
          Provenance & Status
        </span>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-[#111111]">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
              className="accent-[#111111] w-3.5 h-3.5"
            />
            <span>In Atelier Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-[#111111]">
            <input
              type="checkbox"
              checked={filters.isNew}
              onChange={(e) => onChange({ ...filters, isNew: e.target.checked })}
              className="accent-[#111111] w-3.5 h-3.5"
            />
            <span>New In This Season</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-[#111111]">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(e) => onChange({ ...filters, onSale: e.target.checked })}
              className="accent-[#111111] w-3.5 h-3.5"
            />
            <span>Private Archive Sale</span>
          </label>
        </div>
      </div>

      {/* 3. Size Filter Chips */}
      <div className="space-y-3 pt-2 border-t border-[#E4DFD5]">
        <div className="flex justify-between items-center">
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#111111]">
            Size
          </span>
          {filters.size && (
            <button
              onClick={() => onChange({ ...filters, size: "" })}
              className="text-[10px] text-[#8A857C] hover:text-[#111111]"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.size === size;
            return (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all ${
                  isSelected
                    ? "bg-[#111111] text-[#F7F4EE] border-[#111111]"
                    : "bg-[#FFFFFF] text-[#111111] border-[#E4DFD5] hover:border-[#111111]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Color Swatches */}
      <div className="space-y-3 pt-2 border-t border-[#E4DFD5]">
        <div className="flex justify-between items-center">
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#111111]">
            Color Mineral
          </span>
          {filters.color && (
            <button
              onClick={() => onChange({ ...filters, color: "" })}
              className="text-[10px] text-[#8A857C] hover:text-[#111111]"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map((c) => {
            const isSelected = filters.color === c.name;
            return (
              <button
                key={c.name}
                onClick={() => handleColorChange(c.name)}
                title={c.name}
                className={`w-6 h-6 rounded-full border p-0.5 transition-all ${
                  isSelected ? "border-[#111111] ring-1 ring-[#111111] scale-110" : "border-[#E4DFD5]"
                }`}
              >
                <span
                  className="w-full h-full rounded-full block border border-black/10"
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Price Range Slider */}
      <div className="space-y-3 pt-2 border-t border-[#E4DFD5]">
        <div className="flex justify-between items-center">
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#111111]">
            Price Range
          </span>
          <span className="text-xs text-[#8A857C] tabular-nums">
            Up to {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="5000"
          max="70000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#111111] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#8A857C]">
          <span>{formatPrice(5000)}</span>
          <span>{formatPrice(70000)}</span>
        </div>
      </div>
    </aside>
  );
}
