"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_ORDERS } from "@/lib/data/mock-db";
import { formatPrice } from "@/lib/utils";
import brandConfig from "@/config/brand.config";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";

export default function OrderInvoicePage() {
  const params = useParams();
  const orderId = params?.id as string;

  const order = MOCK_ORDERS.find((o) => o.id === orderId || o.order_number === orderId) || MOCK_ORDERS[0];

  const [isGiftPackingSlip, setIsGiftPackingSlip] = React.useState(Boolean(order.hide_prices_on_invoice));

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // 12% GST split: 6% CGST + 6% SGST
  const cgstAmount = Math.round(order.gst_total / 2);
  const sgstAmount = order.gst_total - cgstAmount;

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] p-6 sm:p-12 print:p-0">
      {/* Top Controls (Hidden in Print) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap justify-between items-center gap-3 print:hidden border-b border-[#E4DFD5] pb-4">
        <Button asChild variant="outline" size="sm" className="text-xs uppercase tracking-wider">
          <Link href="/account" className="flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Client Record</span>
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsGiftPackingSlip(!isGiftPackingSlip)}
            className="text-xs uppercase tracking-wider text-[#B08D57] border-[#B08D57]/40"
          >
            {isGiftPackingSlip ? "View Official Tax Invoice" : "View Gift Packing Slip (Hide Prices)"}
          </Button>
          <Button onClick={handlePrint} size="sm" className="text-xs uppercase tracking-wider flex items-center gap-2">
            <Printer className="w-3.5 h-3.5" />
            <span>{isGiftPackingSlip ? "Print Packing Slip" : "Print Tax Invoice"}</span>
          </Button>
        </div>
      </div>

      {/* Invoice Document (A4/Letter Printable Container) */}
      <div className="max-w-4xl mx-auto border border-[#E4DFD5] p-8 sm:p-14 space-y-8 bg-white print:border-0 print:p-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-[#111111] pb-8">
          <div>
            <h1 className="font-heading text-3xl tracking-[0.15em] text-[#111111] uppercase font-normal">
              {brandConfig.name}
            </h1>
            <p className="text-xs text-[#8A857C] mt-1 font-serif italic">
              {brandConfig.tagline}
            </p>
            <div className="text-[11px] text-[#8A857C] mt-3 space-y-0.5 leading-relaxed">
              <p>Atelier Florence & Mumbai Flagship</p>
              <p>GSTIN: 27AABCM9988C1Z9</p>
              <p>Email: {brandConfig.contact.email} • Tel: {brandConfig.contact.phone}</p>
            </div>
          </div>

          <div className="text-right sm:text-right space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
              {isGiftPackingSlip ? "Official Gift Packing Slip" : "Official Tax Invoice"}
            </span>
            <p className="font-mono text-base font-medium text-[#111111]">{order.order_number}</p>
            <p className="text-xs text-[#8A857C]">
              Invoice Date: {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <p className="text-xs text-[#8A857C]">
              Payment Status: <span className="uppercase text-[#111111] font-medium">{order.payment_status}</span> ({order.payment_method.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-8 text-xs pb-6 border-b border-[#E4DFD5]">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C] font-medium block">
              Billed & Dispatched To:
            </span>
            <p className="font-medium text-[#111111] text-sm">{order.shipping_address.name}</p>
            <p className="text-[#8A857C]">{order.shipping_address.line1}</p>
            {order.shipping_address.line2 && <p className="text-[#8A857C]">{order.shipping_address.line2}</p>}
            <p className="text-[#8A857C]">
              {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
            </p>
            <p className="text-[#8A857C]">State Code: 27 • Mobile: +91 {order.shipping_address.phone}</p>
          </div>

          <div className="space-y-1.5 text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C] font-medium block">
              Courier Provenance:
            </span>
            <p className="font-medium text-[#111111]">{order.courier || "Atelier White-Glove Courier"}</p>
            {order.tracking_number && (
              <p className="font-mono text-xs text-[#111111]">Tracking: {order.tracking_number}</p>
            )}
            <p className="text-[#8A857C]">Place of Supply: {order.shipping_address.state}</p>
            <p className="text-[#8A857C]">Nature of Supply: Intra/Inter-state Goods Supply</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#111111] text-[10px] uppercase tracking-[0.15em] text-[#8A857C]">
                <th className="py-3 font-medium">Piece Description</th>
                <th className="py-3 font-medium">Size/Color</th>
                <th className="py-3 font-medium text-center">Qty</th>
                {!isGiftPackingSlip ? (
                  <>
                    <th className="py-3 font-medium text-right">Unit Price</th>
                    <th className="py-3 font-medium text-right">GST Rate</th>
                    <th className="py-3 font-medium text-right">Taxable Value</th>
                    <th className="py-3 font-medium text-right">Total (₹)</th>
                  </>
                ) : (
                  <th className="py-3 font-medium text-right">Gift Allocation</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD5]">
              {order.items.map((it, idx) => {
                const totalItem = it.unit_price * it.qty;
                const gstPortion = totalItem - totalItem / (1 + it.gst_rate / 100);
                const taxable = totalItem - gstPortion;

                return (
                  <tr key={idx} className="text-xs">
                    <td className="py-3 font-serif font-medium text-[#111111]">{it.name}</td>
                    <td className="py-3 text-[#8A857C]">{it.size} / {it.color}</td>
                    <td className="py-3 text-center tabular-nums">{it.qty}</td>
                    {!isGiftPackingSlip ? (
                      <>
                        <td className="py-3 text-right tabular-nums">{formatPrice(it.unit_price)}</td>
                        <td className="py-3 text-right tabular-nums">{it.gst_rate}%</td>
                        <td className="py-3 text-right tabular-nums">{formatPrice(Math.round(taxable))}</td>
                        <td className="py-3 text-right tabular-nums font-medium text-[#111111]">
                          {formatPrice(totalItem)}
                        </td>
                      </>
                    ) : (
                      <td className="py-3 text-right text-[#8A857C] italic">
                        Value Protected
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* GST Breakdown & Totals */}
        <div className="flex flex-col sm:flex-row justify-between pt-6 border-t border-[#111111] gap-6 text-xs">
          <div className="space-y-1.5 max-w-sm text-[#8A857C]">
            {!isGiftPackingSlip ? (
              <>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#111111] font-medium block">
                  GST Statutory Breakdown (Included in Price)
                </span>
                <div className="flex justify-between border-b border-[#E4DFD5] pb-1">
                  <span>Central GST (CGST 6%):</span>
                  <span className="tabular-nums font-mono text-[#111111]">{formatPrice(cgstAmount)}</span>
                </div>
                <div className="flex justify-between border-b border-[#E4DFD5] pb-1">
                  <span>State GST (SGST 6%):</span>
                  <span className="tabular-nums font-mono text-[#111111]">{formatPrice(sgstAmount)}</span>
                </div>
                <p className="text-[11px] pt-1 leading-relaxed">
                  * This is a computer-generated tax invoice issued in conformity with Section 31 of the Central Goods and Services Tax Act, 2017.
                </p>
              </>
            ) : (
              <div className="p-3 bg-[#F7F4EE] border border-[#E4DFD5] space-y-1">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#111111] font-medium block">
                  Gift Manifest Note
                </span>
                <p className="text-[11px] text-[#8A857C]">
                  Item commercial valuations omitted per patron gift instruction. Authenticity certificate enclosed within sealed garment box.
                </p>
                {order.gift_message && (
                  <p className="pt-2 font-serif italic text-xs text-[#111111] border-t border-[#E4DFD5]">
                    &ldquo;{order.gift_message}&rdquo;
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="w-full sm:w-72 space-y-2 text-[#8A857C]">
            {!isGiftPackingSlip ? (
              <>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="tabular-nums text-[#111111]">{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#B08D57]">
                    <span>Privilege Discount ({order.coupon_code}):</span>
                    <span className="tabular-nums">-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Atelier Insured Delivery:</span>
                  <span className="tabular-nums text-[#111111]">
                    {order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}
                  </span>
                </div>
                {order.gift_wrap && (
                  <div className="flex justify-between">
                    <span>Gift Packaging & Card:</span>
                    <span className="tabular-nums text-[#111111]">{formatPrice(order.gift_wrap_fee || 250)}</span>
                  </div>
                )}
                {order.cod_fee > 0 && (
                  <div className="flex justify-between">
                    <span>COD Handling:</span>
                    <span className="tabular-nums text-[#111111]">{formatPrice(order.cod_fee)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-[#111111] text-sm font-medium text-[#111111]">
                  <span>Invoice Total:</span>
                  <span className="tabular-nums">{formatPrice(order.total)}</span>
                </div>
              </>
            ) : (
              <div className="p-3 bg-[#F7F4EE] border border-[#E4DFD5] text-center text-xs space-y-1">
                <span className="text-[#111111] font-medium block">Bespoke Atelier Commission</span>
                <p className="text-[11px] text-[#8A857C]">Complimentary White-Glove Handover</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-8 border-t border-[#E4DFD5] text-center space-y-1 text-[11px] text-[#8A857C]">
          <p className="font-serif italic text-xs text-[#111111]">
            Thank you for commissioning your wardrobe with Maison Auré.
          </p>
          <p>
            For alterations, private appointments or concierge queries: concierge@maisonaure.com
          </p>
        </div>
      </div>
    </div>
  );
}
