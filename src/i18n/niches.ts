import type { Locale } from "./locales";

export const NICHES = ["climatisation", "plomberie", "electricite"] as const;
export type Niche = (typeof NICHES)[number];

export type NicheContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  problemsTitle: string;
  problems: { title: string; text: string }[];
  helpTitle: string;
  help: { title: string; text: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  calculatorLink: string;
};

/** Sufijo de marca para los títulos: corto, para que Google no corte el título (~60 caracteres). */
const SUFFIX = "klik";

export const NICHE_FOOTER_LABEL: Record<Locale, Record<Niche, string>> = {
  fr: { climatisation: "Climatisation et CVC", plomberie: "Plomberie", electricite: "Électricité" },
  es: { climatisation: "Climatización", plomberie: "Fontanería", electricite: "Electricidad" },
  en: { climatisation: "HVAC and air conditioning", plomberie: "Plumbing", electricite: "Electrical" },
};

const fr: Record<Niche, NicheContent> = {
  climatisation: {
    metaTitle: `Marketing climatisation et CVC : plus de clients | ${SUFFIX}`,
    metaDescription:
      "klik aide les installateurs, dépanneurs et chauffagistes (climatisation, CVC) à trouver des clients en local : appels récupérés, avis Google, site et fiche Google.",
    eyebrow: "Climatisation et CVC",
    h1: "Plus de clients pour votre entreprise de climatisation et de CVC",
    intro:
      "Installation, entretien, dépannage : quand quelqu'un cherche un installateur de climatisation ou un chauffagiste près de chez lui, c'est souvent la première entreprise qui répond qui décroche le chantier. On met en place ce qu'il faut pour que ce soit la vôtre.",
    problemsTitle: "Ce qu'on voit chez les entreprises de climatisation",
    problems: [
      { title: "Des appels qu'on ne peut pas prendre", text: "Les techniciens sont sur chantier, le téléphone sonne dans le vide, et le client appelle le suivant dans la liste." },
      { title: "Des contrats d'entretien qui se perdent", text: "Sans relance régulière, des rendez-vous d'entretien ne sont jamais reprogrammés et le chiffre d'affaires s'échappe sans bruit." },
      { title: "Peu de visibilité sur Google", text: "Une fiche Google incomplète, peu d'avis, un site qui n'explique pas clairement ce que vous faites : on vous trouve moins que vos concurrents." },
    ],
    helpTitle: "Ce qu'on fait pour vous",
    help: [
      { title: "On remplit votre agenda", text: "Référencement local et campagnes ciblées pour qu'on vous trouve quand on cherche une installation ou un dépannage de climatisation dans votre zone." },
      { title: "On récupère les rendez-vous perdus", text: "Suivi automatique des appels manqués, des demandes de devis et des entretiens à reprogrammer." },
      { title: "Des avis qui vous font ressortir", text: "On demande l'avis Google au bon moment, juste après une intervention réussie." },
      { title: "Un site et une fiche qui convertissent", text: "Un site clair et une fiche Google complète, pensés pour qu'on vous appelle vous." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Travaillez-vous avec des entreprises de climatisation uniquement ?", a: "Non, avec des PME techniques en général : climatisation, chauffage, plomberie, électricité. Si votre activité se planifie avec des clients et s'exécute sur place, on parle votre langage." },
      { q: "En combien de temps voit-on des résultats ?", a: "On mesure sur 3 semaines et c'est vous qui décidez si on continue. On ne promet jamais de résultats garantis dans des délais irréalistes." },
      { q: "Que se passe-t-il si je veux arrêter ?", a: "Vous nous le dites et on arrête, sans engagement de durée." },
    ],
    ctaTitle: "On parle de votre entreprise ?",
    ctaSubtitle: "Racontez-nous votre situation et on vous dit, sans détour, comment on y penserait.",
    ctaButton: "Demander un diagnostic gratuit",
    calculatorLink: "Calculez ce qui vous échappe chaque mois",
  },
  plomberie: {
    metaTitle: `Marketing pour plombiers : plus de clients | ${SUFFIX}`,
    metaDescription:
      "klik aide les plombiers à trouver des clients près de chez eux : appels manqués récupérés, avis Google, site et fiche Google qui font sonner le téléphone.",
    eyebrow: "Plomberie",
    h1: "Plus de clients pour votre entreprise de plomberie",
    intro:
      "En plomberie, le client cherche vite : une fuite, un chauffe-eau en panne, un devis pour une salle de bain. Il appelle les premières entreprises qu'il trouve sur Google. On s'occupe de faire en sorte que vous soyez parmi elles, et que personne n'attende au bout du fil.",
    problemsTitle: "Ce qu'on voit chez les plombiers",
    problems: [
      { title: "L'urgence qui part chez le concurrent", text: "Quand vous êtes sous un évier, vous ne répondez pas au téléphone. Le client, lui, ne rappelle pas." },
      { title: "Des devis qui ne sont jamais relancés", text: "Le client demande un devis, puis plus rien. Sans suivi, ce chantier se perd souvent." },
      { title: "Des avis trop rares", text: "Des clients satisfaits qui ne laissent pas d'avis, et une fiche Google qui ne vous met pas en valeur." },
    ],
    helpTitle: "Ce qu'on fait pour vous",
    help: [
      { title: "On remplit votre agenda", text: "Référencement local et campagnes pour qu'on vous trouve quand on cherche un plombier dans votre secteur." },
      { title: "On récupère les rendez-vous perdus", text: "Réponse automatique aux appels manqués et relance des devis restés sans réponse." },
      { title: "Des avis qui vous font ressortir", text: "On demande l'avis Google au bon moment, juste après l'intervention." },
      { title: "Un site et une fiche qui convertissent", text: "Un site simple et une fiche Google complète, pour qu'on vous appelle vous, pas le voisin." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Faut-il s'y connaître en marketing ?", a: "Non. Vous nous racontez votre quotidien avec vos mots, on repère ce qui vous fait perdre des clients et on vous montre par où on commencerait." },
      { q: "Garantissez-vous des résultats ?", a: "Non. Ce qu'on fait, c'est mesurer chaque semaine et vous montrer les chiffres tels qu'ils sont." },
      { q: "Mes données et celles de mes clients sont-elles en sécurité ?", a: "On ne vend jamais de leads partagés avec vos concurrents et on ne traite que ce qui est nécessaire au service." },
    ],
    ctaTitle: "On parle de votre entreprise ?",
    ctaSubtitle: "Racontez-nous votre situation et on vous dit, sans détour, comment on y penserait.",
    ctaButton: "Demander un diagnostic gratuit",
    calculatorLink: "Calculez ce qui vous échappe chaque mois",
  },
  electricite: {
    metaTitle: `Marketing pour électriciens : plus de clients | ${SUFFIX}`,
    metaDescription:
      "klik aide les électriciens et entreprises d'électricité à trouver des clients en local : devis relancés, avis Google, site et fiche Google qui convertissent.",
    eyebrow: "Électricité",
    h1: "Plus de clients pour votre entreprise d'électricité",
    intro:
      "Mise aux normes, tableau électrique, dépannage, installation de bornes : les demandes arrivent par téléphone, par formulaire ou depuis Google, et il faut y répondre vite. On met en place le suivi et la visibilité qui vous évitent de perdre des chantiers.",
    problemsTitle: "Ce qu'on voit chez les électriciens",
    problems: [
      { title: "Des devis sans réponse", text: "Un devis envoyé, puis le silence. Sans relance, le client finit souvent par choisir quelqu'un d'autre." },
      { title: "Une visibilité locale faible", text: "Un électricien compétent, mais peu visible dès qu'on cherche un électricien près de chez soi." },
      { title: "Une fiche Google et un site peu clairs", text: "Des services mal expliqués, pas de zone d'intervention précise, peu d'avis : le client hésite." },
    ],
    helpTitle: "Ce qu'on fait pour vous",
    help: [
      { title: "On remplit votre agenda", text: "Référencement local et campagnes pour qu'on vous trouve quand on cherche un électricien dans votre zone." },
      { title: "On récupère les rendez-vous perdus", text: "Relance automatique des devis et des demandes restées sans réponse." },
      { title: "Des avis qui vous font ressortir", text: "On demande l'avis Google au bon moment, juste après un chantier terminé." },
      { title: "Un site et une fiche qui convertissent", text: "Un site clair et une fiche Google complète avec vos services et votre zone d'intervention." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Intervenez-vous aussi pour les petites entreprises ?", a: "On travaille surtout avec des PME techniques déjà structurées. Racontez-nous votre cas et on voit si ça colle." },
      { q: "Comment savoir que ça marche ?", a: "C'est normal de douter. On mesure sur 3 semaines et c'est vous qui décidez si on continue." },
      { q: "Que se passe-t-il si je veux annuler ?", a: "Vous nous le dites et on arrête. Pas d'engagement de durée." },
    ],
    ctaTitle: "On parle de votre entreprise ?",
    ctaSubtitle: "Racontez-nous votre situation et on vous dit, sans détour, comment on y penserait.",
    ctaButton: "Demander un diagnostic gratuit",
    calculatorLink: "Calculez ce qui vous échappe chaque mois",
  },
};

const es: Record<Niche, NicheContent> = {
  climatisation: {
    metaTitle: `Marketing para climatización: más clientes | ${SUFFIX}`,
    metaDescription:
      "klik ayuda a instaladores y técnicos de climatización a conseguir clientes cerca: llamadas recuperadas, reseñas de Google, web y ficha de Google que convierten.",
    eyebrow: "Climatización",
    h1: "Más clientes para tu empresa de climatización",
    intro:
      "Instalación, mantenimiento, averías: cuando alguien busca un instalador de aire acondicionado cerca de casa, suele quedarse con la primera empresa que responde. Montamos lo necesario para que sea la tuya.",
    problemsTitle: "Lo que vemos en las empresas de climatización",
    problems: [
      { title: "Llamadas que no se pueden coger", text: "Los técnicos están en obra, el teléfono suena en vacío y el cliente llama al siguiente de la lista." },
      { title: "Mantenimientos que se pierden", text: "Sin recordatorios, hay revisiones que nunca se reprograman y la facturación se escapa sin ruido." },
      { title: "Poca visibilidad en Google", text: "Ficha incompleta, pocas reseñas y una web que no explica bien lo que haces: te encuentran menos que a tu competencia." },
    ],
    helpTitle: "Lo que hacemos por ti",
    help: [
      { title: "Te llenamos la agenda", text: "SEO local y campañas para que te encuentren cuando buscan instalación o reparación de aire acondicionado en tu zona." },
      { title: "Recuperamos citas perdidas", text: "Seguimiento automático de llamadas perdidas, presupuestos y revisiones por reprogramar." },
      { title: "Reseñas que te hacen destacar", text: "Pedimos la reseña de Google en el momento justo, justo después de un trabajo bien hecho." },
      { title: "Web y ficha que convierten", text: "Una web clara y una ficha de Google completa, hechas para que te llamen a ti." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Trabajáis solo con empresas de climatización?", a: "No, con pymes técnicas en general: climatización, calefacción, fontanería, electricidad. Si tu negocio se agenda con clientes y se ejecuta en el sitio, hablamos tu idioma." },
      { q: "¿Cuánto tarda en verse resultados?", a: "Lo medimos en 3 semanas y decides tú si seguimos. Nunca prometemos resultados garantizados en plazos irreales." },
      { q: "¿Qué pasa si quiero parar?", a: "Nos lo dices y paramos, sin permanencia." },
    ],
    ctaTitle: "¿Hablamos de tu empresa?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos, sin rodeos, cómo la pensaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
    calculatorLink: "Calcula cuánto se te escapa al mes",
  },
  plomberie: {
    metaTitle: `Marketing para fontaneros: más clientes | ${SUFFIX}`,
    metaDescription:
      "klik ayuda a fontaneros a conseguir clientes cerca de ellos: llamadas perdidas recuperadas, reseñas de Google, web y ficha de Google que hacen sonar el teléfono.",
    eyebrow: "Fontanería",
    h1: "Más clientes para tu empresa de fontanería",
    intro:
      "En fontanería el cliente busca rápido: una fuga, un calentador roto, un presupuesto de baño. Llama a las primeras empresas que encuentra en Google. Nos encargamos de que estés entre ellas y de que nadie se quede esperando al teléfono.",
    problemsTitle: "Lo que vemos en los fontaneros",
    problems: [
      { title: "La urgencia que se va a la competencia", text: "Cuando estás bajo un fregadero no coges el teléfono, y el cliente no vuelve a llamar." },
      { title: "Presupuestos que nadie recuerda", text: "El cliente pide presupuesto y luego silencio. Sin seguimiento, esa obra suele perderse." },
      { title: "Reseñas escasas", text: "Clientes contentos que no dejan reseña y una ficha de Google que no te favorece." },
    ],
    helpTitle: "Lo que hacemos por ti",
    help: [
      { title: "Te llenamos la agenda", text: "SEO local y campañas para que te encuentren cuando buscan un fontanero en tu zona." },
      { title: "Recuperamos citas perdidas", text: "Respuesta automática a llamadas perdidas y seguimiento de presupuestos sin respuesta." },
      { title: "Reseñas que te hacen destacar", text: "Pedimos la reseña de Google justo después de la intervención." },
      { title: "Web y ficha que convierten", text: "Una web sencilla y una ficha de Google completa para que te llamen a ti, no al vecino." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Hace falta saber de marketing?", a: "No. Nos cuentas tu día a día con tus palabras, vemos qué te hace perder clientes y te enseñamos por dónde empezaríamos." },
      { q: "¿Garantizáis resultados?", a: "No. Lo que hacemos es medir cada semana y enseñarte los números tal cual son." },
      { q: "¿Venden mis datos o los de mis clientes?", a: "Nunca vendemos leads compartidos con tu competencia y solo tratamos lo necesario para el servicio." },
    ],
    ctaTitle: "¿Hablamos de tu empresa?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos, sin rodeos, cómo la pensaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
    calculatorLink: "Calcula cuánto se te escapa al mes",
  },
  electricite: {
    metaTitle: `Marketing para electricistas: más clientes | ${SUFFIX}`,
    metaDescription:
      "klik ayuda a electricistas y empresas de electricidad a conseguir clientes cerca: presupuestos con seguimiento, reseñas de Google, web y ficha de Google.",
    eyebrow: "Electricidad",
    h1: "Más clientes para tu empresa de electricidad",
    intro:
      "Adecuación a normativa, cuadros eléctricos, averías, puntos de recarga: las peticiones llegan por teléfono, por formulario o desde Google, y hay que responder rápido. Montamos el seguimiento y la visibilidad que evitan que pierdas trabajos.",
    problemsTitle: "Lo que vemos en los electricistas",
    problems: [
      { title: "Presupuestos sin respuesta", text: "Un presupuesto enviado y luego silencio. Sin seguimiento, el cliente acaba eligiendo a otro." },
      { title: "Poca visibilidad local", text: "Un buen electricista, pero poco visible cuando alguien busca un electricista cerca de casa." },
      { title: "Ficha de Google y web poco claras", text: "Servicios mal explicados, sin zona de trabajo definida y pocas reseñas: el cliente duda." },
    ],
    helpTitle: "Lo que hacemos por ti",
    help: [
      { title: "Te llenamos la agenda", text: "SEO local y campañas para que te encuentren cuando buscan un electricista en tu zona." },
      { title: "Recuperamos citas perdidas", text: "Seguimiento automático de presupuestos y peticiones sin respuesta." },
      { title: "Reseñas que te hacen destacar", text: "Pedimos la reseña de Google en el momento justo, al terminar un trabajo." },
      { title: "Web y ficha que convierten", text: "Una web clara y una ficha de Google completa con tus servicios y tu zona." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Trabajáis también con empresas pequeñas?", a: "Trabajamos sobre todo con pymes técnicas ya estructuradas. Cuéntanos tu caso y vemos si encaja." },
      { q: "¿Cómo sé que funciona?", a: "Es normal desconfiar. Lo medimos en 3 semanas y decides tú si seguimos." },
      { q: "¿Qué pasa si quiero cancelar?", a: "Nos lo dices y paramos. Sin permanencia." },
    ],
    ctaTitle: "¿Hablamos de tu empresa?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos, sin rodeos, cómo la pensaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
    calculatorLink: "Calcula cuánto se te escapa al mes",
  },
};

const en: Record<Niche, NicheContent> = {
  climatisation: {
    metaTitle: `HVAC marketing: more customers | ${SUFFIX}`,
    metaDescription:
      "klik helps HVAC and air conditioning installers find local customers: recovered calls, Google reviews, and a website and Google listing that convert.",
    eyebrow: "HVAC and air conditioning",
    h1: "More customers for your HVAC and air conditioning business",
    intro:
      "Installation, maintenance, repairs: when someone searches for an air conditioning installer nearby, they usually go with the first company that answers. We set things up so it's yours.",
    problemsTitle: "What we see at HVAC companies",
    problems: [
      { title: "Calls nobody can take", text: "Technicians are on site, the phone rings out, and the customer calls the next company on the list." },
      { title: "Maintenance visits that slip away", text: "Without regular follow-up, service visits never get rebooked and revenue leaks away quietly." },
      { title: "Low visibility on Google", text: "An incomplete listing, few reviews and a website that doesn't explain what you do: people find your competitors first." },
    ],
    helpTitle: "What we do for you",
    help: [
      { title: "We fill your calendar", text: "Local SEO and targeted campaigns so you show up when people search for air conditioning installation or repair in your area." },
      { title: "We recover lost appointments", text: "Automatic follow-up on missed calls, quote requests and maintenance visits to rebook." },
      { title: "Reviews that make you stand out", text: "We ask for the Google review at the right moment, right after a job well done." },
      { title: "A website and listing that convert", text: "A clear website and a complete Google listing, built so people call you." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do you only work with HVAC companies?", a: "No, with technical small businesses in general: air conditioning, heating, plumbing, electrical. If your business is booked with customers and delivered on-site, we speak your language." },
      { q: "How long until I see results?", a: "We measure over 3 weeks and you decide if we continue. We never promise guaranteed results on unrealistic timelines." },
      { q: "What if I want to stop?", a: "You tell us and we stop, with no lock-in contract." },
    ],
    ctaTitle: "Shall we talk about your business?",
    ctaSubtitle: "Tell us your situation and we'll tell you, straight up, how we'd approach it.",
    ctaButton: "Request a free diagnosis",
    calculatorLink: "Work out what's slipping away every month",
  },
  plomberie: {
    metaTitle: `Marketing for plumbers: more customers | ${SUFFIX}`,
    metaDescription:
      "klik helps plumbers find customers nearby: recovered missed calls, Google reviews, and a website and Google listing that make the phone ring.",
    eyebrow: "Plumbing",
    h1: "More customers for your plumbing business",
    intro:
      "In plumbing, customers search fast: a leak, a broken water heater, a quote for a bathroom. They call the first companies they find on Google. We make sure you're among them, and that nobody is left waiting on the line.",
    problemsTitle: "What we see at plumbing companies",
    problems: [
      { title: "The emergency that goes to a competitor", text: "When you're under a sink you can't answer the phone, and the customer doesn't call back." },
      { title: "Quotes nobody follows up", text: "The customer asks for a quote, then silence. Without follow-up, that job is often lost." },
      { title: "Too few reviews", text: "Happy customers who don't leave a review, and a Google listing that doesn't do you justice." },
    ],
    helpTitle: "What we do for you",
    help: [
      { title: "We fill your calendar", text: "Local SEO and campaigns so you show up when people search for a plumber in your area." },
      { title: "We recover lost appointments", text: "Automatic replies to missed calls and follow-up on quotes left unanswered." },
      { title: "Reviews that make you stand out", text: "We ask for the Google review right after the job is done." },
      { title: "A website and listing that convert", text: "A simple website and a complete Google listing so people call you, not your neighbor." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do I need to know marketing?", a: "No. You tell us about your day-to-day in your own words, we spot what's costing you customers and show you where we'd start." },
      { q: "Do you guarantee results?", a: "No. What we do is measure every week and show you the numbers exactly as they are." },
      { q: "Are my data and my customers' data safe?", a: "We never sell leads shared with your competitors and we only process what the service needs." },
    ],
    ctaTitle: "Shall we talk about your business?",
    ctaSubtitle: "Tell us your situation and we'll tell you, straight up, how we'd approach it.",
    ctaButton: "Request a free diagnosis",
    calculatorLink: "Work out what's slipping away every month",
  },
  electricite: {
    metaTitle: `Marketing for electricians: more customers | ${SUFFIX}`,
    metaDescription:
      "klik helps electricians and electrical companies find local customers: followed-up quotes, Google reviews, and a website and Google listing that convert.",
    eyebrow: "Electrical",
    h1: "More customers for your electrical business",
    intro:
      "Code upgrades, consumer units, repairs, EV charger installs: requests arrive by phone, by form or from Google, and they need a fast answer. We set up the follow-up and visibility that stop you losing jobs.",
    problemsTitle: "What we see at electrical companies",
    problems: [
      { title: "Quotes with no reply", text: "A quote goes out, then silence. Without follow-up, the customer often ends up choosing someone else." },
      { title: "Low local visibility", text: "A skilled electrician who is hard to find when someone searches for an electrician nearby." },
      { title: "An unclear listing and website", text: "Services poorly explained, no clear service area and few reviews: customers hesitate." },
    ],
    helpTitle: "What we do for you",
    help: [
      { title: "We fill your calendar", text: "Local SEO and campaigns so you show up when people search for an electrician in your area." },
      { title: "We recover lost appointments", text: "Automatic follow-up on quotes and requests left unanswered." },
      { title: "Reviews that make you stand out", text: "We ask for the Google review at the right moment, right after a finished job." },
      { title: "A website and listing that convert", text: "A clear website and a complete Google listing with your services and service area." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do you also work with very small businesses?", a: "We mostly work with established technical small businesses. Tell us about yours and we'll see if it's a fit." },
      { q: "How do I know this works?", a: "It's normal to be skeptical. We measure over 3 weeks and you decide if we continue." },
      { q: "What if I want to cancel?", a: "You tell us and we stop. No lock-in contract." },
    ],
    ctaTitle: "Shall we talk about your business?",
    ctaSubtitle: "Tell us your situation and we'll tell you, straight up, how we'd approach it.",
    ctaButton: "Request a free diagnosis",
    calculatorLink: "Work out what's slipping away every month",
  },
};

const CONTENT: Record<Locale, Record<Niche, NicheContent>> = { fr, es, en };

export function getNicheContent(locale: Locale, niche: Niche): NicheContent {
  return CONTENT[locale][niche];
}
