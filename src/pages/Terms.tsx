import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

const Terms = () => (
  <Layout>
    <PageMeta
      title={`${company.terms.title} — ${company.displayName}`}
      description={company.terms.metaDescription}
    />

    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <h1 className="mb-8 text-3xl font-bold text-foreground">{company.terms.title}</h1>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          By accessing this website, you agree to the following terms. If you do not agree,
          please do not use this site.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Use of This Website</h2>
        <p>
          This website is provided by {company.displayName} for informational purposes. The
          content is intended to offer general company information and contact details.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Accuracy</h2>
        <p>
          We make reasonable efforts to keep the information on this website accurate and
          current. However, we do not guarantee completeness or accuracy and accept no
          liability for errors or omissions.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Intellectual Property</h2>
        <p>
          All content on this website, including text and design, is the property of{" "}
          {company.displayName} unless otherwise noted. You may not reproduce or distribute
          content from this site without written permission.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Limitation of Liability</h2>
        <p>
          {company.displayName} is not liable for any damages arising from the use or
          inability to use this website.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of Illinois, United States.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">Contact</h2>
        <p>
          Questions about these terms can be directed to{" "}
          <a href={`mailto:${company.email}`} className="text-primary hover:underline">
            {company.email}
          </a>.
        </p>
      </div>
    </section>
  </Layout>
);

export default Terms;
