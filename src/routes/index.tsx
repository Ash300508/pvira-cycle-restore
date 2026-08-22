import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Droplets,
  Leaf,
  MapPin,
  QrCode as QrIcon,
  Recycle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/pvira/Section";
import { FeatureCard, StepCard } from "@/components/pvira/Cards";
import { AnimatedCounter } from "@/components/pvira/AnimatedCounter";
import { DemoBadge } from "@/components/pvira/StatusBadge";
import { impactQuery } from "@/lib/queries";
import { BRAND } from "@/lib/pvira";
import heroImage from "@/assets/hero-clay.jpg";
import recoveryImage from "@/assets/recovery.jpg";
import waterImage from "@/assets/water.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const FEATURES = [
  {
    icon: <ScanLine className="size-5" />,
    title: "AI Material Scanner",
    description:
      "Upload a photo of your idol and get the likely base material, a confidence level and its environmental risk rating.",
  },
  {
    icon: <MapPin className="size-5" />,
    title: "Verified Drop-Off Centres",
    description:
      "Search by city or PIN code, filter by the material you need handled, and see opening hours, facilities and availability.",
  },
  {
    icon: <QrIcon className="size-5" />,
    title: "Reference ID & QR Pass",
    description:
      "Every registered drop-off gets a unique reference and QR code to show at the centre counter — no paperwork.",
  },
  {
    icon: <Recycle className="size-5" />,
    title: "Recovery Tracking",
    description:
      "Follow your idol from received to sorted, recovered and complete, with a clear record of what was recovered.",
  },
  {
    icon: <Droplets className="size-5" />,
    title: "Water Body Protection",
    description:
      "Plaster of Paris, plastic and heavy-metal paints never reach a river or lake when the idol is handed over instead.",
  },
  {
    icon: <Trophy className="size-5" />,
    title: "Eco Points & Badges",
    description:
      "Earn Eco Points for completed drop-offs and unlock badges from Eco Starter through to PVIRA Champion.",
  },
];

const STEPS = [
  {
    number: "STEP 01",
    title: "Scan your idol",
    description: "Photograph the idol. The scanner estimates the material and explains why it matters environmentally.",
    icon: <ScanLine className="size-5" />,
  },
  {
    number: "STEP 02",
    title: "Find a centre",
    description: "Pick a verified drop-off centre that accepts that material, near your city or PIN code.",
    icon: <MapPin className="size-5" />,
  },
  {
    number: "STEP 03",
    title: "Drop it off yourself",
    description: "You take the idol there in person — PVIRA never collects from homes. Show your QR pass at the counter.",
    icon: <QrIcon className="size-5" />,
  },
  {
    number: "STEP 04",
    title: "Follow the recovery",
    description: "Watch each stage of recovery, see the materials reclaimed and collect your Eco Points.",
    icon: <Recycle className="size-5" />,
  },
];

function Index() {
  const { data: metrics } = useQuery(impactQuery());
  const metric = (name: string, fallback: number) =>
    Number(metrics?.find((m) => m.metric_name === name)?.metric_value ?? fallback);
  const isDemoMetrics = metrics?.some((m) => m.is_demo) ?? true;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand-gradient">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
              <Sparkles className="size-3.5" aria-hidden="true" /> Self drop-off · No pickup service
            </span>
            <h1 className="text-balance-tight mt-6 font-display text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              Retire your idol with <span className="text-leaf">respect</span>, not into a river.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {BRAND.tagline} PVIRA CYCLE identifies what your idol is made of, points you to a verified drop-off centre
              and shows you exactly how its materials are recovered.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/scanner">
                  <ScanLine /> Scan my idol
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/centres">
                  <MapPin /> Find a drop-off centre
                </Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { label: "Idols recovered", value: metric("idols_recovered", 12480) },
                { label: "Tonnes diverted", value: metric("material_diverted_kg", 86500) / 1000 },
                { label: "Water bodies protected", value: metric("water_bodies_protected", 64) },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-foreground">
                    <AnimatedCounter value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
            {isDemoMetrics && <DemoBadge className="mt-4" label="Demo impact figures" />}
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-leaf-gradient opacity-15 blur-2xl" aria-hidden="true" />
            <img
              src={heroImage}
              alt="Artisan hands shaping a natural clay idol"
              className="aspect-[4/5] w-full rounded-[2rem] border border-border object-cover shadow-lift"
              loading="eager"
            />
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lift backdrop-blur sm:left-8">
              <span className="flex size-10 items-center justify-center rounded-xl bg-leaf-gradient text-primary-foreground">
                <Leaf className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Clay reclaimed, not lost</p>
                <p className="text-xs text-muted-foreground">Reused for new idols and pottery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section tone="default">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src={waterImage}
            alt="A clean riverbank at sunrise"
            className="aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-soft"
            loading="lazy"
          />
          <div>
            <SectionHeading
              eyebrow="Why it matters"
              title="Devotion should not settle as sludge"
              description="Plaster of Paris does not dissolve. It hardens on the riverbed, blocking light and oxygen, while decorative paints release lead and chromium into water used for drinking and farming."
            />
            <ul className="mt-8 space-y-4">
              {[
                "POP idols leave a hard sludge layer that suffocates aquatic life.",
                "Synthetic paints carry heavy metals into drinking-water sources.",
                "Plastic and thermocol fragments become microplastics in the food chain.",
                "Recoverable clay, metal and gypsum are lost instead of reused.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Steps */}
      <Section tone="muted">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Four respectful steps"
          description="You stay in control of the idol the entire time. PVIRA CYCLE only makes the responsible route obvious."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline">
            <Link to="/how-it-works">See the full process</Link>
          </Button>
        </div>
      </Section>

      {/* Features */}
      <Section>
        <SectionHeading
          eyebrow="Platform"
          title="Everything needed for a responsible drop-off"
          description="From material identification to recovery proof, in one place."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Section>

      {/* Recovery */}
      <Section tone="forest">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              inverted
              eyebrow="Recovery"
              title="Nothing respectful ends in a landfill"
              description="Every material stream has a route: clay back to potters, POP to gypsum and construction filler, plastic to registered recyclers, metal to foundries, paper and mud to compost."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="secondary" size="lg">
                <Link to="/impact">View our impact</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-forest-foreground/30 bg-transparent text-forest-foreground hover:bg-forest-foreground/10">
                <Link to="/track">Track my idol</Link>
              </Button>
            </div>
          </div>
          <img
            src={recoveryImage}
            alt="Workers sorting materials at a recovery facility"
            className="aspect-[4/3] w-full rounded-3xl border border-forest-foreground/15 object-cover shadow-lift"
            loading="lazy"
          />
        </div>
      </Section>

      {/* CTA */}
      <Section tone="muted">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft md:p-14">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            Ready to hand over your idol responsibly?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Create a free account to register drop-offs, follow recovery and collect Eco Points.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/auth" search={{ mode: "signup" }}>
                Create free account
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/scanner">Try the scanner first</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
