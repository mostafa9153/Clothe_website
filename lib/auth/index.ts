import { cookies } from "next/headers";
import { MOCK_USERS, MockUser } from "@/lib/data/mock-db";

export const SESSION_COOKIE_NAME = "maison_patron_session";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
  phone?: string;
  avatarUrl?: string;
}

export function parseSessionCookie(cookieValue: string): SessionUser | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue)) as SessionUser;
    if (parsed && parsed.id && parsed.email) {
      return parsed;
    }
  } catch {
    // invalid cookie
  }
  return null;
}

/**
 * Reads user session from cookies.
 * Supports demo cookie fallback and Supabase session.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie) {
    const user = parseSessionCookie(sessionCookie);
    if (user) return user;
  }

  // Check Supabase session if configured
  try {
    const { createServerSupabaseClient } = await import("@/lib/supabase/server");
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email) {
      // Find role from profiles or metadata
      const role = (user.user_metadata?.role as "customer" | "admin") || "customer";
      return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email.split("@")[0],
        role: role,
        phone: user.user_metadata?.phone,
        avatarUrl: user.user_metadata?.avatar_url,
      };
    }
  } catch {
    // Supabase credentials not set or network unavailable
  }

  return null;
}

/**
 * Creates session cookie payload
 */
export function createSessionCookie(user: SessionUser) {
  return encodeURIComponent(JSON.stringify(user));
}

/**
 * Authenticates email + password against mock users or Supabase
 */
export async function authenticateCredentials(email: string, password: string): Promise<{ success: boolean; user?: SessionUser; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check Mock Users first for instant demo evaluation
  const mockUser = MOCK_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
  if (mockUser) {
    if (mockUser.password === password || password === "password123" || password === "demo123" || password === "admin123") {
      return {
        success: true,
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.full_name,
          role: mockUser.role,
          phone: mockUser.phone,
          avatarUrl: mockUser.avatar_url,
        },
      };
    } else {
      return {
        success: false,
        error: "The password provided does not match our atelier records.",
      };
    }
  }

  // 2. Fallback to Supabase Auth if configured
  try {
    const { createServerSupabaseClient } = await import("@/lib/supabase/server");
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error || !data.user) {
      return {
        success: false,
        error: error?.message || "Invalid patron credentials.",
      };
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.full_name || data.user.email!.split("@")[0],
        role: (data.user.user_metadata?.role as "customer" | "admin") || "customer",
        phone: data.user.user_metadata?.phone,
      },
    };
  } catch {
    return {
      success: false,
      error: "Invalid email address or patron record not found.",
    };
  }
}
