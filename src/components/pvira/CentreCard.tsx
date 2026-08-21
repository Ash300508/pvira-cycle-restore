import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge, toneForStatus } from "@/components/pvira/StatusBadge";
import type { Centre } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function directionsUrl(centre: Centre) {
  if (centre.latitude != null && centre.longitude != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${centre.latitude},${centre.longitude}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${centre.name} ${centre.address} ${centre.city}`,
  )}`;
}

export function capacityPercent(centre: Centre) {
  if (!centre.capacity) return 0;
  return Math.min(100, Math.round((centre.current_load / centre.capacity) * 100));
}

export function CentreCard({
  centre,
  distance,
  onSelect,
  selecting,
}: {
  centre: Centre;
  distance?: number | null;
  onSelect?: (centre: Centre) => void;
  selecting?: boolean;
}) {
  const fill = capacityPercent(centre);
  const acceptsNothing = centre.status !== "Open";

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">{centre.name}</h3>
          <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {centre.address}, {centre.city} — {centre.pincode}
            </span>
          </p>
        </div>
        <StatusBadge tone={toneForStatus(centre.status)}>{centre.status}</StatusBadge>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">Distance</dt>
          <dd className="mt-0.5 font-medium text-foreground">
            {distance != null ? `${distance} km` : "Enable location"}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">Opening hours</dt>
          <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-foreground">
            <Clock className="size-3.5 text-muted-foreground" aria-hidden="true" />
            <span className="truncate">{centre.opening_hours}</span>
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Accepted materials</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {centre.accepted_materials.map((m) => (
            <li
              key={m}
              className="rounded-full border border-primary/15 bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
            >
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Current capacity</span>
          <span className="font-medium text-foreground">{fill}% full</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary" role="presentation">
          <div
            className={cn("h-full rounded-full transition-all", fill > 85 ? "bg-destructive" : "bg-leaf-gradient")}
            style={{ width: `${fill}%` }}
          />
        </div>
      </div>

      {centre.contact_phone && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Phone className="size-3.5" aria-hidden="true" />
          <a href={`tel:${centre.contact_phone}`} className="hover:text-foreground">
            {centre.contact_phone}
          </a>
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2 pt-1">
        <Button asChild variant="outline" size="sm">
          <Link to="/centres/$centreId" params={{ centreId: centre.id }}>
            View Details
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href={directionsUrl(centre)} target="_blank" rel="noreferrer noopener">
            <Navigation /> Get Directions
          </a>
        </Button>
        {onSelect && (
          <Button size="sm" disabled={acceptsNothing || selecting} onClick={() => onSelect(centre)}>
            {acceptsNothing ? "Unavailable" : selecting ? "Selecting…" : "Select Centre"}
          </Button>
        )}
      </div>
    </article>
  );
}
