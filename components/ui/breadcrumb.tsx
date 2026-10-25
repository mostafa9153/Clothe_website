import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-xs tracking-wider uppercase text-[#8A857C]", className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#111111] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast ? "text-[#111111] font-medium" : "")}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3 w-3 stroke-[1.25] text-[#8A857C]/60" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
