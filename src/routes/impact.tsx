import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Environmental Impact — PAVITRA CYCLE" },
      { name: "description", content: "See how many idols were recovered, water bodies protected and materials diverted from landfill." },
      { property: "og:title", content: "Environmental Impact — PAVITRA CYCLE" },
      { property: "og:description", content: "Idols recovered, water protected, materials diverted from landfill." },
    ],
  }),
  component: ImpactPage,
});

function ImpactPage() {
  return (
    <>
      <PageHeader eyebrow="Impact" title="Our collective impact" description="Live metrics from the PAVITRA recovery network." />
      <Section>
        <p className="text-muted-foreground">Impact dashboard coming here.</p>
      </Section>
    </>
  );
}
