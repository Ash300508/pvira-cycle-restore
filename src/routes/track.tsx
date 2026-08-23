import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { PageHeader, Section } from "@/components/pvira/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge, toneForStatus } from "@/components/pvira/StatusBadge";
import { RecoveryTimeline } from "@/components/pvira/Timeline";
import { EmptyState, ErrorState, LoadingState } from "@/components/pvira/States";
import { recordByReferenceQuery } from "@/lib/queries";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track My Idol — PAVITRA CYCLE" },
      {
        name: "description",
        content: "Enter your drop-off reference ID to follow each stage of your idol's recovery journey.",
      },
      { property: "og:title", content: "Track My Idol — PAVITRA CYCLE" },
      { property: "og:description", content: "Follow every stage of your idol's recovery with your reference ID." },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const [input, setInput] = useState("");
  const [reference, setReference] = useState("");
  const { data, isPending, isFetching, error, refetch } = useQuery({
    ...recordByReferenceQuery(reference),
    enabled: reference.trim().length > 3,
  });

  return (
    <>
      <PageHeader
        eyebrow="Tracking"
        title="Track my idol"
        description="Use the reference ID from your drop-off pass, e.g. PVC-2026-00042."
      />
      <Section>
        <form
          className="flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            setReference(input.trim().toUpperCase());
          }}
        >
          <div className="flex-1 space-y-2">
            <Label htmlFor="reference">Reference ID</Label>
            <Input
              id="reference"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="PVC-2026-00042"
              autoComplete="off"
            />
          </div>
          <Button type="submit" size="lg" disabled={input.trim().length < 4}>
            <Search /> Track
          </Button>
        </form>

        <div className="mt-10 max-w-2xl">
          {!reference ? (
            <EmptyState
              title="Enter a reference ID"
              description="Your reference was shown when you registered the drop-off, and is on your QR pass."
            />
          ) : isPending || isFetching ? (
            <LoadingState label="Looking up your record…" />
          ) : error ? (
            <ErrorState onRetry={() => void refetch()} />
          ) : !data ? (
            <EmptyState
              title="No record found"
              description="Check the reference ID and try again. Records are visible once a drop-off has been registered."
            />
          ) : (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">{data.reference_id}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {data.detected_material}
                    {data.drop_off_centres ? ` · ${data.drop_off_centres.name}, ${data.drop_off_centres.city}` : ""}
                  </p>
                </div>
                <StatusBadge tone={toneForStatus(data.status)}>{data.status}</StatusBadge>
              </div>
              <div className="mt-8">
                <RecoveryTimeline status={data.status} />
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
