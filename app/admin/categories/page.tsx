"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Edit2, Calendar, Sparkles } from "lucide-react";
import { MOCK_CATEGORIES, MOCK_COLLECTIONS } from "@/lib/data/mock-db";
import { Category, Collection } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminCategoriesCollectionsPage() {
  const [categories, setCategories] = React.useState<Category[]>(MOCK_CATEGORIES);
  const [collections, setCollections] = React.useState<Collection[]>(MOCK_COLLECTIONS);

  // New Category Form Modal State
  const [newCatName, setNewCatName] = React.useState("");
  const [newCatSlug, setNewCatSlug] = React.useState("");
  const [newCatImage, setNewCatImage] = React.useState("https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatSlug || newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      image: newCatImage,
      sort_order: categories.length + 1,
      is_active: true,
    };
    setCategories((prev) => [...prev, newCat]);
    setNewCatName("");
    setNewCatSlug("");
    toast.success(`Category "${newCat.name}" added to atelier taxonomy.`);
  };

  const handleToggleCollectionDrop = (id: string) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_drop: !c.is_drop } : c))
    );
    toast.success("Collection drop scheduling status toggled.");
  };

  return (
    <div className="space-y-10">
      <div className="pb-6 border-b border-[#E4DFD5]">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
          Taxonomy & Curations
        </span>
        <h1 className="font-heading text-3xl font-normal text-[#111111]">
          Departments & Curated Collections
        </h1>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[#E4DFD5]">
          <h2 className="font-heading text-xl text-[#111111]">
            Active Departments ({categories.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white border border-[#E4DFD5] p-4 flex gap-4 items-center shadow-xs">
              {cat.image && (
                <div className="relative w-16 h-20 bg-[#E4DFD5] shrink-0 overflow-hidden border border-[#E4DFD5]">
                  <Image src={cat.image} alt="" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-medium text-sm text-[#111111] truncate">{cat.name}</h4>
                <p className="font-mono text-[11px] text-[#8A857C]">/{cat.slug}</p>
                <span className="inline-block px-1.5 py-0.5 bg-green-50 text-green-800 text-[10px] uppercase font-mono mt-1 border border-green-200">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Category Form Inline */}
        <div className="bg-white border border-[#E4DFD5] p-6 shadow-xs space-y-4">
          <h4 className="font-medium text-xs uppercase tracking-wider text-[#111111]">
            + Add New Atelier Department
          </h4>
          <form onSubmit={handleAddCategory} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => {
                setNewCatName(e.target.value);
                setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
              }}
              placeholder="Department Name (e.g. Evening Knitwear)"
              required
              className="bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none"
            />
            <input
              type="text"
              value={newCatSlug}
              onChange={(e) => setNewCatSlug(e.target.value)}
              placeholder="Slug (e.g. evening-knitwear)"
              className="bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs font-mono focus:outline-none"
            />
            <Button type="submit" size="sm" className="text-xs uppercase tracking-wider py-2">
              Create Department
            </Button>
          </form>
        </div>
      </div>

      {/* Collections Section */}
      <div className="space-y-4 pt-6 border-t border-[#E4DFD5]">
        <div className="flex justify-between items-center pb-2 border-b border-[#E4DFD5]">
          <div>
            <h2 className="font-heading text-xl text-[#111111]">
              Curated Editorial Collections ({collections.length})
            </h2>
            <p className="text-xs text-[#8A857C]">Includes seasonal capsule launches and countdown drops</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col) => (
            <div key={col.id} className="bg-white border border-[#E4DFD5] p-6 space-y-3 shadow-xs">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-serif font-medium text-base text-[#111111]">{col.name}</h3>
                  <p className="font-mono text-xs text-[#8A857C]">/collections/{col.slug}</p>
                </div>
                <button
                  onClick={() => handleToggleCollectionDrop(col.id)}
                  className={`text-[10px] uppercase tracking-wider px-2.5 py-1 border font-medium ${
                    col.is_drop
                      ? "bg-[#B08D57] text-white border-[#B08D57]"
                      : "bg-[#F7F4EE] text-[#8A857C] border-[#E4DFD5]"
                  }`}
                >
                  {col.is_drop ? "Countdown Drop" : "Standard Collection"}
                </button>
              </div>

              <p className="text-xs text-[#8A857C] leading-relaxed line-clamp-2">{col.description}</p>

              {col.launch_at && (
                <div className="p-2.5 bg-[#F7F4EE] border border-[#E4DFD5] text-[11px] text-[#111111] flex items-center justify-between font-mono">
                  <span>Scheduled Launch Date:</span>
                  <strong className="text-[#B08D57]">{new Date(col.launch_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</strong>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
