# MAISON AURÉ — 1-DAY CLIENT REBRANDING GUIDE

> **Agency Playbook for Lun AI**  
> How to take this template and deliver a fully custom, high-end e-commerce store for a new fashion client in under 24 hours.

---

## ⏱ 24-Hour Delivery Roadmap

| Time | Milestone | Action Items |
|---|---|---|
| **Hour 0 – 2** | Brand Identity Setup | Edit `brand.config.ts` with client palette, fonts, logos, and address |
| **Hour 2 – 5** | Catalog & Imagery | Replace mock photography with client lookbook & product flat-lays |
| **Hour 5 – 7** | Commerce Credentials | Configure live Razorpay, Supabase, and Resend domain records |
| **Hour 7 – 9** | Legal & Copy Review | Tailor return window, shipping policies, and atelier manifesto |
| **Hour 9 – 11** | QA Verification | Run automated smoke suite & verify on mobile viewports (360px–1440px) |
| **Hour 11 – 12** | Domain & Handover | Point DNS records, enable SSL, hand over `ADMIN_GUIDE.md` to client |

---

## 1. Brand Configuration (`/config/brand.config.ts`)

The entire site pulls its visual identity, contact coordinates, tax thresholds, and policy text from `/config/brand.config.ts`. You never need to touch React components to rebrand.

### Step-by-Step Customization:

```typescript
export const brandConfig: BrandConfig = {
  // 1. Basic Brand Info
  name: "YOUR CLIENT BRAND",
  tagline: "High-End Tailoring & Sustainable Silks",
  logoText: "YOUR BRAND",
  description: "An artisanal design house celebrating architectural drape.",

  // 2. Color Palette (Matches client's brand guidelines)
  colors: {
    ivory: "#FBF9F5",          // Page background
    warmWhite: "#FFFFFF",      // Card & drawer background
    ink: "#111111",            // Primary text & headings
    stone: "#78716C",          // Secondary muted text
    hairline: "#E7E5E4",       // 1px architectural borders
    champagneGold: "#C68B59",  // Accent button hover & badges
    deepOlive: "#292524",      // Footer & dark sections
  },

  // 3. Typography (Google Fonts loaded via next/font in app/layout.tsx)
  fonts: {
    heading: "Cormorant Garamond", // or Playfair Display, Cinzel, Bodoni Moda
    body: "Jost",                  // or Inter, Montserrat, Plus Jakarta Sans
  },

  // 4. Contact Coordinates
  contact: {
    email: "concierge@clientdomain.com",
    phone: "+91 22 1234 5678",
    address: "Atelier 10, Luxury Arcade, Bandra West, Mumbai 400050",
    hours: "Monday – Saturday, 10:00 AM – 7:00 PM IST",
  },

  // 5. WhatsApp Personal Stylist
  whatsapp: {
    number: "+919876543210",
    prefilledMessage: "Hello Concierge, I would like private styling guidance.",
  },

  // 6. Indian Commerce & Taxes
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
  },
  gst: {
    rateBelowThreshold: 5,   // 5% GST on apparel <= ₹1,000
    rateAboveThreshold: 12,  // 12% GST on apparel > ₹1,000
    thresholdAmount: 1000,
  },
  shipping: {
    freeAbove: 2999,         // Free shipping threshold in ₹
    flatRate: 99,            // Standard courier rate in ₹
    codFee: 49,              // Cash on Delivery handling fee
    giftWrapFee: 250,        // Gift wrap box fee
    estimatedDays: "3–6 business days",
  },
  returnWindowDays: 10,      // Number of days for exchange
};
```

*(Reference implementation: Inspect `/config/kashi-atelier.config.ts` to see how an ethnic Varanasi silk brand is modeled).*

---

## 2. Replacing Imagery & Lookbook

1. **Product Photography**:
   - Optimal portrait ratio: `3:4` (e.g., `1200 × 1600 px`).
   - Format: WebP or high-resolution JPEG (the Admin Panel automatically compresses uploads to WebP ≤ 300KB).
   - Store images in Supabase Storage bucket `products` or your CDN.
2. **Hero Banners**:
   - Aspect ratio: `16:9` desktop, `3:4` mobile.
   - Edit slides live via the Admin Panel at `/admin/content` without redeploying code.
3. **Lookbook**:
   - Update `LOOKBOOK_ITEMS` in `app/lookbook/page.tsx` with client campaign imagery and hotspot coordinates (`x: %, y: %`).

---

## 3. Connecting Live Services (`.env.local`)

```env
# 1. Supabase Database & Auth (From client's Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# 2. Razorpay Live Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# 3. Resend Transactional Email (Order confirmations, restock alerts)
RESEND_API_KEY=re_...
ADMIN_EMAIL=orders@clientdomain.com

# 4. Domain & Telemetry
NEXT_PUBLIC_SITE_URL=https://atelier.clientdomain.com
```

---

## 4. Testing & Handover Checklist

Before handing the keys to the client:
- [ ] Run `npx tsx scripts/audit-security-rls.ts` — verify 10/10 PASS.
- [ ] Run `npx tsx scripts/verify-full-store.ts` — verify 20/20 PASS.
- [ ] Complete a live test transaction with Razorpay Test Mode and Cash on Delivery.
- [ ] Verify legal disclaimers at `/shipping-returns`, `/privacy-policy`, and `/terms`.
- [ ] Provide the client staff with `ADMIN_GUIDE.md` and their admin login credentials.
