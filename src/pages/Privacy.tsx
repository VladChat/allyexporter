import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

const Privacy = () => (
  <Layout>
    <PageMeta
      title={`${company.privacy.title} | ${company.displayName}`}
      description={company.privacy.metaDescription}
    />

    <section className="section-space">
      <div className="site-container max-w-[860px]">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Legal</p>
          <h1 className="page-title">{company.privacy.title}</h1>
          <p className="page-lead">
            This page explains how information submitted through this website may be collected and used.
          </p>
        </div>

        <article className="surface-panel legal-content mt-8 p-6 sm:p-8 md:p-10">
          <h2>Information submitted by users</h2>
          <p>
            When you use the contact form, we collect the details you enter: name, email address, subject, and
            message.
          </p>

          <h2>How information is used</h2>
          <p>Submitted information is used to review and respond to your inquiry.</p>

          <h2>Storage and processing</h2>
          <p>
            Contact form submissions are processed through website infrastructure providers used by AllyExporter LLC.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            This website does not use advertising trackers. Basic technical cookies may be present only where required
            for normal site operation.
          </p>

          <h2>Changes</h2>
          <p>Privacy information may be updated. The latest version is always published on this page.</p>

          <h2>Contact</h2>
          <p>
            Questions can be sent to <a href={`mailto:${company.email}`} className="text-primary hover:underline">{company.email}</a>.
          </p>
        </article>
      </div>
    </section>
  </Layout>
);

export default Privacy;
