"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/locales";

/**
 * Google Analytics 4, cargado SOLO si la persona acepta. Sin consentimiento
 * no se descarga ningún script de Google ni se guarda ninguna cookie.
 * La elección se guarda en localStorage ("klik-consent").
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-LDN8XZEHVX";

const STORAGE_KEY = "klik-consent";
const CHANGE_EVENT = "klik-consent-change";

type Choice = "granted" | "denied" | null;

const TEXTS: Record<Locale, { text: string; accept: string; refuse: string; more: string }> = {
  fr: {
    text: "Nous utilisons Google Analytics pour mesurer l'audience du site, uniquement avec votre accord.",
    accept: "Accepter",
    refuse: "Refuser",
    more: "En savoir plus",
  },
  es: {
    text: "Usamos Google Analytics para medir las visitas del sitio, solo si nos das tu permiso.",
    accept: "Aceptar",
    refuse: "Rechazar",
    more: "Más información",
  },
  en: {
    text: "We use Google Analytics to measure site traffic, only with your consent.",
    accept: "Accept",
    refuse: "Decline",
    more: "Learn more",
  },
};

function readChoice(): Choice {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: "granted" | "denied" | "reset") {
  try {
    if (choice === "reset") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* sin almacenamiento: la elección solo vale para esta visita */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function Analytics({ locale }: { locale: Locale }) {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setChoice(readChoice());
      setReady(true);
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);

  const t = TEXTS[locale];

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {ready && choice === null && (
        <div
          role="dialog"
          aria-label="Cookies"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-champagne/20 bg-grafito p-5 shadow-2xl sm:p-6"
        >
          <p className="font-sans text-sm leading-relaxed text-ivoire/80">
            {t.text}{" "}
            <a href={`/${locale}/cookies`} className="text-champagne underline underline-offset-4">
              {t.more}
            </a>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => saveChoice("granted")}
              className="rounded-full bg-champagne px-5 py-2 font-sans text-sm font-medium text-noir transition hover:opacity-90"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => saveChoice("denied")}
              className="rounded-full border border-ivoire/25 px-5 py-2 font-sans text-sm font-medium text-ivoire transition hover:border-champagne hover:text-champagne"
            >
              {t.refuse}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Botón para volver a elegir (se usa en la página de cookies). */
export function CookieChoiceButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => saveChoice("reset")}
      className="rounded-full border border-champagne/40 px-5 py-2 font-sans text-sm font-medium text-champagne transition hover:bg-champagne/10"
    >
      {label}
    </button>
  );
}
