import { AI_MODE } from "./ai-config";
import { MATERIAL_INFO } from "./pvira";

export type ChatMessage = { id: string; role: "user" | "assistant"; content: string; isDemo?: boolean };

export const SUGGESTED_QUESTIONS = [
  "How should I dispose of this idol?",
  "What is my idol likely made of?",
  "Where can I drop off a POP idol?",
  "What happens after I drop off my idol?",
  "Why should harmful idols not be disposed of directly in water?",
  "What materials can be recovered?",
];

type Rule = { match: RegExp; answer: string };

const RULES: Rule[] = [
  {
    match: /water|river|lake|immers|pond|sea/i,
    answer:
      "Plaster of Paris, plastic and synthetic paints do not dissolve. They settle as sludge, block light and oxygen for aquatic life, and release heavy metals such as lead and chromium from paint layers. Unbaked natural clay is far safer, but even then cloth, plastic ornaments and flowers should be removed first. Wherever possible, use a PAVITRA Drop-Off Centre — several have on-site reclamation tanks with a respectful ritual space so the tradition is preserved without harming the water body.",
  },
  {
    match: /pop|plaster/i,
    answer:
      "Plaster of Paris is our highest-priority material. Use Find a Drop-Off Centre and apply the 'Plaster of Paris' filter — those centres have crushing and de-painting lines. Once processed, the POP is recovered as construction filler, wall putty or industrial gypsum feedstock instead of ending up in a water body.",
  },
  {
    match: /made of|material|identify|which material|what is my idol/i,
    answer:
      "Open the AI Scanner and upload or capture a photo of the idol. The scanner estimates the likely base material — natural clay, Plaster of Paris, plastic, metal, paper/mud or mixed — along with a confidence level and an environmental risk rating. A quick physical check helps too: natural clay feels heavy and slightly damp with an earthy smell, while POP is light, chalky white underneath and rings hollow when tapped.",
  },
  {
    match: /after i drop|what happens|recovery journey|track/i,
    answer:
      "After you drop off the idol, the centre confirms receipt against your reference ID. Your idol then moves through Material Received, Sorting & Assessment, Recovery / Recycling and Processing Complete. You can follow every stage on the Track My Idol page using your reference ID, and Eco Points are credited when recovery completes.",
  },
  {
    match: /recover|recycl|reuse/i,
    answer:
      "Recoverable streams today: reclaimed clay for new idols and pottery, crushed POP for construction filler and gypsum, shredded plastic for recycled pellets, segregated metal for foundry recovery, and paper/mud for composting. Paint residues are captured separately so they never reach soil or water.",
  },
  {
    match: /dispose|disposal|how should i/i,
    answer:
      "The responsible route is four steps: scan the idol to understand its material, find a PAVITRA Drop-Off Centre that accepts that material, generate your drop-off reference and QR, then personally take the idol to the centre. PAVITRA CYCLE does not collect idols from homes — the self drop-off model keeps the act of parting with the idol in your hands, which many families prefer.",
  },
  {
    match: /centre|center|near|location|where/i,
    answer:
      "Use Find a Drop-Off Centre. You can allow location access, or simply type a city or PIN code — location permission is never required. Filter by the material you need handled, then open a centre to see its opening hours, on-site facilities, current availability and directions.",
  },
  {
    match: /point|badge|reward/i,
    answer:
      "You earn PAVITRA Eco Points for completed drop-offs, participating in recovery, referrals and educational activities. Points unlock the Eco Starter, Responsible Recycler, Green Guardian and PAVITRA Champion badges. Points are a nudge, not the mission — the environmental outcome is what we measure.",
  },
  {
    match: /pickup|collect|home/i,
    answer:
      "PAVITRA CYCLE deliberately has no pickup service. You take the idol to a drop-off centre yourself. This keeps the process respectful, avoids idols sitting in vehicles and lets facilities receive material in a controlled, sorted way.",
  },
];

const FALLBACK =
  "I can help with idol materials, environmental risk, finding a drop-off centre, the drop-off process, recovery tracking and Eco Points. Try asking something like \"Where can I drop off a POP idol?\" or \"What happens after I drop off my idol?\"";

function demoAnswer(question: string): string {
  const direct = Object.keys(MATERIAL_INFO).find((m) => question.toLowerCase().includes(m.toLowerCase()));
  if (direct) {
    const info = MATERIAL_INFO[direct]!;
    return `${direct} — environmental risk: ${info.risk}. ${info.summary} ${info.recovery} ${info.action}`;
  }
  return RULES.find((rule) => rule.match.test(question))?.answer ?? FALLBACK;
}

/**
 * PRODUCTION MODE hook: replace with a server function that calls a real chat
 * model, grounding it on MATERIAL_INFO and the live centre list.
 */
async function productionAnswer(_question: string): Promise<string> {
  throw new Error("Production assistant mode is selected but no chat provider is wired up yet.");
}

export async function askAssistant(question: string): Promise<{ content: string; isDemo: boolean }> {
  if (AI_MODE === "production") return { content: await productionAnswer(question), isDemo: false };
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { content: demoAnswer(question), isDemo: true };
}
