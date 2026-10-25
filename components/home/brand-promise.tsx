"use client";

import * as React from "react";
import { Truck, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import brandConfig from "@/config/brand.config";
import { formatPrice } from "@/lib/utils";

export function BrandPromise() {
  const promises = [
    {
      icon: Truck,
      title: "Complimentary Delivery",
      description: `All commissions above ${formatPrice(brandConfig.shipping.freeAbove)} receive insured, carbon-neutral express courier.`,
    },
    {
      icon: RotateCcw,
      title: `${brandConfig.returnWindowDays}-Day Return Protocol`,
      description: "Doorstep exchange or discreet atelier credit within ten days in pristine condition.",
    },
    {
      icon: ShieldCheck,
      title: "Authenticated Provenance",
      description: "Every individual garment is numbered with verifiable raw fiber origin seals.",
    },
    {
      icon: Sparkles,
      title: "Private Stylist Atelier",
      description: "Direct WhatsApp consultations with dedicated personal stylists for sizing and drape advice.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#FFFFFF] border-b border-[#E4DFD5]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {promises.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
                <div className="w-10 h-10 border border-[#E4DFD5] flex items-center justify-center text-[#B08D57]">
                  <Icon className="w-4 h-4 stroke-[1.25]" />
                </div>
                <h4 className="font-heading text-lg text-[#111111] font-normal">
                  {item.title}
                </h4>
                <p className="text-xs text-[#8A857C] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
