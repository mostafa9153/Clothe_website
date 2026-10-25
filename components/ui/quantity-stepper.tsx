"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function QuantityStepper({
  value,
  min = 1,
  max = 10,
  onChange,
  disabled = false,
  className,
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border border-[#E4DFD5] bg-white h-11",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min || disabled}
        className="w-10 h-full flex items-center justify-center text-[#111111] hover:bg-[#F7F4EE] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3 stroke-[1.5]" />
      </button>

      <span className="w-12 text-center text-xs font-medium tabular-nums select-none text-[#111111]">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max || disabled}
        className="w-10 h-full flex items-center justify-center text-[#111111] hover:bg-[#F7F4EE] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3 stroke-[1.5]" />
      </button>
    </div>
  );
}
