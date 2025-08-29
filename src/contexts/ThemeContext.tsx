import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextData = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.setProperty(
        "--current-background",
        "var(--mauve-1)"
      );
      document.documentElement.style.setProperty(
        "--current-text",
        "var(--mauve-10)"
      );
      document.documentElement.style.setProperty(
        "--current-primary",
        "var(--purple-6)"
      );
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.style.setProperty(
        "--current-background",
        "var(--mauve-dark-1)"
      );
      document.documentElement.style.setProperty(
        "--current-text",
        "var(--mauve-1)"
      );
      document.documentElement.style.setProperty(
        "--current-primary",
        "var(--purple-4)"
      );
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};
