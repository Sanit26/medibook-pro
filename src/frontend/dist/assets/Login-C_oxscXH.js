import { c as createLucideIcon, g as useAuth, k as useNavigate, r as reactExports, j as jsxRuntimeExports, h as motion, G as GlassCard, A as Activity, N as NeonButton, l as AnimatePresence, L as Link } from "./index-xhhh4oaK.js";
import { S as Shield, Z as Zap } from "./zap-DeOnlD3I.js";
import { A as ArrowRight } from "./arrow-right-CJiLKHwZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const Fingerprint = createLucideIcon("fingerprint", __iconNode);
function Particle({
  x,
  y,
  size,
  delay,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute rounded-full pointer-events-none",
      style: {
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color
      },
      animate: {
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1]
      },
      transition: {
        duration: 4 + Math.random() * 3,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut"
      }
    }
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
  { x: 60, y: 40, size: 2, delay: 2.5, color: "oklch(0.75 0.19 120 / 0.3)" }
];
const features = [
  { icon: Shield, label: "Zero-knowledge auth", color: "text-primary" },
  { icon: Zap, label: "Instant access", color: "text-accent" },
  {
    icon: Fingerprint,
    label: "Biometric-grade security",
    color: "text-secondary"
  }
];
function Login() {
  const {
    isAuthenticated,
    isLoggingIn,
    isProfileLoading,
    profile,
    isAdmin,
    login
  } = useAuth();
  const navigate = useNavigate();
  const hasRedirected = reactExports.useRef(false);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-1/4 left-1/5 w-96 h-96 rounded-full opacity-20 blur-3xl",
          style: { background: "oklch(0.7 0.18 200)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full opacity-15 blur-3xl",
          style: { background: "oklch(0.65 0.18 290)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-2/3 left-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl",
          style: { background: "oklch(0.75 0.19 120)" }
        }
      )
    ] }),
    particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Particle, { ...p }, `particle-${p.x}-${p.y}`)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 pointer-events-none opacity-5",
        style: {
          backgroundImage: "linear-gradient(oklch(0.7 0.18 200 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200 / 0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        className: "w-full max-w-md relative z-10",
        "data-ocid": "login.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              variant: "neon-cyan",
              padding: "none",
              className: "overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      className: "text-center mb-8",
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.15, duration: 0.5 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16 mx-auto mb-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              className: "w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-cyan",
                              animate: {
                                boxShadow: [
                                  "0 0 20px oklch(0.7 0.18 200 / 0.3)",
                                  "0 0 40px oklch(0.7 0.18 200 / 0.6)",
                                  "0 0 20px oklch(0.7 0.18 200 / 0.3)"
                                ]
                              },
                              transition: {
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 text-primary-foreground" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              className: "absolute inset-0 rounded-2xl border-2 border-primary/40",
                              animate: { scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] },
                              transition: {
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut"
                              }
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold tracking-tight mb-1", children: [
                          "Welcome to",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-primary", children: "MediBook Pro" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your intelligent healthcare companion" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "flex justify-center gap-3 mb-6 flex-wrap",
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.25, duration: 0.5 },
                      children: features.map(({ icon: Icon, label, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, x: -10 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: 0.3 + i * 0.1 },
                          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-medium border border-border/20",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-3 h-3 ${color}` }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label })
                          ]
                        },
                        label
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.4, duration: 0.4 },
                      className: "mb-6",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        GlassCard,
                        {
                          variant: "default",
                          padding: "sm",
                          className: "border border-primary/20",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                style: { background: "oklch(0.7 0.18 200 / 0.15)" },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "w-4 h-4 text-primary" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-0.5", children: "Internet Identity" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Passwordless, cryptographic authentication. No emails, no passwords — just you." })
                            ] })
                          ] })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.5, duration: 0.4 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        NeonButton,
                        {
                          variant: "cyan",
                          size: "lg",
                          className: "w-full",
                          onClick: login,
                          isLoading: isLoggingIn || isProfileLoading,
                          rightIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }),
                          "data-ocid": "login.submit_button",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.span,
                            {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              children: "Authenticating…"
                            },
                            "loading"
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.span,
                            {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              children: "Sign In with Internet Identity"
                            },
                            "idle"
                          ) })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.p,
                    {
                      className: "text-center text-xs text-muted-foreground mt-5",
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.6 },
                      children: [
                        "New patient?",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/register",
                            className: "text-primary hover:text-primary/80 transition-colors font-medium",
                            "data-ocid": "login.register.link",
                            children: "Create your profile"
                          }
                        )
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-center text-xs text-muted-foreground/50 mt-4",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.7 },
              children: "Secured by Internet Computer Protocol"
            }
          )
        ]
      }
    )
  ] });
}
export {
  Login as default
};
