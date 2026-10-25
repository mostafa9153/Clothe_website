# LUXURY CLOTHING STORE TEMPLATE — MASTER PROMPT (Phase-wise)

Owner: Musu (Lun AI) | Use: Claude Code / any coding agent | Goal: client-demo-ready premium fashion store template

---

## HOW TO USE (5 lines)

1. Create an empty folder → open Claude Code in it.
2. Paste **PART A (Master Prompt)** ONCE. Claude saves it as `CLAUDE.md`.
3. Paste **Phase 0** prompt. Wait for its report. Test it. Then say `done`.
4. Paste next phase. Never paste two phases together.
5. After each phase: run the app, click everything in the checklist, then commit.

---

## RESEARCH SUMMARY — what a premium clothing store needs

| Area | Must-have features |
|---|---|
| First impression | Full-bleed hero, editorial photography, strong typography, whitespace, announcement bar |
| Navigation | Mega menu, predictive search, breadcrumbs, sticky header, mobile drawer menu (70–80% traffic is mobile) |
| Listing | Filters (size, color, price, category, availability), sort, hover second image, quick view, wishlist heart, pagination/load more |
| Product page | Large zoomable gallery, color swatches, size selector with stock, size guide + size recommender, fabric/care, shipping info visible early, reviews with photos, "complete the look", recently viewed, sticky add-to-bag |
| Cart/Checkout | Mini-cart drawer, guest checkout, coupon, shipping + GST breakdown, multiple payments (UPI/cards/COD), order summary on every step, trust badges |
| Retention | Wishlist, account + order history, back-in-stock notify, newsletter, abandoned-cart ready, drops/pre-order with countdown |
| Luxury extras | Gift wrap + message, WhatsApp personal stylist, style-consultation booking, lookbook, journal, slow elegant motion |
| Trust | Reviews, return policy, size guide, secure payment badges, clear contact |
| Technical | SEO (JSON-LD, sitemap), fast images, accessibility, security headers, mobile-first |
| Admin | Dashboard, product/variant/inventory CRUD, orders, customers, coupons, homepage content control, reviews moderation, settings |

---
---

# PART A — MASTER PROMPT (paste once, save as CLAUDE.md)

```
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
9. Keep `CLAUDE.md` (this file) + `PROGRESS.md` updated: after each phase, tick completed
   phases and list decisions/known issues.
10. .env.example must list every env var with a one-line explanation.
11. No TODO placeholders in shipped code. If something must be postponed, write it in
    PROGRESS.md under "Known gaps".

PHASE PROTOCOL
- Build ONLY the phase I paste. Do not start the next phase.
- End every phase with: (1) simple summary, (2) how to run/test, (3) acceptance checklist
  with ✅/❌ for each item, (4) report (files, lines +/-), (5) "Reply 'done' to continue".

PHASE LIST
0 Foundation & design system | 1 Database & backend | 2 Global layout | 3 Homepage |
4 Shop & collection pages | 5 Product page | 6 Cart & wishlist | 7 Auth & account |
8 Checkout & payments | 9 Admin panel | 10 Content pages | 11 SEO/perf/security |
12 Polish, QA, demo data & handover

Confirm you understood by replying only: "Master prompt loaded. Ready for Phase 0."
```

---
---

# PART B — PHASE PROMPTS (paste ONE at a time)

---

## PHASE 0 — Foundation & Design System

```
PHASE 0 — Foundation & Design System

Goal: project skeleton + luxury design system + brand config. No pages yet except a
/design-system showcase page.

Tasks
1. Create Next.js 15 + TS + Tailwind v4 project in current folder. Install all packages from
   the stack. Setup ESLint, Prettier, absolute imports (@/).
2. Create `/config/brand.config.ts` with: name, tagline, logoText, colors (the palette),
   fonts, contact (email, phone, address), socials, whatsappNumber, currency, gst (default 5%
   for items ≤ ₹1000, 12% above — configurable), shipping (freeAbove: 2999, flatRate: 99,
   codFee: 49, estimatedDays: "3–6 business days"), returnWindowDays: 10, policies text.
3. Tailwind theme tokens from brand.config → CSS variables in globals.css.
4. Load fonts with next/font. Add Lenis smooth scroll provider and a Framer Motion
   `<Reveal>` wrapper component (fade-up on scroll).
5. Build reusable UI components in /components/ui (luxury-styled): Button (3 variants),
   Input, Textarea, Select, Checkbox, Radio, Label, Badge, Drawer/Sheet, Modal/Dialog,
   Accordion (vertical), Tabs, Toast, Skeleton, Breadcrumb, Pagination, Rating stars,
   QuantityStepper, PriceDisplay (handles sale price + strike-through + % off),
   SectionHeading (small-caps eyebrow + serif title), Container, ImageWithFallback.
6. Create `/design-system` page showing every component, color, and type style.
7. Setup `.env.example`, `README.md` (basic), `CLAUDE.md`, `PROGRESS.md`.

Acceptance checklist
- [ ] `npm run dev` works with zero errors/warnings
- [ ] /design-system shows all components, looks luxury (ivory bg, serif headings, hairlines)
- [ ] Changing a color/font in brand.config.ts changes the whole page
- [ ] Smooth scroll + reveal animation work; reduced-motion respected
- [ ] Drawer and Modal trap focus and close with Esc
```

