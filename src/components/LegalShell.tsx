import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

export function LegalShell({
  locale,
  title,
  updated,
  children,
}: {
  locale: Locale;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-champagne/10 bg-noir/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <Link href={`/${locale}`} aria-label="klik">
            <Logo />
          </Link>
          <div className="flex items-center gap-5">
            <LanguageSwitcher locale={locale} />
            <Link href={`/${locale}`} className="font-sans text-sm text-piedra transition-colors hover:text-champagne">
              {t.legalShell.backLink}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-20">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-champagne">
          {t.legalShell.documentLabel}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{title}</h1>
        <p className="mt-2 font-sans text-xs text-piedra">{t.legalShell.updatedLabel} {updated}</p>

        <div className="klik-legal mt-10 space-y-8 font-sans text-[15px] leading-relaxed text-ivoire/80">
          {children}
        </div>
      </main>

      <footer className="border-t border-champagne/10 bg-noir">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-6 py-8 font-sans text-xs text-piedra sm:flex-row">
          <span>© {new Date().getFullYear()} klik</span>
          <div className="flex items-center gap-5">
            <Link href={`/${locale}/aviso-legal`} className="hover:text-champagne">{t.footer.legal.avisoLegal}</Link>
            <Link href={`/${locale}/privacidad`} className="hover:text-champagne">{t.footer.legal.privacidad}</Link>
            <Link href={`/${locale}/cookies`} className="hover:text-champagne">{t.footer.legal.cookies}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
