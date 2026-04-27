import { Link } from "@tanstack/react-router";
import {
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  Heart,
  MessageSquare,
  Shield,
  Star,
  Stethoscope,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { NeonButton } from "../components/ui/NeonButton";
import { useAuth } from "../contexts/AuthContext";

// ─── Floating Particles ───────────────────────────────────────────────────────

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: "cyan" | "purple" | "lime";
}

function generateParticles(count: number): Particle[] {
  const colors: Particle["color"][] = ["cyan", "purple", "lime"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    opacity: 0.15 + Math.random() * 0.4,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

const colorMap: Record<Particle["color"], string> = {
  cyan: "oklch(0.7 0.18 200)",
  purple: "oklch(0.65 0.18 290)",
  lime: "oklch(0.75 0.19 120)",
};

function FloatingParticles() {
  const [particles] = useState(() => generateParticles(28));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: colorMap[p.color],
            boxShadow: `0 0 ${p.size * 3}px ${colorMap[p.color]}`,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [
              p.opacity,
              p.opacity * 0.4,
              p.opacity,
              p.opacity * 0.7,
              p.opacity,
            ],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 mb-4">
      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow-cyan" />
      <span className="text-xs font-semibold tracking-widest uppercase text-primary font-mono">
        {text}
      </span>
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function Landing() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      data-ocid="landing.page"
    >
      {/* Deep gradient background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -10%, oklch(0.2 0.06 250) 0%, oklch(0.12 0.04 230) 40%, oklch(0.08 0.02 260) 70%, oklch(0.05 0 0) 100%)",
        }}
      />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const { isAuthenticated, login } = useAuth();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(smoothY, [-300, 300], [5, -5]);
  const rotateY = useTransform(smoothX, [-300, 300], [-5, 5]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      data-ocid="landing.hero-section"
    >
      <FloatingParticles />

      {/* Ambient glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.7 0.18 200 / 0.12) 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.18 290 / 0.1) 0%, transparent 70%)",
            top: "20%",
            right: "-5%",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left — text content */}
        <div
          className="flex flex-col items-start"
          data-ocid="landing.hero-content"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel text="AI-Powered Healthcare" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black font-display leading-[1.05] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your Health,{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Smarter
            </span>{" "}
            Care
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book appointments with top specialists, get AI-powered symptom
            analysis, and receive personalized care recommendations — all in one
            seamless platform.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isAuthenticated ? (
              <Link to="/doctors">
                <NeonButton
                  variant="cyan"
                  size="lg"
                  data-ocid="landing.book-appointment-cta"
                >
                  Book Appointment
                  <ChevronRight className="w-5 h-5 ml-1" />
                </NeonButton>
              </Link>
            ) : (
              <NeonButton
                variant="cyan"
                size="lg"
                onClick={login}
                data-ocid="landing.book-appointment-cta"
              >
                Book Appointment
                <ChevronRight className="w-5 h-5 ml-1" />
              </NeonButton>
            )}
            <Link to="/doctors">
              <NeonButton
                variant="ghost"
                size="lg"
                data-ocid="landing.explore-doctors-cta"
              >
                Explore Doctors
              </NeonButton>
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { icon: Shield, text: "HIPAA Compliant" },
              { icon: Clock, text: "24/7 Available" },
              { icon: Heart, text: "Trusted by 10k+" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — hero image with 3D tilt */}
        <motion.div
          className="relative hidden lg:block"
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-glow-cyan">
            <img
              src="/assets/generated/hero-medical.dim_1200x800.jpg"
              alt="AI-powered medical appointment platform"
              className="w-full object-cover rounded-2xl"
              style={{ maxHeight: 480 }}
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.7 0.18 200 / 0.08) 0%, oklch(0.65 0.18 290 / 0.04) 100%)",
              }}
            />
          </div>

          {/* Floating stat cards */}
          <motion.div
            className="absolute -bottom-6 -left-8 glass-thick rounded-xl p-4 border border-primary/30 shadow-glow-cyan"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Today's Bookings
                </div>
                <div className="text-xl font-bold text-foreground font-display">
                  247
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -top-4 -right-6 glass-thick rounded-xl p-4 border border-accent/30"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">AI Accuracy</div>
                <div className="text-xl font-bold text-foreground font-display">
                  98.7%
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase font-mono">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

