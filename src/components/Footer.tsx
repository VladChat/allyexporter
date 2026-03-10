import { Link } from "react-router-dom";
import { company } from "@/config/company";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background">
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        {/* Brand + contact */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary">{company.displayName}</p>
          <p className="text-xs text-muted-foreground">{company.fullAddress}</p>
          <p className="text-xs text-muted-foreground">
            <a href={`mailto:${company.email}`} className="transition-colors hover:text-primary">
              {company.email}
            </a>
            {" · "}
            <a href={`tel:${company.phone}`} className="transition-colors hover:text-primary">
              {company.phone}
            </a>
          </p>
        </div>

        {/* Legal links */}
        <div className="flex gap-6">
          <Link
            to="/privacy"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {company.footer.privacyLabel}
          </Link>
          <Link
            to="/terms"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {company.footer.termsLabel}
          </Link>
        </div>
      </div>

      <div className="mt-8 border-t border-border/30 pt-6">
        <p className="text-xs text-muted-foreground">{company.footer.copyright}</p>
      </div>
    </div>
  </footer>
);

export default Footer;
