"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS } from "@/lib/data/mock-db";
import { formatPrice } from "@/lib/utils";
import brandConfig from "@/config/brand.config";
import { Check, ShieldCheck, ArrowRight, UserPlus, FileText, Truck } from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderNumber = (params?.orderNumber as string) || "MA-2026-000101";

  const order = MOCK_ORDERS.find((o) => o.order_number === orderNumber) || MOCK_ORDERS[0];

  return (
    <div className="py-16 md:py-24 bg-[#F7F4EE] min-h-screen flex items-center">
      <Container size="narrow" className="space-y-8">
        <div className="text-center space-y-6 bg-white border border-[#E4DFD5] p-8 sm:p-14 shadow-xs">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#111111] text-[#B08D57] flex items-center justify-center border border-[#E4DFD5]">
            <Check className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
              Commission Confirmed & Registered
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl text-[#111111] font-normal">
              Thank You, {order.shipping_address.name}
            </h1>
          </div>

          <div className="font-mono text-sm tracking-wider text-[#111111] bg-[#F7F4EE] px-5 py-2.5 border border-[#E4DFD5] inline-block">
            Order Reference: <strong>{order.order_number}</strong>
          </div>

          <p className="text-xs text-[#8A857C] max-w-md mx-auto leading-relaxed">
            Your commission has been entered into the atelier registry. A formal confirmation dispatch has been routed to <strong>{order.guest_email}</strong>. Our white-glove courier will deliver within {brandConfig.shipping.estimatedDays}.
          </p>

          {/* Pieces Summary */}
          <div className="pt-4 border-t border-[#E4DFD5] text-left space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-[#8A857C] block font-medium">
              Commissioned Garments
            </span>
            <div className="divide-y divide-[#E4DFD5]/60 text-xs">
              {order.items.map((it) => (
                <div key={it.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {it.image && (
                      <div className="relative w-12 h-16 bg-[#E4DFD5] flex-shrink-0 overflow-hidden border border-[#E4DFD5]">
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

            <div className="pt-2 flex justify-between text-xs font-medium text-[#111111]">
              <span>Total Commission Amount</span>
              <span className="tabular-nums">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="px-8 text-xs uppercase tracking-[0.2em] py-3.5">
              <Link href="/shop">Continue Atelier Exploration</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 text-xs uppercase tracking-[0.2em] py-3.5">
              <Link href={`/account/orders/${order.id}/invoice`}>
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                <span>View Tax Invoice</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Guest Account Creation Prompt */}
        <div className="p-6 bg-white border border-[#E4DFD5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#111111] font-medium">
              <UserPlus className="w-4 h-4 text-[#B08D57]" />
              <span>Create an Atelier Account with One Click</span>
            </div>
            <p className="text-[#8A857C]">
              Track deliveries in real time, store your size profile, and receive invitations to private drops.
            </p>
          </div>

          <Button asChild variant="secondary" size="sm" className="text-xs uppercase tracking-wider shrink-0">
            <Link href="/account/login">Register Account</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
