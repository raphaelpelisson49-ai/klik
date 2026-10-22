"use client";

import { useEffect, useRef } from "react";

// Colores de la ilustración (mismos valores que la paleta en globals.css)
const GOLD = "#cdb07a";
const IVORY = "#f4f0e8";
const NAVY_ROYAL = "#0b2a66";
const NAVY_DEEP = "#000d26";

const VIEW = "-500 -500 1000 1000";
const HOURS = Array.from({ length: 12 }, (_, i) => i);
const BEZEL_HOURS = Array.from({ length: 24 }, (_, i) => i);

/**
 * Esfera de reloj de lujo detrás del mini-juego de la agenda: bisel GMT
 * en dos azules, esfera "sunburst", guilloché que gira despacio y agujas
 * con la hora real del visitante (10:10 hasta que carga, como en los anuncios).
 */
export function HeroDial({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const now = new Date();
    const s = now.getSeconds() + now.getMilliseconds() / 1000;
    const m = now.getMinutes() * 60 + s;
    const h = (now.getHours() % 12) * 3600 + m;
    node.style.setProperty("--d-s", `${-s}s`);
    node.style.setProperty("--d-m", `${-m}s`);
    node.style.setProperty("--d-h", `${-h}s`);
    node.dataset.live = "true";
  }, []);

  return (
    <div ref={ref} className={`klik-dial ${className ?? ""}`} aria-hidden>
      <div className="klik-dial-face" />

      {/* Guilloché: rosetas de elipses grabadas, giran muy despacio */}
      <svg viewBox={VIEW} className="klik-dial-rosette">
        <g fill="none" stroke={GOLD} strokeWidth="0.9">
          {Array.from({ length: 36 }, (_, i) => (
            <ellipse key={i} rx="300" ry="112" transform={`rotate(${i * 5})`} opacity="0.13" />
          ))}
          {Array.from({ length: 24 }, (_, i) => (
            <ellipse key={`b${i}`} rx="190" ry="58" transform={`rotate(${i * 7.5})`} opacity="0.1" />
          ))}
        </g>
      </svg>

      {/* Bisel GMT, minutero e índices (estáticos) */}
      <svg viewBox={VIEW}>
        <circle r="469" fill="none" stroke={NAVY_ROYAL} strokeWidth="58" pathLength="100" strokeDasharray="50 50" transform="rotate(180)" />
        <circle r="469" fill="none" stroke={NAVY_DEEP} strokeWidth="58" pathLength="100" strokeDasharray="50 50" />
        <circle r="497" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.55" />
        <circle r="440" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.5" />

        {BEZEL_HOURS.map((i) => {
          const angle = i * 15;
          if (i === 0) return <polygon key={i} points="0,-446 -17,-488 17,-488" fill={GOLD} />;
          if (i % 2 === 1)
            return <rect key={i} x="-2" y="-480" width="4" height="22" fill={GOLD} opacity="0.7" transform={`rotate(${angle})`} />;
          return (
            <text
              key={i}
              transform={`rotate(${angle}) translate(0 -469)`}
              textAnchor="middle"
              dominantBaseline="central"
              fill={GOLD}
              fontFamily="var(--font-lora), Georgia, serif"
              fontSize="30"
            >
              {i}
            </text>
          );
        })}

        <circle r="420" fill="none" stroke={GOLD} strokeWidth="12" pathLength="60" strokeDasharray="0.07 0.93" strokeDashoffset="0.035" opacity="0.45" />
        <circle r="300" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.18" />

        {HOURS.map((i) =>
          i === 0 ? (
            <g key={i} fill={GOLD}>
              <rect x="-22" y="-410" width="15" height="64" rx="2" />
              <rect x="7" y="-410" width="15" height="64" rx="2" />
            </g>
          ) : (
            <rect key={i} x="-8" y="-410" width="16" height="58" rx="2" fill={GOLD} transform={`rotate(${i * 30})`} />
          )
        )}

        <text y="-215" textAnchor="middle" fill={IVORY} fontFamily="var(--font-lora), Georgia, serif" fontSize="58">
          klik
        </text>
      </svg>

      {/* Agujas: horas y minutos (10:10 por defecto) y segundero */}
      <div className="klik-dial-hand klik-dial-h" style={{ transform: "rotate(305deg)" }}>
        <svg viewBox={VIEW}>
          <path d="M -15 40 L -12 -215 L 0 -250 L 12 -215 L 15 40 Z" fill={GOLD} stroke={NAVY_DEEP} strokeWidth="3" />
          <path d="M -5 -50 L -4 -200 L 4 -200 L 5 -50 Z" fill={IVORY} opacity="0.85" />
        </svg>
      </div>
      <div className="klik-dial-hand klik-dial-m" style={{ transform: "rotate(60deg)" }}>
        <svg viewBox={VIEW}>
          <path d="M -11 50 L -8 -355 L 0 -392 L 8 -355 L 11 50 Z" fill={GOLD} stroke={NAVY_DEEP} strokeWidth="3" />
          <path d="M -4 -70 L -3 -335 L 3 -335 L 4 -70 Z" fill={IVORY} opacity="0.85" />
        </svg>
      </div>
      <div className="klik-dial-hand klik-dial-s">
        <svg viewBox={VIEW}>
          <line x1="0" y1="80" x2="0" y2="-412" stroke={IVORY} strokeWidth="3" />
          <circle cy="58" r="15" fill={NAVY_DEEP} stroke={GOLD} strokeWidth="3" />
          <circle cy="-330" r="11" fill={NAVY_DEEP} stroke={GOLD} strokeWidth="3" />
          <circle r="22" fill={NAVY_DEEP} stroke={GOLD} strokeWidth="4" />
          <circle r="6" fill={GOLD} />
        </svg>
      </div>
    </div>
  );
}
