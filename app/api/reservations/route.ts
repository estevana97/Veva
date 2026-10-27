import { NextResponse } from "next/server";
import { getExperience, reservationPoints } from "@/lib/data";

type Body = {
  category?: string;
  slug?: string;
  date?: string;
  time?: string;
  ticket?: string;
  guests?: number;
  name?: string;
  email?: string;
  notes?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const experience = getExperience(body.category ?? "", body.slug ?? "");
  if (!experience) return NextResponse.json({ error: "Experience not found." }, { status: 404 });

  const { booking } = experience;
  const guests = Number(body.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > booking.maxGuests) {
    return NextResponse.json({ error: `Choose between 1 and ${booking.maxGuests}.` }, { status: 400 });
  }
  if (!body.name?.trim() || !body.email || !EMAIL.test(body.email)) {
    return NextResponse.json({ error: "Please enter your name and a valid email address." }, { status: 400 });
  }

  // Recalculate the price on the server so the client can't change it.
  let unitPrice: number;
  let summary: string;
  if (booking.kind === "event") {
    const ticket = booking.tickets.find((t) => t.name === body.ticket);
    if (!ticket) return NextResponse.json({ error: "Please choose a ticket." }, { status: 400 });
    unitPrice = ticket.price;
    summary = `${guests} × ${ticket.name} for ${experience.title} on ${booking.date}.`;
  } else {
    if (!body.date || body.date < new Date().toISOString().slice(0, 10)) {
      return NextResponse.json({ error: "Please choose a date in the future." }, { status: 400 });
    }
    if (!body.time || !booking.times.includes(body.time)) {
      return NextResponse.json({ error: "Please choose an available time." }, { status: 400 });
    }
    unitPrice = experience.priceFrom ?? 0; // 0 = free table reservation, paid at the venue
    summary = `${experience.title} at ${experience.venue}, ${experience.city} on ${body.date} at ${body.time} for ${guests}.`;
  }

  const total = unitPrice * guests;
  const reference = `VEV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  // TODO: persist the reservation (e.g. Vercel Postgres / Supabase), a confirmation email,
  // and credit spend points when the venue scans the QR code (or the guest uploads a receipt).
  console.log("New reservation", { reference, experience: experience.slug, ...body, total });

  // Reservation points are earned now; spend points follow once the venue scans the QR code.
  return NextResponse.json({ reference, total, points: reservationPoints(experience), summary });
}
