import { FormEvent, useState } from "react";
import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { z } from "zod";
import { submitContactMessage } from "@/services/contactService";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "loading" | "success" | "error";

const fieldMeta = {
  name: { id: "contact-name", hintId: "contact-name-hint", errorId: "contact-name-error" },
  email: { id: "contact-email", hintId: "contact-email-hint", errorId: "contact-email-error" },
  subject: { id: "contact-subject", hintId: "contact-subject-hint", errorId: "contact-subject-error" },
  message: { id: "contact-message", hintId: "contact-message-hint", errorId: "contact-message-error" },
} as const;

const describedBy = (hintId: string, hasError: boolean, errorId: string) =>
  hasError ? `${hintId} ${errorId}` : hintId;

const Contact = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const { settings } = useSiteSettings();

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (status === "error" || status === "success") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      const submitResult = await submitContactMessage({
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
      });
      if (!submitResult.success) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <PageMeta
        title={`${company.contact.title} | ${company.displayName}`}
        description={company.contact.metaDescription}
      />

      <section className="section-space">
        <div className="site-container">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Contact</p>
            <h1 className="page-title">{company.contact.title}</h1>
            <p className="page-lead">{company.contact.intro}</p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <aside className="surface-panel p-6 sm:p-7">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Company information</h2>

              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="mt-1 inline-block break-all text-base font-medium text-foreground hover:text-primary"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${settings.phone}`}
                      className="mt-1 inline-block text-base font-medium text-foreground hover:text-primary"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Address</p>
                    <p className="mt-1 text-base font-medium text-foreground">{settings.address}</p>
                  </div>
                </li>
              </ul>
            </aside>

            <form onSubmit={handleSubmit} noValidate aria-busy={status === "loading"} className="surface-panel p-6 sm:p-7">
              <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
                <MessageSquareText className="h-5 w-5 text-primary" aria-hidden="true" />
                Contact form
              </h2>

              {status === "success" && (
                <div role="status" aria-live="polite" className="status-banner status-banner-success mt-6">
                  Message sent. Thank you for contacting us.
                </div>
              )}

              {status === "error" && (
                <div role="alert" className="status-banner status-banner-error mt-6">
                  Message not sent. Please try again later.
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="field-group">
                  <label htmlFor={fieldMeta.name.id} className="field-label">
                    Name
                  </label>
                  <input
                    id={fieldMeta.name.id}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy(fieldMeta.name.hintId, Boolean(errors.name), fieldMeta.name.errorId)}
                    required
                    maxLength={100}
                  />
                  <p id={fieldMeta.name.hintId} className="field-hint">
                    Enter your full name.
                  </p>
                  {errors.name && (
                    <p id={fieldMeta.name.errorId} className="field-error">
                      Error: {errors.name}
                    </p>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor={fieldMeta.email.id} className="field-label">
                    Email
                  </label>
                  <input
                    id={fieldMeta.email.id}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy(fieldMeta.email.hintId, Boolean(errors.email), fieldMeta.email.errorId)}
                    required
                    maxLength={255}
                  />
                  <p id={fieldMeta.email.hintId} className="field-hint">
                    We will respond using this email address.
                  </p>
                  {errors.email && (
                    <p id={fieldMeta.email.errorId} className="field-error">
                      Error: {errors.email}
                    </p>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor={fieldMeta.subject.id} className="field-label">
                    Subject
                  </label>
                  <input
                    id={fieldMeta.subject.id}
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={describedBy(
                      fieldMeta.subject.hintId,
                      Boolean(errors.subject),
                      fieldMeta.subject.errorId,
                    )}
                    required
                    maxLength={200}
                  />
                  <p id={fieldMeta.subject.hintId} className="field-hint">
                    Keep this line short.
                  </p>
                  {errors.subject && (
                    <p id={fieldMeta.subject.errorId} className="field-error">
                      Error: {errors.subject}
                    </p>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor={fieldMeta.message.id} className="field-label">
                    Message
                  </label>
                  <textarea
                    id={fieldMeta.message.id}
                    name="message"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={6}
                    className="form-input resize-y"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describedBy(
                      fieldMeta.message.hintId,
                      Boolean(errors.message),
                      fieldMeta.message.errorId,
                    )}
                    required
                    maxLength={5000}
                  />
                  <p id={fieldMeta.message.hintId} className="field-hint">
                    Include enough detail for a reply.
                  </p>
                  {errors.message && (
                    <p id={fieldMeta.message.errorId} className="field-error">
                      Error: {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="button-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
