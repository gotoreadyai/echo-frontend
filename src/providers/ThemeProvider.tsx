// ThemeContext.tsx
import { createContext, useState, useContext, useCallback, useEffect } from "react";

interface ThemeContextType {
  theme: string;
  updateTheme: (newTheme: string) => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: "default",
  updateTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "default";
  });

  const updateTheme = useCallback((newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute('data-theme', newTheme); // Natychmiastowa aktualizacja
  }, []);

  useEffect(() => {
    // Upewnij się, że atrybut data-theme jest ustawiony przy pierwszym renderze
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
