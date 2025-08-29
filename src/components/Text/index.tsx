import { useTheme } from "../../contexts/ThemeContext";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  weight?: "thin" | "normal" | "bold";
}

const Text = ({
  children,
  className,
  size = "medium",
  weight = "normal",
  ...props
}: TextProps) => {
  const { theme } = useTheme();

  const getTextStyles = () => {
    return {
      color: theme === "light" ? "var(--mauve-10)" : "var(--mauve-1)",
      fontSize:
        size === "small"
          ? "12px"
          : size === "medium"
          ? "14px"
          : size === "large"
          ? "16px"
          : size === "xlarge"
          ? "24px"
          : "16px",
      fontWeight:
        weight === "thin" ? "300" : weight === "normal" ? "400" : "700",
    };
  };

  return (
    <div {...props} style={getTextStyles()}>
      {children}
    </div>
  );
};

export default Text;
