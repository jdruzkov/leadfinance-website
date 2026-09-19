"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrChart, CashBox, CostBase, Kpis, RevenueChart, YtdTable } from "./panels";
import s from "./board.module.css";

const panels = [
  { title: "Headline", meta: "September 2026" },
  { title: "ARR movement", meta: "€ million" },
  { title: "Revenue against forecast", meta: "€ thousand" },
  { title: "Year to date", meta: "€ thousand" },
  { title: "Cost base", meta: "€ thousand" },
];

const ROTATE_MS = 5200;
const LEAVE_MS = 430;

function Panel({ index, width, height }: { index: number; width: number; height: number }) {
  switch (index) {
    case 0:
      return <Kpis />;
    case 1:
      return <ArrChart width={width} height={height - 44} />;
    case 2:
      return <RevenueChart width={width} height={Math.min(height - 44, Math.round(width * 0.56))} />;
    case 3:
      return <YtdTable />;
    default:
      return <CostBase />;
  }
}

/**
 * The hero illustration: dashboard panels stacked like folders. Every few
 * seconds the front card drops away and the one behind steps forward; any tab
 * can be clicked to bring it to the front. Rotation waits while the deck is
 * hovered or focused, and is off entirely under prefers-reduced-motion.
 */
export function BoardDeck() {
  // Panel indices, front card first.
  const [order, setOrder] = useState(() => panels.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);
  // Bumped whenever the front card changes, so its build-in animation replays.
  const [plays, setPlays] = useState(0);
  // Inner width of a card body. 540 suits the desktop layout until measured.
  const [width, setWidth] = useState(540);

  const stageRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const hold = useRef(false);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  const [armed, setArmed] = useState(0);

  const next = useCallback(() => {
    if (busy.current) return;
    const advance = () => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(null);
      setPlays((n) => n + 1);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      advance();
      return;
    }
    // Let the front card finish dropping away before the stack steps forward.
    busy.current = true;
    setLeaving(order[0]);
    timers.current.push(
      window.setTimeout(() => {
        advance();
        timers.current.push(
          window.setTimeout(() => {
            busy.current = false;
          }, 650),
        );
      }, LEAVE_MS),
    );
  }, [order]);

  const bring = (panel: number) => {
    if (busy.current || order[0] === panel) return;
    const k = order.indexOf(panel);
    setOrder([...order.slice(k), ...order.slice(0, k)]);
    setPlays((n) => n + 1);
    setArmed((n) => n + 1);
  };

  // Auto-rotate. The interval restarts on every change (next depends on order,
  // armed covers manual ones), so each card gets a full turn at the front.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!hold.current && !document.hidden) next();
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [next, armed]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  // Charts are redrawn at the measured width so their type keeps its size.
  useEffect(() => {
    const node = measureRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      setWidth((prev) => (w > 0 && Math.abs(w - prev) >= 8 ? w : prev));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pointer parallax across the whole hero section, eased toward the target.
  useEffect(() => {
    const stage = stageRef.current;
    const area = stage?.closest("section");
    if (!stage || !area) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      stage.style.setProperty("--ry", (cx * 7).toFixed(2));
      stage.style.setProperty("--rx", (-cy * 5).toFixed(2));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const r = area.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    area.addEventListener("mousemove", onMove);
    area.addEventListener("mouseleave", onLeave);
    return () => {
      area.removeEventListener("mousemove", onMove);
      area.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const bodyHeight = width < 420 ? 330 : 372;

  return (
    <figure className="m-0 min-w-0" aria-label="Illustrative board dashboard">
      <div
        ref={stageRef}
        className={s.stage}
        style={{ "--bodyh": `${bodyHeight + 46}px` } as CSSProperties}
        onMouseEnter={() => (hold.current = true)}
        onMouseLeave={() => (hold.current = false)}
        onFocus={() => (hold.current = true)}
        onBlur={() => (hold.current = false)}
      >
        <div className={s.deck}>
          {panels.map((panel, i) => {
            const p = order.indexOf(i);
            const front = p === 0;
            const parked = p >= 4;
            return (
              <div
                key={panel.title}
                className={`${s.item} ${leaving === i ? s.leaving : ""}`}
                data-p={Math.min(p, 4)}
                aria-hidden={parked || undefined}
              >
                <div className={s.card}>
                  <button
                    type="button"
                    className={s.head}
                    onClick={() => bring(i)}
                    tabIndex={parked ? -1 : 0}
                    aria-current={front || undefined}
                    aria-label={front ? `${panel.title}, shown` : `Show ${panel.title}`}
                  >
                    <span>
                      <span className={s.num}>0{i + 1}</span>
                      {panel.title}
                    </span>
                    <span className={s.meta}>{panel.meta}</span>
                  </button>
                  {/* Every body is the same width, so the first one stands in for all. */}
                  <div
                    ref={i === 0 ? measureRef : undefined}
                    className={s.body}
                    aria-hidden={!front || undefined}
                  >
                    <div key={front ? `front-${plays}` : "back"}>
                      <Panel index={i} width={width} height={bodyHeight} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className={`${s.chip} ${s.chipCash}`}>
            <div className={s.chipInner}>
              <CashBox />
            </div>
          </div>
          <div className={`${s.chip} ${s.chipOk}`}>
            <div className={s.chipInner}>
              <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="6" fill="none" stroke="#1C6C68" />
                <path
                  d="M3.6 6.8 L5.6 8.8 L9.4 4.4"
                  fill="none"
                  stroke="#1C6C68"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Reconciled to ledger <b>0.00</b>
            </div>
          </div>
        </div>
      </div>

      <figcaption className={s.caption}>
        <button
          type="button"
          className={s.next}
          onClick={() => {
            next();
            setArmed((n) => n + 1);
          }}
        >
          Next panel <span aria-hidden="true">&rarr;</span>
        </button>
        <span>Illustrative figures</span>
      </figcaption>
    </figure>
  );
}
