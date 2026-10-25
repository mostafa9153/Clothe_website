import { z } from "zod";

export const addressSchema = z.object({
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
  product_id: z.string().uuid(),
  variant_id: z.string().uuid(),
  name: z.string(),
  image: z.string().nullable().optional(),
  size: z.string(),
  color: z.string(),
  qty: z.number().int().positive("Quantity must be at least 1"),
  unit_price: z.number().positive(),
  gst_rate: z.number().nonnegative(),
});

export const orderCreateSchema = z.object({
  user_id: z.string().uuid().nullable().optional(),
  guest_email: z.string().email("Invalid email address").nullable().optional(),
  payment_method: z.enum(["razorpay", "cod"]),
  shipping_address: addressSchema,
  gift_wrap: z.boolean().default(false),
  gift_message: z.string().max(250, "Gift message cannot exceed 250 characters").optional(),
  coupon_code: z.string().optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one piece"),
});

export type OrderCreateData = z.infer<typeof orderCreateSchema>;

export const reviewSubmitSchema = z.object({
  product_id: z.string().uuid(),
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
  product_id: z.string().uuid().optional(),
  variant_id: z.string().uuid().optional(),
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
