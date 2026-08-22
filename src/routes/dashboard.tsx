import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard — PVIRA CYCLE" },
      { name: "description", content: "Track your idol drop-offs, recovery status, notifications and Eco Points." },
      { property: "og:title", content: "Your Dashboard — PVIRA CYCLE" },
      { property: "og:description", content: "Track drop-offs, recovery status and Eco Points." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      <PageHeader eyebrow="Dashboard" title="Your drop-offs" description="Your records and Eco Points will appear here." />
      <Section>
        <p className="text-muted-foreground">Dashboard content coming here.</p>
      </Section>
    </>
  );
}
