import { useNavigate, useLocation } from "react-router-dom";
import {
  FiAlertOctagon,
  FiCheck,
  FiHome,
  FiPackage,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { useTheme } from "../../providers/ThemeProvider";
import PreviewSwitch from "./PreviewSwitch";
import { useGlobalStore } from "../../stores/globalStore";
import ThemeSelector from "../uikit/ThemeSelector";
import { notifyText } from "../../utils/actions";

const SystemTab = () => {
  const { theme, updateTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const { mainMessage } = useGlobalStore((state) => ({
    mainMessage: state.mainMessage,
  }));

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTheme(event.target.value);
  };

  const handleRightbarClick = (value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("rightbar", value);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <div className="sticky top-0 p-sm px-md bg-base-300 text-xs z-20 flex gap-0.5 w-full border-b border-base-300 shadow-lg">
      <button
        className="btn btn-sm btn-square"
        onClick={() => navigate("/")}
        aria-label="Strona główna"
      >
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

      {mainMessage.message && (
        <div
          className={`${notifyText(
            mainMessage.type
          )} flex px-sm items-center justify-center gap-sm bg-neutral rounded animate-init-pulse text-xs`}
        >
          {mainMessage.type === "error" && (
            <FiAlertOctagon className="text-base" />
          )}{" "}
          {mainMessage.type === "success" && <FiCheck />} {mainMessage.message}
        </div>
      )}

      <div className="flex-1"></div>

      <button
        className="btn btn-sm btn-square"
        onClick={() => handleRightbarClick("workspaces")}
        aria-label="Workspaces"
      >
        <FiPackage />
      </button>

      <button
        className="btn btn-sm btn-square"
        onClick={() => handleRightbarClick("user")}
        aria-label="Użytkownik"
      >
        <FiUser />
      </button>
    </div>
  );
};

export default SystemTab;
