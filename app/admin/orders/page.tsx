"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Filter, Eye, FileText, CheckCircle2, Clock, Truck, XCircle, ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { MOCK_ORDERS, updateMockOrderStatus, cancelMockOrder } from "@/lib/data/mock-db";
import { Order, OrderStatus } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>(MOCK_ORDERS);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [paymentFilter, setPaymentFilter] = React.useState<string>("all");

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchesSearch =
      o.order_number.toLowerCase().includes(q) ||
      (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
      (o.guest_email && o.guest_email.toLowerCase().includes(q)) ||
      o.shipping_address.phone.includes(q);

    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || o.payment_method === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleQuickStatusChange = (orderId: string, status: OrderStatus) => {
    try {
      const updated = updateMockOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      toast.success(`Commission ${updated.order_number} transitioned to ${status}.`);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleCancelRestock = (orderId: string) => {
    if (!confirm("Are you certain you wish to cancel this commission? Inventory will be restored automatically.")) return;
    try {
      const res = cancelMockOrder(orderId, "Administrative cancellation");
      if (res.success && res.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? res.order! : o)));
        toast.success(`Commission cancelled and inventory returned to stock.`);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Could not cancel order.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
            Fulfillment & Provenance
          </span>
          <h1 className="font-heading text-3xl font-normal text-[#111111]">
            Client Commissions & Orders ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E4DFD5] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ref, patron email, or phone..."
            className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 pl-8 text-xs text-[#111111] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#8A857C] absolute left-2.5 top-3 stroke-[1.25]" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none"
          >
            <option value="all">All Fulfillment Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing / Packed</option>
            <option value="shipped">Dispatched / Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none"
          >
            <option value="all">All Settlement Methods</option>
            <option value="razorpay">Online (Razorpay)</option>
            <option value="cod">Cash on Delivery (COD)</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E4DFD5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] bg-[#F7F4EE]/60 text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="p-4 font-medium">Commission Reference</th>
                <th className="p-4 font-medium">Patron</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Pieces</th>
                <th className="p-4 font-medium">Total (₹)</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Fulfillment Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  <td className="p-4 font-mono font-medium text-[#111111]">
                    <Link href={`/admin/orders/${ord.id}`} className="hover:text-[#B08D57] underline">
                      {ord.order_number}
                    </Link>
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-[#111111]">{ord.customer_name || ord.shipping_address.name}</p>
                    <p className="text-[11px] text-[#8A857C]">{ord.guest_email}</p>
                  </td>

                  <td className="p-4 text-[#8A857C]">
                    {new Date(ord.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>

                  <td className="p-4 text-[#8A857C]">
                    {ord.items.length} {ord.items.length === 1 ? "garment" : "garments"}
                  </td>

                  <td className="p-4 font-medium text-[#111111] tabular-nums">
                    {formatPrice(ord.total)}
                  </td>

                  <td className="p-4">
                    <span className="uppercase text-[10px] font-mono tracking-wider text-[#111111]">
                      {ord.payment_method}
                    </span>
                    <span className="block text-[10px] text-[#8A857C]">{ord.payment_status}</span>
                  </td>

                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleQuickStatusChange(ord.id, e.target.value as OrderStatus)}
                      className={`text-[10px] uppercase tracking-wider p-1 border font-medium focus:outline-none ${
                        ord.status === "delivered"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : ord.status === "shipped"
                          ? "bg-blue-50 text-blue-800 border-blue-300"
                          : ord.status === "cancelled"
                          ? "bg-red-50 text-red-800 border-red-300"
                          : "bg-amber-50 text-amber-800 border-amber-300"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing / Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-[#8A857C]">
                      <Button asChild size="sm" variant="outline" className="text-[10px] uppercase tracking-wider p-1.5 h-auto">
                        <Link href={`/admin/orders/${ord.id}`} title="View Detailed Provenance">
                          <Eye className="w-3 h-3 mr-1" />
                          <span>View</span>
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="text-[10px] uppercase tracking-wider p-1.5 h-auto">
                        <Link href={`/account/orders/${ord.id}/invoice`} target="_blank" title="Print Invoice">
                          <FileText className="w-3 h-3" />
                        </Link>
                      </Button>
                      {["pending", "confirmed"].includes(ord.status) && (
                        <button
                          onClick={() => handleCancelRestock(ord.id)}
                          className="text-red-600 hover:underline text-[10px] uppercase"
                        >
                          Cancel
                        </button>
                      )}
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
