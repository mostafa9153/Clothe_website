import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  line1: z.string().min(5, "Flat, house, street address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Please enter a valid 6-digit Indian PIN code"),
  is_default: z.boolean().default(false),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const orderItemSchema = z.object({
  product_id: z.string().min(1, "Product ID is required"),
  variant_id: z.string().min(1, "Variant ID is required"),
  name: z.string(),
  image: z.string().nullable().optional(),
  size: z.string(),
  color: z.string(),
  qty: z.number().int().positive("Quantity must be at least 1"),
  unit_price: z.number().positive(),
  gst_rate: z.number().nonnegative(),
});

export type OrderItemData = z.infer<typeof orderItemSchema>;

export const orderCreateSchema = z.object({
  user_id: z.string().nullable().optional(),
  guest_email: z.string().email("Invalid email address").nullable().optional(),
  payment_method: z.enum(["razorpay", "cod"]),
  shipping_address: addressSchema,
  billing_address: addressSchema.optional(),
  gift_wrap: z.boolean().default(false),
  gift_message: z.string().max(250, "Gift message cannot exceed 250 characters").optional(),
  coupon_code: z.string().optional().nullable(),
  delivery_method: z.enum(["standard", "express"]).default("standard"),
  notes: z.string().max(500).optional().nullable(),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one piece"),
});

export type OrderCreateData = z.infer<typeof orderCreateSchema>;

export const reviewSubmitSchema = z.object({
  product_id: z.string().min(1, "Product ID is required"),
  author_name: z.string().min(2, "Please enter your name"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5 stars"),
  title: z.string().min(3, "Review headline is required").max(100),
  body: z.string().min(10, "Please share a few words about fit and fabric").max(1000),
  fit_feedback: z.enum(["runs_small", "true_to_size", "runs_large"]).nullable().optional(),
  photos: z.array(z.string().url()).default([]),
});

export type ReviewSubmitData = z.infer<typeof reviewSubmitSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  source: z.string().default("website_footer"),
});

export const stockNotificationSchema = z.object({
  product_id: z.string().optional(),
  variant_id: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const consultationSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  preferred_date: z.string().min(1, "Preferred date is required"),
  preferred_time: z.string().min(1, "Preferred time slot is required"),
  notes: z.string().max(400).optional(),
});

// Authentication Schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid patron email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter your registered patron email"),
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const returnRequestSchema = z.object({
  order_id: z.string().min(1, "Order ID is required"),
  order_item_id: z.string().optional(),
  reason: z.enum([
    "fit_too_small",
    "fit_too_large",
    "fabric_not_as_expected",
    "colour_variation",
    "defective_piece",
    "change_of_mind",
  ]),
  notes: z.string().max(300).optional(),
});
export type ReturnRequestFormData = z.infer<typeof returnRequestSchema>;

export const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  type: z.enum(["percent", "flat"]),
  value: z.number().positive("Value must be positive"),
  min_order: z.number().nonnegative("Minimum order must be 0 or more"),
  max_discount: z.number().positive().nullable().optional(),
  usage_limit: z.number().int().positive().nullable().optional(),
  starts_at: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  is_active: z.boolean().default(true),
});
export type CouponFormData = z.infer<typeof couponSchema>;

export const giftCardSchema = z.object({
  amount: z.number().int().min(1000, "Gift card minimum amount is ₹1,000"),
  recipient_name: z.string().min(2, "Recipient name is required"),
  recipient_email: z.string().email("Please enter a valid recipient email address"),
  sender_name: z.string().min(2, "Sender name is required"),
  sender_email: z.string().email("Please enter a valid sender email address").optional().or(z.literal("")),
  message: z.string().max(300, "Message cannot exceed 300 characters").optional(),
});
export type GiftCardFormData = z.infer<typeof giftCardSchema>;

