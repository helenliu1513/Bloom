import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Leaf } from "lucide-react";
import { Logo } from "@/components/bloom/Logo";
import { Garden } from "@/components/bloom/Garden";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBloom } from "@/lib/bloom-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bloom — Better words. Healthier teams." },
      {
        name: "description",
        content:
          "Bloom uses AI to turn rushed workplace messages into clearer, kinder, more collaborative communication.",
      },
      { property: "og:title", content: "Bloom — Better words. Healthier teams." },
      {
        property: "og:description",
        content: "An AI communication coach for digital teams.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { teamHealth, growthTick, lastNutrient, teamPoints } = useBloom();
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Badge
            variant="secondary"
            className="rounded-full mb-5 bg-accent/60 text-moss border-0"
          >
            <Leaf className="h-3 w-3 mr-1" /> AI for healthier collaboration
          </Badge>
          <div className="mb-5">
            <Logo size={56} showWord={false} />
          </div>
          <h1
            className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.05]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Better words.<br />
            <span className="text-moss italic">Healthier teams.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Bloom turns rushed workplace messages into clear, warm, human
            communication — and grows a shared team garden with every better message.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/workspace">
              <Button size="lg" className="rounded-full">
                <Sparkles className="h-4 w-4 mr-2" /> Make it bloom
              </Button>
            </Link>
            <Link to="/board">
              <Button size="lg" variant="outline" className="rounded-full">
                View daily winners
              </Button>
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-4">
          <Garden
            health={teamHealth}
            growthTick={growthTick}
            lastNutrient={lastNutrient}
            teamPoints={teamPoints}
          />
          <div className="px-3 pt-4 pb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>Your team garden, growing live.</span>
            <span className="font-medium text-moss">{teamHealth}% healthy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
