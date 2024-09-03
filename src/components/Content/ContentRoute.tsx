import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ContentLoader } from "./ContentLoader";
import { Auth } from "../SysAuth/Auth";

function ContentRoute() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/home/pl/index" />} />
        <Route path="/sys-auth" element={<Auth />} />
        <Route path=":workspace/:lang/:model" element={<ContentLoader />} />
        <Route
          path=":workspace/:lang/:model/:action/"
          element={<ContentLoader />}
        />
        <Route
          path=":workspace/:lang/:model/:action/:related/:id"
          element={<ContentLoader />}
        />
        
      </Routes>
    </Router>
  );
}

export default ContentRoute;
