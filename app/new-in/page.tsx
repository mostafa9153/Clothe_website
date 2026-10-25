import { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogView } from "@/components/shop/catalog-view";
import { MOCK_CATEGORIES } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `New Arrivals This Season | ${brandConfig.name}`,
  description: "Inspect recently released pieces from the Maison Auré atelier. Limited batch creations in pure natural fibers.",
};

export default function NewInPage() {
  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "New Arrivals" },
            ]}
          />
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight">
            New In This Season
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] max-w-2xl leading-relaxed">
            Freshly completed additions from our ateliers in Biella and Lake Como. Unlined cashmere, structured gabardine, and 24-momme silk bias slips.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-xs text-[#8A857C]">Loading new arrivals...</div>}>
          <CatalogView
            categories={MOCK_CATEGORIES}
            initialNew={true}
          />
        </Suspense>
      </Container>
    </div>
  );
}
