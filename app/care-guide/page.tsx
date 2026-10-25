import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import brandConfig from "@/config/brand.config";
import { Sparkles, Droplets, Sun, Wind, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: `Textile & Fiber Care Manifesto | ${brandConfig.name}`,
  description: `Archival care protocols for 24-momme mulberry silk, 14-gauge Mongolian cashmere, and Irish flax linen garments from ${brandConfig.name}.`,
};

export default function CareGuidePage() {
  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="narrow">
        <div className="mb-10 space-y-3">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Care" },
              { label: "Textile Care Guide" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Garment Longevity Protocol
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Textile Care &amp; Preservation Guide
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] leading-relaxed">
            Pure natural fibers age with exceptional beauty when treated with deliberate respect. Here are our atelier master guidelines for preserving the luster, drape, and tactile purity of your garments across generations.
          </p>
        </div>

        <div className="space-y-8">
          {/* Mulberry Silk */}
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Fiber 01 • Mulberry Silk (24 Momme)
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              Silk Gowns, Bias Slip Dresses &amp; Blouses
            </h3>
            <div className="text-xs sm:text-sm text-[#8A857C] space-y-3 leading-relaxed font-light">
              <p>
                <strong>Cleaning:</strong> Professional green dry cleaning is recommended. If hand washing at home, immerse in cold water (&le; 20&deg;C) with a specialized pH-neutral liquid silk wash. Never wring or twist bias seams.
              </p>
              <p>
                <strong>Drying &amp; Ironing:</strong> Press excess moisture between two clean white terry towels and dry flat in open shade away from direct sunlight. Steam gently on the reverse silk setting while the garment remains slightly damp.
              </p>
            </div>
          </div>

          {/* Cashmere & Fine Wool */}
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Fiber 02 • Mongolian Cashmere &amp; Merino Wool
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              Double-Breasted Coats, Knitwear &amp; Tailored Trousers
            </h3>
            <div className="text-xs sm:text-sm text-[#8A857C] space-y-3 leading-relaxed font-light">
              <p>
                <strong>Storage:</strong> Never hang fine knitwear on wire or narrow hangers; fold carefully in breathable cotton bags with natural cedarwood spheres to repel moths.
              </p>
              <p>
                <strong>Pilling Care:</strong> Natural wool pilling is a sign of long-staple softness, not defect. Remove surface fuzz gently using a dedicated cashmere comb, stroking in the direction of the knit grain.
              </p>
            </div>
          </div>

          {/* French & Irish Linen */}
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Fiber 03 • French &amp; Irish Flax Linen
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              Band Collar Shirts &amp; Unstructured Summer Blazers
            </h3>
            <div className="text-xs sm:text-sm text-[#8A857C] space-y-3 leading-relaxed font-light">
              <p>
                <strong>Washing:</strong> Machine wash cold on a delicate cycle using mild detergent. Flax fibers soften and gain character with successive washes.
              </p>
              <p>
                <strong>Embracing Wrinkles:</strong> The natural undulating creasing of pure linen is the hallmark of relaxed luxury. If a sharp finish is desired, iron with steam while damp using medium-high heat.
              </p>
            </div>
          </div>

          {/* Leather Goods */}
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Fiber 04 • Vegetable Tanned Leather
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              Totes, Belts &amp; Artisanal Accessories
            </h3>
            <div className="text-xs sm:text-sm text-[#8A857C] space-y-3 leading-relaxed font-light">
              <p>
                <strong>Patina:</strong> Untreated vegetable-tanned leather naturally darkens and develops a rich patina over time when exposed to natural oils and ambient light.
              </p>
              <p>
                <strong>Conditioning:</strong> Treat once or twice annually with organic beeswax leather balm. Wipe moisture immediately with an absorbent dry microfiber cloth.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
