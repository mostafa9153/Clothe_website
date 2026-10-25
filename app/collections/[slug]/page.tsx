import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogView } from "@/components/shop/catalog-view";
import { TheDrop } from "@/components/home/the-drop";
import { getMockCollectionBySlug, MOCK_CATEGORIES } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = getMockCollectionBySlug(slug);
  if (!col) return { title: "Collection Not Found" };

  return {
    title: `${col.name} | ${brandConfig.name}`,
    description: col.description || `Explore ${col.name} capsule at ${brandConfig.name}.`,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getMockCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  // Check if drop is upcoming
  const isUpcomingDrop =
    collection.is_drop &&
    collection.launch_at &&
    new Date(collection.launch_at).getTime() > Date.now();

  return (
    <div className="w-full bg-[#F7F4EE]">
      {/* Full-bleed Editorial Banner */}
      <div className="relative w-full h-[40vh] min-h-[300px] max-h-[460px] bg-[#111111] overflow-hidden">
        {collection.banner_image && (
          <Image
            src={collection.banner_image}
            alt={collection.name}
            fill
            priority
            className="object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-12 text-white">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D8C8] mb-2 font-medium">
            {collection.is_drop ? "✦ Strictly Limited Capsule Drop" : "Atelier Capsule"}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
            {collection.name}
          </h1>
          <p className="text-xs sm:text-sm text-white/85 max-w-xl mt-2 font-light">
            {collection.description}
          </p>
        </div>
      </div>

      <div className="py-10 md:py-16">
        <Container>
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "Atelier", href: "/" },
                { label: "Collections", href: "/collections" },
                { label: collection.name },
              ]}
            />
          </div>

          {/* If collection is drop and not yet launched, show interactive countdown + notify form instead of grid */}
          {isUpcomingDrop ? (
            <div className="space-y-8">
              <TheDrop dropCollection={collection} />
            </div>
          ) : (
            <Suspense fallback={<div className="py-20 text-center text-xs text-[#8A857C]">Loading capsule pieces...</div>}>
              <CatalogView
                categories={MOCK_CATEGORIES}
                initialCollection={collection.slug}
              />
            </Suspense>
          )}
        </Container>
      </div>
    </div>
  );
}
