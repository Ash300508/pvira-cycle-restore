import { AI_MODE, ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./ai-config";
import { MATERIAL_INFO, type Material, type RiskLevel } from "./pvira";
import { analyseImageWithGemini, type GeminiScanResult } from "./vision-server";

export type ScanResult = {
  material: Material;
  confidence: number;
  risk: RiskLevel;
  summary: string;
  recovery: string;
  action: string;
  recyclable: boolean;
  disposalMethod: string;
  explanation: string;
  isDemo: boolean;
};

export class ImageValidationError extends Error {}
export class GeminiScanError extends Error {}

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
    recyclable: material !== "Plastic" && material !== "Plaster of Paris",
    disposalMethod: info.recovery,
    explanation: info.summary,
    isDemo: true,
  };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Could not read the image file."));
        return;
      }
      const commaIdx = result.indexOf(",");
      resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
    };
    reader.onerror = () => reject(new Error("Could not read the image file."));
    reader.readAsDataURL(file);
  });
}

export async function analyseIdolImage(file: File): Promise<ScanResult> {
  validateImage(file);

  // Always attempt a real Gemini analysis via the server function.
  // The server function checks for GEMINI_API_KEY and throws a user-friendly
  // error if it is missing.
  try {
    const base64 = await fileToBase64(file);
    const result: GeminiScanResult = await analyseImageWithGemini({
      data: { base64, mimeType: file.type, fileSize: file.size },
    });
    return result;
  } catch (err) {
    // If the API key is missing or the Gemini call fails, fall back to demo
    // mode in development so the UI is still usable. In production, surface
    // the error to the user.
    if (AI_MODE === "production") throw err;
    console.warn("[scanner] Gemini analysis failed, falling back to demo:", err);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return demoAnalyse(file);
  }
}