---

## PHASE 1 — Database & Backend

```
PHASE 1 — Database & Backend (Supabase)

Goal: complete data layer with security. I will create a Supabase project and give you the
keys; first tell me the exact steps to create it and where to paste keys in .env.local.

Tasks
1. Write SQL migrations in /supabase/migrations for these tables (with indexes, timestamps,
   constraints):
   - profiles (id→auth.users, full_name, phone, role: 'customer'|'admin', avatar_url)
   - categories (id, name, slug, parent_id, image, sort_order, is_active)
   - collections (id, name, slug, description, banner_image, is_featured, launch_at,
     is_drop boolean, sort_order)
   - products (id, name, slug, short_desc, description, fabric, care, fit_notes, base_price,
     sale_price, gst_rate, category_id, is_active, is_featured, is_new, tags[], seo_title,
     seo_desc, created_at)
   - product_collections (product_id, collection_id)
   - product_images (id, product_id, url, alt, color, sort_order)
   - product_variants (id, product_id, sku, size, color, color_hex, stock, price_override)
   - reviews (id, product_id, user_id, rating 1–5, title, body, photos[], fit_feedback,
     is_approved, created_at)
   - wishlists (user_id, product_id)
   - addresses (id, user_id, name, phone, line1, line2, city, state, pincode, is_default)
   - coupons (code, type 'percent'|'flat', value, min_order, max_discount, usage_limit,
     used_count, starts_at, expires_at, is_active)
   - orders (id, order_number, user_id nullable, guest_email, status, payment_method,
     payment_status, razorpay_order_id, razorpay_payment_id, subtotal, discount, shipping,
     cod_fee, gst_total, total, coupon_code, shipping_address jsonb, gift_wrap boolean,
     gift_message, tracking_number, courier, notes, created_at)
   - order_items (id, order_id, product_id, variant_id, name, image, size, color, qty,
     unit_price, gst_rate)
   - order_events (id, order_id, status, note, created_at) — timeline
   - return_requests (id, order_id, order_item_id, reason, status, created_at)
   - stock_notifications (id, variant_id/product_id, email, created_at)
   - newsletter_subscribers (id, email unique, source, created_at)
   - contact_messages (id, name, email, phone, subject, message, status, created_at)
   - consultations (id, name, phone, email, preferred_date, preferred_time, notes, status)
   - home_sections (id, key, title, content jsonb, sort_order, is_active) — admin-editable
     homepage blocks (hero slides, banners, featured picks)
   - site_settings (key, value jsonb) — announcement text, shipping, COD on/off, etc.
   - journal_posts (id, title, slug, excerpt, body, cover_image, published_at, is_published)
2. RLS policies: public read for active products/categories/collections/approved reviews/
   published posts; users manage own wishlist/addresses/orders (read); only admin role can
   write catalog/orders/coupons/settings. Guests can insert newsletter/contact/
   consultation/stock_notifications only.
3. Postgres functions (RPC):
   - `create_order(...)`: validates stock, decrements stock atomically, creates order +
     items + first event in ONE transaction; fails safely if stock is insufficient.
   - `restock_on_cancel(order_id)`
   - `generate_order_number()` e.g. MA-2026-000123
4. Storage buckets: `product-images`, `review-photos`, `site-assets` (public read, admin write;
   review-photos: logged-in users write).
5. Supabase helpers in /lib/supabase: server client, browser client, middleware client,
   typed database types (generate).
6. Seed script `/scripts/seed.ts` (run with `npm run seed`):
   - 6 categories (Women: Dresses, Tops & Shirts, Outerwear; Men: Shirts, Trousers,
     Knitwear; Accessories) 
   - 4 collections (incl. 1 upcoming "Drop" with launch_at 7 days ahead)
   - 24 realistic products (luxury names, real descriptions, fabric/care, 3–6 images each
     from Unsplash, 2–4 colors, sizes XS–XL, varied stock including 2 sold-out items and
     3 low-stock), 40+ approved reviews, 5 coupons (WELCOME10, LUXE500, FREESHIP, etc.),
     3 journal posts, home_sections defaults, site_settings defaults
   - 1 admin user (admin@demo.com) and 1 customer (customer@demo.com) — print credentials
     in terminal.
7. Server-side Zod schemas shared between client and server in /lib/validators.

Acceptance checklist
- [ ] Migrations run clean on a fresh project; seed runs with one command
- [ ] RLS test: logged-out user cannot read orders, cannot write products
- [ ] create_order fails when stock is insufficient and never oversells (test with two quick calls)
- [ ] Types are generated and used (no `any`)
- [ ] PROGRESS.md lists tables + RPCs + how to reset DB
```

