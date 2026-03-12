import { Link } from "react-router-dom";
import { company } from "@/config/company";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="section-divider bg-background/95">
    <div className="site-container section-space">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-xl font-semibold tracking-tight text-foreground">{company.displayName}</p>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">{company.footer.tagline}</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/90">{company.footer.quickLinksLabel}</p>
          <nav aria-label="Footer links" className="grid gap-2 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
              {company.footer.privacyLabel}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">
              {company.footer.termsLabel}
            </Link>
            <Link to="/#contact" className="text-muted-foreground hover:text-foreground">
              {company.footer.contactLabel}
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/90">{company.footer.socialLabel}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#" aria-label="Facebook" className="footer-social-link">
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Twitter" className="footer-social-link">
              <Twitter className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#" aria-label="LinkedIn" className="footer-social-link">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Instagram" className="footer-social-link">
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">{company.email}</p>
          <p className="text-sm text-muted-foreground">{company.phone}</p>
        </div>
      </div>

      <div className="mt-8 border-t border-border/85 pt-5">
        <p className="text-sm text-muted-foreground">{company.footer.copyright}</p>
      </div>
    </div>
  </footer>
);
export default Footer;
