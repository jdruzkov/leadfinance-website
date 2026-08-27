import Link from "next/link";
import { site } from "@/content/site";

/**
 * Wordmark: a ruled circle (the ledger line) beside the name.
 * The old WordPress build still hotlinks the Astra demo logo from
 * websitedemos.net, so this stands in until a real brand asset exists.
 */
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 font-display text-[1.42rem] font-medium tracking-tight ${
        isLight ? "text-bone" : "text-ink"
      }`}
      aria-label={`${site.name} — home`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="flex-none"
      >
        <circle
          cx="16"
          cy="16"
          r="14.5"
          stroke={isLight ? "#cfa24a" : "#b8862e"}
          strokeWidth="1.4"
        />
        <line
          x1="8.5"
          y1="16"
          x2="23.5"
          y2="16"
          stroke={isLight ? "#f2ebe1" : "#0f3b39"}
          strokeWidth="1.6"
        />
      </svg>
      LeadFinance
    </Link>
  );
}
