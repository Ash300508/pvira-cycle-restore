import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/pvira/Logo";
import { BRAND } from "@/lib/pvira";

const COLUMNS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { to: "/", label: "Home" },
      { to: "/how-it-works", label: "How It Works" },
      { to: "/scanner", label: "AI Scanner" },
    ],
  },
  {
    title: "Recovery",
    links: [
      { to: "/centres", label: "Drop-Off Centres" },
      { to: "/track", label: "Track My Idol" },
      { to: "/impact", label: "Impact" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-forest-gradient text-forest-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-forest-foreground/70">{BRAND.tagline}</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-foreground/50">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-forest-foreground/80 transition-colors hover:text-forest-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-forest-foreground/12">
        <p className="mx-auto w-full max-w-7xl px-4 py-6 text-xs text-forest-foreground/55 sm:px-6">
          © 2026 PAVITRA CYCLE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
