import { Link } from "react-router-dom";
import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { ArrowRight } from "lucide-react";
import chicagoSkyline from "@/assets/chicago-skyline.jpg";

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
        <div className="surface-panel relative isolate overflow-hidden">
          <img
            src={chicagoSkyline}
            alt="Chicago skyline at dusk"
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1720]/95 via-[#0f1720]/70 to-[#0f1720]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1720]/90 via-transparent to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-6 px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              {company.home.heroHeadline}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#d5dee7] sm:text-xl">
              {company.home.heroSubheadline}
            </p>
            <Link to="/contact" className="button-primary w-full sm:w-auto">
              {company.home.heroActionLabel}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section-space section-divider">
      <div className="site-container">
        <article className="surface-panel p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {company.home.companyTitle}
          </h2>
          <div className="mt-4 space-y-4">
            {company.home.companyParagraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>

    <section className="section-space section-divider">
      <div className="site-container">
        <article className="surface-panel p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{company.home.aboutTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{company.home.aboutText}</p>
        </article>
      </div>
    </section>

    <section className="section-space section-divider">
      <div className="site-container">
        <div className="surface-panel-soft flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{company.home.contactCtaTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{company.home.contactCtaText}</p>
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
