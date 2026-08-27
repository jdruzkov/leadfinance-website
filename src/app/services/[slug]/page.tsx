import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { getService, services } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <div className="bg-navy-800">
        <Container className="py-20 md:py-24">
          <nav aria-label="Breadcrumb">
            <Link
              href="/#services"
              className="text-sm font-medium text-teal-200 transition-colors hover:text-white"
            >
              ← All services
            </Link>
          </nav>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/85">
            {service.description}
          </p>
        </Container>
      </div>

      <Section>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-ink/85">
          <p className="text-xl font-medium text-navy-800">{service.summary}</p>
          <p>{service.detail}</p>
        </div>

        <div className="mt-12">
          <Link
            href="/#contact"
            className="inline-block rounded-md bg-teal-600 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Discuss this service
          </Link>
        </div>
      </Section>

      <Section tinted title="Related services">
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug} className="flex">
              <Link
                href={`/services/${s.slug}`}
                className="flex flex-1 flex-col rounded-xl border border-teal-100 bg-white p-6 transition-colors hover:border-teal-200"
              >
                <h3 className="font-display text-base font-semibold text-navy-800">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {s.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
