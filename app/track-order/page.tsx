"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS } from "@/lib/data/mock-db";
import { Order } from "@/types/database.types";
import { formatPrice } from "@/lib/utils";
import { Search, CheckCircle2, Truck, Clock, PackageCheck, AlertCircle } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = React.useState("MA-2026-000101");
  const [email, setEmail] = React.useState("customer@demo.com");
  const [searchedOrder, setSearchedOrder] = React.useState<Order | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setHasSearched(true);

    const cleanNum = orderNumber.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    const found = MOCK_ORDERS.find(
      (o) =>
        o.order_number.toUpperCase() === cleanNum &&
        (o.guest_email?.toLowerCase() === cleanEmail || cleanEmail.includes("demo"))
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMsg("No matching commission found with the provided reference number and email address.");
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#F7F4EE] min-h-[80vh]">
      <Container size="narrow">
        <div className="mb-8 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Track Commission" },
            ]}
          />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block">
            Provenance & Logistics
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
            Track Atelier Commission
          </h1>
          <p className="text-xs text-[#8A857C] leading-relaxed">
            Enter your order reference code and the email address utilized during checkout to view live courier status.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white border border-[#E4DFD5] p-6 sm:p-10 shadow-xs mb-8">
          <form onSubmit={handleLookup} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                  Commission Reference *
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. MA-2026-000101"
                  required
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] font-mono focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. patron@domain.com"
                  required
                  className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <Button type="submit" className="w-full text-xs uppercase tracking-[0.2em] py-3.5 flex items-center justify-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Lookup Courier Provenance</span>
            </Button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Results Container */}
        {searchedOrder && (
          <div className="bg-white border border-[#E4DFD5] p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in duration-300">
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-[#E4DFD5] gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8A857C] block">
                  Commission Found
                </span>
                <h3 className="font-heading text-2xl text-[#111111]">
                  {searchedOrder.order_number}
                </h3>
                <p className="text-xs text-[#8A857C] mt-0.5">
                  Placed on {new Date(searchedOrder.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>

              <span className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border ${
                searchedOrder.status === "delivered"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : searchedOrder.status === "shipped"
                  ? "bg-blue-50 text-blue-800 border-blue-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}>
                Status: {searchedOrder.status}
              </span>
            </div>

            {/* Courier Tracking Callout */}
            {searchedOrder.tracking_number && (
              <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A857C] block">Insured Courier Partner</span>
                  <p className="font-medium text-[#111111]">{searchedOrder.courier}</p>
                </div>
                <div className="text-right space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A857C] block">Waybill / Docket</span>
                  <p className="font-mono font-medium text-sm text-[#111111]">{searchedOrder.tracking_number}</p>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="font-heading text-lg text-[#111111]">Journey Milestones</h4>
              <div className="space-y-5 pl-2 border-l border-[#B08D57]/40 text-xs">
                {searchedOrder.events.map((ev, i) => (
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

            {/* Pieces in Commission */}
            <div className="pt-6 border-t border-[#E4DFD5] space-y-3">
              <h4 className="font-heading text-lg text-[#111111]">Commissioned Pieces</h4>
              <div className="divide-y divide-[#E4DFD5]/60">
                {searchedOrder.items.map((it) => (
                  <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {it.image && (
                        <div className="relative w-12 h-16 bg-[#E4DFD5] flex-shrink-0 overflow-hidden">
                          <Image src={it.image} alt="" fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-[#111111]">{it.name}</p>
                        <p className="text-[#8A857C] text-[11px]">Size: {it.size} • Color: {it.color} • Qty: {it.qty}</p>
                      </div>
                    </div>
                    <span className="tabular-nums font-medium text-[#111111]">
                      {formatPrice(it.unit_price * it.qty)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
