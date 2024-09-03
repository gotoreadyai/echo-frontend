import { ReactQueryProvider } from "./QueryClientProvider";
import { UserProvider } from "./UserProvider";
import ContentRoute from "./components/Content/ContentRoute";
import { ThemeProvider } from "./ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="transition-colors flex flex-col min-h-screen">
        <ReactQueryProvider>
          <UserProvider>
            <ContentRoute />
          </UserProvider>
        </ReactQueryProvider>
        <div className="flex-1"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;
