import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  DollarSign,
  Search,
  SlidersHorizontal,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { DoctorCardSkeleton } from "../components/ui/LoadingSkeleton";
import { NeonButton } from "../components/ui/NeonButton";
import { StaggerContainer, StaggerItem } from "../components/ui/PageTransition";
import { useBackend } from "../hooks/useBackend";
import type { Doctor } from "../types";

// Fallback doctors for demo when backend is unavailable
const DEMO_DOCTORS: Doctor[] = [
  {
    id: BigInt(1),
    name: "Dr. Sarah Mitchell",
    specialization: "Cardiology",
    fees: BigInt(150),
    availability: [
      { day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
      { day: "Wednesday", slots: ["10:00 AM", "3:00 PM"] },
    ],
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(2),
    name: "Dr. James Chen",
    specialization: "Neurology",
    fees: BigInt(200),
    availability: [
      { day: "Tuesday", slots: ["10:00 AM", "1:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM"] },
    ],
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(3),
    name: "Dr. Priya Sharma",
    specialization: "Dermatology",
    fees: BigInt(120),
    availability: [
      { day: "Wednesday", slots: ["9:00 AM", "3:00 PM"] },
      { day: "Friday", slots: ["11:00 AM"] },
    ],
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(4),
    name: "Dr. Robert Davis",
    specialization: "Orthopedics",
    fees: BigInt(175),
    availability: [
      { day: "Thursday", slots: ["11:00 AM", "2:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM"] },
    ],
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(5),
    name: "Dr. Emily White",
    specialization: "Pediatrics",
    fees: BigInt(130),
    availability: [
      { day: "Friday", slots: ["9:00 AM", "10:30 AM"] },
      { day: "Monday", slots: ["2:00 PM"] },
    ],
    isActive: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(6),
    name: "Dr. Michael Brown",
    specialization: "General Medicine",
    fees: BigInt(100),
    availability: [
      { day: "Monday", slots: ["8:00 AM", "12:00 PM", "4:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM"] },
    ],
    isActive: false,
    createdAt: BigInt(0),
  },
];

// Map specializations to neon accent colors
const SPEC_COLORS: Record<string, string> = {
  Cardiology: "text-primary border-primary/40 bg-primary/10",
  Neurology: "text-secondary border-secondary/40 bg-secondary/10",
  Dermatology: "text-accent border-accent/40 bg-accent/10",
  Orthopedics:
    "text-[oklch(0.72_0.18_50)] border-[oklch(0.72_0.18_50)]/40 bg-[oklch(0.72_0.18_50)]/10",
  Pediatrics:
    "text-[oklch(0.72_0.16_255)] border-[oklch(0.72_0.16_255)]/40 bg-[oklch(0.72_0.16_255)]/10",
};

const AVATAR_GRADIENTS = [
  "from-primary/70 via-secondary/40 to-primary/20",
  "from-secondary/70 via-primary/40 to-secondary/20",
  "from-accent/70 via-primary/40 to-accent/20",
  "from-primary/50 via-accent/40 to-secondary/30",
  "from-secondary/50 via-accent/30 to-primary/30",
  "from-accent/50 via-secondary/30 to-primary/30",
];

function getSpecColor(spec: string): string {
  if (spec in SPEC_COLORS) return SPEC_COLORS[spec];
  let hash = 0;
  for (let i = 0; i < spec.length; i++) hash = spec.charCodeAt(i) + hash * 31;
  const fallbacks = Object.values(SPEC_COLORS);
  return fallbacks[Math.abs(hash) % fallbacks.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function AvatarCircle({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  return (
    <div
      className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center border border-white/10 shadow-lg font-display font-bold text-lg text-foreground flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

function DoctorCard({
  doctor,
  index,
}: {
  doctor: Doctor;
  index: number;
}) {
  const navigate = useNavigate();
  const specColor = getSpecColor(doctor.specialization);
  const availDays = doctor.availability.map((d) => d.day.slice(0, 3));

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        data-ocid={`doctors.item.${index + 1}`}
        className="h-full"
      >
        <GlassCard
          variant="default"
          padding="none"
          className="h-full flex flex-col hover:border-primary/30 hover:shadow-glow-cyan group overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-accent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="p-5 flex flex-col gap-4 flex-1">
            {/* Avatar + Name/Spec */}
            <div className="flex items-start gap-4">
              <AvatarCircle name={doctor.name} index={index} />
              <div className="flex-1 min-w-0">
                <h3
                  className="font-display font-bold text-base text-foreground leading-snug truncate"
                  title={doctor.name}
                >
                  {doctor.name}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 text-xs font-semibold rounded-full border ${specColor}`}
                >
                  <Stethoscope size={10} />
                  {doctor.specialization}
                </span>
              </div>
            </div>

            {/* Fees */}
            <div className="flex items-center gap-2 text-sm">
              <DollarSign size={14} className="text-accent flex-shrink-0" />
              <span className="text-muted-foreground">Consultation Fee:</span>
              <span className="font-semibold text-accent ml-auto">
                ${Number(doctor.fees)}
              </span>
            </div>

            {/* Availability days */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Calendar size={13} className="text-primary flex-shrink-0" />
                <span className="text-xs text-muted-foreground font-medium">
                  Available on
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {availDays.length > 0 ? (
                  availDays.map((day) => (
                    <span
                      key={day}
                      className="px-2 py-0.5 text-xs rounded-md border border-primary/25 bg-primary/8 text-primary font-medium"
                    >
                      {day}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    No schedule set
                  </span>
                )}
              </div>
            </div>

            {/* Status + Book CTA */}
            <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-border/30">
              <span
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  doctor.isActive ? "text-accent" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    doctor.isActive
                      ? "bg-accent animate-pulse"
                      : "bg-muted-foreground"
                  }`}
                />
                {doctor.isActive ? "Available" : "Unavailable"}
              </span>
              <NeonButton
                variant="cyan"
                size="sm"
                data-ocid={`doctors.book_button.${index + 1}`}
                disabled={!doctor.isActive}
                onClick={() =>
                  navigate({
                    to: "/book/$doctorId",
                    params: { doctorId: doctor.id.toString() },
                  })
                }
              >
                Book Now
              </NeonButton>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </StaggerItem>
  );
}

function EmptyState({ query, spec }: { query: string; spec: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="col-span-full flex flex-col items-center justify-center py-20 gap-5"
      data-ocid="doctors.empty_state"
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-muted/40 border border-border/40 flex items-center justify-center">
          <UserRound size={40} className="text-muted-foreground/40" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 2.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border border-primary/20"
        />
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 2.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute inset-0 rounded-full border border-primary/10"
        />
      </div>
      <div className="text-center space-y-1.5">
        <p className="font-display font-semibold text-lg text-foreground">
          No doctors found
        </p>
        <p className="text-muted-foreground text-sm max-w-xs">
          {query || spec !== "All"
            ? `No results for "${query || spec}". Try adjusting your search or filter.`
            : "No doctors are currently registered."}
        </p>
      </div>
    </motion.div>
  );
}

export default function DoctorsPage() {
  const { actor, isLoading: backendLoading } = useBackend();
  const [query, setQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");

  const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return DEMO_DOCTORS;
      try {
        const result = await (
          actor as unknown as {
            listDoctors: () => Promise<Doctor[]>;
          }
        ).listDoctors();
        return result.length > 0 ? result : DEMO_DOCTORS;
      } catch {
        return DEMO_DOCTORS;
      }
    },
    enabled: !backendLoading,
  });

  const specializations = useMemo(() => {
    const specs = Array.from(
      new Set(doctors.map((d) => d.specialization).filter(Boolean)),
    );
    return ["All", ...specs.sort()];
  }, [doctors]);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchSpec =
        selectedSpec === "All" || d.specialization === selectedSpec;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q);
      return matchSpec && matchQuery;
    });
  }, [doctors, query, selectedSpec]);

  const showLoading = isLoading || backendLoading;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className="mb-10"
        data-ocid="doctors.page"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-9 rounded-full bg-gradient-to-b from-primary to-secondary" />
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
            Find Your Doctor
          </h1>
        </div>
        <p className="text-muted-foreground text-base ml-4 pl-3 border-l border-border/30">
          Browse our network of specialist physicians and book your appointment
          instantly
        </p>
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-ocid="doctors.search_input"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground bg-card/60 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 backdrop-blur-sm transition-smooth"
          />
        </div>

        {/* Specialization dropdown */}
        <div className="relative">
          <SlidersHorizontal
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <select
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
            data-ocid="doctors.spec_select"
            className="pl-8 pr-8 py-2.5 rounded-xl text-sm font-body text-foreground bg-card/60 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 backdrop-blur-sm transition-smooth appearance-none cursor-pointer min-w-[180px]"
          >
            {specializations.map((s) => (
              <option key={s} value={s} className="bg-card text-foreground">
                {s}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Specialization pill filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.18, ease: "easeOut" }}
        className="flex gap-2 flex-wrap mb-8"
        data-ocid="doctors.specialization_filter"
      >
        {specializations.map((spec) => (
          <button
            key={spec}
            type="button"
            onClick={() => setSelectedSpec(spec)}
            data-ocid={`doctors.filter.${spec.toLowerCase().replace(/\s+/g, "_")}.tab`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${
              selectedSpec === spec
                ? "bg-primary/15 text-primary border border-primary/40"
                : "bg-muted/50 text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {spec}
          </button>
        ))}
      </motion.div>

      {/* Results count */}
      {!showLoading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xs text-muted-foreground mb-5"
        >
          {filtered.length === 0
            ? "No results"
            : `Showing ${filtered.length} doctor${filtered.length !== 1 ? "s" : ""}${selectedSpec !== "All" ? ` in ${selectedSpec}` : ""}`}
        </motion.p>
      )}

      {/* Loading */}
      {showLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="doctors.loading_state"
        >
          <DoctorCardSkeleton />
        </motion.div>
      )}

      {/* Doctor cards grid */}
      {!showLoading && (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <EmptyState query={query} spec={selectedSpec} />
          ) : (
            filtered.map((doctor, index) => (
              <DoctorCard
                key={doctor.id.toString()}
                doctor={doctor}
                index={index}
              />
            ))
          )}
        </StaggerContainer>
      )}
    </div>
  );
}
