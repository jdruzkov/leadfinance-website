import Link from "next/link";
import { services } from "@/content/services";

/*
 * Gridlines live on the cards, not on the container. Drawing them the other
 * way (a hairline background showing through 1px gaps) paints every empty
 * cell too, which is visible whenever seven services do not fill the row.
 * Negative margins pull neighbouring borders onto each other so shared edges
 * stay a single hairline. The last card centres itself at three columns.
 */
export function ServicesGrid() {
  return (
    <ul className="mt-13 grid sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <li
          key={s.slug}
          className="-mb-px -mr-px flex border border-hairline lg:last:col-start-2"
        >
          <Link
            href={`/services/${s.slug}`}
            className="group flex flex-1 flex-col gap-3.5 bg-surface p-8 transition-colors hover:bg-white focus-visible:outline-offset-[-3px]"
          >
            <h3 className="font-display text-[1.32rem] leading-snug transition-colors group-hover:text-teal-600">
              {s.title}
            </h3>
            <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
              {s.description}
            </p>
            <span className="mt-1.5 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-teal-600">
              Learn more
              <svg
                width="14"
                height="14"
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
