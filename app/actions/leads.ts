"use server";

import {
  newsletterSchema,
  stockNotificationSchema,
  reviewSubmitSchema,
  type ReviewSubmitData,
} from "@/lib/validators";
import {
  addMockNewsletterSubscriber,
  addMockStockNotification,
  addMockReview,
} from "@/lib/data/mock-db";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function subscribeNewsletterAction(input: { email: string; source?: string }) {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid email address format.",
    };
  }

  const { email, source } = parsed.data;

  // Attempt Supabase insert if live env is configured
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  ) {
    try {
      const supabase = await createServerSupabaseClient();
      const { error } = await supabase.from("newsletter_subscribers").insert([
        {
          email: email.toLowerCase(),
          source: source || "website_footer",
        },
      ] as any);


      if (error) {
        if (error.code === "23505" || error.message?.includes("unique")) {
          return {
            success: false,
            isDuplicate: true,
            message: "This email address is already subscribed to the Atelier Dispatches.",
          };
        }
        throw error;
      }

      return {
        success: true,
        isDuplicate: false,
        message: "Welcome to Maison Auré. Privilege code WELCOME10 has been issued.",
        code: "WELCOME10",
      };
    } catch (err: any) {
      console.warn("Supabase lead capture fallback:", err.message);
    }
  }

  // Fallback / mock layer
  return addMockNewsletterSubscriber(email, source);
}

export async function submitStockNotificationAction(input: {
  email: string;
  productId?: string;
  variantId?: string;
}) {
  const parsed = stockNotificationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid email address.",
    };
  }

  const { email, product_id, variant_id } = parsed.data;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  ) {
    try {
      const supabase = await createServerSupabaseClient();
      const { error } = await supabase.from("stock_notifications").insert([
        {
          email: email.toLowerCase(),
          product_id: product_id || null,
          variant_id: variant_id || null,
        },
      ] as any);

      if (error) throw error;

      return {
        success: true,
        message: "Your waitlist reservation notice has been recorded.",
      };
    } catch (err: any) {
      console.warn("Supabase stock notification fallback:", err.message);
    }
  }

  return addMockStockNotification({
    email,
    productId: product_id,
    variantId: variant_id,
  });
}

export async function submitReviewAction(input: ReviewSubmitData) {
  const parsed = reviewSubmitSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid review submission.",
    };
  }

  const data = parsed.data;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  ) {
    try {
      const supabase = await createServerSupabaseClient();
      const { data: rev, error } = await (supabase
        .from("reviews")
        .insert([
          {
            product_id: data.product_id,
            author_name: data.author_name,
            rating: data.rating,
            title: data.title,
            body: data.body,
            photos: data.photos || [],
            fit_feedback: data.fit_feedback || null,
            is_approved: true, // For demo purposes auto-approved or pending in admin
          },
        ] as any)
        .select()
        .single());


      if (error) throw error;
      return { success: true, review: rev };
    } catch (err: any) {
      console.warn("Supabase review submission fallback:", err.message);
    }
  }

  const mockRev = addMockReview({
    product_id: data.product_id,
    author_name: data.author_name,
    rating: data.rating,
    title: data.title,
    body: data.body,
    photos: data.photos || [],
    fit_feedback: data.fit_feedback || null,
    is_approved: true,
    user_id: null,
  });

  return { success: true, review: mockRev };
}
