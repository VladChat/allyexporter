import { Link, useLocation } from "react-router-dom";
import { company } from "@/config/company";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import BrandMark from "./BrandMark";

const navItems = [
  { label: company.nav.home, to: "/" },
  { label: company.nav.about, to: "/about" },
  { label: company.nav.contact, to: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/85 bg-background/90 backdrop-blur-md">
      <div className="site-container flex h-[72px] items-center justify-between">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-3 rounded-[14px] px-1 text-foreground hover:text-primary"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[14px] border border-primary/40 bg-primary/10 text-primary">
            <BrandMark className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">{company.displayName}</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-[14px] border px-4 text-sm font-medium transition-colors",
                  active
                    ? "border-primary/55 bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[14px] border border-border bg-card text-muted-foreground hover:border-primary/35 hover:text-foreground md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="section-divider bg-background md:hidden">
          <div className="site-container grid gap-2 py-3">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-[14px] border px-4 text-sm font-medium transition-colors",
                    active
                      ? "border-primary/55 bg-primary/10 text-primary"
                      : "border-border/90 text-muted-foreground hover:border-primary/35 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
