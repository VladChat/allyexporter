import { Link } from "react-router-dom";
import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import {
  CircleCheckBig,
  FileText,
  Landmark,
  MessageSquareText,
  MonitorSmartphone,
} from "lucide-react";
import chicagoSkyline from "@/assets/chicago-skyline.jpg";

const overviewIcons = [Landmark, MonitorSmartphone, MessageSquareText, FileText];

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
      <div className="site-container grid items-center gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="space-y-5">
          <p className="eyebrow">Official Company Website</p>
          <h1 className="page-title">{company.hero.headline}</h1>
          <p className="page-lead">{company.hero.subheadline}</p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link to="/contact" className="button-primary">
              {company.hero.cta}
            </Link>
            <Link to="/about" className="button-secondary">
              View Company Profile
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 text-xs text-muted-foreground">
            <span className="rounded-md border border-border/80 bg-secondary/35 px-3 py-1.5">
              {company.city}, {company.state}
            </span>
            <span className="rounded-md border border-border/80 bg-secondary/35 px-3 py-1.5">
              Legal name: {company.legalName}
            </span>
          </div>
        </div>

        <figure className="surface-panel overflow-hidden">
          <img
            src={chicagoSkyline}
            alt="Chicago skyline at evening"
            className="aspect-[4/3] w-full object-cover md:aspect-square lg:aspect-[4/3]"
            loading="eager"
            width={1024}
            height={1024}
          />
          <figcaption className="border-t border-border/80 bg-secondary/35 px-4 py-3 text-xs text-muted-foreground">
            Registered company location: Illinois, United States.
          </figcaption>
        </figure>
      </div>
    </section>

    <section className="section-space border-t border-border/70">
      <div className="site-container">
        <div className="mb-8 space-y-3">
          <p className="eyebrow">Company Overview</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">What this website provides</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {company.overview.map((item, index) => {
            const Icon = overviewIcons[index];
            return (
              <article key={item.title} className="surface-panel surface-panel-hover h-full p-5">
                <Icon className="mb-4 h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="section-space-compact border-t border-border/70">
      <div className="site-container">
        <div className="surface-panel grid gap-5 p-6 sm:p-7 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">{company.trust.title}</h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{company.trust.description}</p>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-foreground">
              <CircleCheckBig className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Verified company identity</span>
            </li>
            <li className="flex items-center gap-2 text-foreground">
              <CircleCheckBig className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Direct contact details</span>
            </li>
            <li className="flex items-center gap-2 text-foreground">
              <CircleCheckBig className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Public legal policies</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="section-space-compact border-t border-border/70">
      <div className="site-container">
        <div className="surface-panel-soft flex flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center sm:px-7">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{company.finalCta.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{company.finalCta.description}</p>
          </div>
          <Link to="/contact" className="button-primary w-full sm:w-auto">
            {company.finalCta.actionLabel}
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
