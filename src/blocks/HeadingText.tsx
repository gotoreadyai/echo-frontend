import React from "react";
import { textVariants } from "../data/styles";

export const HeadingText: React.FC<{
  text: string;
  variant: string;
  className: string;
}> = ({ text, className = "", variant = "" }) => {
  return (
    <div className={className || `container mx-auto`}>
      <h1 className={`${variant && textVariants[variant]}`}>
        {text || "Default Header"}
      </h1>
    </div>
  );
};

export default HeadingText;

/* text-right text-center */
/* text-xl text-3xl text-5xl */
/* font-bold font-extrabold */
/* py-md py-sm */
/* w-4/5 */
/* leading-7 leading-1 leading-10 */
