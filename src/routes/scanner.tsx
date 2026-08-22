import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "AI Idol Scanner — PVIRA CYCLE" },
      { name: "description", content: "Upload a photo of your idol to detect its material, environmental risk and recovery route." },
      { property: "og:title", content: "AI Idol Scanner — PVIRA CYCLE" },
      { property: "og:description", content: "Detect idol material and environmental risk with the PVIRA AI Scanner." },
    ],
  }),
  component: ScannerPage,
});

function ScannerPage() {
  return (
    <>
      <PageHeader eyebrow="AI Scanner" title="Identify your idol's material" description="The scanner interface is being wired up next." />
      <Section>
        <p className="text-muted-foreground">Upload and analysis flow coming here.</p>
      </Section>
    </>
  );
}
