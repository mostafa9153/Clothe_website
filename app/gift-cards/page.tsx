"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import brandConfig from "@/config/brand.config";
import { formatPrice } from "@/lib/utils";
import { createGiftCardAction } from "@/app/actions/leads";
import { Gift, Check, Sparkles, Copy, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000];

export default function GiftCardsPage() {
  const [amount, setAmount] = React.useState<number>(10000);
  const [customAmount, setCustomAmount] = React.useState<string>("");
  const [isCustom, setIsCustom] = React.useState(false);
  const [recipientName, setRecipientName] = React.useState("");
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [senderName, setSenderName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [issuedCard, setIssuedCard] = React.useState<any | null>(null);

  const activeAmount = isCustom ? Number(customAmount) || 0 : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (activeAmount < 1000) {
      setErrorMsg("Gift card minimum denomination is ₹1,000.");
      return;
    }
    if (!recipientName || !recipientEmail || !senderName) {
      setErrorMsg("Please complete recipient and sender particulars.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createGiftCardAction({
        amount: activeAmount,
        recipient_name: recipientName,
        recipient_email: recipientEmail,
        sender_name: senderName,
        message,
      });

      if (!res.success) {
        setErrorMsg(res.message);
        toast.error(res.message);
      } else {
        setIssuedCard(res.card);
        toast.success(`${brandConfig.name} gift card generated successfully.`);
      }
    } catch {
      setErrorMsg("Unable to issue gift card at this moment. Please try again.");
      toast.error("Generation error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Gift card code copied to clipboard.");
  };

  return (
    <div className="py-10 md:py-20 bg-[#F7F4EE]">
      <Container size="default">
        <div className="mb-12 space-y-3 max-w-2xl">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Client Services" },
              { label: "Atelier Gift Privilege" },
            ]}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
            The Gift of Quiet Luxury
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#111111]">
            The Atelier Gift Card
          </h1>
          <p className="text-xs sm:text-sm text-[#8A857C] leading-relaxed">
            Bestow the privilege of choice. An archival electronic gift voucher redeemable across all ready-to-wear silhouettes, numbered drops, and bespoke private salon appointments.
          </p>
        </div>

        {issuedCard ? (
          /* Success Screen */
          <div className="max-w-2xl mx-auto bg-white border border-[#E4DFD5] p-8 sm:p-12 text-center space-y-6 shadow-md animate-in fade-in">
            <div className="w-14 h-14 bg-[#F7F4EE] border border-[#B08D57]/40 rounded-full flex items-center justify-center mx-auto text-[#B08D57]">
              <Check className="w-7 h-7 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
                Privilege Issued
              </span>
              <h2 className="font-heading text-3xl text-[#111111]">
                Gift Card Successfully Issued
              </h2>
              <p className="text-xs text-[#8A857C] max-w-md mx-auto leading-relaxed">
                An invitation with code and bespoke message has been prepared for <strong className="text-[#111111]">{issuedCard.recipient_email}</strong>.
              </p>
            </div>

            {/* Issued Code Card */}
            <div className="p-6 bg-[#2B2E26] text-[#F7F4EE] space-y-3 text-left border border-[#3D4233] relative">
              <div className="flex justify-between items-start">
                <span className="font-heading text-xl uppercase tracking-[0.2em] text-[#F7F4EE]">
                  {brandConfig.logoText}
                </span>
                <span className="font-mono text-sm text-[#B08D57] font-medium">
                  {formatPrice(issuedCard.current_balance)}
                </span>
              </div>
              <div className="pt-4 border-t border-[#3D4233] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#8A857C] block">
                    Redemption Voucher Code
                  </span>
                  <span className="font-mono text-base tracking-widest text-white font-medium">
                    {issuedCard.code}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(issuedCard.code)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xs transition-colors flex items-center gap-1.5 text-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/shop">Explore Catalog</Link>
              </Button>
              <Button
                onClick={() => {
                  setIssuedCard(null);
                  setRecipientName("");
                  setRecipientEmail("");
                  setMessage("");
                }}
              >
                Issue Another Privilege
              </Button>
            </div>
          </div>
        ) : (
          /* Interactive Configuration & Live Preview */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Configuration Form */}
            <div className="lg:col-span-7 bg-white border border-[#E4DFD5] p-8 sm:p-10 shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Amount Selection */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#111111] font-medium block">
                    1. Choose Privilege Denomination
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_AMOUNTS.map((amt) => {
                      const isSelected = !isCustom && amount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setIsCustom(false);
                            setAmount(amt);
                          }}
                          className={`py-3 px-2 border text-center font-medium transition-all ${
                            isSelected
                              ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                              : "bg-[#F7F4EE] text-[#111111] border-[#E4DFD5] hover:border-[#111111]"
                          }`}
                        >
                          {formatPrice(amt)}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCustom(!isCustom)}
                      className="text-[11px] uppercase tracking-wider text-[#B08D57] hover:underline"
                    >
                      {isCustom ? "Select standard denomination" : "Or enter custom denomination"}
                    </button>
                    {isCustom && (
                      <div className="pt-2">
                        <input
                          type="number"
                          min={1000}
                          step={500}
                          placeholder="Enter custom amount in ₹ (min ₹1,000)"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="space-y-3 pt-2 border-t border-[#E4DFD5]">
                  <span className="text-[11px] uppercase tracking-wider text-[#111111] font-medium block">
                    2. Recipient Particulars
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                        Recipient Full Name *
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="e.g. Gayatri Devi"
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                        Recipient Email Address *
                      </label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="recipient@domain.com"
                        className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Sender Details */}
                <div className="space-y-3 pt-2 border-t border-[#E4DFD5]">
                  <span className="text-[11px] uppercase tracking-wider text-[#111111] font-medium block">
                    3. Sender Particulars &amp; Bespoke Inscription
                  </span>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                      Your Name / Benefactor Name *
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Vikram Singhania"
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111]"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#8A857C] block mb-1">
                      Personal Message to Enclose
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="A personal word of celebration, affection, or gratitude to accompany the card..."
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-3 text-xs focus:outline-none focus:border-[#111111] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E4DFD5]">
                  <Button
                    type="submit"
                    disabled={isSubmitting || activeAmount < 1000}
                    className="w-full sm:w-auto px-8"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Generating Atelier Card...
                      </span>
                    ) : (
                      <span>Issue {formatPrice(activeAmount)} Gift Card</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right: Interactive Live Card Preview */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857C] font-medium block">
                Live Card Preview
              </span>

              {/* Luxury Card Mockup */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#2B2E26] via-[#1E211B] to-[#111111] text-[#F7F4EE] p-6 sm:p-8 flex flex-col justify-between border border-[#B08D57]/30 shadow-xl overflow-hidden rounded-xs">
                {/* Subtle luxury foil accent ring */}
                <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-[#B08D57]/20 pointer-events-none" />

                <div className="flex justify-between items-start z-10">
                  <div>
                    <span className="font-heading text-xl sm:text-2xl tracking-[0.22em] uppercase block">
                      {brandConfig.logoText}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#B08D57]">
                      Atelier Gift Privilege
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-xl sm:text-2xl text-[#F7F4EE]">
                      {formatPrice(activeAmount)}
                    </span>
                  </div>
                </div>

                <div className="z-10 space-y-2 my-auto py-2">
                  <p className="text-[11px] text-[#E4DFD5]/80 italic line-clamp-2">
                    &ldquo;{message || "A token of grace and timeless refinement."}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-end justify-between z-10 text-[10px] text-[#8A857C]">
                  <div>
                    <span className="uppercase tracking-wider block text-[8px] text-[#B08D57]">Prepared For</span>
                    <span className="text-white font-medium">{recipientName || "Valued Patron"}</span>
                  </div>
                  <div className="text-right">
                    <span className="uppercase tracking-wider block text-[8px] text-[#B08D57]">From</span>
                    <span className="text-white font-medium">{senderName || "Atelier Benefactor"}</span>
                  </div>
                </div>
              </div>

              {/* Terms of Card */}
              <div className="bg-white border border-[#E4DFD5] p-6 space-y-3 text-xs text-[#8A857C]">
                <h5 className="font-medium text-[#111111] text-xs">Gift Card Protocols</h5>
                <ul className="space-y-1.5 list-disc pl-4 text-[11px] leading-relaxed">
                  <li>Valid for 12 months from date of issuance.</li>
                  <li>Can be used across multiple purchases until balance is exhausted.</li>
                  <li>Applicable on all ready-to-wear, archival drops, and private fittings.</li>
                  <li>Instant delivery via authenticated email dispatch.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
