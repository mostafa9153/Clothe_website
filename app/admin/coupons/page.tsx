"use client";

import * as React from "react";
import { Plus, Tag, Trash2, CheckCircle2, XCircle, Sparkles, RefreshCw } from "lucide-react";
import { MOCK_COUPONS, createMockCoupon, deleteMockCoupon, updateMockCoupon } from "@/lib/data/mock-db";
import { Coupon } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = React.useState<Coupon[]>(MOCK_COUPONS);

  // New Coupon Form
  const [code, setCode] = React.useState("");
  const [type, setType] = React.useState<"percent" | "flat">("percent");
  const [value, setValue] = React.useState<number>(10);
  const [minOrder, setMinOrder] = React.useState<number>(3000);
  const [maxDiscount, setMaxDiscount] = React.useState<number | null>(2500);
  const [usageLimit, setUsageLimit] = React.useState<number | null>(100);

  const generateRandomCode = () => {
    const prefixes = ["LUXE", "ATELIER", "AURE", "SOLSTICE", "VIP"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(10 + Math.random() * 90);
    setCode(`${randomPrefix}${randomNum}`);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon: Coupon = {
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      min_order: Number(minOrder),
      max_discount: maxDiscount ? Number(maxDiscount) : null,
      usage_limit: usageLimit ? Number(usageLimit) : null,
      used_count: 0,
      starts_at: null,
      expires_at: null,
      is_active: true,
    };

    createMockCoupon(newCoupon);
    setCoupons([...MOCK_COUPONS]);
    setCode("");
    toast.success(`Privilege code ${newCoupon.code} created and live.`);
  };

  const handleToggleActive = (couponCode: string, current: boolean) => {
    const updated = updateMockCoupon(couponCode, { is_active: !current });
    setCoupons((prev) => prev.map((c) => (c.code === couponCode ? updated : c)));
    toast.success(`Coupon ${couponCode} is now ${updated.is_active ? "Active" : "Paused"}.`);
  };

  const handleDelete = (couponCode: string) => {
    if (!confirm(`Delete coupon ${couponCode}?`)) return;
    deleteMockCoupon(couponCode);
    setCoupons((prev) => prev.filter((c) => c.code !== couponCode));
    toast.success(`Coupon ${couponCode} deleted.`);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-[#E4DFD5]">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
          Promotional Engine
        </span>
        <h1 className="font-heading text-3xl font-normal text-[#111111]">
          Privilege Codes & Courtesy Offers ({coupons.length})
        </h1>
      </div>

      {/* Create Coupon Card */}
      <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[#E4DFD5]">
          <h3 className="font-heading text-xl text-[#111111]">
            Create New Privilege Courtesy
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateRandomCode}
            className="text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Generate Code</span>
          </Button>
        </div>

        <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. SOLSTICE15"
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs uppercase font-mono font-medium focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs focus:outline-none"
              >
                <option value="percent">Percentage Discount (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Value *</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                required
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Minimum Order (₹)</label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(Number(e.target.value))}
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs font-mono focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Max Discount Cap (₹)</label>
              <input
                type="number"
                value={maxDiscount ?? ""}
                onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : null)}
                placeholder="Optional ceiling"
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs font-mono focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Redemption Limit</label>
              <input
                type="number"
                value={usageLimit ?? ""}
                onChange={(e) => setUsageLimit(e.target.value ? Number(e.target.value) : null)}
                placeholder="Unlimited if empty"
                className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" size="sm" className="text-xs uppercase tracking-wider py-2.5 px-6">
              Create Privilege Code
            </Button>
          </div>
        </form>
      </div>

      {/* Coupons Table */}
      <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#F7F4EE]/60 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="p-4 font-medium">Coupon Code</th>
                <th className="p-4 font-medium">Discount Offer</th>
                <th className="p-4 font-medium">Threshold</th>
                <th className="p-4 font-medium">Max Cap</th>
                <th className="p-4 font-medium">Redemptions</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  <td className="p-4 font-mono font-medium text-[#111111] text-sm">{c.code}</td>
                  <td className="p-4 font-medium text-[#111111]">
                    {c.type === "percent" ? `${c.value}% Off` : `-${formatPrice(c.value)}`}
                  </td>
                  <td className="p-4 text-[#8A857C]">Min ₹{c.min_order.toLocaleString("en-IN")}</td>
                  <td className="p-4 text-[#8A857C]">
                    {c.max_discount ? `₹${c.max_discount.toLocaleString("en-IN")}` : "No ceiling"}
                  </td>
                  <td className="p-4 font-mono text-[#8A857C]">
                    {c.used_count} / {c.usage_limit ?? "∞"}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(c.code, c.is_active)}
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border ${
                        c.is_active
                          ? "bg-green-50 text-green-800 border-green-200"
                          : "bg-stone-100 text-stone-600 border-stone-200"
                      }`}
                    >
                      {c.is_active ? "Active" : "Paused"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(c.code)}
                      className="text-[#8A857C] hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
