import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — PAVITRA CYCLE" },
      { name: "description", content: "Manage your PAVITRA CYCLE profile details, contact number and notification settings." },
      { property: "og:title", content: "Your Profile — PAVITRA CYCLE" },
      { property: "og:description", content: "Manage your profile details and preferences." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <PageHeader eyebrow="Profile" title="Your profile" description="Profile editing is being wired up next." />
      <Section>
        <p className="text-muted-foreground">Profile form coming here.</p>
      </Section>
    </>
  );
}
