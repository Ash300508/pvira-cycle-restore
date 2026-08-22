import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — PVIRA CYCLE" },
      { name: "description", content: "Manage drop-off centres, records and recovery workflows across the PVIRA network." },
      { property: "og:title", content: "Admin Console — PVIRA CYCLE" },
      { property: "og:description", content: "Manage centres, records and recovery workflows." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <>
      <PageHeader eyebrow="Admin" title="Operations console" description="Centre and record management coming here." />
      <Section>
        <p className="text-muted-foreground">Admin tools coming here.</p>
      </Section>
    </>
  );
}
