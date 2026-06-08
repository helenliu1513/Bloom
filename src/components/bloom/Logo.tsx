interface LogoProps {
  size?: number;
  showWord?: boolean;
  className?: string;
}

export function Logo({ size = 36, showWord = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Bloom logo"
      >
        <defs>
          <linearGradient id="bloom-leaf-l" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.58 0.14 150)" />
            <stop offset="100%" stopColor="oklch(0.82 0.16 145)" />
          </linearGradient>
          <linearGradient id="bloom-leaf-r" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.55 0.14 150)" />
            <stop offset="100%" stopColor="oklch(0.85 0.15 140)" />
          </linearGradient>
          <linearGradient id="bloom-stem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.13 145)" />
            <stop offset="100%" stopColor="oklch(0.45 0.1 150)" />
          </linearGradient>
        </defs>
        {/* stem with gentle curve */}
        <path
          d="M32 58 C 32 46, 30 38, 32 22"
          stroke="url(#bloom-stem)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* left leaf - teardrop */}
        <path
          d="M32 38 C 18 38, 10 30, 12 18 C 24 18, 32 26, 32 38 Z"
          fill="url(#bloom-leaf-l)"
        />
        <path
          d="M14 22 Q 24 28, 31 36"
          stroke="oklch(0.45 0.1 150 / 0.4)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* right leaf - teardrop, slightly higher and smaller */}
        <path
          d="M32 30 C 44 30, 52 22, 50 12 C 40 12, 32 20, 32 30 Z"
          fill="url(#bloom-leaf-r)"
        />
        <path
          d="M48 15 Q 40 21, 33 28"
          stroke="oklch(0.45 0.1 150 / 0.4)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* tiny bud highlight */}
        <circle cx="32" cy="20" r="2.5" fill="oklch(0.95 0.12 90)" />
        <circle cx="31" cy="19" r="1" fill="white" opacity="0.8" />
      </svg>
      {showWord && (
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Bloom
        </span>
      )}
    </div>
  );
}
