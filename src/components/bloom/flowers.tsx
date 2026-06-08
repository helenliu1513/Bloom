// Flat-illustration flower & plant SVG primitives inspired by playful
// vector garden art (tulips, daisies, cosmos, bellflowers).

interface FlowerProps {
  size?: number;
  className?: string;
}

export type FlowerKind = "tulip" | "daisy" | "cosmos" | "bell" | "sunflower" | "puff";

const STEM = "#3f8a4a";
const STEM_DARK = "#2e6b38";
const LEAF = "#5aa663";
const LEAF_DARK = "#3f8a4a";

// ---------- Single flowers (full plant w/ stem + leaves) ----------

export function Tulip({ size = 70, color = "#e94c5a", className = "" }: FlowerProps & { color?: string }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 70 98" className={className}>
      {/* stem */}
      <path d="M35 96 L 35 38" stroke={STEM} strokeWidth="3" strokeLinecap="round" />
      {/* leaves */}
      <path d="M35 76 C 18 76, 12 64, 16 50 C 28 54, 35 64, 35 76 Z" fill={LEAF} />
      <path d="M35 70 C 52 70, 58 58, 54 44 C 42 48, 35 58, 35 70 Z" fill={LEAF_DARK} />
      {/* tulip cup - 3 petals */}
      <path d="M22 38 Q 24 14, 35 14 Q 46 14, 48 38 Q 35 44, 22 38 Z" fill={color} />
      <path d="M28 16 Q 35 8, 42 16 Q 38 30, 35 30 Q 32 30, 28 16 Z" fill={color} opacity="0.85" />
      <path d="M22 38 Q 28 30, 35 30 L 35 44 Q 26 44, 22 38 Z" fill="#000" opacity="0.08" />
    </svg>
  );
}

export function Daisy({
  size = 80,
  petal = "#ec6aa0",
  center = "#f5c842",
  className = "",
}: FlowerProps & { petal?: string; center?: string }) {
  const cx = 40,
    cy = 26,
    petalR = 14;
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 104" className={className}>
      <path d="M40 102 L 40 38" stroke={STEM} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M40 76 C 22 78, 14 68, 16 54 C 30 56, 40 64, 40 76 Z" fill={LEAF} />
      <path d="M40 70 C 58 72, 66 62, 64 48 C 50 50, 40 58, 40 70 Z" fill={LEAF_DARK} />
      {/* petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx={cx}
          cy={cy - petalR}
          rx="5.5"
          ry="11"
          fill={petal}
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r="6" fill={center} />
      <circle cx={cx} cy={cy} r="2.5" fill="#3a2a10" />
    </svg>
  );
}

export function Cosmos({
  size = 80,
  petal = "#f08a3a",
  center = "#1f1a12",
  className = "",
}: FlowerProps & { petal?: string; center?: string }) {
  const cx = 40,
    cy = 26;
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 104" className={className}>
      <path d="M40 102 L 40 36" stroke={STEM} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M40 78 C 24 78, 16 68, 18 54 C 32 58, 40 66, 40 78 Z" fill={LEAF} />
      <path d="M40 68 C 56 68, 64 58, 62 46 C 50 48, 41 56, 40 68 Z" fill={LEAF_DARK} />
      {/* 6 wide petals */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <path
          key={deg}
          d="M40 12 Q 46 16, 44 26 Q 40 30, 36 26 Q 34 16, 40 12 Z"
          fill={petal}
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r="5" fill={center} />
      <circle cx={cx} cy={cy} r="1.8" fill="#f5c842" />
    </svg>
  );
}

export function Bell({
  size = 70,
  color = "#b97ad9",
  className = "",
}: FlowerProps & { color?: string }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 70 104" className={className}>
      <path d="M35 102 C 35 70, 33 50, 35 30" stroke={STEM} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      {/* thin grass-like leaves */}
      <path d="M35 80 C 26 78, 20 70, 22 56 C 30 60, 35 68, 35 80 Z" fill={LEAF} />
      <path d="M35 72 C 44 70, 50 62, 48 48 C 40 52, 35 60, 35 72 Z" fill={LEAF_DARK} />
      {/* three bell-shaped flowers */}
      <BellHead cx={28} cy={26} color={color} rot={-18} />
      <BellHead cx={42} cy={20} color={color} rot={10} />
      <BellHead cx={38} cy={36} color={color} rot={-4} />
    </svg>
  );
}

