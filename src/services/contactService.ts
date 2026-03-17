<<<<<<< HEAD
=======
import { supabase } from "@/lib/supabase";

>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
export type ContactMessageInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
<<<<<<< HEAD
  honeypot?: string;
  captchaToken?: string;
=======
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
};

export type ContactSubmissionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactMessage(
  data: ContactMessageInput,
): Promise<ContactSubmissionResult> {
<<<<<<< HEAD
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { success: false, error: "Missing Supabase environment variables." };
  }

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
  } catch {
    payload = null;
  }

  if (response.status === 429) {
    return { success: false, error: "Too many requests. Please wait and try again." };
  }

  if (!response.ok || !payload?.success) {
    return {
      success: false,
      error: payload?.error || "Message not sent. Please try again later.",
    };
=======
  const { error } = await supabase.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (error) {
    return { success: false, error: error.message };
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
  }

  return { success: true };
}
