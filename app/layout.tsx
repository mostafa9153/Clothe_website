import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import brandConfig from "@/config/brand.config";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Toaster } from "@/components/ui/toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brandConfig.name} — ${brandConfig.tagline}`,
    template: `%s | ${brandConfig.name}`,
  },
  description: brandConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased min-h-screen bg-[#F7F4EE] text-[#111111] selection:bg-[#B08D57]/20 selection:text-[#111111]">
        <LenisProvider>
          {children}
          <Toaster position="bottom-right" />
        </LenisProvider>
      </body>
    </html>
  );
}
