import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogView } from "@/components/shop/catalog-view";
import { getMockCategoryBySlug, MOCK_CATEGORIES } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getMockCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | ${brandConfig.name}`,
    description: `Discover curated ${category.name.toLowerCase()} at ${brandConfig.name}. Natural fibers, architectural drape, and quiet luxury.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getMockCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        {/* Breadcrumb & Header */}
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: category.name },
            ]}
          />
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight">
            {category.name}
          </h1>
          {category.description ? (
            <p className="text-xs sm:text-sm text-[#8A857C] max-w-2xl leading-relaxed">
              {category.description}
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-[#8A857C] max-w-2xl leading-relaxed">
              Browse {category.name}
            </p>
          )}
        </div>

        <Suspense fallback={<div className="py-20 text-center text-xs text-[#8A857C]">Loading department...</div>}>
          <CatalogView
            categories={MOCK_CATEGORIES}
            initialCategory={category.slug}
          />
        </Suspense>
      </Container>
    </div>
  );
}
