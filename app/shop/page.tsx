import { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogView } from "@/components/shop/catalog-view";
import { MOCK_CATEGORIES } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `The Atelier Collection | ${brandConfig.name}`,
  description: "Explore the complete curation of unlined double cashmere overcoats, 24-momme mulberry silks, and bespoke tailoring.",
};

export default function ShopPage() {
  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        {/* Breadcrumb & Header */}
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "The Collection" },
            ]}
          />
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight">
            The Complete Atelier Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] max-w-2xl leading-relaxed">
            Every garment in our catalog is crafted in small, numbered ateliers with unhurried devotion to material longevity, architectural lines, and sustainable fiber sourcing.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-xs text-[#8A857C]">Loading atelier pieces...</div>}>
          <CatalogView categories={MOCK_CATEGORIES} />
        </Suspense>
      </Container>
    </div>
  );
}
