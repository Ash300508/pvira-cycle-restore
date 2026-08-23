import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PAVITRA CYCLE" },
      { name: "description", content: "How PAVITRA CYCLE collects, uses and protects your account, drop-off and location data." },
      { property: "og:title", content: "Privacy Policy — PAVITRA CYCLE" },
      { property: "og:description", content: "How we handle your account, drop-off and location data." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "What we collect",
    body: "Your name, email and optional phone number, the drop-off records you create, idol photos you choose to scan, and — only if you explicitly allow it — your approximate location to sort nearby centres.",
  },
  {
    title: "How we use it",
    body: "To register drop-offs, notify you about recovery progress, credit Eco Points and report aggregate environmental impact. Aggregate impact figures never identify an individual.",
  },
  {
    title: "Location is optional",
    body: "The platform is fully usable without location permission. You can always search by city or PIN code instead, and permission can be withdrawn in your browser at any time.",
  },
  {
    title: "Idol photos",
    body: "Photos submitted to the scanner are used to estimate the idol's material. In demo mode no image leaves your device.",
  },
  {
    title: "Your rights",
    body: "You can edit your profile details, cancel a pending drop-off and request deletion of your account data at any time.",
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Plain-language summary of how your data is handled." />
      <Section>
        <div className="max-w-3xl space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
