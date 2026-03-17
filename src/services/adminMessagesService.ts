import { supabaseClient } from "@/lib/supabaseClient";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

<<<<<<< HEAD
export const ADMIN_MESSAGES_PAGE_SIZE = 5;

export type ContactMessagesPage = {
  messages: ContactMessage[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function getContactMessagesPage(
  page = 1,
  pageSize = ADMIN_MESSAGES_PAGE_SIZE,
): Promise<ContactMessagesPage> {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  const safePageSize = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : ADMIN_MESSAGES_PAGE_SIZE;
  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  const { data, count, error } = await supabaseClient
    .from("contact_messages")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    messages: (data ?? []) as ContactMessage[],
    totalCount: count ?? 0,
    page: safePage,
    pageSize: safePageSize,
  };
=======
export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabaseClient
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as ContactMessage[];
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
}

export async function deleteContactMessage(messageId: string): Promise<void> {
  const { error } = await supabaseClient.from("contact_messages").delete().eq("id", messageId);
  if (error) throw new Error(error.message);
}
