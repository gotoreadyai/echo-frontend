import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DaisyDrawer from "./components/DaisyDrawer";
import { ReactQueryProvider } from "./QueryClientProvider";
import { ModelSingular } from "../models_EXPORT/Models";
import { CrudManager } from "./components/CrudManager";
import { SetStateAction, useEffect, useState } from "react";
import ThemeSelector from "./components/ThemeSelector"; // Import the ThemeSelector component

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
    <div className="transition-colors " data-theme={theme}>
      <ReactQueryProvider>
        <Router>
          <DaisyDrawer items={Object.keys(ModelSingular)}>
            <div className="min-h-full flex flex-col">
              <div className=" bg-base-300 flex px-md">
                <div className="breadcrumbs text-sm">
                  <ul>
                    <li>
                      <a>Home</a>
                    </li>
                    <li>
                      <a>Documents</a>
                    </li>
                    <li>Add Document</li>
                  </ul>
                </div>
              </div>
              <Routes>
                <Route path="/" element={<>Route is too low</>} />
                <Route path="/:lang" element={<>Route is too low</>} />
                <Route path="/:lang/:model" element={<CrudManager />} />
                <Route
                  path="/:lang/:model/:crudtype"
                  element={<CrudManager />}
                />
              </Routes>
              <div className="flex-1"></div>
              <ThemeSelector
                theme={theme}
                handleThemeChange={handleThemeChange}
              />
            </div>
          </DaisyDrawer>
        </Router>
      </ReactQueryProvider>
    </div>
  );
}

export default App;
