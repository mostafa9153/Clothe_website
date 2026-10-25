import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  rating: number; // 0 to 5
  totalReviews?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCount?: boolean;
}

export function RatingStars({
  rating,
  totalReviews,
  size = "sm",
  className,
  showCount = true,
}: RatingStarsProps) {
  const starSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center space-x-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = rating >= star;
          const isHalf = !isFilled && rating >= star - 0.5;

          return (
            <div key={star} className="relative">
              <Star
                className={cn(
                  starSizes[size],
                  "stroke-[1.25]",
                  isFilled
                    ? "fill-[#B08D57] text-[#B08D57]"
                    : "fill-transparent text-[#E4DFD5]"
                )}
              />
              {isHalf && (
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star
                    className={cn(
                      starSizes[size],
                      "stroke-[1.25] fill-[#B08D57] text-[#B08D57]"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showCount && totalReviews !== undefined && (
        <span className="text-xs text-[#8A857C] font-normal tabular-nums">
          ({totalReviews})
        </span>
      )}
    </div>
  );
}
