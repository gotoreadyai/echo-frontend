// src/components/SystemTab.tsx
import React, { useContext } from "react";
import {
  FiPackage,
  FiSun,
  FiUploadCloud,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";
import { useTheme } from "../../providers/ThemeProvider";
import PreviewSwitch from "./PreviewSwitch";
import ThemeSelector from "../uikit/ThemeSelector";

import useNavigation from "../../hooks/useNavigation"; // Upewnij się, że ścieżka jest poprawna
import { useNavigate, useParams } from "react-router-dom";

import NotificationMsg from "../uikit/NotificationMsg";
import { UserContext } from "../../providers/UserProvider";

const TopBar: React.FC = () => {
  const { theme, updateTheme } = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { setUSParam } = useNavigation();
  const params = useParams<{
    workspace: string;
    slug: string;
    action?: string;
  }>();

  const action = params.action;

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTheme(event.target.value);
  };

  const handleRightbarClick = (value: string) => {
    setUSParam("rightbar", value);
    // Opcjonalnie: Dodaj powiadomienia lub inne akcje
  };

  return (
    <>
      <div
        className={`
      ${action === "edit-document" ? "bg-base-200" : "bg-base-300"}
      sticky top-0 p-sm px-md  text-xs z-30 flex gap-0.5 w-full 
      border-b border-base-300 select-none`}
      >
        <div className="dropdown">
          <button
            aria-label="Theme"
            role="button"
            className="btn btn-sm btn-square"
          >
            <FiSun />
          </button>
          <div className="dropdown-content z-[1] w-52 pb-2">
            <ThemeSelector
              theme={theme}
              handleThemeChange={handleThemeChange}
            />
          </div>
        </div>
        <PreviewSwitch />

        <NotificationMsg />

        <button
          className="btn btn-sm btn-square"
          onClick={() => navigate(`/dashboard/workspaces/`)}
          aria-label="Workspaces"
        >
          <FiPackage />
        </button>

        <button
          className="btn btn-sm btn-square"
          onClick={() => handleRightbarClick("pluginupdater")}
          aria-label="Workspaces"
        >
          <FiUploadCloud />
        </button>

        <button
          className={`btn btn-sm btn-square ${user ? "text-success" : ""}`}
          onClick={() => handleRightbarClick("user")}
          aria-label="Użytkownik"
        >
          {user ? <FiUserCheck /> : <FiUser />}
        </button>
      </div>
    </>
  );
};

export default TopBar;
