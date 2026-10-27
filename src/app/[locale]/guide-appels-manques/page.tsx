import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getContentPage } from "@/i18n/pages";
import { isLocale, LOCALES } from "@/i18n/locales";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/guide-appels-manques">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContentPage(locale, "guide-appels-manques");
  return buildMetadata({ locale, path: "/guide-appels-manques", title: c.metaTitle, description: c.metaDescription });
}

export default async function Page({ params }: PageProps<"/[locale]/guide-appels-manques">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContentPage locale={locale} slug="guide-appels-manques" />;
}