---

## PHASE 2 — Global Layout

```
PHASE 2 — Global Layout (header, search, drawers, footer)

Goal: the shell that wraps every page. Must feel like a luxury house.

Sections & working functions
1. Announcement bar: rotating messages (text from site_settings, editable in admin later),
   dismissible per session, free-shipping progress text.
2. Header (sticky, transparent over hero → ivory blurred on scroll):
   - Logo text centered (from brand.config), left nav: Women, Men, Accessories, New In,
     Collections, Journal; right icons: Search, Account, Wishlist (count badge), Bag (count).
   - Mega menu on hover (desktop): category columns + featured image + "Shop all" link;
     data comes from the categories table.
   - Mobile: hamburger → full-height drawer with accordion categories, account links,
     WhatsApp link, social icons.
3. Search overlay (full-width, keyboard shortcut "/" or Cmd+K):
   - Predictive search (debounced 250ms) hitting a server action: shows top 6 products with
     image, name, price + matching categories + "View all results" → /search?q=
   - Recent searches (localStorage) + trending suggestions. Empty and no-result states.
4. Mini-cart drawer (opens when Add to bag clicked or bag icon):
   - Line items with image, name, size/color, qty stepper, remove, line total; free-shipping
     progress bar; coupon input (validates against DB); gift-wrap toggle; subtotal; buttons
     "View bag" and "Checkout"; empty state with suggested products.
5. Footer: newsletter signup (saves to newsletter_subscribers, duplicate-safe, success
   message), link columns (Shop, Client Care, Company), contact details, social icons,
   payment icons row, copyright, "Back to top".
6. Cookie/consent banner (accept/decline stored in localStorage) — minimal, elegant.
7. Floating WhatsApp "Personal stylist" button (opens wa.me with prefilled message from
   brand.config) — small, bottom-right, hides on checkout.
8. Global: toast system, page-transition fade, scroll-to-top on route change, 404 page,
   error boundary page.

Acceptance checklist
- [ ] Header changes style on scroll; mega menu loads real categories
- [ ] Search returns real products live; Esc closes; keyboard navigation works
- [ ] Mobile menu opens/closes, accordion works, no scroll bleed behind drawer
- [ ] Newsletter saves to DB and rejects duplicate/invalid emails nicely
- [ ] Mini-cart drawer renders (items come in Phase 6 — for now use the Zustand store with a
      dev-only "add sample" button that is removed after Phase 6)
```

---

## PHASE 3 — Homepage

