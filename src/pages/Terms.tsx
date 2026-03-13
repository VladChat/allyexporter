import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

const Terms = () => (
  <Layout>
    <PageMeta title={`${company.terms.title} | ${company.displayName}`} description={company.terms.metaDescription} />

    <section className="section-space">
      <div className="site-container max-w-[860px]">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Legal</p>
          <h1 className="page-title">{company.terms.title}</h1>
          <p className="page-lead">
            This page describes the basic terms for using this website and its public company information.
          </p>
        </div>

        <article className="surface-panel legal-content mt-8 p-6 sm:p-8 md:p-10">
          <h2>Website purpose</h2>
          <p>
            The site is maintained by {company.legalName} as a public company profile and business contact channel.
          </p>

          <h2>Use of content</h2>
          <p>
            Text, design elements, and other website content belong to {company.legalName} unless stated otherwise.
          </p>

          <h2>Accuracy</h2>
          <p>
            We aim to keep content current, but information can change and may be updated without prior notice.
          </p>

          <h2>Liability</h2>
          <p>{company.legalName} is not liable for losses resulting from website use or temporary unavailability.</p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the State of Illinois, United States.</p>

          <h2>Contact</h2>
          <p>
            Questions can be sent to <a href={`mailto:${company.email}`} className="text-primary hover:underline">{company.email}</a>.
          </p>
        </article>
      </div>
    </section>
  </Layout>
);

export default Terms;
