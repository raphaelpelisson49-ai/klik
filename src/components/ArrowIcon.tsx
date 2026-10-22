/**
 * Flecha en SVG. Sustituye al carácter "→", que no está en las fuentes de la web:
 * el navegador tenía que buscarlo entre las fuentes del sistema (lento la primera
 * vez y con un dibujo distinto en cada ordenador).
 */
export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
