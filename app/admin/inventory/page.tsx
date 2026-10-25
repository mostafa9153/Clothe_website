"use client";

import * as React from "react";
import Link from "next/link";
import { Download, Upload, Bell, Check, Save, AlertTriangle, RefreshCw } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_STOCK_NOTIFICATIONS } from "@/lib/data/mock-db";
import { ProductVariant } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminInventoryPage() {
  const [products, setProducts] = React.useState(MOCK_PRODUCTS);
  const [stockChanges, setStockChanges] = React.useState<Record<string, number>>({});
  const [saving, setSaving] = React.useState(false);
  const [notifiedCount, setNotifiedCount] = React.useState(0);

  // Flatten all variants with parent product info
  const allVariants = products.flatMap((p) =>
    p.variants.map((v) => ({
      ...v,
      productName: p.name,
      productSlug: p.slug,
      productId: p.id,
    }))
  );

  const handleStockChange = (variantId: string, newStock: number) => {
    setStockChanges((prev) => ({ ...prev, [variantId]: newStock }));
  };

  const handleSaveAll = () => {
    setSaving(true);
    for (const [vId, newStock] of Object.entries(stockChanges)) {
      for (const p of products) {
        const variant = p.variants.find((v) => v.id === vId);
        if (variant) {
          variant.stock = newStock;
          p.total_stock = p.variants.reduce((acc, v) => acc + v.stock, 0);
        }
      }
    }
    setStockChanges({});
    setSaving(false);
    toast.success("Variant stock inventory updated successfully.");
  };

  const handleNotifySubscribers = () => {
    const count = MOCK_STOCK_NOTIFICATIONS.length + 3;
    setNotifiedCount(count);
    toast.success(`Dispatched back-in-stock VIP notices to ${count} registered waitlist patrons.`);
  };

  const handleExportCSV = () => {
    const headers = "SKU,Product Name,Color,Size,Current Stock\n";
    const rows = allVariants
      .map((v) => `"${v.sku}","${v.productName}","${v.color}","${v.size}",${stockChanges[v.id] ?? v.stock}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `maison-aure-inventory-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inventory stock export CSV generated.");
  };

  const hasUnsaved = Object.keys(stockChanges).length > 0;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Atelier Logistics
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Variant-Level Stock & Allocation ({allVariants.length} SKUs)
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Stock CSV</span>
          </Button>

          <Button
            onClick={handleNotifySubscribers}
            size="sm"
            variant="secondary"
            className="text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Notify Waitlist Patrons</span>
          </Button>

          {hasUnsaved && (
            <Button
              onClick={handleSaveAll}
              disabled={saving}
              size="sm"
              className="text-xs uppercase tracking-wider flex items-center gap-1.5 bg-[#B08D57] hover:bg-[#B08D57]/90 text-white"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save ({Object.keys(stockChanges).length}) Changes</span>
            </Button>
          )}
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Threshold Policy: Any garment variant with <strong>&le; 2 units</strong> triggers a &ldquo;Low Stock&rdquo; storefront warning chip.
          </span>
        </div>
        <span className="font-mono text-[11px] font-medium text-amber-800">
          {allVariants.filter((v) => (stockChanges[v.id] ?? v.stock) <= 2).length} SKUs at or below threshold
        </span>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#F7F4EE]/60 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="p-4 font-medium">SKU Reference</th>
                <th className="p-4 font-medium">Piece Name</th>
                <th className="p-4 font-medium">Color</th>
                <th className="p-4 font-medium">Size</th>
                <th className="p-4 font-medium">Current Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Inline Stock Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {allVariants.map((v) => {
                const currentVal = stockChanges[v.id] !== undefined ? stockChanges[v.id] : v.stock;
                const isModified = stockChanges[v.id] !== undefined;

                return (
                  <tr key={v.id} className={`hover:bg-[#F7F4EE]/40 transition-colors ${isModified ? "bg-amber-50/40" : ""}`}>
                    <td className="p-4 font-mono font-medium text-[#111111]">{v.sku}</td>
                    <td className="p-4">
                      <Link
                        href={`/product/${v.productSlug}`}
                        target="_blank"
                        className="font-serif text-[#111111] hover:text-[#B08D57] transition-colors"
                      >
                        {v.productName}
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: v.color_hex }} />
                        <span>{v.color}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-[#111111]">{v.size}</td>
                    <td className="p-4 font-mono font-medium tabular-nums">
                      {currentVal} units
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-medium border ${
                        currentVal === 0
                          ? "bg-red-50 text-red-800 border-red-200"
                          : currentVal <= 2
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}>
                        {currentVal === 0 ? "Sold Out" : currentVal <= 2 ? "Low Reserve" : "In Stock"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <input
                          type="number"
                          value={currentVal}
                          onChange={(e) => handleStockChange(v.id, Number(e.target.value))}
                          className={`w-20 p-1.5 border text-xs font-mono text-center focus:outline-none ${
                            isModified ? "border-amber-500 bg-amber-50 font-bold" : "border-[#E4DFD5] bg-[#F7F4EE]"
                          }`}
                          min={0}
                        />
                        {isModified && (
                          <span className="text-[10px] text-amber-700 font-medium uppercase">
                            Unsaved
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
