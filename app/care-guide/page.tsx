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
          {/* Dubai Nida */}
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Textile 01 • Pure Dubai Nida &amp; Zoom Crepe
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              Front-Open Burkhas, Butterfly Abayas &amp; French Jilbabs
            </h3>
            <div className="text-xs sm:text-sm text-[#8A857C] space-y-3 leading-relaxed font-light">
              <p>
                <strong>Cleaning:</strong> Hand wash or machine wash cold inside out using a gentle abaya wash or pH-neutral liquid detergent. Use a laundry mesh bag to protect snap closures and embroidery.
              </p>
              <p>
                <strong>Drying &amp; Steaming:</strong> Hang immediately on a contoured wide hanger to dry in shade. Use a handheld vertical garment steamer to release wrinkles; avoid pressing flat with hot dry irons to prevent surface sheen.
              </p>
            </div>
          </div>

          {/* Medina Silk & Chiffon */}
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Textile 02 • Authentic Medina Silk &amp; Korean Chiffon
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              Medina Silk Hijabs, Crinkle Stoles &amp; 3-Layer Niqabs
            </h3>
            <div className="text-xs sm:text-sm text-[#8A857C] space-y-3 leading-relaxed font-light">
              <p>
                <strong>Pin Care:</strong> Always use snag-free magnetic hijab pins to prevent puncturing delicate woven fibers. Never force sharp or serrated safety pins through fine silk scarves.
              </p>
              <p>
                <strong>Washing:</strong> Immerse in lukewarm water with gentle soap. Do not wring or scrub eye slits. Flat dry or hang over a smooth rail; dries within 20 minutes with zero odor retention.
              </p>
            </div>
          </div>

          {/* Egyptian Giza Cotton & Linen */}
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Textile 03 • Egyptian Giza Cotton &amp; Hand-Loomed Linen
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              Festive Eid Panjabis, Bandhgala Jubbas &amp; Kabli Sets
            </h3>
            <div className="text-xs sm:text-sm text-[#8A857C] space-y-3 leading-relaxed font-light">
              <p>
                <strong>Embroidery Protection:</strong> Turn garments inside out before washing to protect delicate zardozi and resham threadwork along collars and plackets. Dry clean recommended for silk-blend festive pieces.
              </p>
              <p>
                <strong>Ironing:</strong> Press while slightly damp with a medium-high steam iron. Iron embroidered regions from the reverse side over a soft towel to preserve three-dimensional embroidery relief.
              </p>
            </div>
          </div>

          {/* Bamboo Under-Scarves & Prayer Mats */}
          <div className="bg-white border border-[#E4DFD5] p-8 space-y-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Textile 04 • Organic Bamboo Viscose &amp; Turkish Velvet
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              Under-Scarf Inner Caps, Travel Jaynamaz &amp; Accessories
            </h3>
            <div className="text-xs sm:text-sm text-[#8A857C] space-y-3 leading-relaxed font-light">
              <p>
                <strong>Under-Cap Hygiene:</strong> Wash organic bamboo inner caps frequently in cold water to maintain natural elasticity and antimicrobial scalp breathability.
              </p>
              <p>
                <strong>Prayer Mat Maintenance:</strong> Spot-clean padded velvet prayer mats with a damp microfiber cloth. Store inside the travel clutch away from direct moisture.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
