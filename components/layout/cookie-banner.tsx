"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem("amzad_cookie_consent") || localStorage.getItem("maison_aure_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("amzad_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("amzad_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy and cookies"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-30 max-w-sm bg-[#FFFFFF] border border-[#E4DFD5] shadow-2xl p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="space-y-3">
        <h4 className="font-heading text-base text-[#111111]">Client Privacy & Cookies</h4>
        <p className="text-xs text-[#8A857C] leading-relaxed">
          We use essential cookies to maintain bag contents and measure atelier visits with strict
          client discretion. No third-party behavioral profiling is ever conducted.
        </p>
        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            onClick={handleAccept}
            className="text-[10px] tracking-widest uppercase px-4 py-1.5"
          >
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecline}
            className="text-[10px] tracking-widest uppercase px-4 py-1.5"
          >
            Decline
          </Button>
        </div>
      </div>
    </aside>
  );
}
