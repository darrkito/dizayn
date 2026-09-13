export type Lang = "es" | "en";

export type ServiceCopy = {
  name: string;
  tagline: string;
  intro: string;
  includes: string[];
  process: { title: string; body: string }[];
  forWho: string[];
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

export type Service = {
  slug: string;
  number: string;
  es: ServiceCopy;
  en: ServiceCopy;
  /** Present only for the 5 services exportable to a remote US client (excludes photography
   * and video, which require physical presence and don't travel at a competitive price).
   * Same ServiceCopy shape, different positioning/pricing/FAQ for the US market. */
  us?: { es: ServiceCopy; en: ServiceCopy };
};

export const services: Service[] = [
  {
    slug: "sitios-web",
    number: "01",
    es: {
      name: "Diseño de sitios web",
      tagline: "Sitios que venden, no folletos digitales.",
      intro:
        "Diseñamos y desarrollamos sitios web rápidos, claros y pensados para convertir visitas en clientes. Cada proyecto arranca con estrategia de mensaje y termina con un sitio medible, editable y listo para posicionar.",
      includes: [
        "Estrategia de mensaje y arquitectura de información",
        "Diseño a medida, sin plantillas genéricas",
        "Desarrollo responsivo y optimizado en velocidad",
        "SEO técnico base y datos estructurados",
        "Formularios, WhatsApp y seguimiento de conversiones",
        "Capacitación para que tu equipo lo administre",
      ],
      process: [
        { title: "Diagnóstico", body: "Entendemos tu negocio, tu cliente ideal y tu competencia directa en Guadalajara y en línea." },
        { title: "Estructura", body: "Definimos páginas, jerarquía de mensajes y rutas de conversión antes de diseñar un solo pixel." },
        { title: "Diseño", body: "Dirección de arte propia: tipografía, color, fotografía y movimiento alineados a tu marca." },
        { title: "Desarrollo", body: "Construcción rápida, accesible y optimizada para buscadores y para modelos de IA." },
        { title: "Lanzamiento", body: "Pruebas, medición, indexación y acompañamiento después de salir en vivo." },
      ],
      forWho: [
        "Marcas que ya venden y necesitan verse a la altura",
        "Negocios locales que quieren aparecer primero en su zona",
        "Empresas que exportan y necesitan sitio bilingüe",
      ],
      faq: [
        { q: "¿Qué debe incluir un diseño de páginas web en Guadalajara?", a: "Un sitio profesional debe incluir base técnica de SEO (velocidad, estructura, datos estructurados), diseño a medida (no plantilla genérica), contenido real de tu negocio y capacitación para que tu equipo lo actualice sin depender de nosotros. Trabajamos con negocios de Guadalajara y Zapopan, y también proyectos nacionales." },
        { q: "¿Cuánto tarda un sitio?", a: "Un sitio corporativo típico toma de 3 a 6 semanas, dependiendo de contenido y aprobaciones." },
        { q: "¿Puedo editarlo yo?", a: "Sí. Entregamos el sitio con capacitación y documentación para que tu equipo actualice contenido sin depender de nosotros." },
        { q: "¿Cuánto cuesta un sitio web?", a: "Depende del número de páginas, si necesitas tienda en línea y cuánto contenido hay que crear desde cero. Tenemos una guía con rangos reales para Guadalajara en el blog, y damos una cotización exacta después de conocer tu proyecto." },
        { q: "¿Incluye hosting y dominio?", a: "Podemos gestionarlo o dejarlo en tu cuenta si prefieres tener el control directo — te explicamos las dos opciones antes de arrancar, sin obligarte a depender de nosotros para algo tan básico." },
        { q: "¿El sitio queda optimizado para SEO?", a: "Sí, la base técnica (velocidad, estructura, datos estructurados, metadatos) va incluida en todo proyecto. Posicionar de forma continua ya es el servicio de SEO aparte, pero el sitio nunca sale con deuda técnica que lo frene." },
        { q: "¿Hacen tiendas en línea?", a: "Sí, integramos catálogo y pago cuando el proyecto lo requiere. Lo evaluamos junto contigo desde la etapa de diagnóstico para dimensionar el alcance correcto." },
      ],
      metaTitle: "Agencia de Diseño Web en Guadalajara",
      metaDescription:
        "Diseño y desarrollo de sitios web a medida en Guadalajara: rápidos, optimizados para SEO y enfocados en convertir visitas en clientes.",
    },
    en: {
      name: "Web design & development",
      tagline: "Websites that sell, not digital brochures.",
      intro:
        "We design and build fast, clear websites made to turn visitors into customers. Every project starts with message strategy and ends with a measurable, editable site that is ready to rank.",
      includes: [
        "Message strategy and information architecture",
        "Custom design, no generic templates",
        "Responsive, speed-optimized development",
        "Technical SEO foundation and structured data",
        "Forms, WhatsApp and conversion tracking",
        "Training so your team can run it",
      ],
      process: [
        { title: "Discovery", body: "We learn your business, your ideal customer and who you actually compete against." },
        { title: "Structure", body: "Pages, message hierarchy and conversion paths defined before a single pixel is designed." },
        { title: "Design", body: "Original art direction: type, color, photography and motion aligned to your brand." },
        { title: "Build", body: "Fast, accessible and optimized for both search engines and AI models." },
        { title: "Launch", body: "Testing, tracking, indexing and support after you go live." },
      ],
      forWho: [
        "Brands already selling that need to look the part",
        "Local businesses that want to show up first in their area",
        "Companies exporting that need a bilingual site",
      ],
      faq: [
        { q: "What should professional web design in Guadalajara include?", a: "A professional site should include an SEO technical foundation (speed, structure, structured data), custom design (not a generic template), real content about your business, and training so your team can update it without depending on us. We work with businesses in Guadalajara and Zapopan, and national projects too." },
        { q: "How long does a site take?", a: "A typical corporate site takes 3 to 6 weeks depending on content and approvals." },
        { q: "Can I edit it myself?", a: "Yes. We hand over with training and documentation so your team updates content without us." },
        { q: "How much does a website cost?", a: "It depends on page count, whether you need an online store, and how much content has to be written from scratch. We publish real Guadalajara pricing ranges on the blog, and give an exact quote once we know your project." },
        { q: "Does it include hosting and a domain?", a: "We can manage it, or leave it on your own account if you'd rather keep direct control — we walk through both options before starting, no lock-in for something this basic." },
        { q: "Is the site SEO-ready?", a: "Yes, the technical foundation (speed, structure, structured data, metadata) is included in every project. Ongoing ranking work is the separate SEO service, but the site never launches with technical debt holding it back." },
        { q: "Do you build online stores?", a: "Yes, we integrate catalog and payment when a project calls for it. We scope it together during discovery so the build matches what you actually need." },
      ],
      metaTitle: "Web design & development in Guadalajara",
      metaDescription:
        "Custom website design and development from Guadalajara, Mexico: fast, SEO-ready and built to convert visitors into customers.",
    },
    us: {
      es: {
        name: "Diseño de sitios web para negocios en EE.UU.",
        tagline: "Un sitio que vende en inglés o en español, hecho por un equipo que domina los dos.",
        intro:
          "Diseñamos y desarrollamos el sitio de tu negocio en EE.UU. desde Guadalajara: mismo nivel que una agencia local, en dólares, con un equipo que piensa y escribe en español nativo — no una traducción automática. Ideal si tu cliente es bilingüe o hispanohablante.",
        includes: [
          "Estrategia de mensaje y arquitectura de información",
          "Diseño a medida, sin plantillas genéricas",
          "Desarrollo responsivo y optimizado en velocidad",
          "SEO técnico base y datos estructurados",
          "Formularios, WhatsApp/SMS y seguimiento de conversiones",
          "Contrato y facturación en inglés, precio fijo en USD",
        ],
        process: [
          { title: "Diagnóstico", body: "Entendemos tu negocio, tu cliente ideal y a quién le compites en tu mercado en EE.UU." },
          { title: "Estructura", body: "Definimos páginas, jerarquía de mensajes y rutas de conversión antes de diseñar un solo pixel." },
          { title: "Diseño", body: "Dirección de arte propia: tipografía, color, fotografía y movimiento alineados a tu marca." },
          { title: "Desarrollo", body: "Construcción rápida, accesible y optimizada para buscadores y para modelos de IA." },
          { title: "Lanzamiento", body: "Pruebas, medición, indexación y acompañamiento después de salir en vivo, en tu horario." },
        ],
        forWho: [
          "Negocios hispanos en EE.UU. que quieren verse tan profesionales como cualquier agencia local",
          "Empresas que buscan diseño de calidad sin pagar las tarifas de una agencia en Nueva York o Los Ángeles",
          "Marcas que necesitan un sitio bilingüe real, escrito por hablantes nativos de ambos idiomas",
        ],
        faq: [
          { q: "¿Cuánto cuesta un sitio web para mi negocio en EE.UU.?", a: "Desde $3,000 hasta $15,000+ USD dependiendo de páginas, funcionalidad y si necesitas tienda en línea — publicamos el rango completo con lo que incluye cada nivel en nuestra página de precios. Cotización exacta después de conocer tu proyecto." },
          { q: "¿Cómo les pago desde EE.UU.?", a: "PayPal (tarjeta de crédito o débito), transferencia bancaria (wire) o cripto (BTC, USDC, USDT). Facturamos en USD con un contrato en inglés y llenamos el W-8BEN-E que tu contador necesita para el pago a un proveedor extranjero." },
          { q: "¿En qué horario trabajan?", a: "Guadalajara está en la misma zona horaria que Texas, Chicago y gran parte del centro de EE.UU. (Hora del Centro) — nos reunimos en tu horario laboral normal, sin desfase." },
          { q: "¿Por qué contratar una agencia en México y no una local?", a: "Mismo nivel de diseño y desarrollo, equipo bilingüe nativo, y un costo 40-60% menor que una agencia comparable en EE.UU. — sin la barrera de idioma ni el desfase horario de contratar offshore en otro continente." },
        ],
        metaTitle: "Diseño Web para Negocios Hispanos en EE.UU.",
        metaDescription:
          "Agencia de diseño web nearshore para negocios en Estados Unidos: mismo nivel que una agencia local, precios en USD, equipo bilingüe en tu horario.",
      },
      en: {
        name: "Website design for US businesses",
        tagline: "A site that sells in English or Spanish, built by a team fluent in both.",
        intro:
          "We design and build your US business's website from Guadalajara: the same level as a local agency, priced in USD, with a team that writes native Spanish and English — not a machine translation. A strong fit if your customers are bilingual or Spanish-speaking.",
        includes: [
          "Message strategy and information architecture",
          "Custom design, no generic templates",
          "Responsive, speed-optimized development",
          "Technical SEO foundation and structured data",
          "Forms, WhatsApp/SMS and conversion tracking",
          "English-language contract and invoicing, fixed USD price",
        ],
        process: [
          { title: "Discovery", body: "We learn your business, your ideal customer and who you actually compete against in your US market." },
          { title: "Structure", body: "Pages, message hierarchy and conversion paths defined before a single pixel is designed." },
          { title: "Design", body: "Original art direction: type, color, photography and motion aligned to your brand." },
          { title: "Build", body: "Fast, accessible and optimized for both search engines and AI models." },
          { title: "Launch", body: "Testing, tracking, indexing and support after you go live, on your schedule." },
        ],
        forWho: [
          "US Hispanic-owned businesses that want to look as professional as any local agency",
          "Companies that want agency-quality design without New York or LA rates",
          "Brands that need a genuinely bilingual site, written by native speakers of both languages",
        ],
        faq: [
          { q: "How much does a website cost for my US business?", a: "$3,000 to $15,000+ USD depending on pages, functionality and whether you need an online store — see our pricing page for the full breakdown of what each tier includes. Exact quote once we know your project." },
          { q: "How do I pay from the US?", a: "PayPal (credit or debit card), bank wire transfer, or crypto (BTC, USDC, USDT). We invoice in USD with an English-language contract, and we complete the W-8BEN-E your accountant needs for a foreign-vendor payment." },
          { q: "What hours do you work?", a: "Guadalajara is on Central Time — the same zone as Texas, Chicago and most of the central US. We meet during your normal business hours, no timezone gap." },
          { q: "Why hire a Mexico-based agency instead of a local one?", a: "Same design and development caliber, a genuinely bilingual team, and 40-60% lower cost than a comparable US agency — without the language barrier or the timezone gap of offshoring to another continent." },
        ],
        metaTitle: "Web Design Agency for US Businesses — Nearshore, Guadalajara",
        metaDescription:
          "Nearshore web design agency for US businesses: local-agency quality, USD pricing, bilingual team on your schedule.",
      },
    },
  },
  {
    slug: "seo",
    number: "02",
    es: {
      name: "Posicionamiento SEO",
      tagline: "Que te encuentren cuando ya te están buscando.",
      intro:
        "Trabajo de SEO técnico, contenido y autoridad para que tu marca aparezca en los resultados que realmente generan ventas. Medimos posiciones, tráfico y prospectos, no vanidad.",
      includes: [
        "Auditoría técnica completa e implementación",
        "Investigación de palabras clave con intención de compra",
        "SEO local para Guadalajara, Zapopan y Jalisco",
        "Contenido optimizado y arquitectura de enlaces",
        "Perfil de Google Business y reseñas",
        "Reportes mensuales con posiciones y prospectos",
      ],
      process: [
        { title: "Auditoría", body: "Revisamos indexación, velocidad, contenido, enlaces y competencia." },
        { title: "Prioridades", body: "Ordenamos por impacto: primero lo que mueve la aguja en 30-60 días." },
        { title: "Implementación", body: "Corrección técnica, contenido nuevo y optimización de páginas clave." },
        { title: "Autoridad", body: "Enlaces, menciones locales y señales de confianza." },
        { title: "Medición", body: "Seguimiento mensual de posiciones, tráfico y conversiones." },
      ],
      forWho: [
        "Negocios que dependen de Google para vender",
        "Marcas con sitio bonito pero sin tráfico",
        "Empresas locales que compiten por su ciudad",
      ],
      faq: [
        { q: "¿Qué hace una agencia SEO en Guadalajara?", a: "Una agencia SEO en Guadalajara optimiza tu sitio para que aparezca cuando gente de la ciudad busca tu servicio en Google: auditoría técnica, contenido enfocado en intención de compra, SEO local (Google Business Profile, directorios) y construcción de autoridad. En Dizayn trabajamos las tres áreas juntas, no solo una." },
        { q: "¿En cuánto tiempo veo resultados?", a: "Las mejoras técnicas y locales suelen notarse en 4 a 8 semanas; el crecimiento sostenido toma de 3 a 6 meses." },
        { q: "¿Garantizan el primer lugar?", a: "Nadie puede garantizarlo honestamente. Garantizamos trabajo medible y reportes claros de lo que sí se mueve." },
        { q: "¿Qué incluye una auditoría SEO?", a: "Revisamos indexación real en Google, velocidad de carga, estructura del sitio, contenido existente contra lo que tu competencia está posicionando, y el estado de tus perfiles locales (Google Business, directorios). Sales con una lista priorizada, no un PDF genérico de 100 puntos." },
        { q: "¿Trabajan con negocios fuera de Guadalajara?", a: "Sí. La mayoría de nuestros clientes están en Guadalajara y Zapopan, pero el mismo proceso técnico y de contenido aplica a cualquier ciudad o mercado nacional." },
        { q: "¿Necesito rehacer mi sitio para hacer SEO?", a: "No siempre. Si el sitio ya tiene una base técnica sana, trabajamos sobre lo existente. Solo recomendamos reconstruir cuando la plataforma actual realmente está limitando el crecimiento." },
        { q: "¿Cuál es la diferencia entre SEO y pauta paga?", a: "El SEO construye posiciones que se quedan sin pagar por clic; la pauta paga resultados inmediatos que desaparecen si dejas de pagar. Los buenos negocios locales usan ambos en momentos distintos — tenemos una guía completa en el blog." },
      ],
      metaTitle: "Agencia SEO en Guadalajara",
      metaDescription:
        "SEO técnico, local y de contenido para negocios en Guadalajara y todo México. Más tráfico calificado y más prospectos, con reportes claros.",
    },
    en: {
      name: "SEO",
      tagline: "Get found when people are already looking.",
      intro:
        "Technical SEO, content and authority work so your brand shows up in the searches that actually create sales. We report rankings, traffic and leads, not vanity metrics.",
      includes: [
        "Full technical audit and implementation",
        "Keyword research with buying intent",
        "Local SEO for Guadalajara, Jalisco and beyond",
        "Optimized content and internal link architecture",
        "Google Business Profile and reviews",
        "Monthly reporting on rankings and leads",
      ],
      process: [
        { title: "Audit", body: "We review indexing, speed, content, links and competitors." },
        { title: "Priorities", body: "Ordered by impact: what moves the needle in 30-60 days comes first." },
        { title: "Implementation", body: "Technical fixes, new content and optimization of key pages." },
        { title: "Authority", body: "Links, local mentions and trust signals." },
        { title: "Measurement", body: "Monthly tracking of rankings, traffic and conversions." },
      ],
      forWho: [
        "Businesses that depend on Google to sell",
        "Brands with a beautiful site and no traffic",
        "Local companies competing for their city",
      ],
      faq: [
        { q: "What does an SEO agency in Guadalajara do?", a: "An SEO agency in Guadalajara optimizes your site so it shows up when local people search for your service on Google: technical audit, buying-intent content, local SEO (Google Business Profile, directories), and authority building. At Dizayn we work all three together, not just one." },
        { q: "How fast will I see results?", a: "Technical and local wins usually show in 4 to 8 weeks; compounding growth takes 3 to 6 months." },
        { q: "Do you guarantee position one?", a: "Nobody honestly can. We guarantee measurable work and clear reporting on what actually moves." },
        { q: "What's included in an SEO audit?", a: "We check real Google indexing, load speed, site structure, existing content against what your competitors are ranking for, and your local profiles (Google Business, directories). You get a prioritized list, not a generic 100-point PDF." },
        { q: "Do you work with businesses outside Guadalajara?", a: "Yes. Most of our clients are in Guadalajara and Zapopan, but the same technical and content process applies to any city or national market." },
        { q: "Do I need to rebuild my site for SEO?", a: "Not always. If the site already has a healthy technical foundation, we build on what's there. We only recommend a rebuild when the current platform is genuinely capping growth." },
        { q: "What's the difference between SEO and paid search?", a: "SEO builds rankings that stay without paying per click; paid search buys immediate results that stop the moment you stop paying. Good local businesses use both at different moments — we cover this in depth on the blog." },
      ],
      metaTitle: "SEO agency in Guadalajara, Mexico",
      metaDescription:
        "Technical, local and content SEO for businesses in Mexico and abroad. More qualified traffic, more leads, transparent reporting.",
    },
    us: {
      es: {
        name: "SEO para negocios en EE.UU.",
        tagline: "Que te encuentren en Google, en inglés y en español.",
        intro:
          "Trabajo de SEO técnico, contenido y autoridad para negocios en Estados Unidos, con la ventaja de un equipo que también domina el SEO en español — el mercado hispano de EE.UU. busca en ambos idiomas y la mayoría de las agencias solo cubre uno.",
        includes: [
          "Auditoría técnica completa e implementación",
          "Investigación de palabras clave en inglés y en español",
          "SEO local para tu ciudad o zona de servicio en EE.UU.",
          "Contenido optimizado y arquitectura de enlaces",
          "Perfil de Google Business y reseñas",
          "Reportes mensuales con posiciones y prospectos, en tu idioma",
        ],
        process: [
          { title: "Auditoría", body: "Revisamos indexación, velocidad, contenido, enlaces y competencia real en tu mercado." },
          { title: "Prioridades", body: "Ordenamos por impacto: primero lo que mueve la aguja en 30-60 días." },
          { title: "Implementación", body: "Corrección técnica, contenido nuevo y optimización de páginas clave." },
          { title: "Autoridad", body: "Enlaces, menciones locales y señales de confianza." },
          { title: "Medición", body: "Seguimiento mensual de posiciones, tráfico y conversiones, con reporte en tu horario." },
        ],
        forWho: [
          "Negocios en EE.UU. que quieren aparecer también en búsquedas en español",
          "Marcas con sitio bonito pero sin tráfico",
          "Empresas que ya pagan de más por SEO y quieren el mismo resultado a menor costo",
        ],
        faq: [
          { q: "¿Cuánto cuesta el SEO mensual?", a: "Nuestros planes van de $1,200 a $4,000 USD al mes, contra un promedio de mercado en EE.UU. de más de $3,200/mes — mismo trabajo técnico y de contenido, precio nearshore." },
          { q: "¿Hacen SEO en español también?", a: "Sí, y es donde más ventaja tenemos: la mayoría de las agencias de SEO en EE.UU. no cubre bien el mercado hispanohablante. Si tu negocio le vende a comunidad hispana, esto es una oportunidad real de posicionamiento con poca competencia." },
          { q: "¿En cuánto tiempo veo resultados?", a: "Las mejoras técnicas y locales suelen notarse en 4 a 8 semanas; el crecimiento sostenido toma de 3 a 6 meses, igual que con cualquier agencia seria." },
          { q: "¿Cómo se factura y se paga?", a: "Facturación mensual en USD, contrato en inglés, pago por PayPal, transferencia bancaria (wire) o cripto (BTC, USDC, USDT)." },
        ],
        metaTitle: "Agencia SEO para Negocios en EE.UU. (Inglés y Español)",
        metaDescription:
          "SEO técnico, local y de contenido para negocios en Estados Unidos, en inglés y en español. Precios nearshore, reportes claros.",
      },
      en: {
        name: "SEO for US businesses",
        tagline: "Get found on Google, in English and in Spanish.",
        intro:
          "Technical SEO, content and authority work for US businesses, with the added edge of a team that also does SEO in Spanish — the US Hispanic market searches in both languages, and most agencies only cover one.",
        includes: [
          "Full technical audit and implementation",
          "Keyword research in English and Spanish",
          "Local SEO for your city or service area in the US",
          "Optimized content and internal link architecture",
          "Google Business Profile and reviews",
          "Monthly reporting on rankings and leads",
        ],
        process: [
          { title: "Audit", body: "We review indexing, speed, content, links and your real competitors." },
          { title: "Priorities", body: "Ordered by impact: what moves the needle in 30-60 days comes first." },
          { title: "Implementation", body: "Technical fixes, new content and optimization of key pages." },
          { title: "Authority", body: "Links, local mentions and trust signals." },
          { title: "Measurement", body: "Monthly tracking of rankings, traffic and conversions, reported on your schedule." },
        ],
        forWho: [
          "US businesses that also want to show up in Spanish-language search",
          "Brands with a beautiful site and no traffic",
          "Companies already overpaying for SEO who want the same result for less",
        ],
        faq: [
          { q: "How much does monthly SEO cost?", a: "Our plans run $1,200 to $4,000 USD/month, against a US market average north of $3,200/month — same technical and content work, nearshore pricing." },
          { q: "Do you do Spanish-language SEO too?", a: "Yes, and it's where we add the most value: most US SEO agencies don't cover the Spanish-speaking market well. If your business serves Hispanic customers, this is real, low-competition ranking opportunity." },
          { q: "How fast will I see results?", a: "Technical and local wins usually show in 4 to 8 weeks; compounding growth takes 3 to 6 months, same as with any serious agency." },
          { q: "How does billing and payment work?", a: "Monthly USD invoicing, English-language contract, payment by PayPal, bank wire, or crypto (BTC, USDC, USDT)." },
        ],
        metaTitle: "SEO Agency for US Businesses — English & Spanish",
        metaDescription:
          "Technical, local and content SEO for US businesses, in English and Spanish. Nearshore pricing, transparent reporting.",
      },
    },
  },
  {
    slug: "posicionamiento-ia",
    number: "03",
    es: {
      name: "GEO: posicionamiento en IA y LLMs",
      tagline: "Que ChatGPT también te recomiende.",
      intro:
        "Cada vez más personas preguntan a ChatGPT, Perplexity o Gemini antes de comprar. A optimizar tu marca para estos motores se le llama GEO (Generative Engine Optimization). Preparamos tu marca para ser citada por esos modelos: contenido estructurado, entidades claras y fuentes que la IA puede leer y confiar.",
      includes: [
        "Auditoría de visibilidad en ChatGPT, Perplexity y Gemini",
        "Datos estructurados y definición de entidad de marca",
        "Contenido en formato que los modelos citan",
        "Presencia en fuentes que los modelos consultan",
        "Monitoreo de menciones y respuestas",
        "Reporte de cómo te describe la IA",
      ],
      process: [
        { title: "Línea base", body: "Preguntamos a los modelos por tu categoría y documentamos qué contestan hoy." },
        { title: "Entidad", body: "Definimos quién eres, qué haces y dónde, de forma consistente en toda la web." },
        { title: "Contenido", body: "Publicamos respuestas claras y verificables a las preguntas reales de tu mercado." },
        { title: "Fuentes", body: "Trabajamos directorios, prensa y perfiles que los modelos usan como referencia." },
        { title: "Seguimiento", body: "Volvemos a preguntar cada mes y ajustamos." },
      ],
      forWho: [
        "Marcas que quieren adelantarse a su competencia",
        "Servicios profesionales y B2B",
        "Negocios donde el cliente investiga antes de comprar",
      ],
      faq: [
        { q: "¿Esto reemplaza al SEO?", a: "No, lo complementa. La base técnica y de contenido sirve para ambos, pero el formato y las fuentes cambian." },
        { q: "¿Se puede medir?", a: "Sí. Documentamos las respuestas de los modelos antes y después, con capturas y prompts repetibles." },
        { q: "¿Qué es GEO exactamente?", a: "GEO (Generative Engine Optimization) es preparar tu contenido y presencia de marca para que sistemas como ChatGPT, Perplexity o los AI Overviews de Google te citen como fuente al responder — no solo para que aparezcas en una lista de links." },
        { q: "¿Cómo saben qué dice la IA de mi marca hoy?", a: "Le preguntamos directamente a los modelos por tu categoría y tu marca, con prompts repetibles, y documentamos las respuestas con capturas. Esa es tu línea base antes de empezar cualquier trabajo." },
        { q: "¿Sirve para negocios locales?", a: "Sí. Entre más específico y verificable sea el dato (ciudad, servicio, precio), más fácil es para un modelo de IA citarte con confianza en una búsqueda local." },
      ],
      metaTitle: "Agencia GEO en Guadalajara (Posicionamiento en IA)",
      metaDescription:
        "Agencia GEO en México: haz que ChatGPT, Perplexity y Gemini recomienden tu marca. Estrategia de visibilidad en modelos de IA para negocios en México.",
    },
    en: {
      name: "GEO: AI & LLM visibility",
      tagline: "Get recommended by ChatGPT too.",
      intro:
        "More people ask ChatGPT, Perplexity or Gemini before they buy. Optimizing your brand for these engines is called GEO (Generative Engine Optimization). We prepare your brand to be cited by those models: structured content, clear entities and sources AI can read and trust.",
      includes: [
        "Visibility audit across ChatGPT, Perplexity and Gemini",
        "Structured data and brand entity definition",
        "Content written in the format models cite",
        "Presence in the sources models consult",
        "Mention and answer monitoring",
        "Reporting on how AI describes you",
      ],
      process: [
        { title: "Baseline", body: "We ask the models about your category and document today's answers." },
        { title: "Entity", body: "We define who you are, what you do and where, consistently across the web." },
        { title: "Content", body: "We publish clear, verifiable answers to your market's real questions." },
        { title: "Sources", body: "We work the directories, press and profiles models use as references." },
        { title: "Tracking", body: "We re-run the prompts monthly and adjust." },
      ],
      forWho: [
        "Brands that want a head start on competitors",
        "Professional services and B2B",
        "Businesses where buyers research first",
      ],
      faq: [
        { q: "Does this replace SEO?", a: "No, it complements it. The technical and content base serves both, but format and sources differ." },
        { q: "Can it be measured?", a: "Yes. We document model answers before and after with repeatable prompts and screenshots." },
        { q: "What exactly is GEO?", a: "GEO (Generative Engine Optimization) is preparing your content and brand presence so systems like ChatGPT, Perplexity, or Google's AI Overviews cite you as a source when answering — not just so you show up in a list of links." },
        { q: "How do you know what AI says about my brand today?", a: "We ask the models directly about your category and your brand, with repeatable prompts, and document the answers with screenshots. That's your baseline before any work starts." },
        { q: "Does this work for local businesses?", a: "Yes. The more specific and verifiable the fact (city, service, price), the easier it is for an AI model to confidently cite you in a local search." },
      ],
      metaTitle: "GEO Agency in Guadalajara (AI Search Visibility)",
      metaDescription:
        "GEO agency in Mexico: make ChatGPT, Perplexity and Gemini recommend your brand. AI search visibility strategy for businesses in Mexico and worldwide.",
    },
    us: {
      es: {
        name: "GEO para negocios en EE.UU.: posicionamiento en IA",
        tagline: "Que ChatGPT también recomiende tu negocio.",
        intro:
          "Cada vez más clientes en EE.UU. le preguntan a ChatGPT, Perplexity o los AI Overviews de Google antes de contratar un servicio. GEO (Generative Engine Optimization) prepara tu marca para ser la respuesta que esos modelos citan — es la categoría de marketing más nueva y con menos competencia real hoy.",
        includes: [
          "Auditoría de visibilidad en ChatGPT, Perplexity, Gemini y AI Overviews",
          "Datos estructurados y definición de entidad de marca",
          "Contenido en formato que los modelos citan (respuestas directas, comparativas, precios)",
          "Presencia en directorios y fuentes que los modelos consultan",
          "Monitoreo mensual de menciones y respuestas",
          "Reporte de cómo te describe la IA hoy vs. antes",
        ],
        process: [
          { title: "Línea base", body: "Preguntamos a los modelos por tu categoría y documentamos qué contestan hoy, con capturas repetibles." },
          { title: "Entidad", body: "Definimos quién eres, qué haces y dónde, de forma consistente en toda la web." },
          { title: "Contenido", body: "Publicamos respuestas claras y verificables a las preguntas reales de tus clientes." },
          { title: "Fuentes", body: "Trabajamos directorios, prensa y perfiles que los modelos usan como referencia." },
          { title: "Seguimiento", body: "Volvemos a preguntar cada mes y ajustamos según lo que cambió." },
        ],
        forWho: [
          "Negocios que quieren adelantarse a su competencia antes de que GEO se vuelva estándar",
          "Servicios profesionales y B2B donde el cliente investiga antes de comprar",
          "Marcas que ya invierten en SEO y quieren el siguiente paso real",
        ],
        faq: [
          { q: "¿Cuánto cuesta GEO?", a: "Desde $1,800 hasta $5,000 USD al mes según el alcance — el mercado apenas está definiendo precios (las agencias en EE.UU. empiezan en $3,000/mes), así que esta es la categoría donde más te conviene entrar temprano." },
          { q: "¿Esto reemplaza al SEO?", a: "No, lo complementa. La base técnica y de contenido sirve para ambos, pero el formato y las fuentes que hay que trabajar son distintos." },
          { q: "¿Se puede medir?", a: "Sí. Documentamos las respuestas de los modelos antes y después, con capturas y prompts repetibles — no es una promesa, es un reporte." },
          { q: "¿Por qué contratar esto con una agencia de México?", a: "GEO es tan nuevo que no hay una 'agencia local' con ventaja real todavía. Lo que sí importa es el rigor técnico del trabajo, y eso lo hacemos al mismo nivel a una fracción del costo." },
        ],
        metaTitle: "Agencia GEO para Negocios en EE.UU. (Posicionamiento en IA)",
        metaDescription:
          "GEO para negocios en Estados Unidos: haz que ChatGPT, Perplexity y Gemini recomienden tu marca. La categoría de marketing más nueva, precio nearshore.",
      },
      en: {
        name: "GEO for US businesses: AI search visibility",
        tagline: "Get ChatGPT to recommend your business too.",
        intro:
          "More US customers now ask ChatGPT, Perplexity or Google's AI Overviews before hiring a service. GEO (Generative Engine Optimization) prepares your brand to be the answer those models cite — it's the newest marketing category, and the one with the least real competition today.",
        includes: [
          "Visibility audit across ChatGPT, Perplexity, Gemini and AI Overviews",
          "Structured data and brand entity definition",
          "Content written in the format models cite (direct answers, comparisons, pricing)",
          "Presence in the directories and sources models consult",
          "Monthly mention and answer monitoring",
          "Reporting on how AI describes you now vs. before",
        ],
        process: [
          { title: "Baseline", body: "We ask the models about your category and document today's answers with repeatable screenshots." },
          { title: "Entity", body: "We define who you are, what you do and where, consistently across the web." },
          { title: "Content", body: "We publish clear, verifiable answers to your customers' real questions." },
          { title: "Sources", body: "We work the directories, press and profiles models use as references." },
          { title: "Tracking", body: "We re-run the prompts monthly and adjust based on what changed." },
        ],
        forWho: [
          "Businesses that want a head start before GEO becomes standard",
          "Professional services and B2B where buyers research before they buy",
          "Brands already investing in SEO who want the real next step",
        ],
        faq: [
          { q: "How much does GEO cost?", a: "$1,800 to $5,000 USD/month depending on scope — the market is still setting prices (US agencies start at $3,000/month), which makes this the category where getting in early matters most." },
          { q: "Does this replace SEO?", a: "No, it complements it. The technical and content foundation serves both, but the format and sources you need to work are different." },
          { q: "Can it be measured?", a: "Yes. We document model answers before and after with repeatable prompts and screenshots — it's a report, not a promise." },
          { q: "Why hire a Mexico-based agency for this?", a: "GEO is new enough that no 'local agency' has a real advantage yet. What actually matters is the technical rigor of the work, and we do it at the same level for a fraction of the cost." },
        ],
        metaTitle: "GEO Agency for US Businesses — AI Search Visibility",
        metaDescription:
          "GEO for US businesses: get ChatGPT, Perplexity and Gemini to recommend your brand. The newest marketing category, nearshore pricing.",
      },
    },
  },
  {
    slug: "redes-sociales",
    number: "04",
    es: {
      name: "Agencia de redes sociales",
      tagline: "Comunidad que compra, no solo que da like.",
      intro:
        "Estrategia, producción y publicación para que tus redes trabajen como canal de venta. Contenido con dirección de arte real, calendario constante y métricas que importan.",
      includes: [
        "Estrategia de contenido y línea gráfica",
        "Producción mensual de foto y video",
        "Calendario editorial y publicación",
        "Community management y respuesta a mensajes",
        "Campañas pagadas en Meta y TikTok",
        "Reporte de alcance, guardados y prospectos",
      ],
      process: [
        { title: "Estrategia", body: "Definimos posicionamiento, pilares de contenido y tono de voz." },
        { title: "Producción", body: "Sesión mensual de foto y video en Guadalajara o en tu sede." },
        { title: "Publicación", body: "Calendario constante, formatos nativos y copys que invitan a la acción." },
        { title: "Comunidad", body: "Respondemos, filtramos prospectos y los mandamos a WhatsApp o al sitio." },
        { title: "Escala", body: "Amplificamos lo que ya funciona con pauta." },
      ],
      forWho: [
        "Marcas de producto que viven de Instagram y TikTok",
        "Restaurantes, retail y hospitalidad",
        "Negocios que quieren dejar de improvisar contenido",
      ],
      faq: [
        { q: "¿Qué incluye la administración de redes sociales en Guadalajara?", a: "Estrategia y calendario editorial, producción mensual de foto y video, publicación, community management (respuestas y calificación de leads) y campañas pagadas en Meta/TikTok si tu marca lo necesita. En Dizayn lo entregamos completo, no solo la publicación." },
        { q: "¿Incluye la producción de contenido?", a: "Sí. Fotografía y video están incluidos en los planes mensuales; no dependes de material de banco." },
        { q: "¿Manejan pauta?", a: "Sí, gestionamos campañas en Meta y TikTok con presupuesto aparte del fee." },
        { q: "¿Cuántas publicaciones incluye el plan?", a: "Varía según el plan y la plataforma — lo que importa más que la cantidad es la constancia y que cada pieza tenga un propósito. Tenemos una guía completa sobre cuánto publicar según tu tipo de negocio en el blog." },
        { q: "¿En qué plataformas trabajan?", a: "Principalmente Instagram, TikTok y Facebook, que es donde vive la mayoría de nuestros clientes de producto, restaurantes y retail. Evaluamos LinkedIn para marcas B2B según el caso." },
        { q: "¿Puedo pedir solo producción sin manejo de cuenta?", a: "Sí, podemos separar producción de foto/video de la gestión diaria de la cuenta si ya tienes quien publique internamente." },
      ],
      metaTitle: "Agencia de Redes Sociales en Guadalajara",
      metaDescription:
        "Estrategia, producción de contenido y community management para marcas en Guadalajara y todo México. Redes que generan ventas.",
    },
    en: {
      name: "Social media management agency",
      tagline: "A community that buys, not just likes.",
      intro:
        "Strategy, production and publishing so your social channels work as a sales channel. Content with real art direction, a consistent calendar and metrics that matter.",
      includes: [
        "Content strategy and visual identity",
        "Monthly photo and video production",
        "Editorial calendar and publishing",
        "Community management and inbox handling",
        "Paid campaigns on Meta and TikTok",
        "Reporting on reach, saves and leads",
      ],
      process: [
        { title: "Strategy", body: "Positioning, content pillars and tone of voice." },
        { title: "Production", body: "Monthly photo and video shoot in Guadalajara or at your location." },
        { title: "Publishing", body: "Consistent calendar, native formats and copy that invites action." },
        { title: "Community", body: "We reply, qualify leads and route them to WhatsApp or your site." },
        { title: "Scale", body: "We amplify what already works with paid media." },
      ],
      forWho: [
        "Product brands living on Instagram and TikTok",
        "Restaurants, retail and hospitality",
        "Businesses tired of improvising content",
      ],
      faq: [
        { q: "What does social media management in Guadalajara include?", a: "Strategy and editorial calendar, monthly photo and video production, publishing, community management (replies and lead qualification), and paid Meta/TikTok campaigns if your brand needs them. At Dizayn we deliver the full scope, not just publishing." },
        { q: "Is content production included?", a: "Yes. Photo and video are part of the monthly plans, so you never rely on stock." },
        { q: "Do you run ads?", a: "Yes, we manage Meta and TikTok campaigns with ad spend billed separately." },
        { q: "How many posts does the plan include?", a: "It varies by plan and platform — what matters more than volume is consistency and every piece having a purpose. We cover how much to post for your type of business in a full guide on the blog." },
        { q: "Which platforms do you work on?", a: "Mainly Instagram, TikTok and Facebook, where most of our product, restaurant and retail clients live. We evaluate LinkedIn for B2B brands case by case." },
        { q: "Can I get just production without account management?", a: "Yes, we can split photo/video production from day-to-day account management if you already have someone posting in-house." },
      ],
      metaTitle: "Social Media Management Agency in Guadalajara",
      metaDescription:
        "Content strategy, production and community management for brands in Mexico and abroad. Social channels that actually generate sales.",
    },
    us: {
      es: {
        name: "Redes sociales para negocios en EE.UU.",
        tagline: "Comunidad que compra, no solo que da like — en inglés y en español.",
        intro:
          "Estrategia, producción y publicación para que tus redes trabajen como canal de venta. Escribimos y respondemos en el idioma de tu cliente real, algo que la mayoría de las agencias en EE.UU. no puede ofrecer si tu comunidad es bilingüe o hispanohablante.",
        includes: [
          "Estrategia de contenido y línea gráfica",
          "Copy y respuestas en inglés y/o español según tu audiencia",
          "Calendario editorial y publicación",
          "Community management y calificación de mensajes",
          "Campañas pagadas en Meta y TikTok",
          "Reporte mensual de alcance, guardados y prospectos",
        ],
        process: [
          { title: "Estrategia", body: "Definimos posicionamiento, pilares de contenido y tono de voz para tu comunidad real." },
          { title: "Producción", body: "Piezas mensuales de foto/video (remoto o coordinado con tu equipo en sitio)." },
          { title: "Publicación", body: "Calendario constante, formatos nativos y copys que invitan a la acción." },
          { title: "Comunidad", body: "Respondemos, calificamos prospectos y los mandamos a tu WhatsApp o sitio." },
          { title: "Escala", body: "Amplificamos lo que ya funciona con pauta." },
        ],
        forWho: [
          "Negocios en EE.UU. con comunidad bilingüe o hispanohablante",
          "Restaurantes, retail y servicios locales que viven de Instagram y TikTok",
          "Marcas que pagan de más por manejo de redes y quieren el mismo resultado por menos",
        ],
        faq: [
          { q: "¿Cuánto cuesta el manejo de redes?", a: "Desde $900 hasta $3,000 USD al mes según alcance — contra un promedio de mercado en EE.UU. de $2,500 a $7,500/mes por el mismo nivel de servicio." },
          { q: "¿Publican en inglés y en español?", a: "Sí, según lo que tu audiencia realmente hable — muchas marcas en EE.UU. pierden alcance por publicar solo en un idioma cuando su cliente vive entre los dos." },
          { q: "¿La producción de foto/video está incluida?", a: "Sí, en los planes mensuales. Si tu negocio tiene ubicación física la coordinamos con tu equipo en sitio; para contenido de marca/producto trabajamos remoto." },
          { q: "¿Cómo se paga?", a: "Facturación mensual en USD, contrato en inglés, PayPal, transferencia bancaria (wire) o cripto (BTC, USDC, USDT)." },
        ],
        metaTitle: "Agencia de Redes Sociales para Negocios en EE.UU.",
        metaDescription:
          "Manejo de redes sociales para negocios en Estados Unidos, en inglés y en español. Estrategia, producción y community management.",
      },
      en: {
        name: "Social media for US businesses",
        tagline: "A community that buys, not just likes — in English and Spanish.",
        intro:
          "Strategy, production and publishing so your social channels work as a sales channel. We write and reply in your actual customer's language, something most US agencies can't offer if your community is bilingual or Spanish-speaking.",
        includes: [
          "Content strategy and visual identity",
          "Copy and replies in English and/or Spanish, matched to your audience",
          "Editorial calendar and publishing",
          "Community management and lead qualification",
          "Paid campaigns on Meta and TikTok",
          "Monthly reporting on reach, saves and leads",
        ],
        process: [
          { title: "Strategy", body: "Positioning, content pillars and tone of voice for your real community." },
          { title: "Production", body: "Monthly photo/video assets (remote, or coordinated with your on-site team)." },
          { title: "Publishing", body: "Consistent calendar, native formats and copy that invites action." },
          { title: "Community", body: "We reply, qualify leads and route them to your WhatsApp or site." },
          { title: "Scale", body: "We amplify what already works with paid media." },
        ],
        forWho: [
          "US businesses with a bilingual or Spanish-speaking community",
          "Restaurants, retail and local services living on Instagram and TikTok",
          "Brands overpaying for social management who want the same result for less",
        ],
        faq: [
          { q: "How much does social media management cost?", a: "$900 to $3,000 USD/month depending on scope — against a US market average of $2,500-7,500/month for the same level of service." },
          { q: "Do you post in English and Spanish?", a: "Yes, matched to what your audience actually speaks — many US brands lose reach by posting in only one language when their customer lives between both." },
          { q: "Is photo/video production included?", a: "Yes, in the monthly plans. If your business has a physical location we coordinate with your on-site team; for brand/product content we work remotely." },
          { q: "How does payment work?", a: "Monthly USD invoicing, English-language contract, PayPal, bank wire, or crypto (BTC, USDC, USDT)." },
        ],
        metaTitle: "Social Media Agency for US Businesses",
        metaDescription:
          "Social media management for US businesses, in English and Spanish. Strategy, production and community management.",
      },
    },
  },
  {
    slug: "embudos-de-venta",
    number: "05",
    es: {
      name: "Embudos de venta",
      tagline: "Del clic al cliente, sin fugas.",
      intro:
        "Diseñamos el camino completo: anuncio, landing, oferta, seguimiento automatizado y cierre. Cada paso medido para saber exactamente cuánto cuesta un prospecto y cuánto vale.",
      includes: [
        "Diseño de oferta y propuesta de valor",
        "Landing pages de alta conversión",
        "Automatizaciones de correo y WhatsApp",
        "Integración con CRM y seguimiento",
        "Pruebas A/B y optimización continua",
        "Tablero con costo por prospecto y por venta",
      ],
      process: [
        { title: "Oferta", body: "Clarificamos qué vendes, a quién y por qué debería importarle hoy." },
        { title: "Tráfico", body: "Definimos el canal y el mensaje de entrada." },
        { title: "Conversión", body: "Landing, formulario y prueba social diseñados para una sola acción." },
        { title: "Seguimiento", body: "Secuencias automáticas que recuperan a quien no compró de inmediato." },
        { title: "Optimización", body: "Iteramos con datos hasta bajar el costo por venta." },
      ],
      forWho: [
        "Servicios de alto valor y ventas consultivas",
        "Cursos, inmobiliarias y salud",
        "Negocios que ya invierten en anuncios sin control claro",
      ],
      faq: [
        { q: "¿Incluye la inversión publicitaria?", a: "No. El presupuesto de anuncios se paga directo a la plataforma y se define contigo." },
        { q: "¿Con qué herramientas trabajan?", a: "Nos adaptamos a tu stack; si no tienes, montamos uno simple y económico." },
        { q: "¿Cuánto tiempo toma construir un embudo?", a: "Un embudo básico (landing, automatización simple, seguimiento) suele estar listo en 2 a 4 semanas. Embudos con múltiples pasos o integraciones complejas toman más." },
        { q: "¿Sirve si ya tengo sitio web?", a: "Sí, un embudo casi siempre vive aparte del sitio principal — una landing enfocada en una sola oferta convierte mejor que mandar tráfico pagado a un sitio con muchas distracciones." },
        { q: "¿Qué pasa si el embudo no convierte al inicio?", a: "Es normal — los primeros datos sirven para diagnosticar dónde se pierde el prospecto, y ahí es donde iteramos oferta, mensaje o segmentación antes de subir la inversión en anuncios." },
      ],
      metaTitle: "Agencia de Embudos de Venta en Guadalajara",
      metaDescription:
        "Diseño de embudos de venta completos: oferta, landing, automatización y seguimiento. Menos costo por prospecto, más cierres.",
    },
    en: {
      name: "Sales funnels",
      tagline: "From click to customer, with no leaks.",
      intro:
        "We design the full path: ad, landing page, offer, automated follow-up and close. Every step measured so you know exactly what a lead costs and what it's worth.",
      includes: [
        "Offer and value proposition design",
        "High-conversion landing pages",
        "Email and WhatsApp automation",
        "CRM integration and follow-up",
        "A/B testing and continuous optimization",
        "Dashboard with cost per lead and per sale",
      ],
      process: [
        { title: "Offer", body: "We clarify what you sell, to whom and why it should matter today." },
        { title: "Traffic", body: "We define the channel and the entry message." },
        { title: "Conversion", body: "Landing, form and social proof designed around one single action." },
        { title: "Follow-up", body: "Automated sequences that recover people who didn't buy right away." },
        { title: "Optimization", body: "We iterate on data until cost per sale drops." },
      ],
      forWho: [
        "High-ticket services and consultative sales",
        "Courses, real estate and healthcare",
        "Businesses already spending on ads without clear control",
      ],
      faq: [
        { q: "Is ad spend included?", a: "No. Media budget is paid directly to the platform and agreed with you." },
        { q: "Which tools do you use?", a: "We adapt to your stack; if you don't have one, we set up something simple and affordable." },
        { q: "How long does it take to build a funnel?", a: "A basic funnel (landing page, simple automation, follow-up) is usually ready in 2 to 4 weeks. Multi-step funnels or complex integrations take longer." },
        { q: "Does this work if I already have a website?", a: "Yes, a funnel almost always lives separately from the main site — a landing page focused on one offer converts better than sending paid traffic to a site full of distractions." },
        { q: "What if the funnel doesn't convert at first?", a: "That's normal — early data is what tells us where leads are dropping off, and that's where we iterate on offer, message or targeting before increasing ad spend." },
      ],
      metaTitle: "Sales Funnel Agency in Guadalajara",
      metaDescription:
        "Full sales funnel design: offer, landing page, automation and follow-up. Lower cost per lead, more closed deals.",
    },
    us: {
      es: {
        name: "Embudos de venta para negocios en EE.UU.",
        tagline: "Del clic al cliente, sin fugas — en dólares.",
        intro:
          "Diseñamos el camino completo: anuncio, landing, oferta, seguimiento automatizado y cierre, para negocios en Estados Unidos. Mismo rigor de medición que una agencia especializada de EE.UU., a un costo nearshore.",
        includes: [
          "Diseño de oferta y propuesta de valor",
          "Landing pages de alta conversión, en inglés o español",
          "Automatizaciones de correo, SMS y WhatsApp",
          "Integración con tu CRM y seguimiento",
          "Pruebas A/B y optimización continua",
          "Tablero con costo por prospecto y por venta, en USD",
        ],
        process: [
          { title: "Oferta", body: "Clarificamos qué vendes, a quién y por qué debería importarle hoy." },
          { title: "Tráfico", body: "Definimos el canal y el mensaje de entrada." },
          { title: "Conversión", body: "Landing, formulario y prueba social diseñados para una sola acción." },
          { title: "Seguimiento", body: "Secuencias automáticas que recuperan a quien no compró de inmediato." },
          { title: "Optimización", body: "Iteramos con datos hasta bajar el costo por venta." },
        ],
        forWho: [
          "Servicios de alto valor y ventas consultivas en EE.UU.",
          "Negocios que ya invierten en anuncios sin control claro del retorno",
          "Marcas que necesitan un embudo bilingüe para audiencia hispana",
        ],
        faq: [
          { q: "¿Cuánto cuesta construir un embudo?", a: "Desde $3,000 hasta $8,000 USD por proyecto completo, contra $6,300-19,000 de una agencia especializada en EE.UU. — mismo resultado medible." },
          { q: "¿Incluye la inversión publicitaria?", a: "No. El presupuesto de anuncios se paga directo a la plataforma (Meta, Google, TikTok) y se define contigo." },
          { q: "¿Cuánto tiempo toma?", a: "Un embudo básico suele estar listo en 2 a 4 semanas. Embudos con múltiples pasos o integraciones complejas toman más." },
          { q: "¿Cómo se paga?", a: "Precio fijo en USD, contrato en inglés, PayPal, transferencia bancaria (wire) o cripto (BTC, USDC, USDT)." },
        ],
        metaTitle: "Agencia de Embudos de Venta para Negocios en EE.UU.",
        metaDescription:
          "Diseño de embudos de venta para negocios en Estados Unidos: oferta, landing, automatización y seguimiento. Precio nearshore en USD.",
      },
      en: {
        name: "Sales funnels for US businesses",
        tagline: "From click to customer, with no leaks — priced in USD.",
        intro:
          "We design the full path: ad, landing page, offer, automated follow-up and close, for US businesses. Same measurement rigor as a specialized US agency, at a nearshore cost.",
        includes: [
          "Offer and value proposition design",
          "High-conversion landing pages, in English or Spanish",
          "Email, SMS and WhatsApp automation",
          "CRM integration and follow-up",
          "A/B testing and continuous optimization",
          "Dashboard with cost per lead and per sale, in USD",
        ],
        process: [
          { title: "Offer", body: "We clarify what you sell, to whom and why it should matter today." },
          { title: "Traffic", body: "We define the channel and the entry message." },
          { title: "Conversion", body: "Landing, form and social proof designed around one single action." },
          { title: "Follow-up", body: "Automated sequences that recover people who didn't buy right away." },
          { title: "Optimization", body: "We iterate on data until cost per sale drops." },
        ],
        forWho: [
          "High-ticket services and consultative sales in the US",
          "Businesses already spending on ads without clear ROI visibility",
          "Brands that need a bilingual funnel for a Hispanic audience",
        ],
        faq: [
          { q: "How much does a funnel cost to build?", a: "$3,000 to $8,000 USD for a full project, against $6,300-19,000 from a specialized US agency — same measurable result." },
          { q: "Is ad spend included?", a: "No. Media budget (Meta, Google, TikTok) is paid directly to the platform and agreed with you." },
          { q: "How long does it take?", a: "A basic funnel is usually ready in 2 to 4 weeks. Multi-step funnels or complex integrations take longer." },
          { q: "How does payment work?", a: "Fixed USD price, English-language contract, PayPal, bank wire, or crypto (BTC, USDC, USDT)." },
        ],
        metaTitle: "Sales Funnel Agency for US Businesses",
        metaDescription:
          "Sales funnel design for US businesses: offer, landing page, automation and follow-up. Nearshore USD pricing.",
      },
    },
  },
  {
    slug: "fotografia",
    number: "06",
    es: {
      name: "Fotografía",
      tagline: "Imagen que sostiene el precio de tu marca.",
      intro:
        "Fotografía de producto, gastronomía, arquitectura, retrato corporativo y campaña. Dirección de arte, iluminación y retoque para que tu marca se vea como lo que cobra.",
      includes: [
        "Dirección de arte y moodboard previo",
        "Producción en estudio o locación",
        "Fotografía de producto, alimentos y espacios",
        "Retrato corporativo y de equipo",
        "Retoque y entrega en formatos para web y redes",
        "Licencia de uso comercial",
      ],
      process: [
        { title: "Concepto", body: "Referencias, paleta y lista de tomas acordadas antes de la sesión." },
        { title: "Producción", body: "Locación, styling y equipo coordinados por nosotros." },
        { title: "Sesión", body: "Un día de rodaje eficiente con revisión en set." },
        { title: "Selección", body: "Galería para que elijas las tomas finales." },
        { title: "Entrega", body: "Retoque profesional y archivos optimizados por canal." },
      ],
      forWho: [
        "Marcas de producto y e-commerce",
        "Restaurantes y hoteles",
        "Empresas que necesitan banco de imagen propio",
      ],
      faq: [
        { q: "¿Viajan fuera de Guadalajara?", a: "Sí. Trabajamos en todo México y en proyectos internacionales cuando el alcance lo justifica." },
        { q: "¿Cuántas fotos entregan?", a: "Depende del proyecto; siempre se define el número de tomas finales retocadas antes de empezar." },
        { q: "¿Cuánto cuesta una sesión de fotos?", a: "Depende del tipo de producto, la cantidad de tomas y si es en estudio o locación. Tenemos una guía con rangos reales para sesiones de producto en Guadalajara en el blog, y cotizamos exacto según tu proyecto." },
        { q: "¿Necesito preparar algo antes de la sesión?", a: "Coordinamos moodboard, lista de tomas y logística (producto limpio, locación lista) contigo antes del día de rodaje, para que la sesión sea eficiente." },
        { q: "¿Puedo usar las fotos en redes y en el sitio web?", a: "Sí, la licencia de uso comercial que entregamos cubre tu sitio, redes sociales y materiales de marca." },
      ],
      metaTitle: "Fotografía profesional en Guadalajara",
      metaDescription:
        "Fotografía de producto, gastronomía, arquitectura y retrato corporativo en Guadalajara. Dirección de arte y retoque profesional.",
    },
    en: {
      name: "Photography",
      tagline: "Imagery that justifies your price.",
      intro:
        "Product, food, architecture, corporate portrait and campaign photography. Art direction, lighting and retouching so your brand looks like what it charges.",
      includes: [
        "Art direction and moodboard up front",
        "Studio or on-location production",
        "Product, food and interiors photography",
        "Corporate and team portraits",
        "Retouching and delivery in web and social formats",
        "Commercial usage license",
      ],
      process: [
        { title: "Concept", body: "References, palette and shot list agreed before the shoot." },
        { title: "Production", body: "Location, styling and crew coordinated by us." },
        { title: "Shoot", body: "An efficient shoot day with on-set review." },
        { title: "Selection", body: "A gallery so you pick the final frames." },
        { title: "Delivery", body: "Professional retouching and channel-optimized files." },
      ],
      forWho: [
        "Product brands and e-commerce",
        "Restaurants and hotels",
        "Companies that need their own image bank",
      ],
      faq: [
        { q: "Do you travel outside Guadalajara?", a: "Yes. We work across Mexico and internationally when the scope justifies it." },
        { q: "How many photos do we get?", a: "It depends on the project; the number of final retouched frames is always agreed up front." },
        { q: "How much does a photo session cost?", a: "It depends on the product type, number of shots and whether it's studio or on location. We publish real Guadalajara pricing ranges for product sessions on the blog, and quote exactly based on your project." },
        { q: "Do I need to prepare anything before the shoot?", a: "We coordinate the moodboard, shot list and logistics (clean product, location ready) with you before shoot day, so the session runs efficiently." },
        { q: "Can I use the photos on social media and my website?", a: "Yes, the commercial usage license we deliver covers your site, social channels and brand materials." },
      ],
      metaTitle: "Professional photography in Guadalajara",
      metaDescription:
        "Product, food, architecture and corporate portrait photography based in Guadalajara, Mexico. Art direction and pro retouching.",
    },
  },
  {
    slug: "videografia",
    number: "07",
    es: {
      name: "Videografía",
      tagline: "Historias que se quedan y venden.",
      intro:
        "Del reel vertical al comercial de marca: guion, producción, edición y color. Video pensado para el canal donde se va a ver y para el objetivo que tiene que cumplir.",
      includes: [
        "Guion y storyboard",
        "Producción y dirección en set",
        "Reels y contenido vertical para redes",
        "Video institucional y de marca",
        "Edición, color, musicalización y subtítulos",
        "Versiones por formato y plataforma",
      ],
      process: [
        { title: "Guion", body: "Definimos el mensaje y el gancho en los primeros tres segundos." },
        { title: "Preproducción", body: "Locaciones, casting, plan de rodaje y equipo." },
        { title: "Rodaje", body: "Producción ágil con equipo cinematográfico." },
        { title: "Postproducción", body: "Edición, corrección de color, audio y gráficos." },
        { title: "Entrega", body: "Cortes por plataforma, con subtítulos y miniaturas." },
      ],
      forWho: [
        "Marcas que lanzan producto o campaña",
        "Empresas que necesitan video institucional",
        "Negocios que quieren volumen constante de reels",
      ],
      faq: [
        { q: "¿Hacen paquetes mensuales de reels?", a: "Sí. Un día de rodaje al mes suele rendir contenido para cuatro a seis semanas." },
        { q: "¿Incluyen locución o actores?", a: "Podemos incluir casting, voz en off y música licenciada dentro del presupuesto de producción." },
        { q: "¿Cuánto cuesta un video corporativo?", a: "Depende de duración, número de locaciones y si hay animación o motion graphics. Publicamos rangos reales para Guadalajara en el blog, y cotizamos exacto según tu guion." },
        { q: "¿Cuánto dura la producción de un video?", a: "Un video institucional típico toma de 2 a 4 semanas de guion a entrega final; reels sueltos pueden estar listos en días." },
        { q: "¿Filman en exteriores o en otras ciudades?", a: "Sí, trabajamos locaciones dentro y fuera de Guadalajara según lo que pida el guion." },
      ],
      metaTitle: "Producción de video y reels en Guadalajara",
      metaDescription:
        "Producción de video de marca, comerciales y reels en Guadalajara. Guion, rodaje, edición y color para México y el extranjero.",
    },
    en: {
      name: "Videography",
      tagline: "Stories that stick and sell.",
      intro:
        "From vertical reels to brand commercials: script, production, edit and color. Video built for the channel it will live on and the goal it has to hit.",
      includes: [
        "Script and storyboard",
        "Production and on-set direction",
        "Reels and vertical social content",
        "Brand and corporate films",
        "Editing, color, sound design and subtitles",
        "Versions per format and platform",
      ],
      process: [
        { title: "Script", body: "We define the message and the hook in the first three seconds." },
        { title: "Pre-production", body: "Locations, casting, shooting plan and crew." },
        { title: "Shoot", body: "Agile production with cinema-grade gear." },
        { title: "Post", body: "Editing, color grading, audio and graphics." },
        { title: "Delivery", body: "Platform cuts with subtitles and thumbnails." },
      ],
      forWho: [
        "Brands launching a product or campaign",
        "Companies that need a corporate film",
        "Businesses that want a steady volume of reels",
      ],
      faq: [
        { q: "Do you offer monthly reel packages?", a: "Yes. One shoot day per month usually yields four to six weeks of content." },
        { q: "Do you include voiceover or talent?", a: "Casting, voiceover and licensed music can all be included in the production budget." },
        { q: "How much does a corporate video cost?", a: "It depends on length, number of locations and whether it needs animation or motion graphics. We publish real Guadalajara pricing ranges on the blog, and quote exactly based on your script." },
        { q: "How long does video production take?", a: "A typical corporate film takes 2 to 4 weeks from script to final delivery; standalone reels can be ready in days." },
        { q: "Do you shoot on location outside Guadalajara?", a: "Yes, we work locations in and outside Guadalajara depending on what the script calls for." },
      ],
      metaTitle: "Video production & reels in Guadalajara",
      metaDescription:
        "Brand video, commercials and reels produced in Guadalajara, Mexico. Script, shoot, edit and color for local and global clients.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
