import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/bloom/Logo";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const NAV = [
  { to: "/workspace", label: "Workspace" },
  { to: "/garden", label: "Gardens" },
  { to: "/board", label: "Bloom Board" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0">
          <Logo size={32} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`transition-colors hover:text-foreground ${
                  active ? "text-foreground font-medium" : ""
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Link to="/workspace">
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Sparkles className="h-4 w-4 mr-1.5" /> Make it bloom
          </Button>
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
      Bloom — Better words. Healthier teams.
    </footer>
  );
}
