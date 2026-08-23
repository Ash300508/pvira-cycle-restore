import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Loader as Loader2, MapPin, Recycle, ScanLine, Circle as XCircle } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Section } from "@/components/pvira/Section";
import { Button } from "@/components/ui/button";
import { PhotoAttachment } from "@/components/pvira/PhotoAttachment";
import { DemoBadge, StatusBadge, toneForRisk } from "@/components/pvira/StatusBadge";
import { analyseIdolImage, ImageValidationError, type ScanResult } from "@/lib/vision";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "AI Scanner — PAVITRA CYCLE" },
      { name: "description", content: "Upload a photo to identify the waste material, recyclability and disposal method with AI." },
      { property: "og:title", content: "AI Scanner — PAVITRA CYCLE" },
      { property: "og:description", content: "Detect waste material, recyclability and disposal method with the PAVITRA AI Scanner." },
    ],
  }),
  component: ScannerPage,
});

function ScannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyse = async () => {
    if (!file) return;
    setBusy(true);
    setResult(null);
    setError(null);
    try {
      setResult(await analyseIdolImage(file));
    } catch (err) {
      const msg =
        err instanceof ImageValidationError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Could not analyse that image. Please try again with a clearer photo.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="AI Scanner"
        title="Identify your waste material"
        description="Take a photo or choose one from your device. Our AI identifies the material, whether it's recyclable, and the best disposal method."
      />
      <Section>
        <div className="grid max-w-5xl gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <PhotoAttachment
              file={file}
              onChange={(next) => {
                setFile(next);
                setResult(null);
                setError(null);
              }}
            />
            <Button size="lg" onClick={() => void analyse()} disabled={!file || busy}>
              {busy ? <Loader2 className="animate-spin" /> : <ScanLine />}
              {busy ? "Analysing…" : "Analyse image"}
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP up to 5 MB. Good daylight and a plain background give the best results.
            </p>
          </div>

          <div>
            {busy ? (
              <ScannerLoading />
            ) : error ? (
              <ScannerError message={error} onRetry={() => void analyse()} />
            ) : result ? (
              <ScannerResult result={result} />
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

function ScannerLoading() {
  return (
    <div className="flex h-full min-h-52 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-6 text-center">
      <div className="relative">
        <div className="size-16 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 size-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <ScanLine className="absolute inset-0 m-auto size-6 text-primary" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-foreground">Analysing your image</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Identifying material type, recyclability and disposal method…
        </p>
      </div>
    </div>
  );
}

function ScannerError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex h-full min-h-52 flex-col items-center justify-center gap-4 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-7 text-destructive" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-foreground">Could not analyse image</p>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">{message}</p>
      </div>
      <Button size="sm" variant="outline" onClick={onRetry}>
        <ScanLine /> Try again
      </Button>
    </div>
  );
}

function ScannerResult({ result }: { result: ScanResult }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Waste / material category</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{result.material}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{result.confidence}% confidence</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge tone={toneForRisk(result.risk)}>{result.risk} risk</StatusBadge>
          {result.isDemo && <DemoBadge label="Demo AI analysis" />}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3">
        {result.recyclable ? (
          <>
            <CheckCircle2 className="size-5 shrink-0 text-success" />
            <span className="text-sm font-medium text-foreground">Recyclable / recoverable</span>
          </>
        ) : (
          <>
            <XCircle className="size-5 shrink-0 text-destructive" />
            <span className="text-sm font-medium text-foreground">Not readily recyclable</span>
          </>
        )}
      </div>

      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="flex items-center gap-1.5 font-semibold text-foreground">
            <Recycle className="size-4 text-leaf" /> Suggested disposal / recycling method
          </dt>
          <dd className="mt-1 leading-relaxed text-muted-foreground">{result.disposalMethod}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Explanation</dt>
          <dd className="mt-1 leading-relaxed text-muted-foreground">{result.explanation}</dd>
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
  );
}
