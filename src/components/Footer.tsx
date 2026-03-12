import { Link } from "react-router-dom";
import { company } from "@/config/company";

const Footer = () => (
  <footer className="section-divider bg-background/95">
    <div className="site-container section-space-compact">
      <div className="flex flex-col gap-3 py-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{company.footer.copyright}</p>

        <nav aria-label="Footer links" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
            {company.footer.privacyLabel}
          </Link>
          <Link to="/terms" className="text-muted-foreground hover:text-foreground">
            {company.footer.termsLabel}
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">
            {company.footer.contactLabel}
          </Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
