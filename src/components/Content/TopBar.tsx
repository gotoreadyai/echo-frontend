import { useContext } from "react";
import { UserContext } from "../../UserProvider";
import { Link } from "react-router-dom";
import { useNavAction } from "../useNavAction";
import { FiEdit2, FiHome, FiLayout, FiSun, FiUser } from "react-icons/fi";
import ThemeSelector from "./ThemeSelector";
import { useTheme } from "../../ThemeProvider";
// Import the useTheme hook

export const TopBar = () => {
  const { user } = useContext(UserContext);
  const { navAction } = useNavAction();
  const { theme, updateTheme } = useTheme(); // Access theme and updateTheme from the context

  const handleThemeChange = (event: { target: { value: string } }) => {
    updateTheme(event.target.value);
  };

  return (
    <div className="fixed z-20 right-0 p-2  bottom-0">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <Link to="/" className="hover:bg-base-100 btn">
          <FiHome />
        </Link>
        <Link to="/dashboard/pl/workspaces" className="hover:bg-base-100 btn">
          <FiLayout />
        </Link>
        <button
          className="hover:bg-base-100 btn"
          onClick={() => navAction("", "edit-blocks", "blocks", "0")}
        >
          <FiEdit2 />
        </button>

        <div className="dropdown dropdown-top dropdown-end">
          <div tabIndex={0} role="button" className="btn">
            <FiUser />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow mb-2 gap-1"
          >
            <li> {user}</li>
            <li>
              <Link to="/sys-auth" className="hover:bg-base-100 btn ">
                auth
              </Link>
            </li>
            <li className="hover:bg-base-100 btn ">Workspaces</li>
            <li className="hover:bg-base-100 btn ">Pages</li>
          </ul>
        </div>

        <div className="dropdown dropdown-top dropdown-end">
          <div tabIndex={1} role="button" className="btn">
            <FiSun />
          </div>
          <div  tabIndex={1} className="dropdown-content z-[1] w-52 pr-5 pb-2">
            <ThemeSelector
              theme={theme}
              handleThemeChange={handleThemeChange}
            />
          </div>
        </div>
      </div>  
    </div>
  );
};
