"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/locales";
import { switchLocale } from "@/i18n/routes";

export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname() || "/";

  return (
    <div className={`flex items-center gap-2 font-sans text-xs ${className ?? ""}`}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          <Link
            href={switchLocale(pathname, locale, l)}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? "font-semibold text-champagne"
                : "text-piedra transition-colors hover:text-ivoire"
            }
          >
            {LOCALE_LABELS[l]}
          </Link>
          {i < LOCALES.length - 1 && <span className="text-piedra/40">·</span>}
        </span>
      ))}
    </div>
  );
}
