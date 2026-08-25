import { services } from "@/content/services";
import { apiJson, SITE_URL } from "@/lib/api-response";

export async function GET() {
  const a2aUrl = `${SITE_URL}/a2a`;
  return apiJson({
    protocolVersion: "0.3.0",
    name: "Dizayn Assistant",
    description:
      "Answers questions in English or Spanish about Dizayn's marketing agency services (web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production) in Guadalajara, Jalisco, Mexico, and helps connect the user to contact the agency.",
    url: a2aUrl,
    preferredTransport: "JSONRPC",
    supportedInterfaces: [{ url: a2aUrl, transport: "JSONRPC" }],
    version: "1.0.0",
    documentationUrl: `${SITE_URL}/llms.txt`,
    provider: { organization: "Dizayn", url: SITE_URL },
    capabilities: { streaming: false, pushNotifications: false, stateTransitionHistory: false },
    securitySchemes: {},
    security: [],
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["text/plain", "application/json"],
    skills: [
      {
        id: "answer-questions",
        name: "Answer questions",
        description: "Answer questions about services and what's included.",
        tags: ["services", "faq"],
        examples: services.slice(0, 2).flatMap((s) => [`What does ${s.en.name} include?`, `¿Qué incluye ${s.es.name}?`]),
        inputModes: ["text/plain"],
        outputModes: ["text/plain", "application/json"],
      },
      {
        id: "case-studies",
        name: "Share case studies",
        description: "Point to real, documented client work — e.g. website, SEO, GEO, AI agent infrastructure and social media done for Luvory Luxury Toilets.",
        tags: ["portfolio", "case-studies", "clients"],
        examples: ["Do you have case studies?", "¿Tienen casos de éxito reales?"],
        inputModes: ["text/plain"],
        outputModes: ["text/plain", "application/json"],
      },
      {
        id: "contact",
        name: "Contact Dizayn",
        description: "Provide a WhatsApp/email link to contact the agency.",
        tags: ["contact"],
        examples: ["How do I get in touch with Dizayn?", "¿Cómo contacto a Dizayn?"],
        inputModes: ["text/plain"],
        outputModes: ["text/plain", "application/json"],
      },
    ],
    supportsAuthenticatedExtendedCard: false,
  });
}
