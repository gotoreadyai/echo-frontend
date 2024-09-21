import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // StrictMode doubles logic of the action components
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
