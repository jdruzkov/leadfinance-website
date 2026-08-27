"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { site } from "@/content/site";

type Status = "idle" | "error";

const fieldClass =
  "mt-2 w-full rounded-brand border border-hairline-sand bg-surface px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-teal-600";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  /*
   * GitHub Pages cannot run a server, so there is no endpoint to post to.
   * The form validates here and hands the enquiry to the visitor's mail
   * client, pre-addressed and pre-filled. Swap this for a real endpoint
   * (Resend, Postmark, Formspree) when the site moves to a host that runs
   * Node — the field names already match what the old API route expected.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill this, humans never see it.
    if (data.get("company_website")) return;

    const name = (data.get("name") ?? "").toString().trim();
    const email = (data.get("email") ?? "").toString().trim();
    const company = (data.get("company") ?? "").toString().trim();
    const service = (data.get("service") ?? "").toString().trim();
    const message = (data.get("message") ?? "").toString().trim();

    if (!name || !email || !message) {
      setError("Add your name, email, and a message.");
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("That email address does not look right.");
      setStatus("error");
      return;
    }

    const chosen = services.find((s) => s.slug === service);
    const subject = chosen
      ? `Enquiry: ${chosen.title}`
      : "Enquiry via leadfinance.eu";
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      chosen ? `Service: ${chosen.title}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    setStatus("idle");
    setError(null);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
      {/* Honeypot: bots fill this, humans never see it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
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
        <label htmlFor="company" className="text-sm font-medium text-ink">
          Company
        </label>
        <input id="company" name="company" autoComplete="organization" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-medium text-ink">
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
        <label htmlFor="message" className="text-sm font-medium text-ink">
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
          className="rounded-brand bg-petrol-800 px-7 py-3.5 text-base font-medium text-bone transition-colors hover:bg-petrol-900"
        >
          Send enquiry
        </button>

        <p aria-live="polite" className="text-sm">
          {status === "error" && <span className="text-[#a33c2f]">{error}</span>}
        </p>

        <p className="text-sm text-ink-soft">
          Opens in your email app, addressed to {site.email}.
        </p>
      </div>
    </form>
  );
}
