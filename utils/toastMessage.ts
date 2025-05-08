// utils/toastMessage.ts
import { toast } from "sonner";

type ToastType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading"
  | "message";

interface ToastOptions {
  type?: ToastType;
  duration?: number;
  description?: string;
}

const toastStyles: Record<ToastType, React.CSSProperties> = {
  success: { backgroundColor: "#dcfce7", color: "#166534" },
  error: { backgroundColor: "#fee2e2", color: "#991b1b" },
  info: { backgroundColor: "#dbeafe", color: "#1e3a8a" },
  warning: { backgroundColor: "#fef9c3", color: "#92400e" },
  loading: { backgroundColor: "#f3f4f6", color: "#374151" },
  message: { backgroundColor: "#f5f5f5", color: "#44403c" },
};

export const showToast = (title: string, options?: ToastOptions) => {
  const { type = "success", duration = 2000, description } = options || {};

  toast[type](title, {
    duration,
    description,
    style: toastStyles[type],
  });
};