```
PHASE 3 — Homepage

Goal: a homepage that makes a client say "wow" in 5 seconds. Content blocks come from the
home_sections + products tables so admin can control them later.

Sections (in this order) — each with real data and working links
1. HERO: full-viewport editorial image/video (poster fallback), slow zoom, serif headline,
   small-caps eyebrow, 2 CTAs ("Shop the collection", "Explore lookbook"). Support 3 slides
   with fade crossfade + progress dots, autoplay pauses on hover.
2. Press / "As seen in" marquee (text-based fictional magazine names, slow infinite scroll).
3. SHOP BY CATEGORY: 3–4 large portrait tiles with hover reveal + "Shop women/men/accessories".
4. NEW ARRIVALS: horizontal product carousel (drag/scroll, arrows, snap), product cards with
   hover second image, wishlist heart, quick-view button, "New" badge.
5. EDITORIAL SPLIT BANNER: big image + brand-story text + link (alternate left/right).
6. FEATURED COLLECTION with shoppable look: lookbook image with 3 clickable hotspots →
   popover with product mini-card + "View product".
7. BESTSELLERS grid (tabs: Women / Men / Accessories — tab switch loads real products).
8. THE DROP: countdown timer to the upcoming drop collection (days/hrs/min/sec, live) +
   "Notify me" email form (saves to DB) → after launch time, automatically switches to
   "Shop the drop".
9. WHY US / brand promise strip: 4 icons — Free shipping above ₹X, 10-day easy returns,
   Secure payments, Personal styling (all values from brand.config).
10. TESTIMONIALS: elegant slider with real reviews from DB (name, city, stars, quote).
11. INSTAGRAM-STYLE GRID: 6 lifestyle images (static, link to social).
12. JOURNAL TEASER: latest 3 posts.
13. NEWSLETTER banner with 10% welcome code reveal after signup (shows code WELCOME10).
14. Optional first-visit welcome popup (after 8s, once per visitor, easy to dismiss) —
    controlled by a site_settings flag.

Acceptance checklist
- [ ] All sections render from DB/seed data; no hardcoded fake products
- [ ] Every link/button goes to a real route (if the route is built in a later phase, link to
      it anyway and make sure Phase 10/4/5 will satisfy it — list them in PROGRESS.md)
- [ ] Countdown ticks live and flips state at 0 (test by editing launch_at)
- [ ] Hotspots, tabs, carousel, hero slider all work with mouse, touch and keyboard
- [ ] Mobile layout is clean at 360px; LCP image is prioritized
```

---

## PHASE 4 — Shop & Collection Pages

```
PHASE 4 — Shop, Category, Collection, Search, New-in pages

Routes: /shop, /category/[slug], /collections, /collections/[slug], /new-in, /sale, /search

Sections & working functions
1. Page header: breadcrumb, serif title, short description, product count.
2. FILTER SIDEBAR (desktop) / FILTER DRAWER (mobile) — all URL-synced (shareable links,
   back button works):
   - Category (checkbox tree), Size (chips, only sizes in stock), Color (swatches), Price range
     (dual slider + inputs), Availability (in stock only), On sale, New arrivals.
   - Active filter chips with "x" + "Clear all". Live result count.
3. SORT: Featured, Newest, Price low→high, Price high→low, Best selling, Top rated.
4. PRODUCT GRID: 2 cols mobile / 3–4 desktop, toggle 2/3/4 per row. Product card:
   portrait image, hover second image, color dots, name, price (sale handling),
   wishlist heart (works for guests via localStorage, syncs on login in Phase 7), quick-view
   button, badges (New, Sale -X%, Sold out, Low stock "Only 2 left").
5. QUICK VIEW modal: gallery mini, swatches, size select, add to bag, "View full details".
6. PAGINATION: numbered pages + "Load more" (choose load-more with infinite scroll option
   OFF by default), preserve scroll on back navigation.
7. Skeleton loaders, empty state ("No pieces match — clear filters"), error state.
8. Collection page: full-bleed banner with title/description; if is_drop and not launched →
   show countdown + notify form instead of grid.
9. Search results page: query highlighted, "Did you mean" simple fallback, zero-result state
   with popular products.
10. SEO: dynamic metadata per page, canonical URL with filters excluded.

Acceptance checklist
- [ ] Every filter and sort works individually and combined; URL reflects state
- [ ] Filter counts and in-stock logic correct (verify with 3 manual cases)
- [ ] Quick view adds to bag correctly with chosen size/color
- [ ] 24 products paginate properly; back button restores filters and scroll
- [ ] Mobile filter drawer usable with one hand
```

---

## PHASE 5 — Product Detail Page

