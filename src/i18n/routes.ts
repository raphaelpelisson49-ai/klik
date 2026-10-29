import type { Locale } from "./locales";

/**
 * Rutas internas (nombre de la carpeta en app/[locale]) → slug público en cada idioma.
 * Las carpetas mantienen su nombre; el proxy reescribe el slug traducido a la carpeta
 * y redirige (308) la URL interna a la traducida, para que Google solo vea una.
 */
export const ROUTES = [
  "calculadora",
  "contacto",
  "climatisation",
  "plomberie",
  "electricite",
  "aviso-legal",
  "privacidad",
  "cookies",
  "a-propos",
  "guide-appels-manques",
  "guide-avis-google",
  "agence-marketing-ia-angers",
] as const;
export type Route = (typeof ROUTES)[number];

const SLUGS: Record<Locale, Record<Route, string>> = {
  fr: {
    calculadora: "calculatrice",
    contacto: "contact",
    climatisation: "climatisation",
    plomberie: "plomberie",
    electricite: "electricite",
    "aviso-legal": "mentions-legales",
    privacidad: "confidentialite",
    cookies: "cookies",
    "a-propos": "a-propos",
    "guide-appels-manques": "guide-appels-manques",
    "guide-avis-google": "guide-avis-google",
    "agence-marketing-ia-angers": "agence-marketing-ia-angers",
  },
  es: {
    calculadora: "calculadora",
    contacto: "contacto",
    climatisation: "climatizacion",
    plomberie: "fontaneria",
    electricite: "electricidad",
    "aviso-legal": "aviso-legal",
    privacidad: "privacidad",
    cookies: "cookies",
    "a-propos": "sobre-klik",
    "guide-appels-manques": "guia-llamadas-perdidas",
    "guide-avis-google": "guia-resenas-google",
    "agence-marketing-ia-angers": "agencia-marketing-ia-angers",
  },
  en: {
    calculadora: "calculator",
    contacto: "contact",
    climatisation: "hvac",
    plomberie: "plumbing",
    electricite: "electrical",
    "aviso-legal": "legal-notice",
    privacidad: "privacy",
    cookies: "cookies",
    "a-propos": "about",
    "guide-appels-manques": "guide-missed-calls",
    "guide-avis-google": "guide-google-reviews",
    "agence-marketing-ia-angers": "ai-marketing-agency-angers",
  },
};

function isRoute(value: string): value is Route {
  return (ROUTES as readonly string[]).includes(value);
}

/** Slug público de una ruta interna en un idioma ("" para la home). */
export function slugFor(locale: Locale, route: Route | ""): string {
  return route ? `/${SLUGS[locale][route]}` : "";
}

/**
 * Enlace localizado a partir de un href interno: "/calculadora" → "/fr/calculatrice",
 * "/#diagnostico" → "/fr/#diagnostico", "" → "/fr".
 */
export function localHref(locale: Locale, href: string): string {
  const match = href.match(/^\/([^/#?]+)(.*)$/);
  if (match && isRoute(match[1])) return `/${locale}${slugFor(locale, match[1])}${match[2]}`;
  return `/${locale}${href}`;
}

/** Ruta interna que corresponde a un slug público, o null si el slug no es de este idioma. */
export function routeForSlug(locale: Locale, slug: string): Route | null {
  for (const route of ROUTES) if (SLUGS[locale][route] === slug) return route;
  return null;
}

/** La misma página en otro idioma: "/fr/calculatrice" → "/en/calculator". */
export function switchLocale(pathname: string, from: Locale, to: Locale): string {
  const slug = pathname.split("/")[2] ?? "";
  const route = routeForSlug(from, slug) ?? (isRoute(slug) ? slug : null);
  if (route) return `/${to}${slugFor(to, route)}`;
  return `/${to}${pathname.replace(/^\/[a-z]{2}/, "")}`;
}