const features = [
  {
    icon: Brain,
    title: "AI-Powered Care",
    description:
      "Our intelligent symptom analyzer uses advanced ML to match you with the right specialist instantly — no guesswork, no delays.",
    variant: "neon-cyan" as const,
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
  },
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    description:
      "Connect with 500+ board-certified specialists across 40+ departments. All doctors are fully verified and reviewed by real patients.",
    variant: "neon-purple" as const,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description:
      "Interactive calendar with real-time slot availability. Book, reschedule, or cancel appointments in seconds from any device.",
    variant: "neon-lime" as const,
    iconColor: "text-accent",
    iconBg: "bg-accent/15",
  },
];

function FeaturesSection() {
  return (
    <section
      className="relative py-24 px-4"
      style={{ background: "oklch(0.08 0.015 250 / 0.5)" }}
      data-ocid="landing.features-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="Why Choose MedAI" />
          <h2 className="text-4xl md:text-5xl font-black font-display mt-2 mb-4">
            Healthcare{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--gradient-accent)" }}
            >
              Reimagined
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We combine cutting-edge AI with a seamless experience to make
            quality healthcare accessible to everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              data-ocid={`landing.feature-card.${i + 1}`}
            >
              <GlassCard
                variant={feat.variant}
                padding="lg"
                className="h-full transition-smooth"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feat.iconBg} flex items-center justify-center mb-5 border border-current/10`}
                >
                  <feat.icon className={`w-7 h-7 ${feat.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Describe Symptoms",
    description:
      "Use our AI chatbot to describe your symptoms. Our NLP engine analyzes and identifies potential conditions in real time.",
    icon: MessageSquare,
    borderColor: "border-primary/60",
    iconColor: "text-primary",
    glowClass: "shadow-glow-cyan",
  },
  {
    number: "02",
    title: "Get Matched",
    description:
      "Receive AI-powered doctor recommendations tailored to your condition, location preferences, and schedule.",
    icon: Zap,
    borderColor: "border-secondary/60",
    iconColor: "text-secondary",
    glowClass: "shadow-glow-purple",
  },
  {
    number: "03",
    title: "Book & Confirm",
    description:
      "Pick your preferred time slot on the interactive calendar and confirm your appointment with one click.",
    icon: Calendar,
    borderColor: "border-accent/60",
    iconColor: "text-accent",
    glowClass: "",
  },
];

function HowItWorksSection() {
  return (
    <section
      className="relative py-24 px-4"
      data-ocid="landing.how-it-works-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="How It Works" />
          <h2 className="text-4xl md:text-5xl font-black font-display mt-2 mb-4">
            Three Steps to{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Better Health
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting gradient line */}
          <div
            className="absolute top-12 left-[16.5%] right-[16.5%] h-0.5 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.7 0.18 200 / 0.4) 0%, oklch(0.65 0.18 290 / 0.4) 50%, oklch(0.75 0.19 120 / 0.4) 100%)",
            }}
          />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                data-ocid={`landing.step-card.${i + 1}`}
              >
                <motion.div
                  className={`w-24 h-24 rounded-full glass border-2 ${step.borderColor} flex flex-col items-center justify-center mb-6 ${step.glowClass}`}
                  whileHover={{ scale: 1.08 }}
                >
                  <step.icon className={`w-7 h-7 ${step.iconColor} mb-1`} />
                  <span
                    className={`text-xs font-black font-mono ${step.iconColor}`}
                  >
                    {step.number}
                  </span>
                </motion.div>

                <GlassCard variant="default" padding="md" className="w-full">
                  <h3 className="text-lg font-bold font-display mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Expert Doctors",
    icon: Stethoscope,
    color: "text-primary",
  },
  {
    value: 10000,
    suffix: "+",
    label: "Happy Patients",
    icon: Users,
    color: "text-secondary",
  },
  {
    value: 99,
    suffix: "%",
    label: "Satisfaction Rate",
    icon: Star,
    color: "text-accent",
  },
  {
    value: 40,
    suffix: "+",
    label: "Specializations",
    icon: TrendingUp,
    color: "text-primary",
  },
];

