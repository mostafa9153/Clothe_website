"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Bell, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Collection } from "@/types/database.types";

import { submitStockNotificationAction } from "@/app/actions/leads";

interface TheDropProps {
  dropCollection?: Collection;
}

export function TheDrop({ dropCollection }: TheDropProps) {
  const launchAtStr = dropCollection?.launch_at || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const launchTime = React.useMemo(() => new Date(launchAtStr).getTime(), [launchAtStr]);

  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLaunched: false,
  });

  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const diff = launchTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLaunched: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isLaunched: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [launchTime]);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      await submitStockNotificationAction({
        email,
        productId: dropCollection?.id,
      });
      setIsSubscribed(true);
      setEmail("");
    } catch {
      setIsSubscribed(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="relative py-24 md:py-36 bg-[#2B2E26] text-[#F7F4EE] overflow-hidden">
      {/* Background visual banner */}
      <div className="absolute inset-0 opacity-25">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2000&q=85"
          alt="The Drop Visual Atmosphere"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2B2E26]/80" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF]/10 backdrop-blur-xs border border-[#B08D57]/40 text-[#B08D57] text-[10px] uppercase tracking-[0.25em]">
            <Clock className="w-3.5 h-3.5" />
            <span>Strictly Limited Edition Drop • 50 Pieces Only</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-[#FFFFFF]">
            The Autumnal Solstice
          </h2>

          <p className="text-xs sm:text-sm text-[#F7F4EE]/80 max-w-xl mx-auto leading-relaxed">
            Constructed from rare undyed Scottish wool bouclé and raw handspun tussar wild silk.
            Each piece is individually numbered with hand-hammered antiqued brass seals.
          </p>

          {/* Countdown Display */}
          {!timeLeft.isLaunched ? (
            <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto py-4">
              <div className="bg-[#FFFFFF]/5 backdrop-blur-xs border border-white/10 p-4 sm:p-5">
                <span className="font-heading text-3xl sm:text-5xl font-light text-[#FFFFFF] tabular-nums">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#B08D57] mt-1">
                  Days
                </span>
              </div>
              <div className="bg-[#FFFFFF]/5 backdrop-blur-xs border border-white/10 p-4 sm:p-5">
                <span className="font-heading text-3xl sm:text-5xl font-light text-[#FFFFFF] tabular-nums">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#B08D57] mt-1">
                  Hours
                </span>
              </div>
              <div className="bg-[#FFFFFF]/5 backdrop-blur-xs border border-white/10 p-4 sm:p-5">
                <span className="font-heading text-3xl sm:text-5xl font-light text-[#FFFFFF] tabular-nums">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#B08D57] mt-1">
                  Mins
                </span>
              </div>
              <div className="bg-[#FFFFFF]/5 backdrop-blur-xs border border-white/10 p-4 sm:p-5">
                <span className="font-heading text-3xl sm:text-5xl font-light text-[#FFFFFF] tabular-nums">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#B08D57] mt-1">
                  Secs
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-[#FFFFFF]/10 backdrop-blur-xs border border-[#B08D57] max-w-md mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
                ✦ THE DROP IS NOW LIVE
              </span>
              <p className="text-xs text-white/90">
                The atelier has opened the registry for The Autumnal Solstice. Secure your numbered garment before allocation depletes.
              </p>
              <Button asChild className="w-full bg-[#FFFFFF] text-[#111111] hover:bg-[#B08D57] hover:text-white text-xs uppercase tracking-[0.2em]">
                <Link href="/collections/autumnal-solstice">Shop The Drop</Link>
              </Button>
            </div>
          )}

          {/* Notify Me Form (When countdown is active) */}
          {!timeLeft.isLaunched && (
            <div className="max-w-md mx-auto pt-2">
              {isSubscribed ? (
                <div className="p-4 bg-[#FFFFFF]/10 border border-[#B08D57]/40 flex items-center justify-center gap-2 text-xs text-[#E8D8C8]">
                  <Check className="w-4 h-4 text-[#B08D57]" />
                  <span>You are registered for 15-minute priority drop access.</span>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-2">
                  <div className="flex border-b border-[#F7F4EE]/50 focus-within:border-[#B08D57] pb-1 transition-colors">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter client email for drop notification..."
                      className="w-full bg-transparent text-xs text-[#FFFFFF] placeholder:text-[#8A857C] focus:outline-none"
                      disabled={loading}
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-xs uppercase tracking-[0.2em] text-[#B08D57] hover:text-[#FFFFFF] flex items-center gap-1.5 transition-colors pl-3 font-medium cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Notify Me</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-[#8A857C] block">
                    Clients on the notification list receive a 15-minute private reservation window before public release.
                  </span>
                </form>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
