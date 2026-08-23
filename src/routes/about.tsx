import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PAVITRA CYCLE" },
      { name: "description", content: "PAVITRA CYCLE helps devotees retire idols respectfully while protecting rivers, lakes and soil." },
      { property: "og:title", content: "About PAVITRA CYCLE" },
      { property: "og:description", content: "Respect the tradition, protect the environment, recover the future." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Respect the tradition. Protect the environment." description="Why PAVITRA CYCLE exists." />
      <Section>
        <p className="max-w-2xl text-muted-foreground">
          PAVITRA CYCLE is a self drop-off platform: devotees hand idols over in person at verified centres, where materials
          are identified, separated and recovered instead of being immersed in water bodies.
        </p>
      </Section>
    </>
  );
}
