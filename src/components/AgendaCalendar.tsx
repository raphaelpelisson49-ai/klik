import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

const TOTAL_DIAS = 28;
const STEP = 0.11; // segundos entre cada día — crea el efecto de ola al rellenarse

function getDaySlots(index: number) {
  const dow = index % 7;
  if (dow === 6) return 0; // domingo, cerrado
  if (dow === 5) return index % 14 === 5 ? 1 : 0; // sábados alternos
  return (index + 2) % 3 === 0 ? 2 : 1;
}

export function AgendaCalendar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const days = Array.from({ length: TOTAL_DIAS }, (_, i) => i);

  return (
    <div className="rounded-2xl border border-champagne/15 bg-grafito p-5 sm:p-7">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-piedra">
          {t.agenda.label}
        </span>
        <span className="flex items-center gap-1.5 font-sans text-xs text-piedra">
          <span className="h-1.5 w-1.5 rounded-full bg-champagne" aria-hidden />
          {t.agenda.badge}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center font-sans text-[11px] uppercase tracking-wide text-piedra sm:gap-2">
        {t.agenda.days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2" aria-hidden>
        {days.map((i) => {
          const slots = getDaySlots(i);
          const delay = i * STEP;
          return (
            <div
              key={i}
              className="klik-day flex h-11 flex-col gap-1 rounded-md border bg-noir/40 p-1 sm:h-14 sm:p-1.5"
              style={{ animationDelay: `${delay}s` }}
            >
              <span className="font-sans text-[9px] leading-none text-piedra sm:text-[10px]">
                {i + 1}
              </span>
              <span className="flex flex-1 flex-col justify-end gap-0.5">
                {Array.from({ length: slots }, (_, s) => (
                  <span
                    key={s}
                    className="klik-chip h-1.5 rounded-full bg-champagne/80 sm:h-2"
                    style={{ animationDelay: `${delay + s * 0.05}s` }}
                  />
                ))}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-center font-serif text-sm italic text-piedra sm:text-base">
        {t.agenda.footer}
      </p>
    </div>
  );
}
