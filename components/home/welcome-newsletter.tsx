"use client";

import * as React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { subscribeNewsletterAction } from "@/app/actions/leads";


export function WelcomeNewsletter() {
  const [email, setEmail] = React.useState("");
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    try {
      await subscribeNewsletterAction({ email, source: "homepage_welcome" });
      setRevealed(true);
    } catch {
      setRevealed(true);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText("WELCOME10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF]">
      <Container>
        <div className="max-w-4xl mx-auto border border-[#E4DFD5] p-8 sm:p-14 bg-[#F7F4EE] text-center space-y-6 shadow-xs">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium">
            Atelier Privileges
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl text-[#111111] font-normal">
            Enjoy 10% Off Your Inaugural Commission
          </h2>

          <p className="text-xs sm:text-sm text-[#8A857C] max-w-lg mx-auto leading-relaxed">
            Register your client dossier to receive immediate privilege code reveal, complimentary styling invitations, and priority drop allocations.
          </p>

          {!revealed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-2 space-y-3">
              <div className="flex border-b border-[#111111] pb-1.5 focus-within:border-[#B08D57] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to unlock..."
                  className="w-full bg-transparent text-sm text-[#111111] placeholder:text-[#8A857C] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#B08D57] flex items-center gap-1.5 pl-3 transition-colors cursor-pointer"
                >
                  <span>Reveal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-white p-5 border border-[#B08D57]/40 space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center gap-2 text-xs text-[#2B2E26] font-medium">
                <Check className="w-4 h-4 text-[#B08D57]" />
                <span>Privilege code successfully activated:</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-xl tracking-[0.25em] font-bold text-[#111111] bg-[#F7F4EE] px-4 py-2 border border-[#E4DFD5]">
                  WELCOME10
                </span>
                <button
                  onClick={copyCode}
                  className="px-3 py-2 bg-[#111111] text-[#F7F4EE] hover:bg-[#B08D57] text-xs uppercase tracking-wider transition-colors"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <p className="text-[11px] text-[#8A857C]">
                Enter this code at checkout to deduct 10% from your order.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
