import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MOCK_COLLECTIONS } from "@/lib/data/mock-db";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `Curated Collections | ${brandConfig.name}`,
  description: "Explore seasonal drops and themed capsule ateliers from Maison Auré.",
};

export default function CollectionsPage() {
  return (
    <div className="py-10 md:py-16 bg-[#F7F4EE]">
      <Container>
        <div className="mb-12 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Collections" },
            ]}
          />
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight">
            Curated Collections & Capsules
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] max-w-2xl leading-relaxed">
            Thematic sartorial narratives developed around distinct geographic and material inspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {MOCK_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group flex flex-col space-y-4"
            >
              <div className="relative aspect-[16/10] bg-[#E4DFD5]/40 overflow-hidden shadow-sm border border-[#E4DFD5]">
                <Image
                  src={col.banner_image || ""}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {col.is_drop && (
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#111111] text-[#F7F4EE] text-[9px] uppercase tracking-[0.2em] font-medium">
                    ✦ Limited Drop Collection
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-normal text-[#111111] group-hover:text-[#B08D57] transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-[#8A857C] leading-relaxed line-clamp-2">
                  {col.description}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#111111] group-hover:text-[#B08D57] transition-colors">
                  <span>{col.is_drop ? "View Drop Countdown" : "Explore Capsule Pieces"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
