import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NichePage } from "@/components/NichePage";
import { getNicheContent } from "@/i18n/niches";
import { isLocale, LOCALES } from "@/i18n/locales";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/climatisation">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getNicheContent(locale, "climatisation");
  return buildMetadata({ locale, route: "climatisation", title: c.metaTitle, description: c.metaDescription });
}

export default async function Page({ params }: PageProps<"/[locale]/climatisation">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <NichePage locale={locale} niche="climatisation" />;
}
