import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MoneyBackdrop } from "@/components/MoneyBackdrop";
import { CalculatorsSuite } from "@/components/CalculatorsSuite";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, LOCALES } from "@/i18n/locales";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/calculadora">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/calculadora",
    title: t.calculadoraPage.metaTitle,
    description: t.calculadoraPage.metaDescription,
  });
}

export default async function CalculadoraPage({ params }: PageProps<"/[locale]/calculadora">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader locale={locale} />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-champagne/10 bg-grafito/30">
          <MoneyBackdrop />
          <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-champagne">
              {t.calculadoraPage.eyebrow}
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-ivoire sm:text-5xl">
              {t.calculadoraPage.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-sans text-[15.5px] leading-relaxed text-ivoire/70 sm:text-lg">
              {t.calculadoraPage.subtitle}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <Reveal>
            <CalculatorsSuite locale={locale} />
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-champagne/15 bg-grafito px-8 py-14 text-center sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-20 -z-0 h-64 w-64 rounded-full border border-champagne/10"
              />
              <div className="relative">
                <h2 className="font-serif text-2xl font-semibold text-ivoire sm:text-3xl">
                  {t.calculadoraPage.closingTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-md font-sans text-[15.5px] leading-relaxed text-ivoire/70">
                  {t.calculadoraPage.closingSubtitle}
                </p>
                <MagneticButton className="mt-7">
                  <a
                    href="mailto:klikia@klikagencies.com"
                    className="block rounded-full bg-champagne px-7 py-3 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
                  >
                    {t.calculadoraPage.closingButton}
                  </a>
                </MagneticButton>
                <Link
                  href={`/${locale}/#diagnostico`}
                  className="mt-5 block font-sans text-xs text-piedra underline decoration-champagne/30 underline-offset-4 transition-colors hover:text-champagne"
                >
                  {t.calculadoraPage.closingBack}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
