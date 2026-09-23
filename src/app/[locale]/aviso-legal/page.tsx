import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/LegalShell";
import { isLocale, LOCALES, type Locale } from "@/i18n/locales";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const META: Record<Locale, { title: string; description: string }> = {
  es: { title: "Aviso legal | klik", description: "Aviso legal y condiciones de uso del sitio web de klik." },
  fr: { title: "Mentions légales | klik", description: "Mentions légales et conditions d'utilisation du site web de klik." },
  en: { title: "Legal notice | klik", description: "Legal notice and terms of use for the klik website." },
};

const TITLE: Record<Locale, string> = {
  es: "Aviso legal",
  fr: "Mentions légales",
  en: "Legal notice",
};

const UPDATED: Record<Locale, string> = {
  es: "septiembre de 2026",
  fr: "septembre 2026",
  en: "September 2026",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/aviso-legal">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/aviso-legal", ...META[locale] });
}

function ContentEs() {
  return (
    <>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
        Servicios de la Sociedad de la Información y de Comercio Electrónico
        (LSSI-CE), se informa de los siguientes datos: este sitio web
        (en adelante, &ldquo;el sitio&rdquo;) es operado por:
      </p>

      <ul>
        <li><strong>Titular:</strong> [Nombre completo o razón social de klik]</li>
        <li><strong>NIF/CIF:</strong> [Pendiente de completar]</li>
        <li><strong>Domicilio:</strong> [Pendiente de completar]</li>
        <li><strong>Correo electrónico:</strong> klikia@klikagencies.com</li>
        <li><strong>Actividad:</strong> Servicios de marketing y captación de clientes asistidos por inteligencia artificial para pequeñas y medianas empresas técnicas.</li>
      </ul>

      <p className="text-xs text-piedra">
        Los campos marcados como pendientes deben completarse con los datos
        reales del titular antes de publicar este sitio en producción.
      </p>

      <section>
        <h2>1. Objeto</h2>
        <p>
          El presente aviso legal regula el acceso y uso del sitio web, del que
          es titular klik. La navegación por el sitio atribuye la condición de
          usuario e implica la aceptación plena de las condiciones aquí
          establecidas.
        </p>
      </section>

      <section>
        <h2>2. Condiciones de acceso y uso</h2>
        <p>
          El acceso al sitio es gratuito y no requiere registro previo, salvo
          para el envío voluntario de mensajes a través de los enlaces de
          contacto. El usuario se compromete a hacer un uso adecuado y lícito
          del sitio, de conformidad con la legislación aplicable, la buena fe,
          el orden público y el presente aviso legal, absteniéndose de
          utilizarlo de forma que pueda impedir, dañar o deteriorar el normal
          funcionamiento del sitio o de terceros.
        </p>
      </section>

      <section>
        <h2>3. Propiedad intelectual e industrial</h2>
        <p>
          Los textos, imágenes, diseño gráfico, código fuente, logotipos,
          marcas y demás elementos del sitio son titularidad de klik o de
          terceros que han autorizado su uso, y están protegidos por la
          normativa de propiedad intelectual e industrial. Queda prohibida su
          reproducción, distribución o transformación sin autorización expresa
          del titular, salvo en los casos permitidos por la ley.
        </p>
      </section>

      <section>
        <h2>4. Exclusión de responsabilidad</h2>
        <p>
          klik no garantiza la disponibilidad, continuidad ni infalibilidad del
          funcionamiento del sitio, ni la ausencia de virus u otros elementos
          nocivos, y no se hace responsable de los daños que pudieran derivarse
          de estas circunstancias. Las herramientas interactivas del sitio
          (como el diagnóstico de problemas o la calculadora de impacto)
          ofrecen resultados orientativos e ilustrativos, no un análisis
          profesional ni una previsión garantizada de resultados.
        </p>
        <p>
          El sitio puede contener enlaces a páginas de terceros. klik no asume
          responsabilidad alguna por el contenido, políticas o prácticas de
          dichos sitios.
        </p>
      </section>

      <section>
        <h2>5. Modificaciones</h2>
        <p>
          klik se reserva el derecho a modificar, sin previo aviso, el
          contenido del sitio y del presente aviso legal, así como su diseño y
          configuración.
        </p>
      </section>

      <section>
        <h2>6. Legislación aplicable y jurisdicción</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para
          la resolución de cualquier controversia que pudiera derivarse del
          acceso o uso del sitio, las partes se someten a los juzgados y
          tribunales que correspondan conforme a derecho.
        </p>
      </section>
    </>
  );
}

