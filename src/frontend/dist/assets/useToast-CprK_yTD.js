import { r as reactExports, Q as ToastContext } from "./index-xhhh4oaK.js";
function useToast() {
  const ctx = reactExports.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
export {
  useToast as u
};
