import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Sparkles, Loader2, Heart, Briefcase, Users, Scissors, Feather, Copy, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PersonalPlant, stageFor } from "@/components/bloom/PersonalPlant";
import { useBloom } from "@/lib/bloom-store";
import type { Nutrient } from "@/lib/bloom.functions";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title: "Workspace — Bloom" },
      { name: "description", content: "Paste a message, pick a goal, and watch Bloom rewrite it." },
      { property: "og:title", content: "Workspace — Bloom" },
      { property: "og:description", content: "Rewrite rushed messages into clear, kind ones." },
    ],
  }),
  component: WorkspacePage,
});

const QUICK_ACTIONS = [
  { id: "Make it Friendlier", label: "Friendlier", desc: "Add warmth and approachability.", Icon: Heart },
  { id: "Make it More Professional", label: "More Professional", desc: "Polish business communication.", Icon: Briefcase },
  { id: "Make it More Collaborative", label: "More Collaborative", desc: "Emphasize teamwork.", Icon: Users },
  { id: "Make it More Concise", label: "More Concise", desc: "Reduce words, keep meaning.", Icon: Scissors },
  { id: "Make it More Diplomatic", label: "More Diplomatic", desc: "Soften harsh language.", Icon: Feather },
] as const;

const SAMPLES = [
  "This doesn't make sense. Fix it.",
  "Need this by 3.",
  "Why wasn't this done already?",
  "Your design is confusing.",
  "Can you just handle this?",
];

const CUSTOM_PLACEHOLDERS = [
  "Make this sound more confident",
  "Add urgency without sounding rude",
  "Make this appropriate for an executive audience",
  "Make this sound more enthusiastic",
  "Turn this into a friendly Slack message",
];

const NUTRIENT_META: Record<Nutrient, { icon: string; color: string }> = {
  Water: { icon: "💧", color: "oklch(0.85 0.08 230)" },
  Sunlight: { icon: "☀️", color: "oklch(0.9 0.13 90)" },
  Roots: { icon: "🌱", color: "oklch(0.78 0.1 150)" },
  Bloom: { icon: "🌸", color: "oklch(0.86 0.09 20)" },
  Butterfly: { icon: "🦋", color: "oklch(0.82 0.12 310)" },
};

