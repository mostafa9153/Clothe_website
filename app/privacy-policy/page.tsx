import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `Client Privacy & Discretion Policy | ${brandConfig.name}`,
  description: `How ${brandConfig.name} protects patron discretion, personal information, and encrypted payment data.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Legal & Governance" },
              { label: "Privacy Policy" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Patron Confidentiality
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Privacy &amp; Data Discretion Policy
          </h1>
          <p className="text-xs text-[#8A857C]">
            Last Updated: 25 February 2026 • Effective for all global and domestic patrons.
          </p>
        </div>

        <div className="bg-white border border-[#E4DFD5] p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-[#111111] leading-relaxed font-light shadow-xs">
          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">1. Foundational Commitment</h2>
            <p>
              At {brandConfig.name}, client trust and personal discretion are paramount. We collect only information strictly necessary to execute your commissions, prepare bespoke alterations, and facilitate secure delivery of your numbered garments.
            </p>
            <p>
              We do not sell, rent, monetize, or trade client personal data or shopping history with third-party advertising brokers under any circumstances.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">2. Information Entrusted to Our Care</h2>
            <ul className="list-disc pl-5 space-y-2 text-[#8A857C]">
              <li><strong className="text-[#111111]">Identification &amp; Contact:</strong> Full name, telephone mobile number, email address, and delivery coordinates.</li>
              <li><strong className="text-[#111111]">Sartorial Sizing Profile:</strong> Fitting notes, silhouette preferences, and tailoring records for personalized consultations.</li>
              <li><strong className="text-[#111111]">Transaction Security:</strong> Encrypted payment tokens processed through PCI-DSS Level 1 compliant gateway partners (Razorpay). Full card details are never stored on our servers.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">3. Digital Communications &amp; Dispatches</h2>
            <p>
              Patrons who register for the Atelier Dispatches receive previews of upcoming limited editions and invitations to private showroom salons. You retain the absolute right to unsubscribe from dispatches at any moment via the link in each email or by contacting concierge@{brandConfig.name.toLowerCase().replace(/[^a-z]/g, "")}.com.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">4. Contact Our Data Protection Officer</h2>
            <p>
              For inquiries regarding data retention, deletion requests, or confidentiality matters, please reach our legal officer at {brandConfig.contact.email} or by mail addressed to:
            </p>
            <p className="italic text-[#8A857C]">
              Attn: Legal Governance, {brandConfig.name}<br />
              {brandConfig.contact.address}
            </p>
          </div>

          <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5] text-[11px] text-[#8A857C]">
            <p className="font-medium text-[#111111]">Notice to Enterprise Clients</p>
            <p>
              This document serves as the standard template privacy policy for the {brandConfig.name} white-label framework. Deploying clients must consult local legal counsel before commercial launch.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
