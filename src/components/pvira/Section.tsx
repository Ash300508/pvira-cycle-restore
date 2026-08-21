import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "forest";
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-20 sm:px-6 md:py-24",
        tone === "muted" && "bg-sand-gradient",
        tone === "forest" && "bg-forest-gradient text-forest-foreground",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
            inverted ? "text-forest-foreground/60" : "text-leaf",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance-tight text-3xl font-semibold md:text-4xl",
          inverted ? "text-forest-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", inverted ? "text-forest-foreground/70" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-sand-gradient px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-leaf">{eyebrow}</p>}
          <h1 className="text-balance-tight text-3xl font-semibold text-foreground md:text-4xl">{title}</h1>
          {description && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </div>
  );
}
