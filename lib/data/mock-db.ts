import { Category, Collection, Product, Review, Coupon, JournalPost } from "@/types/database.types";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-w-dresses",
    name: "Dresses & Gowns",
    slug: "dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "cat-w-tops",
    name: "Tops & Silk Blouses",
    slug: "tops-shirts",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "cat-outerwear",
    name: "Coats & Outerwear",
    slug: "outerwear",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "cat-m-tailoring",
    name: "Men's Tailoring & Shirts",
    slug: "mens-shirts",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "cat-trousers",
    name: "Trousers & Pleated Pants",
    slug: "trousers",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    sort_order: 5,
    is_active: true,
  },
  {
    id: "cat-accessories",
    name: "Artisanal Accessories & Leather",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
    sort_order: 6,
    is_active: true,
  },
];

// Set drop launch to 7 days in the future
const futureDropDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "col-riviera",
    name: "The Riviera Atelier",
    slug: "the-riviera-atelier",
    description: "Fluid mulberry silhouettes, sun-bleached ecru linen, and relaxed tailoring engineered for coastal high summer.",
    banner_image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
    is_featured: true,
    launch_at: null,
    is_drop: false,
    sort_order: 1,
  },
  {
    id: "col-cashmere",
    name: "Minimalist Cashmere",
    slug: "minimalist-cashmere",
    description: "Sublime 14-gauge Mongolian cashmere garments in architectural unlined cuts and muted mineral pigments.",
    banner_image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
    is_featured: true,
    launch_at: null,
    is_drop: false,
    sort_order: 2,
  },
  {
    id: "col-monochrome",
    name: "Monochrome Tailoring",
    slug: "monochrome-tailoring",
    description: "Sharp shoulder lines, internal horsehair canvas construction, and pure virgin wools crafted for modern authority.",
    banner_image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85",
    is_featured: false,
    launch_at: null,
    is_drop: false,
    sort_order: 3,
  },
  {
    id: "col-autumn-drop",
    name: "The Autumnal Solstice Drop",
    slug: "autumnal-solstice",
    description: "Strictly limited to 50 numbered pieces worldwide. Heavy double-faced bouclés and raw handspun tussar silks.",
    banner_image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=85",
    is_featured: true,
    launch_at: futureDropDate,
    is_drop: true,
    sort_order: 4,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "The Sculpted Trench Coat",
    slug: "the-sculpted-trench-coat",
    short_desc: "Architectural double-breasted coat in waterproof bonded cotton twill.",
    description: "A masterclass in quiet poise. Features storm flaps, horn buttons from sustainable provenance, and a removable waist belt with custom brushed brass hardware.",
    fabric: "100% Bonded Organic Cotton Gabardine (420 GSM), woven in Biella, Italy.",
    care: "Specialist dry clean only. Store on wide cedar hanger away from direct sunlight.",
    fit_notes: "Designed for a relaxed, statuesque drape. Fits true to size; take your standard size for layering.",
    base_price: 32000,
    sale_price: 28800,
    gst_rate: 12,
    category_id: "cat-outerwear",
    category_slug: "outerwear",
    category_name: "Coats & Outerwear",
    is_active: true,
    is_featured: true,
    is_new: true,
    tags: ["outerwear", "trench", "cotton", "bestseller"],
    seo_title: "The Sculpted Trench Coat | Maison Auré",
    seo_desc: "Double-breasted trench in bonded Italian cotton gabardine with horn buttons.",
    created_at: "2026-01-10T10:00:00Z",
    avg_rating: 4.9,
    reviews_count: 8,
    total_stock: 14,
    images: [
      {
        id: "img-001-1",
        product_id: "prod-001",
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
        alt: "The Sculpted Trench Coat front view in camel",
        color: "Camel",
        sort_order: 1,
      },
      {
        id: "img-001-2",
        product_id: "prod-001",
        url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85",
        alt: "The Sculpted Trench Coat styled back view",
        color: "Camel",
        sort_order: 2,
      },
      {
        id: "img-001-3",
        product_id: "prod-001",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
        alt: "The Sculpted Trench Coat collar detail",
        color: "Camel",
        sort_order: 3,
      },
    ],
    variants: [
      { id: "var-001-s", product_id: "prod-001", sku: "MA-TC-CAM-S", size: "S", color: "Camel", color_hex: "#C19A6B", stock: 5 },
      { id: "var-001-m", product_id: "prod-001", sku: "MA-TC-CAM-M", size: "M", color: "Camel", color_hex: "#C19A6B", stock: 6 },
      { id: "var-001-l", product_id: "prod-001", sku: "MA-TC-CAM-L", size: "L", color: "Camel", color_hex: "#C19A6B", stock: 3 },
      { id: "var-001-blk-s", product_id: "prod-001", sku: "MA-TC-BLK-S", size: "S", color: "Obsidian", color_hex: "#111111", stock: 0 },
    ],
  },
  {
    id: "prod-002",
    name: "Mulberry Silk Bias Slip Dress",
    slug: "mulberry-silk-bias-slip-dress",
    short_desc: "Liquid 24-momme silk maxi cut on the true bias with subtle cowl neck.",
    description: "Flows against the body with weightless grace. Finished with French seams, delicate adjustable rouleau straps, and a delicate floor-grazing hem.",
    fabric: "100% Grade 6A Mulberry Silk (24 Momme), OEKO-TEX certified.",
    care: "Hand wash cold with pH-neutral detergent or dry clean. Flat dry in shade.",
    fit_notes: "Cut on the bias to gently hug contours without cling. True to size.",
    base_price: 24500,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-w-dresses",
    category_slug: "dresses",
    category_name: "Dresses & Gowns",
    is_active: true,
    is_featured: true,
    is_new: true,
    tags: ["silk", "dress", "evening", "bestseller"],
    seo_title: "Mulberry Silk Bias Slip Dress | Maison Auré",
    seo_desc: "24-momme mulberry silk slip dress with cowl neckline and pure French seams.",
    created_at: "2026-01-12T10:00:00Z",
    avg_rating: 5.0,
    reviews_count: 6,
    total_stock: 12,
    images: [
      {
        id: "img-002-1",
        product_id: "prod-002",
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85",
        alt: "Mulberry Silk Bias Slip Dress in Champagne",
        color: "Champagne",
        sort_order: 1,
      },
      {
        id: "img-002-2",
        product_id: "prod-002",
        url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
        alt: "Mulberry Silk Bias Slip Dress side drape",
        color: "Champagne",
        sort_order: 2,
      },
      {
        id: "img-002-3",
        product_id: "prod-002",
        url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85",
        alt: "Mulberry Silk Bias Slip Dress fabric close-up",
        color: "Champagne",
        sort_order: 3,
      },
    ],
    variants: [
      { id: "var-002-xs", product_id: "prod-002", sku: "MA-SD-CHP-XS", size: "XS", color: "Champagne", color_hex: "#E8D8C8", stock: 3 },
      { id: "var-002-s", product_id: "prod-002", sku: "MA-SD-CHP-S", size: "S", color: "Champagne", color_hex: "#E8D8C8", stock: 4 },
      { id: "var-002-m", product_id: "prod-002", sku: "MA-SD-CHP-M", size: "M", color: "Champagne", color_hex: "#E8D8C8", stock: 5 },
      { id: "var-002-l", product_id: "prod-002", sku: "MA-SD-CHP-L", size: "L", color: "Champagne", color_hex: "#E8D8C8", stock: 0 },
    ],
  },
  {
    id: "prod-003",
    name: "Pleated Wide-Leg Wool Trousers",
    slug: "pleated-wide-leg-wool-trousers",
    short_desc: "High-waisted trousers tailored from high-twist tropical wool.",
    description: "Deep front double pleats create an elegant drape that breaks cleanly over loafers or heels. Features extended tab waistband and viscose half-lining.",
    fabric: "100% Super 120s Virgin Wool, woven in Yorkshire mills.",
    care: "Dry clean only. Cool iron on reverse with press cloth.",
    fit_notes: "High-rise fit. Long inseam designed to be worn with heels or altered to preference.",
    base_price: 18500,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-trousers",
    category_slug: "trousers",
    category_name: "Trousers & Pleated Pants",
    is_active: true,
    is_featured: true,
    is_new: false,
    tags: ["trousers", "wool", "tailoring"],
    seo_title: "Pleated Wide-Leg Wool Trousers | Maison Auré",
    seo_desc: "High-waisted double-pleated trousers in Super 120s virgin wool.",
    created_at: "2026-01-15T10:00:00Z",
    avg_rating: 4.8,
    reviews_count: 5,
    total_stock: 9,
    images: [
      {
        id: "img-003-1",
        product_id: "prod-003",
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
        alt: "Pleated Wide-Leg Wool Trousers in Ecru",
        color: "Ecru",
        sort_order: 1,
      },
      {
        id: "img-003-2",
        product_id: "prod-003",
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
        alt: "Pleated Wide-Leg Wool Trousers movement shot",
        color: "Ecru",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-003-s", product_id: "prod-003", sku: "MA-TR-ECR-S", size: "S", color: "Ecru", color_hex: "#F5F2EB", stock: 4 },
      { id: "var-003-m", product_id: "prod-003", sku: "MA-TR-ECR-M", size: "M", color: "Ecru", color_hex: "#F5F2EB", stock: 3 },
      { id: "var-003-l", product_id: "prod-003", sku: "MA-TR-ECR-L", size: "L", color: "Ecru", color_hex: "#F5F2EB", stock: 2 },
    ],
  },
  {
    id: "prod-004",
    name: "Double-Faced Cashmere Overcoat",
    slug: "double-faced-cashmere-overcoat",
    short_desc: "Hand-finished wrap coat crafted from pure unlined double cashmere.",
    description: "Entirely hand-stitched along edges using traditional sartorial split-seam techniques. Generous shawl lapel and self-tie belt create an effortless cocoon silhouette.",
    fabric: "100% Grade A Mongolian Cashmere (580 GSM).",
    care: "Specialist luxury dry clean. Brush gently with natural bristle garment brush.",
    fit_notes: "Oversized, relaxed drape with dropped shoulders.",
    base_price: 68000,
    sale_price: 59000,
    gst_rate: 12,
    category_id: "cat-outerwear",
    category_slug: "outerwear",
    category_name: "Coats & Outerwear",
    is_active: true,
    is_featured: true,
    is_new: true,
    tags: ["cashmere", "coat", "luxury"],
    seo_title: "Double-Faced Cashmere Overcoat | Maison Auré",
    seo_desc: "Hand-finished pure Mongolian cashmere overcoat with shawl lapel.",
    created_at: "2026-01-18T10:00:00Z",
    avg_rating: 5.0,
    reviews_count: 4,
    total_stock: 4,
    images: [
      {
        id: "img-004-1",
        product_id: "prod-004",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
        alt: "Double-Faced Cashmere Overcoat in Oatmeal",
        color: "Oatmeal",
        sort_order: 1,
      },
      {
        id: "img-004-2",
        product_id: "prod-004",
        url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85",
        alt: "Double-Faced Cashmere Overcoat profile view",
        color: "Oatmeal",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-004-s", product_id: "prod-004", sku: "MA-DF-OAT-S", size: "S", color: "Oatmeal", color_hex: "#D7C9B1", stock: 2 },
      { id: "var-004-m", product_id: "prod-004", sku: "MA-DF-OAT-M", size: "M", color: "Oatmeal", color_hex: "#D7C9B1", stock: 2 },
    ],
  },
  {
    id: "prod-005",
    name: "High-Twist French Linen Shirt",
    slug: "high-twist-french-linen-shirt",
    short_desc: "Relaxed resort shirt with mother-of-pearl buttons and camp collar.",
    description: "Woven in Normandy from long-staple flax. Pre-washed for a buttery soft handfeel that softens and patinas beautifully with every wear.",
    fabric: "100% French Normandy Flax Linen (165 GSM).",
    care: "Gentle machine wash cold or hand wash. Line dry in shade.",
    fit_notes: "Relaxed silhouette with dropped shoulders and side hem splits.",
    base_price: 11500,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-m-tailoring",
    category_slug: "mens-shirts",
    category_name: "Men's Tailoring & Shirts",
    is_active: true,
    is_featured: false,
    is_new: true,
    tags: ["linen", "shirt", "resort", "mens"],
    seo_title: "High-Twist French Linen Shirt | Maison Auré",
    seo_desc: "French linen resort shirt with camp collar and mother-of-pearl buttons.",
    created_at: "2026-01-20T10:00:00Z",
    avg_rating: 4.7,
    reviews_count: 5,
    total_stock: 16,
    images: [
      {
        id: "img-005-1",
        product_id: "prod-005",
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85",
        alt: "French Linen Shirt in Crisp White",
        color: "White",
        sort_order: 1,
      },
      {
        id: "img-005-2",
        product_id: "prod-005",
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
        alt: "French Linen Shirt fabric texture",
        color: "White",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-005-s", product_id: "prod-005", sku: "MA-LS-WHT-S", size: "S", color: "White", color_hex: "#FFFFFF", stock: 6 },
      { id: "var-005-m", product_id: "prod-005", sku: "MA-LS-WHT-M", size: "M", color: "White", color_hex: "#FFFFFF", stock: 6 },
      { id: "var-005-l", product_id: "prod-005", sku: "MA-LS-WHT-L", size: "L", color: "White", color_hex: "#FFFFFF", stock: 4 },
    ],
  },
  {
    id: "prod-006",
    name: "Architectural Drape Poplin Shirt",
    slug: "architectural-drape-poplin-shirt",
    short_desc: "Crisp organic cotton shirt featuring an asymmetrical crossover button placket.",
    description: "Subtle avant-garde restraint. Cut from high-density Egyptian cotton poplin with elongated cuffs and mother-of-pearl fasteners.",
    fabric: "100% Giza 87 Egyptian Long-Staple Cotton Poplin (120/2 yarn count).",
    care: "Machine wash cold delicate cycle. Hang to dry and steam gently.",
    fit_notes: "Modern boyfriend fit. Order your normal size for the editorial silhouette.",
    base_price: 13900,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-w-tops",
    category_slug: "tops-shirts",
    category_name: "Tops & Silk Blouses",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["cotton", "shirt", "blouse", "workwear"],
    seo_title: "Architectural Drape Poplin Shirt | Maison Auré",
    seo_desc: "Egyptian cotton poplin blouse with sculptural asymmetrical closure.",
    created_at: "2026-01-22T10:00:00Z",
    avg_rating: 4.8,
    reviews_count: 3,
    total_stock: 8,
    images: [
      {
        id: "img-006-1",
        product_id: "prod-006",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
        alt: "Architectural Drape Poplin Shirt front view",
        color: "Ice Blue",
        sort_order: 1,
      },
      {
        id: "img-006-2",
        product_id: "prod-006",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
        alt: "Architectural Drape Poplin Shirt sleeve detail",
        color: "Ice Blue",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-006-xs", product_id: "prod-006", sku: "MA-PS-BLU-XS", size: "XS", color: "Ice Blue", color_hex: "#D3DFEE", stock: 2 },
      { id: "var-006-s", product_id: "prod-006", sku: "MA-PS-BLU-S", size: "S", color: "Ice Blue", color_hex: "#D3DFEE", stock: 4 },
      { id: "var-006-m", product_id: "prod-006", sku: "MA-PS-BLU-M", size: "M", color: "Ice Blue", color_hex: "#D3DFEE", stock: 2 },
    ],
  },
  {
    id: "prod-007",
    name: "Structured Milano Rib Cardigan",
    slug: "structured-milano-rib-cardigan",
    short_desc: "Heavyweight Milano knit jacket with gold architectural buttons.",
    description: "Substantial knitwear with the crisp structure of a jacket and the tactile ease of a sweater. Knitted with ultra-fine merino wool from Australia.",
    fabric: "100% Extra-Fine Merino Wool (19.5 Micron, 12-Gauge Milano Knit).",
    care: "Dry clean or gentle hand wash with wool detergent. Dry flat on a towel.",
    fit_notes: "Slightly cropped boxy cut. Hits right at natural waistline.",
    base_price: 21000,
    sale_price: 18900,
    gst_rate: 12,
    category_id: "cat-outerwear",
    category_slug: "outerwear",
    category_name: "Coats & Outerwear",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["merino", "knitwear", "cardigan"],
    seo_title: "Structured Milano Rib Cardigan | Maison Auré",
    seo_desc: "Fine merino wool Milano knit cardigan with custom engraved metal buttons.",
    created_at: "2026-01-25T10:00:00Z",
    avg_rating: 4.9,
    reviews_count: 7,
    total_stock: 7,
    images: [
      {
        id: "img-007-1",
        product_id: "prod-007",
        url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85",
        alt: "Structured Milano Rib Cardigan in Dark Olive",
        color: "Dark Olive",
        sort_order: 1,
      },
      {
        id: "img-007-2",
        product_id: "prod-007",
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
        alt: "Structured Milano Rib Cardigan button detail",
        color: "Dark Olive",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-007-s", product_id: "prod-007", sku: "MA-MC-OLV-S", size: "S", color: "Dark Olive", color_hex: "#2B2E26", stock: 3 },
      { id: "var-007-m", product_id: "prod-007", sku: "MA-MC-OLV-M", size: "M", color: "Dark Olive", color_hex: "#2B2E26", stock: 4 },
    ],
  },
  {
    id: "prod-008",
    name: "The Heirloom Calfskin Tote",
    slug: "the-heirloom-calfskin-tote",
    short_desc: "Unstructured tote bag crafted from vegetable-tanned full-grain calf leather.",
    description: "Pure tactile richness with zero external branding. Features raw suede interior, reinforced rolled handles, magnetic closure, and removable zipped pouch.",
    fabric: "100% Tuscan Full-Grain Vegetable-Tanned Calfskin Leather.",
    care: "Wipe with soft damp cloth. Condition periodically with leather balm.",
    fit_notes: "Accommodates up to 16-inch laptops with ease. Dimensions: 42cm x 32cm x 16cm.",
    base_price: 36000,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-accessories",
    category_slug: "accessories",
    category_name: "Artisanal Accessories & Leather",
    is_active: true,
    is_featured: true,
    is_new: false,
    tags: ["leather", "tote", "bag", "handcrafted"],
    seo_title: "The Heirloom Calfskin Tote | Maison Auré",
    seo_desc: "Minimalist Italian vegetable-tanned calfskin tote with internal zip clutch.",
    created_at: "2026-01-28T10:00:00Z",
    avg_rating: 5.0,
    reviews_count: 9,
    total_stock: 5,
    images: [
      {
        id: "img-008-1",
        product_id: "prod-008",
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
        alt: "The Heirloom Calfskin Tote in Saddle Tan",
        color: "Tan",
        sort_order: 1,
      },
      {
        id: "img-008-2",
        product_id: "prod-008",
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
        alt: "The Heirloom Calfskin Tote side profile",
        color: "Tan",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-008-one", product_id: "prod-008", sku: "MA-HT-TAN-ONE", size: "One Size", color: "Saddle Tan", color_hex: "#8B4513", stock: 5 },
    ],
  },
  {
    id: "prod-009",
    name: "Pure Silk Twill Foulard Scarf",
    slug: "pure-silk-twill-foulard-scarf",
    short_desc: "Hand-rolled 90x90cm silk scarf featuring geometric architectural linework.",
    description: "Printed using traditional screens in Lake Como, Italy. Features hand-rolled, hand-stitched roulotté hems that take 45 minutes per scarf to finish.",
    fabric: "100% Silk Twill (16 Momme) with artisanal hand-rolled edges.",
    care: "Dry clean only. Store rolled or flat.",
    fit_notes: "90cm x 90cm square. Versatile neck, hair, or bag styling.",
    base_price: 9500,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-accessories",
    category_slug: "accessories",
    category_name: "Artisanal Accessories & Leather",
    is_active: true,
    is_featured: false,
    is_new: true,
    tags: ["silk", "scarf", "accessories"],
    seo_title: "Pure Silk Twill Foulard Scarf | Maison Auré",
    seo_desc: "Hand-rolled 90cm Italian silk twill scarf with architectural motifs.",
    created_at: "2026-02-01T10:00:00Z",
    avg_rating: 4.9,
    reviews_count: 4,
    total_stock: 15,
    images: [
      {
        id: "img-009-1",
        product_id: "prod-009",
        url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85",
        alt: "Pure Silk Twill Foulard Scarf folded",
        color: "Ivory & Ink",
        sort_order: 1,
      },
      {
        id: "img-009-2",
        product_id: "prod-009",
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
        alt: "Silk Foulard scarf worn on neck",
        color: "Ivory & Ink",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-009-one", product_id: "prod-009", sku: "MA-SC-IVO-ONE", size: "90x90cm", color: "Ivory & Ink", color_hex: "#F7F4EE", stock: 15 },
    ],
  },
  {
    id: "prod-010",
    name: "Fine Gauge Cashmere Mockneck",
    slug: "fine-gauge-cashmere-mockneck",
    short_desc: "Featherlight 2-ply pure cashmere knit with seamless seamless saddle shoulders.",
    description: "An essential canvas for minimalist styling. Woven on Japanese Shima Seiki computerized knitting machines without irritating internal seams.",
    fabric: "100% Superfine Inner Mongolia Cashmere (15.2 Micron).",
    care: "Hand wash in cool water with specialized cashmere wash. Flat dry.",
    fit_notes: "Slim tailored silhouette designed to tuck neatly into trousers.",
    base_price: 22000,
    sale_price: 19800,
    gst_rate: 12,
    category_id: "cat-w-tops",
    category_slug: "tops-shirts",
    category_name: "Tops & Silk Blouses",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["cashmere", "sweater", "mockneck"],
    seo_title: "Fine Gauge Cashmere Mockneck | Maison Auré",
    seo_desc: "Seamless 2-ply cashmere mockneck knit with saddle shoulder detailing.",
    created_at: "2026-02-05T10:00:00Z",
    avg_rating: 4.9,
    reviews_count: 6,
    total_stock: 11,
    images: [
      {
        id: "img-010-1",
        product_id: "prod-010",
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85",
        alt: "Fine Gauge Cashmere Mockneck in Stone",
        color: "Stone Grey",
        sort_order: 1,
      },
      {
        id: "img-010-2",
        product_id: "prod-010",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
        alt: "Fine Gauge Cashmere Mockneck neckline detail",
        color: "Stone Grey",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-010-s", product_id: "prod-010", sku: "MA-MN-STN-S", size: "S", color: "Stone Grey", color_hex: "#8A857C", stock: 4 },
      { id: "var-010-m", product_id: "prod-010", sku: "MA-MN-STN-M", size: "M", color: "Stone Grey", color_hex: "#8A857C", stock: 4 },
      { id: "var-010-l", product_id: "prod-010", sku: "MA-MN-STN-L", size: "L", color: "Stone Grey", color_hex: "#8A857C", stock: 3 },
    ],
  },
  {
    id: "prod-011",
    name: "Single-Breasted Wool Blazer",
    slug: "single-breasted-wool-blazer",
    short_desc: "Sartorial tailored jacket with peak lapels and natural floating canvas.",
    description: "Uncompromised tailoring integrity. Features gently roped sleeve heads, functional button cuffs, and double rear vents.",
    fabric: "100% High-Twist Worsted Wool (280 GSM), woven by Vitale Barberis Canonico.",
    care: "Dry clean only by bespoke garment specialist. Hang on wishbone hanger.",
    fit_notes: "Structured shoulders with softly suppressed waist. True to European size.",
    base_price: 38000,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-m-tailoring",
    category_slug: "mens-shirts",
    category_name: "Men's Tailoring & Shirts",
    is_active: true,
    is_featured: true,
    is_new: false,
    tags: ["blazer", "wool", "tailoring", "mens"],
    seo_title: "Single-Breasted Wool Blazer | Maison Auré",
    seo_desc: "Worsted wool jacket with peak lapel and natural canvassing.",
    created_at: "2026-02-08T10:00:00Z",
    avg_rating: 4.8,
    reviews_count: 5,
    total_stock: 8,
    images: [
      {
        id: "img-011-1",
        product_id: "prod-011",
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
        alt: "Single-Breasted Wool Blazer in Midnight Charcoal",
        color: "Charcoal",
        sort_order: 1,
      },
      {
        id: "img-011-2",
        product_id: "prod-011",
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85",
        alt: "Single-Breasted Wool Blazer lapel roll",
        color: "Charcoal",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-011-38", product_id: "prod-011", sku: "MA-BLZ-CHR-38", size: "38R", color: "Charcoal", color_hex: "#222222", stock: 3 },
      { id: "var-011-40", product_id: "prod-011", sku: "MA-BLZ-CHR-40", size: "40R", color: "Charcoal", color_hex: "#222222", stock: 3 },
      { id: "var-011-42", product_id: "prod-011", sku: "MA-BLZ-CHR-42", size: "42R", color: "Charcoal", color_hex: "#222222", stock: 2 },
    ],
  },
  {
    id: "prod-012",
    name: "Fluted Column Evening Gown",
    slug: "fluted-column-evening-gown",
    short_desc: "Floor-length column gown crafted from heavy silk crepe de chine.",
    description: "Quiet drama defined. High jewel neckline in front gives way to an architectural open back with a subtle trailing hem.",
    fabric: "100% Heavy Silk Crepe de Chine (30 Momme).",
    care: "Dry clean only. Do not wash or steam close to embellishments.",
    fit_notes: "Column silhouette with gentle flare from low hip. Sizing is true.",
    base_price: 46000,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-w-dresses",
    category_slug: "dresses",
    category_name: "Dresses & Gowns",
    is_active: true,
    is_featured: true,
    is_new: true,
    tags: ["gown", "evening", "silk", "black-tie"],
    seo_title: "Fluted Column Evening Gown | Maison Auré",
    seo_desc: "Architectural floor-length gown in 30-momme heavy silk crepe de chine.",
    created_at: "2026-02-12T10:00:00Z",
    avg_rating: 5.0,
    reviews_count: 5,
    total_stock: 6,
    images: [
      {
        id: "img-012-1",
        product_id: "prod-012",
        url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
        alt: "Fluted Column Evening Gown in Noir",
        color: "Noir",
        sort_order: 1,
      },
      {
        id: "img-012-2",
        product_id: "prod-012",
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85",
        alt: "Fluted Column Evening Gown back view",
        color: "Noir",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-012-xs", product_id: "prod-012", sku: "MA-CG-NOI-XS", size: "XS", color: "Noir", color_hex: "#111111", stock: 2 },
      { id: "var-012-s", product_id: "prod-012", sku: "MA-CG-NOI-S", size: "S", color: "Noir", color_hex: "#111111", stock: 2 },
      { id: "var-012-m", product_id: "prod-012", sku: "MA-CG-NOI-M", size: "M", color: "Noir", color_hex: "#111111", stock: 2 },
    ],
  },
  {
    id: "prod-013",
    name: "Relaxed Drawstring Silk Trousers",
    slug: "relaxed-drawstring-silk-trousers",
    short_desc: "Unstructured trousers in sandwashed silk habotai with satin piping.",
    description: "The pinnacle of lounge decadence. Features an elasticated waistband with pure silk cord, slanted pockets, and clean straight legs.",
    fabric: "100% Sandwashed Silk Habotai (22 Momme).",
    care: "Delicate dry clean or hand wash cold. Flat dry away from sun.",
    fit_notes: "Relaxed mid-rise with elasticized drawstring waist.",
    base_price: 16500,
    sale_price: 14850,
    gst_rate: 12,
    category_id: "cat-trousers",
    category_slug: "trousers",
    category_name: "Trousers & Pleated Pants",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["silk", "pants", "lounge", "casual-luxury"],
    seo_title: "Relaxed Drawstring Silk Trousers | Maison Auré",
    seo_desc: "Sandwashed 22-momme silk trousers with piping and drawstring waist.",
    created_at: "2026-02-15T10:00:00Z",
    avg_rating: 4.7,
    reviews_count: 4,
    total_stock: 7,
    images: [
      {
        id: "img-013-1",
        product_id: "prod-013",
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
        alt: "Relaxed Drawstring Silk Trousers in Olive",
        color: "Olive Drab",
        sort_order: 1,
      },
      {
        id: "img-013-2",
        product_id: "prod-013",
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
        alt: "Silk trousers ankle cuff detail",
        color: "Olive Drab",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-013-s", product_id: "prod-013", sku: "MA-ST-OLV-S", size: "S", color: "Olive Drab", color_hex: "#3D4233", stock: 3 },
      { id: "var-013-m", product_id: "prod-013", sku: "MA-ST-OLV-M", size: "M", color: "Olive Drab", color_hex: "#3D4233", stock: 4 },
    ],
  },
  {
    id: "prod-014",
    name: "Minimalist Lambskin Leather Belt",
    slug: "minimalist-lambskin-leather-belt",
    short_desc: "Slender 25mm belt with custom champagne gold buckle.",
    description: "Sleek and understated. Hand-painted edges, debossed serial seal on interior, and brushed champagne-gold solid brass buckle.",
    fabric: "100% Spanish Full-Grain Lambskin with nubuck lining.",
    care: "Store rolled or hung. Avoid moisture and oils.",
    fit_notes: "Width: 25mm. Sizes correspond to waist measurement in centimeters (75cm to 95cm).",
    base_price: 7800,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-accessories",
    category_slug: "accessories",
    category_name: "Artisanal Accessories & Leather",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["belt", "leather", "accessories"],
    seo_title: "Minimalist Lambskin Leather Belt | Maison Auré",
    seo_desc: "25mm Spanish lambskin belt with custom brass buckle in champagne gold.",
    created_at: "2026-02-18T10:00:00Z",
    avg_rating: 4.8,
    reviews_count: 6,
    total_stock: 14,
    images: [
      {
        id: "img-014-1",
        product_id: "prod-014",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
        alt: "Lambskin Leather Belt in Black and Gold",
        color: "Black",
        sort_order: 1,
      },
      {
        id: "img-014-2",
        product_id: "prod-014",
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
        alt: "Lambskin Belt buckle detail",
        color: "Black",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-014-75", product_id: "prod-014", sku: "MA-BL-BLK-75", size: "75cm", color: "Black", color_hex: "#111111", stock: 5 },
      { id: "var-014-85", product_id: "prod-014", sku: "MA-BL-BLK-85", size: "85cm", color: "Black", color_hex: "#111111", stock: 5 },
      { id: "var-014-95", product_id: "prod-014", sku: "MA-BL-BLK-95", size: "95cm", color: "Black", color_hex: "#111111", stock: 4 },
    ],
  },
  {
    id: "prod-015",
    name: "Hand-Knitted Chunky Alpaca Crewneck",
    slug: "hand-knitted-chunky-alpaca-crewneck",
    short_desc: "Hand-spun baby alpaca sweater with distinctive sculptural moss stitch.",
    description: "Knitted by female artisan collectives in the Peruvian highlands. Extraordinary warmth with an airy, cloud-like texture.",
    fabric: "70% Royal Baby Alpaca, 20% Mulberry Silk, 10% Organic Wool.",
    care: "Dry clean or hand wash gently in lukewarm water. Never wring.",
    fit_notes: "Relaxed slouchy silhouette with raglan sleeves.",
    base_price: 29000,
    sale_price: 26100,
    gst_rate: 12,
    category_id: "cat-w-tops",
    category_slug: "tops-shirts",
    category_name: "Tops & Silk Blouses",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["alpaca", "knitwear", "sweater", "artisan"],
    seo_title: "Hand-Knitted Chunky Alpaca Crewneck | Maison Auré",
    seo_desc: "Artisanal hand-spun royal baby alpaca knit with moss stitch architecture.",
    created_at: "2026-02-20T10:00:00Z",
    avg_rating: 4.9,
    reviews_count: 5,
    total_stock: 4,
    images: [
      {
        id: "img-015-1",
        product_id: "prod-015",
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85",
        alt: "Chunky Alpaca Crewneck in Ecru",
        color: "Ecru",
        sort_order: 1,
      },
      {
        id: "img-015-2",
        product_id: "prod-015",
        url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85",
        alt: "Chunky Alpaca Crewneck stitch detail",
        color: "Ecru",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-015-s", product_id: "prod-015", sku: "MA-AC-ECR-S", size: "S", color: "Ecru", color_hex: "#F5F2EB", stock: 2 },
      { id: "var-015-m", product_id: "prod-015", sku: "MA-AC-ECR-M", size: "M", color: "Ecru", color_hex: "#F5F2EB", stock: 2 },
    ],
  },
  {
    id: "prod-016",
    name: "Classic Silk Georgette Tie-Blouse",
    slug: "classic-silk-georgette-tie-blouse",
    short_desc: "Semi-sheer silk georgette blouse with elongated lavallière neckties.",
    description: "Effortlessly poised whether tied in a crisp bow or left undone to drape freely down the torso. Meticulously gathered shoulders and genuine pearl button cuffs.",
    fabric: "100% Silk Georgette (18 Momme).",
    care: "Dry clean only.",
    fit_notes: "Classic tailored fit through shoulders, fluid through body.",
    base_price: 17500,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-w-tops",
    category_slug: "tops-shirts",
    category_name: "Tops & Silk Blouses",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["silk", "blouse", "georgette"],
    seo_title: "Classic Silk Georgette Tie-Blouse | Maison Auré",
    seo_desc: "Lavallière bow tie blouse in 18-momme pure silk georgette with pearl buttons.",
    created_at: "2026-02-22T10:00:00Z",
    avg_rating: 4.8,
    reviews_count: 4,
    total_stock: 8,
    images: [
      {
        id: "img-016-1",
        product_id: "prod-016",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
        alt: "Silk Georgette Tie-Blouse in Cream",
        color: "Cream",
        sort_order: 1,
      },
      {
        id: "img-016-2",
        product_id: "prod-016",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
        alt: "Silk blouse tie detail",
        color: "Cream",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-016-s", product_id: "prod-016", sku: "MA-TB-CRM-S", size: "S", color: "Cream", color_hex: "#FFFDD0", stock: 4 },
      { id: "var-016-m", product_id: "prod-016", sku: "MA-TB-CRM-M", size: "M", color: "Cream", color_hex: "#FFFDD0", stock: 4 },
    ],
  },
  {
    id: "prod-017",
    name: "Heavy Linen Gurkha Trousers",
    slug: "heavy-linen-gurkha-trousers",
    short_desc: "High-waisted trousers with traditional double buckle crossover waistband.",
    description: "Heritage military tailoring refined for the contemporary gentleman. Features deep pleats, generous leg, and adjustable side cinch buckles.",
    fabric: "100% Irish Heavy Linen (360 GSM), woven by Baird McNutt.",
    care: "Dry clean or cold wash. Hang dry while damp to maintain crease lines.",
    fit_notes: "High-waisted with adjustable cinch buckles. True to waist size.",
    base_price: 19500,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-trousers",
    category_slug: "trousers",
    category_name: "Trousers & Pleated Pants",
    is_active: true,
    is_featured: false,
    is_new: true,
    tags: ["gurkha", "linen", "trousers", "mens"],
    seo_title: "Heavy Linen Gurkha Trousers | Maison Auré",
    seo_desc: "Irish linen high-waisted Gurkha trousers with double buckle fastening.",
    created_at: "2026-02-25T10:00:00Z",
    avg_rating: 4.8,
    reviews_count: 5,
    total_stock: 9,
    images: [
      {
        id: "img-017-1",
        product_id: "prod-017",
        url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
        alt: "Heavy Linen Gurkha Trousers in Sand",
        color: "Sand",
        sort_order: 1,
      },
      {
        id: "img-017-2",
        product_id: "prod-017",
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85",
        alt: "Gurkha waistband buckle detail",
        color: "Sand",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-017-30", product_id: "prod-017", sku: "MA-GT-SND-30", size: "30W", color: "Sand", color_hex: "#C2B280", stock: 3 },
      { id: "var-017-32", product_id: "prod-017", sku: "MA-GT-SND-32", size: "32W", color: "Sand", color_hex: "#C2B280", stock: 3 },
      { id: "var-017-34", product_id: "prod-017", sku: "MA-GT-SND-34", size: "34W", color: "Sand", color_hex: "#C2B280", stock: 3 },
    ],
  },
  {
    id: "prod-018",
    name: "Architectural Cape Overcoat",
    slug: "architectural-cape-overcoat",
    short_desc: "Pure wool Melton cape with high funnel collar and arm slits.",
    description: "Dramatic yet disciplined. Pure wool melton holds crisp architectural curves while internal tailored straps keep the garment anchored in motion.",
    fabric: "100% Wool Melton (650 GSM).",
    care: "Dry clean only. Steam with care.",
    fit_notes: "Generous cape cut. Size S/M fits UK 6–12, M/L fits UK 12–18.",
    base_price: 49000,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-outerwear",
    category_slug: "outerwear",
    category_name: "Coats & Outerwear",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["cape", "outerwear", "wool", "melton"],
    seo_title: "Architectural Cape Overcoat | Maison Auré",
    seo_desc: "Wool melton sculptural cape overcoat with concealed arm slits.",
    created_at: "2026-03-01T10:00:00Z",
    avg_rating: 5.0,
    reviews_count: 4,
    total_stock: 4,
    images: [
      {
        id: "img-018-1",
        product_id: "prod-018",
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
        alt: "Architectural Cape Overcoat in Deep Charcoal",
        color: "Charcoal",
        sort_order: 1,
      },
      {
        id: "img-018-2",
        product_id: "prod-018",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
        alt: "Cape overcoat collar silhouette",
        color: "Charcoal",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-018-sm", product_id: "prod-018", sku: "MA-CP-CHR-SM", size: "S/M", color: "Charcoal", color_hex: "#222222", stock: 2 },
      { id: "var-018-ml", product_id: "prod-018", sku: "MA-CP-CHR-ML", size: "M/L", color: "Charcoal", color_hex: "#222222", stock: 2 },
    ],
  },
  {
    id: "prod-019",
    name: "Fine Leather Evening Pouch",
    slug: "fine-leather-evening-pouch",
    short_desc: "Ruched nappa leather clutch with magnetic brass framed hinge.",
    description: "Cloud-soft Italian lamb nappa folded into sculptural pleats. Conceals a subtle magnetic frame that opens with a satisfying mechanical click.",
    fabric: "100% Italian Lambskin Nappa with soft calfskin lining.",
    care: "Store in protective dustbag with tissue stuffing.",
    fit_notes: "Comfortably fits iPhone Pro Max, cardholder, keys, and lip treatment.",
    base_price: 26000,
    sale_price: 23400,
    gst_rate: 12,
    category_id: "cat-accessories",
    category_slug: "accessories",
    category_name: "Artisanal Accessories & Leather",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["clutch", "pouch", "leather", "evening"],
    seo_title: "Fine Leather Evening Pouch | Maison Auré",
    seo_desc: "Pleated lamb nappa leather clutch with brass magnetic framed closure.",
    created_at: "2026-03-05T10:00:00Z",
    avg_rating: 4.9,
    reviews_count: 5,
    total_stock: 6,
    images: [
      {
        id: "img-019-1",
        product_id: "prod-019",
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
        alt: "Fine Leather Evening Pouch in Buttercream",
        color: "Buttercream",
        sort_order: 1,
      },
      {
        id: "img-019-2",
        product_id: "prod-019",
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
        alt: "Evening pouch held in hand",
        color: "Buttercream",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-019-one", product_id: "prod-019", sku: "MA-EP-BUT-ONE", size: "One Size", color: "Buttercream", color_hex: "#FFFDD0", stock: 6 },
    ],
  },
  {
    id: "prod-020",
    name: "Hand-Loomed Tussar Silk Tunic",
    slug: "hand-loomed-tussar-silk-tunic",
    short_desc: "Organic wild tussar silk tunic featuring natural textured slub.",
    description: "Spun and woven by master artisans in Bhagalpur. The natural golden hue is untreated, honoring the raw vitality of wild sericulture.",
    fabric: "100% Raw Unbleached Tussar Wild Silk (Hand-Spun & Hand-Loomed).",
    care: "Gentle dry clean only to maintain natural silk gum texture.",
    fit_notes: "Relaxed straight silhouette with side slits for ease of movement.",
    base_price: 21500,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-w-dresses",
    category_slug: "dresses",
    category_name: "Dresses & Gowns",
    is_active: true,
    is_featured: false,
    is_new: true,
    tags: ["tussar", "silk", "handloom", "tunic"],
    seo_title: "Hand-Loomed Tussar Silk Tunic | Maison Auré",
    seo_desc: "Raw handloom tussar wild silk tunic with organic slub texture.",
    created_at: "2026-03-08T10:00:00Z",
    avg_rating: 4.8,
    reviews_count: 3,
    total_stock: 6,
    images: [
      {
        id: "img-020-1",
        product_id: "prod-020",
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85",
        alt: "Hand-Loomed Tussar Silk Tunic in Golden Raw",
        color: "Raw Gold",
        sort_order: 1,
      },
      {
        id: "img-020-2",
        product_id: "prod-020",
        url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
        alt: "Tussar silk texture close-up",
        color: "Raw Gold",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-020-s", product_id: "prod-020", sku: "MA-TT-GLD-S", size: "S", color: "Raw Gold", color_hex: "#D4AF37", stock: 3 },
      { id: "var-020-m", product_id: "prod-020", sku: "MA-TT-GLD-M", size: "M", color: "Raw Gold", color_hex: "#D4AF37", stock: 3 },
    ],
  },
  {
    id: "prod-021",
    name: "Limited Edition Handspun Bouclé Jacket",
    slug: "limited-edition-handspun-boucle-jacket",
    short_desc: "Artisanal textured bouclé wool jacket in strictly numbered run of 50.",
    description: "Part of the upcoming Autumnal Solstice Drop. Crafted from rare undyed Scottish wool bouclé with hand-hammered antiqued brass buttons.",
    fabric: "100% Pure Virgin Undyed Wool Bouclé (720 GSM).",
    care: "Specialist archival dry clean only.",
    fit_notes: "Statuesque architectural box cut. True to size.",
    base_price: 54000,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-outerwear",
    category_slug: "outerwear",
    category_name: "Coats & Outerwear",
    is_active: true,
    is_featured: true,
    is_new: true,
    tags: ["drop", "limited-edition", "boucle", "jacket"],
    seo_title: "Limited Edition Bouclé Jacket | Maison Auré",
    seo_desc: "Strictly limited numbered run of 50. Hand-spun virgin wool bouclé jacket.",
    created_at: "2026-03-12T10:00:00Z",
    avg_rating: 5.0,
    reviews_count: 2,
    total_stock: 0, // SOLD OUT ITEM 1
    images: [
      {
        id: "img-021-1",
        product_id: "prod-021",
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
        alt: "Limited Edition Bouclé Jacket in Natural Heather",
        color: "Natural Heather",
        sort_order: 1,
      },
      {
        id: "img-021-2",
        product_id: "prod-021",
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
        alt: "Boucle jacket brass button detail",
        color: "Natural Heather",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-021-s", product_id: "prod-021", sku: "MA-BJ-HTH-S", size: "S", color: "Natural Heather", color_hex: "#B8B0A5", stock: 0 },
      { id: "var-021-m", product_id: "prod-021", sku: "MA-BJ-HTH-M", size: "M", color: "Natural Heather", color_hex: "#B8B0A5", stock: 0 },
    ],
  },
  {
    id: "prod-022",
    name: "Architectural Asymmetrical Silk Vest",
    slug: "architectural-asymmetrical-silk-vest",
    short_desc: "Tailored vest in crisp silk dupioni with wrap tie closure.",
    description: "An editorial layering piece. Can be worn solo as an evening top or over a collared shirt for elevated daytime presence.",
    fabric: "100% Handloom Silk Dupioni.",
    care: "Dry clean only.",
    fit_notes: "Adjustable side ties allow tailored waist shaping.",
    base_price: 15200,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-w-tops",
    category_slug: "tops-shirts",
    category_name: "Tops & Silk Blouses",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["vest", "silk", "tailoring"],
    seo_title: "Architectural Asymmetrical Silk Vest | Maison Auré",
    seo_desc: "Handloom silk dupioni tailored vest with adjustable wrap closure.",
    created_at: "2026-03-15T10:00:00Z",
    avg_rating: 4.8,
    reviews_count: 3,
    total_stock: 0, // SOLD OUT ITEM 2
    images: [
      {
        id: "img-022-1",
        product_id: "prod-022",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
        alt: "Asymmetrical Silk Vest in Ivory",
        color: "Ivory",
        sort_order: 1,
      },
      {
        id: "img-022-2",
        product_id: "prod-022",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
        alt: "Silk vest back tie detail",
        color: "Ivory",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-022-s", product_id: "prod-022", sku: "MA-SV-IVO-S", size: "S", color: "Ivory", color_hex: "#F7F4EE", stock: 0 },
      { id: "var-022-m", product_id: "prod-022", sku: "MA-SV-IVO-M", size: "M", color: "Ivory", color_hex: "#F7F4EE", stock: 0 },
    ],
  },
  {
    id: "prod-023",
    name: "Fine Silk Habotai Pocket Square",
    slug: "fine-silk-habotai-pocket-square",
    short_desc: "42cm pocket square with hand-rolled contrasting edges.",
    description: "The subtle final touch to a tailored jacket. Hand-rolled contrasting border done entirely by needle in our atelier.",
    fabric: "100% Pure Silk Habotai.",
    care: "Dry clean only.",
    fit_notes: "42cm x 42cm.",
    base_price: 3200,
    sale_price: null,
    gst_rate: 12,
    category_id: "cat-accessories",
    category_slug: "accessories",
    category_name: "Artisanal Accessories & Leather",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["pocket-square", "silk", "accessories"],
    seo_title: "Fine Silk Habotai Pocket Square | Maison Auré",
    seo_desc: "Hand-rolled pure silk habotai pocket square with contrast hand-stitched border.",
    created_at: "2026-03-18T10:00:00Z",
    avg_rating: 4.9,
    reviews_count: 5,
    total_stock: 2, // LOW STOCK ITEM 1 ("Only 2 left")
    images: [
      {
        id: "img-023-1",
        product_id: "prod-023",
        url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85",
        alt: "Silk Pocket Square folded in pocket",
        color: "Champagne & Olive",
        sort_order: 1,
      },
      {
        id: "img-023-2",
        product_id: "prod-023",
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
        alt: "Pocket square hand-rolled border detail",
        color: "Champagne & Olive",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-023-one", product_id: "prod-023", sku: "MA-PSQ-CHP-ONE", size: "42x42cm", color: "Champagne & Olive", color_hex: "#B08D57", stock: 2 },
    ],
  },
  {
    id: "prod-024",
    name: "Architectural Minimalist Brass Cuff",
    slug: "architectural-minimalist-brass-cuff",
    short_desc: "Hand-forged solid brass open wrist cuff with matte champagne finish.",
    description: "Each cuff is individual, shaped by cold forging and finished with a micro-satin brushing that develops a personalized patina over years of wear.",
    fabric: "100% Solid Naval Brass with anti-tarnish protective micro-coating.",
    care: "Wipe with soft jewelry polishing cloth. Avoid chemicals and direct perfume.",
    fit_notes: "Gently malleable to customize fit onto any wrist circumference.",
    base_price: 8900,
    sale_price: 7900,
    gst_rate: 12,
    category_id: "cat-accessories",
    category_slug: "accessories",
    category_name: "Artisanal Accessories & Leather",
    is_active: true,
    is_featured: false,
    is_new: false,
    tags: ["jewelry", "cuff", "brass", "accessories"],
    seo_title: "Architectural Minimalist Brass Cuff | Maison Auré",
    seo_desc: "Hand-forged solid naval brass wrist cuff with micro-satin champagne finish.",
    created_at: "2026-03-20T10:00:00Z",
    avg_rating: 4.9,
    reviews_count: 7,
    total_stock: 2, // LOW STOCK ITEM 2 ("Only 2 left")
    images: [
      {
        id: "img-024-1",
        product_id: "prod-024",
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
        alt: "Architectural Minimalist Brass Cuff on pedestal",
        color: "Champagne Brass",
        sort_order: 1,
      },
      {
        id: "img-024-2",
        product_id: "prod-024",
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
        alt: "Minimalist Brass cuff worn on wrist",
        color: "Champagne Brass",
        sort_order: 2,
      },
    ],
    variants: [
      { id: "var-024-one", product_id: "prod-024", sku: "MA-BCF-BRS-ONE", size: "One Size", color: "Champagne Brass", color_hex: "#B08D57", stock: 2 },
    ],
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-001",
    product_id: "prod-001",
    user_id: null,
    author_name: "Ananya Singhania",
    rating: 5,
    title: "The pinnacle of tailored coats",
    body: "The bonded cotton has a remarkable presence. It holds its silhouette without feeling rigid, and the horn buttons speak volumes about the atelier's attention to detail.",
    photos: ["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80"],
    fit_feedback: "true_to_size",
    is_approved: true,
    created_at: "2026-02-01T12:00:00Z",
  },
  {
    id: "rev-002",
    product_id: "prod-001",
    user_id: null,
    author_name: "Rohit Malhotra",
    rating: 5,
    title: "Masterful weight and poise",
    body: "Purchased for travel between London and Delhi. Defies damp weather and looks immaculate layered over knitwear or a dinner suit.",
    photos: [],
    fit_feedback: "true_to_size",
    is_approved: true,
    created_at: "2026-02-04T14:30:00Z",
  },
  {
    id: "rev-003",
    product_id: "prod-002",
    user_id: null,
    author_name: "Meera Kulkarni",
    rating: 5,
    title: "24-momme silk makes all the difference",
    body: "Most silk dresses cling unflatteringly. This bias cut floats like liquid Mercury. The French seams and weight of the fabric are genuinely Loro-Piana tier.",
    photos: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80"],
    fit_feedback: "true_to_size",
    is_approved: true,
    created_at: "2026-02-10T09:15:00Z",
  },
  {
    id: "rev-004",
    product_id: "prod-002",
    user_id: null,
    author_name: "Tara D'Souza",
    rating: 5,
    title: "Exquisite champagne tone",
    body: "Wore this to an intimate gallery opening. Received constant inquiries about where it came from. The packaging and personal note felt truly private-client.",
    photos: [],
    fit_feedback: "true_to_size",
    is_approved: true,
    created_at: "2026-02-14T18:20:00Z",
  },
  {
    id: "rev-005",
    product_id: "prod-003",
    user_id: null,
    author_name: "Kabir Varma",
    rating: 5,
    title: "The break over the shoe is impeccable",
    body: "Super 120s virgin wool has that crisp British drape. High waist tab closure means you don't even need a belt. Superb trousers.",
    photos: [],
    fit_feedback: "true_to_size",
    is_approved: true,
    created_at: "2026-02-18T11:45:00Z",
  },
  {
    id: "rev-006",
    product_id: "prod-004",
    user_id: null,
    author_name: "Devika Rao",
    rating: 5,
    title: "Pure unadulterated luxury",
    body: "Double-faced cashmere that feels like wrapping yourself in warm mist. You can tell every inch of the seam edge was done by hand.",
    photos: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"],
    fit_feedback: "runs_large",
    is_approved: true,
    created_at: "2026-02-22T16:00:00Z",
  },
  {
    id: "rev-007",
    product_id: "prod-008",
    user_id: null,
    author_name: "Siddharth Sen",
    rating: 5,
    title: "Tuscan leather with gorgeous natural grain",
    body: "Vegetable tanned leather that smells intoxicating. Stood up to three months of rigorous daily travel and only looks richer.",
    photos: [],
    fit_feedback: "true_to_size",
    is_approved: true,
    created_at: "2026-02-25T13:10:00Z",
  },
];

export const MOCK_COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    type: "percent",
    value: 10,
    min_order: 2000,
    max_discount: 3000,
    usage_limit: 1000,
    used_count: 42,
    starts_at: null,
    expires_at: null,
    is_active: true,
  },
  {
    code: "LUXE500",
    type: "flat",
    value: 500,
    min_order: 4000,
    max_discount: null,
    usage_limit: 500,
    used_count: 18,
    starts_at: null,
    expires_at: null,
    is_active: true,
  },
  {
    code: "FREESHIP",
    type: "flat",
    value: 99,
    min_order: 1000,
    max_discount: null,
    usage_limit: null,
    used_count: 85,
    starts_at: null,
    expires_at: null,
    is_active: true,
  },
  {
    code: "AURÉ15",
    type: "percent",
    value: 15,
    min_order: 8000,
    max_discount: 5000,
    usage_limit: 200,
    used_count: 12,
    starts_at: null,
    expires_at: null,
    is_active: true,
  },
  {
    code: "VIP20",
    type: "percent",
    value: 20,
    min_order: 12000,
    max_discount: 10000,
    usage_limit: 50,
    used_count: 6,
    starts_at: null,
    expires_at: null,
    is_active: true,
  },
];

export const MOCK_JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post-001",
    title: "The Architectural Drape: Exploring 24 Momme Mulberry Silk",
    slug: "architectural-drape-mulberry-silk",
    excerpt: "Why the weight of natural silk fiber dictates silhouette longevity, and how our atelier approaches bias-cut garments.",
    body: "True silk weight is quantified by momme—a heritage Japanese measurement where 1 momme equals 4.340 grams per square meter. While standard high-street silks linger at 12–16 momme, Maison Auré commissions exclusively 24 to 30 momme Grade 6A unblended mulberry fibers. This dense structural weight prevents ungraceful cling and gives our bias slip dresses their signature liquid drape.",
    cover_image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85",
    published_at: "2026-02-10T10:00:00Z",
    is_published: true,
    created_at: "2026-02-08T10:00:00Z",
  },
  {
    id: "post-002",
    title: "Quiet Monochromes: Curating an Essential Wardrobe",
    slug: "quiet-monochromes-essential-wardrobe",
    excerpt: "The discipline of tonal dressing. How warm ecru, deep obsidian, and raw mineral shades compose effortless authority.",
    body: "Quiet luxury is not the absence of color; it is the mastery of saturation. By focusing on organic parchment whites, warm stone greys, and deep midnight obsidian, the eye is drawn to silhouette, weave, and construction rather than superficial graphics.",
    cover_image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
    published_at: "2026-02-18T10:00:00Z",
    is_published: true,
    created_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "post-003",
    title: "Artisanal Looms: Preserving Handspun Textiles",
    slug: "artisanal-looms-preserving-handspun-textiles",
    excerpt: "Inside the heritage workshops of Bhagalpur and Biella, where slow-woven textiles resist seasonal obsolescence.",
    body: "Modern industrial power looms produce thousands of meters an hour with mechanical uniformity. In contrast, our heritage handlooms honor minute slubs and textural character that only the human hand can guide into being.",
    cover_image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
    published_at: "2026-02-28T10:00:00Z",
    is_published: true,
    created_at: "2026-02-25T10:00:00Z",
  },
];

// Serviceable Pincodes List (starts with common metro prefixes across India)
export const SERVICEABLE_PINCODE_PREFIXES = [
  "11", "12", "13", // Delhi NCR / Haryana
  "40", "41", "42", // Mumbai / Pune / Maharashtra
  "56", "57",       // Bengaluru / Karnataka
  "60", "64",       // Chennai / Tamil Nadu
  "50", "51",       // Hyderabad / Telangana
  "70",             // Kolkata / West Bengal
  "38", "39",       // Ahmedabad / Gujarat
  "30",             // Jaipur / Rajasthan
  "68",             // Kochi / Kerala
];

// ==============================================================================
// MOCK DATA ACCESS API (Fallback & Server Component Helpers)
// ==============================================================================

export interface ProductFilterParams {
  category?: string;
  collection?: string;
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  isNew?: boolean;
  search?: string;
  sort?: "featured" | "newest" | "price-asc" | "price-desc" | "best-selling" | "top-rated";
  page?: number;
  limit?: number;
}

export function getMockProducts(params: ProductFilterParams = {}) {
  let list = [...MOCK_PRODUCTS];

  if (params.category && params.category !== "all") {
    list = list.filter((p) => p.category_slug === params.category || p.category_id === params.category);
  }

  if (params.collection) {
    if (params.collection === "the-riviera-atelier") {
      list = list.filter((p) => ["prod-002", "prod-003", "prod-005", "prod-013"].includes(p.id));
    } else if (params.collection === "minimalist-cashmere") {
      list = list.filter((p) => ["prod-004", "prod-007", "prod-010", "prod-015"].includes(p.id));
    } else if (params.collection === "monochrome-tailoring") {
      list = list.filter((p) => ["prod-001", "prod-006", "prod-011", "prod-012"].includes(p.id));
    } else if (params.collection === "autumnal-solstice") {
      list = list.filter((p) => ["prod-020", "prod-021", "prod-022"].includes(p.id));
    }
  }

  if (params.size) {
    list = list.filter((p) => p.variants.some((v) => v.size.toLowerCase() === params.size?.toLowerCase() && v.stock > 0));
  }

  if (params.color) {
    list = list.filter((p) => p.variants.some((v) => v.color.toLowerCase().includes(params.color?.toLowerCase() || "")));
  }

  if (params.minPrice !== undefined) {
    list = list.filter((p) => (p.sale_price ?? p.base_price) >= (params.minPrice || 0));
  }

  if (params.maxPrice !== undefined) {
    list = list.filter((p) => (p.sale_price ?? p.base_price) <= (params.maxPrice || Infinity));
  }

  if (params.inStock) {
    list = list.filter((p) => (p.total_stock ?? 0) > 0);
  }

  if (params.onSale) {
    list = list.filter((p) => p.sale_price !== null && p.sale_price < p.base_price);
  }

  if (params.isNew) {
    list = list.filter((p) => p.is_new);
  }

  if (params.search) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.short_desc && p.short_desc.toLowerCase().includes(q)) ||
        (p.category_name && p.category_name.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sorting
  switch (params.sort) {
    case "newest":
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
    case "price-asc":
      list.sort((a, b) => (a.sale_price ?? a.base_price) - (b.sale_price ?? b.base_price));
      break;
    case "price-desc":
      list.sort((a, b) => (b.sale_price ?? b.base_price) - (a.sale_price ?? a.base_price));
      break;
    case "best-selling":
      list.sort((a, b) => (b.reviews_count ?? 0) - (a.reviews_count ?? 0));
      break;
    case "top-rated":
      list.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
      break;
    case "featured":
    default:
      list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
      break;
  }

  const total = list.length;
  const page = params.page || 1;
  const limit = params.limit || 12;
  const offset = (page - 1) * limit;
  const paginated = list.slice(offset, offset + limit);

  return {
    products: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export function getMockProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getMockCategories(): Category[] {
  return MOCK_CATEGORIES;
}

export function getMockCategoryBySlug(slug: string): Category | undefined {
  return MOCK_CATEGORIES.find((c) => c.slug === slug);
}

export function getMockCollections(): Collection[] {
  return MOCK_COLLECTIONS;
}

export function getMockCollectionBySlug(slug: string): Collection | undefined {
  return MOCK_COLLECTIONS.find((c) => c.slug === slug);
}

export function getMockReviews(productId: string): Review[] {
  return MOCK_REVIEWS.filter((r) => r.product_id === productId && r.is_approved);
}

export function validateMockCoupon(code: string, subtotal: number) {
  const coupon = MOCK_COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.is_active);
  if (!coupon) {
    return { valid: false, message: "Invalid or expired promotional code." };
  }
  if (subtotal < coupon.min_order) {
    return {
      valid: false,
      message: `Minimum order value of ₹${coupon.min_order} required for ${coupon.code}.`,
    };
  }

  let discount = 0;
  if (coupon.type === "percent") {
    discount = Math.round((subtotal * coupon.value) / 100);
    if (coupon.max_discount && discount > coupon.max_discount) {
      discount = coupon.max_discount;
    }
  } else {
    discount = coupon.value;
  }

  return {
    valid: true,
    coupon,
    discount,
    message: `Promotion code ${coupon.code} applied successfully!`,
  };
}

export function checkMockPincode(pincode: string) {
  const clean = pincode.trim();
  if (!/^\d{6}$/.test(clean)) {
    return {
      serviceable: false,
      message: "Please enter a valid 6-digit Indian PIN code.",
    };
  }

  const prefix = clean.slice(0, 2);
  const isServiceable = SERVICEABLE_PINCODE_PREFIXES.includes(prefix);

  if (isServiceable) {
    const today = new Date();
    const deliveryMin = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const deliveryMax = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };

    return {
      serviceable: true,
      codAvailable: true,
      estimatedDelivery: `${deliveryMin.toLocaleDateString("en-IN", options)} – ${deliveryMax.toLocaleDateString("en-IN", options)}`,
      message: "Standard express delivery & Cash on Delivery available.",
    };
  } else {
    return {
      serviceable: false,
      codAvailable: false,
      message: "Atelier courier does not currently service this pincode directly.",
    };
  }
}

// In-Memory Storage for Offline/Mock Submissions
export const MOCK_NEWSLETTER_SUBSCRIBERS = new Set<string>(["existing-vip@maisonaure.com"]);
export const MOCK_STOCK_NOTIFICATIONS: Array<{
  id: string;
  email: string;
  product_id?: string;
  variant_id?: string;
  created_at: string;
}> = [];

export function addMockNewsletterSubscriber(email: string, source: string = "website_footer") {
  const clean = email.trim().toLowerCase();
  if (MOCK_NEWSLETTER_SUBSCRIBERS.has(clean)) {
    return {
      success: false,
      isDuplicate: true,
      message: "This email address is already subscribed to the Atelier Dispatches.",
    };
  }
  MOCK_NEWSLETTER_SUBSCRIBERS.add(clean);
  return {
    success: true,
    isDuplicate: false,
    message: "Welcome to Maison Auré. Privilege code WELCOME10 has been issued.",
    code: "WELCOME10",
  };
}

export function addMockStockNotification(data: { email: string; productId?: string; variantId?: string }) {
  const entry = {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    email: data.email.trim().toLowerCase(),
    product_id: data.productId,
    variant_id: data.variantId,
    created_at: new Date().toISOString(),
  };
  MOCK_STOCK_NOTIFICATIONS.push(entry);
  return {
    success: true,
    message: "Your reservation notice has been recorded. You will receive 15-minute early access.",
    entry,
  };
}

export function addMockReview(newReview: Omit<Review, "id" | "created_at"> & { id?: string }) {
  const rev: Review = {
    ...newReview,
    id: newReview.id || `rev-client-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  MOCK_REVIEWS.unshift(rev);
  return rev;
}

