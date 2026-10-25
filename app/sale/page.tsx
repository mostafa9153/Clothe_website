import { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogView } from "@/components/shop/catalog-view";
import { MOCK_CATEGORIES } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `Private Archive Sale | ${brandConfig.name}`,
  description: "Limited privileges on archival garments from past atelier productions.",
};

export default function SalePage() {
  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Archive Sale" },
            ]}
          />
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight">
            Private Archive Sale
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] max-w-2xl leading-relaxed">
            Final remaining allocations of our seasonal editions, offered with privileged courtesies to our private client circle.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-xs text-[#8A857C]">Loading archive pieces...</div>}>
          <CatalogView
            categories={MOCK_CATEGORIES}
            initialSale={true}
          />
        </Suspense>
      </Container>
    </div>
  );
}
