import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

const About = () => (
  <Layout>
    <PageMeta
      title={`${company.about.title} | ${company.displayName}`}
      description={company.about.metaDescription}
    />

    <section className="section-space">
      <div className="site-container">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Company Profile</p>
          <h1 className="page-title">{company.about.title}</h1>
          <p className="page-lead">{company.about.intro}</p>
        </div>
      </div>
    </section>

    <section className="section-space section-divider">
      <div className="site-container">
        <div className="grid gap-4 md:grid-cols-3">
          {company.about.sections.map((section) => (
            <article key={section.title} className="surface-panel p-6">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
