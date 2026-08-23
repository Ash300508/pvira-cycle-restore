import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./ai-config";
import { MATERIALS, MATERIAL_INFO, type Material, type RiskLevel } from "./pvira";

export type GeminiScanResult = {
  material: Material;
  confidence: number;
  risk: RiskLevel;
  summary: string;
  recovery: string;
  action: string;
  recyclable: boolean;
  disposalMethod: string;
  explanation: string;
  isDemo: false;
};

export class GeminiScanError extends Error {}

function getApiKey(): string {
  const key = process.env["GEMINI_API_KEY"];
  if (!key) {
    throw new GeminiScanError(
      "The AI scanner is not configured. The GEMINI_API_KEY environment variable is missing on the server.",
    );
  }
  return key;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new GeminiScanError("Could not read the image file."));
        return;
      }
      const commaIdx = result.indexOf(",");
      resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
    };
    reader.onerror = () => reject(new GeminiScanError("Could not read the image file."));
    reader.readAsDataURL(file);
  });
}

function clampMaterial(raw: unknown): Material {
  if (typeof raw !== "string") return "Unknown";
  const match = MATERIALS.find((m) => m.toLowerCase() === raw.toLowerCase());
  return match ?? "Other";
}

function clampRisk(raw: unknown): RiskLevel {
  if (raw === "Low" || raw === "Moderate" || raw === "High") return raw;
  return "Moderate";
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    material: {
      type: Type.STRING,
      description:
        "The primary waste or material category visible in the image. Use one of: " +
        MATERIALS.join(", "),
      enum: [...MATERIALS],
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence level from 0 to 100.",
    },
    recyclable: {
      type: Type.BOOLEAN,
      description: "Whether the detected material is recyclable or recoverable.",
    },
    disposalMethod: {
      type: Type.STRING,
      description: "Suggested recycling or disposal method for this material.",
    },
    explanation: {
      type: Type.STRING,
      description: "A short explanation of why this material matters and how it should be handled.",
    },
  },
  required: ["material", "confidence", "recyclable", "disposalMethod", "explanation"],
} as const;

const PROMPT = `You are a waste-material identification assistant for PAVITRA CYCLE, an eco-friendly idol disposal and recycling program in India.

Analyze the image and identify the primary material of the object visible (typically a festival idol, but could be any waste item).

Identify:
1. The waste/material category — choose the closest match from: ${MATERIALS.join(", ")}.
2. Whether the material is recyclable or recoverable.
3. A suggested recycling or disposal method.
4. A short explanation of why this material matters environmentally.

Respond strictly in the JSON schema provided. Use the "material" field with one of the exact enum values listed.`;

export const analyseImageWithGemini = createServerFn(
  "POST",
  async (data: { base64: string; mimeType: string; fileSize: number }) => {
    if (!ALLOWED_IMAGE_TYPES.includes(data.mimeType)) {
      throw new GeminiScanError("Please upload a JPG, PNG or WebP image.");
    }
    if (data.fileSize > MAX_IMAGE_BYTES) {
      throw new GeminiScanError("That image is larger than 5 MB. Please use a smaller photo.");
    }

    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { inlineData: { data: data.base64, mimeType: data.mimeType } },
              { text: PROMPT },
            ],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
          temperature: 0.1,
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("API key") || msg.includes("permission") || msg.includes("403")) {
        throw new GeminiScanError("The AI scanner could not authenticate with the Gemini API. Please check the API key configuration.");
      }
      if (msg.includes("429") || msg.includes("rate limit") || msg.includes("quota")) {
        throw new GeminiScanError("The AI scanner is receiving too many requests. Please wait a moment and try again.");
      }
      throw new GeminiScanError("The AI scanner encountered an error while analyzing the image. Please try again.");
    }

    const text = response.text;
    if (!text) {
      throw new GeminiScanError("The AI scanner returned an empty response. Please try again with a clearer photo.");
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(text) as Record<string, unknown>;
    } catch {
      throw new GeminiScanError("The AI scanner returned an unexpected response format. Please try again.");
    }

    const material = clampMaterial(parsed["material"]);
    const info = MATERIAL_INFO[material] ?? MATERIAL_INFO["Unknown"]!;
    const confidence = typeof parsed["confidence"] === "number"
      ? Math.max(0, Math.min(100, Math.round(parsed["confidence"])))
      : 70;

    return {
      material,
      confidence,
      risk: info.risk,
      summary: info.summary,
      recovery: info.recovery,
      action: info.action,
      recyclable: typeof parsed["recyclable"] === "boolean" ? parsed["recyclable"] : material !== "Plastic" && material !== "Plaster of Paris",
      disposalMethod: typeof parsed["disposalMethod"] === "string" && parsed["disposalMethod"].trim()
        ? parsed["disposalMethod"].trim()
        : info.recovery,
      explanation: typeof parsed["explanation"] === "string" && parsed["explanation"].trim()
        ? parsed["explanation"].trim()
        : info.summary,
      isDemo: false as const,
    } satisfies GeminiScanResult;
  },
);
