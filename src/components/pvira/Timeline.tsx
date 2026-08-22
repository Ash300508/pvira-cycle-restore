import { Check, Circle } from "lucide-react";
import { DROP_OFF_STATUSES, RECOVERY_TIMELINE } from "@/lib/pvira";
import { cn } from "@/lib/utils";

export function RecoveryTimeline({ status }: { status: string }) {
  const currentIndex = DROP_OFF_STATUSES.indexOf(status as (typeof DROP_OFF_STATUSES)[number]);

  return (
    <ol className="relative space-y-6 pl-8">
      <span className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-border" aria-hidden="true" />
      {RECOVERY_TIMELINE.map((step) => {
        const stepIndex = DROP_OFF_STATUSES.indexOf(step.status);
        const done = currentIndex >= stepIndex;
        const active = status === step.status;
        return (
          <li key={step.status} className="relative">
            <span
              className={cn(
                "absolute -left-8 flex size-6 items-center justify-center rounded-full border",
                done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground",
                active && "ring-2 ring-ring/40",
              )}
              aria-hidden="true"
            >
              {done ? <Check className="size-3.5" /> : <Circle className="size-2" />}
            </span>
            <p className={cn("text-sm font-semibold", done ? "text-foreground" : "text-muted-foreground")}>
              {step.label}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
