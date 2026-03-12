import { Link } from "react-router-dom";
import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { ArrowRight, Handshake, Package, ShipWheel } from "lucide-react";

const operationIcons = [Package, ShipWheel, Handshake];

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: `https://${company.domain}`,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.addressLine1,
    addressLocality: company.city,
    addressRegion: company.state,
    postalCode: company.zip,
    addressCountry: company.country,
  },
};

const Index = () => (
  <Layout>
    <PageMeta
      title={company.home.metaTitle}
      description={company.home.metaDescription}
      structuredData={organizationStructuredData}
    />

    <section className="section-space">
      <div className="site-container">
        <div className="surface-panel relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-36 right-8 h-80 w-80 rounded-full border border-primary/20" />

          <div className="relative max-w-2xl space-y-6">
            <p className="eyebrow">Company Profile</p>
            <h1 className="page-title text-balance text-4xl sm:text-5xl">{company.home.headline}</h1>
            <p className="page-lead text-balance">{company.home.subheadline}</p>

            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="button-primary">
                {company.home.primaryActionLabel}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-space section-divider">
      <div className="site-container">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Company</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{company.home.companyTitle}</h2>
        </div>

        <article className="surface-panel mt-7 space-y-5 p-6 sm:p-8">
          {company.home.companyParagraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </section>

    <section className="section-space section-divider">
      <div className="site-container">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">{company.home.operationsTitle}</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Core activities</h2>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {company.home.operations.map((operation, index) => {
            const Icon = operationIcons[index];
            return (
              <article key={operation.title} className="surface-panel surface-panel-hover p-6">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-foreground">{operation.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{operation.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="section-space section-divider">
      <div className="site-container">
        <div className="surface-panel-soft flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{company.home.contactCtaTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{company.home.contactCtaDescription}</p>
          </div>
          <Link to="/contact" className="button-primary w-full sm:w-auto">
            {company.home.contactCtaActionLabel}
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
