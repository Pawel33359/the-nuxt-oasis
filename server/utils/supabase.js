import { createClient } from "@supabase/supabase-js";

function createSupabaseClient() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NUXT_SUPABASE_URL || "";
  const supabaseKey =
    process.env.SUPABASE_KEY || process.env.NUXT_SUPABASE_KEY || "";

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and key must be configured");
  }

  return createClient(supabaseUrl, supabaseKey);
}

export const supabase = createSupabaseClient();
