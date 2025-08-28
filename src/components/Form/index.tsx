import React from "react";
import { Form as AntForm, FormInstance, FormProps as AntFormProps } from "antd";
import { useTheme } from "../../contexts/ThemeContext";

interface FormProps extends AntFormProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  form?: FormInstance;
}

const Form: React.FC<FormProps> = ({
  title,
  subtitle,
  children,
  form,
  className = "",
  ...props
}) => {
  const { theme } = useTheme();

  const getFormStyles = () => {
    if (theme === "light") {
      return {
        backgroundColor: "var(--mauve-1)",
        borderColor: "var(--mauve-3)", // mauve-3
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      };
    } else {
      return {
        backgroundColor: "var(--mauve-dark-2)", // mauve-dark-2
        borderColor: "var(--mauve-dark-6)", // mauve-dark-6
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      };
    }
  };

  const getTitleStyles = () => {
    return theme === "light"
      ? {
          color: "var(--mauve-10)",
        }
      : {
          color: "var(--mauve-4)",
        };
  };

  const getSubtitleStyles = () => {
    return theme === "light"
      ? {
          color: "var(--mauve-7)",
        }
      : {
          color: "var(--mauve-4)",
        };
  };

  return (
    <div
      className={`md:w-[400px] min-w-[300px] w-full p-[16px] rounded-[4px]  ${className}`}
      style={getFormStyles()}
    >
      {(title || subtitle) && (
        <div className="text-center mb-6">
          {title && (
            <h1 className={`text-2xl font-bold mb-2`} style={getTitleStyles()}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className={`text-sm`} style={getSubtitleStyles()}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <AntForm form={form} autoComplete="off" layout="vertical" {...props}>
        {children}
      </AntForm>
    </div>
  );
};

export default Form;
