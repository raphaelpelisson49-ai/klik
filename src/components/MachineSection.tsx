"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";
import type { MachineApi, MachineMode } from "@/components/ui/agenda-machine-3d";

// three.js solo se descarga cuando la sección está a punto de verse
const AgendaMachine3D = dynamic(() => import("@/components/ui/agenda-machine-3d"), { ssr: false });

const MODES: MachineMode[] = ["assembled", "cutaway", "stations", "order"];

/** Lienzo oscuro con la máquina 3D de klik: titular a la izquierda, máquina a la derecha. */
export function MachineSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).machine;
  const ref = useRef<HTMLElement>(null);
  const api = useRef<MachineApi | null>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<MachineMode>("assembled");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const handleApi = useCallback((a: MachineApi | null) => {
    api.current = a;
  }, []);
  const handleReady = useCallback(() => setReady(true), []);

  function choose(next: MachineMode) {
    setMode(next);
    api.current?.setMode(next);
  }

  return (
    <section
      ref={ref}
      id="maquina"
      aria-labelledby="maquina-title"
      className="klik-dark klik-canvas klik-canvas-block relative isolate overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 lg:pointer-events-none lg:flex lg:min-h-[46rem] lg:items-center lg:py-24">
        <Reveal className="max-w-md lg:pointer-events-auto">
          <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne">
            <span className="h-px w-8 bg-champagne" aria-hidden />
            {t.eyebrow}
          </span>
          <h2 id="maquina-title" className="mt-5 font-serif text-3xl font-semibold leading-tight text-ivoire sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 font-sans text-[15.5px] leading-relaxed text-ivoire/70">{t.subtitle}</p>

          <div role="group" aria-label={t.modesLabel} className="mt-8 flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                disabled={!ready}
                onClick={() => choose(m)}
                className={`cursor-pointer rounded-full border px-4 py-2 font-sans text-sm transition-colors duration-200 disabled:cursor-wait disabled:opacity-50 ${
                  mode === m
                    ? "border-champagne bg-champagne text-noir"
                    : "border-ivoire/20 text-ivoire/80 hover:border-champagne/60 hover:text-ivoire"
                }`}
              >
                {t.modes[m]}
              </button>
            ))}
          </div>
          <p className="mt-5 font-serif text-sm italic text-piedra">
            <span className="pointer-coarse:hidden">{t.hint}</span>
            <span className="hidden pointer-coarse:inline">{t.hintTouch}</span>
          </p>
        </Reveal>
      </div>

      <div className="relative h-[28rem] sm:h-[34rem] lg:absolute lg:inset-0 lg:h-auto">
        {near && <AgendaMachine3D embed height="100%" copy={t.scene} onApi={handleApi} onReady={handleReady} />}
      </div>
    </section>
  );
}
