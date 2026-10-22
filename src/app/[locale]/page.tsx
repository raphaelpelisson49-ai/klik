import type { Metadata } from "next";
import { ArrowIcon } from "@/components/ArrowIcon";
import Link from "next/link";
import { AgendaCalendar } from "@/components/AgendaCalendar";
import { HeroDial } from "@/components/HeroDial";
import { HeroCalculator } from "@/components/HeroCalculator";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { Spotlight } from "@/components/Spotlight";
import { ProblemDiagnostic } from "@/components/ProblemDiagnostic";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollFillText } from "@/components/ScrollFillText";
import { MachineSection } from "@/components/MachineSection";
import { FaqSchema } from "@/components/OrganizationSchema";
import { ExpandCanvas } from "@/components/ExpandCanvas";
import { BigMarquee } from "@/components/BigMarquee";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale } from "@/i18n/locales";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "", title: dict.meta.title, description: dict.meta.description });
}

type IconProps = { className?: string };

function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.5 3h3l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2L21 14.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m12 4 2.4 5 5.6.6-4.2 3.7 1.2 5.5L12 16.8 7 18.8l1.2-5.5-4.2-3.7 5.6-.6L12 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGlobe({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5S14.4 18.2 12 20.5C9.6 18.2 8.4 15.3 8.4 12S9.6 5.8 12 3.5Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconReport({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconHandshake({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 11.5 7 8l3 2 3-2 4 3.5M3 11.5l3.5 4.5a2 2 0 0 0 2.8.3l.7-.6M21 11.5l-3.5 4.5a2 2 0 0 1-2.8.3l-.7-.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconNo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="m7 7 10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SectionNumber({ n }: { n: string }) {
  return (
    <span className="klik-num block font-serif text-5xl italic sm:text-6xl" aria-hidden>
      {n}
    </span>
  );
}

const SERVICE_ICONS = [IconPhone, IconClock, IconStar, IconGlobe, IconReport, IconHandshake];

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-1 flex-col">
      <FaqSchema locale={locale} />
      <SiteHeader locale={locale} />

      <main className="flex-1">
        {/* Hero */}
        <section className="klik-hero klik-dark klik-canvas klik-canvas-block relative isolate overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 sm:pb-28 sm:pt-32">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne">
                  <span className="h-px w-8 bg-champagne" aria-hidden />
                  {t.hero.eyebrow}
                </span>
                <h1 className="mt-6 font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ivoire sm:text-6xl sm:leading-[1.02]">
                  {t.hero.words.map((w, i) => {
                    const firstAccent = w.c && !t.hero.words[i - 1]?.c;
                    return (
                      <span key={i}>
                        {firstAccent && <br className="hidden sm:block" />}
                        <span
                          className={`klik-word mr-3 ${w.c ? "italic text-champagne" : ""}`}
                          style={{ animationDelay: `${0.05 * i}s` }}
                        >
                          {w.t}
                        </span>
                        {i < t.hero.words.length - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </h1>
                <p
                  className="klik-fade-up mt-6 max-w-lg font-sans text-base leading-relaxed text-ivoire/70 sm:text-lg"
                  style={{ animationDelay: "0.3s" }}
                >
                  {t.hero.paragraph}
                </p>
                <div className="klik-fade-up mt-9 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.4s" }}>
                  <MagneticButton>
                    <a
                      href={`/${locale}/#diagnostico`}
                      className="group/btn flex items-center justify-center gap-3 rounded-full bg-champagne py-3 pl-7 pr-3 text-center font-sans text-sm font-medium text-noir transition-colors hover:bg-ivoire"
                    >
                      {t.hero.ctaPrimary}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-noir text-champagne transition-transform duration-300 group-hover/btn:-rotate-45">
                        <ArrowIcon className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a
                      href={`/${locale}/#proceso`}
                      className="block rounded-full border border-champagne/25 px-7 py-3 text-center font-sans text-sm font-medium text-ivoire transition-colors hover:bg-champagne/10"
                    >
                      {t.hero.ctaSecondary}
                    </a>
                  </MagneticButton>
                </div>
                <p className="klik-fade-up mt-7 font-serif text-lg italic text-ivoire/80" style={{ animationDelay: "0.5s" }}>
                  {t.hero.quote}
                </p>
              </div>

              <div className="klik-hero-in relative" style={{ animationDelay: "0.15s" }}>
                <HeroDial className="pointer-events-none absolute left-1/2 top-[46%] -z-10 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 lg:left-[58%] lg:w-[138%]" />
                <AgendaCalendar locale={locale} />
                <a
                  href="#calculadora"
                  className="group mt-4 flex items-center justify-between rounded-2xl border border-champagne/15 bg-grafito px-5 py-4 transition-colors hover:border-champagne/40"
                >
                  <span>
                    <span className="block font-sans text-sm font-medium text-ivoire">{t.heroTeaser.title}</span>
                    <span className="block font-sans text-xs text-piedra">{t.heroTeaser.subtitle}</span>
                  </span>
                  <span className="font-serif text-xl text-champagne transition-transform group-hover:translate-x-1">
                    ↓
                  </span>
                </a>
              </div>
            </div>
          </div>

          <a
            href="#calculadora"
            className="klik-scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-piedra lg:flex"
          >
            {/* El nombre accesible empieza por el texto visible ("Scroll") y añade a dónde lleva */}
            <span>
              Scroll<span className="sr-only"> · {t.heroTeaser.title}</span>
            </span>
            <span className="relative h-10 w-px overflow-hidden bg-champagne/15">
              <span className="klik-scroll-drop absolute inset-x-0 top-0 h-4 bg-champagne" />
            </span>
          </a>
        </section>

        {/* 00 · Calculadora */}
        <section id="calculadora" className="klik-defer mx-auto max-w-6xl scroll-mt-24 px-6 pt-4 pb-20 sm:pb-24">
          <Reveal>
            <div className="text-center">
              <span className="klik-num font-serif text-5xl italic sm:text-6xl" aria-hidden>
                00
              </span>
              <h2 className="mx-auto mt-1 max-w-2xl font-serif text-3xl font-semibold text-ivoire sm:text-4xl">
                {t.heroTeaser.title}
              </h2>
              <p className="mx-auto mt-4 max-w-lg font-sans text-[15.5px] leading-relaxed text-ivoire/70">
                {t.heroTeaser.subtitle}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="mx-auto mt-10 max-w-xl">
            <HeroCalculator locale={locale} />
          </Reveal>
        </section>

        {/* Diagnóstico interactivo */}
        <section id="diagnostico" className="klik-defer mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
          <Reveal>
            <div className="text-center">
              <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-champagne">
                {t.diagnostic.eyebrow}
              </p>
              <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold text-ivoire sm:text-4xl">
                {t.diagnostic.title}
              </h2>
              <p className="mx-auto mt-4 max-w-lg font-sans text-[15.5px] leading-relaxed text-ivoire/70">
                {t.diagnostic.subtitle}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <ProblemDiagnostic locale={locale} />
          </Reveal>
        </section>

        {/* La máquina de la agenda — escena 3D interactiva */}
        <MachineSection locale={locale} />

        {/* Manifiesto — la misión se enciende palabra a palabra con el scroll */}
        <section className="klik-defer klik-light relative py-24 sm:py-36" aria-label={t.historia.missionLabel}>
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              {t.historia.missionLabel}
            </p>
            <ScrollFillText
              text={t.historia.missionQuote}
              className="mt-8 font-serif text-3xl font-semibold leading-[1.2] tracking-tight text-ivoire sm:text-5xl lg:text-6xl"
            />
          </div>
        </section>

        {/* Historia y misión */}
        <section id="historia" className="klik-defer klik-light border-t border-champagne/15">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <Reveal>
                <SectionNumber n={t.historia.number} />
                <h2 className="mt-1 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">
                  {t.historia.title}
                </h2>
                <div className="mt-6 max-w-xl space-y-4 font-sans text-[15.5px] leading-relaxed text-ivoire/70">
                  <p>{t.historia.p1}</p>
                  <p>{t.historia.p2}</p>
                </div>
              </Reveal>

              <ul className="space-y-3">
                {t.historia.valores.map((valor, i) => (
                  <Reveal
                    key={valor.title}
                    as="li"
                    delay={i * 90}
                    className="klik-value group flex items-center gap-5 rounded-2xl border border-champagne/10 bg-noir px-6 py-5 transition-colors duration-300 hover:border-champagne/40"
                  >
                      <span className="font-serif text-2xl italic text-champagne/40 transition-colors duration-300 group-hover:text-champagne">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="font-sans text-sm font-medium text-ivoire">{valor.title}</span>
                        <span className="block font-sans text-sm text-piedra">{valor.description}</span>
                      </span>
                      <span aria-hidden className="font-serif text-xl text-champagne opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        <ArrowIcon className="h-5 w-5" />
                      </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Servicios — fila anclada que se desliza en horizontal */}
        <HorizontalScroll
          id="servicios"
          className="klik-dark klik-canvas klik-canvas-block"
          header={
            <Reveal>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="max-w-xl">
                  <SectionNumber n={t.servicios.number} />
                  <h2 className="mt-1 font-serif text-3xl font-semibold text-ivoire sm:text-5xl">{t.servicios.title}</h2>
                </div>
                <p className="max-w-sm font-sans text-[15.5px] leading-relaxed text-ivoire/70">{t.servicios.subtitle}</p>
              </div>
            </Reveal>
          }
        >
          {t.servicios.items.map((servicio, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <Spotlight
                key={servicio.title}
                className="klik-service-card group relative flex flex-col rounded-3xl border border-champagne/10 bg-grafito p-7 transition-colors duration-500 hover:border-champagne/40 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/20 bg-noir text-champagne transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-champagne group-hover:text-noir">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-serif text-5xl italic leading-none text-champagne/15 transition-colors duration-500 group-hover:text-champagne/40" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-auto pt-14 font-serif text-2xl font-semibold leading-tight text-ivoire">{servicio.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-piedra">{servicio.description}</p>
                <span aria-hidden className="mt-6 block h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 group-hover:scale-x-100" />
              </Spotlight>
            );
          })}
        </HorizontalScroll>

        <BigMarquee items={t.marquee} />

        {/* Cómo trabajamos — lienzo que se expande con el scroll */}
        <ExpandCanvas id="proceso" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <Reveal>
              <SectionNumber n={t.proceso.number} />
              <h2 className="mt-1 max-w-2xl font-serif text-3xl font-semibold text-ivoire sm:text-5xl">{t.proceso.title}</h2>
            </Reveal>
            <div className="relative mt-14">
              <div aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-champagne/10 lg:block">
                <div className="klik-process-line h-full origin-left bg-gradient-to-r from-champagne/0 via-champagne to-champagne" />
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {t.proceso.steps.map((item, i) => (
                  <Reveal key={item.step} delay={i * 120}>
                    <div className="group relative">
                      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-champagne/40 bg-noir font-serif text-sm italic text-champagne transition-colors duration-300 group-hover:bg-champagne group-hover:text-noir">
                        {item.step}
                      </span>
                      <h3 className="mt-5 font-sans text-base font-medium text-ivoire">{item.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-piedra">{item.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </ExpandCanvas>

        {/* Lo que nunca hacemos */}
        <section className="klik-defer klik-light">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <span className="font-serif text-5xl italic text-champagne/40 sm:text-6xl" aria-hidden>
                {t.nuncaHacemos.number}
              </span>
              <h2 className="mt-1 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{t.nuncaHacemos.title}</h2>
              <p className="mt-4 max-w-xl font-sans text-[15.5px] leading-relaxed text-ivoire/70">{t.nuncaHacemos.subtitle}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-2xl border border-champagne/15 bg-noir p-7">
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-champagne">
                    {t.nuncaHacemos.comunicacionLabel}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {t.nuncaHacemos.comunicacionItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-ivoire/80">
                        <IconNo className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="h-full rounded-2xl border border-champagne/15 bg-noir p-7">
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-champagne">
                    {t.nuncaHacemos.productoLabel}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {t.nuncaHacemos.productoItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-ivoire/80">
                        <IconNo className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="mt-14 flex flex-col items-center gap-4 text-center">
                <p className="font-serif text-3xl italic text-ivoire sm:text-4xl">{t.nuncaHacemos.closingQuote}</p>
                <span className="h-10 w-10 rounded-full border border-champagne" aria-hidden />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section id="preguntas" className="klik-defer mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Reveal>
            <div className="text-center">
              <SectionNumber n={t.faq.number} />
              <h2 className="mt-1 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{t.faq.title}</h2>
            </div>
          </Reveal>
          <div className="mt-12 space-y-3">
            {t.faq.items.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 50}>
                <details className="group rounded-xl border border-champagne/10 bg-grafito p-5 open:border-champagne/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-sm font-medium text-ivoire">
                    {faq.q}
                    <span className="ml-4 shrink-0 font-serif text-lg text-champagne transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-piedra">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section id="contacto" className="klik-defer mx-auto max-w-4xl px-6 pb-16 sm:pb-20">
          <Reveal>
            <div className="klik-cta-card klik-dark klik-canvas relative overflow-hidden rounded-3xl border border-champagne/25 px-6 py-9 sm:px-10 sm:py-10">
              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
                <div className="max-w-md">
                  <h2 className="font-serif text-2xl font-semibold text-ivoire sm:text-3xl">{t.ctaFinal.title}</h2>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ivoire/70">{t.ctaFinal.subtitle}</p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
                  <MagneticButton>
                    <Link
                      href={`/${locale}/contacto`}
                      className="group/cta flex items-center gap-3 rounded-full bg-champagne py-2.5 pl-6 pr-2.5 font-sans text-sm font-medium text-noir transition-colors hover:bg-ivoire"
                    >
                      {t.ctaFinal.button}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-noir text-champagne transition-transform duration-300 group-hover/cta:translate-x-0.5">
                        <ArrowIcon className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </MagneticButton>
                  <a
                    href={`/${locale}/#diagnostico`}
                    className="font-sans text-xs text-piedra underline decoration-champagne/30 underline-offset-4 transition-colors hover:text-champagne"
                  >
                    {t.ctaFinal.backLink}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
