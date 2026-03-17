<<<<<<< HEAD
/**
 * Deprecated.
 *
 * Contact message submissions no longer insert directly into Supabase REST
 * from the browser. Submissions now go through the server-side
 * `contact-submit` function.
 */


=======
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

type SupabaseError = { message: string };

type InsertResponse = {
  error: SupabaseError | null;
};

export const supabase = {
  from(table: string) {
    return {
      async insert(values: Record<string, string>): Promise<InsertResponse> {
        const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
          method: "POST",
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorText = await response.text();
          return {
            error: {
              message: errorText || "Supabase request failed.",
            },
          };
        }

        return { error: null };
      },
    };
  },
};
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
