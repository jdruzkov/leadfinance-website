import { clsx } from "@/lib/clsx";
import { Container } from "./Container";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "bone",
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** bone = page ground, sand = alternating band, petrol = dark section. */
  tone?: "bone" | "sand" | "petrol";
  className?: string;
  children?: React.ReactNode;
}) {
  const isPetrol = tone === "petrol";

  return (
    <section
      id={id}
      className={clsx(
        "py-16 md:py-26",
        tone === "sand" && "bg-sand",
        isPetrol && "bg-petrol-800 text-bone",
        className,
      )}
    >
      <Container>
        {(eyebrow || title || intro) && (
          <div className="flex max-w-[58ch] flex-col gap-4">
            {eyebrow && (
              <p
                className={clsx(
                  "eyebrow",
                  isPetrol && "text-gold-400",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={clsx(
                  "text-[clamp(2rem,3.9vw,3rem)] tracking-tight",
                  isPetrol && "text-bone",
                )}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={clsx(
                  "text-lg leading-relaxed",
                  isPetrol ? "text-bone/75" : "text-ink-soft",
                )}
              >
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
