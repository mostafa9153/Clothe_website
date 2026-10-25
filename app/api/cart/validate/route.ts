import { NextResponse } from "next/server";
import { validateCartItems } from "@/lib/data/mock-db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = body.items || [];

    const result = validateCartItems(items);

    return NextResponse.json({
      success: true,
      valid: result.valid,
      items: result.correctedItems,
      messages: result.messages,
      priceChanged: result.priceChanged,
      stockChanged: result.stockChanged,
      subtotal: result.subtotal,
      totalGst: result.totalGst,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to validate bag items." },
      { status: 400 }
    );
  }
}
