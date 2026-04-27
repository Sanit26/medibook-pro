import { g as useAuth, n as useBackend, p as useQuery, C as Calendar, w as CircleCheckBig, j as jsxRuntimeExports, h as motion, K as CardSkeleton, q as StaggerContainer, L as Link, O as Skeleton, G as GlassCard, N as NeonButton, l as AnimatePresence, S as Stethoscope, A as Activity, s as StaggerItem, r as reactExports } from "./index-xhhh4oaK.js";
import { C as Clock } from "./clock-rF4d5V7x.js";
import { T as TrendingUp } from "./trending-up-Bo9NOHk5.js";
import { A as ArrowRight } from "./arrow-right-CJiLKHwZ.js";
function useCountUp(target, duration = 1e3, enabled = true) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!enabled || target === 0) {
      setCount(target);
      return;
    }
    const start = performance.now();
    let raf;
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled]);
  return count;
}
function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  color,
  neonVariant,
  idx,
  ready
}) {
  const displayed = useCountUp(value, 900 + idx * 100, ready);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      variant: neonVariant,
      className: "hover:scale-[1.03] cursor-default",
      "data-ocid": `dashboard.stat.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center mb-4 ${color}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-bold mb-1", children: displayed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground mb-1", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: delta })
      ]
    }
  ) });
}
function StatusBadge({ status }) {
  const variants = {
    Upcoming: "bg-primary/15 text-primary border-primary/25",
    Completed: "bg-accent/15 text-accent border-accent/25",
    Cancelled: "bg-destructive/15 text-destructive border-destructive/25"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-[10px] font-semibold px-2 py-0.5 rounded-full border ${variants[status] ?? variants.Upcoming}`,
      children: status
    }
  );
}
function DoctorAvatar({ name }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0", children: initials });
}
const QUICK_LINKS = [
  {
    to: "/doctors",
    icon: Stethoscope,
    label: "Find a Doctor",
    desc: "Search by specialty",
    color: "text-primary",
    border: "border-primary/20 hover:border-primary/50 hover:bg-primary/5",
    ocid: "dashboard.quick_link.find_doctor"
  },
  {
    to: "/appointments",
    icon: Calendar,
    label: "My Appointments",
    desc: "View & manage",
    color: "text-secondary",
    border: "border-secondary/20 hover:border-secondary/50 hover:bg-secondary/5",
    ocid: "dashboard.quick_link.appointments"
  }
];
function Dashboard() {
  var _a;
  const { profile } = useAuth();
  const { actor, isLoading: backendLoading } = useBackend();
  const firstName = ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")[0]) ?? "there";
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.getMyAppointments();
        return result;
      } catch {
        return [];
      }
    },
    enabled: !backendLoading
  });
  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.listDoctors();
        return result;
      } catch {
        return [];
      }
    },
    enabled: !backendLoading
  });
  const doctorMap = new Map(doctors.map((d) => [d.id, d.name]));
  const total = appointments.length;
  const upcoming = appointments.filter((a) => a.status === "Upcoming").length;
  const completed = appointments.filter((a) => a.status === "Completed").length;
  const recent = appointments.slice(0, 3);
  const statsReady = !isLoading;
  const stats = [
    {
      label: "Total Appointments",
      value: total,
      icon: Calendar,
      delta: `${upcoming} upcoming`,
      color: "text-primary",
      neonVariant: "neon-cyan"
    },
    {
      label: "Upcoming",
      value: upcoming,
      icon: Clock,
      delta: upcoming > 0 ? "Scheduled ahead" : "None scheduled",
      color: "text-secondary",
      neonVariant: "neon-purple"
    },
    {
      label: "Completed",
      value: completed,
      icon: CircleCheckBig,
      delta: "Past visits",
      color: "text-accent",
      neonVariant: "neon-lime"
    },
    {
      label: "Active Doctors",
      value: new Set(appointments.map((a) => a.doctorId)).size,
      icon: TrendingUp,
      delta: "Unique providers",
      color: "text-primary",
      neonVariant: "neon-cyan"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-10",
        "data-ocid": "dashboard.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-1 font-medium tracking-wide uppercase", children: "Good day" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-display font-bold leading-tight", children: [
            "Welcome back,",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-primary bg-clip-text text-transparent", children: firstName }),
            " ",
            "👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Here's your health overview — stay on top of your appointments." })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, i)
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10", children: stats.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s, idx, ready: statsReady }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl", children: "Recent Appointments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/appointments",
              className: "text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-medium",
              "data-ocid": "dashboard.view_all_appointments.link",
              children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "dashboard.appointments.list", children: isLoading ? Array.from({ length: 3 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[72px] rounded-xl" }, i)
        )) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            "data-ocid": "dashboard.appointments.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                variant: "default",
                padding: "md",
                className: "text-center py-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-1", children: "No appointments yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Book your first consultation to get started." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/doctors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NeonButton,
                    {
                      variant: "cyan",
                      size: "sm",
                      "data-ocid": "dashboard.empty.book_button",
                      children: "Find a Doctor"
                    }
                  ) })
                ]
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: recent.map((appt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: idx * 0.12 + 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                variant: "elevated",
                padding: "sm",
                className: "flex items-center gap-3 hover:border-primary/30",
                "data-ocid": `dashboard.appointment.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DoctorAvatar,
                    {
                      name: doctorMap.get(appt.doctorId) ?? `Doctor #${appt.doctorId.toString()}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate", children: doctorMap.get(appt.doctorId) ?? `Doctor #${appt.doctorId.toString()}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 shrink-0" }),
                      appt.date,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-0.5", children: "·" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 shrink-0" }),
                      appt.timeSlot
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: appt.status })
                ]
              }
            )
          },
          appt.id.toString()
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl mb-5", children: "Quick Actions" }),
        QUICK_LINKS.map(
          ({ to, icon: Icon, label, desc, color, border, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileHover: { scale: 1.02 },
              whileTap: { scale: 0.98 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassCard,
                {
                  variant: "default",
                  padding: "sm",
                  className: `flex items-center gap-3 border ${border} mb-3`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center ${color}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
                  ]
                }
              )
            }
          ) }, to)
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            variant: "neon-purple",
            padding: "sm",
            className: "relative overflow-hidden mt-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -top-6 w-20 h-20 rounded-full bg-secondary/20 blur-2xl pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-secondary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "AI Health Insights" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 leading-relaxed", children: "Get personalized doctor recommendations based on your symptom history and past visits." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NeonButton,
                {
                  variant: "purple",
                  size: "sm",
                  className: "w-full",
                  "data-ocid": "dashboard.ai_insights.button",
                  children: "Explore AI Features"
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
