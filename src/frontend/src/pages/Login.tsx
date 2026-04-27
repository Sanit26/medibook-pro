import { Link, useNavigate } from "@tanstack/react-router";
import { Activity, ArrowRight, Fingerprint, Shield, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { NeonButton } from "../components/ui/NeonButton";
import { useAuth } from "../contexts/AuthContext";

// Floating particle component
function Particle({
  x,
  y,
  size,
  delay,
  color,
}: { x: number; y: number; size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

const particles = [
  { x: 10, y: 20, size: 4, delay: 0, color: "oklch(0.7 0.18 200 / 0.5)" },
  { x: 85, y: 15, size: 6, delay: 0.5, color: "oklch(0.65 0.18 290 / 0.5)" },
  { x: 20, y: 75, size: 3, delay: 1, color: "oklch(0.75 0.19 120 / 0.5)" },
  { x: 70, y: 80, size: 5, delay: 1.5, color: "oklch(0.7 0.18 200 / 0.4)" },
  { x: 50, y: 10, size: 4, delay: 0.8, color: "oklch(0.65 0.18 290 / 0.4)" },
  { x: 90, y: 55, size: 3, delay: 2, color: "oklch(0.75 0.19 120 / 0.4)" },
  { x: 5, y: 50, size: 5, delay: 1.2, color: "oklch(0.7 0.18 200 / 0.3)" },
  { x: 35, y: 90, size: 3, delay: 0.3, color: "oklch(0.65 0.18 290 / 0.35)" },
  { x: 60, y: 40, size: 2, delay: 2.5, color: "oklch(0.75 0.19 120 / 0.3)" },
];

const features = [
  { icon: Shield, label: "Zero-knowledge auth", color: "text-primary" },
  { icon: Zap, label: "Instant access", color: "text-accent" },
  {
    icon: Fingerprint,
    label: "Biometric-grade security",
    color: "text-secondary",
  },
];

export default function Login() {
  const {
    isAuthenticated,
    isLoggingIn,
    isProfileLoading,
    profile,
    isAdmin,
    login,
  } = useAuth();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || isProfileLoading || hasRedirected.current) return;
    hasRedirected.current = true;
    if (!profile) {
      navigate({ to: "/register" });
    } else if (isAdmin) {
      navigate({ to: "/admin" });
    } else {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, isProfileLoading, profile, isAdmin, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.7 0.18 200)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "oklch(0.65 0.18 290)" }}
        />
        <div
          className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.75 0.19 120)" }}
        />
      </div>

      {/* Particles */}
      {particles.map((p) => (
        <Particle key={`particle-${p.x}-${p.y}`} {...p} />
      ))}

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.18 200 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200 / 0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative z-10"
        data-ocid="login.page"
      >
        <GlassCard
          variant="neon-cyan"
          padding="none"
          className="overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-primary" />

          <div className="p-8">
            {/* Logo & title */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="relative w-16 h-16 mx-auto mb-4">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-cyan"
                  animate={{
                    boxShadow: [
                      "0 0 20px oklch(0.7 0.18 200 / 0.3)",
                      "0 0 40px oklch(0.7 0.18 200 / 0.6)",
                      "0 0 20px oklch(0.7 0.18 200 / 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Activity className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/40"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <h1 className="text-2xl font-display font-bold tracking-tight mb-1">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-primary">
                  MediBook Pro
                </span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Your intelligent healthcare companion
              </p>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              className="flex justify-center gap-3 mb-6 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {features.map(({ icon: Icon, label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-medium border border-border/20"
                >
                  <Icon className={`w-3 h-3 ${color}`} />
                  <span className="text-muted-foreground">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* II info card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mb-6"
            >
              <GlassCard
                variant="default"
                padding="sm"
                className="border border-primary/20"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "oklch(0.7 0.18 200 / 0.15)" }}
                  >
                    <Fingerprint className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">
                      Internet Identity
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Passwordless, cryptographic authentication. No emails, no
                      passwords — just you.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <NeonButton
                variant="cyan"
                size="lg"
                className="w-full"
                onClick={login}
                isLoading={isLoggingIn || isProfileLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                data-ocid="login.submit_button"
              >
                <AnimatePresence mode="wait">
                  {isLoggingIn ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Authenticating…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Sign In with Internet Identity
                    </motion.span>
                  )}
                </AnimatePresence>
              </NeonButton>
            </motion.div>

            {/* Register link */}
            <motion.p
              className="text-center text-xs text-muted-foreground mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              New patient?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
                data-ocid="login.register.link"
              >
                Create your profile
              </Link>
            </motion.p>
          </div>
        </GlassCard>

        {/* Subtle bottom tagline */}
        <motion.p
          className="text-center text-xs text-muted-foreground/50 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Secured by Internet Computer Protocol
        </motion.p>
      </motion.div>
    </div>
  );
}
