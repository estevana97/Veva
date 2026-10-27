"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus("sent");
    } else {
      setError((await res.json()).error ?? "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="font-serif text-2xl">Thank you. We&apos;ll be in touch within one business day.</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="label" htmlFor="c-name">Name</label>
        <input id="c-name" name="name" required className="field" autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required className="field" autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor="c-topic">Topic</label>
        <select id="c-topic" name="topic" className="field">
          <option>Reservation</option>
          <option>Rewards program</option>
          <option>Become a partner</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" rows={6} required className="field" />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button className="btn-solid" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
