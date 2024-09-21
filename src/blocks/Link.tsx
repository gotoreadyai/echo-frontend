import React from "react";
import { Link, useLocation } from "react-router-dom";
import { parseKeyFromPath } from "../hooks/useNavigation";
import { useGlobalStore } from "../stores/globalStore";

export const LinkBlock: React.FC<{
  name: string;
  to: string;
  className?: string;
}> = ({ name, to, className }) => {
  const filters = useGlobalStore((state) => state.filters);
  const location = useLocation();

  // Determine if the current location matches the 'to' value
  const isActive = location.pathname === parseKeyFromPath(to, filters);
  return (
    <div className={`${className} container mx-auto`}>
      <Link
        to={parseKeyFromPath(to, filters)}
        className={`btn px-8 ${isActive ? "btn-active" : ""}`}
      >
        {name || "Link"}
      </Link>
    </div>
  );
};

export default LinkBlock;
