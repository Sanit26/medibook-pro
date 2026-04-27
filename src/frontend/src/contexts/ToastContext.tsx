import { createContext, useCallback, useState } from "react";
import type { ReactNode } from "react";
import { Toast } from "../components/ui/Toast";
import type { ToastMessage, ToastType } from "../types";

interface ToastContextValue {
  toast: (type: ToastType, title: string, message?: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    [],
  );

  const success = useCallback(
    (title: string, message?: string) => toast("success", title, message),
    [toast],
  );
  const error = useCallback(
    (title: string, message?: string) => toast("error", title, message),
    [toast],
  );
  const info = useCallback(
    (title: string, message?: string) => toast("info", title, message),
    [toast],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div
        className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-80"
        data-ocid="toast"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
