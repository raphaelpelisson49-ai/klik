import { SITE_URL, SITE_NAME } from "@/lib/seo";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";

/**
 * Organization schema mínimo y honesto: solo incluye datos que son ciertos
 * hoy (nombre, URL, email, descripción). No incluye dirección (el negocio no la muestra
 * públicamente) ni perfiles sociales — añádelos aquí con sameAs si se quiere.
 */
export function OrganizationSchema({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const json = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/apple-icon`,
    description: t.meta.description,
    email: "klikia@klikagencies.com",
    telephone: "+33745569642",
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "España" },
    ],
    serviceType: [
      "Acquisition de clients",
      "Récupération de rendez-vous perdus",
      "Avis clients et réputation Google",
      "Création de site web et fiche Google",
    ],
    audience: {
      "@type": "BusinessAudience",
      name: "PME techniques : climatisation, plomberie, électricité",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
