import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MOCK_JOURNAL_POSTS } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `The Atelier Journal | ${brandConfig.name}`,
  description: "Essays in natural fibers, quiet tailoring, and slow-production provenance.",
};

export default function JournalIndexPage() {
  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        <div className="mb-12 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "The Journal" },
            ]}
          />
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight">
            The Atelier Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] max-w-2xl leading-relaxed">
            Written dispatches exploring 24-momme sericulture, virgin cashmere harvesting, and the philosophy of quiet luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MOCK_JOURNAL_POSTS.map((post) => (
            <article key={post.id} className="group flex flex-col space-y-4">
              <Link
                href={`/journal/${post.slug}`}
                className="relative aspect-[16/10] bg-[#E4DFD5]/40 overflow-hidden block border border-[#E4DFD5]"
              >
                <Image
                  src={post.cover_image || ""}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C]">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Atelier Dispatch"}
                </span>
                <h3 className="font-heading text-2xl font-normal text-[#111111] group-hover:text-[#B08D57] transition-colors leading-snug">
                  <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#8A857C] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/journal/${post.slug}`}
                    className="text-xs uppercase tracking-wider underline underline-offset-4 text-[#111111] hover:text-[#B08D57] inline-flex items-center gap-1.5"
                  >
                    <span>Read Full Essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
