import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — PAVITRA CYCLE" },
      { name: "description", content: "Scan your idol, find a drop-off centre, hand it over and follow its recovery journey." },
      { property: "og:title", content: "How It Works — PAVITRA CYCLE" },
      { property: "og:description", content: "Scan, drop off, recover: the PAVITRA CYCLE self drop-off journey." },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <>
      <PageHeader eyebrow="Process" title="How PAVITRA CYCLE works" description="A respectful, four-step self drop-off journey." />
      <Section>
        <ol className="grid gap-4 md:grid-cols-2">
          {[
            "Scan your idol with the AI Scanner to identify its material and environmental risk.",
            "Find the nearest drop-off centre that accepts that material.",
            "Hand the idol over yourself and receive a reference ID.",
            "Track recovery progress and earn Eco Points.",
          ].map((step, i) => (
            <li key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Step {i + 1}</p>
              <p className="mt-2 text-foreground">{step}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
