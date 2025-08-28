import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const Link: React.FC<LinkProps> = ({
  to,
  children,
  className = "",
  variant = "primary",
}) => {
  const getLinkStyles = () => {
    const baseStyles = {
      fontSize: "14px",
      textDecoration: "none",
      transition: "all 0.2s",
      cursor: "pointer",
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyles,
          color: "var(--purple-6)",
        };
      case "secondary":
        return {
          ...baseStyles,
          color: "var(--mauve-6)",
        };
      default:
        return baseStyles;
    }
  };

  const getHoverStyles = () => {
    switch (variant) {
      case "primary":
        return {
          color: "var(--purple-7)",
          textDecoration: "underline",
        };
      case "secondary":
        return {
          color: "var(--mauve-7)",
          textDecoration: "underline",
        };
      default:
        return {};
    }
  };

  return (
    <RouterLink
      to={to}
      className={className}
      style={getLinkStyles()}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, getHoverStyles());
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, getLinkStyles());
      }}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
