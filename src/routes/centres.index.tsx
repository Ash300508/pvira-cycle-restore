import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, Section } from "@/components/pvira/Section";
import { CentreCard } from "@/components/pvira/CentreCard";
import { EmptyState, ErrorState, LoadingState } from "@/components/pvira/States";
import { centresQuery } from "@/lib/queries";

export const Route = createFileRoute("/centres/")({
  head: () => ({
    meta: [
      { title: "Drop-Off Centres — PAVITRA CYCLE" },
      { name: "description", content: "Find a PAVITRA CYCLE drop-off centre near you, with accepted materials, hours and capacity." },
      { property: "og:title", content: "Drop-Off Centres — PAVITRA CYCLE" },
      { property: "og:description", content: "Locate verified idol drop-off and recovery centres across India." },
    ],
  }),
  component: CentresPage,
});

function CentresPage() {
  const { data, isPending, error, refetch } = useQuery(centresQuery());

  return (
    <>
      <PageHeader eyebrow="Locations" title="Drop-off centres" description="Hand your idol over in person at a verified recovery centre." />
      <Section>
        {isPending ? (
          <LoadingState label="Loading centres…" />
        ) : error ? (
          <ErrorState onRetry={() => void refetch()} />
        ) : !data?.length ? (
          <EmptyState title="No centres yet" description="Centres will appear here once they are published." />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.map((centre) => (
              <CentreCard key={centre.id} centre={centre} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
