"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShieldCheck, ArrowRight, Lock, Mail, User, Phone, CheckCircle2 } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/account";
  const adminRequired = searchParams.get("adminRequired") === "1";

  const [activeTab, setActiveTab] = React.useState<"signin" | "register">("signin");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = React.useState("customer@demo.com");
  const [signInPassword, setSignInPassword] = React.useState("password123");

  // Register Form State
  const [regName, setRegName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPhone, setRegPhone] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Authentication failed.");
        toast.error(data.error || "Authentication failed.");
      } else {
        toast.success(`Welcome back, ${data.user.name}`);
        if (data.user.role === "admin" && returnUrl === "/account") {
          router.push("/admin");
        } else {
          router.push(returnUrl);
        }
        router.refresh();
      }
    } catch {
      setErrorMsg("A network error occurred while connecting to the atelier.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: regName,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Registration could not be completed.");
        toast.error(data.error || "Registration could not be completed.");
      } else {
        toast.success("Welcome to Maison Auré. Privilege code WELCOME10 has been issued.");
        router.push(returnUrl);
        router.refresh();
      }
    } catch {
      setErrorMsg("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (role: "customer" | "admin") => {
    if (role === "customer") {
      setSignInEmail("customer@demo.com");
      setSignInPassword("password123");
      toast.info("Filled credentials for Demo Patron (Alisha Singhania)");
    } else {
      setSignInEmail("admin@demo.com");
      setSignInPassword("adminpassword123");
      toast.info("Filled credentials for Atelier Director (Marc Aurèle)");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col justify-center">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 bg-white border border-[#E4DFD5] shadow-xs my-8 sm:my-14 overflow-hidden">
        {/* Left Column: Editorial Imagery (lg:col-span-6) */}
        <div className="relative hidden lg:flex lg:col-span-6 bg-[#111111] text-white flex-col justify-between p-12 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
            alt="Maison Auré Haute Couture"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />

          {/* Top Label */}
          <div className="relative z-10 space-y-1">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B08D57] font-medium block">
              Maison Auré • Private Circle
            </span>
            <p className="font-heading text-2xl font-normal text-white">
              The Sanctuary of Quiet Poise
            </p>
          </div>

          {/* Bottom Testimonial */}
          <div className="relative z-10 space-y-3 max-w-md pt-20">
            <p className="font-serif italic text-sm text-[#F7F4EE] leading-relaxed">
              &ldquo;Maison Auré represents a return to garments made with architectural discipline and genuine human touch.&rdquo;
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8A857C]">
              <span>— Vogue Atelier Review, February 2026</span>
            </div>
          </div>
        </div>

        {/* Right Column: Auth Form (lg:col-span-6) */}
        <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A857C] block mb-1">
                Patron Identification
              </span>
              <h1 className="font-heading text-3xl font-normal text-[#111111]">
                {activeTab === "signin" ? "Private Client Record" : "Request Atelier Registry"}
              </h1>
              {adminRequired && (
                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  Administrative credentials required to enter Atelier Director Portal.
                </div>
              )}
            </div>

            {/* Tab Switcher */}
            <div className="flex border-b border-[#E4DFD5]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("signin");
                  setErrorMsg(null);
                }}
                className={`flex-1 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors border-b-2 -mb-[1px] ${
                  activeTab === "signin"
                    ? "border-[#111111] text-[#111111]"
                    : "border-transparent text-[#8A857C] hover:text-[#111111]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setErrorMsg(null);
                }}
                className={`flex-1 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors border-b-2 -mb-[1px] ${
                  activeTab === "register"
                    ? "border-[#111111] text-[#111111]"
                    : "border-transparent text-[#8A857C] hover:text-[#111111]"
                }`}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Fast Demo Shortcuts */}
            <div className="p-3 bg-[#F7F4EE] border border-[#E4DFD5] text-xs space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#8A857C] block font-medium">
                One-Click Evaluation Credentials
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setDemoCredentials("customer")}
                  className="px-2.5 py-1 bg-white border border-[#E4DFD5] hover:border-[#111111] text-[11px] text-[#111111] transition-colors"
                >
                  Patron (customer@demo.com)
                </button>
                <button
                  type="button"
                  onClick={() => setDemoCredentials("admin")}
                  className="px-2.5 py-1 bg-white border border-[#B08D57] hover:bg-[#B08D57] hover:text-white text-[11px] text-[#B08D57] transition-colors"
                >
                  Director / Admin (admin@demo.com)
                </button>
              </div>
            </div>

            {/* Sign In Form */}
            {activeTab === "signin" ? (
              <form onSubmit={handleSignIn} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                    Patron Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="e.g. patron@domain.com"
                      required
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 pl-9 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    <Mail className="w-4 h-4 text-[#8A857C] absolute left-3 top-3 stroke-[1.25]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                      Password *
                    </label>
                    <Link
                      href="/account/forgot-password"
                      className="text-[11px] text-[#8A857C] hover:text-[#111111] underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 pl-9 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    <Lock className="w-4 h-4 text-[#8A857C] absolute left-3 top-3 stroke-[1.25]" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-xs uppercase tracking-[0.2em] py-4"
                >
                  {loading ? "Authenticating..." : "Access Private Record"}
                </Button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Alisha Singhania"
                      required
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 pl-9 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    <User className="w-4 h-4 text-[#8A857C] absolute left-3 top-3 stroke-[1.25]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. patron@domain.com"
                      required
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 pl-9 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    <Mail className="w-4 h-4 text-[#8A857C] absolute left-3 top-3 stroke-[1.25]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                    Mobile Phone (+91)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 pl-9 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    <Phone className="w-4 h-4 text-[#8A857C] absolute left-3 top-3 stroke-[1.25]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#111111] block">
                    Create Password * (min 6 characters)
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full bg-[#F7F4EE] border border-[#E4DFD5] p-2.5 pl-9 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    <Lock className="w-4 h-4 text-[#8A857C] absolute left-3 top-3 stroke-[1.25]" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-xs uppercase tracking-[0.2em] py-4"
                >
                  {loading ? "Registering..." : "Create Patron Account"}
                </Button>
              </form>
            )}
          </div>

          <div className="pt-8 border-t border-[#E4DFD5] flex items-center justify-between text-[11px] text-[#8A857C]">
            <Link href="/track-order" className="hover:text-[#111111] underline">
              Guest Order Tracking
            </Link>
            <Link href="/" className="hover:text-[#111111] underline">
              Return to Atelier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </React.Suspense>
  );
}

