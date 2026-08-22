import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BRAND } from "@/lib/pvira";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: (search['mode'] === "signup" ? "signup" : "login") as "signup" | "login" | undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In or Sign Up — PVIRA CYCLE" },
      { name: "description", content: "Access your PVIRA CYCLE account to track idol drop-offs, recovery and Eco Points." },
      { property: "og:title", content: "Sign In or Sign Up — PVIRA CYCLE" },
      { property: "og:description", content: "Access your PVIRA CYCLE account to track idol drop-offs and Eco Points." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/dashboard", replace: true });
  }, [loading, user, navigate]);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { name: form.name.trim(), phone: form.phone.trim() },
          },
        });
        if (error) throw error;
        toast.success("Account created", {
          description: "If email confirmation is on, check your inbox to confirm before signing in.",
        });
        await navigate({ to: "/auth", search: { mode: "login" } });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email.trim(),
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back to PVIRA CYCLE");
        await navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="bg-sand-gradient px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-lift sm:p-9">
        <span className="flex size-11 items-center justify-center rounded-xl bg-leaf-gradient text-primary-foreground">
          <Leaf className="size-5" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold text-foreground">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{BRAND.tagline}</p>

        <form className="mt-7 space-y-4" onSubmit={submit}>
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={form.name} onChange={set("name")} required autoComplete="name" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={set("email")} required autoComplete="email" />
          </div>
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={set("password")}
              required
              minLength={6}
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy && <Loader2 className="animate-spin" />}
            {isSignup ? "Create account" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account?" : "New to PVIRA CYCLE?"}{" "}
          <Link
            to="/auth"
            search={{ mode: isSignup ? "login" : "signup" }}
            className="font-medium text-primary hover:underline"
          >
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </div>
    </section>
  );
}
