type LogoProps = {
  /**
   * Fondo sobre el que se coloca el logo. Por defecto ("auto") toma los colores
   * del tema del bloque (tinta = --ivoire, punto = --champagne), así sirve igual
   * en secciones claras y oscuras. "dark"/"light" fuerzan los colores del kit.
   */
  on?: "auto" | "dark" | "light";
  withTagline?: boolean;
  tagline?: string;
  className?: string;
};

const KIT = {
  dark: { ink: "#F4F0E8", dot: "#CDB07A", tagline: "#A9B0C2" },
  light: { ink: "#001F54", dot: "#B08D52", tagline: "#4C5468" },
  auto: { ink: "var(--ivoire)", dot: "var(--champagne)", tagline: "var(--piedra)" },
};

export function Logo({
  on = "auto",
  withTagline = false,
  tagline = "Tu agenda llena, sin letra pequeña.",
  className,
}: LogoProps) {
  const { ink, dot, tagline: taglineColor } = KIT[on];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden>
        <circle cx="32" cy="34" r="21" fill="none" style={{ stroke: ink }} strokeWidth="3" />
        <circle cx="48" cy="16" r="4" style={{ fill: dot }} />
        <text
          x="32"
          y="43"
          textAnchor="middle"
          fontFamily="var(--font-lora), Georgia, serif"
          fontSize="27"
          style={{ fill: ink }}
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
