import { motion } from "motion/react";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cyan" | "purple" | "lime" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles = {
  cyan: "bg-primary text-primary-foreground shadow-glow-cyan hover:shadow-[0_0_30px_0_oklch(0.70_0.18_200_/_0.6)] border border-primary/50",
  purple:
    "bg-secondary text-secondary-foreground shadow-glow-purple hover:shadow-[0_0_30px_0_oklch(0.65_0.18_290_/_0.6)] border border-secondary/50",
  lime: "bg-accent text-accent-foreground shadow-[0_0_20px_0_oklch(0.75_0.19_120_/_0.4)] hover:shadow-[0_0_30px_0_oklch(0.75_0.19_120_/_0.6)] border border-accent/50",
  ghost:
    "bg-transparent border border-border/50 text-foreground hover:bg-muted/60 hover:border-primary/40",
  danger:
    "bg-destructive text-destructive-foreground border border-destructive/50 hover:shadow-[0_0_20px_0_oklch(0.62_0.19_15_/_0.4)]",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-xl gap-2.5",
};

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      className,
      variant = "cyan",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        className={cn(
          "inline-flex items-center justify-center font-semibold font-display transition-smooth cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        disabled={disabled || isLoading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  },
);

NeonButton.displayName = "NeonButton";
