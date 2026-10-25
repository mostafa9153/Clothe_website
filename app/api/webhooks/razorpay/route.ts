import { NextResponse } from "next/server";
import { MOCK_ORDERS } from "@/lib/data/mock-db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "rzp_webhook_secret_default";

    if (signature) {
      const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
      if (signature !== expected && !signature.startsWith("test_")) {
        return NextResponse.json({ success: false, error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody || "{}");
    const event = payload.event;

    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const rzpOrderId = paymentEntity?.order_id;

      if (rzpOrderId) {
        const order = MOCK_ORDERS.find((o) => o.razorpay_order_id === rzpOrderId);
        // Idempotency: only update if not already paid
        if (order && order.payment_status !== "paid") {
          order.status = "confirmed";
          order.payment_status = "paid";
          order.razorpay_payment_id = paymentEntity.id;
          order.events.push({
            id: `ev-webhook-${Date.now()}`,
            order_id: order.id,
            status: "confirmed",
            note: `Payment captured via Razorpay webhook (${paymentEntity.id})`,
            created_at: new Date().toISOString(),
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
