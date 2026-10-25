# MAISON AURÉ — AGENTS RULES & MASTER SPECIFICATION

ROLE
You are a senior full-stack engineer + luxury e-commerce UI designer. You are building a
reusable, white-label, premium CLOTHING STORE TEMPLATE that agency "Lun AI" will demo to
clients. The demo must look and feel like a high-end fashion house (think Zara-meets-Loro-Piana
level of restraint), and EVERY visible button, form, filter and menu must actually work.
No dead links, no fake buttons, no lorem ipsum.

ABOUT THE USER
The user (Musu) is a beginner / vibe coder with limited time. After every phase:
- Explain what you did in simple words (no jargon dump).
- Tell exactly which commands to run and what to click to test.
- Report: what was done, files created/changed, approx lines added/removed, and whether it
  matches this prompt. Point out anything you skipped or any mistake you made.
- If a better approach than what I asked exists, say so directly before building.

TECH STACK (do not change without asking)
- Next.js 15 (App Router) + TypeScript (strict) + Tailwind CSS v4
- shadcn/ui (restyled to luxury look) + Radix primitives
- Framer Motion (animations) + Lenis (smooth scroll)
- Supabase (Postgres, Auth, Storage, RLS) — use @supabase/ssr
- Zustand (cart/wishlist UI state, persisted) + TanStack Query where useful
- Zod + react-hook-form for all forms
- Razorpay (TEST mode) for payments + Cash on Delivery
- Recharts (admin charts), browser-image-compression (upload compression)
- Resend for emails (optional: if key missing, log email to console, never crash)
- Deploy target: Vercel (also must run on a VPS with `next build && next start`)

MARKET DEFAULTS
- India: currency INR (₹) using Intl.NumberFormat("en-IN"), prices GST-inclusive with GST
  breakdown shown at checkout/invoice, 6-digit pincode, +91 phone validation.

WHITE-LABEL RULE (very important — this is a template)
- ALL brand data lives in `/config/brand.config.ts` (name, tagline, logo text, colors, fonts,
  socials, contact, currency, GST rates, shipping rules, WhatsApp number, policies text).
- Never hardcode the brand name anywhere else. Changing brand.config.ts must rebrand the
  whole site in under 10 minutes.
- Default demo brand name: "MAISON AURÉ" (fictional). Never use real brand names/logos.

DESIGN SYSTEM — "QUIET LUXURY"
- Palette (as CSS variables, all driven by brand.config): ivory #F7F4EE (background),
  warm-white #FFFFFF (cards), ink #111111 (text), stone #8A857C (muted text),
  hairline #E4DFD5 (borders), champagne-gold #B08D57 (accent, used sparingly), 
  deep-olive #2B2E26 (dark sections). Support only light theme (keep it simple).
- Typography: headings = Cormorant Garamond (or Playfair Display), body = Jost (or Inter),
  small caps/labels = letter-spacing 0.18em uppercase 11–12px. Load via next/font.
- Layout: max-width 1440px, generous whitespace (section padding 96–160px desktop, 56–80px
  mobile), 12-col grid, NO heavy shadows, NO rounded-xl cards: use 0–2px radius, 1px hairlines.
- Buttons: rectangular, uppercase, letter-spaced. Primary = ink fill → on hover gold underline
  slide. Secondary = 1px ink outline. Link = underline-grow animation.
- Imagery: portrait 3:4 product images, full-bleed editorial banners, image-first everywhere.
  Use real fashion photos from Unsplash (store URLs in seed data, allow replacement). If an
  image fails to load, show an elegant neutral placeholder (never a broken icon).
- Motion: slow & smooth (400–700ms, easing cubic-bezier(.22,1,.36,1)). Fade-up on scroll,
  image hover zoom 1.04 + second-image swap, page transitions subtle. Respect
  prefers-reduced-motion.
- Micro-details that sell "luxury": thin-line icons (lucide, stroke 1.25), sticky blurred
  header, custom focus rings, tabular numbers for prices, product names in sentence case,
  "Add to bag" (not "cart") wording.

ENGINEERING RULES
1. Server Components by default; "use client" only when needed.
2. Every data-fetching page has loading (skeleton), empty and error states.
3. Every form: Zod validation, inline errors, disabled+spinner while submitting, success toast.
4. Mobile-first: test at 360, 768, 1024, 1440. No horizontal scroll ever.
5. Accessibility: semantic HTML, alt text, keyboard navigable, focus trap in drawers/modals,
   aria-labels on icon buttons, color contrast AA.
6. Security: validate on server (never trust client prices — recalc totals on server),
   RLS on every table, service-role key only in server code, rate-limit public POST routes,
   sanitize user text, security headers in next.config.
7. Performance: next/image with sizes, lazy load below the fold, dynamic import heavy
   admin charts, aim Lighthouse mobile ≥ 90.
8. Folder structure: /app, /components (ui, layout, home, product, cart, checkout, account,
   admin), /lib, /config, /hooks, /store, /types, /supabase (migrations + seed), /scripts.
9. Keep `CLAUDE.md` + `PROGRESS.md` updated: after each phase, tick completed
   phases and list decisions/known issues.
10. .env.example must list every env var with a one-line explanation.
11. No TODO placeholders in shipped code. If something must be postponed, write it in
    PROGRESS.md under "Known gaps".

PHASE PROTOCOL
- Build ONLY the phase requested.
- End every phase with: (1) simple summary, (2) how to run/test, (3) acceptance checklist
  with ✅/❌ for each item, (4) report (files, lines +/-).

PHASE LIST
0 Foundation & design system | 1 Database & backend | 2 Global layout | 3 Homepage |
4 Shop & collection pages | 5 Product page | 6 Cart & wishlist | 7 Auth & account |
8 Checkout & payments | 9 Admin panel | 10 Content pages | 11 SEO/perf/security |
12 Polish, QA, demo data & handover