function ContentFr() {
  return (
    <>
      <p>
        Conformément à l&apos;article 10 de la loi espagnole 34/2002 du 11 juillet
        relative aux services de la société de l&apos;information et au commerce
        électronique (LSSI-CE), les informations suivantes sont communiquées :
        ce site web (ci-après, &laquo; le site &raquo;) est exploité par :
      </p>

      <ul>
        <li><strong>Titulaire :</strong> [Nom complet ou raison sociale de klik]</li>
        <li><strong>Numéro fiscal (NIF/CIF) :</strong> [À compléter]</li>
        <li><strong>Adresse :</strong> [À compléter]</li>
        <li><strong>E-mail :</strong> klikia@klikagencies.com</li>
        <li><strong>Activité :</strong> Services de marketing et d&apos;acquisition de clients assistés par intelligence artificielle pour les petites et moyennes entreprises techniques.</li>
      </ul>

      <p className="text-xs text-piedra">
        Les champs marqués comme à compléter doivent l&apos;être avec les données
        réelles du titulaire avant la mise en production de ce site.
      </p>

      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes mentions légales régissent l&apos;accès et l&apos;utilisation du
          site web, dont klik est le titulaire. La navigation sur le site
          confère la qualité d&apos;utilisateur et implique l&apos;acceptation pleine et
          entière des conditions établies ici.
        </p>
      </section>

      <section>
        <h2>2. Conditions d&apos;accès et d&apos;utilisation</h2>
        <p>
          L&apos;accès au site est gratuit et ne nécessite pas d&apos;inscription
          préalable, sauf pour l&apos;envoi volontaire de messages via les liens de
          contact. L&apos;utilisateur s&apos;engage à faire un usage adéquat et licite du
          site, conformément à la législation applicable, à la bonne foi, à
          l&apos;ordre public et aux présentes mentions légales, en s&apos;abstenant de
          l&apos;utiliser d&apos;une manière qui pourrait empêcher, endommager ou
          détériorer le fonctionnement normal du site ou de tiers.
        </p>
      </section>

      <section>
        <h2>3. Propriété intellectuelle et industrielle</h2>
        <p>
          Les textes, images, la conception graphique, le code source, les
          logos, les marques et les autres éléments du site appartiennent à
          klik ou à des tiers ayant autorisé leur utilisation, et sont protégés
          par la réglementation sur la propriété intellectuelle et
          industrielle. Leur reproduction, distribution ou transformation sans
          autorisation expresse du titulaire est interdite, sauf dans les cas
          permis par la loi.
        </p>
      </section>

      <section>
        <h2>4. Exclusion de responsabilité</h2>
        <p>
          klik ne garantit pas la disponibilité, la continuité ni
          l&apos;infaillibilité du fonctionnement du site, ni l&apos;absence de virus ou
          d&apos;autres éléments nuisibles, et décline toute responsabilité pour les
          dommages pouvant en résulter. Les outils interactifs du site (comme
          le diagnostic de problèmes ou la calculatrice d&apos;impact) fournissent
          des résultats indicatifs et illustratifs, et non une analyse
          professionnelle ni une prévision garantie de résultats.
        </p>
        <p>
          Le site peut contenir des liens vers des pages tierces. klik
          n&apos;assume aucune responsabilité quant au contenu, aux politiques ou
          aux pratiques de ces sites.
        </p>
      </section>

      <section>
        <h2>5. Modifications</h2>
        <p>
          klik se réserve le droit de modifier, sans préavis, le contenu du
          site et les présentes mentions légales, ainsi que leur conception et
          configuration.
        </p>
      </section>

      <section>
        <h2>6. Droit applicable et juridiction</h2>
        <p>
          Les présentes conditions sont régies par le droit espagnol. Pour la
          résolution de tout litige pouvant découler de l&apos;accès ou de
          l&apos;utilisation du site, les parties se soumettent aux tribunaux
          compétents conformément au droit.
        </p>
      </section>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <p>
        In compliance with Article 10 of Spanish Law 34/2002 of 11 July on
        Information Society Services and Electronic Commerce (LSSI-CE), the
        following information is provided: this website (hereinafter, &ldquo;the
        site&rdquo;) is operated by:
      </p>

      <ul>
        <li><strong>Owner:</strong> [Full legal name or company name of klik]</li>
        <li><strong>Tax ID (NIF/CIF):</strong> [Pending]</li>
        <li><strong>Registered address:</strong> [Pending]</li>
        <li><strong>Email:</strong> klikia@klikagencies.com</li>
        <li><strong>Activity:</strong> AI-assisted marketing and customer-acquisition services for technical small and medium-sized businesses.</li>
      </ul>

      <p className="text-xs text-piedra">
        The fields marked as pending must be completed with the owner&apos;s real
        details before this site goes live in production.
      </p>

      <section>
        <h2>1. Purpose</h2>
        <p>
          This legal notice governs access to and use of the website, owned by
          klik. Browsing the site grants the status of user and implies full
          acceptance of the conditions set out here.
        </p>
      </section>

      <section>
        <h2>2. Conditions of access and use</h2>
        <p>
          Access to the site is free and does not require prior registration,
          except for voluntarily sending messages through the contact links.
          The user agrees to make appropriate and lawful use of the site, in
          accordance with applicable law, good faith, public order, and this
          legal notice, refraining from using it in a way that could prevent,
          damage, or impair the normal operation of the site or of third
          parties.
        </p>
      </section>

      <section>
        <h2>3. Intellectual and industrial property</h2>
        <p>
          The texts, images, graphic design, source code, logos, trademarks,
          and other elements of the site belong to klik or to third parties
          who have authorized their use, and are protected by intellectual and
          industrial property law. Their reproduction, distribution, or
          transformation without the express authorization of the owner is
          prohibited, except in cases permitted by law.
        </p>
      </section>

      <section>
        <h2>4. Disclaimer of liability</h2>
        <p>
          klik does not guarantee the availability, continuity, or
          infallibility of the site&apos;s operation, nor the absence of viruses or
          other harmful elements, and is not liable for any damage that may
          arise from these circumstances. The site&apos;s interactive tools (such
          as the problem diagnosis or the impact calculator) provide
          indicative and illustrative results, not a professional analysis or
          a guaranteed forecast of results.
        </p>
        <p>
          The site may contain links to third-party pages. klik assumes no
          responsibility for the content, policies, or practices of such
          sites.
        </p>
      </section>

      <section>
        <h2>5. Changes</h2>
        <p>
          klik reserves the right to modify, without prior notice, the content
          of the site and this legal notice, as well as its design and
          configuration.
        </p>
      </section>

      <section>
        <h2>6. Applicable law and jurisdiction</h2>
        <p>
          These conditions are governed by Spanish law. Any dispute arising
          from access to or use of the site shall be submitted to the courts
          and tribunals with jurisdiction under the law.
        </p>
      </section>
    </>
  );
}

const CONTENT: Record<Locale, () => React.JSX.Element> = {
  es: ContentEs,
  fr: ContentFr,
  en: ContentEn,
};

export default async function AvisoLegalPage({ params }: PageProps<"/[locale]/aviso-legal">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const Content = CONTENT[locale];

  return (
    <LegalShell locale={locale} title={TITLE[locale]} updated={UPDATED[locale]}>
      <Content />
    </LegalShell>
  );
}
