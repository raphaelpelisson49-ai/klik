import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "klik | Your calendar full, no fine print",
    description:
      "klik helps owners of technical small businesses keep their calendar full of clients with AI, without losing their weekends to marketing.",
  },

  nav: {
    calculadora: "Calculator",
    diagnostico: "Diagnosis",
    servicios: "Services",
    proceso: "How we work",
    preguntas: "FAQ",
    cta: "Tell us your problem",
  },

  marquee: [
    "We fill your calendar",
    "We recover lost appointments",
    "Reviews that make you stand out",
    "A website and listing that convert",
    "Five-minute reports",
    "By your side every week",
  ],

  hero: {
    eyebrow: "Find out what's really going on with your business",
    words: [
      { t: "Your", c: false },
      { t: "calendar", c: false },
      { t: "full,", c: false },
      { t: "no", c: true },
      { t: "fine", c: true },
      { t: "print.", c: true },
    ],
    paragraph:
      "Before we sell you anything, we want to understand what's really going on. Tell us, and we'll show you, right there, how we'd think about it with AI.",
    ctaPrimary: "Tell us your problem",
    ctaSecondary: "How we work",
    quote: "If it's a fit, let's talk. If not, no hard feelings.",
  },

  heroTeaser: {
    title: "How much is slipping away every month?",
    subtitle: "Work it out with your own numbers",
  },

  agenda: {
    label: "Any given month",
    badge: "fills itself in",
    footer: "This is what a calendar that doesn't depend on luck looks like.",
    days: ["M", "T", "W", "T", "F", "S", "S"],
  },

  diagnostic: {
    eyebrow: "Start here",
    title: "Tell us what's going on",
    subtitle:
      "You don't need to know marketing. Write it in your own words — we'll spot the pattern and show you where we'd start. We'll give you the full plan when we talk.",
    question: "What's going on?",
    placeholder: "E.g.: \"My calendar is full some days and empty on others, and I don't know why I lose customers on weekends...\"",
    chips: [
      "I miss a lot of calls",
      "People can't find me on Google",
      "I lose appointments and don't know why",
      "I don't have enough reviews",
      "I work a lot and earn little",
    ],
    analyzeButton: "See what's going on",
    loadingButton: "Looking for the pattern…",
    loadingText: "Looking for the pattern",
    disclaimer:
      "Indicative diagnosis based on what you tell us. It's not a guaranteed analysis — for that, we talk about your real case.",
    idleTitle: "Your diagnosis appears here.",
    idleSubtitle: "Write your problem or pick one of the phrases on the left.",
    resultCta: "Tell us the details →",
    mail: {
      subjectPrefix: "Diagnosis:",
      greeting: "Hi,",
      intro: 'I\'m writing because I tried the site\'s diagnostic tool and got "{{tag}}".',
      yourWords: "My problem, in my own words:",
      closing: "Shall we talk?",
    },
    categories: [
      {
        tag: "Follow-up",
        keywords: ["call", "answer", "reply", "whatsapp", "message", "pick up", "phone", "missed call"],
        headline: "This isn't a customer problem. It's a follow-up problem.",
        body: "You probably don't lack interested customers — you lack timely replies. Most appointments are lost in the first few hours without a response, not because of price or competition.",
        teaser: "The first lever would be automating that first contact so no one is left waiting. Exactly how, with what tool, and how soon you'll see it — we'll explain when we talk.",
      },
      {
        tag: "Visibility",
        keywords: ["google", "find", "found", "search", "maps", "ranking", "website", "site", "internet"],
        headline: "The problem isn't your work. It's that people don't see you before they need you.",
        body: "When someone searches for your service in your area, you should be one of the first options they see. If you're not there, that customer is already calling someone else — even if your work is better.",
        teaser: "The first lever would be your Google listing and how you show up in local search. The full plan — what to fix first and what to expect — we'll give you when we talk.",
      },
      {
        tag: "Reputation",
        keywords: ["review", "reviews", "rating", "ratings", "stars", "reputation"],
        headline: "Your work speaks for itself. The problem is no one's repeating it out loud.",
        body: "You have happy customers, but reviews don't appear on their own: you have to ask at the right moment. Without them, a new customer has no way to tell you apart from anyone else.",
        teaser: "The first lever would be systematizing when and how you ask for the review. We'll walk you through the rest when we talk.",
      },
      {
        tag: "Calendar management",
        keywords: ["calendar", "schedule", "slot", "slots", "cancellation", "cancel", "appointment", "appointments", "booking"],
        headline: "It's not hours you're short on. It's appointments that actually get confirmed.",
        body: "A calendar with scattered gaps is rarely a demand problem: it's usually a confirmation and reminder problem. Gaps open up from last-minute cancellations, not a lack of interest.",
        teaser: "The first lever would be an automatic reminder before every appointment. How to set it up for your specific case — we'll explain when we talk.",
      },
      {
        tag: "Competition",
        keywords: ["competitor", "competition", "neighbor", "cheap", "price", "rival"],
        headline: "You're not competing worse. You're just less visible at the moment it counts.",
        body: "When two businesses offer something similar, the one that shows up first and builds the most trust in the first few seconds wins — not always the cheapest one.",
        teaser: "The first lever would be strengthening exactly those first few seconds: what a new customer sees before calling. We'll give you the rest of the plan when we talk.",
      },
      {
        tag: "Workload",
        keywords: ["tired", "weekend", "exhausted", "no time", "too much work", "overwhelmed", "burnt out"],
        headline: "The problem isn't that you work a lot. It's that marketing eats up all your own time.",
        body: "If you spend the weekend answering messages and posting photos, you have no time left for what actually makes money: the trade. Sooner or later, that catches up with you.",
        teaser: "The first lever would be taking that part off your plate and leaving you just the decisions. How the work gets split exactly — we'll explain when we talk.",
      },
    ],
    fallback: {
      tag: "General diagnosis",
      headline: "We can already see something here, but we need a few more details.",
      body: "Technical businesses almost always lose customers in three places: people can't find them, don't get a timely reply, or never hear back. From what you've told us, we already have a hunch.",
      teaser: "The fastest way to know for sure is to tell us more — we'll tell you exactly what's going on.",
    },
  },

  historia: {
    number: "01",
    title: "From the trades to artificial intelligence",
    p1: "klik was born from an unconventional path: years of technical trades, demanding work learned on the job. Solid, respectable — but leaving a persistent feeling of a closed-off future.",
    p2: "Discovering artificial intelligence was the turning point: not as an abstract concept, but as a tool applicable to real problems faced by real people. Combining hands-on trade knowledge with AI systems gave rise to klik.",
    missionLabel: "Our mission",
    missionQuote: "Help owners of technical small businesses keep their calendar full without losing weekends to marketing.",
    valores: [
      { title: "Radical transparency", description: "We say what works and what doesn't." },
      { title: "Measurable results", description: "Numbers, not feelings." },
      { title: "Plain-spoken closeness", description: "We speak the language of the trade." },
      { title: "Real commitment", description: "We take on the risk." },
      { title: "Shared growth", description: "We were helped to grow — we pay that help forward." },
    ],
  },

  servicios: {
    number: "02",
    title: "What we do for your business",
    subtitle:
      "No omnichannel solutions or growth-marketing buzzwords. Concrete services, explained the way we'd explain them to a lifelong customer.",
    items: [
      { title: "We fill your calendar", description: "Campaigns and local search that make the phone ring, not a chart go up in a report." },
      { title: "We recover lost appointments", description: "Automatic follow-up for anyone who asks and doesn't hear back. No customer is left waiting." },
      { title: "Reviews that make you stand out", description: "We ask for the review at the right moment so you show up first when people search for you on Google." },
      { title: "A website and listing that convert", description: "A website and a Google listing built so people call you, not your neighbor." },
      { title: "Five-minute reports", description: "How many customers, how much each one costs, what's next. No jargon, no filler." },
      { title: "By your side every week", description: "We adjust the strategy based on what actually works, not what sounds good." },
    ],
  },

  proceso: {
    number: "03",
    title: "From the first call to a full calendar",
    steps: [
      { step: "01", title: "Free diagnosis", description: "We look at your business, your area, and who's taking your customers. No obligation." },
      { step: "02", title: "Clear plan", description: "We tell you what we're going to do and what to expect. No fine print." },
      { step: "03", title: "Getting started", description: "We start within days, not months. Calls come in from the first week." },
      { step: "04", title: "Weekly adjustment", description: "We measure, adjust, and keep going. You decide if we continue." },
    ],
  },

  nuncaHacemos: {
    number: "04",
    title: "What we never do",
    subtitle: "This isn't a style list: it's the brand's line in the sand. Any promise that crosses it doesn't ship — even if it would work.",
    comunicacionLabel: "In communication",
    comunicacionItems: [
      "We never promise guaranteed results on unrealistic timelines.",
      "We never use fake urgency or invented scarcity.",
      "We never badmouth competitors by name.",
      "We never use marketing jargon without explaining it in the same sentence.",
      "We never treat a client as if they don't understand their own business.",
    ],
    productoLabel: "In our product",
    productoItems: [
      "We never sell leads shared with your competitors.",
      "We never hand over a report that can't be understood in five minutes.",
      "We never leave you unsure of what happens if you cancel.",
    ],
    closingQuote: "I take on the risk, not you.",
  },

  faq: {
    number: "05",
    title: "Frequently asked questions",
    items: [
      { q: "What exactly do you do?", a: "We fill your calendar with customers. Without you needing to understand marketing." },
      { q: "How do I know this works?", a: "It's normal to be skeptical. That's why we measure it over 3 weeks and you decide if we continue." },
      { q: "What kind of businesses do you work with?", a: "Technical small businesses in general: if your business is booked with customers and delivered on-site, we speak your language. Tell us about yours and we'll see if it's a fit." },
      { q: "What happens if I want to cancel?", a: "You tell us and we stop. We never leave you unsure of what happens if you cancel — no lock-in contracts." },
      { q: "Do you guarantee results?", a: "No. We never promise results on unrealistic timelines. What we do is measure every week and show you the numbers exactly as they are." },
    ],
  },

  ctaFinal: {
    title: "Shall we talk about your problem?",
    subtitle: "You already know how we think. Tell us about yours in detail and we'll tell you, straight up, how we'd solve it.",
    button: "Email me: klikia@klikagencies.com",
    backLink: "↑ Back to my diagnosis",
  },

  footer: {
    tagline: "AI-driven customer acquisition for technical small businesses.",
    serviciosTitle: "Services",
    servicios: ["Customer acquisition", "Recovering appointments", "Reviews & reputation", "Website & Google listing"],
    siteTitle: "klik",
    siteLinks: [
      { label: "Calculator", href: "/calculadora" },
      { label: "Diagnosis", href: "/#diagnostico" },
      { label: "Our story", href: "/#historia" },
      { label: "How we work", href: "/#proceso" },
      { label: "FAQ", href: "/#preguntas" },
    ],
    contactTitle: "Contact",
    copyright: "klik · Your calendar full, no fine print.",
    legal: { avisoLegal: "Legal notice", privacidad: "Privacy", cookies: "Cookies" },
  },

  calculadoraPage: {
    metaTitle: "Calculator | klik",
    metaDescription:
      "Work out, with your own numbers, how much money could be slipping away every month from missed appointments and calls that don't get answered in time.",
    eyebrow: "Calculator",
    title: "See what's slipping away",
    subtitle:
      "Two ways to lose money without noticing: maintenance appointments no one recovers, and calls no one answers in time. Move the numbers to match yours.",
    closingTitle: "These numbers are just a starting point",
    closingSubtitle: "With your real figures, the exact number could be different — for better or worse. Tell us about your case and let's look at it together.",
    closingButton: "Email me: klikia@klikagencies.com",
    closingBack: "↑ Or tell us what's going on",
  },

  calculators: {
    numberLocale: "en-US",
    disclaimer:
      "Illustrative calculation based on the numbers you adjust yourself — this isn't real client data or a guaranteed forecast. When we talk, we do it with your exact figures.",
    monthSuffix: "a month",
    yearSuffix: "a year",
    total: {
      label: "Adding up the two tables below",
      resultLine: "could be slipping away every month",
      button: "Tell us your real case →",
      mail: {
        subject: "Calculators — combined total",
        greeting: "Hi,",
        intro: "I tried the two calculators on the site:",
        line1: "Lost maintenance visits:",
        line2: "Calls not answered in time:",
        totalLine: "Combined total:",
        closing: "Shall we talk about my real case?",
      },
    },
    maintenance: {
      tag: "Table 1 · Maintenance",
      title: "What's lost on maintenance contracts",
      fields: {
        technicians: "Technicians who only do maintenance",
        perTechMonth: "Maintenance visits per technician, per month",
        price: "Average price per visit",
        lossPercent: "Appointments lost",
      },
      resultLabel: "With those numbers, every month",
      resultLine: "slips away without anyone noticing",
      statTotal: "maintenance visits a month",
      statLost: "lost a month",
      statPerTech: "per technician a month",
      button: "Work out mine with you →",
      mail: {
        subject: "Calculator — lost maintenance visits",
        greeting: "Hi,",
        intro: "I tried the lost-maintenance-visits calculator with these numbers:",
        lineTechnicians: "Maintenance technicians:",
        linePerTech: "Visits per technician/month:",
        linePrice: "Average price:",
        lineLoss: "% of appointments lost:",
        result: "Result:",
        closing: "Shall we talk about my real case?",
      },
    },
    calls: {
      tag: "Table 2 · Calls & messages",
      title: "What's lost by not answering in time",
      fields: {
        volume: "Calls or messages you get a month",
        missedPercent: "The ones not answered in time",
        conversionPercent: "Of those, the ones that would've become customers",
        ticket: "Average value per customer",
      },
      resultLabel: "With those numbers, every month",
      resultLine: "slips away without anyone noticing",
      statMissed: "calls not answered in time/month",
      statLostClients: "customers that never become one",
      button: "Work out mine with you →",
      mail: {
        subject: "Calculator — missed calls",
        greeting: "Hi,",
        intro: "I tried the missed-calls calculator with these numbers:",
        lineVolume: "Calls or messages a month:",
        lineMissed: "% not answered in time:",
        lineConversion: "% conversion if answered in time:",
        lineTicket: "Average value:",
        result: "Result:",
        closing: "Shall we talk about my real case?",
      },
    },
  },

  notFound: {
    title: "This page doesn't exist",
    subtitle: "The link may be mistyped, or the page isn't here anymore. Head back home or tell us what you were looking for.",
    backHome: "← Back to home",
  },

  legalShell: {
    backLink: "← Back to the site",
    documentLabel: "Legal document",
    updatedLabel: "Last updated:",
  },
};

export default en;
