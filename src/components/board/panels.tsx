"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import s from "./board.module.css";

/**
 * Panels of the illustrative board dashboard shown in the hero. These are
 * placeholder figures for the design, not any company's real numbers, and
 * the deck caption says so.
 *
 * Charts are drawn at the pixel width they are given, so type inside them
 * stays the same size at every breakpoint instead of shrinking with the SVG.
 */

type ChartProps = { width: number; height: number };

const delay = (seconds: number) =>
  ({ "--d": `${seconds.toFixed(2)}s` }) as CSSProperties;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Bar with rounded top corners, standing on the axis. */
function topRounded(x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, h, w / 2);
  return `M${r2(x)} ${r2(y + h)}V${r2(y + r)}Q${r2(x)} ${r2(y)} ${r2(x + r)} ${r2(y)}H${r2(x + w - r)}Q${r2(x + w)} ${r2(y)} ${r2(x + w)} ${r2(y + r)}V${r2(y + h)}Z`;
}

/** Thousands separated by a space. Hand-rolled so server and client agree. */
function thousands(v: number) {
  const digits = String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (v < 0 ? "-" : "") + digits;
}

function CountUp({ to, dp }: { to: number; dp: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      // A frame's timestamp can predate `start`, so clamp at both ends.
      const p = Math.min(1, Math.max(0, (now - start) / 1000));
      node.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dp);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      node.textContent = to.toFixed(dp);
    };
  }, [to, dp]);

  return <span ref={ref}>{to.toFixed(dp)}</span>;
}

const kpis = [
  { label: "Annual recurring revenue", value: 14.3, unit: "m", delta: "+18.4%", note: ["year on year"] },
  { label: "Renewals due  ·  next 12 months", value: 9.3, unit: "m", delta: "96%", note: ["historic renewal rate", "5.0m runs beyond the window"] },
  { label: "New business  ·  next 12 months", value: 7.8, unit: "m", delta: "3.0x", note: ["cover of the new ARR target", "2.9m weighted"] },
  { label: "Gross margin", value: 68.2, unit: "%", delta: "+3.3%", note: ["vs forecast"] },
];

export function Kpis() {
  return (
    <div className={s.kpis}>
      {kpis.map((k, i) => (
        <div key={k.label} className={`${s.kpi} ${s.rise}`} style={delay(i * 0.08)}>
          <p className={s.kpiLabel}>{k.label}</p>
          <p className={s.kpiValue}>
            <CountUp to={k.value} dp={1} />
            <small>{k.unit}</small>
          </p>
          <p className={s.kpiDelta}>
            {k.delta}{" "}
            <em>
              {k.note[0]}
              {k.note[1] && (
                <>
                  <br />
                  {k.note[1]}
                </>
              )}
            </em>
          </p>
        </div>
      ))}
    </div>
  );
}

export function CashBox() {
  return (
    <div className={s.cash}>
      <div>
        <p className={s.cashLabel}>Cash balance</p>
        <p className={s.cashValue}>
          <CountUp to={2.38} dp={2} />
          <small>m</small>
        </p>
      </div>
      <div className={s.cashSide}>
        <div>
          <span className={s.cashK}>Runway</span>
          <span className={s.cashV}>
            14 <span>months</span>
          </span>
          <span className={s.cashSub}>at current burn</span>
        </div>
        <div>
          <span className={s.cashK}>Net burn</span>
          <span className={s.cashV}>
            170k <span>/ mo</span>
          </span>
          <span className={s.cashSub}>three month average</span>
        </div>
      </div>
    </div>
  );
}

const arrSteps = [
  { label: "Opening", v: 14.1, type: "total" },
  { label: "New", v: 0.19, type: "up" },
  { label: "Upsell", v: 0.06, type: "up" },
  { label: "Downsell", v: -0.02, type: "down" },
  { label: "Churn", v: -0.03, type: "down" },
  { label: "Closing", v: 14.3, type: "total" },
] as const;

const arrFill = { total: "#0F3B39", up: "#1C6C68", down: "#9C4F3A" };

