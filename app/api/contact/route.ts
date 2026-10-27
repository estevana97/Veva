import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name?.trim() || !EMAIL.test(body?.email ?? "") || !body?.message?.trim()) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  // TODO: forward to an inbox (e.g. Resend, Postmark) using process.env.NOTIFY_EMAIL.
  console.log("Contact message", body);

  return NextResponse.json({ ok: true });
}
