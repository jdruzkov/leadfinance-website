import Link from "next/link";
import { Container } from "./Container";

/**
 * Illustrative board-pack extract. These are placeholder figures for the
 * design, not any company's real numbers — the caption says so, and it
 * should be swapped for a real anonymised extract before launch.
 */
const boardPack = [
  { label: "Revenue", value: "1 240 000", delta: "+8.4%" },
  { label: "Gross margin", value: "68.2%", delta: "+1.1pp" },
  { label: "Operating result", value: "-142 000", delta: "+12.0%" },
  { label: "Cash at bank", value: "2 380 000", delta: "-4.2%" },
];

export function Hero() {
  return (
    <section className="bg-bone">
      <Container className="grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.04fr_0.96fr] lg:gap-18">
        <div>
          <p className="eyebrow">Financial management · Estonia &amp; EU</p>
          <h1 className="mt-6 text-[clamp(2.7rem,6vw,4.4rem)] leading-[1.04] tracking-tight">
            Financial clarity for{" "}
            <em className="italic text-teal-600">growing companies</em>.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            We build the management reporting, forecasting, and cash flow
            systems that let founders and boards see exactly where the business
            stands — and where it is heading.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="rounded-brand bg-petrol-800 px-7 py-4 font-medium text-bone transition-colors hover:bg-petrol-900"
            >
              Book a call
            </Link>
            <Link
              href="#services"
              className="rounded-brand border border-hairline-sand bg-surface px-7 py-4 font-medium transition-colors hover:border-ink-soft hover:bg-white"
            >
              Explore services
            </Link>
          </div>
          <p className="mt-5 text-[0.92rem] text-ink-soft">
            Thirty minutes, no charge, no obligation.
          </p>
        </div>

        <figure className="m-0">
          <div className="overflow-hidden rounded-brand bg-surface shadow-[0_1px_2px_rgba(27,27,24,0.05),0_18px_44px_rgba(27,27,24,0.09)]">
            <div className="flex items-center justify-between gap-4 bg-petrol-800 px-7 py-4 font-mono text-[0.71rem] uppercase tracking-[0.15em] text-bone">
              <span>Monthly board pack</span>
              <span>September</span>
            </div>
            <div className="px-7 pb-7 pt-2">
              {boardPack.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-5 border-b border-hairline py-[18px]"
                >
                  <span className="text-[1.02rem]">{row.label}</span>
                  <span className="text-right font-mono text-[1.02rem] font-medium tabular-nums">
                    {row.value}
                  </span>
                  <span className="min-w-[5.4ch] text-right font-mono text-[0.85rem] tabular-nums text-teal-600">
                    {row.delta}
                  </span>
                </div>
              ))}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-brand bg-gold-100 px-7 py-6">
                <span className="font-mono text-[0.71rem] uppercase tracking-[0.15em] text-[#5c4a20]">
                  Runway
                </span>
                <strong className="font-display text-[clamp(1.7rem,3.2vw,2.15rem)] font-normal">
                  14 months
                </strong>
              </div>
            </div>
          </div>
          <figcaption className="mt-4 text-right font-mono text-[0.71rem] text-ink-soft">
            Illustrative figures. Replace with a real anonymised extract.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
