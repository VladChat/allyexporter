import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

const Terms = () => (
  <Layout>
    <PageMeta title={`${company.terms.title} - ${company.displayName}`} description={company.terms.metaDescription} />

    <section className="section-space">
      <div className="site-container max-w-4xl">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Legal</p>
          <h1 className="page-title">{company.terms.title}</h1>
          <p className="page-lead">
            These terms govern use of this website. By using the site, you agree to the terms below.
          </p>
        </div>

        <article className="surface-panel legal-content mt-8 p-6 sm:p-8">
          <h2>Website Purpose</h2>
          <p>
            This website is maintained by {company.displayName} to provide official company and contact information.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            We make reasonable efforts to keep information current. We do not guarantee completeness and may update
            content without prior notice.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            Website content, including text and design elements, belongs to {company.displayName} unless otherwise
            noted and may not be reused without permission.
          </p>

          <h2>Liability Limitation</h2>
          <p>{company.displayName} is not liable for damages related to use of, or inability to use, this website.</p>

          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of the State of Illinois, United States.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${company.email}`} className="text-primary hover:underline">
              {company.email}
            </a>
            .
          </p>
        </article>
      </div>
    </section>
  </Layout>
);

export default Terms;
