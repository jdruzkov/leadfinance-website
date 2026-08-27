import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block rounded-brand bg-petrol-800 px-7 py-3.5 text-base font-semibold text-bone transition-colors hover:bg-petrol-900"
      >
        Back to home
      </Link>
    </Container>
  );
}
