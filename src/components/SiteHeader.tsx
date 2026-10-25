import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/MagneticButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";
import { localHref } from "@/i18n/routes";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const navLinks = [
    { href: localHref(locale, "/calculadora"), label: t.nav.calculadora },
    { href: `/${locale}/#diagnostico`, label: t.nav.diagnostico },
    { href: `/${locale}/#servicios`, label: t.nav.servicios },
    { href: `/${locale}/#proceso`, label: t.nav.proceso },
    { href: `/${locale}/#preguntas`, label: t.nav.preguntas },
  ];

  return (
    <header className="klik-header sticky top-0 z-50">
      <div className="klik-dock klik-dark relative mx-auto flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="klik-logo-link">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 whitespace-nowrap font-sans text-sm text-ivoire/80 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="klik-navlink transition-colors hover:text-champagne">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} className="hidden sm:flex" />
          <MobileMenu
            locale={locale}
            links={navLinks}
            ctaLabel={t.nav.cta}
            ctaHref={`/${locale}/#diagnostico`}
            labels={{ open: t.nav.openMenu, close: t.nav.closeMenu }}
          />
          <div className="hidden sm:block">
            <MagneticButton strength={8}>
              <Link
                href={`/${locale}/#diagnostico`}
                className="block whitespace-nowrap rounded-full bg-champagne px-5 py-2.5 font-sans text-sm font-medium text-noir transition-colors hover:bg-ivoire"
              >
                {t.nav.cta}
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </header>
  );
}
