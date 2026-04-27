import { t as useParams, k as useNavigate, n as useBackend, r as reactExports, j as jsxRuntimeExports, G as GlassCard, X, N as NeonButton, F as FadeIn, S as Stethoscope, C as Calendar, v as cn, h as motion, l as AnimatePresence, w as CircleCheckBig } from "./index-xhhh4oaK.js";
import { u as useToast } from "./useToast-CprK_yTD.js";
import { C as ChevronLeft } from "./chevron-left-CQaQEIZP.js";
import { U as User } from "./user-BUxIxHHX.js";
import { D as DollarSign } from "./dollar-sign-DYUN68Mp.js";
import { C as Clock } from "./clock-rF4d5V7x.js";
import { C as ChevronRight } from "./chevron-right-B3XmZqdg.js";
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function isoDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function dayOfWeekLabel(date) {
  return DAY_NAMES[date.getDay()];
}
function getDoctorAvailableDays(doctor) {
  return new Set(doctor.availability.map((d) => d.day.slice(0, 3)));
}
function BookingCalendar({
  selectedDate,
  onSelect,
  availableDays
}) {
  const today = reactExports.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewYear, setViewYear] = reactExports.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = reactExports.useState(today.getMonth());
  const [direction, setDirection] = reactExports.useState(1);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const prevMonth = () => {
    setDirection(-1);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    setDirection(1);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };
  const canGoPrev = viewYear > today.getFullYear() || viewYear === today.getFullYear() && viewMonth > today.getMonth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full select-none", "data-ocid": "booking.calendar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: prevMonth,
          disabled: !canGoPrev,
          className: cn(
            "p-2 rounded-lg transition-smooth",
            canGoPrev ? "hover:bg-primary/20 text-foreground" : "opacity-30 cursor-not-allowed text-muted-foreground"
          ),
          "aria-label": "Previous month",
          "data-ocid": "booking.calendar_prev",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.h3,
        {
          initial: { opacity: 0, x: direction * 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: direction * -20 },
          transition: { duration: 0.2 },
          className: "font-display font-semibold text-foreground text-lg",
          children: [
            MONTH_NAMES[viewMonth],
            " ",
            viewYear
          ]
        },
        `${viewYear}-${viewMonth}`
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: nextMonth,
          className: "p-2 rounded-lg hover:bg-primary/20 text-foreground transition-smooth",
          "aria-label": "Next month",
          "data-ocid": "booking.calendar_next",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 mb-2", children: DAY_NAMES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center text-xs font-semibold text-muted-foreground py-1",
        children: d
      },
      d
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: direction * 30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -30 },
        transition: { duration: 0.25 },
        className: "grid grid-cols-7 gap-1",
        children: cells.map((day, idx) => {
          if (!day) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `empty-${idx}`);
          const dateObj = new Date(viewYear, viewMonth, day);
          const dayLabel = dayOfWeekLabel(dateObj);
          const isPast = dateObj < today;
          const isToday = dateObj.getTime() === today.getTime();
          const isAvailable = availableDays.has(dayLabel);
          const dateStr = isoDate(viewYear, viewMonth, day);
          const isSelected = selectedDate === dateStr;
          const isDisabled = isPast || !isAvailable;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileHover: !isDisabled ? { scale: 1.12 } : {},
              whileTap: !isDisabled ? { scale: 0.95 } : {},
              onClick: () => !isDisabled && onSelect(dateStr),
              disabled: isDisabled,
              "data-ocid": `booking.calendar_day.${idx}`,
              className: cn(
                "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-smooth relative",
                isSelected && "bg-primary text-primary-foreground shadow-glow-cyan",
                !isSelected && isToday && "border border-primary/60 text-primary",
                !isSelected && !isToday && isAvailable && !isPast && "hover:bg-primary/20 text-foreground cursor-pointer",
                isDisabled && !isToday && "text-muted-foreground/30 cursor-not-allowed",
                !isAvailable && !isPast && !isToday && "text-muted-foreground/40 cursor-not-allowed"
              ),
              "aria-label": `${dayLabel} ${dateStr}`,
              "aria-pressed": isSelected,
              children: [
                day,
                isAvailable && !isPast && !isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent opacity-70" })
              ]
            },
            dateStr
          );
        })
      },
      `${viewYear}-${viewMonth}`
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent inline-block" }),
        " ",
        "Available"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary inline-block" }),
        " ",
        "Selected"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-muted-foreground/30 inline-block" }),
        " ",
        "Unavailable"
      ] })
    ] })
  ] });
}
function StepIndicator({ step }) {
  const steps = [
    { label: "Choose Date", icon: Calendar },
    { label: "Time Slot", icon: Clock },
    { label: "Confirm", icon: CircleCheckBig }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center justify-center gap-0 mb-8",
      "data-ocid": "booking.step_indicator",
      children: steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = i === step;
        const isDone = i < step;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: isActive ? {
                  scale: 1.15,
                  boxShadow: "0 0 16px oklch(0.7 0.18 200 / 0.5)"
                } : isDone ? { scale: 1 } : { scale: 0.9 },
                className: cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth",
                  isActive && "border-primary bg-primary/20 text-primary",
                  isDone && "border-accent bg-accent/20 text-accent",
                  !isActive && !isDone && "border-border/40 bg-muted/20 text-muted-foreground"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-xs font-medium",
                  isActive ? "text-primary" : isDone ? "text-accent" : "text-muted-foreground"
                ),
                children: s.label
              }
            )
          ] }),
          i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-14 h-px mx-1 mb-4 transition-smooth",
                isDone ? "bg-accent/60" : "bg-border/40"
              )
            }
          )
        ] }, s.label);
      })
    }
  );
}
function ConfirmModal({
  doctor,
  date,
  slot,
  onConfirm,
  onCancel,
  isLoading
}) {
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);
  const rows = [
    { icon: User, label: "Doctor", value: `Dr. ${doctor.name}` },
    {
      icon: Stethoscope,
      label: "Specialization",
      value: doctor.specialization
    },
    {
      icon: Calendar,
      label: "Date",
      value: (/* @__PURE__ */ new Date(`${date}T00:00:00`)).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    },
    { icon: Clock, label: "Time", value: slot },
    {
      icon: DollarSign,
      label: "Consultation Fee",
      value: `$${Number(doctor.fees)}`
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" },
      "data-ocid": "booking.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scale: 0.85, opacity: 0, y: 30 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.85, opacity: 0, y: 30 },
          transition: { type: "spring", stiffness: 300, damping: 25 },
          className: "w-full max-w-md",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { variant: "neon-cyan", padding: "lg", className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onCancel,
                className: "absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-smooth",
                "aria-label": "Close",
                "data-ocid": "booking.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-4 shadow-glow-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Confirm Booking" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Review your appointment details below" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-8", children: rows.map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: value })
                  ] })
                ]
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NeonButton,
                {
                  variant: "ghost",
                  size: "md",
                  onClick: onCancel,
                  className: "flex-1",
                  "data-ocid": "booking.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NeonButton,
                {
                  variant: "lime",
                  size: "md",
                  onClick: onConfirm,
                  isLoading,
                  className: "flex-1",
                  "data-ocid": "booking.confirm_button",
                  children: "Confirm Booking"
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 })
};
function Book() {
  const { doctorId } = useParams({ from: "/book/$doctorId" });
  const navigate = useNavigate();
  const { actor, isLoading: isActorLoading } = useBackend();
  const { success, error: showError } = useToast();
  const [doctor, setDoctor] = reactExports.useState(null);
  const [isFetchingDoctor, setIsFetchingDoctor] = reactExports.useState(true);
  const [fetchError, setFetchError] = reactExports.useState(null);
  const [step, setStep] = reactExports.useState(0);
  const [stepDir, setStepDir] = reactExports.useState(1);
  const [selectedDate, setSelectedDate] = reactExports.useState(null);
  const [slots, setSlots] = reactExports.useState([]);
  const [isFetchingSlots, setIsFetchingSlots] = reactExports.useState(false);
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [isBooking, setIsBooking] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || isActorLoading) return;
    (async () => {
      setIsFetchingDoctor(true);
      try {
        const result = await actor.getDoctor(BigInt(doctorId));
        if (result) {
          setDoctor(result);
        } else {
          setFetchError("Doctor not found.");
        }
      } catch {
        setFetchError("Failed to load doctor details.");
      } finally {
        setIsFetchingDoctor(false);
      }
    })();
  }, [actor, isActorLoading, doctorId]);
  const availableDays = reactExports.useMemo(
    () => doctor ? getDoctorAvailableDays(doctor) : /* @__PURE__ */ new Set(),
    [doctor]
  );
  reactExports.useEffect(() => {
    if (!selectedDate || !actor || !doctor) return;
    const dateObj = /* @__PURE__ */ new Date(`${selectedDate}T00:00:00`);
    const dow = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    setIsFetchingSlots(true);
    setSlots([]);
    setSelectedSlot(null);
    (async () => {
      try {
        const result = await actor.getAvailableSlots(doctor.id, selectedDate, dow);
        setSlots(result.map((time) => ({ time, isBooked: false })));
      } catch {
        showError("Failed to load slots", "Please try again");
      } finally {
        setIsFetchingSlots(false);
      }
    })();
  }, [selectedDate, actor, doctor, showError]);
  const goNext = reactExports.useCallback(() => {
    setStepDir(1);
    setStep((s) => s + 1);
  }, []);
  const goBack = reactExports.useCallback(() => {
    setStepDir(-1);
    setStep((s) => s - 1);
  }, []);
  const handleConfirmBooking = async () => {
    if (!actor || !doctor || !selectedDate || !selectedSlot) return;
    setIsBooking(true);
    try {
      const input = {
        doctorId: doctor.id,
        date: selectedDate,
        timeSlot: selectedSlot
      };
      const result = await actor.bookAppointment(input);
      if (result.__kind__ === "ok") {
        success(
          "Appointment Confirmed!",
          `Booked with Dr. ${doctor.name} on ${selectedDate} at ${selectedSlot}`
        );
        setShowConfirm(false);
        navigate({ to: "/appointments" });
      } else {
        showError(
          "Double Booking",
          "This time slot was just booked. Please choose another."
        );
        setShowConfirm(false);
      }
    } catch {
      showError("Booking Failed", "An error occurred. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };
  const formattedDate = selectedDate ? (/* @__PURE__ */ new Date(`${selectedDate}T00:00:00`)).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }) : null;
  if (isActorLoading || isFetchingDoctor) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      GlassCard,
      {
        variant: "neon-cyan",
        padding: "lg",
        className: "w-full max-w-sm text-center",
        "data-ocid": "booking.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display font-semibold", children: "Loading Doctor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Fetching details…" })
        ]
      }
    ) });
  }
  if (fetchError || !doctor) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      GlassCard,
      {
        variant: "neon-purple",
        padding: "lg",
        className: "w-full max-w-sm text-center",
        "data-ocid": "booking.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display font-semibold text-lg", children: fetchError ?? "Doctor not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NeonButton,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => navigate({ to: "/doctors" }),
              className: "mt-4",
              children: "Back to Doctors"
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      FadeIn,
      {
        className: "min-h-screen px-4 py-8 max-w-6xl mx-auto",
        "data-ocid": "booking.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NeonButton,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => navigate({ to: "/doctors" }),
                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                "data-ocid": "booking.back_button",
                children: "Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "Book Appointment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Schedule your consultation in 3 easy steps" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                variant: "neon-purple",
                padding: "lg",
                className: "sticky top-24",
                "data-ocid": "booking.doctor_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/30 to-primary/30 border border-secondary/30 flex items-center justify-center mb-4 shadow-glow-purple", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10 text-secondary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground", children: [
                    "Dr. ",
                    doctor.name
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-3.5 h-3.5 text-secondary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary text-sm font-medium", children: doctor.specialization })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 border-t border-border/20" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4 text-accent" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Consultation Fee" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground font-semibold", children: [
                          "$",
                          Number(doctor.fees)
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5", children: "Available Days" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: DAY_NAMES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: cn(
                              "text-xs px-2 py-0.5 rounded-md font-medium",
                              availableDays.has(d) ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted/20 text-muted-foreground/50 border border-border/20"
                            ),
                            children: d
                          },
                          d
                        )) })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 p-3 rounded-lg bg-muted/20 border border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Board-certified specialist with over 10 years of clinical experience. Committed to providing compassionate, evidence-based care tailored to each patient's individual needs." }) }),
                  (selectedDate || selectedSlot) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, height: 0 },
                      animate: { opacity: 1, height: "auto" },
                      className: "mt-4 p-3 rounded-xl bg-primary/10 border border-primary/30",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-2", children: "Your Selection" }),
                        selectedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-primary" }),
                          " ",
                          formattedDate
                        ] }),
                        selectedSlot && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground flex items-center gap-1.5 mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-primary" }),
                          " ",
                          selectedSlot
                        ] })
                      ]
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                variant: "neon-cyan",
                padding: "lg",
                "data-ocid": "booking.flow_panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { step }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden min-h-[460px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", custom: stepDir, children: [
                    step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        custom: stepDir,
                        variants: stepVariants,
                        initial: "enter",
                        animate: "center",
                        exit: "exit",
                        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        "data-ocid": "booking.step_date",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "Select a Date" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-6", children: [
                            "Only days when Dr. ",
                            doctor.name,
                            " is available are selectable."
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            BookingCalendar,
                            {
                              selectedDate,
                              onSelect: setSelectedDate,
                              availableDays
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            NeonButton,
                            {
                              variant: "cyan",
                              size: "lg",
                              onClick: goNext,
                              disabled: !selectedDate,
                              rightIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }),
                              "data-ocid": "booking.next_button",
                              children: "Continue"
                            }
                          ) })
                        ]
                      },
                      "step-0"
                    ),
                    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        custom: stepDir,
                        variants: stepVariants,
                        initial: "enter",
                        animate: "center",
                        exit: "exit",
                        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        "data-ocid": "booking.step_slots",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "Select a Time Slot" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-6", children: [
                            "Available times on",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: formattedDate })
                          ] }),
                          isFetchingSlots ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "grid grid-cols-3 sm:grid-cols-4 gap-2",
                              "data-ocid": "booking.slots.loading_state",
                              children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "h-12 rounded-xl bg-muted/30 animate-pulse border border-border/20"
                                },
                                i
                              ))
                            }
                          ) : slots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex flex-col items-center py-12 text-center",
                              "data-ocid": "booking.slots.empty_state",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted/20 border border-border/30 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-7 h-7 text-muted-foreground" }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No slots available" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "All time slots for this day are booked." })
                              ]
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              className: "grid grid-cols-3 sm:grid-cols-4 gap-2",
                              initial: "hidden",
                              animate: "visible",
                              variants: {
                                visible: { transition: { staggerChildren: 0.04 } }
                              },
                              "data-ocid": "booking.slots.list",
                              children: slots.map((slot, i) => {
                                const isSelected = selectedSlot === slot.time;
                                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  motion.button,
                                  {
                                    type: "button",
                                    variants: {
                                      hidden: { opacity: 0, scale: 0.85 },
                                      visible: {
                                        opacity: 1,
                                        scale: 1,
                                        transition: { duration: 0.25 }
                                      }
                                    },
                                    whileHover: !slot.isBooked ? { scale: 1.05 } : {},
                                    whileTap: !slot.isBooked ? { scale: 0.95 } : {},
                                    onClick: () => !slot.isBooked && setSelectedSlot(slot.time),
                                    disabled: slot.isBooked,
                                    "data-ocid": `booking.slot.${i + 1}`,
                                    "aria-pressed": isSelected,
                                    "aria-label": `${slot.time}${slot.isBooked ? " — booked" : ""}`,
                                    className: cn(
                                      "h-12 rounded-xl text-sm font-semibold transition-smooth border relative",
                                      isSelected ? "bg-primary text-primary-foreground shadow-glow-cyan border-primary/50" : slot.isBooked ? "bg-muted/10 text-muted-foreground/30 border-border/10 cursor-not-allowed" : "bg-muted/20 text-foreground border-border/30 hover:border-primary/50 hover:bg-primary/10 cursor-pointer"
                                    ),
                                    children: slot.isBooked ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-through opacity-40", children: slot.time }) : slot.time
                                  },
                                  slot.time
                                );
                              })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonButton,
                              {
                                variant: "ghost",
                                size: "md",
                                onClick: goBack,
                                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                                "data-ocid": "booking.back_step_button",
                                children: "Back"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonButton,
                              {
                                variant: "cyan",
                                size: "lg",
                                onClick: goNext,
                                disabled: !selectedSlot,
                                rightIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }),
                                "data-ocid": "booking.next_button",
                                children: "Continue"
                              }
                            )
                          ] })
                        ]
                      },
                      "step-1"
                    ),
                    step === 2 && selectedDate && selectedSlot && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        custom: stepDir,
                        variants: stepVariants,
                        initial: "enter",
                        animate: "center",
                        exit: "exit",
                        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        "data-ocid": "booking.step_review",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "Review & Confirm" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Please confirm your appointment details before booking." }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: [
                            {
                              icon: User,
                              label: "Doctor",
                              value: `Dr. ${doctor.name}`
                            },
                            {
                              icon: Stethoscope,
                              label: "Specialization",
                              value: doctor.specialization
                            },
                            {
                              icon: Calendar,
                              label: "Date",
                              value: (/* @__PURE__ */ new Date(
                                `${selectedDate}T00:00:00`
                              )).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                              })
                            },
                            { icon: Clock, label: "Time", value: selectedSlot },
                            {
                              icon: DollarSign,
                              label: "Fee",
                              value: `$${Number(doctor.fees)}`
                            }
                          ].map(({ icon: Icon, label, value }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            motion.div,
                            {
                              initial: { opacity: 0, x: -20 },
                              animate: { opacity: 1, x: 0 },
                              transition: { delay: i * 0.07, duration: 0.3 },
                              className: "flex items-center gap-3 p-4 rounded-xl bg-muted/20 border border-border/20",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: value })
                                ] })
                              ]
                            },
                            label
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              transition: { delay: 0.38 },
                              className: "p-3 rounded-xl bg-accent/10 border border-accent/30 mb-6",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-medium", children: "✓ Cancellations must be made at least 24 hours in advance" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonButton,
                              {
                                variant: "ghost",
                                size: "md",
                                onClick: goBack,
                                leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                                "data-ocid": "booking.back_step_button",
                                children: "Back"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonButton,
                              {
                                variant: "lime",
                                size: "lg",
                                onClick: () => setShowConfirm(true),
                                rightIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5" }),
                                "data-ocid": "booking.open_modal_button",
                                children: "Book Appointment"
                              }
                            )
                          ] })
                        ]
                      },
                      "step-2"
                    )
                  ] }) })
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showConfirm && selectedDate && selectedSlot && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmModal,
      {
        doctor,
        date: selectedDate,
        slot: selectedSlot,
        onConfirm: handleConfirmBooking,
        onCancel: () => setShowConfirm(false),
        isLoading: isBooking
      }
    ) })
  ] });
}
export {
  Book as default
};
