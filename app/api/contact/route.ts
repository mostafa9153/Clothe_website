import { NextResponse } from "next/server";
import { submitContactAction } from "@/app/actions/leads";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await submitContactAction(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process contact inquiry." },
      { status: 500 }
    );
  }
}
