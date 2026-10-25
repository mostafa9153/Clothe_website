"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, Truck, ShieldCheck, Check, Clock, User, Phone, Mail, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { MOCK_ORDERS, updateMockOrderStatus, cancelMockOrder } from "@/lib/data/mock-db";
import { Order, OrderStatus } from "@/types/database.types";
import { sendOrderShippedEmail } from "@/lib/email";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const order = MOCK_ORDERS.find((o) => o.id === orderId || o.order_number === orderId) || MOCK_ORDERS[0];
  const [currentOrder, setCurrentOrder] = React.useState<Order>(order);

  // Fulfillment form
  const [status, setStatus] = React.useState<OrderStatus>(order.status);
  const [courier, setCourier] = React.useState(order.courier || "BlueDart Express");
  const [trackingNumber, setTrackingNumber] = React.useState(order.tracking_number || "");
  const [statusNote, setStatusNote] = React.useState("");

  const handleUpdateFulfillment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = updateMockOrderStatus(
        currentOrder.id,
        status,
        statusNote || `Fulfillment milestone: ${status}`,
        courier,
        trackingNumber
      );
      setCurrentOrder({ ...updated });

      // If status changed to shipped, dispatch shipped notice email
      if (status === "shipped" && trackingNumber) {
        sendOrderShippedEmail(
          updated.guest_email || "customer@demo.com",
          updated.order_number,
          courier,
          trackingNumber
        ).catch(() => {});
        toast.info(`Dispatched shipment notice email to ${updated.guest_email || "patron"}.`);
      }

      toast.success("Order status and tracking provenance updated.");
      setStatusNote("");
    } catch {
      toast.error("Could not update order status.");
    }
  };

  const handleCancel = () => {
    if (!confirm("Are you sure you wish to cancel this commission? Items will be restocked to the live inventory reserve.")) return;
    try {
      const res = cancelMockOrder(currentOrder.id, "Director cancellation from admin portal");
      if (res.success && res.order) {
        setCurrentOrder({ ...res.order });
        setStatus("cancelled");
        toast.success("Commission cancelled and items restocked.");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to cancel commission.");
    }
  };

  const handleMarkCodPaid = () => {
    currentOrder.payment_status = "paid";
    currentOrder.events.push({
      id: `ev-paid-${Date.now()}`,
      order_id: currentOrder.id,
      status: currentOrder.status,
      note: "Cash on Delivery payment collection reconciled with courier",
      created_at: new Date().toISOString(),
    });
    setCurrentOrder({ ...currentOrder });
    toast.success("COD payment collection recorded as PAID.");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5]">
        <div className="space-y-1">
          <Link
            href="/admin/orders"
            className="text-xs text-[#8A857C] hover:text-[#111111] uppercase tracking-wider flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Commissions</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-3xl font-normal text-[#111111]">
              Commission {currentOrder.order_number}
            </h1>
            <span className={`px-2.5 py-1 text-xs uppercase tracking-wider font-medium border ${
              currentOrder.status === "delivered"
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : currentOrder.status === "shipped"
                ? "bg-blue-50 text-blue-800 border-blue-300"
                : currentOrder.status === "cancelled"
                ? "bg-red-50 text-red-800 border-red-300"
                : "bg-amber-50 text-amber-800 border-amber-300"
            }`}>
              {currentOrder.status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="outline" size="sm" className="text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Link href={`/account/orders/${currentOrder.id}/invoice`} target="_blank">
              <FileText className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </Link>
          </Button>
          {["pending", "confirmed"].includes(currentOrder.status) && (
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
              className="text-xs uppercase tracking-wider text-red-700 hover:bg-red-50"
            >
              Cancel & Restock
            </Button>
          )}
        </div>
      </div>

      {/* Grid: Details & Fulfillment Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items & Timeline (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Items Table */}
          <div className="bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
            <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
              Commissioned Pieces ({currentOrder.items.length})
            </h3>
            <div className="divide-y divide-[#E4DFD5]/60">
              {currentOrder.items.map((it) => (
                <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {it.image && (
                      <div className="relative w-14 h-18 bg-[#E4DFD5] overflow-hidden border border-[#E4DFD5] shrink-0">
                        <Image src={it.image} alt="" fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-serif text-sm font-medium text-[#111111]">{it.name}</p>
                      <p className="text-[#8A857C]">Size: <strong>{it.size}</strong> • Color: <strong>{it.color}</strong> • Qty: <strong>{it.qty}</strong></p>
                      <p className="text-[11px] font-mono text-[#8A857C]">GST Rate: {it.gst_rate}%</p>
                    </div>
                  </div>
                  <span className="tabular-nums font-medium text-sm text-[#111111]">
                    {formatPrice(it.unit_price * it.qty)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#E4DFD5] space-y-1.5 text-xs text-[#8A857C]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="tabular-nums text-[#111111]">{formatPrice(currentOrder.subtotal)}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-[#B08D57]">
                  <span>Privilege Discount ({currentOrder.coupon_code}):</span>
                  <span className="tabular-nums font-medium">-{formatPrice(currentOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier:</span>
                <span className="tabular-nums text-[#111111]">
                  {currentOrder.shipping === 0 ? "Complimentary" : formatPrice(currentOrder.shipping)}
                </span>
              </div>
              {currentOrder.cod_fee > 0 && (
                <div className="flex justify-between">
                  <span>COD Handling Fee:</span>
                  <span className="tabular-nums text-[#111111]">{formatPrice(currentOrder.cod_fee)}</span>
                </div>
              )}
              <div className="flex justify-between text-[11px]">
                <span>GST Breakdown (Inclusive):</span>
                <span className="tabular-nums">{formatPrice(currentOrder.gst_total)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#111111] text-sm font-medium text-[#111111]">
                <span>Total Settled:</span>
                <span className="tabular-nums">{formatPrice(currentOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
            <h3 className="font-heading text-xl text-[#111111] pb-2 border-b border-[#E4DFD5]">
              Fulfillment Journey & Audit Events
            </h3>

            <div className="space-y-4 pl-2 border-l border-[#B08D57]/40 text-xs">
              {currentOrder.events.map((ev, i) => (
                <div key={ev.id || i} className="relative pl-6">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#B08D57]" />
                  <div className="flex items-baseline justify-between">
                    <strong className="uppercase tracking-wider text-[11px] text-[#111111]">
                      {ev.status}
                    </strong>
                    <span className="text-[10px] text-[#8A857C]">
                      {new Date(ev.created_at).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-[#8A857C] mt-1">{ev.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Fulfillment Action Form & Patron Dossier (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Form */}
          <div className="bg-white border border-[#E4DFD5] p-6 space-y-4 shadow-xs">
            <h3 className="font-heading text-lg text-[#111111] pb-2 border-b border-[#E4DFD5]">
              Update Fulfillment Status
            </h3>

            <form onSubmit={handleUpdateFulfillment} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Status Transition</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderStatus)}
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none uppercase"
                >
                  <option value="pending">Pending Review</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing / Packed</option>
                  <option value="shipped">Dispatched / En Route</option>
                  <option value="delivered">Delivered to Patron</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Courier Partner</label>
                <input
                  type="text"
                  value={courier}
                  onChange={(e) => setCourier(e.target.value)}
                  placeholder="e.g. BlueDart Express, Delhivery Air"
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Docket / Tracking Number</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. BD-88231019"
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">Internal Audit Note</label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Add note for patron or internal log..."
                  rows={2}
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs focus:outline-none"
                />
              </div>

              <Button type="submit" className="w-full text-xs uppercase tracking-wider py-3 mt-2">
                Commit Fulfillment Update
              </Button>
            </form>

            {currentOrder.payment_method === "cod" && currentOrder.payment_status === "pending" && (
              <div className="pt-3 border-t border-[#E4DFD5]">
                <Button
                  onClick={handleMarkCodPaid}
                  variant="outline"
                  className="w-full text-xs uppercase tracking-wider py-2.5 text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                >
                  Mark COD Collection as Paid
                </Button>
              </div>
            )}
          </div>

          {/* Patron Dossier */}
          <div className="bg-white border border-[#E4DFD5] p-6 space-y-3 text-xs shadow-xs">
            <h4 className="font-heading text-lg text-[#111111] pb-2 border-b border-[#E4DFD5]">
              Patron Profile
            </h4>
            <p className="font-medium text-sm text-[#111111]">{currentOrder.shipping_address.name}</p>
            <p className="text-[#8A857C] flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>{currentOrder.guest_email}</span>
            </p>
            <p className="text-[#8A857C] flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 {currentOrder.shipping_address.phone}</span>
            </p>
            <div className="pt-2 border-t border-[#E4DFD5] space-y-1 text-[#8A857C]">
              <span className="text-[10px] uppercase tracking-wider text-[#111111] font-medium block">
                Destination Residence:
              </span>
              <p>{currentOrder.shipping_address.line1}</p>
              {currentOrder.shipping_address.line2 && <p>{currentOrder.shipping_address.line2}</p>}
              <p>{currentOrder.shipping_address.city}, {currentOrder.shipping_address.state} - {currentOrder.shipping_address.pincode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
