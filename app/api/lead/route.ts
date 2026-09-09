import { NextResponse } from "next/server";

const AZUME_URL = "https://azume.herokuapp.com/api/open/leads";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email } = body as { name?: string; phone?: string; email?: string };

  if (!name || !phone) {
    return NextResponse.json({ error: "name and phone are required" }, { status: 400 });
  }

  const apiKey = process.env.AZUME_API_KEY;
  if (!apiKey) {
    console.error("AZUME_API_KEY not configured");
    return NextResponse.json({ ok: false, stage: "no-key" });
  }

  const digitsPhone = phone.replace(/\D/g, "");

  try {
    const res = await fetch(AZUME_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone: digitsPhone,
        ...(email ? { email } : {}),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Azume lead creation failed", res.status, text);
      return NextResponse.json({
        ok: false,
        stage: "azume-error",
        azumeStatus: res.status,
        azumeBody: text.slice(0, 500),
        keyPrefix: apiKey.slice(0, 8),
        keyLen: apiKey.length,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Azume lead creation error", err);
    return NextResponse.json({
      ok: false,
      stage: "fetch-throw",
      message: err instanceof Error ? err.message : String(err),
      keyPrefix: apiKey.slice(0, 8),
      keyLen: apiKey.length,
    });
  }
}
