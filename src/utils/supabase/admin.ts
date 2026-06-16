import { createClient } from "@supabase/supabase-js"
import { supabaseConfig } from "./config"

export async function createClientAdmin() {
  return createClient(supabaseConfig.url, supabaseConfig.admin, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}