```
PHASE 5 — Product Detail Page (/product/[slug])

Goal: the page that converts. Study luxury PDPs: large imagery, calm info hierarchy.

Sections & working functions
1. Gallery: desktop = vertical thumbnails + large image with hover-zoom (lens or 2x pan) and
   click → fullscreen lightbox (swipe, arrows, Esc, pinch-zoom on mobile); mobile = swipe
   carousel with dots. Images switch when color changes.
2. Info panel (sticky on desktop): breadcrumb, name, price (sale %), rating summary (links to
   reviews), short description.
3. Color swatches (with name on hover) + Size selector chips: out-of-stock sizes are struck
   through but clickable → "Notify me when available" (saves email to stock_notifications).
   Low-stock message based on real stock.
4. SIZE GUIDE modal (table in cm/inches toggle per category) + SIZE RECOMMENDER: user enters
   height, weight and fit preference → returns suggested size with simple rule-based logic
   (documented in code, easy to tweak).
5. Quantity stepper (cannot exceed stock), "Add to bag" (opens mini-cart drawer), "Buy now"
   (goes to checkout with just this item), wishlist heart, share button (Web Share API /
   copy link).
6. Delivery check: pincode input → shows estimated delivery date + COD availability
   (rule-based from site_settings serviceable pincode prefixes; message for unserviceable).
7. Vertical accordions (not horizontal tabs): Description, Fabric & Care, Fit notes,
   Shipping & Returns, Gift wrapping.
8. Trust row: secure payment, easy returns, authenticity icons.
9. REVIEWS section: rating distribution bars, "Fit: runs small / true / large" meter,
   filter by stars, sort (newest/helpful), photo reviews strip, "Write a review" (logged-in
   + verified-purchase badge when applicable, photo upload with compression, saved as
   unapproved until admin approves), helpful vote.
10. "Complete the look": 3 related items with quick add. "You may also like": 4 same-category
    products. "Recently viewed": from localStorage (excluding current).
11. Sticky bottom "Add to bag" bar on mobile (appears after scrolling past main button).
12. JSON-LD Product schema (price, availability, rating), OG image, breadcrumbs schema.
13. Out-of-stock product: whole page still works, button becomes "Notify me".

Acceptance checklist
- [ ] Gallery zoom, lightbox, swipe work on desktop + mobile
- [ ] Color change swaps images; size out-of-stock logic is correct
- [ ] Add to bag respects stock; Buy now goes to checkout with only that item
- [ ] Pincode check, size recommender, notify-me, review submit all work end-to-end
- [ ] Recently viewed updates after visiting 3 products
```

---

## PHASE 6 — Cart & Wishlist

```
PHASE 6 — Cart & Wishlist

Goal: real cart logic that cannot be cheated, plus wishlist.

Functions
1. Zustand cart store persisted in localStorage: add, remove, update qty, clear, merge same
   variant, max qty = stock. Remove the dev-only "add sample" button from Phase 2.
2. Cart validation on server (`/api/cart/validate`): re-fetch live price/stock for every
   line; return corrected cart + messages ("Price updated", "Only 2 left", "Sold out —
   removed"). Run on cart page load, drawer open and before checkout.
3. /cart page: line items table (image, name, size/color with edit, qty stepper, price,
   remove, "Move to wishlist"), order summary (subtotal, discount, shipping with
   free-shipping bar, GST included note, estimated total), coupon apply/remove with
   server-side validation and clear errors (expired, min order, used up), gift wrap toggle +
   gift message (max 150 chars), order note, "Continue shopping", "Checkout" button,
   trust badges, "You may also like" row.
4. Coupon engine (server): percent/flat, min order, max discount, usage limit, date range,
   case-insensitive. Single coupon at a time. Unit-test this function.
5. Wishlist: heart toggle everywhere (guest = localStorage, logged-in = DB, auto-merge on
   login), /wishlist page grid with "Add to bag" (choose size inline), remove, share
   wishlist link (public read-only token page), empty state.
6. Cart persistence for logged-in users in DB optional: if simple, sync; otherwise document
   why not.
7. Abandoned cart readiness: store cart snapshot + email (if known) in a table and expose
   an admin list (no email automation yet — just data).

Acceptance checklist
- [ ] Changing qty/removing updates drawer, page and header badge instantly
- [ ] Tampering with localStorage price does NOT change charged price (server recalculates)
- [ ] Each coupon rule tested (valid, expired, min order, limit reached)
- [ ] Wishlist works as guest and merges after login
- [ ] Sold-out/reduced stock item is handled with a clear message
```

---

## PHASE 7 — Authentication & Customer Account

