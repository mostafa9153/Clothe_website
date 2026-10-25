export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "customer" | "admin";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentMethod = "razorpay" | "cod";
export type CouponType = "percent" | "flat";
export type ReturnStatus = "requested" | "approved" | "rejected" | "completed";
export type ConsultationStatus = "requested" | "confirmed" | "completed" | "cancelled";
export type ContactMessageStatus = "new" | "in_progress" | "resolved";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          parent_id: string | null;
          image: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          parent_id?: string | null;
          image?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          parent_id?: string | null;
          image?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          banner_image: string | null;
          is_featured: boolean;
          launch_at: string | null;
          is_drop: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          banner_image?: string | null;
          is_featured?: boolean;
          launch_at?: string | null;
          is_drop?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          banner_image?: string | null;
          is_featured?: boolean;
          launch_at?: string | null;
          is_drop?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          short_desc: string | null;
          description: string | null;
          fabric: string | null;
          care: string | null;
          fit_notes: string | null;
          base_price: number;
          sale_price: number | null;
          gst_rate: number;
          category_id: string | null;
          is_active: boolean;
          is_featured: boolean;
          is_new: boolean;
          tags: string[];
          seo_title: string | null;
          seo_desc: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          short_desc?: string | null;
          description?: string | null;
          fabric?: string | null;
          care?: string | null;
          fit_notes?: string | null;
          base_price: number;
          sale_price?: number | null;
          gst_rate?: number;
          category_id?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          tags?: string[];
          seo_title?: string | null;
          seo_desc?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          short_desc?: string | null;
          description?: string | null;
          fabric?: string | null;
          care?: string | null;
          fit_notes?: string | null;
          base_price?: number;
          sale_price?: number | null;
          gst_rate?: number;
          category_id?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          tags?: string[];
          seo_title?: string | null;
          seo_desc?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_collections: {
        Row: {
          product_id: string;
          collection_id: string;
        };
        Insert: {
          product_id: string;
          collection_id: string;
        };
        Update: {
          product_id?: string;
          collection_id?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt: string | null;
          color: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt?: string | null;
          color?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          alt?: string | null;
          color?: string | null;
          sort_order?: number;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          sku: string;
          size: string;
          color: string;
          color_hex: string;
          stock: number;
          price_override: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          sku: string;
          size: string;
          color: string;
          color_hex?: string;
          stock?: number;
          price_override?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          sku?: string;
          size?: string;
          color?: string;
          color_hex?: string;
          stock?: number;
          price_override?: number | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string | null;
          author_name: string;
          rating: number;
          title: string | null;
          body: string | null;
          photos: string[];
          fit_feedback: string | null;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id?: string | null;
          author_name: string;
          rating: number;
          title?: string | null;
          body?: string | null;
          photos?: string[];
          fit_feedback?: string | null;
          is_approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string | null;
          author_name?: string;
          rating?: number;
          title?: string | null;
          body?: string | null;
          photos?: string[];
          fit_feedback?: string | null;
          is_approved?: boolean;
          created_at?: string;
        };
      };
      wishlists: {
        Row: {
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          phone: string;
          line1: string;
          line2: string | null;
          city: string;
          state: string;
          pincode: string;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          phone: string;
          line1: string;
          line2?: string | null;
          city: string;
          state: string;
          pincode: string;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          phone?: string;
          line1?: string;
          line2?: string | null;
          city?: string;
          state?: string;
          pincode?: string;
          is_default?: boolean;
          created_at?: string;
        };
      };
      coupons: {
        Row: {
          code: string;
          type: CouponType;
          value: number;
          min_order: number;
          max_discount: number | null;
          usage_limit: number | null;
          used_count: number;
          starts_at: string | null;
          expires_at: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          code: string;
          type: CouponType;
          value: number;
          min_order?: number;
          max_discount?: number | null;
          usage_limit?: number | null;
          used_count?: number;
          starts_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          code?: string;
          type?: CouponType;
          value?: number;
          min_order?: number;
          max_discount?: number | null;
          usage_limit?: number | null;
          used_count?: number;
          starts_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          guest_email: string | null;
          status: OrderStatus;
          payment_method: PaymentMethod;
          payment_status: PaymentStatus;
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          subtotal: number;
          discount: number;
          shipping: number;
          cod_fee: number;
          gst_total: number;
          total: number;
          coupon_code: string | null;
          shipping_address: Json;
          gift_wrap: boolean;
          gift_message: string | null;
          tracking_number: string | null;
          courier: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          guest_email?: string | null;
          status?: OrderStatus;
          payment_method: PaymentMethod;
          payment_status?: PaymentStatus;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          subtotal: number;
          discount?: number;
          shipping?: number;
          cod_fee?: number;
          gst_total?: number;
          total: number;
          coupon_code?: string | null;
          shipping_address: Json;
          gift_wrap?: boolean;
          gift_message?: string | null;
          tracking_number?: string | null;
          courier?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          guest_email?: string | null;
          status?: OrderStatus;
          payment_method?: PaymentMethod;
          payment_status?: PaymentStatus;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          subtotal?: number;
          discount?: number;
          shipping?: number;
          cod_fee?: number;
          gst_total?: number;
          total?: number;
          coupon_code?: string | null;
          shipping_address?: Json;
          gift_wrap?: boolean;
          gift_message?: string | null;
          tracking_number?: string | null;
          courier?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          variant_id: string;
          name: string;
          image: string | null;
          size: string;
          color: string;
          qty: number;
          unit_price: number;
          gst_rate: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          variant_id: string;
          name: string;
          image?: string | null;
          size: string;
          color: string;
          qty: number;
          unit_price: number;
          gst_rate: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          variant_id?: string;
          name?: string;
          image?: string | null;
          size?: string;
          color?: string;
          qty?: number;
          unit_price?: number;
          gst_rate?: number;
        };
      };
      order_events: {
        Row: {
          id: string;
          order_id: string;
          status: string;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          status: string;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          status?: string;
          note?: string | null;
          created_at?: string;
        };
      };
      return_requests: {
        Row: {
          id: string;
          order_id: string;
          order_item_id: string;
          reason: string;
          status: ReturnStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          order_item_id: string;
          reason: string;
          status?: ReturnStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          order_item_id?: string;
          reason?: string;
          status?: ReturnStatus;
          created_at?: string;
        };
      };
      stock_notifications: {
        Row: {
          id: string;
          product_id: string | null;
          variant_id: string | null;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          variant_id?: string | null;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          variant_id?: string | null;
          email?: string;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string | null;
          created_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          status: ContactMessageStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          status?: ContactMessageStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          status?: ContactMessageStatus;
          created_at?: string;
        };
      };
      consultations: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          preferred_date: string;
          preferred_time: string;
          notes: string | null;
          status: ConsultationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email: string;
          preferred_date: string;
          preferred_time: string;
          notes?: string | null;
          status?: ConsultationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string;
          preferred_date?: string;
          preferred_time?: string;
          notes?: string | null;
          status?: ConsultationStatus;
          created_at?: string;
        };
      };
      home_sections: {
        Row: {
          id: string;
          key: string;
          title: string | null;
          content: Json;
          sort_order: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          key: string;
          title?: string | null;
          content: Json;
          sort_order?: number;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          key?: string;
          title?: string | null;
          content?: Json;
          sort_order?: number;
          is_active?: boolean;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
        };
      };
      journal_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          body: string | null;
          cover_image: string | null;
          published_at: string | null;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          body?: string | null;
          cover_image?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          body?: string | null;
          cover_image?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          created_at?: string;
        };
      };
    };
    Functions: {
      create_order: {
        Args: {
          p_order: Json;
          p_items: Json;
        };
        Returns: {
          order_id: string;
          order_number: string;
          total: number;
        };
      };
      restock_on_cancel: {
        Args: {
          p_order_id: string;
        };
        Returns: boolean;
      };
      generate_order_number: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
  };
}

