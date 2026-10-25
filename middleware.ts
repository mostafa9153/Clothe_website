import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { checkRateLimit } from "@/lib/security/rate-limiter";

const SESSION_COOKIE_NAME = "maison_patron_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit public API POST routes
  if (request.method === "POST" && pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateResult = checkRateLimit(`${ip}:${pathname}`, {
      windowMs: 60000,
      maxRequests: 30,
    });

    if (!rateResult.success) {
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: "Please wait before attempting further requests.",
          retryAfter: rateResult.resetSeconds,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": rateResult.resetSeconds.toString(),
          },
        }
      );
    }
  }

  // Let Supabase update cookies / tokens
  let response = await updateSession(request);

  // Check custom session cookie or Supabase session
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  let user: { role?: string; email?: string } | null = null;

  if (sessionCookie) {
    try {
      user = JSON.parse(decodeURIComponent(sessionCookie));
    } catch {
      user = null;
    }
  }

  // 1. Guard /account routes (except /account/login, /account/forgot-password, and order invoices)
  const isAccountRoute = pathname.startsWith("/account");
  const isAuthPage = pathname.startsWith("/account/login") || pathname.startsWith("/account/forgot-password");
  const isInvoicePage = pathname.includes("/invoice");

  if (isAccountRoute && !isAuthPage && !isInvoicePage) {
    if (!user) {
      const loginUrl = new URL("/account/login", request.url);
      loginUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Guard /admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  if (isAdminRoute) {
    if (!user) {
      const loginUrl = new URL("/account/login", request.url);
      loginUrl.searchParams.set("returnUrl", pathname);
      loginUrl.searchParams.set("adminRequired", "1");
      return NextResponse.redirect(loginUrl);
    }

    if (user.role !== "admin") {
      // Non-admin user attempting to access /admin
      const forbiddenUrl = new URL("/account", request.url);
      forbiddenUrl.searchParams.set("error", "unauthorized_admin");
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
