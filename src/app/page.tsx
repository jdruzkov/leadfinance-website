import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

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
        tinted
        eyebrow="How we work"
        title="A structured path from raw data to confident decisions"
      >
        <ol className="mt-14 grid gap-8 sm:grid-cols-2">
          {approach.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-teal-100 bg-white p-8"
            >
              <span className="font-display text-sm font-semibold tracking-widest text-teal-600">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink/75">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="about" eyebrow="About" title={`Who ${site.shortName} is`}>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              {site.name} is an Estonian financial management practice working
              with growing companies across Estonia and the wider EU. We act as
              the finance function that scaling businesses need but do not yet
              have in-house.
            </p>
            <p>
              Our work spans SaaS, hybrid, and project-based business models —
              from building the first real management reporting system, through
              budgeting and cash flow planning, to investor reporting and grant
              compliance.
            </p>
            {/* TODO: replace with founder bio, credentials, and client references. */}
          </div>

          <dl className="grid grid-cols-2 gap-6 self-start">
            {[
              { k: "Focus", v: "Management reporting & planning" },
              { k: "Based in", v: site.country },
              { k: "Works with", v: "SaaS, hybrid & project businesses" },
              { k: "Funding", v: "EAS & EU grant programmes" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-lg border border-teal-100 bg-teal-50 p-5"
              >
                <dt className="font-display text-xs font-semibold uppercase tracking-wider text-teal-600">
                  {item.k}
                </dt>
                <dd className="mt-2 font-medium text-navy-800">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section
        id="contact"
        tinted
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
