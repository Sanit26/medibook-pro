import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Calendar,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Stethoscope,
  UserCircle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { cn } from "../../lib/utils";
import { NeonButton } from "../ui/NeonButton";

const patientLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/doctors", label: "Find Doctors", icon: Stethoscope },
  { to: "/appointments", label: "My Appointments", icon: Calendar },
];

const adminLinks = [
  { to: "/admin", label: "Admin Panel", icon: ShieldCheck },
  { to: "/doctors", label: "Doctors", icon: Stethoscope },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isAdmin, profile, login, logout } = useAuth();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navLinks = isAdmin ? adminLinks : patientLinks;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full glass-thick border-b border-border/30"
      data-ocid="navbar"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="navbar.link"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-cyan group-hover:scale-105 transition-smooth">
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-primary glow-animation">Medi</span>
            <span className="text-foreground">Book</span>
            <span className="text-accent text-xs font-semibold ml-0.5">
              Pro
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        {isAuthenticated && (
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth",
                  currentPath === to
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
                data-ocid={`navbar.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div
                className="hidden md:flex items-center gap-2.5 glass rounded-full px-3 py-1.5"
                data-ocid="navbar.user_indicator"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center">
                  <UserCircle className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground max-w-24 truncate">
                  {profile?.name ?? "User"}
                </span>
                {isAdmin && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-secondary/20 text-secondary rounded-full border border-secondary/30">
                    ADMIN
                  </span>
                )}
              </div>
              <NeonButton
                variant="ghost"
                size="sm"
                onClick={logout}
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
                className="hidden md:flex"
                data-ocid="navbar.logout_button"
              >
                Logout
              </NeonButton>
            </>
          ) : (
            <NeonButton
              variant="cyan"
              size="sm"
              onClick={login}
              data-ocid="navbar.login_button"
            >
              Sign In
            </NeonButton>
          )}

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted/60 transition-smooth text-muted-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            data-ocid="navbar.menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border/20"
            data-ocid="navbar.mobile_menu"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  {navLinks.map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                        currentPath === to
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      )}
                      data-ocid={`navbar.mobile_${label.toLowerCase().replace(/\s+/g, "_")}.link`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  ))}
                  <div className="border-t border-border/20 pt-2 mt-1 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground px-3">
                      {profile?.name}
                    </span>
                    <NeonButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      leftIcon={<LogOut className="w-3.5 h-3.5" />}
                      data-ocid="navbar.mobile_logout_button"
                    >
                      Logout
                    </NeonButton>
                  </div>
                </>
              ) : (
                <NeonButton
                  variant="cyan"
                  size="md"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  className="w-full"
                  data-ocid="navbar.mobile_login_button"
                >
                  Sign In with Internet Identity
                </NeonButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
