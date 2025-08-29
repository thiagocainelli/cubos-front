import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export type ToastType = "success" | "error";

interface ToastProps {
  type: ToastType;
  message: string;
  description?: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  description,
  onClose,
  duration = 5000,
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar toast com animação
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    // Auto-hide após duração
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Aguardar animação de saída
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      transform: isVisible ? "translateX(0)" : "translateX(100%)",
      opacity: isVisible ? 1 : 0,
    };

    if (theme === "light") {
      return {
        ...baseStyles,
        backgroundColor: "var(--mauve-1)",
        border:
          type === "success"
            ? "1px solid var(--purple-4)"
            : "1px solid #ff4d4f",
        color: "var(--mauve-10)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      };
    } else {
      return {
        ...baseStyles,
        backgroundColor: "var(--mauve-dark-2)",
        border:
          type === "success"
            ? "1px solid var(--purple-4)"
            : "1px solid #ff4d4f",
        color: "var(--mauve-4)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      };
    }
  };

  const getIcon = () => {
    if (type === "success") {
      return <CheckCircle size={20} className="text-green-500" />;
    }
    return <XCircle size={20} className="text-red-500" />;
  };

  const getBorderColor = () => {
    if (type === "success") {
      return "border-l-4 border-l-green-500";
    }
    return "border-l-4 border-l-red-500";
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-sm w-full ${getBorderColor()}`}
      style={getToastStyles()}
    >
      <div className="p-4 rounded-md transition-all duration-300 ease-in-out">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">{message}</div>
            {description && (
              <div className="text-sm opacity-80 mt-1">{description}</div>
            )}
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
