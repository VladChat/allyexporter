import { Link } from "react-router-dom";
import { company } from "@/config/company";

const Footer = () => (
  <footer className="border-t border-border/80 bg-background/95">
    <div className="site-container section-space-compact">
      <div className="surface-panel-soft px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">{company.displayName}</p>
            <p className="text-xs text-muted-foreground">{company.footer.tagline}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Contact:</span>{" "}
              <a href={`mailto:${company.email}`} className="hover:text-primary">
                {company.email}
              </a>
            </p>
          </div>

          <nav aria-label="Legal links" className="flex flex-wrap gap-4 text-xs">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
              {company.footer.privacyLabel}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">
              {company.footer.termsLabel}
            </Link>
          </nav>
        </div>

        <div className="mt-4 border-t border-border/70 pt-4">
          <p className="text-xs text-muted-foreground">{company.footer.copyright}</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
