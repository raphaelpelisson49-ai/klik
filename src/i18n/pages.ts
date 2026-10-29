import type { Locale } from "./locales";

/** Páginas de contenido (À propos y guías). Una por slug y por idioma. */
export const CONTENT_SLUGS = ["a-propos", "guide-appels-manques", "guide-avis-google", "agence-marketing-ia-angers"] as const;
export type ContentSlug = (typeof CONTENT_SLUGS)[number];

export type ContentPageData = {
  kind: "about" | "article" | "service";
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: { title: string; paras: string[]; bullets?: string[] }[];
  faq?: { q: string; a: string }[];
  linksTitle: string;
  links: { label: string; href: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
};

/** Fecha de publicación / última revisión (se actualiza al cambiar el contenido). */
export const CONTENT_DATES: Record<ContentSlug, { published: string; modified: string }> = {
  "a-propos": { published: "2026-10-27", modified: "2026-10-27" },
  "guide-appels-manques": { published: "2026-10-27", modified: "2026-10-27" },
  "guide-avis-google": { published: "2026-10-27", modified: "2026-10-27" },
  "agence-marketing-ia-angers": { published: "2026-10-29", modified: "2026-10-29" },
};

const SUFFIX: Record<Locale, string> = {
  fr: "klik – acquisition de clients, avis, site et fiche Google",
  es: "klik – captación de clientes, reseñas, web y ficha de Google",
  en: "klik – customer acquisition, reviews, website & Google listing",
};

const fr: Record<ContentSlug, ContentPageData> = {
  "a-propos": {
    kind: "about",
    metaTitle: `À propos de klik et de son fondateur | ${SUFFIX.fr}`,
    metaDescription:
      "klik est une agence fondée par Raphaël Pelisson. Elle aide les PME de la climatisation, de la plomberie et de l'électricité à trouver des clients, récupérer les rendez-vous perdus et gagner des avis Google.",
    breadcrumb: "À propos",
    eyebrow: "À propos",
    h1: "klik : une agence pour les entreprises techniques qui veulent plus de chantiers",
    intro:
      "klik accompagne les PME de la climatisation, du chauffage, de la plomberie et de l'électricité, en France et en Espagne. Notre idée est simple : une entreprise qui fait du bon travail ne doit pas perdre de chantiers à cause d'un appel manqué ou d'une fiche Google vide.",
    sections: [
      {
        title: "Qui est derrière klik",
        paras: [
          "klik a été fondée en 2026 par Raphaël Pelisson, qui dirige l'agence et suit chaque client directement.",
          "Son parcours : après des années d'emplois variés, la découverte de l'intelligence artificielle a changé sa trajectoire. Il veut aujourd'hui que les entreprises sérieuses profitent à leur tour de ces outils, sans avoir à y consacrer leurs journées.",
        ],
      },
      {
        title: "Ce que fait klik",
        paras: ["Quatre services, pensés pour les entreprises de 10 à 40 salariés :"],
        bullets: [
          "Acquisition de clients : un parcours clair du premier contact jusqu'au rendez-vous.",
          "Récupération des rendez-vous perdus : appels manqués, demandes sans réponse, devis non relancés.",
          "Avis Google et réputation : plus d'avis, au bon moment, et une fiche Google qui travaille pour vous.",
          "Site web et fiche Google : visibles quand vos clients cherchent un dépannage ou une installation.",
        ],
      },
      {
        title: "Notre façon de travailler",
        paras: [
          "On commence par un diagnostic gratuit : on regarde ensemble où vous perdez des rendez-vous aujourd'hui, puis on vous propose un plan chiffré. Des outils simples, construits autour de votre façon de travailler et non l'inverse.",
        ],
      },
    ],
    linksTitle: "Aller plus loin",
    links: [
      { label: "Calculatrice de rendez-vous perdus", href: "/calculadora" },
      { label: "Guide : appels manqués", href: "/guide-appels-manques" },
      { label: "Guide : avis Google", href: "/guide-avis-google" },
    ],
    ctaTitle: "Parlons de votre entreprise",
    ctaSubtitle: "Un diagnostic gratuit de 20 minutes pour voir où vous perdez des rendez-vous.",
    ctaButton: "Demandez votre audit",
  },
  "guide-appels-manques": {
    kind: "article",
    metaTitle: `Appels manqués : comment ne plus perdre de chantiers | ${SUFFIX.fr}`,
    metaDescription:
      "Plombier, chauffagiste, électricien, installateur de climatisation : pourquoi un appel manqué fait perdre un chantier et 5 actions simples pour réagir vite.",
    breadcrumb: "Guide : appels manqués",
    eyebrow: "Guide",
    h1: "Appels manqués : comment ne plus perdre de chantiers",
    intro:
      "Quand vous êtes sur un chantier, le téléphone sonne sans que vous puissiez répondre. Pour un client qui cherche un plombier, un chauffagiste ou un installateur de climatisation, la suite est presque toujours la même : il appelle l'entreprise suivante.",
    sections: [
      {
        title: "Pourquoi un appel manqué coûte cher",
        paras: [
          "Un client qui appelle a un besoin précis, souvent urgent. S'il tombe sur un répondeur, il ne laisse pas toujours de message : il appelle quelqu'un d'autre. Le chantier part chez le concurrent, et vous ne le saurez jamais.",
          "Le problème est invisible : un appel manqué ne laisse aucune trace dans votre chiffre d'affaires, seulement dans celui de quelqu'un d'autre.",
        ],
      },
      {
        title: "Les causes les plus fréquentes",
        paras: ["Dans les entreprises techniques, on retrouve presque toujours les mêmes situations :"],
        bullets: [
          "les techniciens sont sur chantier et le patron aussi",
          "personne ne répond pendant la pause du midi ou après 18 h",
          "la messagerie vocale est pleine ou jamais écoutée",
          "les demandes envoyées par le site ou par message n'ont pas de réponse rapide",
          "les devis envoyés ne sont jamais relancés",
        ],
      },
      {
        title: "5 actions pour réagir en quelques minutes",
        paras: ["Pas besoin de recruter. Ces cinq actions suffisent déjà à limiter les pertes :"],
        bullets: [
          "Un renvoi d'appel vers un mobile ou un standard externe quand personne n'est disponible.",
          "Un SMS automatique envoyé dès qu'un appel est manqué (« Nous avons bien reçu votre appel, nous vous rappelons très vite »).",
          "Un formulaire sur le site qui répond tout de suite au client et vous prévient.",
          "Un créneau de rappel dans la journée, noté dans un agenda partagé.",
          "Une relance systématique de chaque devis envoyé, quelques jours après.",
        ],
      },
      {
        title: "Combien ça vous coûte",
        paras: [
          "Pour estimer ce que représentent vos rendez-vous perdus, utilisez notre calculatrice : elle part du nombre d'appels, du taux de réponse et de la valeur moyenne d'un chantier.",
        ],
      },
    ],
    faq: [
      {
        q: "Un répondeur suffit-il pour ne pas perdre un client ?",
        a: "Rarement. Beaucoup de clients ne laissent pas de message et rappellent une autre entreprise. Une réponse immédiate (SMS ou rappel rapide) retient bien mieux le client.",
      },
      {
        q: "Faut-il embaucher une secrétaire pour répondre aux appels ?",
        a: "Pas forcément. Un renvoi d'appel, une réponse automatique et un suivi organisé règlent la plupart des cas sans nouvelle embauche.",
      },
      {
        q: "Comment relancer un devis sans paraître insistant ?",
        a: "Un message court quelques jours après l'envoi, qui demande si le client a des questions, suffit. Le but est d'aider, pas de forcer la décision.",
      },
    ],
    linksTitle: "Pour aller plus loin",
    links: [
      { label: "Calculatrice de rendez-vous perdus", href: "/calculadora" },
      { label: "Marketing pour les entreprises de plomberie", href: "/plomberie" },
      { label: "Marketing pour les entreprises de climatisation", href: "/climatisation" },
      { label: "Guide : obtenir plus d'avis Google", href: "/guide-avis-google" },
    ],
    ctaTitle: "Vous perdez des appels ? Mesurons-le ensemble",
    ctaSubtitle: "Un diagnostic gratuit de 20 minutes pour voir où partent vos rendez-vous.",
    ctaButton: "Demandez votre audit",
  },
  "guide-avis-google": {
    kind: "article",
    metaTitle: `Avis Google : comment en obtenir plus (plombier, chauffagiste, électricien) | ${SUFFIX.fr}`,
    metaDescription:
      "Comment obtenir plus d'avis Google quand on est plombier, chauffagiste, électricien ou installateur de climatisation : quand demander, quoi écrire, comment répondre.",
    breadcrumb: "Guide : avis Google",
    eyebrow: "Guide",
    h1: "Avis Google : comment en obtenir plus quand on est artisan du bâtiment",
    intro:
      "Quand un client cherche un plombier, un électricien ou un chauffagiste, il regarde la fiche Google avant d'appeler : le nombre d'avis, la note et les réponses du professionnel. Voici comment en obtenir plus, sans artifice.",
    sections: [
      {
        title: "Pourquoi les avis comptent",
        paras: [
          "Les avis rassurent le client avant le premier contact, et ils aident Google à comprendre que votre entreprise est active et sérieuse sur votre zone. Deux fiches proches l'une de l'autre sur la carte ne se valent pas si l'une a vingt avis récents et l'autre aucun.",
        ],
      },
      {
        title: "Quand demander un avis",
        paras: [
          "Le meilleur moment, c'est juste après une intervention réussie, quand le client est satisfait et que le souvenir est frais. Attendre une semaine divise vos chances de réponse.",
        ],
      },
      {
        title: "Comment demander",
        paras: ["Rendez la démarche la plus simple possible :"],
        bullets: [
          "envoyez un lien direct vers votre fiche Google, qui ouvre la fenêtre d'avis en un clic",
          "préférez un SMS court plutôt qu'un long e-mail",
          "restez simple : « Merci de votre confiance. Si vous êtes satisfait, un avis nous aiderait beaucoup : [lien] »",
          "demandez à chaque client, pas seulement à ceux que vous connaissez",
        ],
      },
      {
        title: "Répondre aux avis",
        paras: [
          "Répondez à chaque avis, positif ou négatif. Une réponse polie, calme et factuelle à un avis négatif rassure les futurs clients autant qu'un bon avis. Ne polémiquez jamais.",
        ],
      },
      {
        title: "Ce qu'il ne faut pas faire",
        paras: [],
        bullets: [
          "acheter ou inventer des avis : Google les supprime et peut pénaliser votre fiche",
          "offrir une remise ou un cadeau en échange d'un avis, ce que Google interdit",
          "trier les clients et ne demander qu'aux plus satisfaits sur un ton qui force la note",
        ],
      },
    ],
    faq: [
      {
        q: "Combien d'avis faut-il pour paraître crédible ?",
        a: "Il n'y a pas de seuil officiel. Ce qui compte, c'est d'avoir des avis récents et réguliers, avec des réponses de votre part.",
      },
      {
        q: "Puis-je supprimer un avis négatif ?",
        a: "Seulement s'il enfreint les règles de Google (faux avis, propos injurieux). Sinon, répondez calmement : c'est plus utile.",
      },
      {
        q: "Combien de temps pour voir un effet sur ma fiche Google ?",
        a: "Quelques semaines de demandes régulières suffisent pour voir le nombre d'avis monter. L'effet sur la visibilité vient ensuite, progressivement.",
      },
    ],
    linksTitle: "Pour aller plus loin",
    links: [
      { label: "Marketing pour les entreprises de plomberie", href: "/plomberie" },
      { label: "Marketing pour les entreprises d'électricité", href: "/electricite" },
      { label: "Guide : ne plus perdre d'appels", href: "/guide-appels-manques" },
      { label: "À propos de klik", href: "/a-propos" },
    ],
    ctaTitle: "Une fiche Google qui travaille pour vous",
    ctaSubtitle: "On regarde votre fiche ensemble pendant un diagnostic gratuit de 20 minutes.",
    ctaButton: "Demandez votre audit",
  },
  "agence-marketing-ia-angers": {
    kind: "service",
    metaTitle: `Agence marketing IA à Angers et en Maine-et-Loire | ${SUFFIX.fr}`,
    metaDescription:
      "klik, agence marketing IA à Angers et dans le Maine-et-Loire : acquisition de clients, rendez-vous récupérés, avis Google, site et fiche Google pour les PME et entreprises techniques.",
    breadcrumb: "Agence marketing IA à Angers",
    eyebrow: "Angers et Maine-et-Loire",
    h1: "Agence marketing IA à Angers et en Maine-et-Loire",
    intro:
      "klik aide les PME d'Angers et du Maine-et-Loire à trouver plus de clients : réponse immédiate aux demandes, relance des devis, avis Google et visibilité locale. Des outils d'IA simples, construits autour de votre façon de travailler.",
    sections: [
      {
        title: "Ce que fait klik pour les entreprises angevines",
        paras: ["Quatre services concrets, pensés pour les entreprises de 10 à 40 salariés :"],
        bullets: [
          "Acquisition de clients : un parcours clair du premier contact jusqu'au rendez-vous.",
          "Récupération des rendez-vous perdus : appels manqués, demandes sans réponse, devis non relancés.",
          "Avis Google et réputation : plus d'avis, au bon moment, et une fiche Google qui travaille pour vous.",
          "Site web et fiche Google : visibles quand on vous cherche à Angers ou autour.",
        ],
      },
      {
        title: "Une agence marketing IA, concrètement",
        paras: [
          "L'intelligence artificielle ne remplace pas votre savoir-faire : elle s'occupe de ce qui vous prend du temps et que vous n'avez pas le temps de faire. Répondre tout de suite à un client qui appelle ou écrit, relancer un devis, demander un avis après un chantier, trier les demandes.",
          "Résultat : moins de rendez-vous perdus, plus de clients qui vous trouvent et vous choisissent, sans ajouter de charge à vos équipes.",
        ],
      },
      {
        title: "Pour quelles entreprises",
        paras: [
          "Nous travaillons surtout avec les entreprises techniques : climatisation, chauffage, plomberie, électricité. Si vous dirigez une PME de services avec une équipe et un agenda à remplir, parlons-en.",
        ],
      },
      {
        title: "Où nous intervenons",
        paras: [
          "À Angers, et partout en Maine-et-Loire : Cholet, Saumur, Segré, les Mauges, la couronne angevine. À distance, nous accompagnons aussi des entreprises dans toute la France.",
        ],
      },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'une agence marketing IA ?",
        a: "C'est une agence qui utilise l'intelligence artificielle pour automatiser les tâches commerciales : réponse aux demandes, relances, collecte d'avis, suivi des prospects. Le but est de vous apporter plus de clients avec moins de travail manuel.",
      },
      {
        q: "Travaillez-vous avec des entreprises de Maine-et-Loire en dehors d'Angers ?",
        a: "Oui. Nous accompagnons les entreprises d'Angers et de tout le Maine-et-Loire, ainsi que des entreprises dans le reste de la France, la plupart du travail se faisant à distance.",
      },
      {
        q: "Comment démarrer ?",
        a: "Par un diagnostic gratuit de 20 minutes : nous regardons ensemble où vous perdez des rendez-vous aujourd'hui, puis nous vous proposons un plan chiffré.",
      },
    ],
    linksTitle: "Pour aller plus loin",
    links: [
      { label: "Calculatrice de rendez-vous perdus", href: "/calculadora" },
      { label: "Marketing pour les entreprises de climatisation", href: "/climatisation" },
      { label: "Guide : ne plus perdre d'appels", href: "/guide-appels-manques" },
      { label: "À propos de klik", href: "/a-propos" },
    ],
    ctaTitle: "Parlons de votre entreprise à Angers",
    ctaSubtitle: "Un diagnostic gratuit de 20 minutes pour voir où vous perdez des rendez-vous.",
    ctaButton: "Demandez votre audit",
  },
};

