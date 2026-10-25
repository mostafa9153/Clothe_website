import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            "flex min-h-[100px] w-full rounded-none border border-[#E4DFD5] bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-[#8A857C] transition-colors focus-visible:outline-none focus-visible:border-[#111111] focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-600 focus-visible:border-red-600",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-600 font-normal">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
