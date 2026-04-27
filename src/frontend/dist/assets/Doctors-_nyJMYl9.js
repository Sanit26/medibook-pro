import { c as createLucideIcon, n as useBackend, r as reactExports, p as useQuery, j as jsxRuntimeExports, h as motion, D as DoctorCardSkeleton, q as StaggerContainer, k as useNavigate, s as StaggerItem, G as GlassCard, S as Stethoscope, C as Calendar, N as NeonButton } from "./index-xhhh4oaK.js";
import { S as Search } from "./search-CLfPblfi.js";
import { D as DollarSign } from "./dollar-sign-DYUN68Mp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
];
const UserRound = createLucideIcon("user-round", __iconNode);
const DEMO_DOCTORS = [
  {
    id: BigInt(1),
    name: "Dr. Sarah Mitchell",
    specialization: "Cardiology",
    fees: BigInt(150),
    availability: [
      { day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
      { day: "Wednesday", slots: ["10:00 AM", "3:00 PM"] }
    ],
    isActive: true,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(2),
    name: "Dr. James Chen",
    specialization: "Neurology",
    fees: BigInt(200),
    availability: [
      { day: "Tuesday", slots: ["10:00 AM", "1:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM"] }
    ],
    isActive: true,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(3),
    name: "Dr. Priya Sharma",
    specialization: "Dermatology",
    fees: BigInt(120),
    availability: [
      { day: "Wednesday", slots: ["9:00 AM", "3:00 PM"] },
      { day: "Friday", slots: ["11:00 AM"] }
    ],
    isActive: true,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(4),
    name: "Dr. Robert Davis",
    specialization: "Orthopedics",
    fees: BigInt(175),
    availability: [
      { day: "Thursday", slots: ["11:00 AM", "2:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM"] }
    ],
    isActive: true,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(5),
    name: "Dr. Emily White",
    specialization: "Pediatrics",
    fees: BigInt(130),
    availability: [
      { day: "Friday", slots: ["9:00 AM", "10:30 AM"] },
      { day: "Monday", slots: ["2:00 PM"] }
    ],
    isActive: true,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(6),
    name: "Dr. Michael Brown",
    specialization: "General Medicine",
    fees: BigInt(100),
    availability: [
      { day: "Monday", slots: ["8:00 AM", "12:00 PM", "4:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM"] }
    ],
    isActive: false,
    createdAt: BigInt(0)
  }
];
const SPEC_COLORS = {
  Cardiology: "text-primary border-primary/40 bg-primary/10",
  Neurology: "text-secondary border-secondary/40 bg-secondary/10",
  Dermatology: "text-accent border-accent/40 bg-accent/10",
  Orthopedics: "text-[oklch(0.72_0.18_50)] border-[oklch(0.72_0.18_50)]/40 bg-[oklch(0.72_0.18_50)]/10",
  Pediatrics: "text-[oklch(0.72_0.16_255)] border-[oklch(0.72_0.16_255)]/40 bg-[oklch(0.72_0.16_255)]/10"
};
const AVATAR_GRADIENTS = [
  "from-primary/70 via-secondary/40 to-primary/20",
  "from-secondary/70 via-primary/40 to-secondary/20",
  "from-accent/70 via-primary/40 to-accent/20",
  "from-primary/50 via-accent/40 to-secondary/30",
  "from-secondary/50 via-accent/30 to-primary/30",
  "from-accent/50 via-secondary/30 to-primary/30"
];
function getSpecColor(spec) {
  if (spec in SPEC_COLORS) return SPEC_COLORS[spec];
  let hash = 0;
  for (let i = 0; i < spec.length; i++) hash = spec.charCodeAt(i) + hash * 31;
  const fallbacks = Object.values(SPEC_COLORS);
  return fallbacks[Math.abs(hash) % fallbacks.length];
}
function getInitials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}
function AvatarCircle({
  name,
  index
}) {
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center border border-white/10 shadow-lg font-display font-bold text-lg text-foreground flex-shrink-0`,
      children: getInitials(name)
    }
  );
}
function DoctorCard({
  doctor,
  index
}) {
  const navigate = useNavigate();
  const specColor = getSpecColor(doctor.specialization);
  const availDays = doctor.availability.map((d) => d.day.slice(0, 3));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      whileHover: { scale: 1.02, y: -4 },
      transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
      "data-ocid": `doctors.item.${index + 1}`,
      className: "h-full",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          variant: "default",
          padding: "none",
          className: "h-full flex flex-col hover:border-primary/30 hover:shadow-glow-cyan group overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-accent opacity-50 group-hover:opacity-100 transition-opacity duration-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-4 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarCircle, { name: doctor.name, index }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-display font-bold text-base text-foreground leading-snug truncate",
                      title: doctor.name,
                      children: doctor.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 text-xs font-semibold rounded-full border ${specColor}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { size: 10 }),
                        doctor.specialization
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 14, className: "text-accent flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Consultation Fee:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-accent ml-auto", children: [
                  "$",
                  Number(doctor.fees)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-primary flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Available on" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: availDays.length > 0 ? availDays.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "px-2 py-0.5 text-xs rounded-md border border-primary/25 bg-primary/8 text-primary font-medium",
                    children: day
                  },
                  day
                )) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "No schedule set" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between gap-3 pt-3 border-t border-border/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `flex items-center gap-1.5 text-xs font-medium ${doctor.isActive ? "text-accent" : "text-muted-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `w-1.5 h-1.5 rounded-full ${doctor.isActive ? "bg-accent animate-pulse" : "bg-muted-foreground"}`
                        }
                      ),
                      doctor.isActive ? "Available" : "Unavailable"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NeonButton,
                  {
                    variant: "cyan",
                    size: "sm",
                    "data-ocid": `doctors.book_button.${index + 1}`,
                    disabled: !doctor.isActive,
                    onClick: () => navigate({
                      to: "/book/$doctorId",
                      params: { doctorId: doctor.id.toString() }
                    }),
                    children: "Book Now"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) });
}
function EmptyState({ query, spec }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: "easeOut" },
      className: "col-span-full flex flex-col items-center justify-center py-20 gap-5",
      "data-ocid": "doctors.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted/40 border border-border/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 40, className: "text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: [1, 1.18, 1], opacity: [0.2, 0.5, 0.2] },
              transition: {
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              className: "absolute inset-0 rounded-full border border-primary/20"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: [1, 1.35, 1], opacity: [0.1, 0.3, 0.1] },
              transition: {
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.4
              },
              className: "absolute inset-0 rounded-full border border-primary/10"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg text-foreground", children: "No doctors found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: query || spec !== "All" ? `No results for "${query || spec}". Try adjusting your search or filter.` : "No doctors are currently registered." })
        ] })
      ]
    }
  );
}
function DoctorsPage() {
  const { actor, isLoading: backendLoading } = useBackend();
  const [query, setQuery] = reactExports.useState("");
  const [selectedSpec, setSelectedSpec] = reactExports.useState("All");
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return DEMO_DOCTORS;
      try {
        const result = await actor.listDoctors();
        return result.length > 0 ? result : DEMO_DOCTORS;
      } catch {
        return DEMO_DOCTORS;
      }
    },
    enabled: !backendLoading
  });
  const specializations = reactExports.useMemo(() => {
    const specs = Array.from(
      new Set(doctors.map((d) => d.specialization).filter(Boolean))
    );
    return ["All", ...specs.sort()];
  }, [doctors]);
  const filtered = reactExports.useMemo(() => {
    return doctors.filter((d) => {
      const matchSpec = selectedSpec === "All" || d.specialization === selectedSpec;
      const q = query.toLowerCase();
      const matchQuery = !q || d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q);
      return matchSpec && matchQuery;
    });
  }, [doctors, query, selectedSpec]);
  const showLoading = isLoading || backendLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
        className: "mb-10",
        "data-ocid": "doctors.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-9 rounded-full bg-gradient-to-b from-primary to-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground tracking-tight", children: "Find Your Doctor" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base ml-4 pl-3 border-l border-border/30", children: "Browse our network of specialist physicians and book your appointment instantly" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.1, ease: "easeOut" },
        className: "flex flex-col sm:flex-row gap-3 mb-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                size: 16,
                className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Search by name or specialization...",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                "data-ocid": "doctors.search_input",
                className: "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground bg-card/60 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 backdrop-blur-sm transition-smooth"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SlidersHorizontal,
              {
                size: 14,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: selectedSpec,
                onChange: (e) => setSelectedSpec(e.target.value),
                "data-ocid": "doctors.spec_select",
                className: "pl-8 pr-8 py-2.5 rounded-xl text-sm font-body text-foreground bg-card/60 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 backdrop-blur-sm transition-smooth appearance-none cursor-pointer min-w-[180px]",
                children: specializations.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, className: "bg-card text-foreground", children: s }, s))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, delay: 0.18, ease: "easeOut" },
        className: "flex gap-2 flex-wrap mb-8",
        "data-ocid": "doctors.specialization_filter",
        children: specializations.map((spec) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedSpec(spec),
            "data-ocid": `doctors.filter.${spec.toLowerCase().replace(/\s+/g, "_")}.tab`,
            className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${selectedSpec === spec ? "bg-primary/15 text-primary border border-primary/40" : "bg-muted/50 text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-foreground"}`,
            children: spec
          },
          spec
        ))
      }
    ),
    !showLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3, delay: 0.2 },
        className: "text-xs text-muted-foreground mb-5",
        children: filtered.length === 0 ? "No results" : `Showing ${filtered.length} doctor${filtered.length !== 1 ? "s" : ""}${selectedSpec !== "All" ? ` in ${selectedSpec}` : ""}`
      }
    ),
    showLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        "data-ocid": "doctors.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorCardSkeleton, {})
      }
    ),
    !showLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { query, spec: selectedSpec }) : filtered.map((doctor, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      DoctorCard,
      {
        doctor,
        index
      },
      doctor.id.toString()
    )) })
  ] });
}
export {
  DoctorsPage as default
};
