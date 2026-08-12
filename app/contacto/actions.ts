"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().max(80).optional(),
  message: z.string().trim().min(1).max(3000),
  lang: z.enum(["es", "en"]),
});

export type ContactResult =
  | { status: "sent" }
  | { status: "validation-error"; errors: Record<string, string> }
  | { status: "submit-error" };

export async function submitContact(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  lang: "es" | "en";
}): Promise<ContactResult> {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] = issue.message;
    return { status: "validation-error", errors };
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    service: parsed.data.service || null,
    message: parsed.data.message,
    lang: parsed.data.lang,
    source: "contacto",
  });

  if (error) return { status: "submit-error" };
  return { status: "sent" };
}
