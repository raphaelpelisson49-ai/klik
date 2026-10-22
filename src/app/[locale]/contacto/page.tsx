import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, LOCALES } from "@/i18n/locales";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contacto">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/contacto",
    title: t.contacto.metaTitle,
    description: t.contacto.metaDescription,
  });
}

export default async function ContactoPage({ params }: PageProps<"/[locale]/contacto">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader locale={locale} />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 sm:pb-14 sm:pt-20">
          <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne">
            <span className="h-px w-8 bg-champagne" aria-hidden />
            {t.contacto.eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ivoire sm:text-6xl">
            {t.contacto.title}
          </h1>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ivoire/70 sm:text-lg">{t.contacto.subtitle}</p>
        </section>

        <section className="klik-hero-in mx-auto max-w-6xl px-6 pb-20 sm:pb-28" style={{ animationDelay: "0.15s" }}>
          <ContactForm locale={locale} />
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
