import { createContext, ReactNode, useEffect, useState } from "react";


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

        } else {
            document.documentElement.classList.add("dark");
        }

    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
