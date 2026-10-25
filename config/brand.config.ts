export interface BrandConfig {
  name: string;
  tagline: string;
  logoText: string;
  description: string;
  colors: {
    ivory: string;
    warmWhite: string;
    ink: string;
    stone: string;
    hairline: string;
    champagneGold: string;
    deepOlive: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  socials: {
    instagram: string;
    pinterest: string;
    facebook: string;
    twitter: string;
  };
  whatsapp: {
    number: string;
    prefilledMessage: string;
  };
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  gst: {
    rateBelowThreshold: number; // 5%
    rateAboveThreshold: number; // 12%
    thresholdAmount: number;    // ₹1000
  };
  shipping: {
    freeAbove: number;          // ₹2999
    flatRate: number;           // ₹99
    codFee: number;             // ₹49
    estimatedDays: string;      // "3–6 business days"
  };
  returnWindowDays: number;     // 10
  policies: {
    shippingAndReturns: string;
    privacy: string;
    terms: string;
    careGuide: string;
    authenticity: string;
  };
}

export const brandConfig: BrandConfig = {
  name: "MAISON AURÉ",
  tagline: "Quiet Elegance. Timeless Craft.",
  logoText: "MAISON AURÉ",
  description: "An editorial atelier celebrating architectural silhouettes, natural fibers, and the art of subtle luxury.",
  colors: {
    ivory: "#F7F4EE",
    warmWhite: "#FFFFFF",
    ink: "#111111",
    stone: "#8A857C",
    hairline: "#E4DFD5",
    champagneGold: "#B08D57",
    deepOlive: "#2B2E26",
  },
  fonts: {
    heading: "Cormorant Garamond",
    body: "Jost",
  },
  contact: {
    email: "concierge@maisonaure.com",
    phone: "+91 (0) 22 4567 8900",
    address: "Atelier 14, The Heritage Arcade, Colaba, Mumbai 400001, India",
    hours: "Monday – Saturday, 10:00 AM – 7:00 PM IST",
  },
  socials: {
    instagram: "https://instagram.com/maisonaure",
    pinterest: "https://pinterest.com/maisonaure",
    facebook: "https://facebook.com/maisonaure",
    twitter: "https://x.com/maisonaure",
  },
  whatsapp: {
    number: "+919876543210",
    prefilledMessage: "Hello Maison Auré Concierge, I would like private styling assistance with a collection piece.",
  },
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
  },
  gst: {
    rateBelowThreshold: 5,
    rateAboveThreshold: 12,
    thresholdAmount: 1000,
  },
  shipping: {
    freeAbove: 2999,
    flatRate: 99,
    codFee: 49,
    estimatedDays: "3–6 business days",
  },
  returnWindowDays: 10,
  policies: {
    shippingAndReturns: "Complimentary courier delivery across India on orders over ₹2,999. Thoughtful 10-day door-step exchange and returns in immaculate, unwashed condition with original garment seals intact.",
    privacy: "Your discretion and trust are foundational. We never compromise your personal client record, reserving client information exclusively for order provenance and bespoke communication.",
    terms: "Every Maison Auré creation is produced in strictly limited runs to honor deliberate artisanal production. By ordering, you agree to our atelier delivery and bespoke care guidelines.",
    careGuide: "Crafted exclusively from unblended mulberry silk, high-twist French linen, and superfine merino. Dry clean or hand wash cold with pH-neutral silk detergent only. Flat dry in shade.",
    authenticity: "Each garment features an individual serial identification seal guaranteeing textile lineage and sustainable workshop provenance.",
  },
};

export default brandConfig;
