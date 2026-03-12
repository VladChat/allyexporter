import { Link } from "react-router-dom";
import { company } from "@/config/company";

const Footer = () => (
  <footer className="section-divider bg-background/95">
    <div className="site-container section-space-compact">
      <div className="surface-panel-soft flex items-center justify-between gap-4 px-5 py-4">
        <p className="text-sm font-medium text-foreground">{company.footer.copyright}</p>
        <nav aria-label="Footer links" className="flex items-center gap-5 text-sm">
          <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
            {company.footer.privacyLabel}
          </Link>
          <Link to="/terms" className="text-muted-foreground hover:text-foreground">
            {company.footer.termsLabel}
          </Link>
        </nav>
      </div>
    </div>
  </footer>
);
export default Footer;
