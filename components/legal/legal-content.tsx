"use client";

import { useEffect } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/content/contact";

type Doc = "privacy" | "terms";

const content: Record<Doc, Record<Lang, { title: string; updated: string; sections: { title: string; body: string }[] }>> = {
  privacy: {
    es: {
      title: "Aviso de Privacidad",
      updated: "Última actualización: 27 de agosto de 2026",
      sections: [
        {
          title: "1. Responsable del tratamiento de datos",
          body: `Dizayn (nombre comercial) es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Dizayn opera actualmente como actividad independiente de su fundador en Guadalajara, Jalisco, México, en proceso de formalización ante el SAT — aún no cuenta con razón social ni RFC registrados de forma separada.`,
        },
        {
          title: "2. Datos que recabamos",
          body: "Recabamos los datos que nos proporcionas directamente al solicitar una cotización a través de nuestro formulario de contacto: nombre, correo electrónico, teléfono y el servicio de tu interés.",
        },
        {
          title: "3. Finalidad del tratamiento",
          body: "Usamos tus datos para: responder tu solicitud de cotización, coordinar tu proyecto y darte seguimiento comercial. No vendemos ni compartimos tus datos con terceros ajenos a la operación del servicio.",
        },
        {
          title: "4. Uso de cookies y tecnologías de rastreo",
          body: "Este sitio utiliza Microsoft Clarity para entender cómo se usa el sitio y mejorar la experiencia. Esta herramienta puede usar cookies o identificadores similares. Puedes deshabilitar las cookies desde la configuración de tu navegador.",
        },
        {
          title: "5. Derechos ARCO",
          body: `Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (ARCO) al tratamiento de tus datos personales. Para ejercer estos derechos, contáctanos en ${CONTACT.email} o al ${CONTACT.whatsappDisplay}.`,
        },
        {
          title: "6. Cambios a este aviso",
          body: "Podemos actualizar este aviso de privacidad periódicamente. Cualquier cambio se publicará en esta misma página con su fecha de actualización correspondiente.",
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated: August 27, 2026",
      sections: [
        {
          title: "1. Data controller",
          body: `Dizayn (trade name) is responsible for processing your personal data in accordance with Mexico's Federal Law on Protection of Personal Data Held by Private Parties. Dizayn currently operates as its founder's independent activity in Guadalajara, Jalisco, Mexico, in the process of formalizing with Mexico's tax authority (SAT) — it does not yet have a separately registered legal business name or tax ID.`,
        },
        {
          title: "2. Data we collect",
          body: "We collect the data you provide directly when requesting a quote through our contact form: name, email, phone, and the service you're interested in.",
        },
        {
          title: "3. Purpose of processing",
          body: "We use your data to: respond to your quote request, coordinate your project, and follow up commercially. We do not sell or share your data with third parties outside the service operation.",
        },
        {
          title: "4. Cookies and tracking technologies",
          body: "This site uses Microsoft Clarity to understand how the site is used and improve the experience. This tool may use cookies or similar identifiers. You can disable cookies from your browser settings.",
        },
        {
          title: "5. Your rights",
          body: `You have the right to access, correct, cancel, or object to the processing of your personal data. To exercise these rights, contact us at ${CONTACT.email} or ${CONTACT.whatsappDisplay}.`,
        },
        {
          title: "6. Changes to this policy",
          body: "We may update this privacy policy periodically. Any changes will be posted on this same page with the corresponding update date.",
        },
      ],
    },
  },
  terms: {
    es: {
      title: "Términos y Condiciones",
      updated: "Última actualización: 27 de agosto de 2026",
      sections: [
        {
          title: "1. Objeto",
          body: "Estos términos y condiciones regulan los servicios de estrategia, diseño, desarrollo web, SEO/posicionamiento en IA, redes sociales, embudos de venta, fotografía y video que ofrece Dizayn desde Guadalajara, Jalisco, para clientes en México y el mundo.",
        },
        {
          title: "2. Cotizaciones y contratación",
          body: "Las cotizaciones enviadas por WhatsApp o formulario no constituyen un proyecto confirmado. El proyecto se confirma únicamente tras el acuerdo mutuo de alcance, entregables, precio y, en su caso, el anticipo correspondiente.",
        },
        {
          title: "3. Entregables y tiempos",
          body: "Los tiempos de entrega se acuerdan por proyecto según su alcance. Retrasos causados por falta de información, materiales o retroalimentación del cliente pueden extender el calendario acordado.",
        },
        {
          title: "4. Cancelaciones",
          body: "Las condiciones de cancelación y reembolso se acuerdan de forma particular en cada proyecto, considerando el avance del trabajo ya realizado al momento de la cancelación.",
        },
        {
          title: "5. Propiedad y uso del trabajo",
          body: "Los entregables finales (sitio, diseños, contenido) se transfieren al cliente conforme a lo acordado en cada proyecto tras el pago completo. Dizayn conserva el derecho de mostrar el trabajo en su portafolio salvo acuerdo expreso en contrario.",
        },
        {
          title: "6. Limitación de responsabilidad",
          body: "Dizayn no será responsable por resultados de negocio (tráfico, ventas, posicionamiento) que dependan de factores fuera de nuestro control, como cambios en algoritmos de terceros o decisiones del cliente ajenas al proyecto acordado.",
        },
        {
          title: "7. Contacto",
          body: `Para dudas sobre estos términos, contáctanos en ${CONTACT.email} o al ${CONTACT.whatsappDisplay}.`,
        },
      ],
    },
    en: {
      title: "Terms & Conditions",
      updated: "Last updated: August 27, 2026",
      sections: [
        {
          title: "1. Purpose",
          body: "These terms and conditions govern the strategy, design, web development, SEO/AI visibility, social media, sales funnel, photography, and video services Dizayn offers from Guadalajara, Jalisco, for clients in Mexico and worldwide.",
        },
        {
          title: "2. Quotes and engagement",
          body: "Quotes sent via WhatsApp or our contact form do not constitute a confirmed project. A project is confirmed only after mutual agreement on scope, deliverables, price, and, where applicable, the corresponding deposit.",
        },
        {
          title: "3. Deliverables and timelines",
          body: "Delivery timelines are agreed per project based on scope. Delays caused by missing information, materials, or client feedback may extend the agreed schedule.",
        },
        {
          title: "4. Cancellations",
          body: "Cancellation and refund terms are agreed individually per project, taking into account work already completed at the time of cancellation.",
        },
        {
          title: "5. Ownership and use of work",
          body: "Final deliverables (site, designs, content) transfer to the client as agreed per project after full payment. Dizayn retains the right to display the work in its portfolio unless otherwise expressly agreed.",
        },
        {
          title: "6. Limitation of liability",
          body: "Dizayn is not responsible for business outcomes (traffic, sales, rankings) that depend on factors outside our control, such as changes to third-party algorithms or client decisions outside the agreed project.",
        },
        {
          title: "7. Contact",
          body: `For questions about these terms, contact us at ${CONTACT.email} or ${CONTACT.whatsappDisplay}.`,
        },
      ],
    },
  },
};

export function LegalContent({ doc, lang }: { doc: Doc; lang: Lang }) {
  const { setLang } = useI18n();
  const t = content[doc][lang];

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div className="container-x py-24">
      <h1 className="max-w-3xl text-[clamp(2rem,6vw,3.5rem)] leading-[1.02]">{t.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">{t.updated}</p>

      <div className="mt-12 flex max-w-[70ch] flex-col gap-8">
        {t.sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-xl text-primary">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
