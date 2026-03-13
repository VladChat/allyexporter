import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { isAllowedAdminEmail, supabaseClient } from "@/lib/supabaseClient";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/admin/AdminRoute";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionReady, setSessionReady] = useState(false);

  const refreshSession = async () => {
    const { data } = await supabaseClient.auth.getSession();
    setSession(data.session ?? null);
    setSessionReady(true);
  };

  useEffect(() => {
    void refreshSession();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setSessionReady(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const userEmail = session?.user?.email ?? null;
  const isAuthenticated = Boolean(session?.user);
  const isAllowedAdmin = isAllowedAdminEmail(userEmail);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route
              path="/admin"
              element={
                <AdminLogin
                  sessionReady={sessionReady}
                  isAuthenticated={isAuthenticated}
                  isAllowedAdmin={isAllowedAdmin}
                  onAuthChanged={refreshSession}
                />
              }
            />
            <Route
              element={
                <AdminRoute
                  sessionReady={sessionReady}
                  isAuthenticated={isAuthenticated}
                  isAllowedAdmin={isAllowedAdmin}
                />
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
