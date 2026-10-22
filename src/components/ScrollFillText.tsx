"use client";

import { useEffect, useRef } from "react";

// Opacidad de las palabras aún "apagadas": 0,5 da 3,2:1 sobre marfil (mínimo AA para texto grande).
const DIM = 0.5;

/**
 * Texto que se "rellena" palabra a palabra según avanza el scroll:
 * cada palabra pasa de apagada a encendida cuando el bloque cruza la pantalla.
 */
export function ScrollFillText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const spans = Array.from(node.querySelectorAll<HTMLSpanElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }

    let frame = 0;
    const last: number[] = [];
    function update() {
      const rect = node!.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 cuando el bloque asoma por abajo, 1 cuando su final pasa el 40% superior
      const progress = Math.min(1, Math.max(0, (vh * 0.9 - rect.top) / (rect.height + vh * 0.5)));
      const lit = progress * spans.length;
      spans.forEach((s, i) => {
        const o = Math.round(Math.min(1, Math.max(0, lit - i)) * 20) / 20;
        if (last[i] === o) return;
        last[i] = o;
        s.style.opacity = String(DIM + o * (1 - DIM));
      });
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    // Solo escucha el scroll mientras el bloque está en pantalla
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", onScroll);
        update();
      }
    });
    io.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {/* El texto completo para lectores de pantalla; las palabras animadas son decorativas */}
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} data-word aria-hidden className="inline-block transition-opacity duration-300" style={{ opacity: DIM }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
