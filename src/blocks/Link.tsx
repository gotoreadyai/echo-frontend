import React from "react";
import { Link, useLocation } from "react-router-dom";
import { parseKeyFromPath } from "../hooks/useNavigation";
import { useGlobalStore } from "../stores/globalStore";

export const LinkBlock: React.FC<{
  name: string;
  to: string;
  className?: string;
  wide?: boolean;
  outline?: boolean;
  variant: string;
  size?: string;
}> = ({ name, to, className, wide, outline, variant, size }) => {
  const filters = {filters:useGlobalStore((state) => state.filters)};
  const location = useLocation();

  // Determine if the current location matches the 'to' value
  const isActive = location.pathname === parseKeyFromPath(to, filters);
  return (
    <div className={`${className ? className : "container mx-auto"}`}>
      <Link
        to={parseKeyFromPath(to, filters)}
        className={`no-animation btn ${wide && "btn-wide"} ${
          outline && "btn-outline"
        } ${variant ? `${variant}` : ""}  ${size ? `${size}` : ""} ${
          isActive ? "btn-active" : ""
        }`}
      >
        {name || "Link"}
      </Link>
    </div>
  );
};

export default LinkBlock;
