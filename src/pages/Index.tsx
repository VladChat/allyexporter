import { FormEvent, useState } from "react";
import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import chicagoSkyline from "@/assets/chicago-skyline.jpg";
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

const Index = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const { settings } = useSiteSettings();

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    url: `https://${company.domain}`,
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressCountry: company.country,
    },
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status === "error" || status === "success") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
        title={company.home.metaTitle}
        description={company.home.metaDescription}
        structuredData={organizationStructuredData}
      />

      <section id="home" className="section-space">
        <div className="site-container">
          <div className="surface-panel relative isolate overflow-hidden">
            <img
              src={chicagoSkyline}
              alt="Chicago skyline at dusk"
              className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-110 saturate-110"
              width={1920}
              height={1080}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1720]/80 via-[#0f1720]/50 to-[#0f1720]/28" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1720]/64 via-transparent to-[#0f1720]/22" />

            <div className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
              <div className="max-w-3xl">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                  {company.home.heroHeadline}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#d5dee7] sm:text-xl">
                  {company.home.heroSubheadline}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" className="button-primary" onClick={() => scrollToSection("contact")}>
                    {company.home.heroActionLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-space section-divider">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="surface-panel p-6 sm:p-8">
              <p className="eyebrow">{company.home.companyTitle}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{company.home.aboutTitle}</h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{company.home.aboutText}</p>
              <div className="mt-5 space-y-4">
                {company.home.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <aside className="surface-panel relative isolate min-h-[280px] overflow-hidden p-0">
              <img
                src={chicagoSkyline}
                alt="City skyline"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1720]/60 via-[#0f1720]/20 to-[#0f1720]/12" />
            </aside>
          </div>
        </div>
      </section>

      <section id="contact" className="section-space section-divider">
        <div className="site-container">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">{company.nav.contact}</p>
            <h2 className="page-title">{company.home.contactCtaTitle}</h2>
            <p className="page-lead">{company.home.contactCtaText}</p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
            <form onSubmit={handleSubmit} noValidate aria-busy={status === "loading"} className="surface-panel p-6 sm:p-7">
              <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
                <MessageSquareText className="h-5 w-5 text-primary" aria-hidden="true" />
                Contact form
              </h3>

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
                  <label htmlFor="home-contact-name" className="field-label">
                    Name
                  </label>
                  <input
                    id="home-contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.name)}
                    required
                    maxLength={100}
                  />
                  {errors.name && <p className="field-error">Error: {errors.name}</p>}
                </div>

                <div className="field-group">
                  <label htmlFor="home-contact-email" className="field-label">
                    Email
                  </label>
                  <input
                    id="home-contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.email)}
                    required
                    maxLength={255}
                  />
                  {errors.email && <p className="field-error">Error: {errors.email}</p>}
                </div>

                <div className="field-group">
                  <label htmlFor="home-contact-subject" className="field-label">
                    Subject
                  </label>
                  <input
                    id="home-contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={(event) => handleChange("subject", event.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.subject)}
                    required
                    maxLength={200}
                  />
                  {errors.subject && <p className="field-error">Error: {errors.subject}</p>}
                </div>

                <div className="field-group">
                  <label htmlFor="home-contact-message" className="field-label">
                    Message
                  </label>
                  <textarea
                    id="home-contact-message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    className="form-input resize-y"
                    aria-invalid={Boolean(errors.message)}
                    required
                    maxLength={5000}
                  />
                  {errors.message && <p className="field-error">Error: {errors.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="button-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : company.home.contactCtaActionLabel}
              </button>
            </form>

            <aside className="space-y-4">
              <article className="surface-panel p-6 sm:p-7">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">Official contact details</h3>
                <ul className="mt-5 space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Email</p>
                      <a href={`mailto:${settings.email}`} className="mt-1 inline-block text-base font-medium text-foreground hover:text-primary">
                        {settings.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Phone</p>
                      <a href={`tel:${settings.phone}`} className="mt-1 inline-block text-base font-medium text-foreground hover:text-primary">
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
              </article>

              <article className="surface-panel relative isolate min-h-[250px] overflow-hidden p-0">
                <img
                  src={chicagoSkyline}
                  alt="Business district skyline"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1720]/68 via-[#0f1720]/22 to-[#0f1720]/12" />
              </article>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
