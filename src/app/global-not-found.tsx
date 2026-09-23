"use client";

import { Lora, Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, DEFAULT_LOCALE, HTML_LANG } from "@/i18n/locales";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function GlobalNotFound() {
  const pathname = usePathname() || "/";
  const firstSegment = pathname.split("/")[1];
  const locale = isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  return (
    <html lang={HTML_LANG[locale]} className={`${lora.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-noir font-sans text-foreground">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <a href={`/${locale}`} aria-label="klik" className="mb-10">
            <Logo />
          </a>
          <span className="font-serif text-6xl italic text-champagne/30">404</span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">{t.notFound.title}</h1>
          <p className="mx-auto mt-4 max-w-md font-sans text-[15.5px] leading-relaxed text-ivoire/70">
            {t.notFound.subtitle}
          </p>
          <a
            href={`/${locale}`}
            className="mt-8 rounded-full bg-champagne px-7 py-3 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
          >
            {t.notFound.backHome}
          </a>
        </div>
      </body>
    </html>
  );
}
