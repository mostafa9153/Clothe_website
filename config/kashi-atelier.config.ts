import { BrandConfig } from "./brand.config";

/**
 * SECOND WHITE-LABEL BRAND PROOF — "KASHI ATELIER"
 * 
 * Demonstrates how changing one configuration file rebrands the entire luxury store
 * in under 1 minute without altering any layout, database, or component code.
 */
export const kashiAtelierConfig: BrandConfig = {
  name: "KASHI ATELIER",
  tagline: "Sacred Handlooms. Heritage Sericulture.",
  logoText: "KASHI ATELIER",
  description: "An artisanal handloom atelier honoring generational weavers of Varanasi, pure gold zari brocades, and natural wild tussar silks.",
  colors: {
    ivory: "#FBF9F5",
    warmWhite: "#FFFFFF",
    ink: "#1C1917",
    stone: "#78716C",
    hairline: "#E7E5E4",
    champagneGold: "#D97706", // Amber / Zari gold accent
    deepOlive: "#292524",     // Deep warm charcoal
  },
  fonts: {
    heading: "Playfair Display",
    body: "Inter",
  },
  contact: {
    email: "concierge@kashiatelier.com",
    phone: "+91 (0) 542 250 8899",
    address: "Kashi Atelier Kothi, Assi Ghat Road, Varanasi 221005, Uttar Pradesh, India",
    hours: "Monday – Saturday, 10:30 AM – 7:30 PM IST",
  },
  socials: {
    instagram: "https://instagram.com/kashiatelier",
    pinterest: "https://pinterest.com/kashiatelier",
    facebook: "https://facebook.com/kashiatelier",
    twitter: "https://x.com/kashiatelier",
  },
  whatsapp: {
    number: "+919839012345",
    prefilledMessage: "Namaste Kashi Atelier Concierge, I would like to schedule an inspection of your heritage zari sarees and handlooms.",
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
    freeAbove: 3500,
    flatRate: 150,
    codFee: 50,
    giftWrapFee: 300,
    estimatedDays: "4–7 business days",
  },
  returnWindowDays: 7,
  policies: {
    shippingAndReturns: "Handcrafted parcels dispatched directly from our Assi Ghat workshops. Complimentary insured courier on orders exceeding ₹3,500. Thoughtful 7-day exchange window with unhandled loom seal intact.",
    privacy: "Kashi Atelier respects ancestral patron confidentiality. Your personal information and sizing records remain safeguarded under strict privacy protocols.",
    terms: "Every Kashi Atelier saree is an unrepeatable artisanal masterwork woven on wooden pit looms. Minor organic variations in zari weave represent true handloom provenance.",
    careGuide: "Strictly dry clean with green hydrocarbon methods only. Wrap in unbleached mulmul cloth; never store with chemical naphthalene balls.",
    authenticity: "Each piece is accompanied by a certified Silk Mark India handloom seal and weaver identification serial.",
  },
};

export default kashiAtelierConfig;
