import { NextResponse } from "next/server";
import { cancelMockOrder } from "@/lib/data/mock-db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const reason = body.reason || "Patron cancellation requested from account";

    const res = cancelMockOrder(id, reason);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, order: res.order });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
