import React from "react";

interface ThemeSelectorProps {
  theme: string;
  handleThemeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  theme,
  handleThemeChange,
}) => {
  const themes = [
    "default",
    "light",
    "dark",
    "cupcake",
    "aqua",
    "retro",
    "cyberpunk",
  ]; // Array of themes

  return (
    <div className="join join-horizontal mx-md">
      {themes.map((themeName) => (
        <input
          key={themeName}
          type="radio"
          name="theme-buttons"
          className="btn theme-controller join-item btn-sm font-thin"
          aria-label={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          value={themeName}
          checked={theme === themeName}
          onChange={handleThemeChange}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
