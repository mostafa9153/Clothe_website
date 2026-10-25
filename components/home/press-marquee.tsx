"use client";

import * as React from "react";

const PRESS_NAMES = [
  "VOGUE ATELIER",
  "HARPER'S BAZAAR ARCHIVES",
  "THE MONOCLE REPORT",
  "ARCHITECTURAL DIGEST STYLE",
  "ELLE HAUTE COUTURE",
  "L'OFFICIEL CURATION",
  "FINANCIAL TIMES HOW TO SPEND IT",
  "ROBB REPORT LUXURY",
];

export function PressMarquee() {
  return (
    <div className="w-full bg-[#FFFFFF] border-y border-[#E4DFD5] py-5 overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-6 mb-2 text-center">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A857C] font-medium">
          As Featured & Critiqued In
        </span>
      </div>
      <div className="flex w-max animate-marquee space-x-12 sm:space-x-16 items-center">
        {/* Double array for seamless loop */}
        {[...PRESS_NAMES, ...PRESS_NAMES].map((name, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-12 sm:space-x-16"
          >
            <span className="font-heading text-xs sm:text-sm tracking-[0.22em] text-[#8A857C] hover:text-[#111111] transition-colors whitespace-nowrap cursor-default">
              {name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
