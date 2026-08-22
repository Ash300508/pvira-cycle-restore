import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Menu, ShieldCheck, User, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Logo } from "@/components/pvira/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/scanner", label: "AI Scanner" },
  { to: "/centres", label: "Drop-Off Centres" },
  { to: "/impact", label: "Impact" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    setOpen(false);
    navigate({ to: "/auth", search: { mode: "login" }, replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  pathname === link.to && "bg-secondary text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-leaf-gradient text-[11px] font-semibold text-primary-foreground">
                    {(profile?.name ?? user.email ?? "P").slice(0, 1).toUpperCase()}
                  </span>
                  <span className="max-w-28 truncate">{profile?.name ?? "Account"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate text-xs font-normal text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User /> Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <ShieldCheck /> Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => void handleSignOut()}>
                  <LogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth" search={{ mode: "login" }}>
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/auth" search={{ mode: "signup" }}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto flex w-full max-w-7xl flex-col p-3">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Button asChild variant="secondary" size="lg" onClick={() => setOpen(false)}>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" onClick={() => setOpen(false)}>
                    <Link to="/profile">Profile</Link>
                  </Button>
                  {isAdmin && (
                    <Button asChild variant="outline" size="lg" onClick={() => setOpen(false)}>
                      <Link to="/admin">Admin</Link>
                    </Button>
                  )}
                  <Button variant="ghost" size="lg" onClick={() => void handleSignOut()}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button asChild size="lg" onClick={() => setOpen(false)}>
                    <Link to="/auth" search={{ mode: "signup" }}>
                      Sign Up
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" onClick={() => setOpen(false)}>
                    <Link to="/auth" search={{ mode: "login" }}>
                      Login
                    </Link>
                  </Button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
