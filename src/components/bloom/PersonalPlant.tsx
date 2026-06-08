import { Bell, Cosmos, Daisy, GrassTuft, Sunflower, Tulip } from "./flowers";

interface PersonalPlantProps {
  growth: number;
  tick: number;
}

export type Stage = "Seed" | "Sprout" | "Small plant" | "Flowering" | "Full bloom";

export function stageFor(points: number): Stage {
  if (points <= 20) return "Seed";
  if (points <= 45) return "Sprout";
  if (points <= 75) return "Small plant";
  if (points <= 110) return "Flowering";
  return "Full bloom";
}

export function PersonalPlant({ growth, tick }: PersonalPlantProps) {
  const stage = stageFor(growth);

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#fff8e7] via-[#fdeec3] to-[#e3f1c8]">
      {/* sun */}
      <div className="absolute top-4 right-5 h-12 w-12 rounded-full bg-[#f5c842] opacity-90" />
      <div className="absolute top-6 right-7 h-6 w-6 rounded-full bg-white/60 blur-sm" />

      {/* clouds */}
      <svg className="absolute top-5 left-6" width="60" height="22" viewBox="0 0 60 22">
        <ellipse cx="15" cy="14" rx="14" ry="6" fill="white" opacity="0.9" />
        <ellipse cx="30" cy="10" rx="11" ry="5" fill="white" opacity="0.9" />
        <ellipse cx="45" cy="14" rx="12" ry="5" fill="white" opacity="0.9" />
      </svg>

      {/* far rolling hill */}
      <svg
        className="absolute bottom-8 w-full opacity-70"
        viewBox="0 0 200 30"
        preserveAspectRatio="none"
      >
        <path d="M0 24 Q 50 4 100 16 T 200 12 L 200 30 L 0 30 Z" fill="#8fc28c" />
      </svg>

      {/* grass band (front) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 400 40" preserveAspectRatio="none" width="100%" height="40">
          <path
            d="M0 16 Q 100 4 200 14 T 400 12 L 400 40 L 0 40 Z"
            fill="#2e6b38"
          />
          {Array.from({ length: 36 }).map((_, i) => {
            const x = (i + 0.5) * (400 / 36);
            const h = 6 + ((i * 41) % 12);
            return (
              <path
                key={i}
                d={`M${x} 18 Q ${x + 2} ${18 - h} ${x + 4} 18`}
                fill={i % 2 ? "#5aa663" : "#3f8a4a"}
              />
            );
          })}
        </svg>
      </div>

      {/* side grass tufts */}
      <div className="absolute bottom-3 left-4 opacity-90">
        <GrassTuft size={28} />
      </div>
      <div className="absolute bottom-3 right-6 opacity-90">
        <GrassTuft size={22} />
      </div>

      {/* plant centerpiece */}
      <div
        key={tick}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 animate-bloom"
        style={{ transformOrigin: "bottom center" }}
      >
        <PlantStage stage={stage} />
      </div>

      {/* floating particles */}
      <div className="absolute top-8 left-1/3 h-1.5 w-1.5 rounded-full bg-white/80 animate-float" />
      <div
        className="absolute top-14 left-1/2 h-1 w-1 rounded-full bg-white/70 animate-float"
        style={{ animationDelay: "0.6s" }}
      />

      {/* stage label */}
      <div className="absolute top-3 left-3 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-[11px] font-medium text-moss shadow-sm">
        {stage} · {growth} pts
      </div>
    </div>
  );
}

function PlantStage({ stage }: { stage: Stage }) {
  if (stage === "Seed") {
    return (
      <svg width="80" height="64" viewBox="0 0 80 64">
        {/* soil mound */}
        <ellipse cx="40" cy="54" rx="22" ry="8" fill="#7a4a2a" />
        <ellipse cx="40" cy="50" rx="18" ry="4" fill="#5a3418" opacity="0.6" />
        {/* sprout */}
        <path d="M40 48 L 40 32" stroke="#3f8a4a" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="34" cy="32" rx="6" ry="9" fill="#5aa663" transform="rotate(-30 34 32)" />
        <ellipse cx="46" cy="34" rx="5" ry="8" fill="#3f8a4a" transform="rotate(28 46 34)" />
      </svg>
    );
  }

  if (stage === "Sprout") {
    // a single small tulip
    return <Tulip size={70} color="#e94c5a" />;
  }

  if (stage === "Small plant") {
    // small daisy
    return <Daisy size={86} petal="#ec6aa0" center="#f5c842" />;
  }

  if (stage === "Flowering") {
    // cluster of two: cosmos + bell
    return (
      <div className="flex items-end gap-1">
        <Bell size={64} color="#b97ad9" />
        <Cosmos size={88} petal="#f08a3a" center="#1f1a12" />
      </div>
    );
  }

  // Full bloom — bouquet
  return (
    <div className="flex items-end gap-1">
      <Tulip size={64} color="#f5c842" />
      <Sunflower size={100} petal="#f5c842" center="#5a3a1c" />
      <Daisy size={70} petal="#ec6aa0" center="#f5c842" />
    </div>
  );
}
