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
          <p className="eyebrow">About</p>
          <h1 className="page-title">{company.about.title}</h1>
          <p className="page-lead">{company.about.intro}</p>
        </div>
      </div>
    </section>

    <section className="section-space section-divider">
      <div className="site-container">
        <article className="surface-panel space-y-4 p-6 sm:p-8">
          {company.about.summary.map((line) => (
            <p key={line} className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {line}
            </p>
          ))}
        </article>
      </div>
    </section>
  </Layout>
);

export default About;
