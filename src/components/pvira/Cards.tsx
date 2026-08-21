import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-leaf-gradient group-hover:text-primary-foreground">
        {icon}
      </span>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
      <span className="font-display text-sm font-semibold tracking-[0.2em] text-leaf">{number}</span>
      <span className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export function DashboardCard({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-soft", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
