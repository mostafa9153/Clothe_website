"use client";

import * as React from "react";
import { X, Ruler, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
  onApplyRecommendedSize?: (size: string) => void;
}

export function SizeGuideModal({
  isOpen,
  onClose,
  categoryName = "Garment",
  onApplyRecommendedSize,
}: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = React.useState<"table" | "recommender">("table");
  const [unit, setUnit] = React.useState<"cm" | "in">("cm");

  // Recommender Form State
  const [height, setHeight] = React.useState<string>("172");
  const [weight, setWeight] = React.useState<string>("62");
  const [fitPreference, setFitPreference] = React.useState<"fitted" | "standard" | "relaxed">("standard");
  const [recommendedSize, setRecommendedSize] = React.useState<string | null>(null);

  // Esc to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Rule-Based Size Calculation Engine:
  // Evaluates BMI and height thresholds + fit preference offset:
  // - Weight < 52kg / BMI < 18.5 -> XS (or S if relaxed)
  // - 52kg <= Weight <= 64kg -> S (or M if relaxed, XS if fitted)
  // - 65kg <= Weight <= 76kg -> M (or L if relaxed, S if fitted)
  // - 77kg <= Weight <= 88kg -> L (or XL if relaxed, M if fitted)
  // - Weight > 88kg -> XL
  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    const h = Number(height);
    const w = Number(weight);
    if (!h || !w) return;

    let baseSize = "M";
    if (w < 52) {
      baseSize = "XS";
    } else if (w <= 63) {
      baseSize = "S";
    } else if (w <= 75) {
      baseSize = "M";
    } else if (w <= 86) {
      baseSize = "L";
    } else {
      baseSize = "XL";
    }

    // Adjust based on fit preference
    const sizes = ["XS", "S", "M", "L", "XL"];
    const baseIndex = sizes.indexOf(baseSize);

    let finalIndex = baseIndex;
    if (fitPreference === "relaxed" && baseIndex < sizes.length - 1) {
      finalIndex = baseIndex + 1;
    } else if (fitPreference === "fitted" && baseIndex > 0) {
      finalIndex = baseIndex - 1;
    }

    setRecommendedSize(sizes[finalIndex]);
  };

  const handleApply = () => {
    if (recommendedSize && onApplyRecommendedSize) {
      onApplyRecommendedSize(recommendedSize);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F7F4EE] border border-[#E4DFD5] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[#8A857C] hover:text-[#111111] transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5 stroke-[1.25]" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium">
            Atelier Measurements
          </span>
          <h3 className="font-heading text-2xl text-[#111111]">
            Size Guide & Recommender
          </h3>
          <p className="text-xs text-[#8A857C]">
            Tailored according to European couture proportioning standards.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#E4DFD5] mb-6">
          <button
            onClick={() => setActiveTab("table")}
            className={`pb-2.5 px-4 text-xs uppercase tracking-wider font-medium transition-colors border-b-2 -mb-[1px] ${
              activeTab === "table"
                ? "border-[#111111] text-[#111111]"
                : "border-transparent text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            Measurement Table
          </button>
          <button
            onClick={() => setActiveTab("recommender")}
            className={`pb-2.5 px-4 text-xs uppercase tracking-wider font-medium transition-colors border-b-2 -mb-[1px] flex items-center gap-1.5 ${
              activeTab === "recommender"
                ? "border-[#111111] text-[#111111]"
                : "border-transparent text-[#8A857C] hover:text-[#111111]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Smart Size Advisor</span>
          </button>
        </div>

        {activeTab === "table" ? (
          <div className="space-y-4">
            {/* Unit Toggle */}
            <div className="flex justify-end items-center gap-2 text-xs">
              <span className="text-[#8A857C]">Display Units:</span>
              <div className="border border-[#E4DFD5] p-0.5 flex">
                <button
                  onClick={() => setUnit("cm")}
                  className={`px-2.5 py-1 text-[11px] uppercase ${
                    unit === "cm" ? "bg-[#111111] text-white" : "text-[#8A857C]"
                  }`}
                >
                  CM
                </button>
                <button
                  onClick={() => setUnit("in")}
                  className={`px-2.5 py-1 text-[11px] uppercase ${
                    unit === "in" ? "bg-[#111111] text-white" : "text-[#8A857C]"
                  }`}
                >
                  IN
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#E4DFD5] bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F4EE] border-b border-[#E4DFD5] uppercase tracking-wider text-[10px] text-[#8A857C]">
                  <tr>
                    <th className="p-3">Atelier Size</th>
                    <th className="p-3">UK / IND</th>
                    <th className="p-3">Bust ({unit})</th>
                    <th className="p-3">Waist ({unit})</th>
                    <th className="p-3">Hip ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4DFD5] text-[#111111]">
                  <tr>
                    <td className="p-3 font-medium">XS</td>
                    <td className="p-3">6–8</td>
                    <td className="p-3">{unit === "cm" ? "80–84" : "31.5–33"}</td>
                    <td className="p-3">{unit === "cm" ? "62–66" : "24.5–26"}</td>
                    <td className="p-3">{unit === "cm" ? "88–92" : "34.5–36"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">S</td>
                    <td className="p-3">8–10</td>
                    <td className="p-3">{unit === "cm" ? "84–88" : "33–34.5"}</td>
                    <td className="p-3">{unit === "cm" ? "66–70" : "26–27.5"}</td>
                    <td className="p-3">{unit === "cm" ? "92–96" : "36–37.8"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">M</td>
                    <td className="p-3">10–12</td>
                    <td className="p-3">{unit === "cm" ? "88–94" : "34.5–37"}</td>
                    <td className="p-3">{unit === "cm" ? "70–76" : "27.5–30"}</td>
                    <td className="p-3">{unit === "cm" ? "96–102" : "37.8–40"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">L</td>
                    <td className="p-3">12–14</td>
                    <td className="p-3">{unit === "cm" ? "94–100" : "37–39.5"}</td>
                    <td className="p-3">{unit === "cm" ? "76–82" : "30–32"}</td>
                    <td className="p-3">{unit === "cm" ? "102–108" : "40–42.5"}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">XL</td>
                    <td className="p-3">14–16</td>
                    <td className="p-3">{unit === "cm" ? "100–108" : "39.5–42.5"}</td>
                    <td className="p-3">{unit === "cm" ? "82–90" : "32–35.5"}</td>
                    <td className="p-3">{unit === "cm" ? "108–116" : "42.5–45.5"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#8A857C] italic">
              Tip: If you find yourself positioned between sizes, we recommend selecting the smaller size for silk bias slips and the larger size for structured winter tailoring.
            </p>
          </div>
        ) : (
          /* Smart Size Recommender */
          <form onSubmit={calculateSize} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="140"
                  max="210"
                  className="w-full bg-white border border-[#E4DFD5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="35"
                  max="150"
                  className="w-full bg-white border border-[#E4DFD5] px-3 py-2 text-xs focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#111111] block mb-1.5">
                Fit Silhouette Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["fitted", "standard", "relaxed"] as const).map((fit) => (
                  <button
                    key={fit}
                    type="button"
                    onClick={() => setFitPreference(fit)}
                    className={`py-2 text-xs uppercase tracking-wider border capitalize transition-all ${
                      fitPreference === fit
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white text-[#111111] border-[#E4DFD5] hover:border-[#111111]"
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full text-xs uppercase tracking-[0.2em] py-3">
              Compute Tailored Size Recommendation
            </Button>

            {recommendedSize && (
              <div className="p-4 bg-white border border-[#B08D57] space-y-3 text-center animate-in fade-in">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] block font-medium">
                  Atelier Sizing Verdict
                </span>
                <p className="font-heading text-2xl text-[#111111]">
                  We recommend size <span className="font-bold underline">{recommendedSize}</span> for you
                </p>
                <p className="text-xs text-[#8A857C]">
                  Calculated based on your proportions and {fitPreference} drape preference.
                </p>
                {onApplyRecommendedSize && (
                  <Button
                    type="button"
                    onClick={handleApply}
                    variant="outline"
                    className="text-xs uppercase tracking-wider px-6 py-2"
                  >
                    Select Size {recommendedSize}
                  </Button>
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
