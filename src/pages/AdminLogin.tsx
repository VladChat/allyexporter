import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { company } from "@/config/company";
import { isAllowedAdminEmail, supabaseClient } from "@/lib/supabaseClient";

type AdminLoginProps = {
  sessionReady: boolean;
  isAuthenticated: boolean;
  isAllowedAdmin: boolean;
  onAuthChanged: () => Promise<void>;
};

const AdminLogin = ({
  sessionReady,
  isAuthenticated,
  isAllowedAdmin,
  onAuthChanged,
}: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorText, setErrorText] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setErrorText("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!isAllowedAdminEmail(normalizedEmail)) {
      setStatus("error");
      setErrorText("Access is restricted to the configured admin account.");
      return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error || !data.user || !isAllowedAdminEmail(data.user.email)) {
      await supabaseClient.auth.signOut();
      setStatus("error");
      setErrorText(error?.message || "Login failed. Please check credentials.");
      return;
    }

    setStatus("idle");
    setPassword("");
    await onAuthChanged();
  };

  if (sessionReady && isAuthenticated && isAllowedAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <main className="section-space">
      <div className="site-container max-w-[560px]">
        <section className="surface-panel p-6 sm:p-8">
          <p className="eyebrow">Admin</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Admin login</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Sign in to manage contact messages and website contact settings for {company.displayName}.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4" aria-busy={status === "loading"}>
            <div className="field-group">
              <label htmlFor="admin-email" className="field-label">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                className="form-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="admin-password" className="field-label">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="form-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {status === "error" && <p className="field-error">Error: {errorText}</p>}

            <button type="submit" className="button-primary w-full" disabled={status === "loading"}>
              {status === "loading" ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AdminLogin;
