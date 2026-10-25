import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors rounded-none select-none",
  {
    variants: {
      variant: {
        default:
          "border border-[#111111] bg-[#111111] text-[#F7F4EE]",
        secondary:
          "border border-[#E4DFD5] bg-[#F7F4EE] text-[#111111]",
        gold:
          "border border-[#B08D57] bg-[#B08D57]/10 text-[#967543]",
        olive:
          "border border-[#2B2E26] bg-[#2B2E26] text-[#F7F4EE]",
        sale:
          "border border-red-700 bg-red-700 text-white",
        outline:
          "border border-[#E4DFD5] text-[#111111]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
