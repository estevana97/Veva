"use client";

import { useState } from "react";

export default function JoinChallengeForm({ category, slug }: { category: string; slug: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [joined, setJoined] = useState<{ reference: string; title: string } | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/challenges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, category, slug }),
    });
    const data = await res.json();
    if (res.ok) {
      setJoined(data);
      setStatus("idle");
    } else {
      setError(data.error ?? "Something went wrong.");
      setStatus("error");
    }
  }

  if (joined) {
    return (
      <div className="mt-6 space-y-3 text-sm">
        <p className="font-serif text-xl">You&apos;re in.</p>
        <p>
          You&apos;ve joined <strong>{joined.title}</strong>. Your reference is{" "}
          <span className="font-medium">{joined.reference}</span>.
        </p>
        <p className="text-muted">Track your progress and collect your bonus Véva Points in the Véva app.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div>
        <label className="label" htmlFor="j-name">Name</label>
        <input id="j-name" name="name" required className="field" autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="j-email">Email</label>
        <input id="j-email" name="email" type="email" required className="field" autoComplete="email" />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button className="btn-solid w-full disabled:opacity-60" disabled={status === "sending"}>
        {status === "sending" ? "Joining…" : "Join the challenge"}
      </button>
    </form>
  );
}
