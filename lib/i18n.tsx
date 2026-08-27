"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/content/services";

export type { Lang };

const dict = {
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      portfolio: "Portafolio",
      blog: "Blog",
      about: "Nosotros",
      contact: "Contacto",
      cta: "Cotizar proyecto",
    },
    blog: {
      title: "Blog",
      lead: "Ideas y guías sobre marketing, diseño y posicionamiento en buscadores e IA, escritas por el equipo de Dizayn en Guadalajara.",
      readMore: "Leer artículo",
      back: "Volver al blog",
      published: "Publicado",
      updated: "Actualizado",
      by: "Escrito por el equipo de Dizayn",
      relatedTitle: "Artículos relacionados",
      ctaTitle: "¿Tu marca necesita esto?",
      ctaLead: "Hablemos de tu proyecto y te decimos por dónde empezar.",
    },
    home: {
      eyebrow: "Agencia de marketing · Guadalajara, Jalisco",
      heroAlt: "Producción creativa de Dizayn en Guadalajara",
      h1a: "Marcas que",
      h1b: "se ven",
      h1c: "y se venden.",
      lead:
        "Dizayn es una agencia de marketing en Guadalajara. Diseñamos sitios web, posicionamos marcas en Google y en IA, producimos foto y video, y construimos embudos que convierten. En todo México y donde nos necesites.",
      ctaPrimary: "Empezar un proyecto",
      ctaSecondary: "Ver portafolio",
      statsTitle: "Cómo trabajamos",
      stats: [
        { k: "Estrategia primero", v: "Nada se diseña sin un objetivo de negocio detrás." },
        { k: "Producción propia", v: "Foto, video y diseño internos: sin material de banco." },
        { k: "Medible", v: "Reportes claros de tráfico, prospectos y ventas." },
      ],
      servicesTitle: "Servicios",
      servicesLead: "Siete disciplinas, una sola dirección creativa.",
      servicesAll: "Ver todos los servicios",
      portfolioTitle: "Trabajo reciente",
      portfolioLead:
        "Fotografía, video y diseño producidos por nuestro equipo, directo aquí en el sitio.",
      portfolioCta: "Ver portafolio",
      casesTitle: "Casos de éxito",
      casesLead: "Resultados reales de clientes reales — no capturas de pantalla, casos documentados.",
      casesCta: "Leer caso completo",
      casesAll: "Ver todos los casos de Luvory",
      ctaTitle: "¿Listos para que tu marca se vea distinta?",
      ctaLead: "Cuéntanos qué necesitas y te respondemos con una propuesta clara, sin humo.",
    },
    services: {
      title: "Servicios",
      lead:
        "Cubrimos todo el recorrido: cómo te ven, cómo te encuentran y cómo te compran. Puedes tomar una pieza o el sistema completo.",
      includes: "Qué incluye",
      process: "Cómo lo hacemos",
      forWho: "Para quién es",
      faq: "Preguntas frecuentes",
      other: "Otros servicios",
      back: "Todos los servicios",
      cta: "Cotizar este servicio",
    },
    portfolio: {
      title: "Portafolio",
      lead:
        "Fotografía, video y diseño producidos por nuestro equipo en Guadalajara. Filtra por categoría para ver los proyectos.",
      filterAll: "Todo",
      photo: "Fotografía",
      photoDesc: "Producto, gastronomía, arquitectura, retrato y campaña.",
      video: "Video",
      videoDesc: "Comerciales de marca, reels verticales y piezas institucionales.",
      design: "Diseño",
      designDesc: "Identidad, dirección de arte, empaque y piezas digitales.",
      open: "Ver proyecto",
      igTitle: "Y todos los días en Instagram",
      igLead: "Publicamos trabajo nuevo, detrás de cámaras y resultados de clientes.",
      igCta: "Seguir @dizayn_mx",
    },
    about: {
      title: "Somos Dizayn",
      lead:
        "Un equipo creativo con base en Guadalajara, Jalisco. Empezamos produciendo imagen para marcas y terminamos construyendo todo el sistema que las hace crecer: sitio, posicionamiento, contenido y ventas.",
      p1title: "Desde Guadalajara, para donde haga falta",
      p1:
        "Vivimos y producimos en Guadalajara, conocemos su mercado y a su gente. Trabajamos con clientes en todo México y con marcas fuera del país que necesitan un equipo bilingüe que entienda ambos contextos.",
      p2title: "Diseño con criterio comercial",
      p2:
        "La estética sin estrategia es decoración. Cada decisión de diseño en Dizayn responde a una pregunta simple: ¿esto acerca a la marca a una venta?",
      valuesTitle: "En qué creemos",
      values: [
        { k: "Claridad", v: "Hablamos claro, cobramos claro y reportamos claro." },
        { k: "Oficio", v: "Producción propia, hecha con las manos y con criterio." },
        { k: "Constancia", v: "El crecimiento viene de publicar y optimizar, mes tras mes." },
        { k: "Resultado", v: "Nos mide lo que le pasa a tu negocio, no nuestros premios." },
      ],
      cta: "Trabajemos juntos",
    },
    contact: {
      title: "Hablemos",
      lead:
        "Cuéntanos de tu proyecto. Respondemos el mismo día hábil con próximos pasos y rango de inversión.",
      whatsapp: "Escríbenos por WhatsApp",
      whatsappDesc: "La vía más rápida. Respuesta en horario laboral.",
      emailLabel: "Correo",
      igLabel: "Instagram",
      locationLabel: "Ubicación",
      location: "Guadalajara, Jalisco, México · servicio en todo México y en el extranjero",
      form: {
        name: "Nombre",
        email: "Correo electrónico",
        phone: "Teléfono o WhatsApp (opcional)",
        service: "Servicio de interés",
        servicePlaceholder: "Selecciona un servicio",
        serviceOther: "Otro / varios",
        message: "Cuéntanos de tu proyecto",
        submit: "Enviar mensaje",
        sending: "Enviando…",
        successTitle: "Mensaje enviado",
        success: "Gracias. Te contactamos muy pronto.",
        error: "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.",
      },
    },
    footer: {
      tagline: "Agencia de marketing, diseño y producción audiovisual en Guadalajara, Jalisco.",
      services: "Servicios",
      company: "Agencia",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      privacy: "Aviso de Privacidad",
      terms: "Términos y Condiciones",
    },
    waMessage: "Hola Dizayn, me interesa cotizar un proyecto.",
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      cta: "Start a project",
    },
    blog: {
      title: "Blog",
      lead: "Ideas and guides on marketing, design, and ranking in search and AI, written by the Dizayn team in Guadalajara.",
      readMore: "Read article",
      back: "Back to blog",
      published: "Published",
      updated: "Updated",
      by: "Written by the Dizayn team",
      relatedTitle: "Related articles",
      ctaTitle: "Does your brand need this?",
      ctaLead: "Let's talk about your project and where to start.",
    },
    home: {
      eyebrow: "Marketing agency · Guadalajara, Mexico",
      heroAlt: "Creative production by Dizayn in Guadalajara",
      h1a: "Brands that",
      h1b: "look right",
      h1c: "and sell.",
      lead:
        "Dizayn is a marketing agency based in Guadalajara. We build websites, rank brands on Google and in AI, produce photo and video, and design funnels that convert. Across Mexico and wherever you need us.",
      ctaPrimary: "Start a project",
      ctaSecondary: "See portfolio",
      statsTitle: "How we work",
      stats: [
        { k: "Strategy first", v: "Nothing gets designed without a business goal behind it." },
        { k: "In-house production", v: "Photo, video and design made by us. No stock." },
        { k: "Measurable", v: "Clear reporting on traffic, leads and sales." },
      ],
      servicesTitle: "Services",
      servicesLead: "Seven disciplines, one creative direction.",
      servicesAll: "See all services",
      portfolioTitle: "Recent work",
      portfolioLead: "Photography, video and design produced by our team, right here on the site.",
      portfolioCta: "See portfolio",
      casesTitle: "Success stories",
      casesLead: "Real results from real clients — not screenshots, documented case studies.",
      casesCta: "Read full case",
      casesAll: "See all Luvory cases",
      ctaTitle: "Ready for your brand to look different?",
      ctaLead: "Tell us what you need and we'll come back with a clear proposal, no fluff.",
    },
    services: {
      title: "Services",
      lead:
        "We cover the whole journey: how you look, how you get found and how you get bought. Take one piece or the whole system.",
      includes: "What's included",
      process: "How we do it",
      forWho: "Who it's for",
      faq: "FAQ",
      other: "Other services",
      back: "All services",
      cta: "Get a quote for this",
    },
    portfolio: {
      title: "Portfolio",
      lead:
        "Photography, video and design produced by our team in Guadalajara. Filter by category to browse.",
      filterAll: "All",
      photo: "Photography",
      photoDesc: "Product, food, architecture, portrait and campaign.",
      video: "Video",
      videoDesc: "Brand commercials, vertical reels and corporate films.",
      design: "Design",
      designDesc: "Identity, art direction, packaging and digital pieces.",
      open: "View project",
      igTitle: "And every day on Instagram",
      igLead: "New work, behind the scenes and client results.",
      igCta: "Follow @dizayn_mx",
    },
    about: {
      title: "We are Dizayn",
      lead:
        "A creative team based in Guadalajara, Jalisco. We started producing imagery for brands and ended up building the whole system that grows them: site, visibility, content and sales.",
      p1title: "From Guadalajara, to wherever you are",
      p1:
        "We live and produce in Guadalajara and we know this market. We work with clients across Mexico and with brands abroad that need a bilingual team fluent in both contexts.",
      p2title: "Design with commercial judgment",
      p2:
        "Aesthetics without strategy is decoration. Every design decision at Dizayn answers one question: does this move the brand closer to a sale?",
      valuesTitle: "What we believe",
      values: [
        { k: "Clarity", v: "We speak plainly, price plainly and report plainly." },
        { k: "Craft", v: "In-house production, made by hand and with judgment." },
        { k: "Consistency", v: "Growth comes from publishing and optimizing, month after month." },
        { k: "Results", v: "We're measured by your business, not by our awards." },
      ],
      cta: "Let's work together",
    },
    contact: {
      title: "Let's talk",
      lead: "Tell us about your project. We reply the same business day with next steps and a budget range.",
      whatsapp: "Message us on WhatsApp",
      whatsappDesc: "The fastest route. Replies during business hours.",
      emailLabel: "Email",
      igLabel: "Instagram",
      locationLabel: "Location",
      location: "Guadalajara, Jalisco, Mexico · serving all of Mexico and international clients",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone or WhatsApp (optional)",
        service: "Service of interest",
        servicePlaceholder: "Select a service",
        serviceOther: "Other / several",
        message: "Tell us about your project",
        submit: "Send message",
        sending: "Sending…",
        successTitle: "Message sent",
        success: "Thank you. We'll be in touch shortly.",
        error: "We couldn't send your message. Try again or reach us on WhatsApp.",
      },
    },
    footer: {
      tagline: "Marketing, design and audiovisual production agency in Guadalajara, Mexico.",
      services: "Services",
      company: "Agency",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
    },
    waMessage: "Hi Dizayn, I'd like a quote for a project.",
  },
} as const;

export type Dict = (typeof dict)["es"];

/** Look up dict text for an explicit lang, independent of ambient i18n context — use where the
 * language is determined by the URL (e.g. /en/blog/*) and must not depend on client hydration state. */
export const getDict = (l: Lang): Dict => dict[l] as Dict;

const STORAGE_KEY = "dizayn-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const I18nContext = createContext<Ctx>({ lang: "es", setLang: () => {}, t: dict.es });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dict[lang] as Dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
