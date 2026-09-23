"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/locales";

export default function NotFound() {
  const pathname = usePathname() || "/";
  const firstSegment = pathname.split("/")[1];
  const locale = isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-noir px-6 py-24 text-center">
      <Link href={`/${locale}`} aria-label="klik" className="mb-10">
        <Logo />
      </Link>
      <span className="font-serif text-6xl italic text-champagne/30">404</span>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{t.notFound.title}</h1>
      <p className="mx-auto mt-4 max-w-md font-sans text-[15.5px] leading-relaxed text-ivoire/70">
        {t.notFound.subtitle}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 rounded-full bg-champagne px-7 py-3 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
      >
        {t.notFound.backHome}
      </Link>
    </div>
  );
}
