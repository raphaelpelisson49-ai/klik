import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { LOCALES } from "@/i18n/locales";
import { slugFor, type Route } from "@/i18n/routes";

const NICHE_ROUTES: Route[] = ["climatisation", "plomberie", "electricite"];
const CONTENT_ROUTES: Route[] = ["a-propos", "guide-appels-manques", "guide-avis-google", "agence-marketing-ia-angers"];
const PAGES: (Route | "")[] = ["", "calculadora", "contacto", ...NICHE_ROUTES, ...CONTENT_ROUTES, "aviso-legal", "privacidad", "cookies"];

// Sin lastmod: con la fecha del build todas las páginas parecían cambiar en cada despliegue,
// y Google deja de fiarse de un lastmod que no es real.
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of PAGES) {
    const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${slugFor(l, route)}`]));

    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${slugFor(locale, route)}`,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "calculadora" ? 0.9 : NICHE_ROUTES.includes(route as Route) || CONTENT_ROUTES.includes(route as Route) ? 0.8 : 0.5,
        alternates: { languages },
      });
    }
  }

  return entries;
}
