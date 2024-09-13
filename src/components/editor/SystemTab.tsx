import { useNavigate, useLocation } from "react-router-dom";
import { FiCheck, FiHome, FiPackage, FiSun, FiUser } from "react-icons/fi";
import { useTheme } from "../../providers/ThemeProvider";
import ThemeSelector from "../daisy/ThemeSelector";
import PreviewSwitch from "./PreviewSwitch";
import { useGlobalStore } from "../../stores/globalStore"; // Import globalStore

const SystemTab = () => {
  const { theme, updateTheme } = useTheme(); // Access theme and updateTheme from the context
  const navigate = useNavigate();
  const location = useLocation(); // Get current location to access existing search params

  const { mainMessage } = useGlobalStore((state) => ({
    mainMessage: state.mainMessage,
  })); // Access mainMessage from globalStore

  const handleThemeChange = (event: { target: { value: string } }) => {
    updateTheme(event.target.value);
  };

  // Navigate with rightbar query parameter without losing other search params
  const handleRightbarClick = (value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("rightbar", value); // Set or update the rightbar param
    navigate({
      pathname: location.pathname, // Keep the same path
      search: searchParams.toString(), // Preserve and update search params
    });
  };

  return (
    <div className="sticky top-0 p-sm px-md bg-base-300 text-xs z-20 flex gap-0.5 w-full border-b border-base-300 shadow-lg">
      <button className="btn btn-sm btn-square" onClick={() => navigate("/")}>
        <FiHome />
      </button>
      <PreviewSwitch />

      <div className="dropdown">
        <div tabIndex={1} role="button" className="btn btn-sm btn-square">
          <FiSun />
        </div>
        <div tabIndex={1} className="dropdown-content z-[1] w-52 pb-2">
          <ThemeSelector theme={theme} handleThemeChange={handleThemeChange} />
        </div>
      </div>

      {/* Conditionally render the message from globalStore */}
      {mainMessage.message && (
        <div
          className={`${
            mainMessage.type === "success"
              ? "text-success bg-success"
              : mainMessage.type === "error"
              ? "text-error bg-error"
              : "text-content"
          } flex px-sm items-center justify-center gap-xs bg-opacity-5`}
        >
         <FiCheck /> {mainMessage.message}
        </div>
      )}

      <div className="flex-1"></div>

      <button
        className="btn btn-sm btn-square"
        onClick={() => handleRightbarClick("workspaces")}
      >
        <FiPackage />
      </button>

      <button
        className="btn btn-sm btn-square"
        onClick={() => handleRightbarClick("user")}
      >
        <FiUser />
      </button>
    </div>
  );
};
export default SystemTab;
