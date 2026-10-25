import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex justify-center items-center space-x-1.5 py-8", className)}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center border border-[#E4DFD5] bg-white text-[#111111] transition-colors hover:border-[#111111] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4 stroke-[1.25]" />
      </button>

      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-10 w-10 items-center justify-center border text-xs font-medium tracking-wider transition-colors cursor-pointer",
              isCurrent
                ? "border-[#111111] bg-[#111111] text-[#F7F4EE]"
                : "border-[#E4DFD5] bg-white text-[#111111] hover:border-[#111111]"
            )}
            aria-current={isCurrent ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center border border-[#E4DFD5] bg-white text-[#111111] transition-colors hover:border-[#111111] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4 stroke-[1.25]" />
      </button>
    </nav>
  );
}
