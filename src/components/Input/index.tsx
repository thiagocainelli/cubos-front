import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Input as AntInput } from "antd";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  type?: "text" | "password" | "email" | "number";
  suffixIcon?: React.ReactNode;
  min?: number;
  max?: number;
}

const Input: React.FC<InputProps> = ({
  placeholder = "Placeholder",
  value = "",
  onChange,
  className = "",
  size = "medium",
  type = "text",
  suffixIcon,
  min,
  max,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getInputStyles = () => {
    if (theme === "light") {
      return {
        backgroundColor: "var(--mauve-2)",
        border: isFocused
          ? "1px solid var(--purple-6)"
          : "1px solid var(--mauve-4)",
        color: "var(--mauve-10)",
        padding:
          size === "small"
            ? "8px 12px"
            : size === "large"
            ? "16px 20px"
            : "12px 16px",
        fontSize:
          size === "small" ? "14px" : size === "large" ? "18px" : "16px",
      };
    } else {
      return {
        backgroundColor: "var(--mauve-dark-3)",
        border: isFocused
          ? "1px solid var(--purple-6)"
          : "1px solid var(--mauve-dark-6)",
        color: "var(--mauve-4)",
        padding:
          size === "small"
            ? "8px 12px"
            : size === "large"
            ? "16px 20px"
            : "12px 16px",
        fontSize:
          size === "small" ? "14px" : size === "large" ? "18px" : "16px",
      };
    }
  };

  const getLabelStyles = () => {
    return {
      color: theme === "light" ? "var(--mauve-10)" : "var(--mauve-4)",
    };
  };

  const getErrorStyles = () => {
    return "text-red-500 text-sm mt-1";
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getIconStyles = () => {
    if (theme === "light") {
      return {
        color: "var(--mauve-10)",
      };
    } else {
      return {
        color: "var(--mauve-4)",
      };
    }
  };

  return (
    <AntInput
      type={showPassword ? "text" : type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`w-full rounded-md transition-all duration-200 outline-none pr-10 ${className}`}
      style={getInputStyles()}
      suffix={suffixIcon}
      min={min}
      max={max}
    />
  );
};

export default Input;
