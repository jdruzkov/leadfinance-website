/** Minimal class-name joiner; keeps the project dependency-free. */
export function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
