/**
 * Single switch between DEMO MODE and PRODUCTION/API MODE.
 *
 * DEMO MODE is the default: the app must be fully usable with no external
 * API keys configured. Every surface that runs on demo logic labels itself
 * so a demo result is never presented as a real-world measurement.
 *
 * To move to PRODUCTION MODE, set VITE_PVIRA_AI_MODE=production and implement
 * the real provider calls in src/lib/vision.functions.ts and
 * src/lib/assistant.functions.ts (both files already isolate the boundary).
 */
export type AiMode = "demo" | "production";

export const AI_MODE: AiMode =
  (import.meta.env["VITE_PVIRA_AI_MODE"] as AiMode | undefined) === "production" ? "production" : "demo";

export const IS_DEMO_AI = AI_MODE === "demo";

/** Maps API availability is independent of the AI mode. */
export const HAS_MAP_API = Boolean(import.meta.env["VITE_PVIRA_MAPS_KEY"]);

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