```
PHASE 7 — Auth & Account

Functions
1. Supabase Auth: email+password signup/login, magic link, Google OAuth (optional — document
   how to enable), forgot/reset password, email verification message, logout. Elegant
   login/register split page (image left, form right). Redirect back to previous page after
   login. Middleware protects /account/* and /admin/*.
2. Guest checkout stays possible (Phase 8) — after purchase, offer "Create account".
3. /account dashboard layout with side nav (desktop) / tabs (mobile):
   - Overview: greeting, recent order, quick links.
   - Orders: list with status badges; order detail with timeline (order_events), items,
     address, payment, tracking number link, "Download invoice" (printable invoice page with
     GST breakdown), "Request return" (within return window; select items + reason →
     return_requests), "Cancel order" (only if status = placed/confirmed → restock).
   - Addresses: add/edit/delete/set default (pincode validation, state dropdown).
   - Wishlist (link), Reviews I wrote, Profile (name, phone, avatar upload with
     compression), Change password, Delete account request.
4. Track order page /track-order for guests: order number + email → shows timeline.
5. Transactional emails wired (Resend, fail-safe): welcome, order placed, order shipped,
   password reset (Supabase default is fine).

Acceptance checklist
- [ ] Register → verify → login → logout all work; wrong password shows friendly error
- [ ] /account redirects to login when logged out; /admin blocks non-admin users
- [ ] Address CRUD works; default address toggles correctly
- [ ] Order detail page shows timeline; cancel restocks items (check DB)
- [ ] Guest can track an order with order number + email
```

---

## PHASE 8 — Checkout & Payments

```
PHASE 8 — Checkout & Payments

Goal: a smooth, trustworthy, single-page checkout (guest + logged-in) with server-side truth.

Layout: left = steps (accordion style), right = sticky order summary visible on every step.

Steps & functions
1. Contact: email (+ newsletter opt-in checkbox) — logged-in users prefilled; "Have an
   account? Log in".
2. Shipping address: choose saved address or enter new (name, phone +91, line1, line2, city,
   state, pincode with auto city/state suggestion via a small local lookup or free India
   Post pincode API with graceful fallback). Validate with Zod.
3. Delivery: shown shipping method(s) from settings (Standard; Express optional) with
   estimated date; free above threshold.
4. Gift options: gift wrap (+₹ from settings), gift message, hide-prices-on-invoice toggle.
5. Payment:
   - Razorpay (UPI, cards, netbanking, wallets) in TEST mode: create order on server
     (`/api/checkout/create-order` recalculates everything), open Razorpay Checkout, on
     success verify signature on server (`/api/checkout/verify`), also handle
     `/api/webhooks/razorpay` for reliability (verify webhook signature, idempotent).
   - Cash on Delivery (toggle in settings, COD fee, disabled for unserviceable pincodes
     or orders above a configurable limit).
   - Handle failure/cancel: order stays `payment_pending`, user can retry; stock is held for
     15 minutes then released by a scheduled cleanup route (document how to cron it).
6. Order summary: items, coupon, discount, shipping, COD fee, GST included breakdown,
   total. Edit bag link. Trust badges + "Secure checkout" note.
7. Place order → `create_order` RPC (atomic stock decrement) → confirmation page
   /order/success/[orderNumber]: thank-you, order summary, estimated delivery, "Track order",
   "Continue shopping", account creation prompt for guests; confetti-free, elegant.
8. Emails: order confirmation to customer, new-order alert to admin email (Resend, fail-safe).
9. Admin gets order in dashboard instantly (Phase 9).
10. Edge cases: double-click protection, refresh safety, expired coupon at final step,
    out-of-stock at final step (clear message + return to bag), price changed warning.

Acceptance checklist
- [ ] Complete a guest purchase with Razorpay test mode and with COD
- [ ] Payment signature is verified server-side; tampered success is rejected
- [ ] Stock decreases once (not twice) even if webhook + verify both fire
- [ ] Totals identical in bag, checkout, confirmation, email and invoice
- [ ] Failed payment can be retried without creating duplicate orders
```

---

## PHASE 9 — Admin Panel

