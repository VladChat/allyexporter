import { supabase } from "@/lib/supabase";

export type ContactMessageInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactSubmissionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactMessage(
  data: ContactMessageInput,
): Promise<ContactSubmissionResult> {
  const { error } = await supabase.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
