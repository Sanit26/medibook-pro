import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  CalendarX,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { TableSkeleton } from "../components/ui/LoadingSkeleton";
import { NeonButton } from "../components/ui/NeonButton";
import { StaggerContainer, StaggerItem } from "../components/ui/PageTransition";
import { useBackend } from "../hooks/useBackend";
import { useToast } from "../hooks/useToast";
import type { Appointment, AppointmentStatus } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RescheduleInput {
  appointmentId: bigint;
  date: string;
  timeSlot: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  AppointmentStatus,
  { icon: React.ElementType; color: string; label: string }
> = {
  Upcoming: {
    icon: Clock,
    color: "text-primary border-primary/30 bg-primary/10",
    label: "Upcoming",
  },
  Completed: {
    icon: CheckCircle,
    color: "text-accent border-accent/30 bg-accent/10",
    label: "Completed",
  },
  Cancelled: {
    icon: X,
    color: "text-destructive border-destructive/30 bg-destructive/10",
    label: "Cancelled",
  },
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
  "December",
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
  "04:00 PM",
];

function isoDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function getDoctorName(id: bigint) {
  const map: Record<string, string> = {
    "1": "Dr. Sarah Mitchell",
    "2": "Dr. James Ortega",
    "3": "Dr. Priya Sharma",
    "4": "Dr. Alan Chen",
    "5": "Dr. Maria Torres",
  };
  return map[id.toString()] ?? `Dr. (ID: ${id.toString()})`;
}

function getDoctorSpecialty(id: bigint) {
  const map: Record<string, string> = {
    "1": "Cardiology",
    "2": "Neurology",
    "3": "Dermatology",
    "4": "Orthopedics",
    "5": "Pediatrics",
  };
  return map[id.toString()] ?? "General Medicine";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((_, i) => i > 0)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayIso = isoDate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
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

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="w-7 h-7 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center transition-smooth"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-sm font-semibold">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-7 h-7 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center transition-smooth"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] text-muted-foreground font-medium py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          const cellKey = day
            ? `day-${viewYear}-${viewMonth}-${day}`
            : `empty-${viewYear}-${viewMonth}-${i}`;
          if (!day) return <div key={cellKey} aria-hidden="true" />;
          const iso = isoDate(viewYear, viewMonth, day);
          const isPast = iso < todayIso;
          const isSelected = iso === selected;
          const isToday = iso === todayIso;
          return (
            <button
              key={cellKey}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(iso)}
              className={`
                w-8 h-8 mx-auto text-xs rounded-lg transition-smooth font-medium
                ${isPast ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-primary/15 cursor-pointer"}
                ${isSelected ? "bg-primary text-primary-foreground shadow-glow-cyan" : ""}
                ${isToday && !isSelected ? "border border-primary/40 text-primary" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Reschedule Modal ─────────────────────────────────────────────────────────
function RescheduleModal({
  appointment,
  onClose,
  onConfirm,
  isLoading,
}: {
  appointment: Appointment;
  onClose: () => void;
  onConfirm: (input: RescheduleInput) => void;
  isLoading: boolean;
}) {
  const [selectedDate, setSelectedDate] = useState(appointment.date);
  const [selectedSlot, setSelectedSlot] = useState("");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="reschedule.dialog"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <GlassCard variant="thick" padding="lg" className="relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center transition-smooth"
            data-ocid="reschedule.close_button"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">
                Reschedule Appointment
              </h3>
              <p className="text-xs text-muted-foreground">
                {getDoctorName(appointment.doctorId)} ·{" "}
                {getDoctorSpecialty(appointment.doctorId)}
              </p>
            </div>
          </div>

          {/* Current booking info */}
          <div className="glass rounded-lg p-3 mb-5 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            Current: {formatDisplayDate(appointment.date)} at{" "}
            {appointment.timeSlot}
          </div>

          {/* Calendar */}
          <div className="mb-5">
            <p className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              Select new date
            </p>
            <MiniCalendar selected={selectedDate} onSelect={setSelectedDate} />
          </div>

          {/* Time slots */}
          <div className="mb-6">
            <p className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              Select time slot
            </p>
            <div
              className="grid grid-cols-4 gap-2"
              data-ocid="reschedule.slots"
            >
              {DEFAULT_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`
                    py-2 text-xs font-medium rounded-lg border transition-smooth
                    ${
                      selectedSlot === slot
                        ? "bg-primary text-primary-foreground border-primary/60 shadow-glow-cyan"
                        : "bg-muted/30 border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }
                  `}
                  data-ocid={`reschedule.slot.${slot.replace(/\s+/g, "_").toLowerCase()}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <NeonButton
              variant="ghost"
              size="md"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
              data-ocid="reschedule.cancel_button"
            >
              Cancel
            </NeonButton>
            <NeonButton
              variant="cyan"
              size="md"
              className="flex-1"
              disabled={!selectedDate || !selectedSlot}
              isLoading={isLoading}
              onClick={() =>
                onConfirm({
                  appointmentId: appointment.id,
                  date: selectedDate,
                  timeSlot: selectedSlot,
                })
              }
              data-ocid="reschedule.confirm_button"
            >
              Confirm Reschedule
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ─── Cancel Confirm Modal ─────────────────────────────────────────────────────
function CancelModal({
  appointment,
  onClose,
  onConfirm,
  isLoading,
}: {
  appointment: Appointment;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="cancel.dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <GlassCard variant="thick" padding="lg">
          <div className="text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-4">
              <CalendarX className="w-7 h-7 text-destructive" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">
              Cancel Appointment?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You're about to cancel your appointment with{" "}
              <span className="text-foreground font-medium">
                {getDoctorName(appointment.doctorId)}
              </span>{" "}
              on{" "}
              <span className="text-foreground font-medium">
                {formatDisplayDate(appointment.date)}
              </span>{" "}
              at{" "}
              <span className="text-foreground font-medium">
                {appointment.timeSlot}
              </span>
              .
            </p>
          </div>

          <div className="flex gap-3">
            <NeonButton
              variant="ghost"
              size="md"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
              data-ocid="cancel.cancel_button"
            >
              Keep it
            </NeonButton>
            <NeonButton
              variant="danger"
              size="md"
              className="flex-1"
              isLoading={isLoading}
              onClick={onConfirm}
              data-ocid="cancel.confirm_button"
            >
              Yes, Cancel
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Appointments Page ───────────────────────────────────────────────────
const FILTER_OPTIONS: (AppointmentStatus | "All")[] = [
  "All",
  "Upcoming",
  "Completed",
  "Cancelled",
];

export default function Appointments() {
  const { actor, isLoading: backendLoading } = useBackend();
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(
    null,
  );
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as Record<string, () => Promise<Appointment[]>>
        ).getMyAppointments();
        return result;
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
  });

  // ── Cancel mutation ────────────────────────────────────────────────────────
  const cancelMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) return;
      await (
        actor as unknown as Record<string, (id: bigint) => Promise<unknown>>
      ).cancelAppointment(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      success("Appointment cancelled");
      setCancelTarget(null);
    },
    onError: () => {
      error("Failed to cancel", "Please try again.");
    },
  });

  // ── Reschedule mutation ────────────────────────────────────────────────────
  const rescheduleMutation = useMutation({
    mutationFn: async (input: RescheduleInput) => {
      if (!actor) return;
      await (
        actor as unknown as Record<
          string,
          (input: RescheduleInput) => Promise<unknown>
        >
      ).rescheduleAppointment(input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      success("Appointment rescheduled successfully!");
      setRescheduleTarget(null);
    },
    onError: () => {
      error("Failed to reschedule", "The slot may already be taken.");
    },
  });

  // ── Filter + search ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = appointments;
    if (filterStatus !== "All") {
      list = list.filter((a) => a.status === filterStatus);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          getDoctorName(a.doctorId).toLowerCase().includes(q) ||
          getDoctorSpecialty(a.doctorId).toLowerCase().includes(q),
      );
    }
    return list;
  }, [appointments, filterStatus, search]);

  const openReschedule = useCallback((appt: Appointment) => {
    setRescheduleTarget(appt);
  }, []);
  const openCancel = useCallback((appt: Appointment) => {
    setCancelTarget(appt);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
          data-ocid="appointments.page"
        >
          <h1 className="text-3xl font-display font-bold mb-1.5">
            My Appointments
          </h1>
          <p className="text-muted-foreground text-sm">
            Track, reschedule, or cancel your medical appointments.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by doctor or specialty…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-muted/60 transition-smooth"
              data-ocid="appointments.search_input"
            />
          </div>

          {/* Status filter */}
          <div
            className="flex gap-2 flex-wrap"
            data-ocid="appointments.status_filter"
          >
            {FILTER_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-smooth border ${
                  filterStatus === status
                    ? status === "Upcoming"
                      ? "bg-primary/15 text-primary border-primary/30"
                      : status === "Completed"
                        ? "bg-accent/15 text-accent border-accent/30"
                        : status === "Cancelled"
                          ? "bg-destructive/15 text-destructive border-destructive/30"
                          : "bg-muted text-foreground border-border/50"
                    : "bg-muted/40 text-muted-foreground border-border/30 hover:text-foreground hover:border-border/50"
                }`}
                data-ocid={`appointments.filter.${status.toLowerCase()}.tab`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <TableSkeleton rows={4} />
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
            data-ocid="appointments.empty_state"
          >
            <div className="w-20 h-20 rounded-3xl bg-muted/40 border border-border/20 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">
              No appointments found
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              {search
                ? "No results match your search. Try a different name or specialty."
                : `You don't have any ${filterStatus !== "All" ? filterStatus.toLowerCase() : ""} appointments yet.`}
            </p>
            <Link to="/doctors">
              <NeonButton
                variant="cyan"
                size="md"
                data-ocid="appointments.empty_state.book_button"
              >
                Book Your First Appointment
              </NeonButton>
            </Link>
          </motion.div>
        ) : (
          <StaggerContainer className="space-y-4">
            {filtered.map((appt, idx) => {
              const cfg = STATUS_CONFIG[appt.status] ?? STATUS_CONFIG.Upcoming;
              const StatusIcon = cfg.icon;
              const doctorName = getDoctorName(appt.doctorId);
              const specialty = getDoctorSpecialty(appt.doctorId);

              return (
                <StaggerItem key={appt.id.toString()}>
                  <GlassCard
                    variant="elevated"
                    padding="md"
                    className="flex flex-col sm:flex-row sm:items-center gap-4 hover:border-border/50"
                    data-ocid={`appointments.item.${idx + 1}`}
                  >
                    {/* Doctor info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 text-sm font-bold text-primary-foreground shadow-glow-cyan">
                        {getInitials(doctorName)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {doctorName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {specialty}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 flex-wrap">
                          <Calendar className="w-3 h-3 shrink-0" />
                          {formatDisplayDate(appt.date)}
                          <span className="mx-0.5">·</span>
                          <Clock className="w-3 h-3 shrink-0" />
                          {appt.timeSlot}
                        </p>
                      </div>
                    </div>

                    {/* Right side: status + fees + actions */}
                    <div className="flex items-center gap-3 flex-wrap shrink-0">
                      {/* Status badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {cfg.label}
                      </span>

                      {/* Fees */}
                      <span className="text-sm font-semibold text-foreground">
                        ${appt.fees.toString()}
                      </span>

                      {/* Actions (upcoming only) */}
                      {appt.status === "Upcoming" && (
                        <div className="flex gap-2">
                          <NeonButton
                            variant="ghost"
                            size="sm"
                            leftIcon={<RefreshCw className="w-3 h-3" />}
                            onClick={() => openReschedule(appt)}
                            data-ocid={`appointments.reschedule_button.${idx + 1}`}
                          >
                            Reschedule
                          </NeonButton>
                          <NeonButton
                            variant="danger"
                            size="sm"
                            onClick={() => openCancel(appt)}
                            data-ocid={`appointments.delete_button.${idx + 1}`}
                          >
                            Cancel
                          </NeonButton>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {rescheduleTarget && (
          <RescheduleModal
            key="reschedule-modal"
            appointment={rescheduleTarget}
            onClose={() => setRescheduleTarget(null)}
            onConfirm={(input) => rescheduleMutation.mutate(input)}
            isLoading={rescheduleMutation.isPending}
          />
        )}
        {cancelTarget && (
          <CancelModal
            key="cancel-modal"
            appointment={cancelTarget}
            onClose={() => setCancelTarget(null)}
            onConfirm={() => cancelMutation.mutate(cancelTarget.id)}
            isLoading={cancelMutation.isPending}
          />
        )}
      </AnimatePresence>
    </>
  );
}