export function ArrChart({ width: W, height: H }: ChartProps) {
  const xs = W < 430;
  const lo = 14;
  const hi = 14.4;
  const L = 44;
  const R = W - 6;
  const T = 22;
  const B = H - 56;
  const y = (v: number) => B - ((v - lo) / (hi - lo)) * (B - T);
  const slot = (R - L) / arrSteps.length;
  const bw = Math.min(58, slot * 0.78);

  // Each step is resolved against the running balance before it.
  const bars = arrSteps.reduce<
    { top: number; h: number; run: number; step: (typeof arrSteps)[number] }[]
  >((acc, step) => {
    const prev = acc.length ? acc[acc.length - 1].run : 0;
    if (step.type === "total") {
      acc.push({ step, top: y(step.v), h: B - y(step.v), run: step.v });
      return acc;
    }
    const run = prev + step.v;
    let top = y(Math.max(prev, run));
    let h = Math.abs(y(prev) - y(run));
    if (h < 3) {
      top -= (3 - h) / 2;
      h = 3;
    }
    acc.push({ step, top, h, run });
    return acc;
  }, []);

  return (
    <>
      <p className={s.sub}>Opening to closing recurring base.</p>
      <div className={s.legend}>
        <span><i className={s.swTotal} />Balance</span>
        <span><i className={s.swUp} />Increase</span>
        <span><i className={s.swDown} />Decrease</span>
      </div>
      <svg
        className={s.chart}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="ARR movement from 14.10 million opening to 14.30 million closing"
      >
        {[14, 14.1, 14.2, 14.3, 14.4].map((t) => (
          <g key={t}>
            <line x1={L} y1={r2(y(t))} x2={R} y2={r2(y(t))} stroke="#EFE7DA" />
            <text x={L - 8} y={r2(y(t) + 3.5)} textAnchor="end" fontSize={9} fill="#A9A296">
              {t.toFixed(2)}
            </text>
          </g>
        ))}
        <line x1={L} y1={B} x2={R} y2={B} stroke="#D9CFBF" />
        {bars.map(({ step, top, h, run }, i) => {
          const cx = L + slot * i + slot / 2;
          const x = cx - bw / 2;
          const t0 = i * 0.13;
          const isTotal = step.type === "total";
          const value = isTotal
            ? step.v.toFixed(2)
            : (step.v > 0 ? "+" : "") + step.v.toFixed(2);
          return (
            <g key={step.label}>
              {isTotal ? (
                <path className={s.bar} style={delay(t0)} d={topRounded(x, top, bw, h, 4)} fill={arrFill.total} />
              ) : (
                <rect
                  className={`${s.bar} ${step.type === "down" ? s.barDown : ""}`}
                  style={delay(t0)}
                  x={r2(x)}
                  y={r2(top)}
                  width={r2(bw)}
                  height={r2(h)}
                  rx={Math.min(3, h / 2)}
                  fill={arrFill[step.type]}
                />
              )}
              {i < arrSteps.length - 1 && (i === 0 || !isTotal) && (
                <line
                  className={s.fade}
                  style={delay(t0 + 0.35)}
                  x1={r2(x + bw)}
                  y1={r2(y(run))}
                  x2={r2(cx + slot - bw / 2)}
                  y2={r2(y(run))}
                  stroke="#CFC5B4"
                  strokeDasharray="2 3"
                />
              )}
              <text
                className={s.fade}
                style={delay(t0 + 0.3)}
                x={r2(cx)}
                y={r2(top - 9)}
                textAnchor="middle"
                fontSize={11}
                fill={step.type === "down" ? "#9C4F3A" : "#1B1B18"}
              >
                {value}
              </text>
              <text
                x={r2(cx)}
                y={B + 20}
                textAnchor="middle"
                fontSize={xs ? 7 : 8.5}
                letterSpacing={xs ? 0.3 : 0.8}
                fill="#7C7568"
              >
                {step.label.toUpperCase()}
              </text>
            </g>
          );
        })}
        <text x={L} y={B + 44} fontSize={xs ? 7 : 8.5} letterSpacing={xs ? 0.3 : 0.7} fill="#B0A99C">
          AXIS TRUNCATED AT 14.00 TO SHOW MONTHLY MOVEMENT
        </text>
      </svg>
    </>
  );
}

const revActual = [985, 1002, 1058, 1010, 1035, 1088, 1102, 1130, 1164, 1185, 1198, 1240];
const revForecast = [975, 990, 1030, 1020, 1035, 1060, 1080, 1095, 1120, 1135, 1150, 1145];
const revMonths = ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP"];

