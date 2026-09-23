type LogoProps = {
  /** Fondo sobre el que se coloca el logo. En oscuro: ivoire + punto champagne. En claro: noir + punto oro. */
  on?: "dark" | "light";
  withTagline?: boolean;
  tagline?: string;
  className?: string;
};

export function Logo({
  on = "dark",
  withTagline = false,
  tagline = "Tu agenda llena, sin letra pequeña.",
  className,
}: LogoProps) {
  const ink = on === "dark" ? "#F4F0E8" : "#0E0E10";
  const dot = on === "dark" ? "#CDB07A" : "#B08D52";
  const taglineColor = on === "dark" ? "#8C877E" : "#8C877E";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden>
        <circle cx="32" cy="34" r="21" fill="none" stroke={ink} strokeWidth="3" />
        <circle cx="48" cy="16" r="4" fill={dot} />
        <text
          x="32"
          y="43"
          textAnchor="middle"
          fontFamily="var(--font-lora), Georgia, serif"
          fontSize="27"
          fill={ink}
        >
          k
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-2xl tracking-tight" style={{ color: ink }}>
          kl
          <span className="relative">
            i
            <span
              className="absolute -top-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
              style={{ backgroundColor: dot }}
            />
          </span>
          k
        </span>
        {withTagline && (
          <span className="mt-0.5 font-serif text-xs italic" style={{ color: taglineColor }}>
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
