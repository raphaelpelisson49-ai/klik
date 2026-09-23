import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/LegalShell";
import { isLocale, LOCALES, type Locale } from "@/i18n/locales";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const META: Record<Locale, { title: string; description: string }> = {
  es: { title: "Política de privacidad | klik", description: "Cómo trata klik los datos personales de quienes visitan y contactan a través de este sitio." },
  fr: { title: "Politique de confidentialité | klik", description: "Comment klik traite les données personnelles des personnes qui visitent le site et nous contactent." },
  en: { title: "Privacy policy | klik", description: "How klik handles the personal data of people who visit and contact us through this site." },
};

const TITLE: Record<Locale, string> = {
  es: "Política de privacidad",
  fr: "Politique de confidentialité",
  en: "Privacy policy",
};

const UPDATED: Record<Locale, string> = {
  es: "septiembre de 2026",
  fr: "septembre 2026",
  en: "September 2026",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacidad">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, path: "/privacidad", ...META[locale] });
}

function ContentEs() {
  return (
    <>
      <p>
        En klik tratamos los datos personales conforme al Reglamento (UE)
        2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos
        Personales y garantía de los derechos digitales (LOPDGDD). Esta
        página explica qué datos recogemos a través de este sitio, para qué
        los usamos y qué derechos tienes.
      </p>

      <section>
        <h2>1. Responsable del tratamiento</h2>
        <ul>
          <li><strong>Titular:</strong> [Nombre completo o razón social de klik]</li>
          <li><strong>NIF/CIF:</strong> [Pendiente de completar]</li>
          <li><strong>Domicilio:</strong> [Pendiente de completar]</li>
          <li><strong>Contacto para privacidad:</strong> klikia@klikagencies.com</li>
        </ul>
      </section>

      <section>
        <h2>2. Qué datos tratamos y de dónde vienen</h2>
        <p>Este sitio recoge datos personales únicamente cuando tú decides facilitarlos, a través de:</p>
        <ul>
          <li>El botón de contacto por correo electrónico (&ldquo;Escríbeme: klikia@klikagencies.com&rdquo;), que abre tu propio gestor de correo.</li>
          <li>El diagnóstico interactivo y la calculadora de impacto, si decides enviar su resultado por correo.</li>
        </ul>
        <p>
          <strong>Importante:</strong> el diagnóstico interactivo y la
          calculadora de impacto se ejecutan enteramente en tu navegador. El
          texto que escribes en ellos no se envía a ningún servidor ni se
          almacena en ninguna base de datos de klik — solo se comparte con
          nosotros si tú, de forma expresa, pulsas el botón que abre un correo
          electrónico prerrellenado y decides enviarlo.
        </p>
        <p>
          Si nos escribes por correo, trataremos los datos que incluyas
          voluntariamente en ese mensaje: normalmente tu nombre, tu dirección
          de correo electrónico y la información sobre tu negocio que decidas
          compartir.
        </p>
      </section>

      <section>
        <h2>3. Finalidad del tratamiento</h2>
        <ul>
          <li>Responder a tus consultas y gestionar la relación comercial previa a la contratación de nuestros servicios.</li>
          <li>Elaborar, si procede, una propuesta o diagnóstico personalizado para tu negocio.</li>
        </ul>
      </section>

      <section>
        <h2>4. Legitimación</h2>
        <p>
          La base legal para el tratamiento de tus datos es tu consentimiento,
          manifestado al enviarnos voluntariamente un mensaje o correo
          electrónico a través del sitio.
        </p>
      </section>

      <section>
        <h2>5. Destinatarios y encargados del tratamiento</h2>
        <p>
          No cedemos tus datos a terceros, salvo obligación legal. Podemos
          apoyarnos en proveedores tecnológicos (por ejemplo, de hosting o de
          correo electrónico) que actúan como encargados del tratamiento bajo
          contrato, con las garantías exigidas por el RGPD.
        </p>
      </section>

      <section>
        <h2>6. Plazo de conservación</h2>
        <p>
          Conservamos los datos de tus consultas mientras dure la relación
          precontractual o comercial, y posteriormente durante los plazos
          legalmente exigibles para atender eventuales responsabilidades.
        </p>
      </section>

      <section>
        <h2>7. Tus derechos</h2>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso,
          rectificación, supresión, oposición, limitación del tratamiento y
          portabilidad de tus datos, escribiendo a{" "}
          <a href="mailto:klikia@klikagencies.com">klikia@klikagencies.com</a>. También
          tienes derecho a presentar una reclamación ante la Agencia Española
          de Protección de Datos (AEPD) si consideras que el tratamiento de
          tus datos no se ajusta a la normativa vigente.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          Este sitio, a día de hoy, no utiliza cookies propias ni de terceros
          con fines analíticos o publicitarios. Más detalles en nuestra{" "}
          <a href="../cookies">política de cookies</a>.
        </p>
      </section>
    </>
  );
}

