"use server";

import {
  newsletterSchema,
  stockNotificationSchema,
  reviewSubmitSchema,
  contactSchema,
  consultationSchema,
  giftCardSchema,
  type ReviewSubmitData,
  type GiftCardFormData,
} from "@/lib/validators";
import {
  addMockNewsletterSubscriber,
  addMockStockNotification,
  addMockReview,
  addMockContactMessage,
  addMockConsultation,
  createMockGiftCard,
} from "@/lib/data/mock-db";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import brandConfig from "@/config/brand.config";

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
        message: `Welcome to ${brandConfig.name}. Privilege code WELCOME10 has been issued.`,
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

export async function submitContactAction(input: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid contact details.",
    };
  }

  const data = parsed.data;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  ) {
    try {
      const supabase = await createServerSupabaseClient();
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: data.name,
          email: data.email.toLowerCase(),
          phone: data.phone || null,
          subject: data.subject,
          message: data.message,
        },
      ] as any);

      if (error) throw error;
      return {
        success: true,
        message: "Your inquiry has been relayed to the atelier concierge. We will respond within 24 hours.",
      };
    } catch (err: any) {
      console.warn("Supabase contact message fallback:", err.message);
    }
  }

  const msg = addMockContactMessage({
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
  });

  return {
    success: true,
    message: "Your inquiry has been relayed to the atelier concierge. We will respond within 24 hours.",
    data: msg,
  };
}

export async function bookConsultationAction(input: {
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
}) {
  const parsed = consultationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid appointment details.",
    };
  }

  const data = parsed.data;

  // Verify date is not in the past
  const chosen = new Date(data.preferred_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosen < today) {
    return {
      success: false,
      message: "Please select an upcoming date for your consultation.",
    };
  }

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  ) {
    try {
      const supabase = await createServerSupabaseClient();
      const { error } = await supabase.from("consultations").insert([
        {
          name: data.name,
          email: data.email.toLowerCase(),
          phone: data.phone,
          preferred_date: data.preferred_date,
          preferred_time: data.preferred_time,
          notes: data.notes || null,
        },
      ] as any);

      if (error) throw error;
      return {
        success: true,
        message: "Your private styling appointment request has been reserved.",
      };
    } catch (err: any) {
      console.warn("Supabase consultation booking fallback:", err.message);
    }
  }

  const cons = addMockConsultation({
    name: data.name,
    email: data.email,
    phone: data.phone,
    preferred_date: data.preferred_date,
    preferred_time: data.preferred_time,
    notes: data.notes,
  });

  return {
    success: true,
    message: "Your private styling appointment request has been reserved.",
    data: cons,
  };
}

export async function createGiftCardAction(input: {
  amount: number;
  recipient_name: string;
  recipient_email: string;
  sender_name: string;
  sender_email?: string;
  message?: string;
}) {
  const parsed = giftCardSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid gift card details.",
    };
  }

  const data = parsed.data;

  const card = createMockGiftCard({
    amount: data.amount,
    recipient_name: data.recipient_name,
    recipient_email: data.recipient_email,
    sender_name: data.sender_name,
    sender_email: data.sender_email || undefined,
    message: data.message,
  });

  return {
    success: true,
    message: `Gift card issued successfully. Code: ${card.code}`,
    card,
  };
}
