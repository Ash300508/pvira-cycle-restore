import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, MapPin, ScanLine } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Section } from "@/components/pvira/Section";
import { Button } from "@/components/ui/button";
import { PhotoAttachment } from "@/components/pvira/PhotoAttachment";
import { DemoBadge, StatusBadge, toneForRisk } from "@/components/pvira/StatusBadge";
import { analyseIdolImage, ImageValidationError, type ScanResult } from "@/lib/vision";

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
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const analyse = async () => {
    if (!file) return;
    setBusy(true);
    setResult(null);
    try {
      setResult(await analyseIdolImage(file));
    } catch (err) {
      toast.error(
        err instanceof ImageValidationError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Could not analyse that image.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="AI Scanner"
        title="Identify your idol's material"
        description="Take a photo or choose one from your device. We estimate the base material and its environmental risk."
      />
      <Section>
        <div className="grid max-w-5xl gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <PhotoAttachment
              file={file}
              onChange={(next) => {
                setFile(next);
                setResult(null);
              }}
            />
            <Button size="lg" onClick={() => void analyse()} disabled={!file || busy}>
              {busy ? <Loader2 className="animate-spin" /> : <ScanLine />}
              {busy ? "Analysing…" : "Analyse idol"}
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP up to 5 MB. Good daylight and a plain background give the best estimate.
            </p>
          </div>

          <div>
            {result ? (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Detected material</p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{result.material}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{result.confidence}% confidence</p>
                  </div>
                  <StatusBadge tone={toneForRisk(result.risk)}>{result.risk} risk</StatusBadge>
                </div>
                {result.isDemo && <DemoBadge className="mt-4" label="Demo AI analysis" />}

                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">Why it matters</dt>
                    <dd className="mt-1 leading-relaxed text-muted-foreground">{result.summary}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">How it is recovered</dt>
                    <dd className="mt-1 leading-relaxed text-muted-foreground">{result.recovery}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">What to do next</dt>
                    <dd className="mt-1 leading-relaxed text-muted-foreground">{result.action}</dd>
                  </div>
                </dl>

                <Button asChild className="mt-6">
                  <Link to="/centres">
                    <MapPin /> Find a drop-off centre
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex h-full min-h-52 items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center text-sm text-muted-foreground">
                Your material analysis will appear here.
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
