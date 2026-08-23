import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="PAVITRA CYCLE home">
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl transition-transform group-hover:rotate-12",
          inverted ? "bg-primary/20 text-primary-foreground" : "bg-leaf-gradient text-primary-foreground",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3.5c3 0 5.5 2 6.5 4.8" strokeLinecap="round" />
          <path d="M18.9 6.2 19.4 9l-2.8.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.6 15.4c-1.5 2.6-4.3 4.1-7.2 3.9" strokeLinecap="round" />
          <path d="M13.6 20.6 11 19.2l1.6-2.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.4 14.6C3.9 12 4 8.9 5.7 6.6" strokeLinecap="round" />
          <path d="M3 9.8l2.5-1.4 1.4 2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-semibold tracking-tight",
            inverted ? "text-forest-foreground" : "text-foreground",
          )}
        >
          PAVITRA <span className="text-leaf">CYCLE</span>
        </span>
        <span className={cn("mt-0.5 text-[10px] uppercase tracking-[0.18em]", inverted ? "text-forest-foreground/60" : "text-muted-foreground")}>
          Respect · Recover
        </span>
      </span>
    </Link>
  );
}
