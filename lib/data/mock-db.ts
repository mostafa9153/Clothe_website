import {
  Category,
  Collection,
  Product,
  Review,
  Coupon,
  JournalPost,
  Order,
  OrderItem,
  OrderEvent,
  Address,
  ReturnRequest,
  AbandonedCart,
  ActivityLog,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  Consultation,
  ContactMessage,
  GiftCard,
} from "@/types/database.types";
import {
  ISLAMIC_CATEGORIES,
  ISLAMIC_COLLECTIONS,
  ISLAMIC_PRODUCTS,
  ISLAMIC_REVIEWS,
  ISLAMIC_JOURNAL_POSTS,
} from "./islamic-catalog";

export const MOCK_CATEGORIES: Category[] = [...ISLAMIC_CATEGORIES];
export const MOCK_COLLECTIONS: Collection[] = [...ISLAMIC_COLLECTIONS];
export const MOCK_PRODUCTS: Product[] = [...ISLAMIC_PRODUCTS];
export const MOCK_REVIEWS: Review[] = [...ISLAMIC_REVIEWS];

export const MOCK_COUPONS: Coupon[] = [
  {
    code: "EID10",
    type: "percent",
    value: 10,
    min_order: 1500,
    max_discount: 2500,
    usage_limit: 1000,
    used_count: 55,
    starts_at: null,
    expires_at: null,
    is_active: true,
  },
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

export const MOCK_JOURNAL_POSTS: JournalPost[] = [...ISLAMIC_JOURNAL_POSTS];

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
    if (params.collection === "eid-collection" || params.collection === "the-riviera-atelier") {
      list = list.filter((p) => p.tags.includes("eid-collection") || ["prod-burkha-001", "prod-panjabi-001", "prod-hijab-001", "prod-set-001"].includes(p.id));
    } else if (params.collection === "ramadan-essentials" || params.collection === "minimalist-cashmere") {
      list = list.filter((p) => p.tags.includes("ramadan-essentials") || ["prod-burkha-003", "prod-niqab-002", "prod-set-003"].includes(p.id));
    } else if (params.collection === "dubai-nida-atelier" || params.collection === "monochrome-tailoring") {
      list = list.filter((p) => p.tags.includes("dubai-nida-atelier") || ["prod-burkha-001", "prod-burkha-003", "prod-burkha-005"].includes(p.id));
    } else if (params.collection === "autumnal-solstice") {
      list = list.filter((p) => ["prod-panjabi-004", "prod-burkha-002", "prod-set-001"].includes(p.id));
    } else if (params.collection) {
      const col = params.collection;
      list = list.filter((p) => p.tags.includes(col));
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

  const now = new Date();
  if (coupon.starts_at && new Date(coupon.starts_at) > now) {
    return { valid: false, message: `Promotional code ${coupon.code} is not yet active.` };
  }
  if (coupon.expires_at && new Date(coupon.expires_at) < now) {
    return { valid: false, message: `Promotional code ${coupon.code} has expired.` };
  }
  if (coupon.usage_limit !== null && coupon.usage_limit !== undefined && coupon.used_count >= coupon.usage_limit) {
    return { valid: false, message: `Promotional code ${coupon.code} usage limit has been reached.` };
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

// ==============================================================================
// USERS & PROFILES (Phase 7 & 9)
// ==============================================================================
export interface MockUser {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: "customer" | "admin";
  avatar_url?: string;
  password?: string;
  created_at: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-customer-1",
    email: "customer@demo.com",
    full_name: "Alisha Singhania",
    phone: "9876543210",
    role: "customer",
    password: "password123",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "user-admin-1",
    email: "admin@demo.com",
    full_name: "Marc Aurèle",
    phone: "9988776655",
    role: "admin",
    password: "adminpassword123",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    created_at: "2026-01-01T10:00:00Z",
  },
];

// ==============================================================================
// SAVED ADDRESSES (Phase 7 & 8)
// ==============================================================================
export const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr-001",
    user_id: "user-customer-1",
    name: "Alisha Singhania",
    phone: "9876543210",
    line1: "Apartment 14B, Sea Face Towers",
    line2: "Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400018",
    is_default: true,
  },
  {
    id: "addr-002",
    user_id: "user-customer-1",
    name: "Alisha Singhania",
    phone: "9876543210",
    line1: "Villa 7, Altinho Hill Residences",
    line2: "Near Bishop Palace",
    city: "Panaji",
    state: "Goa",
    pincode: "403001",
    is_default: false,
  },
];

