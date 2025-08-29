import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface ButtonProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  isTextBlack?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  disabled = false,
  onClick,
  loading = false,
  type = "button",
  isTextBlack = false,
  ...props
}) => {
  const { theme } = useTheme();

  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: "2px",
      fontWeight: "500",
      transition: "all 0.2s",
      border: "0",
      padding: "0 20px",
      fontSize: "16px",
      height: "44px",
      cursor: "pointer",
    };

    if (disabled) {
      switch (variant) {
        case "primary":
          return {
            ...baseStyles,
            backgroundColor: "var(--button-bg-disabled-primary)",
            color: "var(--button-text-disabled)",
            cursor: "not-allowed",
          };
        case "secondary":
          return {
            ...baseStyles,
            backgroundColor: "var(--button-bg-disabled-secondary)",
            color: "var(--button-text-disabled)",
            cursor: "not-allowed",
          };
        default:
          return baseStyles;
      }
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyles,
          backgroundColor: "var(--button-bg-primary)",
          color: "var(--button-text)",
        };

      case "secondary":
        return {
          ...baseStyles,
          backgroundColor: "var(--button-bg-secondary)",
          color:
            theme === "light"
              ? "var(--button-bg-primary)"
              : "var(--button-text)",
        };
      default:
        return baseStyles;
    }
  };

  const getHoverStyles = () => {
    if (disabled) return {};

    switch (variant) {
      case "primary":
        return { backgroundColor: "var(--button-bg-hover-primary)" };

      case "secondary":
        return { backgroundColor: "var(--button-bg-hover-secondary)" };
      default:
        return {};
    }
  };

  const getActiveStyles = () => {
    if (disabled) return {};

    switch (variant) {
      case "primary":
        return { backgroundColor: "var(--button-bg-active-primary)" };

      case "secondary":
        return { backgroundColor: "var(--button-bg-active-secondary)" };

      default:
        return {};
    }
  };

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={{
        ...getButtonStyles(),
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, getHoverStyles());
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, getButtonStyles());
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, getActiveStyles());
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, getButtonStyles());
        }
      }}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
};

export default Button;
