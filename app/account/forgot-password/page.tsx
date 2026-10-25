"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    toast.success("Password reset instructions dispatched to your email.");
  };

  return (
    <div className="py-16 md:py-24 bg-[#F7F4EE] min-h-[75vh] flex items-center">
      <Container size="narrow">
        <div className="bg-white border border-[#E4DFD5] p-8 sm:p-12 space-y-6">
          <Breadcrumb
            items={[
              { label: "Atelier", href: "/" },
              { label: "Account", href: "/account/login" },
              { label: "Reset Password" },
            ]}
          />

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C]">
              Security Concierge
            </span>
            <h1 className="font-heading text-3xl font-normal text-[#111111]">
              Reset Patron Password
            </h1>
          </div>

          {submitted ? (
            <div className="space-y-4 py-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-green-50 text-green-700 flex items-center justify-center border border-green-200">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl text-[#111111]">
                Instructions Dispatched
              </h3>
              <p className="text-xs text-[#8A857C] max-w-sm mx-auto leading-relaxed">
                If an atelier patron record exists for <strong>{email}</strong>, a secure password recovery dispatch has been sent.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="text-xs uppercase tracking-wider">
                  <Link href="/account/login">Return to Sign In</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <p className="text-[#8A857C] leading-relaxed">
                Please enter the email associated with your atelier record. We will dispatch a single-use verification link to restore access.
              </p>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                  Patron Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. patron@domain.com"
                    required
                    className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 pl-9 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                  <Mail className="w-4 h-4 text-[#8A857C] absolute left-3 top-3 stroke-[1.25]" />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="text-xs uppercase tracking-[0.2em] py-3.5 flex-1">
                  Dispatch Reset Link
                </Button>
                <Button asChild variant="outline" className="text-xs uppercase tracking-[0.2em] py-3.5">
                  <Link href="/account/login">Cancel</Link>
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
