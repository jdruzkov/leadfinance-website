"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { getService, serviceGroups, type ServiceGroup } from "@/content/services";
import { clsx } from "@/lib/clsx";
import s from "./ring.module.css";

const COUNT = serviceGroups.length;
// The anchor group faces front first, so 01, 02, 03 read left to right.
const START = Math.max(0, serviceGroups.findIndex((g) => g.anchor));
const WIDE = "(min-width: 901px)";

/** Offset of a frame from the front, wrapped onto the ring: -COUNT/2 .. COUNT/2. */
const wrap = (o: number) => ((((o + COUNT / 2) % COUNT) + COUNT) % COUNT) - COUNT / 2;

/** Where a frame sits for a given ring position, as the custom properties the CSS reads. */
function placement(index: number, pos: number) {
  const o = wrap(index - pos);
  const a = Math.abs(o);
  return {
    "--o": o.toFixed(4),
    "--a": a.toFixed(4),
    "--haze": Math.min(0.5, a * 0.36).toFixed(3),
    // A frame crossing the back of the ring jumps sides there, so it is faded out while it does.
    opacity: a > 1.15 ? Math.max(0, 1 - (a - 1.15) / 0.3).toFixed(3) : "1",
    zIndex: String(Math.round(10 - a * 4)),
  };
}

// Computed once so server and client render the same resting position.
const initialStyle = serviceGroups.map((_, i) => placement(i, START) as CSSProperties);

