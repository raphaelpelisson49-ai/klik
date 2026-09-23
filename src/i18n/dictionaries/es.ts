const es = {
  meta: {
    title: "klik | Tu agenda llena, sin letra pequeña",
    description:
      "klik ayuda a dueños de pymes técnicas a tener la agenda llena de clientes con IA, sin perder los fines de semana en marketing.",
  },

  nav: {
    calculadora: "Calculadora",
    diagnostico: "Diagnóstico",
    servicios: "Servicios",
    proceso: "Cómo trabajamos",
    preguntas: "Preguntas",
    cta: "Cuéntanos tu problema",
  },

  marquee: [
    "Te llenamos la agenda",
    "Recuperamos citas perdidas",
    "Reseñas que te hacen destacar",
    "Web y ficha que convierten",
    "Reportes de cinco minutos",
    "A tu lado cada semana",
  ],

  hero: {
    eyebrow: "Descubre qué le está pasando a tu negocio",
    words: [
      { t: "Tu", c: false },
      { t: "agenda", c: false },
      { t: "llena,", c: false },
      { t: "sin", c: true },
      { t: "letra", c: true },
      { t: "pequeña.", c: true },
    ],
    paragraph:
      "Antes de venderte nada, queremos entender qué te está pasando de verdad. Cuéntanoslo y te enseñamos, en el momento, cómo lo pensaríamos con IA.",
    ctaPrimary: "Cuéntanos tu problema",
    ctaSecondary: "Cómo trabajamos",
    quote: "Si te encaja, hablamos. Si no, sin problema.",
  },

  heroTeaser: {
    title: "¿Cuánto se te escapa al mes?",
    subtitle: "Calcúlalo con tus propios números",
  },

  agenda: {
    label: "Un mes cualquiera",
    badge: "se rellena sola",
    footer: "Así se ve una agenda que no depende de la suerte.",
    days: ["L", "M", "X", "J", "V", "S", "D"],
  },

  diagnostic: {
    eyebrow: "Empieza aquí",
    title: "Cuéntanos qué te está pasando",
    subtitle:
      "No hace falta que sepas de marketing. Escríbelo con tus palabras — nosotros vemos el patrón y te enseñamos por dónde empezaríamos. El plan completo te lo damos cuando hablamos.",
    question: "¿Qué te está pasando?",
    placeholder:
      "Ej: «Tengo la agenda llena unos días y vacía otros, y no sé por qué se me escapan clientes los findes...»",
    chips: [
      "Se me van muchas llamadas sin coger",
      "No me encuentran en Google",
      "Pierdo citas y no sé por qué",
      "No tengo reseñas suficientes",
      "Trabajo mucho y gano poco",
    ],
    analyzeButton: "Ver qué está pasando",
    loadingButton: "Buscando el patrón…",
    loadingText: "Buscando el patrón",
    disclaimer:
      "Diagnóstico orientativo a partir de lo que nos cuentas. No es un análisis garantizado — para eso hablamos de tu caso real.",
    idleTitle: "Tu diagnóstico aparece aquí.",
    idleSubtitle: "Escribe tu problema o elige una de las frases de la izquierda.",
    resultCta: "Cuéntanos los detalles →",
    mail: {
      subjectPrefix: "Diagnóstico:",
      greeting: "Hola,",
      intro: 'Os escribo porque he probado el diagnóstico de la web y me ha salido "{{tag}}".',
      yourWords: "Mi problema, con mis palabras:",
      closing: "¿Hablamos?",
    },
    categories: [
      {
        tag: "Seguimiento",
        keywords: ["llamada", "contesto", "contesta", "responder", "whatsapp", "mensaje", "cogí", "coger el telefono", "telefono", "teléfono"],
        headline: "Esto no es un problema de clientes. Es un problema de seguimiento.",
        body: "Lo más probable es que no te falten clientes interesados — te falta responder a tiempo. La mayoría de citas se pierden en las primeras horas sin contestar, no por precio ni por competencia.",
        teaser: "La primera palanca sería automatizar ese primer contacto para que nadie se quede esperando. Cómo se hace exactamente, con qué herramienta y en cuánto tiempo se nota — eso te lo contamos cuando hablamos.",
      },
      {
        tag: "Visibilidad",
        keywords: ["google", "encuentran", "encuentra", "buscan", "maps", "posicion", "web", "pagina", "página", "internet", "salgo"],
        headline: "El problema no es tu trabajo. Es que no te ven antes de necesitarte.",
        body: "Cuando alguien busca tu servicio en tu zona, tú deberías ser de las primeras opciones que ve. Si no apareces ahí, ese cliente ya está llamando a otro — aunque tu trabajo sea mejor.",
        teaser: "La primera palanca sería tu ficha de Google y cómo apareces en las búsquedas locales. El plan completo —qué tocar primero y qué esperar— te lo damos cuando hablamos.",
      },
      {
        tag: "Reputación",
        keywords: ["reseña", "reseñas", "valoracion", "valoración", "estrellas", "opinion", "opiniones", "reputacion", "reputación"],
        headline: "Tu trabajo habla solo. El problema es que nadie lo está repitiendo en voz alta.",
        body: "Tienes clientes contentos, pero las reseñas no aparecen solas: hay que pedirlas en el momento justo. Sin ellas, un cliente nuevo no tiene forma de diferenciarte de cualquier otro.",
        teaser: "La primera palanca sería sistematizar cuándo y cómo se pide la reseña. El resto del proceso te lo explicamos con calma cuando hablamos.",
      },
      {
        tag: "Gestión de agenda",
        keywords: ["agenda", "hueco", "huecos", "cancelacion", "cancelación", "cancela", "cita", "citas", "hueco libre"],
        headline: "No te faltan horas. Te faltan citas que se confirman de verdad.",
        body: "Una agenda con huecos sueltos casi nunca es un problema de demanda: suele ser un problema de confirmación y recordatorio. Los huecos se abren por cancelaciones de última hora, no por falta de interés.",
        teaser: "La primera palanca sería un recordatorio automático antes de cada cita. Cómo montarlo para tu caso concreto — eso te lo contamos cuando hablamos.",
      },
      {
        tag: "Competencia",
        keywords: ["competencia", "vecino", "barato", "precio", "roban", "otro negocio", "rival"],
        headline: "No estás compitiendo peor. Estás siendo menos visible en el momento de decidir.",
        body: "Cuando dos negocios ofrecen algo parecido, gana el que aparece primero y el que genera más confianza en los primeros segundos — no siempre el que cobra menos.",
        teaser: "La primera palanca sería reforzar justo esos primeros segundos: qué ve un cliente nuevo antes de llamar. El resto del plan te lo damos cuando hablamos.",
      },
      {
        tag: "Carga de trabajo",
        keywords: ["cansado", "finde", "fin de semana", "findes", "fines de semana", "agotado", "no doy abasto", "mucho trabajo", "sin tiempo"],
        headline: "El problema no es que trabajes mucho. Es que el marketing te lo comes tú solo.",
        body: "Si te pasas el fin de semana contestando mensajes y subiendo fotos, no te queda tiempo para lo que de verdad da dinero: el oficio. Eso, tarde o temprano, pasa factura.",
        teaser: "La primera palanca sería quitarte de encima esa parte y dejarte solo con decidir. Cómo se reparte exactamente el trabajo — eso te lo contamos cuando hablamos.",
      },
    ],
    fallback: {
      tag: "Diagnóstico general",
      headline: "Con esto ya vemos algo, pero necesitamos un par de detalles más.",
      body: "Los negocios técnicos casi siempre pierden clientes en tres sitios: no los encuentran, no les contestan a tiempo, o no vuelven a saber de ellos. Con lo que nos cuentas ya intuimos por dónde puede ir.",
      teaser: "La forma más rápida de saberlo seguro es que nos lo cuentes con más detalle — nosotros te decimos exactamente qué está pasando.",
    },
  },

  historia: {
    number: "01",
    title: "De los oficios a la inteligencia artificial",
    p1: "klik nace de una trayectoria poco convencional: años de oficios técnicos, trabajos exigentes y aprendidos sobre el terreno. Sólidos, respetables — pero que dejaban una sensación persistente de futuro cerrado.",
    p2: "El descubrimiento de la inteligencia artificial fue el punto de inflexión: no como concepto abstracto, sino como herramienta aplicable a problemas reales de gente real. La combinación de conocimiento técnico de oficio con sistemas de IA dio lugar a klik.",
    missionLabel: "Nuestra misión",
    missionQuote: "Ayudar a dueños de pymes técnicas a tener la agenda llena sin perder fines de semana en marketing.",
    valores: [
      { title: "Transparencia radical", description: "Decimos lo que funciona y lo que no." },
      { title: "Resultados medibles", description: "Números, no sensaciones." },
      { title: "Cercanía sin tecnicismos", description: "Hablamos el idioma del oficio." },
      { title: "Compromiso real", description: "El riesgo lo asumimos nosotros." },
      { title: "Crecimiento compartido", description: "Nos ayudaron a crecer, devolvemos esa ayuda." },
    ],
  },

  servicios: {
    number: "02",
    title: "Lo que hacemos por tu negocio",
    subtitle:
      "Nada de soluciones omnicanal ni growth marketing. Servicios concretos, explicados como se lo explicaríamos a un cliente de toda la vida.",
    items: [
      { title: "Te llenamos la agenda", description: "Campañas y búsquedas locales que hacen sonar el teléfono, no que suban un gráfico en un informe." },
      { title: "Recuperamos citas perdidas", description: "Seguimiento automático a quien pregunta y no contesta. Ningún cliente se queda esperando." },
      { title: "Reseñas que te hacen destacar", description: "Pedimos la reseña en el momento justo para que aparezcas primero cuando te buscan en Google." },
      { title: "Web y ficha que convierten", description: "Una web y una ficha de Google hechas para que te llamen a ti, no al vecino." },
      { title: "Reportes de cinco minutos", description: "Cuántos clientes, cuánto cuesta cada uno, qué sigue. Sin jerga, sin relleno." },
      { title: "A tu lado cada semana", description: "Ajustamos la estrategia según lo que funciona de verdad, no según lo que suena bien." },
    ],
  },

  proceso: {
    number: "03",
    title: "De la primera llamada a la agenda llena",
    steps: [
      { step: "01", title: "Diagnóstico gratuito", description: "Miramos tu negocio, tu zona y a quién le estás perdiendo clientes. Sin compromiso." },
      { step: "02", title: "Plan claro", description: "Te contamos qué vamos a hacer y qué esperar. Sin letra pequeña." },
      { step: "03", title: "Puesta en marcha", description: "Empezamos en días, no en meses. Las llamadas entran desde la primera semana." },
      { step: "04", title: "Ajuste semanal", description: "Medimos, ajustamos, seguimos. Decides tú si continuamos." },
    ],
  },

  nuncaHacemos: {
    number: "04",
    title: "Lo que nunca hacemos",
    subtitle: "No es una lista de estilo: es el límite de la marca. Cualquier promesa que la incumpla, no sale — aunque funcione.",
    comunicacionLabel: "En comunicación",
    comunicacionItems: [
      "Nunca prometemos resultados garantizados en plazos irreales.",
      "Nunca usamos urgencia falsa ni escasez inventada.",
      "Nunca hablamos mal de la competencia por su nombre.",
      "Nunca usamos jerga de marketing sin explicarla en la misma frase.",
      "Nunca tratamos al cliente como si no entendiera de negocio.",
    ],
    productoLabel: "En producto",
    productoItems: [
      "Nunca vendemos leads compartidos con tu competencia.",
      "Nunca entregamos un informe que no se entienda en cinco minutos.",
      "Nunca te dejamos sin saber qué pasa si cancelas.",
    ],
    closingQuote: "El riesgo lo asumo yo, no tú.",
  },

  faq: {
    number: "05",
    title: "Preguntas frecuentes",
    items: [
      { q: "¿Qué hacéis exactamente?", a: "Te llenamos la agenda de clientes. Sin que tengas que entender de marketing." },
      { q: "¿Cómo sé que esto funciona?", a: "Es normal que desconfíes. Por eso lo medimos en 3 semanas y decides tú si seguimos." },
      { q: "¿Con qué tipo de negocios trabajáis?", a: "Con pymes técnicas en general: si tu negocio se agenda con clientes y se ejecuta en el sitio, hablamos tu idioma. Cuéntanos el tuyo y vemos si encajamos." },
      { q: "¿Qué pasa si quiero cancelar?", a: "Nos lo dices y paramos. Nunca te dejamos sin saber qué pasa si cancelas — sin permanencia forzosa." },
      { q: "¿Prometéis resultados garantizados?", a: "No. Nunca prometemos resultados en plazos irreales. Lo que sí hacemos es medir cada semana y enseñarte los números tal cual son." },
    ],
  },

  ctaFinal: {
    title: "¿Hablamos de tu problema?",
    subtitle: "Ya sabes cómo pensamos. Cuéntanos el tuyo con detalle y te decimos, sin rodeos, cómo lo resolveríamos.",
    button: "Escríbeme: klikia@klikagencies.com",
    backLink: "↑ Volver a mi diagnóstico",
  },

  footer: {
    tagline: "Captación de clientes con IA para pymes técnicas.",
    serviciosTitle: "Servicios",
    servicios: ["Captación de clientes", "Recuperar citas", "Reseñas y reputación", "Web y ficha de Google"],
    siteTitle: "klik",
    siteLinks: [
      { label: "Calculadora", href: "/calculadora" },
      { label: "Diagnóstico", href: "/#diagnostico" },
      { label: "Nuestra historia", href: "/#historia" },
      { label: "Cómo trabajamos", href: "/#proceso" },
      { label: "Preguntas", href: "/#preguntas" },
    ],
    contactTitle: "Contacto",
    copyright: "klik · Tu agenda llena, sin letra pequeña.",
    legal: { avisoLegal: "Aviso legal", privacidad: "Privacidad", cookies: "Cookies" },
  },

  calculadoraPage: {
    metaTitle: "Calculadora | klik",
    metaDescription:
      "Calcula, con tus propios números, cuánto dinero se te puede estar escapando cada mes por citas perdidas y llamadas sin contestar a tiempo.",
    eyebrow: "Calculadora",
    title: "Mira lo que se te está escapando",
    subtitle:
      "Dos maneras de perder dinero sin darte cuenta: citas de mantenimiento que nadie recupera, y llamadas que nadie contesta a tiempo. Mueve los números a los tuyos.",
    closingTitle: "Estos números son solo el punto de partida",
    closingSubtitle: "Con tus cifras reales, el número exacto puede ser distinto — para bien o para mal. Cuéntanos tu caso y lo vemos juntos.",
    closingButton: "Escríbeme: klikia@klikagencies.com",
    closingBack: "↑ O cuéntanos qué te está pasando",
  },

  calculators: {
    numberLocale: "es-ES",
    disclaimer:
      "Cálculo ilustrativo a partir de los números que ajustes tú mismo — no son datos de un cliente real ni una previsión garantizada. Cuando hablamos, lo hacemos con tus cifras exactas.",
    monthSuffix: "al mes",
    yearSuffix: "al año",
    total: {
      label: "Sumando las dos tablas de abajo",
      resultLine: "se te podrían estar escapando cada mes",
      button: "Cuéntanos tu caso real →",
      mail: {
        subject: "Calculadoras — total combinado",
        greeting: "Hola,",
        intro: "He probado las dos calculadoras de la web:",
        line1: "Mantenimientos perdidos:",
        line2: "Llamadas sin contestar a tiempo:",
        totalLine: "Total combinado:",
        closing: "¿Hablamos de mi caso real?",
      },
    },
    maintenance: {
      tag: "Tabla 1 · Mantenimientos",
      title: "Lo que se pierde en contratos de mantenimiento",
      fields: {
        technicians: "Técnicos que solo hacen mantenimientos",
        perTechMonth: "Mantenimientos por técnico al mes",
        price: "Precio medio por mantenimiento",
        lossPercent: "Citas que se pierden",
      },
      resultLabel: "Con esos números, cada mes",
      resultLine: "se escapan sin que nadie lo note",
      statTotal: "mantenimientos al mes",
      statLost: "se pierden al mes",
      statPerTech: "por técnico al mes",
      button: "Calcula el mío con vosotros →",
      mail: {
        subject: "Calculadora — mantenimientos perdidos",
        greeting: "Hola,",
        intro: "He probado la calculadora de mantenimientos perdidos con estos números:",
        lineTechnicians: "Técnicos de mantenimiento:",
        linePerTech: "Mantenimientos por técnico/mes:",
        linePrice: "Precio medio:",
        lineLoss: "% de citas perdidas:",
        result: "Resultado:",
        closing: "¿Hablamos de mi caso real?",
      },
    },
    calls: {
      tag: "Tabla 2 · Llamadas y mensajes",
      title: "Lo que se pierde por no contestar a tiempo",
      fields: {
        volume: "Llamadas o mensajes que recibís al mes",
        missedPercent: "Los que no se contestan a tiempo",
        conversionPercent: "De esos, los que se habrían convertido en cliente",
        ticket: "Ticket medio por cliente",
      },
      resultLabel: "Con esos números, cada mes",
      resultLine: "se escapan sin que nadie lo note",
      statMissed: "llamadas sin contestar a tiempo/mes",
      statLostClients: "clientes que no llegan a serlo",
      button: "Calcula el mío con vosotros →",
      mail: {
        subject: "Calculadora — llamadas perdidas",
        greeting: "Hola,",
        intro: "He probado la calculadora de llamadas perdidas con estos números:",
        lineVolume: "Llamadas o mensajes al mes:",
        lineMissed: "% sin contestar a tiempo:",
        lineConversion: "% que se convierte si se contesta a tiempo:",
        lineTicket: "Ticket medio:",
        result: "Resultado:",
        closing: "¿Hablamos de mi caso real?",
      },
    },
  },

  notFound: {
    title: "Esta página no existe",
    subtitle: "El enlace puede estar mal escrito o la página ya no está aquí. Vuelve al inicio o cuéntanos qué buscabas.",
    backHome: "← Volver al inicio",
  },

  legalShell: {
    backLink: "← Volver a la web",
    documentLabel: "Documento legal",
    updatedLabel: "Última actualización:",
  },
};

export default es;
export type Dictionary = typeof es;
