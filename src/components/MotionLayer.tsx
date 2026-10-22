"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Capa global de movimiento: barra de progreso de lectura, estado `data-scrolled`
 * en <html> para el header flotante y el único observador que revela los bloques
 * `[data-reveal]`. El scroll es el nativo del navegador: corre en el hilo de
 * composición y no se atasca aunque JavaScript esté ocupado.
 */
export function MotionLayer() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let scrolled: boolean | null = null;
    // La altura total solo se mide al cambiar el tamaño, no en cada scroll.
    let max = 1;
    const measure = () => {
      max = Math.max(1, root.scrollHeight - window.innerHeight);
    };

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        barRef.current?.style.setProperty("transform", `scaleX(${Math.min(1, y / max).toFixed(4)})`);
        const next = y > 40;
        if (next !== scrolled) {
          scrolled = next;
          root.dataset.scrolled = next ? "true" : "false";
        }
      });
    }

    measure();
    onScroll();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Revelado al hacer scroll: un solo IntersectionObserver para toda la página.
  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.klik-in)");
    if (!pending.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("klik-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div className="klik-progress" aria-hidden>
      <div ref={barRef} className="klik-progress-bar" />
    </div>
  );
}
