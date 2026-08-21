import { cn } from "@/lib/utils";

const TONES = {
  neutral: "bg-muted text-muted-foreground border-border",
  success: "bg-success/12 text-success border-success/25",
  warning: "bg-warning/15 text-warning-foreground border-warning/35",
  danger: "bg-destructive/10 text-destructive border-destructive/25",
  info: "bg-accent text-accent-foreground border-primary/15",
} as const;

export type Tone = keyof typeof TONES;

export function toneForStatus(status: string): Tone {
  switch (status) {
    case "Completed":
    case "Open":
      return "success";
    case "Cancelled":
    case "Full":
      return "danger";
    case "Temporarily Closed":
    case "Maintenance":
      return "warning";
    case "Received":
    case "Processing":
    case "Recovery":
      return "info";
    default:
      return "neutral";
  }
}

export function toneForRisk(risk: string | null | undefined): Tone {
  if (risk === "High") return "danger";
  if (risk === "Moderate") return "warning";
  if (risk === "Low") return "success";
  return "neutral";
}

export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DemoBadge({ className, label = "Demo data" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-clay/40 bg-clay/10 px-2.5 py-1 text-xs font-medium text-clay",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
      {label}
    </span>
  );
}
