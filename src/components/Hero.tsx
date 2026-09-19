import Link from "next/link";
import { Container } from "./Container";
import { BoardDeck } from "./board/BoardDeck";

export function Hero() {
  return (
    // The deck tilts in 3D and its chips overhang the column, so clip sideways.
    <section className="overflow-x-clip bg-bone">
      <Container className="grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[0.94fr_1.06fr] lg:gap-18">
        <div>
          <p className="eyebrow">Financial management · Fractional CFO</p>
          <h1 className="mt-6 text-[clamp(2.7rem,6vw,4.4rem)] leading-[1.04] tracking-tight">
            Financial clarity for{" "}
            <em className="italic text-teal-600">growing companies</em>.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            We build the management reporting, forecasting, and cash flow
            systems that let founders and boards see exactly where the business
            stands, and where it is heading.
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

        <BoardDeck />
      </Container>
    </section>
  );
}
