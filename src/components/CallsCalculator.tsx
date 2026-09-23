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

export function CallsCalculator({
  locale,
  onImpactChange,
}: {
  locale: Locale;
  onImpactChange?: (monthly: number) => void;
}) {
  const t = getDictionary(locale).calculators;
  const c = t.calls;
  const formatEUR = (n: number) =>
    new Intl.NumberFormat(t.numberLocale, { maximumFractionDigits: 0 }).format(n);

  const [llamadas, setLlamadas] = useState(150);
  const [sinContestar, setSinContestar] = useState(20);
  const [conversion, setConversion] = useState(30);
  const [ticket, setTicket] = useState(300);

  const { leadsPerdidos, clientesPerdidos, impactoMes, impactoAnual } = useMemo(() => {
    const leadsPerdidos = Math.round(llamadas * (sinContestar / 100));
    const clientesPerdidos = Math.round(leadsPerdidos * (conversion / 100));
    const impactoMes = clientesPerdidos * ticket;
    const impactoAnual = impactoMes * 12;
    return { leadsPerdidos, clientesPerdidos, impactoMes, impactoAnual };
  }, [llamadas, sinContestar, conversion, ticket]);

  useEffect(() => {
    onImpactChange?.(impactoMes);
  }, [impactoMes, onImpactChange]);

  const mailBody = `${c.mail.greeting}\n\n${c.mail.intro}\n- ${c.mail.lineVolume} ${llamadas}\n- ${c.mail.lineMissed} ${sinContestar}%\n- ${c.mail.lineConversion} ${conversion}%\n- ${c.mail.lineTicket} ${ticket} €\n\n${c.mail.result} ≈ ${formatEUR(impactoMes)} € ${t.monthSuffix} (≈ ${formatEUR(impactoAnual)} € ${t.yearSuffix}).\n\n${c.mail.closing}`;
  const mailHref = `mailto:klikia@klikagencies.com?subject=${encodeURIComponent(c.mail.subject)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-champagne/15 bg-grafito p-8 sm:p-10">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-champagne">{c.tag}</p>
      <h2 className="mt-2 font-serif text-xl font-semibold text-ivoire sm:text-2xl">{c.title}</h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <Field label={c.fields.volume} value={llamadas} onChange={setLlamadas} min={10} max={1000} step={10} suffix="" />
          <Field label={c.fields.missedPercent} value={sinContestar} onChange={setSinContestar} min={5} max={60} step={5} suffix="%" />
          <Field label={c.fields.conversionPercent} value={conversion} onChange={setConversion} min={5} max={80} step={5} suffix="%" />
          <Field label={c.fields.ticket} value={ticket} onChange={setTicket} min={50} max={2000} step={50} suffix=" €" />
        </div>

        <div className="rounded-2xl border border-champagne/20 bg-noir p-7 text-center sm:p-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-piedra">{c.resultLabel}</p>
          <p className="mt-4 font-serif text-5xl font-semibold text-champagne sm:text-6xl">≈ {formatEUR(impactoMes)} €</p>
          <p className="mt-2 font-sans text-sm text-piedra">{c.resultLine}</p>
          <p className="mt-1 font-serif text-lg italic text-ivoire/70">≈ {formatEUR(impactoAnual)} € {t.yearSuffix}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-champagne/10 pt-6 text-left">
            <div>
              <p className="font-serif text-lg text-ivoire">{formatEUR(leadsPerdidos)}</p>
              <p className="font-sans text-[11px] leading-tight text-piedra">{c.statMissed}</p>
            </div>
            <div>
              <p className="font-serif text-lg text-ivoire">{formatEUR(clientesPerdidos)}</p>
              <p className="font-sans text-[11px] leading-tight text-piedra">{c.statLostClients}</p>
            </div>
          </div>

          <a
            href={mailHref}
            className="mt-7 inline-block rounded-full bg-champagne px-6 py-2.5 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
          >
            {c.button}
          </a>
        </div>
      </div>

      <p className="mt-6 font-sans text-xs leading-relaxed text-piedra">{t.disclaimer}</p>
    </div>
  );
}
