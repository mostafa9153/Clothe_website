import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import brandConfig from "@/config/brand.config";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Toaster } from "@/components/ui/toast";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { RouteScrollToTop } from "@/components/layout/scroll-to-top";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maisonaure.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${brandConfig.name} — ${brandConfig.tagline}`,
    template: `%s | ${brandConfig.name}`,
  },
  description: brandConfig.description,
  openGraph: {
    title: `${brandConfig.name} — ${brandConfig.tagline}`,
    description: brandConfig.description,
    url: siteUrl,
    siteName: brandConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandConfig.name} — ${brandConfig.tagline}`,
    description: brandConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maisonaure.com";

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: brandConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: brandConfig.contact.address,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brandConfig.contact.phone,
      contactType: "concierge",
      areaServed: "IN",
    },
    sameAs: [
      brandConfig.socials.instagram,
      brandConfig.socials.pinterest,
      brandConfig.socials.facebook,
      brandConfig.socials.twitter,
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandConfig.name,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-[#F7F4EE] text-[#111111] flex flex-col justify-between selection:bg-[#B08D57]/20 selection:text-[#111111]"
      >
        <LenisProvider>
          <RouteScrollToTop />
          <AnnouncementBar />
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
          <Toaster position="bottom-right" />
        </LenisProvider>
      </body>
    </html>
  );
}
