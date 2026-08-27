import Link from "next/link";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <li key={s.slug} className="flex">
          <Link
            href={`/services/${s.slug}`}
            className="group flex flex-1 flex-col rounded-xl border border-teal-100 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg hover:shadow-navy-900/5"
          >
            <h3 className="font-display text-lg font-semibold text-navy-800 transition-colors group-hover:text-teal-600">
              {s.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
              {s.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600">
              Learn more
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
