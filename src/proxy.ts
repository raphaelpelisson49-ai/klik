import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";
import { ROUTES, routeForSlug, slugFor, type Route } from "@/i18n/routes";

function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());

  for (const lang of preferred) {
    const short = lang.slice(0, 2);
    if ((LOCALES as readonly string[]).includes(short)) {
      return short as Locale;
    }
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLocale = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathLocale) {
    // Slugs traducidos: /fr/calculatrice se sirve desde la carpeta calculadora, y la URL
    // interna (/fr/calculadora) redirige a la traducida para que solo exista una.
    const segments = pathname.split("/");
    if (segments.length !== 3 || !segments[2]) return NextResponse.next();
    const slug = segments[2];
    const route = routeForSlug(pathLocale, slug);
    const url = request.nextUrl.clone();
    if (route && route !== slug) {
      url.pathname = `/${pathLocale}/${route}`;
      return NextResponse.rewrite(url);
    }
    if (!route && (ROUTES as readonly string[]).includes(slug)) {
      url.pathname = `/${pathLocale}${slugFor(pathLocale, slug as Route)}`;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|icon.svg|favicon.ico|.*\\..*).*)"],
};
