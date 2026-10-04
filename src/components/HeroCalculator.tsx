"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-sans text-[13px] text-ivoire/80">
          {label}
        </label>
        <span className="shrink-0 font-serif text-base text-champagne">
          {value}
          {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-champagne"
      />
    </div>
  );
}

export function HeroCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.calculators;
  const m = t.maintenance;
  const formatEUR = (n: number) =>
    new Intl.NumberFormat(t.numberLocale, { maximumFractionDigits: 0 }).format(n);

  // Mismos valores por defecto que la calculadora completa
  const [tecnicos, setTecnicos] = useState(20);
  const [porTecnico, setPorTecnico] = useState(20);
  const [precio, setPrecio] = useState(250);
  const [perdida, setPerdida] = useState(5);

  const { impactoMes, impactoAnual } = useMemo(() => {
    const perdidosMes = Math.round(tecnicos * porTecnico * (perdida / 100));
    const impactoMes = perdidosMes * precio;
    return { impactoMes, impactoAnual: impactoMes * 12 };
  }, [tecnicos, porTecnico, precio, perdida]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-champagne/25 bg-grafito p-6 shadow-[0_0_60px_-20px_rgba(205,176,122,0.35)] sm:p-8">
      <div className="rounded-2xl border border-champagne/20 bg-noir px-6 py-6 text-center">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-piedra">
          {m.resultLabel}
        </p>
        <p
          className="mt-2 font-serif text-5xl font-semibold text-champagne sm:text-6xl"
          aria-live="polite"
        >
          ≈ {formatEUR(impactoMes)} €
        </p>
        <p className="mt-1 font-sans text-sm text-piedra">{m.resultLine}</p>
        <p className="mt-1 font-serif text-lg italic text-ivoire/70">
          ≈ {formatEUR(impactoAnual)} € {t.yearSuffix}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <Field label={m.fields.technicians} value={tecnicos} onChange={setTecnicos} min={1} max={100} step={1} suffix="" />
        <Field label={m.fields.perTechMonth} value={porTecnico} onChange={setPorTecnico} min={2} max={60} step={1} suffix="" />
        <Field label={m.fields.price} value={precio} onChange={setPrecio} min={50} max={1000} step={10} suffix=" €" />
        <Field label={m.fields.lossPercent} value={perdida} onChange={setPerdida} min={1} max={30} step={1} suffix="%" />
      </div>

      <Link
        href={`/${locale}/calculadora`}
        className="group mt-6 flex items-center justify-between border-t border-champagne/10 pt-4 font-sans text-sm text-ivoire transition-colors hover:text-champagne"
      >
        <span>{dict.nav.calculadora}</span>
        <span className="font-serif text-xl text-champagne transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}
