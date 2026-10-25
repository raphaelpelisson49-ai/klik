import type { Metadata } from "next";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

/**
 * Dominio real de producción. Se puede sobrescribir con NEXT_PUBLIC_SITE_URL
 * en el entorno de despliegue (útil para previews/staging) sin tocar código.
 * Todas las URLs canónicas, hreflang, sitemap, robots.txt y Open Graph se
 * generan a partir de aquí.
 *
 * Es la versión con www porque es la que sirve Vercel: klikagencies.com responde
 * con un 308 hacia www. Un canónico que redirige es un error en Search Console
 * ("Página con redirección"), así que el canónico debe ser la URL final.
 * Por eso, aunque NEXT_PUBLIC_SITE_URL apunte al dominio sin www, se corrige a www.
 */
function siteOrigin(raw: string): string {
  const url = new URL(raw);
  if (url.hostname === "klikagencies.com") url.hostname = "www.klikagencies.com";
  return url.origin;
}

export const SITE_URL = siteOrigin(process.env.NEXT_PUBLIC_SITE_URL || "https://www.klikagencies.com");

export const SITE_NAME = "klik";

const OG_LOCALE: Record<Locale, string> = { fr: "fr_FR", es: "es_ES", en: "en_US" };

export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  /** Ruta sin el prefijo de idioma, ej. "" para home, "/calculadora" para la calculadora. */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `${SITE_URL}/${l}${path}`;
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
