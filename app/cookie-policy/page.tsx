import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `Cookie & Privacy Preference Policy | ${brandConfig.name}`,
  description: `How ${brandConfig.name} uses essential cookies for bag persistence, patron sessions, and security.`,
};

export default function CookiePolicyPage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Legal & Governance" },
              { label: "Cookie Policy" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Technical Discretion
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Cookie &amp; Local Storage Policy
          </h1>
          <p className="text-xs text-[#8A857C]">
            How we maintain your shopping bag, authentication token, and site preferences with minimal digital footprint.
          </p>
        </div>

        <div className="bg-white border border-[#E4DFD5] p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-[#111111] leading-relaxed font-light shadow-xs">
          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">1. What We Store &amp; Why</h2>
            <p>
              {brandConfig.name} uses minimal client-side cookies and browser storage strictly required to deliver our luxury e-commerce experience. We do not employ third-party tracking networks to profile our patrons across external web domains.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">2. Cookie Categories</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5]">
                <h3 className="font-medium text-[#111111] mb-1">Essential Functional Cookies</h3>
                <p className="text-xs text-[#8A857C]">
                  Required for bag persistence across browser tabs, patron account session validation, security token exchange, and coupon verification. These cannot be disabled.
                </p>
              </div>

              <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5]">
                <h3 className="font-medium text-[#111111] mb-1">Preference &amp; Wishlist Storage</h3>
                <p className="text-xs text-[#8A857C]">
                  Retains saved wardrobe items in your personal wishlist and records cookie banner consent acknowledgment.
                </p>
              </div>

              <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5]">
                <h3 className="font-medium text-[#111111] mb-1">Telemetry &amp; Performance (Aggregated)</h3>
                <p className="text-xs text-[#8A857C]">
                  Anonymized diagnostic telemetry to measure page speed, server response times, and checkout completion reliability.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-2xl text-[#111111]">3. Managing Your Browser Cookies</h2>
            <p>
              You may configure your browser settings to decline or clear cookies at any time. Please note that disabling functional cookies will disrupt bag persistence and prevent secure checkout authentication.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
