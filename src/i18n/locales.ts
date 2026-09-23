export const LOCALES = ["fr", "es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  es: "ES",
  en: "EN",
};

export const HTML_LANG: Record<Locale, string> = {
  fr: "fr",
  es: "es",
  en: "en",
};
