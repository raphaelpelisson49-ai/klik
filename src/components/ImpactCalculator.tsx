"use client";

import { useEffect, useMemo, useState } from "react";
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
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="font-sans text-sm text-ivoire/80">{label}</label>
        <span className="font-serif text-lg text-champagne">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-champagne"
      />
    </div>
  );
}

export function ImpactCalculator({
  locale,
  onImpactChange,
}: {
  locale: Locale;
  onImpactChange?: (monthly: number) => void;
}) {
  const t = getDictionary(locale).calculators;
  const m = t.maintenance;
  const formatEUR = (n: number) =>
    new Intl.NumberFormat(t.numberLocale, { maximumFractionDigits: 0 }).format(n);

  const [tecnicos, setTecnicos] = useState(20);
  const [mantenimientosPorTecnico, setMantenimientosPorTecnico] = useState(20);
  const [precio, setPrecio] = useState(250);
  const [perdida, setPerdida] = useState(5);

  const { totalMes, perdidosMes, impactoMes, impactoAnual, impactoPorTecnico } = useMemo(() => {
    const totalMes = tecnicos * mantenimientosPorTecnico;
    const perdidosMes = Math.round(totalMes * (perdida / 100));
    const impactoMes = perdidosMes * precio;
    const impactoAnual = impactoMes * 12;
    const impactoPorTecnico = tecnicos > 0 ? Math.round(impactoMes / tecnicos) : 0;
    return { totalMes, perdidosMes, impactoMes, impactoAnual, impactoPorTecnico };
  }, [tecnicos, mantenimientosPorTecnico, precio, perdida]);

  useEffect(() => {
    onImpactChange?.(impactoMes);
  }, [impactoMes, onImpactChange]);

  const mailBody = `${m.mail.greeting}\n\n${m.mail.intro}\n- ${m.mail.lineTechnicians} ${tecnicos}\n- ${m.mail.linePerTech} ${mantenimientosPorTecnico}\n- ${m.mail.linePrice} ${precio} €\n- ${m.mail.lineLoss} ${perdida}%\n\n${m.mail.result} ≈ ${formatEUR(impactoMes)} € ${t.monthSuffix} (≈ ${formatEUR(impactoAnual)} € ${t.yearSuffix}).\n\n${m.mail.closing}`;
  const mailHref = `mailto:klikia@klikagencies.com?subject=${encodeURIComponent(m.mail.subject)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-champagne/15 bg-grafito p-8 sm:p-10">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-champagne">{m.tag}</p>
      <h2 className="mt-2 font-serif text-xl font-semibold text-ivoire sm:text-2xl">{m.title}</h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <Field label={m.fields.technicians} value={tecnicos} onChange={setTecnicos} min={1} max={100} step={1} suffix="" />
          <Field label={m.fields.perTechMonth} value={mantenimientosPorTecnico} onChange={setMantenimientosPorTecnico} min={2} max={60} step={1} suffix="" />
          <Field label={m.fields.price} value={precio} onChange={setPrecio} min={50} max={1000} step={10} suffix=" €" />
          <Field label={m.fields.lossPercent} value={perdida} onChange={setPerdida} min={1} max={30} step={1} suffix="%" />
        </div>

        <div className="rounded-2xl border border-champagne/20 bg-noir p-7 text-center sm:p-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-piedra">{m.resultLabel}</p>
          <p className="mt-4 font-serif text-5xl font-semibold text-champagne sm:text-6xl">≈ {formatEUR(impactoMes)} €</p>
          <p className="mt-2 font-sans text-sm text-piedra">{m.resultLine}</p>
          <p className="mt-1 font-serif text-lg italic text-ivoire/70">≈ {formatEUR(impactoAnual)} € {t.yearSuffix}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-champagne/10 pt-6 text-left">
            <div>
              <p className="font-serif text-lg text-ivoire">{formatEUR(totalMes)}</p>
              <p className="font-sans text-[11px] leading-tight text-piedra">{m.statTotal}</p>
            </div>
            <div>
              <p className="font-serif text-lg text-ivoire">{formatEUR(perdidosMes)}</p>
              <p className="font-sans text-[11px] leading-tight text-piedra">{m.statLost}</p>
            </div>
            <div>
              <p className="font-serif text-lg text-ivoire">{formatEUR(impactoPorTecnico)} €</p>
              <p className="font-sans text-[11px] leading-tight text-piedra">{m.statPerTech}</p>
            </div>
          </div>

          <a
            href={mailHref}
            className="mt-7 inline-block rounded-full bg-champagne px-6 py-2.5 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
          >
            {m.button}
          </a>
        </div>
      </div>

      <p className="mt-6 font-sans text-xs leading-relaxed text-piedra">{t.disclaimer}</p>
    </div>
  );
}
