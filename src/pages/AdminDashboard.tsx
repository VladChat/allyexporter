import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { company } from "@/config/company";
<<<<<<< HEAD
import {
  ADMIN_MESSAGES_PAGE_SIZE,
  deleteContactMessage,
  getContactMessagesPage,
  type ContactMessage,
} from "@/services/adminMessagesService";
=======
import { deleteContactMessage, getContactMessages, type ContactMessage } from "@/services/adminMessagesService";
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
import {
  fallbackSiteSettings,
  getLatestSiteSettingsRecord,
  upsertSiteSettings,
  type SiteSettingsUpdateInput,
} from "@/services/siteSettingsService";
import { supabaseClient } from "@/lib/supabaseClient";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
<<<<<<< HEAD
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesTotalCount, setMessagesTotalCount] = useState(0);
=======
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState<string>("");
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);

  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [settingsForm, setSettingsForm] = useState<SiteSettingsUpdateInput>(fallbackSiteSettings);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsStatus, setSettingsStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [settingsError, setSettingsError] = useState<string>("");

<<<<<<< HEAD
  const loadMessages = async (targetPage = 1) => {
    setMessagesLoading(true);
    setMessagesError("");
    try {
      const pageData = await getContactMessagesPage(targetPage, ADMIN_MESSAGES_PAGE_SIZE);
      setMessages(pageData.messages);
      setMessagesTotalCount(pageData.totalCount);
      setMessagesPage(pageData.page);
=======
  const loadMessages = async () => {
    setMessagesLoading(true);
    setMessagesError("");
    try {
      const data = await getContactMessages();
      setMessages(data);
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
    } catch (error) {
      setMessagesError(error instanceof Error ? error.message : "Failed to load messages.");
    } finally {
      setMessagesLoading(false);
    }
  };

  const loadSettings = async () => {
    setSettingsLoading(true);
    setSettingsError("");
    try {
      const record = await getLatestSiteSettingsRecord();
      if (!record) {
        setSettingsId(null);
        setSettingsForm(fallbackSiteSettings);
        return;
      }

      setSettingsId(record.id);
      setSettingsForm({
        phone: record.phone,
        email: record.email,
        address: record.address,
      });
    } catch (error) {
      setSettingsError(error instanceof Error ? error.message : "Failed to load settings.");
    } finally {
      setSettingsLoading(false);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    void loadMessages(1);
=======
    void loadMessages();
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
    void loadSettings();
  }, []);

  const handleDeleteMessage = async (messageId: string) => {
    setDeletingMessageId(messageId);
    setMessagesError("");

    try {
      await deleteContactMessage(messageId);
<<<<<<< HEAD
      const nextTotalCount = Math.max(messagesTotalCount - 1, 0);
      const nextTotalPages = Math.max(1, Math.ceil(nextTotalCount / ADMIN_MESSAGES_PAGE_SIZE));
      const nextPage = Math.min(messagesPage, nextTotalPages);
      await loadMessages(nextPage);
=======
      setMessages((prev) => prev.filter((item) => item.id !== messageId));
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
    } catch (error) {
      setMessagesError(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setDeletingMessageId(null);
    }
  };

<<<<<<< HEAD
  const totalPages = Math.max(1, Math.ceil(messagesTotalCount / ADMIN_MESSAGES_PAGE_SIZE));
  const canGoPrevious = messagesPage > 1 && !messagesLoading;
  const canGoNext = messagesPage < totalPages && !messagesLoading;

=======
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
  const handleSettingsSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSettingsStatus("saving");
    setSettingsError("");

    try {
      const record = await upsertSiteSettings(
        {
          phone: settingsForm.phone.trim(),
          email: settingsForm.email.trim(),
          address: settingsForm.address.trim(),
        },
        settingsId,
      );

      setSettingsId(record.id);
      setSettingsForm({
        phone: record.phone,
        email: record.email,
        address: record.address,
      });
      setSettingsStatus("success");
    } catch (error) {
      setSettingsStatus("error");
      setSettingsError(error instanceof Error ? error.message : "Failed to save settings.");
    }
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate("/admin", { replace: true });
  };

  return (
    <main className="section-space">
      <div className="site-container space-y-5">
        <section className="surface-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Admin</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{company.displayName} panel</h1>
            </div>

            <button type="button" className="button-secondary" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </section>

        <section className="surface-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Messages</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">Manage contact form submissions.</p>
            </div>

            <button
              type="button"
              className="button-secondary"
<<<<<<< HEAD
              onClick={() => void loadMessages(messagesPage)}
=======
              onClick={() => void loadMessages()}
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
              disabled={messagesLoading}
            >
              {messagesLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {messagesLoading ? <p className="mt-5 text-sm text-muted-foreground">Loading messages...</p> : null}
          {messagesError ? <p className="field-error mt-5">Error: {messagesError}</p> : null}

          {!messagesLoading && !messagesError && messages.length === 0 ? (
            <div className="mt-5 space-y-2">
              <p className="text-sm text-muted-foreground">No messages found.</p>
              <p className="text-xs text-muted-foreground">
                If you recently submitted a contact form, click Refresh. If it is still empty, rerun{" "}
                <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">docs/admin-panel-supabase.sql</code>
                {" "}in the same Supabase project to repair contact_messages RLS policies.
              </p>
            </div>
          ) : null}

          {!messagesLoading && messages.length > 0 ? (
            <div className="mt-5 space-y-3">
<<<<<<< HEAD
              <div className="flex items-center justify-between gap-3 rounded-md border border-border/70 bg-background/70 px-3 py-2">
                <p className="text-xs text-muted-foreground">
                  Page {messagesPage} of {totalPages} · {messagesTotalCount} total messages
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => void loadMessages(messagesPage - 1)}
                    disabled={!canGoPrevious}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => void loadMessages(messagesPage + 1)}
                    disabled={!canGoNext}
                  >
                    Next
                  </button>
                </div>
              </div>

=======
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
              {messages.map((item) => (
                <article key={item.id} className="surface-panel-soft p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
<<<<<<< HEAD
                      <p className="break-words text-sm font-semibold text-foreground">{item.subject}</p>
                      <p className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString()}</p>
                      <p className="break-words text-sm text-foreground">
                        <span className="font-medium">Name:</span> {item.name}
                      </p>
                      <p className="break-all text-sm text-foreground">
=======
                      <p className="text-sm font-semibold text-foreground">{item.subject}</p>
                      <p className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString()}</p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Name:</span> {item.name}
                      </p>
                      <p className="text-sm text-foreground">
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
                        <span className="font-medium">Email:</span> {item.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="button-secondary border-destructive/40 text-destructive hover:border-destructive"
                      onClick={() => void handleDeleteMessage(item.id)}
                      disabled={deletingMessageId === item.id}
                    >
                      {deletingMessageId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>

<<<<<<< HEAD
                  <p className="mt-3 max-h-72 overflow-y-auto whitespace-pre-wrap break-words text-sm leading-7 text-muted-foreground">
                    {item.message}
                  </p>
                </article>
              ))}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => void loadMessages(messagesPage - 1)}
                  disabled={!canGoPrevious}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => void loadMessages(messagesPage + 1)}
                  disabled={!canGoNext}
                >
                  Next
                </button>
              </div>
=======
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{item.message}</p>
                </article>
              ))}
