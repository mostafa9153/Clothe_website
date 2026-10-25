import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMockProductBySlug, getMockReviews, MOCK_PRODUCTS } from "@/lib/data/mock-db";
import { ProductDetailView } from "@/components/product/product-detail-view";
import brandConfig from "@/config/brand.config";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getMockProductBySlug(slug);

  if (!product) {
    return {
      title: "Garment Not Found",
    };
  }

  const price = product.sale_price ?? product.base_price;
  const imageUrl = product.images[0]?.url || "";

  return {
    title: `${product.name} | ${brandConfig.name}`,
    description: product.short_desc || product.description || "",
    openGraph: {
      title: `${product.name} — ${brandConfig.name}`,
      description: product.short_desc || "",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.short_desc || "",
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getMockProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = getMockReviews(product.id);

  // Related products from same category
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 4);

  // Complete the look (3 curated cross-department pieces)
  const completeLookProducts = MOCK_PRODUCTS.filter(
    (p) => p.category_id !== product.category_id && p.id !== product.id
  ).slice(0, 3);

  // JSON-LD Structured Data Schema for Rich SEO
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.description || product.short_desc,
    sku: product.variants[0]?.sku || `MA-${product.id}`,
    brand: {
      "@type": "Brand",
      name: brandConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: `https://maisonaure.com/product/${product.slug}`,
      priceCurrency: brandConfig.currency.code,
      price: product.sale_price ?? product.base_price,
      availability:
        (product.total_stock ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: brandConfig.name,
      },
    },
    aggregateRating: product.avg_rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.avg_rating,
          reviewCount: product.reviews_count || reviews.length || 1,
        }
      : undefined,
  };

  return (
    <>
      {/* Insert JSON-LD Script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductDetailView
        product={product}
        reviews={reviews}
        relatedProducts={relatedProducts}
        completeLookProducts={completeLookProducts}
      />
    </>
  );
}
