import Link from "next/link";
import brandConfig from "@/config/brand.config";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between py-16 md:py-24 bg-[#F7F4EE]">
      <Container size="narrow" className="text-center my-auto">
        <Reveal>
          <div className="inline-flex items-center gap-2 border border-[#B08D57]/40 bg-[#B08D57]/5 px-3 py-1 mb-8">
            <Sparkles className="h-3.5 w-3.5 text-[#B08D57] stroke-[1.25]" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B08D57]">
              Phase 0 Complete • Foundation & Design System
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-normal tracking-tight text-[#111111] mb-6">
            {brandConfig.name}
          </h1>

          <p className="text-base md:text-lg font-light text-[#8A857C] max-w-lg mx-auto mb-10 leading-relaxed font-body">
            {brandConfig.tagline}. Designed for clients who seek architectural restraint, natural textiles, and quiet luxury.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="primary">
              <Link href="/design-system" className="flex items-center gap-2">
                <span>Explore Design System</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#about-framework" className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5" />
                <span>Architecture Spec</span>
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>

      <Container size="default" id="about-framework" className="pt-16 border-t border-[#E4DFD5]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white border border-[#E4DFD5]">
            <span className="label-caps text-[#B08D57] block mb-2">01 / Palette & Type</span>
            <h3 className="text-xl font-heading mb-2">Cormorant & Jost</h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              Ivory (#F7F4EE) background, warm white cards, ink typography, and restrained champagne gold accents.
            </p>
          </div>
          <div className="p-6 bg-white border border-[#E4DFD5]">
            <span className="label-caps text-[#B08D57] block mb-2">02 / White Label Core</span>
            <h3 className="text-xl font-heading mb-2">brand.config.ts</h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              Single-file white-label branding allowing complete store rebranding in under 10 minutes.
            </p>
          </div>
          <div className="p-6 bg-white border border-[#E4DFD5]">
            <span className="label-caps text-[#B08D57] block mb-2">03 / Kinetic Experience</span>
            <h3 className="text-xl font-heading mb-2">Lenis & Framer</h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              Inertial smooth scrolling with cubic-bezier fade-up scroll choreography and reduced-motion fallbacks.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
