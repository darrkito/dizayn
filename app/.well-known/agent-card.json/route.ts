import { services } from "@/content/services";
import { apiJson, SITE_URL } from "@/lib/api-response";

export async function GET() {
  return apiJson({
    name: "Dizayn Assistant",
    description:
      "Answers questions about Dizayn's marketing agency services (web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production) in Guadalajara, Jalisco, Mexico, and helps connect the user to contact the agency.",
    url: `${SITE_URL}/a2a`,
    version: "1.0.0",
    provider: { name: "Dizayn", url: SITE_URL },
    capabilities: { streaming: false, pushNotifications: false },
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["text/plain"],
    skills: [
      {
        id: "answer-questions",
        name: "Answer questions",
        description: "Answer questions about services and what's included.",
        tags: ["services", "faq"],
        examples: services.slice(0, 2).map((s) => `What does ${s.en.name} include?`),
      },
      {
        id: "contact",
        name: "Contact Dizayn",
        description: "Provide a WhatsApp/email link to contact the agency.",
        tags: ["contact"],
        examples: ["How do I get in touch with Dizayn?"],
      },
    ],
  });
}
