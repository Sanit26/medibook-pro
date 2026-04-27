import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  ChevronDown,
  Clock,
  Pencil,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { TableSkeleton } from "../components/ui/LoadingSkeleton";
import { NeonButton } from "../components/ui/NeonButton";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../components/ui/PageTransition";
import { useBackend } from "../hooks/useBackend";
import { useToast } from "../hooks/useToast";
import type {
  AddDoctorInput,
  Appointment,
  AppointmentStatus,
  Doctor,
} from "../types";

// ─── Sample data ────────────────────────────────────────────────────────────

const DEMO_DOCTORS: Doctor[] = [
  {
    id: BigInt(1),
    name: "Dr. Sarah Mitchell",
    specialization: "Cardiology",
    fees: BigInt(150),
    availability: [
      { day: "Monday", slots: ["09:00", "10:00", "11:00"] },
      { day: "Wednesday", slots: ["14:00", "15:00"] },
    ],
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(2),
    name: "Dr. James Chen",
    specialization: "Neurology",
    fees: BigInt(200),
    availability: [{ day: "Tuesday", slots: ["10:00", "11:00", "14:00"] }],
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(3),
    name: "Dr. Priya Sharma",
    specialization: "Dermatology",
    fees: BigInt(120),
    availability: [
      { day: "Thursday", slots: ["09:00", "10:00"] },
      { day: "Friday", slots: ["15:00", "16:00", "17:00"] },
    ],
    isActive: false,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(4),
    name: "Dr. Marcus Williams",
    specialization: "Orthopedics",
    fees: BigInt(180),
    availability: [{ day: "Monday", slots: ["14:00", "15:00", "16:00"] }],
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(5),
    name: "Dr. Elena Vasquez",
    specialization: "Pediatrics",
    fees: BigInt(130),
    availability: [{ day: "Wednesday", slots: ["09:00", "10:00", "11:00"] }],
    isActive: true,
    createdAt: BigInt(0),
  },
];

const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: BigInt(1),
    patientId: "patient-2xk9f1a",
    doctorId: BigInt(1),
    date: "2026-05-12",
    timeSlot: "09:00",
    status: "Upcoming",
    fees: BigInt(150),
    createdAt: BigInt(0),
    updatedAt: BigInt(0),
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
    updatedAt: BigInt(0),
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
    updatedAt: BigInt(0),
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
    updatedAt: BigInt(0),
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
    updatedAt: BigInt(0),
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
    updatedAt: BigInt(0),
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
  "17:00",
];
const EMPTY_FORM: AddDoctorInput = {
  name: "",
  specialization: "",
  fees: BigInt(0),
  availability: [],
};

