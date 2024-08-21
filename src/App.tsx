import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DaisyDrawer from "./components/DaisyDrawer";
import { ReactQueryProvider } from "./QueryClientProvider";
import { ModelSingular } from "../models_EXPORT/models";
import { CrudManager } from "./components/CrudManager";
import { SetStateAction, useEffect, useState } from "react";
import ThemeSelector from "./components/ThemeSelector"; // Import the ThemeSelector component
import { ContentRenderer } from "./components/ContentRenderer";

import { v4 as uuidv4 } from "uuid";
import { ContentEditor } from "./components/ContentEditor";
import { Block } from "./components/Blocks/Types";

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

  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: uuidv4(),
      type: "heading",
      data: { level: 1, content: "Introduction" },
    },
    {
      id: uuidv4(),
      type: "text",
      data: { content: "This is an example of a text block." },
    },
    {
      id: uuidv4(),
      type: "image",
      data: { src: "/path/to/image.jpg", alt: "Example Image" },
    },
    {
      id: uuidv4(),
      type: "quote",
      data: { content: "This is a quote.", author: "Author Name" },
    },
    {
      id: uuidv4(),
      type: "list",
      data: {
        items: ["First item", "Second item", "Third item"],
        ordered: true,
      },
    },
  ]);

  return (
    <div className="transition-colors " data-theme={theme}>
      <ReactQueryProvider>
        <Router>
          <DaisyDrawer items={Object.keys(ModelSingular)}>
            <div className="min-h-full flex flex-col gap-md">
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
                <Route
                  path="/"
                  element={
                    <div className="container mx-auto p-4">
                      <ContentRenderer blocks={blocks} />
                    </div>
                  }
                />

                <Route
                  path="/editor/"
                  element={
                    <div className="container mx-auto p-4">
                      <ContentEditor blocks={blocks} setBlocks={setBlocks} />
                    </div>
                  }
                />

                <Route
                  path="/:lang"
                  element={
                    <div role="alert" className="alert alert-warning">
                      Route path is missing
                    </div>
                  }
                />
                <Route
                  path=":workspace/:lang/:model"
                  element={<CrudManager />}
                />
                <Route
                  path=":workspace/:lang/:model/:action/"
                  element={<CrudManager />}
                />
                <Route
                  path=":workspace/:lang/:model/:action/:related/:id"
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
      SyntaxError: Unexpected token 'n', "null" is not valid JSON - wywaliło serwer
    </div>
  );
}

export default App;