function WorkspacePage() {
  const {
    message, setMessage,
    selectedAction, setSelectedAction,
    customInstruction, setCustomInstruction,
    loading, result, used, copied,
    handleBloom, handleUse, handleCopy,
    myGrowth, myHealth, growthTick,
  } = useBloom();

  const currentStage = stageFor(myGrowth);
  const placeholderHint = useMemo(
    () => CUSTOM_PLACEHOLDERS[Math.floor(Math.random() * CUSTOM_PLACEHOLDERS.length)],
    [],
  );

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 space-y-10">
      <header className="text-center">
        <h1 className="text-4xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
          Workspace
        </h1>
        <p className="text-muted-foreground mt-2">
          Paste a message, pick a goal, and watch it bloom.
        </p>
      </header>

      <div className="glass-card rounded-3xl p-7">
        <h2 className="text-2xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
          Paste your message
        </h2>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste a message you're about to send…"
          className="mt-5 min-h-28 rounded-2xl bg-white/70 resize-none"
        />
        <div className="mt-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">Try a sample</div>
          <div className="flex flex-wrap gap-2">
            {SAMPLES.map((s) => (
              <button
                key={s}
                onClick={() => setMessage(s)}
                className="px-3 py-1.5 rounded-full text-xs bg-accent/60 hover:bg-accent text-accent-foreground border border-border/50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-7">
        <h2 className="text-2xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
          What would you like to improve?
        </h2>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {QUICK_ACTIONS.map(({ id, label, desc, Icon }) => {
            const active = selectedAction === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedAction(id)}
                className={`text-left rounded-2xl p-4 border transition-all ${
                  active
                    ? "bg-primary/10 border-primary shadow-glow ring-2 ring-primary/40"
                    : "bg-white/70 border-border hover:border-primary/50"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center mb-3 ${
                    active ? "bg-primary text-primary-foreground" : "bg-accent text-moss"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">{label}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</div>
              </button>
            );
          })}
        </div>
        <Button
          onClick={() => handleBloom(false)}
          disabled={!message.trim() || loading}
          size="lg"
          className="mt-6 w-full rounded-full"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Blooming your message…</>
          ) : (
            <><Sparkles className="h-4 w-4 mr-2" /> Make it bloom</>
          )}
        </Button>
      </div>

      <div className="glass-card rounded-3xl p-7">
        <h2 className="text-2xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
          Need something else?
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5">
          Custom instructions override the quick action above.
        </p>
        <Textarea
          value={customInstruction}
          onChange={(e) => setCustomInstruction(e.target.value)}
          placeholder={placeholderHint}
          className="mt-4 min-h-20 rounded-2xl bg-white/70 resize-none"
        />
        <Button
          onClick={() => handleBloom(true)}
          disabled={!message.trim() || !customInstruction.trim() || loading}
          size="lg"
          variant="outline"
          className="mt-4 w-full rounded-full border-primary/40 hover:bg-primary/5"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Rewriting…</>
          ) : (
            <><Sparkles className="h-4 w-4 mr-2" /> Rewrite with Custom Instructions</>
          )}
        </Button>
      </div>

      <div className="glass-card rounded-3xl p-7 min-h-[260px]">
        {!result ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="text-6xl mb-4 animate-sway">🌱</div>
            <p className="text-muted-foreground">Your bloomed message will appear here.</p>
          </div>
        ) : (
          <div key={result.bloomed_message} className="animate-bloom flex flex-col">
            <div className="text-xs uppercase tracking-wider text-moss font-medium mb-2">
              Bloomed message
            </div>
            <blockquote
              className="rounded-2xl bg-gradient-to-br from-[oklch(0.97_0.04_110)] to-[oklch(0.94_0.06_130)] border-l-4 border-primary p-5 text-base leading-relaxed font-medium"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              “{result.bloomed_message}”
            </blockquote>
            <div className="mt-5 space-y-2 text-sm">
              <div><span className="font-medium">What changed: </span><span className="text-muted-foreground">{result.what_changed}</span></div>
              <div><span className="font-medium">Why this helps: </span><span className="text-muted-foreground">{result.why_this_helps}</span></div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge
                className="rounded-full text-sm py-1 px-3 border-0"
                style={{ background: NUTRIENT_META[result.nutrient].color, color: "oklch(0.25 0.05 150)" }}
              >
                {NUTRIENT_META[result.nutrient].icon} {result.nutrient} added
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                +{result.growth_points} growth points
              </Badge>
              {result.source === "fallback" && (
                <Badge variant="outline" className="rounded-full text-xs">demo fallback</Badge>
              )}
            </div>
            <div className="mt-3 text-xs text-moss italic">
              Recognition: {result.recognition_signal}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={handleUse}
                disabled={used}
                className="rounded-full flex-1 min-w-[180px]"
                variant={used ? "secondary" : "default"}
              >
                {used ? "✓ Garden grew" : "Use this message"}
              </Button>
              <Button onClick={handleCopy} variant="outline" className="rounded-full">
                {copied ? (
                  <><Check className="h-4 w-4 mr-1.5" /> Copied</>
                ) : (
                  <><Copy className="h-4 w-4 mr-1.5" /> Copy message</>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card rounded-3xl p-7">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
            Your plant
          </h3>
          <span className="text-xs text-muted-foreground">
            Stage: <span className="text-moss font-medium">{currentStage}</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Health {myHealth}% · {myGrowth} points today.
        </p>
        <div className="mt-5">
          <PersonalPlant growth={myGrowth} tick={growthTick} />
        </div>
      </div>

      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-medium" style={{ fontFamily: "Fraunces, serif" }}>
            Collaboration Nutrients
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Every better message adds something healthy to the team garden.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(Object.keys(NUTRIENT_INFO) as Nutrient[]).map((n) => {
            const meta = NUTRIENT_INFO[n];
            return (
              <div key={n} className="glass-card rounded-3xl p-5 text-center">
                <div className="text-4xl mb-2" aria-hidden>{meta.icon}</div>
                <div className="font-medium">{n}</div>
                <div className="text-xs text-moss font-medium mt-0.5">{meta.meaning}</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{meta.desc}</div>
                <div className="mt-3 inline-block text-xs px-2.5 py-1 rounded-full bg-accent/60 text-accent-foreground">
                  +{meta.pts} points
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const NUTRIENT_INFO: Record<Nutrient, { icon: string; meaning: string; desc: string; pts: number }> = {
  Water: { icon: "💧", meaning: "Support", desc: "Helps a teammate feel less alone or blocked.", pts: 10 },
  Sunlight: { icon: "☀️", meaning: "Clarity", desc: "Makes the message easier to understand and act on.", pts: 10 },
  Roots: { icon: "🌱", meaning: "Respectful boundaries", desc: "Keeps deadlines clear without pressure.", pts: 12 },
  Bloom: { icon: "🌸", meaning: "Appreciation", desc: "Recognizes effort and makes good work visible.", pts: 15 },
  Butterfly: { icon: "🦋", meaning: "Encouragement", desc: "Adds confidence and emotional support.", pts: 15 },
};
