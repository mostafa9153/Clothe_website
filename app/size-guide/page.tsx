"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";
import { Ruler, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";

export default function SizeGuidePage() {
  const [unit, setUnit] = React.useState<"cm" | "in">("cm");
  const [activeGender, setActiveGender] = React.useState<"women" | "men">("women");

  // Conversion helper
  const val = (cmVal: number, inVal: number) => {
    return unit === "cm" ? `${cmVal} cm` : `${inVal} in`;
  };

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="default">
        {/* Header */}
        <div className="mb-10 space-y-3 max-w-2xl">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Care" },
              { label: "Size & Measurement Guide" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            Sartorial Proportions &amp; Fit
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            Interactive Size Guide
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] leading-relaxed">
            {brandConfig.name} silhouettes are engineered with architectural precision. Use our measurements to identify your exact size across standard European, UK, and US sizing systems.
          </p>
        </div>

        {/* Controls: Gender & Unit Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E4DFD5]">
          {/* Gender Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveGender("women")}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                activeGender === "women"
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#8A857C] border-[#E4DFD5] hover:text-[#111111]"
              }`}
            >
              Burkha &amp; Abaya Guide
            </button>
            <button
              onClick={() => setActiveGender("men")}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                activeGender === "men"
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#8A857C] border-[#E4DFD5] hover:text-[#111111]"
              }`}
            >
              Men&apos;s Panjabi &amp; Jubba
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-2 bg-white border border-[#E4DFD5] p-1 self-start sm:self-auto">
            <span className="text-[10px] uppercase tracking-wider text-[#8A857C] px-2 font-medium">
              Unit:
            </span>
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 text-xs transition-colors ${
                unit === "cm"
                  ? "bg-[#111111] text-white font-medium"
                  : "text-[#8A857C] hover:text-[#111111]"
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit("in")}
              className={`px-3 py-1 text-xs transition-colors ${
                unit === "in"
                  ? "bg-[#111111] text-white font-medium"
                  : "text-[#8A857C] hover:text-[#111111]"
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Measurement Tables */}
        <div className="bg-white border border-[#E4DFD5] overflow-x-auto shadow-xs mb-12">
          {activeGender === "women" ? (
            <table className="w-full text-xs text-left text-[#111111]">
              <thead className="bg-[#F7F4EE] border-b border-[#E4DFD5] text-[10px] uppercase tracking-[0.18em] text-[#8A857C]">
                <tr>
                  <th className="py-4 px-6 font-medium">Abaya Size</th>
                  <th className="py-4 px-6 font-medium">Recommended Height</th>
                  <th className="py-4 px-6 font-medium">Full Length</th>
                  <th className="py-4 px-6 font-medium">Chest / Bust</th>
                  <th className="py-4 px-6 font-medium">Sleeve Length</th>
                  <th className="py-4 px-6 font-medium">Modest Drape</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DFD5]">
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">Size 52</td>
                  <td className="py-4 px-6 text-[#8A857C]">5&apos;0&quot; – 5&apos;2&quot;</td>
                  <td className="py-4 px-6">{val(132, 52.0)}</td>
                  <td className="py-4 px-6">{val(106, 41.7)}</td>
                  <td className="py-4 px-6">{val(66, 26.0)}</td>
                  <td className="py-4 px-6 text-[#B08D57]">Floor Length</td>
                </tr>
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">Size 54</td>
                  <td className="py-4 px-6 text-[#8A857C]">5&apos;3&quot; – 5&apos;4&quot;</td>
                  <td className="py-4 px-6">{val(137, 54.0)}</td>
                  <td className="py-4 px-6">{val(111, 43.7)}</td>
                  <td className="py-4 px-6">{val(68, 26.8)}</td>
                  <td className="py-4 px-6 text-[#B08D57]">Floor Length</td>
                </tr>
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">Size 56</td>
                  <td className="py-4 px-6 text-[#8A857C]">5&apos;5&quot; – 5&apos;6&quot;</td>
                  <td className="py-4 px-6">{val(142, 56.0)}</td>
                  <td className="py-4 px-6">{val(116, 45.7)}</td>
                  <td className="py-4 px-6">{val(71, 28.0)}</td>
                  <td className="py-4 px-6 text-[#B08D57]">Floor Length</td>
                </tr>
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">Size 58</td>
                  <td className="py-4 px-6 text-[#8A857C]">5&apos;7&quot; – 5&apos;8&quot;</td>
                  <td className="py-4 px-6">{val(147, 58.0)}</td>
                  <td className="py-4 px-6">{val(121, 47.6)}</td>
                  <td className="py-4 px-6">{val(73, 28.7)}</td>
                  <td className="py-4 px-6 text-[#B08D57]">Floor Length</td>
                </tr>
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">Size 60</td>
                  <td className="py-4 px-6 text-[#8A857C]">5&apos;9&quot; – 5&apos;11&quot;</td>
                  <td className="py-4 px-6">{val(152, 60.0)}</td>
                  <td className="py-4 px-6">{val(126, 49.6)}</td>
                  <td className="py-4 px-6">{val(76, 29.9)}</td>
                  <td className="py-4 px-6 text-[#B08D57]">Floor Length</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs text-left text-[#111111]">
              <thead className="bg-[#F7F4EE] border-b border-[#E4DFD5] text-[10px] uppercase tracking-[0.18em] text-[#8A857C]">
                <tr>
                  <th className="py-4 px-6 font-medium">Atelier Size</th>
                  <th className="py-4 px-6 font-medium">Collar</th>
                  <th className="py-4 px-6 font-medium">Chest Circumference</th>
                  <th className="py-4 px-6 font-medium">Waist</th>
                  <th className="py-4 px-6 font-medium">Shoulder Width</th>
                  <th className="py-4 px-6 font-medium">Sleeve Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DFD5]">
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">38 / S</td>
                  <td className="py-4 px-6">{val(38, 15.0)}</td>
                  <td className="py-4 px-6">{val(96, 37.8)}</td>
                  <td className="py-4 px-6">{val(84, 33.1)}</td>
                  <td className="py-4 px-6">{val(44, 17.3)}</td>
                  <td className="py-4 px-6">{val(63, 24.8)}</td>
                </tr>
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">40 / M</td>
                  <td className="py-4 px-6">{val(40, 15.7)}</td>
                  <td className="py-4 px-6">{val(102, 40.2)}</td>
                  <td className="py-4 px-6">{val(89, 35.0)}</td>
                  <td className="py-4 px-6">{val(46, 18.1)}</td>
                  <td className="py-4 px-6">{val(64.5, 25.4)}</td>
                </tr>
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">42 / L</td>
                  <td className="py-4 px-6">{val(42, 16.5)}</td>
                  <td className="py-4 px-6">{val(108, 42.5)}</td>
                  <td className="py-4 px-6">{val(95, 37.4)}</td>
                  <td className="py-4 px-6">{val(48, 18.9)}</td>
                  <td className="py-4 px-6">{val(66, 26.0)}</td>
                </tr>
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">44 / XL</td>
                  <td className="py-4 px-6">{val(44, 17.3)}</td>
                  <td className="py-4 px-6">{val(114, 44.9)}</td>
                  <td className="py-4 px-6">{val(101, 39.8)}</td>
                  <td className="py-4 px-6">{val(50, 19.7)}</td>
                  <td className="py-4 px-6">{val(67.5, 26.6)}</td>
                </tr>
                <tr className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-4 px-6 font-medium">46 / XXL</td>
                  <td className="py-4 px-6">{val(46, 18.1)}</td>
                  <td className="py-4 px-6">{val(120, 47.2)}</td>
                  <td className="py-4 px-6">{val(107, 42.1)}</td>
                  <td className="py-4 px-6">{val(52, 20.5)}</td>
                  <td className="py-4 px-6">{val(69, 27.2)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* How to Measure Architectural Guide */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          <div className="md:col-span-5 bg-white border border-[#E4DFD5] p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Measurement Protocol
            </span>
            <h3 className="font-heading text-2xl text-[#111111]">
              How to Measure with Atelier Precision
            </h3>
            <p className="text-xs text-[#8A857C] leading-relaxed">
              For the most graceful silhouette, hold a soft dressmaker&apos;s measuring tape flat against your body. Do not pull tightly; allow one finger of ease between tape and skin.
            </p>
            <div className="p-4 bg-[#F7F4EE] border border-[#E4DFD5] space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#111111] font-medium block">
                Atelier Tip
              </span>
              <p className="text-[#8A857C]">
                If your measurements fall between two sizes, we advise selecting the larger size for relaxed drape tailoring, or contacting our concierge for custom hem modifications.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-white border border-[#E4DFD5] p-8 space-y-6">
            <div className="space-y-4 text-xs text-[#111111]">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="block font-medium">Bust / Chest</strong>
                  <span className="text-[#8A857C]">
                    Measure around the fullest part of your chest, keeping the tape level across your shoulder blades and breathing naturally.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="block font-medium">Natural Waist</strong>
                  <span className="text-[#8A857C]">
                    Measure around your natural waistline—the narrowest contour of your torso, typically 2–3 cm above your navel.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="block font-medium">Low Hips</strong>
                  <span className="text-[#8A857C]">
                    Stand with heels together and measure around the fullest circumference of your hips and seat (approximately 20 cm below the waist).
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="block font-medium">Shoulder Span &amp; Sleeve</strong>
                  <span className="text-[#8A857C]">
                    Measure from the tip of one shoulder blade across the cervical vertebra to the other shoulder point for tailored outerwear.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bespoke Fit Concierge Callout */}
        <div className="p-8 bg-[#2B2E26] text-[#F7F4EE] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-heading text-2xl text-white">
              Desire Custom Bespoke Proportions?
            </h4>
            <p className="text-xs text-[#E4DFD5]/80 max-w-xl">
              Our master tailor offers bespoke pattern drafting for patrons with unique silhouette proportions.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button asChild className="bg-white text-[#111111] hover:bg-[#B08D57] hover:text-white">
              <Link href="/book-consultation">Book Private Fitting</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
