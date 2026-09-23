"use client";

import { useCallback, useState } from "react";
import { ImpactCalculator } from "@/components/ImpactCalculator";
import { CallsCalculator } from "@/components/CallsCalculator";
import { MagneticButton } from "@/components/MagneticButton";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

export function CalculatorsSuite({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).calculators;
  const formatEUR = (n: number) =>
    new Intl.NumberFormat(t.numberLocale, { maximumFractionDigits: 0 }).format(n);

  const [impact1, setImpact1] = useState(5000);
  const [impact2, setImpact2] = useState(2700);

  const handleImpact1 = useCallback((n: number) => setImpact1(n), []);
  const handleImpact2 = useCallback((n: number) => setImpact2(n), []);

  const totalMes = impact1 + impact2;
  const totalAnual = totalMes * 12;

  const mail = t.total.mail;
  const mailBody = `${mail.greeting}\n\n${mail.intro}\n- ${mail.line1} ≈ ${formatEUR(impact1)} € ${t.monthSuffix}\n- ${mail.line2} ≈ ${formatEUR(impact2)} € ${t.monthSuffix}\n\n${mail.totalLine} ≈ ${formatEUR(totalMes)} € ${t.monthSuffix} (≈ ${formatEUR(totalAnual)} € ${t.yearSuffix}).\n\n${mail.closing}`;
  const mailHref = `mailto:klikia@klikagencies.com?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="space-y-6">
      <div className="klik-result-in rounded-2xl border border-champagne/25 bg-noir p-8 text-center sm:p-10">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-piedra">{t.total.label}</p>
        <p className="mt-4 font-serif text-6xl font-semibold text-champagne sm:text-7xl">≈ {formatEUR(totalMes)} €</p>
        <p className="mt-2 font-sans text-sm text-piedra">{t.total.resultLine}</p>
        <p className="mt-1 font-serif text-xl italic text-ivoire/70">≈ {formatEUR(totalAnual)} € {t.yearSuffix}</p>
        <MagneticButton className="mt-7">
          <a
            href={mailHref}
            className="klik-cta-glow block rounded-full bg-champagne px-8 py-3.5 font-sans text-base font-semibold text-noir transition-opacity hover:opacity-90"
          >
            {t.total.button}
          </a>
        </MagneticButton>
      </div>

      <ImpactCalculator locale={locale} onImpactChange={handleImpact1} />
      <CallsCalculator locale={locale} onImpactChange={handleImpact2} />
    </div>
  );
}
