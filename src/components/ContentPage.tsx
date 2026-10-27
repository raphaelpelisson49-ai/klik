import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { CONTENT_DATES, getContentPage, type ContentSlug } from "@/i18n/pages";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { localHref } from "@/i18n/routes";
import type { Locale } from "@/i18n/locales";

const HOME_LABEL: Record<Locale, string> = { fr: "Accueil", es: "Inicio", en: "Home" };

export function ContentPage({ locale, slug }: { locale: Locale; slug: ContentSlug }) {
  const c = getContentPage(locale, slug);
  const dates = CONTENT_DATES[slug];
  const url = `${SITE_URL}${localHref(locale, `/${slug}`)}`;

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: HOME_LABEL[locale], item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.breadcrumb, item: url },
    ],
  };

  const organization = { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/${locale}` };
  const author = {
    "@type": "Person",
    name: "Raphaël Pelisson",
    sameAs: ["https://www.linkedin.com/in/raphael-pelisson/"],
  };

  const mainJson =
    c.kind === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.h1,
          description: c.metaDescription,
          inLanguage: locale,
          mainEntityOfPage: url,
          datePublished: dates.published,
          dateModified: dates.modified,
          author,
          publisher: organization,
        }
      : {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: c.h1,
          description: c.metaDescription,
          inLanguage: locale,
          url,
          about: organization,
          dateModified: dates.modified,
        };

  const faqJson = c.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

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

        <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {c.sections.map((section) => (
            <Reveal key={section.title}>
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-ivoire sm:text-3xl">{section.title}</h2>
                {section.paras.map((p) => (
                  <p key={p} className="mt-4 font-sans text-[15.5px] leading-relaxed text-ivoire/75">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-[15.5px] leading-relaxed text-ivoire/75 marker:text-champagne">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}

          {c.faq && (
            <Reveal>
              <section className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-ivoire sm:text-3xl">FAQ</h2>
                <dl className="mt-6 space-y-6">
                  {c.faq.map((item) => (
                    <div key={item.q} className="border-b border-champagne/10 pb-6">
                      <dt className="font-sans text-base font-medium text-ivoire">{item.q}</dt>
                      <dd className="mt-2 font-sans text-sm leading-relaxed text-piedra">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>
          )}

          <section>
            <h2 className="font-serif text-xl font-semibold text-ivoire">{c.linksTitle}</h2>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localHref(locale, l.href)}
                    className="text-champagne underline decoration-champagne/30 underline-offset-4 transition-colors hover:decoration-champagne"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>

        <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-champagne/15 bg-grafito px-8 py-14 text-center sm:px-16">
              <h2 className="font-serif text-2xl font-semibold text-ivoire sm:text-3xl">{c.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-md font-sans text-[15.5px] leading-relaxed text-ivoire/70">
                {c.ctaSubtitle}
              </p>
              <MagneticButton className="mt-7">
                <Link
                  href={localHref(locale, "/contacto")}
                  className="block rounded-full bg-champagne px-7 py-3 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
                >
                  {c.ctaButton}
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter locale={locale} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainJson) }}
      />
      {faqJson && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
        />
      )}
    </div>
  );
}
