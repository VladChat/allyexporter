import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

const Privacy = () => (
  <Layout>
    <PageMeta
      title={`${company.privacy.title} — ${company.displayName}`}
      description={company.privacy.metaDescription}
    />

    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <h1 className="mb-8 text-3xl font-bold text-foreground">{company.privacy.title}</h1>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          This privacy policy explains how {company.displayName} handles information
          collected through this website.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Information We Collect</h2>
        <p>
          We may collect personal information you voluntarily provide through our contact
          form, such as your name, email address, and message content. We do not collect
          information automatically beyond standard server logs.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">How We Use Information</h2>
        <p>
          Any information collected is used solely to respond to your inquiries. We do not
          sell, rent, or share personal information with third parties for marketing purposes.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Cookies</h2>
        <p>
          This website does not use tracking cookies or third-party analytics. Standard
          technical cookies may be used to ensure the website functions properly.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Third-Party Services</h2>
        <p>
          This website is hosted using third-party infrastructure. These providers may
          process standard server request data (such as IP addresses) as part of normal
          operations.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Changes</h2>
        <p>
          We may update this policy as needed. Any changes will be reflected on this page.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Contact</h2>
        <p>
          If you have questions about this policy, contact us at{" "}
          <a href={`mailto:${company.email}`} className="text-primary hover:underline">
            {company.email}
          </a>.
        </p>
      </div>
    </section>
  </Layout>
);

export default Privacy;