// Domain Model Types for UI and application consumption
export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string | null;
  image?: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  banner_image: string | null;
  is_featured: boolean;
  launch_at: string | null;
  is_drop: boolean;
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  size: string;
  color: string;
  color_hex: string;
  stock: number;
  price_override?: number | null;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  color: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_desc: string | null;
  description: string | null;
  fabric: string | null;
  care: string | null;
  fit_notes: string | null;
  base_price: number;
  sale_price: number | null;
  gst_rate: number;
  category_id: string | null;
  category_slug?: string;
  category_name?: string;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  tags: string[];
  seo_title: string | null;
  seo_desc: string | null;
  created_at: string;
  variants: ProductVariant[];
  images: ProductImage[];
  avg_rating?: number;
  reviews_count?: number;
  total_stock?: number;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string | null;
  author_name: string;
  rating: number;
  title: string | null;
  body: string | null;
  photos: string[];
  fit_feedback: "runs_small" | "true_to_size" | "runs_large" | null;
  is_approved: boolean;
  created_at: string;
}

export interface Coupon {
  code: string;
  type: CouponType;
  value: number;
  min_order: number;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Address {
  id: string;
  user_id?: string | null;
  name: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface OrderItem {
  id: string;
  order_id?: string;
  product_id: string;
  variant_id: string;
  name: string;
  image: string | null;
  size: string;
  color: string;
  qty: number;
  unit_price: number;
  gst_rate: number;
}

export interface OrderEvent {
  id: string;
  order_id: string;
  status: OrderStatus;
  note: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  guest_email: string | null;
  customer_name?: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  subtotal: number;
  discount: number;
  shipping: number;
  cod_fee: number;
  gst_total: number;
  total: number;
  coupon_code: string | null;
  shipping_address: Address;
  gift_wrap: boolean;
  gift_wrap_fee?: number;
  gift_message: string | null;
  hide_prices_on_invoice?: boolean;
  tracking_number: string | null;
  courier: string | null;
  notes: string | null;
  created_at: string;
  items: OrderItem[];
  events: OrderEvent[];
}

export interface ReturnRequest {
  id: string;
  order_id: string;
  order_number?: string;
  order_item_id?: string;
  reason: string;
  notes?: string;
  status: ReturnStatus;
  created_at: string;
  customer_name?: string;
  customer_email?: string;
}

export interface AbandonedCart {
  id: string;
  session_id: string;
  email: string | null;
  items: Array<{
    product_id: string;
    variant_id: string;
    name: string;
    image: string;
    size: string;
    color: string;
    price: number;
    qty: number;
  }>;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  actor: string;
  action: string;
  details: string;
  created_at: string;
}

