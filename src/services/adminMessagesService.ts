import { supabaseClient } from "@/lib/supabaseClient";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabaseClient
    .from("contact_messages")
    .select("id, name, email, subject, message, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ContactMessage[];
}

export async function deleteContactMessage(messageId: string): Promise<void> {
  const { error } = await supabaseClient.from("contact_messages").delete().eq("id", messageId);
  if (error) throw new Error(error.message);
}
