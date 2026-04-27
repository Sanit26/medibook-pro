import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "thick"
    | "elevated"
    | "neon-cyan"
    | "neon-purple"
    | "neon-lime";
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantMap = {
  default: "glass rounded-xl",
  thick: "glass-thick rounded-2xl",
  elevated: "glass rounded-xl shadow-lg shadow-black/30",
  "neon-cyan": "glass rounded-xl shadow-glow-cyan border border-primary/30",
  "neon-purple":
    "glass rounded-xl shadow-glow-purple border border-secondary/30",
  "neon-lime": "glass rounded-xl border border-accent/30",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { className, variant = "default", padding = "md", children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          variantMap[variant],
          paddingMap[padding],
          "transition-smooth",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
