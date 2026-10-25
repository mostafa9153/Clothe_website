import { NextResponse } from "next/server";
import { authenticateCredentials, createSessionCookie, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Please enter both email and password." }, { status: 400 });
    }

    const authResult = await authenticateCredentials(email, password);
    if (!authResult.success || !authResult.user) {
      return NextResponse.json({ success: false, error: authResult.error || "Authentication failed." }, { status: 401 });
    }

    const res = NextResponse.json({
      success: true,
      user: authResult.user,
    });

    // Set HTTP cookie
    res.cookies.set(SESSION_COOKIE_NAME, createSessionCookie(authResult.user), {
      path: "/",
      httpOnly: false, // accessible to client for fast hydration
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Sign in failed." }, { status: 500 });
  }
}
