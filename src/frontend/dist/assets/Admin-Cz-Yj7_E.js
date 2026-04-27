import { c as createLucideIcon, n as useBackend, o as useQueryClient, r as reactExports, p as useQuery, j as jsxRuntimeExports, F as FadeIn, P as ShieldCheck, N as NeonButton, q as StaggerContainer, C as Calendar, X, s as StaggerItem, h as motion, G as GlassCard, l as AnimatePresence, T as TableSkeleton } from "./index-xhhh4oaK.js";
import { u as useToast } from "./useToast-CprK_yTD.js";
import { U as Users } from "./users-B_pZCUc1.js";
import { C as Clock } from "./clock-rF4d5V7x.js";
import { S as Search } from "./search-CLfPblfi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$3);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
const DEMO_DOCTORS = [
  {
    id: BigInt(1),
    name: "Dr. Sarah Mitchell",
    specialization: "Cardiology",
    fees: BigInt(150),
    availability: [
      { day: "Monday", slots: ["09:00", "10:00", "11:00"] },
      { day: "Wednesday", slots: ["14:00", "15:00"] }
    ],
    isActive: true,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(2),
    name: "Dr. James Chen",
    specialization: "Neurology",
    fees: BigInt(200),
    availability: [{ day: "Tuesday", slots: ["10:00", "11:00", "14:00"] }],
    isActive: true,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(3),
    name: "Dr. Priya Sharma",
    specialization: "Dermatology",
    fees: BigInt(120),
    availability: [
      { day: "Thursday", slots: ["09:00", "10:00"] },
      { day: "Friday", slots: ["15:00", "16:00", "17:00"] }
    ],
    isActive: false,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(4),
    name: "Dr. Marcus Williams",
    specialization: "Orthopedics",
    fees: BigInt(180),
    availability: [{ day: "Monday", slots: ["14:00", "15:00", "16:00"] }],
    isActive: true,
    createdAt: BigInt(0)
  },
  {
    id: BigInt(5),
    name: "Dr. Elena Vasquez",
    specialization: "Pediatrics",
    fees: BigInt(130),
    availability: [{ day: "Wednesday", slots: ["09:00", "10:00", "11:00"] }],
    isActive: true,
    createdAt: BigInt(0)
  }
];
const DEMO_APPOINTMENTS = [
  {
    id: BigInt(1),
    patientId: "patient-2xk9f1a",
    doctorId: BigInt(1),
    date: "2026-05-12",
    timeSlot: "09:00",
    status: "Upcoming",
    fees: BigInt(150),
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: BigInt(2),
    patientId: "patient-7qr3m8b",
    doctorId: BigInt(2),
    date: "2026-05-10",
    timeSlot: "10:00",
    status: "Completed",
    fees: BigInt(200),
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: BigInt(3),
    patientId: "patient-4lp2n5c",
    doctorId: BigInt(3),
    date: "2026-05-08",
    timeSlot: "14:00",
    status: "Cancelled",
    fees: BigInt(120),
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: BigInt(4),
    patientId: "patient-9vt6k1d",
    doctorId: BigInt(4),
    date: "2026-05-14",
    timeSlot: "15:00",
    status: "Upcoming",
    fees: BigInt(180),
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: BigInt(5),
    patientId: "patient-1wx8j3e",
    doctorId: BigInt(1),
    date: "2026-05-09",
    timeSlot: "11:00",
    status: "Completed",
    fees: BigInt(150),
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: BigInt(6),
    patientId: "patient-6yz4h7f",
    doctorId: BigInt(5),
    date: "2026-05-15",
    timeSlot: "09:00",
    status: "Upcoming",
    fees: BigInt(130),
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  }
];
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const TIME_PRESETS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00"
];
const EMPTY_FORM = {
  name: "",
  specialization: "",
  fees: BigInt(0),
  availability: []
};
function StatusBadge({ status }) {
  const map = {
    Upcoming: "bg-primary/10 text-primary border-primary/30",
    Completed: "bg-accent/10 text-accent border-accent/30",
    Cancelled: "bg-destructive/10 text-destructive border-destructive/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-xs font-medium px-2 py-0.5 rounded-full border ${map[status]}`,
      children: status
    }
  );
}
function AvailabilityBuilder({ value, onChange }) {
  const [selectedDay, setSelectedDay] = reactExports.useState(DAYS_OF_WEEK[0]);
  function toggleSlot(day, slot) {
    const existing = value.find((d) => d.day === day);
    if (existing) {
      const slots = existing.slots.includes(slot) ? existing.slots.filter((s) => s !== slot) : [...existing.slots, slot].sort();
      const updated = slots.length === 0 ? value.filter((d) => d.day !== day) : value.map((d) => d.day === day ? { ...d, slots } : d);
      onChange(updated);
    } else {
      onChange([...value, { day, slots: [slot] }]);
    }
  }
  const activeDay = value.find((d) => d.day === selectedDay);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: DAYS_OF_WEEK.map((day) => {
      const hasSlots = value.some(
        (d) => d.day === day && d.slots.length > 0
      );
      const isActive = selectedDay === day;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedDay(day),
          className: `px-3 py-1 text-xs rounded-lg border transition-smooth ${isActive ? "bg-primary/20 border-primary/60 text-primary font-semibold" : hasSlots ? "bg-accent/10 border-accent/30 text-accent" : "bg-muted/30 border-border/30 text-muted-foreground hover:border-border/60"}`,
          "data-ocid": `admin.doctor_modal.day_${day.toLowerCase()}.toggle`,
          children: day.slice(0, 3)
        },
        day
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: TIME_PRESETS.map((slot) => {
      const isSelected = (activeDay == null ? void 0 : activeDay.slots.includes(slot)) ?? false;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => toggleSlot(selectedDay, slot),
          className: `px-2 py-1.5 text-xs rounded-lg border text-center transition-smooth ${isSelected ? "bg-secondary/20 border-secondary/60 text-secondary font-semibold" : "bg-muted/20 border-border/30 text-muted-foreground hover:border-border/60 hover:bg-muted/40"}`,
          "data-ocid": `admin.doctor_modal.slot_${slot.replace(":", "")}.toggle`,
          children: slot
        },
        slot
      );
    }) }),
    value.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-medium", children: [
        value.reduce((a, d) => a + d.slots.length, 0),
        " slots"
      ] }),
      " ",
      "across",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
        value.length,
        " days"
      ] })
    ] })
  ] });
}
function DoctorModal({
  mode,
  initial,
  onClose,
  onSubmit,
  isSubmitting
}) {
  const [form, setForm] = reactExports.useState(
    () => initial ? {
      name: initial.name,
      specialization: initial.specialization,
      fees: initial.fees,
      availability: initial.availability
    } : EMPTY_FORM
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      "data-ocid": "admin.doctor_modal.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scale: 0.92, opacity: 0, y: 20 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.94, opacity: 0, y: 10 },
          transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
          className: "w-full max-w-lg max-h-[90vh] overflow-y-auto",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { variant: "thick", padding: "lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-bold", children: mode === "add" ? "Add New Doctor" : "Edit Doctor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: mode === "add" ? "Fill in doctor details and availability" : "Update doctor profile" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth",
                  "data-ocid": "admin.doctor_modal.close_button",
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  onSubmit(form);
                },
                className: "space-y-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "modal-name",
                        className: "block text-xs font-medium text-muted-foreground mb-1.5",
                        children: "Full Name *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "modal-name",
                        type: "text",
                        placeholder: "Dr. Jane Smith",
                        value: form.name,
                        onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
                        className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border/40 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-smooth",
                        "data-ocid": "admin.doctor_modal.name.input",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "modal-spec",
                        className: "block text-xs font-medium text-muted-foreground mb-1.5",
                        children: "Specialization *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "modal-spec",
                        type: "text",
                        placeholder: "e.g. Cardiology",
                        value: form.specialization,
                        onChange: (e) => setForm((p) => ({ ...p, specialization: e.target.value })),
                        className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border/40 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-smooth",
                        "data-ocid": "admin.doctor_modal.specialization.input",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "modal-fees",
                        className: "block text-xs font-medium text-muted-foreground mb-1.5",
                        children: "Consultation Fee (USD) *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "modal-fees",
                        type: "number",
                        min: 0,
                        placeholder: "150",
                        value: Number(form.fees),
                        onChange: (e) => setForm((p) => ({ ...p, fees: BigInt(e.target.value || 0) })),
                        className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border/40 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-smooth",
                        "data-ocid": "admin.doctor_modal.fees.input",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-muted-foreground mb-2", children: "Availability (select day → toggle time slots)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-xl p-3 border border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AvailabilityBuilder,
                      {
                        value: form.availability,
                        onChange: (v) => setForm((p) => ({ ...p, availability: v }))
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      NeonButton,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "md",
                        className: "flex-1",
                        onClick: onClose,
                        "data-ocid": "admin.doctor_modal.cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      NeonButton,
                      {
                        type: "submit",
                        variant: mode === "add" ? "lime" : "cyan",
                        size: "md",
                        className: "flex-1",
                        isLoading: isSubmitting,
                        leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                        "data-ocid": "admin.doctor_modal.submit_button",
                        children: mode === "add" ? "Add Doctor" : "Save Changes"
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        }
      )
    }
  );
}
function DeleteDialog({
  name,
  onConfirm,
  onCancel,
  isDeleting
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      "data-ocid": "admin.delete_dialog.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scale: 0.92, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.94, opacity: 0 },
          transition: { duration: 0.2 },
          className: "w-full max-w-sm",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { variant: "thick", padding: "lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-destructive/15 border border-destructive/30 mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-bold text-center mb-2", children: "Remove Doctor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center mb-6", children: [
              "Are you sure you want to remove",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: name }),
              "? This action cannot be undone."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NeonButton,
                {
                  type: "button",
                  variant: "ghost",
                  size: "md",
                  className: "flex-1",
                  onClick: onCancel,
                  "data-ocid": "admin.delete_dialog.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NeonButton,
                {
                  type: "button",
                  variant: "danger",
                  size: "md",
                  className: "flex-1",
                  isLoading: isDeleting,
                  onClick: onConfirm,
                  "data-ocid": "admin.delete_dialog.confirm_button",
                  children: "Delete"
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
function Admin() {
  const { actor, isLoading: backendLoading } = useBackend();
  const { success, error } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = reactExports.useState("appointments");
  const [doctorModal, setDoctorModal] = reactExports.useState({ open: false, mode: "add" });
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [apptSearch, setApptSearch] = reactExports.useState("");
  const [apptStatusFilter, setApptStatusFilter] = reactExports.useState("All");
  const [doctorSearch, setDoctorSearch] = reactExports.useState("");
  const [assignPrincipal, setAssignPrincipal] = reactExports.useState("");
  const [isAssigning, setIsAssigning] = reactExports.useState(false);
  const { data: doctors = [], isLoading: doctorsLoading } = useQuery({
    queryKey: ["admin-doctors"],
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
  const { data: appointments = [], isLoading: apptsLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => {
      if (!actor) return DEMO_APPOINTMENTS;
      try {
        const result = await actor.getAllAppointments();
        return result.length > 0 ? result : DEMO_APPOINTMENTS;
      } catch {
        return DEMO_APPOINTMENTS;
      }
    },
    enabled: !backendLoading
  });
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "Upcoming"
  ).length;
  const cancelledAppointments = appointments.filter(
    (a) => a.status === "Cancelled"
  ).length;
  const stats = [
    {
      label: "Total Doctors",
      value: totalDoctors,
      icon: Users,
      color: "text-primary",
      glow: "shadow-glow-cyan"
    },
    {
      label: "Total Appointments",
      value: totalAppointments,
      icon: Calendar,
      color: "text-secondary",
      glow: "shadow-glow-purple"
    },
    {
      label: "Upcoming",
      value: upcomingAppointments,
      icon: Clock,
      color: "text-accent",
      glow: ""
    },
    {
      label: "Cancelled",
      value: cancelledAppointments,
      icon: X,
      color: "text-destructive",
      glow: ""
    }
  ];
  const filteredAppointments = appointments.filter((a) => {
    var _a;
    const matchStatus = apptStatusFilter === "All" || a.status === apptStatusFilter;
    const doctorName = ((_a = doctors.find((d) => d.id === a.doctorId)) == null ? void 0 : _a.name) ?? "";
    const matchSearch = apptSearch === "" || a.patientId.toLowerCase().includes(apptSearch.toLowerCase()) || doctorName.toLowerCase().includes(apptSearch.toLowerCase());
    return matchStatus && matchSearch;
  });
  const filteredDoctors = doctors.filter(
    (d) => doctorSearch === "" || d.name.toLowerCase().includes(doctorSearch.toLowerCase()) || d.specialization.toLowerCase().includes(doctorSearch.toLowerCase())
  );
  async function handleDoctorSubmit(form) {
    if (!form.name.trim() || !form.specialization.trim()) {
      error("Missing fields", "Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (actor) {
        if (doctorModal.mode === "add") {
          await actor.addDoctor(form);
        } else if (doctorModal.doctor) {
          await actor.updateDoctor(doctorModal.doctor.id, form);
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      success(
        doctorModal.mode === "add" ? "Doctor added" : "Doctor updated",
        `${form.name} has been ${doctorModal.mode === "add" ? "added to" : "updated in"} the system.`
      );
      setDoctorModal({ open: false, mode: "add" });
    } catch {
      error("Operation failed", "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (actor) {
        await actor.deleteDoctor(deleteTarget.id);
      }
      await queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      success("Doctor removed", `${deleteTarget.name} has been removed.`);
      setDeleteTarget(null);
    } catch {
      error("Delete failed", "Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }
  async function handleAssignAdmin() {
    if (!assignPrincipal.trim()) {
      error("Missing principal", "Please enter a principal ID.");
      return;
    }
    setIsAssigning(true);
    try {
      if (actor) {
        await actor.assignAdmin(assignPrincipal.trim());
      }
      success(
        "Admin assigned",
        `${assignPrincipal.trim().slice(0, 20)}… is now an admin.`
      );
      setAssignPrincipal("");
    } catch {
      error("Assignment failed", "Check the principal ID and try again.");
    } finally {
      setIsAssigning(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-10 max-w-7xl",
      "data-ocid": "admin.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-secondary/15 border border-secondary/30 shadow-glow-purple", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-secondary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent", children: "Admin Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-xs rounded-full bg-secondary/20 text-secondary border border-secondary/30 font-semibold", children: "ADMIN" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm ml-14", children: "Manage doctors, appointments, and system access" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NeonButton,
            {
              variant: "lime",
              size: "sm",
              leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              onClick: () => setDoctorModal({ open: true, mode: "add" }),
              "data-ocid": "admin.add_doctor.open_modal_button",
              children: "Add Doctor"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10", children: stats.map(({ label, value, icon: Icon, color, glow }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            whileHover: { y: -3, scale: 1.02 },
            transition: { duration: 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassCard,
              {
                variant: "elevated",
                padding: "md",
                className: `${glow} cursor-default`,
                "data-ocid": `admin.stat.card.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `text-3xl font-display font-bold ${color} tabular-nums`,
                        children: typeof value === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.span,
                          {
                            initial: { opacity: 0, y: 10 },
                            animate: { opacity: 1, y: 0 },
                            transition: { duration: 0.5, delay: idx * 0.1 },
                            children: value
                          }
                        ) : value
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1.5 font-medium", children: label })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `p-2 rounded-lg bg-muted/30 border border-border/20 ${color}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
                    }
                  )
                ] })
              }
            )
          }
        ) }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 p-1 glass rounded-xl mb-8 w-fit",
            "data-ocid": "admin.tabs.tab",
            children: ["appointments", "doctors"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab(tab),
                className: `px-5 py-2 text-sm font-semibold rounded-lg transition-smooth capitalize ${activeTab === tab ? "bg-primary/20 text-primary border border-primary/30 shadow-glow-cyan" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`,
                "data-ocid": `admin.tab_${tab}.tab`,
                children: tab === "appointments" ? "All Appointments" : "Manage Doctors"
              },
              tab
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          activeTab === "appointments" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 10 },
              transition: { duration: 0.25 },
              "data-ocid": "admin.appointments.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "Search by patient or doctor…",
                        value: apptSearch,
                        onChange: (e) => setApptSearch(e.target.value),
                        className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-smooth",
                        "data-ocid": "admin.appointments.search_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: apptStatusFilter,
                        onChange: (e) => setApptStatusFilter(
                          e.target.value
                        ),
                        className: "pl-3 pr-8 py-2.5 rounded-xl bg-input border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-smooth appearance-none cursor-pointer",
                        "data-ocid": "admin.appointments.status_filter.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Statuses" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Upcoming", children: "Upcoming" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Completed", children: "Completed" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cancelled", children: "Cancelled" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
                  ] })
                ] }),
                apptsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 6 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    variant: "elevated",
                    padding: "none",
                    className: "overflow-hidden",
                    "data-ocid": "admin.appointments.table",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[650px]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/30 bg-muted/30", children: [
                          "Patient ID",
                          "Doctor",
                          "Date",
                          "Time",
                          "Status",
                          "Fees"
                        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "th",
                          {
                            className: "text-left text-xs font-semibold text-muted-foreground px-4 py-3 whitespace-nowrap",
                            children: h
                          },
                          h
                        )) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredAppointments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            colSpan: 6,
                            className: "px-4 py-12 text-center text-muted-foreground",
                            "data-ocid": "admin.appointments.empty_state",
                            children: "No appointments match your filters."
                          }
                        ) }) : filteredAppointments.map((appt, idx) => {
                          const doctor = doctors.find(
                            (d) => d.id === appt.doctorId
                          );
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            motion.tr,
                            {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              transition: { delay: idx * 0.03 },
                              className: "border-b border-border/20 hover:bg-muted/20 transition-colors",
                              "data-ocid": `admin.appointment.row.${idx + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "text-xs bg-muted/40 px-2 py-0.5 rounded font-mono text-muted-foreground", children: [
                                  appt.patientId.slice(0, 14),
                                  "…"
                                ] }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: (doctor == null ? void 0 : doctor.name) ?? `Doctor #${appt.doctorId.toString()}` }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: appt.date }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: appt.timeSlot }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: appt.status }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-accent font-semibold tabular-nums", children: [
                                  "$",
                                  appt.fees.toString()
                                ] })
                              ]
                            },
                            appt.id.toString()
                          );
                        }) })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-t border-border/20 text-xs text-muted-foreground", children: [
                        "Showing ",
                        filteredAppointments.length,
                        " of ",
                        appointments.length,
                        " ",
                        "appointments"
                      ] })
                    ]
                  }
                )
              ]
            },
            "appointments"
          ),
          activeTab === "doctors" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 10 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -10 },
              transition: { duration: 0.25 },
              "data-ocid": "admin.doctors.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Search by name or specialization…",
                      value: doctorSearch,
                      onChange: (e) => setDoctorSearch(e.target.value),
                      className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-smooth",
                      "data-ocid": "admin.doctors.search_input"
                    }
                  )
                ] }) }),
                doctorsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 5 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    variant: "elevated",
                    padding: "none",
                    className: "overflow-hidden mb-8",
                    "data-ocid": "admin.doctors.table",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[540px]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/30 bg-muted/30", children: [
                          "Doctor",
                          "Specialization",
                          "Fee",
                          "Availability",
                          "Status",
                          "Actions"
                        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "th",
                          {
                            className: "text-left text-xs font-semibold text-muted-foreground px-4 py-3 whitespace-nowrap",
                            children: h
                          },
                          h
                        )) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredDoctors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            colSpan: 6,
                            className: "px-4 py-12 text-center text-muted-foreground",
                            "data-ocid": "admin.doctors.empty_state",
                            children: "No doctors found."
                          }
                        ) }) : filteredDoctors.map((doc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.tr,
                          {
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            transition: { delay: idx * 0.04 },
                            className: "border-b border-border/20 hover:bg-muted/20 transition-colors",
                            "data-ocid": `admin.doctor.row.${idx + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0", children: doc.name.split(" ").map((n) => n[0]).slice(0, 2).join("") }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate max-w-[160px]", children: doc.name })
                              ] }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: doc.specialization }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-accent font-semibold tabular-nums", children: [
                                "$",
                                doc.fees.toString()
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: doc.availability.length > 0 ? `${doc.availability.length} day${doc.availability.length !== 1 ? "s" : ""}, ${doc.availability.reduce((a, d) => a + d.slots.length, 0)} slots` : "—" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: `text-xs font-medium px-2 py-0.5 rounded-full border ${doc.isActive ? "bg-accent/10 text-accent border-accent/30" : "bg-muted/50 text-muted-foreground border-border/30"}`,
                                  children: doc.isActive ? "Active" : "Inactive"
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  motion.button,
                                  {
                                    type: "button",
                                    whileHover: { scale: 1.1 },
                                    whileTap: { scale: 0.92 },
                                    onClick: () => setDoctorModal({
                                      open: true,
                                      mode: "edit",
                                      doctor: doc
                                    }),
                                    className: "p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-smooth",
                                    "aria-label": `Edit ${doc.name}`,
                                    "data-ocid": `admin.doctor.edit_button.${idx + 1}`,
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  motion.button,
                                  {
                                    type: "button",
                                    whileHover: { scale: 1.1 },
                                    whileTap: { scale: 0.92 },
                                    onClick: () => setDeleteTarget({
                                      id: doc.id,
                                      name: doc.name
                                    }),
                                    className: "p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth",
                                    "aria-label": `Delete ${doc.name}`,
                                    "data-ocid": `admin.doctor.delete_button.${idx + 1}`,
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                                  }
                                )
                              ] }) })
                            ]
                          },
                          doc.id.toString()
                        )) })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-t border-border/20 text-xs text-muted-foreground", children: [
                        filteredDoctors.length,
                        " doctor",
                        filteredDoctors.length !== 1 ? "s" : ""
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    variant: "neon-purple",
                    padding: "md",
                    "data-ocid": "admin.assign_admin.panel",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 text-secondary" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-secondary", children: "Assign Admin Role" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Grant admin privileges to another user by their Internet Identity principal." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Principal ID (e.g. aaaaa-aa or 2vxsx-fae…)",
                            value: assignPrincipal,
                            onChange: (e) => setAssignPrincipal(e.target.value),
                            className: "flex-1 px-4 py-2.5 rounded-xl bg-input border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-secondary/60 transition-smooth font-mono",
                            "data-ocid": "admin.assign_admin.input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          NeonButton,
                          {
                            type: "button",
                            variant: "purple",
                            size: "md",
                            isLoading: isAssigning,
                            leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
                            onClick: handleAssignAdmin,
                            "data-ocid": "admin.assign_admin.submit_button",
                            children: "Assign Admin"
                          }
                        )
                      ] })
                    ]
                  }
                ) })
              ]
            },
            "doctors"
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: doctorModal.open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DoctorModal,
          {
            mode: doctorModal.mode,
            initial: doctorModal.doctor,
            onClose: () => setDoctorModal({ open: false, mode: "add" }),
            onSubmit: handleDoctorSubmit,
            isSubmitting
          },
          "doctor-modal"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeleteDialog,
          {
            name: deleteTarget.name,
            onConfirm: handleDelete,
            onCancel: () => setDeleteTarget(null),
            isDeleting
          },
          "delete-dialog"
        ) })
      ]
    }
  );
}
export {
  Admin as default
};
