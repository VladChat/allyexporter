export type ContactMessageInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
  captchaToken?: string;
};

export type ContactSubmissionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactMessage(
  data: ContactMessageInput,
): Promise<ContactSubmissionResult> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Contact form: Missing Supabase environment variables");
    return { success: false, error: "Configuration error: Supabase credentials not set." };
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/contact-submit`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        website: data.honeypot ?? "",
        captchaToken: data.captchaToken,
      }),
    });

    let payload: { success?: boolean; error?: string } | null = null;
    try {
      payload = (await response.json()) as { success?: boolean; error?: string };
    } catch (parseError) {
      console.error("Contact form: Failed to parse response:", parseError);
      return { success: false, error: `Invalid response from server: ${parseError instanceof Error ? parseError.message : String(parseError)}` };
    }

    console.log("Contact form response:", { status: response.status, payload });

    if (response.status === 429) {
      return { success: false, error: "Too many requests. Please wait and try again." };
    }

    if (!response.ok) {
      const errorMsg = payload?.error || `Request failed with status ${response.status}`;
      console.error("Contact form error:", errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!payload?.success) {
      const errorMsg = payload?.error || "Unknown error occurred";
      console.error("Contact form error:", errorMsg);
      return { success: false, error: errorMsg };
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Network error occurred" 
    };
  }
}
