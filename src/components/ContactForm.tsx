"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

const EMAIL = "klikia@klikagencies.com";
const WORKING_DAYS = 10; // días laborables que se ofrecen para la llamada

type Field = "nombre" | "contacto" | "privacidad";
type Errors = Partial<Record<Field, string>>;

const noopSubscribe = () => () => {};

/** Próximos días laborables a partir de mañana (se calculan en el navegador: la página es estática). */
function nextWorkingDays(count: number) {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
  }
  return days;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-left font-sans text-sm transition-colors duration-200 ${
        selected
          ? "border-ivoire bg-ivoire text-noir"
          : "border-ivoire/15 bg-grafito text-ivoire/80 hover:border-champagne/60"
      }`}
    >
      <span
        aria-hidden
        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border ${
          selected ? "border-champagne bg-champagne" : "border-ivoire/30"
        }`}
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-noir" />}
      </span>
      {children}
    </button>
  );
}

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0 border-t border-ivoire/10 pt-8">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-baseline gap-4" aria-hidden>
        <span className="font-serif text-3xl italic text-champagne">{String(n).padStart(2, "0")}</span>
        <span className="font-serif text-2xl font-semibold text-ivoire">{title}</span>
      </div>
      <div className="mt-6 space-y-7">{children}</div>
    </fieldset>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-piedra">{children}</p>;
}

/**
 * Formulario de contacto en 4 bloques con una "ficha de cita" al lado que se va
 * rellenando en directo. Al enviar abre el correo del visitante con todo redactado
 * para klikia@klikagencies.com (no hay servidor de envío todavía).
 */
