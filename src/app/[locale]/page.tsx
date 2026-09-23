import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AgendaCalendar } from "@/components/AgendaCalendar";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { Spotlight } from "@/components/Spotlight";
import { ProblemDiagnostic } from "@/components/ProblemDiagnostic";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
    <span className="block font-serif text-5xl italic text-champagne/30 sm:text-6xl" aria-hidden>
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
      <SiteHeader locale={locale} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-[-6rem] -z-10 h-[26rem] w-[26rem] rounded-full border border-champagne/20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-10 right-24 -z-10 h-64 w-64 rounded-full border border-champagne/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-[13rem] right-[9.5rem] -z-10 h-2.5 w-2.5 rounded-full bg-champagne/70"
          />

          <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-20">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
              <div>
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-champagne">
                  {t.hero.eyebrow}
                </span>
                <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.1] text-ivoire sm:text-5xl sm:leading-[1.08]">
                  {t.hero.words.map((w, i) => (
                    <span
                      key={i}
                      className={`klik-word mr-3 ${w.c ? "text-champagne" : ""}`}
                      style={{ animationDelay: `${0.08 * i + 0.05}s` }}
                    >
                      {w.t}
                      {i < t.hero.words.length - 1 ? " " : ""}
                    </span>
                  ))}
                </h1>
                <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-ivoire/70 sm:text-lg">
                  {t.hero.paragraph}
                </p>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <MagneticButton>
                    <a
                      href={`/${locale}/#diagnostico`}
                      className="block rounded-full bg-champagne px-7 py-3 text-center font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
                    >
                      {t.hero.ctaPrimary}
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
                <p className="mt-7 font-serif text-lg italic text-ivoire/80">{t.hero.quote}</p>
              </div>

              <div className="klik-hero-in">
                <AgendaCalendar locale={locale} />
                <Link
                  href={`/${locale}/calculadora`}
                  className="group mt-4 flex items-center justify-between rounded-2xl border border-champagne/15 bg-grafito px-5 py-4 transition-colors hover:border-champagne/40"
                >
                  <span>
                    <span className="block font-sans text-sm font-medium text-ivoire">{t.heroTeaser.title}</span>
                    <span className="block font-sans text-xs text-piedra">{t.heroTeaser.subtitle}</span>
                  </span>
                  <span className="font-serif text-xl text-champagne transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnóstico interactivo */}
        <section id="diagnostico" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <div className="text-center">
              <span className="font-serif text-5xl italic text-champagne/30 sm:text-6xl" aria-hidden>
                00
              </span>
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

        {/* Historia y misión */}
        <section id="historia" className="border-y border-champagne/10 bg-grafito/40">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <SectionNumber n={t.historia.number} />
                  <h2 className="mt-1 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">
                    {t.historia.title}
                  </h2>
                  <div className="mt-6 max-w-xl space-y-4 font-sans text-[15.5px] leading-relaxed text-ivoire/70">
                    <p>{t.historia.p1}</p>
                    <p>{t.historia.p2}</p>
                  </div>
                </div>

                <div>
                  <div className="relative rounded-2xl border border-champagne/15 bg-noir p-7">
                    <span className="absolute -top-3 left-7 flex h-6 w-6 items-center justify-center rounded-full bg-champagne text-xs text-noir">
                      &ldquo;
                    </span>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-piedra">
                      {t.historia.missionLabel}
                    </p>
                    <p className="mt-3 font-serif text-xl italic leading-snug text-ivoire sm:text-2xl">
                      {t.historia.missionQuote}
                    </p>
                  </div>

                  <ul className="mt-6 divide-y divide-champagne/10 rounded-2xl border border-champagne/15 bg-noir">
                    {t.historia.valores.map((valor) => (
                      <li key={valor.title} className="flex items-start gap-3 px-6 py-4">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" aria-hidden />
                        <span>
                          <span className="font-sans text-sm font-medium text-ivoire">{valor.title}</span>
                          <span className="block font-sans text-sm text-piedra">{valor.description}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <SectionNumber n={t.servicios.number} />
            <div className="mt-1 max-w-xl">
              <h2 className="font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{t.servicios.title}</h2>
              <p className="mt-4 font-sans text-[15.5px] leading-relaxed text-ivoire/70">{t.servicios.subtitle}</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.servicios.items.map((servicio, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <Reveal key={servicio.title} delay={i * 60}>
                  <Spotlight className="group relative h-full rounded-2xl border border-champagne/10 bg-grafito p-6 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-noir text-champagne">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-champagne opacity-60 transition-opacity group-hover:opacity-100" aria-hidden />
                    <h3 className="mt-5 font-sans text-base font-medium text-ivoire">{servicio.title}</h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-piedra">{servicio.description}</p>
                  </Spotlight>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Cómo trabajamos */}
        <section id="proceso" className="border-y border-champagne/10 bg-grafito/40">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <SectionNumber n={t.proceso.number} />
              <h2 className="mt-1 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{t.proceso.title}</h2>
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {t.proceso.steps.map((item, i) => (
                <Reveal key={item.step} delay={i * 80}>
                  <span className="font-serif text-3xl italic text-champagne">{item.step}</span>
                  <h3 className="mt-3 font-sans text-base font-medium text-ivoire">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-piedra">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Lo que nunca hacemos */}
        <section className="border-y border-champagne/10 bg-grafito/60">
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
        <section id="preguntas" className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
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
        <section id="contacto" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-champagne/15 bg-grafito px-8 py-16 text-center sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-24 -z-0 h-72 w-72 rounded-full border border-champagne/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 -z-0 h-48 w-48 rounded-full bg-champagne/5"
              />
              <div className="relative flex flex-col items-center">
                <Logo withTagline tagline={t.hero.words.map((w) => w.t).join(" ")} className="scale-110" />
                <h2 className="mt-8 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{t.ctaFinal.title}</h2>
                <p className="mx-auto mt-4 max-w-md font-sans text-[15.5px] leading-relaxed text-ivoire/70">
                  {t.ctaFinal.subtitle}
                </p>
                <MagneticButton className="mt-8">
                  <a
                    href="mailto:klikia@klikagencies.com"
                    className="block rounded-full bg-champagne px-8 py-3 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
                  >
                    {t.ctaFinal.button}
                  </a>
                </MagneticButton>
                <a
                  href={`/${locale}/#diagnostico`}
                  className="mt-5 font-sans text-xs text-piedra underline decoration-champagne/30 underline-offset-4 transition-colors hover:text-champagne"
                >
                  {t.ctaFinal.backLink}
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
