/**
 * Bloque que aparece al entrar en pantalla. Es HTML puro (sin estado ni efectos):
 * un único IntersectionObserver en MotionLayer añade `.klik-in` a todos los
 * `[data-reveal]`. Así decenas de bloques no cuestan decenas de componentes que
 * hidratar al cargar la página.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Retraso de la transición al aparecer, en ms. */
  delay?: number;
  /** Etiqueta del contenedor: `li` para revelar elementos de una lista sin romperla. */
  as?: "div" | "li";
}) {
  return (
    <Tag
      data-reveal=""
      className={`klik-reveal ${className ?? ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
