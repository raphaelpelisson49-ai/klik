import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/LegalShell";
import { isLocale, LOCALES, type Locale } from "@/i18n/locales";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const META: Record<Locale, { title: string; description: string }> = {
  es: { title: "Política de cookies | klik", description: "Qué cookies utiliza el sitio web de klik y cómo gestionarlas." },
  fr: { title: "Politique de cookies | klik", description: "Quels cookies utilise le site web de klik et comment les gérer." },
  en: { title: "Cookie policy | klik", description: "What cookies the klik website uses and how to manage them." },
};

const TITLE: Record<Locale, string> = {
  es: "Política de cookies",
  fr: "Politique de cookies",
  en: "Cookie policy",
};

const UPDATED: Record<Locale, string> = {
  es: "septiembre de 2026",
  fr: "septembre 2026",
  en: "September 2026",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cookies">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/cookies", ...META[locale] });
}

function ContentEs() {
  return (
    <>
      <p>
        Una cookie es un pequeño archivo que un sitio web puede guardar en tu
        navegador para recordar información sobre tu visita.
      </p>

      <section>
        <h2>1. Cookies que utiliza este sitio</h2>
        <p>
          <strong>Actualmente, este sitio no instala cookies propias ni de
          terceros</strong> con fines analíticos, publicitarios o de
          seguimiento. No usamos Google Analytics, píxeles de redes sociales
          ni ningún otro sistema de medición.
        </p>
        <p>
          Las herramientas interactivas del sitio (el diagnóstico de problemas
          y la calculadora de impacto) funcionan enteramente en tu navegador,
          sin guardar cookies ni enviar la información que escribes a ningún
          servidor.
        </p>
      </section>

      <section>
        <h2>2. Si eso cambia</h2>
        <p>
          Si en el futuro incorporamos herramientas de analítica, medición de
          campañas u otras cookies no esenciales, actualizaremos esta página y
          solicitaremos tu consentimiento antes de instalarlas, tal como exige
          la normativa francesa (Loi Informatique et Libertés) y europea (RGPD).
        </p>
      </section>

      <section>
        <h2>3. Cómo gestionar las cookies desde tu navegador</h2>
        <p>
          Aunque este sitio no instale cookies no esenciales, puedes revisar y
          eliminar en cualquier momento las cookies guardadas por cualquier
          página web desde el menú de configuración o privacidad de tu
          navegador (Chrome, Firefox, Safari, Edge u otro).
        </p>
      </section>
    </>
  );
}

function ContentFr() {
  return (
    <>
      <p>
        Un cookie est un petit fichier qu&apos;un site web peut enregistrer dans
        votre navigateur pour mémoriser des informations sur votre visite.
      </p>

      <section>
        <h2>1. Cookies utilisés par ce site</h2>
        <p>
          <strong>Ce site n&apos;installe actuellement aucun cookie propre ni
          tiers</strong> à des fins analytiques, publicitaires ou de suivi. Nous
          n&apos;utilisons ni Google Analytics, ni pixels de réseaux sociaux, ni
          aucun autre système de mesure.
        </p>
        <p>
          Les outils interactifs du site (le diagnostic de problèmes et la
          calculatrice d&apos;impact) fonctionnent entièrement dans votre
          navigateur, sans enregistrer de cookies ni envoyer les informations
          que vous saisissez à aucun serveur.
        </p>
      </section>

      <section>
        <h2>2. Si cela change</h2>
        <p>
          Si nous intégrons à l&apos;avenir des outils d&apos;analyse, de mesure de
          campagnes ou d&apos;autres cookies non essentiels, nous mettrons à jour
          cette page et demanderons votre consentement avant de les installer,
          comme l&apos;exigent la réglementation française (Loi Informatique et
          Libertés) et européenne (RGPD).
        </p>
      </section>

      <section>
        <h2>3. Comment gérer les cookies depuis votre navigateur</h2>
        <p>
          Bien que ce site n&apos;installe pas de cookies non essentiels, vous
          pouvez à tout moment consulter et supprimer les cookies enregistrés
          par n&apos;importe quel site web depuis le menu de paramètres ou de
          confidentialité de votre navigateur (Chrome, Firefox, Safari, Edge
          ou autre).
        </p>
      </section>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <p>
        A cookie is a small file that a website can save in your browser to
        remember information about your visit.
      </p>

      <section>
        <h2>1. Cookies used by this site</h2>
        <p>
          <strong>This site does not currently install any first-party or
          third-party cookies</strong> for analytics, advertising, or tracking
          purposes. We don&apos;t use Google Analytics, social media pixels, or
          any other measurement system.
        </p>
        <p>
          The site&apos;s interactive tools (the problem diagnosis and the impact
          calculator) run entirely in your browser, without storing cookies or
          sending the information you type to any server.
        </p>
      </section>

      <section>
        <h2>2. If that changes</h2>
        <p>
          If we add analytics tools, campaign measurement, or other
          non-essential cookies in the future, we will update this page and
          ask for your consent before installing them, as required by French
          (Loi Informatique et Libertés) and European (GDPR) regulations.
        </p>
      </section>

      <section>
        <h2>3. How to manage cookies from your browser</h2>
        <p>
          Even though this site doesn&apos;t install non-essential cookies, you
          can review and delete, at any time, the cookies stored by any
          website from your browser&apos;s settings or privacy menu (Chrome,
          Firefox, Safari, Edge, or another browser).
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

export default async function CookiesPage({ params }: PageProps<"/[locale]/cookies">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const Content = CONTENT[locale];

  return (
    <LegalShell locale={locale} title={TITLE[locale]} updated={UPDATED[locale]}>
      <Content />
    </LegalShell>
  );
}
