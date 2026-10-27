"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) return <p className="mt-8 text-sm">Thank you — your invitation is on its way.</p>;

  return (
    <form
      className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to your mailing list provider (e.g. Mailchimp, Brevo).
        setDone(true);
      }}
    >
      <input type="email" required placeholder="Your email" className="field flex-1" aria-label="Email" />
      <button className="btn-solid">Join</button>
    </form>
  );
}
