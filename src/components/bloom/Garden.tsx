import { Bell, Cosmos, Daisy, GrassTuft, Puff, Sunflower, Tulip } from "./flowers";
import { stageFor } from "./PersonalPlant";

interface GardenProps {
  health: number;
  growthTick: number;
  lastNutrient?: string;
  teamPoints?: Record<string, number>;
  compact?: boolean;
}

// Each teammate gets a distinct flower personality.
const PLANTS = [
  { name: "Maya", x: 9, kind: "puff", color: "#e85d6a", accent: "#f5c842" },
  { name: "Alex", x: 26, kind: "tulip", color: "#f5c842", accent: "#f08a3a" },
  { name: "Jordan", x: 44, kind: "bell", color: "#b97ad9", accent: "#9aa3ff" },
  { name: "Priya", x: 62, kind: "cosmos", color: "#f08a3a", accent: "#1f1a12" },
  { name: "You", x: 81, kind: "daisy", color: "#ec6aa0", accent: "#f5c842" },
] as const;

export function Garden({
  health: _health,
  growthTick,
  lastNutrient,
  teamPoints,
  compact,
}: GardenProps) {
  const h = compact ? "h-48" : "h-80";
  return (
    <div
      className={`relative ${h} w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#fff8e7] via-[#fdeec3] to-[#dff0c4]`}
    >
      {/* sun */}
      <div className="absolute top-5 right-8 h-14 w-14 rounded-full bg-[#f5c842] opacity-95 shadow-glow" />
      <div className="absolute top-7 right-10 h-7 w-7 rounded-full bg-white/60 blur-md" />

      {/* clouds */}
      <svg className="absolute top-6 left-6" width="72" height="24" viewBox="0 0 72 24">
        <ellipse cx="18" cy="16" rx="16" ry="7" fill="white" opacity="0.9" />
        <ellipse cx="36" cy="11" rx="13" ry="6" fill="white" opacity="0.9" />
        <ellipse cx="54" cy="16" rx="15" ry="6" fill="white" opacity="0.9" />
      </svg>
      <svg className="absolute top-14 left-1/2" width="56" height="20" viewBox="0 0 56 20">
        <ellipse cx="14" cy="12" rx="13" ry="6" fill="white" opacity="0.7" />
        <ellipse cx="32" cy="9" rx="11" ry="5" fill="white" opacity="0.7" />
      </svg>

      {/* far hill */}
      <svg
        className="absolute bottom-10 w-full opacity-80"
        viewBox="0 0 400 50"
        preserveAspectRatio="none"
      >
        <path d="M0 36 Q 80 8 160 26 T 320 18 T 400 22 L 400 50 L 0 50 Z" fill="#8fc28c" />
        <path d="M0 44 Q 100 24 200 36 T 400 32 L 400 50 L 0 50 Z" fill="#6ba56a" />
      </svg>

      {/* nutrient animations */}
      {lastNutrient === "Butterfly" && (
        <div key={`btf-${growthTick}`} className="absolute top-16 left-1/3 text-3xl animate-float">
          🦋
        </div>
      )}
      {lastNutrient === "Water" && (
        <div key={`w-${growthTick}`} className="absolute top-12 left-1/2 text-2xl animate-float">
          💧
        </div>
      )}
      {lastNutrient === "Bloom" && (
        <div key={`b-${growthTick}`} className="absolute top-10 left-2/3 text-3xl animate-float">
          🌸
        </div>
      )}
      {lastNutrient === "Sunlight" && (
        <div key={`sun-${growthTick}`} className="absolute top-3 right-3 text-3xl animate-float">
          ✨
        </div>
      )}
      {lastNutrient === "Roots" && (
        <div key={`r-${growthTick}`} className="absolute top-14 left-1/4 text-2xl animate-float">
          🌱
        </div>
      )}

      {/* ambient butterfly */}
      <div className="absolute top-8 right-1/3 text-xl opacity-70 animate-sway">🦋</div>

      {/* teammate plants */}
      {PLANTS.map((p, i) => {
        const pts = teamPoints?.[p.name] ?? 60;
        const stage = stageFor(pts);
        const base = compact ? 36 : 60;
        const sizeMultiplier =
          stage === "Seed"
            ? 0.55
            : stage === "Sprout"
            ? 0.75
            : stage === "Small plant"
            ? 0.92
            : stage === "Flowering"
            ? 1.05
            : 1.18;
        const size = base * sizeMultiplier;
        return (
          <div
            key={p.name}
            className="absolute flex flex-col items-center animate-sway"
            style={{
              left: `${p.x}%`,
              bottom: compact ? "18px" : "26px",
              animationDelay: `${i * 0.4}s`,
              transformOrigin: "bottom center",
            }}
          >
            <FlowerByKind kind={p.kind} size={size} color={p.color} accent={p.accent} />
            {!compact && (
              <span
                className={`mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                  p.name === "You" ? "bg-primary/25 text-moss" : "text-moss/80 bg-white/50"
                }`}
              >
                {p.name}
              </span>
            )}
          </div>
        );
      })}

      {/* scattered grass tufts between plants */}
      {!compact &&
        [3, 19, 36, 54, 72, 89, 96].map((x, i) => (
          <div
            key={x}
            className="absolute"
            style={{ left: `${x}%`, bottom: "26px" }}
          >
            <GrassTuft size={i % 2 === 0 ? 22 : 16} />
          </div>
        ))}

      {/* lush grass band (front) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 400 50" preserveAspectRatio="none" width="100%" height={compact ? 30 : 44}>
          {/* dark base */}
          <path
            d="M0 20 Q 100 6 200 16 T 400 14 L 400 50 L 0 50 Z"
            fill="#2e6b38"
          />
          {/* blades */}
          {Array.from({ length: 50 }).map((_, i) => {
            const x = (i + 0.5) * (400 / 50);
            const blade = 8 + ((i * 53) % 14);
            return (
              <path
                key={i}
                d={`M${x} 22 Q ${x + 2.2} ${22 - blade} ${x + 4.4} 22`}
                fill={i % 3 === 0 ? "#3f8a4a" : i % 3 === 1 ? "#5aa663" : "#6fb56e"}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function FlowerByKind({
  kind,
  size,
  color,
  accent,
}: {
  kind: string;
  size: number;
  color: string;
  accent: string;
}) {
  switch (kind) {
    case "tulip":
      return <Tulip size={size} color={color} />;
    case "daisy":
      return <Daisy size={size} petal={color} center={accent} />;
    case "cosmos":
      return <Cosmos size={size} petal={color} center={accent} />;
    case "bell":
      return <Bell size={size} color={color} />;
    case "sunflower":
      return <Sunflower size={size} petal={color} center={accent} />;
    case "puff":
      return <Puff size={size} color={color} />;
    default:
      return <Daisy size={size} petal={color} center={accent} />;
  }
}
