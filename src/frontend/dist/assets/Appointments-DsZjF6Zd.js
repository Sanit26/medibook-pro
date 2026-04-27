var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { x as Subscribable, y as shallowEqualObjects, z as hashKey, B as getDefaultState, E as notifyManager, o as useQueryClient, r as reactExports, H as noop, I as shouldThrowError, c as createLucideIcon, n as useBackend, p as useQuery, j as jsxRuntimeExports, h as motion, T as TableSkeleton, L as Link, N as NeonButton, q as StaggerContainer, X, w as CircleCheckBig, s as StaggerItem, G as GlassCard, C as Calendar, l as AnimatePresence } from "./index-xhhh4oaK.js";
import { u as useToast } from "./useToast-CprK_yTD.js";
import { S as Search } from "./search-CLfPblfi.js";
import { C as Clock } from "./clock-rF4d5V7x.js";
import { C as ChevronLeft } from "./chevron-left-CQaQEIZP.js";
import { C as ChevronRight } from "./chevron-right-B3XmZqdg.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m14 14-4 4", key: "rymu2i" }],
  ["path", { d: "m10 14 4 4", key: "3sz06r" }]
];
const CalendarX = createLucideIcon("calendar-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const STATUS_CONFIG = {
  Upcoming: {
    icon: Clock,
    color: "text-primary border-primary/30 bg-primary/10",
    label: "Upcoming"
  },
  Completed: {
    icon: CircleCheckBig,
    color: "text-accent border-accent/30 bg-accent/10",
    label: "Completed"
  },
  Cancelled: {
    icon: X,
    color: "text-destructive border-destructive/30 bg-destructive/10",
    label: "Cancelled"
  }
};
const MONTHS = [
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
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DEFAULT_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM"
];
function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
function formatDisplayDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
function getDoctorName(id) {
  const map = {
    "1": "Dr. Sarah Mitchell",
    "2": "Dr. James Ortega",
    "3": "Dr. Priya Sharma",
    "4": "Dr. Alan Chen",
    "5": "Dr. Maria Torres"
  };
  return map[id.toString()] ?? `Dr. (ID: ${id.toString()})`;
}
function getDoctorSpecialty(id) {
  const map = {
    "1": "Cardiology",
    "2": "Neurology",
    "3": "Dermatology",
    "4": "Orthopedics",
    "5": "Pediatrics"
  };
  return map[id.toString()] ?? "General Medicine";
}
function getInitials(name) {
  return name.split(" ").filter((_, i) => i > 0).slice(0, 2).map((n) => n[0]).join("");
}
function MiniCalendar({
  selected,
  onSelect
}) {
  const today = /* @__PURE__ */ new Date();
  const [viewYear, setViewYear] = reactExports.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = reactExports.useState(today.getMonth());
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayIso = isoDate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else setViewMonth(viewMonth - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else setViewMonth(viewMonth + 1);
  }
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: prevMonth,
          className: "w-7 h-7 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold", children: [
        MONTHS[viewMonth],
        " ",
        viewYear
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: nextMonth,
          className: "w-7 h-7 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 mb-1", children: DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center text-[10px] text-muted-foreground font-medium py-1",
        children: d
      },
      d
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-y-0.5", children: cells.map((day, i) => {
      const cellKey = day ? `day-${viewYear}-${viewMonth}-${day}` : `empty-${viewYear}-${viewMonth}-${i}`;
      if (!day) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true" }, cellKey);
      const iso = isoDate(viewYear, viewMonth, day);
      const isPast = iso < todayIso;
      const isSelected = iso === selected;
      const isToday = iso === todayIso;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          disabled: isPast,
          onClick: () => onSelect(iso),
          className: `
                w-8 h-8 mx-auto text-xs rounded-lg transition-smooth font-medium
                ${isPast ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-primary/15 cursor-pointer"}
                ${isSelected ? "bg-primary text-primary-foreground shadow-glow-cyan" : ""}
                ${isToday && !isSelected ? "border border-primary/40 text-primary" : ""}
              `,
          children: day
        },
        cellKey
      );
    }) })
  ] });
}
function RescheduleModal({
  appointment,
  onClose,
  onConfirm,
  isLoading
}) {
  const [selectedDate, setSelectedDate] = reactExports.useState(appointment.date);
  const [selectedSlot, setSelectedSlot] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "reschedule.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative z-10 w-full max-w-lg",
            initial: { scale: 0.9, opacity: 0, y: 20 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.9, opacity: 0, y: 20 },
            transition: { type: "spring", stiffness: 300, damping: 25 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { variant: "thick", padding: "lg", className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "absolute top-4 right-4 w-7 h-7 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center transition-smooth",
                  "data-ocid": "reschedule.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-5 h-5 text-secondary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Reschedule Appointment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    getDoctorName(appointment.doctorId),
                    " ·",
                    " ",
                    getDoctorSpecialty(appointment.doctorId)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-3 mb-5 flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 shrink-0" }),
                "Current: ",
                formatDisplayDate(appointment.date),
                " at",
                " ",
                appointment.timeSlot
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wide", children: "Select new date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MiniCalendar, { selected: selectedDate, onSelect: setSelectedDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wide", children: "Select time slot" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-4 gap-2",
                    "data-ocid": "reschedule.slots",
                    children: DEFAULT_SLOTS.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedSlot(slot),
                        className: `
                    py-2 text-xs font-medium rounded-lg border transition-smooth
                    ${selectedSlot === slot ? "bg-primary text-primary-foreground border-primary/60 shadow-glow-cyan" : "bg-muted/30 border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"}
                  `,
                        "data-ocid": `reschedule.slot.${slot.replace(/\s+/g, "_").toLowerCase()}`,
                        children: slot
                      },
                      slot
                    ))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NeonButton,
                  {
                    variant: "ghost",
                    size: "md",
                    className: "flex-1",
                    onClick: onClose,
                    disabled: isLoading,
                    "data-ocid": "reschedule.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NeonButton,
                  {
                    variant: "cyan",
                    size: "md",
                    className: "flex-1",
                    disabled: !selectedDate || !selectedSlot,
                    isLoading,
                    onClick: () => onConfirm({
                      appointmentId: appointment.id,
                      date: selectedDate,
                      timeSlot: selectedSlot
                    }),
                    "data-ocid": "reschedule.confirm_button",
                    children: "Confirm Reschedule"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function CancelModal({
  appointment,
  onClose,
  onConfirm,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "cancel.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative z-10 w-full max-w-sm",
            initial: { scale: 0.9, opacity: 0, y: 20 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.9, opacity: 0, y: 20 },
            transition: { type: "spring", stiffness: 300, damping: 25 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { variant: "thick", padding: "lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarX, { className: "w-7 h-7 text-destructive" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl mb-2", children: "Cancel Appointment?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                  "You're about to cancel your appointment with",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: getDoctorName(appointment.doctorId) }),
                  " ",
                  "on",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatDisplayDate(appointment.date) }),
                  " ",
                  "at",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: appointment.timeSlot }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NeonButton,
                  {
                    variant: "ghost",
                    size: "md",
                    className: "flex-1",
                    onClick: onClose,
                    disabled: isLoading,
                    "data-ocid": "cancel.cancel_button",
                    children: "Keep it"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NeonButton,
                  {
                    variant: "danger",
                    size: "md",
                    className: "flex-1",
                    isLoading,
                    onClick: onConfirm,
                    "data-ocid": "cancel.confirm_button",
                    children: "Yes, Cancel"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
const FILTER_OPTIONS = [
  "All",
  "Upcoming",
  "Completed",
  "Cancelled"
];
function Appointments() {
  const { actor, isLoading: backendLoading } = useBackend();
  const { success, error } = useToast();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const [rescheduleTarget, setRescheduleTarget] = reactExports.useState(
    null
  );
  const [cancelTarget, setCancelTarget] = reactExports.useState(null);
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
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) return;
      await actor.cancelAppointment(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      success("Appointment cancelled");
      setCancelTarget(null);
    },
    onError: () => {
      error("Failed to cancel", "Please try again.");
    }
  });
  const rescheduleMutation = useMutation({
    mutationFn: async (input) => {
      if (!actor) return;
      await actor.rescheduleAppointment(input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      success("Appointment rescheduled successfully!");
      setRescheduleTarget(null);
    },
    onError: () => {
      error("Failed to reschedule", "The slot may already be taken.");
    }
  });
  const filtered = reactExports.useMemo(() => {
    let list = appointments;
    if (filterStatus !== "All") {
      list = list.filter((a) => a.status === filterStatus);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) => getDoctorName(a.doctorId).toLowerCase().includes(q) || getDoctorSpecialty(a.doctorId).toLowerCase().includes(q)
      );
    }
    return list;
  }, [appointments, filterStatus, search]);
  const openReschedule = reactExports.useCallback((appt) => {
    setRescheduleTarget(appt);
  }, []);
  const openCancel = reactExports.useCallback((appt) => {
    setCancelTarget(appt);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          className: "mb-8",
          "data-ocid": "appointments.page",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold mb-1.5", children: "My Appointments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Track, reschedule, or cancel your medical appointments." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.15 },
          className: "flex flex-col sm:flex-row gap-3 mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search by doctor or specialty…",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "w-full pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-muted/60 transition-smooth",
                  "data-ocid": "appointments.search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-2 flex-wrap",
                "data-ocid": "appointments.status_filter",
                children: FILTER_OPTIONS.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setFilterStatus(status),
                    className: `px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-smooth border ${filterStatus === status ? status === "Upcoming" ? "bg-primary/15 text-primary border-primary/30" : status === "Completed" ? "bg-accent/15 text-accent border-accent/30" : status === "Cancelled" ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-muted text-foreground border-border/50" : "bg-muted/40 text-muted-foreground border-border/30 hover:text-foreground hover:border-border/50"}`,
                    "data-ocid": `appointments.filter.${status.toLowerCase()}.tab`,
                    children: status
                  },
                  status
                ))
              }
            )
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 4 }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          className: "text-center py-20",
          "data-ocid": "appointments.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-muted/40 border border-border/20 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold mb-2", children: "No appointments found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm mx-auto", children: search ? "No results match your search. Try a different name or specialty." : `You don't have any ${filterStatus !== "All" ? filterStatus.toLowerCase() : ""} appointments yet.` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/doctors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              NeonButton,
              {
                variant: "cyan",
                size: "md",
                "data-ocid": "appointments.empty_state.book_button",
                children: "Book Your First Appointment"
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "space-y-4", children: filtered.map((appt, idx) => {
        const cfg = STATUS_CONFIG[appt.status] ?? STATUS_CONFIG.Upcoming;
        const StatusIcon = cfg.icon;
        const doctorName = getDoctorName(appt.doctorId);
        const specialty = getDoctorSpecialty(appt.doctorId);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            variant: "elevated",
            padding: "md",
            className: "flex flex-col sm:flex-row sm:items-center gap-4 hover:border-border/50",
            "data-ocid": `appointments.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 text-sm font-bold text-primary-foreground shadow-glow-cyan", children: getInitials(doctorName) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: doctorName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: specialty }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 shrink-0" }),
                    formatDisplayDate(appt.date),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-0.5", children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 shrink-0" }),
                    appt.timeSlot
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-3 h-3" }),
                      cfg.label
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                  "$",
                  appt.fees.toString()
                ] }),
                appt.status === "Upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NeonButton,
                    {
                      variant: "ghost",
                      size: "sm",
                      leftIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                      onClick: () => openReschedule(appt),
                      "data-ocid": `appointments.reschedule_button.${idx + 1}`,
                      children: "Reschedule"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NeonButton,
                    {
                      variant: "danger",
                      size: "sm",
                      onClick: () => openCancel(appt),
                      "data-ocid": `appointments.delete_button.${idx + 1}`,
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) }, appt.id.toString());
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
      rescheduleTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RescheduleModal,
        {
          appointment: rescheduleTarget,
          onClose: () => setRescheduleTarget(null),
          onConfirm: (input) => rescheduleMutation.mutate(input),
          isLoading: rescheduleMutation.isPending
        },
        "reschedule-modal"
      ),
      cancelTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CancelModal,
        {
          appointment: cancelTarget,
          onClose: () => setCancelTarget(null),
          onConfirm: () => cancelMutation.mutate(cancelTarget.id),
          isLoading: cancelMutation.isPending
        },
        "cancel-modal"
      )
    ] })
  ] });
}
export {
  Appointments as default
};
