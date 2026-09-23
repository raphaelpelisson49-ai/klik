import type { Dictionary } from "./es";

const fr: Dictionary = {
  meta: {
    title: "klik | Votre agenda plein, sans petites lignes",
    description:
      "klik aide les patrons de PME techniques à avoir l'agenda plein de clients grâce à l'IA, sans perdre leurs week-ends dans le marketing.",
  },

  nav: {
    calculadora: "Calculatrice",
    diagnostico: "Diagnostic",
    servicios: "Services",
    proceso: "Comment on travaille",
    preguntas: "Questions",
    cta: "Racontez-nous votre problème",
  },

  marquee: [
    "On remplit votre agenda",
    "On récupère vos rendez-vous perdus",
    "Des avis qui vous font ressortir",
    "Un site et une fiche qui convertissent",
    "Des rapports de cinq minutes",
    "À vos côtés chaque semaine",
  ],

  hero: {
    eyebrow: "Découvrez ce qui se passe vraiment dans votre entreprise",
    words: [
      { t: "Votre", c: false },
      { t: "agenda", c: false },
      { t: "plein,", c: false },
      { t: "sans", c: true },
      { t: "petites", c: true },
      { t: "lignes.", c: true },
    ],
    paragraph:
      "Avant de vous vendre quoi que ce soit, nous voulons comprendre ce qui vous arrive vraiment. Racontez-le-nous et on vous montre, tout de suite, comment on y penserait avec l'IA.",
    ctaPrimary: "Racontez-nous votre problème",
    ctaSecondary: "Comment on travaille",
    quote: "Si ça vous convient, on en parle. Sinon, pas de souci.",
  },

  heroTeaser: {
    title: "Combien vous échappe chaque mois ?",
    subtitle: "Calculez-le avec vos propres chiffres",
  },

  agenda: {
    label: "Un mois comme un autre",
    badge: "se remplit tout seul",
    footer: "Voici à quoi ressemble un agenda qui ne dépend pas de la chance.",
    days: ["L", "M", "M", "J", "V", "S", "D"],
  },

  diagnostic: {
    eyebrow: "Commencez ici",
    title: "Dites-nous ce qui vous arrive",
    subtitle:
      "Pas besoin de connaître le marketing. Écrivez-le avec vos mots — on repère le schéma et on vous montre par où on commencerait. Le plan complet, on vous le donne quand on se parle.",
    question: "Qu'est-ce qui vous arrive ?",
    placeholder:
      "Ex. : « Mon agenda est plein certains jours et vide d'autres, et je ne sais pas pourquoi je perds des clients le week-end... »",
    chips: [
      "Je rate beaucoup d'appels",
      "On ne me trouve pas sur Google",
      "Je perds des rendez-vous sans savoir pourquoi",
      "Je n'ai pas assez d'avis clients",
      "Je travaille beaucoup et je gagne peu",
    ],
    analyzeButton: "Voir ce qui se passe",
    loadingButton: "Recherche du schéma…",
    loadingText: "Recherche du schéma",
    disclaimer:
      "Diagnostic indicatif à partir de ce que vous nous racontez. Ce n'est pas une analyse garantie — pour ça, on parle de votre cas réel.",
    idleTitle: "Votre diagnostic apparaît ici.",
    idleSubtitle: "Écrivez votre problème ou choisissez une des phrases à gauche.",
    resultCta: "Racontez-nous les détails →",
    mail: {
      subjectPrefix: "Diagnostic :",
      greeting: "Bonjour,",
      intro: 'Je vous écris parce que j\'ai testé le diagnostic du site et le résultat est "{{tag}}".',
      yourWords: "Mon problème, avec mes mots :",
      closing: "On en parle ?",
    },
    categories: [
      {
        tag: "Suivi",
        keywords: ["appel", "réponds", "répond", "répondre", "whatsapp", "message", "décroche", "décrocher", "téléphone", "tel"],
        headline: "Ce n'est pas un problème de clients. C'est un problème de suivi.",
        body: "Il est probable que les clients intéressés ne manquent pas — c'est la réponse à temps qui manque. La plupart des rendez-vous se perdent dans les premières heures sans réponse, pas à cause du prix ni de la concurrence.",
        teaser: "Le premier levier serait d'automatiser ce premier contact pour que personne n'attende. Comment le faire exactement, avec quel outil et en combien de temps ça se voit — on vous l'explique quand on se parle.",
      },
      {
        tag: "Visibilité",
        keywords: ["google", "trouve", "trouvent", "cherchent", "maps", "position", "site", "internet", "référencement", "referencement"],
        headline: "Le problème, ce n'est pas votre travail. C'est qu'on ne vous voit pas avant d'avoir besoin de vous.",
        body: "Quand quelqu'un cherche votre service dans votre secteur, vous devriez faire partie des premiers résultats. Si vous n'y êtes pas, ce client appelle déjà quelqu'un d'autre — même si votre travail est meilleur.",
        teaser: "Le premier levier serait votre fiche Google et votre position dans les recherches locales. Le plan complet — quoi faire en premier et à quoi s'attendre — on vous le donne quand on se parle.",
      },
      {
        tag: "Réputation",
        keywords: ["avis", "note", "notes", "étoiles", "etoiles", "opinion", "réputation", "reputation"],
        headline: "Votre travail parle de lui-même. Le problème, c'est que personne ne le répète à voix haute.",
        body: "Vous avez des clients satisfaits, mais les avis n'apparaissent pas tout seuls : il faut les demander au bon moment. Sans eux, un nouveau client n'a aucun moyen de vous différencier des autres.",
        teaser: "Le premier levier serait de systématiser quand et comment demander l'avis. Le reste du processus, on vous l'explique tranquillement quand on se parle.",
      },
      {
        tag: "Gestion de l'agenda",
        keywords: ["agenda", "créneau", "creneau", "créneaux", "creneaux", "annulation", "annule", "rendez-vous", "rdv"],
        headline: "Ce ne sont pas les heures qui manquent. Ce sont les rendez-vous vraiment confirmés.",
        body: "Un agenda avec des trous isolés est rarement un problème de demande : c'est en général un problème de confirmation et de rappel. Les trous s'ouvrent à cause d'annulations de dernière minute, pas d'un manque d'intérêt.",
        teaser: "Le premier levier serait un rappel automatique avant chaque rendez-vous. Comment le mettre en place pour votre cas précis — on vous l'explique quand on se parle.",
      },
      {
        tag: "Concurrence",
        keywords: ["concurrence", "concurrent", "voisin", "pas cher", "prix", "rival"],
        headline: "Vous ne travaillez pas moins bien. Vous êtes juste moins visible au moment de la décision.",
        body: "Quand deux entreprises proposent quelque chose de similaire, c'est celle qui apparaît en premier et qui inspire le plus confiance dans les premières secondes qui gagne — pas toujours la moins chère.",
        teaser: "Le premier levier serait de renforcer justement ces premières secondes : ce que voit un nouveau client avant d'appeler. Le reste du plan, on vous le donne quand on se parle.",
      },
      {
        tag: "Charge de travail",
        keywords: ["fatigué", "fatigue", "week-end", "weekend", "épuisé", "epuise", "pas le temps", "trop de travail", "débordé", "deborde"],
        headline: "Le problème, ce n'est pas que vous travaillez beaucoup. C'est que le marketing vous mange tout votre temps.",
        body: "Si vous passez le week-end à répondre aux messages et à publier des photos, il ne vous reste plus de temps pour ce qui rapporte vraiment : le métier. Tôt ou tard, ça se paie.",
        teaser: "Le premier levier serait de vous décharger de cette partie et de ne vous laisser que la décision. Comment se répartit exactement le travail — on vous l'explique quand on se parle.",
      },
    ],
    fallback: {
      tag: "Diagnostic général",
      headline: "Avec ça, on voit déjà quelque chose, mais il nous faut encore quelques détails.",
      body: "Les entreprises techniques perdent presque toujours des clients à trois endroits : on ne les trouve pas, on ne leur répond pas à temps, ou on ne revient jamais vers eux. Avec ce que vous nous racontez, on a déjà une idée de la direction.",
      teaser: "Le moyen le plus rapide d'en être sûr, c'est de nous en dire plus — on vous explique exactement ce qui se passe.",
    },
  },

  historia: {
    number: "01",
    title: "Des métiers techniques à l'intelligence artificielle",
    p1: "klik naît d'un parcours peu conventionnel : des années de métiers techniques, de travaux exigeants et appris sur le terrain. Solides, respectables — mais qui laissaient un sentiment persistant d'avenir bouché.",
    p2: "La découverte de l'intelligence artificielle a été le tournant : non pas comme un concept abstrait, mais comme un outil applicable à des problèmes réels de gens réels. La combinaison du savoir-faire technique avec des systèmes d'IA a donné naissance à klik.",
    missionLabel: "Notre mission",
    missionQuote: "Aider les patrons de PME techniques à avoir l'agenda plein sans perdre leurs week-ends dans le marketing.",
    valores: [
      { title: "Transparence radicale", description: "On dit ce qui marche et ce qui ne marche pas." },
      { title: "Résultats mesurables", description: "Des chiffres, pas des impressions." },
      { title: "Proximité sans jargon", description: "On parle le langage du métier." },
      { title: "Engagement réel", description: "C'est nous qui prenons le risque." },
      { title: "Croissance partagée", description: "On nous a aidés à grandir, on rend cette aide." },
    ],
  },

  servicios: {
    number: "02",
    title: "Ce qu'on fait pour votre entreprise",
    subtitle:
      "Pas de solutions omnicanales ni de growth marketing. Des services concrets, expliqués comme on les expliquerait à un client de toujours.",
    items: [
      { title: "On remplit votre agenda", description: "Des campagnes et des recherches locales qui font sonner le téléphone, pas qui font monter un graphique dans un rapport." },
      { title: "On récupère les rendez-vous perdus", description: "Suivi automatique de qui pose une question et ne répond pas. Aucun client n'attend." },
      { title: "Des avis qui vous font ressortir", description: "On demande l'avis au bon moment pour que vous appariez en premier quand on vous cherche sur Google." },
      { title: "Un site et une fiche qui convertissent", description: "Un site et une fiche Google conçus pour qu'on vous appelle vous, pas le voisin." },
      { title: "Des rapports de cinq minutes", description: "Combien de clients, combien coûte chacun, et la suite. Sans jargon, sans remplissage." },
      { title: "À vos côtés chaque semaine", description: "On ajuste la stratégie selon ce qui marche vraiment, pas selon ce qui sonne bien." },
    ],
  },

  proceso: {
    number: "03",
    title: "Du premier appel à l'agenda plein",
    steps: [
      { step: "01", title: "Diagnostic gratuit", description: "On regarde votre entreprise, votre secteur et qui vous fait perdre des clients. Sans engagement." },
      { step: "02", title: "Plan clair", description: "On vous dit ce qu'on va faire et à quoi s'attendre. Sans petites lignes." },
      { step: "03", title: "Mise en route", description: "On démarre en quelques jours, pas en quelques mois. Les appels arrivent dès la première semaine." },
      { step: "04", title: "Ajustement hebdomadaire", description: "On mesure, on ajuste, on continue. Vous décidez si on poursuit." },
    ],
  },

  nuncaHacemos: {
    number: "04",
    title: "Ce qu'on ne fait jamais",
    subtitle: "Ce n'est pas une liste de style : c'est la limite de la marque. Toute promesse qui l'enfreint ne sort pas — même si elle fonctionne.",
    comunicacionLabel: "En communication",
    comunicacionItems: [
      "On ne promet jamais de résultats garantis dans des délais irréalistes.",
      "On n'utilise jamais de fausse urgence ni de pénurie inventée.",
      "On ne parle jamais en mal de la concurrence en la nommant.",
      "On n'utilise jamais de jargon marketing sans l'expliquer dans la même phrase.",
      "On ne traite jamais le client comme s'il ne comprenait rien aux affaires.",
    ],
    productoLabel: "En produit",
    productoItems: [
      "On ne vend jamais de leads partagés avec votre concurrence.",
      "On ne remet jamais un rapport qui ne se comprend pas en cinq minutes.",
      "On ne vous laisse jamais sans savoir ce qui se passe si vous annulez.",
    ],
    closingQuote: "C'est moi qui prends le risque, pas vous.",
  },

  faq: {
    number: "05",
    title: "Questions fréquentes",
    items: [
      { q: "Que faites-vous exactement ?", a: "On remplit votre agenda de clients. Sans que vous ayez besoin de comprendre le marketing." },
      { q: "Comment savoir que ça marche ?", a: "C'est normal de douter. C'est pour ça qu'on mesure sur 3 semaines et que c'est vous qui décidez si on continue." },
      { q: "Avec quel type d'entreprises travaillez-vous ?", a: "Avec des PME techniques en général : si votre activité se planifie avec des clients et s'exécute sur place, on parle votre langage. Racontez-nous la vôtre et on voit si ça colle." },
      { q: "Que se passe-t-il si je veux annuler ?", a: "Vous nous le dites et on arrête. On ne vous laisse jamais sans savoir ce qui se passe si vous annulez — sans engagement de durée." },
      { q: "Garantissez-vous des résultats ?", a: "Non. On ne promet jamais de résultats dans des délais irréalistes. Ce qu'on fait, c'est mesurer chaque semaine et vous montrer les chiffres tels qu'ils sont." },
    ],
  },

  ctaFinal: {
    title: "On parle de votre problème ?",
    subtitle: "Vous savez maintenant comment on pense. Racontez-nous le vôtre en détail et on vous dit, sans détour, comment on le résoudrait.",
    button: "Écrivez-moi : klikia@klikagencies.com",
    backLink: "↑ Retour à mon diagnostic",
  },

  footer: {
    tagline: "Acquisition de clients avec l'IA pour les PME techniques.",
    serviciosTitle: "Services",
    servicios: ["Acquisition de clients", "Récupération de rendez-vous", "Avis et réputation", "Site et fiche Google"],
    siteTitle: "klik",
    siteLinks: [
      { label: "Calculatrice", href: "/calculadora" },
      { label: "Diagnostic", href: "/#diagnostico" },
      { label: "Notre histoire", href: "/#historia" },
      { label: "Comment on travaille", href: "/#proceso" },
      { label: "Questions", href: "/#preguntas" },
    ],
    contactTitle: "Contact",
    copyright: "klik · Votre agenda plein, sans petites lignes.",
    legal: { avisoLegal: "Mentions légales", privacidad: "Confidentialité", cookies: "Cookies" },
  },

  calculadoraPage: {
    metaTitle: "Calculatrice | klik",
    metaDescription:
      "Calculez, avec vos propres chiffres, combien d'argent peut vous échapper chaque mois à cause de rendez-vous perdus et d'appels sans réponse à temps.",
    eyebrow: "Calculatrice",
    title: "Regardez ce qui vous échappe",
    subtitle:
      "Deux façons de perdre de l'argent sans s'en rendre compte : des rendez-vous d'entretien que personne ne récupère, et des appels auxquels personne ne répond à temps. Ajustez les chiffres aux vôtres.",
    closingTitle: "Ces chiffres ne sont qu'un point de départ",
    closingSubtitle: "Avec vos chiffres réels, le résultat exact peut être différent — en bien ou en mal. Racontez-nous votre cas et regardons-le ensemble.",
    closingButton: "Écrivez-moi : klikia@klikagencies.com",
    closingBack: "↑ Ou dites-nous ce qui vous arrive",
  },

  calculators: {
    numberLocale: "fr-FR",
    disclaimer:
      "Calcul indicatif à partir des chiffres que vous ajustez vous-même — ce ne sont pas les données d'un client réel ni une prévision garantie. Quand on se parle, on le fait avec vos chiffres exacts.",
    monthSuffix: "par mois",
    yearSuffix: "par an",
    total: {
      label: "En additionnant les deux tableaux ci-dessous",
      resultLine: "pourraient vous échapper chaque mois",
      button: "Racontez-nous votre cas réel →",
      mail: {
        subject: "Calculatrices — total combiné",
        greeting: "Bonjour,",
        intro: "J'ai testé les deux calculatrices du site :",
        line1: "Rendez-vous d'entretien perdus :",
        line2: "Appels sans réponse à temps :",
        totalLine: "Total combiné :",
        closing: "On parle de mon cas réel ?",
      },
    },
    maintenance: {
      tag: "Tableau 1 · Entretiens",
      title: "Ce qui se perd sur les contrats d'entretien",
      fields: {
        technicians: "Techniciens qui font uniquement des entretiens",
        perTechMonth: "Entretiens par technicien et par mois",
        price: "Prix moyen d'un entretien",
        lossPercent: "Rendez-vous perdus",
      },
      resultLabel: "Avec ces chiffres, chaque mois",
      resultLine: "s'échappent sans que personne ne le remarque",
      statTotal: "entretiens par mois",
      statLost: "se perdent par mois",
      statPerTech: "par technicien et par mois",
      button: "Calculez le mien avec vous →",
      mail: {
        subject: "Calculatrice — rendez-vous d'entretien perdus",
        greeting: "Bonjour,",
        intro: "J'ai testé la calculatrice des rendez-vous d'entretien perdus avec ces chiffres :",
        lineTechnicians: "Techniciens d'entretien :",
        linePerTech: "Entretiens par technicien/mois :",
        linePrice: "Prix moyen :",
        lineLoss: "% de rendez-vous perdus :",
        result: "Résultat :",
        closing: "On parle de mon cas réel ?",
      },
    },
    calls: {
      tag: "Tableau 2 · Appels et messages",
      title: "Ce qui se perd en ne répondant pas à temps",
      fields: {
        volume: "Appels ou messages reçus par mois",
        missedPercent: "Ceux qui ne reçoivent pas de réponse à temps",
        conversionPercent: "Parmi eux, ceux qui seraient devenus clients",
        ticket: "Panier moyen par client",
      },
      resultLabel: "Avec ces chiffres, chaque mois",
      resultLine: "s'échappent sans que personne ne le remarque",
      statMissed: "appels sans réponse à temps/mois",
      statLostClients: "clients qui n'en deviennent jamais",
      button: "Calculez le mien avec vous →",
      mail: {
        subject: "Calculatrice — appels perdus",
        greeting: "Bonjour,",
        intro: "J'ai testé la calculatrice des appels perdus avec ces chiffres :",
        lineVolume: "Appels ou messages par mois :",
        lineMissed: "% sans réponse à temps :",
        lineConversion: "% de conversion si réponse à temps :",
        lineTicket: "Panier moyen :",
        result: "Résultat :",
        closing: "On parle de mon cas réel ?",
      },
    },
  },

  notFound: {
    title: "Cette page n'existe pas",
    subtitle: "Le lien est peut-être mal écrit ou la page n'est plus ici. Retournez à l'accueil ou dites-nous ce que vous cherchiez.",
    backHome: "← Retour à l'accueil",
  },

  legalShell: {
    backLink: "← Retour au site",
    documentLabel: "Document légal",
    updatedLabel: "Dernière mise à jour :",
  },
};

export default fr;
