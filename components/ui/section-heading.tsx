import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const displaySubtitle = subtitle || description;
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col max-w-2xl mb-12", alignmentClasses[align], className)}>
      {eyebrow && (
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B08D57] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-[#111111] font-normal leading-tight tracking-tight">
        {title}
      </h2>
      {displaySubtitle && (
        <p className="mt-3 text-sm md:text-base text-[#8A857C] font-normal leading-relaxed max-w-xl">
          {displaySubtitle}
        </p>
      )}
    </div>
  );
}
