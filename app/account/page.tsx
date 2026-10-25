"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";
import brandConfig from "@/config/brand.config";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const [activeTab, setActiveTab] = React.useState<"orders" | "addresses" | "profile">("orders");

  const sampleOrder = {
    orderNumber: "MA-2026-000104",
    date: "18 Feb 2026",
    status: "Delivered",
    total: 24500,
    items: [
      {
        name: "Mulberry Silk Bias Slip Dress",
        color: "Champagne",
        size: "S",
        qty: 1,
      },
    ],
  };

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container>
        <div className="mb-10 space-y-2">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Account" },
            ]}
          />
          <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
            Private Client Record
          </h1>
          <p className="text-xs text-[#8A857C]">
            Signed in as <strong className="text-[#111111]">customer@demo.com</strong> (Demo Patron)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Side Nav */}
          <div className="lg:col-span-3 bg-white border border-[#E4DFD5] p-5 space-y-1 text-xs">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left uppercase tracking-wider transition-colors ${
                activeTab === "orders" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#F7F4EE]"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order Provenance</span>
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left uppercase tracking-wider transition-colors ${
                activeTab === "addresses" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#F7F4EE]"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left uppercase tracking-wider transition-colors ${
                activeTab === "profile" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#F7F4EE]"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Patron Profile</span>
            </button>
            <Link
              href="/wishlist"
              className="w-full flex items-center gap-2.5 px-3 py-2 text-left uppercase tracking-wider text-[#111111] hover:bg-[#F7F4EE] block"
            >
              <Heart className="w-4 h-4" />
              <span>Saved Wishlist</span>
            </Link>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9 bg-white border border-[#E4DFD5] p-8">
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl text-[#111111]">
                  Order History & Delivery Timeline
                </h3>

                <div className="border border-[#E4DFD5] p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs pb-3 border-b border-[#E4DFD5] gap-2">
                    <div>
                      <span className="font-mono font-medium text-[#111111]">{sampleOrder.orderNumber}</span>
                      <span className="text-[#8A857C] ml-2">• Placed on {sampleOrder.date}</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] uppercase tracking-wider font-medium self-start sm:self-auto">
                      {sampleOrder.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <p className="font-medium text-[#111111]">{sampleOrder.items[0].name}</p>
                    <p className="text-[#8A857C]">Size: {sampleOrder.items[0].size} • Color: {sampleOrder.items[0].color} • Qty: {sampleOrder.items[0].qty}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs">
                    <span className="text-[#8A857C]">Total: <strong className="text-[#111111] font-medium">{formatPrice(sampleOrder.total)}</strong></span>
                    <span className="text-[11px] text-[#B08D57] font-medium">Delivered via BlueDart Express (Track # BD-882310)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-4">
                <h3 className="font-heading text-xl text-[#111111]">
                  Default Delivery Dossier
                </h3>
                <div className="border border-[#E4DFD5] p-5 text-xs text-[#111111] space-y-1 max-w-md">
                  <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-medium block mb-1">
                    Primary Residence
                  </span>
                  <p className="font-medium">Alisha Singhania</p>
                  <p className="text-[#8A857C]">Apartment 14B, Sea Face Towers</p>
                  <p className="text-[#8A857C]">Worli, Mumbai, Maharashtra 400018</p>
                  <p className="text-[#8A857C]">Phone: +91 98765 43210</p>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-4 max-w-md text-xs">
                <h3 className="font-heading text-xl text-[#111111]">
                  Patron Profile
                </h3>
                <div className="space-y-2">
                  <p><strong className="text-[#111111]">Name:</strong> Alisha Singhania</p>
                  <p><strong className="text-[#111111]">Email:</strong> customer@demo.com</p>
                  <p><strong className="text-[#111111]">Tier:</strong> Private Circle Member</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
