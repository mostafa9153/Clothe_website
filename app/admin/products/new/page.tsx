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
import { ArrowLeft, Upload, Trash2, Plus, Sparkles, RefreshCw, Eye } from "lucide-react";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();

  // Basic Details
  const [name, setName] = React.useState("The Cashmere Trench Robe");
  const [slug, setSlug] = React.useState("the-cashmere-trench-robe");
  const [shortDesc, setShortDesc] = React.useState("Hand-belted unlined robe coat in pure Mongolian cashmere.");
  const [description, setDescription] = React.useState("An effortless statement in absolute quiet poise. Crafted from 480 GSM double-faced cashmere with hand-finished edges and sustainable horn buttons.");
  const [fabric, setFabric] = React.useState("100% Grade A Mongolian Cashmere (480 GSM).");
  const [care, setCare] = React.useState("Specialist dry clean only. Store on cedar garment hanger.");
  const [fitNotes, setFitNotes] = React.useState("Statuesque, fluid cut. Fits true to size.");
  const [categoryId, setCategoryId] = React.useState("cat-outerwear");
  const [tags, setTags] = React.useState("outerwear, cashmere, coat, winter");

  // Pricing & Tax
  const [basePrice, setBasePrice] = React.useState<number>(45000);
  const [salePrice, setSalePrice] = React.useState<number | null>(39500);
  const [gstRate, setGstRate] = React.useState<number>(12);

  // Images with WebP Compression simulation metrics
  const [images, setImages] = React.useState<Array<ProductImage & { originalSize?: string; compressedSize?: string }>>([
    {
      id: "img-new-1",
      product_id: "prod-new",
      url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      alt: "Front view in Camel",
      color: "Camel",
      sort_order: 1,
      originalSize: "2.4 MB (JPEG)",
      compressedSize: "284 KB (WebP)",
    },
    {
      id: "img-new-2",
      product_id: "prod-new",
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85",
      alt: "Side profile detail",
      color: "Camel",
      sort_order: 2,
      originalSize: "3.1 MB (PNG)",
      compressedSize: "310 KB (WebP)",
    },
  ]);

  // Variant Matrix Generator
  const [sizes, setSizes] = React.useState<string[]>(["XS", "S", "M", "L"]);
  const [colors, setColors] = React.useState<Array<{ name: string; hex: string }>>([
    { name: "Camel", hex: "#C19A6B" },
    { name: "Obsidian", hex: "#111111" },
  ]);

  const [variants, setVariants] = React.useState<ProductVariant[]>([
    { id: "v-new-1", product_id: "prod-new", sku: "CTR-CAM-XS", size: "XS", color: "Camel", color_hex: "#C19A6B", stock: 3, price_override: null },
    { id: "v-new-2", product_id: "prod-new", sku: "CTR-CAM-S", size: "S", color: "Camel", color_hex: "#C19A6B", stock: 5, price_override: null },
    { id: "v-new-3", product_id: "prod-new", sku: "CTR-CAM-M", size: "M", color: "Camel", color_hex: "#C19A6B", stock: 4, price_override: null },
    { id: "v-new-4", product_id: "prod-new", sku: "CTR-CAM-L", size: "L", color: "Camel", color_hex: "#C19A6B", stock: 2, price_override: null },
  ]);

  const handleGenerateMatrix = () => {
    const generated: ProductVariant[] = [];
    let idx = 1;
    for (const c of colors) {
      for (const s of sizes) {
        const sku = `MA-${slug.slice(0, 3).toUpperCase()}-${c.name.slice(0, 3).toUpperCase()}-${s}`;
        generated.push({
          id: `v-matrix-${idx++}`,
          product_id: "prod-new",
          sku,
          size: s,
          color: c.name,
          color_hex: c.hex,
          stock: 4,
          price_override: null,
        });
      }
    }
    setVariants(generated);
    toast.success(`Generated ${generated.length} variant combinations (${colors.length} colors × ${sizes.length} sizes).`);
  };

  const handleSimulateImageUpload = () => {
    const sampleUrls = [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
    ];
    const newImg = {
      id: `img-${Date.now()}`,
      product_id: "prod-new",
      url: sampleUrls[Math.floor(Math.random() * sampleUrls.length)],
      alt: "Atelier studio shot",
      color: colors[0]?.name || "Camel",
      sort_order: images.length + 1,
      originalSize: "2.8 MB (Original)",
      compressedSize: "295 KB (WebP 1600px)",
    };
    setImages((prev) => [...prev, newImg]);
    toast.success("Compressed and added luxury high-res image (WebP ≤300KB).");
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

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
      category_slug: category?.slug || "outerwear",
      category_name: category?.name || "Coats & Outerwear",
      is_active: true,
      is_featured: true,
      is_new: true,
      tags: tags.split(",").map((t) => t.trim()),
      seo_title: `${name} | Maison Auré`,
      seo_desc: shortDesc,
      created_at: new Date().toISOString(),
      variants,
      images,
      avg_rating: 5.0,
      reviews_count: 0,
      total_stock: totalStock,
    };

    createMockProduct(newProd);
    toast.success(`"${name}" commissioned and published to the live storefront!`);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div className="space-y-1">
          <Link
            href="/admin/products"
            className="text-xs text-[#8A857C] hover:text-[#111111] uppercase tracking-wider flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Commission New Atelier Piece
          </h1>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            form="product-form"
            className="text-xs uppercase tracking-wider py-3 px-6"
          >
            Publish to Storefront
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSaveProduct} className="space-y-8 text-xs">
        {/* Section 1: Basic Information */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
            1. Identity & Garment Description
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                Piece Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                }}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                Storefront Slug (URL) *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
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
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
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
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
              Editorial Short Summary
            </label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
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
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Fabric Composition</label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Care Protocol</label>
              <input
                type="text"
                value={care}
                onChange={(e) => setCare(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Fit & Tailoring Notes</label>
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
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Base Price (₹) *</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Privilege Sale Price (₹)</label>
              <input
                type="number"
                value={salePrice ?? ""}
                onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : null)}
                placeholder="Optional sale price"
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">GST Rate (%) *</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
              >
                <option value={12}>12% (Standard Luxury Garments &gt; ₹1,000)</option>
                <option value={5}>5% (Essential Apparel &le; ₹1,000)</option>
                <option value={18}>18% (Leather Goods & Travel Accessories)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: High-Res Imagery with WebP Compression */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#E4DFD5]">
            <div>
              <h3 className="font-heading text-xl text-[#111111]">
                3. Editorial High-Res Imagery
              </h3>
              <p className="text-[#8A857C] text-[11px]">
                Images are automatically converted to optimized WebP format (≤1600px / ~300KB)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSimulateImageUpload}
              className="text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Simulate WebP Image Upload</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className="border border-[#E4DFD5] p-2 space-y-2 bg-[#F7F4EE]/40 relative group">
                <div className="relative aspect-[3/4] bg-[#E4DFD5] overflow-hidden">
                  <Image src={img.url} alt="" fill className="object-cover" />
                </div>
                <div className="text-[10px] space-y-0.5 text-[#8A857C]">
                  <p className="font-medium text-[#111111]">Color: {img.color}</p>
                  {img.originalSize && (
                    <p className="text-emerald-700">
                      {img.originalSize} &rarr; <strong>{img.compressedSize}</strong>
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="absolute top-3 right-3 p-1.5 bg-white text-red-600 border border-red-200"
                >
                  <Trash2 className="w-3 h-3" />
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
                Sizes × Colors &rarr; Generates inventory SKUs and variant stock
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleGenerateMatrix}
              className="text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Generate Matrix ({sizes.length * colors.length} Variants)</span>
            </Button>
          </div>

          {/* Variants Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#111111] bg-[#F7F4EE] text-[10px] uppercase tracking-wider text-[#8A857C]">
                  <th className="p-3">SKU</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Price Override (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DFD5]">
                {variants.map((v, idx) => (
                  <tr key={v.id || idx}>
                    <td className="p-3 font-mono font-medium text-[#111111]">{v.sku}</td>
                    <td className="p-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: v.color_hex }} />
                      <span>{v.color}</span>
                    </td>
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
                    <td className="p-3">
                      <input
                        type="number"
                        value={v.price_override ?? ""}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          setVariants((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, price_override: val } : item))
                          );
                        }}
                        placeholder="Inherit base"
                        className="w-28 bg-[#F7F4EE] border border-[#E4DFD5] p-1 text-xs focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#E4DFD5]">
          <Button asChild variant="outline" className="text-xs uppercase tracking-wider py-3 px-6">
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit" className="text-xs uppercase tracking-wider py-3 px-8">
            Publish Atelier Creation
          </Button>
        </div>
      </form>
    </div>
  );
}
