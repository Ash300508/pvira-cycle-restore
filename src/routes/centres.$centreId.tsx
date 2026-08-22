import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, Section } from "@/components/pvira/Section";
import { EmptyState, ErrorState, LoadingState } from "@/components/pvira/States";
import { CentreCard } from "@/components/pvira/CentreCard";
import { centreQuery } from "@/lib/queries";

export const Route = createFileRoute("/centres/$centreId")({
  head: () => ({
    meta: [
      { title: "Centre Details — PVIRA CYCLE" },
      { name: "description", content: "Accepted materials, opening hours, capacity and directions for this PVIRA drop-off centre." },
      { property: "og:title", content: "Centre Details — PVIRA CYCLE" },
      { property: "og:description", content: "Accepted materials, hours and directions for this drop-off centre." },
    ],
  }),
  component: CentreDetailPage,
});

function CentreDetailPage() {
  const { centreId } = Route.useParams();
  const { data, isPending, error, refetch } = useQuery(centreQuery(centreId));

  return (
    <>
      <PageHeader eyebrow="Centre" title={data?.name ?? "Drop-off centre"} description={data?.city} />
      <Section>
        {isPending ? (
          <LoadingState label="Loading centre…" />
        ) : error ? (
          <ErrorState onRetry={() => void refetch()} />
        ) : !data ? (
          <EmptyState title="Centre not found" description="This centre may have been removed." />
        ) : (
          <div className="max-w-xl">
            <CentreCard centre={data} />
            {data.instructions && <p className="mt-6 text-muted-foreground">{data.instructions}</p>}
          </div>
        )}
      </Section>
    </>
  );
}
