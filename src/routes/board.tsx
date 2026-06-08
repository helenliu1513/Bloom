import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useBloom } from "@/lib/bloom-store";
import type { Nutrient } from "@/lib/bloom.functions";

export const Route = createFileRoute("/board")({
  head: () => ({
    meta: [
      { title: "Daily Bloom Board — Bloom" },
      { name: "description", content: "Recognizing the people and teams growing healthier collaboration." },
      { property: "og:title", content: "Daily Bloom Board — Bloom" },
      { property: "og:description", content: "Today's top bloomers, team gardens, and the daily winner." },
    ],
  }),
  component: BoardPage,
});

const NUTRIENT_ICON: Record<Nutrient, string> = {
  Water: "💧", Sunlight: "☀️", Roots: "🌱", Bloom: "🌸", Butterfly: "🦋",
};

function BoardPage() {
  const { sortedLeaderboard, teamHealth, activity, recogNote, setRecogNote } = useBloom();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
          Daily Bloom Board
        </h1>
        <p className="text-muted-foreground mt-2">
          Recognizing the people and teams who made collaboration healthier today.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-3xl p-7">
          <h3 className="font-medium mb-4">Top Bloomers</h3>
          <ul className="space-y-3">
            {sortedLeaderboard.map((p, i) => (
              <li
                key={p.name}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
                  p.name === "You" ? "bg-accent/60 ring-1 ring-primary/30" : "bg-white/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-5">{i + 1}</span>
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.badge}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-moss">{p.points} pts</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-3xl p-7">
          <h3 className="font-medium mb-4">Top Team Gardens</h3>
          <ul className="space-y-3">
            {[
              { name: "Design Team", health: 94, badge: "Best Garden" },
              { name: "Product Team", health: teamHealth, badge: "Most Improved" },
              { name: "Engineering Team", health: 79, badge: "Supportive Team" },
            ]
              .sort((a, b) => b.health - a.health)
              .map((t, i) => (
                <li key={t.name} className="flex items-center justify-between rounded-2xl px-4 py-3 bg-white/60">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-5">{i + 1}</span>
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.badge}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-moss">{t.health}%</div>
                </li>
              ))}
          </ul>
        </div>

        <div className="rounded-3xl p-7 bg-gradient-to-br from-[oklch(0.92_0.1_90)] via-[oklch(0.9_0.08_120)] to-[oklch(0.88_0.07_140)] shadow-glow border border-white/40">
          <div className="text-xs uppercase tracking-wider text-moss font-semibold">
            Today's Bloom Winner
          </div>
          <div className="text-2xl font-medium mt-2" style={{ fontFamily: "Fraunces, serif" }}>
            🌸 {sortedLeaderboard[0].name}
          </div>
          <p className="text-sm mt-3 leading-relaxed text-foreground/80">
            {sortedLeaderboard[0].name} grew the healthiest garden today by sending
            appreciation, clarifying confusing asks, and supporting blocked teammates.
          </p>
          <div className="text-xs mt-4 text-foreground/70">
            Suggested reward: coffee credit, public shoutout, or team kudos.
          </div>
          <Button
            variant="secondary"
            className="mt-5 rounded-full w-full"
            onClick={() =>
              setRecogNote(
                `Shoutout to ${sortedLeaderboard[0].name} for helping our team communicate with more clarity and care today.`,
              )
            }
          >
            Generate recognition note
          </Button>
          {recogNote && (
            <div className="mt-4 rounded-2xl bg-white/70 p-4 text-sm italic animate-bloom">
              "{recogNote}"
            </div>
          )}
        </div>
      </div>

      <div className="glass-card rounded-3xl p-7 mt-6">
        <h3 className="text-xl font-medium mb-1" style={{ fontFamily: "Fraunces, serif" }}>
          Recent garden growth
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          Healthy collaboration is built one message at a time.
        </p>
        <ul className="divide-y divide-border/60">
          {activity.map((a) => (
            <li key={a.id} className="flex items-center gap-4 py-3 text-sm">
              <span className="text-2xl">{NUTRIENT_ICON[a.nutrient]}</span>
              <div>
                <span className="font-medium">{a.who}</span>{" "}
                <span className="text-muted-foreground">added</span>{" "}
                <span className="font-medium text-moss">{a.nutrient}</span>{" "}
                <span className="text-muted-foreground">by {a.note}.</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
