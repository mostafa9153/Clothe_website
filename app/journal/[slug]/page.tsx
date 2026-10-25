import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MOCK_JOURNAL_POSTS } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";
import { JournalShareButtons } from "@/components/journal/journal-share-buttons";

interface JournalSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JournalSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const post = MOCK_JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Essay Not Found" };

  return {
    title: `${post.title} | ${brandConfig.name} Journal`,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.cover_image ? [{ url: post.cover_image }] : [],
      type: "article",
      publishedTime: post.published_at || undefined,
    },
  };
}

export default async function JournalPostPage({ params }: JournalSlugProps) {
  const { slug } = await params;
  const post = MOCK_JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current post)
  const relatedPosts = MOCK_JOURNAL_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  // Estimate reading time (~200 words per minute)
  const wordCount = ((post.body || "") + " " + (post.excerpt || "")).split(/\s+/).length + 250;
  const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 200));

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    datePublished: post.published_at,
    author: {
      "@type": "Organization",
      name: brandConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: brandConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://maisonaure.com"}/logo.png`,
      },
    },
  };

  return (
    <article className="py-10 md:py-20 bg-[#F7F4EE]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Container size="narrow">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "The Journal", href: "/journal" },
              { label: post.title },
            ]}
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-[#8A857C] border-b border-[#E4DFD5] pb-4">
            <span className="text-[#B08D57] font-medium">
              Atelier Dispatch • {post.published_at ? new Date(post.published_at).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }) : "Atelier Dispatch"}
            </span>
            <span className="flex items-center gap-1.5 text-[#8A857C]">
              <Clock className="w-3.5 h-3.5 stroke-[1.25]" />
              <span>{readTimeMinutes} min reading time</span>
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-tight">
            {post.title}
          </h1>

          <p className="text-sm md:text-base text-[#8A857C] italic font-serif leading-relaxed border-l-2 border-[#B08D57] pl-4">
            {post.excerpt}
          </p>

          {post.cover_image && (
            <div className="relative aspect-[16/10] w-full bg-[#E4DFD5]/40 overflow-hidden my-8 shadow-xs border border-[#E4DFD5]">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-stone max-w-none text-sm md:text-base leading-relaxed text-[#111111] space-y-6 pt-4 font-light">
            <p>{post.body}</p>
            <p>
              In our workshops, each pattern is laid out with deliberate regard for the garment&apos;s grainline.
              When working with unblended mulberry silk or heavy Irish linen, even a two-degree deviation from
              the true bias compromises how the textile drapes when in movement.
            </p>
            <p>
              This is why our editions remain strictly limited. We refuse to compromise the slow cutting and
              hand-basting methods that separate true luxury garments from mass-produced consumer apparel.
            </p>
            <p>
              The result is a piece that does not merely hang upon the wearer, but responds to their presence.
              It is an invitation to inhabit silence with confidence.
            </p>
          </div>

          {/* Social Share Bar */}
          <div className="pt-8 border-t border-[#E4DFD5] mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">
              Share this Dispatch
            </span>
            <JournalShareButtons title={post.title} />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="pt-12 border-t border-[#E4DFD5] mt-12 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
                Further Dispatches
              </span>
              <h3 className="font-heading text-2xl text-[#111111]">
                Related Journal Essays
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((r) => (
                  <Link
                    key={r.id}
                    href={`/journal/${r.slug}`}
                    className="group bg-white border border-[#E4DFD5] p-5 space-y-3 block hover:shadow-xs transition-shadow"
                  >
                    {r.cover_image && (
                      <div className="relative aspect-[16/9] w-full bg-[#E4DFD5]/40 overflow-hidden">
                        <Image
                          src={r.cover_image}
                          alt={r.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <h4 className="font-heading text-lg text-[#111111] group-hover:text-[#B08D57] transition-colors line-clamp-2">
                      {r.title}
                    </h4>
                    <p className="text-xs text-[#8A857C] line-clamp-2">
                      {r.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-[#E4DFD5] mt-8">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#B08D57] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to All Atelier Dispatches</span>
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
