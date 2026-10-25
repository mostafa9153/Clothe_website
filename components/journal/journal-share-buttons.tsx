"use client";

import * as React from "react";
import { MessageSquare, Twitter, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import brandConfig from "@/config/brand.config";

interface JournalShareButtonsProps {
  title: string;
}

export function JournalShareButtons({ title }: JournalShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Essay link copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Reading "${title}" from ${brandConfig.name}: `);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    }
  };

  const handleTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`"${title}" via ${brandConfig.name}`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleWhatsApp}
        className="px-3 py-1.5 border border-[#E4DFD5] bg-white hover:border-[#111111] text-[#111111] text-xs flex items-center gap-1.5 transition-colors"
        aria-label="Share via WhatsApp"
      >
        <MessageSquare className="w-3.5 h-3.5 text-[#B08D57]" />
        <span>WhatsApp</span>
      </button>

      <button
        onClick={handleTwitter}
        className="px-3 py-1.5 border border-[#E4DFD5] bg-white hover:border-[#111111] text-[#111111] text-xs flex items-center gap-1.5 transition-colors"
        aria-label="Share on X"
      >
        <Twitter className="w-3.5 h-3.5 text-[#111111]" />
        <span>Share on X</span>
      </button>

      <button
        onClick={handleCopy}
        className="px-3 py-1.5 border border-[#E4DFD5] bg-white hover:border-[#111111] text-[#111111] text-xs flex items-center gap-1.5 transition-colors"
        aria-label="Copy essay URL"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-600 font-medium">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-[#8A857C]" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
