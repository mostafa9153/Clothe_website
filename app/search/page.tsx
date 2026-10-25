import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogView } from "@/components/shop/catalog-view";
import { MOCK_CATEGORIES, getMockProducts } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}" | ${brandConfig.name}` : `Atelier Search | ${brandConfig.name}`,
    description: `Search results for "${q || ""}" in Maison Auré luxury garments and textiles.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const cleanQuery = q.trim();

  // Simple "Did you mean" suggestions if unusual query
  const suggestions: Record<string, string> = {
    coton: "cotton",
    silke: "silk",
    cashemere: "cashmere",
    pant: "trousers",
    trouser: "trousers",
    jacket: "outerwear",
  };
  const didYouMean = suggestions[cleanQuery.toLowerCase()];

  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Search" },
              ...(cleanQuery ? [{ label: `"${cleanQuery}"` }] : []),
            ]}
          />

          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight">
            {cleanQuery ? (
              <span>
                Search Results for <span className="italic font-light">&ldquo;{cleanQuery}&rdquo;</span>
              </span>
            ) : (
              <span>Atelier Search Archive</span>
            )}
          </h1>

          {didYouMean && (
            <p className="text-xs text-[#8A857C]">
              Did you mean:{" "}
              <Link
                href={`/search?q=${encodeURIComponent(didYouMean)}`}
                className="text-[#B08D57] font-medium underline underline-offset-2"
              >
                {didYouMean}
              </Link>
              ?
            </p>
          )}

          <p className="text-xs sm:text-sm text-[#8A857C] max-w-2xl leading-relaxed">
            Search our curated index of natural textiles, seasonal silhouettes, and numbered artisan productions.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-xs text-[#8A857C]">Searching catalog...</div>}>
          <CatalogView
            categories={MOCK_CATEGORIES}
            initialSearch={cleanQuery}
          />
        </Suspense>
      </Container>
    </div>
  );
}
