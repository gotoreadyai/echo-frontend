import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ReactQueryProvider } from "./providers/QueryClientProvider";
import LayoutRenderer from "./components/LayoutRenderer";
import FiltersInit from "./components/FiltersInit";
import { useInitializeAuth } from "./stores/globalStore";
const App: React.FC = () => {
  useInitializeAuth();
  return (
    <ReactQueryProvider>
      <Router>
        <FiltersInit />
        <Routes>
          
          {/* Przekierowanie do edycji jako domyślna trasa */}
          <Route
            path="/"
            element={<Navigate to="/home/home-page/" replace />}
          />
          <Route path="/:workspace/:slug" element={<LayoutRenderer />} />
          <Route
            path="/:workspace/:slug/:action"
            element={<LayoutRenderer />}
          />
        </Routes>
      </Router>
    </ReactQueryProvider>
  );
};

export default App;