export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.contacto;
  const problemas = dict.diagnostic.chips;
  const dateLocale = dict.calculators.numberLocale;

  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const days = mounted ? nextWorkingDays(WORKING_DAYS) : [];
  const fmtWeekday = new Intl.DateTimeFormat(dateLocale, { weekday: "short" });
  const fmtLong = new Intl.DateTimeFormat(dateLocale, { weekday: "long", day: "numeric", month: "long" });

  const [oficio, setOficio] = useState<string | null>(null);
  const [equipo, setEquipo] = useState<string | null>(null);
  const [marcados, setMarcados] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [dia, setDia] = useState<number | null>(null);
  const [franja, setFranja] = useState<string | null>(null);
  const [canal, setCanal] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [privacidad, setPrivacidad] = useState(false);
  const [submitted, setSubmitted] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // Los errores solo se muestran tras intentar enviar y desaparecen en cuanto se corrigen
  const errors: Errors = {
    nombre: submitted.nombre && !nombre.trim() ? submitted.nombre : undefined,
    contacto: submitted.contacto && !telefono.trim() && !email.trim() ? submitted.contacto : undefined,
    privacidad: submitted.privacidad && !privacidad ? submitted.privacidad : undefined,
  };

  const diaTexto = dia !== null ? capitalize(fmtLong.format(new Date(dia))) : "";
  const cuando = [diaTexto, franja, canal && `${t.ticket.via} ${canal}`].filter(Boolean).join(" · ");
  const problemaTexto = [...marcados, mensaje.trim() && `«${mensaje.trim().slice(0, 90)}${mensaje.trim().length > 90 ? "…" : ""}»`]
    .filter(Boolean)
    .join(" · ");

  const rows = [
    { label: t.ticket.negocio, value: [empresa.trim(), oficio, equipo].filter(Boolean).join(" · ") },
    { label: t.ticket.problema, value: problemaTexto },
    { label: t.ticket.cuando, value: cuando },
    { label: t.ticket.contacto, value: [nombre.trim(), telefono.trim(), email.trim()].filter(Boolean).join(" · ") },
  ];

  const checks = [
    oficio,
    equipo,
    marcados.length > 0 || mensaje.trim(),
    dia,
    franja,
    canal,
    nombre.trim(),
    telefono.trim() || email.trim(),
  ];
  const percent = Math.round((checks.filter(Boolean).length / checks.length) * 100);
  const complete = percent === 100 && privacidad;

  function toggleProblema(p: string) {
    setMarcados((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    if (!nombre.trim()) next.nombre = t.errors.nombre;
    if (!telefono.trim() && !email.trim()) next.contacto = t.errors.contacto;
    if (!privacidad) next.privacidad = t.errors.privacidad;
    setSubmitted(next);

    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      document.getElementById(`contacto-${first}`)?.focus();
      return;
    }

    const m = t.mail;
    const lines = [
      m.greeting,
      "",
      m.intro,
      "",
      `${m.negocio} ${[empresa.trim(), oficio].filter(Boolean).join(" · ") || "—"}`,
      `${m.equipo} ${equipo ?? "—"}`,
      "",
      m.problemas,
      ...(marcados.length ? marcados.map((p) => `- ${p}`) : ["—"]),
      ...(mensaje.trim() ? ["", m.mensaje, mensaje.trim()] : []),
      "",
      `${m.cuando} ${cuando || "—"}`,
      "",
      m.contacto,
      ...[nombre.trim(), empresa.trim(), telefono.trim(), email.trim()].filter(Boolean),
      "",
      m.closing,
    ];
    const subject = empresa.trim() ? `${m.subject} · ${empresa.trim()}` : m.subject;
    window.location.assign(`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`);
    setSent(true);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
      <form onSubmit={handleSubmit} className="min-w-0 space-y-12" noValidate>
        <Block n={1} title={t.steps[0]}>
          <div>
            <GroupLabel>{t.oficioLabel}</GroupLabel>
            <div className="flex flex-wrap gap-2">
              {t.oficios.map((o) => (
                <Choice key={o} selected={oficio === o} onClick={() => setOficio(oficio === o ? null : o)}>
                  {o}
                </Choice>
              ))}
            </div>
          </div>
          <div>
            <GroupLabel>{t.equipoLabel}</GroupLabel>
            <div className="flex flex-wrap gap-2">
              {t.equipos.map((o) => (
                <Choice key={o} selected={equipo === o} onClick={() => setEquipo(equipo === o ? null : o)}>
                  {o}
                </Choice>
              ))}
            </div>
          </div>
        </Block>

        <Block n={2} title={t.steps[1]}>
          <div>
            <GroupLabel>{t.problemaLabel}</GroupLabel>
            <div className="flex flex-wrap gap-2">
              {problemas.map((p) => (
                <Choice key={p} selected={marcados.includes(p)} onClick={() => toggleProblema(p)}>
                  {p}
                </Choice>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="flex items-baseline justify-between font-sans text-xs font-semibold uppercase tracking-[0.12em] text-piedra">
              {t.mensajeLabel}
              <span className="font-normal normal-case tracking-normal">{t.optional}</span>
            </span>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder={t.mensajePlaceholder}
              rows={3}
              className="klik-field mt-1"
            />
          </label>
        </Block>

        <Block n={3} title={t.steps[2]}>
          <div>
            <GroupLabel>{t.diaLabel}</GroupLabel>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {mounted
                ? days.map((d) => {
                    const time = d.getTime();
                    const selected = dia === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        aria-pressed={selected}
                        aria-label={capitalize(fmtLong.format(d))}
                        onClick={() => setDia(selected ? null : time)}
                        className={`flex w-[4.25rem] shrink-0 cursor-pointer flex-col items-center rounded-xl border py-3 transition-colors duration-200 ${
                          selected
                            ? "border-ivoire bg-ivoire text-noir"
                            : "border-ivoire/15 bg-grafito text-ivoire hover:border-champagne/60"
                        }`}
                      >
                        <span className={`font-sans text-[11px] uppercase tracking-wide ${selected ? "text-noir/70" : "text-piedra"}`}>
                          {fmtWeekday.format(d).replace(".", "")}
                        </span>
                        <span className="mt-1 font-serif text-2xl leading-none">{d.getDate()}</span>
                      </button>
                    );
                  })
                : Array.from({ length: WORKING_DAYS }, (_, i) => (
                    <span key={i} className="h-[4.6rem] w-[4.25rem] shrink-0 rounded-xl border border-ivoire/10 bg-grafito" />
                  ))}
            </div>
          </div>
          <div>
            <GroupLabel>{t.franjaLabel}</GroupLabel>
            <div className="flex flex-wrap gap-2">
              {t.franjas.map((o) => (
                <Choice key={o} selected={franja === o} onClick={() => setFranja(franja === o ? null : o)}>
                  {o}
                </Choice>
              ))}
            </div>
          </div>
          <div>
            <GroupLabel>{t.canalLabel}</GroupLabel>
            <div className="flex flex-wrap gap-2">
              {t.canales.map((o) => (
                <Choice key={o} selected={canal === o} onClick={() => setCanal(canal === o ? null : o)}>
                  {o}
                </Choice>
              ))}
            </div>
          </div>
        </Block>

        <Block n={4} title={t.steps[3]}>
          <div className="grid gap-7 sm:grid-cols-2">
            <label className="block">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-piedra">{t.nombreLabel}</span>
              <input
                id="contacto-nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder={t.nombrePlaceholder}
                autoComplete="name"
                aria-invalid={Boolean(errors.nombre)}
                aria-describedby={errors.nombre ? "error-nombre" : undefined}
                className="klik-field mt-1"
              />
              {errors.nombre && (
                <span id="error-nombre" role="alert" className="mt-2 block font-sans text-xs font-medium text-champagne">
                  {errors.nombre}
                </span>
              )}
            </label>
            <label className="block">
              <span className="flex items-baseline justify-between font-sans text-xs font-semibold uppercase tracking-[0.12em] text-piedra">
                {t.empresaLabel}
                <span className="font-normal normal-case tracking-normal">{t.optional}</span>
              </span>
              <input
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder={t.empresaPlaceholder}
                autoComplete="organization"
                className="klik-field mt-1"
              />
            </label>
            <label className="block">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-piedra">{t.telefonoLabel}</span>
              <input
                id="contacto-contacto"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder={t.telefonoPlaceholder}
                autoComplete="tel"
                aria-invalid={Boolean(errors.contacto)}
                aria-describedby="contacto-hint"
                className="klik-field mt-1"
              />
            </label>
            <label className="block">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-piedra">{t.emailLabel}</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                autoComplete="email"
                aria-invalid={Boolean(errors.contacto)}
                aria-describedby="contacto-hint"
                className="klik-field mt-1"
              />
            </label>
          </div>
          <p id="contacto-hint" className={`font-sans text-xs ${errors.contacto ? "font-medium text-champagne" : "text-piedra"}`} role={errors.contacto ? "alert" : undefined}>
            {errors.contacto ?? t.contactHint}
          </p>

          <div>
            <label className="flex cursor-pointer items-start gap-3 font-sans text-sm leading-relaxed text-ivoire/80">
              <input
                id="contacto-privacidad"
                type="checkbox"
                checked={privacidad}
                onChange={(e) => setPrivacidad(e.target.checked)}
                aria-invalid={Boolean(errors.privacidad)}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-ivoire"
              />
              <span>
                {t.privacyBefore}{" "}
                <Link href={`/${locale}/privacidad`} className="underline decoration-champagne/50 underline-offset-4 hover:text-champagne">
                  {t.privacyLink}
                </Link>
                {t.privacyAfter}
              </span>
            </label>
            {errors.privacidad && (
              <span role="alert" className="mt-2 block font-sans text-xs font-medium text-champagne">
                {errors.privacidad}
              </span>
            )}
          </div>
        </Block>

        <div className="space-y-5">
          <button
            type="submit"
            className="klik-dark klik-canvas group flex w-full cursor-pointer items-center justify-between gap-10 rounded-full py-3 pl-8 pr-3 font-sans text-base font-medium text-ivoire shadow-[0_18px_40px_-20px_rgb(2_10_28/0.7)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            {t.submit}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne text-noir transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </button>
          {sent && (
            <div role="status" className="klik-result-in rounded-2xl border border-champagne/30 bg-grafito p-5">
              <p className="font-serif text-lg font-semibold text-ivoire">{t.sentTitle}</p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-ivoire/75">
                {t.sentBody}{" "}
                <a href={`mailto:${EMAIL}`} className="font-medium text-champagne underline underline-offset-4">
                  {EMAIL}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </form>

      {/* Ficha de cita: se rellena en directo con lo que el visitante va eligiendo */}
      <aside className="min-w-0 lg:sticky lg:top-28">
        <div className="klik-dark klik-canvas relative overflow-hidden rounded-[1.75rem] p-7 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-piedra">{t.ticket.label}</span>
          </div>

          <dl className="mt-8 space-y-5">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-piedra">{r.label}</dt>
                <dd
                  key={r.value ? "on" : "off"}
                  className={`klik-result-in mt-1 break-words font-serif text-lg leading-snug ${r.value ? "text-ivoire" : "text-ivoire/25"}`}
                >
                  {r.value || "—"}
                </dd>
              </div>
            ))}
          </dl>

          <div className="klik-ticket-cut relative -mx-7 my-7 sm:-mx-8" aria-hidden />

          <div aria-live="polite">
            <div className="flex items-baseline justify-between font-sans text-xs">
              <span className={complete ? "text-champagne" : "text-piedra"}>
                {t.ticket.progress.replace("{{n}}", String(percent))}
              </span>
              <span className="tabular-nums text-ivoire/60">{percent}%</span>
            </div>
            <div className="mt-2 h-px w-full bg-champagne/20">
              <div
                className="h-full origin-left bg-champagne transition-transform duration-500 ease-out"
                style={{ transform: `scaleX(${percent / 100})` }}
              />
            </div>
          </div>
          <p className="mt-5 font-serif text-sm italic text-piedra">{t.ticket.footer}</p>

          {complete && (
            <div className="mt-5 flex justify-end">
              <span className="klik-stamp">{t.ticket.stamp}</span>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
