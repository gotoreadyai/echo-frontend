import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./providers/ThemeProvider";

import { ReactQueryProvider } from "./providers/QueryClientProvider";
import { UserProvider } from "./providers/UserProvider";
import LayoutRenderer from "./components/LayoutRenderer";
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <ReactQueryProvider>
          <Router>
            <Routes>
              {/* Przekierowanie do edycji jako domyślna trasa */}
              <Route
                path="/"
                element={<Navigate to="/dashboard/documents/edit-document/" replace />}
              />
              <Route path="/:workspace/:slug" element={<LayoutRenderer />} />
              <Route
                path="/:workspace/:slug/:action"
                element={<LayoutRenderer />}
              />
            </Routes>
          </Router>
        </ReactQueryProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
