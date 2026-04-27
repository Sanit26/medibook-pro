import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { NeonButton } from "../components/ui/NeonButton";
import { FadeIn } from "../components/ui/PageTransition";
import { useBackend } from "../hooks/useBackend";
import { useToast } from "../hooks/useToast";
import { cn } from "../lib/utils";
import type { BookAppointmentInput, Doctor } from "../types";

// ─── Types ─────────────────────────────────────────────────────────────────

interface TimeSlot {
  time: string;
  isBooked: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

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
  "December",
];

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function dayOfWeekLabel(date: Date): string {
  return DAY_NAMES[date.getDay()];
}

function getDoctorAvailableDays(doctor: Doctor): Set<string> {
  return new Set(doctor.availability.map((d) => d.day.slice(0, 3)));
}

// ─── Custom Calendar ───────────────────────────────────────────────────────

interface CalendarProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
  availableDays: Set<string>;
}

function BookingCalendar({
  selectedDate,
  onSelect,
  availableDays,
}: CalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [direction, setDirection] = useState<1 | -1>(1);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
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

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="w-full select-none" data-ocid="booking.calendar">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className={cn(
            "p-2 rounded-lg transition-smooth",
            canGoPrev
              ? "hover:bg-primary/20 text-foreground"
              : "opacity-30 cursor-not-allowed text-muted-foreground",
          )}
          aria-label="Previous month"
          data-ocid="booking.calendar_prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.h3
            key={`${viewYear}-${viewMonth}`}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2 }}
            className="font-display font-semibold text-foreground text-lg"
          >
            {MONTH_NAMES[viewMonth]} {viewYear}
          </motion.h3>
        </AnimatePresence>

        <button
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-primary/20 text-foreground transition-smooth"
          aria-label="Next month"
          data-ocid="booking.calendar_next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-muted-foreground py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${viewYear}-${viewMonth}`}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-7 gap-1"
        >
          {cells.map((day, idx) => {
            // biome-ignore lint/suspicious/noArrayIndexKey: calendar empty cells use positional index
            if (!day) return <div key={`empty-${idx}`} />;
            const dateObj = new Date(viewYear, viewMonth, day);
            const dayLabel = dayOfWeekLabel(dateObj);
            const isPast = dateObj < today;
            const isToday = dateObj.getTime() === today.getTime();
            const isAvailable = availableDays.has(dayLabel);
            const dateStr = isoDate(viewYear, viewMonth, day);
            const isSelected = selectedDate === dateStr;
            const isDisabled = isPast || !isAvailable;

            return (
              <motion.button
                key={dateStr}
                type="button"
                whileHover={!isDisabled ? { scale: 1.12 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && onSelect(dateStr)}
                disabled={isDisabled}
                data-ocid={`booking.calendar_day.${idx}`}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-smooth relative",
                  isSelected &&
                    "bg-primary text-primary-foreground shadow-glow-cyan",
                  !isSelected &&
                    isToday &&
                    "border border-primary/60 text-primary",
                  !isSelected &&
                    !isToday &&
                    isAvailable &&
                    !isPast &&
                    "hover:bg-primary/20 text-foreground cursor-pointer",
                  isDisabled &&
                    !isToday &&
                    "text-muted-foreground/30 cursor-not-allowed",
                  !isAvailable &&
                    !isPast &&
                    !isToday &&
                    "text-muted-foreground/40 cursor-not-allowed",
                )}
                aria-label={`${dayLabel} ${dateStr}`}
                aria-pressed={isSelected}
              >
                {day}
                {isAvailable && !isPast && !isSelected && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent opacity-70" />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />{" "}
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />{" "}
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/30 inline-block" />{" "}
          Unavailable
        </span>
      </div>
    </div>
  );
}

// ─── Step Indicator ────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = [
    { label: "Choose Date", icon: Calendar },
    { label: "Time Slot", icon: Clock },
    { label: "Confirm", icon: CheckCircle },
  ];
  return (
    <div
      className="flex items-center justify-center gap-0 mb-8"
      data-ocid="booking.step_indicator"
    >
      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = i === step;
        const isDone = i < step;
        return (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={
                  isActive
                    ? {
                        scale: 1.15,
                        boxShadow: "0 0 16px oklch(0.7 0.18 200 / 0.5)",
                      }
                    : isDone
                      ? { scale: 1 }
                      : { scale: 0.9 }
                }
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth",
                  isActive && "border-primary bg-primary/20 text-primary",
                  isDone && "border-accent bg-accent/20 text-accent",
                  !isActive &&
                    !isDone &&
                    "border-border/40 bg-muted/20 text-muted-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive
                    ? "text-primary"
                    : isDone
                      ? "text-accent"
                      : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-14 h-px mx-1 mb-4 transition-smooth",
                  isDone ? "bg-accent/60" : "bg-border/40",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Confirm Modal ─────────────────────────────────────────────────────────

interface ConfirmModalProps {
  doctor: Doctor;
  date: string;
  slot: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

function ConfirmModal({
  doctor,
  date,
  slot,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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
      value: doctor.specialization,
    },
    {
      icon: Calendar,
      label: "Date",
      value: new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    { icon: Clock, label: "Time", value: slot },
    {
      icon: DollarSign,
      label: "Consultation Fee",
      value: `$${Number(doctor.fees)}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      data-ocid="booking.dialog"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md"
      >
        <GlassCard variant="neon-cyan" padding="lg" className="relative">
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close"
            data-ocid="booking.close_button"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-4 shadow-glow-cyan">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Confirm Booking
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Review your appointment details below
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {rows.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/20"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground truncate">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <NeonButton
              variant="ghost"
              size="md"
              onClick={onCancel}
              className="flex-1"
              data-ocid="booking.cancel_button"
            >
              Cancel
            </NeonButton>
            <NeonButton
              variant="lime"
              size="md"
              onClick={onConfirm}
              isLoading={isLoading}
              className="flex-1"
              data-ocid="booking.confirm_button"
            >
              Confirm Booking
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ─── Step slide variants ───────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function Book() {
  const { doctorId } = useParams({ from: "/book/$doctorId" });
  const navigate = useNavigate();
  const { actor, isLoading: isActorLoading } = useBackend();
  const { success, error: showError } = useToast();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isFetchingDoctor, setIsFetchingDoctor] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [step, setStep] = useState(0);
  const [stepDir, setStepDir] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Fetch doctor on mount
  useEffect(() => {
    if (!actor || isActorLoading) return;
    (async () => {
      setIsFetchingDoctor(true);
      try {
        const result = await (
          actor as unknown as {
            getDoctor: (id: bigint) => Promise<Doctor | null>;
          }
        ).getDoctor(BigInt(doctorId));
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

  const availableDays = useMemo(
    () => (doctor ? getDoctorAvailableDays(doctor) : new Set<string>()),
    [doctor],
  );

  // Fetch slots when a date is picked
  useEffect(() => {
    if (!selectedDate || !actor || !doctor) return;
    const dateObj = new Date(`${selectedDate}T00:00:00`);
    const dow = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    setIsFetchingSlots(true);
    setSlots([]);
    setSelectedSlot(null);
    (async () => {
      try {
        const result = await (
          actor as unknown as {
            getAvailableSlots: (
              doctorId: bigint,
              date: string,
              dayOfWeek: string,
            ) => Promise<string[]>;
          }
        ).getAvailableSlots(doctor.id, selectedDate, dow);
        setSlots(result.map((time) => ({ time, isBooked: false })));
      } catch {
        showError("Failed to load slots", "Please try again");
      } finally {
        setIsFetchingSlots(false);
      }
    })();
  }, [selectedDate, actor, doctor, showError]);

  const goNext = useCallback(() => {
    setStepDir(1);
    setStep((s) => s + 1);
  }, []);

  const goBack = useCallback(() => {
    setStepDir(-1);
    setStep((s) => s - 1);
  }, []);

  const handleConfirmBooking = async () => {
    if (!actor || !doctor || !selectedDate || !selectedSlot) return;
    setIsBooking(true);
    try {
      const input: BookAppointmentInput = {
        doctorId: doctor.id,
        date: selectedDate,
        timeSlot: selectedSlot,
      };
      const result = await (
        actor as unknown as {
          bookAppointment: (
            input: BookAppointmentInput,
          ) => Promise<{ __kind__: "ok" } | { __kind__: "doubleBooking" }>;
        }
      ).bookAppointment(input);

      if (result.__kind__ === "ok") {
        success(
          "Appointment Confirmed!",
          `Booked with Dr. ${doctor.name} on ${selectedDate} at ${selectedSlot}`,
        );
        setShowConfirm(false);
        navigate({ to: "/appointments" });
      } else {
        showError(
          "Double Booking",
          "This time slot was just booked. Please choose another.",
        );
        setShowConfirm(false);
      }
    } catch {
      showError("Booking Failed", "An error occurred. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const formattedDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (isActorLoading || isFetchingDoctor) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <GlassCard
          variant="neon-cyan"
          padding="lg"
          className="w-full max-w-sm text-center"
          data-ocid="booking.loading_state"
        >
          <div className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-foreground font-display font-semibold">
            Loading Doctor
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Fetching details…
          </p>
        </GlassCard>
      </div>
    );
  }

  // ─── Error ────────────────────────────────────────────────────────────────
  if (fetchError || !doctor) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <GlassCard
          variant="neon-purple"
          padding="lg"
          className="w-full max-w-sm text-center"
          data-ocid="booking.error_state"
        >
          <div className="w-12 h-12 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 text-destructive" />
          </div>
          <p className="text-foreground font-display font-semibold text-lg">
            {fetchError ?? "Doctor not found"}
          </p>
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/doctors" })}
            className="mt-4"
          >
            Back to Doctors
          </NeonButton>
        </GlassCard>
      </div>
    );
  }

  // ─── Page ─────────────────────────────────────────────────────────────────
  return (
    <>
      <FadeIn
        className="min-h-screen px-4 py-8 max-w-6xl mx-auto"
        data-ocid="booking.page"
      >
        {/* Header row */}
        <div className="mb-8 flex items-center gap-4">
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/doctors" })}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
            data-ocid="booking.back_button"
          >
            Back
          </NeonButton>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Book Appointment
            </h1>
            <p className="text-muted-foreground text-sm">
              Schedule your consultation in 3 easy steps
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* ── Left panel: doctor info ── */}
          <FadeIn delay={0.1}>
            <GlassCard
              variant="neon-purple"
              padding="lg"
              className="sticky top-24"
              data-ocid="booking.doctor_card"
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/30 to-primary/30 border border-secondary/30 flex items-center justify-center mb-4 shadow-glow-purple">
                <User className="w-10 h-10 text-secondary" />
              </div>

              <h2 className="font-display text-xl font-bold text-foreground">
                Dr. {doctor.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                <Stethoscope className="w-3.5 h-3.5 text-secondary" />
                <span className="text-secondary text-sm font-medium">
                  {doctor.specialization}
                </span>
              </div>

              <div className="my-4 border-t border-border/20" />

              <div className="space-y-3">
                {/* Fee */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Consultation Fee
                    </p>
                    <p className="text-foreground font-semibold">
                      ${Number(doctor.fees)}
                    </p>
                  </div>
                </div>

                {/* Available days */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">
                      Available Days
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {DAY_NAMES.map((d) => (
                        <span
                          key={d}
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-md font-medium",
                            availableDays.has(d)
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-muted/20 text-muted-foreground/50 border border-border/20",
                          )}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-5 p-3 rounded-lg bg-muted/20 border border-border/20">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Board-certified specialist with over 10 years of clinical
                  experience. Committed to providing compassionate,
                  evidence-based care tailored to each patient's individual
                  needs.
                </p>
              </div>

              {/* Live selection summary */}
              {(selectedDate || selectedSlot) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/30"
                >
                  <p className="text-xs font-semibold text-primary mb-2">
                    Your Selection
                  </p>
                  {selectedDate && (
                    <p className="text-xs text-foreground flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-primary" />{" "}
                      {formattedDate}
                    </p>
                  )}
                  {selectedSlot && (
                    <p className="text-xs text-foreground flex items-center gap-1.5 mt-1">
                      <Clock className="w-3 h-3 text-primary" /> {selectedSlot}
                    </p>
                  )}
                </motion.div>
              )}
            </GlassCard>
          </FadeIn>

          {/* ── Right panel: booking flow ── */}
          <FadeIn delay={0.2}>
            <GlassCard
              variant="neon-cyan"
              padding="lg"
              data-ocid="booking.flow_panel"
            >
              <StepIndicator step={step} />

              <div className="relative overflow-hidden min-h-[460px]">
                <AnimatePresence mode="wait" custom={stepDir}>
                  {/* Step 0 — Date picker */}
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      custom={stepDir}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      data-ocid="booking.step_date"
                    >
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        Select a Date
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6">
                        Only days when Dr. {doctor.name} is available are
                        selectable.
                      </p>
                      <BookingCalendar
                        selectedDate={selectedDate}
                        onSelect={setSelectedDate}
                        availableDays={availableDays}
                      />
                      <div className="mt-8 flex justify-end">
                        <NeonButton
                          variant="cyan"
                          size="lg"
                          onClick={goNext}
                          disabled={!selectedDate}
                          rightIcon={<ChevronRight className="w-5 h-5" />}
                          data-ocid="booking.next_button"
                        >
                          Continue
                        </NeonButton>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1 — Time slots */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      custom={stepDir}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      data-ocid="booking.step_slots"
                    >
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        Select a Time Slot
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6">
                        Available times on{" "}
                        <span className="text-primary font-medium">
                          {formattedDate}
                        </span>
                      </p>

                      {isFetchingSlots ? (
                        <div
                          className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                          data-ocid="booking.slots.loading_state"
                        >
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                              key={i}
                              className="h-12 rounded-xl bg-muted/30 animate-pulse border border-border/20"
                            />
                          ))}
                        </div>
                      ) : slots.length === 0 ? (
                        <div
                          className="flex flex-col items-center py-12 text-center"
                          data-ocid="booking.slots.empty_state"
                        >
                          <div className="w-14 h-14 rounded-full bg-muted/20 border border-border/30 flex items-center justify-center mb-3">
                            <Clock className="w-7 h-7 text-muted-foreground" />
                          </div>
                          <p className="text-foreground font-medium">
                            No slots available
                          </p>
                          <p className="text-muted-foreground text-sm mt-1">
                            All time slots for this day are booked.
                          </p>
                        </div>
                      ) : (
                        <motion.div
                          className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.04 } },
                          }}
                          data-ocid="booking.slots.list"
                        >
                          {slots.map((slot, i) => {
                            const isSelected = selectedSlot === slot.time;
                            return (
                              <motion.button
                                key={slot.time}
                                type="button"
                                variants={{
                                  hidden: { opacity: 0, scale: 0.85 },
                                  visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: { duration: 0.25 },
                                  },
                                }}
                                whileHover={
                                  !slot.isBooked ? { scale: 1.05 } : {}
                                }
                                whileTap={!slot.isBooked ? { scale: 0.95 } : {}}
                                onClick={() =>
                                  !slot.isBooked && setSelectedSlot(slot.time)
                                }
                                disabled={slot.isBooked}
                                data-ocid={`booking.slot.${i + 1}`}
                                aria-pressed={isSelected}
                                aria-label={`${slot.time}${slot.isBooked ? " — booked" : ""}`}
                                className={cn(
                                  "h-12 rounded-xl text-sm font-semibold transition-smooth border relative",
                                  isSelected
                                    ? "bg-primary text-primary-foreground shadow-glow-cyan border-primary/50"
                                    : slot.isBooked
                                      ? "bg-muted/10 text-muted-foreground/30 border-border/10 cursor-not-allowed"
                                      : "bg-muted/20 text-foreground border-border/30 hover:border-primary/50 hover:bg-primary/10 cursor-pointer",
                                )}
                              >
                                {slot.isBooked ? (
                                  <span className="line-through opacity-40">
                                    {slot.time}
                                  </span>
                                ) : (
                                  slot.time
                                )}
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}

                      <div className="mt-8 flex justify-between">
                        <NeonButton
                          variant="ghost"
                          size="md"
                          onClick={goBack}
                          leftIcon={<ChevronLeft className="w-4 h-4" />}
                          data-ocid="booking.back_step_button"
                        >
                          Back
                        </NeonButton>
                        <NeonButton
                          variant="cyan"
                          size="lg"
                          onClick={goNext}
                          disabled={!selectedSlot}
                          rightIcon={<ChevronRight className="w-5 h-5" />}
                          data-ocid="booking.next_button"
                        >
                          Continue
                        </NeonButton>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 — Review */}
                  {step === 2 && selectedDate && selectedSlot && (
                    <motion.div
                      key="step-2"
                      custom={stepDir}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      data-ocid="booking.step_review"
                    >
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        Review &amp; Confirm
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6">
                        Please confirm your appointment details before booking.
                      </p>

                      <div className="space-y-3 mb-6">
                        {[
                          {
                            icon: User,
                            label: "Doctor",
                            value: `Dr. ${doctor.name}`,
                          },
                          {
                            icon: Stethoscope,
                            label: "Specialization",
                            value: doctor.specialization,
                          },
                          {
                            icon: Calendar,
                            label: "Date",
                            value: new Date(
                              `${selectedDate}T00:00:00`,
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }),
                          },
                          { icon: Clock, label: "Time", value: selectedSlot },
                          {
                            icon: DollarSign,
                            label: "Fee",
                            value: `$${Number(doctor.fees)}`,
                          },
                        ].map(({ icon: Icon, label, value }, i) => (
                          <motion.div
                            key={label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.3 }}
                            className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 border border-border/20"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-muted-foreground">
                                {label}
                              </p>
                              <p className="text-sm font-medium text-foreground truncate">
                                {value}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.38 }}
                        className="p-3 rounded-xl bg-accent/10 border border-accent/30 mb-6"
                      >
                        <p className="text-xs text-accent font-medium">
                          ✓ Cancellations must be made at least 24 hours in
                          advance
                        </p>
                      </motion.div>

                      <div className="flex justify-between">
                        <NeonButton
                          variant="ghost"
                          size="md"
                          onClick={goBack}
                          leftIcon={<ChevronLeft className="w-4 h-4" />}
                          data-ocid="booking.back_step_button"
                        >
                          Back
                        </NeonButton>
                        <NeonButton
                          variant="lime"
                          size="lg"
                          onClick={() => setShowConfirm(true)}
                          rightIcon={<CheckCircle className="w-5 h-5" />}
                          data-ocid="booking.open_modal_button"
                        >
                          Book Appointment
                        </NeonButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </FadeIn>

      {/* Confirmation modal */}
      <AnimatePresence>
        {showConfirm && selectedDate && selectedSlot && (
          <ConfirmModal
            doctor={doctor}
            date={selectedDate}
            slot={selectedSlot}
            onConfirm={handleConfirmBooking}
            onCancel={() => setShowConfirm(false)}
            isLoading={isBooking}
          />
        )}
      </AnimatePresence>
    </>
  );
}
