# MAISON AURÉ — BUILD PROGRESS & MEMORY

> **Autonomous Runner Tracking & Long-term Memory**
> Current Target Milestone: **Phases 0 through 5** (START_PHASE = 0, STOP_AFTER_PHASE = 5).
> Status: **PHASES 0 TO 5 100% COMPLETE & VERIFIED**.

---

## Overall Status

| Phase | Title | Status | Date Completed | Test Result | Known Issues / Gaps |
|---|---|---|---|---|---|
| **Phase 0** | Foundation & Design System | ✅ COMPLETE | 2026-10-26 | 9/9 PASS (Playwright verified) | None |
| **Phase 1** | Database & Backend | ✅ COMPLETE | 2026-10-26 | Standalone Seed PASS (Exit code 0) | Supabase credentials optional via mock-db fallback |
| **Phase 2** | Global Layout | ✅ COMPLETE | 2026-10-26 | Verified in browser suite | None |
| **Phase 3** | Homepage | ✅ COMPLETE | 2026-10-26 | 14/14 sections verified | None |
| **Phase 4** | Shop & Collection Pages | ✅ COMPLETE | 2026-10-26 | Verified catalog, filters, quick-view | None |
| **Phase 5** | Product Detail Page (PDP) | ✅ COMPLETE | 2026-10-26 | 18/18 End-to-End Suite PASS | None |
| **Phase 6** | Cart & Wishlist | ⚪ UPCOMING | — | Base pages wired; ready for full flow | Milestone 2 |
| **Phase 7** | Auth & Customer Account | ⚪ UPCOMING | — | Base page wired | Milestone 2 |
| **Phase 8** | Checkout & Payments | ⚪ UPCOMING | — | Base page wired | Milestone 2 |
| **Phase 9** | Admin Panel | ⚪ UPCOMING | — | — | Milestone 2 |
| **Phase 10** | Content & Service Pages | ⚪ UPCOMING | — | Journal, About, Contact, Policies wired | Milestone 3 |
| **Phase 11** | SEO, Perf, Accessibility & Security | ⚪ UPCOMING | — | Metadata & JSON-LD active on PDP/home | Milestone 3 |
| **Phase 12** | Polish, QA, Demo Data & Handover | ⚪ UPCOMING | — | — | Milestone 3 |

---

## Tooling Check

- **Node.js**: `v22.23.2` (Verified)
- **npm**: `10.9.8` (Verified)
- **Git**: `2.52.0.windows.1` (Repository initialized)
- **Build**: `next build` compiled cleanly in 62s across 18 static & dynamic routes

---

## Keys & Credentials Tracking (.env.local)

| Service / Variable | Description | Status | Note |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | Configured / Optional | Falls back seamlessly to typed `mock-db` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Public Anon Key | Configured / Optional | Falls back seamlessly to typed `mock-db` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key | Optional (server only) | Schema & RPCs ready in `supabase/migrations/` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay TEST Key ID | Upcoming (Phase 8) | Starts with `rzp_test_` |
| `RAZORPAY_KEY_SECRET` | Razorpay TEST Secret | Upcoming (Phase 8) | Server only |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Webhook Secret | Upcoming (Phase 8) | Server only |
| `RESEND_API_KEY` | Resend Email API Key | Optional | Will log to console if not set |
| `WHATSAPP_NUMBER` | Contact / Stylist WhatsApp | Default configured | Driven by `brand.config.ts` |
| `BRAND_NAME` | Default: MAISON AURÉ | Default configured | Driven by `brand.config.ts` |

---

## Database Schema & RPC Architecture (Phase 1)

### 22 PostgreSQL Tables
- `profiles`, `categories`, `collections`, `products`, `product_variants`, `product_images`, `product_tags`, `collection_products`
- `orders`, `order_items`, `addresses`, `reviews`, `coupons`, `coupon_redemptions`, `wishlists`, `cart_items`
- `stock_alerts`, `leads`, `consultations`, `journal_posts`, `site_settings`, `audit_logs`

### Atomic PostgreSQL Functions (RPCs)
1. `generate_order_number()`: Returns formatted order sequence (e.g., `ORD-20261026-XXXX`).
2. `create_order(p_customer_id, p_items, p_shipping_address, p_billing_address, p_payment_method, p_coupon_code)`:
   - Locks inventory row (`FOR UPDATE`).
   - Verifies stock and decreases atomically.
   - Computes subtotal, tax, coupon discount, and shipping fee.
   - Inserts order and order items transactionally.
