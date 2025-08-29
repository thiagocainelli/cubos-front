import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast, { ToastType } from "../components/Toast";

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastContextData {
  showToast: (
    type: ToastType,
    message: string,
    description?: string,
    duration?: number
  ) => void;
  showSuccess: (
    message: string,
    description?: string,
    duration?: number
  ) => void;
  showError: (message: string, description?: string, duration?: number) => void;
}

const ToastContext = createContext({} as ToastContextData);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (
    type: ToastType,
    message: string,
    description?: string,
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastData = {
      id,
      type,
      message,
      description,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);
  };

  const showSuccess = (
    message: string,
    description?: string,
    duration?: number
  ) => {
    showToast("success", message, description, duration);
  };

  const showError = (
    message: string,
    description?: string,
    duration?: number
  ) => {
    showToast("error", message, description, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError }}>
      {children}

      {/* Renderizar todos os toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          description={toast.description}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};
