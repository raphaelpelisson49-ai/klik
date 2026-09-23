"use client";

import { useState } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

type Diagnosis = {
  tag: string;
  headline: string;
  body: string;
  teaser: string;
};

type Category = Diagnosis & { keywords: string[] };

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function matchCategory(text: string, categories: Category[], fallback: Diagnosis): Diagnosis {
  const normalized = normalize(text);

  let best: Category | null = null;
  let bestScore = 0;

  for (const category of categories) {
    const score = category.keywords.reduce((acc, kw) => {
      return acc + (normalized.includes(normalize(kw)) ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      best = category;
    }
  }

  return best ?? fallback;
}

export function ProblemDiagnostic({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).diagnostic;
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<Diagnosis | null>(null);

  function addChip(chip: string) {
    setText((prev) => (prev.trim().length ? `${prev.trim()}. ${chip}` : chip));
  }

  function analyze() {
    if (!text.trim() || status === "loading") return;
    setStatus("loading");
    setResult(null);
    window.setTimeout(() => {
      setResult(matchCategory(text, t.categories, t.fallback));
      setStatus("done");
    }, 1100);
  }

  const mailBody = result
    ? `${t.mail.greeting}\n\n${t.mail.intro.replace("{{tag}}", result.tag)}\n\n${t.mail.yourWords}\n${text}\n\n${t.mail.closing}`
    : "";
  const mailHref = `mailto:klikia@klikagencies.com?subject=${encodeURIComponent(
    `${t.mail.subjectPrefix} ${result?.tag ?? ""}`
  )}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="rounded-3xl border border-champagne/15 bg-grafito p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <label htmlFor="problema" className="font-sans text-sm font-medium text-ivoire">
            {t.question}
          </label>
          <textarea
            id="problema"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder={t.placeholder}
            className="mt-3 w-full resize-none rounded-xl border border-champagne/15 bg-noir p-4 font-sans text-sm text-ivoire placeholder:text-piedra focus:border-champagne/50 focus:outline-none"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {t.chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => addChip(chip)}
                className="rounded-full border border-champagne/15 bg-noir px-3.5 py-1.5 font-sans text-xs text-ivoire/75 transition-colors hover:border-champagne/40 hover:text-champagne"
              >
                {chip}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={analyze}
            disabled={!text.trim() || status === "loading"}
            className="mt-6 w-full rounded-full bg-champagne px-7 py-3 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {status === "loading" ? t.loadingButton : t.analyzeButton}
          </button>
          <p className="mt-3 font-sans text-xs leading-relaxed text-piedra">{t.disclaimer}</p>
        </div>

        <div aria-live="polite" className="min-h-[220px]">
          {status === "idle" && (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-champagne/15 p-8 text-center">
              <span className="font-serif text-2xl italic text-piedra">{t.idleTitle}</span>
              <p className="mt-2 font-sans text-sm text-piedra/80">{t.idleSubtitle}</p>
            </div>
          )}

          {status === "loading" && (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl border border-champagne/15 p-8 text-center">
              <div className="klik-scan-track h-1 w-32 rounded-full bg-champagne/15" />
              <p className="font-sans text-sm text-piedra">
                {t.loadingText}
                <span className="klik-dot-1">.</span>
                <span className="klik-dot-2">.</span>
                <span className="klik-dot-3">.</span>
              </p>
            </div>
          )}

          {status === "done" && result && (
            <div className="klik-result-in rounded-2xl border border-champagne/25 bg-noir p-7">
              <span className="inline-block rounded-full bg-champagne/15 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wide text-champagne">
                {result.tag}
              </span>
              <h3 className="mt-4 font-serif text-xl italic leading-snug text-ivoire sm:text-2xl">
                {result.headline}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ivoire/75">{result.body}</p>
              <div className="mt-4 border-t border-champagne/10 pt-4">
                <p className="font-sans text-sm leading-relaxed text-piedra">{result.teaser}</p>
              </div>
              <a
                href={mailHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-2.5 font-sans text-sm font-medium text-noir transition-opacity hover:opacity-90"
              >
                {t.resultCta}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