```
PHASE 9 — Admin Panel (/admin) — must look as premium as the storefront

Access: role = admin only. Layout: left sidebar + top bar (search, notifications bell with
new orders count, profile). Responsive (usable on tablet).

Modules & functions
1. DASHBOARD: KPI cards (today/7d/30d revenue, orders, AOV, new customers, conversion
   placeholder), revenue line chart, orders by status donut, top 5 products, low-stock list
   (≤5), latest 10 orders, pending reviews count. Date range picker.
2. PRODUCTS: table (image, name, category, price, stock total, status) with search, filters,
   sort, bulk actions (activate/deactivate/delete/feature). Create/Edit product page with
   sections: basics, pricing & GST, description/fabric/care/fit, category + collections +
   tags, SEO fields, IMAGES (drag-drop multi-upload, reorder, assign color, delete;
   compress in browser to WebP ≤1600px / ~300KB before upload to Supabase Storage),
   VARIANTS matrix generator (sizes × colors → SKU, stock, price override), duplicate
   product button, live preview link.
3. CATEGORIES & COLLECTIONS: CRUD, image upload, sort order drag-drop, drop scheduling
   (launch_at) .
4. INVENTORY: variant-level stock table with inline edit, low-stock threshold, CSV import/
   export of stock, back-in-stock notification list with "Notify subscribers" button
   (sends emails, marks as notified).
5. ORDERS: table with filters (status, payment, date, search by order no/email/phone);
   order detail: items, customer, address, payment info, timeline; actions: change status
   (placed → confirmed → packed → shipped → out for delivery → delivered / cancelled /
   returned), add tracking number + courier (sends shipped email), add internal notes,
   print invoice / packing slip, mark COD as paid, refund note. Cancel → restock.
6. RETURNS: list of return requests, approve/reject with note.
7. CUSTOMERS: list, search, order count, lifetime value, detail page with orders; export CSV.
8. COUPONS: CRUD with all rule fields, usage stats, active toggle, generate random code.
9. REVIEWS: moderation queue (approve/reject/delete), reply optional, filter by rating.
10. CONTENT / HOMEPAGE MANAGER: edit hero slides (image upload, headline, CTA link), toggle
    and reorder homepage sections, edit announcement bar messages, edit featured picks —
    changes appear on storefront immediately (revalidate).
11. JOURNAL: simple post editor (title, cover, markdown body, publish toggle).
12. MARKETING: newsletter subscribers list + CSV export; contact messages inbox (mark
    handled); consultation bookings list; abandoned carts list.
13. SETTINGS: store info, shipping rates & free threshold, COD on/off + fee + limit,
    serviceable pincode prefixes, GST defaults, return window, gift wrap fee, social links,
    welcome popup on/off, maintenance mode toggle (shows elegant "back soon" page).
14. Activity log (who changed what, last 50) — simple table.
15. Admin UX: toasts, confirm dialogs on destructive actions, empty/loading states,
    keyboard-friendly tables, "unsaved changes" warning.

Acceptance checklist
- [ ] Create a product with 3 images and 6 variants → appears on storefront correctly
- [ ] Image upload shows compressed size vs original size
- [ ] Order status change updates customer's timeline and sends email
- [ ] Editing hero/announcement in admin changes homepage without redeploy
- [ ] Non-admin cannot open /admin or call admin APIs (test directly with fetch)
```

---

## PHASE 10 — Content & Service Pages

```
PHASE 10 — Content, Brand & Service pages

Pages (all luxury-styled, all content editable via brand.config or DB, no lorem ipsum):
1. /about — brand story, craftsmanship, values, team/founder note, image sections.
2. /lookbook — masonry editorial gallery with lightbox; each image can tag products
   (shop-the-look popover).
3. /journal and /journal/[slug] — listing + article page (reading time, share, related posts).
4. /contact — form (saves to contact_messages, success state, rate-limited), address, map
   embed (static image fallback), phone, email, WhatsApp, working hours.
5. /book-consultation — "Private styling appointment": date + time slot picker (blocks past
   dates/Sundays configurable), name/phone/email/notes → saves to consultations, confirmation
   screen + email.
6. /faq — searchable accordion grouped by topic (orders, shipping, returns, sizing, payments).
7. /shipping-returns, /size-guide (full tables + how-to-measure illustrations),
   /care-guide, /privacy-policy, /terms, /refund-policy, /cookie-policy — templated,
   pulling brand name/contact from brand.config, with a disclaimer note that the client must
   review legal text.
8. /gift-cards (optional simple version): choose amount, recipient email, message → creates
   gift_card record + code; redeemable at checkout. If too heavy, implement as
   "Coming soon" with notify form and list it in PROGRESS.md.
9. /track-order (from Phase 7), /sitemap page (HTML), custom 404, 500, maintenance pages.

Acceptance checklist
- [ ] Every footer and header link now resolves to a real, designed page
- [ ] Contact/consultation forms save to DB and appear in admin
- [ ] FAQ search filters live
- [ ] No lorem ipsum anywhere (search the codebase to prove it)
```

---

## PHASE 11 — SEO, Performance, Accessibility & Security

