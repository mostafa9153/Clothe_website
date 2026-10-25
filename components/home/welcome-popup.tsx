"use client";

import * as React from "react";
import Image from "next/image";
import { X, ArrowRight, Check } from "lucide-react";
import brandConfig from "@/config/brand.config";
import { Button } from "@/components/ui/button";

export function WelcomePopup() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    const seen = localStorage.getItem("maison_aure_welcome_popup_seen");
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 8000); // Trigger after 8 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("maison_aure_welcome_popup_seen", "true");
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    localStorage.setItem("maison_aure_welcome_popup_seen", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#F7F4EE] border border-[#E4DFD5] shadow-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2">
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 p-1.5 text-[#8A857C] hover:text-[#111111] transition-colors z-20"
          aria-label="Dismiss invitation"
        >
          <X className="w-5 h-5 stroke-[1.25]" />
        </button>

        {/* Visual Editorial Image */}
        <div className="relative aspect-[3/4] sm:h-full bg-[#E4DFD5]/40 hidden sm:block">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
            alt="Maison Auré Welcome Invitation"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Side */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-4 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
            Private Client Registry
          </span>

          <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[#111111] leading-tight">
            Welcome to {brandConfig.name}
          </h3>

          <p className="text-xs text-[#8A857C] leading-relaxed">
            Register your email to receive an instant 10% privilege on your opening order and private styling access.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client email address..."
                className="w-full bg-[#FFFFFF] border border-[#E4DFD5] px-3.5 py-2.5 text-xs text-[#111111] placeholder:text-[#8A857C] focus:outline-none focus:border-[#111111]"
                required
              />
              <Button type="submit" className="w-full text-xs uppercase tracking-[0.2em] py-3">
                Unlock Welcome Privilege
              </Button>
            </form>
          ) : (
            <div className="p-4 bg-[#FFFFFF] border border-[#B08D57]/40 space-y-2 text-center animate-in fade-in">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#111111] font-medium">
                <Check className="w-4 h-4 text-[#B08D57]" />
                <span>Privilege Unlocked</span>
              </div>
              <span className="font-mono text-sm tracking-widest font-bold text-[#111111] block">
                WELCOME10
              </span>
              <button
                onClick={handleDismiss}
                className="text-[11px] uppercase tracking-wider text-[#B08D57] hover:underline block mx-auto pt-1"
              >
                Continue to Atelier
              </button>
            </div>
          )}

          <button
            onClick={handleDismiss}
            className="text-[10px] uppercase tracking-widest text-[#8A857C] hover:text-[#111111] transition-colors pt-2 block"
          >
            No thank you, I prefer full price
          </button>
        </div>
      </div>
    </div>
  );
}