function subscribeWide(onChange: () => void) {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

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
 * The services section of the landing page: three groups on a 3D ring. Drag or
 * flick it, use the arrows, the arrow keys or the See / Show / Plan switcher;
 * a click on a side frame brings it to the front. Below 901px it is a plain
 * column with every link live.
 *
 * The ring position is a float animated by a spring outside React, written to
 * custom properties on each frame. React only hears about it when the facing
 * frame changes.
 */
export function ServicesRing() {
  const [active, setActive] = useState(START);
  const [seen, setSeen] = useState(false);
  const wide = useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => true,
  );

  const ringRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLSpanElement>(null);
  const draggedRef = useRef(false);
  const pillPlaced = useRef(false);
  const api = useRef<{ goTo: (i: number) => void; step: (d: number) => void } | null>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let pos = START;
    let target = START;
    let vel = 0;
    let raf = 0;
    let facing = START;

    const place = () => {
      frameRefs.current.forEach((frame, i) => {
        if (!frame) return;
        Object.entries(placement(i, pos)).forEach(([key, value]) =>
          frame.style.setProperty(key === "zIndex" ? "z-index" : key, value),
        );
      });
      const now = ((Math.round(pos) % COUNT) + COUNT) % COUNT;
      if (now !== facing) {
        facing = now;
        setActive(now);
      }
    };

    // Spring toward the target, a touch under critical damping so it settles with a little give.
    const tick = () => {
      vel += (target - pos) * 0.085 - vel * 0.42;
      pos += vel;
      if (Math.abs(target - pos) < 0.0006 && Math.abs(vel) < 0.0006) {
        pos = target;
        vel = 0;
        raf = 0;
        place();
        return;
      }
      place();
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      if (reduced) {
        pos = target;
        place();
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };
    api.current = {
      // Always the short way round from wherever the ring is now.
      goTo: (i) => {
        target = Math.round(pos) + Math.round(wrap(i - Math.round(pos)));
        run();
      },
      step: (d) => {
        target = Math.round(target) + d;
        run();
      },
    };

    // Drag: the ring follows the pointer, a flick carries it on, release snaps to the nearest frame.
    const gap = () => Math.min(400, ring.clientWidth * 0.33);
    let drag: { x: number; pos: number; moved: number; last: number; t: number; v: number } | null = null;
    const onDown = (e: PointerEvent) => {
      if (e.button || !window.matchMedia(WIDE).matches) return;
      drag = { x: e.clientX, pos, moved: 0, last: e.clientX, t: performance.now(), v: 0 };
      draggedRef.current = false;
      cancelAnimationFrame(raf);
      raf = 0;
      vel = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const now = performance.now();
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      if (drag.moved > 6) {
        draggedRef.current = true;
        ring.classList.add(s.dragging);
      }
      drag.v = (e.clientX - drag.last) / Math.max(1, now - drag.t);
      drag.last = e.clientX;
      drag.t = now;
      pos = drag.pos - dx / gap();
      place();
    };
    const onUp = () => {
      if (!drag) return;
      const { moved, v } = drag;
      drag = null;
      ring.classList.remove(s.dragging);
      if (moved > 6) target = Math.round(pos - (v * 160) / gap());
      else target = Math.round(pos);
      run();
    };
    ring.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    // The whole ring leans a little toward the pointer.
    const area = ring.closest("section");
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let leanRaf = 0;
    const lean = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      ring.style.setProperty("--ry", (cx * 5).toFixed(2));
      ring.style.setProperty("--rx", (-cy * 3).toFixed(2));
      leanRaf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(lean) : 0;
    };
    const kick = () => {
      if (!leanRaf) leanRaf = requestAnimationFrame(lean);
    };
    const onLeanMove = (e: MouseEvent) => {
      const r = ring.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      kick();
    };
    const onLeanLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    const leans = !reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (leans && area) {
      area.addEventListener("mousemove", onLeanMove);
      area.addEventListener("mouseleave", onLeanLeave);
    }

    // Glyphs draw themselves the first time the ring scrolls into view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      // A margin rather than a ratio: the stacked phone layout is far taller than the screen.
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(ring);

    return () => {
      api.current = null;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(leanRaf);
      observer.disconnect();
      ring.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      area?.removeEventListener("mousemove", onLeanMove);
      area?.removeEventListener("mouseleave", onLeanLeave);
    };
  }, []);

  // Slide the switcher's marker under the active tab.
  useLayoutEffect(() => {
    const move = () => {
      const tab = tabRefs.current[active];
      const pill = pillRef.current;
      if (!tab || !pill) return;
      // The first placement is not a move, so it should not animate in from the corner.
      pill.style.transition = pillPlaced.current ? "" : "none";
      pill.style.width = `${tab.offsetWidth}px`;
      pill.style.translate = `${tab.offsetLeft}px 0`;
      if (!pillPlaced.current) requestAnimationFrame(() => (pillPlaced.current = true));
    };
    move();
    window.addEventListener("resize", move);
    document.fonts?.ready.then(move);
    return () => window.removeEventListener("resize", move);
  }, [active]);

  return (
    <div className={clsx(s.wrap, seen && s.seen)}>
      <div className={s.headRow}>
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

        <div className={s.tabs} role="tablist" aria-label="Service groups">
          <span ref={pillRef} className={s.pill} />
          {serviceGroups.map((group, i) => (
            <button
              key={group.number}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={clsx(s.tab, i === active && s.tabOn)}
              onClick={() => api.current?.goTo(i)}
            >
              <b>{group.number}</b>
              {group.verb}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={ringRef}
        className={s.ring}
        tabIndex={wide ? 0 : undefined}
        role="group"
        aria-roledescription={wide ? "carousel" : undefined}
        aria-label="Service groups"
        onKeyDown={(e) => {
          if (!wide) return;
          if (e.key === "ArrowRight") api.current?.step(1);
          if (e.key === "ArrowLeft") api.current?.step(-1);
        }}
        // A drag that ends over a link must not follow it.
        onClickCapture={(e) => {
          if (!draggedRef.current) return;
          draggedRef.current = false;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={s.inner}>
          {serviceGroups.map((group, i) => {
            const facing = i === active;
            return (
              <article
                key={group.number}
                ref={(node) => {
                  frameRefs.current[i] = node;
                }}
                className={clsx(s.frame, group.anchor && s.anchor, facing && s.active)}
                style={initialStyle[i]}
                onClick={() => {
                  if (wide && !facing) api.current?.goTo(i);
                }}
              >
                <header className={s.frameHead}>
                  <p className={s.num}>
                    <span>{group.number}</span>
                    <Glyph kind={group.glyph} />
                  </p>
                  <h3 className={s.frameTitle}>{group.title}</h3>
                  <p className={s.frameLead}>{group.lead}</p>
                </header>
                {group.slugs.map((slug, k) => {
                  const service = getService(slug);
                  if (!service) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/services/${slug}`}
                      className={s.svc}
                      style={{ "--k": k } as CSSProperties}
                      tabIndex={wide && !facing ? -1 : undefined}
                      draggable={false}
                    >
                      <h4 className={s.svcTitle}>{service.title}</h4>
                      <p className={s.svcBody}>{service.description}</p>
                      <span className={s.more}>
                        Learn more <Arrow />
                      </span>
                    </Link>
                  );
                })}
              </article>
            );
          })}
        </div>
      </div>

      <div className={s.floor} aria-hidden="true" />
      <div className={s.controls}>
        <button type="button" className={s.arrow} aria-label="Previous group" onClick={() => api.current?.step(-1)}>
          <Arrow />
        </button>
        <span>Drag, or pick a group</span>
        <button type="button" className={s.arrow} aria-label="Next group" onClick={() => api.current?.step(1)}>
          <Arrow />
        </button>
      </div>
    </div>
  );
}
