import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="section-space">
        <div className="site-container">
          <div className="surface-panel mx-auto max-w-xl p-8 text-center sm:p-10">
            <p className="eyebrow">Error</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">404</h1>
            <p className="mt-3 text-sm text-muted-foreground">The page you requested could not be found.</p>
            <div className="mt-6">
              <Link to="/" className="button-primary">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
