import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Select as AntSelect } from "antd";

interface SelectProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  options: { label: string; value: string | number }[];
  mode?: "tags" | "multiple";
}

const Select: React.FC<SelectProps> = ({
  placeholder = "Placeholder",
  value,
  onChange,
  className = "",
  size = "medium",
  options,
  mode,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyles = () => {
    if (theme === "light") {
      return {
        backgroundColor: "var(--mauve-2)",
        border: isFocused
          ? "1px solid var(--purple-6)"
          : "1px solid var(--mauve-4)",
        color: "var(--mauve-10)",
        height: size === "small" ? "32px" : size === "large" ? "40px" : "36px",

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
        height: size === "small" ? "32px" : size === "large" ? "40px" : "36px",

        fontSize:
          size === "small" ? "14px" : size === "large" ? "18px" : "16px",
      };
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <AntSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`w-full rounded-md transition-all duration-200 outline-none ${className}`}
      style={getInputStyles()}
      options={options}
      mode={mode}
    />
  );
};

export default Select;
