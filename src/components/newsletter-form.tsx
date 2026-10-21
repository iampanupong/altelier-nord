"use client";

import { useState } from "react";

// Not wired to a provider yet: confirms locally without sending anything.
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <p className="type-caption">Thank you. You will hear from us soon.</p>;
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Email address"
        className="input-line"
      />
      <button type="submit" className="btn btn-primary btn-sm self-start">
        Subscribe
      </button>
    </form>
  );
}
