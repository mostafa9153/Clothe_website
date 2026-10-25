# MAISON AURÉ — BUILD PROGRESS & MEMORY

> **Autonomous Runner Tracking & Long-term Memory**
> Current Target: Run from **Phase 0** to **Phase 5** (STOP_AFTER_PHASE = 5).

---

## Overall Status

| Phase | Title | Status | Date Completed | Test Result | Known Issues / Gaps |
|---|---|---|---|---|---|
| **Phase 0** | Foundation & Design System | ✅ COMPLETE | 2026-10-26 | 9/9 PASS (All verified via headless browser) | None |
| **Phase 1** | Database & Backend | ⏳ IN PROGRESS | — | Pending implementation | Writing migrations & seed data |
| **Phase 2** | Global Layout | ⚪ PENDING | — | — | — |
| **Phase 3** | Homepage | ⚪ PENDING | — | — | — |
| **Phase 4** | Shop & Collection Pages | ⚪ PENDING | — | — | — |
| **Phase 5** | Product Detail Page (PDP) | ⚪ PENDING | — | — | — |
| **Phase 6** | Cart & Wishlist | ⚪ UPCOMING | — | — | Milestone 2 |
| **Phase 7** | Auth & Customer Account | ⚪ UPCOMING | — | — | Milestone 2 |
| **Phase 8** | Checkout & Payments | ⚪ UPCOMING | — | — | Milestone 2 |
| **Phase 9** | Admin Panel | ⚪ UPCOMING | — | — | Milestone 2 |
| **Phase 10** | Content & Service Pages | ⚪ UPCOMING | — | — | Milestone 3 |
| **Phase 11** | SEO, Perf, Accessibility & Security | ⚪ UPCOMING | — | — | Milestone 3 |
| **Phase 12** | Polish, QA, Demo Data & Handover | ⚪ UPCOMING | — | — | Milestone 3 |

---

## Tooling Check

- **Node.js**: `v22.23.2` (Verified)
- **npm**: `10.9.8` (Verified)
- **Git**: `2.52.0.windows.1` (Repository initialized)

---

## Keys & Credentials Tracking (.env.local)

| Service / Variable | Description | Status | Note |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | ⚠️ Needed for Phase 1 | Can stub locally until provided |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Public Anon Key | ⚠️ Needed for Phase 1 | Can stub locally until provided |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key | ⚠️ Needed for Phase 1 (server only) | Can stub locally until provided |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay TEST Key ID | ⚠️ Needed for Phase 8 | Starts with `rzp_test_` |
| `RAZORPAY_KEY_SECRET` | Razorpay TEST Secret | ⚠️ Needed for Phase 8 | Server only |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Webhook Secret | ⚠️ Needed for Phase 8 | Server only |
| `RESEND_API_KEY` | Resend Email API Key | ⚪ Optional | Will log to console if not set |
| `WHATSAPP_NUMBER` | Contact / Stylist WhatsApp | Default configured | Default in `brand.config.ts` |
| `BRAND_NAME` | Default: MAISON AURÉ | Default configured | Configurable in `brand.config.ts` |

---

## Phase Details & Acceptance Records

### Phase 0: Foundation & Design System (COMPLETED ✅)
- **Plan**: Initialize Next.js 15 + TypeScript + Tailwind CSS, establish `/config/brand.config.ts`, load Cormorant Garamond & Jost, configure Lenis smooth scroll, Framer Motion reveal, build full suite of luxury UI components in `/components/ui`, build `/design-system` preview page.
- **Checklist**:
  - [x] `npm run dev` works with zero errors/warnings (PASS: Started in 2.9s on http://localhost:3000)
  - [x] `/design-system` shows all components, looks luxury (PASS: Ivory bg #F7F4EE, Cormorant serif, hairlines)
  - [x] Changing a color/font in `brand.config.ts` changes the whole page (PASS: Driven by CSS variables & next/font)
  - [x] Smooth scroll + reveal animation work; reduced-motion respected (PASS: LenisProvider + Framer Motion Reveal)
  - [x] Drawer and Modal trap focus and close with Esc (PASS: Tested with Chrome via Playwright script)
- **Screenshots Saved**:
  - `public/screenshots/phase0-desktop-home.png`
  - `public/screenshots/phase0-mobile-home.png`
  - `public/screenshots/phase0-desktop-design-system.png`
  - `public/screenshots/phase0-mobile-design-system.png`
- **Files Created**:
  - `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `.env.example`, `README.md`
  - `config/brand.config.ts` (White-label core brand configuration)
  - `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/design-system/page.tsx`
  - `lib/utils.ts` (cn helper + INR price formatting)
  - `components/providers/lenis-provider.tsx` (Inertial smooth scrolling)
  - `components/ui/`: `button.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`, `radio.tsx`, `label.tsx`, `badge.tsx`, `drawer.tsx`, `dialog.tsx`, `accordion.tsx`, `tabs.tsx`, `toast.tsx`, `skeleton.tsx`, `breadcrumb.tsx`, `pagination.tsx`, `rating-stars.tsx`, `quantity-stepper.tsx`, `price-display.tsx`, `section-heading.tsx`, `container.tsx`, `image-with-fallback.tsx`, `reveal.tsx`
  - `scripts/verify-phase-0.ts` (Automated browser testing runner)
- **Approx Lines Added**: ~2,800 lines. Zero errors, zero warnings.

---

### Phase 1: Database & Backend (Supabase)
- **Plan**:
  1. Write complete PostgreSQL migrations in `/supabase/migrations/001_initial_schema.sql` (22 tables, foreign keys, timestamps, indexes).
  2. Implement comprehensive Row Level Security (RLS) policies for all tables.
  3. Write PostgreSQL RPC functions: `create_order`, `restock_on_cancel`, `generate_order_number`.
  4. Configure Supabase storage bucket definitions.
  5. Build typed Supabase client helpers in `/lib/supabase/` (server, client, middleware).
  6. Write Zod schemas in `/lib/validators/` for catalogs, orders, reviews, coupons, and forms.
  7. Write rich database seed script in `/scripts/seed.ts` (6 categories, 4 collections, 24 realistic products with Unsplash images, variants, stock, 40+ reviews, 5 coupons, 3 journal posts, admin & customer users).
- **Checklist**:
  - [ ] Migrations run clean on a fresh project; seed runs with one command
  - [ ] RLS test: logged-out user cannot read orders, cannot write products
  - [ ] create_order fails when stock is insufficient and never oversells
  - [ ] Types are generated and used (no `any`)
  - [ ] PROGRESS.md lists tables + RPCs + how to reset DB
