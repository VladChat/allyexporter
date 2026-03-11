import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="relative flex min-h-screen flex-col overflow-x-hidden">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
    >
      Skip to main content
    </a>
    <Header />
    <main id="main-content" className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
