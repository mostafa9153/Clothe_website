"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, updateMockProduct } from "@/lib/data/mock-db";
import { Product, ProductVariant, ProductImage } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ExternalLink, Save, Upload, Trash2, Eye, Plus, Link2, Star } from "lucide-react";
import { toast } from "sonner";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const prodId = params?.id as string;

  const initialProd = MOCK_PRODUCTS.find((p) => p.id === prodId) || MOCK_PRODUCTS[0];

  const [name, setName] = React.useState(initialProd.name);
  const [slug, setSlug] = React.useState(initialProd.slug);
  const [shortDesc, setShortDesc] = React.useState(initialProd.short_desc || "");
  const [description, setDescription] = React.useState(initialProd.description || "");
  const [fabric, setFabric] = React.useState(initialProd.fabric || "");
  const [care, setCare] = React.useState(initialProd.care || "");
  const [fitNotes, setFitNotes] = React.useState(initialProd.fit_notes || "");
  const [basePrice, setBasePrice] = React.useState(initialProd.base_price);
  const [salePrice, setSalePrice] = React.useState(initialProd.sale_price);
  const [gstRate, setGstRate] = React.useState(initialProd.gst_rate || 12);
  const [variants, setVariants] = React.useState<ProductVariant[]>(initialProd.variants);
  const [images, setImages] = React.useState<ProductImage[]>(initialProd.images || []);
  const [urlInput, setUrlInput] = React.useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (!base64Url) return;

        const newImg: ProductImage = {
          id: `img-edit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          product_id: initialProd.id,
          url: base64Url,
          alt: file.name.replace(/\.[^/.]+$/, ""),
          color: "Signature",
          sort_order: images.length + 1,
        };

        setImages((prev) => [...prev, newImg]);
        toast.success(`Uploaded: ${file.name}`);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a valid image web link");
      return;
    }

    const newImg: ProductImage = {
      id: `img-url-${Date.now()}`,
      product_id: initialProd.id,
      url: urlInput.trim(),
      alt: `${name} presentation view`,
      color: "Signature",
      sort_order: images.length + 1,
    };

    setImages((prev) => [...prev, newImg]);
    setUrlInput("");
    toast.success("Image URL added to piece gallery");
  };

  const handleMakePrimary = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (!target) return prev;
      const rest = prev.filter((img) => img.id !== id);
      return [target, ...rest].map((img, idx) => ({ ...img, sort_order: idx + 1 }));
    });
    toast.success("Set as primary display photo");
  };

  const handleRemoveImage = (id: string) => {
    if (images.length === 1) {
      toast.error("A product must keep at least one image.");
      return;
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image removed");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please provide at least one product image.");
      return;
    }

    const totalStock = variants.reduce((acc, v) => acc + v.stock, 0);
    updateMockProduct(initialProd.id, {
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
      variants,
      images,
      total_stock: totalStock,
    });
    toast.success(`Changes to "${name}" saved and live on storefront.`);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div className="space-y-1">
          <Link
            href="/admin/products"
            className="text-[11px] uppercase tracking-wider text-[#8A857C] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog Registry</span>
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-2xl sm:text-3xl text-[#111111] font-normal">
              Edit Piece: {initialProd.name}
            </h2>
            <span className="text-[10px] font-mono bg-[#E4DFD5]/50 px-2 py-0.5 border border-[#E4DFD5]">
              {initialProd.id}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            <Link href={`/product/${initialProd.slug}`} target="_blank">
              <Eye className="w-3.5 h-3.5 mr-1" />
              <span>View Live</span>
            </Link>
          </Button>
          <Button
            type="submit"
            form="edit-product-form"
            size="sm"
            className="text-xs uppercase tracking-wider bg-[#111111] text-white hover:bg-[#B08D57]"
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Save Modifications</span>
          </Button>
        </div>
      </div>

      <form id="edit-product-form" onSubmit={handleSave} className="space-y-8 text-xs">
        {/* General Details */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
            General Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Piece Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Base Price (₹) *</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Sale Price (₹)</label>
              <input
                type="number"
                value={salePrice ?? ""}
                onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : null)}
                placeholder="Optional"
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">GST Rate (%)</label>
              <input
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* High-Res Gallery Editor */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-[#E4DFD5] gap-3">
            <div>
              <h3 className="font-heading text-xl text-[#111111]">
                Product Imagery ({images.length} photos)
              </h3>
              <p className="text-[#8A857C] text-[11px]">
                Upload new photos from your device, or paste web image links.
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
                <span>Upload Images</span>
              </Button>
            </div>
          </div>

          {/* Add Image Link bar */}
          <div className="flex flex-col sm:flex-row gap-2 bg-[#F7F4EE] p-3 border border-[#E4DFD5]">
            <div className="relative flex-1">
              <Link2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A857C]" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Or paste an image link (https://...)..."
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
              <span>Add Link</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`border p-2 space-y-2 bg-[#F7F4EE]/40 relative group transition-all ${
                  idx === 0 ? "border-[#B08D57] ring-1 ring-[#B08D57]" : "border-[#E4DFD5]"
                }`}
              >
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

        {/* Variants Stock Table */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
            Variant Inventory Stock
          </h3>

          <div className="overflow-x-auto">
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

        <div className="flex justify-end gap-3 pt-4 border-t border-[#E4DFD5]">
          <Button asChild variant="outline" className="text-xs uppercase tracking-wider py-3 px-6">
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit" className="text-xs uppercase tracking-wider py-3 px-8 bg-[#111111] text-white hover:bg-[#B08D57]">
            Save Modifications
          </Button>
        </div>
      </form>
    </div>
  );
}
