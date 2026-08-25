import { apiJson } from "@/lib/api-response";

export async function GET() {
  return apiJson({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    version: "0.2.0",
    publisher: { name: "Dizayn", url: "https://dizayn.com.mx", contact: "sebasesc5@gmail.com" },
    skills: [
      {
        name: "answer-service-questions",
        type: "skill-md",
        description:
          "Help someone learn about Dizayn's marketing agency services (web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production) in Guadalajara, Jalisco, Mexico, and connect them to contact the agency.",
        url: "https://dizayn.com.mx/.well-known/agent-skills/answer-service-questions/SKILL.md",
        version: "1.0.0",
      },
    ],
  });
}
