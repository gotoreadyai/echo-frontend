import { useContext } from "react";
import { UserContext } from "./../../UserProvider";
import { Link } from "react-router-dom";
import { useNavAction } from "../useNavAction";

export const TopBar = () => {
  const { user } = useContext(UserContext);
  const { navAction } = useNavAction();

  return (
    <div className="bg-base-300 px-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/pl/documents">Dashboard</Link>
            </li>
            <li>
              <button
                className="text-sm"
                onClick={() => navAction("", "edit-blocks")}
              >
                Edit
              </button>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          {user?.email}
          <Link to="/sys-auth">auth</Link>
        </div>
      </div>
    </div>
  );
};
