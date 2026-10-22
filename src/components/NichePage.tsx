import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { getNicheContent, type Niche } from "@/i18n/niches";
import type { Locale } from "@/i18n/locales";

export function NichePage({ locale, niche }: { locale: Locale; niche: Niche }) {
  const c = getNicheContent(locale, niche);

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader locale={locale} />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-champagne/10 bg-grafito/30">
          <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-champagne">
              {c.eyebrow}
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-ivoire sm:text-5xl">
              {c.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-sans text-[15.5px] leading-relaxed text-ivoire/70 sm:text-lg">
              {c.intro}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{c.problemsTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {c.problems.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-champagne/15 bg-grafito p-6">
                  <h3 className="font-sans text-base font-medium text-ivoire">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-piedra">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y border-champagne/10 bg-grafito/30">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{c.helpTitle}</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {c.help.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-champagne/15 bg-noir p-6">
                    <h3 className="font-sans text-base font-medium text-ivoire">{item.title}</h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-piedra">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Link
              href={`/${locale}/calculadora`}
              className="mt-8 inline-block font-sans text-sm text-champagne underline decoration-champagne/30 underline-offset-4 transition-colors hover:decoration-champagne"
            >
              {c.calculatorLink}
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{c.faqTitle}</h2>
          </Reveal>
          <dl className="mt-8 space-y-6">
            {c.faq.map((item) => (
              <div key={item.q} className="border-b border-champagne/10 pb-6">
                <dt className="font-sans text-base font-medium text-ivoire">{item.q}</dt>
                <dd className="mt-2 font-sans text-sm leading-relaxed text-piedra">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-champagne/15 bg-grafito px-8 py-14 text-center sm:px-16">
              <h2 className="font-serif text-2xl font-semibold text-ivoire sm:text-3xl">{c.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-md font-sans text-[15.5px] leading-relaxed text-ivoire/70">
                {c.ctaSubtitle}
              </p>
              <MagneticButton className="mt-7">
                <a
                  href="mailto:klikia@klikagencies.com"
                  className="block rounded-full bg-champagne px-7 py-3 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
                >
                  {c.ctaButton}
                </a>
              </MagneticButton>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter locale={locale} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
    </div>
  );
}
