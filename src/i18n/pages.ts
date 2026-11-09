import type { Locale } from "./locales";

/** Páginas de contenido (À propos y guías). Una por slug y por idioma. */
export const CONTENT_SLUGS = ["a-propos", "guide-appels-manques", "guide-avis-google", "agence-marketing-ia-angers", "guide-relance-devis", "metiers", "services"] as const;
export type ContentSlug = (typeof CONTENT_SLUGS)[number];

export type ContentPageData = {
  kind: "about" | "article" | "service" | "hub";
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
  "guide-relance-devis": { published: "2026-11-09", modified: "2026-11-09" },
  metiers: { published: "2026-11-09", modified: "2026-11-09" },
  services: { published: "2026-11-09", modified: "2026-11-09" },
};

const SUFFIX: Record<Locale, string> = {
  fr: "klik",
  es: "klik",
  en: "klik",
};

const fr: Record<ContentSlug, ContentPageData> = {
  "a-propos": {
    kind: "about",
    metaTitle: `À propos de klik et de son fondateur | ${SUFFIX.fr}`,
    metaDescription:
      "klik est une agence fondée par Raphaël Pelisson. Elle aide les entreprises du bâtiment (plomberie, chauffage, climatisation, électricité, couverture, rénovation énergétique…) à trouver des clients, récupérer les rendez-vous perdus et gagner des avis Google.",
    breadcrumb: "À propos",
    eyebrow: "À propos",
    h1: "klik : une agence pour les entreprises techniques qui veulent plus de chantiers",
    intro:
      "klik accompagne les entreprises du bâtiment (plomberie, chauffage, climatisation, électricité, couverture, rénovation énergétique, maçonnerie, peinture), en France et en Espagne. Notre idée est simple : une entreprise qui fait du bon travail ne doit pas perdre de chantiers à cause d'un appel manqué ou d'une fiche Google vide.",
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
          "Nous travaillons surtout avec les entreprises du bâtiment : plomberie, chauffage, climatisation, électricité, couverture, rénovation énergétique, maçonnerie, peinture. Si vous dirigez une PME de services avec une équipe et un agenda à remplir, parlons-en.",
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
  "guide-relance-devis": {
    kind: "article",
    metaTitle: `Relancer un devis : comment faire quand on est artisan | klik`,
    metaDescription:
      "Pourquoi un devis reste sans réponse, quand et comment le relancer sans paraître insistant, et ce qu'un artisan du bâtiment peut automatiser.",
    breadcrumb: "Relancer ses devis",
    eyebrow: "Guide",
    h1: "Relancer ses devis quand on est artisan du bâtiment",
    intro:
      "Un devis envoyé sans relance reste souvent sans réponse : le client compare, hésite ou oublie. Voici quand et comment relancer sans paraître insistant, et ce qu'on peut automatiser pour ne plus y penser pendant que vous êtes sur le chantier.",
    sections: [
      {
        title: "Pourquoi un devis reste sans réponse",
        paras: ["Ce n'est pas forcément un refus. Dans le bâtiment, plusieurs raisons reviennent :"],
        bullets: [
          "le client compare plusieurs entreprises avant de décider",
          "le projet n'est pas urgent et passe après le reste",
          "le devis est perdu parmi d'autres emails",
          "il a une question mais n'ose pas appeler",
        ],
      },
      {
        title: "Quand relancer",
        paras: ["Il n'y a pas de règle unique, mais une logique simple : relancer assez tôt pour que le projet reste frais, assez peu pour ne pas gêner. À titre de repères, à adapter à la taille du chantier :"],
        bullets: [
          "quelques jours après l'envoi : un message court pour vérifier que le devis est bien reçu et répondre aux questions",
          "environ une semaine plus tard : un message qui apporte quelque chose d'utile (une précision, une disponibilité)",
          "deux semaines plus tard : un dernier message poli, qui laisse la porte ouverte",
        ],
      },
      {
        title: "Que dire dans la relance",
        paras: ["Le ton compte plus que la longueur. Une relance efficace est courte, utile et facile à répondre :"],
        bullets: [
          "rappeler le chantier en une phrase (« votre projet de toiture à … »)",
          "demander s'il y a des questions sur le devis",
          "proposer un appel ou une visite si besoin",
          "ne jamais mettre la pression sur la décision",
        ],
      },
      {
        title: "Ce qu'on peut automatiser",
        paras: ["Le but n'est pas d'envoyer des messages froids, mais de ne plus oublier de relancer :"],
        bullets: [
          "un rappel dans l'agenda à chaque devis envoyé",
          "un message prérempli que vous validez en un clic",
          "un suivi du statut de chaque devis (envoyé, relancé, signé, refusé)",
          "une alerte quand un devis important reste sans réponse",
        ],
      },
      {
        title: "Ce qui reste à faire à la main",
        paras: ["Répondre aux questions techniques, ajuster un prix, appeler quand le chantier est important : la relation reste entre vous et le client. L'outil sert à ne rien laisser passer, pas à remplacer votre jugement."],
      },
    ],
    faq: [
      { q: "Combien de fois faut-il relancer un devis ?", a: "Une ou deux relances suffisent en général. Au-delà, on risque de gêner le client. La dernière relance doit laisser la porte ouverte." },
      { q: "Une relance automatique paraît-elle impersonnelle ?", a: "Pas si le message est court, relié au chantier du client et validé par vous. L'automatisation sert à ne pas oublier, pas à écrire à votre place." },
      { q: "Que faire si le client ne répond jamais ?", a: "Après deux relances, classez le devis comme sans suite, en gardant une note pour reprendre contact plus tard si le contexte change." },
    ],
    linksTitle: "Pour aller plus loin",
    links: [
      { label: "Calculatrice de rendez-vous perdus", href: "/calculadora" },
      { label: "Guide : appels manqués", href: "/guide-appels-manques" },
      { label: "Guide : obtenir plus d'avis Google", href: "/guide-avis-google" },
      { label: "Tous nos métiers du bâtiment", href: "/metiers" },
      { label: "Nos services", href: "/services" },
    ],
    ctaTitle: "Parlons de vos devis",
    ctaSubtitle: "Racontez-nous comment vous suivez vos devis aujourd'hui, et on vous dit comment on s'y prendrait.",
    ctaButton: "Demander un diagnostic gratuit",
  },
  "metiers": {
    kind: "hub",
    metaTitle: `Marketing pour les entreprises du bâtiment, par métier | klik`,
    metaDescription:
      "Toutes les pages klik par métier du bâtiment : plomberie, chauffage, climatisation, électricité, couverture, rénovation énergétique, maçonnerie, peinture.",
    breadcrumb: "Métiers",
    eyebrow: "Métiers",
    h1: "Marketing pour les entreprises du bâtiment, métier par métier",
    intro:
      "klik accompagne les entreprises du bâtiment qui veulent plus de chantiers sans courir après les clients. Choisissez votre métier pour voir ce qu'on fait concrètement pour vous.",
    sections: [
      {
        title: "Ce qui revient dans tous les métiers",
        paras: ["Quel que soit le métier, on retrouve presque toujours les mêmes pertes :"],
        bullets: [
          "des appels manqués pendant les chantiers",
          "des devis envoyés puis jamais relancés",
          "trop peu d'avis Google",
          "un site et une fiche Google qui n'expliquent pas clairement ce que vous faites",
        ],
      },
      {
        title: "Comment on travaille",
        paras: ["On commence par un diagnostic gratuit de 20 minutes : on regarde votre entreprise, votre zone et ce qui vous fait perdre des clients. Si ça vous convient, on met en place un plan clair, avec ce qu'on fait et à quoi s'attendre. Sans engagement de durée."],
      },
    ],
    linksTitle: "Nos pages par métier",
    links: [
      { label: "Marketing pour les entreprises de plomberie", href: "/plomberie" },
      { label: "Marketing pour les entreprises de climatisation et de CVC", href: "/climatisation" },
      { label: "Marketing pour les entreprises d'électricité", href: "/electricite" },
      { label: "Agence marketing pour couvreurs", href: "/couvreur" },
      { label: "Agence marketing pour la rénovation énergétique", href: "/renovation-energetique" },
      { label: "Agence marketing pour chauffagistes", href: "/chauffagiste" },
      { label: "Agence marketing pour maçons", href: "/macon" },
      { label: "Agence marketing pour peintres en bâtiment", href: "/peintre-batiment" },
    ],
    ctaTitle: "On parle de votre métier ?",
    ctaSubtitle: "Dites-nous ce que vous faites et où vous intervenez, on vous répond avec la façon dont on s'y prendrait.",
    ctaButton: "Demander un diagnostic gratuit",
  },
  "services": {
    kind: "hub",
    metaTitle: `Nos services pour les entreprises du bâtiment | klik`,
    metaDescription:
      "Acquisition de clients, récupération des rendez-vous perdus, avis Google, site et fiche Google : ce que klik fait pour les entreprises du bâtiment.",
    breadcrumb: "Services",
    eyebrow: "Services",
    h1: "Nos services pour les entreprises du bâtiment",
    intro:
      "Quatre services, un même objectif : que votre agenda se remplisse sans que vous perdiez des chantiers à cause d'un appel manqué, d'un devis oublié ou d'une fiche Google vide.",
    sections: [
      {
        title: "Acquisition de clients",
        paras: ["Référencement local et campagnes ciblées pour qu'on vous trouve quand quelqu'un cherche votre métier près de chez lui."],
      },
      {
        title: "Récupération des rendez-vous perdus",
        paras: ["Suivi automatique des appels manqués et des devis sans réponse, pour qu'aucune demande n'attende."],
      },
      {
        title: "Avis et réputation",
        paras: ["On demande l'avis Google au bon moment, juste après un chantier réussi, pour que vous apparaissiez avec des avis récents."],
      },
      {
        title: "Site et fiche Google",
        paras: ["Un site clair, une page par prestation et une fiche Google complète, pensés pour qu'on vous appelle vous."],
      },
    ],
    linksTitle: "Pour aller plus loin",
    links: [
      { label: "Calculatrice de rendez-vous perdus", href: "/calculadora" },
      { label: "Guide : appels manqués", href: "/guide-appels-manques" },
      { label: "Guide : relancer ses devis", href: "/guide-relance-devis" },
      { label: "Guide : obtenir plus d'avis Google", href: "/guide-avis-google" },
      { label: "Tous nos métiers du bâtiment", href: "/metiers" },
    ],
    ctaTitle: "Quel service vous manque le plus ?",
    ctaSubtitle: "Racontez-nous votre situation, on vous dit par où on commencerait.",
    ctaButton: "Demander un diagnostic gratuit",
  },
};

const es: Record<ContentSlug, ContentPageData> = {
  "a-propos": {
    kind: "about",
    metaTitle: `Sobre klik y su fundador | ${SUFFIX.es}`,
    metaDescription:
      "klik es una agencia fundada por Raphaël Pelisson. Ayuda a las empresas de la construcción (fontanería, calefacción, climatización, electricidad, cubiertas, rehabilitación energética…) a captar clientes, recuperar citas perdidas y conseguir reseñas en Google.",
    breadcrumb: "Sobre klik",
    eyebrow: "Sobre klik",
    h1: "klik: una agencia para empresas técnicas que quieren más trabajos",
    intro:
      "klik acompaña a las empresas de la construcción (fontanería, calefacción, climatización, electricidad, cubiertas, rehabilitación energética, albañilería, pintura) en Francia y España. La idea es sencilla: una empresa que trabaja bien no debería perder trabajos por una llamada sin atender o por una ficha de Google vacía.",
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
          "Trabajamos sobre todo con empresas de la construcción: fontanería, calefacción, climatización, electricidad, cubiertas, rehabilitación energética, albañilería, pintura. Si diriges una pyme de servicios con un equipo y una agenda que llenar, hablemos.",
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
  "guide-relance-devis": {
    kind: "article",
    metaTitle: `Hacer seguimiento de un presupuesto: guía para empresas de obra | klik`,
    metaDescription:
      "Por qué un presupuesto se queda sin respuesta, cuándo y cómo retomarlo sin agobiar, y qué puede automatizar una empresa del sector de la construcción.",
    breadcrumb: "Seguimiento de presupuestos",
    eyebrow: "Guía",
    h1: "Hacer seguimiento de tus presupuestos si trabajas en la construcción",
    intro:
      "Un presupuesto enviado sin seguimiento suele quedarse sin respuesta: el cliente compara, duda o se olvida. Esto es cuándo y cómo retomarlo sin agobiar, y qué se puede automatizar para no tener que pensar en ello mientras estás en obra.",
    sections: [
      {
        title: "Por qué un presupuesto se queda sin respuesta",
        paras: ["No siempre es un no. En la construcción se repiten varios motivos:"],
        bullets: [
          "el cliente compara varias empresas antes de decidir",
          "el proyecto no es urgente y pasa a segundo plano",
          "el presupuesto se pierde entre otros correos",
          "tiene una duda pero no se atreve a llamar",
        ],
      },
      {
        title: "Cuándo retomarlo",
        paras: ["No hay una regla única, pero sí una lógica sencilla: retomarlo pronto para que el proyecto siga fresco, y no tanto como para molestar. Como referencia, a adaptar al tamaño de la obra:"],
        bullets: [
          "unos días después del envío: un mensaje corto para comprobar que llegó y resolver dudas",
          "una semana más tarde, aproximadamente: un mensaje que aporte algo útil (una precisión, una disponibilidad)",
          "dos semanas más tarde: un último mensaje amable que deje la puerta abierta",
        ],
      },
      {
        title: "Qué decir en el seguimiento",
        paras: ["El tono importa más que la longitud. Un buen seguimiento es corto, útil y fácil de contestar:"],
        bullets: [
          "recordar la obra en una frase (« tu proyecto de cubierta en … »)",
          "preguntar si hay dudas sobre el presupuesto",
          "proponer una llamada o una visita si hace falta",
          "no presionar nunca para decidir",
        ],
      },
      {
        title: "Qué se puede automatizar",
        paras: ["El objetivo no es enviar mensajes fríos, sino no olvidarse de retomar:"],
        bullets: [
          "un recordatorio en la agenda con cada presupuesto enviado",
          "un mensaje preparado que validas con un clic",
          "un seguimiento del estado de cada presupuesto (enviado, retomado, firmado, rechazado)",
          "una alerta cuando un presupuesto importante sigue sin respuesta",
        ],
      },
      {
        title: "Lo que sigue haciéndose a mano",
        paras: ["Responder dudas técnicas, ajustar un precio, llamar cuando la obra es importante: la relación sigue siendo entre tú y el cliente. La herramienta sirve para que no se escape nada, no para sustituir tu criterio."],
      },
    ],
    faq: [
      { q: "¿Cuántas veces hay que retomar un presupuesto?", a: "Con uno o dos seguimientos suele bastar. Más allá, se corre el riesgo de molestar. El último debe dejar la puerta abierta." },
      { q: "¿Un seguimiento automático resulta impersonal?", a: "No, si el mensaje es corto, está ligado a la obra del cliente y lo validas tú. La automatización sirve para no olvidar, no para escribir en tu lugar." },
      { q: "¿Qué hacer si el cliente nunca contesta?", a: "Tras dos seguimientos, archiva el presupuesto como sin respuesta, anotando que puedes volver a contactar más adelante si cambia el contexto." },
    ],
    linksTitle: "Para ir más lejos",
    links: [
      { label: "Calculadora de citas perdidas", href: "/calculadora" },
      { label: "Guía: llamadas perdidas", href: "/guide-appels-manques" },
      { label: "Guía: conseguir más reseñas en Google", href: "/guide-avis-google" },
      { label: "Todos nuestros oficios de la construcción", href: "/metiers" },
      { label: "Nuestros servicios", href: "/services" },
    ],
    ctaTitle: "Hablemos de tus presupuestos",
    ctaSubtitle: "Cuéntanos cómo haces el seguimiento hoy y te decimos cómo lo abordaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
  },
  "metiers": {
    kind: "hub",
    metaTitle: `Marketing para empresas de la construcción, por oficio | klik`,
    metaDescription:
      "Todas las páginas de klik por oficio: fontanería, calefacción, climatización, electricidad, cubiertas, rehabilitación energética, albañilería, pintura.",
    breadcrumb: "Oficios",
    eyebrow: "Oficios",
    h1: "Marketing para empresas de la construcción, oficio por oficio",
    intro:
      "klik acompaña a las empresas de la construcción que quieren más obras sin perseguir a los clientes. Elige tu oficio para ver qué hacemos concretamente por ti.",
    sections: [
      {
        title: "Lo que se repite en todos los oficios",
        paras: ["Sea cual sea el oficio, casi siempre se repiten las mismas pérdidas:"],
        bullets: [
          "llamadas perdidas durante las obras",
          "presupuestos enviados y nunca retomados",
          "muy pocas reseñas en Google",
          "una web y una ficha de Google que no explican con claridad lo que haces",
        ],
      },
      {
        title: "Cómo trabajamos",
        paras: ["Empezamos con un diagnóstico gratuito de 20 minutos: miramos tu empresa, tu zona y lo que te hace perder clientes. Si te encaja, montamos un plan claro, con lo que hacemos y qué esperar. Sin permanencia."],
      },
    ],
    linksTitle: "Nuestras páginas por oficio",
    links: [
      { label: "Marketing para empresas de fontanería", href: "/plomberie" },
      { label: "Marketing para empresas de climatización", href: "/climatisation" },
      { label: "Marketing para empresas de electricidad", href: "/electricite" },
      { label: "Agencia de marketing para empresas de tejados", href: "/couvreur" },
      { label: "Agencia de marketing para rehabilitación energética", href: "/renovation-energetique" },
      { label: "Agencia de marketing para empresas de calefacción", href: "/chauffagiste" },
      { label: "Agencia de marketing para albañiles", href: "/macon" },
      { label: "Agencia de marketing para pintores de obra", href: "/peintre-batiment" },
    ],
    ctaTitle: "¿Hablamos de tu oficio?",
    ctaSubtitle: "Dinos qué haces y dónde trabajas, y te respondemos cómo lo abordaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
  },
  "services": {
    kind: "hub",
    metaTitle: `Nuestros servicios para empresas de la construcción | klik`,
    metaDescription:
      "Captación de clientes, recuperación de citas perdidas, reseñas de Google, web y ficha de Google: lo que hace klik por las empresas de la construcción.",
    breadcrumb: "Servicios",
    eyebrow: "Servicios",
    h1: "Nuestros servicios para empresas de la construcción",
    intro:
      "Cuatro servicios, un mismo objetivo: que tu agenda se llene sin que pierdas obras por una llamada perdida, un presupuesto olvidado o una ficha de Google vacía.",
    sections: [
      {
        title: "Captación de clientes",
        paras: ["SEO local y campañas para que te encuentren cuando alguien busca tu oficio cerca de casa."],
      },
      {
        title: "Recuperación de citas perdidas",
        paras: ["Seguimiento automático de las llamadas perdidas y de los presupuestos sin respuesta, para que ninguna solicitud espere."],
      },
      {
        title: "Reseñas y reputación",
        paras: ["Pedimos la reseña de Google en el momento adecuado, justo después de una obra bien hecha, para que aparezcas con reseñas recientes."],
      },
      {
        title: "Web y ficha de Google",
        paras: ["Una web clara, una página por servicio y una ficha de Google completa, pensadas para que te llamen a ti."],
      },
    ],
    linksTitle: "Para ir más lejos",
    links: [
      { label: "Calculadora de citas perdidas", href: "/calculadora" },
      { label: "Guía: llamadas perdidas", href: "/guide-appels-manques" },
      { label: "Guía: hacer seguimiento de presupuestos", href: "/guide-relance-devis" },
      { label: "Guía: conseguir más reseñas en Google", href: "/guide-avis-google" },
      { label: "Todos nuestros oficios de la construcción", href: "/metiers" },
    ],
    ctaTitle: "¿Qué servicio te hace más falta?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos por dónde empezaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
  },
};

const en: Record<ContentSlug, ContentPageData> = {
  "a-propos": {
    kind: "about",
    metaTitle: `About klik and its founder | ${SUFFIX.en}`,
    metaDescription:
      "klik is an agency founded by Raphaël Pelisson. It helps building businesses (plumbing, heating, HVAC, electrical, roofing, energy renovation…) win customers, recover lost appointments and earn Google reviews.",
    breadcrumb: "About klik",
    eyebrow: "About klik",
    h1: "klik: an agency for technical businesses that want more jobs",
    intro:
      "klik works with building businesses (plumbing, heating, HVAC, electrical, roofing, energy renovation, masonry, painting) in France and Spain. The idea is simple: a company that does good work should not lose jobs because of a missed call or an empty Google listing.",
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
          "We mostly work with building businesses: plumbing, heating, air conditioning, electrical, roofing, energy renovation, masonry, painting. If you run a service business with a team and a calendar to fill, let's talk.",
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
  "guide-relance-devis": {
    kind: "article",
    metaTitle: `Following up a quote: a guide for building trades | klik`,
    metaDescription:
      "Why a quote goes unanswered, when and how to follow it up without being pushy, and what a building business can automate.",
    breadcrumb: "Following up quotes",
    eyebrow: "Guide",
    h1: "Following up your quotes when you work in the building trades",
    intro:
      "A quote sent without follow-up often goes unanswered: the customer compares, hesitates or forgets. Here is when and how to follow up without being pushy, and what you can automate so you don't have to think about it while you're on site.",
    sections: [
      {
        title: "Why a quote goes unanswered",
        paras: ["It isn't necessarily a no. In the building trades, a few reasons come up again and again:"],
        bullets: [
          "the customer is comparing several companies before deciding",
          "the project isn't urgent and slips down the list",
          "the quote gets lost among other emails",
          "they have a question but don't like to call",
        ],
      },
      {
        title: "When to follow up",
        paras: ["There's no single rule, but a simple logic: follow up early enough to keep the project fresh, and not so often that it gets annoying. As a rough guide, to adapt to the size of the job:"],
        bullets: [
          "a few days after sending: a short message to check the quote arrived and to answer questions",
          "about a week later: a message that adds something useful (a detail, an availability)",
          "two weeks later: a last polite message that leaves the door open",
        ],
      },
      {
        title: "What to say in the follow-up",
        paras: ["Tone matters more than length. A good follow-up is short, useful and easy to answer:"],
        bullets: [
          "recall the job in one sentence (\"your roofing project at …\")",
          "ask whether there are questions about the quote",
          "offer a call or a visit if needed",
          "never pressure the decision",
        ],
      },
      {
        title: "What you can automate",
        paras: ["The goal isn't to send cold messages, but to stop forgetting to follow up:"],
        bullets: [
          "a calendar reminder for every quote sent",
          "a pre-written message you approve in one click",
          "a status tracker for each quote (sent, followed up, signed, declined)",
          "an alert when an important quote stays unanswered",
        ],
      },
      {
        title: "What stays manual",
        paras: ["Answering technical questions, adjusting a price, calling when the job is large: the relationship stays between you and the customer. The tool is there so nothing slips through, not to replace your judgment."],
      },
    ],
    faq: [
      { q: "How many times should I follow up a quote?", a: "One or two follow-ups are usually enough. Beyond that, you risk annoying the customer. The last one should leave the door open." },
      { q: "Does an automatic follow-up feel impersonal?", a: "Not if the message is short, tied to the customer's job and approved by you. Automation is there so you don't forget, not to write in your place." },
      { q: "What if the customer never replies?", a: "After two follow-ups, mark the quote as closed, keeping a note so you can get back in touch later if circumstances change." },
    ],
    linksTitle: "Going further",
    links: [
      { label: "Missed-appointments calculator", href: "/calculadora" },
      { label: "Guide: missed calls", href: "/guide-appels-manques" },
      { label: "Guide: getting more Google reviews", href: "/guide-avis-google" },
      { label: "All our building trades", href: "/metiers" },
      { label: "Our services", href: "/services" },
    ],
    ctaTitle: "Let's talk about your quotes",
    ctaSubtitle: "Tell us how you follow up quotes today, and we'll tell you how we'd approach it.",
    ctaButton: "Request a free diagnosis",
  },
  "metiers": {
    kind: "hub",
    metaTitle: `Marketing for building businesses, trade by trade | klik`,
    metaDescription:
      "All klik pages by trade: plumbing, heating, air conditioning, electrical, roofing, energy renovation, masonry, painting.",
    breadcrumb: "Trades",
    eyebrow: "Trades",
    h1: "Marketing for building businesses, trade by trade",
    intro:
      "klik works with building businesses that want more jobs without chasing customers. Pick your trade to see what we concretely do for you.",
    sections: [
      {
        title: "What comes up in every trade",
        paras: ["Whatever the trade, the same losses nearly always appear:"],
        bullets: [
          "missed calls while on site",
          "quotes sent and never followed up",
          "too few Google reviews",
          "a website and Google listing that don't clearly explain what you do",
        ],
      },
      {
        title: "How we work",
        paras: ["We start with a free 20-minute diagnosis: we look at your business, your area and what's losing you customers. If it suits you, we set up a clear plan with what we do and what to expect. No lock-in."],
      },
    ],
    linksTitle: "Our pages by trade",
    links: [
      { label: "Marketing for plumbing businesses", href: "/plomberie" },
      { label: "Marketing for HVAC and air conditioning businesses", href: "/climatisation" },
      { label: "Marketing for electrical businesses", href: "/electricite" },
      { label: "Marketing agency for roofing companies", href: "/couvreur" },
      { label: "Marketing agency for energy renovation", href: "/renovation-energetique" },
      { label: "Marketing agency for heating companies", href: "/chauffagiste" },
      { label: "Marketing agency for masons", href: "/macon" },
      { label: "Marketing agency for painters and decorators", href: "/peintre-batiment" },
    ],
    ctaTitle: "Shall we talk about your trade?",
    ctaSubtitle: "Tell us what you do and where you work, and we'll tell you how we'd approach it.",
    ctaButton: "Request a free diagnosis",
  },
  "services": {
    kind: "hub",
    metaTitle: `Our services for building businesses | klik`,
    metaDescription:
      "Customer acquisition, recovering lost appointments, Google reviews, website and Google listing: what klik does for building businesses.",
    breadcrumb: "Services",
    eyebrow: "Services",
    h1: "Our services for building businesses",
    intro:
      "Four services, one goal: a calendar that fills up without you losing jobs to a missed call, a forgotten quote or an empty Google listing.",
    sections: [
      {
        title: "Customer acquisition",
        paras: ["Local SEO and targeted campaigns so you show up when someone searches for your trade nearby."],
      },
      {
        title: "Recovering lost appointments",
        paras: ["Automatic follow-up on missed calls and unanswered quotes, so no request waits."],
      },
      {
        title: "Reviews and reputation",
        paras: ["We ask for the Google review at the right moment, right after a successful job, so you appear with recent reviews."],
      },
      {
        title: "Website and Google listing",
        paras: ["A clear website, one page per service and a complete Google listing, built so people call you."],
      },
    ],
    linksTitle: "Going further",
    links: [
      { label: "Missed-appointments calculator", href: "/calculadora" },
      { label: "Guide: missed calls", href: "/guide-appels-manques" },
      { label: "Guide: following up quotes", href: "/guide-relance-devis" },
      { label: "Guide: getting more Google reviews", href: "/guide-avis-google" },
      { label: "All our building trades", href: "/metiers" },
    ],
    ctaTitle: "Which service do you need most?",
    ctaSubtitle: "Tell us your situation and we'll tell you where we'd start.",
    ctaButton: "Request a free diagnosis",
  },
};

const ALL: Record<Locale, Record<ContentSlug, ContentPageData>> = { fr, es, en };

export function getContentPage(locale: Locale, slug: ContentSlug): ContentPageData {
  return ALL[locale][slug];
}
