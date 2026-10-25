import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `Terms of Atelier Commission | ${brandConfig.name}`,
  description: `Official terms of service, bespoke purchase conditions, and artisanal standards for ${brandConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Legal & Governance" },
              { label: "Terms of Commission" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Artisanal Agreement
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Terms of Atelier Commission
          </h1>
          <p className="text-xs text-[#8A857C]">
            Effective Date: 25 February 2026 • Governing all client orders, commissions, and showroom consultations.
          </p>
        </div>

        <div className="bg-white border border-[#E4DFD5] p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-[#111111] leading-relaxed font-light shadow-xs">
          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">1. General Provisions &amp; Brand Philosophy</h2>
            <p>
              By accessing the digital atelier of {brandConfig.name} or placing an order, you enter into a binding agreement with the house. Each garment represents limited small-batch craftsmanship, produced with intentional time-intensive techniques rather than rapid assembly.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">2. Numbered Edition Production &amp; Stock Reservations</h2>
            <p>
              Garments are allocated on a strictly sequential basis. In the rare circumstance that parallel checkout completions occur exceeding available textile stock, our concierge will immediately contact you with the option of prioritized back-order allocation from the next atelier run or a complete immediate reimbursement.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">3. Pricing, GST &amp; Invoicing</h2>
            <p>
              All prices stated on our website are inclusive of statutory Goods and Services Tax (GST) in accordance with Indian commercial regulations. A formal tax invoice detailing applicable CGST, SGST, or IGST rates is issued with every order and remains downloadable via your Patron Account.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">4. Bespoke &amp; Custom Sizing Alterations</h2>
            <p>
              Garments modified to bespoke measurements or customized with monogramming are non-cancellable once cutting of cloth has commenced. Complimentary adjustments are provided to achieve proper drape.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">5. Intellectual Property</h2>
            <p>
              All imagery, architectural silhouettes, text, brand marks, and digital assets associated with {brandConfig.name} remain the exclusive intellectual property of the house and may not be reproduced without written authorization.
            </p>
          </div>

          <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5] text-[11px] text-[#8A857C]">
            <p className="font-medium text-[#111111]">Legal Compliance Note</p>
            <p>
              This terms framework is provided as a luxury template. Operating businesses must review jurisdiction-specific terms under the Consumer Protection Act and applicable Indian commerce guidelines.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
