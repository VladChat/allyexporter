import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

const About = () => (
  <Layout>
    <PageMeta
      title={`${company.about.title} — ${company.displayName}`}
      description={company.about.metaDescription}
    />

    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <h1 className="mb-8 text-3xl font-bold text-foreground">{company.about.title}</h1>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          {company.displayName} is a company registered and operating in the United States,
          headquartered in {company.city}, {company.state}.
        </p>
        <p>
          This website provides official company information for public reference. It is
          maintained to establish a verifiable online presence for use in business
          registrations, developer accounts, and other official purposes.
        </p>
        <p>
          Visitors can find the company's legal details, contact information, and relevant
          policies on this site. All information is kept accurate and up to date.
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-border/50 bg-card p-8">
        <h2 className="mb-4 text-base font-semibold text-foreground">Company Details</h2>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Legal Name</dt>
            <dd className="mt-1 font-medium text-foreground">{company.legalName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Location</dt>
            <dd className="mt-1 font-medium text-foreground">
              {company.city}, {company.state}, {company.country}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${company.email}`} className="font-medium text-primary hover:underline">
                {company.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="mt-1">
              <a href={`tel:${company.phone}`} className="font-medium text-primary hover:underline">
                {company.phone}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </Layout>
);

export default About;
