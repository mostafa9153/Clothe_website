"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JournalPost } from "@/types/database.types";

interface JournalTeaserProps {
  posts: JournalPost[];
}

export function JournalTeaser({ posts }: JournalTeaserProps) {
  return (
    <section className="py-20 md:py-28 bg-[#F7F4EE] border-b border-[#E4DFD5]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="The Atelier Journal"
            title="Essays in Texture & Form"
            description="Explorations into rare sericulture, sartorial history, and quiet luxury philosophy."
          />
          <Link
            href="/journal"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#B08D57] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Read All Essays</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article key={post.id} className="group flex flex-col space-y-4">
              <Link href={`/journal/${post.slug}`} className="relative aspect-[16/10] bg-[#E4DFD5]/40 overflow-hidden block">
                <Image
                  src={post.cover_image || ""}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C]">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Editorial Dispatch"}
                </span>

                <h3 className="font-heading text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#B08D57] transition-colors leading-snug">
                  <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs text-[#8A857C] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/journal/${post.slug}`}
                    className="text-xs tracking-wider uppercase underline underline-offset-4 text-[#111111] hover:text-[#B08D57] inline-flex items-center gap-1 font-medium"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
