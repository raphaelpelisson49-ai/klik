"use client";

import { useEffect, useRef } from "react";

/**
 * Lienzo que se expande al hacer scroll: entra como una tarjeta redondeada
 * con márgenes y crece hasta ocupar todo el ancho. Expone `--p` (0 → 1)
 * para que los hijos puedan animarse con el mismo progreso.
 */
export function ExpandCanvas({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    let last = "";
    function update() {
      const rect = node!.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75))).toFixed(3);
      if (p === last) return;
      last = p;
      node!.style.setProperty("--p", p);
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    // Solo escucha el scroll mientras la sección está en pantalla
    const io = new IntersectionObserver(([entry]) => {
      update();
      if (entry.isIntersecting) window.addEventListener("scroll", onScroll, { passive: true });
      else window.removeEventListener("scroll", onScroll);
    });
    io.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`klik-expand ${className ?? ""}`}>
      <div className="klik-expand-inner klik-dark">{children}</div>
    </section>
  );
}