function BellHead({
  cx,
  cy,
  color,
  rot,
}: {
  cx: number;
  cy: number;
  color: string;
  rot: number;
}) {
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <path
        d={`M${cx - 6} ${cy - 6} Q ${cx} ${cy - 14} ${cx + 6} ${cy - 6} Q ${cx + 7} ${cy + 2} ${cx + 3} ${cy + 6} Q ${cx} ${cy + 4} ${cx - 3} ${cy + 6} Q ${cx - 7} ${cy + 2} ${cx - 6} ${cy - 6} Z`}
        fill={color}
      />
      <path
        d={`M${cx - 4} ${cy + 5} Q ${cx} ${cy + 8} ${cx + 4} ${cy + 5}`}
        stroke="#000"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
    </g>
  );
}

export function Sunflower({
  size = 86,
  petal = "#f5c842",
  center = "#5a3a1c",
  className = "",
}: FlowerProps & { petal?: string; center?: string }) {
  const cx = 43,
    cy = 28;
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 86 112" className={className}>
      <path d="M43 110 L 43 42" stroke={STEM_DARK} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M43 84 C 22 84, 14 72, 16 58 C 32 60, 43 70, 43 84 Z" fill={LEAF} />
      <path d="M43 74 C 62 74, 70 64, 68 50 C 54 52, 44 62, 43 74 Z" fill={LEAF_DARK} />
      {/* sun-petals, two rings */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <ellipse
          key={deg}
          cx={cx}
          cy={cy - 14}
          rx="4.5"
          ry="11"
          fill={petal}
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r="7.5" fill={center} />
      {/* center dots */}
      {[-3, 0, 3].flatMap((dy) =>
        [-3, 0, 3].map((dx) => (
          <circle key={`${dx}-${dy}`} cx={cx + dx} cy={cy + dy} r="0.9" fill="#1f1a12" />
        )),
      )}
    </svg>
  );
}

// Pom-pom puff (allium-like cluster)
export function Puff({
  size = 70,
  color = "#e85d6a",
  className = "",
}: FlowerProps & { color?: string }) {
  const cx = 35,
    cy = 22;
  const dots: Array<[number, number]> = [
    [0, -10], [-8, -6], [8, -6], [-10, 0], [10, 0],
    [-7, 6], [7, 6], [0, 10], [-4, -2], [4, -2], [0, 0], [0, 4],
  ];
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 70 104" className={className}>
      <path d="M35 102 L 35 32" stroke={STEM} strokeWidth="2.6" strokeLinecap="round" />
      {/* fern-like leaves */}
      <path d="M35 86 L 22 70" stroke={LEAF_DARK} strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx={28 - i * 2} cy={82 - i * 4} rx="3" ry="1.2" fill={LEAF} transform={`rotate(-30 ${28 - i * 2} ${82 - i * 4})`} />
      ))}
      <path d="M35 78 L 50 64" stroke={LEAF_DARK} strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx={42 + i * 2} cy={74 - i * 4} rx="3" ry="1.2" fill={LEAF} transform={`rotate(30 ${42 + i * 2} ${74 - i * 4})`} />
      ))}
      {/* puff dots */}
      {dots.map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy} r="3.5" fill={color} />
      ))}
    </svg>
  );
}

// ---------- Decorative grass tufts (for ground line) ----------

export function GrassTuft({
  size = 26,
  className = "",
  color = LEAF,
  dark = LEAF_DARK,
}: {
  size?: number;
  className?: string;
  color?: string;
  dark?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" className={className}>
      <path d="M2 26 Q 4 10, 6 26" fill={color} />
      <path d="M6 26 Q 9 6, 12 26" fill={dark} />
      <path d="M11 26 Q 14 2, 17 26" fill={color} />
      <path d="M16 26 Q 19 8, 22 26" fill={dark} />
      <path d="M20 26 Q 22 12, 24 26" fill={color} />
    </svg>
  );
}

// Grass with horizontal blades (a thick ground band)
export function GrassBand({
  className = "",
  width = 400,
  height = 36,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      width="100%"
      height={height}
    >
      {/* base dark band */}
      <path
        d={`M0 ${height - 10} Q ${width * 0.25} ${height - 18} ${width * 0.5} ${height - 12} T ${width} ${height - 10} L ${width} ${height} L 0 ${height} Z`}
        fill="#2e6b38"
      />
      {/* lighter front blades */}
      {Array.from({ length: 28 }).map((_, i) => {
        const x = (i + 0.5) * (width / 28);
        const h = 8 + ((i * 37) % 14);
        return (
          <path
            key={i}
            d={`M${x} ${height - 8} Q ${x + 2} ${height - 8 - h} ${x + 4} ${height - 8}`}
            fill={i % 2 ? LEAF : LEAF_DARK}
          />
        );
      })}
    </svg>
  );
}
