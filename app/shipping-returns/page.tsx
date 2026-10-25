import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";
import { Truck, RotateCcw, ShieldCheck, Clock, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: `Shipping & Doorstep Returns Protocol | ${brandConfig.name}`,
  description: `Insured nationwide courier delivery and thoughtful 10-day doorstep exchange protocols for ${brandConfig.name}.`,
};

export default function ShippingReturnsPage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Care" },
              { label: "Shipping & Returns" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Atelier Logistics Protocol
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Shipping &amp; Returns Protocol
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] leading-relaxed">
            Every garment dispatched from our atelier is handled with meticulous archival care. Below is our complete framework for transit, delivery, and exchange.
          </p>
        </div>

        <div className="space-y-8">
          {/* Shipping Section */}
          <div className="bg-white border border-[#E4DFD5] p-8 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-[#E4DFD5] pb-4">
              <Truck className="w-5 h-5 text-[#B08D57]" />
              <h2 className="font-heading text-2xl text-[#111111]">
                Nationwide Insured Delivery
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#111111] font-light leading-relaxed">
              <p>
                <strong>Complimentary Delivery Threshold:</strong> Insured standard shipping is complimentary on all domestic orders exceeding ₹{brandConfig.shipping.freeAbove.toLocaleString("en-IN")}. For orders below this amount, a flat delivery fee of ₹{brandConfig.shipping.flatRate} is applied at checkout.
              </p>
              <p>
                <strong>Transit Timelines:</strong> Deliveries to major metropolitan hubs (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) are completed within 48 to 72 business hours. Deliveries to all other PIN codes across India require 3 to 6 business days.
              </p>
              <p>
                <strong>Archival Boxing:</strong> Garments are protected in reusable unbleached organic cotton dustbags, surrounded by acid-free tissue, and housed in an FSC-certified rigid archival carton to safeguard pristine silhouette structure.
              </p>
              <p>
                <strong>Cash on Delivery (COD):</strong> Available for domestic orders up to ₹25,000 for verified residential pincodes, accompanied by a nominal verification fee of ₹{brandConfig.shipping.codFee}.
              </p>
            </div>
          </div>

          {/* Returns Section */}
          <div className="bg-white border border-[#E4DFD5] p-8 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-[#E4DFD5] pb-4">
              <RotateCcw className="w-5 h-5 text-[#B08D57]" />
              <h2 className="font-heading text-2xl text-[#111111]">
                {brandConfig.returnWindowDays}-Day Doorstep Exchange &amp; Return
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#111111] font-light leading-relaxed">
              <p>
                We understand that experiencing fabric against the skin and assessing silhouette in your private mirror is essential. {brandConfig.name} extends a gracious {brandConfig.returnWindowDays}-day window from confirmed delivery date.
              </p>
              <p>
                <strong>Garment Condition Standards:</strong> Returned pieces must be immaculate—unwashed, unworn, free from perfume or cosmetic transfer, with all original atelier ribbon seals and dustbags intact.
              </p>
              <p>
                <strong>Doorstep Pickup:</strong> When an exchange or return is initiated through your Patron Account, our logistics partner collects the parcel directly from your doorstep with zero return shipping cost.
              </p>
              <p>
                <strong>Reimbursement:</strong> Once received and verified by our workshop inspection team, refunds are issued to the original payment method within 48 hours. For COD commissions, reimbursement is transferred directly to your nominated bank account via NEFT/UPI.
              </p>
            </div>
          </div>

          {/* Legal Disclaimer Note */}
          <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5] text-[11px] text-[#8A857C] space-y-1">
            <p className="font-medium text-[#111111]">Client Review Disclaimer</p>
            <p>
              This protocol is a standard luxury store policy template configured for {brandConfig.name}. Patrons and legal representatives should review bespoke jurisdiction terms before finalizing transactions.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
