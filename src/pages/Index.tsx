import { Link } from "react-router-dom";
import { company } from "@/config/company";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { Building2, Globe, Phone } from "lucide-react";
import chicagoSkyline from "@/assets/chicago-skyline.jpg";

const icons = [Building2, Globe, Phone];

const Index = () => (
  <Layout>
    <PageMeta title={company.home.metaTitle} description={company.home.metaDescription} />

    {/* Hero */}
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
        {/* Left */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {company.hero.headline}
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            {company.hero.subheadline}
          </p>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            {company.hero.cta}
          </Link>
        </div>

        {/* Right — skyline image */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-xl border border-border/50 shadow-lg shadow-primary/5">
            <img
              src={chicagoSkyline}
              alt="Chicago skyline at evening"
              className="aspect-square w-full object-cover"
              loading="eager"
              width={1024}
              height={1024}
            />
          </div>
        </div>
      </div>
    </section>

    {/* What We Do */}
    <section className="border-t border-border/30 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-2xl font-semibold text-foreground">
          What We Do
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {company.whatWeDo.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className="group rounded-xl border border-border/50 bg-card p-8 transition-colors hover:border-primary/30"
              >
                <Icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Trust strip */}
    <section className="border-t border-border/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
        <p className="text-sm font-medium text-primary">
          Registered in the United States · Illinois
        </p>
        <p className="max-w-lg text-sm text-muted-foreground">
          AllyExporter LLC is a legally registered U.S. company. This website serves as the official public reference for verified company details.
        </p>
      </div>
    </section>
  </Layout>
);

export default Index;
