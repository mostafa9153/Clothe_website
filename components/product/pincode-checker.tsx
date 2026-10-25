"use client";

import * as React from "react";
import { Check, AlertCircle, MapPin } from "lucide-react";
import { checkMockPincode } from "@/lib/data/mock-db";

export function PincodeChecker() {
  const [pincode, setPincode] = React.useState("");
  const [result, setResult] = React.useState<{
    serviceable: boolean;
    codAvailable?: boolean;
    estimatedDelivery?: string;
    message: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) return;
    const res = checkMockPincode(pincode);
    setResult(res);
  };

  return (
    <div className="space-y-2 pt-2 border-t border-[#E4DFD5]">
      <div className="flex items-center gap-1.5 text-xs text-[#111111] font-medium uppercase tracking-wider">
        <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
        <span>Check Atelier Delivery & COD</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Enter 6-digit PIN code (e.g. 400001, 110001)"
          className="flex-1 bg-white border border-[#E4DFD5] px-3 py-1.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111] font-mono"
          maxLength={6}
        />
        <button
          type="submit"
          className="px-4 py-1.5 bg-[#111111] text-white text-xs uppercase tracking-wider hover:bg-[#B08D57] transition-colors"
        >
          Check
        </button>
      </form>

      {result && (
        <div
          className={`p-3 border text-xs space-y-1 animate-in fade-in ${
            result.serviceable
              ? "bg-white border-[#B08D57]/40 text-[#111111]"
              : "bg-red-50/50 border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center gap-1.5 font-medium">
            {result.serviceable ? (
              <Check className="w-4 h-4 text-[#B08D57]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{result.message}</span>
          </div>
          {result.serviceable && result.estimatedDelivery && (
            <div className="text-[11px] text-[#8A857C] pl-5 space-y-0.5">
              <p>Estimated Express Arrival: <strong className="text-[#111111] font-medium">{result.estimatedDelivery}</strong></p>
              <p>Cash on Delivery: <span className="text-green-700 font-medium">Available</span></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
