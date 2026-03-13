import { Navigate, Outlet } from "react-router-dom";

type AdminRouteProps = {
  sessionReady: boolean;
  isAuthenticated: boolean;
  isAllowedAdmin: boolean;
};

const AdminRoute = ({ sessionReady, isAuthenticated, isAllowedAdmin }: AdminRouteProps) => {
  if (!sessionReady) {
    return (
      <main className="section-space">
        <div className="site-container">
          <section className="surface-panel p-6 sm:p-8">
            <p className="text-sm text-muted-foreground">Checking admin session...</p>
          </section>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !isAllowedAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
