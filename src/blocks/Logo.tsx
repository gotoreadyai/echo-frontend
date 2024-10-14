import React from "react";
import { Link } from "react-router-dom";

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link to="/" className={`${className || "inline-block"}`}>
      <img src="/logo.svg" alt="logo" className="object-fit w-full h-full"/>
    </Link>
  );
};

export default Logo;
/*
px-md

select-none px-lg py-xs h-12 w-full my-0.5
*/
