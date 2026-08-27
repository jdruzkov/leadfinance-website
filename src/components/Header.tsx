"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "@/content/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bone">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="border-b border-transparent pb-1 text-[0.97rem] transition-colors hover:border-teal-600 hover:text-teal-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-brand bg-petrol-800 px-6 py-3 text-[0.92rem] font-medium text-bone transition-colors hover:bg-petrol-900 lg:inline-block"
        >
          Book a call
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-brand border border-hairline-sand text-ink lg:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-hairline bg-bone lg:hidden"
        >
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-brand px-2 py-3 hover:bg-sand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-brand bg-petrol-800 px-5 py-3 text-center font-medium text-bone"
                >
                  Book a call
                </Link>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