function StatsSection() {
  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "oklch(0.08 0.015 250 / 0.5)" }}
      data-ocid="landing.stats-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.7 0.18 200 / 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              data-ocid={`landing.stat-card.${i + 1}`}
            >
              <GlassCard
                variant="elevated"
                padding="md"
                className="text-center"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div
                  className={`text-3xl md:text-4xl font-black font-display mb-1 ${stat.color}`}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer",
    initials: "SM",
    rating: 5,
    text: "The AI symptom checker was incredibly accurate — it matched me with the right cardiologist within minutes. The booking process was effortlessly smooth.",
  },
  {
    name: "James Okafor",
    role: "Marketing Director",
    initials: "JO",
    rating: 5,
    text: "I've been managing my family's health appointments through MedAI for 6 months. Smart reminders mean we've never missed a consultation. Absolutely love it.",
  },
  {
    name: "Priya Nair",
    role: "University Student",
    initials: "PN",
    rating: 5,
    text: "As a student with a busy schedule, flexible rescheduling and the AI chatbot have been lifesavers. The interface is stunning and incredibly easy to navigate.",
  },
];

function TestimonialsSection() {
  return (
    <section
      className="relative py-24 px-4"
      data-ocid="landing.testimonials-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="Patient Stories" />
          <h2 className="text-4xl md:text-5xl font-black font-display mt-2 mb-4">
            Loved by{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Thousands
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              data-ocid={`landing.testimonial-card.${i + 1}`}
            >
              <GlassCard variant="elevated" padding="lg" className="h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={`star-${t.name}-${j}`}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-display text-primary-foreground shrink-0"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold font-display text-sm truncate">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA + Footer Section ─────────────────────────────────────────────────────

function FooterSection() {
  const { isAuthenticated, login } = useAuth();
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <>
      {/* CTA Banner */}
      <section
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: "oklch(0.08 0.015 250 / 0.7)" }}
        data-ocid="landing.cta-section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, oklch(0.65 0.18 290 / 0.08) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black font-display mb-4">
              Ready for{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "var(--gradient-accent)" }}
              >
                Smarter Care?
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of patients who've already transformed their
              healthcare journey.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <NeonButton
                    variant="lime"
                    size="lg"
                    data-ocid="landing.footer-cta-dashboard"
                  >
                    Go to Dashboard
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </NeonButton>
                </Link>
              ) : (
                <NeonButton
                  variant="lime"
                  size="lg"
                  onClick={login}
                  data-ocid="landing.footer-cta-register"
                >
                  Create Free Account
                  <ChevronRight className="w-5 h-5 ml-1" />
                </NeonButton>
              )}
              <Link to="/doctors">
                <NeonButton
                  variant="ghost"
                  size="lg"
                  data-ocid="landing.footer-cta-doctors"
                >
                  Browse Doctors
                </NeonButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-4 border-t border-border/20"
        style={{ background: "oklch(0.07 0.01 250)" }}
        data-ocid="landing.footer"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold font-display text-sm">MedAI</div>
              <div className="text-xs text-muted-foreground">
                Your AI Health Partner
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>

          <nav className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link
              to="/doctors"
              className="hover:text-primary transition-colors"
            >
              Doctors
            </Link>
            <Link to="/login" className="hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link
              to="/register"
              className="hover:text-primary transition-colors"
            >
              Register
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
