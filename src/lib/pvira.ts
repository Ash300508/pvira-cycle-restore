/**
 * PVIRA CYCLE domain constants and helpers.
 * Shared by the scanner, centre search, dashboards and admin tools.
 */

export const BRAND = {
  name: "PVIRA CYCLE",
  tagline: "Respect the Tradition. Protect the Environment. Recover the Future.",
} as const;

export const MATERIALS = [
  "Natural Clay",
  "Plaster of Paris",
  "Plastic",
  "Metal",
  "Paper/Mud",
  "Mixed Material",
  "Other",
  "Unknown",
] as const;

export type Material = (typeof MATERIALS)[number];

export type RiskLevel = "Low" | "Moderate" | "High";

export const MATERIAL_INFO: Record<
  string,
  { risk: RiskLevel; summary: string; recovery: string; action: string }
> = {
  "Natural Clay": {
    risk: "Low",
    summary:
      "Unbaked natural clay (shadu mati) breaks down in water without leaving toxic residue. The main concern is decorative paint, cloth and non-clay ornaments attached to the idol.",
    recovery: "Clay is reclaimed in settling tanks and reused for new idols, pottery or soil conditioning.",
    action:
      "Take this idol to a PVIRA Drop-Off Centre with a clay reclamation tank. Remove cloth, plastic ornaments and flowers first.",
  },
  "Plaster of Paris": {
    risk: "High",
    summary:
      "Plaster of Paris (calcium sulphate hemihydrate) does not dissolve. It settles as a hard sludge layer, blocks light and oxygen in water bodies and often carries heavy-metal paints.",
    recovery: "POP is crushed, de-painted and reused as construction filler, wall putty or industrial gypsum feedstock.",
    action:
      "Take this idol to a PVIRA Drop-Off Centre that accepts Plaster of Paris materials. Do not immerse it in any water body.",
  },
  Plastic: {
    risk: "High",
    summary:
      "Plastic and thermocol idols never biodegrade. They fragment into microplastics that enter soil, water and the food chain.",
    recovery: "Plastics are cleaned, shredded and sent to registered recyclers for pellet manufacturing.",
    action: "Take this idol to a PVIRA Drop-Off Centre with a plastic shredding line.",
  },
  Metal: {
    risk: "Moderate",
    summary:
      "Metal idols are durable and often reusable. Discarded metal can leach coatings, but it is one of the most valuable recoverable materials.",
    recovery: "Metal is segregated by type and sent for foundry recovery, or restored and re-gifted where appropriate.",
    action: "Take this idol to a PVIRA Drop-Off Centre with a metal segregation bay, or consider respectful reuse.",
  },
  "Paper/Mud": {
    risk: "Low",
    summary:
      "Paper pulp and mud idols are largely biodegradable, but printing inks and adhesives should still be handled at a facility.",
    recovery: "Paper and mud are composted or pulped for reuse in eco-idol manufacturing.",
    action: "Take this idol to a PVIRA Drop-Off Centre with a composting yard.",
  },
  "Mixed Material": {
    risk: "High",
    summary:
      "Mixed idols combine clay or POP with plastic, metal wire, synthetic paint and glitter. They cannot be treated as a single waste stream.",
    recovery: "Facilities dismantle the idol by hand and route each fraction to the right recovery process.",
    action: "Take this idol to a PVIRA Drop-Off Centre that accepts mixed materials for manual dismantling.",
  },
  Other: {
    risk: "Moderate",
    summary: "The material could not be matched to a known category. A facility assessment is the safest route.",
    recovery: "Staff assess the idol on arrival and choose the appropriate recovery stream.",
    action: "Take this idol to a PVIRA Drop-Off Centre that accepts other or unclassified materials.",
  },
  Unknown: {
    risk: "Moderate",
    summary:
      "The image did not give enough signal for a confident estimate. Lighting, angle or decoration can hide the base material.",
    recovery: "Facility staff identify the base material before choosing a recovery route.",
    action: "Re-scan in better light, or take the idol to a centre that accepts mixed and unclassified materials.",
  },
};

export const CENTRE_STATUSES = ["Open", "Temporarily Closed", "Full", "Maintenance"] as const;

export const DROP_OFF_STATUSES = [
  "Selected",
  "Drop-Off Registered",
  "Received",
  "Processing",
  "Recovery",
  "Completed",
  "Cancelled",
] as const;

export type DropOffStatus = (typeof DROP_OFF_STATUSES)[number];

export const RECOVERY_TIMELINE: { status: DropOffStatus; label: string; description: string }[] = [
  {
    status: "Drop-Off Registered",
    label: "Drop-Off Registered",
    description: "Your reference ID was generated and the centre was notified to expect your idol.",
  },
  {
    status: "Received",
    label: "Material Received",
    description: "Centre staff confirmed receipt of the idol at the drop-off counter.",
  },
  {
    status: "Processing",
    label: "Sorting & Assessment",
    description: "The idol is dismantled and each material fraction is weighed and assessed.",
  },
  {
    status: "Recovery",
    label: "Recovery / Recycling",
    description: "Materials enter their recovery stream — crushing, reclamation, shredding or composting.",
  },
  {
    status: "Completed",
    label: "Processing Complete",
    description: "Recovery is complete, impact is recorded and your Eco Points are credited.",
  },
];

export const BADGES = [
  { name: "Eco Starter", points: 0, description: "Joined PVIRA CYCLE and took the first step." },
  { name: "Responsible Recycler", points: 100, description: "Completed your first responsible drop-off." },
  { name: "Green Guardian", points: 400, description: "Repeatedly chose recovery over improper disposal." },
  { name: "PVIRA Champion", points: 1000, description: "A community leader in responsible idol disposal." },
] as const;

export function badgeForPoints(points: number) {
  return [...BADGES].reverse().find((b) => points >= b.points) ?? BADGES[0];
}

export function riskTone(risk: RiskLevel | string | null | undefined) {
  if (risk === "High") return "destructive" as const;
  if (risk === "Moderate") return "warning" as const;
  return "success" as const;
}

/** Haversine distance in km. */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number | null; lng: number | null },
): number | null {
  if (b.lat == null || b.lng == null) return null;
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(Math.round(value));
}
