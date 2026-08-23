import { AI_MODE, ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./ai-config";
import { MATERIAL_INFO, type Material, type RiskLevel } from "./pvira";

export type ScanResult = {
  material: Material;
  confidence: number;
  risk: RiskLevel;
  summary: string;
  recovery: string;
  action: string;
  isDemo: boolean;
};

export class ImageValidationError extends Error {}

export function validateImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new ImageValidationError("Please upload a JPG, PNG or WebP image of the idol.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new ImageValidationError("That image is larger than 5 MB. Please use a smaller photo.");
  }
}

/** Stable pseudo-random seed so the same photo always yields the same demo result. */
function seedFrom(file: File) {
  const input = `${file.name}|${file.size}|${file.lastModified}`;
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

const DEMO_POOL: Material[] = [
  "Plaster of Paris",
  "Natural Clay",
  "Mixed Material",
  "Plastic",
  "Natural Clay",
  "Plaster of Paris",
  "Metal",
  "Paper/Mud",
  "Unknown",
];

/**
 * DEMO MODE classifier. This is NOT a vision model — it derives a plausible,
 * deterministic result from the file fingerprint so the whole journey can be
 * demonstrated without any API key. Always surfaced as "Demo AI Analysis".
 */
function demoAnalyse(file: File): ScanResult {
  const seed = seedFrom(file);
  const material = DEMO_POOL[seed % DEMO_POOL.length] ?? "Unknown";
  const info = MATERIAL_INFO[material] ?? MATERIAL_INFO["Unknown"]!;
  const confidence = material === "Unknown" ? 41 + (seed % 12) : 74 + (seed % 23);
  return {
    material,
    confidence,
    risk: info.risk,
    summary: info.summary,
    recovery: info.recovery,
    action: info.action,
    isDemo: true,
  };
}

/**
 * PRODUCTION MODE hook. Replace the body of this branch with a call to a
 * server function that forwards the image to a real vision model and maps its
 * label set onto MATERIALS / MATERIAL_INFO. The rest of the app is unchanged.
 */
async function productionAnalyse(_file: File): Promise<ScanResult> {
  throw new Error(
    "Production vision mode is selected but no vision provider is wired up yet. Switch VITE_PAVITRA_AI_MODE back to demo.",
  );
}

export async function analyseIdolImage(file: File): Promise<ScanResult> {
  validateImage(file);
  if (AI_MODE === "production") return productionAnalyse(file);
  // Simulate model latency so loading states are exercised.
  await new Promise((resolve) => setTimeout(resolve, 1600));
  return demoAnalyse(file);
}
