"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/i18n/locales";

export function MobileMenu({
  locale,
  links,
  ctaLabel,
  ctaHref,
}: {
  locale: Locale;
  links: { href: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="klik-mobile-menu"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-champagne/20"
      >
        <span
          className={`block h-px w-4 bg-ivoire transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span
          className={`block h-px w-4 bg-ivoire transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div
          id="klik-mobile-menu"
          className="absolute inset-x-0 top-full z-50 border-b border-champagne/10 bg-noir px-6 py-6"
        >
          <nav className="flex flex-col gap-1 font-sans text-base text-ivoire/85">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 transition-colors hover:bg-grafito hover:text-champagne"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex items-center justify-between border-t border-champagne/10 pt-4">
            <LanguageSwitcher locale={locale} />
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="rounded-full bg-champagne px-5 py-2.5 font-sans text-sm font-medium text-noir"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
