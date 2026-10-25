import { NextResponse } from "next/server";
import { addMockReturnRequest, MOCK_ORDERS } from "@/lib/data/mock-db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { reason, notes, orderItemId, customerName, customerEmail } = body;

    const order = MOCK_ORDERS.find((o) => o.id === id || o.order_number === id);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const ret = addMockReturnRequest({
      orderId: order.id,
      orderNumber: order.order_number,
      orderItemId,
      reason: reason || "fit_too_small",
      notes,
      customerName: customerName || order.customer_name,
      customerEmail: customerEmail || order.guest_email || "",
    });

    return NextResponse.json({ success: true, returnRequest: ret });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
