export interface BrandConfig {
  name: string;
  tagline: string;
  logoText: string;
  description: string;
  imageStyle?: "product-only" | "with-models";
  colors: {
    ivory: string;
    warmWhite: string;
    ink: string;
    stone: string;
    hairline: string;
    champagneGold: string;
    deepOlive: string;
    deepEmerald?: string;
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
    freeAbove: number;          // ₹1999
    flatRate: number;           // ₹99
    codFee: number;             // ₹49
    giftWrapFee: number;        // ₹250
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
  name: "AMZAD HAYA",
  tagline: "Modest. Refined. Timeless.",
  logoText: "AMZAD HAYA",
  description: "An artisanal modest fashion house celebrating Islamic grace, premium Nida, Georgette, and purposeful everyday elegance.",
  imageStyle: "product-only",
  colors: {
    ivory: "#F7F4EE",
    warmWhite: "#FFFFFF",
    ink: "#111111",
    stone: "#8A857C",
    hairline: "#E4DFD5",
    champagneGold: "#B08D57",
    deepOlive: "#2B2E26",
    deepEmerald: "#1F3A33",
  },
  fonts: {
    heading: "Cormorant Garamond",
    body: "Jost",
  },
  contact: {
    email: "care@amzadhaya.com",
    phone: "+91 98301 23456",
    address: "Amzad Haya Studio, Park Circus, Kolkata, West Bengal 700017, India",
    hours: "Monday – Saturday, 10:00 AM – 7:30 PM IST",
  },
  socials: {
    instagram: "https://instagram.com/amzadhaya",
    pinterest: "https://pinterest.com/amzadhaya",
    facebook: "https://facebook.com/amzadhaya",
    twitter: "https://x.com/amzadhaya",
  },
  whatsapp: {
    number: "+919830123456",
    prefilledMessage: "Assalamu Alaikum Amzad Haya Concierge, I would like personal assistance with a modest collection piece.",
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
    freeAbove: 1999,
    flatRate: 99,
    codFee: 49,
    giftWrapFee: 250,
    estimatedDays: "3–6 business days",
  },
  returnWindowDays: 10,
  policies: {
    shippingAndReturns: "Complimentary courier delivery across India on orders over ₹1,999. Doorstep 10-day exchange and returns in unworn condition with original tags intact.",
    privacy: "Your discretion and trust are foundational. We never sell or share your personal information, reserving your details exclusively for order processing and bespoke support.",
    terms: "Every Amzad Haya garment is crafted with strict adherence to modest proportions, premium fabrics, and ethical workshop standards.",
    careGuide: "Crafted from premium Korean Nida, Japanese Georgette, and pure breathable cotton. Wash cold on gentle cycle with mild detergent. Hang to dry in shade, steam iron on reverse.",
    authenticity: "Each creation features an authentic Amzad Haya artisan seal ensuring genuine fabric lineage, opaque modest coverage, and impeccable stitching.",
  },
};

export default brandConfig;
