"use client";

import { useState } from "react";
import { services } from "@/content/services";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-2 w-full rounded-md border border-teal-100 bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-teal-600";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
      {/* Honeypot: bots fill this, humans never see it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium text-navy-800">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-navy-800">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="company" className="text-sm font-medium text-navy-800">
          Company
        </label>
        <input id="company" name="company" autoComplete="organization" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-medium text-navy-800">
          What do you need help with?
        </label>
        <select id="service" name="service" defaultValue="" className={fieldClass}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium text-navy-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${fieldClass} resize-y`}
          placeholder="Tell us briefly about your business and what you are trying to solve."
        />
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-md bg-teal-600 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>

        <p aria-live="polite" className="text-sm">
          {status === "sent" && (
            <span className="text-teal-700">
              Thank you — we will be in touch shortly.
            </span>
          )}
          {status === "error" && <span className="text-red-600">{error}</span>}
        </p>
      </div>
    </form>
  );
}
