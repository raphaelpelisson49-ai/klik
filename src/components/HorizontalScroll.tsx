"use client";

import { useEffect, useRef } from "react";

/**
 * Sección anclada con desplazamiento horizontal: en escritorio, el scroll vertical
 * mueve la fila de tarjetas de lado a lado mientras la sección queda fija.
 * En móvil o con reduced-motion se muestra como una cuadrícula normal.
 */
export function HorizontalScroll({
  header,
  children,
  id,
  className,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let distance = 0;
    let frame = 0;
    let enabled = false;

    function measure() {
      enabled = wide.matches && !reduced.matches;
      outer!.dataset.pinned = enabled ? "true" : "false";
      if (!enabled) {
        outer!.style.height = "";
        track!.style.transform = "";
        return;
      }
      distance = Math.max(0, track!.scrollWidth - track!.clientWidth);
      outer!.style.height = `${window.innerHeight + distance}px`;
      update();
    }

    function update() {
      if (!enabled) return;
      const top = outer!.getBoundingClientRect().top;
      const p = distance > 0 ? Math.min(1, Math.max(0, -top / distance)) : 0;
      track!.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
      outer!.style.setProperty("--hp", p.toFixed(3));
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    measure();
    window.addEventListener("resize", measure);
    wide.addEventListener("change", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    // Solo escucha el scroll mientras la sección está en pantalla
    const io = new IntersectionObserver(([entry]) => {
      update();
      if (entry.isIntersecting) window.addEventListener("scroll", onScroll, { passive: true });
      else window.removeEventListener("scroll", onScroll);
    });
    io.observe(outer);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={outerRef} id={id} className={`klik-hscroll ${className ?? ""}`}>
      <div className="klik-hscroll-sticky">
        <div className="mx-auto w-full max-w-6xl px-6">{header}</div>
        <div ref={trackRef} className="klik-hscroll-track">
          {children}
        </div>
        <div className="klik-hscroll-progress mx-auto w-full max-w-6xl px-6" aria-hidden>
          <div className="h-px w-full bg-champagne/10">
            <div className="klik-hscroll-bar h-full origin-left bg-champagne" />
          </div>
        </div>
      </div>
    </section>
  );
}
