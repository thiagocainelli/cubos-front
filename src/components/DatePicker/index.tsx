import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { DatePicker as AntDatePicker } from "antd";
import type { Dayjs } from "dayjs";

interface DatePickerProps {
  placeholder?: string;
  error?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  value?: Dayjs | undefined;
  onChange?: (value: Dayjs | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = "Placeholder",
  className = "",
  size = "medium",
  value,
  onChange,
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
        borderColor: isFocused ? "var(--purple-6)" : "var(--mauve-dark-6)",
      };
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <AntDatePicker
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      format="DD/MM/YYYY"
      style={getInputStyles()}
      placeholder={placeholder}
      className={`w-full h-[40px] rounded-md transition-all duration-200 outline-none ${className}`}
    />
  );
};

export default DatePicker;
