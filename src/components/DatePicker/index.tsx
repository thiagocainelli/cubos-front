import React, { useState, useMemo, useCallback } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Input } from "antd";

interface DatePickerProps {
  placeholder?: string;
  error?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  value?: Dayjs | string | Date | undefined;
  onChange?: (value: Dayjs | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = "DD/MM/AAAA",
  className = "",
  size = "medium",
  value,
  onChange,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Converter value para string formatada
  const displayValue = useMemo(() => {
    if (!value) return "";

    try {
      let dayjsValue: Dayjs | undefined;

      if (dayjs.isDayjs(value)) {
        dayjsValue = value;
      } else if (typeof value === "string") {
        dayjsValue = dayjs(value);
      } else if (value instanceof Date) {
        dayjsValue = dayjs(value);
      }

      if (dayjsValue && dayjsValue.isValid()) {
        return dayjsValue.format("DD/MM/YYYY");
      }
    } catch (error) {
      console.warn("Erro ao converter data:", error);
    }

    return "";
  }, [value]);

  // Aplicar máscara de data
  const applyDateMask = useCallback((value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara DD/MM/AAAA
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(
        4
      )}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(
        4,
        8
      )}`;
    }
  }, []);

  // Validar se a data é válida
  const isValidDate = useCallback((dateString: string): boolean => {
    const parts = dateString.split("/");
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > 2100) return false;

    // Verificar se a data realmente existe
    const date = dayjs(
      `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`
    );
    return (
      date.isValid() &&
      date.date() === day &&
      date.month() === month - 1 &&
      date.year() === year
    );
  }, []);

  // Converter string para Dayjs
  const parseDateString = useCallback(
    (dateString: string): Dayjs | undefined => {
      if (!isValidDate(dateString)) return undefined;

      const parts = dateString.split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      return dayjs(
        `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      );
    },
    [isValidDate]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = applyDateMask(rawValue);

    setInputValue(maskedValue);

    // Se a data estiver completa (8 caracteres + 2 barras = 10)
    if (maskedValue.length === 10) {
      const parsedDate = parseDateString(maskedValue);
      if (onChange) {
        onChange(parsedDate);
      }
    } else if (maskedValue.length === 0) {
      // Se o campo estiver vazio, limpar o valor
      if (onChange) {
        onChange(undefined);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir apenas números, backspace, delete, tab, enter, setas
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];

    if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Selecionar todo o texto ao focar
    const input = document.activeElement as HTMLInputElement;
    if (input) {
      input.select();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    // Se o campo não estiver vazio mas não tiver 10 caracteres, limpar
    if (inputValue.length > 0 && inputValue.length < 10) {
      setInputValue("");
      if (onChange) {
        onChange(undefined);
      }
    }
  };

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

  // Atualizar inputValue quando displayValue mudar
  React.useEffect(() => {
    setInputValue(displayValue);
  }, [displayValue]);

  return (
    <Input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      maxLength={10}
      style={getInputStyles()}
      className={`w-full px-2 h-[40px] rounded-md transition-all duration-200 outline-none ${className}`}
    />
  );
};

export default DatePicker;
