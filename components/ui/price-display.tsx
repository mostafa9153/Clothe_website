import * as React from "react";
import { formatPrice, cn } from "@/lib/utils";

export interface PriceDisplayProps {
  price: number;
  salePrice?: number | null;
  size?: "sm" | "default" | "lg" | "xl";
  className?: string;
  showDiscountBadge?: boolean;
}

export function PriceDisplay({
  price,
  salePrice,
  size = "default",
  className,
  showDiscountBadge = true,
}: PriceDisplayProps) {
  const isSale = salePrice !== null && salePrice !== undefined && salePrice < price;
  const currentPrice = isSale ? salePrice : price;
  const discountPercent = isSale ? Math.round(((price - salePrice) / price) * 100) : 0;

  const sizeClasses = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base font-medium",
    xl: "text-xl font-medium",
  };

  return (
    <div className={cn("inline-flex items-center gap-2 flex-wrap tabular-nums", className)}>
      <span className={cn(sizeClasses[size], "text-[#111111] tracking-tight")}>
        {formatPrice(currentPrice)}
      </span>

      {isSale && (
        <>
          <span className={cn(sizeClasses[size], "text-[#8A857C] line-through text-xs font-normal")}>
            {formatPrice(price)}
          </span>
          {showDiscountBadge && (
            <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-medium bg-[#B08D57]/10 px-1.5 py-0.5 border border-[#B08D57]/20">
              Save {discountPercent}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
