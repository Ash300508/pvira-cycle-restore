import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — PVIRA CYCLE" },
      { name: "description", content: "The terms that apply when you use PVIRA CYCLE to register an idol drop-off." },
      { property: "og:title", content: "Terms of Use — PVIRA CYCLE" },
      { property: "og:description", content: "Terms that apply when registering an idol drop-off." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "Self drop-off only",
    body: "PVIRA CYCLE does not collect idols from homes and does not operate a pickup service. You are responsible for transporting the idol to the drop-off centre you select.",
  },
  {
    title: "AI results are guidance",
    body: "Material identification is an estimate, not a laboratory test. In demo mode results are clearly labelled as demo output. Centre staff make the final assessment on arrival.",
  },
  {
    title: "Centre rules apply",
    body: "Each centre publishes its accepted materials, hours and instructions. Bring the idol during opening hours, remove cloth, plastic ornaments and flowers where asked, and follow staff guidance on site.",
  },
  {
    title: "Eco Points",
    body: "Eco Points recognise responsible behaviour. They carry no monetary value, cannot be transferred or redeemed for cash, and may be adjusted if a drop-off is cancelled or unverifiable.",
  },
  {
    title: "Respectful use",
    body: "The platform exists to protect water bodies and traditions alike. Misuse — false records, abusive behaviour towards centre staff, or dumping unaccepted waste — may result in account suspension.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" description="What you can expect from us, and what we ask of you." />
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
