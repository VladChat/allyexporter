import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const expectedSupabaseUrl = "https://lwlbjrwvijgndidqxcqp.supabase.co";

const normalizeUrl = (value: string) => value.replace(/\/+$/, "");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

if (normalizeUrl(supabaseUrl) !== normalizeUrl(expectedSupabaseUrl)) {
  throw new Error(`VITE_SUPABASE_URL must be ${expectedSupabaseUrl}.`);
}

export const ADMIN_EMAIL = "allyexporter@gmail.com";

export const isAllowedAdminEmail = (email?: string | null) =>
  (email ?? "").trim().toLowerCase() === ADMIN_EMAIL;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
