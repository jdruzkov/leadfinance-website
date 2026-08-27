import { clsx } from "@/lib/clsx";
import { Container } from "./Container";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tinted = false,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  tinted?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx("py-20 md:py-28", tinted && "bg-teal-50", className)}
    >
      <Container>
        {(eyebrow || title || intro) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
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
