"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Atelier application error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-[#F7F4EE]">
      <div className="max-w-md space-y-5">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#B08D57]">
          Temporary Atelier Interruption
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl text-[#111111] font-normal">
          An Unexpected Error Occurred
        </h2>
        <p className="text-xs text-[#8A857C] leading-relaxed">
          Our digital concierges have been alerted. Please try refreshing this atelier view or return to our main catalog.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Button onClick={() => reset()} className="px-6">
            Try Again
          </Button>
          <Button asChild variant="outline" className="px-6">
            <Link href="/">Atelier Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
