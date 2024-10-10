import React from "react";
import { Link } from "react-router-dom";

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link to="/" className={`${className || "inline-block"} select-none`}>
      <img src="/logo.svg" alt="logo" />
    </Link>
  );
};

export default Logo;
/*
px-md
*/
