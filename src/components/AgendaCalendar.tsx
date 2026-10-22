"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

const CAP = 2; // citas por día
const CLOSED = -1;

// Un mes casi vacío: cada hueco libre es un cliente que llamó a otro. Domingo cerrado.
const INITIAL: number[] = [
  1, 0, 2, 0, 1, 0, CLOSED,
  0, 1, 0, 0, 2, 0, CLOSED,
  1, 0, 0, 1, 0, 0, CLOSED,
  0, 2, 0, 0, 1, 0, CLOSED,
];

const TOTAL = INITIAL.filter((n) => n !== CLOSED).length * CAP;
const MOVE_PER_BOOKING = 240; // px de ratón sobre el calendario por cada cita que "cae"

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => String(values[k] ?? ""));
}

/**
 * Mini-juego "Llena tu agenda": al tocar un día (o pasar el ratón por el calendario)
 * caen citas en los huecos libres hasta completar el mes.
 */
export function AgendaCalendar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).agenda;
  const [slots, setSlots] = useState<number[]>(INITIAL);
  const [round, setRound] = useState(0);
  const touched = useRef(false);
  const travel = useRef(0);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const booked = slots.reduce((sum, n) => sum + Math.max(0, n), 0);
  const percent = Math.round((booked / TOTAL) * 100);
  const full = booked === TOTAL;
  const hintDay = slots.findIndex((n) => n !== CLOSED && n < CAP);

  const book = useCallback((day?: number) => {
    setSlots((prev) => {
      let target = day ?? -1;
      if (target < 0 || prev[target] === CLOSED || prev[target] >= CAP) {
        const free = prev.flatMap((n, i) => (n !== CLOSED && n < CAP ? [i] : []));
        if (free.length === 0) return prev;
        target = free[Math.floor(Math.random() * free.length)];
      }
      const next = [...prev];
      next[target] += 1;
      return next;
    });
  }, []);

  // Si nadie toca nada, caen un par de citas solas para enseñar que es interactivo
  useEffect(() => {
    const timers = [2800, 3500].map((ms) =>
      window.setTimeout(() => {
        if (!touched.current) book();
      }, ms)
    );
    return () => timers.forEach(clearTimeout);
  }, [book, round]);

  function handleDay(e: React.MouseEvent<HTMLButtonElement>, i: number) {
    touched.current = true;
    if (slots[i] >= CAP) {
      e.currentTarget.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-3px)" }, { transform: "translateX(3px)" }, { transform: "translateX(0)" }],
        { duration: 260 }
      );
      return;
    }
    book(i);
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || full) return;
    const prev = lastPoint.current;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    if (!prev) return;
    travel.current += Math.hypot(e.clientX - prev.x, e.clientY - prev.y);
    if (travel.current < MOVE_PER_BOOKING) return;
    travel.current = 0;
    touched.current = true;
    const hovered = (e.target as Element).closest<HTMLElement>("[data-day]");
    book(hovered ? Number(hovered.dataset.day) : undefined);
  }

  function reset() {
    touched.current = false;
    travel.current = 0;
    setSlots(INITIAL);
    setRound((r) => r + 1);
  }

  return (
    <div className={`klik-agenda rounded-2xl border border-champagne/15 bg-grafito p-5 sm:p-7 ${full ? "is-full" : ""}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="whitespace-nowrap font-sans text-xs font-medium uppercase tracking-[0.14em] text-piedra">{t.label}</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap font-sans text-xs text-piedra">
          <span className="h-1.5 w-1.5 rounded-full bg-champagne" aria-hidden />
          {t.badge}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center font-sans text-[11px] uppercase tracking-wide text-piedra sm:gap-2" aria-hidden>
        {t.days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div
        className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2"
        onPointerMove={handleMove}
        onPointerLeave={() => (lastPoint.current = null)}
      >
        {slots.map((n, i) => {
          const closed = n === CLOSED;
          const count = Math.max(0, n);
          const base = Math.max(0, INITIAL[i]);
          return (
            <button
              key={`${round}-${i}`}
              type="button"
              data-day={i}
              disabled={closed}
              onClick={(e) => handleDay(e, i)}
              aria-label={closed ? `${i + 1} · ${t.closed}` : fill(t.dayAria, { d: i + 1, n: count })}
              className={`klik-day group flex h-11 flex-col gap-0.5 rounded-md border bg-noir/40 p-1 text-left transition-colors duration-200 sm:h-14 sm:p-1.5 ${
                closed ? "klik-day-closed cursor-default" : "cursor-pointer hover:border-champagne/45"
              } ${i === hintDay && !full ? "klik-day-hint" : ""} ${count >= CAP ? "is-booked" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="font-sans text-[9px] leading-none text-piedra sm:text-[10px]">{i + 1}</span>
              <span className="flex flex-1 flex-col justify-end gap-0.5">
                {Array.from({ length: count }, (_, s) => (
                  <span
                    key={s}
                    className={`klik-slot block h-1.5 rounded-full bg-champagne/85 sm:h-2 ${s >= base ? "klik-slot-drop" : ""}`}
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5" aria-live="polite">
        <div className="flex items-baseline justify-between gap-4 font-sans text-xs">
          <span className={full ? "text-champagne" : "text-piedra"}>{full ? t.full : fill(t.progress, { n: percent })}</span>
          {full ? (
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer text-piedra underline decoration-champagne/30 underline-offset-4 transition-colors hover:text-champagne"
            >
              {t.reset}
            </button>
          ) : (
            <span className="tabular-nums text-ivoire/70">
              {booked}/{TOTAL}
            </span>
          )}
        </div>
        <div className="mt-2 h-px w-full bg-champagne/15">
          <div
            className="h-full origin-left bg-champagne transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${booked / TOTAL})` }}
          />
        </div>
        <p className="mt-4 text-center font-serif text-sm italic text-piedra sm:text-base">{full ? t.footer : t.hint}</p>
      </div>
    </div>
  );
}
