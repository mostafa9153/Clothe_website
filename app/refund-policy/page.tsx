import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `Refund & Reimbursement Policy | ${brandConfig.name}`,
  description: `Official return, exchange, and refund guidelines for ${brandConfig.name}.`,
};

export default function RefundPolicyPage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Care" },
              { label: "Refund Policy" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Financial Transparency
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Refund &amp; Reimbursement Policy
          </h1>
          <p className="text-xs text-[#8A857C]">
            Detailed protocols on payment reversal, doorstep collection, and inspection verification.
          </p>
        </div>

        <div className="bg-white border border-[#E4DFD5] p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-[#111111] leading-relaxed font-light shadow-xs">
          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">1. Gracious 10-Day Return Window</h2>
            <p>
              Patrons may initiate a return or exchange request within {brandConfig.returnWindowDays} calendar days following confirmed delivery of the shipment.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">2. Inspection Criteria &amp; Verification</h2>
            <p>
              Upon arrival at our Colaba inspection workshop, every piece undergoes assessment by our quality conservators. Garments must meet the following baseline conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#8A857C]">
              <li>All original atelier security seals and hand-stitched tags remain attached.</li>
              <li>Garment is free of scent, cosmetic powder, laundering detergent, or alterations.</li>
              <li>Protective fabric dustbags and archival box are returned in reusable condition.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">3. Refund Method &amp; Timelines</h2>
            <p>
              Once approved, refunds are credited back to the original source instrument (credit/debit card, net banking, or UPI) within 48 to 72 business hours. For Cash on Delivery orders, our concierge will request your designated bank account details or UPI VPA to process an instantaneous electronic transfer.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">4. Damaged or Incomplete Shipments</h2>
            <p>
              Should a piece arrive damaged or deficient in any manner, please notify us within 24 hours of receipt via {brandConfig.contact.phone} or {brandConfig.contact.email} so we may arrange immediate prioritized replacement.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
