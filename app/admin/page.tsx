"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  Eye,
  Star,
  CheckCircle,
  Clock,
  Package,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import {
  MOCK_ORDERS,
  MOCK_PRODUCTS,
  MOCK_USERS,
  MOCK_REVIEWS,
  updateMockOrderStatus,
} from "@/lib/data/mock-db";
import { Order, OrderStatus } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = React.useState<"today" | "7d" | "30d" | "all">("30d");
  const [orders, setOrders] = React.useState<Order[]>(MOCK_ORDERS);

  // Compute KPIs
  const totalRevenue = orders.reduce((sum, o) => (o.status !== "cancelled" ? sum + o.total : sum), 0);
  const totalOrders = orders.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const newCustomers = MOCK_USERS.length + 8; // Patron register count
  const pendingReviews = MOCK_REVIEWS.filter((r) => !r.is_approved).length;

  // Low stock products (total_stock <= 5)
  const lowStockProducts = MOCK_PRODUCTS.filter(
    (p) => (p.total_stock ?? 0) > 0 && (p.total_stock ?? 0) <= 5
  ).slice(0, 5);

  // Top 5 Products by Reviews/Popularity
  const topProducts = [...MOCK_PRODUCTS]
    .sort((a, b) => (b.reviews_count ?? 0) - (a.reviews_count ?? 0))
    .slice(0, 5);

  // Status distribution for Chart
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    try {
      const updated = updateMockOrderStatus(orderId, newStatus, `Status updated to ${newStatus} via dashboard`);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      toast.success(`Order ${updated.order_number} marked as ${newStatus}`);
    } catch {
      toast.error("Could not update order status.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Date Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Executive Overview
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Atelier Executive Dashboard
          </h1>
        </div>

        {/* Date Filter Buttons */}
        <div className="flex items-center gap-1 bg-white border border-[#E4DFD5] p-1 text-xs">
          {(["today", "7d", "30d", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors ${
                dateRange === range
                  ? "bg-[#111111] text-white font-medium"
                  : "text-[#8A857C] hover:text-[#111111]"
              }`}
            >
              {range === "today" ? "Today" : range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Total Revenue */}
        <div className="bg-white border border-[#E4DFD5] p-6 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[#8A857C]">
            <span className="text-[11px] uppercase tracking-wider">Gross Commission Revenue</span>
            <DollarSign className="w-4 h-4 text-[#B08D57]" />
          </div>
          <div className="text-2xl font-serif font-medium text-[#111111] tabular-nums">
            {formatPrice(totalRevenue)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs previous 30d</span>
          </div>
        </div>

        {/* KPI 2: Total Commissions */}
        <div className="bg-white border border-[#E4DFD5] p-6 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[#8A857C]">
            <span className="text-[11px] uppercase tracking-wider">Total Commissions</span>
            <ShoppingBag className="w-4 h-4 text-[#B08D57]" />
          </div>
          <div className="text-2xl font-serif font-medium text-[#111111] tabular-nums">
            {totalOrders}
          </div>
          <div className="text-[11px] text-[#8A857C]">
            <span>{orders.filter((o) => o.status === "delivered").length} delivered • {orders.filter((o) => o.status === "shipped").length} en route</span>
          </div>
        </div>

        {/* KPI 3: Average Order Value (AOV) */}
        <div className="bg-white border border-[#E4DFD5] p-6 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[#8A857C]">
            <span className="text-[11px] uppercase tracking-wider">Average Order Value (AOV)</span>
            <TrendingUp className="w-4 h-4 text-[#B08D57]" />
          </div>
          <div className="text-2xl font-serif font-medium text-[#111111] tabular-nums">
            {formatPrice(aov)}
          </div>
          <div className="text-[11px] text-[#8A857C]">
            <span>Luxury benchmark: &gt;₹20,000</span>
          </div>
        </div>

        {/* KPI 4: Registered Patrons */}
        <div className="bg-white border border-[#E4DFD5] p-6 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[#8A857C]">
            <span className="text-[11px] uppercase tracking-wider">Patron Circle Registry</span>
            <Users className="w-4 h-4 text-[#B08D57]" />
          </div>
          <div className="text-2xl font-serif font-medium text-[#111111] tabular-nums">
            {newCustomers}
          </div>
          <div className="text-[11px] text-emerald-700">
            <span>3.8% Storefront Conversion Rate</span>
          </div>
        </div>
      </div>

      {/* Visual Charts & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Trend Visual (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex justify-between items-center pb-3 border-b border-[#E4DFD5]">
            <div>
              <h3 className="font-heading text-xl text-[#111111]">
                Revenue & Commission Trajectory
              </h3>
              <p className="text-xs text-[#8A857C]">Daily atelier revenue over recent trading cycle</p>
            </div>
            <span className="text-xs font-mono font-medium text-[#B08D57] bg-[#F7F4EE] px-3 py-1 border border-[#E4DFD5]">
              Avg Daily: ₹24,800
            </span>
          </div>

          {/* Quiet Luxury SVG Trend Line Chart */}
          <div className="h-64 w-full relative pt-4">
            <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B08D57" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#B08D57" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#E4DFD5" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#E4DFD5" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#E4DFD5" strokeDasharray="4 4" />
              <line x1="0" y1="190" x2="700" y2="190" stroke="#E4DFD5" />

              {/* Area Under Curve */}
              <path
                d="M 20,160 Q 120,130 200,90 T 360,110 T 520,50 T 680,30 L 680,190 L 20,190 Z"
                fill="url(#goldGradient)"
              />

              {/* Smooth Spline Curve */}
              <path
                d="M 20,160 Q 120,130 200,90 T 360,110 T 520,50 T 680,30"
                fill="none"
                stroke="#B08D57"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data Points */}
              {[
                { x: 20, y: 160, label: "₹18k" },
                { x: 200, y: 90, label: "₹32k" },
                { x: 360, y: 110, label: "₹28k" },
                { x: 520, y: 50, label: "₹58k" },
                { x: 680, y: 30, label: "₹72k" },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#111111" stroke="#B08D57" strokeWidth="2" />
                  <text x={pt.x} y={pt.y - 10} textAnchor="middle" fill="#111111" fontSize="10" fontFamily="monospace">
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>

            <div className="flex justify-between text-[11px] text-[#8A857C] pt-3 font-mono">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4 (Drop Solstice)</span>
            </div>
          </div>
        </div>

        {/* Orders by Status Donut Breakdown (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="pb-3 border-b border-[#E4DFD5]">
            <h3 className="font-heading text-xl text-[#111111]">
              Commissions by Status
            </h3>
            <p className="text-xs text-[#8A857C]">Distribution across fulfillment cycle</p>
          </div>

          <div className="space-y-3 text-xs">
            {Object.entries(statusCounts).map(([status, count]) => {
              const percent = Math.round((count / totalOrders) * 100);
              return (
                <div key={status} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="uppercase tracking-wider text-[11px] text-[#111111] font-medium">
                      {status}
                    </span>
                    <span className="text-[#8A857C] tabular-nums font-mono">
                      {count} orders ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#E4DFD5] h-1.5 overflow-hidden">
                    <div
                      className={`h-full ${
                        status === "delivered"
                          ? "bg-emerald-700"
                          : status === "shipped"
                          ? "bg-blue-700"
                          : status === "cancelled"
                          ? "bg-red-700"
                          : "bg-[#B08D57]"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E4DFD5] flex items-center justify-between text-xs">
            <span className="text-[#8A857C]">Pending Moderation:</span>
            <Link
              href="/admin/reviews"
              className="text-[#B08D57] hover:underline font-medium flex items-center gap-1"
            >
              <span>{pendingReviews} Client Reviews</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Low Stock Watchlist (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center pb-3 border-b border-[#E4DFD5]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="font-heading text-lg text-[#111111]">
                Low Stock Threshold Alerts (≤5 units)
              </h3>
            </div>
            <Link href="/admin/inventory" className="text-xs text-[#B08D57] hover:underline uppercase tracking-wider">
              Manage Inventory &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#E4DFD5]/60 text-xs">
            {lowStockProducts.map((prod) => (
              <div key={prod.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {prod.images[0]?.url && (
                    <div className="relative w-10 h-14 bg-[#E4DFD5] overflow-hidden">
                      <Image src={prod.images[0].url} alt="" fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-[#111111] line-clamp-1">{prod.name}</p>
                    <p className="text-[11px] text-[#8A857C]">{prod.category_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 font-mono text-[10px] uppercase tracking-wider font-medium">
                    Only {prod.total_stock} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Pieces by Customer Affinity (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center pb-3 border-b border-[#E4DFD5]">
            <h3 className="font-heading text-lg text-[#111111]">
              Top 5 Best-Selling Atelier Pieces
            </h3>
            <Link href="/admin/products" className="text-xs text-[#B08D57] hover:underline uppercase tracking-wider">
              All Products &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#E4DFD5]/60 text-xs">
            {topProducts.map((prod) => (
              <div key={prod.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {prod.images[0]?.url && (
                    <div className="relative w-10 h-14 bg-[#E4DFD5] overflow-hidden">
                      <Image src={prod.images[0].url} alt="" fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-[#111111] line-clamp-1">{prod.name}</p>
                    <p className="text-[11px] text-[#8A857C]">{prod.reviews_count} Verified Patron Reviews</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium text-[#111111] tabular-nums">
                    {formatPrice(prod.sale_price ?? prod.base_price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest 10 Commissions Table */}
      <div className="bg-white border border-[#E4DFD5] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex justify-between items-center pb-3 border-b border-[#E4DFD5]">
          <h3 className="font-heading text-xl text-[#111111]">
            Latest 10 Registered Commissions
          </h3>
          <Link href="/admin/orders" className="text-xs text-[#B08D57] hover:underline uppercase tracking-wider">
            View All Orders &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="py-3 font-medium">Order Number</th>
                <th className="py-3 font-medium">Patron / Client</th>
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Payment</th>
                <th className="py-3 font-medium">Total</th>
                <th className="py-3 font-medium">Current Status</th>
                <th className="py-3 font-medium text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {orders.slice(0, 10).map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-3 font-mono font-medium text-[#111111]">
                    <Link href={`/admin/orders/${ord.id}`} className="hover:text-[#B08D57] underline">
                      {ord.order_number}
                    </Link>
                  </td>
                  <td className="py-3 text-[#111111]">
                    {ord.customer_name || ord.shipping_address.name}
                  </td>
                  <td className="py-3 text-[#8A857C]">
                    {new Date(ord.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="py-3 text-[#8A857C] uppercase text-[11px]">
                    {ord.payment_method}
                  </td>
                  <td className="py-3 font-medium text-[#111111] tabular-nums">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium border ${
                      ord.status === "delivered"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : ord.status === "shipped"
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : ord.status === "cancelled"
                        ? "bg-red-50 text-red-800 border-red-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="bg-[#F7F4EE] border border-[#E4DFD5] text-[11px] p-1 uppercase focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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
