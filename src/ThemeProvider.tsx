import { createContext, useState, useContext } from "react";

const defaultThemeContext = {
    theme: "default",
    updateTheme: (newTheme: string) => {
      // Use the newTheme parameter to set the new theme value
      console.log(`Updating theme to: ${newTheme}`);
    },
  };
const ThemeContext = createContext(defaultThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