function ContentFr() {
  return (
    <>
      <p>
        Chez klik, nous traitons les données personnelles conformément au
        Règlement (UE) 2016/679 (RGPD) et à la loi espagnole organique 3/2018
        relative à la protection des données personnelles et à la garantie
        des droits numériques (LOPDGDD). Cette page explique quelles données
        nous collectons via ce site, à quelles fins et quels sont vos droits.
      </p>

      <section>
        <h2>1. Responsable du traitement</h2>
        <ul>
          <li><strong>Titulaire :</strong> [Nom complet ou raison sociale de klik]</li>
          <li><strong>Numéro fiscal (NIF/CIF) :</strong> [À compléter]</li>
          <li><strong>Adresse :</strong> [À compléter]</li>
          <li><strong>Contact confidentialité :</strong> klikia@klikagencies.com</li>
        </ul>
      </section>

      <section>
        <h2>2. Quelles données nous traitons et d&apos;où elles viennent</h2>
        <p>Ce site ne recueille des données personnelles que si vous décidez de les fournir, via :</p>
        <ul>
          <li>Le bouton de contact par e-mail (&laquo; Écrivez-moi : klikia@klikagencies.com &raquo;), qui ouvre votre propre client de messagerie.</li>
          <li>Le diagnostic interactif et la calculatrice d&apos;impact, si vous décidez d&apos;envoyer leur résultat par e-mail.</li>
        </ul>
        <p>
          <strong>Important :</strong> le diagnostic interactif et la
          calculatrice d&apos;impact fonctionnent entièrement dans votre
          navigateur. Le texte que vous y saisissez n&apos;est envoyé à aucun
          serveur ni stocké dans une base de données de klik — il n&apos;est
          partagé avec nous que si vous cliquez expressément sur le bouton qui
          ouvre un e-mail pré-rempli et décidez de l&apos;envoyer.
        </p>
        <p>
          Si vous nous écrivez par e-mail, nous traiterons les données que
          vous incluez volontairement dans ce message : généralement votre
          nom, votre adresse e-mail et les informations sur votre entreprise
          que vous choisissez de partager.
        </p>
      </section>

      <section>
        <h2>3. Finalité du traitement</h2>
        <ul>
          <li>Répondre à vos demandes et gérer la relation commerciale préalable à la souscription de nos services.</li>
          <li>Élaborer, le cas échéant, une proposition ou un diagnostic personnalisé pour votre entreprise.</li>
        </ul>
      </section>

      <section>
        <h2>4. Base légale</h2>
        <p>
          La base légale du traitement de vos données est votre consentement,
          manifesté en nous envoyant volontairement un message ou un e-mail
          via le site.
        </p>
      </section>

      <section>
        <h2>5. Destinataires et sous-traitants</h2>
        <p>
          Nous ne cédons pas vos données à des tiers, sauf obligation légale.
          Nous pouvons faire appel à des prestataires techniques (par exemple
          d&apos;hébergement ou de messagerie) agissant comme sous-traitants sous
          contrat, avec les garanties exigées par le RGPD.
        </p>
      </section>

      <section>
        <h2>6. Durée de conservation</h2>
        <p>
          Nous conservons les données de vos demandes pendant la durée de la
          relation précontractuelle ou commerciale, puis pendant les délais
          légalement exigibles pour répondre à d&apos;éventuelles
          responsabilités.
        </p>
      </section>

      <section>
        <h2>7. Vos droits</h2>
        <p>
          Vous pouvez exercer à tout moment vos droits d&apos;accès, de
          rectification, de suppression, d&apos;opposition, de limitation du
          traitement et de portabilité de vos données, en écrivant à{" "}
          <a href="mailto:klikia@klikagencies.com">klikia@klikagencies.com</a>. Vous avez
          également le droit de déposer une réclamation auprès de l&apos;Agence
          espagnole de protection des données (AEPD) si vous estimez que le
          traitement de vos données n&apos;est pas conforme à la réglementation
          en vigueur.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          Ce site, à ce jour, n&apos;utilise aucun cookie propre ni tiers à des
          fins analytiques ou publicitaires. Plus de détails dans notre{" "}
          <a href="../cookies">politique de cookies</a>.
        </p>
      </section>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <p>
        At klik, we process personal data in accordance with Regulation (EU)
        2016/679 (GDPR) and Spanish Organic Law 3/2018 on the Protection of
        Personal Data and the guarantee of digital rights (LOPDGDD). This page
        explains what data we collect through this site, what we use it for,
        and what rights you have.
      </p>

      <section>
        <h2>1. Data controller</h2>
        <ul>
          <li><strong>Owner:</strong> [Full legal name or company name of klik]</li>
          <li><strong>Tax ID (NIF/CIF):</strong> [Pending]</li>
          <li><strong>Registered address:</strong> [Pending]</li>
          <li><strong>Privacy contact:</strong> klikia@klikagencies.com</li>
        </ul>
      </section>

      <section>
        <h2>2. What data we process and where it comes from</h2>
        <p>This site only collects personal data when you decide to provide it, through:</p>
        <ul>
          <li>The email contact button (&ldquo;Email me: klikia@klikagencies.com&rdquo;), which opens your own email client.</li>
          <li>The interactive diagnostic tool and the impact calculator, if you decide to send the result by email.</li>
        </ul>
        <p>
          <strong>Important:</strong> the interactive diagnostic tool and the
          impact calculator run entirely in your browser. The text you type
          into them is not sent to any server or stored in any klik database
          — it is only shared with us if you expressly click the button that
          opens a pre-filled email and decide to send it.
        </p>
        <p>
          If you write to us by email, we will process the data you
          voluntarily include in that message: typically your name, your
          email address, and any information about your business you choose
          to share.
        </p>
      </section>

      <section>
        <h2>3. Purpose of processing</h2>
        <ul>
          <li>Responding to your enquiries and managing the pre-contractual commercial relationship prior to hiring our services.</li>
          <li>Preparing, where applicable, a personalized proposal or diagnosis for your business.</li>
        </ul>
      </section>

      <section>
        <h2>4. Legal basis</h2>
        <p>
          The legal basis for processing your data is your consent, given by
          voluntarily sending us a message or email through the site.
        </p>
      </section>

      <section>
        <h2>5. Recipients and processors</h2>
        <p>
          We do not share your data with third parties, except where legally
          required. We may rely on technology providers (for example, hosting
          or email providers) acting as data processors under contract, with
          the guarantees required by the GDPR.
        </p>
      </section>

      <section>
        <h2>6. Retention period</h2>
        <p>
          We retain the data from your enquiries for as long as the
          pre-contractual or commercial relationship lasts, and afterwards for
          the periods legally required to address any potential liabilities.
        </p>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>
          You can exercise your rights of access, rectification, erasure,
          objection, restriction of processing, and data portability at any
          time by writing to{" "}
          <a href="mailto:klikia@klikagencies.com">klikia@klikagencies.com</a>. You also
          have the right to file a complaint with the Spanish Data Protection
          Agency (AEPD) if you believe the processing of your data does not
          comply with current regulations.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          As of today, this site does not use any first-party or third-party
          cookies for analytics or advertising purposes. More details in our{" "}
          <a href="../cookies">cookie policy</a>.
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

export default async function PrivacidadPage({ params }: PageProps<"/[locale]/privacidad">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const Content = CONTENT[locale];

  return (
    <LegalShell locale={locale} title={TITLE[locale]} updated={UPDATED[locale]}>
      <Content />
    </LegalShell>
  );
}
