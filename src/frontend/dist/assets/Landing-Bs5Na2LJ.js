import { c as createLucideIcon, i as interpolate, f as frame, a as isMotionValue, J as JSAnimation, u as useConstant, m as motionValue, r as reactExports, M as MotionConfigContext, b as useIsomorphicLayoutEffect, d as cancelFrame, e as collectMotionValues, j as jsxRuntimeExports, g as useAuth, h as motion, L as Link, N as NeonButton, C as Calendar, S as Stethoscope, G as GlassCard } from "./index-xhhh4oaK.js";
import { C as ChevronRight } from "./chevron-right-B3XmZqdg.js";
import { S as Shield, Z as Zap } from "./zap-DeOnlD3I.js";
import { C as Clock } from "./clock-rF4d5V7x.js";
import { U as Users } from "./users-B_pZCUc1.js";
import { T as TrendingUp } from "./trending-up-Bo9NOHk5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function attachFollow(value, source, options = {}) {
  const initialValue = value.get();
  let activeAnimation = null;
  let latestValue = initialValue;
  let latestSetter;
  const unit = typeof initialValue === "string" ? initialValue.replace(/[\d.-]/g, "") : void 0;
  const stopAnimation = () => {
    if (activeAnimation) {
      activeAnimation.stop();
      activeAnimation = null;
    }
    value.animation = void 0;
  };
  const startAnimation = () => {
    const currentValue = asNumber(value.get());
    const targetValue = asNumber(latestValue);
    if (currentValue === targetValue) {
      stopAnimation();
      return;
    }
    const velocity = activeAnimation ? activeAnimation.getGeneratorVelocity() : value.getVelocity();
    stopAnimation();
    activeAnimation = new JSAnimation({
      keyframes: [currentValue, targetValue],
      velocity,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...options,
      onUpdate: latestSetter
    });
  };
  const scheduleAnimation = () => {
    var _a;
    startAnimation();
    value.animation = activeAnimation ?? void 0;
    (_a = value["events"].animationStart) == null ? void 0 : _a.notify();
    activeAnimation == null ? void 0 : activeAnimation.then(() => {
      var _a2;
      value.animation = void 0;
      (_a2 = value["events"].animationComplete) == null ? void 0 : _a2.notify();
    });
  };
  value.attach((v, set) => {
    latestValue = v;
    latestSetter = (latest) => set(parseValue(latest, unit));
    frame.postRender(scheduleAnimation);
  }, stopAnimation);
  if (isMotionValue(source)) {
    let skipNextAnimation = options.skipInitialAnimation === true;
    const removeSourceOnChange = source.on("change", (v) => {
      if (skipNextAnimation) {
        skipNextAnimation = false;
        value.jump(parseValue(v, unit), false);
      } else {
        value.set(parseValue(v, unit));
      }
    });
    const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
    return () => {
      removeSourceOnChange();
      removeValueOnDestroy();
    };
  }
  return stopAnimation;
}
function parseValue(v, unit) {
  return unit ? v + unit : v;
}
function asNumber(v) {
  return typeof v === "number" ? v : parseFloat(v);
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const isOutputMap = outputRangeOrMap !== void 0 && !Array.isArray(outputRangeOrMap) && typeof inputRangeOrTransformer !== "function";
  if (isOutputMap) {
    return useMapTransform(input, inputRangeOrTransformer, outputRangeOrMap, options);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useMapTransform(inputValue, inputRange, outputMap, options) {
  const keys = useConstant(() => Object.keys(outputMap));
  const output = useConstant(() => ({}));
  for (const key of keys) {
    output[key] = useTransform(inputValue, inputRange, outputMap[key], options);
  }
  return output;
}
function useFollowValue(source, options = {}) {
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  const getFromSource = () => isMotionValue(source) ? source.get() : source;
  if (isStatic) {
    return useTransform(getFromSource);
  }
  const value = useMotionValue(getFromSource());
  reactExports.useInsertionEffect(() => {
    return attachFollow(value, source, options);
  }, [value, JSON.stringify(options)]);
  return value;
}
function useSpring(source, options = {}) {
  return useFollowValue(source, { type: "spring", ...options });
}
function generateParticles(count) {
  const colors = ["cyan", "purple", "lime"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    opacity: 0.15 + Math.random() * 0.4,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
}
const colorMap = {
  cyan: "oklch(0.7 0.18 200)",
  purple: "oklch(0.65 0.18 290)",
  lime: "oklch(0.75 0.19 120)"
};
function FloatingParticles() {
  const [particles] = reactExports.useState(() => generateParticles(28));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 overflow-hidden pointer-events-none",
      "aria-hidden": "true",
      children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute rounded-full",
          style: {
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: colorMap[p.color],
            boxShadow: `0 0 ${p.size * 3}px ${colorMap[p.color]}`
          },
          animate: {
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [
              p.opacity,
              p.opacity * 0.4,
              p.opacity,
              p.opacity * 0.7,
              p.opacity
            ],
            scale: [1, 1.3, 0.8, 1.1, 1]
          },
          transition: {
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }
        },
        p.id
      ))
    }
  );
}
function AnimatedCounter({
  target,
  suffix = ""
}) {
  const [count, setCount] = reactExports.useState(0);
  const [inView, setInView] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  reactExports.useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps2 = 60;
    const increment = target / steps2;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps2);
    return () => clearInterval(timer);
  }, [inView, target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, className: "tabular-nums", children: [
    count.toLocaleString(),
    suffix
  ] });
}
function SectionLabel({ text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary shadow-glow-cyan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tracking-widest uppercase text-primary font-mono", children: text })
  ] });
}
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen overflow-hidden",
      "data-ocid": "landing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 -z-10",
            style: {
              background: "radial-gradient(ellipse 120% 80% at 50% -10%, oklch(0.2 0.06 250) 0%, oklch(0.12 0.04 230) 40%, oklch(0.08 0.02 260) 70%, oklch(0.05 0 0) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FooterSection, {})
      ]
    }
  );
}
function HeroSection() {
  const { isAuthenticated, login } = useAuth();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(smoothY, [-300, 300], [5, -5]);
  const rotateY = useTransform(smoothX, [-300, 300], [-5, 5]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16",
      onMouseMove: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      },
      "data-ocid": "landing.hero-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingParticles, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute w-[600px] h-[600px] rounded-full",
              style: {
                background: "radial-gradient(circle, oklch(0.7 0.18 200 / 0.12) 0%, transparent 70%)",
                top: "10%",
                left: "-10%"
              },
              animate: { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] },
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute w-[500px] h-[500px] rounded-full",
              style: {
                background: "radial-gradient(circle, oklch(0.65 0.18 290 / 0.1) 0%, transparent 70%)",
                top: "20%",
                right: "-5%"
              },
              animate: { scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] },
              transition: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-start",
              "data-ocid": "landing.hero-content",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { text: "AI-Powered Healthcare" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    className: "text-5xl md:text-6xl lg:text-7xl font-black font-display leading-[1.05] mb-6 tracking-tight",
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.1 },
                    children: [
                      "Your Health,",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-transparent bg-clip-text",
                          style: { backgroundImage: "var(--gradient-primary)" },
                          children: "Smarter"
                        }
                      ),
                      " ",
                      "Care"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    className: "text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed",
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.2 },
                    children: "Book appointments with top specialists, get AI-powered symptom analysis, and receive personalized care recommendations — all in one seamless platform."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "flex flex-wrap gap-4 mb-12",
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.3 },
                    children: [
                      isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/doctors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        NeonButton,
                        {
                          variant: "cyan",
                          size: "lg",
                          "data-ocid": "landing.book-appointment-cta",
                          children: [
                            "Book Appointment",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-1" })
                          ]
                        }
                      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        NeonButton,
                        {
                          variant: "cyan",
                          size: "lg",
                          onClick: login,
                          "data-ocid": "landing.book-appointment-cta",
                          children: [
                            "Book Appointment",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-1" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/doctors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        NeonButton,
                        {
                          variant: "ghost",
                          size: "lg",
                          "data-ocid": "landing.explore-doctors-cta",
                          children: "Explore Doctors"
                        }
                      ) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "flex items-center gap-6 text-sm text-muted-foreground",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.6, delay: 0.5 },
                    children: [
                      { icon: Shield, text: "HIPAA Compliant" },
                      { icon: Clock, text: "24/7 Available" },
                      { icon: Heart, text: "Trusted by 10k+" }
                    ].map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text })
                    ] }, text))
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative hidden lg:block",
              style: { rotateX, rotateY },
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.8, delay: 0.2 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden shadow-glow-cyan", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/hero-medical.dim_1200x800.jpg",
                      alt: "AI-powered medical appointment platform",
                      className: "w-full object-cover rounded-2xl",
                      style: { maxHeight: 480 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-2xl",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.7 0.18 200 / 0.08) 0%, oklch(0.65 0.18 290 / 0.04) 100%)"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "absolute -bottom-6 -left-8 glass-thick rounded-xl p-4 border border-primary/30 shadow-glow-cyan",
                    animate: { y: [0, -8, 0] },
                    transition: {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Today's Bookings" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-foreground font-display", children: "247" })
                      ] })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "absolute -top-4 -right-6 glass-thick rounded-xl p-4 border border-accent/30",
                    animate: { y: [0, 8, 0] },
                    transition: {
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-accent" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "AI Accuracy" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-foreground font-display", children: "98.7%" })
                      ] })
                    ] })
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
            animate: { y: [0, 8, 0] },
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            },
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tracking-widest uppercase font-mono", children: "Scroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" })
            ]
          }
        )
      ]
    }
  );
}
const features = [
  {
    icon: Brain,
    title: "AI-Powered Care",
    description: "Our intelligent symptom analyzer uses advanced ML to match you with the right specialist instantly — no guesswork, no delays.",
    variant: "neon-cyan",
    iconColor: "text-primary",
    iconBg: "bg-primary/15"
  },
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    description: "Connect with 500+ board-certified specialists across 40+ departments. All doctors are fully verified and reviewed by real patients.",
    variant: "neon-purple",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15"
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Interactive calendar with real-time slot availability. Book, reschedule, or cancel appointments in seconds from any device.",
    variant: "neon-lime",
    iconColor: "text-accent",
    iconBg: "bg-accent/15"
  }
];
function FeaturesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "relative py-24 px-4",
      style: { background: "oklch(0.08 0.015 250 / 0.5)" },
      "data-ocid": "landing.features-section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-16",
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { text: "Why Choose MedAI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-black font-display mt-2 mb-4", children: [
                "Healthcare",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-transparent bg-clip-text",
                    style: { backgroundImage: "var(--gradient-accent)" },
                    children: "Reimagined"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: "We combine cutting-edge AI with a seamless experience to make quality healthcare accessible to everyone." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: features.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.12 },
            whileHover: { y: -6 },
            "data-ocid": `landing.feature-card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                variant: feat.variant,
                padding: "lg",
                className: "h-full transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-14 h-14 rounded-2xl ${feat.iconBg} flex items-center justify-center mb-5 border border-current/10`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(feat.icon, { className: `w-7 h-7 ${feat.iconColor}` })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold font-display mb-3", children: feat.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: feat.description })
                ]
              }
            )
          },
          feat.title
        )) })
      ] })
    }
  );
}
const steps = [
  {
    number: "01",
    title: "Describe Symptoms",
    description: "Use our AI chatbot to describe your symptoms. Our NLP engine analyzes and identifies potential conditions in real time.",
    icon: MessageSquare,
    borderColor: "border-primary/60",
    iconColor: "text-primary",
    glowClass: "shadow-glow-cyan"
  },
  {
    number: "02",
    title: "Get Matched",
    description: "Receive AI-powered doctor recommendations tailored to your condition, location preferences, and schedule.",
    icon: Zap,
    borderColor: "border-secondary/60",
    iconColor: "text-secondary",
    glowClass: "shadow-glow-purple"
  },
  {
    number: "03",
    title: "Book & Confirm",
    description: "Pick your preferred time slot on the interactive calendar and confirm your appointment with one click.",
    icon: Calendar,
    borderColor: "border-accent/60",
    iconColor: "text-accent",
    glowClass: ""
  }
];
function HowItWorksSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "relative py-24 px-4",
      "data-ocid": "landing.how-it-works-section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-16",
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { text: "How It Works" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-black font-display mt-2 mb-4", children: [
                "Three Steps to",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-transparent bg-clip-text",
                    style: { backgroundImage: "var(--gradient-primary)" },
                    children: "Better Health"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-12 left-[16.5%] right-[16.5%] h-0.5 hidden md:block",
              style: {
                background: "linear-gradient(90deg, oklch(0.7 0.18 200 / 0.4) 0%, oklch(0.65 0.18 290 / 0.4) 50%, oklch(0.75 0.19 120 / 0.4) 100%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8 relative z-10", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col items-center text-center",
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: i * 0.15 },
              "data-ocid": `landing.step-card.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: `w-24 h-24 rounded-full glass border-2 ${step.borderColor} flex flex-col items-center justify-center mb-6 ${step.glowClass}`,
                    whileHover: { scale: 1.08 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: `w-7 h-7 ${step.iconColor} mb-1` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs font-black font-mono ${step.iconColor}`,
                          children: step.number
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { variant: "default", padding: "md", className: "w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold font-display mb-2", children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: step.description })
                ] })
              ]
            },
            step.number
          )) })
        ] })
      ] })
    }
  );
}
const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Expert Doctors",
    icon: Stethoscope,
    color: "text-primary"
  },
  {
    value: 1e4,
    suffix: "+",
    label: "Happy Patients",
    icon: Users,
    color: "text-secondary"
  },
  {
    value: 99,
    suffix: "%",
    label: "Satisfaction Rate",
    icon: Star,
    color: "text-accent"
  },
  {
    value: 40,
    suffix: "+",
    label: "Specializations",
    icon: TrendingUp,
    color: "text-primary"
  }
];
function StatsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative py-20 px-4 overflow-hidden",
      style: { background: "oklch(0.08 0.015 250 / 0.5)" },
      "data-ocid": "landing.stats-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.7 0.18 200 / 0.06) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.8 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.1 },
            whileHover: { scale: 1.05 },
            "data-ocid": `landing.stat-card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                variant: "elevated",
                padding: "md",
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `w-8 h-8 ${stat.color} mx-auto mb-3` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `text-3xl md:text-4xl font-black font-display mb-1 ${stat.color}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: stat.value, suffix: stat.suffix })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-medium", children: stat.label })
                ]
              }
            )
          },
          stat.label
        )) }) })
      ]
    }
  );
}
const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer",
    initials: "SM",
    rating: 5,
    text: "The AI symptom checker was incredibly accurate — it matched me with the right cardiologist within minutes. The booking process was effortlessly smooth."
  },
  {
    name: "James Okafor",
    role: "Marketing Director",
    initials: "JO",
    rating: 5,
    text: "I've been managing my family's health appointments through MedAI for 6 months. Smart reminders mean we've never missed a consultation. Absolutely love it."
  },
  {
    name: "Priya Nair",
    role: "University Student",
    initials: "PN",
    rating: 5,
    text: "As a student with a busy schedule, flexible rescheduling and the AI chatbot have been lifesavers. The interface is stunning and incredibly easy to navigate."
  }
];
function TestimonialsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "relative py-24 px-4",
      "data-ocid": "landing.testimonials-section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-16",
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { text: "Patient Stories" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-black font-display mt-2 mb-4", children: [
                "Loved by",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-transparent bg-clip-text",
                    style: { backgroundImage: "var(--gradient-primary)" },
                    children: "Thousands"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.12 },
            whileHover: { y: -4 },
            "data-ocid": `landing.testimonial-card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { variant: "elevated", padding: "lg", className: "h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4", children: Array.from({ length: t.rating }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: "w-4 h-4 fill-accent text-accent"
                },
                `star-${t.name}-${j}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/90 leading-relaxed mb-6 italic", children: [
                '"',
                t.text,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-border/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-display text-primary-foreground shrink-0",
                    style: { background: "var(--gradient-primary)" },
                    children: t.initials
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold font-display text-sm truncate", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.role })
                ] })
              ] })
            ] })
          },
          t.name
        )) })
      ] })
    }
  );
}
function FooterSection() {
  const { isAuthenticated, login } = useAuth();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? encodeURIComponent(window.location.hostname) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-24 px-4 overflow-hidden",
        style: { background: "oklch(0.08 0.015 250 / 0.7)" },
        "data-ocid": "landing.cta-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 100% 100% at 50% 50%, oklch(0.65 0.18 290 / 0.08) 0%, transparent 60%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-3xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-black font-display mb-4", children: [
                  "Ready for",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-transparent bg-clip-text",
                      style: { backgroundImage: "var(--gradient-accent)" },
                      children: "Smarter Care?"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8", children: "Join thousands of patients who've already transformed their healthcare journey." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
                  isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    NeonButton,
                    {
                      variant: "lime",
                      size: "lg",
                      "data-ocid": "landing.footer-cta-dashboard",
                      children: [
                        "Go to Dashboard",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-1" })
                      ]
                    }
                  ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    NeonButton,
                    {
                      variant: "lime",
                      size: "lg",
                      onClick: login,
                      "data-ocid": "landing.footer-cta-register",
                      children: [
                        "Create Free Account",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-1" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/doctors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NeonButton,
                    {
                      variant: "ghost",
                      size: "lg",
                      "data-ocid": "landing.footer-cta-doctors",
                      children: "Browse Doctors"
                    }
                  ) })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "footer",
      {
        className: "py-10 px-4 border-t border-border/20",
        style: { background: "oklch(0.07 0.01 250)" },
        "data-ocid": "landing.footer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                style: { background: "var(--gradient-primary)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-primary-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold font-display text-sm", children: "MedAI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Your AI Health Partner" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center", children: [
            "© ",
            year,
            ". Built with love using",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:text-primary/80 transition-colors",
                children: "caffeine.ai"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-6 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/doctors",
                className: "hover:text-primary transition-colors",
                children: "Doctors"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "hover:text-primary transition-colors", children: "Sign In" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/register",
                className: "hover:text-primary transition-colors",
                children: "Register"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Landing as default
};
