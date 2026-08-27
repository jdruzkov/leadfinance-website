import Link from "next/link";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-800">
      {/* Soft teal wash, standing in for the photographic hero on the current site. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(26,108,122,0.55),transparent_55%),radial-gradient(circle_at_85%_90%,rgba(26,108,122,0.35),transparent_50%)]"
      />
      <Container className="relative py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
            Financial management · Estonia &amp; EU
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Financial clarity for growing companies
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/85">
            We build the management reporting, forecasting, and cash flow
            systems that let founders and boards see exactly where the business
            stands — and where it is heading.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#contact"
              className="rounded-md bg-teal-600 px-7 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-teal-500"
            >
              Book a call
            </Link>
            <Link
              href="#services"
              className="rounded-md border border-white/25 px-7 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore services
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
