import { NextResponse } from "next/server";
import { createSessionCookie, SESSION_COOKIE_NAME, SessionUser } from "@/lib/auth";
import { MOCK_USERS, MockUser } from "@/lib/data/mock-db";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { full_name, email, phone, password } = await req.json();

    if (!full_name || !email || !password) {
      return NextResponse.json({ success: false, error: "All required fields must be provided." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = MOCK_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return NextResponse.json({ success: false, error: "An atelier account is already registered with this email address." }, { status: 400 });
    }

    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      full_name,
      phone: phone || "",
      role: "customer",
      password,
      created_at: new Date().toISOString(),
    };

    MOCK_USERS.push(newUser);

    // Send Welcome Email asynchronously
    sendWelcomeEmail(cleanEmail, full_name).catch(() => {});

    const sessionUser: SessionUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.full_name,
      role: newUser.role,
      phone: newUser.phone,
    };

    const res = NextResponse.json({
      success: true,
      user: sessionUser,
    });

    res.cookies.set(SESSION_COOKIE_NAME, createSessionCookie(sessionUser), {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Registration failed." }, { status: 500 });
  }
}
