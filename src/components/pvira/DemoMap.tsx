import { MapPin } from "lucide-react";
import { HAS_MAP_API } from "@/lib/ai-config";
import { DemoBadge } from "@/components/pvira/StatusBadge";
import type { Centre } from "@/lib/queries";
import { cn } from "@/lib/utils";

/**
 * Map surface. When a map provider key is configured (PRODUCTION MODE) this is
 * where the real map component mounts. Without a key the app still works: we
 * render a schematic demo map placing centres by relative latitude/longitude.
 */
export function DemoMap({
  centres,
  activeId,
  onSelect,
  className,
  height = "h-72",
}: {
  centres: Centre[];
  activeId?: string | null;
  onSelect?: (centre: Centre) => void;
  className?: string;
  height?: string;
}) {
  const points = centres.filter((c) => c.latitude != null && c.longitude != null);
  const lats = points.map((c) => c.latitude!);
  const lngs = points.map((c) => c.longitude!);
  const minLat = Math.min(...lats, 0);
  const maxLat = Math.max(...lats, 1);
  const minLng = Math.min(...lngs, 0);
  const maxLng = Math.max(...lngs, 1);

  const pos = (c: Centre) => ({
    left: `${8 + ((c.longitude! - minLng) / (maxLng - minLng || 1)) * 84}%`,
    top: `${88 - ((c.latitude! - minLat) / (maxLat - minLat || 1)) * 76}%`,
  });

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-card", height, className)}>
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.9 0.02 140 / 0.7) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0.02 140 / 0.7) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-sand-gradient opacity-40" aria-hidden="true" />

      {!HAS_MAP_API && (
        <div className="absolute left-3 top-3 z-10">
          <DemoBadge label="Demo map view" />
        </div>
      )}

      {points.length === 0 ? (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          No mapped centres to show.
        </p>
      ) : (
        points.map((centre) => {
          const active = activeId === centre.id;
          return (
            <button
              key={centre.id}
              type="button"
              onClick={() => onSelect?.(centre)}
              style={pos(centre)}
              className="group absolute -translate-x-1/2 -translate-y-full"
              aria-label={`${centre.name}, ${centre.city}`}
            >
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium shadow-soft transition-all",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground group-hover:border-primary/40",
                )}
              >
                <MapPin className="size-3.5" aria-hidden="true" />
                <span className="max-w-24 truncate">{centre.city}</span>
              </span>
            </button>
          );
        })
      )}
    </div>
  );
}
