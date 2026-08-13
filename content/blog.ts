import type { Lang } from "./services";

export type BlogPostCopy = {
  title: string;
  excerpt: string;
  category: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  faq: { q: string; a: string }[];
};

export type BlogPost = {
  slug: string;
  date: string;
  dateModified: string;
  es: BlogPostCopy;
  en: BlogPostCopy;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "posicionamiento-marcas-ia-2026",
    date: "2026-08-13",
    dateModified: "2026-08-13",
    es: {
      title: "Cómo posicionar tu marca en las respuestas de IA (AI Overviews) en 2026",
      excerpt:
        "Google AI Overviews, Copilot y ChatGPT ya no mandan clics a un link azul: citan un párrafo. Así se escribe una página para que ese párrafo sea el tuyo.",
      category: "SEO e IA",
      metaTitle: "Cómo posicionar tu marca en IA (AI Overviews) 2026",
      metaDescription:
        "Guía práctica para que Google AI Overviews, Copilot y ChatGPT citen tu marca: formato de respuesta directa, datos estructurados y errores comunes.",
      faq: [
        {
          q: "¿Qué son los AI Overviews de Google?",
          a: "Son los resúmenes que Google genera con IA arriba de los resultados normales de búsqueda, respondiendo la pregunta directamente y citando una o varias páginas como fuente. A diferencia de un resultado clásico, el usuario puede quedar satisfecho sin hacer clic — por eso importa más que nunca ser la fuente citada, no solo aparecer en la lista.",
        },
        {
          q: "¿Cómo hago que Google AI Overviews cite mi página?",
          a: "Responde la pregunta en la primera oración del contenido, en texto plano y directo, antes de cualquier introducción de marca. Agrega datos estructurados FAQPage que coincidan exactamente con preguntas y respuestas visibles en la página. Usa tablas para cualquier dato con más de dos variantes numéricas. Ningún truco técnico sustituye responder la pregunta de forma clara y verificable.",
        },
        {
          q: "¿El SEO tradicional ya no sirve?",
          a: "Sí sirve — sigue siendo la base: velocidad, estructura técnica, autoridad de dominio, contenido relevante. Lo que cambió es que ahora hay dos audiencias que satisfacer con el mismo contenido: la persona que lee y el sistema de IA que extrae un pasaje para citar. Escribir solo para una de las dos deja dinero sobre la mesa.",
        },
        {
          q: "¿Cuánto tarda en verse resultados en las respuestas de IA?",
          a: "Varía según qué tan rápido indexen y recrawleen tu dominio los motores — puede ser semanas. Lo que sí es inmediato es la calidad de la señal: una página mal estructurada nunca será citada sin importar cuánto tiempo pase; una bien estructurada empieza a competir en cuanto se indexa.",
        },
      ],
      content: `
## ¿Cómo posiciono mi marca en las respuestas de IA?

Para que Google AI Overviews, Copilot o ChatGPT citen tu marca, tu página necesita **responder la pregunta en la primera oración**, con datos estructurados (schema FAQPage) que coincidan **exactamente** con el texto visible, y suficiente especificidad — números, tablas, hechos verificables — para que el sistema de IA pueda extraer el párrafo directamente.

No es magia ni un truco técnico oculto. Es escribir con la misma disciplina que un buen redactor técnico ya usa, aplicada de forma deliberada en cada página que quieres que compita por una respuesta de IA.

## Por qué esto ya no es opcional

Cuando alguien busca algo en Google y la respuesta aparece arriba en un resumen generado por IA, una parte importante de esas personas **nunca hace clic** — ya tienen su respuesta. Eso significa que tu página puede estar en la posición 1, 2 o 3 de los resultados clásicos y aun así recibir cero visitas, porque el resumen de IA ya resolvió la búsqueda.

La única forma de capturar valor de esa búsqueda es que **tu página sea la fuente citada** dentro de ese resumen — no evitar el resumen, sino ser el párrafo que aparece dentro de él.

## El formato que funciona

En análisis reales de Search Console de proyectos que hemos trabajado, hemos visto casos donde **una sola página, bien estructurada, genera la mayoría de las apariciones en respuestas de IA de todo un sitio** — más que el resto de las páginas combinadas. La diferencia nunca fue el tema: fue la estructura.

### 1. Respuesta directa primero
La primera oración después del título debe contener la respuesta específica, en negritas, antes de cualquier presentación de marca.

- ❌ "Muchas personas se preguntan cuánto cuesta un sitio web. Hay muchos factores a considerar..."
- ✅ "Un sitio corporativo de 5-10 páginas cuesta entre **$18,000 y $45,000 MXN** en Guadalajara, según diseño y contenido."

### 2. Datos estructurados que coinciden con el texto visible
Un schema FAQPage que declara preguntas que no aparecen visibles en la página (o con respuestas distintas) es una señal débil — y en las guías de Google, puede hacer que el resultado enriquecido se descarte. Cada pregunta en el schema debe tener su bloque visible correspondiente, con el mismo texto.

### 3. Tablas para datos comparables
Cualquier dato con más de dos variantes numéricas (precios por tipo de producto, tiempos por alcance de proyecto, cantidades por escenario) se explica mejor en una tabla real que en un párrafo — y es exactamente el formato que los sistemas de IA prefieren extraer para responder preguntas de comparación.

| Elemento | Débil para IA | Fuerte para IA |
|----------|----------------|-----------------|
| Apertura | Introducción de marca | Respuesta directa con datos |
| Datos | Prosa continua | Tabla comparativa |
| Preguntas | Solo en schema | Visibles + en schema, texto idéntico |
| Cifras | Vagas ("depende") | Específicas con rango claro |

## Errores comunes que vemos

- **Schema sin contenido visible que lo respalde** — cinco preguntas en el JSON-LD, tres visibles en la página. Le resta credibilidad al resultado.
- **Enterrar la respuesta bajo tres párrafos de contexto** — para cuando el lector (o el sistema de IA) llega al dato, ya perdió el interés o extrajo el párrafo de un competidor más directo.
- **Hablar en general cuando el negocio es local** — una página que dice "servicio en todo México" cuando en realidad opera en una ciudad diluye la señal exacta que hace que una IA recomiende tu marca para una búsqueda local específica.

## Lo que no cambia

El SEO técnico de base sigue siendo el cimiento: velocidad de carga, estructura semántica correcta, autoridad de dominio, contenido genuinamente útil. Escribir para IA no sustituye eso — se construye encima. Un sitio lento o mal estructurado no va a competir por una cita de IA sin importar qué tan bien redactado esté un párrafo.

¿Quieres que evaluemos cómo está posicionada tu marca hoy en búsquedas normales y en respuestas de IA? [Hablemos de tu proyecto](/contacto) o revisa nuestro servicio de [posicionamiento en IA](/servicios/posicionamiento-ia).
      `,
    },
    en: {
      title: "How to Rank Your Brand in AI Search Answers (AI Overviews) in 2026",
      excerpt:
        "Google AI Overviews, Copilot and ChatGPT no longer send clicks to a blue link — they cite a paragraph. Here's how to write a page so that paragraph is yours.",
      category: "SEO & AI",
      metaTitle: "How to Rank Your Brand in AI Search (AI Overviews) 2026",
      metaDescription:
        "A practical guide to getting cited by Google AI Overviews, Copilot and ChatGPT: direct-answer formatting, structured data, and common mistakes.",
      faq: [
        {
          q: "What are Google AI Overviews?",
          a: "They're the AI-generated summaries Google shows above normal search results, answering the query directly and citing one or more pages as the source. Unlike a classic result, the user can be satisfied without clicking through — which is why being the cited source matters more than just appearing in the list.",
        },
        {
          q: "How do I get Google AI Overviews to cite my page?",
          a: "Answer the question in the first sentence, in plain, direct text, before any brand introduction. Add FAQPage structured data that exactly matches questions and answers actually visible on the page. Use tables for any data with more than two numeric variants. No technical trick replaces answering the question clearly and verifiably.",
        },
        {
          q: "Is traditional SEO no longer relevant?",
          a: "It's still the foundation — speed, technical structure, domain authority, relevant content all still matter. What changed is there are now two audiences to satisfy with the same content: the person reading and the AI system extracting a passage to cite. Writing for only one of them leaves value on the table.",
        },
        {
          q: "How long until I see results in AI answers?",
          a: "It varies with how fast search engines crawl and recrawl your domain — can be weeks. What's immediate is the quality of the signal: a poorly structured page will never get cited no matter how much time passes; a well-structured one starts competing as soon as it's indexed.",
        },
      ],
      content: `
## How do I rank my brand in AI answers?

To get cited by Google AI Overviews, Copilot, or ChatGPT, your page needs to **answer the question in the first sentence**, with structured data (FAQPage schema) that matches the visible text **exactly**, and enough specificity — numbers, tables, verifiable facts — for the AI system to extract the passage directly.

This isn't magic or a hidden technical trick. It's writing with the same discipline a good technical writer already uses, applied deliberately to every page you want competing for an AI-generated answer.

## Why this is no longer optional

When someone searches something on Google and the answer shows up in an AI-generated summary, a meaningful share of those people **never click through** — they already have their answer. That means your page can sit at position 1, 2, or 3 in the classic results and still get zero visits, because the AI summary already resolved the search.

The only way to capture value from that search is for **your page to be the cited source** inside that summary — not avoiding the summary, but being the paragraph that shows up inside it.

## The format that works

In real Search Console analysis on projects we've worked on, we've seen cases where **a single, well-structured page generates the majority of a site's AI-answer appearances** — more than every other page combined. The difference was never the topic. It was the structure.

### 1. Direct answer first
The first sentence after the heading should contain the specific answer, in bold, before any brand introduction.

- ❌ "Many people wonder how much a website costs. There are many factors to consider..."
- ✅ "A 5-10 page corporate site typically costs **$18,000-$45,000 MXN** in Guadalajara, depending on design and content."

### 2. Structured data that matches the visible text
An FAQPage schema declaring questions that don't appear visibly on the page (or with different answers) is a weak signal — and by Google's own guidelines, can get the rich result discarded entirely. Every question in the schema needs a matching visible block, with the same text.

### 3. Tables for comparable data
Any data with more than two numeric variants (prices by product type, timelines by project scope, quantities by scenario) explains better in a real table than in a paragraph — and it's exactly the format AI systems prefer to extract when answering comparison queries.

| Element | Weak for AI | Strong for AI |
|---------|-------------|-----------------|
| Opening | Brand introduction | Direct answer with data |
| Data | Continuous prose | Comparison table |
| Questions | Schema only | Visible + schema, identical text |
| Figures | Vague ("it depends") | Specific with a clear range |

## Common mistakes we see

- **Schema with no visible content backing it up** — five questions in the JSON-LD, three visible on the page. It weakens the result's credibility.
- **Burying the answer under three paragraphs of context** — by the time the reader (or the AI system) reaches the fact, they've already lost interest or extracted a more direct competitor's paragraph.
- **Speaking nationally when the business is local** — a page that says "service across the whole country" when it actually operates in one city dilutes the exact signal that gets an AI to recommend your brand for a specific local search.

## What doesn't change

Core technical SEO is still the foundation: load speed, correct semantic structure, domain authority, genuinely useful content. Writing for AI doesn't replace that — it builds on top of it. A slow or poorly structured site won't compete for an AI citation no matter how well-written a single paragraph is.

Want us to review how your brand ranks today in both normal search and AI answers? [Let's talk about your project](/contacto) or check our [AI search positioning service](/servicios/posicionamiento-ia).
      `,
    },
  },
  {
    slug: "cuanto-cuesta-sitio-web-guadalajara",
    date: "2026-08-13",
    dateModified: "2026-08-13",
    es: {
      title: "¿Cuánto cuesta un sitio web en Guadalajara? Guía de precios 2026",
      excerpt:
        "Desde $8,000 MXN por una landing page hasta $120,000+ por una tienda en línea. Rangos reales por tipo de sitio y qué factores mueven el precio.",
      category: "Sitios web",
      metaTitle: "¿Cuánto cuesta un sitio web en Guadalajara? Precios 2026",
      metaDescription:
        "Rangos de precio reales para sitios web en Guadalajara según tipo: landing page, corporativo, e-commerce y plataformas a medida. Qué mueve el costo.",
      faq: [
        {
          q: "¿Cuánto cuesta un sitio web en Guadalajara?",
          a: "Depende del tipo: una landing page de una sola página cuesta entre $8,000 y $18,000 MXN; un sitio corporativo de 5-10 páginas entre $18,000 y $45,000 MXN; una tienda en línea entre $45,000 y $120,000+ MXN; y una plataforma a medida se cotiza según alcance.",
        },
        {
          q: "¿Por qué hay tanta diferencia de precio entre agencias?",
          a: "La diferencia suele estar en si el diseño es a medida o con plantilla, si incluye SEO técnico y datos estructurados desde el inicio, si el contenido y las fotos son producidos o de banco, y si el precio incluye capacitación para que edites el sitio tú mismo después de la entrega.",
        },
        {
          q: "¿Un sitio barato es mala idea?",
          a: "No necesariamente, pero revisa qué excluye: sitios muy económicos suelen no incluir SEO técnico real, no ser responsivos correctamente en móvil, o depender de una plantilla que no se puede diferenciar de miles de sitios idénticos. Pregunta específicamente qué incluye antes de comparar solo el precio final.",
        },
        {
          q: "¿Cuánto tiempo toma construir un sitio web?",
          a: "Una landing page toma 1-2 semanas. Un sitio corporativo típico de 3 a 6 semanas. Una tienda en línea de 6 a 10 semanas. Los tiempos dependen principalmente de qué tan rápido se aprueba el contenido y las revisiones de diseño, no solo del desarrollo.",
        },
      ],
      content: `
## ¿Cuánto cuesta un sitio web en Guadalajara?

Un sitio web en Guadalajara cuesta entre **$8,000 MXN** (landing page simple) y **$120,000+ MXN** (tienda en línea completa), según el tipo de proyecto. Esta es la referencia rápida — la tabla completa abajo desglosa por tipo de sitio.

## Tabla de precios por tipo de sitio

| Tipo de sitio | Rango de precio | Tiempo típico |
|----------------|-------------------|----------------|
| Landing page (1 página) | $8,000 – $18,000 MXN | 1-2 semanas |
| Sitio corporativo (5-10 páginas) | $18,000 – $45,000 MXN | 3-6 semanas |
| Tienda en línea (e-commerce) | $45,000 – $120,000+ MXN | 6-10 semanas |
| Plataforma o web app a medida | Cotización personalizada | 8+ semanas |

Estos son rangos generales del mercado en Guadalajara para un sitio con diseño a medida — no plantilla — y desarrollo profesional. Pide siempre una cotización con el alcance exacto de tu proyecto.

## Qué mueve el precio dentro de cada rango

### Diseño a medida vs. plantilla
Una plantilla ajustada es más barata pero limita qué tan diferente se ve tu marca frente a la competencia que usa la misma plantilla. El diseño a medida cuesta más porque hay estrategia de mensaje y dirección de arte detrás de cada decisión, no solo acomodar contenido en un molde.

### Número de páginas y complejidad de contenido
Cada página adicional con contenido único (no solo repetir la misma estructura) suma tiempo de redacción, diseño y revisión.

### SEO técnico incluido desde el inicio
Un sitio construido con estructura semántica correcta, datos estructurados y velocidad optimizada desde el día uno cuesta más en desarrollo, pero evita tener que reconstruirlo después para poder posicionar bien.

### Fotografía y video producidos vs. banco de imágenes
Producción propia — sesión de fotos, video de marca — agrega costo pero es lo que hace que un sitio se vea genuinamente distinto en vez de reconocible como "otro sitio con fotos de stock".

### E-commerce: catálogo, pagos, inventario
Una tienda en línea no es solo "un sitio con más páginas" — necesita integración de pagos, gestión de inventario, y frecuentemente lógica de envíos y facturación que un sitio informativo no requiere.

## Señales de que un presupuesto muy bajo va a costarte más después

- No incluye SEO técnico ni datos estructurados — vas a necesitar reconstruirlo para posicionar.
- No es responsivo probado en móvil real, solo "se ve bien en la vista previa".
- Usa una plantilla genérica sin ninguna personalización de dirección de arte.
- No incluye ninguna capacitación — dependes de la misma agencia para cualquier cambio de texto.

Un sitio bien construido se paga solo con el tiempo, porque no necesitas reconstruirlo en 12 meses para que empiece a posicionar de verdad.

¿Quieres una cotización exacta para tu proyecto? [Cuéntanos qué necesitas](/contacto) o revisa el detalle de nuestro servicio de [creación de sitios web](/servicios/sitios-web).
      `,
    },
    en: {
      title: "How Much Does a Website Cost in Guadalajara? 2026 Pricing Guide",
      excerpt:
        "From $8,000 MXN for a landing page to $120,000+ for an online store. Real price ranges by site type and what actually moves the cost.",
      category: "Websites",
      metaTitle: "How Much Does a Website Cost in Guadalajara? 2026",
      metaDescription:
        "Real price ranges for websites in Guadalajara by type: landing page, corporate site, e-commerce and custom platforms. What actually drives the cost.",
      faq: [
        {
          q: "How much does a website cost in Guadalajara?",
          a: "It depends on the type: a single landing page costs $8,000-$18,000 MXN; a 5-10 page corporate site $18,000-$45,000 MXN; an online store $45,000-$120,000+ MXN; and a custom platform is quoted based on scope.",
        },
        {
          q: "Why is there such a big price difference between agencies?",
          a: "The difference usually comes down to whether the design is custom or template-based, whether technical SEO and structured data are included from the start, whether content and photos are produced or stock, and whether the price includes training so you can edit the site yourself after handoff.",
        },
        {
          q: "Is a cheap website a bad idea?",
          a: "Not necessarily, but check what's excluded: very low-cost sites often skip real technical SEO, aren't properly responsive on mobile, or rely on a template that can't be differentiated from thousands of identical sites. Ask specifically what's included before comparing on final price alone.",
        },
        {
          q: "How long does it take to build a website?",
          a: "A landing page takes 1-2 weeks. A typical corporate site takes 3 to 6 weeks. An online store takes 6 to 10 weeks. Timelines mostly depend on how quickly content and design revisions get approved, not just development itself.",
        },
      ],
      content: `
## How much does a website cost in Guadalajara?

A website in Guadalajara costs between **$8,000 MXN** (simple landing page) and **$120,000+ MXN** (full online store), depending on the project type. That's the quick reference — the full table below breaks it down by site type.

## Price table by site type

| Site type | Price range | Typical timeline |
|-----------|-------------|-------------------|
| Landing page (1 page) | $8,000 – $18,000 MXN | 1-2 weeks |
| Corporate site (5-10 pages) | $18,000 – $45,000 MXN | 3-6 weeks |
| Online store (e-commerce) | $45,000 – $120,000+ MXN | 6-10 weeks |
| Custom platform or web app | Custom quote | 8+ weeks |

These are general market ranges in Guadalajara for custom-designed — not template — sites with professional development. Always ask for a quote scoped to your exact project.

## What moves the price within each range

### Custom design vs. template
A well-adjusted template is cheaper but limits how different your brand looks from competitors using the same template. Custom design costs more because there's message strategy and art direction behind every decision, not just fitting content into a mold.

### Page count and content complexity
Every additional page with genuinely unique content (not just repeating the same structure) adds writing, design and review time.

### Technical SEO included from day one
A site built with correct semantic structure, structured data, and optimized speed from day one costs more to develop, but avoids having to rebuild it later to actually rank well.

### Produced photography/video vs. stock images
In-house production — a photo shoot, brand video — adds cost but is what makes a site look genuinely distinct instead of recognizable as "another site with stock photos."

### E-commerce: catalog, payments, inventory
An online store isn't just "a site with more pages" — it needs payment integration, inventory management, and often shipping/invoicing logic an informational site doesn't require.

## Signs a very low quote will cost you more later

- No technical SEO or structured data included — you'll need to rebuild it to rank.
- Not tested responsive on a real phone, just "looks fine in the preview."
- A generic template with zero art-direction customization.
- No training included — you depend on the same agency for any text change.

A well-built site pays for itself over time, because you won't need to rebuild it in 12 months just to start actually ranking.

Want an exact quote for your project? [Tell us what you need](/contacto) or check the details of our [website design service](/servicios/sitios-web).
      `,
    },
  },
  {
    slug: "seo-local-guadalajara-guia",
    date: "2026-08-13",
    dateModified: "2026-08-13",
    es: {
      title: "SEO local en Guadalajara: cómo aparecer primero en Google Maps y búsquedas cercanas",
      excerpt:
        "Perfil de Google Business Profile completo, NAP consistente y contenido que nombre tu colonia, no solo tu ciudad. Los tres pilares del SEO local.",
      category: "SEO local",
      metaTitle: "SEO local en Guadalajara: guía para aparecer primero",
      metaDescription:
        "Cómo posicionar tu negocio en el mapa de Google y en búsquedas cercanas en Guadalajara: Google Business Profile, NAP y contenido local específico.",
      faq: [
        {
          q: "¿Cómo aparezco primero en Google Maps en Guadalajara?",
          a: "Necesitas un perfil de Google Business Profile completo y verificado (categoría correcta, horario, fotos reales), tu nombre-dirección-teléfono (NAP) consistente en todo tu sitio y directorios externos, contenido que mencione tu colonia o municipio específico (no solo 'Guadalajara' genérico), y reseñas reales y recientes.",
        },
        {
          q: "¿Qué es el 'local pack' de Google?",
          a: "Es el bloque de 3 negocios con mapa que aparece arriba de los resultados normales cuando alguien busca algo con intención local ('cerca de mí', o el nombre de una categoría de negocio). Aparecer ahí depende principalmente de tu Google Business Profile, no solo de tu sitio web.",
        },
        {
          q: "¿Por qué mi negocio no aparece aunque tenga Google Business Profile?",
          a: "Las causas más comunes: categoría de negocio incorrecta o demasiado genérica, dirección o radio de servicio mal configurado, pocas o ninguna reseña reciente, o inconsistencias entre el nombre/dirección/teléfono en tu sitio vs. en el perfil de Google.",
        },
        {
          q: "¿Vale la pena decir 'servicio en todo México' si mi negocio es local?",
          a: "Casi nunca. Diluye la señal exacta que hace que Google te muestre para búsquedas locales específicas. Es mejor nombrar con precisión las colonias, municipios o zonas donde realmente operas, y solo mencionar cobertura más amplia si de verdad la ofreces y como algo secundario, no como el mensaje principal.",
        },
      ],
      content: `
## ¿Cómo aparezco primero en búsquedas locales en Guadalajara?

Para aparecer primero en el mapa y en búsquedas cercanas necesitas tres cosas: un **perfil de Google Business Profile completo y verificado**, tu **nombre-dirección-teléfono (NAP) consistente** en todo tu sitio y directorios externos, y **contenido que nombre tu colonia o municipio específico** — no solo "Guadalajara" de forma genérica.

Estos tres pilares valen más que cualquier otro factor de SEO local. Vamos uno por uno.

## Pilar 1: Google Business Profile completo

Un perfil a medio llenar es la causa número uno de que un negocio real, con clientes reales, no aparezca en el mapa. Revisa que tengas:

- **Categoría principal correcta y específica** — no "negocio" genérico, sino la categoría exacta de tu giro
- **Horario actualizado**, incluyendo días festivos
- **Fotos reales del negocio**, no solo el logo
- **Área de servicio bien configurada** si atiendes a domicilio, o dirección exacta si tienes local físico
- **Reseñas recientes** — un perfil con reseñas de hace dos años y ninguna nueva pierde peso frente a competidores con actividad constante

## Pilar 2: NAP consistente (Nombre, Dirección, Teléfono)

Google cruza la información de tu Google Business Profile con lo que encuentra en tu sitio web y en directorios externos (redes sociales, directorios de cámara de comercio, etc.). Si el teléfono en tu sitio es distinto al del perfil, o la dirección está escrita de dos formas diferentes, es una señal de inconsistencia que reduce la confianza del algoritmo.

**Revisa que coincidan exactamente**: nombre del negocio, dirección completa y número telefónico, en tu sitio web, tu perfil de Google, y cualquier directorio donde aparezcas.

## Pilar 3: contenido que nombre tu zona específica, no solo la ciudad

Este es el error más común y el más fácil de arreglar. Un sitio que solo dice "servicio en Guadalajara" — sin nombrar las colonias, municipios cercanos (Zapopan, Tlaquepaque, Tonalá, según tu zona real de operación) o zonas específicas donde realmente trabajas — le da a Google mucho menos con qué asociar tu negocio a una búsqueda local precisa.

| Enfoque | Efecto en SEO local |
|---------|------------------------|
| "Servicio en todo México" | Diluye la señal, compite contra negocios de cobertura genuinamente nacional |
| "Servicio en Guadalajara" | Mejor, pero sigue siendo genérico si tienes competidores directos igual de específicos |
| "Servicio en Providencia, Chapultepec y Zapopan centro" | Señal fuerte y específica — mucho más fácil de asociar a una búsqueda "cerca de mí" en esas zonas exactas |

Nombrar tu zona real de operación no le resta alcance a tu negocio — le da a Google (y a cualquier sistema de IA que resuma resultados locales) el dato concreto que necesita para recomendarte en la búsqueda correcta.

## El error que vemos más seguido

Negocios que, por querer sonar más grandes, escriben "cobertura nacional" como mensaje principal cuando en realidad operan en una sola ciudad o zona. El resultado es casi siempre el opuesto al buscado: en vez de parecer más grandes, se vuelven invisibles para las búsquedas locales específicas que sí podrían convertir en clientes reales, sin ganar tráfico genuino de otras partes del país.

¿Quieres que revisemos cómo está tu negocio posicionado hoy en búsquedas locales? [Hablemos de tu proyecto](/contacto) o conoce el detalle de nuestro servicio de [SEO](/servicios/seo).
      `,
    },
    en: {
      title: "Local SEO in Guadalajara: How to Rank First on Google Maps and Nearby Searches",
      excerpt:
        "A complete Google Business Profile, consistent NAP, and content that names your specific neighborhood — not just your city. The three pillars of local SEO.",
      category: "Local SEO",
      metaTitle: "Local SEO in Guadalajara: A Guide to Ranking First",
      metaDescription:
        "How to rank your business on Google Maps and nearby searches in Guadalajara: Google Business Profile, NAP consistency, and specific local content.",
      faq: [
        {
          q: "How do I rank first on Google Maps in Guadalajara?",
          a: "You need a complete, verified Google Business Profile (correct category, hours, real photos), consistent name-address-phone (NAP) across your site and external directories, content that names your specific neighborhood or municipality (not just generic 'Guadalajara'), and real, recent reviews.",
        },
        {
          q: "What is Google's 'local pack'?",
          a: "It's the 3-business block with a map that appears above normal results when someone searches with local intent ('near me', or a business category name). Ranking there depends mainly on your Google Business Profile, not just your website.",
        },
        {
          q: "Why doesn't my business show up even though I have a Google Business Profile?",
          a: "The most common causes: an incorrect or too-generic business category, a misconfigured address or service radius, few or no recent reviews, or inconsistencies between the name/address/phone on your site vs. your Google profile.",
        },
        {
          q: "Is it worth saying 'nationwide service' if my business is local?",
          a: "Almost never. It dilutes the exact signal that gets Google to show you for specific local searches. It's better to precisely name the neighborhoods, municipalities or zones you actually operate in, and only mention broader coverage — if genuinely true — as a secondary note, not the main message.",
        },
      ],
      content: `
## How do I rank first in local searches in Guadalajara?

To rank first on the map and in nearby searches you need three things: a **complete, verified Google Business Profile**, a **consistent name-address-phone (NAP)** across your site and external directories, and **content that names your specific neighborhood or municipality** — not just "Guadalajara" generically.

These three pillars outweigh any other local SEO factor. Let's go one by one.

## Pillar 1: A complete Google Business Profile

A half-filled profile is the number one reason a real business, with real customers, doesn't show up on the map. Check that you have:

- **The correct, specific primary category** — not a generic "business," the exact category for what you do
- **Up-to-date hours**, including holidays
- **Real photos of the business**, not just the logo
- **A properly configured service area** if you serve customers at their location, or an exact address if you have a physical storefront
- **Recent reviews** — a profile with reviews from two years ago and nothing new loses ground against competitors with steady activity

## Pillar 2: Consistent NAP (Name, Address, Phone)

Google cross-references your Google Business Profile against what it finds on your website and in external directories (social media, chamber of commerce listings, etc.). If the phone number on your site doesn't match your profile, or your address is written two different ways, that's an inconsistency signal that reduces the algorithm's confidence.

**Check that these match exactly**: business name, full address, and phone number, on your website, your Google profile, and any directory listing you.

## Pillar 3: Content that names your specific area, not just the city

This is the most common mistake and the easiest to fix. A site that only says "service in Guadalajara" — without naming the neighborhoods, nearby municipalities (Zapopan, Tlaquepaque, Tonalá, depending on your real service area) or specific zones you actually work in — gives Google a lot less to associate your business with a precise local search.

| Approach | Effect on local SEO |
|----------|----------------------|
| "Service across Mexico" | Dilutes the signal, competes against businesses with genuinely national coverage |
| "Service in Guadalajara" | Better, but still generic if direct competitors are equally specific |
| "Service in Providencia, Chapultepec and central Zapopan" | Strong, specific signal — much easier to match to a "near me" search in those exact areas |

Naming your real service area doesn't shrink your business's reach — it gives Google (and any AI system summarizing local results) the concrete fact it needs to recommend you for the right search.

## The mistake we see most often

Businesses that, wanting to sound bigger, write "nationwide coverage" as their main message when they actually operate in a single city or zone. The result is almost always the opposite of what was intended: instead of looking bigger, they become invisible to the specific local searches that could actually convert into real customers, without gaining genuine traffic from the rest of the country.

Want us to review how your business ranks in local search today? [Let's talk about your project](/contacto) or check the details of our [SEO service](/servicios/seo).
      `,
    },
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const postCopy = (post: BlogPost, lang: Lang) => post[lang];
