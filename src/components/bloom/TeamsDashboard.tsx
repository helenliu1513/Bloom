import { Garden } from "./Garden";
import { Trophy, Sparkles, TrendingUp } from "lucide-react";

interface TeamGarden {
  name: string;
  health: number;
  badge: string;
  members: Record<string, number>;
  highlight?: string;
}

interface TeamsDashboardProps {
  productTeamHealth: number;
  productTeamPoints: Record<string, number>;
  growthTick: number;
  lastNutrient?: string;
}

export function TeamsDashboard({
  productTeamHealth,
  productTeamPoints,
  growthTick,
  lastNutrient,
}: TeamsDashboardProps) {
  const teams: TeamGarden[] = [
    {
      name: "Design Team",
      health: 94,
      badge: "Best Garden",
      highlight: "Most appreciation sent today",
      members: { Maya: 130, Alex: 115, Jordan: 108, Priya: 95, You: 88 },
    },
    {
      name: "Product Team",
      health: productTeamHealth,
      badge: "Most Improved",
      highlight: "Biggest jump in clarity this week",
      members: productTeamPoints,
    },
    {
      name: "Engineering Team",
      health: 79,
      badge: "Supportive Team",
      highlight: "Top in unblocking teammates",
      members: { Maya: 70, Alex: 92, Jordan: 60, Priya: 75, You: 50 },
    },
  ];

  const sorted = [...teams].sort((a, b) => b.health - a.health);

  const rankIcon = [Trophy, Sparkles, TrendingUp];
  const rankColor = [
    "from-[oklch(0.92_0.13_88)] to-[oklch(0.85_0.15_70)] text-[oklch(0.4_0.12_60)]",
    "from-[oklch(0.92_0.07_320)] to-[oklch(0.86_0.1_310)] text-[oklch(0.4_0.12_320)]",
    "from-[oklch(0.92_0.08_145)] to-[oklch(0.85_0.1_140)] text-moss",
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-medium"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Top Team Gardens Blooming Today
        </h2>
        <p className="text-muted-foreground mt-2">
          Every team's garden, side by side. Health updates as messages bloom.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {sorted.map((team, i) => {
          const Icon = rankIcon[i];
          return (
            <div
              key={team.name}
              className="glass-card rounded-3xl p-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-9 w-9 rounded-xl bg-gradient-to-br ${rankColor[i]} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Rank #{i + 1}
                    </div>
                    <div
                      className="text-base font-semibold leading-tight"
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {team.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-moss leading-none">
                    {team.health}%
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">healthy</div>
                </div>
              </div>

              <Garden
                health={team.health}
                growthTick={team.name === "Product Team" ? growthTick : 0}
                lastNutrient={team.name === "Product Team" ? lastNutrient : undefined}
                teamPoints={team.members}
                compact
              />

              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-accent/60 text-accent-foreground font-medium">
                  {team.badge}
                </span>
                <span className="text-xs text-muted-foreground text-right">
                  {team.highlight}
                </span>
              </div>

              {/* health bar */}
              <div className="mt-3 h-1.5 w-full rounded-full bg-accent/40 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.14_140)] to-[oklch(0.85_0.15_95)] transition-all duration-700"
                  style={{ width: `${team.health}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