type TabId = "appointments" | "doctors";

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const map: Record<AppointmentStatus, string> = {
    Upcoming: "bg-primary/10 text-primary border-primary/30",
    Completed: "bg-accent/10 text-accent border-accent/30",
    Cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${map[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Availability builder ─────────────────────────────────────────────────────

interface AvailabilityBuilderProps {
  value: AddDoctorInput["availability"];
  onChange: (v: AddDoctorInput["availability"]) => void;
}

function AvailabilityBuilder({ value, onChange }: AvailabilityBuilderProps) {
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_WEEK[0]);

  function toggleSlot(day: string, slot: string) {
    const existing = value.find((d) => d.day === day);
    if (existing) {
      const slots = existing.slots.includes(slot)
        ? existing.slots.filter((s) => s !== slot)
        : [...existing.slots, slot].sort();
      const updated =
        slots.length === 0
          ? value.filter((d) => d.day !== day)
          : value.map((d) => (d.day === day ? { ...d, slots } : d));
      onChange(updated);
    } else {
      onChange([...value, { day, slots: [slot] }]);
    }
  }

  const activeDay = value.find((d) => d.day === selectedDay);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {DAYS_OF_WEEK.map((day) => {
          const hasSlots = value.some(
            (d) => d.day === day && d.slots.length > 0,
          );
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1 text-xs rounded-lg border transition-smooth ${
                isActive
                  ? "bg-primary/20 border-primary/60 text-primary font-semibold"
                  : hasSlots
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "bg-muted/30 border-border/30 text-muted-foreground hover:border-border/60"
              }`}
              data-ocid={`admin.doctor_modal.day_${day.toLowerCase()}.toggle`}
            >
              {day.slice(0, 3)}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {TIME_PRESETS.map((slot) => {
          const isSelected = activeDay?.slots.includes(slot) ?? false;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => toggleSlot(selectedDay, slot)}
              className={`px-2 py-1.5 text-xs rounded-lg border text-center transition-smooth ${
                isSelected
                  ? "bg-secondary/20 border-secondary/60 text-secondary font-semibold"
                  : "bg-muted/20 border-border/30 text-muted-foreground hover:border-border/60 hover:bg-muted/40"
              }`}
              data-ocid={`admin.doctor_modal.slot_${slot.replace(":", "")}.toggle`}
            >
              {slot}
            </button>
          );
        })}
      </div>
      {value.length > 0 && (
        <div className="text-xs text-muted-foreground mt-1">
          <span className="text-accent font-medium">
            {value.reduce((a, d) => a + d.slots.length, 0)} slots
          </span>{" "}
          across{" "}
          <span className="text-primary font-medium">{value.length} days</span>
        </div>
      )}
    </div>
  );
}

// ─── Doctor modal ─────────────────────────────────────────────────────────────

interface DoctorModalProps {
  mode: "add" | "edit";
  initial?: Doctor;
  onClose: () => void;
  onSubmit: (form: AddDoctorInput) => Promise<void>;
  isSubmitting: boolean;
}

function DoctorModal({
  mode,
  initial,
  onClose,
  onSubmit,
  isSubmitting,
}: DoctorModalProps) {
  const [form, setForm] = useState<AddDoctorInput>(() =>
    initial
      ? {
          name: initial.name,
          specialization: initial.specialization,
          fees: initial.fees,
          availability: initial.availability,
        }
      : EMPTY_FORM,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      data-ocid="admin.doctor_modal.dialog"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <GlassCard variant="thick" padding="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-display font-bold">
                {mode === "add" ? "Add New Doctor" : "Edit Doctor"}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {mode === "add"
                  ? "Fill in doctor details and availability"
                  : "Update doctor profile"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="admin.doctor_modal.close_button"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form);
            }}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="modal-name"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Full Name *
              </label>
              <input
                id="modal-name"
                type="text"
                placeholder="Dr. Jane Smith"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border/40 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-smooth"
                data-ocid="admin.doctor_modal.name.input"
                required
              />
            </div>

            {/* Specialization */}
            <div>
              <label
                htmlFor="modal-spec"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Specialization *
              </label>
              <input
                id="modal-spec"
                type="text"
                placeholder="e.g. Cardiology"
                value={form.specialization}
                onChange={(e) =>
                  setForm((p) => ({ ...p, specialization: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border/40 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-smooth"
                data-ocid="admin.doctor_modal.specialization.input"
                required
              />
            </div>

            {/* Fees */}
            <div>
              <label
                htmlFor="modal-fees"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Consultation Fee (USD) *
              </label>
              <input
                id="modal-fees"
                type="number"
                min={0}
                placeholder="150"
                value={Number(form.fees)}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fees: BigInt(e.target.value || 0) }))
                }
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border/40 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-smooth"
                data-ocid="admin.doctor_modal.fees.input"
                required
              />
            </div>

            {/* Availability */}
            <div>
              <p className="block text-xs font-medium text-muted-foreground mb-2">
                Availability (select day → toggle time slots)
              </p>
              <div className="glass rounded-xl p-3 border border-border/30">
                <AvailabilityBuilder
                  value={form.availability}
                  onChange={(v) => setForm((p) => ({ ...p, availability: v }))}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <NeonButton
                type="button"
                variant="ghost"
                size="md"
                className="flex-1"
                onClick={onClose}
                data-ocid="admin.doctor_modal.cancel_button"
              >
                Cancel
              </NeonButton>
              <NeonButton
                type="submit"
                variant={mode === "add" ? "lime" : "cyan"}
                size="md"
                className="flex-1"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
                data-ocid="admin.doctor_modal.submit_button"
              >
                {mode === "add" ? "Add Doctor" : "Save Changes"}
              </NeonButton>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ─── Delete confirm dialog ────────────────────────────────────────────────────

function DeleteDialog({
  name,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      data-ocid="admin.delete_dialog.dialog"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-sm"
      >
        <GlassCard variant="thick" padding="lg">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/15 border border-destructive/30 mx-auto mb-4">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <h3 className="text-lg font-display font-bold text-center mb-2">
            Remove Doctor
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Are you sure you want to remove{" "}
            <span className="text-foreground font-medium">{name}</span>? This
            action cannot be undone.
          </p>
          <div className="flex gap-3">
            <NeonButton
              type="button"
              variant="ghost"
              size="md"
              className="flex-1"
              onClick={onCancel}
              data-ocid="admin.delete_dialog.cancel_button"
            >
              Cancel
            </NeonButton>
            <NeonButton
              type="button"
              variant="danger"
              size="md"
              className="flex-1"
              isLoading={isDeleting}
              onClick={onConfirm}
              data-ocid="admin.delete_dialog.confirm_button"
            >
              Delete
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Admin page ──────────────────────────────────────────────────────────

export default function Admin() {
  const { actor, isLoading: backendLoading } = useBackend();
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  // Tab state
  const [activeTab, setActiveTab] = useState<TabId>("appointments");

  // Doctor modal
  const [doctorModal, setDoctorModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    doctor?: Doctor;
  }>({ open: false, mode: "add" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState<{
    id: bigint;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Appointment filters
  const [apptSearch, setApptSearch] = useState("");
  const [apptStatusFilter, setApptStatusFilter] = useState<
    AppointmentStatus | "All"
  >("All");

  // Doctor search
  const [doctorSearch, setDoctorSearch] = useState("");

  // Assign admin
  const [assignPrincipal, setAssignPrincipal] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);

  // ── Data queries ──────────────────────────────────────────────────────────

  const { data: doctors = [], isLoading: doctorsLoading } = useQuery<Doctor[]>({
    queryKey: ["admin-doctors"],
    queryFn: async () => {
      if (!actor) return DEMO_DOCTORS;
      try {
        const result = await (
          actor as unknown as Record<string, () => Promise<Doctor[]>>
        ).listDoctors();
        return result.length > 0 ? result : DEMO_DOCTORS;
      } catch {
        return DEMO_DOCTORS;
      }
    },
    enabled: !backendLoading,
  });

  const { data: appointments = [], isLoading: apptsLoading } = useQuery<
    Appointment[]
  >({
    queryKey: ["admin-appointments"],
    queryFn: async () => {
      if (!actor) return DEMO_APPOINTMENTS;
      try {
        const result = await (
          actor as unknown as Record<string, () => Promise<Appointment[]>>
        ).getAllAppointments();
        return result.length > 0 ? result : DEMO_APPOINTMENTS;
      } catch {
        return DEMO_APPOINTMENTS;
      }
    },
    enabled: !backendLoading,
  });

  // ── Derived stats ─────────────────────────────────────────────────────────

  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "Upcoming",
  ).length;
  const cancelledAppointments = appointments.filter(
    (a) => a.status === "Cancelled",
  ).length;

  const stats = [
    {
      label: "Total Doctors",
      value: totalDoctors,
      icon: Users,
      color: "text-primary",
      glow: "shadow-glow-cyan",
    },
    {
      label: "Total Appointments",
      value: totalAppointments,
      icon: Calendar,
      color: "text-secondary",
      glow: "shadow-glow-purple",
    },
    {
      label: "Upcoming",
      value: upcomingAppointments,
      icon: Clock,
      color: "text-accent",
      glow: "",
    },
    {
      label: "Cancelled",
      value: cancelledAppointments,
      icon: X,
      color: "text-destructive",
      glow: "",
    },
  ];

  // ── Filtered data ─────────────────────────────────────────────────────────

  const filteredAppointments = appointments.filter((a) => {
    const matchStatus =
      apptStatusFilter === "All" || a.status === apptStatusFilter;
    const doctorName = doctors.find((d) => d.id === a.doctorId)?.name ?? "";
    const matchSearch =
      apptSearch === "" ||
      a.patientId.toLowerCase().includes(apptSearch.toLowerCase()) ||
      doctorName.toLowerCase().includes(apptSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredDoctors = doctors.filter(
    (d) =>
      doctorSearch === "" ||
      d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      d.specialization.toLowerCase().includes(doctorSearch.toLowerCase()),
  );

  // ── Handlers ──────────────────────────────────────────────────────────────

  async function handleDoctorSubmit(form: AddDoctorInput) {
    if (!form.name.trim() || !form.specialization.trim()) {
      error("Missing fields", "Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (actor) {
        if (doctorModal.mode === "add") {
          await (
            actor as unknown as Record<
              string,
              (d: AddDoctorInput) => Promise<unknown>
            >
          ).addDoctor(form);
        } else if (doctorModal.doctor) {
          await (
            actor as unknown as Record<
              string,
              (id: bigint, d: AddDoctorInput) => Promise<unknown>
            >
          ).updateDoctor(doctorModal.doctor.id, form);
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      success(
        doctorModal.mode === "add" ? "Doctor added" : "Doctor updated",
        `${form.name} has been ${doctorModal.mode === "add" ? "added to" : "updated in"} the system.`,
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
        await (
          actor as unknown as Record<string, (id: bigint) => Promise<unknown>>
        ).deleteDoctor(deleteTarget.id);
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
        await (
          actor as unknown as Record<string, (p: string) => Promise<unknown>>
        ).assignAdmin(assignPrincipal.trim());
      }
      success(
        "Admin assigned",
        `${assignPrincipal.trim().slice(0, 20)}… is now an admin.`,
      );
      setAssignPrincipal("");
    } catch {
      error("Assignment failed", "Check the principal ID and try again.");
    } finally {
      setIsAssigning(false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="container mx-auto px-4 py-10 max-w-7xl"
      data-ocid="admin.page"
    >
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="p-2.5 rounded-xl bg-secondary/15 border border-secondary/30 shadow-glow-purple">
                <ShieldCheck className="w-5 h-5 text-secondary" />
              </div>
              <h1 className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                Admin Dashboard
              </h1>
              <span className="px-2 py-0.5 text-xs rounded-full bg-secondary/20 text-secondary border border-secondary/30 font-semibold">
                ADMIN
              </span>
            </div>
            <p className="text-muted-foreground text-sm ml-14">
              Manage doctors, appointments, and system access
            </p>
          </div>
          <NeonButton
            variant="lime"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setDoctorModal({ open: true, mode: "add" })}
            data-ocid="admin.add_doctor.open_modal_button"
          >
            Add Doctor
          </NeonButton>
        </div>
      </FadeIn>

      {/* Stats row */}
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color, glow }, idx) => (
          <StaggerItem key={label}>
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <GlassCard
                variant="elevated"
                padding="md"
                className={`${glow} cursor-default`}
                data-ocid={`admin.stat.card.${idx + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className={`text-3xl font-display font-bold ${color} tabular-nums`}
                    >
                      {typeof value === "number" ? (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          {value}
                        </motion.span>
                      ) : (
                        value
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1.5 font-medium">
                      {label}
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-lg bg-muted/30 border border-border/20 ${color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 glass rounded-xl mb-8 w-fit"
        data-ocid="admin.tabs.tab"
      >
        {(["appointments", "doctors"] as TabId[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-smooth capitalize ${
              activeTab === tab
                ? "bg-primary/20 text-primary border border-primary/30 shadow-glow-cyan"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
            data-ocid={`admin.tab_${tab}.tab`}
          >
            {tab === "appointments" ? "All Appointments" : "Manage Doctors"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Appointments tab ─────────────────────────────────────────────── */}
        {activeTab === "appointments" && (
          <motion.div
            key="appointments"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            data-ocid="admin.appointments.panel"
          >
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by patient or doctor…"
                  value={apptSearch}
                  onChange={(e) => setApptSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-smooth"
                  data-ocid="admin.appointments.search_input"
                />
              </div>
              <div className="relative">
                <select
                  value={apptStatusFilter}
                  onChange={(e) =>
                    setApptStatusFilter(
                      e.target.value as AppointmentStatus | "All",
                    )
                  }
                  className="pl-3 pr-8 py-2.5 rounded-xl bg-input border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-smooth appearance-none cursor-pointer"
                  data-ocid="admin.appointments.status_filter.select"
                >
                  <option value="All">All Statuses</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {apptsLoading ? (
              <TableSkeleton rows={6} />
            ) : (
              <GlassCard
                variant="elevated"
                padding="none"
                className="overflow-hidden"
                data-ocid="admin.appointments.table"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[650px]">
                    <thead>
                      <tr className="border-b border-border/30 bg-muted/30">
                        {[
                          "Patient ID",
                          "Doctor",
                          "Date",
                          "Time",
                          "Status",
                          "Fees",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-4 py-12 text-center text-muted-foreground"
                            data-ocid="admin.appointments.empty_state"
                          >
                            No appointments match your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((appt, idx) => {
                          const doctor = doctors.find(
                            (d) => d.id === appt.doctorId,
                          );
                          return (
                            <motion.tr
                              key={appt.id.toString()}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.03 }}
                              className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                              data-ocid={`admin.appointment.row.${idx + 1}`}
                            >
                              <td className="px-4 py-3">
                                <code className="text-xs bg-muted/40 px-2 py-0.5 rounded font-mono text-muted-foreground">
                                  {appt.patientId.slice(0, 14)}…
                                </code>
                              </td>
                              <td className="px-4 py-3 font-medium">
                                {doctor?.name ??
                                  `Doctor #${appt.doctorId.toString()}`}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {appt.date}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {appt.timeSlot}
                              </td>
                              <td className="px-4 py-3">
                                <StatusBadge status={appt.status} />
                              </td>
                              <td className="px-4 py-3 text-accent font-semibold tabular-nums">
                                ${appt.fees.toString()}
                              </td>
                            </motion.tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2.5 border-t border-border/20 text-xs text-muted-foreground">
                  Showing {filteredAppointments.length} of {appointments.length}{" "}
                  appointments
                </div>
              </GlassCard>
            )}
          </motion.div>
        )}

        {/* ── Doctors tab ──────────────────────────────────────────────────── */}
        {activeTab === "doctors" && (
          <motion.div
            key="doctors"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            data-ocid="admin.doctors.panel"
          >
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name or specialization…"
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-smooth"
                  data-ocid="admin.doctors.search_input"
                />
              </div>
            </div>

            {doctorsLoading ? (
              <TableSkeleton rows={5} />
            ) : (
              <GlassCard
                variant="elevated"
                padding="none"
                className="overflow-hidden mb-8"
                data-ocid="admin.doctors.table"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[540px]">
                    <thead>
                      <tr className="border-b border-border/30 bg-muted/30">
                        {[
                          "Doctor",
                          "Specialization",
                          "Fee",
                          "Availability",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDoctors.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-4 py-12 text-center text-muted-foreground"
                            data-ocid="admin.doctors.empty_state"
                          >
                            No doctors found.
                          </td>
                        </tr>
                      ) : (
                        filteredDoctors.map((doc, idx) => (
                          <motion.tr
                            key={doc.id.toString()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.04 }}
                            className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                            data-ocid={`admin.doctor.row.${idx + 1}`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                                  {doc.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")}
                                </div>
                                <span className="font-medium truncate max-w-[160px]">
                                  {doc.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {doc.specialization}
                            </td>
                            <td className="px-4 py-3 text-accent font-semibold tabular-nums">
                              ${doc.fees.toString()}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground text-xs">
                              {doc.availability.length > 0
                                ? `${doc.availability.length} day${doc.availability.length !== 1 ? "s" : ""}, ${doc.availability.reduce((a, d) => a + d.slots.length, 0)} slots`
                                : "—"}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                                  doc.isActive
                                    ? "bg-accent/10 text-accent border-accent/30"
                                    : "bg-muted/50 text-muted-foreground border-border/30"
                                }`}
                              >
                                {doc.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1.5">
                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.92 }}
                                  onClick={() =>
                                    setDoctorModal({
                                      open: true,
                                      mode: "edit",
                                      doctor: doc,
                                    })
                                  }
                                  className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-smooth"
                                  aria-label={`Edit ${doc.name}`}
                                  data-ocid={`admin.doctor.edit_button.${idx + 1}`}
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </motion.button>
                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.92 }}
                                  onClick={() =>
                                    setDeleteTarget({
                                      id: doc.id,
                                      name: doc.name,
                                    })
                                  }
                                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth"
                                  aria-label={`Delete ${doc.name}`}
                                  data-ocid={`admin.doctor.delete_button.${idx + 1}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2.5 border-t border-border/20 text-xs text-muted-foreground">
                  {filteredDoctors.length} doctor
                  {filteredDoctors.length !== 1 ? "s" : ""}
                </div>
              </GlassCard>
            )}

            {/* Assign Admin */}
            <FadeIn delay={0.2}>
              <GlassCard
                variant="neon-purple"
                padding="md"
                data-ocid="admin.assign_admin.panel"
              >
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="w-4 h-4 text-secondary" />
                  <h3 className="font-display font-semibold text-secondary">
                    Assign Admin Role
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Grant admin privileges to another user by their Internet
                  Identity principal.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Principal ID (e.g. aaaaa-aa or 2vxsx-fae…)"
                    value={assignPrincipal}
                    onChange={(e) => setAssignPrincipal(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-input border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-secondary/60 transition-smooth font-mono"
                    data-ocid="admin.assign_admin.input"
                  />
                  <NeonButton
                    type="button"
                    variant="purple"
                    size="md"
                    isLoading={isAssigning}
                    leftIcon={<UserCheck className="w-4 h-4" />}
                    onClick={handleAssignAdmin}
                    data-ocid="admin.assign_admin.submit_button"
                  >
                    Assign Admin
                  </NeonButton>
                </div>
              </GlassCard>
            </FadeIn>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Doctor modal */}
      <AnimatePresence>
        {doctorModal.open && (
          <DoctorModal
            key="doctor-modal"
            mode={doctorModal.mode}
            initial={doctorModal.doctor}
            onClose={() => setDoctorModal({ open: false, mode: "add" })}
            onSubmit={handleDoctorSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>

      {/* Delete dialog */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteDialog
            key="delete-dialog"
            name={deleteTarget.name}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
