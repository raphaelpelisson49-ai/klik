import type { Locale } from "./locales";

export const NICHES = ["climatisation", "plomberie", "electricite", "couvreur", "renovation-energetique", "chauffagiste", "macon", "peintre-batiment"] as const;
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
  fr: { climatisation: "Climatisation et CVC", plomberie: "Plomberie", electricite: "Électricité", couvreur: "Couverture et toiture", "renovation-energetique": "Rénovation énergétique", chauffagiste: "Chauffage", macon: "Maçonnerie et gros œuvre", "peintre-batiment": "Peinture en bâtiment" },
  es: { climatisation: "Climatización", plomberie: "Fontanería", electricite: "Electricidad", couvreur: "Cubiertas y tejados", "renovation-energetique": "Rehabilitación energética", chauffagiste: "Calefacción", macon: "Albañilería y obra", "peintre-batiment": "Pintura de obra" },
  en: { climatisation: "HVAC and air conditioning", plomberie: "Plumbing", electricite: "Electrical", couvreur: "Roofing", "renovation-energetique": "Energy renovation", chauffagiste: "Heating", macon: "Masonry and building", "peintre-batiment": "Painting and decorating" },
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
  "couvreur": {
    metaTitle: `Agence marketing couvreur : plus de chantiers | klik`,
    metaDescription:
      "klik aide les couvreurs à être trouvés sur Google, à ne plus perdre de demandes de devis ni d'urgences, et à récolter des avis. Diagnostic gratuit.",
    eyebrow: "Couverture et toiture",
    h1: "Agence marketing pour couvreurs : plus de chantiers de toiture",
    intro:
      "Une agence marketing pour couvreurs aide votre entreprise à apparaître quand quelqu'un cherche une réparation ou une rénovation de toiture près de chez lui. Fuite, tuiles cassées, isolation : le client appelle souvent parmi les premières entreprises qu'il trouve sur Google. On met en place ce qu'il faut pour que ce soit la vôtre.",
    problemsTitle: "Ce qu'on voit chez les couvreurs",
    problems: [
      { title: "La fuite qui part chez un autre", text: "Vous êtes sur un toit, le téléphone sonne dans le vide, et le client appelle l'entreprise suivante dans la liste." },
      { title: "Des devis de toiture jamais relancés", text: "Un gros chantier se décide en réfléchissant. Sans relance, le devis reste sans réponse et le client signe ailleurs." },
      { title: "Des avis qui rassurent trop peu", text: "Avant un gros chantier, le client regarde les avis. Une fiche Google peu fournie fait hésiter." },
    ],
    helpTitle: "Ce qu'on fait pour vous",
    help: [
      { title: "On remplit votre agenda", text: "Référencement local et campagnes ciblées pour qu'on vous trouve quand on cherche une réparation ou une rénovation de toiture dans votre zone." },
      { title: "On récupère les rendez-vous perdus", text: "Suivi automatique des appels manqués et des devis restés sans réponse, pour qu'aucune demande n'attende." },
      { title: "Des avis qui vous font ressortir", text: "On demande l'avis Google au bon moment, juste après un chantier terminé." },
      { title: "Un site et une fiche qui convertissent", text: "Un site clair, une page par prestation et une fiche Google complète, pensés pour qu'on vous appelle vous." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Un chantier de toiture se décide-t-il vraiment sur Google ?", a: "Souvent, oui : le client cherche un couvreur près de chez lui et appelle parmi les premiers résultats. Être visible et rassurer avec des avis augmente vos chances d'être appelé, sans garantie." },
      { q: "Et si je ne peux pas répondre pendant une urgence ?", a: "On met en place un suivi qui relance rapidement les appels manqués, pour que la demande ne parte pas chez un concurrent." },
      { q: "En combien de temps voit-on des résultats ?", a: "On mesure sur 3 semaines et c'est vous qui décidez si on continue. Le référencement local demande en général plus de temps. On ne promet jamais de résultats garantis." },
    ],
    ctaTitle: "On parle de votre entreprise ?",
    ctaSubtitle: "Racontez-nous votre situation et on vous dit, franchement, comment on s'y prendrait.",
    ctaButton: "Demander un diagnostic gratuit",
    calculatorLink: "Calculez ce qui vous échappe chaque mois",
  },
  "renovation-energetique": {
    metaTitle: `Agence marketing rénovation énergétique | klik`,
    metaDescription:
      "klik aide les entreprises de rénovation énergétique à être trouvées sur Google, à relancer chaque demande de devis et à récolter des avis. Diagnostic gratuit.",
    eyebrow: "Rénovation énergétique",
    h1: "Agence marketing pour entreprises de rénovation énergétique",
    intro:
      "Isolation, pompe à chaleur, fenêtres, ventilation : un propriétaire qui prépare des travaux compare plusieurs entreprises avant de signer. Une agence marketing pour la rénovation énergétique s'occupe de votre visibilité locale, de vos demandes de devis et de vos avis, pour que vos prospects vous appellent vous plutôt qu'un concurrent.",
    problemsTitle: "Ce qu'on voit chez les entreprises de rénovation énergétique",
    problems: [
      { title: "Des demandes de devis qui s'éteignent", text: "Un projet de rénovation se mûrit. Sans relance, la demande reste sans réponse et le client choisit une autre entreprise." },
      { title: "Des appels pendant les chantiers", text: "Vos équipes sont sur place, le téléphone sonne dans le vide, et la demande part ailleurs." },
      { title: "Un site qui n'explique pas vos prestations", text: "Si le site ne détaille pas chaque travaux et chaque zone d'intervention, on vous trouve moins et on vous fait moins confiance." },
    ],
    helpTitle: "Ce qu'on fait pour vous",
    help: [
      { title: "On remplit votre agenda", text: "Référencement local et campagnes ciblées pour qu'on vous trouve quand on cherche des travaux d'isolation, de chauffage ou de fenêtres dans votre zone." },
      { title: "On récupère les rendez-vous perdus", text: "Suivi automatique des appels manqués et des devis restés sans réponse." },
      { title: "Des avis qui vous font ressortir", text: "On demande l'avis Google au bon moment, juste après un chantier réussi." },
      { title: "Un site et une fiche qui convertissent", text: "Une page par type de travaux, une fiche Google complète et un parcours clair vers le devis." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Faut-il s'y connaître en marketing ?", a: "Non. On vous explique chaque action en termes simples, sans jargon." },
      { q: "En combien de temps voit-on des résultats ?", a: "On mesure sur 3 semaines et c'est vous qui décidez si on continue. Le référencement local demande en général plus de temps. On ne promet jamais de résultats garantis." },
      { q: "Que se passe-t-il si je veux arrêter ?", a: "Vous nous le dites et on arrête, sans engagement de durée." },
    ],
    ctaTitle: "On parle de votre entreprise ?",
    ctaSubtitle: "Racontez-nous votre situation et on vous dit, franchement, comment on s'y prendrait.",
    ctaButton: "Demander un diagnostic gratuit",
    calculatorLink: "Calculez ce qui vous échappe chaque mois",
  },
  "chauffagiste": {
    metaTitle: `Agence marketing chauffagiste : plus de clients | klik`,
    metaDescription:
      "klik aide les chauffagistes à être trouvés sur Google, à ne plus perdre d'appels de panne ni de devis, et à récolter des avis. Diagnostic gratuit.",
    eyebrow: "Chauffage",
    h1: "Agence marketing pour chauffagistes",
    intro:
      "Une agence marketing pour chauffagistes aide votre entreprise à être trouvée quand quelqu'un cherche une installation, un entretien ou un dépannage de chaudière ou de pompe à chaleur près de chez lui. En cas de panne, le client appelle souvent parmi les premières entreprises qu'il trouve sur Google. On met en place ce qu'il faut pour que ce soit la vôtre.",
    problemsTitle: "Ce qu'on voit chez les chauffagistes",
    problems: [
      { title: "La panne qui part chez un autre", text: "Vos techniciens sont chez un client, le téléphone sonne dans le vide, et la personne en panne appelle l'entreprise suivante." },
      { title: "Des entretiens jamais reprogrammés", text: "Sans relance régulière, l'entretien annuel n'est pas replanifié et le chiffre d'affaires s'échappe sans bruit." },
      { title: "Une fiche Google peu convaincante", text: "Peu d'avis, des horaires ou des services mal renseignés : on vous trouve moins et on vous fait moins confiance." },
    ],
    helpTitle: "Ce qu'on fait pour vous",
    help: [
      { title: "On remplit votre agenda", text: "Référencement local et campagnes ciblées pour qu'on vous trouve quand on cherche une installation, un entretien ou un dépannage de chauffage dans votre zone." },
      { title: "On récupère les rendez-vous perdus", text: "Suivi automatique des appels manqués, des devis restés sans réponse et des entretiens à reprogrammer." },
      { title: "Des avis qui vous font ressortir", text: "On demande l'avis Google au bon moment, juste après une intervention réussie." },
      { title: "Un site et une fiche qui convertissent", text: "Un site clair, une page par prestation et une fiche Google complète, pensés pour qu'on vous appelle vous." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Travaillez-vous aussi avec la climatisation ?", a: "Oui. La climatisation et le CVC ont leur propre page. Si vous faites les deux, on s'occupe de l'ensemble de votre activité." },
      { q: "Comment ne pas rater un appel de panne ?", a: "On met en place un suivi qui relance rapidement les appels manqués, pour que la demande ne parte pas chez un concurrent." },
      { q: "En combien de temps voit-on des résultats ?", a: "On mesure sur 3 semaines et c'est vous qui décidez si on continue. Le référencement local demande en général plus de temps. On ne promet jamais de résultats garantis." },
    ],
    ctaTitle: "On parle de votre entreprise ?",
    ctaSubtitle: "Racontez-nous votre situation et on vous dit, franchement, comment on s'y prendrait.",
    ctaButton: "Demander un diagnostic gratuit",
    calculatorLink: "Calculez ce qui vous échappe chaque mois",
  },
  "macon": {
    metaTitle: `Agence marketing maçon : plus de chantiers | klik`,
    metaDescription:
      "klik aide les maçons et entreprises de gros œuvre à être trouvés sur Google, à relancer leurs devis et à récolter des avis. Diagnostic gratuit.",
    eyebrow: "Maçonnerie et gros œuvre",
    h1: "Agence marketing pour maçons et entreprises de gros œuvre",
    intro:
      "Une agence marketing pour maçons aide votre entreprise à être trouvée quand quelqu'un prépare une extension, une rénovation ou une construction près de chez lui. Ces projets sont longs à décider : le client compare, hésite, revient. On met en place ce qu'il faut pour que vous restiez la première entreprise à laquelle il pense.",
    problemsTitle: "Ce qu'on voit chez les maçons",
    problems: [
      { title: "Des devis qui traînent", text: "Un chantier de maçonnerie se décide lentement. Sans relance, le devis reste sans réponse et le client choisit une autre entreprise." },
      { title: "Des réalisations qu'on ne voit pas", text: "Sans photos de chantiers et sans page dédiée, le futur client a du mal à juger la qualité de votre travail." },
      { title: "Des appels pendant le chantier", text: "Quand toute l'équipe est sur place, le téléphone sonne dans le vide et la demande part ailleurs." },
    ],
    helpTitle: "Ce qu'on fait pour vous",
    help: [
      { title: "On remplit votre agenda", text: "Référencement local et campagnes ciblées pour qu'on vous trouve quand on cherche un maçon pour une extension, une rénovation ou une construction dans votre zone." },
      { title: "On récupère les rendez-vous perdus", text: "Suivi automatique des appels manqués et des devis restés sans réponse." },
      { title: "Des avis qui vous font ressortir", text: "On demande l'avis Google au bon moment, juste après un chantier terminé." },
      { title: "Un site et une fiche qui convertissent", text: "Un site clair avec vos réalisations, une page par type de travaux et une fiche Google complète." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Un gros chantier se décide-t-il vraiment sur Google ?", a: "Souvent, le client cherche une entreprise près de chez lui et compare les premiers résultats et leurs avis. Être visible et rassurer augmente vos chances d'être appelé, sans garantie." },
      { q: "Comment relancer un devis sans paraître insistant ?", a: "Un message court, quelques jours après l'envoi, qui demande si le client a des questions. Le but est d'aider, pas de forcer la décision." },
      { q: "En combien de temps voit-on des résultats ?", a: "On mesure sur 3 semaines et c'est vous qui décidez si on continue. Le référencement local demande en général plus de temps. On ne promet jamais de résultats garantis." },
    ],
    ctaTitle: "On parle de votre entreprise ?",
    ctaSubtitle: "Racontez-nous votre situation et on vous dit, franchement, comment on s'y prendrait.",
    ctaButton: "Demander un diagnostic gratuit",
    calculatorLink: "Calculez ce qui vous échappe chaque mois",
  },
  "peintre-batiment": {
    metaTitle: `Agence marketing peintre en bâtiment | klik`,
    metaDescription:
      "klik aide les peintres en bâtiment à être trouvés sur Google, à relancer leurs devis et à récolter des avis. Diagnostic gratuit.",
    eyebrow: "Peinture en bâtiment",
    h1: "Agence marketing pour peintres en bâtiment",
    intro:
      "Une agence marketing pour peintres en bâtiment aide votre entreprise à être trouvée quand quelqu'un cherche un peintre pour son logement ou ses locaux. Le client compare des devis et regarde les réalisations avant de choisir. On met en place ce qu'il faut pour que votre travail soit visible et que chaque demande reçoive une réponse.",
    problemsTitle: "Ce qu'on voit chez les peintres en bâtiment",
    problems: [
      { title: "Des devis à relancer", text: "Le client demande plusieurs devis. Sans relance, le vôtre se perd parmi les autres." },
      { title: "Des réalisations qui ne se voient pas", text: "Sans photos avant/après et sans page dédiée, difficile de montrer la qualité de vos finitions." },
      { title: "Des avis trop rares", text: "Un client satisfait pense rarement à laisser un avis tout seul, alors que les prochains les liront avant d'appeler." },
    ],
    helpTitle: "Ce qu'on fait pour vous",
    help: [
      { title: "On remplit votre agenda", text: "Référencement local et campagnes ciblées pour qu'on vous trouve quand on cherche un peintre en bâtiment dans votre zone." },
      { title: "On récupère les rendez-vous perdus", text: "Suivi automatique des appels manqués et des devis restés sans réponse." },
      { title: "Des avis qui vous font ressortir", text: "On demande l'avis Google au bon moment, juste après un chantier réussi." },
      { title: "Un site et une fiche qui convertissent", text: "Un site clair avec vos réalisations avant/après et une fiche Google complète." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Faut-il s'y connaître en marketing ?", a: "Non. On vous explique chaque action en termes simples, sans jargon." },
      { q: "En combien de temps voit-on des résultats ?", a: "On mesure sur 3 semaines et c'est vous qui décidez si on continue. Le référencement local demande en général plus de temps. On ne promet jamais de résultats garantis." },
      { q: "Que se passe-t-il si je veux arrêter ?", a: "Vous nous le dites et on arrête, sans engagement de durée." },
    ],
    ctaTitle: "On parle de votre entreprise ?",
    ctaSubtitle: "Racontez-nous votre situation et on vous dit, franchement, comment on s'y prendrait.",
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
  "couvreur": {
    metaTitle: `Agencia de marketing para empresas de tejados | klik`,
    metaDescription:
      "klik ayuda a las empresas de tejados y cubiertas a aparecer en Google, a no perder presupuestos ni urgencias y a conseguir reseñas. Diagnóstico gratuito.",
    eyebrow: "Cubiertas y tejados",
    h1: "Agencia de marketing para empresas de cubiertas y tejados",
    intro:
      "Una agencia de marketing para empresas de tejados te ayuda a aparecer cuando alguien busca una reparación o una rehabilitación de cubierta cerca de casa. Una gotera, tejas rotas, aislamiento: el cliente suele llamar a una de las primeras empresas que encuentra en Google. Montamos lo necesario para que sea la tuya.",
    problemsTitle: "Lo que vemos en las empresas de cubiertas",
    problems: [
      { title: "La gotera que se va a otro", text: "Estás subido a un tejado, el teléfono suena en el vacío y el cliente llama a la siguiente empresa de la lista." },
      { title: "Presupuestos de cubierta que nadie retoma", text: "Una obra grande se decide pensándolo. Sin seguimiento, el presupuesto se queda sin respuesta y el cliente firma con otro." },
      { title: "Reseñas que tranquilizan poco", text: "Antes de una obra importante, el cliente mira las reseñas. Una ficha de Google poco trabajada genera dudas." },
    ],
    helpTitle: "Lo que hacemos por ti",
    help: [
      { title: "Llenamos tu agenda", text: "SEO local y campañas para que te encuentren cuando buscan una reparación o rehabilitación de cubierta en tu zona." },
      { title: "Recuperamos las citas perdidas", text: "Seguimiento automático de las llamadas perdidas y de los presupuestos sin respuesta, para que ninguna solicitud espere." },
      { title: "Reseñas que te hacen destacar", text: "Pedimos la reseña de Google en el momento adecuado, justo después de terminar una obra." },
      { title: "Una web y una ficha que convierten", text: "Una web clara, una página por servicio y una ficha de Google completa, pensadas para que te llamen a ti." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿De verdad se decide una obra de tejado en Google?", a: "A menudo, sí: el cliente busca una empresa de tejados cerca de casa y llama a uno de los primeros resultados. Ser visible y transmitir confianza con reseñas aumenta tus opciones de recibir la llamada, sin garantías." },
      { q: "¿Y si no puedo contestar durante una urgencia?", a: "Montamos un seguimiento que retoma rápido las llamadas perdidas, para que la solicitud no se vaya a la competencia." },
      { q: "¿En cuánto tiempo se ven resultados?", a: "Medimos durante 3 semanas y tú decides si seguimos. El SEO local suele necesitar más tiempo. Nunca prometemos resultados garantizados." },
    ],
    ctaTitle: "¿Hablamos de tu empresa?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos, con franqueza, cómo la abordaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
    calculatorLink: "Calcula lo que se te escapa cada mes",
  },
  "renovation-energetique": {
    metaTitle: `Agencia de marketing para rehabilitación energética | klik`,
    metaDescription:
      "klik ayuda a las empresas de rehabilitación energética a aparecer en Google, a retomar cada solicitud de presupuesto y a conseguir reseñas. Diagnóstico gratuito.",
    eyebrow: "Rehabilitación energética",
    h1: "Agencia de marketing para empresas de rehabilitación energética",
    intro:
      "Aislamiento, aerotermia, ventanas, ventilación: quien prepara una reforma compara varias empresas antes de firmar. Una agencia de marketing para rehabilitación energética se ocupa de tu visibilidad local, de tus solicitudes de presupuesto y de tus reseñas, para que te llamen a ti y no a la competencia.",
    problemsTitle: "Lo que vemos en las empresas de rehabilitación energética",
    problems: [
      { title: "Solicitudes de presupuesto que se apagan", text: "Un proyecto de reforma se piensa con calma. Sin seguimiento, la solicitud se queda sin respuesta y el cliente elige otra empresa." },
      { title: "Llamadas durante las obras", text: "Tus equipos están en obra, el teléfono suena en el vacío y la solicitud se va a otro." },
      { title: "Una web que no explica tus servicios", text: "Si la web no detalla cada tipo de obra ni tu zona de trabajo, te encuentran menos y confían menos en ti." },
    ],
    helpTitle: "Lo que hacemos por ti",
    help: [
      { title: "Llenamos tu agenda", text: "SEO local y campañas para que te encuentren cuando buscan obras de aislamiento, calefacción o ventanas en tu zona." },
      { title: "Recuperamos las citas perdidas", text: "Seguimiento automático de las llamadas perdidas y de los presupuestos sin respuesta." },
      { title: "Reseñas que te hacen destacar", text: "Pedimos la reseña de Google en el momento adecuado, justo después de una obra bien terminada." },
      { title: "Una web y una ficha que convierten", text: "Una página por tipo de obra, una ficha de Google completa y un camino claro hacia el presupuesto." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Hace falta saber de marketing?", a: "No. Te explicamos cada acción con palabras sencillas, sin jerga." },
      { q: "¿En cuánto tiempo se ven resultados?", a: "Medimos durante 3 semanas y tú decides si seguimos. El SEO local suele necesitar más tiempo. Nunca prometemos resultados garantizados." },
      { q: "¿Qué pasa si quiero parar?", a: "Nos lo dices y paramos, sin permanencia." },
    ],
    ctaTitle: "¿Hablamos de tu empresa?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos, con franqueza, cómo la abordaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
    calculatorLink: "Calcula lo que se te escapa cada mes",
  },
  "chauffagiste": {
    metaTitle: `Agencia de marketing para empresas de calefacción | klik`,
    metaDescription:
      "klik ayuda a las empresas de calefacción a aparecer en Google, a no perder llamadas de avería ni presupuestos y a conseguir reseñas. Diagnóstico gratuito.",
    eyebrow: "Calefacción",
    h1: "Agencia de marketing para empresas de calefacción",
    intro:
      "Una agencia de marketing para empresas de calefacción te ayuda a aparecer cuando alguien busca una instalación, un mantenimiento o una reparación de caldera o aerotermia cerca de casa. Ante una avería, el cliente suele llamar a una de las primeras empresas que encuentra en Google. Montamos lo necesario para que sea la tuya.",
    problemsTitle: "Lo que vemos en las empresas de calefacción",
    problems: [
      { title: "La avería que se va a otro", text: "Tus técnicos están en casa de un cliente, el teléfono suena en el vacío y quien tiene la avería llama a la siguiente empresa." },
      { title: "Mantenimientos que nadie reprograma", text: "Sin recordatorios, el mantenimiento anual no se vuelve a planificar y la facturación se escapa sin ruido." },
      { title: "Una ficha de Google poco convincente", text: "Pocas reseñas, horarios o servicios mal indicados: te encuentran menos y confían menos en ti." },
    ],
    helpTitle: "Lo que hacemos por ti",
    help: [
      { title: "Llenamos tu agenda", text: "SEO local y campañas para que te encuentren cuando buscan una instalación, un mantenimiento o una reparación de calefacción en tu zona." },
      { title: "Recuperamos las citas perdidas", text: "Seguimiento automático de las llamadas perdidas, de los presupuestos sin respuesta y de los mantenimientos por reprogramar." },
      { title: "Reseñas que te hacen destacar", text: "Pedimos la reseña de Google en el momento adecuado, justo después de una intervención bien hecha." },
      { title: "Una web y una ficha que convierten", text: "Una web clara, una página por servicio y una ficha de Google completa, pensadas para que te llamen a ti." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Trabajáis también con climatización?", a: "Sí. La climatización tiene su propia página. Si haces las dos cosas, nos ocupamos de toda tu actividad." },
      { q: "¿Cómo no perder una llamada de avería?", a: "Montamos un seguimiento que retoma rápido las llamadas perdidas, para que la solicitud no se vaya a la competencia." },
      { q: "¿En cuánto tiempo se ven resultados?", a: "Medimos durante 3 semanas y tú decides si seguimos. El SEO local suele necesitar más tiempo. Nunca prometemos resultados garantizados." },
    ],
    ctaTitle: "¿Hablamos de tu empresa?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos, con franqueza, cómo la abordaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
    calculatorLink: "Calcula lo que se te escapa cada mes",
  },
  "macon": {
    metaTitle: `Agencia de marketing para albañiles y obra | klik`,
    metaDescription:
      "klik ayuda a los albañiles y empresas de obra a aparecer en Google, a retomar sus presupuestos y a conseguir reseñas. Diagnóstico gratuito.",
    eyebrow: "Albañilería y obra",
    h1: "Agencia de marketing para albañiles y empresas de obra",
    intro:
      "Una agencia de marketing para albañiles te ayuda a aparecer cuando alguien prepara una ampliación, una reforma o una construcción cerca de casa. Son proyectos que se deciden despacio: el cliente compara, duda y vuelve. Montamos lo necesario para que sigas siendo la primera empresa en la que piense.",
    problemsTitle: "Lo que vemos en las empresas de albañilería",
    problems: [
      { title: "Presupuestos que se eternizan", text: "Una obra de albañilería se decide despacio. Sin seguimiento, el presupuesto se queda sin respuesta y el cliente elige otra empresa." },
      { title: "Trabajos que no se ven", text: "Sin fotos de obras ni una página dedicada, al futuro cliente le cuesta juzgar la calidad de tu trabajo." },
      { title: "Llamadas durante la obra", text: "Cuando todo el equipo está en obra, el teléfono suena en el vacío y la solicitud se va a otro." },
    ],
    helpTitle: "Lo que hacemos por ti",
    help: [
      { title: "Llenamos tu agenda", text: "SEO local y campañas para que te encuentren cuando buscan un albañil para una ampliación, una reforma o una construcción en tu zona." },
      { title: "Recuperamos las citas perdidas", text: "Seguimiento automático de las llamadas perdidas y de los presupuestos sin respuesta." },
      { title: "Reseñas que te hacen destacar", text: "Pedimos la reseña de Google en el momento adecuado, justo después de terminar una obra." },
      { title: "Una web y una ficha que convierten", text: "Una web clara con tus trabajos, una página por tipo de obra y una ficha de Google completa." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿De verdad se decide una obra grande en Google?", a: "A menudo, el cliente busca una empresa cerca de casa y compara los primeros resultados y sus reseñas. Ser visible y transmitir confianza aumenta tus opciones de recibir la llamada, sin garantías." },
      { q: "¿Cómo retomar un presupuesto sin parecer pesado?", a: "Un mensaje corto, unos días después de enviarlo, preguntando si el cliente tiene dudas. El objetivo es ayudar, no forzar la decisión." },
      { q: "¿En cuánto tiempo se ven resultados?", a: "Medimos durante 3 semanas y tú decides si seguimos. El SEO local suele necesitar más tiempo. Nunca prometemos resultados garantizados." },
    ],
    ctaTitle: "¿Hablamos de tu empresa?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos, con franqueza, cómo la abordaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
    calculatorLink: "Calcula lo que se te escapa cada mes",
  },
  "peintre-batiment": {
    metaTitle: `Agencia de marketing para pintores de obra | klik`,
    metaDescription:
      "klik ayuda a los pintores de obra a aparecer en Google, a retomar sus presupuestos y a conseguir reseñas. Diagnóstico gratuito.",
    eyebrow: "Pintura de obra",
    h1: "Agencia de marketing para pintores de obra",
    intro:
      "Una agencia de marketing para pintores te ayuda a aparecer cuando alguien busca un pintor para su vivienda o su local. El cliente compara presupuestos y mira los trabajos antes de elegir. Montamos lo necesario para que tu trabajo se vea y para que cada solicitud reciba respuesta.",
    problemsTitle: "Lo que vemos en los pintores de obra",
    problems: [
      { title: "Presupuestos que retomar", text: "El cliente pide varios presupuestos. Sin seguimiento, el tuyo se pierde entre los demás." },
      { title: "Trabajos que no se ven", text: "Sin fotos antes/después ni una página dedicada, es difícil mostrar la calidad de tus acabados." },
      { title: "Reseñas demasiado escasas", text: "Un cliente satisfecho rara vez piensa en dejar una reseña por sí solo, y los siguientes las leerán antes de llamar." },
    ],
    helpTitle: "Lo que hacemos por ti",
    help: [
      { title: "Llenamos tu agenda", text: "SEO local y campañas para que te encuentren cuando buscan un pintor de obra en tu zona." },
      { title: "Recuperamos las citas perdidas", text: "Seguimiento automático de las llamadas perdidas y de los presupuestos sin respuesta." },
      { title: "Reseñas que te hacen destacar", text: "Pedimos la reseña de Google en el momento adecuado, justo después de un trabajo bien hecho." },
      { title: "Una web y una ficha que convierten", text: "Una web clara con tus trabajos antes/después y una ficha de Google completa." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Hace falta saber de marketing?", a: "No. Te explicamos cada acción con palabras sencillas, sin jerga." },
      { q: "¿En cuánto tiempo se ven resultados?", a: "Medimos durante 3 semanas y tú decides si seguimos. El SEO local suele necesitar más tiempo. Nunca prometemos resultados garantizados." },
      { q: "¿Qué pasa si quiero parar?", a: "Nos lo dices y paramos, sin permanencia." },
    ],
    ctaTitle: "¿Hablamos de tu empresa?",
    ctaSubtitle: "Cuéntanos tu situación y te decimos, con franqueza, cómo la abordaríamos.",
    ctaButton: "Pedir un diagnóstico gratuito",
    calculatorLink: "Calcula lo que se te escapa cada mes",
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
  "couvreur": {
    metaTitle: `Marketing agency for roofing companies | klik`,
    metaDescription:
      "klik helps roofing companies get found on Google, stop losing quote requests and emergency calls, and collect reviews. Free diagnosis.",
    eyebrow: "Roofing",
    h1: "Marketing agency for roofing companies",
    intro:
      "A marketing agency for roofers helps your company show up when someone searches for a roof repair or renovation nearby. A leak, broken tiles, insulation: the customer often calls one of the first companies they find on Google. We set up what it takes for that to be yours.",
    problemsTitle: "What we see at roofing companies",
    problems: [
      { title: "The leak that goes to someone else", text: "You're up on a roof, the phone rings out, and the customer calls the next company on the list." },
      { title: "Roofing quotes that never get followed up", text: "A big job is decided after some thought. Without follow-up, the quote goes unanswered and the customer signs elsewhere." },
      { title: "Reviews that reassure too little", text: "Before a major job, customers check the reviews. A thin Google listing makes them hesitate." },
    ],
    helpTitle: "What we do for you",
    help: [
      { title: "We fill your calendar", text: "Local SEO and targeted campaigns so you show up when people search for a roof repair or renovation in your area." },
      { title: "We recover lost appointments", text: "Automatic follow-up on missed calls and quotes left unanswered, so no request waits." },
      { title: "Reviews that make you stand out", text: "We ask for the Google review at the right moment, right after a finished job." },
      { title: "A website and listing that convert", text: "A clear website, one page per service and a complete Google listing, built so people call you." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is a roofing job really decided on Google?", a: "Often, yes: the customer searches for a roofer nearby and calls one of the first results. Being visible and reassuring with reviews improves your chances of getting the call, with no guarantee." },
      { q: "What if I can't answer during an emergency?", a: "We set up a follow-up that quickly picks up missed calls, so the request doesn't go to a competitor." },
      { q: "How long before we see results?", a: "We measure over 3 weeks and you decide if we continue. Local SEO usually takes longer. We never promise guaranteed results." },
    ],
    ctaTitle: "Shall we talk about your business?",
    ctaSubtitle: "Tell us your situation and we'll tell you, straight up, how we'd approach it.",
    ctaButton: "Request a free diagnosis",
    calculatorLink: "Work out what's slipping away every month",
  },
  "renovation-energetique": {
    metaTitle: `Marketing agency for energy renovation | klik`,
    metaDescription:
      "klik helps energy renovation companies get found on Google, follow up every quote request and collect reviews. Free diagnosis.",
    eyebrow: "Energy renovation",
    h1: "Marketing agency for energy renovation companies",
    intro:
      "Insulation, heat pumps, windows, ventilation: a homeowner planning works compares several companies before signing. A marketing agency for energy renovation takes care of your local visibility, your quote requests and your reviews, so prospects call you rather than a competitor.",
    problemsTitle: "What we see at energy renovation companies",
    problems: [
      { title: "Quote requests that fade away", text: "A renovation project takes time to mature. Without follow-up, the request goes unanswered and the customer picks another company." },
      { title: "Calls that come in during jobs", text: "Your teams are on site, the phone rings out, and the request goes elsewhere." },
      { title: "A website that doesn't explain your services", text: "If the site doesn't detail each type of work and your service area, you're harder to find and harder to trust." },
    ],
    helpTitle: "What we do for you",
    help: [
      { title: "We fill your calendar", text: "Local SEO and targeted campaigns so you show up when people search for insulation, heating or window works in your area." },
      { title: "We recover lost appointments", text: "Automatic follow-up on missed calls and quotes left unanswered." },
      { title: "Reviews that make you stand out", text: "We ask for the Google review at the right moment, right after a successful job." },
      { title: "A website and listing that convert", text: "One page per type of work, a complete Google listing and a clear path to the quote." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do I need to know about marketing?", a: "No. We explain each action in plain terms, with no jargon." },
      { q: "How long before we see results?", a: "We measure over 3 weeks and you decide if we continue. Local SEO usually takes longer. We never promise guaranteed results." },
      { q: "What if I want to cancel?", a: "You tell us and we stop. No lock-in contract." },
    ],
    ctaTitle: "Shall we talk about your business?",
    ctaSubtitle: "Tell us your situation and we'll tell you, straight up, how we'd approach it.",
    ctaButton: "Request a free diagnosis",
    calculatorLink: "Work out what's slipping away every month",
  },
  "chauffagiste": {
    metaTitle: `Marketing agency for heating companies | klik`,
    metaDescription:
      "klik helps heating companies get found on Google, stop losing breakdown calls and quotes, and collect reviews. Free diagnosis.",
    eyebrow: "Heating",
    h1: "Marketing agency for heating companies",
    intro:
      "A marketing agency for heating companies helps your business show up when someone searches for a boiler or heat pump installation, service or repair nearby. When something breaks, the customer often calls one of the first companies they find on Google. We set up what it takes for that to be yours.",
    problemsTitle: "What we see at heating companies",
    problems: [
      { title: "The breakdown that goes to someone else", text: "Your engineers are at a customer's, the phone rings out, and the person with no heating calls the next company." },
      { title: "Servicing visits that are never rebooked", text: "Without regular follow-up, the annual service isn't rescheduled and revenue quietly slips away." },
      { title: "A Google listing that doesn't convince", text: "Few reviews, hours or services badly filled in: you're harder to find and harder to trust." },
    ],
    helpTitle: "What we do for you",
    help: [
      { title: "We fill your calendar", text: "Local SEO and targeted campaigns so you show up when people search for heating installation, servicing or repair in your area." },
      { title: "We recover lost appointments", text: "Automatic follow-up on missed calls, unanswered quotes and servicing visits to rebook." },
      { title: "Reviews that make you stand out", text: "We ask for the Google review at the right moment, right after a successful visit." },
      { title: "A website and listing that convert", text: "A clear website, one page per service and a complete Google listing, built so people call you." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do you also work with air conditioning?", a: "Yes. Air conditioning and HVAC have their own page. If you do both, we take care of your whole activity." },
      { q: "How do I avoid missing a breakdown call?", a: "We set up a follow-up that quickly picks up missed calls, so the request doesn't go to a competitor." },
      { q: "How long before we see results?", a: "We measure over 3 weeks and you decide if we continue. Local SEO usually takes longer. We never promise guaranteed results." },
    ],
    ctaTitle: "Shall we talk about your business?",
    ctaSubtitle: "Tell us your situation and we'll tell you, straight up, how we'd approach it.",
    ctaButton: "Request a free diagnosis",
    calculatorLink: "Work out what's slipping away every month",
  },
  "macon": {
    metaTitle: `Marketing agency for masons and builders | klik`,
    metaDescription:
      "klik helps masons and building companies get found on Google, follow up their quotes and collect reviews. Free diagnosis.",
    eyebrow: "Masonry and building",
    h1: "Marketing agency for masons and building companies",
    intro:
      "A marketing agency for masons helps your business show up when someone plans an extension, a renovation or a new build nearby. These projects take time to decide: the customer compares, hesitates and comes back. We set up what it takes for you to stay the first company they think of.",
    problemsTitle: "What we see at masonry companies",
    problems: [
      { title: "Quotes that drag on", text: "A masonry job is decided slowly. Without follow-up, the quote goes unanswered and the customer picks another company." },
      { title: "Work nobody can see", text: "Without site photos and a dedicated page, a future customer struggles to judge the quality of your work." },
      { title: "Calls that come in during the job", text: "When the whole team is on site, the phone rings out and the request goes elsewhere." },
    ],
    helpTitle: "What we do for you",
    help: [
      { title: "We fill your calendar", text: "Local SEO and targeted campaigns so you show up when people search for a mason for an extension, renovation or new build in your area." },
      { title: "We recover lost appointments", text: "Automatic follow-up on missed calls and quotes left unanswered." },
      { title: "Reviews that make you stand out", text: "We ask for the Google review at the right moment, right after a finished job." },
      { title: "A website and listing that convert", text: "A clear website showing your work, one page per type of job and a complete Google listing." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is a big job really decided on Google?", a: "Often, the customer searches for a company nearby and compares the first results and their reviews. Being visible and reassuring improves your chances of getting the call, with no guarantee." },
      { q: "How do I follow up a quote without seeming pushy?", a: "A short message a few days after sending, asking whether the customer has questions. The aim is to help, not to force the decision." },
      { q: "How long before we see results?", a: "We measure over 3 weeks and you decide if we continue. Local SEO usually takes longer. We never promise guaranteed results." },
    ],
    ctaTitle: "Shall we talk about your business?",
    ctaSubtitle: "Tell us your situation and we'll tell you, straight up, how we'd approach it.",
    ctaButton: "Request a free diagnosis",
    calculatorLink: "Work out what's slipping away every month",
  },
  "peintre-batiment": {
    metaTitle: `Marketing agency for painters and decorators | klik`,
    metaDescription:
      "klik helps painters and decorators get found on Google, follow up their quotes and collect reviews. Free diagnosis.",
    eyebrow: "Painting and decorating",
    h1: "Marketing agency for painters and decorators",
    intro:
      "A marketing agency for painters and decorators helps your business show up when someone searches for a painter for their home or premises. The customer compares quotes and looks at past work before choosing. We set up what it takes for your work to be seen and for every request to get an answer.",
    problemsTitle: "What we see at painting companies",
    problems: [
      { title: "Quotes to follow up", text: "The customer asks for several quotes. Without follow-up, yours gets lost among the others." },
      { title: "Work that doesn't show", text: "Without before/after photos and a dedicated page, it's hard to show the quality of your finish." },
      { title: "Too few reviews", text: "A happy customer rarely thinks to leave a review on their own, yet the next ones will read them before calling." },
    ],
    helpTitle: "What we do for you",
    help: [
      { title: "We fill your calendar", text: "Local SEO and targeted campaigns so you show up when people search for a painter in your area." },
      { title: "We recover lost appointments", text: "Automatic follow-up on missed calls and quotes left unanswered." },
      { title: "Reviews that make you stand out", text: "We ask for the Google review at the right moment, right after a successful job." },
      { title: "A website and listing that convert", text: "A clear website with your before/after work and a complete Google listing." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do I need to know about marketing?", a: "No. We explain each action in plain terms, with no jargon." },
      { q: "How long before we see results?", a: "We measure over 3 weeks and you decide if we continue. Local SEO usually takes longer. We never promise guaranteed results." },
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
