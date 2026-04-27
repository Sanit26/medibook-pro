import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";
import type { ToastMessage } from "../../types";

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    styles: "border-accent/40 bg-accent/10",
    iconColor: "text-accent",
  },
  error: {
    icon: XCircle,
    styles: "border-destructive/40 bg-destructive/10",
    iconColor: "text-destructive",
  },
  info: {
    icon: Info,
    styles: "border-primary/40 bg-primary/10",
    iconColor: "text-primary",
  },
  warning: {
    icon: AlertTriangle,
    styles: "border-secondary/40 bg-secondary/10",
    iconColor: "text-secondary",
  },
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const config = toastConfig[toast.type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "glass-thick rounded-xl border p-4 flex items-start gap-3 shadow-lg",
          config.styles,
        )}
        data-ocid="toast"
        role="alert"
      >
        <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.iconColor)} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{toast.title}</p>
          {toast.message && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss notification"
          data-ocid="toast.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
