import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { HTML_LANG, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // El contenido sale de nuestros diccionarios, no de entrada del usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * Organization + WebSite, mínimo y honesto: solo incluye datos que son ciertos
 * hoy (nombre, URL, email, descripción, idiomas). No inventa dirección, teléfono
 * ni perfiles sociales — añádelos aquí en cuanto existan de verdad.
 */
export function OrganizationSchema({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const orgId = `${SITE_URL}/#organization`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": orgId,
            name: SITE_NAME,
            url: `${SITE_URL}/${locale}`,
            logo: `${SITE_URL}/apple-icon`,
            description: t.meta.description,
            email: "klikia@klikagencies.com",
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: HTML_LANG[locale],
            publisher: { "@id": orgId },
          },
        ],
      }}
    />
  );
}

/** Preguntas frecuentes de la home como FAQPage (las mismas que se ven en la página). */
export function FaqSchema({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: HTML_LANG[locale],
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}
