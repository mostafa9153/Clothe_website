import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";
import { Sparkles, Shield, Compass, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `The Atelier Heritage & Craftsmanship Manifesto | ${brandConfig.name}`,
  description: `${brandConfig.name} atelier story: unblended mulberry silk, high-twist French linen, 14-gauge Mongolian cashmere, and slow sartorial heritage.`,
};

export default function AboutPage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="default">
        {/* Breadcrumb & Subheading */}
        <div className="mb-12 space-y-4 max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "The House & Manifesto" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            House Heritage & Sartorial Manifesto
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-tight">
            The Philosophy of Quiet Restraint.
          </h1>
          <p className="text-sm md:text-base text-[#8A857C] font-light leading-relaxed">
            {brandConfig.name} was conceived as an architectural antidote to disposable fashion. We operate at the intersection of raw tactile honesty, disciplined drape, and generational atelier tailoring.
          </p>
        </div>

        {/* Hero Editorial Atelier Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#E4DFD5]/40 overflow-hidden border border-[#E4DFD5] shadow-xs mb-16">
          <Image
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=85"
            alt={`${brandConfig.name} Workshop Philosophy`}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-[#E4DFD5]">
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Pillar 01
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">Tactile Provenance</h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              We select exclusively single-origin natural fibers: 24-momme mulberry silk from Karnataka, 14-gauge unbleached Mongolian cashmere, and heritage hand-spun Irish flax linen. No synthetic blends, no artificial polymers.
            </p>
          </div>

          <div className="bg-white border border-[#E4DFD5] p-8 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Pillar 02
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">Architectural Tailoring</h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              Every garment is draped directly on sculptural forms. From hand-basted horsehair lapels to bias-cut seams that move synchronously with human gait, our construction honors timeless bespoke sartorial discipline.
            </p>
          </div>

          <div className="bg-white border border-[#E4DFD5] p-8 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Pillar 03
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">Numbered Editions</h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              To resist overproduction and waste, our atelier releases pieces in strictly limited capsules of 50 to 150 units. Each garment is stamped with an archival serial mark ensuring authentic lineage.
            </p>
          </div>
        </div>

        {/* Story Section with Founder Note */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#E4DFD5]">
          <div className="lg:col-span-5 relative aspect-[3/4] bg-[#E4DFD5]/40 border border-[#E4DFD5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85"
              alt="Creative Director in Atelier"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
              Creative Director&apos;s Note
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111] leading-tight">
              &ldquo;Elegance is not about being noticed; it is about leaving a quiet impression that cannot be imitated.&rdquo;
            </h2>
            <div className="prose prose-stone text-xs sm:text-sm text-[#8A857C] space-y-4 font-light leading-relaxed">
              <p>
                When we founded {brandConfig.name}, our intention was never to participate in seasonal fashion cycles. We observed how modern wardrobes were inundated with loud branding and fleeting trends that deteriorate within months.
              </p>
              <p>
                Instead, we looked back at centuries of Indian textile excellence—the featherweight drape of Bengal muslins, the luminous luster of raw wild tussar, the enduring precision of master tailors who measured by eye and balanced with reverence.
              </p>
              <p>
                Our promise to you is absolute: garments that age with dignity, hold their form across decades, and feel like a second skin of quiet confidence.
              </p>
            </div>
            <div className="pt-2">
              <p className="font-heading text-xl text-[#111111]">Aarav &amp; Meera Singhania</p>
              <span className="text-[10px] uppercase tracking-widest text-[#8A857C]">
                Founders &amp; Atelier Curators
              </span>
            </div>
          </div>
        </div>

        {/* Sustainability & Artisanal Commitment */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-[#E4DFD5]">
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
              Conscious Stewardship
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[#111111]">
              Sartorial Responsibility &amp; Zero Plastic Promise
            </h2>
            <p className="text-xs sm:text-sm text-[#8A857C] font-light leading-relaxed">
              All {brandConfig.name} shipments arrive in reusable organic cotton dust bags, encased in FSC-certified unbleached cartons sealed with natural water-activated gummed tape. No petrochemical plastics, polyester bubble wraps, or synthetic polybags are permitted in our distribution process.
            </p>
            <ul className="space-y-3 text-xs text-[#111111]">
              <li className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                <span>Fair-wage craft master artisan partnerships in Mumbai &amp; Benares</span>
              </li>
              <li className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                <span>OEKO-TEX Standard 100 non-toxic certified herbal dyestuffs</span>
              </li>
              <li className="flex items-center gap-3">
                <HeartHandshake className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                <span>Complimentary lifetime seam repair service for all patrons</span>
              </li>
            </ul>
          </div>

          <div className="relative aspect-[4/3] bg-[#E4DFD5]/40 border border-[#E4DFD5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85"
              alt="Artisanal Handloom & Tailoring Workshop"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Private Showroom Call to Action */}
        <div className="pt-16">
          <div className="p-8 sm:p-12 bg-white border border-[#E4DFD5] flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
                Flagship Experience
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-[#111111]">
                Visit The Colaba Private Atelier
              </h3>
              <p className="text-xs text-[#8A857C] leading-relaxed">
                {brandConfig.contact.address}
              </p>
              <p className="text-xs text-[#8A857C]">
                Patrons wishing to inspect private archives, test bespoke swatches, or commission custom pieces may reserve a dedicated appointment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <Button asChild variant="outline" size="sm">
                <Link href="/lookbook">Explore Lookbook</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/book-consultation">
                  <span>Book Private Fitting</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
