import { c as createLucideIcon, g as useAuth, n as useBackend, k as useNavigate, o as useQueryClient, r as reactExports, j as jsxRuntimeExports, h as motion, G as GlassCard, A as Activity, l as AnimatePresence, C as Calendar, N as NeonButton, L as Link } from "./index-xhhh4oaK.js";
import { u as useToast } from "./useToast-CprK_yTD.js";
import { U as User } from "./user-BUxIxHHX.js";
import { A as ArrowRight } from "./arrow-right-CJiLKHwZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function validate(form) {
  const errs = {};
  if (!form.name.trim()) errs.name = "Full name is required";
  if (!form.email.trim()) {
    errs.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) {
    errs.phone = "Phone number is required";
  } else if (!/^\+?[\d\s\-().]{7,20}$/.test(form.phone)) {
    errs.phone = "Enter a valid phone number";
  }
  if (!form.dateOfBirth) errs.dateOfBirth = "Date of birth is required";
  return errs;
}
function FloatingInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  icon: Icon,
  placeholder,
  error
}) {
  const [isFocused, setIsFocused] = reactExports.useState(false);
  const hasValue = value.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `relative rounded-xl border transition-all duration-200 ${error ? "border-destructive/60 shadow-[0_0_8px_oklch(0.62_0.19_15_/_0.2)]" : isFocused ? "border-primary/60 shadow-[0_0_12px_oklch(0.7_0.18_200_/_0.15)]" : "border-border/40"}`,
        style: { background: "oklch(var(--input))" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.label,
            {
              htmlFor: id,
              className: "absolute left-11 pointer-events-none font-medium select-none",
              animate: {
                top: isFocused || hasValue ? "6px" : "50%",
                y: isFocused || hasValue ? "0%" : "-50%",
                fontSize: isFocused || hasValue ? "10px" : "14px",
                color: isFocused ? "oklch(0.7 0.18 200)" : error ? "oklch(0.62 0.19 15)" : "oklch(0.65 0 0)"
              },
              transition: { duration: 0.18, ease: "easeOut" },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon,
            {
              className: `w-4 h-4 transition-colors duration-200 ${error ? "text-destructive/70" : isFocused ? "text-primary" : "text-muted-foreground"}`
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id,
              type,
              value,
              onChange: (e) => onChange(e.target.value),
              onFocus: () => setIsFocused(true),
              onBlur: () => {
                setIsFocused(false);
                onBlur();
              },
              placeholder: isFocused ? placeholder : "",
              className: "w-full pt-5 pb-2 pl-10 pr-4 bg-transparent text-foreground text-sm focus:outline-none",
              "data-ocid": `register.${id}.input`,
              "aria-invalid": !!error,
              "aria-describedby": error ? `${id}-error` : void 0,
              max: type === "date" ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : void 0
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        id: `${id}-error`,
        className: "text-xs text-destructive mt-1 ml-1",
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: 0.2 },
        "data-ocid": `register.${id}.field_error`,
        children: error
      }
    ) })
  ] });
}
const STEPS = ["Personal Info", "Contact", "Confirm"];
function ProgressSteps({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-6", children: STEPS.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${i < current ? "bg-primary border-primary text-primary-foreground" : i === current ? "border-primary text-primary" : "border-border/40 text-muted-foreground"}`,
          animate: {
            scale: i === current ? [1, 1.1, 1] : 1,
            boxShadow: i === current ? "0 0 12px oklch(0.7 0.18 200 / 0.4)" : "none"
          },
          transition: { duration: 0.4 },
          children: i < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-[9px] font-medium whitespace-nowrap transition-colors duration-200 ${i === current ? "text-primary" : "text-muted-foreground/60"}`,
          children: label
        }
      )
    ] }),
    i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-0.5 rounded-full mb-3 overflow-hidden bg-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "h-full bg-primary",
        animate: { width: i < current ? "100%" : "0%" },
        transition: { duration: 0.4, ease: "easeInOut" }
      }
    ) })
  ] }, label)) });
}
const initialForm = {
  name: "",
  email: "",
  phone: "",
  dateOfBirth: ""
};
function Register() {
  const { isAuthenticated, isLoggingIn, login } = useAuth();
  const { actor } = useBackend();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasTriggeredLogin = reactExports.useRef(false);
  const [form, setForm] = reactExports.useState(initialForm);
  const [touched, setTouched] = reactExports.useState(
    {}
  );
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [isSuccess, setIsSuccess] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated && !isLoggingIn && !hasTriggeredLogin.current) {
      hasTriggeredLogin.current = true;
      login();
    }
  }, [isAuthenticated, isLoggingIn, login]);
  const setField = (field) => (v) => setForm((prev) => ({ ...prev, [field]: v }));
  const touchField = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));
  const errors = validate(form);
  const touchedErrors = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k])
  );
  const completedName = form.name.trim().length > 0 && !errors.name;
  const completedContact = form.email.trim().length > 0 && !errors.email && form.phone.trim().length > 0 && !errors.phone;
  const currentStep = !completedName ? 0 : !completedContact ? 1 : 2;
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, dateOfBirth: true });
    const allErrors = validate(form);
    if (Object.keys(allErrors).length > 0) {
      error("Incomplete form", "Please fill in all required fields correctly.");
      return;
    }
    if (!actor) {
      error("Not connected", "Please wait while we connect to the backend.");
      return;
    }
    setIsSubmitting(true);
    try {
      const actorAny = actor;
      await actorAny.registerPatient(form);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsSuccess(true);
      success(
        "Welcome to MediBook Pro!",
        "Your profile has been created successfully."
      );
      setTimeout(() => navigate({ to: "/dashboard" }), 1500);
    } catch {
      error("Registration failed", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl",
          style: { background: "oklch(0.65 0.18 290)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl",
          style: { background: "oklch(0.7 0.18 200)" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 40, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
        className: "w-full max-w-md relative z-10",
        "data-ocid": "register.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            variant: "neon-purple",
            padding: "none",
            className: "overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1 w-full",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.65 0.18 290), oklch(0.7 0.18 200))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "text-center mb-6",
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.15, duration: 0.5 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-14 h-14 mx-auto mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-14 h-14 rounded-2xl flex items-center justify-center shadow-glow-purple",
                            style: {
                              background: "linear-gradient(135deg, oklch(0.65 0.18 290), oklch(0.7 0.18 200))"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-7 h-7 text-primary-foreground" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            className: "absolute inset-0 rounded-2xl border-2 border-secondary/50",
                            animate: { scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] },
                            transition: {
                              duration: 2.8,
                              repeat: Number.POSITIVE_INFINITY
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold tracking-tight mb-1", children: [
                        "Create Your",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-transparent bg-clip-text",
                            style: {
                              backgroundImage: "linear-gradient(135deg, oklch(0.65 0.18 290), oklch(0.7 0.18 200))"
                            },
                            children: "Profile"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Set up your patient profile to get started" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.25 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressSteps, { current: currentStep })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "absolute inset-0 z-20 flex flex-col items-center justify-center glass-thick rounded-2xl",
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.4, ease: "easeOut" },
                    "data-ocid": "register.success_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { scale: 0 },
                          animate: { scale: 1 },
                          transition: { delay: 0.2, type: "spring", stiffness: 200 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-16 h-16 text-accent mb-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold mb-1", children: "You're all set!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Redirecting to your dashboard…" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -16 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.3, duration: 0.4 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FloatingInput,
                        {
                          id: "name",
                          label: "Full Name",
                          value: form.name,
                          onChange: setField("name"),
                          onBlur: touchField("name"),
                          icon: User,
                          placeholder: "Jane Smith",
                          error: touchedErrors.name
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -16 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.37, duration: 0.4 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FloatingInput,
                        {
                          id: "email",
                          label: "Email Address",
                          value: form.email,
                          onChange: setField("email"),
                          onBlur: touchField("email"),
                          icon: Mail,
                          type: "email",
                          placeholder: "jane@example.com",
                          error: touchedErrors.email
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -16 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.44, duration: 0.4 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FloatingInput,
                        {
                          id: "phone",
                          label: "Phone Number",
                          value: form.phone,
                          onChange: setField("phone"),
                          onBlur: touchField("phone"),
                          icon: Phone,
                          placeholder: "+1 555 0100",
                          error: touchedErrors.phone
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -16 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.51, duration: 0.4 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FloatingInput,
                        {
                          id: "dateOfBirth",
                          label: "Date of Birth",
                          value: form.dateOfBirth,
                          onChange: setField("dateOfBirth"),
                          onBlur: touchField("dateOfBirth"),
                          icon: Calendar,
                          type: "date",
                          error: touchedErrors.dateOfBirth
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.58, duration: 0.4 },
                      className: "pt-1",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        NeonButton,
                        {
                          variant: "purple",
                          size: "lg",
                          type: "submit",
                          className: "w-full",
                          isLoading: isSubmitting,
                          rightIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }),
                          "data-ocid": "register.submit_button",
                          children: "Complete Registration"
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.p,
                  {
                    className: "text-center text-xs text-muted-foreground mt-5",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.65 },
                    children: [
                      "Already registered?",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/login",
                          className: "text-secondary hover:text-secondary/80 transition-colors font-medium",
                          "data-ocid": "register.login.link",
                          children: "Sign in instead"
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  Register as default
};