// ==============================================================================
// ORDERS & TIMELINE (Phase 7, 8, 9)
// ==============================================================================
export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    order_number: "MA-2026-000101",
    user_id: "user-customer-1",
    guest_email: "customer@demo.com",
    customer_name: "Alisha Singhania",
    status: "delivered",
    payment_method: "razorpay",
    payment_status: "paid",
    razorpay_order_id: "order_mock_001",
    razorpay_payment_id: "pay_mock_001",
    subtotal: 24500,
    discount: 2450,
    shipping: 0,
    cod_fee: 0,
    gst_total: 2625,
    total: 22050,
    coupon_code: "WELCOME10",
    shipping_address: MOCK_ADDRESSES[0],
    gift_wrap: true,
    gift_message: "Happy Anniversary, with love.",
    tracking_number: "BD-88231019",
    courier: "BlueDart Express",
    notes: "Please call on arrival",
    created_at: "2026-02-14T11:20:00Z",
    items: [
      {
        id: "item-001",
        order_id: "ord-001",
        product_id: "prod-burkha-001",
        variant_id: "var-002-s",
        name: "The Royal Dubai Nida Front-Open Burkha",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
        size: "S",
        color: "Champagne",
        qty: 1,
        unit_price: 24500,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-01-1", order_id: "ord-001", status: "pending", note: "Order placed & payment verified", created_at: "2026-02-14T11:20:00Z" },
      { id: "ev-01-2", order_id: "ord-001", status: "confirmed", note: "Commission confirmed by atelier master", created_at: "2026-02-14T12:00:00Z" },
      { id: "ev-01-3", order_id: "ord-001", status: "processing", note: "Garment hand-pressed and packaged in luxury gift box", created_at: "2026-02-15T09:30:00Z" },
      { id: "ev-01-4", order_id: "ord-001", status: "shipped", note: "Dispatched via BlueDart Express (BD-88231019)", created_at: "2026-02-15T15:00:00Z" },
      { id: "ev-01-5", order_id: "ord-001", status: "delivered", note: "Delivered to Worli residence with signature", created_at: "2026-02-17T14:45:00Z" },
    ],
  },
  {
    id: "ord-002",
    order_number: "MA-2026-000102",
    user_id: "user-customer-1",
    guest_email: "customer@demo.com",
    customer_name: "Alisha Singhania",
    status: "shipped",
    payment_method: "razorpay",
    payment_status: "paid",
    razorpay_order_id: "order_mock_002",
    razorpay_payment_id: "pay_mock_002",
    subtotal: 28800,
    discount: 500,
    shipping: 0,
    cod_fee: 0,
    gst_total: 3086,
    total: 28300,
    coupon_code: "LUXE500",
    shipping_address: MOCK_ADDRESSES[0],
    gift_wrap: false,
    gift_message: null,
    tracking_number: "DL-9910442",
    courier: "Delhivery Air",
    notes: null,
    created_at: "2026-02-23T16:40:00Z",
    items: [
      {
        id: "item-002",
        order_id: "ord-002",
        product_id: "prod-panjabi-001",
        variant_id: "var-001-m",
        name: "Royal Hand-Embroidered Festive Eid Panjabi",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80",
        size: "M",
        color: "Camel",
        qty: 1,
        unit_price: 28800,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-02-1", order_id: "ord-002", status: "pending", note: "Order placed & settled", created_at: "2026-02-23T16:40:00Z" },
      { id: "ev-02-2", order_id: "ord-002", status: "confirmed", note: "Verified by atelier", created_at: "2026-02-23T17:15:00Z" },
      { id: "ev-02-3", order_id: "ord-002", status: "processing", note: "Passed strict quality & finishing inspection", created_at: "2026-02-24T10:00:00Z" },
      { id: "ev-02-4", order_id: "ord-002", status: "shipped", note: "Handed to Delhivery Air (DL-9910442)", created_at: "2026-02-24T18:00:00Z" },
    ],
  },
  {
    id: "ord-003",
    order_number: "MA-2026-000103",
    user_id: "user-customer-1",
    guest_email: "customer@demo.com",
    customer_name: "Alisha Singhania",
    status: "processing",
    payment_method: "razorpay",
    payment_status: "paid",
    razorpay_order_id: "order_mock_003",
    razorpay_payment_id: "pay_mock_003",
    subtotal: 58000,
    discount: 5000,
    shipping: 0,
    cod_fee: 0,
    gst_total: 6214,
    total: 53000,
    coupon_code: "AURÉ15",
    shipping_address: MOCK_ADDRESSES[0],
    gift_wrap: true,
    gift_message: "Maison Auré bespoke wardrobe edition.",
    tracking_number: null,
    courier: null,
    notes: null,
    created_at: "2026-02-25T09:15:00Z",
    items: [
      {
        id: "item-003",
        order_id: "ord-003",
        product_id: "prod-set-001",
        variant_id: "var-004-s",
        name: "The Signature 3-Piece Modest Set",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
        size: "S",
        color: "Oatmeal",
        qty: 1,
        unit_price: 58000,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-03-1", order_id: "ord-003", status: "pending", note: "Payment authorized", created_at: "2026-02-25T09:15:00Z" },
      { id: "ev-03-2", order_id: "ord-003", status: "confirmed", note: "Allocation assigned from Florence inventory", created_at: "2026-02-25T10:00:00Z" },
      { id: "ev-03-3", order_id: "ord-003", status: "processing", note: "Steamed & packaged in atelier garment bag", created_at: "2026-02-25T14:30:00Z" },
    ],
  },
  {
    id: "ord-004",
    order_number: "MA-2026-000104",
    user_id: null,
    guest_email: "rohan.mehta@outlook.com",
    customer_name: "Rohan Mehta",
    status: "confirmed",
    payment_method: "cod",
    payment_status: "pending",
    razorpay_order_id: null,
    razorpay_payment_id: null,
    subtotal: 16500,
    discount: 0,
    shipping: 0,
    cod_fee: 49,
    gst_total: 1768,
    total: 16549,
    coupon_code: null,
    shipping_address: {
      id: "addr-004",
      name: "Rohan Mehta",
      phone: "9820011223",
      line1: "42 Golf Links Avenue",
      line2: "Near Lodhi Gardens",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110003",
      is_default: true,
    },
    gift_wrap: false,
    gift_message: null,
    tracking_number: null,
    courier: null,
    notes: "Leave with building reception if unavailable",
    created_at: "2026-02-25T11:45:00Z",
    items: [
      {
        id: "item-004",
        order_id: "ord-004",
        product_id: "prod-niqab-001",
        variant_id: "var-006-32",
        name: "Pleated Wool Wide-Leg Trousers",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
        size: "32",
        color: "Obsidian",
        qty: 1,
        unit_price: 16500,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-04-1", order_id: "ord-004", status: "pending", note: "COD Order Placed", created_at: "2026-02-25T11:45:00Z" },
      { id: "ev-04-2", order_id: "ord-004", status: "confirmed", note: "Phone verification completed by concierge", created_at: "2026-02-25T12:30:00Z" },
    ],
  },
  {
    id: "ord-005",
    order_number: "MA-2026-000105",
    user_id: null,
    guest_email: "priya.kapoor@gmail.com",
    customer_name: "Priya Kapoor",
    status: "pending",
    payment_method: "razorpay",
    payment_status: "paid",
    razorpay_order_id: "order_mock_005",
    razorpay_payment_id: "pay_mock_005",
    subtotal: 12000,
    discount: 1200,
    shipping: 0,
    cod_fee: 0,
    gst_total: 1286,
    total: 10800,
    coupon_code: "WELCOME10",
    shipping_address: {
      id: "addr-005",
      name: "Priya Kapoor",
      phone: "9819922334",
      line1: "Flat 502, Orchid Heights",
      line2: "Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      is_default: true,
    },
    gift_wrap: false,
    gift_message: null,
    tracking_number: null,
    courier: null,
    notes: null,
    created_at: "2026-02-25T15:20:00Z",
    items: [
      {
        id: "item-005",
        order_id: "ord-005",
        product_id: "prod-hijab-001",
        variant_id: "var-003-m",
        name: "Pure Medina Silk Luxury Hijab",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        size: "M",
        color: "Ecru",
        qty: 1,
        unit_price: 12000,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-05-1", order_id: "ord-005", status: "pending", note: "Order placed awaiting concierge review", created_at: "2026-02-25T15:20:00Z" },
    ],
  },
  {
    id: "ord-006",
    order_number: "MA-2026-000106",
    user_id: "user-customer-1",
    guest_email: "customer@demo.com",
    customer_name: "Alisha Singhania",
    status: "delivered",
    payment_method: "razorpay",
    payment_status: "paid",
    razorpay_order_id: "order_mock_006",
    razorpay_payment_id: "pay_mock_006",
    subtotal: 42000,
    discount: 0,
    shipping: 0,
    cod_fee: 0,
    gst_total: 4500,
    total: 42000,
    coupon_code: null,
    shipping_address: MOCK_ADDRESSES[0],
    gift_wrap: true,
    gift_message: "For our travels.",
    tracking_number: "BD-7711209",
    courier: "BlueDart Express",
    notes: null,
    created_at: "2026-01-20T10:00:00Z",
    items: [
      {
        id: "item-006",
        order_id: "ord-006",
        product_id: "prod-burkha-002",
        variant_id: "var-008-os",
        name: "Tuscan Leather Weekender",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
        size: "One Size",
        color: "Espresso",
        qty: 1,
        unit_price: 42000,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-06-1", order_id: "ord-006", status: "pending", note: "Order placed", created_at: "2026-01-20T10:00:00Z" },
      { id: "ev-06-2", order_id: "ord-006", status: "shipped", note: "Dispatched with leather care wax kit", created_at: "2026-01-21T11:00:00Z" },
      { id: "ev-06-3", order_id: "ord-006", status: "delivered", note: "Delivered to Worli residence", created_at: "2026-01-23T16:00:00Z" },
    ],
  },
  {
    id: "ord-007",
    order_number: "MA-2026-000107",
    user_id: "user-customer-1",
    guest_email: "customer@demo.com",
    customer_name: "Alisha Singhania",
    status: "cancelled",
    payment_method: "razorpay",
    payment_status: "refunded",
    razorpay_order_id: "order_mock_007",
    razorpay_payment_id: "pay_mock_007",
    subtotal: 18500,
    discount: 1850,
    shipping: 0,
    cod_fee: 0,
    gst_total: 1982,
    total: 16650,
    coupon_code: "WELCOME10",
    shipping_address: MOCK_ADDRESSES[0],
    gift_wrap: false,
    gift_message: null,
    tracking_number: null,
    courier: null,
    notes: "Cancelled by patron prior to cutting",
    created_at: "2026-02-01T09:00:00Z",
    items: [
      {
        id: "item-007",
        order_id: "ord-007",
        product_id: "prod-panjabi-002",
        variant_id: "var-005-s",
        name: "Fine Irish Linen Leisure Shirt",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80",
        size: "S",
        color: "White",
        qty: 1,
        unit_price: 18500,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-07-1", order_id: "ord-007", status: "pending", note: "Order placed", created_at: "2026-02-01T09:00:00Z" },
      { id: "ev-07-2", order_id: "ord-007", status: "cancelled", note: "Patron requested cancellation. Inventory restored to stock.", created_at: "2026-02-01T10:30:00Z" },
    ],
  },
  {
    id: "ord-008",
    order_number: "MA-2026-000108",
    user_id: null,
    guest_email: "tanya.sharma@gmail.com",
    customer_name: "Tanya Sharma",
    status: "delivered",
    payment_method: "razorpay",
    payment_status: "paid",
    razorpay_order_id: "order_mock_008",
    razorpay_payment_id: "pay_mock_008",
    subtotal: 14500,
    discount: 500,
    shipping: 0,
    cod_fee: 0,
    gst_total: 1554,
    total: 14000,
    coupon_code: "LUXE500",
    shipping_address: {
      id: "addr-008",
      name: "Tanya Sharma",
      phone: "9871133445",
      line1: "B-12 Defence Colony",
      line2: "Ring Road",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110024",
      is_default: true,
    },
    gift_wrap: false,
    gift_message: null,
    tracking_number: "BD-6644201",
    courier: "BlueDart Express",
    notes: null,
    created_at: "2026-02-18T13:10:00Z",
    items: [
      {
        id: "item-008",
        order_id: "ord-008",
        product_id: "prod-panjabi-003",
        variant_id: "var-007-m",
        name: "Fine Gauge Cashmere Crewneck",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
        size: "M",
        color: "Stone Grey",
        qty: 1,
        unit_price: 14500,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-08-1", order_id: "ord-008", status: "pending", note: "Order placed", created_at: "2026-02-18T13:10:00Z" },
      { id: "ev-08-2", order_id: "ord-008", status: "shipped", note: "Dispatched via BlueDart", created_at: "2026-02-19T10:00:00Z" },
      { id: "ev-08-3", order_id: "ord-008", status: "delivered", note: "Delivered to Defence Colony", created_at: "2026-02-21T15:20:00Z" },
    ],
  },
  {
    id: "ord-009",
    order_number: "MA-2026-000109",
    user_id: null,
    guest_email: "vikram.malhotra@yahoo.com",
    customer_name: "Vikram Malhotra",
    status: "shipped",
    payment_method: "razorpay",
    payment_status: "paid",
    razorpay_order_id: "order_mock_009",
    razorpay_payment_id: "pay_mock_009",
    subtotal: 35000,
    discount: 3500,
    shipping: 0,
    cod_fee: 0,
    gst_total: 3750,
    total: 31500,
    coupon_code: "WELCOME10",
    shipping_address: {
      id: "addr-009",
      name: "Vikram Malhotra",
      phone: "9900112244",
      line1: "Penthouse 4, Prestige Palms",
      line2: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      is_default: true,
    },
    gift_wrap: true,
    gift_message: "To new beginnings.",
    tracking_number: "DL-3388190",
    courier: "Delhivery Air",
    notes: null,
    created_at: "2026-02-24T12:00:00Z",
    items: [
      {
        id: "item-009",
        order_id: "ord-009",
        product_id: "prod-panjabi-001",
        variant_id: "var-001-l",
        name: "Royal Hand-Embroidered Festive Eid Panjabi",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80",
        size: "L",
        color: "Camel",
        qty: 1,
        unit_price: 35000,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-09-1", order_id: "ord-009", status: "pending", note: "Order placed & verified", created_at: "2026-02-24T12:00:00Z" },
      { id: "ev-09-2", order_id: "ord-009", status: "shipped", note: "Dispatched to Bengaluru Hub (DL-3388190)", created_at: "2026-02-25T08:30:00Z" },
    ],
  },
  {
    id: "ord-010",
    order_number: "MA-2026-000110",
    user_id: "user-customer-1",
    guest_email: "customer@demo.com",
    customer_name: "Alisha Singhania",
    status: "delivered",
    payment_method: "cod",
    payment_status: "paid",
    razorpay_order_id: null,
    razorpay_payment_id: null,
    subtotal: 18000,
    discount: 0,
    shipping: 0,
    cod_fee: 49,
    gst_total: 1928,
    total: 18049,
    coupon_code: null,
    shipping_address: MOCK_ADDRESSES[0],
    gift_wrap: false,
    gift_message: null,
    tracking_number: "BD-1122334",
    courier: "BlueDart Express",
    notes: null,
    created_at: "2026-01-10T14:00:00Z",
    items: [
      {
        id: "item-010",
        order_id: "ord-010",
        product_id: "prod-niqab-001",
        variant_id: "var-006-30",
        name: "Pleated Wool Wide-Leg Trousers",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
        size: "30",
        color: "Obsidian",
        qty: 1,
        unit_price: 18000,
        gst_rate: 12,
      },
    ],
    events: [
      { id: "ev-10-1", order_id: "ord-010", status: "pending", note: "COD Order Placed", created_at: "2026-01-10T14:00:00Z" },
      { id: "ev-10-2", order_id: "ord-010", status: "shipped", note: "Dispatched via BlueDart", created_at: "2026-01-11T10:00:00Z" },
      { id: "ev-10-3", order_id: "ord-010", status: "delivered", note: "Delivered & COD collection reconciled", created_at: "2026-01-13T17:00:00Z" },
    ],
  },
];

// ==============================================================================
// RETURN REQUESTS (Phase 7 & 9)
// ==============================================================================
export const MOCK_RETURNS: ReturnRequest[] = [
  {
    id: "ret-001",
    order_id: "ord-001",
    order_number: "MA-2026-000101",
    order_item_id: "item-001",
    reason: "fit_too_small",
    notes: "I adore the champagne silk, but the ribcage measurement runs slightly tighter than expected. Would love to exchange for size M.",
    status: "requested",
    customer_name: "Alisha Singhania",
    customer_email: "customer@demo.com",
    created_at: "2026-02-18T10:00:00Z",
  },
  {
    id: "ret-002",
    order_id: "ord-008",
    order_number: "MA-2026-000108",
    order_item_id: "item-008",
    reason: "colour_variation",
    notes: "Stone grey looks slightly cooler under my lighting. Requesting store credit.",
    status: "approved",
    customer_name: "Tanya Sharma",
    customer_email: "tanya.sharma@gmail.com",
    created_at: "2026-02-22T11:30:00Z",
  },
];

// ==============================================================================
// ABANDONED CARTS (Phase 6 & 9)
// ==============================================================================
export const MOCK_ABANDONED_CARTS: AbandonedCart[] = [
  {
    id: "ac-001",
    session_id: "sess_vip_9921",
    email: "ananya.birla@outlook.com",
    items: [
      {
        product_id: "prod-set-001",
        variant_id: "var-004-m",
        name: "The Signature 3-Piece Modest Set",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
        size: "M",
        color: "Oatmeal",
        price: 58000,
        qty: 1,
      },
    ],
    subtotal: 58000,
    created_at: "2026-02-24T18:30:00Z",
    updated_at: "2026-02-24T18:45:00Z",
  },
  {
    id: "ac-002",
    session_id: "sess_guest_4410",
    email: "karan.j@gmail.com",
    items: [
      {
        product_id: "prod-burkha-001",
        variant_id: "var-002-s",
        name: "The Royal Dubai Nida Front-Open Burkha",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
        size: "S",
        color: "Champagne",
        price: 24500,
        qty: 1,
      },
      {
        product_id: "prod-hijab-001",
        variant_id: "var-003-s",
        name: "Pure Medina Silk Luxury Hijab",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        size: "S",
        color: "Ecru",
        price: 12000,
        qty: 1,
      },
    ],
    subtotal: 36500,
    created_at: "2026-02-25T07:10:00Z",
    updated_at: "2026-02-25T07:25:00Z",
  },
];

// ==============================================================================
// ADMINISTRATIVE ACTIVITY AUDIT LOG (Phase 9)
// ==============================================================================
export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "act-001",
    actor: "AZAD (Admin)",
    action: "Order Status Update",
    details: "Order AZ-2026-000102 marked as Dispatched via Delhivery Air",
    created_at: "2026-02-24T18:00:00Z",
  },
  {
    id: "act-002",
    actor: "AZAD (Admin)",
    action: "Return Approved",
    details: "Approved return request ret-002 for Order AZ-2026-000108",
    created_at: "2026-02-23T14:15:00Z",
  },
  {
    id: "act-003",
    actor: "AZAD (Admin)",
    action: "Coupon Created",
    details: "Created privilege coupon code EID10 (10% off for Eid)",
    created_at: "2026-02-20T11:00:00Z",
  },
  {
    id: "act-004",
    actor: "AZAD (Admin)",
    action: "Inventory Restocked",
    details: "Added 10 units to The Royal Dubai Nida Front-Open Burkha (Size 54)",
    created_at: "2026-02-19T09:30:00Z",
  },
];

// ==============================================================================
// SITE SETTINGS & HOMEPAGE BLOCKS (Phase 9)
// ==============================================================================
export interface SiteSettings {
  store_name: string;
  tagline: string;
  announcement_messages: string[];
  free_shipping_threshold: number;
  flat_shipping_rate: number;
  cod_enabled: boolean;
  cod_fee: number;
  cod_max_limit: number;
  return_window_days: number;
  gift_wrap_fee: number;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  maintenance_mode: boolean;
  serviceable_prefixes: string[];
  hero_slides: Array<{
    id: string;
    title: string;
    eyebrow: string;
    image: string;
    cta_primary: string;
    cta_primary_link: string;
    cta_secondary: string;
    cta_secondary_link: string;
  }>;
}

export let MOCK_SITE_SETTINGS: SiteSettings = {
  store_name: "MAISON AURÉ",
  tagline: "Haute Couture & Quiet Luxury Tailoring",
  announcement_messages: [
    "Complimentary insured courier on all commissions above ₹2,999",
    "Private styling appointments available in Mumbai & New Delhi",
    "The Riviera Atelier Collection is now in residence",
  ],
  free_shipping_threshold: 2999,
  flat_shipping_rate: 99,
  cod_enabled: true,
  cod_fee: 49,
  cod_max_limit: 50000,
  return_window_days: 10,
  gift_wrap_fee: 250,
  contact_email: "concierge@maisonaure.com",
  contact_phone: "+91 22 6900 1200",
  whatsapp_number: "+919876543210",
  maintenance_mode: false,
  serviceable_prefixes: SERVICEABLE_PINCODE_PREFIXES,
  hero_slides: [
    {
      id: "slide-1",
      eyebrow: "S/S 2026 Collection",
      title: "The Architecture of Quiet Poise",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90",
      cta_primary: "Explore Collection",
      cta_primary_link: "/shop",
      cta_secondary: "View Lookbook",
      cta_secondary_link: "/collections/the-riviera-atelier",
    },
    {
      id: "slide-2",
      eyebrow: "Artisanal Cashmere",
      title: "Uncompromising Warmth & Purity",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=2000&q=90",
      cta_primary: "Shop Outerwear",
      cta_primary_link: "/category/outerwear",
      cta_secondary: "Read The Journal",
      cta_secondary_link: "/journal",
    },
    {
      id: "slide-3",
      eyebrow: "Florence Tailoring",
      title: "Hand-Stitched Italian Canvassing",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90",
      cta_primary: "Explore Tailored",
      cta_primary_link: "/category/mens-shirts",
      cta_secondary: "Book Stylist",
      cta_secondary_link: "/consultation",
    },
  ],
};

// ==============================================================================
// CORE ATOMIC CART & ORDER ENGINES (Phase 6, 7, 8, 9)
// ==============================================================================

/**
 * Validates cart items against live catalog prices and stock levels.
 * Ensures client tampering never results in lower prices or overselling.
 */
export function validateCartItems(
  items: Array<{
    productId: string;
    variantId: string;
    name?: string;
    slug?: string;
    image?: string;
    size?: string;
    color?: string;
    price: number;
    qty: number;
    maxStock?: number;
    gstRate?: number;
  }>
) {
  const correctedItems: Array<typeof items[0]> = [];
  const messages: string[] = [];
  let priceChanged = false;
  let stockChanged = false;

  for (const item of items) {
    const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
    if (!product || !product.is_active) {
      messages.push(`"${item.name || "A selected piece"}" is no longer available in the atelier collection and has been removed.`);
      stockChanged = true;
      continue;
    }

    const variant = product.variants.find((v) => v.id === item.variantId);
    if (!variant || variant.stock <= 0) {
      messages.push(`"${product.name}" in ${item.size} (${item.color}) is currently sold out and has been removed from your bag.`);
      stockChanged = true;
      continue;
    }

    // Live authoritative price check
    const livePrice = variant.price_override ?? product.sale_price ?? product.base_price;
    if (item.price !== livePrice) {
      priceChanged = true;
      messages.push(`Price for "${product.name}" was adjusted to current atelier price (₹${livePrice.toLocaleString("en-IN")}).`);
    }

    // Live authoritative stock check
    let validQty = item.qty;
    if (validQty > variant.stock) {
      stockChanged = true;
      validQty = variant.stock;
      messages.push(`Quantity for "${product.name}" was adjusted to available stock (${variant.stock} available).`);
    }

    correctedItems.push({
      ...item,
      name: product.name,
      slug: product.slug,
      image: item.image || product.images[0]?.url || "",
      size: variant.size,
      color: variant.color,
      price: livePrice,
      qty: validQty,
      maxStock: variant.stock,
      gstRate: product.gst_rate || 12,
    });
  }

  const subtotal = correctedItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  const totalGst = correctedItems.reduce((sum, item) => {
    const itemTotal = item.price * item.qty;
    const rate = item.gstRate || 12;
    const gstPortion = itemTotal - itemTotal / (1 + rate / 100);
    return sum + Math.round(gstPortion);
  }, 0);

  return {
    valid: !priceChanged && !stockChanged && correctedItems.length === items.length,
    correctedItems,
    messages,
    priceChanged,
    stockChanged,
    subtotal,
    totalGst,
  };
}

/**
 * Creates an order atomically:
 * - Locks inventory row
 * - Decrements variant stock
 * - Decrements total product stock
 * - Creates Order and OrderItem records
 * - Appends first OrderEvent
 */
export function createMockOrder(orderData: {
  userId?: string | null;
  guestEmail: string;
  customerName: string;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  deliveryMethod?: "standard" | "express";
  giftWrap?: boolean;
  giftMessage?: string | null;
  hidePricesOnInvoice?: boolean;
  couponCode?: string | null;
  notes?: string | null;
  items: Array<{
    productId: string;
    variantId: string;
    name: string;
    image: string;
    size: string;
    color: string;
    qty: number;
    price: number;
    gstRate: number;
  }>;
}) {
  // 1. Verify stock before committing
  for (const item of orderData.items) {
    const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Product ${item.name} not found.`);
    }
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (!variant || variant.stock < item.qty) {
      throw new Error(`Insufficient atelier stock for ${item.name} (${item.size}).`);
    }
  }

  // 2. Decrement stock atomically
  for (const item of orderData.items) {
    const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
    if (product) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (variant) {
        variant.stock -= item.qty;
      }
      product.total_stock = product.variants.reduce((acc, v) => acc + v.stock, 0);
    }
  }

  // 3. Compute totals
  const subtotal = orderData.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discount = 0;
  if (orderData.couponCode) {
    const couponRes = validateMockCoupon(orderData.couponCode, subtotal);
    if (couponRes.valid && couponRes.discount) {
      discount = couponRes.discount;
      if (couponRes.coupon) {
        couponRes.coupon.used_count += 1;
      }
    }
  }

  const shipping = subtotal >= MOCK_SITE_SETTINGS.free_shipping_threshold ? 0 : MOCK_SITE_SETTINGS.flat_shipping_rate;
  const expressFee = orderData.deliveryMethod === "express" ? 250 : 0;
  const codFee = orderData.paymentMethod === "cod" ? MOCK_SITE_SETTINGS.cod_fee : 0;
  const giftWrapFee = orderData.giftWrap ? MOCK_SITE_SETTINGS.gift_wrap_fee : 0;

  const gstTotal = orderData.items.reduce((sum, item) => {
    const itemTotal = item.price * item.qty;
    const rate = item.gstRate || 12;
    const gstPortion = itemTotal - itemTotal / (1 + rate / 100);
    return sum + Math.round(gstPortion);
  }, 0);

  const total = Math.max(0, subtotal - discount + shipping + expressFee + codFee + giftWrapFee);

  // 4. Generate Order Reference
  const seq = Math.floor(100000 + Math.random() * 900000);
  const orderNumber = `MA-2026-${seq}`;
  const orderId = `ord-gen-${Date.now()}`;
  const now = new Date().toISOString();

  const newOrder: Order = {
    id: orderId,
    order_number: orderNumber,
    user_id: orderData.userId || null,
    guest_email: orderData.guestEmail,
    customer_name: orderData.customerName,
    status: orderData.paymentMethod === "cod" ? "confirmed" : "pending",
    payment_method: orderData.paymentMethod,
    payment_status: orderData.paymentMethod === "cod" ? "pending" : "paid",
    razorpay_order_id: orderData.paymentMethod === "razorpay" ? `order_rzp_${seq}` : null,
    razorpay_payment_id: orderData.paymentMethod === "razorpay" ? `pay_rzp_${seq}` : null,
    subtotal,
    discount,
    shipping: shipping + expressFee,
    cod_fee: codFee,
    gst_total: gstTotal,
    total,
    coupon_code: orderData.couponCode || null,
    shipping_address: orderData.shippingAddress,
    gift_wrap: Boolean(orderData.giftWrap),
    gift_wrap_fee: giftWrapFee,
    gift_message: orderData.giftMessage || null,
    hide_prices_on_invoice: Boolean(orderData.hidePricesOnInvoice),
    tracking_number: null,
    courier: null,
    notes: orderData.notes || null,
    created_at: now,
    items: orderData.items.map((i, idx) => ({
      id: `item-${seq}-${idx}`,
      order_id: orderId,
      product_id: i.productId,
      variant_id: i.variantId,
      name: i.name,
      image: i.image,
      size: i.size,
      color: i.color,
      qty: i.qty,
      unit_price: i.price,
      gst_rate: i.gstRate,
    })),
    events: [
      {
        id: `ev-${seq}-1`,
        order_id: orderId,
        status: orderData.paymentMethod === "cod" ? "confirmed" : "pending",
        note: orderData.paymentMethod === "cod" ? "Cash on Delivery commission registered" : "Online settlement authorized via Razorpay Test Gateway",
        created_at: now,
      },
    ],
  };

  MOCK_ORDERS.unshift(newOrder);

  // Add audit log
  MOCK_ACTIVITY_LOGS.unshift({
    id: `act-${Date.now()}`,
    actor: orderData.customerName,
    action: "New Order Commissioned",
    details: `Order ${orderNumber} placed for ₹${total.toLocaleString("en-IN")}`,
    created_at: now,
  });

  return newOrder;
}

/**
 * Restores product variant inventory atomically when an order is cancelled.
 */
export function cancelMockOrder(orderId: string, reason: string = "Patron cancellation") {
  const order = MOCK_ORDERS.find((o) => o.id === orderId || o.order_number === orderId);
  if (!order) {
    throw new Error(`Order ${orderId} not found.`);
  }

  if (order.status === "cancelled") {
    return { success: false, message: "Order is already cancelled." };
  }

  if (!["pending", "confirmed"].includes(order.status)) {
    return { success: false, message: "Cannot cancel order once it has entered packing or courier dispatch." };
  }

  // Restock every item in the order
  for (const item of order.items) {
    const product = MOCK_PRODUCTS.find((p) => p.id === item.product_id);
    if (product) {
      const variant = product.variants.find((v) => v.id === item.variant_id);
      if (variant) {
        variant.stock += item.qty;
      }
      product.total_stock = product.variants.reduce((acc, v) => acc + v.stock, 0);
    }
  }

  const now = new Date().toISOString();
  order.status = "cancelled";
  if (order.payment_status === "paid") {
    order.payment_status = "refunded";
  }

  order.events.push({
    id: `ev-cancel-${Date.now()}`,
    order_id: order.id,
    status: "cancelled",
    note: `Order cancelled (${reason}). Inventory restocked to atelier reserve.`,
    created_at: now,
  });

  MOCK_ACTIVITY_LOGS.unshift({
    id: `act-${Date.now()}`,
    actor: "Concierge System",
    action: "Order Cancelled & Restocked",
    details: `Order ${order.order_number} cancelled. Items restored to live stock.`,
    created_at: now,
  });

  return { success: true, order };
}

/**
 * Administrative order status update
 */
export function updateMockOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  noteOrOptions?:
    | string
    | {
        note?: string;
        courier?: string;
        courier_name?: string;
        carrier?: string;
        tracking_number?: string;
        trackingNumber?: string;
      },
  courierArg?: string,
  trackingNumberArg?: string
) {
  const order = MOCK_ORDERS.find((o) => o.id === orderId || o.order_number === orderId);
  if (!order) {
    throw new Error(`Order ${orderId} not found.`);
  }

  const note = typeof noteOrOptions === "string" ? noteOrOptions : noteOrOptions?.note;
  const courier =
    typeof noteOrOptions === "object"
      ? noteOrOptions.courier || noteOrOptions.carrier || noteOrOptions.courier_name
      : courierArg;
  const trackingNumber =
    typeof noteOrOptions === "object"
      ? noteOrOptions.tracking_number || noteOrOptions.trackingNumber
      : trackingNumberArg;

  const now = new Date().toISOString();
  order.status = newStatus;
  if (courier) {
    order.courier = courier;
    order.courier_name = courier;
  }
  if (trackingNumber) {
    order.tracking_number = trackingNumber;
  }

  order.events.push({
    id: `ev-${Date.now()}`,
    order_id: order.id,
    status: newStatus,
    note: note || `Order status updated to ${newStatus}`,
    created_at: now,
  });

  MOCK_ACTIVITY_LOGS.unshift({
    id: `act-${Date.now()}`,
    actor: "Marc Aurèle (Admin)",
    action: `Order Status: ${newStatus}`,
    details: `Order ${order.order_number} transitioned to ${newStatus}`,
    created_at: now,
  });

  return order;
}

/**
 * Return requests handling
 */
export function addMockReturnRequest(data: {
  orderId: string;
  orderNumber: string;
  orderItemId?: string;
  reason: string;
  notes?: string;
  customerName?: string;
  customerEmail?: string;
}) {
  const newReq: ReturnRequest = {
    id: `ret-${Date.now()}`,
    order_id: data.orderId,
    order_number: data.orderNumber,
    order_item_id: data.orderItemId,
    reason: data.reason,
    notes: data.notes,
    status: "requested",
    customer_name: data.customerName || "Patron",
    customer_email: data.customerEmail || "customer@demo.com",
    created_at: new Date().toISOString(),
  };
  MOCK_RETURNS.unshift(newReq);
  return newReq;
}

export function updateMockReturnStatus(id: string, status: "approved" | "rejected" | "completed") {
  const req = MOCK_RETURNS.find((r) => r.id === id);
  if (!req) throw new Error("Return request not found");
  req.status = status;
  return req;
}

/**
 * Abandoned cart recording
 */
export function recordMockAbandonedCart(data: {
  sessionId: string;
  email: string | null;
  items: AbandonedCart["items"];
  subtotal: number;
}) {
  const existing = MOCK_ABANDONED_CARTS.find((c) => c.session_id === data.sessionId);
  const now = new Date().toISOString();
  if (existing) {
    existing.email = data.email || existing.email;
    existing.items = data.items;
    existing.subtotal = data.subtotal;
    existing.updated_at = now;
    return existing;
  } else {
    const newCart: AbandonedCart = {
      id: `ac-${Date.now()}`,
      session_id: data.sessionId,
      email: data.email,
      items: data.items,
      subtotal: data.subtotal,
      created_at: now,
      updated_at: now,
    };
    MOCK_ABANDONED_CARTS.unshift(newCart);
    return newCart;
  }
}

/**
 * Administrative Reviews Moderation
 */
export function moderateMockReview(id: string, action: "approve" | "reject" | "delete") {
  const idx = MOCK_REVIEWS.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error("Review not found");
  if (action === "delete") {
    MOCK_REVIEWS.splice(idx, 1);
    return true;
  }
  MOCK_REVIEWS[idx].is_approved = action === "approve";
  return MOCK_REVIEWS[idx];
}

/**
 * Administrative Product CRUD
 */
export function createMockProduct(newProd: Product) {
  MOCK_PRODUCTS.unshift(newProd);
  MOCK_ACTIVITY_LOGS.unshift({
    id: `act-${Date.now()}`,
    actor: "Admin",
    action: "Product Created",
    details: `Added new piece: ${newProd.name}`,
    created_at: new Date().toISOString(),
  });
  return newProd;
}

export function updateMockProduct(id: string, updates: Partial<Product>) {
  const idx = MOCK_PRODUCTS.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  MOCK_PRODUCTS[idx] = { ...MOCK_PRODUCTS[idx], ...updates };
  return MOCK_PRODUCTS[idx];
}

export function deleteMockProduct(id: string) {
  const idx = MOCK_PRODUCTS.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  MOCK_PRODUCTS.splice(idx, 1);
  return true;
}

/**
 * Administrative Coupon CRUD
 */
export function createMockCoupon(coupon: Coupon) {
  MOCK_COUPONS.unshift(coupon);
  return coupon;
}

export function updateMockCoupon(code: string, updates: Partial<Coupon>) {
  const idx = MOCK_COUPONS.findIndex((c) => c.code.toUpperCase() === code.toUpperCase());
  if (idx === -1) throw new Error("Coupon not found");
  MOCK_COUPONS[idx] = { ...MOCK_COUPONS[idx], ...updates };
  return MOCK_COUPONS[idx];
}

export function deleteMockCoupon(code: string) {
  const idx = MOCK_COUPONS.findIndex((c) => c.code.toUpperCase() === code.toUpperCase());
  if (idx === -1) return false;
  MOCK_COUPONS.splice(idx, 1);
  return true;
}

/**
 * Administrative Site Settings CRUD
 */
export function updateMockSiteSettings(updates: Partial<SiteSettings>) {
  MOCK_SITE_SETTINGS = { ...MOCK_SITE_SETTINGS, ...updates };
  MOCK_ACTIVITY_LOGS.unshift({
    id: `act-${Date.now()}`,
    actor: "Admin",
    action: "Site Settings Updated",
    details: `Updated parameters: ${Object.keys(updates).join(", ")}`,
    created_at: new Date().toISOString(),
  });
  return MOCK_SITE_SETTINGS;
}

/**
 * Contact Messages Mock DB & Management
 */
export const MOCK_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "msg-01",
    name: "Devika Rao",
    email: "devika@rao.com",
    phone: "+91 98200 44556",
    subject: "Custom Length Dubai Nida Burkha Inquiry",
    message: "I am inquiring whether The Royal Dubai Nida Front-Open Burkha can be customized in length 53 inches for an upcoming Umrah journey.",
    status: "in_progress",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "msg-02",
    name: "Vikram Singhania",
    email: "vikram@singhania.com",
    phone: "+91 98111 22334",
    subject: "Eid Family Panjabi & Abaya Styling",
    message: "Inquiring about color-matching Father & Son festive panjabis for Eid prayers in Kolkata.",
    status: "resolved",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

export function addMockContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): ContactMessage {
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    status: "new",
    created_at: new Date().toISOString(),
  };
  MOCK_CONTACT_MESSAGES.unshift(newMsg);
  MOCK_ACTIVITY_LOGS.unshift({
    id: `act-${Date.now()}`,
    actor: data.name,
    action: "Contact Inquiry Received",
    details: `New message on: ${data.subject}`,
    created_at: new Date().toISOString(),
  });
  return newMsg;
}

export function updateMockContactMessageStatus(id: string, status: ContactMessage["status"]) {
  const msg = MOCK_CONTACT_MESSAGES.find((m) => m.id === id);
  if (!msg) throw new Error("Contact message not found");
  msg.status = status;
  return msg;
}

/**
 * Consultations Mock DB & Management
 */
export const MOCK_CONSULTATIONS: Consultation[] = [
  {
    id: "cons-01",
    name: "Tanya Kapoor",
    email: "tanya@kapoor.com",
    phone: "+91 99000 11223",
    preferred_date: new Date(Date.now() + 86400000 * 4).toISOString().slice(0, 10),
    preferred_time: "15:00 - 16:30",
    notes: "Looking for complete Eid modest capsule with matching Medina silk hijabs and niqabs.",
    status: "confirmed",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "cons-02",
    name: "Aditya Roy",
    email: "aditya@roy.com",
    phone: "+91 98765 11223",
    preferred_date: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10),
    preferred_time: "11:00 - 12:30",
    notes: "Festive zardozi embroidered panjabi styling session.",
    status: "requested",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export function addMockConsultation(data: {
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
}): Consultation {
  const newCons: Consultation = {
    id: `cons-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    preferred_date: data.preferred_date,
    preferred_time: data.preferred_time,
    notes: data.notes,
    status: "requested",
    created_at: new Date().toISOString(),
  };
  MOCK_CONSULTATIONS.unshift(newCons);
  MOCK_ACTIVITY_LOGS.unshift({
    id: `act-${Date.now()}`,
    actor: data.name,
    action: "Consultation Booked",
    details: `Private fitting requested for ${data.preferred_date} at ${data.preferred_time}`,
    created_at: new Date().toISOString(),
  });
  return newCons;
}

export function updateMockConsultationStatus(id: string, status: Consultation["status"]) {
  const cons = MOCK_CONSULTATIONS.find((c) => c.id === id);
  if (!cons) throw new Error("Consultation record not found");
  cons.status = status;
  return cons;
}

/**
 * Gift Cards Mock DB & Management
 */
export const MOCK_GIFT_CARDS: GiftCard[] = [
  {
    id: "gc-01",
    code: "AURE-GIFT-5000-DEMO",
    initial_amount: 5000,
    current_balance: 5000,
    recipient_name: "Esha Sharma",
    recipient_email: "esha@example.com",
    sender_name: "Rohan Varma",
    sender_email: "rohan@example.com",
    message: "A token of grace for your upcoming special milestone.",
    is_active: true,
    expires_at: new Date(Date.now() + 86400000 * 365).toISOString(),
    created_at: new Date().toISOString(),
  },
];

export function createMockGiftCard(data: {
  amount: number;
  recipient_name: string;
  recipient_email: string;
  sender_name: string;
  sender_email?: string;
  message?: string;
}): GiftCard {
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const code = `AURE-${data.amount}-${randomSuffix}`;
  const newCard: GiftCard = {
    id: `gc-${Date.now()}`,
    code,
    initial_amount: data.amount,
    current_balance: data.amount,
    recipient_name: data.recipient_name,
    recipient_email: data.recipient_email,
    sender_name: data.sender_name,
    sender_email: data.sender_email,
    message: data.message,
    is_active: true,
    expires_at: new Date(Date.now() + 86400000 * 365).toISOString(),
    created_at: new Date().toISOString(),
  };
  MOCK_GIFT_CARDS.unshift(newCard);
  MOCK_ACTIVITY_LOGS.unshift({
    id: `act-${Date.now()}`,
    actor: data.sender_name,
    action: "Gift Card Issued",
    details: `Issued ₹${data.amount} card to ${data.recipient_email} (${code})`,
    created_at: new Date().toISOString(),
  });
  return newCard;
}

export function redeemMockGiftCard(code: string, amount: number) {
  if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
    return { success: false, message: "Invalid redemption amount. Must be greater than 0." };
  }

  const card = MOCK_GIFT_CARDS.find((g) => g.code.toUpperCase() === code.trim().toUpperCase());
  if (!card) return { success: false, message: "Gift card code not found." };
  if (!card.is_active) return { success: false, message: "This gift card has been deactivated." };
  if (new Date(card.expires_at) < new Date()) return { success: false, message: "This gift card has expired." };
  if (card.current_balance <= 0) return { success: false, message: "Gift card balance has been fully redeemed." };

  const deduction = Math.min(card.current_balance, amount);
  card.current_balance -= deduction;
  return {
    success: true,
    deduction,
    remainingBalance: card.current_balance,
    card,
  };
}



