import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MOCK_JOURNAL_POSTS } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

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
  };
}

export default async function JournalPostPage({ params }: JournalSlugProps) {
  const { slug } = await params;
  const post = MOCK_JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Journal", href: "/journal" },
              { label: post.title },
            ]}
          />
        </div>

        <div className="space-y-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Atelier Dispatch • {post.published_at ? new Date(post.published_at).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }) : ""}
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-tight">
            {post.title}
          </h1>

          <p className="text-sm md:text-base text-[#8A857C] italic font-serif leading-relaxed">
            {post.excerpt}
          </p>

          {post.cover_image && (
            <div className="relative aspect-[16/10] w-full bg-[#E4DFD5]/40 overflow-hidden my-8 shadow-sm border border-[#E4DFD5]">
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
          </div>

          <div className="pt-12 border-t border-[#E4DFD5] mt-12">
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
