import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/pvira/Section";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: (search['mode'] === "signup" ? "signup" : "login") as "signup" | "login" | undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In or Sign Up — PVIRA CYCLE" },
      { name: "description", content: "Access your PVIRA CYCLE account to track idol drop-offs, recovery and Eco Points." },
      { property: "og:title", content: "Sign In or Sign Up — PVIRA CYCLE" },
      { property: "og:description", content: "Access your PVIRA CYCLE account to track idol drop-offs and Eco Points." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title={mode === "signup" ? "Create your account" : "Welcome back"}
        description="Authentication is being wired up next."
      />
      <Section>
        <p className="text-muted-foreground">The {mode} form will appear here.</p>
      </Section>
    </>
  );
}