```
PHASE 11 — Hardening

1. SEO: metadata API for every route, canonical URLs, Open Graph + Twitter cards with
   generated OG images (product/collection), JSON-LD (Organization, WebSite+SearchAction,
   Product, BreadcrumbList, Article), dynamic sitemap.xml + robots.txt, clean slugs,
   noindex for cart/checkout/account/admin/search-with-params.
2. Performance: audit with Lighthouse (mobile). Fix LCP (priority hero), CLS (image sizes,
   font display swap), JS bundle (dynamic imports for admin charts, lightbox, Razorpay
   script loaded only at checkout), ISR/revalidate tags for catalog pages (revalidate when
   admin saves). Target mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95,
   SEO ≥ 95. Show before/after scores.
3. Accessibility: keyboard-only walkthrough of home → product → checkout, focus visible,
   skip-to-content link, aria-live for toasts/cart updates, color contrast AA, reduced
   motion, form labels/errors announced.
4. Security: security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-
   Policy), rate limiting on auth/contact/newsletter/coupon/checkout routes, Zod on all
   inputs, output sanitization, RLS re-audit (write a script that tries forbidden actions
   as anon/customer and prints PASS/FAIL), secrets check (no service key in client bundle),
   CSRF-safe patterns, file upload type/size validation.
5. Error monitoring hook (Sentry-ready, off by default) + friendly global error UI.
6. Analytics-ready: GA4/Meta Pixel placeholders via env, ecommerce events pushed
   (view_item, add_to_cart, begin_checkout, purchase) behind consent.

Acceptance checklist
- [ ] Lighthouse scores shown for home, collection, product (mobile)
- [ ] RLS audit script all PASS
- [ ] Sitemap lists products/collections/posts; robots correct
- [ ] Keyboard-only purchase flow works end-to-end
```

---

## PHASE 12 — Polish, QA, Demo Data & Handover

```
PHASE 12 — Final polish & handover

1. Luxury polish pass: consistent spacing scale, review every page at 360/768/1440, refine
   hover/focus states, image aspect consistency, skeleton shimmer subtle, cursor/transition
   details, page-load reveal sequence on hero, subtle grain or hairline details if they
   improve the feel (don't overdo). Fix any "template-looking" generic section.
2. QA script (written checklist + automated smoke tests with Playwright): home loads, search,
   filter, add to bag, coupon, guest COD checkout, Razorpay test checkout, admin login,
   product create, order status change. Run and show results.
3. Demo mode helpers: `npm run seed` (reset demo data), `npm run seed:reset`, a seeded demo
   admin + customer, a hidden-in-production "Demo credentials" note in README only (not on
   the site), 10 sample orders in various statuses for the admin dashboard to look alive.
4. White-label proof: create a SECOND brand config (e.g. "KASHI ATELIER" with different
   colors/fonts) and show that switching brand.config.ts rebrands the site fully. Keep only
   the default active.
5. Docs:
   - README: setup in 10 steps, env vars, Supabase setup, Razorpay test setup, deploy to
     Vercel and to VPS (build/start + PM2 + nginx basics), backup tips.
   - `REBRAND_GUIDE.md`: step-by-step to deliver this to a new client in ≤ 1 day
     (change config, replace images, set env, seed real products, switch Razorpay to live,
     custom domain, legal pages review).
   - `ADMIN_GUIDE.md`: simple non-technical guide for the client's staff (with screenshots
     placeholders listed).
   - `DEMO_SCRIPT.md`: 5-minute client demo walkthrough (what to click, what to say).
6. Final report: feature coverage table vs the research list (✅/❌), known gaps, suggested
   paid upgrades (shipping API like Shiprocket, WhatsApp order updates, AI stylist chatbot,
   abandoned-cart emails, loyalty points).

Acceptance checklist
- [ ] Fresh clone → follow README → site runs in under 15 minutes
- [ ] All smoke tests pass
- [ ] Second brand config proves white-labeling
- [ ] DEMO_SCRIPT.md can be followed by someone who didn't build the site
```

---

## OPTIONAL ADD-ON PHASES (later, for premium upsell)

| Add-on | What it adds |
|---|---|
| AI stylist chatbot | Chat widget recommending products from catalog (RAG over products) — fits Lun AI brand |
| WhatsApp order updates | n8n workflow: new order / shipped → WhatsApp message |
| Abandoned-cart recovery | n8n + Resend email after 1h/24h |
| Shiprocket integration | Auto AWB, tracking sync |
| Loyalty points | Earn/redeem at checkout |
| Multi-language / multi-currency | Hindi/Bangla + USD |
| PWA | Installable app feel |

---

## BEFORE YOU START — my honest notes

- **Don't paste everything in one go.** One phase at a time or quality drops and bugs pile up.
- **Images decide "luxury".** Unsplash is OK for demo; for a real client, get a proper photoshoot.
- **Razorpay stays in TEST mode** until the client's KYC is done.
- **Legal pages** are templates — client must review them.