export function RevenueChart({ width: W, height: H }: ChartProps) {
  const xs = W < 430;
  const L = 38;
  const R = W - 6;
  const T = 26;
  const B = H - 54;
  const y = (v: number) => B - (v / 1300) * (B - T);
  const slot = (R - L) / revActual.length;
  const bw = Math.min(46, slot * 0.62);
  // Forecast ticks overhang the bar, but never far enough to touch a neighbour.
  const over = Math.min(11, (slot - bw) / 2 - 1.5);
  const last = revActual.length - 1;

  return (
    <>
      <p className={s.sub}>Monthly actual against the locked forecast.</p>
      <div className={s.legend}>
        <span><i className={s.swTotal} />Actual</span>
        <span><i className={s.swMark} />Forecast</span>
      </div>
      <svg
        className={s.chart}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Monthly revenue against forecast over twelve months"
      >
        {[400, 800, 1200].map((t) => (
          <g key={t}>
            <line x1={L} y1={r2(y(t))} x2={R} y2={r2(y(t))} stroke="#EFE7DA" />
            <text x={L - 9} y={r2(y(t) + 3.5)} textAnchor="end" fontSize={9} fill="#A9A296">
              {t}
            </text>
          </g>
        ))}
        <line x1={L} y1={B} x2={R} y2={B} stroke="#D9CFBF" />
        {revActual.map((v, i) => {
          const cx = L + slot * i + slot / 2;
          const x = cx - bw / 2;
          const fy = r2(y(revForecast[i]));
          return (
            <g key={revMonths[i]}>
              <path className={s.bar} style={delay(i * 0.05)} d={topRounded(x, y(v), bw, B - y(v), 3)} fill="#0F3B39" />
              <g className={s.fade} style={delay(0.55 + i * 0.04)}>
                <line x1={r2(x - over)} y1={fy} x2={r2(x + bw + over)} y2={fy} stroke="#FCF9F4" strokeWidth={5} strokeLinecap="round" />
                <line x1={r2(x - over)} y1={fy} x2={r2(x + bw + over)} y2={fy} stroke="#8A7642" strokeWidth={2} strokeLinecap="round" />
              </g>
              <text x={r2(cx)} y={B + 19} textAnchor="middle" fontSize={xs ? 7.5 : 9} letterSpacing={xs ? 0 : 0.6} fill="#9B9488">
                {revMonths[i]}
              </text>
            </g>
          );
        })}
        <text
          className={s.fade}
          style={delay(1)}
          x={r2(L + slot * last + slot / 2 - 4)}
          y={r2(y(revActual[last]) - 11)}
          textAnchor="middle"
          fontSize={11}
          fill="#1B1B18"
        >
          {thousands(revActual[last])}
        </text>
        <text x={L} y={B + 42} fontSize={8.5} letterSpacing={0.7} fill="#B0A99C">
          OCT 2025 THROUGH SEP 2026
        </text>
      </svg>
    </>
  );
}

// label, actual, forecast, whether above forecast is good, row style
const ytdRows: [string, number, number, boolean, "" | "rule" | "minor"][] = [
  ["Revenue", 10152, 9840, true, ""],
  ["Gross profit", 6853, 6494, true, ""],
  ["Operating expenses", 8415, 8260, false, ""],
  ["EBITDA", -1562, -1766, true, "rule"],
  ["Capitalised development", 810, 780, true, "minor"],
  ["Adjusted EBITDA", -752, -986, true, ""],
  ["Net income", -2192, -2378, true, "rule"],
];

export function YtdTable() {
  return (
    <>
      <p className={s.sub}>Actual against the locked forecast.</p>
      <table className={s.ytd}>
        <thead>
          <tr>
            <th />
            <th>Actual</th>
            <th>Forecast</th>
            <th>Var %</th>
          </tr>
        </thead>
        <tbody>
          {ytdRows.map(([label, actual, forecast, goodUp, row], i) => {
            const pct = ((actual - forecast) / Math.abs(forecast)) * 100;
            const adverse = goodUp ? pct < 0 : pct > 0;
            return (
              <tr
                key={label}
                className={`${s.fade} ${row === "rule" ? s.rule : ""} ${row === "minor" ? s.minor : ""}`}
                style={delay(i * 0.07)}
              >
                <td>{label}</td>
                <td>{thousands(actual)}</td>
                <td className={s.fc}>{thousands(forecast)}</td>
                <td className={adverse ? s.neg : s.pos}>
                  {(pct > 0 ? "+" : "") + pct.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// name, tag, amount, share of cost base (%), non cash
const costRows: [string, string, number, number, boolean][] = [
  ["Research and development", "", 441, 42, false],
  ["Sales and marketing", "", 147, 14, false],
  ["General and administrative", "", 400, 38, false],
  ["Depreciation and amortisation", "Non cash", 62, 6, true],
];

export function CostBase() {
  const max = Math.max(...costRows.map((r) => r[2]));
  return (
    <>
      <p className={s.sub}>Costs below gross profit, by function.</p>
      {costRows.map(([name, tag, amount, share, nonCash], i) => (
        <div key={name} className={s.cost}>
          <span className={s.costName}>
            {name}
            {tag && <em>{tag}</em>}
          </span>
          <span className={s.costTrack}>
            <span
              className={`${s.costFill} ${nonCash ? s.costFillAlt : ""}`}
              style={{ width: `${r2((amount / max) * 100)}%`, ...delay(i * 0.1) }}
            />
          </span>
          <span className={s.costVal}>
            {amount}
            <span>{share}%</span>
          </span>
        </div>
      ))}
      <p className={s.costNote}>
        Cash cost base is 988k. Depreciation and amortisation is non cash and is
        excluded from burn.
      </p>
    </>
  );
}
