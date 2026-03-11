import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { CircleCheckBig } from "lucide-react";

const About = () => (
  <Layout>
    <PageMeta
      title={`${company.about.title} - ${company.displayName}`}
      description={company.about.metaDescription}
    />

    <section className="section-space">
      <div className="site-container">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Company Profile</p>
          <h1 className="page-title">{company.about.title}</h1>
          <p className="page-lead">
            {company.displayName} is a U.S. company based in {company.city}, {company.state}. This website acts as
            the official public profile for identity, contact, and policy reference.
          </p>
        </div>
      </div>
    </section>

    <section className="section-space-compact border-t border-border/70">
      <div className="site-container grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="surface-panel p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-foreground">Website Purpose</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The site is maintained by the company to provide a reliable reference point for legal name, business
            location, and verified communication channels.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            AllyExporter LLC also maintains company-operated brand presence on digital platforms. This website remains
            the primary official contact and policy source.
          </p>
        </article>

        <aside className="surface-panel p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-foreground">Company Details</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Legal Name</dt>
              <dd className="mt-1 font-medium text-foreground">{company.legalName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Registered Address</dt>
              <dd className="mt-1 font-medium text-foreground">{company.fullAddress}</dd>
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
        </aside>
      </div>
    </section>

    <section className="section-space-compact border-t border-border/70">
      <div className="site-container">
        <div className="surface-panel-soft p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-foreground">What you can find here</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>Company identity and registered location details.</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>Direct inquiry channels for public and business communication.</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>Privacy and terms pages that explain website use.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
