import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { CardSkeleton, Skeleton } from "../components/ui/LoadingSkeleton";
import { NeonButton } from "../components/ui/NeonButton";
import { StaggerContainer, StaggerItem } from "../components/ui/PageTransition";
import { useAuth } from "../contexts/AuthContext";
import { useBackend } from "../hooks/useBackend";
import type { Appointment, Doctor } from "../types";

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1000, enabled = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled || target === 0) {
      setCount(target);
      return;
    }
    const start = performance.now();
    let raf: number;
    function step(now: number) {
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

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  color,
  neonVariant,
  idx,
  ready,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  delta: string;
  color: string;
  neonVariant: "default" | "neon-cyan" | "neon-purple" | "neon-lime";
  idx: number;
  ready: boolean;
}) {
  const displayed = useCountUp(value, 900 + idx * 100, ready);
  return (
    <StaggerItem>
      <GlassCard
        variant={neonVariant}
        className="hover:scale-[1.03] cursor-default"
        data-ocid={`dashboard.stat.${idx + 1}`}
      >
        <div
          className={`w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center mb-4 ${color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-3xl font-display font-bold mb-1">{displayed}</div>
        <div className="text-sm font-medium text-foreground mb-1">{label}</div>
        <div className="text-[11px] text-muted-foreground">{delta}</div>
      </GlassCard>
    </StaggerItem>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Upcoming: "bg-primary/15 text-primary border-primary/25",
    Completed: "bg-accent/15 text-accent border-accent/25",
    Cancelled: "bg-destructive/15 text-destructive border-destructive/25",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${variants[status] ?? variants.Upcoming}`}
    >
      {status}
    </span>
  );
}

// ─── Doctor initials avatar ───────────────────────────────────────────────────
function DoctorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
      {initials}
    </div>
  );
}

// ─── Quick links ──────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  {
    to: "/doctors" as const,
    icon: Stethoscope,
    label: "Find a Doctor",
    desc: "Search by specialty",
    color: "text-primary",
    border: "border-primary/20 hover:border-primary/50 hover:bg-primary/5",
    ocid: "dashboard.quick_link.find_doctor",
  },
  {
    to: "/appointments" as const,
    icon: Calendar,
    label: "My Appointments",
    desc: "View & manage",
    color: "text-secondary",
    border:
      "border-secondary/20 hover:border-secondary/50 hover:bg-secondary/5",
    ocid: "dashboard.quick_link.appointments",
  },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { profile } = useAuth();
  const { actor, isLoading: backendLoading } = useBackend();
  const firstName = profile?.name?.split(" ")[0] ?? "there";

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

  const { data: doctors = [] } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as Record<string, () => Promise<Doctor[]>>
        ).listDoctors();
        return result;
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
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
      neonVariant: "neon-cyan" as const,
    },
    {
      label: "Upcoming",
      value: upcoming,
      icon: Clock,
      delta: upcoming > 0 ? "Scheduled ahead" : "None scheduled",
      color: "text-secondary",
      neonVariant: "neon-purple" as const,
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      delta: "Past visits",
      color: "text-accent",
      neonVariant: "neon-lime" as const,
    },
    {
      label: "Active Doctors",
      value: new Set(appointments.map((a) => a.doctorId)).size,
      icon: TrendingUp,
      delta: "Unique providers",
      color: "text-primary",
      neonVariant: "neon-cyan" as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
        data-ocid="dashboard.page"
      >
        <p className="text-muted-foreground text-sm mb-1 font-medium tracking-wide uppercase">
          Good day
        </p>
        <h1 className="text-4xl font-display font-bold leading-tight">
          Welcome back,{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            {firstName}
          </span>{" "}
          👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's your health overview — stay on top of your appointments.
        </p>
      </motion.div>

      {/* Stats row */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((s, idx) => (
            <StatCard key={s.label} {...s} idx={idx} ready={statsReady} />
          ))}
        </StaggerContainer>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-xl">
              Recent Appointments
            </h2>
            <Link
              to="/appointments"
              className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-medium"
              data-ocid="dashboard.view_all_appointments.link"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3" data-ocid="dashboard.appointments.list">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
                <Skeleton key={i} className="h-[72px] rounded-xl" />
              ))
            ) : recent.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-ocid="dashboard.appointments.empty_state"
              >
                <GlassCard
                  variant="default"
                  padding="md"
                  className="text-center py-10"
                >
                  <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-semibold mb-1">
                    No appointments yet
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Book your first consultation to get started.
                  </p>
                  <Link to="/doctors">
                    <NeonButton
                      variant="cyan"
                      size="sm"
                      data-ocid="dashboard.empty.book_button"
                    >
                      Find a Doctor
                    </NeonButton>
                  </Link>
                </GlassCard>
              </motion.div>
            ) : (
              <AnimatePresence>
                {recent.map((appt, idx) => (
                  <motion.div
                    key={appt.id.toString()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12 + 0.2 }}
                  >
                    <GlassCard
                      variant="elevated"
                      padding="sm"
                      className="flex items-center gap-3 hover:border-primary/30"
                      data-ocid={`dashboard.appointment.item.${idx + 1}`}
                    >
                      <DoctorAvatar
                        name={
                          doctorMap.get(appt.doctorId) ??
                          `Doctor #${appt.doctorId.toString()}`
                        }
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {doctorMap.get(appt.doctorId) ??
                            `Doctor #${appt.doctorId.toString()}`}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 flex-wrap">
                          <Calendar className="w-3 h-3 shrink-0" />
                          {appt.date}
                          <span className="mx-0.5">·</span>
                          <Clock className="w-3 h-3 shrink-0" />
                          {appt.timeSlot}
                        </p>
                      </div>
                      <StatusBadge status={appt.status} />
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Sidebar: Quick Actions + AI */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-xl mb-5">
            Quick Actions
          </h2>

          {QUICK_LINKS.map(
            ({ to, icon: Icon, label, desc, color, border, ocid }) => (
              <Link key={to} to={to} data-ocid={ocid}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GlassCard
                    variant="default"
                    padding="sm"
                    className={`flex items-center gap-3 border ${border} mb-3`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center ${color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </GlassCard>
                </motion.div>
              </Link>
            ),
          )}

          {/* AI teaser */}
          <GlassCard
            variant="neon-purple"
            padding="sm"
            className="relative overflow-hidden mt-2"
          >
            <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-secondary/20 blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-sm font-semibold">AI Health Insights</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Get personalized doctor recommendations based on your symptom
              history and past visits.
            </p>
            <NeonButton
              variant="purple"
              size="sm"
              className="w-full"
              data-ocid="dashboard.ai_insights.button"
            >
              Explore AI Features
            </NeonButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
