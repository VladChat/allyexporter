import { useState, FormEvent } from "react";
import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { Mail, Phone, MapPin } from "lucide-react";
import { z } from "zod";
import { submitContactMessage } from "@/services/contactService";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

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
      const submitResult = await submitContactMessage(result.data);
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
        title={`${company.contact.title} - ${company.displayName}`}
        description={company.contact.metaDescription}
      />

      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <h1 className="mb-12 text-3xl font-bold text-foreground">{company.contact.title}</h1>

        <div className="grid gap-12 md:grid-cols-5">
          <div className="panel space-y-7 p-6 md:col-span-2">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a href={`mailto:${company.email}`} className="text-sm font-medium text-foreground hover:text-primary">
                  {company.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <a href={`tel:${company.phone}`} className="text-sm font-medium text-foreground hover:text-primary">
                  {company.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground">{company.fullAddress}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="panel p-8">
              {status === "success" && (
                <div className="mb-6 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
                  Your message has been sent successfully.
                </div>
              )}
              {status === "error" && (
                <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  Unable to send your message. Please try again later.
                </div>
              )}

              <div className="space-y-5">
                <Field label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="form-input"
                    required
                    maxLength={100}
                  />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="form-input"
                    required
                    maxLength={255}
                  />
                </Field>
                <Field label="Subject" error={errors.subject}>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    className="form-input"
                    required
                    maxLength={200}
                  />
                </Field>
                <Field label="Message" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={5}
                    className="form-input resize-none"
                    required
                    maxLength={5000}
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
    {children}
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);

export default Contact;