/** True when the app has the settings it needs to reach its backend. */
export const HAS_BACKEND = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export function isMissingBackendError(error: unknown) {
  return error instanceof Error && error.message.includes("Missing Supabase environment variable");
}
