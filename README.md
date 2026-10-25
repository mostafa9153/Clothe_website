# MAISON AURÉ — Luxury Clothing Store Template

A reusable, white-label, client-demo-ready luxury e-commerce platform built for high-end fashion ateliers and designer labels.

Designed with **quiet luxury** aesthetics: warm ivory textures, Cormorant Garamond typography, 0–2px radii, hairline architectural dividers, and buttery smooth Lenis scrolling.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components by default)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 + Radix Primitives + Custom Luxury Theme Tokens
- **Animations**: Framer Motion + Lenis Smooth Scroll
- **State Management**: Zustand (persisted cart & wishlist)
- **Database & Auth**: Supabase (@supabase/ssr, Postgres, Row-Level Security, Storage)
- **Forms & Validation**: Zod + React Hook Form
- **Payments**: Razorpay (Test mode) + Cash on Delivery (COD)
- **Market Defaults**: India — INR (₹), GST inclusive pricing, 6-digit pincode validation, +91 phone numbers

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project keys and Razorpay test credentials.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the storefront or [http://localhost:3000/design-system](http://localhost:3000/design-system) for the interactive component system.

---

## 🎨 White-Label Configuration

All brand identity parameters (name, tagline, typography, color palette, contact info, shipping rules, GST rates, policies) are controlled strictly in:
```
/config/brand.config.ts
```
To rebrand the store, modify `brand.config.ts` — no hardcoded brand strings exist across the application.
