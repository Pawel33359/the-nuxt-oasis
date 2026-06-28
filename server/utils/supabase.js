import { createClient } from "@supabase/supabase-js";

function createSupabaseClient() {
  const config = useRuntimeConfig();
  const supabaseUrl = config.supabaseUrl;
  const supabaseKey = config.supabaseKey;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and key must be configured");
  }

  return createClient(supabaseUrl, supabaseKey);
}

export const supabase = createSupabaseClient();
