import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const currentYear = new Date().getFullYear();
const footerHostname =
  typeof window !== "undefined" ? window.location.hostname : "medibook.pro";
const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(footerHostname)}`;

export function Layout({ children, hideNav = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background decorative blobs */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        aria-hidden
      >
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full bg-accent/4 blur-3xl" />
      </div>

      {!hideNav && <Navbar />}

      <main className="flex-1 relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-border/20 bg-card/60 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold text-sm text-foreground">
                MediBook Pro
              </span>
            </Link>
            <p className="text-xs text-muted-foreground text-center">
              © {currentYear}. Built with love using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Secure · Decentralized · Fast</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
