import { NextResponse } from "next/server";
import { recordMockAbandonedCart } from "@/lib/data/mock-db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, email, items, subtotal } = body;

    if (!sessionId || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: "No items to snapshot." });
    }

    const snapshot = recordMockAbandonedCart({
      sessionId,
      email: email || null,
      items,
      subtotal: subtotal || 0,
    });

    return NextResponse.json({ success: true, snapshot });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
