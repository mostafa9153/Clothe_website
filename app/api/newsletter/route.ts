import { NextResponse } from "next/server";
import { subscribeNewsletterAction } from "@/app/actions/leads";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await subscribeNewsletterAction(body);

    const isDuplicate = "isDuplicate" in result && Boolean(result.isDuplicate);
    if (!result.success && !isDuplicate) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process newsletter subscription." },
      { status: 500 }
    );
  }
}
