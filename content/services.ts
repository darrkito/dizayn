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
};

export const services: Service[] = [
  {
    slug: "sitios-web",
    number: "01",
    es: {
      name: "Creación de sitios web",
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
        { q: "¿Cuánto tarda un sitio?", a: "Un sitio corporativo típico toma de 3 a 6 semanas, dependiendo de contenido y aprobaciones." },
        { q: "¿Puedo editarlo yo?", a: "Sí. Entregamos el sitio con capacitación y documentación para que tu equipo actualice contenido sin depender de nosotros." },
      ],
      metaTitle: "Creación de sitios web en Guadalajara",
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
        { q: "How long does a site take?", a: "A typical corporate site takes 3 to 6 weeks depending on content and approvals." },
        { q: "Can I edit it myself?", a: "Yes. We hand over with training and documentation so your team updates content without us." },
      ],
      metaTitle: "Web design & development in Guadalajara",
      metaDescription:
        "Custom website design and development from Guadalajara, Mexico: fast, SEO-ready and built to convert visitors into customers.",
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
        { q: "¿En cuánto tiempo veo resultados?", a: "Las mejoras técnicas y locales suelen notarse en 4 a 8 semanas; el crecimiento sostenido toma de 3 a 6 meses." },
        { q: "¿Garantizan el primer lugar?", a: "Nadie puede garantizarlo honestamente. Garantizamos trabajo medible y reportes claros de lo que sí se mueve." },
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
        { q: "How fast will I see results?", a: "Technical and local wins usually show in 4 to 8 weeks; compounding growth takes 3 to 6 months." },
        { q: "Do you guarantee position one?", a: "Nobody honestly can. We guarantee measurable work and clear reporting on what actually moves." },
      ],
      metaTitle: "SEO agency in Guadalajara, Mexico",
      metaDescription:
        "Technical, local and content SEO for businesses in Mexico and abroad. More qualified traffic, more leads, transparent reporting.",
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
      ],
      metaTitle: "GEO Agency in Guadalajara (AI Search Visibility)",
      metaDescription:
        "GEO agency in Mexico: make ChatGPT, Perplexity and Gemini recommend your brand. AI search visibility strategy for businesses in Mexico and worldwide.",
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
        { q: "¿Incluye la producción de contenido?", a: "Sí. Fotografía y video están incluidos en los planes mensuales; no dependes de material de banco." },
        { q: "¿Manejan pauta?", a: "Sí, gestionamos campañas en Meta y TikTok con presupuesto aparte del fee." },
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
        { q: "Is content production included?", a: "Yes. Photo and video are part of the monthly plans, so you never rely on stock." },
        { q: "Do you run ads?", a: "Yes, we manage Meta and TikTok campaigns with ad spend billed separately." },
      ],
      metaTitle: "Social Media Management Agency in Guadalajara",
      metaDescription:
        "Content strategy, production and community management for brands in Mexico and abroad. Social channels that actually generate sales.",
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
      ],
      metaTitle: "Embudos de venta y landing pages que convierten",
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
      ],
      metaTitle: "Sales funnels & landing pages that convert",
      metaDescription:
        "Full sales funnel design: offer, landing page, automation and follow-up. Lower cost per lead, more closed deals.",
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
      ],
      metaTitle: "Video production & reels in Guadalajara",
      metaDescription:
        "Brand video, commercials and reels produced in Guadalajara, Mexico. Script, shoot, edit and color for local and global clients.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
