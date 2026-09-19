"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { getService, serviceGroups, type ServiceGroup } from "@/content/services";
import { clsx } from "@/lib/clsx";
import { Container } from "../Container";
import s from "./cards.module.css";

const Arrow = () => (
  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" aria-hidden="true">
    <path d="M0 4.5h13M9.5 1 13 4.5 9.5 8" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const len = (n: number) => ({ "--len": n }) as CSSProperties;

function Glyph({ kind }: { kind: ServiceGroup["glyph"] }) {
  if (kind === "bars") {
    return (
      <svg className={s.glyph} viewBox="0 0 56 36" aria-hidden="true">
        <line className={s.gBase} x1="2" y1="33" x2="54" y2="33" />
        {[10, 16, 13, 22, 28].map((h, k) => (
          <rect
            key={k}
            className={s.gBar}
            style={{ "--k": k } as CSSProperties}
            x={5 + k * 10}
            y={33 - h}
            width="6"
            height={h}
            rx="1"
          />
        ))}
      </svg>
    );
  }
  if (kind === "seal") {
    return (
      <svg className={s.glyph} viewBox="0 0 56 36" aria-hidden="true">
        <circle className={s.gDraw} style={len(88)} cx="28" cy="18" r="14" transform="rotate(-90 28 18)" />
        <path className={clsx(s.gDraw, s.gDrawLate)} style={len(24)} d="M21 18.5l5 5 9.5-10.5" />
      </svg>
    );
  }
  return (
    <svg className={s.glyph} viewBox="0 0 56 36" aria-hidden="true">
      <line className={s.gBase} x1="2" y1="33" x2="54" y2="33" />
      <path className={s.gDraw} style={len(44)} d="M4 28 15 21l9 4 11-12" />
      <path className={s.gProj} d="M35 13 52 4" />
      <circle className={s.gDot} cx="35" cy="13" r="2.6" />
    </svg>
  );
}

/**
 * The services section of the landing page: the three service groups as
 * separate cards, one colour, standing proud of a green panel that closes with
 * a prompt to book a call.
 *
 * It is a Client Component only for the scroll-in. The page renders complete
 * and visible; the script hides the cards just before they are scrolled to and
 * plays them in, and leaves everything alone if the section is already on
 * screen or the visitor prefers reduced motion.
 */
export function ServicesCards() {
  const rootRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const zone = zoneRef.current;
    if (!root || !zone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (zone.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    // The state lives in an attribute, not React state: nothing re-renders.
    root.dataset.reveal = "armed";
    // Watches the unclipped wrapper; the panel itself is clipped to nothing while armed.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        root.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(zone);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={s.root}>
      <Container>
        <div className="flex max-w-[62ch] flex-col gap-4">
          <p className="eyebrow">Services</p>
          <h2 className="max-w-[22ch] text-[clamp(2rem,3.9vw,3rem)] leading-[1.16] tracking-tight text-petrol-800">
            Everything a growing company needs from finance, in{" "}
            <em className="italic text-teal-600">three parts</em>.
          </h2>
          <p className="text-lg leading-relaxed text-ink-soft">
            Most companies do not need a finance department. They need to know
            how the business is performing, to give investors and funders
            numbers that hold up, and to plan the next twelve months with
            confidence. Every service below sits under one of those three.
          </p>
        </div>
      </Container>

      <div ref={zoneRef} className={s.zone}>
        <div className={s.panel}>
          <div className={s.cards}>
            {serviceGroups.map((group, i) => (
              <article key={group.number} className={s.card} style={{ "--i": i } as CSSProperties}>
                <header className={s.cardHead}>
                  <p className={s.num}>
                    <span>{group.number}</span>
                    <Glyph kind={group.glyph} />
                  </p>
                  <h3 className={s.cardTitle}>{group.title}</h3>
                  <p className={s.cardLead}>{group.lead}</p>
                </header>
                <div className={s.cardBody}>
                  {group.slugs.map((slug, k) => {
                    const service = getService(slug);
                    if (!service) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        className={s.svc}
                        style={{ "--k": k } as CSSProperties}
                      >
                        <h4 className={s.svcTitle}>{service.title}</h4>
                        <p className={s.svcBody}>{service.description}</p>
                        <span className={s.more}>
                          Learn more <Arrow />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <div className={s.closing}>
            <p className="max-w-[30ch] font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-bone">
              Not sure which part you need?{" "}
              <em className="italic text-gold-100">Start with a conversation.</em>
            </p>
            <Link
              href="#contact"
              className="rounded-brand bg-gold-100 px-7 py-4 font-medium text-petrol-900 transition-colors hover:bg-white"
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
