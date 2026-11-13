// Ported from the Soloman build (Downloads/solo/Vajiram-ravi, src/lib/cx.ts), user 2026-11-13.
/** Joins truthy class names. */
export function cx(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(" ");
}
