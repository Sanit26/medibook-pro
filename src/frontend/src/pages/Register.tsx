import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { NeonButton } from "../components/ui/NeonButton";
import { useAuth } from "../contexts/AuthContext";
import { useBackend } from "../hooks/useBackend";
import { useToast } from "../hooks/useToast";
import type { RegisterPatientInput } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldKey = keyof RegisterPatientInput;

interface ValidationState {
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: RegisterPatientInput): ValidationState {
  const errs: ValidationState = {};
  if (!form.name.trim()) errs.name = "Full name is required";
  if (!form.email.trim()) {
    errs.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) {
    errs.phone = "Phone number is required";
  } else if (!/^\+?[\d\s\-().]{7,20}$/.test(form.phone)) {
    errs.phone = "Enter a valid phone number";
  }
  if (!form.dateOfBirth) errs.dateOfBirth = "Date of birth is required";
  return errs;
}

// ─── FloatingInput ────────────────────────────────────────────────────────────

function FloatingInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  icon: Icon,
  placeholder,
  error,
}: {
  id: FieldKey;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
  icon: React.ElementType;
  placeholder?: string;
  error?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative rounded-xl border transition-all duration-200 ${
          error
            ? "border-destructive/60 shadow-[0_0_8px_oklch(0.62_0.19_15_/_0.2)]"
            : isFocused
              ? "border-primary/60 shadow-[0_0_12px_oklch(0.7_0.18_200_/_0.15)]"
              : "border-border/40"
        }`}
        style={{ background: "oklch(var(--input))" }}
      >
        {/* Label */}
        <motion.label
          htmlFor={id}
          className="absolute left-11 pointer-events-none font-medium select-none"
          animate={{
            top: isFocused || hasValue ? "6px" : "50%",
            y: isFocused || hasValue ? "0%" : "-50%",
            fontSize: isFocused || hasValue ? "10px" : "14px",
            color: isFocused
              ? "oklch(0.7 0.18 200)"
              : error
                ? "oklch(0.62 0.19 15)"
                : "oklch(0.65 0 0)",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {label}
        </motion.label>

        {/* Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon
            className={`w-4 h-4 transition-colors duration-200 ${
              error
                ? "text-destructive/70"
                : isFocused
                  ? "text-primary"
                  : "text-muted-foreground"
            }`}
          />
        </div>

        {/* Input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={isFocused ? placeholder : ""}
          className="w-full pt-5 pb-2 pl-10 pr-4 bg-transparent text-foreground text-sm focus:outline-none"
          data-ocid={`register.${id}.input`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          max={
            type === "date" ? new Date().toISOString().split("T")[0] : undefined
          }
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="text-xs text-destructive mt-1 ml-1"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            data-ocid={`register.${id}.field_error`}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Progress indicator ───────────────────────────────────────────────────────

const STEPS = ["Personal Info", "Contact", "Confirm"];

function ProgressSteps({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <motion.div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                i < current
                  ? "bg-primary border-primary text-primary-foreground"
                  : i === current
                    ? "border-primary text-primary"
                    : "border-border/40 text-muted-foreground"
              }`}
              animate={{
                scale: i === current ? [1, 1.1, 1] : 1,
                boxShadow:
                  i === current ? "0 0 12px oklch(0.7 0.18 200 / 0.4)" : "none",
              }}
              transition={{ duration: 0.4 }}
            >
              {i < current ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
            </motion.div>
            <span
              className={`text-[9px] font-medium whitespace-nowrap transition-colors duration-200 ${
                i === current ? "text-primary" : "text-muted-foreground/60"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="w-10 h-0.5 rounded-full mb-3 overflow-hidden bg-border/30">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: i < current ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const initialForm: RegisterPatientInput = {
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
};

export default function Register() {
  const { isAuthenticated, isLoggingIn, login } = useAuth();
  const { actor } = useBackend();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasTriggeredLogin = useRef(false);

  const [form, setForm] = useState<RegisterPatientInput>(initialForm);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoggingIn && !hasTriggeredLogin.current) {
      hasTriggeredLogin.current = true;
      login();
    }
  }, [isAuthenticated, isLoggingIn, login]);

  const setField = (field: FieldKey) => (v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }));

  const touchField = (field: FieldKey) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const errors = validate(form);
  const touchedErrors: ValidationState = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k as FieldKey]),
  );

  // Derive progress step
  const completedName = form.name.trim().length > 0 && !errors.name;
  const completedContact =
    form.email.trim().length > 0 &&
    !errors.email &&
    form.phone.trim().length > 0 &&
    !errors.phone;
  const currentStep = !completedName ? 0 : !completedContact ? 1 : 2;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Touch all fields to show errors
    setTouched({ name: true, email: true, phone: true, dateOfBirth: true });
    const allErrors = validate(form);
    if (Object.keys(allErrors).length > 0) {
      error("Incomplete form", "Please fill in all required fields correctly.");
      return;
    }
    if (!actor) {
      error("Not connected", "Please wait while we connect to the backend.");
      return;
    }

    setIsSubmitting(true);
    try {
      const actorAny = actor as unknown as Record<
        string,
        (...args: unknown[]) => Promise<unknown>
      >;
      await actorAny.registerPatient(form);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsSuccess(true);
      success(
        "Welcome to MediBook Pro!",
        "Your profile has been created successfully.",
      );
      setTimeout(() => navigate({ to: "/dashboard" }), 1500);
    } catch {
      error("Registration failed", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "oklch(0.65 0.18 290)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.7 0.18 200)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative z-10"
        data-ocid="register.page"
      >
        <GlassCard
          variant="neon-purple"
          padding="none"
          className="overflow-hidden"
        >
          {/* Top accent bar */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.65 0.18 290), oklch(0.7 0.18 200))",
            }}
          />

          <div className="p-8">
            {/* Header */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="relative w-14 h-14 mx-auto mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-glow-purple"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.18 290), oklch(0.7 0.18 200))",
                  }}
                >
                  <Activity className="w-7 h-7 text-primary-foreground" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-secondary/50"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.8,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </div>
              <h1 className="text-2xl font-display font-bold tracking-tight mb-1">
                Create Your{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, oklch(0.65 0.18 290), oklch(0.7 0.18 200))",
                  }}
                >
                  Profile
                </span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Set up your patient profile to get started
              </p>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <ProgressSteps current={currentStep} />
            </motion.div>

            {/* Success overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center glass-thick rounded-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  data-ocid="register.success_state"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-accent mb-4" />
                  </motion.div>
                  <h2 className="text-xl font-display font-bold mb-1">
                    You're all set!
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Redirecting to your dashboard…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <FloatingInput
                  id="name"
                  label="Full Name"
                  value={form.name}
                  onChange={setField("name")}
                  onBlur={touchField("name")}
                  icon={User}
                  placeholder="Jane Smith"
                  error={touchedErrors.name}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.37, duration: 0.4 }}
              >
                <FloatingInput
                  id="email"
                  label="Email Address"
                  value={form.email}
                  onChange={setField("email")}
                  onBlur={touchField("email")}
                  icon={Mail}
                  type="email"
                  placeholder="jane@example.com"
                  error={touchedErrors.email}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.44, duration: 0.4 }}
              >
                <FloatingInput
                  id="phone"
                  label="Phone Number"
                  value={form.phone}
                  onChange={setField("phone")}
                  onBlur={touchField("phone")}
                  icon={Phone}
                  placeholder="+1 555 0100"
                  error={touchedErrors.phone}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.51, duration: 0.4 }}
              >
                <FloatingInput
                  id="dateOfBirth"
                  label="Date of Birth"
                  value={form.dateOfBirth}
                  onChange={setField("dateOfBirth")}
                  onBlur={touchField("dateOfBirth")}
                  icon={Calendar}
                  type="date"
                  error={touchedErrors.dateOfBirth}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.4 }}
                className="pt-1"
              >
                <NeonButton
                  variant="purple"
                  size="lg"
                  type="submit"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  data-ocid="register.submit_button"
                >
                  Complete Registration
                </NeonButton>
              </motion.div>
            </form>

            <motion.p
              className="text-center text-xs text-muted-foreground mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              Already registered?{" "}
              <Link
                to="/login"
                className="text-secondary hover:text-secondary/80 transition-colors font-medium"
                data-ocid="register.login.link"
              >
                Sign in instead
              </Link>
            </motion.p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
