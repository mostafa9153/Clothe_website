import { NextResponse } from "next/server";
import { createMockOrder } from "@/lib/data/mock-db";
import { sendOrderPlacedEmail } from "@/lib/email";
import { formatPrice } from "@/lib/utils";
import brandConfig from "@/config/brand.config";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      guestEmail,
      customerName,
      paymentMethod,
      shippingAddress,
      deliveryMethod,
      giftWrap,
      giftMessage,
      hidePricesOnInvoice,
      couponCode,
      notes,
      items,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: "Shopping bag contains no pieces." }, { status: 400 });
    }

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.line1 || !shippingAddress.pincode) {
      return NextResponse.json({ success: false, error: "Incomplete delivery address." }, { status: 400 });
    }

    // Atomic order creation & inventory decrement
    const defaultGuestEmail = `guest@${brandConfig.name.toLowerCase().replace(/[^a-z]/g, "") || "maisonaure"}.com`;
    const order = createMockOrder({
      userId: userId || null,
      guestEmail: guestEmail || defaultGuestEmail,
      customerName: customerName || shippingAddress.name,
      paymentMethod: paymentMethod || "razorpay",
      shippingAddress,
      deliveryMethod: deliveryMethod || "standard",
      giftWrap: Boolean(giftWrap),
      giftMessage: giftMessage || null,
      hidePricesOnInvoice: Boolean(hidePricesOnInvoice),
      couponCode: couponCode || null,
      notes: notes || null,
      items,
    });

    // Send transactional order confirmation email
    const itemsSummary = order.items.map((i) => `${i.name} (${i.size}, ${i.color}) × ${i.qty}`).join(", ");
    sendOrderPlacedEmail(order.guest_email || guestEmail, order.order_number, formatPrice(order.total), itemsSummary).catch(() => {});

    // For Razorpay TEST mode, create a simulated Razorpay Order ID & mock secret for verification
    let razorpayOptions = null;
    if (order.payment_method === "razorpay") {
      const razorpayOrderId = `order_${order.order_number.replace(/-/g, "_")}`;
      order.razorpay_order_id = razorpayOrderId;

      razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_maison_aure",
        amount: order.total * 100, // paisa
        currency: "INR",
        name: brandConfig.name,
        description: `Commission Reference ${order.order_number}`,
        order_id: razorpayOrderId,
        prefill: {
          name: order.shipping_address.name,
          email: order.guest_email || guestEmail,
          contact: order.shipping_address.phone,
        },
        theme: {
          color: "#111111",
        },
      };
    }

    return NextResponse.json({
      success: true,
      order,
      razorpayOptions,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Failed to create order." }, { status: 400 });
  }
}
