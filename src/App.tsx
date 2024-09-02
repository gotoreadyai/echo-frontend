
import { ReactQueryProvider } from "./QueryClientProvider";
import { SetStateAction, useEffect, useState } from "react";
import ThemeSelector from "./components/ThemeSelector"; 
import { UserProvider } from "./UserProvider"; 
import ContentRoute from "./components/Content/ContentRoute";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTheme(event.target.value);
  };

  return (
    <div
      className="transition-colors flex flex-col min-h-screen"
      data-theme={theme}
    >
      <ReactQueryProvider>
        <UserProvider>
          <ContentRoute />
        </UserProvider>
      </ReactQueryProvider>
      <div className="flex-1"></div>
      <ThemeSelector theme={theme} handleThemeChange={handleThemeChange} />
    </div>
  );
}

export default App;
