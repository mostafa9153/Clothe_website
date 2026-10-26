"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, createMockProduct } from "@/lib/data/mock-db";
import { Product, ProductVariant, ProductImage } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Upload, Trash2, Plus, Sparkles, RefreshCw, Eye, Link2, Check, Star } from "lucide-react";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Basic Details - Modest Atelier Defaults
  const [name, setName] = React.useState("The Royal Dubai Nida Kimono Burkha");
  const [slug, setSlug] = React.useState("royal-dubai-nida-kimono-burkha");
  const [shortDesc, setShortDesc] = React.useState("Bespoke front-open kimono burkha crafted from pure imported grade-A Dubai Nida.");
  const [description, setDescription] = React.useState("Sculpted for enduring modest grace. Tailored from weightless, 100% opaque Dubai Nida fabric with concealed front snap closures, wudhu-friendly folded French cuffs, and a matching Sheila hijab.");
  const [fabric, setFabric] = React.useState("100% Grade-A Imported Dubai Nida (180 GSM), breathable and anti-static.");
  const [care, setCare] = React.useState("Machine wash cold on gentle cycle with mild abaya wash. Steam press on reverse. Hang to dry in shade.");
  const [fitNotes, setFitNotes] = React.useState("Fluid statuesque drape. Select length according to your height (52 to 60 inches).");
  const [categoryId, setCategoryId] = React.useState("cat-burkha");
  const [tags, setTags] = React.useState("burkha, abaya, dubai-nida, modest, eid-collection");

  // Pricing & Tax
  const [basePrice, setBasePrice] = React.useState<number>(6800);
  const [salePrice, setSalePrice] = React.useState<number | null>(5950);
  const [gstRate, setGstRate] = React.useState<number>(12);

  // Images state
  const [images, setImages] = React.useState<Array<ProductImage & { originalSize?: string; compressedSize?: string }>>([
    {
      id: "img-init-1",
      product_id: "prod-new",
      url: "https://images.pexels.com/photos/13838843/pexels-photo-13838843.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Full-length obsidian black abaya presentation view",
      color: "Obsidian Black",
      sort_order: 1,
      originalSize: "2.4 MB (JPEG)",
      compressedSize: "284 KB (WebP)",
    },
    {
      id: "img-init-2",
      product_id: "prod-new",
      url: "https://images.pexels.com/photos/13791315/pexels-photo-13791315.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Close-up neckline and cuff drape",
      color: "Obsidian Black",
      sort_order: 2,
      originalSize: "3.1 MB (PNG)",
      compressedSize: "310 KB (WebP)",
    },
  ]);

  // URL input field
  const [urlInput, setUrlInput] = React.useState("");

  // Variant Matrix Generator
  const [sizes, setSizes] = React.useState<string[]>(["52", "54", "56", "58", "60"]);
  const [colors, setColors] = React.useState<Array<{ name: string; hex: string }>>([
    { name: "Obsidian Black", hex: "#111111" },
    { name: "Desert Sand", hex: "#C19A6B" },
  ]);

  const [variants, setVariants] = React.useState<ProductVariant[]>([
    { id: "v-new-1", product_id: "prod-new", sku: "AZ-BUR-BLK-52", size: "52", color: "Obsidian Black", color_hex: "#111111", stock: 6, price_override: null },
    { id: "v-new-2", product_id: "prod-new", sku: "AZ-BUR-BLK-54", size: "54", color: "Obsidian Black", color_hex: "#111111", stock: 10, price_override: null },
    { id: "v-new-3", product_id: "prod-new", sku: "AZ-BUR-BLK-56", size: "56", color: "Obsidian Black", color_hex: "#111111", stock: 8, price_override: null },
    { id: "v-new-4", product_id: "prod-new", sku: "AZ-BUR-BLK-58", size: "58", color: "Obsidian Black", color_hex: "#111111", stock: 4, price_override: null },
  ]);

  // Preset size shortcuts
  const applySizePreset = (preset: "burkha" | "panjabi" | "free") => {
    if (preset === "burkha") {
      setSizes(["52", "54", "56", "58", "60"]);
      toast.success("Applied Burkha / Abaya length sizes (52 to 60 inches)");
    } else if (preset === "panjabi") {
      setSizes(["38", "40", "42", "44", "46"]);
      toast.success("Applied Panjabi chest sizes (38 to 46 inches)");
    } else {
      setSizes(["Free Size"]);
      toast.success("Applied Free Size (Hijab / Niqab)");
    }
  };

  const handleGenerateMatrix = () => {
    const generated: ProductVariant[] = [];
    let idx = 1;
    for (const c of colors) {
      for (const s of sizes) {
        const sku = `AZ-${slug.slice(0, 3).toUpperCase()}-${c.name.slice(0, 3).toUpperCase()}-${s.replace(/\s+/g, "")}`;
        generated.push({
          id: `v-matrix-${idx++}`,
          product_id: "prod-new",
          sku,
          size: s,
          color: c.name,
          color_hex: c.hex,
          stock: 5,
          price_override: null,
        });
      }
    }
    setVariants(generated);
    toast.success(`Generated ${generated.length} variant combinations (${colors.length} colors × ${sizes.length} sizes).`);
  };

  // Real File Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (!base64Url) return;

        const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2) + " MB";
        const estimatedCompressed = (Math.min(file.size * 0.25, 320 * 1024) / 1024).toFixed(0) + " KB (WebP)";

        const newImg = {
          id: `img-up-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          product_id: "prod-new",
          url: base64Url,
          alt: file.name.replace(/\.[^/.]+$/, ""),
          color: colors[0]?.name || "Primary",
          sort_order: images.length + 1,
          originalSize: originalSizeMB,
          compressedSize: estimatedCompressed,
        };

        setImages((prev) => [...prev, newImg]);
        toast.success(`Uploaded and added: ${file.name}`);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Add by URL handler
  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a valid image URL");
      return;
    }

    const newImg = {
      id: `img-url-${Date.now()}`,
      product_id: "prod-new",
      url: urlInput.trim(),
      alt: "Atelier garment visual",
      color: colors[0]?.name || "Primary",
      sort_order: images.length + 1,
      originalSize: "Remote CDN",
      compressedSize: "Optimized",
    };

    setImages((prev) => [...prev, newImg]);
    setUrlInput("");
    toast.success("Image URL added to product gallery!");
  };

  const handleMakePrimary = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (!target) return prev;
      const rest = prev.filter((img) => img.id !== id);
      return [target, ...rest].map((img, idx) => ({ ...img, sort_order: idx + 1 }));
    });
    toast.success("Set as primary display image");
  };

  const handleRemoveImage = (id: string) => {
    if (images.length === 1) {
      toast.error("A product must have at least one image.");
      return;
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image removed");
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please add at least one product image before saving.");
      return;
    }

    const category = MOCK_CATEGORIES.find((c) => c.id === categoryId);
    const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);

    const newProd: Product = {
      id: `prod-gen-${Date.now()}`,
      name,
      slug,
      short_desc: shortDesc,
      description,
      fabric,
      care,
      fit_notes: fitNotes,
      base_price: Number(basePrice),
      sale_price: salePrice ? Number(salePrice) : null,
      gst_rate: Number(gstRate),
      category_id: categoryId,
      category_slug: category?.slug || "burkha",
      category_name: category?.name || "Burkha & Abaya",
      is_active: true,
      is_featured: true,
      is_new: true,
      tags: tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
      seo_title: `${name} | AZAD`,
      seo_desc: shortDesc,
      created_at: new Date().toISOString(),
      avg_rating: 5.0,
      reviews_count: 0,
      total_stock: totalStock,
      images,
      variants,
    };

    createMockProduct(newProd);
    toast.success(`"${name}" published successfully with ${images.length} images!`);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div className="space-y-1">
          <Link
            href="/admin/products"
            className="text-[11px] uppercase tracking-wider text-[#8A857C] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog Registry</span>
          </Link>
          <h2 className="font-heading text-2xl sm:text-3xl text-[#111111] font-normal">
            Commission New Modest Creation
          </h2>
          <p className="text-xs text-[#8A857C]">
            Craft luxury Islamic attire with real image upload, automated WebP compression, and bespoke variants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button
            type="submit"
            form="new-product-form"
            size="sm"
            className="text-xs uppercase tracking-wider bg-[#111111] text-white hover:bg-[#B08D57]"
          >
            Publish to Storefront
          </Button>
        </div>
      </div>

      <form id="new-product-form" onSubmit={handleSaveProduct} className="space-y-8 text-xs">
        {/* Section 1: General Details */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
            1. Garment Lineage & Editorial Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">
                Piece Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
                }}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">
                URL Identifier (Slug) *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs font-mono text-[#111111] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">
                Department / Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              >
                {MOCK_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">
              Editorial Short Summary *
            </label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              required
              className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">
              Full Narrative Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Fabric Composition</label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Care Protocol</label>
              <input
                type="text"
                value={care}
                onChange={(e) => setCare(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Fit & Tailoring Notes</label>
              <input
                type="text"
                value={fitNotes}
                onChange={(e) => setFitNotes(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Tax */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
            2. Commission Pricing & GST Rate
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Base Price (₹) *</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Privilege Sale Price (₹)</label>
              <input
                type="number"
                value={salePrice ?? ""}
                onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : null)}
                placeholder="Optional"
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Applicable GST Rate</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              >
                <option value={12}>12% (Standard Modest Garments &gt; ₹1,000)</option>
                <option value={5}>5% (Essential Attire &le; ₹1,000)</option>
                <option value={18}>18% (Accessories & Bags)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: High-Res Imagery with Real Upload & Link Add */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-[#E4DFD5] gap-3">
            <div>
              <h3 className="font-heading text-xl text-[#111111]">
                3. Editorial High-Res Imagery ({images.length} images)
              </h3>
              <p className="text-[#8A857C] text-[11px]">
                Upload high-resolution photography from your device, or paste external image links.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs uppercase tracking-wider flex items-center gap-1.5 border-[#111111] hover:bg-[#111111] hover:text-white"
              >
                <Upload className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Upload from Computer</span>
              </Button>
            </div>
          </div>

          {/* Direct URL input bar */}
          <div className="flex flex-col sm:flex-row gap-2 bg-[#F7F4EE] p-3 border border-[#E4DFD5]">
            <div className="relative flex-1">
              <Link2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A857C]" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Or paste an image web link (https://...)..."
                className="w-full bg-white border border-[#E4DFD5] pl-9 pr-3 py-2 text-xs text-[#111111] focus:outline-none"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddUrl}
              className="text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Image via Link</span>
            </Button>
          </div>

          {/* Grid of Images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`border p-2 space-y-2 bg-[#F7F4EE]/40 relative group transition-all ${
                  idx === 0 ? "border-[#B08D57] ring-1 ring-[#B08D57]" : "border-[#E4DFD5]"
                }`}
              >
                {/* 3:4 Aspect ratio container */}
                <div className="relative aspect-[3/4] bg-[#E4DFD5] overflow-hidden">
                  <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-2 left-2 bg-[#111111] text-[#B08D57] text-[9px] uppercase tracking-wider px-2 py-0.5 font-medium flex items-center gap-1 shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      Primary View
                    </span>
                  )}
                </div>

                <div className="text-[10px] space-y-1 text-[#8A857C]">
                  <p className="font-medium text-[#111111] truncate">{img.alt || "Product Photo"}</p>
                  {img.originalSize && (
                    <p className="text-emerald-700">
                      {img.originalSize} &rarr; <strong>{img.compressedSize}</strong>
                    </p>
                  )}
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleMakePrimary(img.id)}
                      className="text-[#B08D57] underline hover:text-[#111111] block pt-1 text-[10px]"
                    >
                      Make Primary Image
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  title="Remove image"
                  className="absolute top-3 right-3 p-1.5 bg-white text-red-600 border border-red-200 shadow-xs hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Variant Matrix Generator */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-[#E4DFD5] gap-2">
            <div>
              <h3 className="font-heading text-xl text-[#111111]">
                4. Variant Matrix Generator
              </h3>
              <p className="text-[#8A857C] text-[11px]">
                Generate modest sizes and shades with automated inventory tracking.
              </p>
            </div>

            {/* Quick Size Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#8A857C] uppercase tracking-wider mr-1">Presets:</span>
              <button
                type="button"
                onClick={() => applySizePreset("burkha")}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#F7F4EE] border border-[#E4DFD5] hover:border-[#111111]"
              >
                Burkha (52-60)
              </button>
              <button
                type="button"
                onClick={() => applySizePreset("panjabi")}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#F7F4EE] border border-[#E4DFD5] hover:border-[#111111]"
              >
                Panjabi (38-46)
              </button>
              <button
                type="button"
                onClick={() => applySizePreset("free")}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#F7F4EE] border border-[#E4DFD5] hover:border-[#111111]"
              >
                Free Size
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#111111] font-medium">Active Sizes: {sizes.join(", ")}</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleGenerateMatrix}
              className="text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Regenerate Variant Combinations</span>
            </Button>
          </div>

          {/* Variants Table */}
          <div className="overflow-x-auto border border-[#E4DFD5]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#111111] bg-[#F7F4EE] text-[10px] uppercase tracking-wider text-[#8A857C]">
                  <th className="p-3">SKU</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Price Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DFD5]">
                {variants.map((v, idx) => (
                  <tr key={v.id || idx}>
                    <td className="p-3 font-mono font-medium text-[#111111]">{v.sku}</td>
                    <td className="p-3">{v.color}</td>
                    <td className="p-3 font-medium text-[#111111]">{v.size}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={v.stock}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setVariants((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, stock: val } : item))
                          );
                        }}
                        className="w-20 bg-[#F7F4EE] border border-[#E4DFD5] p-1 font-mono text-xs focus:outline-none"
                      />
                    </td>
                    <td className="p-3 font-mono text-[#8A857C]">
                      {v.price_override ? formatPrice(v.price_override) : "Inherit Base"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#E4DFD5]">
          <Button asChild variant="outline" className="text-xs uppercase tracking-wider py-3 px-6">
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit" className="text-xs uppercase tracking-wider py-3 px-8 bg-[#111111] text-white hover:bg-[#B08D57]">
            Publish to Storefront
          </Button>
        </div>
      </form>
    </div>
  );
}
