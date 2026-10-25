import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "full";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12",
          size === "default" && "max-w-[1440px]",
          size === "narrow" && "max-w-[1040px]",
          size === "full" && "max-w-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
