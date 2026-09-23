import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-champagne/10 bg-noir">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 font-sans text-sm leading-relaxed text-piedra">{t.footer.tagline}</p>
          <LanguageSwitcher locale={locale} className="mt-5" />
        </div>
        <div className="grid grid-cols-2 gap-10 font-sans text-sm sm:grid-cols-3">
          <div>
            <h4 className="font-medium text-ivoire">{t.footer.serviciosTitle}</h4>
            <ul className="mt-3 space-y-2 text-piedra">
              {t.footer.servicios.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-ivoire">{t.footer.siteTitle}</h4>
            <ul className="mt-3 space-y-2 text-piedra">
              {t.footer.siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className="hover:text-champagne">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-ivoire">{t.footer.contactTitle}</h4>
            <ul className="mt-3 space-y-2 text-piedra">
              <li><a href="mailto:klikia@klikagencies.com" className="hover:text-champagne">klikia@klikagencies.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-champagne/10 px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-sans text-xs text-piedra sm:flex-row">
          <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
          <div className="flex items-center gap-5">
            <Link href={`/${locale}/aviso-legal`} className="hover:text-champagne">{t.footer.legal.avisoLegal}</Link>
            <Link href={`/${locale}/privacidad`} className="hover:text-champagne">{t.footer.legal.privacidad}</Link>
            <Link href={`/${locale}/cookies`} className="hover:text-champagne">{t.footer.legal.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
