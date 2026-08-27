import Link from "next/link";
import { site } from "@/content/site";

/**
 * Wordmark. The existing WordPress build still ships the Astra demo logo
 * hotlinked from websitedemos.net, so this is a clean typographic stand-in
 * until a real brand asset exists.
 */
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <Link
      href="/"
      className="group inline-flex items-baseline gap-1.5 font-display text-xl font-semibold tracking-tight"
      aria-label={`${site.name} — home`}
    >
      <span className={isLight ? "text-white" : "text-navy-800"}>Lead</span>
      <span className={isLight ? "text-teal-200" : "text-teal-600"}>
        Finance
      </span>
    </Link>
  );
}
