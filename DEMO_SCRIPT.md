# MAISON AURÉ — 5-MINUTE CLIENT DEMO SCRIPT

> **For Agency Sales Representatives & Founders (Lun AI)**  
> Follow this exact step-by-step walkthrough to pitch prospective fashion brand founders, creative directors, and luxury boutique owners.

---

## 🎯 The Hook (30 Seconds Before Opening the Laptop)

> *"Most e-commerce websites look like digital supermarkets—bright badges, shouting popups, and cheap buttons. True luxury fashion requires quiet restraint: architectural typography, tactile photography, and a checkout experience as refined as stepping into an atelier on Bond Street or Colaba.*  
>  
> *Today, I want to show you MAISON AURÉ—a production-ready digital flagship designed exclusively for high-end fashion houses."*

---

## ⏱ Minute 1: The Atelier First Impression

### What to Click:
1. Open the homepage: [http://localhost:3000](http://localhost:3000).
2. Slowly scroll down to show the full-bleed hero carousel and smooth Lenis deceleration motion.
3. Hover over the announcement bar.
4. Hover over **Womenswear** or **Menswear** in the header to reveal the editorial Mega Menu.
5. Press `Cmd + K` (or click **Search**) to trigger the predictive search overlay. Type `silk` to show real-time piece suggestions.

### What to Say:
> *"Notice the atmosphere. There are no garish red sale banners or rounded cartoon cards. The warm ivory backdrop (`#F7F4EE`), Cormorant serif typography, and 1px hairline dividers immediately signal quiet luxury.*  
>  
> *Notice how fast the search responds—patrons can press Cmd+K at any moment to summon the catalog instantly."*

---

## ⏱ Minute 2: The Interactive Editorial Lookbook

### What to Click:
1. Click **"Lookbook"** in the top navigation bar (`/lookbook`).
2. Show the responsive masonry editorial grid.
3. Click on **Look I: The Architecture of Drape**.
4. Inside the high-resolution lightbox, hover over the circular hotspot tag on the garment.
5. Click the hotspot tag: show the **"Shop the Look"** popover with real piece name, price, and instant **"Add to Bag"** button.

### What to Say:
> *"High-fashion clients don't shop from sterile product grids—they buy a mood and a complete look. Our interactive Lookbook allows your patrons to click directly on campaign images to inspect each piece and add it to their bag without leaving the editorial view."*

---

## ⏱ Minute 3: The Architectural Product Page (PDP)

### What to Click:
1. Click on the **Mulberry Silk Bias Slip Dress** (`/product/mulberry-silk-bias-slip-dress`).
2. Click through the image gallery thumbnails; demonstrate the zoom capability.
3. Click **"Size Guide"** to open the modal: toggle between **cm** and **in** to show real-time unit conversion.
4. Select size **M** and click **"Add to Bag"**.
5. Watch the slide-out **Mini-Cart Drawer** emerge smoothly from the right with free shipping progress bar.

### What to Say:
> *"Every detail here builds trust. The size guide gives exact garment dimensions in both centimeters and inches with a visual measuring protocol.*  
>  
> *When added to bag, the mini-cart calculates remaining spend needed to unlock complimentary insured shipping."*

---

## ⏱ Minute 4: Trustworthy, Frictionless Checkout

### What to Click:
1. In the Mini-Cart Drawer, click **"Proceed to Checkout"** (`/checkout`).
2. Enter guest email `patron@demo.com`.
3. In the coupon box, enter `WELCOME10` and click **Apply** (watch subtotal decrease by 10% with a luxury toast).
4. Enter pincode `400001` (demonstrating automated postal verification).
5. Select **Cash on Delivery** or **Razorpay Test Payment**.
6. Check **"Include Archival Gift Box (+₹250)"** and enter a gift message.
7. Click **"Confirm & Place Order"**.
8. Show the confirmation screen at `/order/success/[orderNumber]` with tracking timeline and downloadable tax invoice.

### What to Say:
> *"No clunky multi-page redirects. Single-page checkout with server-side security. Pricing and inventory are verified on the server—patrons can never tamper with discounts, and stock is decremented atomically.*  
>  
> *Notice the invoice: statutory Indian GST is calculated automatically, meeting every legal compliance requirement."*

---

## ⏱ Minute 5: Administrative Control & White-Label Switch

### What to Click:
1. Open a new tab and navigate to `/admin` (login with `admin@demo.com` / `adminpassword123`).
2. Show the **Dashboard**: live revenue trajectory, recent orders queue, and low-stock warnings.
3. Open **Orders**: click on the order just placed in the demo; change its status to **"Packed"** then **"Shipped"** with Blue Dart tracking.
4. Open `/config/brand.config.ts` in your code editor side-by-side with `/config/kashi-atelier.config.ts`.

### What to Say:
> *"Behind this editorial facade is an enterprise back-office. Your team can manage products, drag-and-drop imagery with automatic browser compression to WebP, track orders, approve customer returns, and book private styling salon appointments.*  
>  
> *Best of all: this entire platform is 100% white-labeled. If you decide to launch a second sister brand or rebrand tomorrow, changing one configuration file re-themes colors, fonts, contacts, and policies across the entire storefront in under 60 seconds.*  
>  
> *We can have your brand live in this template within 24 hours."*

---

## 💬 Handling Common Client Objections

- **"Can we use our own domain and payment gateway?"**  
  *Yes. Connect your Razorpay or Stripe account, link your domain, and you are live.*
- **"Do we need developers to update banner photos?"**  
  *No. The Admin Panel at `/admin/content` allows non-technical staff to swap hero banners, announcement messages, and featured collections with zero code.*
- **"Is it mobile-friendly?"**  
  *Over 70% of luxury fashion traffic is mobile. The template is engineered mobile-first and tested at 360px, 768px, and 1440px with zero horizontal scroll.*
