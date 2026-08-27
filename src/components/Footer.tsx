import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-petrol-800 text-bone/75">
      <Container className="pb-9 pt-17">
        <div className="grid gap-11 md:grid-cols-[1.6fr_1fr_1fr] md:gap-15">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-[42ch] text-[0.93rem] leading-relaxed">
              {site.description}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-[0.67rem] font-normal uppercase tracking-[0.15em] text-gold-400">
              Services
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[0.93rem] transition-colors hover:text-bone"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[0.67rem] font-normal uppercase tracking-[0.15em] text-gold-400">
              Company
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link
                  href="/about"
                  className="text-[0.93rem] transition-colors hover:text-bone"
                >
                  About
                </Link>
              </li>
              {[
                { label: "Services", href: "/#services" },
                { label: "Approach", href: "/#approach" },
                { label: "Contact", href: "/#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.93rem] transition-colors hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.93rem] transition-colors hover:text-bone"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-bone/15 pt-6 text-[0.84rem]">
          <p>
            Copyright © {year} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
