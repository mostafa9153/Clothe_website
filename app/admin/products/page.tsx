"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, Edit, Trash2, ExternalLink, Copy, CheckCircle2, XCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { MOCK_PRODUCTS, deleteMockProduct, updateMockProduct } from "@/lib/data/mock-db";
import { Product } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category_slug === categoryFilter || p.category_id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Are you certain you wish to delete "${name}" from the atelier catalog?`)) return;
    deleteMockProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success(`"${name}" removed from catalog.`);
  };

  const handleToggleActive = (id: string, current: boolean) => {
    const updated = updateMockProduct(id, { is_active: !current });
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    toast.success(`Product "${updated.name}" is now ${updated.is_active ? "Active" : "Archived"}.`);
  };

  const handleToggleFeatured = (id: string, current: boolean) => {
    const updated = updateMockProduct(id, { is_featured: !current });
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    toast.success(`Product "${updated.name}" featured status updated.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Atelier Catalog
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Garment & Product Collection ({products.length})
          </h1>
        </div>

        <Button asChild className="text-xs uppercase tracking-wider py-3 flex items-center gap-1.5">
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4" />
            <span>Commission New Garment</span>
          </Link>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E4DFD5] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search piece by name or SKU..."
            className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 pl-8 text-xs text-[#111111] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#8A857C] absolute left-2.5 top-3 stroke-[1.25]" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none"
          >
            <option value="all">All Departments</option>
            <option value="dresses">Dresses & Gowns</option>
            <option value="outerwear">Coats & Outerwear</option>
            <option value="tops-shirts">Tops & Silk Blouses</option>
            <option value="mens-shirts">Men&apos;s Tailoring & Shirts</option>
            <option value="trousers">Trousers & Pants</option>
            <option value="accessories">Artisanal Accessories</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#F7F4EE]/50 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="p-4 font-medium">Garment</th>
                <th className="p-4 font-medium">Department</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Variants</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Featured</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  {/* Garment Image & Name */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {prod.images[0]?.url && (
                        <div className="relative w-12 h-16 bg-[#E4DFD5] overflow-hidden border border-[#E4DFD5] shrink-0">
                          <Image src={prod.images[0].url} alt="" fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/admin/products/${prod.id}`}
                          className="font-serif font-medium text-sm text-[#111111] hover:text-[#B08D57] block"
                        >
                          {prod.name}
                        </Link>
                        <span className="font-mono text-[10px] text-[#8A857C]">{prod.slug}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-[#8A857C]">{prod.category_name || "Maison Auré"}</td>

                  <td className="p-4 tabular-nums font-medium text-[#111111]">
                    {formatPrice(prod.sale_price ?? prod.base_price)}
                    {prod.sale_price && (
                      <span className="block text-[10px] text-[#8A857C] line-through">
                        {formatPrice(prod.base_price)}
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-[#8A857C]">
                    {prod.variants.length} sizes / colors
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-medium border ${
                      (prod.total_stock ?? 0) === 0
                        ? "bg-red-50 text-red-800 border-red-200"
                        : (prod.total_stock ?? 0) <= 2
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200"
                    }`}>
                      {(prod.total_stock ?? 0) === 0 ? "Sold Out" : `${prod.total_stock} units`}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(prod.id, prod.is_active)}
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border ${
                        prod.is_active
                          ? "bg-green-50 text-green-800 border-green-200"
                          : "bg-stone-100 text-stone-600 border-stone-300"
                      }`}
                    >
                      {prod.is_active ? "Active" : "Archived"}
                    </button>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFeatured(prod.id, prod.is_featured)}
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border ${
                        prod.is_featured
                          ? "bg-[#B08D57] text-white border-[#B08D57]"
                          : "bg-white text-stone-600 border-stone-200"
                      }`}
                    >
                      {prod.is_featured ? "Featured" : "Standard"}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-[#8A857C]">
                      <Link
                        href={`/product/${prod.slug}`}
                        target="_blank"
                        title="Live Storefront Preview"
                        className="p-1 hover:text-[#111111]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/products/${prod.id}`}
                        title="Edit Piece"
                        className="p-1 hover:text-[#111111]"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        title="Delete Piece"
                        className="p-1 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
