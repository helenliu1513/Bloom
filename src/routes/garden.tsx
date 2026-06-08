import { createFileRoute } from "@tanstack/react-router";
import { Garden } from "@/components/bloom/Garden";
import { TeamsDashboard } from "@/components/bloom/TeamsDashboard";
import { useBloom } from "@/lib/bloom-store";

export const Route = createFileRoute("/garden")({
  head: () => ({
    meta: [
      { title: "Team Gardens — Bloom" },
      { name: "description", content: "A living view of every team's collaboration health." },
      { property: "og:title", content: "Team Gardens — Bloom" },
      { property: "og:description", content: "Your team garden and the top blooming teams, side by side." },
    ],
  }),
  component: GardenPage,
});

function GardenPage() {
  const {
    teamHealth, kindMsgs, appreciation, clarity, supported,
    growthTick, lastNutrient, teamPoints,
  } = useBloom();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 space-y-10">
      <div className="glass-card rounded-3xl p-7">
        <div className="flex items-baseline justify-between">
          <h1 className="text-3xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
            Your Team Garden
          </h1>
          <span className="text-xs text-muted-foreground">Product Team</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          A living view of healthier collaboration habits.
        </p>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          <Stat label="Garden health" value={`${teamHealth}%`} />
          <Stat label="Kind messages" value={kindMsgs} />
          <Stat label="Appreciation" value={appreciation} />
          <Stat label="Clarity" value={clarity} />
          <Stat label="Supported" value={supported} />
        </div>

        <div className="mt-5">
          <Garden
            health={teamHealth}
            growthTick={growthTick}
            lastNutrient={lastNutrient}
            teamPoints={teamPoints}
          />
        </div>
      </div>

      <TeamsDashboard
        productTeamHealth={teamHealth}
        productTeamPoints={teamPoints}
        growthTick={growthTick}
        lastNutrient={lastNutrient}
      />
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white/60 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-semibold mt-0.5 text-moss text-lg">{value}</div>
    </div>
  );
}
