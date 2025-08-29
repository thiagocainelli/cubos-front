import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Input as AntInput } from "antd";
import { useTheme } from "../../contexts/ThemeContext";

type Props = {
  value?: number | string;
  onChange?: (value: number | undefined) => void; // retorna em dólares
  placeholder?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  allowNegative?: boolean; // opcional
  config?: {
    symbol: string;
    position: "before" | "after";
    thousandsSeparator: string;
    decimalSeparator: string;
    decimalPlaces: number;
  };
  forceInteger?: boolean;
};

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// converte qualquer string (com $, vírgula, ponto, etc.) para somente dígitos
function extractDigits(s: string): string {
  return s.replace(/\D/g, "");
}

// aplica máscara USD a partir de dígitos (tratando como cents)
function maskFromDigits(digits: string, negative = false) {
  if (!digits) return { display: "", number: undefined };
  const cents = parseInt(digits, 10);
  if (Number.isNaN(cents)) return { display: "", number: undefined };

  const value = (cents / 100) * (negative ? -1 : 1);
  const display = usdFormatter.format(value);
  return { display, number: value };
}

const CurrencyUSDInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "$0.00",
  className = "",
  size = "medium",
  disabled,
  allowNegative = false,
  config,
  forceInteger,
}) => {
  const { theme } = useTheme();
  const [display, setDisplay] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Formatar valor para exibição
  const formatCurrency = useCallback(
    (numValue: number): string => {
      const absValue = Math.abs(numValue);
      const sign = numValue < 0 ? "-" : "";

      // Se forceInteger for true, usar 0 casas decimais
      const decimalPlaces = forceInteger ? 0 : config?.decimalPlaces || 2;

      // Formatar número com separadores de milhares
      let formatted = absValue.toFixed(decimalPlaces);

      if (decimalPlaces > 0) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(
          /\B(?=(\d{3})+(?!\d))/g,
          config?.thousandsSeparator || ","
        );
        formatted = parts.join(config?.decimalSeparator || ".");
      } else {
        formatted = formatted.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          config?.thousandsSeparator || ","
        );
      }

      // Adicionar símbolo da moeda
      if (config?.position === "before") {
        return `${sign}${config?.symbol || "$"} ${formatted}`;
      } else {
        return `${sign}${formatted} ${config?.symbol || "$"}`;
      }
    },
    [config, forceInteger]
  );

  // estilos iguais aos seus
  const inputStyle = useMemo(() => {
    const base = {
      padding:
        size === "small"
          ? "8px 12px"
          : size === "large"
          ? "16px 20px"
          : "12px 16px",
      fontSize: size === "small" ? "14px" : size === "large" ? "18px" : "16px",
      border: isFocused ? "1px solid var(--purple-6)" : undefined,
    } as React.CSSProperties;

    if (theme === "light") {
      return {
        ...base,
        backgroundColor: "var(--mauve-2)",
        border: isFocused
          ? "1px solid var(--purple-6)"
          : "1px solid var(--mauve-4)",
        color: "var(--mauve-10)",
      };
    }
    return {
      ...base,
      backgroundColor: "var(--mauve-dark-3)",
      border: isFocused
        ? "1px solid var(--purple-6)"
        : "1px solid var(--mauve-dark-6)",
      color: "var(--mauve-4)",
    };
  }, [theme, size, isFocused]);

  // sincroniza quando o value externo muda
  useEffect(() => {
    if (value === undefined || value === null || value === "") {
      setDisplay("");
      return;
    }
    const num = typeof value === "string" ? Number(value) : value;
    if (!isFinite(num)) {
      setDisplay("");
      return;
    }
    setDisplay(usdFormatter.format(num));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // detecta sinal negativo (se permitido)
    const negative = allowNegative && /^-/.test(raw);

    // sempre formata a cada tecla: pega só dígitos e mascara
    const digits = extractDigits(raw);
    const { display: out, number } = maskFromDigits(digits, negative);

    setDisplay(negative && out ? `-${out}`.replace("--", "-") : out);
    onChange?.(number);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // permite teclas de controle
    const ctrl = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
      "Home",
      "End",
      "Enter",
    ];
    if (ctrl.includes(e.key)) return;

    // opcional: permitir "-" somente na primeira posição
    if (allowNegative && e.key === "-") {
      const target = e.target as HTMLInputElement;
      if (target.selectionStart === 0 && !target.value.startsWith("-")) return;
    }

    // permite só dígitos; bloqueia vírgula/ponto porque a máscara cuida das casas
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // seleciona tudo ao focar
    requestAnimationFrame(() => e.target.select());
  };

  const handleBlur = () => setIsFocused(false);

  return (
    <AntInput
      type="text"
      value={display}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      inputMode="numeric"
      placeholder={placeholder}
      style={inputStyle}
      className={`w-full rounded-md transition-all duration-200 outline-none ${className}`}
      disabled={disabled}
    />
  );
};

export default CurrencyUSDInput;
