import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export function getSupabaseServerClient() {
  const SUPABASE_URL = process.env["SUPABASE_URL"] ?? process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const SUPABASE_PUBLISHABLE_KEY =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"];

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error(
      "Missing Supabase environment variables (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY).",
    );
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
