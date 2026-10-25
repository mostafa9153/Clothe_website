# MAISON AURÉ — Luxury Fashion House & E-Commerce Template

> **Lun AI White-Label Flagship Template**  
> A reusable, client-demo-ready luxury clothing store template built for high-end fashion ateliers, couture labels, and designer brands. Designed with quiet luxury aesthetics: ivory canvas (`#F7F4EE`), Cormorant Garamond serif typography, 0–2px radii, hairline dividers, and fluid Lenis motion.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components by default)
- **Language**: TypeScript 5 (Strict mode)
- **Styling**: Tailwind CSS v4 + Radix UI Primitives + Lucide Luxury Icons
- **Animations**: Framer Motion + Lenis Smooth Scroll
- **Database & Auth**: Supabase (@supabase/ssr, Postgres, 22 tables, RLS policies, Storage buckets) with seamless typed mock-db fallback
- **State Management**: Zustand (persisted cart, wishlist, quick-view)
- **Forms & Validation**: Zod + React Hook Form
- **Payments**: Razorpay (TEST mode with server-side HMAC-SHA256 signature verification) + Cash on Delivery (COD)
- **Market Defaults**: India — INR (₹) using `en-IN` format, GST breakdown on invoices, 6-digit PIN code serviceability, +91 phone validation
- **Deployment**: Vercel & Ubuntu VPS (Node.js 22 + PM2 + Nginx reverse proxy)

---

## 🚀 10-Step Setup Guide (Run in < 15 Minutes)

### Step 1: Clone & Navigate
```bash
git clone <repository-url>
cd "clothe shop website"
```

### Step 2: Install Node.js Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Note: If Supabase or Razorpay credentials are left blank, the platform automatically activates its high-fidelity mock database with 24 products, 6 categories, 4 collections, 40+ reviews, and 5 coupons).*

### Step 4: Seed Database (Optional for Supabase, Default for Mock DB)
```bash
npm run seed
```

### Step 5: Start Local Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000).

### Step 6: Explore the Design System
Visit [http://localhost:3000/design-system](http://localhost:3000/design-system) to inspect typography scales, palette swatches, interactive buttons, inputs, modals, and toasts.

### Step 7: Test Customer & Guest Checkout
1. Add any piece to bag from `/shop` or `/lookbook`.
2. Open bag drawer, proceed to `/checkout`.
3. Test guest purchase with Cash on Delivery or Razorpay Test mode (`4111 1111 1111 1111`).
4. View real-time order confirmation at `/order/success/[orderNumber]`.

### Step 8: Access the Administrative Dashboard
Visit [http://localhost:3000/account/login](http://localhost:3000/account/login) and log in with demo admin credentials (see below). Access the administrative suite at [http://localhost:3000/admin](http://localhost:3000/admin).

### Step 9: Run Automated Security & RLS Audit
```bash
npx tsx scripts/audit-security-rls.ts
```
Verifies role boundaries, server price enforcement, signature verification, rate limits, and client secret quarantine.

### Step 10: Run End-to-End Store Smoke Suite
```bash
npx tsx scripts/verify-full-store.ts
```
Verifies all 13 phases (Phases 0 through 12) with 100% pass guarantee.

---

## 🔐 Demo Credentials (For Client Walkthroughs)

| Role | Email Address | Password | Permissions |
|---|---|---|---|
| **Administrator** | `admin@demo.com` | `adminpassword123` *(or `admin123`)* | Full CRUD on products, inventory, orders, returns, coupons, reviews, content, and settings |
| **Patron / Customer** | `customer@demo.com` | `password123` | Order history, addresses, returns, saved wishlist, profile |

*(Note: These demo credentials are for staging/demonstration. For live deployments, connect Supabase Auth and remove default demo users).*

---

## 🎨 White-Label Architecture

Every single brand element is controlled from a single authoritative file:
```
/config/brand.config.ts
```
- Brand Name (`MAISON AURÉ`)
- Typography (Heading = `Cormorant Garamond`, Body = `Jost`)
- Colors (Ivory `#F7F4EE`, Ink `#111111`, Champagne Gold `#B08D57`)
- Contact coordinates (Address, Email, Phone, WhatsApp concierge)
- GST tax rates (5% and 12%) & free shipping thresholds
- Policies text (Shipping, Returns, Privacy, Terms, Care, Authenticity)

To demonstrate switchability, a second complete configuration is provided in:
```
/config/kashi-atelier.config.ts
```
*(See `REBRAND_GUIDE.md` to rebrand for a new client in under 1 day).*

---

## ☁️ Deployment Instructions

### Option A: Vercel (Recommended)
1. Push repository to GitHub/GitLab.
2. Import project into Vercel dashboard.
3. Configure environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, etc.).
4. Click **Deploy**. Next.js App Router will generate static and dynamic ISR routes automatically.

### Option B: Ubuntu VPS (Node.js + PM2 + Nginx)

1. **Install Node.js 22 & PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **Build and Launch Application**:
   ```bash
   cd /var/www/maison-aure
   npm ci
   npm run build
   pm2 start npm --name "maison-aure" -- start -- -p 3000
   pm2 save
   pm2 startup
   ```

3. **Nginx Reverse Proxy Configuration** (`/etc/nginx/sites-available/maison-aure`):
   ```nginx
   server {
       server_name atelier.yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL with Let's Encrypt**:
   ```bash
   sudo certbot --nginx -d atelier.yourdomain.com
   ```

---

## 📜 Documentation Directory

- **`REBRAND_GUIDE.md`**: Guide for agencies to customize and rebrand for a client in 1 day.
- **`ADMIN_GUIDE.md`**: Illustrated manual for store managers and staff to manage catalog, orders, and content.
- **`DEMO_SCRIPT.md`**: 5-minute sales pitch and click-by-click script to demo to prospective fashion clients.
- **`PROGRESS.md`**: Detailed milestone ledger of all implemented architecture and test results.
