import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { MagneticButton } from "@/components/MagneticButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const navLinks = [
    { href: `/${locale}/calculadora`, label: t.nav.calculadora },
    { href: `/${locale}/#diagnostico`, label: t.nav.diagnostico },
    { href: `/${locale}/#servicios`, label: t.nav.servicios },
    { href: `/${locale}/#proceso`, label: t.nav.proceso },
    { href: `/${locale}/#preguntas`, label: t.nav.preguntas },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-champagne/10 bg-noir/90 backdrop-blur relative">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
          <Link href={`/${locale}`} aria-label="klik">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-8 font-sans text-sm text-ivoire/80 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-champagne">
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
            />
            <MagneticButton strength={8} className="hidden sm:inline-block">
              <Link
                href={`/${locale}/#diagnostico`}
                className="block rounded-full bg-champagne px-5 py-2.5 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
              >
                {t.nav.cta}
              </Link>
            </MagneticButton>
          </div>
        </div>
      </header>

      <Marquee items={t.marquee} />
    </>
  );
}
