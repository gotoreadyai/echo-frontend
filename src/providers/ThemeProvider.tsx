import { createContext, useState, useContext, useEffect, useCallback } from "react";

const defaultThemeContext = {
  theme: "default",
  updateTheme: (newTheme: string) => {
    console.log(`Updating theme to: ${newTheme}`);
  },
};

const ThemeContext = createContext(defaultThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    // Lazy initialization, aby zminimalizować wpływ na wydajność
    return localStorage.getItem("theme") || "default";
  });

  const updateTheme = useCallback((newTheme: string) => {
    console.log(`Zmiana motywu na: ${newTheme}`);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeColorMeta(newTheme);
  }, []);

  // Funkcja do aktualizacji meta tagu `theme-color`
  const updateThemeColorMeta = (theme: string) => {
    console.log(`Aktualizacja theme-color dla motywu: ${theme}`); // Log funkcji
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      if (theme === "dark") {
        themeColorMeta.setAttribute("content", "#000000"); // Kolor dla ciemnego motywu
      } else {
        themeColorMeta.setAttribute("content", "#FFFFFF"); // Kolor dla jasnego motywu
      }
    } else {
      console.warn('Meta tag "theme-color" nie został znaleziony.');
    }
  };

  // Aktualizuj theme-color na początku i przy każdej zmianie motywu
  useEffect(() => {
    updateThemeColorMeta(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
