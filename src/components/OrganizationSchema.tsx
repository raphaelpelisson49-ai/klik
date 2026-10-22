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
 * hoy. No incluye dirección (el negocio no la muestra públicamente). Perfiles
 * sociales: Instagram de la marca en sameAs; LinkedIn personal del fundador.
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
            "@type": ["Organization", "ProfessionalService"],
            "@id": orgId,
            name: SITE_NAME,
            url: `${SITE_URL}/${locale}`,
            logo: `${SITE_URL}/apple-icon`,
            description: t.meta.description,
            email: "klikia@klikagencies.com",
            telephone: "+33745569642",
            sameAs: ["https://www.instagram.com/klikagencies/"],
            founder: {
              "@type": "Person",
              name: "Raphaël Pelisson",
              sameAs: ["https://www.linkedin.com/in/raphael-pelisson/"],
            },
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
