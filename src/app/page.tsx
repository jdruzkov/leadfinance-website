import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ContactForm } from "@/components/ContactForm";
import Link from "next/link";
import { about } from "@/content/site";

const approach = [
  {
    step: "01",
    title: "Understand the business",
    body: "We start from how the company actually makes money — the model, the entities, the systems already in place — before touching a single report.",
  },
  {
    step: "02",
    title: "Build the reporting spine",
    body: "One unified framework across all entities, regardless of industry, country of operation, or accounting software, so every number traces back to a single source.",
  },
  {
    step: "03",
    title: "Plan forward, not backward",
    body: "Rolling forecasts, scenario planning, and runway monitoring turn historical bookkeeping into a forward-looking view management can act on.",
  },
  {
    step: "04",
    title: "Report with confidence",
    body: "Board packs, investor updates, and dashboards built around what stakeholders actually need to evaluate performance and make decisions.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="services"
        eyebrow="What we do"
        title="Financial management, built around your business"
        intro="Seven focused services covering everything from day-to-day reporting to investor due diligence and EU grant compliance."
      >
        <ServicesGrid />
      </Section>

      <Section
        id="approach"
        tone="petrol"
        eyebrow="How we work"
        title="A structured path from raw data to confident decisions"
      >
        <ol className="mt-13">
          {approach.map((item) => (
            <li
              key={item.step}
              className="grid grid-cols-[auto_1fr] items-start gap-x-7 gap-y-2 border-t border-bone/15 py-7 last:border-b last:border-bone/15"
            >
              <span className="row-span-2 pt-2 font-mono text-[0.76rem] tabular-nums tracking-[0.1em] text-gold-400">
                {item.step}
              </span>
              <h3 className="font-display text-[1.42rem] text-bone">
                {item.title}
              </h3>
              <p className="max-w-[62ch] leading-relaxed text-bone/75">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="about"
        tone="sand"
        eyebrow="About"
        title={about.title}
      >
        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink-soft">
            {about.summary.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p className="mt-1">
              <Link
                href="/about"
                className="inline-block rounded-brand border border-hairline-sand bg-surface px-7 py-4 font-medium text-ink transition-colors hover:border-ink-soft hover:bg-white"
              >
                Read more about us
              </Link>
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px self-start border border-hairline-sand bg-hairline-sand">
            {about.facts.map((item) => (
              <div key={item.k} className="flex flex-col gap-2.5 bg-sand p-6">
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-teal-600">
                  {item.k}
                </dt>
                <dd className="text-[1.02rem] leading-snug text-ink">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Tell us where the business stands"
        intro="Share a little about your company and what you are trying to solve. We will come back with how we would approach it."
      >
        <div className="mt-4 max-w-3xl">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
