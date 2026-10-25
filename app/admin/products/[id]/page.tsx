"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, updateMockProduct } from "@/lib/data/mock-db";
import { Product, ProductVariant } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ExternalLink, Save, Upload, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
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
            className="text-xs text-[#8A857C] hover:text-[#111111] uppercase tracking-wider flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Edit Piece: {name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            <Link href={`/product/${slug}`} target="_blank" className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Storefront</span>
            </Link>
          </Button>
          <Button type="submit" form="edit-product-form" size="sm" className="text-xs uppercase tracking-wider">
            Save Modifications
          </Button>
        </div>
      </div>

      <form id="edit-product-form" onSubmit={handleSave} className="space-y-8 text-xs">
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
            General Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Piece Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Slug *</label>
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
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Base Price (₹) *</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Sale Price (₹)</label>
              <input
                type="number"
                value={salePrice ?? ""}
                onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : null)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">GST Rate (%)</label>
              <input
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
            />
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
          <Button type="submit" className="text-xs uppercase tracking-wider py-3 px-8">
            Save Modifications
          </Button>
        </div>
      </form>
    </div>
  );
}