const es: Record<ContentSlug, ContentPageData> = {
  "a-propos": {
    kind: "about",
    metaTitle: `Sobre klik y su fundador | ${SUFFIX.es}`,
    metaDescription:
      "klik es una agencia fundada por Raphaël Pelisson. Ayuda a las pymes de climatización, fontanería y electricidad a captar clientes, recuperar citas perdidas y conseguir reseñas en Google.",
    breadcrumb: "Sobre klik",
    eyebrow: "Sobre klik",
    h1: "klik: una agencia para empresas técnicas que quieren más trabajos",
    intro:
      "klik acompaña a las pymes de climatización, calefacción, fontanería y electricidad en Francia y España. La idea es sencilla: una empresa que trabaja bien no debería perder trabajos por una llamada sin atender o por una ficha de Google vacía.",
    sections: [
      {
        title: "Quién está detrás de klik",
        paras: [
          "klik se fundó en 2026 por Raphaël Pelisson, que dirige la agencia y sigue a cada cliente de cerca.",
          "Su camino: tras años de trabajos muy variados, descubrir la inteligencia artificial cambió su rumbo. Ahora quiere que las empresas serias también aprovechen esas herramientas sin dedicarles sus días.",
        ],
      },
      {
        title: "Qué hace klik",
        paras: ["Cuatro servicios pensados para empresas de 10 a 40 empleados:"],
        bullets: [
          "Captación de clientes: un recorrido claro desde el primer contacto hasta la cita.",
          "Recuperación de citas perdidas: llamadas sin atender, peticiones sin respuesta y presupuestos sin seguimiento.",
          "Reseñas en Google y reputación: más reseñas, en el momento adecuado, y una ficha de Google que trabaje por ti.",
          "Web y ficha de Google: visibles cuando tus clientes buscan una avería o una instalación.",
        ],
      },
      {
        title: "Cómo trabajamos",
        paras: [
          "Empezamos con un diagnóstico gratuito: miramos juntos dónde pierdes citas hoy y te proponemos un plan con precio. Herramientas sencillas, construidas alrededor de tu forma de trabajar y no al revés.",
        ],
      },
    ],
    linksTitle: "Para ir más lejos",
    links: [
      { label: "Calculadora de citas perdidas", href: "/calculadora" },
      { label: "Guía: llamadas perdidas", href: "/guide-appels-manques" },
      { label: "Guía: reseñas en Google", href: "/guide-avis-google" },
    ],
    ctaTitle: "Hablemos de tu empresa",
    ctaSubtitle: "Un diagnóstico gratuito de 20 minutos para ver dónde pierdes citas.",
    ctaButton: "Pide tu auditoría",
  },
  "guide-appels-manques": {
    kind: "article",
    metaTitle: `Llamadas perdidas: cómo dejar de perder trabajos | ${SUFFIX.es}`,
    metaDescription:
      "Fontanero, calefactor, electricista o instalador de climatización: por qué una llamada perdida cuesta un trabajo y 5 acciones sencillas para reaccionar rápido.",
    breadcrumb: "Guía: llamadas perdidas",
    eyebrow: "Guía",
    h1: "Llamadas perdidas: cómo dejar de perder trabajos",
    intro:
      "Cuando estás en una obra, el teléfono suena y no puedes contestar. Para un cliente que busca fontanero, calefactor o instalador de climatización, lo que pasa después casi siempre es lo mismo: llama a la siguiente empresa.",
    sections: [
      {
        title: "Por qué una llamada perdida cuesta cara",
        paras: [
          "Quien llama tiene una necesidad concreta, a menudo urgente. Si salta el contestador, muchas veces no deja mensaje: llama a otro. El trabajo se va a la competencia y tú nunca lo sabrás.",
          "El problema es invisible: una llamada perdida no deja huella en tu facturación, solo en la de otro.",
        ],
      },
      {
        title: "Las causas más habituales",
        paras: ["En las empresas técnicas casi siempre se repiten las mismas situaciones:"],
        bullets: [
          "los técnicos están en obra y el jefe también",
          "nadie contesta a la hora de comer o pasadas las 18 h",
          "el buzón de voz está lleno o nadie lo escucha",
          "las peticiones del sitio web o por mensaje no reciben respuesta rápida",
          "los presupuestos enviados nunca se retoman",
        ],
      },
      {
        title: "5 acciones para reaccionar en minutos",
        paras: ["No hace falta contratar a nadie. Estas cinco acciones ya reducen las pérdidas:"],
        bullets: [
          "Un desvío de llamadas a un móvil o a una centralita externa cuando nadie puede atender.",
          "Un SMS automático en cuanto hay una llamada perdida («Hemos recibido su llamada, le devolvemos la llamada muy pronto»).",
          "Un formulario en la web que responde al momento al cliente y te avisa.",
          "Un hueco de devolución de llamada en el día, anotado en una agenda compartida.",
          "Un seguimiento sistemático de cada presupuesto enviado, unos días después.",
        ],
      },
      {
        title: "Cuánto te cuesta",
        paras: [
          "Para estimar lo que suponen tus citas perdidas, usa nuestra calculadora: parte del número de llamadas, la tasa de respuesta y el valor medio de un trabajo.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Basta con un contestador para no perder al cliente?",
        a: "Pocas veces. Muchos clientes no dejan mensaje y llaman a otra empresa. Una respuesta inmediata (SMS o devolución rápida) retiene mucho mejor al cliente.",
      },
      {
        q: "¿Hay que contratar a una secretaria para atender las llamadas?",
        a: "No necesariamente. Un desvío de llamadas, una respuesta automática y un seguimiento ordenado resuelven la mayoría de los casos sin contratar.",
      },
      {
        q: "¿Cómo retomar un presupuesto sin parecer pesado?",
        a: "Un mensaje corto unos días después, preguntando si el cliente tiene dudas, es suficiente. La idea es ayudar, no forzar la decisión.",
      },
    ],
    linksTitle: "Para ir más lejos",
    links: [
      { label: "Calculadora de citas perdidas", href: "/calculadora" },
      { label: "Marketing para empresas de fontanería", href: "/plomberie" },
      { label: "Marketing para empresas de climatización", href: "/climatisation" },
      { label: "Guía: conseguir más reseñas en Google", href: "/guide-avis-google" },
    ],
    ctaTitle: "¿Pierdes llamadas? Midámoslo juntos",
    ctaSubtitle: "Un diagnóstico gratuito de 20 minutos para ver adónde se van tus citas.",
    ctaButton: "Pide tu auditoría",
  },
  "guide-avis-google": {
    kind: "article",
    metaTitle: `Reseñas en Google: cómo conseguir más (fontanero, calefactor, electricista) | ${SUFFIX.es}`,
    metaDescription:
      "Cómo conseguir más reseñas en Google si eres fontanero, calefactor, electricista o instalador de climatización: cuándo pedirlas, qué escribir y cómo responder.",
    breadcrumb: "Guía: reseñas en Google",
    eyebrow: "Guía",
    h1: "Reseñas en Google: cómo conseguir más si eres profesional de la construcción",
    intro:
      "Cuando un cliente busca fontanero, electricista o calefactor, mira la ficha de Google antes de llamar: número de reseñas, nota y respuestas del profesional. Así se consiguen más, sin trucos.",
    sections: [
      {
        title: "Por qué importan las reseñas",
        paras: [
          "Las reseñas tranquilizan al cliente antes del primer contacto y ayudan a Google a entender que tu empresa está activa y es seria en tu zona. Dos fichas cercanas en el mapa no valen lo mismo si una tiene veinte reseñas recientes y la otra ninguna.",
        ],
      },
      {
        title: "Cuándo pedir una reseña",
        paras: [
          "El mejor momento es justo después de un trabajo bien hecho, cuando el cliente está contento y el recuerdo está fresco. Esperar una semana reduce mucho la probabilidad de respuesta.",
        ],
      },
      {
        title: "Cómo pedirla",
        paras: ["Hazlo lo más fácil posible:"],
        bullets: [
          "envía un enlace directo a tu ficha de Google que abra la ventana de reseña con un clic",
          "mejor un SMS corto que un correo largo",
          "mantenlo sencillo: «Gracias por su confianza. Si está satisfecho, una reseña nos ayudaría mucho: [enlace]»",
          "pídelo a todos los clientes, no solo a los que conoces",
        ],
      },
      {
        title: "Responder a las reseñas",
        paras: [
          "Responde a todas, positivas o negativas. Una respuesta educada, tranquila y objetiva a una reseña negativa tranquiliza a los futuros clientes tanto como una buena reseña. Nunca entres en polémica.",
        ],
      },
      {
        title: "Lo que no hay que hacer",
        paras: [],
        bullets: [
          "comprar o inventar reseñas: Google las elimina y puede penalizar tu ficha",
          "ofrecer un descuento o un regalo a cambio de una reseña, algo que Google prohíbe",
          "filtrar a los clientes y pedir solo a los más contentos de forma que se fuerce la nota",
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuántas reseñas hacen falta para ser creíble?",
        a: "No hay un mínimo oficial. Lo que cuenta es tener reseñas recientes y constantes, con respuestas tuyas.",
      },
      {
        q: "¿Puedo borrar una reseña negativa?",
        a: "Solo si incumple las normas de Google (reseña falsa, insultos). Si no, responde con calma: es más útil.",
      },
      {
        q: "¿Cuánto tarda en notarse en mi ficha de Google?",
        a: "Unas semanas de peticiones constantes bastan para que suba el número de reseñas. El efecto en la visibilidad llega después, poco a poco.",
      },
    ],
    linksTitle: "Para ir más lejos",
    links: [
      { label: "Marketing para empresas de fontanería", href: "/plomberie" },
      { label: "Marketing para empresas de electricidad", href: "/electricite" },
      { label: "Guía: no perder más llamadas", href: "/guide-appels-manques" },
      { label: "Sobre klik", href: "/a-propos" },
    ],
    ctaTitle: "Una ficha de Google que trabaje por ti",
    ctaSubtitle: "Miramos tu ficha juntos en un diagnóstico gratuito de 20 minutos.",
    ctaButton: "Pide tu auditoría",
  },
  "agence-marketing-ia-angers": {
    kind: "service",
    metaTitle: `Agencia de marketing con IA en Angers y Maine-et-Loire | ${SUFFIX.es}`,
    metaDescription:
      "klik, agencia de marketing con IA en Angers y Maine-et-Loire: captación de clientes, citas recuperadas, reseñas en Google, web y ficha de Google para pymes y empresas técnicas.",
    breadcrumb: "Agencia de marketing IA en Angers",
    eyebrow: "Angers y Maine-et-Loire",
    h1: "Agencia de marketing con IA en Angers y Maine-et-Loire",
    intro:
      "klik ayuda a las pymes de Angers y del Maine-et-Loire a conseguir más clientes: respuesta inmediata a las peticiones, seguimiento de presupuestos, reseñas en Google y visibilidad local. Herramientas de IA sencillas, construidas alrededor de tu forma de trabajar.",
    sections: [
      {
        title: "Qué hace klik por las empresas de Angers",
        paras: ["Cuatro servicios concretos, pensados para empresas de 10 a 40 empleados:"],
        bullets: [
          "Captación de clientes: un recorrido claro desde el primer contacto hasta la cita.",
          "Recuperación de citas perdidas: llamadas sin atender, peticiones sin respuesta y presupuestos sin seguimiento.",
          "Reseñas en Google y reputación: más reseñas, en el momento adecuado, y una ficha de Google que trabaje por ti.",
          "Web y ficha de Google: visibles cuando te buscan en Angers y alrededores.",
        ],
      },
      {
        title: "Una agencia de marketing con IA, en la práctica",
        paras: [
          "La inteligencia artificial no sustituye tu oficio: se ocupa de lo que te quita tiempo y para lo que no tienes tiempo. Responder al momento a quien llama o escribe, retomar un presupuesto, pedir una reseña tras un trabajo, ordenar las peticiones.",
          "Resultado: menos citas perdidas y más clientes que te encuentran y te eligen, sin cargar a tus equipos.",
        ],
      },
      {
        title: "Para qué empresas",
        paras: [
          "Trabajamos sobre todo con empresas técnicas: climatización, calefacción, fontanería, electricidad. Si diriges una pyme de servicios con un equipo y una agenda que llenar, hablemos.",
        ],
      },
      {
        title: "Dónde intervenimos",
        paras: [
          "En Angers y en todo el Maine-et-Loire: Cholet, Saumur, Segré, los Mauges y la periferia angevina. A distancia, también acompañamos a empresas de toda Francia.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué es una agencia de marketing con IA?",
        a: "Es una agencia que usa inteligencia artificial para automatizar tareas comerciales: responder peticiones, hacer seguimientos, recoger reseñas y seguir a los prospectos. El objetivo es traerte más clientes con menos trabajo manual.",
      },
      {
        q: "¿Trabajáis con empresas del Maine-et-Loire fuera de Angers?",
        a: "Sí. Acompañamos a empresas de Angers y de todo el Maine-et-Loire, y también al resto de Francia; la mayor parte del trabajo se hace a distancia.",
      },
      {
        q: "¿Cómo se empieza?",
        a: "Con un diagnóstico gratuito de 20 minutos: miramos juntos dónde pierdes citas hoy y te proponemos un plan con precio.",
      },
    ],
    linksTitle: "Para ir más lejos",
    links: [
      { label: "Calculadora de citas perdidas", href: "/calculadora" },
      { label: "Marketing para empresas de climatización", href: "/climatisation" },
      { label: "Guía: no perder más llamadas", href: "/guide-appels-manques" },
      { label: "Sobre klik", href: "/a-propos" },
    ],
    ctaTitle: "Hablemos de tu empresa en Angers",
    ctaSubtitle: "Un diagnóstico gratuito de 20 minutos para ver dónde pierdes citas.",
    ctaButton: "Pide tu auditoría",
  },
};

const en: Record<ContentSlug, ContentPageData> = {
  "a-propos": {
    kind: "about",
    metaTitle: `About klik and its founder | ${SUFFIX.en}`,
    metaDescription:
      "klik is an agency founded by Raphaël Pelisson. It helps HVAC, plumbing and electrical businesses win customers, recover lost appointments and earn Google reviews.",
    breadcrumb: "About klik",
    eyebrow: "About klik",
    h1: "klik: an agency for technical businesses that want more jobs",
    intro:
      "klik works with HVAC, heating, plumbing and electrical businesses in France and Spain. The idea is simple: a company that does good work should not lose jobs because of a missed call or an empty Google listing.",
    sections: [
      {
        title: "Who is behind klik",
        paras: [
          "klik was founded in 2026 by Raphaël Pelisson, who runs the agency and follows each client closely.",
          "His path: after years of varied jobs, discovering artificial intelligence changed his direction. Today he wants serious businesses to benefit from these tools too, without spending their days on them.",
        ],
      },
      {
        title: "What klik does",
        paras: ["Four services, designed for businesses with 10 to 40 employees:"],
        bullets: [
          "Customer acquisition: a clear path from first contact to appointment.",
          "Recovering lost appointments: missed calls, unanswered requests, quotes never followed up.",
          "Google reviews and reputation: more reviews, at the right time, and a Google listing that works for you.",
          "Website and Google listing: visible when your customers search for a repair or an installation.",
        ],
      },
      {
        title: "How we work",
        paras: [
          "We start with a free diagnostic: we look together at where you lose appointments today, then propose a priced plan. Simple tools built around the way you work, not the other way round.",
        ],
      },
    ],
    linksTitle: "Go further",
    links: [
      { label: "Lost appointments calculator", href: "/calculadora" },
      { label: "Guide: missed calls", href: "/guide-appels-manques" },
      { label: "Guide: Google reviews", href: "/guide-avis-google" },
    ],
    ctaTitle: "Let's talk about your business",
    ctaSubtitle: "A free 20-minute diagnostic to see where you lose appointments.",
    ctaButton: "Request your audit",
  },
  "guide-appels-manques": {
    kind: "article",
    metaTitle: `Missed calls: how to stop losing jobs | ${SUFFIX.en}`,
    metaDescription:
      "Plumber, heating engineer, electrician or air conditioning installer: why a missed call loses a job, and 5 simple actions to respond fast.",
    breadcrumb: "Guide: missed calls",
    eyebrow: "Guide",
    h1: "Missed calls: how to stop losing jobs",
    intro:
      "When you are on a job site, the phone rings and you cannot answer. For a customer looking for a plumber, a heating engineer or an air conditioning installer, what happens next is almost always the same: they call the next company.",
    sections: [
      {
        title: "Why a missed call is expensive",
        paras: [
          "Someone who calls has a specific, often urgent, need. If they reach voicemail they often do not leave a message: they call someone else. The job goes to a competitor and you never know.",
          "The problem is invisible: a missed call leaves no trace in your revenue, only in someone else's.",
        ],
      },
      {
        title: "The most common causes",
        paras: ["In technical businesses the same situations come up again and again:"],
        bullets: [
          "technicians are on site, and so is the owner",
          "nobody answers during lunch or after 6 pm",
          "voicemail is full or never listened to",
          "requests from the website or by message get no quick reply",
          "quotes that were sent are never followed up",
        ],
      },
      {
        title: "5 actions to respond within minutes",
        paras: ["No need to hire anyone. These five actions already limit the losses:"],
        bullets: [
          "Call forwarding to a mobile or an external switchboard when nobody is free.",
          "An automatic text as soon as a call is missed (\"We received your call and will call you back very soon\").",
          "A website form that replies to the customer straight away and alerts you.",
          "A callback slot during the day, noted in a shared calendar.",
          "A systematic follow-up of every quote sent, a few days later.",
        ],
      },
      {
        title: "What it costs you",
        paras: [
          "To estimate what your lost appointments are worth, use our calculator: it starts from the number of calls, the answer rate and the average value of a job.",
        ],
      },
    ],
    faq: [
      {
        q: "Is voicemail enough to avoid losing a customer?",
        a: "Rarely. Many customers do not leave a message and call another company. An immediate reply (text or quick callback) keeps the customer much better.",
      },
      {
        q: "Do I need to hire a receptionist to answer calls?",
        a: "Not necessarily. Call forwarding, an automatic reply and organised follow-up solve most cases without a new hire.",
      },
      {
        q: "How do I follow up on a quote without being pushy?",
        a: "A short message a few days after sending, asking whether the customer has questions, is enough. The aim is to help, not to force a decision.",
      },
    ],
    linksTitle: "Go further",
    links: [
      { label: "Lost appointments calculator", href: "/calculadora" },
      { label: "Marketing for plumbing businesses", href: "/plomberie" },
      { label: "Marketing for HVAC businesses", href: "/climatisation" },
      { label: "Guide: getting more Google reviews", href: "/guide-avis-google" },
    ],
    ctaTitle: "Losing calls? Let's measure it together",
    ctaSubtitle: "A free 20-minute diagnostic to see where your appointments go.",
    ctaButton: "Request your audit",
  },
  "guide-avis-google": {
    kind: "article",
    metaTitle: `Google reviews: how to get more (plumber, heating engineer, electrician) | ${SUFFIX.en}`,
    metaDescription:
      "How to get more Google reviews as a plumber, heating engineer, electrician or air conditioning installer: when to ask, what to write, how to reply.",
    breadcrumb: "Guide: Google reviews",
    eyebrow: "Guide",
    h1: "Google reviews: how to get more as a building trades business",
    intro:
      "When a customer searches for a plumber, an electrician or a heating engineer, they look at the Google listing before calling: number of reviews, rating and the business's replies. Here is how to earn more, without tricks.",
    sections: [
      {
        title: "Why reviews matter",
        paras: [
          "Reviews reassure the customer before the first contact, and they help Google see that your business is active and serious in your area. Two listings close together on the map are not equal if one has twenty recent reviews and the other none.",
        ],
      },
      {
        title: "When to ask for a review",
        paras: [
          "The best moment is right after a successful job, when the customer is happy and the memory is fresh. Waiting a week greatly reduces the chance of a reply.",
        ],
      },
      {
        title: "How to ask",
        paras: ["Make it as easy as possible:"],
        bullets: [
          "send a direct link to your Google listing that opens the review window in one click",
          "prefer a short text message to a long email",
          "keep it simple: \"Thank you for your trust. If you are happy, a review would help us a lot: [link]\"",
          "ask every customer, not only the ones you know",
        ],
      },
      {
        title: "Replying to reviews",
        paras: [
          "Reply to every review, positive or negative. A polite, calm and factual reply to a negative review reassures future customers as much as a good review. Never argue.",
        ],
      },
      {
        title: "What not to do",
        paras: [],
        bullets: [
          "buying or inventing reviews: Google removes them and can penalise your listing",
          "offering a discount or a gift in exchange for a review, which Google prohibits",
          "screening customers and asking only the happiest ones in a way that forces the rating",
        ],
      },
    ],
    faq: [
      {
        q: "How many reviews do I need to look credible?",
        a: "There is no official threshold. What counts is having recent, steady reviews with replies from you.",
      },
      {
        q: "Can I delete a negative review?",
        a: "Only if it breaks Google's rules (fake review, abusive language). Otherwise reply calmly: it is more useful.",
      },
      {
        q: "How long before I see an effect on my Google listing?",
        a: "A few weeks of steady requests are enough to see the number of reviews rise. The effect on visibility comes afterwards, gradually.",
      },
    ],
    linksTitle: "Go further",
    links: [
      { label: "Marketing for plumbing businesses", href: "/plomberie" },
      { label: "Marketing for electrical businesses", href: "/electricite" },
      { label: "Guide: stop losing calls", href: "/guide-appels-manques" },
      { label: "About klik", href: "/a-propos" },
    ],
    ctaTitle: "A Google listing that works for you",
    ctaSubtitle: "We look at your listing together in a free 20-minute diagnostic.",
    ctaButton: "Request your audit",
  },
  "agence-marketing-ia-angers": {
    kind: "service",
    metaTitle: `AI marketing agency in Angers and Maine-et-Loire | ${SUFFIX.en}`,
    metaDescription:
      "klik, AI marketing agency in Angers and Maine-et-Loire: customer acquisition, recovered appointments, Google reviews, website and Google listing for small businesses and technical trades.",
    breadcrumb: "AI marketing agency in Angers",
    eyebrow: "Angers and Maine-et-Loire",
    h1: "AI marketing agency in Angers and Maine-et-Loire",
    intro:
      "klik helps small businesses in Angers and Maine-et-Loire win more customers: instant replies to enquiries, quote follow-ups, Google reviews and local visibility. Simple AI tools built around the way you work.",
    sections: [
      {
        title: "What klik does for Angers businesses",
        paras: ["Four concrete services, designed for businesses with 10 to 40 employees:"],
        bullets: [
          "Customer acquisition: a clear path from first contact to appointment.",
          "Recovering lost appointments: missed calls, unanswered requests, quotes never followed up.",
          "Google reviews and reputation: more reviews, at the right time, and a Google listing that works for you.",
          "Website and Google listing: visible when people look for you in and around Angers.",
        ],
      },
      {
        title: "An AI marketing agency, in practice",
        paras: [
          "Artificial intelligence does not replace your craft: it handles what eats your time and what you never get round to. Replying straight away to someone who calls or writes, following up a quote, asking for a review after a job, sorting enquiries.",
          "The result: fewer lost appointments and more customers who find you and choose you, without adding work for your teams.",
        ],
      },
      {
        title: "Which businesses",
        paras: [
          "We mostly work with technical businesses: air conditioning, heating, plumbing, electrical. If you run a service business with a team and a calendar to fill, let's talk.",
        ],
      },
      {
        title: "Where we work",
        paras: [
          "In Angers and across Maine-et-Loire: Cholet, Saumur, Segré, the Mauges and the Angers area. Remotely, we also support businesses all over France.",
        ],
      },
    ],
    faq: [
      {
        q: "What is an AI marketing agency?",
        a: "It is an agency that uses artificial intelligence to automate sales tasks: replying to enquiries, follow-ups, collecting reviews, tracking prospects. The aim is to bring you more customers with less manual work.",
      },
      {
        q: "Do you work with Maine-et-Loire businesses outside Angers?",
        a: "Yes. We support businesses in Angers and across Maine-et-Loire, as well as the rest of France; most of the work is done remotely.",
      },
      {
        q: "How do we start?",
        a: "With a free 20-minute diagnostic: we look together at where you lose appointments today, then propose a priced plan.",
      },
    ],
    linksTitle: "Go further",
    links: [
      { label: "Lost appointments calculator", href: "/calculadora" },
      { label: "Marketing for HVAC businesses", href: "/climatisation" },
      { label: "Guide: stop losing calls", href: "/guide-appels-manques" },
      { label: "About klik", href: "/a-propos" },
    ],
    ctaTitle: "Let's talk about your business in Angers",
    ctaSubtitle: "A free 20-minute diagnostic to see where you lose appointments.",
    ctaButton: "Request your audit",
  },
};

const ALL: Record<Locale, Record<ContentSlug, ContentPageData>> = { fr, es, en };

export function getContentPage(locale: Locale, slug: ContentSlug): ContentPageData {
  return ALL[locale][slug];
}
