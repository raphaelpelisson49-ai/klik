import { SITE_URL, SITE_NAME } from "@/lib/seo";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";

/**
 * Organization schema mínimo y honesto: solo incluye datos que son ciertos
 * hoy (nombre, URL, email, descripción). No inventa dirección, teléfono ni
 * perfiles sociales — añádelos aquí en cuanto existan de verdad.
 */
export function OrganizationSchema({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/apple-icon`,
    description: t.meta.description,
    email: "klikia@klikagencies.com",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
