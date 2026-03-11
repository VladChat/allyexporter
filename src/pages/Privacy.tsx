import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

const Privacy = () => (
  <Layout>
    <PageMeta
      title={`${company.privacy.title} - ${company.displayName}`}
      description={company.privacy.metaDescription}
    />

    <section className="section-space">
      <div className="site-container max-w-4xl">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Legal</p>
          <h1 className="page-title">{company.privacy.title}</h1>
          <p className="page-lead">
            This policy explains how {company.displayName} handles information received through this website.
          </p>
        </div>

        <article className="surface-panel legal-content mt-8 p-6 sm:p-8">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide voluntarily through the contact form, including name, email, subject,
            and message content.
          </p>

          <h2>How We Use Information</h2>
          <p>Submitted information is used only to review and respond to inquiries directed to the company.</p>

          <h2>Cookies and Tracking</h2>
          <p>
            This website does not use analytics or advertising trackers. Basic technical cookies may be used only when
            needed for site operation.
          </p>

          <h2>Third-Party Infrastructure</h2>
          <p>
            Website hosting and form-processing infrastructure may process standard request data, such as IP address,
            as part of normal technical operations.
          </p>

          <h2>Policy Updates</h2>
          <p>This policy may be updated as needed. The latest version is published on this page.</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
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

export default Privacy;
