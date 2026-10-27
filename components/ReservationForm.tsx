"use client";

import { useState } from "react";
import BookingQr from "@/components/BookingQr";
import { formatEuro, type Experience } from "@/lib/data";

type Confirmation = { reference: string; total: number; points: number; summary: string };

const today = () => new Date().toISOString().slice(0, 10);

export default function ReservationForm({ experience }: { experience: Experience }) {
  const { booking } = experience;
  const isEvent = booking.kind === "event";

  const [date, setDate] = useState(isEvent ? booking.date : "");
  const [time, setTime] = useState("");
  const [ticket, setTicket] = useState(isEvent ? booking.tickets[0].name : "");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const unitPrice = isEvent
    ? booking.tickets.find((t) => t.name === ticket)?.price ?? 0
    : experience.priceFrom;
  const total = (unitPrice ?? 0) * guests;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEvent && !time) {
      setError("Please choose a time.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: experience.category,
          slug: experience.slug,
          date,
          time,
          ticket,
          guests,
          name,
          email,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setConfirmation(data);
      setStatus("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (confirmation) {
    return (
      <div className="mt-6 space-y-3 text-sm">
        <p className="font-serif text-xl">Your reservation is confirmed.</p>
        <p>{confirmation.summary}</p>
        <p>
          Reference: <span className="font-medium">{confirmation.reference}</span>
        </p>
        <p>{confirmation.total > 0 ? `Estimated total: ${formatEuro(confirmation.total)}` : "You pay at the venue."}</p>
        <p>
          You earned <strong>{confirmation.points} Véva Points</strong> for this reservation.
        </p>
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <BookingQr reference={confirmation.reference} />
          <p className="text-xs leading-relaxed text-muted">
            Show this QR code at the venue. When it&apos;s scanned at payment, you earn 1 Véva Point for every €1 you
            spend, and your visit becomes a verified experience you can share.
          </p>
        </div>
        <button className="btn-small mt-2" onClick={() => setConfirmation(null)}>
          Make another reservation
        </button>
      </div>
    );
  }

  const unitLabel = isEvent ? "Tickets" : booking.unit;

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      {isEvent ? (
        <>
          <div>
            <span className="label">Event date</span>
            <p className="text-sm">
              {new Date(booking.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div>
            <label className="label" htmlFor="ticket">Ticket</label>
            <select id="ticket" className="field" value={ticket} onChange={(e) => setTicket(e.target.value)}>
              {booking.tickets.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name} — {formatEuro(t.price)}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="label" htmlFor="date">Date</label>
            <input id="date" type="date" required min={today()} className="field" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <span className="label">Time</span>
            <div className="grid grid-cols-3 gap-2">
              {booking.times.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  aria-pressed={time === t}
                  className={`border py-2 text-sm transition-colors ${time === t ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div>
        <label className="label" htmlFor="guests">{unitLabel}</label>
        <select id="guests" className="field" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
          {Array.from({ length: booking.maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input id="name" required className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="notes">Special requests</label>
        <textarea id="notes" rows={3} className="field" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Allergies, occasion, accessibility…" />
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="text-muted">{unitPrice !== undefined ? "Estimated total" : "Reservation"}</span>
        <span className="font-serif text-lg">{unitPrice !== undefined ? formatEuro(total) : "Free"}</span>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="btn-solid w-full disabled:opacity-60">
        {status === "sending" ? "Reserving…" : "Reserve"}
      </button>
      <p className="text-center text-xs text-muted">Free cancellation up to 48 hours before.</p>
    </form>
  );
}
