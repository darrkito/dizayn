// WebMCP (https://webmachinelearning.github.io/webmcp/) — experimental browser API,
// not shipped in any stable browser yet. Feature-detected: no-ops everywhere today.
// Uses navigator.modelContext.provideContext(), the API that's actually detected by
// real scanners (Chrome 146+) — NOT the newer document.modelContext.registerTool()
// spec draft, which a real re-scan confirmed doesn't register as "found" yet.
// See ~/agent-readiness-playbook.md §8.

import { waLink, CONTACT } from "@/content/contact";

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (context: { tools: WebMcpTool[] }) => void;
    };
  }
}

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<{ content: { type: string; text: string }[] }>;
}

export function registerWebMcpTools() {
  if (typeof navigator === "undefined" || !navigator.modelContext) return;

  navigator.modelContext.provideContext({
    tools: [
      {
        name: "contactDizayn",
        description:
          "Open a pre-filled WhatsApp conversation with Dizayn, a marketing agency in Guadalajara, Jalisco, Mexico, to ask about web design, SEO, GEO/AI visibility, social media, sales funnels, photography, or video production services.",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string", description: "What the user wants to ask about" },
          },
        },
        execute: async (input) => {
          const message = typeof input["message"] === "string" ? input["message"] : "Hola, quiero más información sobre sus servicios.";
          const url = waLink(message);
          window.open(url, "_blank", "noopener,noreferrer");
          return { content: [{ type: "text", text: `Opened WhatsApp contact: ${url} (also reachable at ${CONTACT.email})` }] };
        },
      },
    ],
  });
}