>>>>>>> 78a7ca0b2c834bbd6134a5676134b58b36ef8d4b
            </div>
          ) : null}
        </section>

        <section className="surface-panel p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Update public contact details displayed on the website.
          </p>

          {settingsLoading ? <p className="mt-5 text-sm text-muted-foreground">Loading settings...</p> : null}

          {!settingsLoading ? (
            <form onSubmit={handleSettingsSubmit} className="mt-5 space-y-4" noValidate>
              <div className="field-group">
                <label htmlFor="admin-settings-phone" className="field-label">
                  Phone
                </label>
                <input
                  id="admin-settings-phone"
                  className="form-input"
                  value={settingsForm.phone}
                  onChange={(event) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="admin-settings-email" className="field-label">
                  Email
                </label>
                <input
                  id="admin-settings-email"
                  type="email"
                  className="form-input"
                  value={settingsForm.email}
                  onChange={(event) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="admin-settings-address" className="field-label">
                  Address
                </label>
                <textarea
                  id="admin-settings-address"
                  className="form-input resize-y"
                  rows={3}
                  value={settingsForm.address}
                  onChange={(event) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      address: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              {settingsStatus === "success" ? (
                <p className="text-sm font-medium text-primary">Settings saved successfully.</p>
              ) : null}
              {settingsStatus === "error" ? (
                <p className="field-error">Error: {settingsError || "Could not save settings."}</p>
              ) : null}

              <button type="submit" className="button-primary" disabled={settingsStatus === "saving"}>
                {settingsStatus === "saving" ? "Saving..." : "Save settings"}
              </button>
            </form>
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
