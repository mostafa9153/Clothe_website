"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  FileText,
  RotateCcw,
  XCircle,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Truck,
  ExternalLink,
  Star,
  AlertCircle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { MOCK_ORDERS, MOCK_ADDRESSES, MOCK_REVIEWS, MOCK_USERS, checkMockPincode } from "@/lib/data/mock-db";
import { Order, Address, Review } from "@/types/database.types";
import { toast } from "sonner";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"overview" | "orders" | "addresses" | "profile" | "reviews">("overview");

  // Patron Session State
  const [patronUser, setPatronUser] = React.useState<any>(null);
  const [orders, setOrders] = React.useState<Order[]>(MOCK_ORDERS);
  const [addresses, setAddresses] = React.useState<Address[]>(MOCK_ADDRESSES);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  // Return Request Modal State
  const [returnModalOrder, setReturnModalOrder] = React.useState<Order | null>(null);
  const [returnReason, setReturnReason] = React.useState("fit_too_small");
  const [returnNotes, setReturnNotes] = React.useState("");

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = React.useState(false);
  const [editingAddrId, setEditingAddrId] = React.useState<string | null>(null);
  const [addrForm, setAddrForm] = React.useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    is_default: false,
  });

  // Profile Edit State
  const [profileName, setProfileName] = React.useState("");
  const [profilePhone, setProfilePhone] = React.useState("");

  React.useEffect(() => {
    // Fetch active session or set default patron
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setPatronUser(data.user);
          setProfileName(data.user.name);
          setProfilePhone(data.user.phone || "");
        } else {
          // Default demo patron fallback
          const defaultUser = MOCK_USERS[0];
          setPatronUser(defaultUser);
          setProfileName(defaultUser.full_name);
          setProfilePhone(defaultUser.phone);
        }
      })
      .catch(() => {
        const defaultUser = MOCK_USERS[0];
        setPatronUser(defaultUser);
        setProfileName(defaultUser.full_name);
        setProfilePhone(defaultUser.phone);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Patron session ended.");
      router.push("/account/login");
      router.refresh();
    } catch {
      router.push("/account/login");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you certain you wish to cancel this commission? Reserved garments will be restocked to the atelier.")) {
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "Patron requested cancellation from account" }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        toast.success(`Commission ${data.order.order_number} has been cancelled and inventory restored.`);
        setOrders((prev) => prev.map((o) => (o.id === data.order.id ? data.order : o)));
        if (selectedOrder?.id === data.order.id) {
          setSelectedOrder(data.order);
        }
      } else {
        toast.error(data.error || "Cannot cancel order.");
      }
    } catch {
      toast.error("Failed to cancel commission.");
    }
  };

  const handleSubmitReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnModalOrder) return;

    try {
      const res = await fetch(`/api/orders/${returnModalOrder.id}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: returnReason,
          notes: returnNotes,
          customerName: patronUser?.name,
          customerEmail: patronUser?.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Return request recorded. Our atelier courier concierge will contact you within 24 hours.");
        setReturnModalOrder(null);
        setReturnNotes("");
      } else {
        toast.error(data.error || "Could not register return.");
      }
    } catch {
      toast.error("Failed to submit return request.");
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();

    const pinCheck = checkMockPincode(addrForm.pincode);
    if (!pinCheck.serviceable) {
      toast.error(pinCheck.message);
      return;
    }

    const cleanPhone = addrForm.phone.trim().replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      toast.error("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (editingAddrId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingAddrId ? { ...a, ...addrForm } : a))
      );
      toast.success("Address updated in your client record.");
    } else {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        ...addrForm,
      };
      setAddresses((prev) => [newAddr, ...prev]);
      toast.success("New address added to client record.");
    }
    setShowAddressModal(false);
    setEditingAddrId(null);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed.");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, is_default: a.id === id }))
    );
    toast.success("Default delivery residence updated.");
  };

  const myOrders = orders;
  const latestOrder = myOrders[0];

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE] min-h-screen">
      <Container>
        <div className="mb-10 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Record" },
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
                Private Patron Record
              </h1>
              <p className="text-xs text-[#8A857C] mt-1">
                Patron: <strong className="text-[#111111]">{patronUser?.name || "Alisha Singhania"}</strong> ({patronUser?.email || "customer@demo.com"})
                {patronUser?.role === "admin" && (
                  <span className="ml-2 px-2 py-0.5 bg-[#B08D57] text-white text-[10px] uppercase tracking-wider font-medium">
                    Atelier Director
                  </span>
                )}
              </p>
            </div>

            {patronUser?.role === "admin" && (
              <Button asChild size="sm" className="text-xs uppercase tracking-wider">
                <Link href="/admin">Open Director Portal</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Side Nav (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-white border border-[#E4DFD5] p-5 space-y-1 text-xs shadow-xs">
            <button
              onClick={() => {
                setActiveTab("overview");
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left uppercase tracking-wider transition-colors ${
                activeTab === "overview" && !selectedOrder ? "bg-[#111111] text-white font-medium" : "text-[#111111] hover:bg-[#F7F4EE]"
              }`}
            >
              <User className="w-4 h-4 stroke-[1.25]" />
              <span>Dossier Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("orders");
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-left uppercase tracking-wider transition-colors ${
                activeTab === "orders" || selectedOrder ? "bg-[#111111] text-white font-medium" : "text-[#111111] hover:bg-[#F7F4EE]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4 stroke-[1.25]" />
                <span>Commissions & Orders</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-[#111111]">
                {myOrders.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("addresses");
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left uppercase tracking-wider transition-colors ${
                activeTab === "addresses" ? "bg-[#111111] text-white font-medium" : "text-[#111111] hover:bg-[#F7F4EE]"
              }`}
            >
              <MapPin className="w-4 h-4 stroke-[1.25]" />
              <span>Delivery Residences</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("profile");
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left uppercase tracking-wider transition-colors ${
                activeTab === "profile" ? "bg-[#111111] text-white font-medium" : "text-[#111111] hover:bg-[#F7F4EE]"
              }`}
            >
              <Edit2 className="w-4 h-4 stroke-[1.25]" />
              <span>Patron Profile</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("reviews");
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left uppercase tracking-wider transition-colors ${
                activeTab === "reviews" ? "bg-[#111111] text-white font-medium" : "text-[#111111] hover:bg-[#F7F4EE]"
              }`}
            >
              <Star className="w-4 h-4 stroke-[1.25]" />
              <span>My Testimonials</span>
            </button>

            <Link
              href="/wishlist"
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left uppercase tracking-wider text-[#111111] hover:bg-[#F7F4EE] block"
            >
              <Heart className="w-4 h-4 stroke-[1.25]" />
              <span>Saved Wishlist</span>
            </Link>

            <div className="pt-4 border-t border-[#E4DFD5]">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left uppercase tracking-wider text-red-700 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 stroke-[1.25]" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Main Content (lg:col-span-9) */}
          <div className="lg:col-span-9 bg-white border border-[#E4DFD5] p-6 sm:p-10 shadow-xs">
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && !selectedOrder && (
              <div className="space-y-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block mb-1">
                    Private Circle Member • Tier Haute
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[#111111]">
                    Greetings, {patronUser?.name || "Patron"}
                  </h2>
                  <p className="text-xs text-[#8A857C] mt-1 max-w-xl leading-relaxed">
                    Welcome to your private atelier record. Review your commissioned garments, track white-glove dispatches, and manage your delivery residences.
                  </p>
                </div>

                {/* Latest Commission Card */}
                {latestOrder && (
                  <div className="border border-[#E4DFD5] p-6 space-y-4 bg-[#F7F4EE]/40">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs pb-3 border-b border-[#E4DFD5] gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8A857C] block">
                          Most Recent Commission
                        </span>
                        <span className="font-mono font-medium text-sm text-[#111111]">
                          {latestOrder.order_number}
                        </span>
                      </div>
                      <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium border ${
                        latestOrder.status === "delivered"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : latestOrder.status === "shipped"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}>
                        {latestOrder.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {latestOrder.items[0]?.image && (
                        <div className="relative w-16 h-20 bg-[#E4DFD5] flex-shrink-0 overflow-hidden border border-[#E4DFD5]">
                          <Image src={latestOrder.items[0].image} alt="" fill className="object-cover" />
                        </div>
                      )}
                      <div className="text-xs space-y-1">
                        <p className="font-serif text-sm font-medium text-[#111111]">{latestOrder.items[0]?.name}</p>
                        <p className="text-[#8A857C]">
                          Size: {latestOrder.items[0]?.size} • Color: {latestOrder.items[0]?.color} • Qty: {latestOrder.items[0]?.qty}
                        </p>
                        <p className="text-[#111111] font-medium tabular-nums">{formatPrice(latestOrder.total)}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <Button
                        size="sm"
                        onClick={() => setSelectedOrder(latestOrder)}
                        className="text-xs uppercase tracking-wider"
                      >
                        View Full Provenance & Timeline
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-xs uppercase tracking-wider"
                      >
                        <Link href={`/account/orders/${latestOrder.id}/invoice`}>
                          Print Invoice
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E4DFD5]">
                  <div
                    onClick={() => setActiveTab("orders")}
                    className="p-5 border border-[#E4DFD5] hover:border-[#111111] cursor-pointer transition-colors space-y-2 bg-white"
                  >
                    <Package className="w-5 h-5 text-[#B08D57] stroke-[1.25]" />
                    <h4 className="font-medium text-xs text-[#111111] uppercase tracking-wider">Order History</h4>
                    <p className="text-[11px] text-[#8A857C]">{myOrders.length} registered commissions</p>
                  </div>

                  <div
                    onClick={() => setActiveTab("addresses")}
                    className="p-5 border border-[#E4DFD5] hover:border-[#111111] cursor-pointer transition-colors space-y-2 bg-white"
                  >
                    <MapPin className="w-5 h-5 text-[#B08D57] stroke-[1.25]" />
                    <h4 className="font-medium text-xs text-[#111111] uppercase tracking-wider">Residences</h4>
                    <p className="text-[11px] text-[#8A857C]">{addresses.length} saved delivery destinations</p>
                  </div>

                  <Link
                    href="/wishlist"
                    className="p-5 border border-[#E4DFD5] hover:border-[#111111] cursor-pointer transition-colors space-y-2 bg-white block"
                  >
                    <Heart className="w-5 h-5 text-[#B08D57] stroke-[1.25]" />
                    <h4 className="font-medium text-xs text-[#111111] uppercase tracking-wider">Saved Wishlist</h4>
                    <p className="text-[11px] text-[#8A857C]">Curated pieces for future commission</p>
                  </Link>
                </div>
              </div>
            )}

            {/* 2. ORDERS LIST TAB */}
            {activeTab === "orders" && !selectedOrder && (
              <div className="space-y-6">
                <div className="flex justify-between items-baseline pb-4 border-b border-[#E4DFD5]">
                  <h2 className="font-heading text-2xl font-normal text-[#111111]">
                    Commission Provenance & History ({myOrders.length})
                  </h2>
                  <Link href="/track-order" className="text-xs text-[#B08D57] hover:underline uppercase tracking-wider">
                    Track via Order Number &rarr;
                  </Link>
                </div>

                <div className="space-y-4">
                  {myOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="border border-[#E4DFD5] p-5 space-y-4 hover:border-[#111111] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs pb-3 border-b border-[#E4DFD5] gap-2">
                        <div>
                          <span className="font-mono font-medium text-[#111111] text-sm">{ord.order_number}</span>
                          <span className="text-[#8A857C] ml-2">
                            • Placed on {new Date(ord.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
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
                        </div>
                      </div>

                      {/* Items Row */}
                      <div className="divide-y divide-[#E4DFD5]/60">
                        {ord.items.map((it) => (
                          <div key={it.id} className="py-2.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              {it.image && (
                                <div className="relative w-12 h-16 bg-[#E4DFD5] flex-shrink-0 overflow-hidden">
                                  <Image src={it.image} alt="" fill className="object-cover" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-[#111111]">{it.name}</p>
                                <p className="text-[11px] text-[#8A857C]">Size: {it.size} • Color: {it.color} • Qty: {it.qty}</p>
                              </div>
                            </div>
                            <span className="tabular-nums font-medium text-[#111111]">
                              {formatPrice(it.unit_price * it.qty)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-[#E4DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="text-[#8A857C]">
                          Total: <strong className="text-[#111111] font-medium">{formatPrice(ord.total)}</strong>
                          {ord.tracking_number && (
                            <span className="ml-3 text-[11px] text-[#B08D57]">
                              {ord.courier} ({ord.tracking_number})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedOrder(ord)}
                            className="text-[11px] uppercase tracking-wider"
                          >
                            Details & Timeline
                          </Button>
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="text-[11px] uppercase tracking-wider"
                          >
                            <Link href={`/account/orders/${ord.id}/invoice`}>
                              Invoice
                            </Link>
                          </Button>
                          {["pending", "confirmed"].includes(ord.status) && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCancelOrder(ord.id)}
                              className="text-[11px] text-red-700 hover:bg-red-50"
                            >
                              Cancel Order
                            </Button>
                          )}
                          {ord.status === "delivered" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setReturnModalOrder(ord)}
                              className="text-[11px] text-[#8A857C] hover:text-[#111111]"
                            >
                              Request Return
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ORDER DETAIL VIEW */}
            {selectedOrder && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-xs text-[#8A857C] hover:text-[#111111] uppercase tracking-wider flex items-center gap-1.5"
                >
                  &larr; Back to All Commissions
                </button>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-[#E4DFD5] gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block">
                      Commission Reference
                    </span>
                    <h2 className="font-heading text-2xl font-normal text-[#111111]">
                      {selectedOrder.order_number}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" variant="outline" className="text-xs uppercase tracking-wider">
                      <Link href={`/account/orders/${selectedOrder.id}/invoice`}>
                        Print Official Invoice
                      </Link>
                    </Button>
                    {["pending", "confirmed"].includes(selectedOrder.status) && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCancelOrder(selectedOrder.id)}
                        className="text-xs text-red-700 hover:bg-red-50"
                      >
                        Cancel Commission
                      </Button>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-6 bg-[#F7F4EE]/60 border border-[#E4DFD5] space-y-4">
                  <h4 className="font-heading text-lg text-[#111111]">Delivery Provenance & Milestones</h4>
                  <div className="space-y-4 pl-2 border-l border-[#B08D57]/40 text-xs">
                    {selectedOrder.events.map((ev, i) => (
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
                        <p className="text-[#8A857C] mt-0.5">{ev.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commission Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="p-5 border border-[#E4DFD5] space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A857C] block font-medium">
                      Destination Address
                    </span>
                    <p className="font-medium text-[#111111]">{selectedOrder.shipping_address.name}</p>
                    <p className="text-[#8A857C]">{selectedOrder.shipping_address.line1}</p>
                    {selectedOrder.shipping_address.line2 && <p className="text-[#8A857C]">{selectedOrder.shipping_address.line2}</p>}
                    <p className="text-[#8A857C]">
                      {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} - {selectedOrder.shipping_address.pincode}
                    </p>
                    <p className="text-[#8A857C]">Phone: +91 {selectedOrder.shipping_address.phone}</p>
                  </div>

                  <div className="p-5 border border-[#E4DFD5] space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A857C] block font-medium">
                      Settlement & Logistics
                    </span>
                    <p><strong className="text-[#111111]">Payment Method:</strong> {selectedOrder.payment_method.toUpperCase()}</p>
                    <p><strong className="text-[#111111]">Payment Status:</strong> {selectedOrder.payment_status}</p>
                    {selectedOrder.courier && (
                      <p><strong className="text-[#111111]">Courier:</strong> {selectedOrder.courier} (Ref: {selectedOrder.tracking_number})</p>
                    )}
                    {selectedOrder.gift_wrap && (
                      <p className="text-[#B08D57]">✨ Includes Atelier Gift Box Presentation</p>
                    )}
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-[#E4DFD5] divide-y divide-[#E4DFD5]">
                  {selectedOrder.items.map((it) => (
                    <div key={it.id} className="p-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        {it.image && (
                          <div className="relative w-14 h-18 bg-[#E4DFD5] flex-shrink-0 overflow-hidden">
                            <Image src={it.image} alt="" fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm text-[#111111]">{it.name}</p>
                          <p className="text-[#8A857C]">Size: {it.size} • Color: {it.color} • Qty: {it.qty}</p>
                        </div>
                      </div>
                      <span className="tabular-nums font-medium text-sm text-[#111111]">
                        {formatPrice(it.unit_price * it.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. ADDRESSES TAB */}
            {activeTab === "addresses" && !selectedOrder && (
              <div className="space-y-6">
                <div className="flex justify-between items-baseline pb-4 border-b border-[#E4DFD5]">
                  <h2 className="font-heading text-2xl font-normal text-[#111111]">
                    Saved Delivery Residences ({addresses.length})
                  </h2>
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingAddrId(null);
                      setAddrForm({
                        name: patronUser?.name || "",
                        phone: patronUser?.phone || "",
                        line1: "",
                        line2: "",
                        city: "",
                        state: "Maharashtra",
                        pincode: "",
                        is_default: addresses.length === 0,
                      });
                      setShowAddressModal(true);
                    }}
                    className="text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Residence</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-6 border text-xs space-y-3 relative ${
                        addr.is_default ? "border-[#111111] bg-[#F7F4EE]/30" : "border-[#E4DFD5] bg-white"
                      }`}
                    >
                      {addr.is_default && (
                        <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-medium block">
                          Primary Delivery Residence
                        </span>
                      )}
                      <div>
                        <p className="font-medium text-sm text-[#111111]">{addr.name}</p>
                        <p className="text-[#8A857C] mt-1">{addr.line1}</p>
                        {addr.line2 && <p className="text-[#8A857C]">{addr.line2}</p>}
                        <p className="text-[#8A857C]">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-[#8A857C] mt-1">Phone: +91 {addr.phone}</p>
                      </div>

                      <div className="pt-3 border-t border-[#E4DFD5] flex items-center justify-between text-[11px]">
                        {!addr.is_default ? (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="text-[#8A857C] hover:text-[#111111] underline"
                          >
                            Set as Primary
                          </button>
                        ) : (
                          <span className="text-green-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Primary
                          </span>
                        )}

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setEditingAddrId(addr.id);
                              setAddrForm({
                                name: addr.name,
                                phone: addr.phone,
                                line1: addr.line1,
                                line2: addr.line2 || "",
                                city: addr.city,
                                state: addr.state,
                                pincode: addr.pincode,
                                is_default: addr.is_default,
                              });
                              setShowAddressModal(true);
                            }}
                            className="text-[#8A857C] hover:text-[#111111] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-[#8A857C] hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PROFILE TAB */}
            {activeTab === "profile" && !selectedOrder && (
              <div className="space-y-8 max-w-xl">
                <div>
                  <h2 className="font-heading text-2xl font-normal text-[#111111]">
                    Patron Profile Dossier
                  </h2>
                  <p className="text-xs text-[#8A857C] mt-1">
                    Manage your identity attributes and communication preferences.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Profile preferences updated successfully.");
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                      Registered Email Address
                    </label>
                    <input
                      type="email"
                      value={patronUser?.email || "customer@demo.com"}
                      disabled
                      className="w-full bg-[#E4DFD5]/40 border border-[#E4DFD5] p-2.5 text-xs text-[#8A857C] cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                      Mobile Telephone (+91)
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="text-xs uppercase tracking-wider py-3 px-6">
                      Save Profile Changes
                    </Button>
                  </div>
                </form>

                <div className="pt-8 border-t border-[#E4DFD5] space-y-4 text-xs">
                  <h4 className="font-heading text-lg text-[#111111]">Security Credentials</h4>
                  <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5] flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#111111]">Account Password</p>
                      <p className="text-[11px] text-[#8A857C]">Last modified on 15 Jan 2026</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info("Password update dispatch sent to your email.")}
                      className="text-xs uppercase tracking-wider"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 6. REVIEWS TAB */}
            {activeTab === "reviews" && !selectedOrder && (
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-normal text-[#111111] pb-4 border-b border-[#E4DFD5]">
                  Testimonials & Garment Reviews
                </h2>
                <div className="space-y-4">
                  {MOCK_REVIEWS.slice(0, 3).map((rev) => (
                    <div key={rev.id} className="p-5 border border-[#E4DFD5] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex text-[#B08D57]">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] text-[#8A857C]">
                          {new Date(rev.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm text-[#111111]">{rev.title}</h4>
                      <p className="text-[#8A857C] leading-relaxed">{rev.body}</p>
                      <span className="inline-block px-2 py-0.5 bg-green-50 text-green-800 text-[10px] uppercase tracking-wider border border-green-200">
                        Verified Patron Review
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Return Request Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E4DFD5] max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#E4DFD5]">
              <h3 className="font-heading text-xl text-[#111111]">
                Request Atelier Return
              </h3>
              <button
                onClick={() => setReturnModalOrder(null)}
                className="text-[#8A857C] hover:text-[#111111]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#8A857C]">
              Commission: <strong className="text-[#111111]">{returnModalOrder.order_number}</strong>. All returns within 10 days of delivery are complimentary.
            </p>

            <form onSubmit={handleSubmitReturn} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                  Return Reason *
                </label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
                >
                  <option value="fit_too_small">Fit Runs Tighter Than Expected</option>
                  <option value="fit_too_large">Fit Runs Larger Than Expected</option>
                  <option value="fabric_not_as_expected">Fabric Texture or Weave Different</option>
                  <option value="colour_variation">Colour Variation in Room Lighting</option>
                  <option value="change_of_mind">Personal Consideration Change</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                  Additional Notes for Concierge
                </label>
                <textarea
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  placeholder="Share details regarding fit or exchange size request..."
                  rows={3}
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="text-xs uppercase tracking-wider flex-1 py-3">
                  Confirm Return Request
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setReturnModalOrder(null)}
                  className="text-xs uppercase tracking-wider py-3"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Address Form Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E4DFD5] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#E4DFD5]">
              <h3 className="font-heading text-xl text-[#111111]">
                {editingAddrId ? "Edit Delivery Residence" : "Add Delivery Residence"}
              </h3>
              <button onClick={() => setShowAddressModal(false)} className="text-[#8A857C] hover:text-[#111111]">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={addrForm.name}
                    onChange={(e) => setAddrForm({ ...addrForm, name: e.target.value })}
                    required
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    value={addrForm.phone}
                    onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                    required
                    maxLength={10}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  value={addrForm.line1}
                  onChange={(e) => setAddrForm({ ...addrForm, line1: e.target.value })}
                  required
                  placeholder="Flat, building, street..."
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">Address Line 2</label>
                <input
                  type="text"
                  value={addrForm.line2}
                  onChange={(e) => setAddrForm({ ...addrForm, line2: e.target.value })}
                  placeholder="Apartment, suite, landmark..."
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">City *</label>
                  <input
                    type="text"
                    value={addrForm.city}
                    onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                    required
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">State *</label>
                  <input
                    type="text"
                    value={addrForm.state}
                    onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                    required
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    value={addrForm.pincode}
                    onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })}
                    required
                    maxLength={6}
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="make-default"
                  checked={addrForm.is_default}
                  onChange={(e) => setAddrForm({ ...addrForm, is_default: e.target.checked })}
                  className="accent-[#111111]"
                />
                <label htmlFor="make-default" className="text-xs text-[#111111] cursor-pointer">
                  Set as primary delivery residence
                </label>
              </div>

              <div className="flex gap-2 pt-3">
                <Button type="submit" className="text-xs uppercase tracking-wider flex-1 py-3">
                  Save Residence
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddressModal(false)}
                  className="text-xs uppercase tracking-wider py-3"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
