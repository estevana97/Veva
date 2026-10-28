import { NextResponse } from "next/server";
import { getExperience } from "@/lib/data";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const challenge = getExperience(body?.category ?? "", body?.slug ?? "");
  if (!challenge || challenge.booking.kind !== "join") {
    return NextResponse.json({ error: "Challenge not found." }, { status: 404 });
  }
  if (!body?.name?.trim() || !EMAIL.test(body?.email ?? "")) {
    return NextResponse.json({ error: "Please enter your name and a valid email address." }, { status: 400 });
  }

  const reference = `VCH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  // TODO: store the sign-up and track completed stages (needs a database and member accounts).
  console.log("Challenge sign-up", { reference, challenge: challenge.slug, name: body.name, email: body.email });

  return NextResponse.json({ reference, title: challenge.title });
}
