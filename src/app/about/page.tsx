import type { Metadata } from "next";
import Image from "next/image";
import lolitaPhoto from "@/assets/lolita.jpg";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { about, site } from "@/content/site";

export const metadata: Metadata = {
  title: about.title,
  description: about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${about.title} — ${site.name}`,
    description: about.description,
    url: "/about",
    images: [{ url: lolitaPhoto.src }],
  },
};

export default function AboutPage() {
  const { founder } = about;

  return (
    <>
      <div className="bg-petrol-800 text-bone">
        <Container className="py-16 md:py-22">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.69rem] uppercase tracking-[0.13em] text-gold-400 transition-colors hover:text-bone"
          >
            ← Home
          </Link>
          <h1 className="mt-6 max-w-[22ch] text-[clamp(2.2rem,4.6vw,3.5rem)] tracking-tight text-bone">
            Finance leadership your board can{" "}
            <em className="italic text-gold-400">rely on</em>.
          </h1>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <figure className="m-0 md:sticky md:top-28 md:self-start">
            <Image
              src={lolitaPhoto}
              alt={founder.alt}
              priority
              sizes="(min-width: 768px) 34vw, 100vw"
              className="w-full rounded-brand border border-hairline-sand"
            />
            <figcaption className="mt-4 flex flex-col gap-1">
              <span className="font-display text-[1.25rem]">{founder.name}</span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-teal-600">
                {founder.role}
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-6">
            {about.body.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}

            <div className="mt-4">
              <Link
                href="/#contact"
                className="inline-block rounded-brand bg-petrol-800 px-7 py-4 font-medium text-bone transition-colors hover:bg-petrol-900"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand" title="At a glance">
        <dl className="mt-8 grid gap-px border border-hairline-sand bg-hairline-sand sm:grid-cols-2 lg:grid-cols-4">
          {about.facts.map((fact) => (
            <div key={fact.k} className="flex flex-col gap-2.5 bg-sand p-6">
              <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-teal-600">
                {fact.k}
              </dt>
              <dd className="text-[1.02rem] leading-snug text-ink">{fact.v}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
