import type { Locale } from "./locales";
import es from "./dictionaries/es";
import fr from "./dictionaries/fr";
import en from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/es";

const dictionaries: Record<Locale, Dictionary> = { fr, es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
