import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center relative font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 uppercase tracking-[0.18em] text-[11px] rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] overflow-hidden select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#111111] text-[#F7F4EE] hover:bg-[#2B2E26] active:bg-[#000000] border border-[#111111] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B08D57] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
        secondary:
          "bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#F7F4EE] active:bg-[#2B2E26]",
        outline:
          "bg-transparent text-[#111111] border border-[#E4DFD5] hover:border-[#111111] hover:bg-white",
        ghost:
          "bg-transparent text-[#111111] hover:bg-[#E4DFD5]/40",
        link:
          "bg-transparent text-[#111111] p-0 h-auto normal-case tracking-normal hover:no-underline relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1px] after:bg-[#111111] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
        gold:
          "bg-[#B08D57] text-white hover:bg-[#967543] border border-[#B08D57]",
      },
      size: {
        default: "h-12 px-7 py-3",
        sm: "h-9 px-5 text-[10px]",
        lg: "h-14 px-10 text-[12px]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
