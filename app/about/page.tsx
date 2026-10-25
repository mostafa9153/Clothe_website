import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";

export const metadata: Metadata = {
  title: `The Atelier Heritage & Manifesto | ${brandConfig.name}`,
  description: brandConfig.description,
};

export default function AboutPage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "The House & Manifesto" },
            ]}
          />
        </div>

        <div className="space-y-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Atelier Manifesto
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-tight">
            Quiet Restraint. Natural Lineage.
          </h1>

          <div className="relative aspect-[16/9] w-full bg-[#E4DFD5]/40 overflow-hidden shadow-sm border border-[#E4DFD5]">
            <Image
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1400&q=85"
              alt="Maison Auré Workshop Philosophy"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-stone max-w-none text-sm md:text-base leading-relaxed text-[#111111] space-y-6 pt-4 font-light">
            <p>
              {brandConfig.name} was established on a radical commitment to quietude. In an age dominated by transient graphics and synthetic fast fashion, we design architectural garments celebrating unblended mulberry silk, raw tussar wild sericulture, 14-gauge Mongolian cashmere, and long-staple French flax linen.
            </p>
            <p>
              We produce strictly in small numbered atelier runs. Our tailors honor traditional sartorial standards: floating horsehair canvases, hand-rolled roulotté hems, and genuine horn fasteners harvested with sustainable provenance.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E4DFD5] space-y-4">
            <h3 className="font-heading text-2xl text-[#111111]">
              The Colaba Private Atelier
            </h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              {brandConfig.contact.address}
            </p>
            <p className="text-xs text-[#8A857C]">
              Patrons wishing to commission bespoke garments or inspect private collection archives may reserve private styling appointments.
            </p>
            <div className="pt-2">
              <Button asChild size="sm">
                <Link href="/consultation">Book Private Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