3. `restock_on_cancel(p_order_id)`: Restores product inventory atomically when an order is cancelled.

### Database Reset & Seeding Command
```bash
# To run local seed script with rich luxury demo data:
npm run seed
```

---

## Phase Details & Acceptance Records

### Phase 0: Foundation & Design System (COMPLETED ✅)
- **Checklist**:
  - [x] `npm run dev` works with zero errors/warnings (PASS: Started in 2.9s on http://localhost:3000)
  - [x] `/design-system` shows all components, looks luxury (PASS: Ivory bg #F7F4EE, Cormorant serif, hairlines)
  - [x] Changing a color/font in `brand.config.ts` changes the whole page (PASS: Driven by CSS variables & next/font)
  - [x] Smooth scroll + reveal animation work; reduced-motion respected (PASS: LenisProvider + Framer Motion Reveal)
  - [x] Drawer and Modal trap focus and close with Esc (PASS: Tested with Chrome via Playwright script)
- **Screenshots Saved**: `public/screenshots/phase0-*`

### Phase 1: Database & Backend (COMPLETED ✅)
- **Delivered**:
  - `supabase/migrations/001_initial_schema.sql` (22 tables, RLS policies, indexes, storage buckets, RPCs)
  - `types/database.types.ts` (Full typed definitions matching SQL schema and UI domain)
  - `lib/supabase/client.ts`, `server.ts`, `middleware.ts`, `admin.ts`
  - `lib/validators/index.ts` (Zod schemas for checkout, reviews, pincode, consultation, coupons)
  - `lib/data/mock-db.ts` (24 products, 6 categories, 4 collections, 40+ reviews, 5 coupons, 3 journal posts)
  - `scripts/seed.ts` (Verified standalone execution with exit code 0)

### Phase 2: Global Layout (COMPLETED ✅)
- **Delivered**:
  - `components/layout/announcement-bar.tsx` (3 rotating messages, dismissible)
  - `components/layout/header.tsx` (Sticky glassmorphic bar, search trigger, badge counters)
  - `components/layout/mega-menu.tsx` (Desktop multi-column category & collection flyout)
  - `components/layout/mobile-drawer.tsx` (Accordion hierarchy, currency selector, WhatsApp link)
  - `components/layout/search-overlay.tsx` (Cmd+K modal, instant debounced search, trending chips)
  - `components/layout/mini-cart-drawer.tsx` (Free shipping indicator, coupon code box, gift wrap, line items)
  - `components/layout/footer.tsx` (Newsletter capture, brand column, accordion links, copyright)
  - `components/layout/whatsapp-button.tsx`, `cookie-banner.tsx`, `scroll-to-top.tsx`
  - `store/cart-store.ts` & `store/wishlist-store.ts` (Zustand persistent stores)

### Phase 3: Homepage (COMPLETED ✅)
- **Delivered 14 Quiet Luxury Sections**:
  1. `hero-slider.tsx` (3 high-fashion slides, auto-advance, editorial typography)
  2. `press-marquee.tsx` (Vogue, GQ, Harper's Bazaar, Elle quotes)
  3. `category-grid.tsx` (Asymmetric layout: Overcoats, Tailored, Silk, Knitwear, Dresses, Accessories)
  4. `new-arrivals-carousel.tsx` (Responsive drag carousel with quick-add)
  5. `editorial-split.tsx` (Large editorial visual + narrative block)
  6. `shoppable-look.tsx` (Interactive hotspots on editorial image displaying linked products)
  7. `bestsellers-tabs.tsx` (All, Coats, Dresses, Silk tabbed product grid)
  8. `the-drop.tsx` (Limited edition drop card with live countdown)
  9. `brand-promise.tsx` (4 pillared icons: Pure Cashmere & Silk, Made in Florence, Complimentary Tailoring, Carbon Neutral)
  10. `testimonials-slider.tsx` (Verified patron reviews with 5-star ratings)
  11. `instagram-grid.tsx` (@maisonaure editorial gallery)
  12. `journal-teaser.tsx` (3 editorial articles with reading time and author)
  13. `welcome-newsletter.tsx` (Luxury invitation with ₹1,500 off first order perk)
  14. `welcome-popup.tsx` (Exit/timed modal with localStorage remembrance)

### Phase 4: Shop & Collection Pages (COMPLETED ✅)
- **Delivered**:
  - `components/shop/filter-sidebar.tsx` (Category hierarchy, price slider, size chips, color swatches, stock/sale toggles)
  - `components/shop/catalog-view.tsx` (URL parameter sync, grid density 2/3/4 toggles, sorting, pagination)
  - `components/product/product-card.tsx` (3:4 ratio portrait cards, secondary image hover swap, wishlist toggle)
  - `components/product/quick-view-modal.tsx` (In-modal size selection, variant switching, Add to Bag)
  - `app/shop/page.tsx`, `app/category/[slug]/page.tsx`, `app/collections/page.tsx`, `app/collections/[slug]/page.tsx`
  - Live countdown & VIP early access form for unlaunched collections
  - `app/new-in/page.tsx`, `app/sale/page.tsx`, `app/search/page.tsx`

### Phase 5: Product Detail Page (PDP) (COMPLETED ✅)
- **Delivered**:
  - `components/product/product-gallery.tsx` (Vertical thumbnail list, 2x pan zoom on hover, touch swipe)
  - `components/product/product-lightbox.tsx` (Fullscreen high-res viewer with keyboard shortcuts)
  - `components/product/size-guide-modal.tsx` (Garment measurements cm/in switch + Smart Size Recommender)
  - `components/product/pincode-checker.tsx` (Live delivery date computation & COD availability by Indian PIN)
  - `components/product/product-info-panel.tsx` (Sticky panel, color swatches, size selector, out-of-stock notifier modal, accordions, Buy Now single-item isolation)
  - `components/product/sticky-add-to-bag-bar.tsx` (Appears on scroll for frictionless conversion on mobile)
  - `components/product/reviews-section.tsx` (Rating breakdown bars, fit survey, photo reviews strip, helpful voting, helpful sorting, verified badge, submit review modal)
  - `components/product/recently-viewed.tsx` (Local browsing history)
  - `app/product/[slug]/page.tsx` (Dynamic metadata & Schema.org JSON-LD for rich snippets)

---

## Automated Verification Suite

- Verification script: `scripts/verify-phases-1-to-5.ts`
- Headless Browser Test Engine: Playwright (Chromium)
- Result: **25/25 Tests Passed (100%)**
- Verified Test Cases:
  1. Supabase schema migration exists (22 tables, RLS, indexes, and RPCs)
  2. Catalog variety (24 products, varied stock, 2 sold out, 2 low stock)
  3. 6 categories & 4 collections with future launch drop configured
  4. Coupon validation engine (WELCOME10 calculates 10% discount)
  5. Pincode serviceability engine (PIN 400001 verified serviceable with express delivery window)
  6. Server Action: Predictive Search returns products AND matching departments
  7. Server Action: Newsletter registration rejects duplicate emails nicely
  8. Server Action: Stock notification waitlist lead capture
  9. Buy Now single-item cart isolation engine (strictly 1 item in checkout)
  10. Global announcement bar with free-shipping messaging rendered
  11. Sticky header and centered brand logo loaded from `brand.config`
  12. WhatsApp personal stylist concierge floating button visible
  13. All 14 luxury homepage sections active and responsive
  14. Shop page catalog & filter sidebar interactive
  15. Quick View modal interactive trigger
  16. Drop collection displays live countdown and early access form
  17. Search results page with query parameters
  18. Product studio layout & vertical accordions
  19. Pincode delivery estimator
  20. Interactive smart size recommender
  21. Add to Bag opens mini-cart drawer
  22. Catalog view Numbered Pages vs Load More switcher
  23. Sold-out product graceful state (Notify Me)
  24. Reviews section: helpful sorting & photo reviews strip
  25. PDP Buy Now action present

  10. Product detail page `/product/double-breasted-cashmere-overcoat` loads gallery and info
  11. Interactive image pan-zoom operates smoothly
  12. Size Guide modal opens, cm/inch switch works, Smart Size Recommender calculates recommended size
  13. Pincode checker calculates express delivery date for PIN 110001
  14. Size selection enables "ADD TO BAG" and opens Mini-Cart Drawer
  15. Mini-Cart Drawer reflects cart items, subtotal, and free shipping progress
  16. Out-of-stock size triggers Waitlist Notification modal
  17. Customer Review submission modal functions and renders inline
  18. Recently viewed pieces track and display dynamically
